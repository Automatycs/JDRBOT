const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

async function buildCharacterUpdateTraitsModal(prev) {
	const modal = new ModalBuilder()
		.setCustomId('characterUpdateTraitsModal')
		.setTitle('Changement des traits');

	const newTraitInput = new TextInputBuilder()
		.setCustomId('newTraitsInput')
		.setLabel('Nouveaux traits:')
		.setStyle(TextInputStyle.Paragraph)
		.setRequired(true)
		.setMaxLength(1000)
		.setPlaceholder('- Tic\n- Tac')
		.setValue(prev);

	const firstActionRow = new ActionRowBuilder().addComponents(newTraitInput);
	modal.addComponents(firstActionRow);

	return (modal);
}

module.exports = { buildCharacterUpdateTraitsModal };
