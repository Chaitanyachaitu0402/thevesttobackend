const { sequelize } = require('../../db')
const bannerModel = require('../../model/banners')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../services/response');


// CREATE BANNER

const createBanner = async (userData) => {
    try {
        const newUser = await bannerModel.create(userData);
        return newUser;
    }
    catch (error) {
        console.error("Error in create Banner details in controller", error);
        throw new Error("Error in create Banner in controller");
    }
};

// UPDATE BANNER

const updateBanner = async (banner_id, userData) => {
    try {
        const newUser = await bannerModel.update(userData, {
            where: {
                banner_id: banner_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in update Banner in controller", error);
        throw new Error("Error update Banner in controller");
    }
};


const updateBannerByName = async (banner_name, userData) => {
    try {
        const newUser = await bannerModel.update(userData, {
            where: {
                banner_name: banner_name
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in update Banner in controller", error);
        throw new Error("Error update Banner in controller");
    }
};

// DELETE BANNER

const deleteBanner = async (banner_name) => {
    try {
        const newUser = await bannerModel.destroy({
            where: {
                banner_name: banner_name
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in delete Banner in controller", error);
        throw new Error("Error delete Banner in controller");
    }
};

// DELETE BANNER BY BANNER NAME

const getBannerByName = async (banner_name) => {
    try {
        const newUser = await bannerModel.findOne({
            where: {
                banner_name: banner_name
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in delete Banner in controller", error);
        throw new Error("Error delete Banner in controller");
    }
};

// GET BANNER

const getBannerById = async (banner_id) => {
    try {
        const user = await bannerModel.findOne({
            where: {
                banner_id: banner_id
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get Banner in controller..!", error);
        throw new Error('enable to create Banner error')
    }
};

// Get all banners

const getallBanners = async () => {
    try {
        const response = await bannerModel.findAll();
        return response;
    } catch (error) {
        console.log("Error in getting all Banners in controller.....", error);
        throw error;
    }
};


module.exports = {
    createBanner,
    updateBanner,
    deleteBanner,
    getBannerByName,
    getBannerById,
    getallBanners,
    updateBannerByName

}