const { StringSelectMenuBuilder, ActionRowBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

async function buildSelectCharacterSelect(characters, user) {
	const select = new StringSelectMenuBuilder()
		.setCustomId('selectCharSelect')
		.setPlaceholder('Choisis un personnage:');
	const row = new ActionRowBuilder();
	let description = '';

	for (const char of characters) {
		description = '';
		const tmp = new StringSelectMenuOptionBuilder()
			.setLabel(char.name)
			.setValue(char.id.toString());
		if (char.id == user.current_character) {
			description += 'Actuel ';
		}
		if (char.ready == 1) {
			description += 'Validé';
		}
		if (description != '') {
			tmp.setDescription(description);
		}
		select.addOptions(tmp);
	}

	row.addComponents(select);

	return (row);
}

module.exports = { buildSelectCharacterSelect };