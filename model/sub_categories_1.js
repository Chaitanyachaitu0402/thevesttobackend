const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const SubCategory = sequelize.define('sub_categories_1', {
        Sub_Cat_Level_1_Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            get() {
                // Pad the ID to six digits
                const rawValue = this.getDataValue('Sub_Cat_Level_1_Id');
                return String(rawValue).padStart(6, '0');
            }
        },

        Sub_Cat_Level_1: { type: DataTypes.STRING },
        Category_Level_0_Id: { type: DataTypes.STRING },


 
        
        
    }, {
        timestamps: true,
        tableName: 'sub_categories_1'
    });

    return SubCategory;
}