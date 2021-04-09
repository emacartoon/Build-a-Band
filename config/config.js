const axios = require('axios');
const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

//set axios defaults
const axios = require('axios');
const oauth = require('axios-oauth-client');
const tokenProvider = require('axios-token-interceptor');

const getOwnerCredentials = oauth.client(axios.create(), {
  // see example above
  url: 'https://oauth.com/2.0/token',
  grant_type: 'client_credentials',
  client_id: 'foo',
  client_secret: 'bar',
  scope: 'baz'
})

const instance = axios.create();
instance.interceptors.request.use(
  // Wraps axios-token-interceptor with oauth-specific configuration,
  // fetches the token using the desired claim method, and caches
  // until the token expires
  oauth.interceptor(tokenProvider, getOwnerCredentials)
);


module.exports = sequelize;
