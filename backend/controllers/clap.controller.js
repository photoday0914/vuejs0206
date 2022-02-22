const db = require("../models");
const { refreshToken: RefreshToken, post: Post, comment:Comment, clap:Clap } = db;

/*
    GET /api/users/favorites/list
	POST /api/users/favorites/create
	POST /api/users/favorites/destroy
*/
module.exports = {  
    createClap(req, res) {
        Clap.create({            
            post_id: req.body.post_id,
            user_id: req.params.userId,
            is_response: req.body.is_response            
        })
        .then((err) => {
            if (req.body.is_response == 0) {
                Post.findOne({
                    where: {
                        id: req.body.post_id
                    }
                }).then((post) => {
                    Post.update({
                        clap_count: post.clap_count + 1
                    },
                    {
                        where:{
                            id: post.id
                        }
                    })
                })
            } else if (req.body.is_response == 1){
                Comment.findOne({
                    where: {
                        id: req.body.post_id
                    }
                }).then((comment) => {
                    Comment.update({
                        clap_count: comment.clap_count + 1
                    },
                    {
                        where:{
                            id: comment.id
                        }
                    })
                })
            }            
            res.status(200).send ({
                msg: "ok"
            });
        })
    },

    getClap(req, res) {
        Clap.findOne({
            where: {
                post_id: req.params.postId,
                user_id: req.params.userId,
            }
        }).then((clap) => {
            if (clap) {
                res.status(200).send(
                    {
                        msg:"exist"
                    });
            }
        })
    },

    //Clap_id = body parameter id
    deleteClap(req, res) {
        Clap.destroy({
            where: {
                id: req.body.id
            }
        })
        .then((err) => {
            if (req.body.is_response == 0) {
                Post.findOne({
                    where: {
                        id: req.body.post_id
                    }
                }).then((post) => {
                    if (post.clap_count > 0){
                        Post.update({
                            clap_count: post.clap_count - 1
                        },
                        {
                            where:{
                                id: post.id
                            }
                        })
                    }                    
                })
            } else if (req.body.is_response == 1){
                Comment.findOne({
                    where: {
                        id: req.body.post_id
                    }
                }).then((comment) => {
                    if (comment.clap_count > 0){
                        Comment.update({
                            clap_count: comment.clap_count - 1
                        },
                        {
                            where:{
                                id: comment.id
                            }
                        })
                    }
                })
            }            
            res.status(200).send ({
                msg: "clap deleted!"
            });
        })
    },

    getFavorites(req, res) {

    }
}