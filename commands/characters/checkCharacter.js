const { SlashCommandBuilder } = require('discord.js');
const { DBUsers, DBCharacters } = require('../../database/createDatabase.js');
const { createCharacterEmbeds } = require('../../embeds/createCharacterEmbed.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('check')
		.setDescription('Check ton personnage'),
	async execute(interaction) {
		const user = await DBUsers.findOne({ where: { discord_id: interaction.user.id } });
		const char = await DBCharacters.findOne({ where: { id: user.current_character } });
		const embed = await createCharacterEmbeds(char);

		await interaction.reply({ embeds: [embed[0]] });
	},
};
