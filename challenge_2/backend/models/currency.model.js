module.exports = (sequelize, DataTypes) => {
    const Currency = sequelize.define('currency', {
      base: {
        type: DataTypes.STRING,
        allowNull: false
      },
      counter: {
        type: DataTypes.STRING,
        allowNull: false
      },
      rate: {
        type: DataTypes.FLOAT,
        allowNull: false
      }
    }, {
      tableName: 'currency',
      timestamps: false, // Disable 'createdAt' and 'updatedAt'
    });
  
    return Currency;
  };
  