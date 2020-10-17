const { DBPool } = require('../util/bot-config.js');

const name = 'mute';
const description = 'Mutes a player for a specified time (in seconds).';

function execute(message, member, length, reason) {
  let mutedRole = message.guild.roles.cache.find(
    (role) => role.name === 'muted'
  );
  DBPool.query(
    `SELECT exists (SELECT 1 FROM USERS WHERE USERID = ${member.id}::text LIMIT 1);`
  ) // Always cast, kids!
    .then((res) => {
      if (res.rows.length === 0) {
        DBPool.query(
          `INSERT INTO USERS VALUES(${member.id}::text, ${member.name}::text);`
        ) // Nothing happens?? ;-;
          .then((res) => console.log(res))
          .catch((error) => console.error(error));
      }
    })
    .then(() => member.roles.add(mutedRole))
    .catch((error) => console.error(error));
}

module.exports = { name, description, execute };
