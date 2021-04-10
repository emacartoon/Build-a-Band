const router = require('express').Router();
const { User, Post, Band  } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {

    res.render('home', { 
      logged_in: req.session.logged_in 
    });
  } catch (err) { 
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/post', async (req, res) => {
  try {

    res.render('single-post', { 
      logged_in: req.session.logged_in 
    });
  } catch (err) { 
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/create', async (req, res) => {
  try {

    res.render('writePost', { 
      logged_in: req.session.logged_in 
    });
  } catch (err) { 
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/dashboard', async (req, res) => {
  try {

    res.render('dashboard', { 
      logged_in: req.session.logged_in 
    });
  } catch (err) { 
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  try {

    res.render('login', { 
      logged_in: req.session.logged_in 
    });
  } catch (err) { 
    console.log(err);
    res.status(500).json(err);
  }
});



router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render('post', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/post', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login-signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login-signup');
});

module.exports = router;
