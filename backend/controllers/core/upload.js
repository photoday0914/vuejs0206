const multer = require("multer");
const path = require('path');
const db = require("../../models");
const { user: User} = db;

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('image');

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}


module.exports = {
  uploadAvatar(req, res) {
    const data = upload(req, res, (err) => {
      if(err){
        res.render('index', {
          msg: err
        });
      } else {
        if(req.file == undefined){
          res.render('index', {
            msg: 'Error: No File Selected!'
          });
        } else {
          User.update(
            {
              photo: 'http://localhost:3000/uploads/'.concat(req.file.filename)
            }, 
            {
              where: {
                  id: req.params.userId
              }
            }).then ((err) => {            
            res.status(200).send ({              
              photo: 'http://localhost:3000/uploads/'.concat(req.file.filename)
            });  
          })
          // res.status(200).send ({
          // msg: "File uploaded!"
          // });  
        }
      }
    });
   
  },

  uploadFile(req, res) {
    const data = upload(req, res, (err) => {
      if(err){
        res.render('index', {
          msg: err
        });
      } else {
        if(req.file == undefined){
          res.render('index', {
            msg: 'Error: No File Selected!'
          });
        } else {         
          res.status(200).send ({              
            photo: 'http://localhost:3000/uploads/'.concat(req.file.filename)
          });       
        
        }
      }
    });
   
  }
}
