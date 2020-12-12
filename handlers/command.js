const { readdirSync } = require(`fs`);
const ascii = require('ascii-table')
let table = new ascii("Commands");
table.setHeading('Command', ' Status');

module.exports = (client) => {
    readdirSync(`./commands/`).forEach(dir => {
        const commands = readdirSync(`./commands/`).filter(file => file.endsWith('.js'));
        for(let file of commands) {
            let pull = require(`../commands/${file}`);
            if(pull.name) {
                client.commands.set(pull.name, pull);
                const filename = (file.split('.').slice(0, -1)).join('.')
                table.addRow(filename,'✅')
            } else {
                const filename = (file.split('.').slice(0, -1)).join('.')
                table.addRow(filename, '❌ -> Missing a help.name, or help.name is not a string.')
                continue;
            } if(pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name))
        }
    });
    console.log(table.toString());
}
