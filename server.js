require("dotenv").config();
//require file path
const path = require("path");

//require express server
const express = require("express");

//use express app
const app = express();

//require express handlebars
const exphbs = require("express-handlebars");

//require routes
const routes = require("./controllers");

//require sequelize
const sequelize = require("./config/config.js");

//require helpers
const helpers = require("./utils/helpers");

//require session
const session = require("express-session");

//require sequelize store
const SequelizeStore = require("connect-session-sequelize")(session.Store);

//require UUID for ID#s
const { v4: uuidv4 } = require("uuid");
uuidv4();


//create helpers
const hbs = exphbs.create({ helpers });

// trust first proxy
app.set("trust proxy", 1);

//listen on PORT 3001
const PORT = process.env.PORT || 3001;

//server use express's JSON parser
app.use(express.json());

//app use encoded url
app.use(express.urlencoded({ extended: true }));

//app use public file
app.use(express.static(path.join(__dirname, "public")));

//controls session whether logged in or logout in
const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
//use session app
app.use(session(sess));

//app use api
app.use(routes);

//use handlebars
app.engine("handlebars", hbs.engine);

//use handlebars engine
app.set("view engine", "handlebars");

//sync sequelize
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
