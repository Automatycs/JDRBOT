const { EmbedBuilder } = require('discord.js');

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
	if (character.race != null && character.race != '') {
		if (character.hybrid != null && character.hybrid != '') {
			characterInfosEmbed.addFields({ name: 'Races', value: character.race + ' / ' + character.hybrid });
		}
		else {
			characterInfosEmbed.addFields({ name: 'Race', value: character.race });
		}
	}
	if (character.picture != null && character.picture != '') {
		try {
			characterInfosEmbed.setImage(character.picture);
		}
		catch {
			characterInfosEmbed.addFields({ name: 'Image', value: 'L\'image donnée est invalide' });
		}
	}
	characterInfosEmbed.setTimestamp();

	return (characterInfosEmbed);
}

module.exports = { createCharacterInfosEmbed };