const server = require('express').Router();
const { User } = require('../db.js');
const passport = require('passport');
const jwt = require("jsonwebtoken");
const {
  SECRETO
} = process.env;

server.get("/me", async (req, res, next) => {
  try {
    if (req.user) {
      const { id } = req.user;
      const result = await User.findByPk(id);
      res.json(result);
    } else res.sendStatus(401);
  } catch (error) {
    next(error);
  }
});

server.post("/login",function (req, res, next){
  passport.authenticate("local",function (err,user){
    if(err) return next (err);
    else if (!user) return  res.sendStatus(401);
    else return res.send(jwt.sign(user,SECRETO)) 
  })(req, res, next)
});

server.post("/register", async function (req, res, next) {
    try {
      const user = await User.create(req.body);
      const { id ,name, username, email, adress, photoURL, isAdmin, password } = user;
      return res.send(
        jwt.sign(
          {
            id,
            name,
            username,
            email,
            adress,
            photoURL,
            isAdmin,
            password,
          },
          SECRETO
        )
      );
    } catch (error) {
      res.sendStatus(500).send(error);
    }
  });

  server.post("/promote/:id",  function (req , res , next) {
    let { id } = req.params;
    //const promote = { isAdmin:true }
      User.update(req.body,{where:{id}})
      .then(() => User.findByPk(id))
      .then(user => res.status(201).json(user))
      .catch(err => res.status(400).send(err))
      
   })
     
  
// /me -> get
// /login/google -> get
// /login/google/cb -> get

module.exports = server;