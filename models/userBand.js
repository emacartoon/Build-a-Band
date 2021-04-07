//require sequelize, datatypes
const { DataTypes } = require("sequelize");
const sequelize = require("../config/config.js");

//require users and bands
const Band = sequelize.define('Band', {name: DataTypes.STRING});
const User = sequelize.define('User', {name: DataTypes.STRING});
const UserBand = sequelize.define('UserBands', {
    BandId: {
    type: DataTypes.INTEGER,
    references:{ model: Band, key: 'id',}},

    UserID: {
    type: DataTypes.INTEGER,
    references: { model: User, key: 'id',}}});

//define relationships
Band.belongsToMany(User, {through: UserBands});
User.belongsToMany(Band, {through: UserBands});

//Export all models
module.exports = { User, Band, UserBand };