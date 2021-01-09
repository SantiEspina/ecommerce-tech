const server = require('express').Router();
const { User, Order, Product } = require('../db.js');
const { Op } =require ('sequelize');
const jwt = require("jsonwebtoken");
const {
    SECRETO
} = process.env;

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
        if (req.user.isAdmin){
            let { limit, offset, order, where } = req.query;
            order && (order = JSON.parse(order));
        where && (where = parseWhere(where));
        User.findAll({ limit, offset, order, where, include: Order })
            .then((users) => {
                res.json(users);
            })}
    else res.sendStatus(401);
    } catch (error) {
        next(error);
    }
});

server.get('/:id', (req, res, next) => {
    try {
        if(req.user){
            const { id } = req.params;
            User.findByPk(id, { include: [Order] })
                .then(user => res.status(201).json(user))
        }else res.sendStatus(401);
    } catch (error) {
        next(error)
    }
   
});

server.post('/', (req, res, next) => {
    try {
        if(req.user.isAdmin){
            const { name, username, email, password, adress, isAdmin } = req.body;
            if(!name || !email || !adress) return res.status(401).send('Faltan datos');
            User.create({
                name,
                username,
                email,
                password,
                adress,
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
        }
    } catch (error) {
        next(error)
    }
});

server.put('/:id', (req, res, next) => {
    try {
        if(req.user.isAdmin){
            const { id } = req.params;
            const { name, username, email, password, adress, isAdmin } = req.body;
            User.update({
                name,
                email,
                adress,
                isAdmin,
                username,
                password
            }, { where: { id } })
                .then(() => User.findOne({ where: { id } }))
                .then(user => res.status(201).json(user))
        }else res.sendStatus(401);
    } catch (error) {
        next(error)
    }
});

server.delete('/:id', (req, res, next) => {
    try {
        if (req.user.isAdmin){
    const { id } = req.params;
    User.destroy({ where: { id } })
        .then(data => res.status(201).send('Eliminado'))
        .catch(err => res.status(400).json(err))
        }
    }catch (error) {
        next(error);
    }
});

server.post("/updatePassword" , (req , res, next ) => {
    try {
        if(req.user){
            let { token } =req.query;
            let deco =jwt.decode(token,SECRETO);
            let id = deco.id;
            User.update(req.body,{where:{id}})
            .then(() => User.findByPk(id))
            .then(user => res.status(201).json(user))
        }else res.sendStatus(401);
    } catch (error) {
        next(error)
    }
})

server.post("/confirmEmail" , async (req , res , next ) => {
    let { email } =req.body;
    const user = await User.findOne({where : { email }})
    
    if(!user) {
        return res.status(400).send("Not User")
    }else{
        let {id} = user;
    
    return res.send(
        jwt.sign(
        {
            id,
            email
        },
        SECRETO, console.log("http://localhost:3001/auth/confirmEmail ? token =",jwt.sign({id,email},SECRETO))
        )
    )
    }
})


server.post('/admin/controlador/unico/admin', (req, res, next) => {
    try {
        if(true){
            const { name, username, email, password, adress, isAdmin } = req.body;
            if(!name || !email || !adress) return res.status(401).send('Faltan datos');
            User.create({
                name,
                username,
                email,
                password,
                adress,
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
        }
    } catch (error) {
        next(error)
    }
});

module.exports = server;