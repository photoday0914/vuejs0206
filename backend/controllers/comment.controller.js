const { comment } = require("../models");
const db = require("../models");
const { user:User,post: Post, comment:Comment } = db;
const { Op } = require("sequelize");

module.exports = {
    async createComment(req, res) {

        let parentLft = 0;
        // let parentDep = 0;
        if (req.body.parentId == 0) parentLft = 1;
        else {
            await Comment.findOne({
                where: {
                    id: req.body.parentId,
                }
            }).then((row) => {
                parentLft = row.dataValues.lft;
                // parentDep = row.dataValues.dep + 1;
               
            }).catch(err => {
                res.status(500).send({
                     err: err.message                 
                    });
            });
        }
       
        await Comment.increment(
            ['rgt'], 
            {
                by: 2, 
                where: {
                    rgt:{
                        [Op.gt]: parentLft
                    }
                }
            }
        );

        await Comment.increment(
            ['lft'], 
            {
                by: 2, 
                where: {
                    lft:{
                        [Op.gt]: parentLft
                    }
                }
            }
        );    

        await Comment.create({
            post_id: req.params.postId,            
            user_id: req.body.userId,
            content: req.body.content,
            depth: req.body.depth + 1,
            lft: parentLft + 1,
            rgt: parentLft + 2
        }).then((row) => {
            if (req.body.parentId == 0)
            {
                Post.update({
                    response_count: req.body.response_count + 1},
                    {
                        where: {
                            id: req.params.postId
                        }
                    }
                )
            }
            
            User.findOne({
                where: {
                    id: row.dataValues.user_id
                }
            }).then((row2) => {
                const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                let dataBuffer = new Date(row.createdAt);
                let str = months[dataBuffer.getMonth()]+ ' '+ dataBuffer.getDay().toString();
                
                const buffer = {
                    comment: row.dataValues,
                    user: row2.dataValues,
                    date: str
                }
                res.status(200).send({
                    msg:"ok",
                    data: buffer
                });
                
            });                
            
        });

        
    },
     async getComments(req, res) {
        
        
        Comment.findAll({
            where: {
                post_id: req.params.postId,
                lft:{
                    [Op.gt]: 1
                }
            },
            order: [['lft', 'ASC']]
        }).then(async (rows) => {
            let data = new Array();
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            if (rows) {
                for (let row of rows)
                {
                    await User.findOne({
                        where: {
                            id: row.dataValues.user_id
                        }
                    }).then((row2) => {
                        let dataBuffer = new Date(row.createdAt);
                        let str = months[dataBuffer.getMonth()]+ ' '+ dataBuffer.getDay().toString();
                        
                        const buffer = {
                            comment: row.dataValues,
                            user: row2.dataValues,
                            date: str
                        }
                        data.push(buffer);
                    }).catch(err => {
                        res.status(500).send({
                             err: err.message                 
                            });
                    });                    
                }
            }
            res.status(200).send({
                msg: "ok",
                data: data
            });
        });
     }
}