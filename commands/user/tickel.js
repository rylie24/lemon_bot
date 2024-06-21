module.exports = {
    data: {
        name: 'tic',
        description: 'The tickle command.',
        "integration_types": [1],
        "contexts": [1, 2]
    },
    async execute(interaction) {
        await interaction.reply({content: 'https://media1.tenor.com/m/nl5AkvIm4GoAAAAC/tickle-feet.gif', ephemeral: true});
        for (let i = 1; i < 6; i++) {
            await interaction.followUp({content: 'https://media1.tenor.com/m/nl5AkvIm4GoAAAAC/tickle-feet.gif', ephemeral: true});
        }
    }
}