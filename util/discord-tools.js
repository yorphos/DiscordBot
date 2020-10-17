function lastMessageTimestamp(user, guild) {
  // Fetch unix time of last message sent
  return guild.members.get(user).lastMessage.createdTimestamp;
}

function findGuildMember(nametag, guild) {
  // Search for existing user
  for (let [snowflake, guildMember] of guild.members) {
    if (nametag === guildMember.user.tag) {
      return guildMember;
    }
  }
  return undefined;
}

function getUserFromMention(client, mention) {
  if (!mention) return null;

  mention = mention.toString();
  if (mention.startsWith('<@') && mention.endsWith('>')) {
    mention = mention.slice(2, -1);

    if (mention.startsWith('!')) {
      mention = mention.slice(1);
    }

    return client.users.cache.get(mention);
  }

  return null;
}

async function selfdestructReply(message, text, timeout = 5000) {
  await message.reply('```' + text + '```').then((message) => {
    message.delete({ timeout: timeout });
  });
}

module.exports = {
  lastMessageTimestamp,
  findGuildMember,
  getUserFromMention,
  selfdestructReply,
};
