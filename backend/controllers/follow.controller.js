//Create
const { response } = require("express");
const { user } = require("../config/auth.config");
const db = require("../models");
const { user: User, refreshToken: RefreshToken, follow: Follow } = db;

module.exports = {
    getFollowers(req, res) {
        Follow.findAll({
            where: {
                follower_id: req.params.id
            }
        })
        .then ((users) => {
            res.status(200).send (users);  
        });
    },

    getFollowing(req, res) {
        Follow.findAll({
            where: {
                followed_id: req.params.id
            }
        })
        .then (async (users) => {
            let userinfos = new Array();
            for (let user of users){
                await User.findOne({
                    where: {
                        id: user.dataValues.id
                    }
                }).then (userinfo => {
                    userinfos.push(userinfo.dataValues);
                })
                
            }
            res.status(200).send (userinfos);
        });
    },

    getFollow(req, res) {
        Follow.findOne({
            where: {
                follower_id: req.params.id,
                followed_id: req.params.target_id
            }
        }).then((follow) => {
            if(follow) {
                res.status(200).send({
                    msg:'exist'
                }) 
            }            
        }).catch(err => {
            res.status(500).send({
                 err: err.message                 
                });
        })
    },

    deleteFollow(req, res) {
        Follow.update({
                following: 0
            },
            {
                where: {
                    follower_id: req.params.id,
                    followed_id: req.params.target_id
                }
            }
        ).then((err) => {
            User.findOne({
                where: {
                    id: req.params.target_id
                }
            })
            .then((user) => {
                User.update(
                    {
                        follower_count: user.follower_count - 1
                    },
                    {
                        where: {
                            id: req.params.target_id
                        }
                    }
                )
            })
            
            res.status(200).send ({
                msg:"succesfully delete follow"
            });
        })
    },

    followUser(req, res) {
        Follow.findOne({
            where: {
                follower_id: req.params.id,
                followed_id: req.body.followed_id                
            }
        })
        .then ((user) => {
            if (!user) {
                Follow.create({
                    follower_id: req.params.id, 
                    followed_id: req.body.id,
                    following: 1
                })
                .then((user) => {
                    User.findOne({
                        where: {
                            id: req.body.id
                        }
                    })
                    .then((user) => {
                        User.update(
                            {
                                follower_count: user.follower_count + 1
                            },
                            {
                                where: {
                                    id: req.params.target_id
                                }
                            }
                        ).then(() => {
                            res.status(200).send ({
                                msg: "ok"                    
                            });  
                        })
                    })
                })
            } else {
                res.status(200).send ({
                    msg: "already followed"                    
                });  
            }
        }) 
    },
   
}