const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Viewed = sequelize.define('viewed', {
    name: Sequelize.STRING,
    value: Sequelize.BOOLEAN
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Viewed;