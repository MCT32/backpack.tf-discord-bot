const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')

var token

fs.readFile('token.txt', 'utf8', function(err, data) {
        if (err) throw err;
        token = data;
})

client.on('ready', () => {
        console.log('Servers:')
        client.guilds.forEach((guild) => {
                console.log(' - ' + guild.name)
        })
})

client.login(token)
