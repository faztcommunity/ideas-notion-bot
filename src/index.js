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

    const { command } = interaction
    console.log('mensaje recibido ', interaction.options.getString('content'))
    if (command === 'idea') {
        // request to Notion API
        await axios.post('https://eoaumvngn9h999o.m.pipedream.net/', { 'title': interaction.options.getString('content')})
    }

    interaction.reply('Mensaje recibido')
})

client.once('ready', () => {
    console.log(`Bot ${client.user.tag} is up and running!`)
})

client.login(process.env.TOKEN)