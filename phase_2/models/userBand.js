//require sequelize, datatypes
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/config.js");

//require users and bands
const User = require('../../models/User');
const Band = require('../../models/Band')
const UserBand = sequelize.define('UserBands', {
    BandId: {
    type: DataTypes.INTEGER,
    references:{ model: Band, key: 'id',}},

    UserID: {
    type: DataTypes.INTEGER,
    references: { model: User, key: 'id',}}});

//Export all models
module.exports = { User, Band, UserBand };