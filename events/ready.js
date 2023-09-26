const Crystal = require('../utils/crystalView');
const { crystal_channel } = require('../config.json');
const { Events, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		const crystalButton = new ButtonBuilder()
			.setCustomId('crystal')
			.setLabel('View Crystal')
			.setStyle(ButtonStyle.Primary);
		const crystalChannel = client.channels.cache.find(c => c.id == crystal_channel);

		setInterval(() => {
			crystalChannel.messages.fetch({ limit: 1 }).then(messages => {
				messages.forEach(message => {
					message.delete();
				});
			});
			client.channels.cache.find(c => c.id == crystal_channel).send({
				content: 'Click to get the crystal of the day:',
				components: [new ActionRowBuilder().addComponents(crystalButton)]
			});
		}, 1000 * 60 * 60 * 24);

		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
