// Imports de composants
const { SlashCommandBuilder } = require('discord.js');
const { DBUsers, DBCharacters } = require('../../database/createDatabase.js');
const { buildCharacterUpdateNameModal } = require('../../modals/characterUpdateNameModal.js');
const { buildCharacterUpdatePictureModal } = require('../../modals/characterUpdatePictureModal.js');
const { buildCharacterUpdateStoryModal } = require('../../modals/characterUpdateStoryModal.js');
const { buildCharacterUpdateTraitsModal } = require('../../modals/characterUpdateTraitsModal.js');
const { buildCharacterUpdateSpeciesSelect } = require('../../selects/characterUpdateSpeciesSelect.js');
const { buildCharacterUpdateStatsFightModal } = require('../../modals/characterUpdateStatsFightModal.js');
const { buildCharacterUpdateStatsMentalModal } = require('../../modals/characterUpdateStatsMentalModal.js');

// Création d'un tableau de fonctions
const actionList = {
	name: buildCharacterUpdateNameModal,
	story: buildCharacterUpdateStoryModal,
	traits: buildCharacterUpdateTraitsModal,
	picture: buildCharacterUpdatePictureModal,
	race: buildCharacterUpdateSpeciesSelect,
	hybrid: buildCharacterUpdateSpeciesSelect,
};

// Exports de composants
module.exports = {
	// data: nom, description et options de la commande
	data: new SlashCommandBuilder()
		.setName('set')
		.setDescription('Changer un aspect de votre personnage')
		.addStringOption(option =>
			option.setName('choice')
				.setDescription('Ce que vous voulez modifier')
				.setRequired(true)
				.addChoices(
					{ name: 'Nom', value: 'name' },
					{ name: 'Histoire', value: 'story' },
					{ name: 'Traits', value: 'traits' },
					{ name: 'Image', value: 'picture' },
					{ name: 'Statistiques de Combat', value: 'statsFight' },
					{ name: 'Statistiques de Mental', value: 'statsMental' },
					{ name: 'Race', value: 'race' },
					{ name: 'Race Hybride', value: 'hybrid' },
				)),
	// execute(): méthode éxécutée quand la commande est appelée
	async execute(interaction) {
		// Récupération des informations sur l'utilisateur ayant appelé la commande
		const userDiscordId = interaction.user.id;
		const choice = interaction.options.getString('choice');

		// Récupération d'un User et de son Character actuel
		const user = await DBUsers.findOne({
			where:
				{ discord_id: userDiscordId },
		});
		const chararacter = await DBCharacters.findOne({
			where:
				{ id: user.current_character },
		});

		// Gestion d'erreur dans le cas où l'utilisateur n\'a pas de personnage sélectionné
		if (chararacter == null || chararacter.length < 1) {
			return await interaction.reply({
				content: 'Action impossible: Vous devez d\'abord choisir un personnage',
				ephemeral: true,
			});
		}
		// Gestion d'erreur dans le cas où le personnage a été validé avant
		if (chararacter.ready == 1) {
			return await interaction.reply({
				content: 'Action impossible: Ce personnage a déjà été validé et ne peut pas être modifié',
				ephemeral: true,
			});
		}

		// Création d'un Select ou d'un Modal en fonction du choix de l'utilisateur
		let toSend;
		if (choice == 'statsFight') {
			toSend = await buildCharacterUpdateStatsFightModal(chararacter.phy, chararacter.dex, chararacter.eso);
		}
		else if (choice == 'statsMental') {
			toSend = await buildCharacterUpdateStatsMentalModal(chararacter.int, chararacter.cha, chararacter.sur);
		}
		else {
			toSend = await actionList[choice](chararacter[choice], choice);
		}

		// Envoie de toSend à l'utilisateur
		if (['race', 'hybrid'].includes(choice)) {
			return await interaction.reply({
				components: [toSend],
				ephemeral: true,
			});
		}
		else {
			return await interaction.showModal(toSend);
		}
	},
};