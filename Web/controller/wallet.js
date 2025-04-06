const { sequelize } = require('../../db')
const walletModel = require('../../model/wallet')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../services/response');


// CREATE WALLET

const createWallet = async (userData) => {
    try {
        const newUser = await walletModel.create(userData);
        return newUser;
    }
    catch (error) {
        console.error("Error in create wallet details in controller", error);
        throw new Error("Error in create wallet in controller");
    }
};

// UPDATE WALLET

const updateWallet = async (user_name, userData) => {
    try {
        const newUser = await walletModel.update(userData, {
            where: {
                user_name: user_name
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in update wallet in controller", error);
        throw new Error("Error update wallet in controller");
    }
};

// DELETE WALLET

const deleteWallet = async (user_name) => {
    try {
        const newUser = await walletModel.destroy({
            where: {
                user_name: user_name
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in delete wallet in controller", error);
        throw new Error("Error delete wallet in controller");
    }
};

// GET WALLET

const getWalletById = async (email) => {
    try {
        const user = await walletModel.findAll({
            where: {
                email: email
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get wallet in controller..!", error);
        throw new Error('enable to create wallet error')
    }
};

const getWalletByIdByUserName = async (user_name) => {
    try {
        const user = await walletModel.findAll({
            where: {
                user_name: user_name
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get wallet in controller..!", error);
        throw new Error('enable to create wallet error')
    }
};

// GET ALL WALLET

const getAllWallet = async (userData) => {
    try {

        const user = await walletModel.findAll(userData);
        return user
    }
    catch (error) {
        console.log("error in get wallet in controller..!", error);
        throw new Error('enable to create wallet error')
    }
}

// SEARCH WALLET

const searchWalletDetails = async (userData) => {
    try {

        const data = {};
        if (userData.wallet_name) {
            data.wallet_name = userData.wallet_name
        }

        if (userData.wallet_id) {
            data.wallet_id = userData.wallet_id
        }
        const user = await walletModel.findAll({
            where: data
        });
        return user


    } catch (error) {
        console.log("erorr in search wallet in controller", error)
        errorResponse("error in search wallet in controller")
    }
};

module.exports = {
    createWallet,
    updateWallet,
    deleteWallet,
    getWalletById,
    getAllWallet,
    searchWalletDetails,
    getWalletByIdByUserName

}