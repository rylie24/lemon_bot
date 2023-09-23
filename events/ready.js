const Viewed = require('../database').Viewed;
const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		Viewed.sync();
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};