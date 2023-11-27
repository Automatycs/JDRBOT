const { Events } = require('discord.js');
const { client } = require('../index.js');
const { DBUsers, DBCharacters } = require('../database/createDatabase.js');

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isButton()) return;

	if (interaction.customId === 'validateCharacter') {
		const user = await DBUsers.findOne({
			where:
				{ discord_id: interaction.user.id },
		});

		await DBCharacters.update(
			{
				ready: 1,
			},
			{
				where:
					{ id: user.current_character },
			},
		);
		return await interaction.update({
			content: 'Ton personnage a été validé et est maintenant prêt à être joué!',
			components: [],
			embeds: [],
			ephemeral: true,
		});
	}
});