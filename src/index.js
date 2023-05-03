import 'dotenv/config'
import { Client, GatewayIntentBits } from 'discord.js'
import axios from 'axios'

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
    ]
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return
    if (interaction.commandName !== 'idea') return

    try {
        await axios.post(process.env.URL, 
            JSON.stringify({ 'title': interaction.options.getString('content') })
        )
    } catch (error) {
        console.error(error.message)
    }

    await interaction.reply({ content: 'Mensaje recibido', ephemeral: true })
})

client.once('ready', () => {
    console.log(`Bot ${client.user.tag} is up and running!`)
})

client.login(process.env.TOKEN)