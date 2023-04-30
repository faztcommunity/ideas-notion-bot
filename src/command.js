import { SlashCommandBuilder } from 'discord.js'

export const command = new SlashCommandBuilder()
    .setName('idea')
    .setDescription('Submit your ideas to our Notion')
    .addStringOption(args =>
        args.setName('content')
        .setDescription('What do you mean?')
        .setRequired(true)
    )