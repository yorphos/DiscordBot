const { Collection } = require('discord.js');
const { parse } = require('toml');
const { readFileSync, readdirSync } = require('fs');

class BotConfig {
    constructor() {
        this.syncConfig();
        this.syncCommands();
        this.syncPermissions();
    }

    syncConfig() {
        this.config = parse(readFileSync('./config.toml').toString());
    }

    syncCommands() {
        const files = readdirSync('./commands').filter(file => file.endsWith('.js'));

        this.commands = new Collection();
        for (var file of files) {
            const command = require(`../commands/${file}`);

            this.commands.set(command.name, command);
        }
    }

    syncPermissions() {
        this.permissions = parse(readFileSync('./permissions.toml').toString());
    }

    getPrefix() {
        return this.config['prefix']
    }

    getCommands() {
        return this.commands;
    }

    getPermissions() {
        return this.permissions;
    }
};

module.exports = { BotConfig };