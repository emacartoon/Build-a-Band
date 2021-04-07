const User = require('./User');
const Post = require('./Post');
const Tag = require('./Tags')
const Band = require('./Band')
const Category = require('./Category')

//Define User relations
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Tag, {
  foreignKey: 'user_id',
});
  
Tag.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Band, {
  foreignKey: 'user_id',
});
  
Band.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Category, {
  foreignKey: 'user_id',
});
    
Category.belongsTo(User, {
  foreignKey: 'user_id'
});
  
  

module.exports = { User, Post, Tag, Band, Category };