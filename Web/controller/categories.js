const { sequelize } = require('../../db')
const categoriestModel = require('../../model/categories')(sequelize)
// const productModel = require('../../model/product')(sequelize)
// const sub_categoriesModel = require('../../model/sub_categories')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../services/response');


// sub_categoriesModel.belongsTo(categoriestModel, {
//     foreignKey: "categories_id", // This should match the sourceKey in hasMany
//     targetKey: "categories_id", // This should match the sourceKey in hasMany
//     as: "sub_categories_details", // Renamed from "projectDetails" to match the hasMany alias
// });

// categoriestModel.hasMany(sub_categoriesModel, {
//     foreignKey: "categories_id", // This should match the sourceKey in belongsTo
//     sourceKey: "categories_id", // This should match the targetKey in belongsTo
//     as: "sub_categories_details", // Renamed from "projectDetails" to match the belongsTo alias
// });

// productModel.belongsTo(sub_categoriesModel, {
//     foreignKey: "sub_categories_id", // This should match the sourceKey in hasMany
//     targetKey: "sub_categories_id", // This should match the sourceKey in hasMany
//     as: "product_details", // Renamed from "projectDetails" to match the hasMany alias
// });

// sub_categoriesModel.hasMany(productModel, {
//     foreignKey: "sub_categories_id", // This should match the sourceKey in belongsTo
//     sourceKey: "sub_categories_id", // This should match the targetKey in belongsTo
//     as: "product_details", // Renamed from "projectDetails" to match the belongsTo alias
// });



// CREATE  CATEGORIES

const createCategories = async (userData) => {
    try {
        const newUser = await categoriestModel.create(userData);
        return newUser;
    }
    catch (error) {
        console.error("Error in create categories details in controller", error);
        throw new Error("Error in create categories in controller");
    }
};

// UPDATE  CATEGORIES

const updateCategories = async (Id, userData) => {
    try {
        const newUser = await categoriestModel.update(userData, {
            where: {
                Id: Id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in update categories in controller", error);
        throw new Error("Error update categories in controller");
    }
};


const updateCategoriesbyName = async (Category_Level_0, userData) => {
    try {
        const newUser = await categoriestModel.update(userData, {
            where: {
                Category_Level_0: Category_Level_0
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in update categories in controller", error);
        throw new Error("Error update categories in controller");
    }
};

// DELETE  CATEGORIES

const deleteCategories = async (Category_Level_0) => {
    try {
        const newUser = await categoriestModel.destroy({
            where: {
                Category_Level_0: Category_Level_0
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in delete categories in controller", error);
        throw new Error("Error delete categories in controller");
    }
};

// GET  CATEGORIES

const getCategoriesById = async (Category_Level_0) => {
    try {
        const user = await categoriestModel.findOne({
            where: {
                Category_Level_0: Category_Level_0
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get categories in controller..!", error);
        throw new Error('enable to create categories error')
    }
};

// GET ALL  CATEGORIES
const getAllCategories = async () => {
    try {

        const categories = await categoriestModel.findAll({
            // include: [{
            //     model: sub_categoriesModel,
            //     as: 'sub_categories_details',
            //     include: [{
            //         model: productModel,
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
        const user = await categoriestModel.findAll({
            where: data
        });
        return user


    } catch (error) {
        console.log("erorr in search categories in controller", error)
        errorResponse("error in search categories in controller")
    }
};


// BULK CREATE PRODUCTS

const bulkCreateCategory = async (products) => {
    try {
        const response = await categoriestModel.bulkCreate(products);
        return { success: true, data: response };
    } catch (error) {
        console.error("Error in bulk create category in controller:", error);
        throw new Error("Error in bulk create category in controller");
    }
};

module.exports = {
    createCategories,
    updateCategories,
    deleteCategories,
    getCategoriesById,
    getAllCategories,
    searchCategoriesDetails,
    bulkCreateCategory,
    updateCategoriesbyName
}
