//require sequelize
const sequelize = require('../config/config');

//require models
const { Band, Post, User } = require('../models');

//phase 1 create users, bands, and posts 
const userData = require('./userSeeds.json');
const bandData = require('./bandSeeds.json');
const postData = require('./postSeeds.json');
// //phase 2 add category and post data
// const catData = require('./catSeeds.json');
// const tagData = require('./tagSeeds.json');
// //phase 3 have unique password validation for managing Band pages, as well as including location search parameters and a Google Map function
// const userBandData = require('./userBandSeeds.json');

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
  for (const post of postData) {
    await Post.create({
      ...post,
      user_id: bands[Math.floor(Math.random() * users.length)].id,
    });
  }

  //create bulk userbands data
  // const userbands = await UserBand.bulkCreate(userBandData, {
  //   individualHooks: true,
  //   returning: true,
  // });

process.exit(0);
};

//invoke seedDatabase function
seedDatabase();

//export created data
// module.exports = users, bands, posts, userbands;