//require sequelize, model, datatypes
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/config.js");

//require all models
const User = require('./User');
const Post = require('./Post');
const Tag = require('./Tag')
const Band = require('./Band')
const Category = require('./Category')

//extend model
class User extends Model {}

User.init(
     {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
      },
       password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8],
        },
      },
      post:{
        type: DataTypes.STRING,
        reference: {
          model: 'Post',
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
      tag: {
        type: DataTypes.STRING,
        references: {
          model: 'Tag',
          key: 'id',
        },
      },
      category: {
        type: DataTypes.STRING,
        references: {
          model: 'Category',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: "User",
    }
);


//Export all models
module.exports = { User, Post, Tag, Band, Category };

