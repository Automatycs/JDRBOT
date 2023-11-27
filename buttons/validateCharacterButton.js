const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

async function buildValidateCharacterButton(color) {
	const row = new ActionRowBuilder();
	const button = new ButtonBuilder()
		.setCustomId('validateCharacter')
		.setLabel('Finaliser mon personnage!')
		.setStyle(ButtonStyle.Success);

	if (color == 10358336) {
		button.setDisabled(false);
	}
	else {
		button.setDisabled(true);
	}

	row.addComponents(button);
	return (row);
}

module.exports = { buildValidateCharacterButton };