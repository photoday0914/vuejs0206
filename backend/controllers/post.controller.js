//Create
const { post_hashtag, hashtag, post } = require("../models");
const db = require("../models");
const { refreshToken: RefreshToken, post: Post, hashtag:Hashtag, comment:Comment, user:User, post_hashtag:Post_hashtag, follow:Follow } = db;
const { Op } = require("sequelize");


manageHashtag = (postId, hashtags) => {
    //manage hashtags
    for (let item of hashtags)
    {
        let hashtagId;
        Hashtag.findOne({
            where: {
                hashtag: item
            }
        }).then(async (row1) => {
            if (!row1) {
                const row2 = await Hashtag.create({
                    hashtag: item
                })
                hashtagId = row2.id;                
            } else {
                hashtagId = row1.id;
            }
            await Post_hashtag.create({
                post_id: postId,
                hashtag_id: hashtagId
            })
        });        
    }
};

async function postsWithUserInfo(posts) {
    let buffer = new Array();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    for (var post of posts)
    {
        await User.findOne({ 
            where: {
                id : post.user_id
            }
        }).then((user) => {
            post.dataValues.name = user.name
            post.dataValues.photo = user.photo

            let dataBuffer = new Date(post.createdAt);
            let str = dataBuffer.getFullYear()+', '+ months[dataBuffer.getMonth()]+ ' '+ dataBuffer.getDay().toString();
            post.dataValues.date = str;
            buffer.push(post);
        }).catch(err => {
            return [];
        })
    }
    return buffer;
    // return 1;
};

module.exports = {
    getPostWithTag(req, res) {
        Post_hashtag.findAll({
            where: {
                hashtag_id: req.params.tagId
            }
        }).then(async (rows) => {
            let buffer = new Array();
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            for (var row of rows)
            {
                await Post.findOne({
                    where: {
                        id: row.post_id
                    }
                }).then(async (post) => {
                    if (post) {
                        await User.findOne({ 
                            where: {
                                id : post.user_id
                            }
                        }).then((user) => {
                            if (user) {
                                post.dataValues.name = user.name
                                post.dataValues.photo = user.photo
        
                                let dataBuffer = new Date(post.createdAt);
                                let str = months[dataBuffer.getMonth()]+ ' '+ dataBuffer.getDay().toString();
                                post.dataValues.date = str;
                                buffer.push(post);
                            }
                        });
                    }
                });               
            }
            res.status(200).send (buffer);  
        });     
    },

    getTrending(req, res) {
        Post.findAll({
            order: [['clap_count', 'DESC']],
            limit: 6
        }).then(async (posts) => {
            let buffer = new Array();
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            for (var post of posts)
            {
                await User.findOne({ 
                    where: {
                        id : post.user_id
                    }
                }).then((user) => {
                    if (user) {
                        post.dataValues.name = user.name
                        post.dataValues.photo = user.photo

                        let dataBuffer = new Date(post.createdAt);
                        let str = months[dataBuffer.getMonth()]+ ' '+ (dataBuffer.getDate()+1).toString();
                        post.dataValues.date = str;
                        buffer.push(post);
                    }
                })
            }
            res.status(200).send (buffer);  
        }).catch(err => {
            res.status(500).send({
                 err: err.message                 
                });
        })
    },

    getPostsWithOffset(req, res) {
        Post.findAll({
            order: [['clap_count', 'DESC']],
            offset: parseInt(req.params.offset),
            limit: 5,
            
        }).then(async (posts) => {
            let buffer = new Array();
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            for (var post of posts)
            {
                await User.findOne({ 
                    where: {
                        id : post.user_id
                    }
                }).then((user) => {
                    if (user) {
                        post.dataValues.name = user.name
                        post.dataValues.photo = user.photo

                        let dataBuffer = new Date(post.createdAt);
                        let str = dataBuffer.getFullYear()+', '+ months[dataBuffer.getMonth()]+ ' '+ dataBuffer.getDate().toString();
                        post.dataValues.date = str;
                        buffer.push(post);
                    }
                })
            }
            res.status(200).send (buffer);  
        }).catch(err => {
            res.status(500).send({
                 err: err.message                 
                });
        })
    },

    getPost(req, res) {
        Post.findOne({
            where:{
                id: req.params.postId
            }
        }).then(async (post) => {
            // let buffer = new Array();
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            
            await User.findOne({ 
                where: {
                    id : post.user_id
                }
            }).then((user) => {
                post.dataValues.name = user.name
                post.dataValues.photo = user.photo
                post.dataValues.bio = user.bio
                post.dataValues.follower_count = user.follower_count
                let dataBuffer = new Date(post.createdAt);
                let str = dataBuffer.getFullYear()+', '+ months[dataBuffer.getMonth()]+ ' '+ dataBuffer.getDay().toString();
                post.dataValues.date = str;
                
                // buffer.push(post);
            })
           
            res.status(200).send (post);  
        }).catch(err => {
            res.status(500).send({
                 err: err.message                 
                });
        })
    },

    getPosts(req, res) {
        Post.findAll({
            where:{
                user_id: req.params.userId
            }
        }).then(async (posts) => {
            let buffer = new Array();
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            for (var post of posts)
            {
                await User.findOne({ 
                    where: {
                        id : post.user_id
                    }
                }).then((user) => {
                    post.dataValues.name = user.name
                    post.dataValues.photo = user.photo

                    let dataBuffer = new Date(post.createdAt);
                    let str = dataBuffer.getFullYear()+' '+ months[dataBuffer.getMonth()]+ ' '+ dataBuffer.getDate().toString();
                    post.dataValues.date = str;
                    let pos = (post.dataValues.content.search("<img"));
                    if (pos > 200 || pos == -1) post.dataValues.brief = post.dataValues.content.substring(0, 200)
                    else  post.dataValues.brief = post.dataValues.content.substring(0, pos)
                    let temp = post.dataValues.content.substr(pos);
                    post.dataValues.imgUrl = temp.substr(10, temp.search("\">") - 10);
                    buffer.push(post);
                })
            }
            res.status(200).send (buffer);  
        }).catch(err => {
            res.status(500).send({
                 err: err.message                 
                });
        })
    },    

    postPost(req, res) {
        Post.create({
            user_id: req.params.userId,
            title: req.body.title,
            content: req.body.content   
        }
        ).then((post) => {
            // let buffer = new Array(req.body.hashtags);
            this.manageHashtag(post.id, req.body.hashtags);
            Comment.create({
                post_id: post.id,
                user_id: req.params.userId,
                lft: 1,
                rgt: 2,
                depth: 0,
                clap_count: 0,
                response_count: 0
            }).then(() => {
                res.status(200).send (post);  
            })            
        }).catch(err => {
            res.status(500).send({
                 err: err.message                 
                });
        })
    },

    updatePost(req, res) {
        Post.update(
            {
                title: req.body.title,
                content: req.body.content
            }, 
            {
                where: {
                    id: req.params.postId
                }
        }).then((post) => {
            Post_hashtag.destroy({
                where:{
                    post_id: req.params.postId
                }               
            }).then(() => {
                this.manageHashtag(req.params.postId, req.body.hashtags)
            });
            res.status(200).send(post);
        }).catch(err => {
            res.status(500).send({
                 err: err.message                 
                });
        });
    },

    deletePost(req, res) {
        Post.destroy({
            where: {
                id: req.params.postId
            }
        }
        ).then((err) => {
            Comment.destroy({
                where: {
                    post_id: req.params.postId
                }
            }).then((err) => {
                res.status(200).send ({
                    msg: "successfully deleted!"
                });  
            }).catch(err => {
                res.status(500).send({
                     err: err.message,
                     msg: "comment still not removed" 
                    });
            })
        })
    },
    /*
    post_id
    comment_id
    user_id
    depth
    */
    postResponse(req, res) {
        Comment.create({
            post_id: req.body.post_id,
            comment_id: req.body.comment_id,
            user_id: req.params.userId,
            depth: req.body.depth
        }).then((comment) => {
            res.status(200).send (comment);  
        }).catch(err => {
            res.status(500).send({
                 err: err.message                 
                });
        })
    },

    deleteResponse(req, res) {
        Comment.destroy({
            where: {
                id: req.body.id
            }
        }).then((err) => {
            res.status(200).send ({
                err_code: err
            });  
        }).catch(err => {
            res.status(500).send({
                 err: err.message                 
                });
        })
    },

    search(req, res) {
        switch(req.params.type){
            case '0':
                Post.findAll({
                    where: {                        
                        title:{
                            [Op.substring]: req.query.keyword
                        }
                    }
                }).then(async (posts) => {
                    if(posts){                         
                        await postsWithUserInfo(posts).then((data) => {
                            res.status(200).send (data);
                        });         
                    }                    
                });             
                break;
            case '1':
                User.findAll({
                    where: {                        
                        name:{
                            [Op.substring]: req.query.keyword
                        }
                    }
                }).then(async (users) => {
                    let buffer = new Array();
                    for (let user of users)
                    {
                        // if (req.params.userId == user.id) user.dataValues.isFollow = true;
                        // else {
                            await Follow.findOne({
                                where: {
                                    follower_id: req.params.userId,
                                    followed_id: user.id
                                }
                            }).then((follow) => {
                                if(follow) {
                                    user.dataValues.isFollow = true;
                                } else user.dataValues.isFollow = false;
                            }).catch(err => {
                                res.status(500).send({
                                    err: err.message                 
                                    });
                            })
                        // }
                        buffer.push(user);
                    }
                    if(users){
                        res.status(200).send (buffer);
                    }                    
                });             
                break;
            case '2':
                Hashtag.findAll({
                    where: {
                        hashtag: {
                            [Op.substring]: req.query.keyword
                        }
                    }
                }).then((hashtags) => {
                    if (hashtags) {
                        res.status(200).send(hashtags);
                    }
                });
                break;
        }
    },

    searchPost(req, res) {        
        post_hashtag.findAll(
        {
            where: {
                hashtag_id: req.query.hashtag_id
            }
        }).then(async (post_hashtags) => {
            let buffer = [];
            for (var i in post_hashtags)
            {
                await Post.findOne({
                    where: {
                        id: post_hashtags[i].post_id,
                        title:{
                            [Op.substring]: req.query.keyword
                        }
                    }
                }).then((post) => {
                    if(post){
                        buffer.push(post);
                    }                    
                })                
            }
            res.status(200).send ({
                results: buffer
            });  
        })
    }   
}