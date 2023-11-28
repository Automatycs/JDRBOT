const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

async function buildCheckCharacterSelect(characters) {
	const select = new StringSelectMenuBuilder()
		.setCustomId('checkCharSelect')
		.setPlaceholder('Choisis un personnage!');
	const row = new ActionRowBuilder();

	for (const char of characters) {
		const tmp = new StringSelectMenuOptionBuilder()
			.setLabel(char.name)
			.setValue(char.id.toString());
		if (char.ready == 1) {
			tmp.setDescription('Validé');
		}
		select.addOptions(tmp);
	}
	row.addComponents(select);

	return (row);
}

module.exports = { buildCheckCharacterSelect };