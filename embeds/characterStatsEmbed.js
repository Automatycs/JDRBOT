const { EmbedBuilder } = require('discord.js');
const { DBSpecies } = require('../database/createDatabase');

async function getMods(race, hybrid) {
	const mods = {
		mod_phy: race.mod_phy + hybrid.mod_phy,
		mod_dex: race.mod_dex + hybrid.mod_dex,
		mod_eso: race.mod_eso + hybrid.mod_eso,
		mod_int: race.mod_int + hybrid.mod_int,
		mod_cha: race.mod_cha + hybrid.mod_cha,
		mod_sur: race.mod_sur + hybrid.mod_sur,
	};

	return (mods);
}

async function createCharacterStatsEmbed(character, user) {
	const avatarURL = 'https://cdn.discordapp.com/avatars/' + user.discord_id + '/' + user.avatar + '.png';
	let race = {
		mod_phy: 0,
		mod_dex: 0,
		mod_eso: 0,
		mod_int: 0,
		mod_cha: 0,
		mod_sur: 0,
	};
	let hybrid = race;

	if (character.race != undefined) {
		race = await DBSpecies.findOne({ where: { name: character.race } });
	}
	if (character.hybrid != undefined) {
		hybrid = await DBSpecies.findOne({ where: { name: character.hybrid } });
	}

	const mods = await getMods(race, hybrid);

	const characterStatsEmbed = new EmbedBuilder()
		.setColor(0x9e0e40)
		.setAuthor({ name: user.name, iconURL: avatarURL })
		.addFields(
			{ name: 'Physique', value: character.phy.toString() + ((mods.mod_phy < 0) ? (' - ' + (mods.mod_phy * -1).toString()) : (' + ' + mods.mod_phy.toString())), inline: true },
			{ name: 'Dextérité', value: character.dex.toString() + ((mods.mod_dex < 0) ? (' - ' + (mods.mod_dex * -1).toString()) : (' + ' + mods.mod_dex.toString())), inline: true },
			{ name: '\u200B', value: '\u200B' },
			{ name: 'Esoterisme', value: character.eso.toString() + ((mods.mod_eso < 0) ? (' - ' + (mods.mod_eso * -1).toString()) : (' + ' + mods.mod_eso.toString())), inline: true },
			{ name: 'Intelligence', value: character.int.toString() + ((mods.mod_int < 0) ? (' - ' + (mods.mod_int * -1).toString()) : (' + ' + mods.mod_int.toString())), inline: true },
			{ name: '\u200B', value: '\u200B' },
			{ name: 'Charme', value: character.cha.toString() + ((mods.mod_cha < 0) ? (' - ' + (mods.mod_cha * -1).toString()) : (' + ' + mods.mod_cha.toString())), inline: true },
			{ name: 'Survivalisme', value: character.sur.toString() + ((mods.mod_sur < 0) ? (' - ' + (mods.mod_sur * -1).toString()) : (' + ' + mods.mod_sur.toString())), inline: true },
		)
		.setTimestamp();

	return (characterStatsEmbed);
}

module.exports = { createCharacterStatsEmbed, getMods };