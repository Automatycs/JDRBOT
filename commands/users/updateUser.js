const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('update')
		.setDescription('Mise à jour du profil Utilisateur'),
	async execute(interaction) {
		const userName = interaction.user.username;
		const userDiscordId = interaction.user.id;

		const affected = await interaction.client.DBUsers.update(
			{ name: userName },
			{ where: { discord_id: userDiscordId } });

		if (affected > 0) {
			await interaction.reply('Profil mis à jour!');
		}
		else {
			await interaction.reply('Aucun profil correspondant n\'a été trouvé.');
		}
	},
};
