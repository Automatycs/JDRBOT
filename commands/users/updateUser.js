// Imports de composants
const { SlashCommandBuilder } = require('discord.js');
const { DBUsers } = require('../../database/createDatabase.js');

// Exports de composants
module.exports = {
	// data: nom et description de la commande
	data: new SlashCommandBuilder()
		.setName('updateu')
		.setDescription('Mise à jour du profil Utilisateur'),
	// execute(): méthode éxécutée quand la commande est appelée
	async execute(interaction) {
		// Récupération des informations sur l'utilisateur ayant appelé la commande
		const userName = interaction.user.username;
		const userDiscordId = interaction.user.id;
		const userAvatar = interaction.user.avatar;

		// Appel d'un Update sur la table DBUsers
		const affected = await DBUsers.update(
			{
				name: userName,
				avatar: userAvatar,
			},
			{
				where:
				{ discord_id: userDiscordId },
			},
		);

		// Si une ligne a été affectée
		if (affected > 0) {
			await interaction.reply({
				content: 'Profil mis à jour!',
				ephemeral: true,
			});
		}
		// Sinon
		else {
			await interaction.reply({
				content: 'Aucun profil correspondant n\'a été trouvé.',
				ephemeral: true,
			});
		}
	},
};
