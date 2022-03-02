//Create
// const { user } = require("../config/auth.config");
const config = require("../config/auth.config.js");
const db = require("../models");
const { user: User, refreshToken: RefreshToken, follow: Follow } = db;

const upload = require("./core/upload");

module.exports = {    
    
    getUser (req, res) {
        User.findOne({
            where : {
                id : req.params.userId
            }
        })
        .then((user) => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }
            res.status(200).send(user);  
        }).catch ((err) => {
            return res.status(500).send({ message: err });
        });
    },

    getMe(req, res) {
        User.findOne({
            where : {
                id : req.userId
            }
        })
        .then((user) => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
              }
            res.status(200).send(user);  
        }).catch ((err) => {
            return res.status(500).send({ message: err });
          });
    },
    
    putUser (req, res) {
        User.update(req.body, {
            where: {
                id: req.params.userId
            }
        })
        .then ((err) => {
            // User.findOne (

            // );
            res.status(200).send ({
                msg: "successfully updated" ,
                content: req.body          
            });  
        })
    },

    deleteUser (req, res) {
        User.destroy({
            where: {
                id: req.params.userId
            }
        })
        .then ((err) => {
            res.status(200).send({
                msg: "successfully deleted"                
              });  
        })
    },

    uploadAvatar(req, res){
        upload.uploadAvatar(req, res);
    },

    uploadImage(req, res){
        upload.uploadFile(req, res);
    },

  
}