module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("posts", {      
      user_id: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      title: {
        type: Sequelize.STRING,
        defaultValue: 0
      },
      content: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      clap_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      response_count: {
          type: Sequelize.INTEGER,
          defaultValue: 0
      },
    }, {
        createdAt: true,
        updatedAt: true
    });
  
    return Post;
  };