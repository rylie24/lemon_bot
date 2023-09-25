const { Events, EmbedBuilder } = require('discord.js');
const Viewed = require('../models/viewed');
const Crystal = require('../models/crystals');
const sequelize = require('../utils/database');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);

            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(`Error executing ${interaction.commandName}`);
                console.error(error);
            }
        } else if (interaction.isButton()) {
            // Crystal interaction
            if (interaction.customId == "crystal") {
                const crystal = await Crystal.findOne({ order: sequelize.fn('RANDOM') });
                const crystalEmbed = new EmbedBuilder()
                    .setColor(0x800080)
                    .setTitle('Crystal of the Day')
                    .addFields(
                        { name: "Crystal", value: crystal.name },
                        { name: "What it does?", value: crystal.description }
                    )
                const member = await Viewed.findOne({ where: { name: interaction.user.username } })
                await Viewed.update({ value: 1 }, { where: { name: member.name } });

                if (member.value == true) {
                    await interaction.reply({ content: 'Please wait a day before you try again.', ephemeral: true })
                } else {
                    await interaction.reply({ embeds: [crystalEmbed], ephemeral: true });
                }
            }
        }
    },
};
