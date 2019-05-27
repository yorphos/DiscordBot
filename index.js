const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client()
require('dotenv').config()

const epoch = new Date(1420070400000); // Defining epoch for time tracking

client.on('ready', () => { // Initialization Operations
  client.user.setActivity("Use $ as the prefix", {type: "WATCHING"});
  console.log(`Logged in as ${client.user.tag}!`)
})

function lastMessageTimestamp(user, guild) { // Fetch unix time of last message sent

  return guild.members.get(user).lastMessage.createdTimestamp;

}

function findGuildMember(nametag, guild) { // Search for existing user

  for (let [snowflake, guildMember] of guild.members) {
    if (nametag === guildMember.user.tag) {
      return guildMember.id;
    }
  }

  return 0;
}

function returnFormattedMessage(msg) {
  const flairLocation = Math.floor(Math.random() * 2);

  if(flairLocation === 0) {
    const flairs = fs.readFileSync('Configuration/prefixes.txt').toString().split('\n');
  
    const flairID = Math.floor(Math.random() * flairs.length);

    return flairs[flairID].trim() + ' ' + msg;
  }
  else {
    const flairs = fs.readFileSync('Configuration/suffixes.txt').toString().split('\n');

    const flairID = Math.floor(Math.random() * flairs.length);

    return msg + ' ' + flairs[flairID].trim();
  }
}

client.on('message', message => {
  const guild = message.guild;
  let msg = message.content.toLowerCase();

  if (msg.startsWith('$')) {
    var args = msg.substring(1).split(' ');
    var cmd = args[0];

    args = args.slice(1);
  
    switch(cmd){
      case 'ping':

        message.reply('Pong!');
        break;


      case 'purge': // 

        async function purge() {

          message.delete();

          const fetched = await message.channel.fetchMessages({limit: args[0]});

          message.channel.bulkDelete(fetched);

        }

        purge();
        break;

      case 'lastseen':

        const firstMention = message.mentions.users.first();

        if(firstMention != undefined) {

          memberID = firstMention.id;
        
        }
        else {
          
          var nametag = args[0];

          memberID = findGuildMember(nametag, guild);
        
        }

        if (memberID != 0) {

          lastSeenDate = new Date(epoch.getSeconds() + lastMessageTimestamp(memberID, guild));

          message.channel.send(returnFormattedMessage(`${guild.members.get(memberID).displayName} last seen at ${lastSeenDate}.`));
        }
        else {
          message.channel.send('Member not found.')
        }
        break;
  }
})
client.login(process.env.BOT_TOKEN);