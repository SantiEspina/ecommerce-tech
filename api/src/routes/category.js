const server = require('express').Router();
const { Category } = require('../db.js');
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
}

server.get('/', (req, res, next) => {
    let { limit, offset, order, where } = req.query;
    order && (order = JSON.parse(order));
    where && (where = parseWhere(where));
Category.findAll({limit, offset, order, where})
	.then(categories => {
		res.send(categories);
	})
	.catch(next);
});

server.get('/:id', (req, res, next) => {
    const { id } = req.params;
    Category.findByPk(id)
        .then(category => {
            res.status(201).json(category)
        })
        .catch(err =>{
            res.status(404).json(err)
        })
});


server.post('/',(req, res, next) => {
    try {
        if(req.user.isAdmin){
            const { name } = req.body;
            Category.findOrCreate({where:{name}})
            .then(()=>{
                res.status(201).send('Categoria agregada exitosamente')
            })
        }else res.sendStatus(401);
        
    } catch (error) {
        next (error)
    }
});

server.delete('/:idParams',(req, res , next) => {
    try {
        if(req.user.isAdmin){
            const { idParams } = req.params;
            Category.destroy({where:{id:idParams}})
            .then(()=>{
                res.status(201).send('Categoria eliminada exitosamente')
            })
        }else res.sendStatus(401);
    } catch (error) {
        next(error)
    }
});

server.put('/:idParams',(req, res, next) => {
    try {
        if(req.user.isAdmin){
            const { idParams } = req.params;
            const { name } =req.body;
            Category.update({name}, {where: {id:idParams}})
            .then(()=>{
                res.status(201).send('Modificado Correctamente la Categoria')
            })
        }else res.sendStatus(401);
    } catch (error) {
        next(error)
    }
});

module.exports = server;
