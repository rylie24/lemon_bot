const Viewed = require('../models/viewed');
const config = require('../config.json');
const cron = require('cron');
const { Events, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		const crystalButton = new ButtonBuilder()
			.setCustomId('crystal')
			.setLabel('View Crystal')
			.setStyle(ButtonStyle.Primary);
		const crystalChannel = client.channels.cache.find(c => c.id == config.crystal_channel);

		const crystal =  new cron.CronJob('30 15 * * *', async () => {
			await Viewed.update({ value: 0 }, { where: { value: 1 } });
			crystalChannel.messages.fetch({ limit: 1 }).then(messages => {
				messages.forEach(message => {
					message.delete();
				});
			});
			crystalChannel.send({
				content: 'Click to get the crystal of the day:',
				components: [new ActionRowBuilder().addComponents(crystalButton)]
			});
		});

		crystal.start();

		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
