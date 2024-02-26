const { SlashCommandBuilder } = require('discord.js');
const { DBUsers, DBCharacters } = require('../../database/createDatabase.js');
const { createRollResultEmbed } = require('../../embeds/rollResultEmbed.js');

async function doConflict(character) {
	const favors = [0, 0.33, -0.33];
	let new_destiny = 0;

	const opposition_roll = Math.floor(Math.random() * 100) + 1;
	let player_roll = Math.floor(Math.random() * 100) + 1;

	player_roll += Math.floor(player_roll * favors[character.favor]);
	if (![character.race, character.hybrid].includes('Elfes du Chaos')) {
		player_roll += character.destiny;
		if (player_roll > 50 && character.destiny <= 0) {
			new_destiny = character.destiny - 5;
		}
		else if (player_roll <= 50 && character.destiny >= 0) {
			new_destiny = character.destiny + 5;
		}
		else {
			new_destiny = 0;
		}
	}
	await character.update({
		favor: await Math.floor(Math.random() * 3),
		destiny: new_destiny,
	});

	if (opposition_roll > player_roll) {
		return (character.name + ' défaite');
	}
	else if (opposition_roll < player_roll) {
		return (character.name + ' victoire');
	}
	else if (Math.floor(Math.random() * 2)) {
		return (character.name + ' victoire');
	}
	else {
		return (character.name + ' défaite');
	}
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('roll')
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
		const userDiscordId = interaction.user.id;
		const charac = interaction.options.getString('charac');
		const level = interaction.options.getString('level');

		const user = await DBUsers.findOne({ where: { discord_id: userDiscordId } });
		const character = await DBCharacters.findOne({ where: { id: user.current_character } });

		if (character == null || character.length == 0) {
			return await interaction.reply({
				content: 'Action impossible: Vous n\'avez sélectionné aucun personnage.',
				ephemeral: true,
			});
		}

		let message = 'charac: ' + charac + '\nlevel: ' + level + '\n';

		if (level > character[charac]) {
			message += character.name + ' défaite écrasante';
		}
		else if (level < character[charac]) {
			message += character.name + ' victoire écrasante';
		}
		else {
			message += await doConflict(character);
		}

		const embed = await createRollResultEmbed(message);

		return await interaction.reply({
			embeds: [embed],
			ephemeral: false,
		});
	},
};
