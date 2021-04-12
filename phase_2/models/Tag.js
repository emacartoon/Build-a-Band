//require sequelize, model, datatypes
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/config.js.js");

//require all models
const User = require('./User');
const Post = require('./Post');
const Tag = require('./Tag')
const Band = require('./Band')
const Category = require('./Category')

//extend model
class Tag extends Model {}

Tag.init(
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
      modelName: "Tag",
    }
);

//Export all models
module.exports = { User, Post, Tag, Band, Category };