const { DataTypes, Sequelize } = require('sequelize')
module.exports = (Sequelize) => {
    const usermodel = Sequelize.define('card',
        {
            card_id: { type: DataTypes.STRING, primaryKey: true },

            card_name: { type: DataTypes.STRING, },

            user_id: { type: DataTypes.STRING, },

            card_number: { type: DataTypes.STRING, },

            expire_year: { type: DataTypes.STRING, },

            expire_month: { type: DataTypes.STRING, allowNull: true },

            cvv: { type: DataTypes.STRING, },


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
            tableName: 'card'
        }

    );
    return usermodel;

}

