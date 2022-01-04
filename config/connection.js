const Sequelize = require('sequelize');

require('dotenv').config();

//entered sequelize format for connection.js - will need to see up personal .env file later on prior to launching the server
let sequelize;

if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    });
}
//heroku deployment will be last step
//jawsdb must be installed following link deployment

module.exports = sequelize;