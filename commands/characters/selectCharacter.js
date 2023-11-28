// Imports de composants
const { SlashCommandBuilder } = require('discord.js');
const { DBUsers, DBCharacters } = require('../../database/createDatabase.js');
const { buildSelectCharacterSelect } = require('../../selects/selectCharacterSelect.js');

// Exports de composants
module.exports = {
	// data: nom et description de la commande
	data: new SlashCommandBuilder()
		.setName('select')
		.setDescription('Changer de personnage'),
	// execute(): méthode éxécutée quand la commande est appelée
	async execute(interaction) {
		// Récupération des informations sur l'utilisateur ayant appelé la commande
		const userDiscordId = interaction.user.id;

		// Récupération d'un User et de ses Characters
		const user = await DBUsers.findOne({
			where:
				{ discord_id: userDiscordId },
		});
		const characters = await DBCharacters.findAll({
			where:
				{ user_id: userDiscordId },
		});

		// Gestion d'erreur dans le cas où l'User ne possède aucun Characters
		if (characters.length() == 0) {
			return await interaction.reply({
				content: 'Action impossible: Vous n\'avez pas de personnages.',
				ephemeral: true,
			});
		}

		// Création d'un SelectMenu avec les informations données
		const select = await buildSelectCharacterSelect(characters, user);

		// Envoi du message contenant le SelectMenu
		return await interaction.reply({
			components: [select],
			ephemeral: true,
		});
	},
};
