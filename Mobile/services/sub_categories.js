const sub_categories_Controller = require("../controller/sub_categories");
const { successResponse, errorResponse } = require("./res");
const fs = require('fs');
const shortUUID = require('short-uuid');


// CREATE WALLET

const createSubCategories = async (userData) => {
    try {
        const translator = shortUUID(); 
        const userId = translator.new(); 
        userData.body.sub_categories_id = userId;

        const response = await sub_categories_Controller.createWallet(userData.body);
        return successResponse(response);

    } catch (error) {
        console.log("Error in create wallet in services..", error);
        return errorResponse("Error in create wallet in services..");
    }
};

// UPDATE WALLET

const updateSubCategories = async (userData) => {
    try {
        const updatedData = await sub_categories_Controller.updateSubCategories(userData.body.sub_categories_id, userData.body);
        return successResponse(updatedData);
    } catch (error) {
        console.log("Error in update wallet in services.....!", error);
        return errorResponse("Error in update wallet in services");
    }
};

// DELETE WALLET

const deleteSubCategories = async (userData) => {
    try {

        const deletedData = await sub_categories_Controller.deleteWallet(userData.body.sub_categories_id, userData.body);
        return successResponse(deletedData);

    } catch (error) {
        console.log("Error in delete wallet in services.....!", error);
        return errorResponse("Error in delete wallet in services");
    }
};

// GET  SUB CATEGORIES BY ID

const getSubCategoriesById = async (userData) => {
    try {
        const response = await sub_categories_Controller.getSubCategoriesById(userData.body.sub_categories_id);
        return successResponse(response);

    } catch (error) {
        console.log("Error in get by id subcategories in services.....!", error);
        return errorResponse("Error in get by id subcategories in services");
    }
};

// GET ALL SUB CATEGORIES

const getAllSubCategories = async (userData) => {
    try {

        const response = await sub_categories_Controller.getAllSubCategories(userData.body);
        return successResponse(response);

    } catch (error) {
        console.log("Error in get all subcategories in services.....!", error);
        return errorResponse("Error in get all subcategories in services");
    }
};

// SEARCH SUB CATEGORIES DETAILS

const searchSubCategoriesDetails = async (userData) => {
    try {

        const Response = await sub_categories_Controller.searchSubCategoriesDetails(userData.body);
        return successResponse(Response);

    } catch (error) {
        console.log("Error in search subcategories in services.....!", error);
        return errorResponse("Error in search subcategories in services");
    }
};

// COUNT  SUB CATEGORIES

const countSubCategories = async (userData) => {
    try {
        const response = await sub_categories_Controller.countSubCategories(userData.body);
        return successResponse(response);

    } catch (error) {
        console.log("Error in count in services.....!", error);
        return errorResponse("Error in count in services");
    }
};

module.exports = {

    searchSubCategoriesDetails,
    countSubCategories,
    getAllSubCategories,
    getSubCategoriesById,
    createSubCategories,
    updateSubCategories,
    deleteSubCategories

};
