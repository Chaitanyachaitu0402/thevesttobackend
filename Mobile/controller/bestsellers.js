const { sequelize } = require('../../db')
const bestsellersModel = require('../../model/bestsellers')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../services/res');


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

const updateBestSellers = async (bestsellers_id, userData) => {
    try {
        const newUser = await bestsellersModel.update(userData, {
            where: {
                bestsellers_id: bestsellers_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in update bestsellers in controller", error);
        throw new Error("Error update bestsellers in controller");
    }
};

// DELETE PRODUCT

const deleteBestSellers = async (bestsellers_id) => {
    try {
        const newUser = await bestsellersModel.destroy({
            where: {
                bestsellers_id: bestsellers_id
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

const deleteBestSellersByName = async (bestsellers_name) => {
    try {
        const newUser = await bestsellersModel.destroy({
            where: {
                bestsellers_name: bestsellers_name
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

const getBestSellersById = async (bestsellers_id) => {
    try {
        const user = await bestsellersModel.findOne({
            where: {
                bestsellers_id: bestsellers_id
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get bestsellers in controller..!", error);
        throw new Error('enable to create bestsellers error')
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

        if (userData.bestsellers_id) {
            data.bestsellers_id = userData.bestsellers_id
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

module.exports = {
    createBestSellers,
    updateBestSellers,
    deleteBestSellers,
    deleteBestSellersByName,
    getBestSellersById,
    getAllBestSellers,
    searchBestSellersDetails

}