import 'dotenv/config'
import { Client, GatewayIntentBits } from 'discord.js'

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
        await fetch(process.env.URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Notion-Version': '2022-06-28',
                'Authorization': `Bearer ${process.env.NOTION}`
            },
            body: JSON.stringify({
                'parent': {
                    'database_id': process.env.db_id
                },
                'properties': {
                    'Name': {
                        'title': [{
                            'text': {
                                'content': `Idea from ${interaction.user.id}`// row name
                            }
                        }]
                    },
                    'Description': {
                        'rich_text': [{
                            'text': {
                                'content': interaction.options.getString('content') // row description
                            }
                        }]
                    },
                    'Tags': {
                        'multi_select' : [
                            {
                                'name': 'tag 1'
                            },
                            {
                                'name': 'tag 2'
                            }
                        ]
                    }
                }
            })
        })
        } catch (error) {
        console.error(error.message)
    }

    await interaction.reply({ content: 'Mensaje recibido', ephemeral: true })
})

client.once('ready', () => {
    console.log(`Bot ${client.user.tag} is up and running!`)
})

client.login(process.env.TOKEN)