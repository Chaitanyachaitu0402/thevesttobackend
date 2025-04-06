const { sequelize } = require('../../db')
const sub_categoriestModel = require('../../model/sub_categories_1')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../services/response');


// CREATE SUB CATEGORIES

const createSubCategories = async (userData) => {
    try {
        const newUser = await sub_categoriestModel.create(userData);
        return newUser;
    }
    catch (error) {
        console.error("Error in create sub_categories details in controller", error);
        throw new Error("Error in create sub_categories in controller");
    }
};

// UPDATE  SUB CATEGORIES

const updateSubCategories = async (Sub_Cat_Level_1_Id, userData) => {
    try {
        const newUser = await sub_categoriestModel.update(userData, {
            where: {
                Sub_Cat_Level_1_Id: Sub_Cat_Level_1_Id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in update sub_categories in controller", error);
        throw new Error("Error update sub_categories in controller");
    }
};

// DELETE  SUB CATEGORIES

const deleteSubCategories = async (Sub_Cat_Level_1_Id) => {
    try {
        const newUser = await sub_categoriestModel.destroy({
            where: {
                Sub_Cat_Level_1_Id: Sub_Cat_Level_1_Id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in delete sub_categories in controller", error);
        throw new Error("Error delete sub_categories in controller");
    }
};

// GET  SUB CATEGORIES

const getSubCategoriesById = async (Sub_Cat_Level_1_Id) => {
    try {
        const user = await sub_categoriestModel.findOne({
            where: {
                Sub_Cat_Level_1_Id: Sub_Cat_Level_1_Id
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get sub_categories in controller..!", error);
        throw new Error('enable to get sub_categories error')
    }
};

// GET ALL  SUB CATEGORIES

const getAllSubCategories = async (userData) => {
    try {

        const user = await sub_categoriestModel.findAll(userData);
        return user
    }
    catch (error) {
        console.log("error in get sub_categories in controller..!", error);
        throw new Error('enable to get sub_categories error')
    }
}

// SEARCH  SUB CATEGORIES

const searchSubCategoriesDetails = async (userData) => {
    try {

        const data = {};
        if (userData.Name) {
            data.Name = userData.Name
        }

        if (userData.Sub_Cat_Level_1_Id) {
            data.Sub_Cat_Level_1_Id = userData.Sub_Cat_Level_1_Id
        }
        const user = await sub_categoriestModel.findAll({
            where: data
        });
        return user


    } catch (error) {
        console.log("erorr in search sub_categories in controller", error)
        errorResponse("error in search sub_categories in controller")
    }
};




// UPDATE OR CREATE CATEGORY
const updateOrCreateCategory = async (Sub_Cat_Level_1_Id, categoryData) => {
    try {
        // Check if the category exists
        const existingCategory = await sub_categoriestModel.findOne({
            where: { Sub_Cat_Level_1_Id: Sub_Cat_Level_1_Id }
        });

        if (existingCategory) {
            // If exists, update it
            await sub_categoriestModel.update(categoryData, {
                where: { Sub_Cat_Level_1_Id: Sub_Cat_Level_1_Id }
            });
            return { message: `Category with Id ${Sub_Cat_Level_1_Id} updated.` };
        } else {
            // If not exists, create a new category
            const newCategory = await sub_categoriestModel.create(categoryData);
            return { message: `New category created with Id ${newCategory.Sub_Cat_Level_1_Id}` };
        }
    } catch (error) {
        console.error("Error in updateOrCreateCategory controller:", error);
        throw new Error("Error in updateOrCreateCategory controller");
    }
};


module.exports = {
    createSubCategories,
    updateSubCategories,
    deleteSubCategories,
    getSubCategoriesById,
    getAllSubCategories,
    searchSubCategoriesDetails,
    updateOrCreateCategory

}