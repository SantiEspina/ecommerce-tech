const server = require('express').Router();
const { Review } = require('../db.js');
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

server.post('/',(req, res, next) => {
    try {
        if(req.user.isAdmin){
            const { commentary , rating } = req.body;
            Review.findOrCreate({where:{commentary,rating}})
            .then((review)=>{
                res.status(201).send(review)
            })
        }else res.sendStatus(401);
    } catch (error) {
        next (error)
    }
});

module.exports = server;