//require sequelize, model, datatypes
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/config.js");

// //require all models
// const User = require('./User');
// const Post = require('./Post');
// const Tag = require('./Tag')
// const Band = require('./Band')
// const Category = require('./Category');

//extend model
class Band extends Model { }

Band.init(
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
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    website: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    // user: {
    //     type: DataTypes.STRING,
    //     references: {
    //       model: 'UserBand',
    //       key: 'id',
    //     },
    // },
    post: {
      type: DataTypes.STRING,
      reference: {
        model: 'Post',
        key: 'id',
      },
    },
    // tag: {
    //   type: DataTypes.STRING,
    //   references: {
    //     model: 'Tag',
    //     key: 'id',
    //   },
    // },
    // category: {
    //   type: DataTypes.STRING,
    //   references: {
    //     model: 'Category',
    //     key: 'id',
    //   },
    // },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Band",
  }
);

//Export all models
module.exports = Band;