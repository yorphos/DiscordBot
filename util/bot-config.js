const { Collection } = require('discord.js');
const { parse } = require('toml');
const { readFileSync, readdirSync } = require('fs');
const { Sequelize } = require('sequelize');
const { initModels } = require('./models.js');
const [dbid, dbuser, dbpass, dbhost, dbport] = [
  process.env.DB_ID,
  process.env.DB_USER,
  process.env.DB_PASS,
  process.env.DB_HOST,
  process.env.DB_PORT,
];

require('dotenv').config();

const sequelize = new Sequelize(dbid, dbuser, dbpass, {
  dbhost,
  dbport,
  dialect: 'postgres',
  logging: false,
});

class BotConfig {
  static dbmodels = sequelize.models;

  constructor() {
    this.syncConfig();
    this.syncCommands();
    this.syncPermissions();
    this.initDB();
  }

  syncConfig() {
    this.config = parse(readFileSync('./config.toml').toString());
  }

  syncCommands() {
    const files = readdirSync('./commands').filter((file) =>
      file.endsWith('.js')
    );

    this.commands = new Collection();
    for (var file of files) {
      const command = require(`../commands/${file}`);
      this.commands.set(command.name, command);
    }
  }

  syncPermissions() {
    this.permissions = parse(readFileSync('./permissions.toml').toString());
  }

  initDB() {
    initModels(sequelize);
    this.dbmodels = sequelize.models;
  }

  getPrefix() {
    return this.config['prefix'];
  }

  getCommands() {
    return this.commands;
  }

  getPermissions() {
    return this.permissions;
  }
}

module.exports = { BotConfig };
