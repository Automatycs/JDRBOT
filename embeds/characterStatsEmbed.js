const { EmbedBuilder } = require('discord.js');

async function createCharacterStatsEmbed(character, user) {
	const avatarURL = 'https://cdn.discordapp.com/avatars/' + user.discord_id + '/' + user.avatar + '.png';
	const characterStatsEmbed = new EmbedBuilder()
		.setColor(0x9e0e40)
		.setAuthor({ name: user.name, iconURL: avatarURL })
		.addFields(
			{ name: 'Physique', value: character.phy.toString(), inline: true },
			{ name: 'Dextérité', value: character.dex.toString(), inline: true },
			{ name: '\u200B', value: '\u200B' },
			{ name: 'Esoterisme', value: character.eso.toString(), inline: true },
			{ name: 'Intelligence', value: character.int.toString(), inline: true },
			{ name: '\u200B', value: '\u200B' },
			{ name: 'Charme', value: character.cha.toString(), inline: true },
			{ name: 'Survivalisme', value: character.sur.toString(), inline: true },
		)
		.setTimestamp();

	return (characterStatsEmbed);
}

module.exports = { createCharacterStatsEmbed };