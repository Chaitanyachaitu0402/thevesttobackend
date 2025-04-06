const { DataTypes, Sequelize } = require('sequelize');
module.exports = (Sequelize) => {
    const usermodel = Sequelize.define('bestsellers', {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true, // Use autoIncrement for automatic ID generation
            unique: true
        },
        Name: { type: DataTypes.STRING, },
        Weight1: { type: DataTypes.STRING, },
        Weight2: { type: DataTypes.STRING, },
        Weight3: { type: DataTypes.STRING, },
        Stock: { type: DataTypes.STRING, },
        Low_Stock: { type: DataTypes.STRING, },
        Tax_Class: { type: DataTypes.STRING, },
        Cost_Price_1: { type: DataTypes.STRING, },
        Cost_1_Including_VAT: { type: DataTypes.STRING, },
        Regular_Price_1: { type: DataTypes.STRING, },
        Sale_Price_1: { type: DataTypes.STRING, },
        Sale_Regular_Including_VAT_1: { type: DataTypes.STRING, },
        Margin_1: { type: DataTypes.STRING, },
        Margin_1_Percentage: { type: DataTypes.STRING, },
        Cost_Price_2: { type: DataTypes.STRING, },
        Cost_2_Including_VAT: { type: DataTypes.STRING, },
        Regular_Price_2: { type: DataTypes.STRING, },
        Sale_Price_2: { type: DataTypes.STRING, },
        Sale_Regular_Including_VAT_2: { type: DataTypes.STRING, },
        Margin_2: { type: DataTypes.STRING, },
        Margin_2_Percentage: { type: DataTypes.STRING, },
        Cost_Price_3: { type: DataTypes.STRING, },
        Cost_3_Including_VAT: { type: DataTypes.STRING, },
        Regular_Price_3: { type: DataTypes.STRING, },
        Sale_Price_3: { type: DataTypes.STRING, },
        Sale_Regular_Including_VAT_3: { type: DataTypes.STRING, },
        Margin_3: { type: DataTypes.STRING, },
        Margin_3_Percentage: { type: DataTypes.STRING, },
        Categories: { type: DataTypes.STRING, },
        CategoryId: { type: DataTypes.STRING, },
        Product_image: { type: DataTypes.STRING, },
    }, {
        timestamps: true,
        tableName: 'bestsellers'
    });

    return usermodel;
}