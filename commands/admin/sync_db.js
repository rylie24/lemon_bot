const fs = require('fs');
const {guildId} = require('../../config.json');
const config = require('../../config.json');
const Viewed = require('../../models/viewed');
const Crystals = require('../../models/crystals');
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { exec } = require('child_process');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sync_db')
		.setDescription('Adds new users to the database.'),
	async execute(interaction) {
		if (interaction.member.roles.cache.has(config.adminRole)) {
			// First we sync the db if nothing is populated.
			fs.access('./database.sqlite', fs.constants.F_OK, async (err) => {
				if(err) {
					console.log("Creating sqlite file...");
					
					exec(`node syncDB.js`, (error) => {
						if (error) {
    						console.error(`exec error: ${error}`);
    						return;
  						}
					});	

        			await interaction.reply({content:'Database file created successfully, please run the command again.', ephemeral:true});
				} else {
					const guild = interaction.client.guilds.cache.get(guildId);
        			await guild.members.cache.map(async member => {
						// Then we delete all members for a refill.
						await Viewed.truncate();
			
						await Viewed.create({
							name: member.user.username,
							value: false
						});
					});


        			await interaction.reply({content:'All users successfully added', ephemeral:true});
				}
			});
		} else {
			await interaction.reply({content:'You need to be an admin to use this.', ephemeral:true});
		}
	}
};
