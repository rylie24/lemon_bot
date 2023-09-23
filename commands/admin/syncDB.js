const {guildId} = require('../../config.json');
const Viewed = require('../../models/viewed');
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sync_db')
		.setDescription('Adds new users to the database.'),
	async execute(interaction) {
		const guild = interaction.client.guilds.cache.get(guildId);
        const members = await guild.members.cache.map(async member => {
			// First we delete all members for a refill.
			await Viewed.truncate();
			
			const user = await Viewed.create({
				name: member.user.username,
				value: false
			});
		});
        await interaction.reply('All users successfully added');
	}
};