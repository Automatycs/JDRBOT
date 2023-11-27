const { SlashCommandBuilder } = require('discord.js');
const { DBUsers, DBCharacters } = require('../../database/createDatabase.js');
const { buildCharacterIssuesEmbed } = require('../../embeds/characterIssuesEmbed.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('validate')
		.setDescription('Valide un personnage et le rend jouable'),
	async execute(interaction) {
		const user = await DBUsers.findOne({ where: { discord_id: interaction.user.id } });
		const char = await DBCharacters.findOne({ where: { id: user.current_character } });

		if (char.length == 0) {
			return await interaction.reply({
				content: 'Il faut sélectionner un personnage avant de pouvoir le valider',
				ephemeral: true,
			});
		}

		const errorEmbeb = await buildCharacterIssuesEmbed(char, user);

		interaction.reply({ embeds: [errorEmbeb] });
	},
};
