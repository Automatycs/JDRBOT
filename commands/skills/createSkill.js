const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('create-skill')
		.setDescription('Provides information about the server.')
		.addUserOption(option =>
			option
				.setName('joueur')
				.setDescription('le joueur possédant le personnage à qui donner la qualification')
				.setRequired(true),
		),
	async execute(interaction) {
		interaction.reply({
			content: 'Cette commande ne fait rien pour l\'instant.',
			ephemeral: true,
		});
	},
};
