const { sequelize } = require('../../db')
const bestsellersModel = require('../../model/bestsellers')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../services/response');


// CREATE PRODUCT

const createBestSellers = async (userData) => {
    try {
        const newUser = await bestsellersModel.create(userData);
        return newUser;
    }
    catch (error) {
        console.error("Error in create bestsellers details in controller", error);
        throw new Error("Error in create bestsellers in controller");
    }
};

// UPDATE PRODUCT

const updateBestSellers = async (Id, userData) => {
    try {
        const newUser = await bestsellersModel.update(userData, {
            where: {
                Id: Id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in update bestsellers in controller", error);
        throw new Error("Error update bestsellers in controller");
    }
};

const updateProductImage = async (Name, userData) => {
    try {
        const newUser = await bestsellersModel.update(userData, {
            where: {
                Name: Name
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in update product in controller", error);
        throw new Error("Error update product in controller");
    }
};

// DELETE PRODUCT

const deleteBestSellers = async (Id) => {
    try {
        const newUser = await bestsellersModel.destroy({
            where: {
                Id: Id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in delete bestsellers in controller", error);
        throw new Error("Error delete bestsellers in controller");
    }
};

// DELETE PRODUCT BY PRODUCT NAME

const deleteBestSellersByName = async (Name) => {
    try {
        const newUser = await bestsellersModel.destroy({
            where: {
                Name: Name
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in delete bestsellers in controller", error);
        throw new Error("Error delete bestsellers in controller");
    }
};

// GET PRODUCT

const getBestSellersById = async (Id) => {
    try {
        const user = await bestsellersModel.findOne({
            where: {
                Id: Id
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get bestsellers in controller..!", error);
        throw new Error('enable to create bestsellers error')
    }
};

const getProductByName = async (Name) => {
    try {
        const user = await bestsellersModel.findOne({
            where: {
                Name: Name
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get product in controller..!", error);
        throw new Error('enable to create product error')
    }
};

// GET ALL PRODUCT

const getAllBestSellers = async (userData) => {
    try {

        const user = await bestsellersModel.findAll(userData);
        return user
    }
    catch (error) {
        console.log("error in get bestsellers in controller..!", error);
        throw new Error('enable to get bestsellers error')
    }
}

// SEARCH PRODUCT

const searchBestSellersDetails = async (userData) => {
    try {

        const data = {};
        if (userData.product_name) {
            data.product_name = userData.product_name
        }

        if (userData.Id) {
            data.Id = userData.Id
        }
        const user = await bestsellersModel.findAll({
            where: data
        });
        return user


    } catch (error) {
        console.log("erorr in search bestsellers in controller", error)
        errorResponse("error in search bestsellers in controller")
    }
};


const bulkProductUpload = async (productData) => {
    try {
        const response = await bestsellersModel.bulkCreate(productData);
        return response;
    } catch (error) {
        console.log("Error in bulk uploading products in controller.....", error);
        throw error;
    }
};

module.exports = {
    createBestSellers,
    updateBestSellers,
    deleteBestSellers,
    deleteBestSellersByName,
    getBestSellersById,
    getAllBestSellers,
    searchBestSellersDetails,
    getProductByName,
    updateProductImage,
    bulkProductUpload
}