const { DataTypes, Sequelize } = require('sequelize')
module.exports = (Sequelize) => {
    const usermodel = Sequelize.define('topcategories',
        {
            category_id: { type: DataTypes.STRING, primaryKey: true },

            user_id: { type: DataTypes.STRING, },

            user_name: { type: DataTypes.STRING, },

            category_image: { type: DataTypes.STRING, },
            
            category_name: { type: DataTypes.STRING, },



            status: {
                type: DataTypes.STRING,
                defaultValue: "Pending",
                validate: {
                    isIn: [["Pending", "Shipped", "Delivered", "Processing"]]
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
            tableName: 'topcategories'
        }

    );
    return usermodel;

}

