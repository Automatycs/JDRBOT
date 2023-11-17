const { Events } = require('discord.js');
const { client } = require('../index.js');
const { DBUsers } = require('../database/createDatabase.js');

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const user = await DBUsers.findOne({ where: { discord_id: interaction.user.id } });

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