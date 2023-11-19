const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

async function buildCharacterUpdatePictureModal(prev) {
	const modal = new ModalBuilder()
		.setCustomId('characterUpdatePictureModal')
		.setTitle('Changement d\'image');

	const newPictureInput = new TextInputBuilder()
		.setCustomId('newPictureInput')
		.setLabel('Nouvelle URL:')
		.setStyle(TextInputStyle.Short)
		.setRequired(true)
		.setMaxLength(500)
		.setPlaceholder('https://.....')
		.setValue(prev);

	const firstActionRow = new ActionRowBuilder().addComponents(newPictureInput);
	modal.addComponents(firstActionRow);

	return (modal);
}

module.exports = { buildCharacterUpdatePictureModal };
