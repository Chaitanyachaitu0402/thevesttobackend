const { sequelize } = require('../../db')
const categoriesModel = require('../../model/categories')(sequelize)
// const sub_categoriesModel = require('../../model/sub_categories')(sequelize)
// const productsmodel = require('../../model/product')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../services/res');

// sub_categoriesModel.belongsTo(categoriesModel, {
//     foreignKey: "Id", // This should match the sourceKey in hasMany
//     targetKey: "categories_id", // This should match the sourceKey in hasMany
//     as: "sub_categories_details", // Renamed from "projectDetails" to match the hasMany alias
// });

// categoriesModel.hasMany(sub_categoriesModel, {
//     foreignKey: "categories_id", // This should match the sourceKey in belongsTo
//     sourceKey: "categories_id", // This should match the targetKey in belongsTo
//     as: "sub_categories_details", // Renamed from "projectDetails" to match the belongsTo alias
// });

// productsmodel.belongsTo(sub_categoriesModel, {
//     foreignKey: "sub_categories_id", // This should match the sourceKey in hasMany
//     targetKey: "sub_categories_id", // This should match the sourceKey in hasMany
//     as: "product_details", // Renamed from "projectDetails" to match the hasMany alias
// });

// sub_categoriesModel.hasMany(productsmodel, {
//     foreignKey: "sub_categories_id", // This should match the sourceKey in belongsTo
//     sourceKey: "sub_categories_id", // This should match the targetKey in belongsTo
//     as: "product_details", // Renamed from "projectDetails" to match the belongsTo alias
// });


//  CREATE  CART

const createCategories = async (userData) => {
    try {
        const newUser = await categoriesModel.create(userData);
        return newUser;
    }
    catch (error) {
        console.error("Error in create cart details in controller", error);
        throw new Error("Error in create cart details in controller");
    }
};

// UPDATE CART

const updateCategories = async (Id, userData) => {
    try {
        const newUser = await categoriesModel.update(userData, {
            where: {
                Id: Id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in update cart in controller", error);
        throw new Error("Error update cart");
    }
};

// DELETE CART

const deleteCategories = async (Id) => {
    try {
        const newUser = await categoriesModel.destroy({
            where: {
                Id: Id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in delete cart in controller", error);
        throw new Error("Error delete cart");
    }
};


// GET  CATEGORIES

const getCategoriesById = async (Id) => {
    try {
        const user = await categoriesModel.findOne({
            where: {
                Id: Id
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get categories in controller..!", error);
        throw new Error('unable to get categories error')
    }
};

// GET CATEGORIES BY NAME

const getCategoriesByName = async (Name) => {
    try {
        const user = await categoriesModel.findOne({
            where: {
                Name: Name
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get categories in controller..!", error);
        throw new Error('unable to get categories error')
    }
};

// GET ALL  CATEGORIES

const getAllCategories = async () => {
    try {

        const categories = await categoriesModel.findAll({
            // include: [{
            //     model: sub_categoriesModel,
            //     as: 'sub_categories_details',
            //     include: [{
            //         model: productsmodel,

            //         as: 'product_details' // Make sure this alias matches your model association
            //     }]
            // }]
        });

        return categories
    }
    catch (error) {
        console.log("error in get categories in controller..!", error);
        throw new Error('unable to get categories error')
    }
}

// SEARCH  CATEGORIES

const searchCategoriesDetails = async (userData) => {
    try {
        const data = {};
        if (userData.Name) {
            data.Name = userData.Name
        }
        if (userData.Id) {
            data.Id = userData.Id
        }
        const user = await categoriesModel.findAll({
            where: data
        });
        return user


    } catch (error) {
        console.log("erorr in search categories in controller", error)
        errorResponse("error in search categories in controller")
    }
};

//  COUNT CATEGORIES

const countCategories = async (userData) => {

    try {
        const newUser = await categoriesModel.count({
            where: {
                Name: userData.Name
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in count vegetables in controller", error);
        throw new Error("Error count vegetables Details");
    }
}

// BULK CREATE PRODUCTS

const bulkCreateCategory = async (products) => {
    try {
        const response = await categoriesModel.bulkCreate(products);
        return { success: true, data: response };
    } catch (error) {
        console.error("Error in bulk create category in controller:", error);
        throw new Error("Error in bulk create category in controller");
    }
};



module.exports = {

    getCategoriesById,
    getAllCategories,
    searchCategoriesDetails,
    countCategories,
    getCategoriesByName,
    createCategories,
    updateCategories,
    deleteCategories,
    bulkCreateCategory

}