const { EmbedBuilder } = require('discord.js');

function checkURL(url) {
	try {
		new URL(url);
	}
	catch {
		return (false);
	}

	return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

async function createCharacterInfosEmbed(character, user) {
	const avatarURL = 'https://cdn.discordapp.com/avatars/' + user.discord_id + '/' + user.avatar + '.png';
	const characterInfosEmbed = new EmbedBuilder()
		.setColor(0x9e0e40)
		.setAuthor({ name: user.name, iconURL: avatarURL })
		.addFields({ name: 'Nom', value: character.name });

	if (character.story != null && character.story != '') {
		characterInfosEmbed.addFields({ name: 'Histoire', value: character.story });
	}
	if (character.traits != null && character.traits != '') {
		characterInfosEmbed.addFields({ name: 'Traits / Anecdotes', value: character.traits });
	}
	if (character.picture != null && character.picture != '' && await checkURL(character.picture)) {
		characterInfosEmbed.setImage(character.picture);
	}
	characterInfosEmbed.setTimestamp();

	return (characterInfosEmbed);
}

module.exports = { createCharacterInfosEmbed };