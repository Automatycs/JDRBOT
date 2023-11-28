const { DBCharacters, DBUsers, DBSpecies, DBSkills } = require('./database/createDatabase.js');
const { fillSpecies } = require('./database/addSpecies.js');

(async () => {
	await DBUsers.sync();
	await DBSpecies.sync();
	await DBCharacters.sync();
	await DBSkills.sync();

	await fillSpecies();
})();