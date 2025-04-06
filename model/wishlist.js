const { DataTypes, Sequelize } = require('sequelize')
module.exports = (Sequelize) => {
    const address = Sequelize.define('wishlist', {

        wishlist_id: { type: DataTypes.STRING, primaryKey: true },

        user_id: { type: DataTypes.STRING, },

        name: { type: DataTypes.STRING, },

        image: { type: DataTypes.STRING, },

        price: { type: DataTypes.STRING, },

        discount: { type: DataTypes.STRING, },

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
            tableName: 'wishlist'
        }
    );
    return address;
}