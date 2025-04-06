const { sequelize } = require('../../db')
const walletModel = require('../../model/wallet')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../services/res');
const { countOrder } = require('../services/orders');

// CREATE  WALLET

const createWallet = async (userData) => {
    try {
        const newUser = await walletModel.create(userData);
        return newUser;
    }
    catch (error) {
        console.error("Error in create wallet details in controller", error);
        throw new Error("Error in create wallet details in controller");
    }
};

// UPDATE WALLET

const updateWallet = async (wallet_id, userData) => {
    try {
        const newUser = await walletModel.update(userData, {
            where: {
                wallet_id: wallet_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in update wallet in controller", error);
        throw new Error("Error update wallet");
    }
};

// DELETE WALLET

const deleteWallet = async (wallet_id) => {
    try {
        const newUser = await walletModel.destroy({
            where: {
                wallet_id: wallet_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in delete wallet in controller", error);
        throw new Error("Error delete wallet");
    }
};

// GET WALLET

const getWalletById = async (email) => {

    try {
        const user = await walletModel.findOne({
            where: {
                email: email
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get wallet in controller..!" + error);
        throw new Error('unable to get wallet error')
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
        throw new Error('unable to get all wallet error')
    }
}

// SEARCH  WALLET

const searchWalletDetails = async (userData) => {
    try {
        const data = {};
        if (userData.title) {
            data.title = userData.title
        }
        if (userData.date) {
            data.date = userData.date
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
    getAllWallet,
    searchWalletDetails,
    getWalletById,

}