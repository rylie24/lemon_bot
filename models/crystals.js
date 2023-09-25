const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Crystal = sequelize.define('crystals', {
    name: Sequelize.STRING,
    description: Sequelize.TEXT
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Crystal;