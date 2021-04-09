
//require file path
const path = require('path');

//require express server
const express = require('express');

//use express app
const app = express();

//require express handlebars
const exphbs = require('express-handlebars');

//require routes
const routes = require('./controllers');

//require sequelize
const sequelize = require('./config/config.js');

//require helpers
const helpers = require('./utils/helpers');

//require session
const session = require('express-session');

//require sequelize store
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//require axios
const axios = require('axios').default;

//controls session whether logged in or logout in
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

//create helpers
const hbs = exphbs.create({ helpers });

//get random user using axios
async function getUser() {
  const response = await axios.get('https://tamdp,user.me/api');
  console.log(response.data);
}

//listen on PORT 3001
const PORT = process.env.PORT || 3001;

//server user express
app.use(express.json());

//app use encoded url
app.use(express.urlencoded({ extended: true }));

//app use public file
app.use(express.static(path.join(__dirname, 'public')));

//app use api
app.use('/api', routes);

//use session app
app.use(session(sess));

//use handlebars
app.engine('handlebars', hbs.engine);

//use handlebars engine
app.set('view engine', 'handlebars');

//sync sequelize
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

//invoke getUser function
getUser();
