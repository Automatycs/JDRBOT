const { EmbedBuilder } = require('discord.js');

async function createCharacterInfosEmbed(character, user) {
	const avatarURL = 'https://cdn.discordapp.com/avatars/' + user.discord_id + '/' + user.avatar + '.png';
	const characterInfosEmbed = new EmbedBuilder()
		.setColor(0x9e0e40)
		.setAuthor({ name: user.name, iconURL: avatarURL })
		.addFields(
			{ name: 'Nom', value: character.name },
			{ name: 'Histoire', value: character.story },
			{ name: 'Traits / Anecdotes', value: character.traits },
		)
		.addFields({ name: 'Image', value: character.picture })
		.setImage(character.picture)
		.setTimestamp();

	return (characterInfosEmbed);
}

module.exports = { createCharacterInfosEmbed };