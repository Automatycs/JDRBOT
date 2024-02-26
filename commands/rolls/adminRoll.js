const { SlashCommandBuilder } = require('discord.js');
const { DBUsers, DBCharacters } = require('../../database/createDatabase.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('adminroll')
		.setDescription('adminroll')
		.addUserOption(option =>
			option
				.setName('joueur')
				.setDescription('le joueur possédant le personnage à voir')
				.setRequired(true),
		)
		.addStringOption(option =>
			option.setName('charac')
				.setDescription('la stat a utilisé')
				.setRequired(true)
				.addChoices(
					{ name: 'Physique', value: 'phy' },
					{ name: 'Dextérité', value: 'dex' },
					{ name: 'Esotérisme', value: 'eso' },
					{ name: 'Intelligence', value: 'int' },
					{ name: 'Charisme', value: 'cha' },
					{ name: 'Survivalisme', value: 'sur' },
				))
		.addStringOption(option =>
			option.setName('level')
				.setDescription('La difficulté du jet')
				.setRequired(true)
				.addChoices(
					{ name: '1', value: '1' },
					{ name: '2', value: '2' },
					{ name: '3', value: '3' },
					{ name: '4', value: '4' },
					{ name: '5', value: '5' },
				)),
	async execute(interaction) {
		const charac = interaction.options.getString('charac');
		const level = interaction.options.getString('level');
		const userId = interaction.options.getUser('joueur').id;

		const user = await DBUsers.findOne({
			where:
				{ discord_id: userId },
		});
		if (user == null) {
			return await interaction.reply({
				content: 'Action impossible: cette personne n\'est pas enregistrée.',
				ephemeral: true,
			});
		}

		const chararacter = await DBCharacters.findOne({
			where:
				{ id: user.current_character },
		});

		console.log(charac);
		console.log(chararacter);
		console.log(level);
	},
};