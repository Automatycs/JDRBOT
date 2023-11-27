const { EmbedBuilder } = require('discord.js');
const { DBSpecies } = require('../database/createDatabase.js');

async function storyIssues(story) {
	const issue = { name: 'Histoire', value: '' };
	let warning = 0;

	if (story == null || story == '') {
		issue.value = '[WARNING] Ton personnage n\'a pas d\'histoire, est-ce voulu?';
		warning += 1;
	}
	else {
		issue.value = 'OK pour l\'histoire, pense cependant à la relire avant de valider';
	}

	return ({ newField: issue, warning: warning });
}

async function traitsIssues(traits) {
	const issue = { name: 'Traits', value: '' };
	let warning = 0;

	if (traits == null || traits == '') {
		issue.value = '[WARNING] Ton personnage n\'a pas de traits, est-ce voulu?';
		warning += 1;
	}
	else {
		issue.value = 'OK pour les traits, pense cependant à les relire avant de valider';
	}

	return ({ newField: issue, warning: warning });
}

async function pictureIssues(picture) {
	const issue = { name: 'Image', value: '' };
	let warning = 0;
	let error = 0;

	if (picture == null || picture == '') {
		issue.value = '[WARNING] Ton personnage n\'a pas d\'image, est-ce voulu?';
		warning += 1;
	}
	else {
		try {
			// eslint-disable-next-line no-unused-vars
			const ImgTest = new EmbedBuilder()
				.setImage(picture);
			issue.value = 'OK pour l\'image, pense cependant à la vérifier avant de valider';
		}
		catch {
			issue.value = '[ERROR] L\'image de ton personnage n\'a pas l\'air valide';
			error += 1;
		}
	}

	return ({ newField: issue, warning: warning, error: error });
}

async function racesIssues(race, hybrid) {
	const issue = { name: 'Race / Race hybride', value: '' };
	let error = 0;
	let warning = 0;

	if (race == null || race == '') {
		issue.value = '[ERROR] Votre personnage n\'a pas de race principale';
		error += 1;
		return ({ newField: issue, error: error });
	}

	if (hybrid != null && hybrid != '') {
		if (hybrid == race) {
			issue.value += '[ERROR] La race et la race hybride ne peuvent pas être les mêmes\n';
			error += 1;
		}
		if ([race, hybrid].includes('Ogres')) {
			issue.value += '[ERROR] Les Ogres ne peuvent pas produirent d\'hybrides\n';
			error += 1;
		}
		if ([race, hybrid].includes('Démons') || [race, hybrid].includes('Atharis')) {
			issue.value += '[WARNING] Les Démons et les Atharis ne produisent pas d\'hybrides, le personnage perdra les charactéristiques de sa seconde race\n';
			warning += 1;
		}
		if ([race, hybrid].includes('Géants') && [race, hybrid].includes('Elfes du Chaos')) {
			issue.value += '[ERROR] Le croisement Géant + Elfes du Chaos est impossible\n';
			error += 1;
		}
	}

	if (issue.value == '') {
		issue.value = 'OK pour les races, pense cependant à les vérifier avant de valider';
	}
	return ({ newField: issue, warning: warning, error: error });
}

async function statsIssues(stats, race, hybrid) {
	const issue = { name: 'Race / Race hybride', value: '' };
	let error = 0;
	let raceStats = new Array(6).fill(0);
	let hybridStats = new Array(6).fill(0);
	let total = 0;

	for (let i = 0; i < stats.length; i += 1) {
		total += stats[i];
	}
	if (total != 15) {
		issue.value = '[ERROR] Un total de 15 points doit être réparti dans les charactéristiques de ton personnage.';
		error += 1;
		return ({ newField: issue, error: error });
	}

	if (race != undefined) {
		const tmp = await DBSpecies.findOne({ where: { name: race } });
		raceStats = [tmp.mod_phy, tmp.mod_dex, tmp.mod_eso, tmp.mod_int, tmp.mod_cha, tmp.mod_sur];
	}
	if (hybrid != undefined) {
		const tmp = await DBSpecies.findOne({ where: { name: hybrid } });
		hybridStats = [tmp.mod_phy, tmp.mod_dex, tmp.mod_eso, tmp.mod_int, tmp.mod_cha, tmp.mod_sur];
	}

	for (let i = 0; i < stats.length; i += 1) {
		stats[i] += (raceStats[i] + hybridStats[i]);
		if (stats[i] < 0 || stats[i] > 5) {
			issue.value = '[ERROR] Les charactéristiques de votre personage (après bonus racial) doivent être comprises entre 0 et 5';
			error += 1;
			return ({ newField: issue, error: error });
		}
	}
	issue.value = 'OK pour les charactéristiques, pense cependant à les vérifier avant de valider';
	return ({ newField: issue, error: error });
}

async function buildCharacterIssuesEmbed(character, user) {
	const stats = [character.phy, character.dex, character.eso, character.int, character.cha, character.sur];
	const avatarURL = 'https://cdn.discordapp.com/avatars/' + user.discord_id + '/' + user.avatar + '.png';
	let tmp;
	let errors = 0;
	let warnings = 0;
	const summary = { name: 'Résumé', value: '' };
	const characterInfosEmbed = new EmbedBuilder()
		.setColor(0x9e0e40)
		.setAuthor({ name: user.name, iconURL: avatarURL });

	tmp = await storyIssues(character.story);
	warnings += tmp.warning;
	characterInfosEmbed.addFields(tmp.newField);

	tmp = await traitsIssues(character.traits);
	warnings += tmp.warning;
	characterInfosEmbed.addFields(tmp.newField);

	tmp = await pictureIssues(character.picture);
	warnings += tmp.warning;
	errors += tmp.error;
	characterInfosEmbed.addFields(tmp.newField);

	tmp = await racesIssues(character.race, character.hybrid);
	warnings += tmp.warning;
	errors += tmp.error;
	characterInfosEmbed.addFields(tmp.newField);

	tmp = await statsIssues(stats, character.race, character.hybrid);
	errors += tmp.error;
	characterInfosEmbed.addFields(tmp.newField);

	if (warnings > 2) {
		summary.value += 'Il y\'a trop de [WARNING] pour pouvoir valider ton personnage (max: 2).\n';
	}
	if (errors != 0) {
		summary.value += 'Il y\'a trop de [ERROR] pour pouvoir valider ton personnage (max: 0).';
	}
	if (summary.value == '') {
		summary.value = 'Ton personnage est prêt à être créé!';
	}
	characterInfosEmbed.addFields(summary);

	return (characterInfosEmbed);
}

module.exports = { buildCharacterIssuesEmbed };