const { sequelize } = require('../../db')
const orderagainModel = require('../../model/orderagain')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../services/res');


// CREATE BRAND

const createOrderAgain = async (userData) => {
    try {
        const newUser = await orderagainModel.create(userData);
        return newUser;
    }
    catch (error) {
        console.error("Error in create orderagain details in controller", error);
        throw new Error("Error in create orderagain in controller");
    }
};

// UPDATE BRAND

const updateOrderAgain = async (Id, userData) => {
    try {
        const newUser = await orderagainModel.update(userData, {
            where: {
                Id: Id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in update orderagain in controller", error);
        throw new Error("Error update orderagain in controller");
    }
};

// DELETE BRAND

const deleteOrderAgain = async (Id) => {
    try {
        const newUser = await orderagainModel.destroy({
            where: {
                Id: Id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in delete orderagain in controller", error);
        throw new Error("Error delete orderagain in controller");
    }
};

// GET BRAND

const getOrderAgainById = async (Id) => {
    try {
        const user = await orderagainModel.findOne({
            where: {
                Id: Id
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get orderagain in controller..!", error);
        throw new Error('enable to get orderagain error')
    }
};

// GET ALL BRAND

const getAllOrderAgain = async (userData) => {
    try {

        const user = await orderagainModel.findAll(userData);
        return user
    }
    catch (error) {
        console.log("error in get orderagain in controller..!", error);
        throw new Error('enable to get orderagain error')
    }
}

// SEARCH BRAND

const searchOrderAgainDetails = async (userData) => {
    try {

        const data = {};
        if (userData.Name) {
            data.Name = userData.Name
        }

        if (userData.Id) {
            data.Id = userData.Id
        }
        const user = await orderagainModel.findAll({
            where: data
        });
        return user


    } catch (error) {
        console.log("erorr in search orderagain in controller", error)
        errorResponse("error in search orderagain in controller")
    }
};

module.exports = {
    createOrderAgain,
    updateOrderAgain,
    deleteOrderAgain,
    getOrderAgainById,
    getAllOrderAgain,
    searchOrderAgainDetails
   
 
}