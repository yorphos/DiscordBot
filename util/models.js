const { DataTypes } = require('sequelize');

function initModels(sequelize) {
  sequelize.define(
    'Users',
    {
      userid: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      username: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Users',
    }
  );

  sequelize.define(
    'Mutes',
    {
      userid: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      reason: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      endsat: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Mutes',
    }
  );

  sequelize.define(
    'UToWarnings',
    {
      userid: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      warnings: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'UToWarnings',
      timestamps: false,
    }
  );

  sequelize.define(
    'Warnings',
    {
      warnid: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      dateissued: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      reason: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      issuerid: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Warnings',
    }
  );
}

module.exports = { initModels };
