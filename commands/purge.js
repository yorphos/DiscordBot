const { selfdestructReply } = require('../util/discord-tools.js')

const name = 'purge';
const description = 'Purge 1 - 100 messages.';

function execute(message, args) {
    const purgeCount = args;
    if (purgeCount < 1 || purgeCount > 100) {
        return selfdestructReply('Invalid count parameter! Must be between 1 and 100.');
    }

    let errorMsg = '';
    message.delete()
        .catch(error => errorMsg += `Couldn't delete command message because of: ${error}`);
    message.channel.bulkDelete(purgeCount + 1)
        .then(() => {
            selfdestructReply(message, `Deletion of ${purgeCount} message(s) successful.`);
        })
        .catch(error => {
            errorMsg += `Couldn't delete messages because of: ${error}`;
            message.reply(errorMsg);
        });
}

module.exports = { name, description, execute };