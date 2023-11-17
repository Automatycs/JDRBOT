const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

const characterUpdateStoryModal = new ModalBuilder()
	.setCustomId('characterUpdateStoryModal')
	.setTitle('Changement d\'histoire');

const newStoryInput = new TextInputBuilder()
	.setCustomId('newStoryInput')
	.setLabel('Nouvelle histoire:')
	.setStyle(TextInputStyle.Paragraph)
	.setRequired(true)
	.setMaxLength(1000)
	.setPlaceholder('Lorem Ispum ....');

const firstActionRow = new ActionRowBuilder().addComponents(newStoryInput);

characterUpdateStoryModal.addComponents(firstActionRow);

module.exports = { characterUpdateStoryModal };
