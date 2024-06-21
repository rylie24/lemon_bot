const {EmbedBuilder} = require("discord.js");
const { bard_api } = require('../../config.json');
const { BardAPI } = require('bard-api-node');

module.exports = {
    data: {
        name: 'ask',
        description: 'The tickle command.',
        options: [
            {
                name: 'question',
                description: 'Ask a question',
                type: 3,
                required: true
            }
        ],
        "integration_types": [1],
        "contexts": [1, 2]
    },
    async execute(interaction) {
        const sleep = ms => new Promise(res => setTimeout(res, ms));
        const bard = new BardAPI();

        await interaction.deferReply({ephemeral: true});

        const question = interaction.options.getString('question', true);

        bard.initializeChat(bard_api)

        const response = await bard.getBardResponse(question);

        await sleep(10000);

        const embed = new EmbedBuilder()
            .setTitle("Bard's Response")
            .setDescription(`${response.text}`)
            .setColor("#ffe030");

        await interaction.editReply({embeds: [embed]});
    }
}
