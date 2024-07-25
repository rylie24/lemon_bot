module.exports = {
    data: {
        name: 'tic',
        description: 'The tickle command.',
        "integration_types": [1],
        "contexts": [1, 2]
    },
    async execute(interaction) {
        await interaction.reply({content: 'https://tenor.com/view/milk-and-mocha-tickle-bear-mochi-tickle-gif-129382352328703905'});
        for (let i = 1; i < 6; i++) {
            await interaction.followUp({content: 'https://tenor.com/view/milk-and-mocha-tickle-bear-mochi-tickle-gif-129382352328703905'});
        }
    }
}
