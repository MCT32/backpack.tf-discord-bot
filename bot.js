const Discord = require('discord.js')
const fetch = require("node-fetch");
require('dotenv').config();

const TOKEN = process.env.TOKEN
const KEY = process.env.API_KEY
const client = new Discord.Client()

const red = '#dc322f'
const blue = '#268bd2'
const cyan = '#2aa198'

async function httpGetJson(url) {
        const response = await fetch(url)
        const json = await response.json()

        return json
}

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
                "```Help:\tDisplays this help menu.\nCurrency:\tDisplays info about tf2 currencies.```")

        message.channel.send(embed)
}

global.test = function test(message, argc, argv) {
        if (argc > 0) {
                const embed = new Discord.MessageEmbed()
                        .setColor(blue)
                        .setTitle('You said')
                        .setDescription(argv)

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

global.currency = async function getcurrency(message, argc, argv) {
        if (argc = 1) {
                const data = await httpGetJson('https://backpack.tf/api/IGetCurrencies/v1?key=' + KEY)

                const currency = data['response']['currencies'][argv[0]]

                if (!currency) {
                        usage()
                        return 1
                }

                const name = currency['name']
                const plural = currency['plural']

                const pricename = currency['price']['currency']
                const price = currency['price']['value']

                const embed = new Discord.MessageEmbed()
                        .setColor(cyan)
                        .setTitle(name)
                        .setDescription('Stats for ' + plural)
                        .addField('Price in ' + pricename, price)

                message.channel.send(embed)
        } else {
                usage()
        }

        function usage() {
                const embed = new Discord.MessageEmbed()
                        .setColor(red)
                        .setTitle('Correct syntax')
                        .setDescription('`?getcurrency <keys, metal, earbuds, hats>`')

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

client.login(TOKEN)
