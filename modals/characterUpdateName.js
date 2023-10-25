const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

const characterUpdateNameModal = new ModalBuilder()
	.setCustomId('characterUpdateName')
	.setTitle('Changement de nom');

const newNameInput = new TextInputBuilder()
	.setCustomId('newNameInput')
	.setLabel('Nouveau nom:')
	.setStyle(TextInputStyle.Short)
	.setRequired(true)
	.setMaxLength(50);

const firstActionRow = new ActionRowBuilder().addComponents(newNameInput);

characterUpdateNameModal.addComponents(firstActionRow);

module.exports = { characterUpdateNameModal };
