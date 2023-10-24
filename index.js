// Require the necessary discord.js classes
const Sequelize = require('sequelize');
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token, dbname, dbuser, dbpassword, dbhost, dbport } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
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
		type: Sequelize.STRING,
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
		type: Sequelize.STRING(4000),
		allowNull: true,
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

Users.hasMany(Characters, {
	foreignKey: 'user_id',
	sourceKey: 'id',
	allowNull: false,
	onDelete: 'CASCADE',
	onUpdate: 'CASCADE',
});
Characters.belongsTo(Users, {
	foreignKey: 'user_id',
	targetKey: 'id',
	allowNull: false,
	onDelete: 'CASCADE',
	onUpdate: 'CASCADE',
});

Species.hasMany(Characters, {
	foreignKey: 'race',
	sourceKey: 'name',
	type: Sequelize.STRING,
	allowNull: false,
	onDelete: 'CASCADE',
	onUpdate: 'CASCADE',
});
Characters.belongsTo(Species, {
	foreignKey: 'race',
	targetKey: 'name',
	type: Sequelize.STRING,
	allowNull: false,
	onDelete: 'CASCADE',
	onUpdate: 'CASCADE',
});

Species.hasMany(Characters, {
	foreignKey: 'hybrid',
	sourceKey: 'name',
	type: Sequelize.STRING,
	allowNull: false,
	onDelete: 'CASCADE',
	onUpdate: 'CASCADE',
});
Characters.belongsTo(Species, {
	foreignKey: 'hybrid',
	targetKey: 'name',
	type: Sequelize.STRING,
	allowNull: false,
	onDelete: 'CASCADE',
	onUpdate: 'CASCADE',
});

client.DBUsers = Users;
client.DBRaces = Species;
client.DBCharacters = Characters;

/*
	Récolte des commandes
*/
client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		}
		else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error('No command matching $(interraction.commandName) was found.');
		return;
	}

	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.log(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral:true });
		}
		else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

client.on(Events.InteractionCreate, interaction => {
	if (!interaction.isModalSubmit()) return;

	if (interaction.customId === 'characterModal') {
		const charName = interaction.fields.getTextInputValue('nameInput');
		const charStory = interaction.fields.getTextInputValue('storyInput');
		const charPicture = interaction.fields.getTextInputValue('pictureInput');

		console.log(charName, charStory, charPicture);
		interaction.reply({ content: 'Données reçu chef!' });
	}
});

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	Users.sync({ alter: true });
	Characters.sync({ alter: true });
	Species.sync({ alter: true });
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(token);
