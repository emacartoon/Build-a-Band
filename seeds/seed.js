//require sequelize
const sequelize = require('../config/config');

//require models
const { Band, Category, Post, Tag, User, UserBand } = require('../models');

//phase 1 create users, bands, and posts
//phase 2 add category and post data
const bandData = require('./bandSeeds.json');
const catData = require('./catSeeds.json');
const postData = require('./postSeeds.json');
const tagData = require('./tagSeeds.json');
const userBandData = require('./userBandSeeds.json');
const userData = require('./userSeeds.json');

//declare seedDatabase function
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  //create bulk user data
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  //create bulk band data
    const bands = await Band.bulkCreate(bandData, {
    individualHooks: true,
    returning: true,
  });

  //create bulk post data
  const posts = await Post.bulkCreate(postData, {
    individualHooks: true,
    returning: true,
  });

  //create bulk userbands data
  const userbands = await UserBand.bulkCreate(userBandData, {
    individualHooks: true,
    returning: true,
  });

process.exit(0);
};

//invoke seedDatabase function
seedDatabase();

//export created data
module.exports = users, bands, posts, userbands;