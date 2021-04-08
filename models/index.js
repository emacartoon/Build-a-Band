//require all models
const User = require('./User');
const Post = require('./Post');
const Tag = require('./Tags');
const Band = require('./Band');
const Category = require('./Category');

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

User.hasMany(Category, {
  foreignKey: 'user_id',
});
    
Category.belongsTo(User, {
  foreignKey: 'user_id'
});

//Create Post model relations
Post.hasOne(User, {
    foreignKey: 'post_id',
  });
    
  User.belongsTo(Post, {
    foreignKey: 'post_id'
  });

  Post.hasOne(Band, {
    foreignKey: 'post_id',
  });
    
  Band.belongsTo(Post, {
    foreignKey: 'post_id'
  });
  
  Post.hasMany(Category, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
  });
        
  Category.belongsTo(Post, {
    foreignKey: 'post_id'
  });
  
  Post.hasMany(Tag, {
    foreignKey: 'post_id',
  });
      
  Tag.belongsTo(Post, {
    foreignKey: 'post_id'
  });

//Create Tag model relations
Tag.hasMany(User, {
    foreignKey: 'tag_id',
  });
    
  User.belongsTo(Tag, {
    foreignKey: 'tag_id'
  });
  
  Tag.hasMany(Post, {
    foreignKey: 'tag_id',
    onDelete: 'CASCADE',
  });
        
  Post.belongsTo(Tag, {
    foreignKey: 'tag_id'
  });
  
  Tag.hasMany(Category, {
    foreignKey: 'tag_id',
  });
      
  Category.belongsTo(Tag, {
    foreignKey: 'tag_id'
  });
  
//Create Band model relations
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
  
//Export all models
module.exports = { User, Post, Band};