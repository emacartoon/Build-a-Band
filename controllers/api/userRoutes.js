const express = require("express");
const bcrypt = require("bcrypt");
const router = require("express").Router();
// const { UUIDV4 } = require("sequelize/types");
const { User } = require("../../models");

router.post("/signup", async (req, res) => {
  try {
    // create a new user with the password hash from bcrypt
    let user = await User.create(req.body);

    req.session.save(() => {
      req.session.userId = user.id;
      req.session.loggedIn = true;
      res.json({ user, message: "You are now signed in!" });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send("Request missing username or password param");
  }

  const user = await User.findOne({ where: { email: req.body.email } });

  try {
    const validPassword = await user.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.userId = user.id;
      req.session.loggedIn = true;

      res.json({ user, message: "You are now logged in!" });
    });
  } catch (err) {
    return res.status(400).send("invalid username or password");
  }
});

router.post("/logout", async (req, res) => {
  if (req.session.loggedIn) {
    // Remove the session variables
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.get("/me", (req, res) => {
  if (req.user) {
    return res.send(req.user);
  }
  res.status(404).send({ errors: [{ message: "missing auth token" }] });
});

// export the router so we can pass the routes to our server
module.exports = router;
