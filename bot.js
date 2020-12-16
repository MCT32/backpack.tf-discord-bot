const Discord = require('discord.js')
const fs = require('fs')

const token = fs.readFileSync('token.txt').toString()
const client = new Discord.Client()

const red = '#dc322f'
const blue = '#268bd2'

client.on('ready', () => {
        const Guilds = client.guilds.cache.map(guild => guild.name)
        console.log('Servers:')
        console.log(Guilds)
})

global.help = function help(message, argc, argv) {
        const embed = new Discord.MessageEmbed()
                .setColor(blue)
                .setTitle('List of commands')
                .setDescription('Here are all the commands you can use with this bot. (All start with \'?\')')
                .addField('Commands',
                "```Help:\tDisplays this help menu.```")

        message.channel.send(embed)
}

global.test = function test(message, argc, argv) {
        if (argc > 0) {
                const embed = new Discord.MessageEmbed()
                        .setColor(blue)
                        .setTitle('You said')
                        .setDescription(argv)
                //console.log(argv[0] + '\n' + argv[1])

                message.channel.send(embed)
        } else {
                usage()
        }

        function usage() {
                const embed = new Discord.MessageEmbed()
                        .setColor(red)
                        .setTitle('Correct syntax')
                        .setDescription('`?test <arg1> [arg2]...`')

                message.channel.send(embed)
        }
}

client.on('message', (message) => {
        if (message.toString().startsWith('?')) {
                console.log('message received!')
                var content = message.toString().substring(1)
                var command = content.split(' ')[0]
                //console.log(command)

                if (command in global && typeof global[command] === 'function') {
                        var argv = content.split(' ')
                        argv.splice(0, 1)
                        var argc = argv.length

                        global[command](message, argc, argv);
                } else {
                        const embed = new Discord.MessageEmbed()
                                .setColor(red)
                                .setTitle('Command not found')
                                .setDescription('The command you typed does not exist.')

                        message.channel.send(embed)
                }
        }
})

client.login(token)
