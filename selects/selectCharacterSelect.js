const { StringSelectMenuBuilder, ActionRowBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

async function buildSelectCharacterSelect(characters, user) {
	const select = new StringSelectMenuBuilder()
		.setCustomId('selectCharSelect')
		.setPlaceholder('Choisis un personnage:');
	const row = new ActionRowBuilder();

	for (const char of characters) {
		if (char.user_id == user.discord_id) {
			const tmp = new StringSelectMenuOptionBuilder()
				.setLabel(char.name)
				.setValue(char.id.toString());
			if (char.id == user.current_character) {
				tmp.setDescription('Actuel');
			}
			select.addOptions(tmp);
		}
	}
	row.addComponents(select);

	return (row);
}

module.exports = { buildSelectCharacterSelect };