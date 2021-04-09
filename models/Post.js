//require sequelize, model, datatypes
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/config.js");

// //require all models
// const User = require('./User');
// const Post = require('./Post');
// const Tag = require('./Tag')
// const Band = require('./Band')
// const Category = require('./Category')

//extend model
class Post extends Model {}

Post.init(
     {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      body: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      user: {
        type: DataTypes.STRING,
        reference: {
          model: 'User',
          key: 'id',
        },
      },
      band: {
        type: DataTypes.STRING,
        reference: {
          model: 'Band',
          key: 'id',
        },
      },
    //   tag: {
    //     type: DataTypes.STRING,
    //     references: {
    //       model: 'Tag',
    //       key: 'id',
    //     },
    //   },
    //   category: {
    //     type: DataTypes.STRING,
    //     references: {
    //       model: 'Category',
    //       key: 'id',
    //     },
    //   },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: "Post",
    }
);

//Export all models
module.exports = Post;