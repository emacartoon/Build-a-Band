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
class Category extends Model {}

Category.init(
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
    tag: {
      type: DataTypes.STRING,
      references: {
        model: 'Tag',
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