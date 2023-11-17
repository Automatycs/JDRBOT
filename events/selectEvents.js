const { Events } = require('discord.js');
const { client } = require('../index.js');
const { DBCharacters, DBUsers } = require('../database/createDatabase.js');
const { createCharacterEmbeds } = require('../embeds/createCharacterEmbed.js');
const { Pagination } = require('pagination.djs');

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isStringSelectMenu()) return;

	if (interaction.customId === 'checkCharSelect') {
		const char = await DBCharacters.findOne({ where: { id: interaction.values[0] } });
		const embeds = await createCharacterEmbeds(char);
		const pagination = new Pagination(interaction);

		await pagination.setEmbeds(embeds);

		await pagination.update();
	}

	if (interaction.customId === 'selectCharSelect') {
		const char = await DBCharacters.findOne({ where: { id: interaction.values[0] } });
		await DBUsers.update(
			{ current_character: interaction.values[0] },
			{ where: { discord_id: char.user_id } });

		await interaction.update({ content: 'Changement de personnage effectué!', components: [] });
	}
});