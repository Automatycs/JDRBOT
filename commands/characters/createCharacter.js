// Imports de composants
const { SlashCommandBuilder } = require('discord.js');
const { buildCharacterFirstStepModal } = require('../../modals/characterFirstStepModal.js');
const { DBCharacters } = require('../../database/createDatabase.js');

// Exports de composants
module.exports = {
	// data: nom et description de la commande
	data: new SlashCommandBuilder()
		.setName('create')
		.setDescription('Lancer la création d\'un personnage'),
	// execute(): méthode éxécutée quand la commande est appelée
	async execute(interaction) {
		// Récupération des informations sur l'utilisateur ayant appelé la commande
		const userDiscordId = interaction.user.id;

		// Récupération des Characters de l'utilisateur
		const characters = await DBCharacters.findAll({
			where:
				{ user_id: userDiscordId },
		});

		// Gestion d'erreur dans le cas où l'utilisateur possède déjà 25 Characters ou plus
		if (characters.length() >= 25) {
			return await interaction.reply({
				content: 'Action impossible: Vous avez trop de personnages.',
				ephemeral: true,
			});
		}

		// Création d'un Modal
		const modal = await buildCharacterFirstStepModal();

		// Envoi du Modal à l'utilisateur
		return await interaction.showModal(modal);
	},
};