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
    let { limit, offset, order, where } = req.query;
    let { state } = req.body;
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
});

server.get('/user/:idUser', (req, res, next) => {
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
        .catch(err => next(err))
});

server.get('/:idOrder', (req, res, next) => {
    let { limit, offset, order, where } = req.query;
    const { idOrder } = req.params;
    order && (order = JSON.parse(order));
    where && (where = parseWhere(where));

    Order.findByPk(idOrder, { include: [Product] })
        .then(order => res.status(201).json(order))
        .catch(err => next(err))
});

server.put('/:idOrder', (req, res, next) => {
    const { idOrder } = req.params;

    Order.update(req.body, { where: { id: idOrder } })
        .then(() => Order.findByPk(idOrder))
        .then(order => res.status(201).json(order))
        .catch(err => next(err))
});

server.delete('/:idOrder', (req, res, next) => {
    const { idOrder } = req.params;
    
    Order.destroy({ where: { id: idOrder } })
        .then(data => res.status(201).send('Eliminado'))
        .catch(err => next(err))
});

server.post('/', async (req, res, next) => {
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
});

server.post('/:idOrder/product/:idProduct', async (req, res, next) => {
    const { idOrder, idProduct } = req.params;
    const { name, price, quantity } = req.body;

    let order = await Order.findByPk(idOrder, { include: [Product] });


    const product = await Product.findByPk(idProduct);
    console.log(order.products.find(x => x.id === idProduct))
    await order.addProduct(product, { through: { name, quantity, price } });

    order = await Order.findByPk(idOrder, { include: [Product] });

    res.status(201).json(order)
});

server.delete('/:idOrder/product/:idProduct', async (req, res, next) => {
    const { idOrder, idProduct } = req.params;

    const order = await Order.findByPk(idOrder, { include: [Product] });
    const product = await Product.findByPk(idProduct);

    await order.removeProduct(product)

    res.status(201).send('Deletea2')
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