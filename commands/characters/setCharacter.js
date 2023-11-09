const { SlashCommandBuilder } = require('discord.js');
const { DBUsers, DBCharacters } = require('../../database/createDatabase.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('set')
		.setDescription('Changer un aspect de ton personnage')
		.addStringOption(option =>
			option.setName('choice')
				.setDescription('Ce que tu veux modifier')
				.setRequired(true)
				.addChoices(
					{ name: 'Nom', value: 'name' },
					{ name: 'Histoire', value: 'story' },
					{ name: 'Traits', value: 'trait' },
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
		const choice = interaction.options.getString('choice');

		if (char == null || char.length < 1) {
			await interaction.reply('Choisis un personnage d\'abord gros nullos');
			return;
		}
		switch (choice) {
		case 'name':
			await interaction.reply(choice);
			break;
		case 'story':
			await interaction.reply(choice);
			break;
		case 'trait':
			await interaction.reply(choice);
			break;
		case 'picture':
			await interaction.reply(choice);
			break;
		case 'phy':
			await interaction.reply(choice);
			break;
		case 'dex':
			await interaction.reply(choice);
			break;
		case 'eso':
			await interaction.reply(choice);
			break;
		case 'int':
			await interaction.reply(choice);
			break;
		case 'cha':
			await interaction.reply(choice);
			break;
		case 'sur':
			await interaction.reply(choice);
			break;
		case 'race':
			await interaction.reply(choice);
			break;
		case 'hybrid':
			await interaction.reply(choice);
			break;
		}

	},
};