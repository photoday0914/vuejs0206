const db = require("../models");
const config = require("../config/auth.config");
const nodemailer = require("../config/nodemailer.config");
const { user: User, refreshToken: RefreshToken } = db;
const url = require('url');  

// const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
// const { user } = require("../models");
// const bcrypt = require("bcryptjs");

module.exports = {
  signup (req, res){  
    //Generate token for confirmation code
    const token = jwt.sign({ email: req.body.email }, config.secret);  
    // Save User to Database
    User.create({
      name: req.body.name,
      email: req.body.email,
      photo: "http://localhost:3000/uploads/avatar1.png"
      // confirmation_code: token
      // follower: bcrypt.hashSync(req.body.password, 8)
    })
      .then(user => {      
          res.send({ message: "User registered successfully! Activate your account now." });
          nodemailer.sendConfirmationEmail(
            user.name,
            user.email,
            token
          );
          // res.redirect("/");    
      })
      .catch(err => {
          res.status(500).send({ message: err.message });
      });
  } ,
  
  signin (req, res){
    User.findOne({
      where: {
        email: req.body.email,
      }
    })    
      .then((user) => {
        if (user) {
           //Generate token for confirmation code
          const token = jwt.sign({ email: req.body.email }, config.secret); 
          nodemailer.sendConfirmationEmail(
            user.name,
            user.email,
            token
          );
          res.status(200).send({ message: 'Check your email inbox'});
          // if (user.is_active === true) {
          //   res.status(200).send({ message: 'Check your email inbox'});
          // } else {
          //   res.status(200).send({ message: 'Your account is not activated'});
          // }
        } else {
          res.status(404).send({ message: 'User not found'});
        }       
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
    });
  },

  signout(req, res){
  // delete refresh token here
  },
  
  verifyUser(req, res, next) {
    jwt.verify(req.params.confirmation_code, config.secret, (err, decoded) => {
      if (err) {
        return catchError(err, res);
      }
      console.log(decoded.email);
      User.findOne({
        where : {
          email: decoded.email
        }
      })
      .then(async (user) => {
        if (!user) {
          return res.status(404).send({ message: "Wrong confirm code. User Not found." });
        }
        user.is_active = 1;
        await user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
        });
  
        const token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: config.jwtExpiration
        });
  
        let refreshToken = await RefreshToken.createToken(user);
      
        res.status(200).send({
          id: user.id,
          name: user.name,
          email: user.email,
          bio: user.bio,
          photo: user.photo,
          accessToken: token,
          refreshToken: refreshToken,
        });
      });
      // res.redirect("/dashboard");   
      
    });  
    
  },
  
  async refreshToken(req, res){
    const { refreshToken: requestToken } = req.body;
  
    if (requestToken == null) {
      return res.status(403).json({ message: "Refresh Token is required!" });
    }
  
    try {
      let refreshToken = await RefreshToken.findOne({ where: { token: requestToken } });
  
      console.log(refreshToken)
  
      if (!refreshToken) {
        // res.redirect('http://localhost:8080/login')
        res.status(403).json({ message: "Refresh token is not in database!" });
        return;
      }
  
      if (RefreshToken.verifyExpiration(refreshToken)) {
        RefreshToken.destroy({ where: { id: refreshToken.id } });
        // res.redirect('http://localhost:8080/login')
        res.status(403).json({
          message: "Refresh token was expired. Please make a new signin request",
        });
        return;
      }
  
      let userId = await RefreshToken.getUserId(refreshToken.dataValues.token);
      let newAccessToken = jwt.sign({ id: userId }, config.secret, {
        expiresIn: config.jwtExpiration,
      });
  
      return res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: refreshToken.token,
      });
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  },

  async oauthSuccess(req, res) {
    
    await res.redirect(url.format({
      pathname:'http://localhost:8080/oauth-redirect',
      query: {
        id: req.info.user.id,
        name: req.info.user.name,
        email: req.info.user.email,
        bio:req.info.user.bio,
        photo: req.info.user.photo,
        accessToken: req.info.accessToken,
        refreshToken: req.info.refreshToken,
      }
    }));

    // await res.status(200).send({
    //   id: req.info.user.id,
    //   username: req.info.user.name,
    //   email: req.info.user.email,
    //   accessToken: req.info.accessToken,
    //   refreshToken: req.info.refreshToken,
    // });   
    
  }
}
