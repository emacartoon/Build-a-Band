const express = require("express");
const bcrypt = require("bcrypt");
const router = require("express").Router();
// const { UUIDV4 } = require("sequelize/types");
const { User } = require("../../models");

router.post("/login-signup", async (req, res) => {
  const user = new User({
    id: UUIDV4,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  // hash the password provided by the user with bcrypt so that
  // we are never storing plain text passwords. This is crucial
  // for keeping your db clean of sensitive data
  const hash = bcrypt.hashSync(req.body.password, 10);

  try {
    // create a new user with the password hash from bcrypt
    let user = await User.create(
      Object.assign(req.body, { password: hash })
    );

    // data will be an object with the user and it's authToken
    let data = await user.authorize();

    // send back the new user and auth token to the
    // client { user, authToken }
    return res.json(data);

  } catch(err) {
    return res.status(400).send(err);
  }

});


//   try {
//     const userData = await User.create(req.body);
//     req.session.save(() => {
//       req.session.user_id = userData.id;
//       req.session.logged_in = true;
//       res.json({ user: userData, message: "You are now logged in!" });
//     });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

router.post("/login-signup", async (req, res) => {
  const { username, password } = req.body;

  // if the username / password is missing, we use status code 400
  // indicating a bad request was made and send back a message
  if (!username || !password) {
    return res.status(400).send(
      'Request missing username or password param'
    );
  }

  try {
    let user = await User.authenticate(username, password)

    user = await user.authorize();

    return res.json(user);

  } catch (err) {
    return res.status(400).send('invalid username or password');
  }

});
//   try {
//     const userData = await User.findOne({ where: { email: req.body.email } });

//     if (!userData) {
//       res
//         .status(400)
//         .json({ message: "Incorrect email or password, please try again" });
//       return;
//     }

//     const validPassword = await userData.checkPassword(req.body.password);

//     if (!validPassword) {
//       res
//         .status(400)
//         .json({ message: "Incorrect email or password, please try again" });
//       return;
//     }

//     req.session.save(() => {
//       req.session.user_id = userData.id;
//       req.session.logged_in = true;

//       res.json({ user: userData, message: "You are now logged in!" });
//     });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

router.delete('/logout', async (req, res) => {

  // because the logout request needs to be send with
  // authorization we should have access to the user
  // on the req object, so we will try to find it and
  // call the model method logout
  const { user, cookies: { auth_token: authToken } } = req

  // we only want to attempt a logout if the user is
  // present in the req object, meaning it already
  // passed the authentication middleware. There is no reason
  // the authToken should be missing at this point, check anyway
  if (user && authToken) {
    await req.user.logout(authToken);
    return res.status(204).send()
  }

  // if the user missing, the user is not logged in, hence we
  // use status code 400 indicating a bad request was made
  // and send back a message
  return res.status(400).send(
    { errors: [{ message: 'not authenticated' }] }
  );
});

// router.post("/logout", (req, res) => {
//   if (req.session.logged_in) {
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   } else {
//     res.status(404).end();
//   }
// });

router.get('/me', (req, res) => {
  if (req.user) {
    return res.send(req.user);
  }
  res.status(404).send(
    { errors: [{ message: 'missing auth token' }] }
  );
});

// export the router so we can pass the routes to our server
module.exports = router;


module.exports = router;
