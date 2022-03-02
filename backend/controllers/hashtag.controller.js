const db = require("../models");
const { refreshToken: RefreshToken, post: Post, comment:Comment, clap:Clap, hashtag:Hashtag, post_hashtag:Post_hashtag } = db;

/*
    POST /api/hashtags
	DELETE /api/hashtags 
*/

module.exports = { 
    addHashtagToTable(req, res) {
        Hashtag.create(req.body)
        .then((err) => {
            res.status(200).send ({
                msg: "hashtag added!"
            });
        }).catch(err => {
            res.status(500).send({
                 err: err.message,
            });
        })
    },

    //hashtag_id = req body parameter id
    removeHashtagFromTable(req, res) {
        Hashtag.destroy({
            where: {
                id: req.body.id
            }
        }).then((err) => {
            Post_hashtag.destroy({
                where: {
                    hashtag_id: req.body.id
                }
            }).then((err) => {
                res.status(200).send ({
                    msg: "hashtag deleted!"
                });
            })           
        }).catch(err => {
            res.status(500).send({
                 err: err.message,
            });
        })
    },

    addHashtagToPost(req, res) {
        Post_hashtag.create(req.body)
        .then((err) => {
            res.status(200).send ({
                msg: "post_hashtag added!"
            });
        }).catch(err => {
            res.status(500).send({
                 err: err.message,
            });
        })
    },

    deleteHashtagFromPost(req, res) {
        Post_hashtag.destroy({
            where: {
                id: req.body.id
            }
        })
        .then((err) => {
            res.status(200).send ({
                msg: "post_hashtag removed!"
            });
        }).catch(err => {
            res.status(500).send({
                 err: err.message,
            });
        })
    },

    getHashtags(req, res) {
        Post_hashtag.findAll({
            where: {
                post_id: req.params.postId
            }
        }).then(async (rows) => {
            let buffer = new Array();
            for(let row of rows) {
                await Hashtag.findOne({
                    where: {
                        id: row.dataValues.hashtag_id
                    }
                }).then((row2) => {
                    if (row2) buffer.push(row2.dataValues.hashtag);
                })
            }
            res.status(200).send(buffer);
        })
    },

    getRecommendedTags(req, res) {
        console.log(req);
        Hashtag.findAll({   
            // where:{
            //     id:req.params.postId
            // },        
            limit: 5,
        }).then((rows) => {
            res.status(200).send(rows);
        })
    }
}