const { DataTypes, Sequelize } = require('sequelize')
module.exports = (Sequelize) => {
    const usermodel = Sequelize.define('pincode',
        {
            Id: { type: DataTypes.STRING, primaryKey: true },

            Name: { type: DataTypes.STRING, },

            Product_image: { type: DataTypes.STRING, },

            Price: { type: DataTypes.STRING, },

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
            tableName: 'pincode'
        }

    );
    return usermodel;

}

