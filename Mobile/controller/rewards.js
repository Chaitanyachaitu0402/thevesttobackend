const { sequelize } = require('../../db')
const rewardsModel = require('../../model/rewards')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../services/res');


// CREATE BRAND

const createRewards = async (userData) => {
    try {
        const newUser = await rewardsModel.create(userData);
        return newUser;
    }
    catch (error) {
        console.error("Error in create rewards details in controller", error);
        throw new Error("Error in create rewards in controller");
    }
};

// UPDATE BRAND

const updateRewards = async (id, userData) => {
    try {
        const newUser = await rewardsModel.update(userData, {
            where: {
                id: id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in update rewards in controller", error);
        throw new Error("Error update rewards in controller");
    }
};

// DELETE BRAND

const deleteRewards = async (id) => {
    try {
        const newUser = await rewardsModel.destroy({
            where: {
                id: id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in delete rewards in controller", error);
        throw new Error("Error delete rewards in controller");
    }
};

// GET BRAND

const getRewardsById = async (user_id) => {
    try {
        const user = await rewardsModel.findOne({
            where: {
               user_id:user_id
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get rewards in controller..!", error);
        throw new Error('enable to get rewards error')
    }
};

// GET ALL BRAND

const getAllRewards = async (userData) => {
    try {

        const user = await rewardsModel.findAll(userData);
        return user
    }
    catch (error) {
        console.log("error in get rewards in controller..!", error);
        throw new Error('enable to get rewards error')
    }
}

// SEARCH BRAND

const searchRewardsDetails = async (userData) => {
    try {

        const data = {};
        if (userData.name) {
            data.name = userData.name
        }

        if (userData.id) {
            data.id = userData.id
        }
        const user = await rewardsModel.findAll({
            where: data
        });
        return user


    } catch (error) {
        console.log("erorr in search rewards in controller", error)
        errorResponse("error in search rewards in controller")
    }
};

module.exports = {
    createRewards,
    updateRewards,
    deleteRewards,
    getRewardsById,
    getAllRewards,
    searchRewardsDetails
   
 
}