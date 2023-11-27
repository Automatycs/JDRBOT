const { DBUsers } = require('../database/createDatabase.js');
const { createCharacterInfosEmbed } = require('./characterInfosEmbed.js');
const { createCharacterStatsEmbed } = require('./characterStatsEmbed.js');

async function createCharacterEmbeds(character) {
	const user = await DBUsers.findOne({ where: { discord_id: character.user_id } });

	const characterEmbed = [await createCharacterInfosEmbed(character, user), await createCharacterStatsEmbed(character, user)];

	return characterEmbed;
}

module.exports = { createCharacterEmbeds };