const name = 'ping';
const description = 'Ping!';

function execute(message, args) {
    message.channel.send('Pong.');
}

module.exports = { name, description, execute };