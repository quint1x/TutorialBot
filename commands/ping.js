module.exports = {
    name : 'ping',

    execute : async(client, message, args) => {
        message.channel.send(`Pong!`);
    }
}
