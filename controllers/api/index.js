const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const bandRoutes = require('./bandRoutes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/bands', bandRoutes);

module.exports = router;
