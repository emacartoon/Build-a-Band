const User = require('./User');
const Post = require('./Post');
const Tag = require('./Tags')
const Band = require('./Band')
const Category = require('./Category')

//Define User model relations
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

//Create Band model relations
Band.hasMany(User, {
  foreignKey: 'band_id',
});
  
User.belongsTo(Band, {
  foreignKey: 'band_id'
});

Band.hasMany(Post, {
  foreignKey: 'band_id',
  onDelete: 'CASCADE',
});
      
Post.belongsTo(Band, {
  foreignKey: 'band_id'
});

Band.hasMany(Tag, {
  foreignKey: 'band_id',
});
    
Tag.belongsTo(Band, {
  foreignKey: 'band_id'
});

Band.hasMany(Category, {
  foreignKey: 'band_id',
});
      
Category.belongsTo(Band, {
  foreignKey: 'band_id'
});

//Create Category model relations
Category.hasMany(User, {
    foreignKey: 'category_id',
  });
    
  User.belongsTo(Category, {
    foreignKey: 'category_id'
  });
  
  Category.hasMany(Post, {
    foreignKey: 'category_id',
    onDelete: 'CASCADE',
  });
        
  Post.belongsTo(Category, {
    foreignKey: 'category_id'
  });
  
  Category.hasMany(Tag, {
    foreignKey: 'category_id',
  });
      
  Tag.belongsTo(Category, {
    foreignKey: 'category_id'
  });
  


  

module.exports = { User, Post, Tag, Band, Category };