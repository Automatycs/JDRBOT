// Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const { DBUsers, DBSpecies, DBCharacters } = require('./database/createDatabase.js');
const { fillSpecies } = require('./database/addSpecies');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
module.exports = { client: client };

client.DBUsers = DBUsers;
client.DBSpecies = DBSpecies;
client.DBCharacters = DBCharacters;

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

	const user = await interaction.client.DBUsers.findOne({ where: { discord_id: interaction.user.id } });

	if (!user && interaction.commandName != 'register') {
		await interaction.reply({ content: 'T\' est pas enregistré fréros', ephemeral: true });
		return;
	}

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

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	DBUsers.sync({ alter: true });
	DBCharacters.sync({ alter: true });
	DBSpecies.sync({ alter: true });
	fillSpecies();
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(token);
