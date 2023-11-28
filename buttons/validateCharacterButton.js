// Imports de composants
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

// buildValidateCharacterButton(color): méthode permettant de créer un Button et de gérer son état en fonction de la valeur color
function buildValidateCharacterButton(color) {
	// Création de l'ActionRow qui recevra le Button une fois créé
	const row = new ActionRowBuilder();

	// Initialisation du Button et de ses valeurs statiques
	const button = new ButtonBuilder()
		.setCustomId('validateCharacter')
		.setLabel('Finaliser mon personnage!')
		.setStyle(ButtonStyle.Success);

	// Changement de l'état du Button en fonction de color
	if (color == 10358336) {
		button.setDisabled(false);
	}
	else {
		button.setDisabled(true);
	}

	// Ajout du Boutton à l'ActionRow et envoie de cette dernière
	row.addComponents(button);
	return (row);
}

// Exports de composant
module.exports = { buildValidateCharacterButton };