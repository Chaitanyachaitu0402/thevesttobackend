const { DataTypes, Sequelize } = require('sequelize')
module.exports = (Sequelize) => {
    const address = Sequelize.define('address', {

        address_id: {type: DataTypes.STRING,primaryKey: true},

        user_id:{type: DataTypes.STRING,},

        name: {type: DataTypes.STRING,},

        area:{ type: DataTypes.STRING, },

        streetname_locality:{ type: DataTypes.STRING, },

        floor_flat_houseno: { type: DataTypes.STRING,},

        city: {type: DataTypes.STRING},

        state:{type: DataTypes.STRING,},

        contact_number:{type: DataTypes.STRING, unique: true},

        pincode:{type: DataTypes.STRING,},

      

        
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
            tableName: 'address'
        }
    );
    return address;
}