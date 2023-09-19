const fetch = require("node-fetch");
const { SlashCommandBuilder } = require('discord.js');
const { steam_api_key, steam_id } = require('../../config.json');

const steam_api_url = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${steam_api_key}&steamids=${steam_id}`;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('steam_status')
		.setDescription('Show\'s steam status for rye.'),
	async execute(interaction) {
        const res = await fetch(steam_api_url);
        const data = await res.json();

		try {
			let game_info = data['response']['players'][0];
			if("gameextrainfo" in game_info) {
				await interaction.reply({content: game_info['gameextrainfo'], ephemeral: true});
			}
		} catch (e) {
			console.log();
		}
		await interaction.reply({content: "No game being played...", ephemeral: true});
	},
};