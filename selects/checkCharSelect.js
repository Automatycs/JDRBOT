const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

async function buildCheckCharacterSelect(users, characters) {
	const select = new StringSelectMenuBuilder()
		.setCustomId('checkCharSelect')
		.setPlaceholder('Choisis un personnage!');
	const row = new ActionRowBuilder();

	for (const char of characters) {
		for (const user of users) {
			if (char.user_id == user.discord_id) {
				select.addOptions(new StringSelectMenuOptionBuilder()
					.setLabel(char.name)
					.setDescription(user.name)
					.setValue(char.id.toString()),
				);
			}
		}
	}
	row.addComponents(select);

	return (row);
}

module.exports = { buildCheckCharacterSelect };