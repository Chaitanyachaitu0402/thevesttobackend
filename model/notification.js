const { DataTypes, Sequelize } = require('sequelize')
module.exports = (Sequelize) => {
    const notification = Sequelize.define('notification', {

        notification_id: { type: DataTypes.STRING, primaryKey: true },

        description: { type: DataTypes.STRING, },

        date: { type: DataTypes.DATE, },

        createdAt: {
            type: DataTypes.DATE,

        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            onUpdate: DataTypes.NOW,
        },
    },
        {
            timestamps: true,
            tableName: 'notification'
        }
    );
    return notification;
}