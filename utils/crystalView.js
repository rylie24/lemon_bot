const { ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');

module.exports = {
    async execute(interaction) {
        const viewCrystal = new ButtonBuilder()
            .setCustomId('vcrystal')
            .setLabel('View Crystal')
            .setStyle(ButtonStyle.Danger);

        const row = new ActionRowBuilder()
            .addComponents(viewCrystal);

        await interaction.reply({
            content: 'Click to view the crystal.',
            components: [row]
        });
    }
}