const { EmbedBuilder } = require('discord.js');
const { DBUsers } = require('../database/createDatabase.js');

// inside a command, event listener, etc.
async function createEmbeds(character) {
	const user = await DBUsers.findOne({ where: { discord_id: character.user_id } });
	const avatarURL = 'https://cdn.discordapp.com/avatars/' + user.discord_id + '/' + user.avatar + '.png';

	const exampleEmbed = new EmbedBuilder()
		.setColor(0x9e0e40)
		.setAuthor({ name: user.name, iconURL: avatarURL })
		.addFields(
			{ name: 'Nom', value: character.name },
			{ name: 'Histoire', value: character.story },
		)
		.addFields({ name: 'Image', value: character.picture })
		.setImage(character.picture)
		.setTimestamp();

	return exampleEmbed;
}

module.exports = { createEmbeds };