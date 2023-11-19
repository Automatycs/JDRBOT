const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

async function buildCharacterUpdateStoryModal(prev) {
	const modal = new ModalBuilder()
		.setCustomId('characterUpdateStoryModal')
		.setTitle('Changement d\'histoire');

	const newStoryInput = new TextInputBuilder()
		.setCustomId('newStoryInput')
		.setLabel('Nouvelle histoire:')
		.setStyle(TextInputStyle.Paragraph)
		.setRequired(true)
		.setMaxLength(1000)
		.setPlaceholder('Lorem Ispum ....')
		.setValue(prev);

	const firstActionRow = new ActionRowBuilder().addComponents(newStoryInput);
	modal.addComponents(firstActionRow);

	return (modal);
}

module.exports = { buildCharacterUpdateStoryModal };
