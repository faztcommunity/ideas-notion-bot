import 'dotenv/config'
import { REST, Routes, SlashCommandBuilder } from 'discord.js'

const command = new SlashCommandBuilder()
    .setName('idea')
    .setDescription('Submit your ideas to our Notion')
    .addStringOption(args =>
        args.setName('content')
        .setDescription('What do you mean?')
        .setRequired(true)
    )
    
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN)

rest.put(Routes.applicationCommands(process.env.CLIENT), { body: [command.toJSON()] }).then(data => console.log(`Successfully registered ${data.length} application commands.`)).catch(error => console.error(error))