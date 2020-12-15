const Discord = require('discord.js')
const fs = require('fs')

const token = fs.readFileSync('token.txt').toString()
const client = new Discord.Client()

client.on('ready', () => {
        const Guilds = client.guilds.cache.map(guild => guild.name)
        console.log('Servers:')
        console.log(Guilds)
})

client.on('message', (message) => {
        if (message.toString().startsWith('?')) {
                console.log('message received!')
                var command = message.toString().substring(1)
                console.log(command)

                if (command in global && typeof global[command] === 'function') {
                        global[command]();
                } else {
                        const embed = new Discord.MessageEmbed()
                                .setColor('#dc322f')
                                .setTitle('Command not found')
                                .setDescription('The command you typed does not exist.')

                        message.channel.send(embed)
                }
        }
})

client.login(token)
