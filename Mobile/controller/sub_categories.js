const { sequelize } = require('../../db')
const sub_categoriesModel = require('../../model/sub_categories')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../services/res');


//  CREATE  sub-category

const createSubCategories = async (userData) => {
    try {
        const newUser = await sub_categoriesModel.create(userData);
        return newUser;
    }
    catch (error) {
        console.error("Error in create sub-category details in controller", error);
        throw new Error("Error in create sub-category details in controller");
    }
};

// UPDATE sub-category

const updateSubCategories = async (sub_categories_id, userData) => {
    try {
        const newUser = await sub_categoriesModel.update(userData, {
            where: {
                sub_categories_id: sub_categories_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in update sub-category in controller", error);
        throw new Error("Error update sub-category");
    }
};

// DELETE sub-category

const deleteSubCategories = async (sub_categories_id) => {
    try {
        const newUser = await sub_categoriesModel.destroy({
            where: {
                sub_categories_id: sub_categories_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in delete sub-category in controller", error);
        throw new Error("Error delete sub-category");
    }
};


// GET SUB CATEGORIES

const getSubCategoriesById = async (sub_categories_id) => {
    try {
        const user = await sub_categoriesModel.findOne({
            where: {
                sub_categories_id: sub_categories_id
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get  sub-categories in controller..!", error);
        throw new Error('unable to get  sub-categories error')
    }
};

// GET ALL SUB CATEGORIES

const getAllSubCategories = async () => {
    try {
        const user = await sub_categoriesModel.findAll();
        return user
    }
    catch (error) {
        console.log("error in get  sub-categories in controller..!", error);
        throw new Error('unable to get  sub-categories error')
    }
}

// SEARCH SUB CATEGORIES

const searchSubCategoriesDetails = async (userData) => {
    try {

        const data = {};
        if (userData.sub_categories_name) {
            data.sub_categories_name = userData.sub_categories_name
        }

        if (userData.sub_categories_id) {
            data.sub_categories_id = userData.sub_categories_id
        }
        const user = await sub_categoriesModel.findAll({
            where: data
        });
        return user

    } catch (error) {
        console.log("erorr in search  sub-categories in controller", error)
        errorResponse("error in search  sub-categories in controller")
    }
};

//  COUNT SUB CATEGORIES

const countSubCategories = async (userData) => {

    try {
        const newUser = await sub_categoriesModel.count({
            where: {
                sub_categories_name: userData.sub_categories_name
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in count vegetables in controller", error);
        throw new Error("Error count vegetables Details");
    }
}
module.exports = {
  
    getSubCategoriesById,
    getAllSubCategories,
    searchSubCategoriesDetails,
    countSubCategories,
    createSubCategories,
    updateSubCategories,
    deleteSubCategories
    
}