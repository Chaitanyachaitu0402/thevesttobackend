const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Category = sequelize.define('Categories', {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            get() {
                // Pad the ID to six digits
                const rawValue = this.getDataValue('Id');
                return String(rawValue).padStart(6, '0');
            }
        },
       
        Category_Level_0: { type: DataTypes.STRING },

        categories_image: { type: DataTypes.STRING },

        description: { type: DataTypes.STRING },

    }, {
        // timestamps: true,
        tableName: 'categories'
    });

    return Category;
};