const Discord = require('discord.js')
const fs = require('fs')

const token = fs.readFileSync('token.txt').toString()
const client = new Discord.Client()

client.on('ready', () => {
        const Guilds = client.guilds.cache.map(guild => guild.name)
        console.log('Servers:')
        console.log(Guilds)
})

client.login(token)
