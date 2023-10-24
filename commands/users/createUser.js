const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('Inscription au JDR!'),
	async execute(interaction) {
		const userName = interaction.user.username;
		const userDiscordId = interaction.user.id;

		try {
			await interaction.client.DBUsers.create({
				discord_id: userDiscordId,
				name: userName,
			});

			await interaction.reply('Bienvenue parmis nous!');
		}
		catch (error) {
			return interaction.reply('Il y a eu un problème pendant la création de l\'utilisateur');
		}
	},
};
