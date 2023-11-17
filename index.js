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

require('./events/chatInputEvents');
require('./events/modalEvents');
require('./events/selectEvents');

/*
	Récolte des commandes
*/
async function create_commands() {
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
}

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	DBUsers.sync();
	DBSpecies.sync();
	DBCharacters.sync();
	fillSpecies();
	create_commands();
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(token);
