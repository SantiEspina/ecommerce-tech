const server = require('express').Router();
const { User, Order } = require('../db.js');
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
    order && (order = JSON.parse(order));
    where && (where = parseWhere(where));

    User.findAll({ limit, offset, order, where, include: Order })
        .then((users) => {
            res.json(users);
        })
        .catch(err => res.status(400).send(err));
});

server.post('/', (req, res, next) => {
    const { name, username, email, password, direction, state } = req.body;

    if(!name || !email || !direction) return res.status(401).send('Faltan datos');

    if(state === 'invited') {
        User.create({
            name,
            direction,
            email,
            state
        })
        .then((newUser) => {
            return res.status(201).json(newUser);
        })
        .catch((err) => res.status(400).send(err));
    } else if(username && password) {
        User.create({
            name,
            username,
            email,
            password,
            direction,
            state
        })
        .then(user => res.status(201).json(user))
        .catch(err => res.status(400).send(err))
    } else {
        return res.status(401).send('Faltan datos')
    }
});

server.put('/:id', (req, res, next) => {
    const { id } = req.params;
    const { name, username, email, password, direction, state } = req.body;

    if(!name || !email || !direction) return res.status(401).send('Faltan datos');

    if(state === 'invited') {
        User.update({
            name,
            email,
            direction,
            state,
            username: null,
            password: null
        }, { where: { id } })
            .then(() => User.findOne({ where: { id } }))
            .then(user => res.status(201).json(user))
            .catch(err => res.status(400).send(err))

    } else if(username && password) {
        User.update({
            name,
            direction,
            email,
            username,
            password,
            state
        }, { where: { id } })
            .then(() => User.findOne({ where: { id } }))
            .then(user => res.status(201).json(user))
            .catch(err => res.status(400).send(err))
    } else {
        return res.status(400).send('Faltan datos')
    }
});

server.delete('/:id', (req, res, next) => {
    const { id } = req.params;

    User.destroy({ where: { id } })
        .then(data => res.status(201).send('Eliminado'))
        .catch(err => res.status(400).json(err))
});

server.get('/:id/cart', (req, res, next) => {
    const { id } = req.params;

    User.findByPk(id, { include: [Order] })
        .then(user => res.status(201).json(user))
        .catch(err => res.status(400).send(err))
}); 

server.post('/:id/cart', async (req, res, next) => {
    const { id } = req.params;
    const { price, quantity } = req.body;

    const user = await User.findByPk(id, { include: [Order] });
    const order = await Order.create({ price, quantity });

    await user.addOrder(order);

    res.status(201).json(user);
}); 

server.put('/:id/cart', (req, res, next) => {
    const { id } = req.params;
    const { quantity } = req.body;
    
    Order.findAll({ include: {
        model: User,
        where: { id }
    }})
        .then(order => order.update({ quantity }))
        .then(newOrder => res.status(201).json(newOrder))
        .catch(err => res.status(400).send(err))
}); 

server.delete('/:id/cart', (req, res, next) => {
    const { id } = req.params;

    User.findByPk(id, { include: [Order] })
        .then(user => user.removeOrder())
        .then(() => res.status(201).send('Carrito eliminado'))
        .catch(err => res.status(400).send(err))
}); 

module.exports = server;