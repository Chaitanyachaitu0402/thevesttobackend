const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const SubCategory = sequelize.define('sub_categories_3', {
        Sub_Cat_Level_3_Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            get() {
                // Pad the ID to six digits
                const rawValue = this.getDataValue('Sub_Cat_Level_3_Id');
                return String(rawValue).padStart(6, '0');
            }
        },

        Sub_Cat_Level_3: { type: DataTypes.STRING },
        Sub_Cat_Level_2_Id: { type: DataTypes.STRING },


 
        
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            onUpdate: DataTypes.NOW,
        },
    }, {
        timestamps: true,
        tableName: 'sub_categories_3'
    });

    return SubCategory;
}
