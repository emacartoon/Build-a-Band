//require all models
const User = require('./User');
const Post = require('./Post');
const Tag = require('./Tags')
const Band = require('./Band')
const Category = require('./Category')


//Export all models
module.exports = { User, Post, Tag, Band, Category };