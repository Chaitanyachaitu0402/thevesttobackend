const { DataTypes, Sequelize } = require('sequelize')
module.exports = (Sequelize) => {
    const usermodel = Sequelize.define('orderagain',
        {
            Id: { type: DataTypes.STRING, primaryKey: true },

            product_name: { type: DataTypes.STRING, },

            product_image: { type: DataTypes.STRING, },

            cart_details: { type: DataTypes.STRING, },

            product_price: { type: DataTypes.STRING, },

            time: { type: DataTypes.STRING, },



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
            tableName: 'orderagain'
        }

    );
    return usermodel;

}

