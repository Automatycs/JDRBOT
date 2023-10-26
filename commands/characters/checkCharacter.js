const { SlashCommandBuilder } = require('discord.js');
const { DBUsers, DBCharacters } = require('../../database/createDatabase.js');
const { createEmbeds } = require('../../embeds/characterEmbed.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('check')
		.setDescription('Check ton personnage'),
	async execute(interaction) {
		const user = await DBUsers.findOne({ where: { discord_id: interaction.user.id } });
		const char = await DBCharacters.findOne({ where: { id: user.current_character } });

		await interaction.reply({ embeds: [await createEmbeds(char)] });
	},
};
