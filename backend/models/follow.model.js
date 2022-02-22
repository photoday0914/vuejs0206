module.exports = (sequelize, Sequelize) => {
    const Follow = sequelize.define("follows", {      
      follower_id: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      followed_id: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      following: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }     
    }, {
        createdAt: true,
        updatedAt: true
    });
  
    return Follow;
  };