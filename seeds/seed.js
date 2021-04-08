//sequelize and models
const sequelize = require('../config/config');
const { Band, Category, Post, Tag, User, UserBand } = require('../models');

const bandData = require('./bandSeeds.json');
const catData = require('./catSeeds.json');
const postData = require('./postSeeds.json');
const tagData = require('./tagSeeds.json');
const userBandData = require('./userBandSeeds.json');
const userData = require('./userSeeds.json');

//figure this out, Dan
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

    const bands = await Band.bulkCreate(bandData, {
    individualHooks: true,
    returning: true,
  });


  const posts = await Post.bulkCreate(postData, {
    individualHooks: true,
    returning: true,
  });

process.exit(0);
};

seedDatabase();
