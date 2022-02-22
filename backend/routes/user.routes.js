var express = require('express');



// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
module.exports = function(app) {
    app.get('/', function(req,res){
            res.render('main', {user: req.user});
    });
}

