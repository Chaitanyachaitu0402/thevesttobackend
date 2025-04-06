const { DataTypes, Sequelize } = require('sequelize')
module.exports = (Sequelize) => {
    const usermodel = Sequelize.define('cart',
        {
            cart_id: { type: DataTypes.STRING, primaryKey: true },

            Name: { type: DataTypes.STRING, },

            SalePrice: { type: DataTypes.FLOAT },

            user_id: { type: DataTypes.STRING, },

            product_id: { type: DataTypes.STRING, },

            product_image: { type: DataTypes.STRING },

            cost: { type: DataTypes.INTEGER, },

            quantity: { type: DataTypes.INTEGER, },

            weight: { type: DataTypes.STRING, allowNull: true },

            description: { type: DataTypes.STRING, },

            discount: { type: DataTypes.STRING, },

            subtotal: { type: DataTypes.FLOAT, },

            delivery: { type: DataTypes.STRING, },

            total_price: { type: DataTypes.FLOAT, },

            status: {
                type: DataTypes.STRING,
                defaultValue: "Pending",
                validate: {
                    isIn: [["Ordered", "Shipped", "Out for Delivery", "Delivered", "Pending"]]
                },
            },

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
            tableName: 'cart'
        }

    );
    return usermodel;

}