const { DBSpecies } = require('./database/createDatabase');

function isSpeciesFilled() {
	const toTest = DBSpecies.findAll();

	if (toTest.length == 0) {
		console.log('La DB n\'a pas été setup correctement');
	}
	else {
		console.log('La DB a été setup correctement');
	}

	return;
}

isSpeciesFilled();