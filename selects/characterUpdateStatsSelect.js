const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

async function buildCharacterUpdateStatsSelect(prev, type) {
	const capitalType = type.charAt(0).toUpperCase() + type.slice(1);
	const select = new StringSelectMenuBuilder()
		.setCustomId('characterUpdate' + capitalType + 'Select')
		.setPlaceholder('Choisis la valeur désirée');
	const row = new ActionRowBuilder();

	for (let i = 1; i < 5; i += 1) {
		const tmp = new StringSelectMenuOptionBuilder()
			.setLabel(i.toString())
			.setValue(i.toString());
		if (i == prev) {
			tmp.setDescription('Actuel');
		}
		select.addOptions(tmp);
	}
	row.addComponents(select);

	return (row);
}

module.exports = { buildCharacterUpdateStatsSelect };