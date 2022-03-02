module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comments", {      
      post_id: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      // comment_id: {
      //   type: Sequelize.INTEGER,
      //   defaultValue: 0
      // },
      user_id: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      content: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      lft: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      rgt: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      depth: {
          type: Sequelize.INTEGER,
          defaultValue: 0
      },
      clap_count : {
          type: Sequelize.INTEGER,
          defaultValue: 0
      },
      response_count: {
          type: Sequelize.INTEGER,
          defaultValue: 0
      }
    }, {
        createdAt: true,
        updatedAt: true
    });
  
    return Comment;
  };