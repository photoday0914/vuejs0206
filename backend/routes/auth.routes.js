const {verifySignUp, authJwt} = require("../middleware");
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const followController = require("../controllers/follow.controller");
const postController = require("../controllers/post.controller");
const clapController = require("../controllers/clap.controller");
const hashtagController = require("../controllers/hashtag.controller");
var passport = require('../config/passport.js');



module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //Auth APIs
  app.post("/api/auth/signup", verifySignUp.checkDuplicateUsernameOrEmail, authController.signup);
  app.get("/api/auth/confirm/:confirmation_code", authController.verifyUser)
  app.post("/api/auth/signin", authController.signin);
  app.post("/api/auth/refreshtoken", authController.refreshToken);
  app.post("/api/auth/signout", [authJwt.verifyToken], authController.signout);

  //Google Auth
  app.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
  app.get('/auth/google/callback', passport.authenticate('google'), authController.oauthSuccess);

  //User APIs
  // app.get("/api/users/me", userController.getMe);
  // app.put("/api/users/me", userController.putMe);

  app.get("/api/users/:userId", [authJwt.verifyToken], userController.getUser);
  app.put("/api/users/:userId", [authJwt.verifyToken], userController.putUser);
  app.delete("/api/users/:userId", [authJwt.verifyToken], userController.deleteUser);
  app.post('/api/users/avatar/:userId', userController.uploadAvatar);

  //Follow APIs
  app.post("/api/users/:id/follow", followController.followUser);
  app.get("/api/users/:id/followers", followController.getFollowers);  
  app.get("/api/users/:id/following", followController.getFollowing);
  app.delete("/api/users/:id/follow/:target_id", followController.deleteFollow);//check is id is user himself ???
  app.get("/api/users/:id/follow/:target_id", followController.getFollow);

 

  //Posts APIs
  app.post("/api/posts/:userId", postController.postPost);
  app.delete("/api/post/:postId", postController.deletePost);
  app.post('/api/post/update/:postId', postController.updatePost);
  app.post('/api/users/upload/:userId', userController.uploadImage);

  app.post("/api/posts/:userId/respond", postController.postResponse);
  app.delete("/api/posts/:userId/respond", postController.deleteResponse);
  app.get("/api/posts/trending", postController.getTrending);
  app.get("/api/posts/:offset", postController.getPosts);
  app.get("/api/myposts/:userId", postController.getMyPosts);
  app.get("/api/post/:postId", postController.getPost);
  //Search APIs- param:hashtag, keyword
  app.get("/api/users/:userId/search", postController.searchPost);

  //Claps APIs
  // app.get("/api/users/favorites/list", );
  app.get("/api/users/:userId/favorites/:postId", clapController.getClap);
  app.post("/api/users/:userId/favorites/create", clapController.createClap); //type = 1=>comment
  app.delete("/api/users/:userId/favorites/destroy", clapController.deleteClap); //type = 1=>comment

  //Hashtags APIs
  app.get("/api/hashtags/:postId", hashtagController.getHashtags);
  app.post("/api/hashtags/add", hashtagController.addHashtagToTable);
  app.delete("/api/hashtags/remove", hashtagController.removeHashtagFromTable);
  app.post("/api/posts/:userId/hashtag", hashtagController.addHashtagToPost);
  app.delete("/api/posts/:userId/hashtag", hashtagController.deleteHashtagFromPost);

  
};

