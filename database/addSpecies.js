const { DBSpecies } = require('./createDatabase.js');

async function fillSpecies() {
	const speciesList = await DBSpecies.findAll();

	if (speciesList.length == 0) {
		try {
			DBSpecies.bulkCreate([
				{ name: 'Humains', mod_phy: 0, mod_dex: 1, mod_eso: -1, mod_int: 1, mod_cha: 0, mod_sur: -1 },
				{ name: 'Ayiens', mod_phy: 0, mod_dex: 1, mod_eso: -1, mod_int: 0, mod_cha: -1, mod_sur: 1 },
				{ name: 'Ogres', mod_phy: 1, mod_dex: -1, mod_eso: 0, mod_int: 1, mod_cha: -1, mod_sur: 0 },
				{ name: 'Démons', mod_phy: 1, mod_dex: 0, mod_eso: 0, mod_int: -1, mod_cha: 1, mod_sur: -1 },
				{ name: 'Elfes du Chaos', mod_phy: -1, mod_dex: -1, mod_eso: 0, mod_int: 0, mod_cha: 1, mod_sur: 1 },
				{ name: 'Géants', mod_phy: 1, mod_dex: -1, mod_eso: 1, mod_int: -1, mod_cha: 0, mod_sur: 0 },
				{ name: 'Elfes de Glace', mod_phy: -1, mod_dex: 1, mod_eso: -1, mod_int: 0, mod_cha: 0, mod_sur: 1 },
				{ name: 'Atharis', mod_phy: 0, mod_dex: 0, mod_eso: 1, mod_int: -1, mod_cha: 1, mod_sur: -1 },
				{ name: 'Elfes des Cendres', mod_phy: -1, mod_dex: 0, mod_eso: 1, mod_int: 1, mod_cha: -1, mod_sur: 0 },
			]);
		}
		catch (error) {
			console.log('dommage');
		}
	}
}

module.exports = { fillSpecies };