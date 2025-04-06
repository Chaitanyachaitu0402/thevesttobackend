const wallet_Controller = require("../controller/wallet");
const shortUUID = require('short-uuid');
const { successResponse, errorResponse } = require("./res");

// CREATE WALLET

const createWallet = async (userData) => {
    try {
        const translator = shortUUID(); 
        const userId = translator.new(); 
        userData.body.wallet_id = userId;

        const response = await wallet_Controller.createWallet(userData.body);
        return successResponse(response);

    } catch (error) {
        console.log("Error in create wallet in services..", error);
        return errorResponse("Error in create wallet in services..");
    }
};

// UPDATE WALLET

const updateWallet = async (userData) => {
    try {
        const updatedData = await wallet_Controller.updateWallet(userData.body.wallet_id, userData.body);
        return successResponse(updatedData);
    } catch (error) {
        console.log("Error in update wallet in services.....!", error);
        return errorResponse("Error in update wallet in services");
    }
};

// DELETE WALLET

const deleteWallet = async (userData) => {
    try {

        const deletedData = await wallet_Controller.deleteWallet(userData.body.wallet_id, userData.body);
        return successResponse(deletedData);

    } catch (error) {
        console.log("Error in delete wallet in services.....!", error);
        return errorResponse("Error in delete wallet in services");
    }
};

// GET WALLET BY ID

const getWalletById = async (userData) => {
    try {
        const response = await wallet_Controller.getWalletById(userData.body.email);
        return successResponse(response);

    } catch (error) {
        console.log("Error in get by id wallet in services.....!", error);
        return errorResponse("Error in get by id wallet in services");
    }
};

// GET ALL WALLET

const getAllWallet = async (userData) => {
    try {
        const response = await wallet_Controller.getAllWallet(userData.body);
        return successResponse(response);

    } catch (error) {
        console.log("Error in get all wallet in services.....!", error);
        return errorResponse("Error in get all wallet in services");
    }
};

// SEARCH WALLET DETAILS

const searchWalletDetails = async (userData) => {
    try {
        const Response = await wallet_Controller.searchWalletDetails(userData.body);
        return successResponse(Response);

    } catch (error) {
        console.log("Error in search wallet in services.....!", error);
        return errorResponse("Error in search wallet in services");
    }
};


module.exports = {
    createWallet,
    updateWallet,
    searchWalletDetails,
    deleteWallet,
    getAllWallet,
    getWalletById
};
