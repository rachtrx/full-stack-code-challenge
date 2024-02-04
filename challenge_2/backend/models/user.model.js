module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
        tableName: 'user',
        timestamps: false, // Disable 'createdAt' and 'updatedAt'
    });
  
    return User;
  };