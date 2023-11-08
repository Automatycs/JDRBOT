const { SlashCommandBuilder, Events } = require('discord.js');
const { client } = require('../../index.js');
const { characterFirstStepModal } = require('../../modals/characterFirstStep.js');
const { DBUsers } = require('../../database/createDatabase.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('create')
		.setDescription('Lance la création d\'un personnage!'),
	async execute(interaction) {
		await interaction.showModal(characterFirstStepModal);
	},
};

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isModalSubmit()) return;

	if (interaction.customId === 'characterFirstStep') {
		const charName = interaction.fields.getTextInputValue('nameInput');
		const charStory = interaction.fields.getTextInputValue('storyInput');
		const charPicture = interaction.fields.getTextInputValue('pictureInput');
		const charTraits = interaction.fields.getTextInputValue('traitsInput');

		try {
			const char = await interaction.client.DBCharacters.create({
				name: charName,
				story: charStory,
				picture: charPicture,
				traits: charTraits,
				user_id: interaction.user.id,
			});

			await DBUsers.update({ current_character: char.id }, { where: { discord_id: interaction.user.id } });
		}
		catch {
			return interaction.reply('Il y a eu un problème pendant la création du personnage');
		}

		await interaction.reply({ content: 'La première étape de la création de ton personnage est terminée!' });
	}
});