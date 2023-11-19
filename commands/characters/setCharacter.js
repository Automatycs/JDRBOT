// Imports de composants
const { SlashCommandBuilder } = require('discord.js');
const { DBUsers, DBCharacters } = require('../../database/createDatabase.js');
const { buildCharacterUpdateNameModal } = require('../../modals/characterUpdateNameModal.js');
const { buildCharacterUpdatePictureModal } = require('../../modals/characterUpdatePictureModal.js');
const { buildCharacterUpdateStoryModal } = require('../../modals/characterUpdateStoryModal.js');
const { buildCharacterUpdateTraitsModal } = require('../../modals/characterUpdateTraitsModal.js');
const { buildCharacterUpdateStatsSelect } = require('../../selects/characterUpdateStatsSelect.js');
const { buildCharacterUpdateSpeciesSelect } = require('../../selects/characterUpdateSpeciesSelect.js');

const test = {
	name: buildCharacterUpdateNameModal,
	story: buildCharacterUpdateStoryModal,
	traits: buildCharacterUpdateTraitsModal,
	picture: buildCharacterUpdatePictureModal,
	phy: buildCharacterUpdateStatsSelect,
	dex: buildCharacterUpdateStatsSelect,
	eso: buildCharacterUpdateStatsSelect,
	int: buildCharacterUpdateStatsSelect,
	cha: buildCharacterUpdateStatsSelect,
	sur: buildCharacterUpdateStatsSelect,
	race: buildCharacterUpdateSpeciesSelect,
	hybrid: buildCharacterUpdateSpeciesSelect,
};

// Exports de composants
module.exports = {
	data: new SlashCommandBuilder()
	// data: nom, description et options de la commande
		.setName('set')
		.setDescription('Changer un aspect de ton personnage')
		.addStringOption(option =>
			option.setName('choice')
				.setDescription('Ce que tu veux modifier')
				.setRequired(true)
				.addChoices(
					{ name: 'Nom', value: 'name' },
					{ name: 'Histoire', value: 'story' },
					{ name: 'Traits', value: 'traits' },
					{ name: 'Image', value: 'picture' },
					{ name: 'Physique', value: 'phy' },
					{ name: 'Dextérité', value: 'dex' },
					{ name: 'Esotérisme', value: 'eso' },
					{ name: 'Intelligence', value: 'int' },
					{ name: 'Charisme', value: 'cha' },
					{ name: 'Survivalisme', value: 'sur' },
					{ name: 'Race', value: 'race' },
					{ name: 'Race Hybride', value: 'hybrid' },
				)),
	// execute(): méthode éxécutée quand la commande est appelée
	async execute(interaction) {
		const user = await DBUsers.findOne({ where: { discord_id: interaction.user.id } });
		const char = await DBCharacters.findOne({ where: { id: user.current_character } });
		const choice = interaction.options.getString('choice');

		if (char == null || char.length < 1) {
			await interaction.reply('Choisis un personnage d\'abord gros nullos');
			return;
		}

		const toSend = await test[choice](char[choice], choice);
		if (['name', 'story', 'picture', 'traits'].includes(choice)) {
			await interaction.showModal(toSend);
		}
		else {
			await interaction.reply({
				components: [toSend],
				ephemeral: true,
			});
		}
	},
};