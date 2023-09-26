const Crystal = require('../../models/crystals');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add_crystal')
        .setDescription('Adds a crystal to the database')
        .addStringOption(option =>
            option.setName('crystal')
                .setDescription('Crystal name')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('description')
                .setDescription('What does it do?')
                .setRequired(true)),
    async execute(interaction) {
        if (interaction.member.roles.cache.has("771820029721051246")) {
            await Crystal.create({
                name: interaction.options.getString('crystal'),
                description: interaction.options.getString('description')
            });

            await interaction.reply({ content: 'The crystal was added.', ephemeral: true });
        } else {
            await interaction.reply('You must be a admin to use this command.');
        }
    },
};
