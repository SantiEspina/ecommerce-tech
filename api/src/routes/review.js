const server = require('express').Router();
const { Review , Product , User} = require('../db.js');
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
        if(req.user){
            const { commentary , rating , idUser , idProduct } = req.body;
            if(idProduct && idUser && commentary && rating){
            }
            Review.create({
                commentary,
                rating,
                productId:idProduct,
                userId:idUser
            })
            .then((review)=>{
                res.status(201).send(review)
            })
        }else res.sendStatus(401);
    } catch (error) {
        next (error)
    } 
});

server.get("/:idProduct",(req , res, next ) => {
    let {idProduct} = req.params;
    Review.findAll({
        where:{
            productId:idProduct
        },
        include:[{model:User}]
    })
    .then(reviews => {
        res.status(200).json(reviews)
    })
    .catch(err => res.status(400).send(err))
})

server.put("/:idReview",(req , res , next) =>{
    try {
        if(req.user){
            let {idReview} = req.params;
            let { commentary , rating } = req.body;
            if(commentary && rating){
                Review.update({
                    commentary,
                    rating
                },
                {where:{id:idReview}
            })
            .then(review =>{
                res.status(200).send("Modification success!!")
            })
            }else {
               res.send("faltan datos") 
            }
            
        }else res.sendStatus(401);
    } catch (error) {
        next(error)
    }
})

server.delete("/:idReview" , (req , res , next ) => {
    try {
        if(req.user.isAdmin){
            let {idReview} = req.params;
            Review.destroy({
                where:{id:idReview}
            })
            .then(review => {
                res.status(200).send("Review deleted")
            })
        }else res.sendStatus(401);
    } catch (error) {
        next(error)
    }
})

server.get('/', (req, res, next) => {
    try{ 
        if(req.user.isAdmin){ 
            Review.findAll({include:[{model:Product},{model: User}]})
		    .then(review => {
			    res.send(review)
            })
        }else res.sendStatus(401);
        
     }catch (error) {
        next(error)
    }
});

server.get("/user/:idUser",(req , res, next ) => {
    let { idUser } = req.params;
    try{
        if(req.user) {
            Review.findAll({
                where: {
                    userId: idUser
                },
                include: [{ model: Product }]
            })
                .then(reviews => {
                    res.status(200).json(reviews)
                })
                .catch(err => res.status(400).send(err))
        }
    } catch (error) {
        next(error)
    }
})


module.exports = server;