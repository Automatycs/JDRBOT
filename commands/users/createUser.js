// Imports de composants
const { SlashCommandBuilder } = require('discord.js');
const { DBUsers } = require('../../database/createDatabase');

// Exports de composants
module.exports = {
	// data: nom et description de la commande
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('Inscription au JDR!'),
	// execute(): méthode éxécutée quand la commande est appelée
	async execute(interaction) {
		// Récupération des informations sur l'utilisateur ayant appelé la commande
		const userName = interaction.user.username;
		const userDiscordId = interaction.user.id;
		const userAvatar = interaction.user.avatar;

		// Vérification de si l'utilisateur éxiste déjà
		const user = await DBUsers.findAll({
			where:
				{ discord_id: userDiscordId },
		});
		if (user.length != 0) {
			await interaction.reply({
				content: 'Vous êtes déjà inscrit',
				ephemeral: true,
			});
			return;
		}

		// Tentative de création du nouvel User
		try {
			await DBUsers.create({
				discord_id: userDiscordId,
				name: userName,
				avatar: userAvatar,
			});
		}
		// En cas d'erreur
		catch (error) {
			await interaction.reply({
				content: 'Il y a eu un problème pendant la création de l\'utilisateur',
				ephemeral: true,
			});
			return;
		}

		// Signale de création à l'utilisateur
		await interaction.reply({
			content: 'Bienvenue parmis nous!',
			ephemeral: true,
		});
	},
};
