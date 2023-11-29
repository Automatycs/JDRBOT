const Sequelize = require('sequelize');
const { dbname, dbuser, dbpassword, dbhost, dbport } = require('../config.json');

const sequelize = new Sequelize(dbname, dbuser, dbpassword, {
	host: dbhost,
	port: dbport,
	dialect: 'mysql',
	logging: false,
});

sequelize.authenticate().then(() => {
	console.log('Connection has been established successfully.');
}).catch((error) => {
	console.error('Unable to connect to the database: ', error);
});

/*
	Tout sur la Base de Données
*/
const Users = sequelize.define('users', {
	discord_id: {
		type: Sequelize.BIGINT,
		unique: true,
		allowNull: false,
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	avatar: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	current_character: {
		type: Sequelize.BIGINT,
		allowNull: true,
		defaultValue: null,
	},
}, {
	timestamps: false,
});

const Species = sequelize.define('species', {
	name: {
		type: Sequelize.STRING(50),
		allowNull: false,
		unique: true,
	},
	mod_phy: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	mod_dex: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	mod_eso: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	mod_int: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	mod_cha: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	mod_sur: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
}, {
	timestamps: false,
});

const Characters = sequelize.define('characters', {
	user_id: {
		type: Sequelize.BIGINT,
		allowNull: false,
		references: {
			model: Users,
			key: 'discord_id',
		},
	},
	ready: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	story: {
		type: Sequelize.STRING(1000),
		allowNull: true,
	},
	traits: {
		type: Sequelize.STRING(1000),
		allowNull: true,
	},
	race: {
		type: Sequelize.STRING(50),
		allowNull: true,
		references: {
			model: Species,
			key: 'name',
		},
	},
	hybrid: {
		type: Sequelize.STRING(50),
		allowNull: true,
		references: {
			model: Species,
			key: 'name',
		},
	},
	picture: {
		type: Sequelize.STRING(500),
		allowNull: true,
	},
	phy: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0,
	},
	dex: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0,
	},
	eso: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0,
	},
	int: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0,
	},
	cha: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0,
	},
	sur: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0,
	},
}, {
	timestamps: false,
});

const Skills = sequelize.define('skills', {
	name: {
		type: Sequelize.STRING(50),
		allowNull: false,
	},
	description: {
		type: Sequelize.STRING(200),
		allowNull: false,
	},
	user_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		references: {
			model: Characters,
			key: 'id',
		},
	},
}, {
	timestamps: false,
});

Users.hasMany(Characters, {
	foreignKey: 'user_id',
	sourceKey: 'discord_id',
	type: Sequelize.BIGINT,
	allowNull: false,
	onDelete: 'CASCADE',
	onUpdate: 'CASCADE',
});
Characters.belongsTo(Users, {
	foreignKey: 'user_id',
	targetKey: 'discord_id',
	type: Sequelize.BIGINT,
	allowNull: false,
	onDelete: 'CASCADE',
	onUpdate: 'CASCADE',
});

Species.hasMany(Characters, {
	foreignKey: 'race',
	sourceKey: 'name',
	type: Sequelize.STRING(50),
	allowNull: false,
	onDelete: 'CASCADE',
	onUpdate: 'CASCADE',
});
Characters.belongsTo(Species, {
	foreignKey: 'race',
	targetKey: 'name',
	type: Sequelize.STRING(50),
	allowNull: false,
	onDelete: 'CASCADE',
	onUpdate: 'CASCADE',
});

Species.hasMany(Characters, {
	foreignKey: 'hybrid',
	sourceKey: 'name',
	type: Sequelize.STRING(50),
	allowNull: false,
	onDelete: 'CASCADE',
	onUpdate: 'CASCADE',
});
Characters.belongsTo(Species, {
	foreignKey: 'hybrid',
	targetKey: 'name',
	type: Sequelize.STRING(50),
	allowNull: false,
	onDelete: 'CASCADE',
	onUpdate: 'CASCADE',
});

Characters.hasMany(Skills, {
	foreignKey: 'user_id',
	sourceKey: 'id',
	type: Sequelize.INTEGER,
	allowNull: false,
	onDelete: 'CASCADE',
	onUpdate: 'CASCADE',
});
Skills.belongsTo(Characters, {
	foreignKey: 'user_id',
	targetKey: 'id',
	type: Sequelize.INTEGER,
	allowNull: false,
	onDelete: 'CASCADE',
	onUpdate: 'CASCADE',
});

module.exports = {
	DBUsers: Users,
	DBCharacters: Characters,
	DBSpecies: Species,
	DBSkills: Skills,
};