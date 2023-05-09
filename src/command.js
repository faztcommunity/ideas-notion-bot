import 'dotenv/config'
import { REST, Routes, SlashCommandBuilder } from 'discord.js'

const commands = [
    new SlashCommandBuilder()
    .setName('idea')
    .setDescription('Submit your ideas to our Notion')
    .addStringOption(args =>
        args.setName('content')
        .setDescription('What do you mean?')
        .setRequired(true)
    ).toJSON(),
    new SlashCommandBuilder()
    .setName('lock')
    .setDescription('Lockdowns this channel so no one can write on it for a certain amount of time')
    .addStringOption(args =>
        args.setName('duration')
        .setDescription('Select an option')
        .setRequired(true)
        .addChoices(
            { name: '1 minute', value: '60000' },
            { name: '5 minutes', value: '300000' },
            { name: '15 minutes', value: '900000' },
            { name: '30 minutes', value: '1800000' },
            { name: '1 hour', value: '3600000' },
            { name: '2 hours', value: '7200000' },
        )
    ).toJSON(),
]
    
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN)

rest.put(Routes.applicationCommands(process.env.CLIENT), { body: commands })
.then(data => console.log(`Successfully registered ${data.length} application commands.`))
.catch(error => console.error(error))