const { DataTypes, Sequelize } = require('sequelize')
module.exports = (Sequelize) => {
    const usermodel = Sequelize.define('orders',
        {
            order_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                // get() {
                //     // Pad the ID to six digits
                //     const rawValue = this.getDataValue('Id');
                //     return String(rawValue).padStart(6, '0');
                // }
            },

            user_id: { type: DataTypes.STRING, },

            user_name: { type: DataTypes.STRING, },

            first_name: { type: DataTypes.STRING, },

            second_name: { type: DataTypes.STRING, },

            address: { type: DataTypes.STRING, },

            town_city: { type: DataTypes.STRING, },

            postcode: { type: DataTypes.STRING, },

            phone_number: { type: DataTypes.JSON, },

            email: { type: DataTypes.STRING, },

            screenshot: { type: DataTypes.TEXT, },

            products: { type: DataTypes.STRING, },

            quantity: { type: DataTypes.STRING, },

            size: { type: DataTypes.STRING, },

            total_amount: { type: DataTypes.STRING, },

            modeofpayment: { type: DataTypes.STRING, },

            ordered_date: { type: DataTypes.STRING, },


            status: {
                type: DataTypes.STRING,
                validate: {
                    isIn: [["Successfull", "Pending Order", "Canceled"]]
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
            tableName: 'orders'
        }

    );
    return usermodel;

}

