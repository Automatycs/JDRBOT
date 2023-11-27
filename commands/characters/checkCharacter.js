// Imports de composants
const { SlashCommandBuilder } = require('discord.js');
const { DBUsers, DBCharacters } = require('../../database/createDatabase.js');
const { buildCheckCharacterSelect } = require('../../selects/checkCharSelect.js');

// Exports de composants
module.exports = {
	// data: nom et description de la commande
	data: new SlashCommandBuilder()
		.setName('check')
		.setDescription('Regarde la fiche d\'un personnage')
		.addUserOption(option =>
			option
				.setName('joueur')
				.setDescription('le joueur possédant le personnage à voir')
				.setRequired(true),
		),
	// execute(): méthode éxécutée quand la commande est appelée
	async execute(interaction) {
		// Récupération de tout les Users et Characters
		const user = await DBUsers.findOne({
			where:
				{ discord_id: interaction.options.getUser('joueur').id },
		});
		const chars = await DBCharacters.findAll({
			where:
				{ user_id: user.discord_id },
		});

		// Création d'un SelectMenu avec les informations données
		const select = await buildCheckCharacterSelect(user, chars);

		// Envoi du message contenant le SelectMenu
		await interaction.reply({
			content: 'Je regarde:',
			components: [select],
			ephemeral: true,
		});
	},
};