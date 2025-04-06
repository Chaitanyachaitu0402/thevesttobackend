const { DataTypes, Sequelize } = require('sequelize')
module.exports = (Sequelize) => {
    const usermodel = Sequelize.define('banners',
        {
            banner_id: { type: DataTypes.STRING, primaryKey: true },

            banner_name: { type: DataTypes.STRING, },

            banner_image: { type: DataTypes.STRING, },

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
            tableName: 'banners'
        }

    );
    return usermodel;

}

