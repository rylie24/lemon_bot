const {REST, Routes, SlashCommandBuilder} = require('discord.js');
const {clientId, guildId, token} = require('../config.json');
const fs = require('node:fs');
const path = require('node:path');

module.exports = (client) => {
    const commandArray = []

    fs.readdirSync('./commands').forEach(dir => {
        const commandFiles = fs.readdirSync(`./commands/${dir}`).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const command = require(`${process.cwd()}/commands/${dir}/${file}`);
            client.commands.set(command.data.name, command);
            // commandArray.push(command.data.toJSON());
            if (command.data instanceof SlashCommandBuilder) {
                commandArray.push(command.data.toJSON());
            } else {
                commandArray.push(command.data);
            }
        }
    });

    // Construct and prepare an instance of the REST module
    const rest = new REST({version: '9'}).setToken(token);

    // and deploy your commands!
    (async () => {
        try {
            console.log(`Started refreshing ${commandArray.length} application (/) commands.`);

            // The put method is used to fully refresh all commands in the guild with the current set
            const data = await rest.put(
                Routes.applicationCommands(clientId, guildId),
                {body: commandArray},
                Routes.applicationCommands(clientId),
                {body: commandArray},
            );

            console.log(`Successfully reloaded ${data.length} application (/) commands.`);
        } catch (error) {
            // And of course, make sure you catch and log any errors!
            console.error(error);
        }
    })();
}