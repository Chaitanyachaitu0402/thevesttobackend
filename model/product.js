const { DataTypes, Sequelize } = require('sequelize');
module.exports = (Sequelize) => {
    const usermodel = Sequelize.define('product', {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true, // Use autoIncrement for automatic ID generation
            unique: true
        },
        Name: { type: DataTypes.STRING, },
        Price: { type: DataTypes.STRING, },
        ActualPrice: { type: DataTypes.STRING, },
        Description: { type: DataTypes.STRING, },
        Product_image: { type: DataTypes.STRING, },
    }, {
        timestamps: true,
        tableName: 'product'
    });

    return usermodel;
}