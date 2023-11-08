const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, Events } = require('discord.js');
const { DBUsers, DBCharacters } = require('../../database/createDatabase.js');
const { createCharacterEmbeds } = require('../../embeds/createCharacterEmbed.js');
const { Pagination } = require('pagination.djs');
const { client } = require('../../index.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('check')
		.setDescription('Regarde la fiche d\'un personnage'),
	async execute(interaction) {
		const users = await DBUsers.findAll();
		const chars = await DBCharacters.findAll();
		const select = new StringSelectMenuBuilder()
			.setCustomId('checkCharSelect')
			.setPlaceholder('Choisis un personnage!');
		const row = new ActionRowBuilder();

		for (const char of chars) {
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

		await interaction.reply({
			content: 'Choisis un personnage!',
			components: [row],
			test: interaction,
		});
	},
};

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isStringSelectMenu()) return;

	console.log(interaction);
	if (interaction.customId === 'checkCharSelect') {
		const char = await DBCharacters.findOne({ where: { id: interaction.values[0] } });
		const embeds = await createCharacterEmbeds(char);
		const pagination = new Pagination(interaction.test);

		await pagination.setEmbeds(embeds);
		await pagination.render();
	}
});