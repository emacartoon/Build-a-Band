//require sequelize, model, datatypes
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/config.js");

//require all models
const User = require('./User');
const Post = require('./Post');
const Tag = require('./Tag')
const Band = require('./Band')
const Category = require('./Category')

//Extend Model
class Post extends Model {}

Post.init(
     {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      Post_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Post_email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
      },
       Post_password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8],
        },
      },
      Post_talent: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
      },
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
module.exports = { User, Post, Tag, Band, Category };