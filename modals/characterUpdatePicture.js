const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

const characterUpdatePictureModal = new ModalBuilder()
	.setCustomId('characterUpdatePicture')
	.setTitle('Changement d\'image');

const newPictureInput = new TextInputBuilder()
	.setCustomId('newPictureInput')
	.setLabel('Nouvelle URL:')
	.setStyle(TextInputStyle.Short)
	.setRequired(true)
	.setMaxLength(500)
	.setPlaceholder('https://.....');

const firstActionRow = new ActionRowBuilder().addComponents(newPictureInput);

characterUpdatePictureModal.addComponents(firstActionRow);

module.exports = { characterUpdatePictureModal };
