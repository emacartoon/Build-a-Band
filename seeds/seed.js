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

  const categories = await User.bulkCreate(catData, {
    individualHooks: true,
    returning: true,
  });

  for (const user of catData) {
    await Category.create({
      ...category,
      category_id: category[Math.floor(Math.random() * category.length)].id,
    });
  }

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const project of projectData) {
    await Project.create({
      ...project,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
