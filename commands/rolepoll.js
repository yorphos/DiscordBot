const name = 'rolepoll';
const description = 'Creates a poll for the given role.';

const emoji = '🟢'; // Yes, I know. I'm sorry.

function execute(client, message, role) {
  message.channel
    .send(`React below to receive the ${role.name} role`)
    .then((m) => {
      m.react(emoji);
      const filter = (reaction, user) => {
        return reaction.emoji.name != emoji.name && user.id != m.author.id;
      };
      const collector = m.createReactionCollector(filter, {dispose: true});
      collector.on('collect', (reaction, user) => {
        message.guild.member(user).roles.add(role);
      });
      collector.on('remove', (reaction, user) => {
        message.guild.member(user).roles.remove(role);
      });
    })
    .catch((e) => console.error(e));
}

module.exports = { name, description, execute };
