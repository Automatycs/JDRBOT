const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

async function buildCharacterUpdateStatsMentalModal(prev_int, prev_cha, prev_sur) {
	const modal = new ModalBuilder()
		.setCustomId('characterUpdateStatsMentalModal')
		.setTitle('Changement des statistiques mentales');

	const newIntInput = new TextInputBuilder()
		.setCustomId('newIntInput')
		.setLabel('Nouvelle valeur d\'intelligence:')
		.setStyle(TextInputStyle.Short)
		.setRequired(true)
		.setMaxLength(1)
		.setValue(prev_int.toString());

	const newChaInput = new TextInputBuilder()
		.setCustomId('newChaInput')
		.setLabel('Nouvelle valeur de charisme:')
		.setStyle(TextInputStyle.Short)
		.setRequired(true)
		.setMaxLength(1)
		.setValue(prev_cha.toString());

	const newSurInput = new TextInputBuilder()
		.setCustomId('newSurInput')
		.setLabel('Nouvelle valeur de survivalisme:')
		.setStyle(TextInputStyle.Short)
		.setRequired(true)
		.setMaxLength(1)
		.setValue(prev_sur.toString());

	const firstActionRow = new ActionRowBuilder().addComponents(newIntInput);
	const secondActionRow = new ActionRowBuilder().addComponents(newChaInput);
	const thirdActionRow = new ActionRowBuilder().addComponents(newSurInput);

	modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);
	return (modal);
}

module.exports = { buildCharacterUpdateStatsMentalModal };