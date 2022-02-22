module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {      
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      // confirmation_code: {
      //   type: Sequelize.STRING(255),
      //   defaultValue: null        
      // },
      follower_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      photo: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      bio: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      role: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      social_notification: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }, 
      is_active: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }     
    }, {
        createdAt: true,
        updatedAt: true
    });
  
    return User;
  };