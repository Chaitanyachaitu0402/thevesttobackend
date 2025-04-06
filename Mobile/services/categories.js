const categories_Controller = require("../controller/categories");
const { successResponse, errorResponse } = require("./res");
const shortUUID = require('short-uuid');
const fs = require("fs");
const csv = require('csv-parser');
const { deleteImage } = require("./deleteimages")




// CREATE ORDERS

const createCategories = async (userData) => {
    try {
        const translator = shortUUID(); 
        const userId = translator.new(); 
        userData.body.Id = userId;

        const response = await categories_Controller.createCategories(userData.body);
        return successResponse(response);

    } catch (error) {
        console.log("Error in create orders in services..", error);
        return errorResponse("Error in create orders in services..");
    }
};

// UPDATE ORDERS

const updateCategories = async (userData) => {
    try {


        if (userData.file) {
            const getUserDate = await categories_Controller.getCategoriesById(userData.body.Id)

            if (getUserDate.categories_image !== null) {
                await deleteImage(getUserDate.categories_image)
                userData.body.categories_image = userData.file.filename
            }
            else {
                userData.body.categories_image = userData.file.filename
            }
        }
        const updatedData = await categories_Controller.updateCategories(userData.body.Id, userData.body);
        return successResponse(updatedData);
    } catch (error) {
        console.log("Error in update orders in services.....!", error);
        return errorResponse("Error in update orders in services");
    }
};

// DELETE ORDERS

const deleteCategories = async (userData) => {
    try {

        const deletedData = await categories_Controller.deleteCategories(userData.body.Id, userData.body);
        return successResponse(deletedData);

    } catch (error) {
        console.log("Error in delete orders in services.....!", error);
        return errorResponse("Error in delete orders in services");
    }
};

// GET CATEGORIES BY ID

const getCategoriesById = async (userData) => {
    try {
        const response = await categories_Controller.getCategoriesById(userData.body.Id);
        return successResponse(response);

    } catch (error) {
        console.log("Error in get by id categories in services.....!", error);
        return errorResponse("Error in get by id categories in services");
    }
};

// GET ALL CATEGORIES

const getAllCategories = async (userData) => {
    try {

        const response = await categories_Controller.getAllCategories(userData);
        return successResponse(response);

    } catch (error) {
        console.log("Error in get all categories in services.....!", error);
        return errorResponse("Error in get all categories in services");
    }
};

// SEARCH CATEGORIES DETAILS

const searchCategoriesDetails = async (userData) => {
    try {

        const Response = await categories_Controller.searchCategoriesDetails(userData.body);
        return successResponse(Response);

    } catch (error) {
        console.log("Error in search categories in services.....!", error);
        return errorResponse("Error in search categories in services");
    }
};

// COUNT CATEGORIES

const countCategories = async (userData) => {
    try {
        const response = await categories_Controller.countCategories(userData.body);
        return successResponse(response);

    } catch (error) {
        console.log("Error in count in services.....!", error);
        return errorResponse("Error in count in services");
    }
};




// BULK UPLOAD PRODUCTS FROM CSV

const bulkUploadCategory = async (req) => {
    try {
        const filePath = req.file.path;
        const products = [];

        return new Promise((resolve, reject) => {
            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (row) => {
                    products.push(row);
                })
                .on('end', async () => {
                    try {
                        const response = await categories_Controller.bulkCreateCategory(products);
                        resolve(successResponse(response));
                    } catch (error) {
                        console.error("Error in bulk create category:", error);
                        reject(errorResponse("Error in bulk create category"));
                    }
                })
                .on('error', (error) => {
                    console.error("Error reading CSV file:", error);
                    reject(errorResponse("Error reading CSV file"));
                });
        });
    } catch (error) {
        console.error("Error in bulk upload category service:", error);
        return errorResponse("Error in bulk upload category service");
    }
};

module.exports = {
    searchCategoriesDetails,
    countCategories,
    getAllCategories,
    getCategoriesById,
    createCategories,
    updateCategories,
    deleteCategories,
    bulkUploadCategory


};
