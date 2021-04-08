//require file path
const path = require('path');

//require express server
const express = require('express');

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

//may be redundant
const app = express();

//use express server
const server = express();

//listen on PORT 3001
const PORT = process.env.PORT || 3001;

//server user express
server.use(express.json());

//server use encoded url
app.use(express.urlencoded({ extended: true }));

//server use public file
app.use(express.static(path.join(__dirname, 'public')));

//server use api
server.use('/api', routes);

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

//export express server
module.exports = server;