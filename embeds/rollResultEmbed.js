const { EmbedBuilder } = require('discord.js');

async function createRollResultEmbed(message) {
	const rollResultEmbed = new EmbedBuilder()
		.setColor(0x9e0e40)
		.addFields({ name: 'Resultat', value: message })
		.setTimestamp();

	return (rollResultEmbed);
}

module.exports = { createRollResultEmbed };