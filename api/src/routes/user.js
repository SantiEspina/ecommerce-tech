const server = require('express').Router();
const { User, Order, Product } = require('../db.js');
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

server.get('/:id', (req, res, next) => {
    const { id } = req.params;

    User.findByPk(id, { include: [Order] })
        .then(user => res.status(201).json(user))
        .catch(err => next(err))
});

server.post('/', (req, res, next) => {
    const { name, username, email, password, direction, isAdmin } = req.body;

    if(!name || !email || !direction) return res.status(401).send('Faltan datos');

    User.create({
        name,
        username,
        email,
        password,
        direction,
        isAdmin
    })
        .then(user => res.status(201).json(user))
        .catch(err => {
            if(err.parent){
                
                switch(err.parent.code){
                    case "23505" : return res.status(400).send(err.parent.detail)
                    default:return next(err.parent)
                }
            }
            next(err)})
});

server.put('/:id', (req, res, next) => {
    const { id } = req.params;
    const { name, username, email, password, direction, isAdmin } = req.body;

    User.update({
        name,
        email,
        direction,
        isAdmin,
        username,
        password
    }, { where: { id } })
        .then(() => User.findOne({ where: { id } }))
        .then(user => res.status(201).json(user))
        .catch(err => res.status(400).send(err))
});

server.delete('/:id', (req, res, next) => {
    const { id } = req.params;

    User.destroy({ where: { id } })
        .then(data => res.status(201).send('Eliminado'))
        .catch(err => res.status(400).json(err))
});


module.exports = server;