const { sequelize } = require('../../db')
const brandModel = require('../../model/brand')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../services/res');


// CREATE BRAND

const createBrand = async (userData) => {
    try {
        const newUser = await brandModel.create(userData);
        return newUser;
    }
    catch (error) {
        console.error("Error in create brand details in controller", error);
        throw new Error("Error in create brand in controller");
    }
};

// UPDATE BRAND

const updateBrand = async (brand_id, userData) => {
    try {
        const newUser = await brandModel.update(userData, {
            where: {
                brand_id: brand_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in update brand in controller", error);
        throw new Error("Error update brand in controller");
    }
};

// DELETE BRAND

const deleteBrand = async (brand_id) => {
    try {
        const newUser = await brandModel.destroy({
            where: {
                brand_id: brand_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in delete brand in controller", error);
        throw new Error("Error delete brand in controller");
    }
};

// GET BRAND

const getBrandById = async (brand_id) => {
    try {
        const user = await brandModel.findOne({
            where: {
                brand_id: brand_id
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get brand in controller..!", error);
        throw new Error('enable to get brand error')
    }
};

// GET ALL BRAND

const getAllBrand = async (userData) => {
    try {

        const user = await brandModel.findAll(userData);
        return user
    }
    catch (error) {
        console.log("error in get brand in controller..!", error);
        throw new Error('enable to get brand error')
    }
}

// SEARCH BRAND

const searchBrandDetails = async (userData) => {
    try {

        const data = {};
        if (userData.brand_name) {
            data.brand_name = userData.brand_name
        }

        if (userData.brand_id) {
            data.brand_id = userData.brand_id
        }
        const user = await brandModel.findAll({
            where: data
        });
        return user


    } catch (error) {
        console.log("erorr in search brand in controller", error)
        errorResponse("error in search brand in controller")
    }
};

module.exports = {
    createBrand,
    updateBrand,
    deleteBrand,
    getBrandById,
    getAllBrand,
    searchBrandDetails
   
 
}