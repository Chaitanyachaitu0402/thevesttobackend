
const { sequelize } = require('../../db');
const rewardsModel = require('../../model/rewards')(sequelize);
const { Op } = require("sequelize");
const { errorResponse } = require('../services/response');

// CREATE REWARDS
const createRewards = async (userData) => {
    try {
        // Fetch the latest existing values for pointstopounds, poundstopoints, and poundstogather
        const existingRewards = await rewardsModel.findOne({
            order: [['createdAt', 'DESC']],
            attributes: ['pointstopounds', 'poundstopoints', 'poundstogather'],
        });

        // If there are existing rewards, use their values
        if (existingRewards) {
            userData.pointstopounds = existingRewards.pointstopounds;
            userData.poundstopoints = existingRewards.poundstopoints;
            userData.poundstogather = existingRewards.poundstogather;
        }

        // Create the new rewards entry with the existing or provided data
        const newUser = await rewardsModel.create(userData);
        return newUser;
    }
    catch (error) {
        console.error("Error in create rewards details in controller", error);
        throw new Error("Error in create rewards in controller");
    }
};

// UPDATE REWARDS
const updateRewards = async (user_name, userData) => {
    try {
        const updatedData = await rewardsModel.update(userData, {
            where: {
                user_name: user_name
            }
        });

        // Update all users with the new values
        if (userData.pointstopounds || userData.poundstopoints || userData.poundstogather) {
            await rewardsModel.update({
                pointstopounds: userData.pointstopounds,
                poundstopoints: userData.poundstopoints,
                poundstogather: userData.poundstogather,
            }, {
                where: {},
            });
        }

        return updatedData;
    }
    catch (error) {
        console.error("Error in update rewards in controller", error);
        throw new Error("Error update rewards in controller");
    }
};

// DELETE REWARDS
const deleteRewards = async (user_name) => {
    try {
        const deletedUser = await rewardsModel.destroy({
            where: {
                user_name: user_name
            }
        });
        return deletedUser;
    } catch (error) {
        console.error("Error in delete rewards in controller", error);
        throw new Error("Error delete rewards in controller");
    }
};

// GET REWARDS BY ID
const getRewardsById = async (user_id) => {
    try {
        const user = await rewardsModel.findAll({
            where: {
                user_id: user_id
            }
        });
        return user;
    } catch (error) {
        console.log("Error in get rewards by ID in controller..!", error);
        throw new Error('Unable to get rewards by ID');
    }
};

// GET ALL REWARDS
const getAllRewards = async (userData) => {
    try {
        const users = await rewardsModel.findAll(userData);
        return users;
    } catch (error) {
        console.log("Error in get all rewards in controller..!", error);
        throw new Error('Unable to get all rewards');
    }
};

// SEARCH REWARDS DETAILS
const searchRewardsDetails = async (userData) => {
    try {
        const data = {};
        if (userData.name) {
            data.name = userData.name;
        }

        if (userData.id) {
            data.id = userData.id;
        }
        const users = await rewardsModel.findAll({
            where: data
        });
        return users;
    } catch (error) {
        console.log("Error in search rewards in controller", error);
        throw new Error("Error in search rewards in controller");
    }
};

module.exports = {
    createRewards,
    updateRewards,
    deleteRewards,
    getRewardsById,
    getAllRewards,
    searchRewardsDetails
};