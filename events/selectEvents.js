// Imports de composants
const { Events } = require('discord.js');
const { client } = require('../index.js');
const { DBCharacters, DBUsers } = require('../database/createDatabase.js');
const { createCharacterEmbeds } = require('../embeds/createCharacterEmbed.js');
const { Pagination } = require('pagination.djs');

// Création d'un détecteur d'intéraction
client.on(Events.InteractionCreate, async interaction => {
	// Si l'intéraction n'est pas une intéraction lié au StringSelectMenu, on empêche toutes actions
	if (!interaction.isStringSelectMenu()) return;

	/*
	* Cas: 		checkCharSelect
	* Source: 	checkCharSelect.js
	* Méthode:	buildCheckCharacterSelect()
	*/
	if (interaction.customId === 'checkCharSelect') {
		// Récupération du personnage indiqué par l'utilisateur
		const character = await DBCharacters.findOne({
			where:
				{ id: interaction.values[0] },
		});

		// Création de plusieurs Embeds contenant les informations du personnage
		const embeds = await createCharacterEmbeds(character);

		// Mise en pagination des Embeds
		const pagination = new Pagination(interaction);
		await pagination.setEmbeds(embeds);

		// Envoi des Embeds à l'utilisateur
		return await pagination.update();
	}


	/*
	* Cas:		selectCharSelect
	* Source:	selectCharacterSelect.js
	* Méthode:	buildSelectCharacterSelect
	*/
	if (interaction.customId === 'selectCharSelect') {
		// Récupération du personnage indiqué par l'utilisateur
		const char = await DBCharacters.findOne({
			where:
				{ id: interaction.values[0] },
		});

		// Changement de la valeur current_character de l'utilisateur
		await DBUsers.update(
			{
				current_character: interaction.values[0],
			},
			{
				where:
					{ discord_id: char.user_id },
			},
		);

		// Envoi d'un message de validation à l'utilisateur
		return await interaction.update({
			content: 'Vous avez changé de personnage avec succès.',
			components: [],
			ephemeral: true,
		});
	}


	/*
	* Cas:		characterUpdateRaceSelect
	* Source:	characterUpdateSpeciesSelect.js
	* Méthode:	buildCharacterUpdateSpeciesSelect
	*/
	if (interaction.customId === 'characterUpdateRaceSelect') {
		// Récupération de l'User étant à l'origine de la commande
		const user = await DBUsers.findOne({
			where:
				{ discord_id: interaction.user.id },
		});

		// Récupération de la race donnée par l'utilisateur
		const newRace = interaction.values[0];

		// Mise à jour de la race du Character actuel de l'User
		await DBCharacters.update(
			{
				race: newRace,
			},
			{
				where:
					{ id: user.current_character },
			},
		);

		// Envoi d'un message de validation à l'utilisateur
		return await interaction.update({
			content: 'Vous avez changé la race de votre personnage avec succès',
			components: [],
			ephemeral: true,
		});
	}


	/*
	* Cas:		characterUpdateHybridSelect
	* Source:	characterUpdateSpeciesSelect.js
	* Méthode:	buildCharacterUpdateSpeciesSelect
	*/
	if (interaction.customId === 'characterUpdateHybridSelect') {
		// Récupération de l'User étant à l'origine de la commande
		const user = await DBUsers.findOne({
			where:
				{ discord_id: interaction.user.id },
		});

		// Récupération de la race hybride donnée par l'utilisateur
		let newHybrid = interaction.values[0];

		// Si l'utilisateur a indiqué ne pas vouloir de race hybride, change la valeur de newHybrid
		if (newHybrid == 'null') {
			newHybrid = null;
		}

		// Mise à jour de la race hybride du Character actuel de l'User
		await DBCharacters.update(
			{
				hybrid: newHybrid,
			},
			{
				where:
					{ id: user.current_character },
			},
		);

		// Envoi d'un message de validation à l'utilisateur
		return await interaction.update({
			content: 'Vous avez changé la race hybride de votre personnage avec succès.',
			components: [],
			ephemeral: true,
		});
	}


	/*
	* Cas:		characterUpdatePhySelect
	* Source:	characterUpdateStatsSelect.js
	* Méthode:	buildCharacterUpdateStatsSelect
	*/
	if (interaction.customId === 'characterUpdatePhySelect') {
		// Récupération de l'User étant à l'origine de la commande
		const user = await DBUsers.findOne({
			where:
				{ discord_id: interaction.user.id },
		});

		// Récupération de la valeur de Physique donnée par l'utilisateur
		const newPhy = interaction.values[0];

		// Mise à jour de la valeur de Physique du Character actuel de l'User
		await DBCharacters.update(
			{
				phy: newPhy,
			},
			{
				where:
					{ id: user.current_character },
			},
		);

		// Envoi d'un message de validation à l'utilisateur
		return await interaction.update({
			content: 'Vous avez changé la valeur de Physique de votre personnage avec succès.',
			components: [],
			ephemeral: true,
		});
	}


	/*
	* Cas:		characterUpdateDexSelect
	* Source:	characterUpdateStatsSelect.js
	* Méthode:	buildCharacterUpdateStatsSelect
	*/
	if (interaction.customId === 'characterUpdateDexSelect') {
		// Récupération de l'User étant à l'origine de la commande
		const user = await DBUsers.findOne({
			where:
				{ discord_id: interaction.user.id },
		});

		// Récupération de la valeur de Dextérité donnée par l'utilisateur
		const newDex = interaction.values[0];

		// Mise à jour de la valeur de Dextérité du Character actuel de l'User
		await DBCharacters.update(
			{
				dex: newDex,
			},
			{
				where:
					{ id: user.current_character },
			},
		);

		// Envoi d'un message de validation à l'utilisateur
		return await interaction.update({
			content: 'Vous avez changé la valeur de Dextérité de votre personnage avec succès.',
			components: [],
			ephemeral: true,
		});
	}


	/*
	* Cas:		characterUpdateEsoSelect
	* Source:	characterUpdateStatsSelect.js
	* Méthode:	buildCharacterUpdateStatsSelect
	*/
	if (interaction.customId === 'characterUpdateEsoSelect') {
		// Récupération de l'User étant à l'origine de la commande
		const user = await DBUsers.findOne({
			where:
				{ discord_id: interaction.user.id },
		});

		// Récupération de la valeur d'Esotérisme donnée par l'utilisateur
		const newEso = interaction.values[0];

		// Mise à jour de la valeur d'Esotérisme du Character actuel de l'User
		await DBCharacters.update(
			{
				eso: newEso,
			},
			{
				where:
					{ id: user.current_character },
			},
		);

		// Envoi d'un message de validation à l'utilisateur
		return await interaction.update({
			content: 'Vous avez changé la valeur d\'Esotérisme de votre personnage avec succès.',
			components: [],
			ephemeral: true,
		});
	}


	/*
	* Cas:		characterUpdateIntSelect
	* Source:	characterUpdateStatsSelect.js
	* Méthode:	buildCharacterUpdateStatsSelect
	*/
	if (interaction.customId === 'characterUpdateIntSelect') {
		// Récupération de l'User étant à l'origine de la commande
		const user = await DBUsers.findOne({
			where:
				{ discord_id: interaction.user.id },
		});

		// Récupération de la valeur d'Intelligence donnée par l'utilisateur
		const newInt = interaction.values[0];

		// Mise à jour de la valeur d'Intelligence du Character actuel de l'User
		await DBCharacters.update(
			{
				int: newInt,
			},
			{
				where:
					{ id: user.current_character },
			},
		);

		// Envoi d'un message de validation à l'utilisateur
		return await interaction.update({
			content: 'Vous avez changé la valeur d\'Intelligence de votre personnage avec succès.',
			components: [],
			ephemeral: true,
		});
	}


	/*
	* Cas:		characterUpdateChaSelect
	* Source:	characterUpdateStatsSelect.js
	* Méthode:	buildCharacterUpdateStatsSelect
	*/
	if (interaction.customId === 'characterUpdateChaSelect') {
		// Récupération de l'User étant à l'origine de la commande
		const user = await DBUsers.findOne({
			where:
				{ discord_id: interaction.user.id },
		});

		// Récupération de la valeur de Charisme donnée par l'utilisateur
		const newCha = interaction.values[0];

		// Mise à jour de la valeur de Charisme du Character actuel de l'User
		await DBCharacters.update(
			{
				cha: newCha,
			},
			{
				where:
					{ id: user.current_character },
			},
		);

		// Envoi d'un message de validation à l'utilisateur
		return await interaction.update({
			content: 'Vous avez changé la valeur de Charisme de votre personnage avec succès.',
			components: [],
			ephemeral: true,
		});
	}


	/*
	* Cas:		characterUpdateSurSelect
	* Source:	characterUpdateStatsSelect.js
	* Méthode:	buildCharacterUpdateStatsSelect
	*/
	if (interaction.customId === 'characterUpdateSurSelect') {
		// Récupération de l'User étant à l'origine de la commande
		const user = await DBUsers.findOne({
			where:
				{ discord_id: interaction.user.id },
		});

		// Récupération de la valeur de Survivalisme donnée par l'utilisateur
		const newSur = interaction.values[0];

		// Mise à jour de la valeur de Survivalisme du Character actuel de l'User
		await DBCharacters.update(
			{
				sur: newSur,
			},
			{
				where:
					{ id: user.current_character },
			},
		);

		// Envoi d'un message de validation à l'utilisateur
		return await interaction.update({
			content: 'Vous avez changé la valeur de Survivalisme de votre personnage avec succès.',
			components: [],
			ephemeral: true,
		});
	}
});