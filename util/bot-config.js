const { Collection } = require('discord.js');
const { parse } = require('toml');
const { readFileSync, readdirSync } = require('fs');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'pass', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: 'datanase.sqlite',
});

const Warnings = sequelize.define('warnings', {
    userid: {
        type: Sequelize.STRING,
        unique: true,
    },
    warnings: {
        type: Sequelize.STRING,
    }
});

class BotConfig {
    constructor() {
        this.syncConfig();
        this.syncCommands();
        this.syncPermissions();
        this.initWarningsTable();
    }

    initWarningsTable() {
        this.warnings = Warnings;
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

    getWarningsTable() {
        return this.warnings;
    }
};

module.exports = { BotConfig };