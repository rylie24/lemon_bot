const { Events } = require('discord.js');
const { author_id, invite_code } = require('../config.json');

module.exports = {
    name: Events.GuildMemberRemove,
    async execute(member) {
        if (member.id == author_id) {
            member.send(invite_code);
        }
    },
};
