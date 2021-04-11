//require all models
const User = require('./User');
const Band = require('./Band');
const Post = require('./Post');
// const Tag = require('./Tags');
// const Category = require('./Category');

User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
});

Band.hasMany(Post, {
  foreignKey: "band_id",
  onDelete: "CASCADE",
});

Band.hasMany(User, {
  foreignKey: "band_id",
  onDelete: "CASCADE",
});

Post.belongsTo(Band, {
  foreignKey: "band_id",
});

  
//Export all models
module.exports = { User, Post, Band};