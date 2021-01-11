const server = require('express').Router();
const { User, Order, Product, OrderProduct } = require('../db.js');
const { Op } =require ('sequelize');

function parseWhere(where){
	where = JSON.parse(where)
	for (let prop in where){
		const splitProp = prop.split("_");
		if(splitProp.length === 2){
			where[splitProp[1]] = {
				[Op[splitProp[0]]]:where[prop],
			};
			delete where[prop];
		}
	}
    return where;
};

server.get('/', (req, res, next) => {
    try {
        if(req.user.isAdmin){
            let { limit, offset, order, where, state } = req.query;
            order && (order = JSON.parse(order));
            where && (where = parseWhere(where));
            if(!state) {
                Order.findAll({ include: [User] })
                    .then(orders => res.status(201).json(orders))
                    .catch(err => next(err))
            } else {   
                Order.findAll({ where: { state } }, { include: [User] })
                .then(orders => res.status(201).json(orders))
                .catch(err => next(err))
            }
        }else res.sendStatus(401);
    } catch (error) {
        next(error)
    }
});

server.get('/user/:idUser', (req, res, next) => {
    try {
        if(req.user){
            let { limit, offset, order, where } = req.query;
            const { idUser } = req.params;
            order && (order = JSON.parse(order));
            where && (where = parseWhere(where));
            Order.findAll({
                include: [{
                    model: User,
                    where: {
                        id: idUser
                    }
                }]
            })
                .then(orders => res.status(201).json(orders))
        }else res.sendStatus(401);
    } catch (error) {
        next(error)
    }
});

server.get('/:idOrder', (req, res, next) => {
    try {
        if(req.user){
            let { limit, offset, order, where } = req.query;
            const { idOrder } = req.params;
            order && (order = JSON.parse(order));
            where && (where = parseWhere(where));
            Order.findByPk(idOrder, { include: [Product] })
                .then(order => res.status(201).json(order))
        }else res.sendStatus(401);
    } catch (error) {
        next(error)
    }
});

server.put('/:idOrder', (req, res, next) => {
    try {
        if (req.user.isAdmin){
            const { idOrder } = req.params;
            Order.update(req.body, { where: { id: idOrder } })
                .then(() => Order.findByPk(idOrder))
                .then(order => res.status(201).json(order))
        }else res.sendStatus(401);
    } catch (error) {
        next(error)
    }
});

server.delete('/:idOrder', (req, res, next) => {
    try {
        if(req.user.isAdmin){
            const { idOrder } = req.params;
            Order.destroy({ where: { id: idOrder } })
                .then(data => res.status(201).send('Eliminado'))
        }else res.sendStatus(401);
    } catch (error) {
        next(error)
    }
});

server.post('/', async (req, res, next) => {
    try {
        if(req.user){
            const { userId } = req.body;
            let order = await Order.findOne({ 
                where: {
                    userId,
                    state: 'pending'
                }
            });
            if(!order) {   
                const user = await User.findByPk(userId, { include: [Order] });
                await user.createOrder();
                order = await Order.findOne({ 
                    where: {
                        userId,
                        state: 'pending'
                    }
                });
            }
            res.status(201).json(order);
        }else res.sendStatus(401);
    } catch (error) {
        next(error)
    }
});

server.post('/:idOrder/product/:idProduct', async (req, res, next) => {
    try {
        if(req.user){
            const { idOrder, idProduct } = req.params;
            let { name, price, quantity } = req.body;
            let order = await Order.findByPk(idOrder, { include: [Product] });
            const product = await Product.findByPk(idProduct);
            order.products.map(p => {
                if(p.id === product.id) {
                    quantity = p.orderProduct.quantity + 1;
                    // order.removeProduct(product);
                } 
            });
            await order.addProduct(product, { through: { name, quantity, price } });
            order = await Order.findByPk(idOrder, { include: [Product] });
            res.status(201).json(order)
        }else res.sendStatus(401);
    } catch (error) {
        next(error)
    }
});

server.delete('/:idOrder/product/:idProduct', async (req, res, next) => {
    try {
        if(req.user){
            const { idOrder, idProduct } = req.params;
            const order = await Order.findByPk(idOrder, { include: [Product] });
            const product = await Product.findByPk(idProduct);
            await order.removeProduct(product)
            res.status(201).send('Deletea2')
        }else res.sendStatus(401);
    } catch (error) {
        next(error)
    }
});

// ! HACER post /:idOrder/complete -> traer order -> recorrer products y preguntar si hay stock ->
//   notificar q no hay stock -> modificar products con el stock -> agarrar order y ponerla en complete -> devolver order
// !UTILIZAR PROMISE ALL, AGARRAR TODOS LOS PRODUCTOS Y PONERLOS EN UN ARR Y SOLO PONER AWAIT EN PROMISE ALL

// server.post('/:idOrder/complete', async (req, res, next) => {
//     const { idOrder } = req.params;
//     let arr = [];

//     const order = await Order.findByPk(idOrder, { include: [Product] });

//     order.products.forEach(p => {
//         if(p.stock < p.orderProduct.quantity) return res.status(400).send('Sin stock');
//         arr.push(p);
//         p.stock = p.stock - p.orderProduct.quantity;
//     });

//     order.state = 'complete';

//     await Promise.all(arr)

//     res.json(order)
// });

module.exports = server;