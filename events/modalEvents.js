// Imports de composants
const { Events } = require('discord.js');
const { client } = require('../index.js');
const { DBUsers, DBCharacters } = require('../database/createDatabase.js');

// Création d'un détecteur d'intéraction
client.on(Events.InteractionCreate, async interaction => {
	// Si l'intéraction n'est pas une intéraction lié au Modal, on empêche toutes actions
	if (!interaction.isModalSubmit()) return;

	/*
	* Cas: 		characterFirstStepModal
    * Source: 	characterFirstStepModal.js
	* Méthode:	buildCharacterFirstStepModal()
	*/
	if (interaction.customId === 'characterFirstStepModal') {
		const charName = interaction.fields.getTextInputValue('nameInput');
		const charStory = interaction.fields.getTextInputValue('storyInput');
		const charPicture = interaction.fields.getTextInputValue('pictureInput');
		const charTraits = interaction.fields.getTextInputValue('traitsInput');

		try {
			const char = await DBCharacters.create({
				name: charName,
				story: charStory,
				picture: charPicture,
				traits: charTraits,
				user_id: interaction.user.id,
			});

			await DBUsers.update({ current_character: char.id }, { where: { discord_id: interaction.user.id } });
		}
		catch (e) {
			console.log(e);
			return interaction.reply('Il y a eu un problème pendant la création du personnage');
		}

		return await interaction.reply({
			content: 'La première étape de la création de ton personnage est terminée!',
			ephemeral: true,
		});
	}


	if (interaction.customId === 'characterUpdateNameModal') {
		const user = await DBUsers.findOne({
			where:
				{ discord_id: interaction.user.id },
		});
		const newName = interaction.fields.getTextInputValue('newNameInput');

		await DBCharacters.update(
			{
				name: newName,
			},
			{
				where:
					{ id: user.current_character },
			},
		);
		return await interaction.reply({
			content: 'Le nom de ton personnage a été mis à jour!',
			ephemeral: true,
		});
	}


	if (interaction.customId === 'characterUpdatePictureModal') {
		const user = await DBUsers.findOne({
			where:
				{ discord_id: interaction.user.id },
		});
		const newPicture = interaction.fields.getTextInputValue('newPictureInput');

		await DBCharacters.update(
			{
				picture: newPicture,
			},
			{
				where:
					{ id: user.current_character },
			},
		);
		return await interaction.reply({
			content: 'L\'image  de ton personnage a été mise à jour!',
			ephemeral: true,
		});
	}


	if (interaction.customId === 'characterUpdateStoryModal') {
		const user = await DBUsers.findOne({
			where:
				{ discord_id: interaction.user.id },
		});
		const newStory = interaction.fields.getTextInputValue('newStoryInput');

		await DBCharacters.update(
			{
				story: newStory,
			},
			{
				where:
					{ id: user.current_character },
			},
		);
		return await interaction.reply({
			content: 'L\'histoire de ton personnage a été mise à jour!',
			ephemeral: true,
		});
	}


	if (interaction.customId === 'characterUpdateTraitsModal') {
		const user = await DBUsers.findOne({
			where:
				{ discord_id: interaction.user.id },
		});
		const newTraits = interaction.fields.getTextInputValue('newTraitsInput');

		await DBCharacters.update(
			{
				traits: newTraits,
			},
			{
				where:
					{ id: user.current_character },
			},
		);
		return await interaction.reply({
			content: 'Les traits de ton personnage ont été mis à jour!',
			ephemeral: true,
		});
	}


	if (interaction.customId === 'characterUpdateStatsFightModal') {
		const user = await DBUsers.findOne({
			where:
				{ discord_id: interaction.user.id },
		});

		let newPhy = interaction.fields.getTextInputValue('newPhyInput');
		let newDex = interaction.fields.getTextInputValue('newDexInput');
		let newEso = interaction.fields.getTextInputValue('newEsoInput');

		newPhy = isNaN(newPhy) ? '0' : newPhy;
		newDex = isNaN(newDex) ? '0' : newDex;
		newEso = isNaN(newEso) ? '0' : newEso;

		await DBCharacters.update(
			{
				phy: newPhy,
				dex: newDex,
				eso: newEso,
			},
			{
				where:
					{ id: user.current_character },
			},
		);
		return await interaction.reply({
			content: 'Les statistiques physique de ton personnage ont été mis à jour!',
			ephemeral: true,
		});
	}


	if (interaction.customId === 'characterUpdateStatsMentalModal') {
		const user = await DBUsers.findOne({
			where:
				{ discord_id: interaction.user.id },
		});

		let newInt = interaction.fields.getTextInputValue('newIntInput');
		let newCha = interaction.fields.getTextInputValue('newChaInput');
		let newSur = interaction.fields.getTextInputValue('newSurInput');

		newInt = isNaN(newInt) ? '0' : newInt;
		newCha = isNaN(newCha) ? '0' : newCha;
		newSur = isNaN(newSur) ? '0' : newSur;

		await DBCharacters.update(
			{
				int: newInt,
				cha: newCha,
				sur: newSur,
			},
			{
				where:
					{ id: user.current_character },
			},
		);
		return await interaction.reply({
			content: 'Les statistiques mentales de ton personnage ont été mis à jour!',
			ephemeral: true,
		});
	}
});