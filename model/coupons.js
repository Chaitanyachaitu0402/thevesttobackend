const { DataTypes, Sequelize } = require('sequelize')
module.exports = (Sequelize) => {
    const usermodel = Sequelize.define('coupons',
        {
            coupon_id: { type: DataTypes.STRING, primaryKey: true },

            coupon_code: { type: DataTypes.STRING, },

            starting_date: { type: DataTypes.STRING, },

            expiry_date: { type: DataTypes.STRING, },

            discount_amount: { type: DataTypes.STRING, },

            discount_percentage: { type: DataTypes.STRING, },

            applicable_category: { type: DataTypes.STRING, },
            
            product_type: { type: DataTypes.STRING, },
            
            product_applicable: { type: DataTypes.TEXT, },

            type: { type: DataTypes.STRING, },
            
            buy_quantity: { type: DataTypes.STRING, },

            for_amount: { type: DataTypes.STRING, },

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
            tableName: 'coupons'
        }

    );
    return usermodel;

}

