const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Task extends Model { }
  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for "title"'
        },
        notEmpty: {
          msg: 'Please provide a value for "title"'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please provide a value for "description"'
        },
        notEmpty: {
          msg: 'Please provide a value for "description"'
        }
      }
    },
    deadline: {
      type: DataTypes.STRING,
    }
  }, { sequelize });

  Task.associate = (models) => {  
    Task.belongsTo(models.User, {
      foreignKey: {
        fieldName: 'userId',
      }
    });
  }

  return Task;
}