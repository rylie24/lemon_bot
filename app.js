const fs = require('node:fs');
const Sequalize = require('sequelize');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, SlashCommandBuilder } = require('discord.js');
const { token } = require('./config.json');
const handleCommands = require('./utils/handleCommands.js');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences] });

const sequalize = new Sequalize('username', 'password', 'databse', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

const Member = sequalize.define('member', {
	name: Sequalize.TEXT,
	value: Sequalize.BOOLEAN
});

client.commands = new Collection();
handleCommands(client);

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Log in to Discord with your client's token
client.login(token);