const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

async function buildCharacterFirstStepModal() {
	const modal = new ModalBuilder()
		.setCustomId('characterFirstStepModal')
		.setTitle('Première étape');

	const nameInput = new TextInputBuilder()
		.setCustomId('nameInput')
		.setLabel('Le nom de ton personnage:')
		.setStyle(TextInputStyle.Short)
		.setMaxLength(50);

	const storyInput = new TextInputBuilder()
		.setCustomId('storyInput')
		.setLabel('L\'histoire (brève) de ton personnage:')
		.setStyle(TextInputStyle.Paragraph)
		.setRequired(false)
		.setMaxLength(1000)
		.setPlaceholder('Lorem Ispum ....');

	const traitsInput = new TextInputBuilder()
		.setCustomId('traitsInput')
		.setLabel('Anectodes et traits de ton personnage:')
		.setStyle(TextInputStyle.Paragraph)
		.setRequired(false)
		.setMaxLength(1000);

	const pictureInput = new TextInputBuilder()
		.setCustomId('pictureInput')
		.setLabel('L\'URL de l\'image de ton personnage:')
		.setStyle(TextInputStyle.Short)
		.setRequired(false)
		.setMaxLength(500)
		.setPlaceholder('https://.....');

	const firstActionRow = new ActionRowBuilder().addComponents(nameInput);
	const secondActionRow = new ActionRowBuilder().addComponents(storyInput);
	const thirdActionRow = new ActionRowBuilder().addComponents(traitsInput);
	const fourthActionRow = new ActionRowBuilder().addComponents(pictureInput);

	modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow);
	return (modal);
}
module.exports = { buildCharacterFirstStepModal };