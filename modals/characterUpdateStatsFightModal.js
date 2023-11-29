const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

async function buildCharacterUpdateStatsFightModal(prev_phy, prev_dex, prev_eso) {
	const modal = new ModalBuilder()
		.setCustomId('characterUpdateStatsFightModal')
		.setTitle('Changement des statistiques de combat');

	const newphyInput = new TextInputBuilder()
		.setCustomId('newPhyInput')
		.setLabel('Nouvelle valeur de physique:')
		.setStyle(TextInputStyle.Short)
		.setRequired(true)
		.setMaxLength(1)
		.setValue(prev_phy.toString());

	const newDexInput = new TextInputBuilder()
		.setCustomId('newDexInput')
		.setLabel('Nouvelle valeur de dextérité:')
		.setStyle(TextInputStyle.Short)
		.setRequired(true)
		.setMaxLength(1)
		.setValue(prev_dex.toString());

	const newEsoInput = new TextInputBuilder()
		.setCustomId('newEsoInput')
		.setLabel('Nouvelle valeur d\'ésotérisme:')
		.setStyle(TextInputStyle.Short)
		.setRequired(true)
		.setMaxLength(1)
		.setValue(prev_eso.toString());

	const firstActionRow = new ActionRowBuilder().addComponents(newphyInput);
	const secondActionRow = new ActionRowBuilder().addComponents(newDexInput);
	const thirdActionRow = new ActionRowBuilder().addComponents(newEsoInput);

	modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);
	return (modal);
}

module.exports = { buildCharacterUpdateStatsFightModal };