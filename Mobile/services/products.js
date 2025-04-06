const product_controller = require("../controller/products");
const { successResponse, errorResponse } = require("./res")

const csv = require('csv-parser');
const fs = require('file-system');


// CREATE PRODUCT

const createProduct = async (userData) => {
    try {
       

        const response = await product_controller.createProduct(userData.body);
        return successResponse(response);
    }

    catch (error) {
        console.log("Error in create cart in services..", error)
        return errorResponse("Error in create cart in services..")
    }
}

// UPDATE PRODUCT

const updateProduct = async (userData) => {
    try {

        const updatedData = await product_controller.updateProduct(userData.body.product_id, userData.body)
        return successResponse(updatedData)
    }

    catch (error) {
        console.log("Error in update Product in servicess.....!", error)
        return errorResponse("Error in update Product in servicess")
    }
};

// DELETE PRODUCT

const deleteProduct = async (userData) => {
    try {

        const deletedData = await product_controller.deleteProduct(userData.body.product_id)
        return successResponse(deletedData)
    }
    catch (error) {
        console.log("Error in delete Product in  servicess.....!", error)
        return errorResponse("Error in delete Product in servicess")
    }
};

// DELETE PRODUCT BY PRPDUCT NAME

const deleteProductByName = async (userData) => {
    try {

        const deletedData = await product_controller.deleteProductByName(userData.body.product_id)
        return successResponse(deletedData)
    }
    catch (error) {
        console.log("Error in delete Product in  servicess.....!", error)
        return errorResponse("Error in delete Product in servicess")
    }
};

// GET PRODUCT BY ID

const getProductById = async (userData) => {
    try {

        const response = await product_controller.getProductById(userData.body.product_id)
        return successResponse(response)
    }
    catch (error) {
        console.log("Error in get by id Product in  servicess.....!", error)
        return errorResponse("Error in get by id Product in servicess")
    }
};


const getProductByCategoryId= async (userData) => {
    try {

        const response = await product_controller.getProductByCategoryId(userData.body.CategoriesId)
        return successResponse(response)
    }
    catch (error) {
        console.log("Error in get by id Product in  servicess.....!", error)
        return errorResponse("Error in get by id Product in servicess")
    }
};

// GET ALL PRODUCT

const getAllProduct = async (userData) => {
    try {

        const response = await product_controller.getAllProduct(userData.body)
        return successResponse(response)
    }

    catch (error) {
        console.log("Error in get all Product in servicess.....!", error)
        return errorResponse("Error in get all Product in servicess")
    }
};

// SEARCH PRODUCT DETAILS

const searchProductDetails = async (userData) => {
    try {

        const Response = await product_controller.searchProductDetails(userData.body)
        return successResponse(Response)
    }
    catch (error) {
        console.log("Error in search Product in  servicess.....!", error)
        return errorResponse("Error in search Product in  servicess")
    }
};

// BULK UPLOAD PRODUCTS FROM CSV

const bulkUploadProducts = async (userData) => {
    try {

        const filePath = userData.file.path;
        const products = [];

        return new Promise((resolve, reject) => {
            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (row) => {
                    products.push(row);
                })
                .on('end', async () => {
                    try {
                        const response = await product_controller.bulkCreateProducts(products);
                        resolve(successResponse(response));
                    } catch (error) {
                        console.log("Error in bulk create products", error);
                        reject(errorResponse("Error in bulk create products"));
                    }
                })
                .on('error', (error) => {
                    console.log("Error reading CSV file", error);
                    reject(errorResponse("Error reading CSV file"));
                });
        });
    } catch (error) {
        console.log("Error in bulk upload products in services..", error);
        return errorResponse("Error in bulk upload products in services");
    }
};

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getAllProduct,
    searchProductDetails,
    deleteProductByName,
    bulkUploadProducts,
    getProductByCategoryId
};