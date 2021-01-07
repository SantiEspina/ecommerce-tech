const server = require('express').Router();
const { User } = require('../db.js');
const passport = require('passport');
const jwt = require("jsonwebtoken");

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
// /login -> post S63 ruta POST/auth/login

server.post("/login",function (req, res, next){
  passport.authenticate("local",function (err,user){
    if(err) return next (err);
    else if (!user) return  res.sendStatus(401);
    else return res.send(jwt.sign(user,"secreto")) 
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
          "secreto"
        )
      );
    } catch (error) {
      res.sendStatus(500).send(error);
    }
  });




// /me -> get
// /login/google -> get
// /login/google/cb -> get

module.exports = server;