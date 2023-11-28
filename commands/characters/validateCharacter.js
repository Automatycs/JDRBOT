// Imports de composants
const { SlashCommandBuilder } = require('discord.js');
const { DBUsers, DBCharacters } = require('../../database/createDatabase.js');
const { buildCharacterIssuesEmbed } = require('../../embeds/characterIssuesEmbed.js');
const { buildValidateCharacterButton } = require('../../buttons/validateCharacterButton.js');

// Exports de composants
module.exports = {
	// data: nom et description de la commande
	data: new SlashCommandBuilder()
		.setName('validate')
		.setDescription('Valider un personnage pour le rendre jouable'),
	// execute(): méthode éxécutée quand la commande est appelée
	async execute(interaction) {
		// Récupération des informations sur l'utilisateur ayant appelé la commande
		const userDiscordId = interaction.user.id;

		// Récupération d'un User et de son Character actuel
		const user = await DBUsers.findOne({
			where:
				{ discord_id: userDiscordId },
		});
		const chararacter = await DBCharacters.findOne({
			where:
				{ id: user.current_character },
		});

		// Gestion d'erreur dans le cas où l'utilisateur n\'a pas de personnage sélectionné
		if (chararacter == null || chararacter.length < 1) {
			return await interaction.reply({
				content: 'Action impossible: Vous devez d\'abord choisir un personnage',
				ephemeral: true,
			});
		}
		// Gestion d'erreur dans le cas où le personnage a été validé avant
		if (chararacter.ready == 1) {
			return await interaction.reply({
				content: 'Action impossible: Ce personnage a déjà été validé et ne peut pas être modifié',
				ephemeral: true,
			});
		}

		// Création d'un Embed et d'un Button lié aux résultats obtenu par l'Embed
		const errorEmbeb = await buildCharacterIssuesEmbed(chararacter, user);
		const errorButton = await buildValidateCharacterButton(errorEmbeb.data.color);

		// Envoie de l'Embed et du Button
		return await interaction.reply({
			embeds: [errorEmbeb],
			components: [errorButton],
		});
	},
};
