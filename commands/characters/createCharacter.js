const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, Events } = require('discord.js');
const { client } = require('../../index.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('create')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		const modal = new ModalBuilder()
			.setCustomId('characterModal')
			.setTitle('Première étape');

		const nameInput = new TextInputBuilder()
			.setCustomId('nameInput')
			.setLabel('Le nom de ton personnage:')
			.setStyle(TextInputStyle.Short)
			.setMaxLength(50);

		const storyInput = new TextInputBuilder()
			.setCustomId('storyInput')
			.setLabel('L\'histoire (brève) de ton personnage:')
			.setStyle(TextInputStyle.Paragraph)
			.setRequired(false)
			.setMaxLength(4000)
			.setPlaceholder('Lorem Ispum ....');

		const pictureInput = new TextInputBuilder()
			.setCustomId('pictureInput')
			.setLabel('L\'URL de l\'image de ton personnage:')
			.setStyle(TextInputStyle.Short)
			.setRequired(false)
			.setMaxLength(500)
			.setPlaceholder('https://.....');

		const firstActionRow = new ActionRowBuilder().addComponents(nameInput);
		const secondActionRow = new ActionRowBuilder().addComponents(storyInput);
		const thirtdActionRow = new ActionRowBuilder().addComponents(pictureInput);

		modal.addComponents(firstActionRow, secondActionRow, thirtdActionRow);

		await interaction.showModal(modal);
	},
};

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isModalSubmit()) return;


	if (interaction.customId === 'characterModal') {
		const charName = interaction.fields.getTextInputValue('nameInput');
		const charStory = interaction.fields.getTextInputValue('storyInput');
		const charPicture = interaction.fields.getTextInputValue('pictureInput');

		try {
			await interaction.client.DBCharacters.create({
				name: charName,
				story: charStory,
				picture: charPicture,
				user_id: interaction.user.id,
			});
		}
		catch {
			return interaction.reply('Il y a eu un problème pendant la création du personnage');
		}

		await interaction.reply({ content: 'La première étape de la création de ton personnage est terminée!' });
	}
});