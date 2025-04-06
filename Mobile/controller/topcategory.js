const { sequelize } = require('../../db')
const topcategoriesModel = require('../../model/topcategories')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../services/res');


// CREATE BRAND

const createTopCategory = async (userData) => {
    try {
        const newUser = await topcategoriesModel.create(userData);
        return newUser;
    }
    catch (error) {
        console.error("Error in create orderagain details in controller", error);
        throw new Error("Error in create orderagain in controller");
    }
};


// GET ALL BRAND

const getAllTopCategory = async (userData) => {
    try {

        const user = await topcategoriesModel.findAll(userData);
        return user
    }
    catch (error) {
        console.log("error in get orderagain in controller..!", error);
        throw new Error('enable to get orderagain error')
    }
}


module.exports = {
    createTopCategory,
    getAllTopCategory
   
 
}