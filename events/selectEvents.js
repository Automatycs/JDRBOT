const { Events } = require('discord.js');
const { client } = require('../index.js');
const { DBCharacters, DBUsers } = require('../database/createDatabase.js');
const { createCharacterEmbeds } = require('../embeds/createCharacterEmbed.js');
const { Pagination } = require('pagination.djs');

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isStringSelectMenu()) return;

	if (interaction.customId === 'checkCharSelect') {
		const char = await DBCharacters.findOne({ where: { id: interaction.values[0] } });
		const embeds = await createCharacterEmbeds(char);
		const pagination = new Pagination(interaction);

		await pagination.setEmbeds(embeds);

		await pagination.update();
	}

	if (interaction.customId === 'selectCharSelect') {
		const char = await DBCharacters.findOne({ where: { id: interaction.values[0] } });
		await DBUsers.update(
			{ current_character: interaction.values[0] },
			{ where: { discord_id: char.user_id } });

		await interaction.update({
			content: 'Changement de personnage effectué!',
			components: [],
			ephemeral: true,
		});
	}

	if (interaction.customId === 'characterUpdateRaceSelect') {
		const user = await DBUsers.findOne({
			where:
				{ discord_id: interaction.user.id },
		});
		const newRace = interaction.values[0];

		await DBCharacters.update(
			{
				race: newRace,
			},
			{
				where:
					{ id: user.current_character },
			},
		);
		await interaction.update({
			content: 'La race de ton personnage a été mise à jour!',
			components: [],
			ephemeral: true,
		});
	}


	if (interaction.customId === 'characterUpdateHybridSelect') {
		const user = await DBUsers.findOne({
			where:
				{ discord_id: interaction.user.id },
		});
		let newHybrid = interaction.values[0];

		if (newHybrid == 'null') {
			newHybrid = null;
		}
		await DBCharacters.update(
			{
				hybrid: newHybrid,
			},
			{
				where:
					{ id: user.current_character },
			},
		);
		await interaction.update({
			content: 'La race hybride de ton personnage a été mise à jour!',
			components: [],
			ephemeral: true,
		});
	}


	if (interaction.customId === 'characterUpdatePhySelect') {
		const user = await DBUsers.findOne({
			where:
				{ discord_id: interaction.user.id },
		});
		const newPhy = interaction.values[0];

		await DBCharacters.update(
			{
				phy: newPhy,
			},
			{
				where:
					{ id: user.current_character },
			},
		);
		await interaction.update({
			content: 'Le physique de ton personnage a été mis à jour!',
			components: [],
			ephemeral: true,
		});
	}


	if (interaction.customId === 'characterUpdateDexSelect') {
		const user = await DBUsers.findOne({
			where:
				{ discord_id: interaction.user.id },
		});
		const newDex = interaction.values[0];

		await DBCharacters.update(
			{
				dex: newDex,
			},
			{
				where:
					{ id: user.current_character },
			},
		);
		await interaction.update({
			content: 'La dextérité de ton personnage a été mise à jour!',
			components: [],
			ephemeral: true,
		});
	}


	if (interaction.customId === 'characterUpdateEsoSelect') {
		const user = await DBUsers.findOne({
			where:
				{ discord_id: interaction.user.id },
		});
		const newEso = interaction.values[0];

		await DBCharacters.update(
			{
				eso: newEso,
			},
			{
				where:
					{ id: user.current_character },
			},
		);
		await interaction.update({
			content: 'L\'ésotérisme de ton personnage a été mis à jour!',
			components: [],
			ephemeral: true,
		});
	}


	if (interaction.customId === 'characterUpdateIntSelect') {
		const user = await DBUsers.findOne({
			where:
				{ discord_id: interaction.user.id },
		});
		const newInt = interaction.values[0];

		await DBCharacters.update(
			{
				int: newInt,
			},
			{
				where:
					{ id: user.current_character },
			},
		);
		await interaction.update({
			content: 'L\'intelligence de ton personnage a été mise à jour!',
			components: [],
			ephemeral: true,
		});
	}


	if (interaction.customId === 'characterUpdateChaSelect') {
		const user = await DBUsers.findOne({
			where:
				{ discord_id: interaction.user.id },
		});
		const newCha = interaction.values[0];

		await DBCharacters.update(
			{
				cha: newCha,
			},
			{
				where:
					{ id: user.current_character },
			},
		);
		await interaction.update({
			content: 'Le charisme de ton personnage a été mis à jour!',
			components: [],
			ephemeral: true,
		});
	}


	if (interaction.customId === 'characterUpdateSurSelect') {
		const user = await DBUsers.findOne({
			where:
				{ discord_id: interaction.user.id },
		});
		const newSur = interaction.values[0];

		await DBCharacters.update(
			{
				sur: newSur,
			},
			{
				where:
					{ id: user.current_character },
			},
		);
		await interaction.update({
			content: 'Le survivalisme de ton personnage a été mis à jour!',
			components: [],
			ephemeral: true,
		});
	}
});