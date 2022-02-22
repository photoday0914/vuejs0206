module.exports = (sequelize, Sequelize) => {
    const Post_hashtag = sequelize.define("post_hashtags", {      
      post_id: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      hashtag_id: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }
    }, {
        createdAt: true,
        updatedAt: true
    });
  
    return Post_hashtag;
  };