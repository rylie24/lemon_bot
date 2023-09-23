const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    host: 'localhost',
    storage: 'database.sqlite',
    logging: false
});

module.exports = sequelize;