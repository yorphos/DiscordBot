const { selfdestructReply } = require('../util/discord-tools.js');

const name = 'purge';
const description = 'Purge 1 - 100 messages.';

function execute(message, count) {
  count = Math.min(Math.max(1, count + 1), 100);

  let errorMsg = '';
  message
    .delete()
    .catch(
      (error) =>
        (errorMsg += `Couldn't delete command message because of: ${error}`)
    );
  message.channel
    .bulkDelete(count)
    .then(() => {
      selfdestructReply(
        message,
        `Deletion of ${count - 1} message(s) successful.`
      );
    })
    .catch((error) => {
      errorMsg += `Couldn't delete messages because of: ${error}`;
      message.reply(errorMsg);
    });
}

module.exports = { name, description, execute };
