const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
const { DBSpecies } = require('../database/createDatabase');

async function buildCharacterUpdateSpeciesSelect(prev, type) {
	const capitalType = type.charAt(0).toUpperCase() + type.slice(1);
	const select = new StringSelectMenuBuilder()
		.setCustomId('characterUpdate' + capitalType + 'Select')
		.setPlaceholder('Choisis une race:');
	const row = new ActionRowBuilder();
	const species = await DBSpecies.findAll();

	if (type == 'hybrid') {
		select.addOptions(new StringSelectMenuOptionBuilder()
			.setLabel('Sans')
			.setValue('null'),
		);
	}
	for (const specie of species) {
		const tmp = new StringSelectMenuOptionBuilder()
			.setLabel(specie.name)
			.setValue(specie.name);
		if (specie.name == prev) {
			tmp.setDescription('Actuel');
		}
		select.addOptions(tmp);
	}
	row.addComponents(select);

	return (row);
}

module.exports = { buildCharacterUpdateSpeciesSelect };