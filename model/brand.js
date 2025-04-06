const { DataTypes, Sequelize } = require('sequelize')
module.exports = (Sequelize) => {
    const usermodel = Sequelize.define('brands',
        {
            brand_id: { type: DataTypes.STRING, primaryKey: true },

            brand_name: { type: DataTypes.STRING, },

            brand_image: { type: DataTypes.STRING, },

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
            tableName: 'brands'
        }

    );
    return usermodel;

}

