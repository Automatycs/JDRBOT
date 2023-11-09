const { SlashCommandBuilder } = require('discord.js');
const { DBUsers, DBCharacters } = require('../../database/createDatabase.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('set')
		.setDescription('Changer un aspect de ton personnage')
		.addStringOption(option =>
			option.setName('choix')
				.setDescription('Ce que tu veux modifier')
				.setRequired(true)
				.addChoices(
					{ name: 'Nom', value: 'name' },
					{ name: 'Histoire', value: 'story' },
					{ name: 'Traits', value: 'traits' },
					{ name: 'Image', value: 'picture' },
					{ name: 'Physique', value: 'phy' },
					{ name: 'Dextérité', value: 'dex' },
					{ name: 'Esotérisme', value: 'eso' },
					{ name: 'Intelligence', value: 'int' },
					{ name: 'Charisme', value: 'cha' },
					{ name: 'Survivalisme', value: 'sur' },
					{ name: 'Race', value: 'race' },
					{ name: 'Race Hybride', value: 'hybrid' },
				)),
	async execute(interaction) {
		const user = await DBUsers.findOne({ where: { discord_id: interaction.user.id } });
		const char = await DBCharacters.findOne({ where: { id: user.current_character } });

		if (char == null || char.length < 1) {
			await interaction.reply('Choisis un personnage d\'abord gros nullos');
		}
		console.log('zwey');
	},
};