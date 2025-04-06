const { sequelize } = require('../../db')
const sub_categoriestModel = require('../../model/sub_categories')(sequelize)
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

const updateSubCategories = async (Id, userData) => {
    try {
        const newUser = await sub_categoriestModel.update(userData, {
            where: {
                Id: Id
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

const deleteSubCategories = async (Id) => {
    try {
        const newUser = await sub_categoriestModel.destroy({
            where: {
                Id: Id
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

const getSubCategoriesById = async (Id) => {
    try {
        const user = await sub_categoriestModel.findOne({
            where: {
                Id: Id
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

        if (userData.Id) {
            data.Id = userData.Id
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

module.exports = {
    createSubCategories,
    updateSubCategories,
    deleteSubCategories,
    getSubCategoriesById,
    getAllSubCategories,
    searchSubCategoriesDetails
}
