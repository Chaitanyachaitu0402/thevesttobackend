const { sequelize } = require('../../db')
const userModel = require('../../model/user')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../services/res');


// CREATE USER

const createUser = async (userData) => {
    try {
        const newUser = await userModel.create(userData);
        return newUser;
    }
    catch (error) {
        console.error("Error in create User details in controller", error);
        throw new Error("Error in create User in controller");
    }
};

// USER LOGIN

const userLogin = async (email) => {
    try {
        const user = await userModel.findOne({
            where: {
                email: email
            }
        });
        return user;
    }
    catch (error) {
        console.log("throw new error", error);
        throw new Error('unable to UserLogin error')
    }
}

// UPDATE USER

const updateUser = async (user_id, userData) => {
    try {
        const newUser = await userModel.update(userData, {
            where: {
                user_id: user_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in update user in controller", error);
        throw new Error("Error update user");
    }
};

// DELETE USER

const deleteUser = async (user_id) => {
    try {
        const newUser = await userModel.destroy({
            where: {
                user_id: user_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in delete user in controller", error);
        throw new Error("Error delete user");
    }
};

// GET USER

const getUserById = async (user_id) => {
    
    try {
        const user = await userModel.findOne({
            where: {
                user_id:user_id
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get user in controller..!"+ error);
        throw new Error('unable to get user error')
    }
};


// GET ALL USER

const getAllUser = async (userData) => {
    try {

        const user = await userModel.findAll(userData);
        return user
    }
    catch (error) {
        console.log("error in get user in controller..!", error);
        throw new Error('unable to get all user error')
    }
}

// SEARCH ALL USER

const searchUserDetails = async (userData) => {
    try {
        const data = {};
        if (userData.user_name) {
            data.user_name = userData.user_name
        }
        if (userData.user_id) {
            data.user_id = userData.user_id
        }
        const user = await userModel.findAll({
            where: data
        });
        return user
    } catch (error) {
        console.log("erorr in search user in controller", error)
        errorResponse("error in search user in controller")
    }
};

//  COUNT USER

const countUserDetails = async (userData) => {

    try {
        const newUser = await userModel.count({
            where: {
                user_id: userData.user_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in count user in controller", error);
        throw new Error("Error count user Details");
    }
}

const pargotPassword = async (email) => {
    try {
        const user = await userModel.findOne({
            where: {
                email: email
            }
        });

        return user;
    }
    catch (error) {
        console.log("throw new error", error);
        throw new Error('unable to UserLogin error')
    }
}

const getUserByEmail = async (email) => {
    
    try {
        const user = await userModel.findOne({
            where: {
                email: email
            }
        })
        return user;
    }
    catch (error) {
        console.log("error in get user in controller..!"+ error);
        throw new Error('unable to get user error')
    }
};
module.exports = {
    createUser,
    userLogin,
    updateUser,
    deleteUser,
    getUserById,
    getAllUser,
    searchUserDetails,
    countUserDetails,
    pargotPassword,
    getUserByEmail
  
}