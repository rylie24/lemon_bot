const fetch = require("node-fetch");
const {EmbedBuilder} = require('discord.js');

module.exports = {
    data: {
        name: 'urban',
        description: 'Get a definition from urban dictionary.',
        "integration_types": [1],
        "contexts": [1, 2],
        options: [
            {
                name: 'term',
                description: 'The term',
                type: 3,
                required: true
            }
        ],
    },
    async execute(interaction) {
        $urbanUrl = `https://api.urbandictionary.com/v0/define?term=${interaction.options.getString('term')}`;

        const res = await fetch($urbanUrl);
        const data = await res.json();

        try {
            let definition = data['list'][0];
            const urbanEmbed = new EmbedBuilder()
                .setColor('#ffe030')
                .setTitle(`Urban Dictionary: ${definition['word']}`)
                .setURL(definition['permalink'])
                .setDescription(`${definition['definition']}`);

            await interaction.reply({embeds: [urbanEmbed]});
        } catch (e) {
            console.log(e);
        }
    }
}
