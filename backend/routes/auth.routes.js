const {verifySignUp, authJwt} = require("../middleware");
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const followController = require("../controllers/follow.controller");
const postController = require("../controllers/post.controller");
const clapController = require("../controllers/clap.controller");
const hashtagController = require("../controllers/hashtag.controller");
const commentController = require("../controllers/comment.controller");
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
  app.get("/api/users/me", [authJwt.verifyToken], userController.getMe);
  app.get("/api/users/:userId", [authJwt.verifyToken], userController.getUser);
  
  app.put("/api/users/:userId", [authJwt.verifyToken], userController.putUser);
  app.delete("/api/users/:userId", [authJwt.verifyToken], userController.deleteUser);
  app.post('/api/users/avatar/:userId',[authJwt.verifyToken], userController.uploadAvatar);

  //Follow APIs
  app.post("/api/users/:id/follow", [authJwt.verifyToken], followController.followUser);
  app.get("/api/users/:id/followers", [authJwt.verifyToken], followController.getFollowers);  
  app.get("/api/users/:id/following", [authJwt.verifyToken], followController.getFollowing);
  app.delete("/api/users/:id/follow/:target_id", [authJwt.verifyToken], followController.deleteFollow);//check is id is user himself ???
  app.get("/api/users/:id/follow/:target_id", [authJwt.verifyToken], followController.getFollow);

 

  //Posts APIs
  app.post("/api/posts/:userId", [authJwt.verifyToken], postController.postPost);
  app.delete("/api/post/:postId", [authJwt.verifyToken], postController.deletePost);
  app.post('/api/post/update/:postId', [authJwt.verifyToken], postController.updatePost);
  app.post('/api/users/upload/:userId', [authJwt.verifyToken], userController.uploadImage);

  app.post("/api/posts/:userId/respond", [authJwt.verifyToken], postController.postResponse);
  app.delete("/api/posts/:userId/respond", [authJwt.verifyToken], postController.deleteResponse);

  app.get("/api/posts/trending", [authJwt.verifyToken], postController.getTrending);
  app.get("/api/posts/offset/:offset", [authJwt.verifyToken], postController.getPostsWithOffset);
  app.get("/api/posts/:userId", [authJwt.verifyToken], postController.getPosts);
  app.get("/api/post/:postId", [authJwt.verifyToken], postController.getPost);
  app.get("/api/post/hashtag/:tagId", [authJwt.verifyToken], postController.getPostWithTag);

  //Search APIs- param:hashtag, keyword
  app.get("/api/users/:userId/search", [authJwt.verifyToken], postController.searchPost);
  app.get("/api/search/:userId/:type", [authJwt.verifyToken], postController.search);

  //Claps APIs
  // app.get("/api/users/favorites/list", );
  app.get("/api/users/:userId/favorites/:postId", [authJwt.verifyToken], clapController.getClap);
  app.post("/api/users/:userId/favorites/create", [authJwt.verifyToken], clapController.createClap); //type = 1=>comment
  app.delete("/api/users/:userId/favorites/destroy", [authJwt.verifyToken], clapController.deleteClap); //type = 1=>comment

  //Hashtags APIs
  app.get("/api/hashtags/recommended", [authJwt.verifyToken], hashtagController.getRecommendedTags);
  app.get("/api/hashtags/post/:postId", [authJwt.verifyToken], hashtagController.getHashtags);

  // app.post("/api/hashtags/add", hashtagController.addHashtagToTable);
  // app.delete("/api/hashtags/remove", hashtagController.removeHashtagFromTable);
  // app.post("/api/posts/:userId/hashtag", hashtagController.addHashtagToPost);
  // app.delete("/api/posts/:userId/hashtag", hashtagController.deleteHashtagFromPost);

  //Comment APIs
  app.post("/api/comment/:postId", [authJwt.verifyToken],  commentController.createComment);
  app.get("/api/comment/:postId", [authJwt.verifyToken], commentController.getComments);

  
};

