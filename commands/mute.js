const name = 'mute';
const description = 'Mutes a player for a specified time (in seconds).';

async function execute(message, member, length, reason) {
  let mutedRole = message.guild.roles.cache.find(
    (role) => role.name === 'muted'
  );

  //   DBPool.query(`SELECT FROM USERS WHERE USERID = ${member.id}::text`) // Always cast, kids!
  //     .then((res) => {
  //       if (res.rows.length === 0) {
  //         console.log('trying..');
  //         DBPool.query(
  //           `INSERT INTO USERS (userid,username) VALUES (${member.id}::text, ${member.name}::text);`
  //         ) // Nothing happens?? ;-;
  //           .then((res) => console.log(res))
  //           .catch((error) => console.log(error));
  //       }
  //     })
  //     .then(() => member.roles.add(mutedRole))
  //     .catch((error) => console.error(error));
}

module.exports = { name, description, execute };
