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
        Product_image1: { type: DataTypes.STRING, },
        Product_image2: { type: DataTypes.STRING, },
        Product_image3: { type: DataTypes.STRING, },
        Product_image4: { type: DataTypes.STRING, },
        Product_image5: { type: DataTypes.STRING, },
    }, {
        timestamps: true,
        tableName: 'product'
    });

    return usermodel;
}