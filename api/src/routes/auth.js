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
      const { id ,name, username, email, adress, photoURL, password } = user;
      if(!username || !email || !adress || !password || !name) return res.status(401).send('Faltan datos');
      return res.send(
        jwt.sign(
          {
            id,
            name,
            username,
            email,
            adress,
            photoURL,
            password,
          },
          SECRETO
        )
      );
    } catch (error) {
        if(error.parent){
            
            switch(error.parent.code){
                case "23505" : return res.status(400).send(error.parent.detail)
                default:return next(error.parent)
            }
        }else next(error)
    }
  });

  server.post("/promote/:id",  function (req , res , next) {
    try {
      if(req.user.isAdmin){
        let { id } = req.params;
        const promote = { isAdmin:true }
          User.update(promote,{where:{id}})
          .then(() => User.findByPk(id))
          .then(user => res.status(201).json(user))
      }else res.sendStatus(401);
    } catch (error) {
      next(error)
    } 
  })

server.post("/degrade/:id",  function (req , res , next) {
  try {
    if(req.user.isAdmin){
      let { id } = req.params;
      const degrade = { isAdmin:false }
        User.update(degrade,{where:{id}})
        .then(() => User.findByPk(id))
        .then(user => res.status(201).json(user))
    }else res.sendStatus(401);
  } catch (error) {
    next (error)
  }  
});

server.get('/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

server.get( '/googleCallback', function (req, res, next) {

  passport.authorize( 'google', function(err, user) {
    if(err) return next(err);
    if(!user) return next(err);
    const token = jwt.sign(user.toJSON(), SECRETO);
    res.redirect(`https://ecommerce-ft07-g02.vercel.app/?token=${token}`);
  })(req, res, next)
});
  
// /me -> get
// /login/google -> get
// /login/google/cb -> get

module.exports = server;