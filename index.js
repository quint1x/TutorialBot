require(`dotenv`).config();
const Discord = require(`discord.js`);
const { Client } = require(`discord.js`);
const client = new Client;
const fs = require(`fs`);
const config = process.env;

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith(`.js`));
for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log('Ready!');
});


client.on('message', async message => {
    
    if(!message.content.startsWith(config.PREFIX) || message.author.bot) return;

    const args = message.content.slice(config.PREFIX.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping') {
        client.commands.get('ping').execute(client, message, args)
    } else if (command === 'help') {
        client.commands.get('help').execute(client, message, args);
    }

});

client.login(config.TOKEN)
