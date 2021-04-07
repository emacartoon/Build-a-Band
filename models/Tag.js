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
class Tag extends Model {}

Tag.init(
     {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      Tag_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Tag_email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
      },
       Tag_password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8],
        },
      },
      Tag_talent: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
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