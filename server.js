require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const customAuthMiddleware = require('./middleware/custom-auth-middleware');
const jQuery = require('jquery');
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

//require UUID for ID#s
const { v4: uuidv4 } = require('uuid');
uuidv4();

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

// trust first proxy
app.set('trust proxy', 1)
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

//listen on PORT 3001
const PORT = process.env.PORT || 3001;

//server use express's JSON parser
app.use(express.json());

//app use encoded url
app.use(express.urlencoded({ extended: true }));

//app use public file
app.use(express.static(path.join(__dirname, 'public')));

//use session app
app.use(session(sess));

//app use api
app.use(routes);

//use handlebars
app.engine('handlebars', hbs.engine);

//use handlebars engine
app.set('view engine', 'handlebars');

//sync sequelize
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
// directory references
const clientDir = path.join(__dirname, '../client');
// Express middleware that allows POSTing data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//invoke getUser function
getUser();