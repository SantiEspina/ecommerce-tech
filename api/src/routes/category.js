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

server.post('/',(req, res) => {
	const { name } = req.body;
	Category.findOrCreate({where:{name}})
    .then(()=>{
        res.status(201).send('Categoria agregada exitosamente')
    })
    .catch(err=>{
        res.status(400).json(err)
    })

});

server.delete('/:idParams',(req, res) => {
	const { idParams } = req.params;
	Category.destroy({where:{id:idParams}})
    .then(()=>{
        res.status(201).send('Categoria eliminada exitosamente')
    })
    .catch(err=>{
        res.status(400).json(err)
    })

});

server.put('/:idParams',(req, res) => {
	const { idParams } = req.params;
	const { name } =req.body;
	Category.update({name}, {where: {id:idParams}})
    .then(()=>{
        res.status(201).send('Modificado Correctamente la Categoria')
    })
    .catch(()=>{
        res.status(404).send('Hubo un error')
    })

});

module.exports = server;
