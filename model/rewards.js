const { DataTypes, Sequelize } = require('sequelize')
module.exports = (Sequelize) => {
    const usermodel = Sequelize.define('rewards',
        {
            id: { type: DataTypes.STRING, primaryKey: true },

            user_name: { type: DataTypes.STRING, },

            user_id: { type: DataTypes.STRING, },

            points: { type: DataTypes.STRING, },

            description: { type: DataTypes.STRING, },

            pointstopounds: { type: DataTypes.STRING, },

            poundstopoints: { type: DataTypes.STRING, },

            poundstogather: { type: DataTypes.STRING, },

            createdAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                onUpdate: DataTypes.NOW,
            },
        },
        {
            timestamps: true,
            tableName: 'rewards'
        }

    );
    return usermodel;

}

