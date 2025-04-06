const { DataTypes, Sequelize } = require('sequelize')
module.exports = (Sequelize) => {
    const usermodel = Sequelize.define('offers',
        {
            id: { type: DataTypes.STRING, primaryKey: true },

            name: { type: DataTypes.STRING, },

            image: { type: DataTypes.STRING, },

            description: { type: DataTypes.STRING, },

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
            tableName: 'offers'
        }

    );
    return usermodel;

}

