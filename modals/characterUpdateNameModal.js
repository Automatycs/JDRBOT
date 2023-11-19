const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

async function buildCharacterUpdateNameModal(prev) {
	const modal = new ModalBuilder()
		.setCustomId('characterUpdateNameModal')
		.setTitle('Changement de nom');

	const newNameInput = new TextInputBuilder()
		.setCustomId('newNameInput')
		.setLabel('Nouveau nom:')
		.setStyle(TextInputStyle.Short)
		.setRequired(true)
		.setMaxLength(50)
		.setValue(prev);

	const firstActionRow = new ActionRowBuilder().addComponents(newNameInput);
	modal.addComponents(firstActionRow);

	return (modal);
}

module.exports = { buildCharacterUpdateNameModal };
