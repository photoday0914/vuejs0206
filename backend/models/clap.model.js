module.exports = (sequelize, Sequelize) => {
    const Clap = sequelize.define("claps", {      
      post_id: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      user_id: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      is_response: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }
    }, {
        createdAt: true,
        updatedAt: true
    });
  
    return Clap;
  };