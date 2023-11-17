// Imports de composants
const { SlashCommandBuilder } = require('discord.js');
const { buildCharacterFirstStepModal } = require('../../modals/characterFirstStepModal.js');

// Exports de composants
module.exports = {
	// data: nom et description de la commande
	data: new SlashCommandBuilder()
		.setName('create')
		.setDescription('Lance la création d\'un personnage!'),
	// execute(): méthode éxécutée quand la commande est appelée
	async execute(interaction) {
		// Création d'un Modal
		const modal = await buildCharacterFirstStepModal();

		// Envoi du Modal à l'utilisateur
		await interaction.showModal(modal);
	},
};