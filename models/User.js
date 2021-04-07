//require all models
const User = require('./User');
const Post = require('./Post');
const Tag = require('./Tags')
const Band = require('./Band')
const Category = require('./Category')

const { Model, DataTypes, INTEGER } = require("sequelize");
const sequelize = require("../config/config.js");
class Bandmember extends Model {}

Bandmember.init(
     {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      Bandmember_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Bandmember_email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
      },
       Bandmember_password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8],
        },
      },
      Bandmember_talent: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: "bandmember",
    }

);


//Export all models
module.exports = { User, Post, Tag, Band, Category };

