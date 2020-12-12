const server = require('express').Router();
const { Product, Category } = require('../db.js');
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

	Product.findAll({limit, offset, order, where})
		.then(products => {
			res.send(products);
		})
		.catch(next);
	});

server.get('/categoria/:nombreCat', (req, res) => {
	const {nombreCat} = req.params
	 Product.findAll({include: {
		model: Category, where: {
			name: nombreCat 
		}
	}})
	.then((products)=>{
		res.status(201).json(products)
	})
	.catch((err)=>{
		res.status(400).send(err)
	})
});
	
server.get('/search',(req,res) => {
	let  { value } =req.query;

	Product.findAll({
    where: {
		[Op.or]: [
		    { name: { [Op.substring]: value } },
		    { description: { [Op.substring]: value } },
		],
	  },
	})
	  .then((products) => {
		res.send(products);
	  })
	  .catch((err) => res.send(err));
	 });



server.get('/:id', (req, res)=>{
	const { id }  = req.params
 
	Product.findOne({where: {id}, include: Category})
	.then(product => {
		res.status(201).json(product)
	})
	.catch(err =>{
		res.status(404).json(err)
	})
 })



server.post('/:idProduct/category/:idCategory', async (req, res) => {
	const {idProduct, idCategory} = req.params;
	
	const product= await Product.findByPk(idProduct, {include:[Category]})
	const category= await Category.findByPk(idCategory)
	await product.addCategory(category)
	res.status(201).json(product)
	
});

server.post('/', (req,res)=>{

	const {name, description, image, price, stock} = req.body

	if(name && description && image && price && stock){
		Product.findOrCreate({where:{
			name, description, image, price, stock
		}})
	.then((obj) =>{
			res.status(201).json(obj)
		  })
	.catch(err=>{
			 
			  res.status(400).json(err)
	})

	}else{
		res.status(400).send('Faltan datos')
	}
		
})


server.delete('/:idProduct/category/:idCategory', async (req, res) => {
	const {idProduct, idCategory} = req.params;
	
	const product= await Product.findByPk(idProduct, {include:[Category]})
	const category= await Category.findByPk(idCategory)
	await product.removeCategory(category)
	res.status(201).json(product)
	
});

server.delete('/:idParams',(req, res) => {
	const { idParams } = req.params;

	Product.destroy({where:{id:idParams}})
    .then(()=>{
        res.status(200).send('Producto eliminado exitosamente')
    })
    .catch(err=>{
        res.status(400).json(err)
    })

});

server.put('/:id',(req,res)=>{
	const { id }= req.params
	const {name, description, image, price, stock } = req.body

	if(name && description && image && price && stock){
	
	    Product.update({name, description, image, price, stock},
		    {where: {id}})
  .then(()=>{
	  
	return Product.findOne({where: {id}})
	  .then(product => {
		  res.status(201).json(product)
	  })
	  .catch(err =>{
		  res.status(404).json(err)
	  })
   })
  
   
  }else{
	  res.status(400).send('Datos incorrectos')
  }
})




module.exports = server;

