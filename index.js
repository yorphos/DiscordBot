const { Client } = require('discord.js');
const { selfdestructReply, getUserFromMention, getRoleFromID } = require('./util/discord-tools.js');
const { BotConfig } = require('./util/bot-config.js');

require('dotenv').config();

const client = new Client();
client.config = new BotConfig();
client.prefix = client.config.getPrefix();
client.commands = client.config.getCommands();
client.permissions = client.config.getPermissions();

const parseInput = (message) => {
  var cmd = message[0].toLowerCase();
  var args = message.slice(1);

  return [cmd, args];
};

const hasPermission = (member, cmd) => {
  var roles = member.roles.cache.array();
  for (role of roles) {
    let name = role.name.toLowerCase().replace('@', '');
    let perms = client.permissions[name];
    if (perms && (perms.commands.includes(cmd) || perms.commands.includes('*'))) return true;
  }

  return false;
};

client.on('ready', () => {
  // Initialization Operations
  client.user.setActivity(`Use prefix \'${client.prefix}\'`, {
    type: 'INSTANCE',
  });
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (message) => {
  if (!message.content.startsWith(client.prefix)) return;

  var msg = message.content.substring(1).split(' ');
  var [cmd, args] = parseInput(msg);

  if (cmd === '' || !client.commands.has(cmd)) {
    selfdestructReply(message, `Invalid command '${cmd}'`);
    console.log(client.commands);
    return;
  }
  if (!hasPermission(message.member, cmd)) {
    return;
  }

  switch (cmd) {
    case 'ping': {
      client.commands.get('ping').execute(message);
      break;
    }
    case 'purge': {
      if (!(args.length === 1 && parseInt(args[0]))) {
        selfdestructReply(message, "Invalid arguments for command 'purge'.");
        break;
      }

      client.commands.get('purge').execute(message, parseInt(args[0]));
      break;
    }
    case 'mute': {
      if (!(args.length === 3 && args[0].startsWith('<@') && args[0].endsWith('>'))) {
        selfdestructReply(message, "Invalid arguments for command 'mute'.");
        break;
      }

      var mentionedMember = message.guild.member(getUserFromMention(client, args[0]));
      if (!mentionedMember) {
        selfdestructReply(message, "No user found to 'mute'.");
        break;
      } else if (!(parseInt(args[1].slice(0, -1)) && ['s', 'm', 'h', 'd', 'w'].includes(args[1].slice(-1)))) {
        selfdestructReply(
          message,
          'Invalid time specified. (<number><suffix> where suffix one of: s(econds), m(inutes), h(ours), d(ays), w(eeks))'
        );
        break;
      }

      var length = args[1];
      var reason = args[2];
      client.commands.get('mute').execute(message, mentionedMember, length, reason);
    }
    case 'rolepoll': {
      if (args.length != 1) {
        selfdestructReply(message, "Invalid arguments for command 'rolepoll'.");
      }
      
      const role = getRoleFromID(message.guild, args[0])
      if (!role){
        selfdestructReply(message, "No role found.");
      };

      client.commands.get('rolepoll').execute(client, message, role);
      break;
    }
  }
});

client.login(process.env.BOT_TOKEN);
