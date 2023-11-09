const { SlashCommandBuilder, StringSelectMenuBuilder, ActionRowBuilder, StringSelectMenuOptionBuilder, Events } = require('discord.js');
const { DBUsers, DBCharacters } = require('../../database/createDatabase.js');
const { client } = require('../../index.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('select')
		.setDescription('Changer de personnage'),
	async execute(interaction) {
		const user = await DBUsers.findOne({ where: { discord_id: interaction.user.id } });
		const chars = await DBCharacters.findAll({ where: { user_id: interaction.user.id } });
		const select = new StringSelectMenuBuilder()
			.setCustomId('selectCharSelect')
			.setPlaceholder('Choisis un personnage:');
		const row = new ActionRowBuilder();

		for (const char of chars) {
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

		await interaction.reply({
			components: [row],
		});
	},
};

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isStringSelectMenu()) return;

	if (interaction.customId === 'selectCharSelect') {
		const char = await DBCharacters.findOne({ where: { id: interaction.values[0] } });
		await DBUsers.update(
			{ current_character: interaction.values[0] },
			{ where: { discord_id: char.user_id } });

		await interaction.update({ content: 'Changement de personnage effectué!', components: [] });
	}
});
