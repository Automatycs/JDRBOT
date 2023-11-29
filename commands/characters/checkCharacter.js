// Imports de composants
const { SlashCommandBuilder } = require('discord.js');
const { DBUsers, DBCharacters } = require('../../database/createDatabase.js');
const { buildCheckCharacterSelect } = require('../../selects/checkCharSelect.js');

// Exports de composants
module.exports = {
	// data: nom, description et définition des options de la commande
	data: new SlashCommandBuilder()
		.setName('check')
		.setDescription('Regarder la fiche d\'un personnage')
		.addUserOption(option =>
			option
				.setName('joueur')
				.setDescription('le joueur possédant le personnage à voir')
				.setRequired(true),
		),
	// execute(): méthode éxécutée quand la commande est appelée
	async execute(interaction) {
		// Récupération de l'User donné par la commande
		const user = await DBUsers.findOne({
			where:
				{ discord_id: interaction.options.getUser('joueur').id },
		});

		// Gestion d'erreur dans le cas où l'User donné n'est pas enregistré$
		if (user == null) {
			return await interaction.reply({
				content: 'Action impossible: cette personne n\'est pas enregistrée.',
				ephemeral: true,
			});
		}

		// Récupération des Characters de l'User
		const characters = await DBCharacters.findAll({
			where:
				{ user_id: user.discord_id },
		});

		// Gestion d'erreur dans le cas où l'User ne possède aucun Characters
		if (characters.length == 0) {
			return await interaction.reply({
				content: 'Action impossible: ' + user.name + ' n\'a pas de personnages.',
				ephemeral: true,
			});
		}

		// Création d'un SelectMenu avec les informations données
		const select = await buildCheckCharacterSelect(characters);

		// Envoi du message contenant le SelectMenu
		return await interaction.reply({
			content: 'Vous regardez:',
			components: [select],
			ephemeral: true,
		});
	},
};