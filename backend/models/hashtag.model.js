module.exports = (sequelize, Sequelize) => {
    const Hashtag = sequelize.define("hashtags", {      
      hashtag: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      description: {
        type: Sequelize.STRING,
        defaultValue: null
      }
    }, {
        createdAt: true,
        updatedAt: true
    });
  
    return Hashtag;
  };