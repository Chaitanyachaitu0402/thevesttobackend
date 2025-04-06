const wallet_controller = require("../controller/wallet");
const shortUUID = require('short-uuid');
const { generateAccessToken,
    generateRefreshToken,
    verifyToken } = require("./jwttoken")
const { successResponse, errorResponse } = require("./response")



// CREATE WALLET

const createWallet = async (userData) => {
    try {

        const translator = shortUUID(); 
        const userId = translator.new(); 
        userData.body.wallet_id = userId;

        const token = userData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }

        const response = await wallet_controller.createWallet(userData.body);
        return successResponse(response);
    }
    catch (error) {
        console.log("Error in create wallet in services..", error)
        return errorResponse("Error in create wallet in services..")
    }
}

// UPDATE WALLET

const updateWallet = async (userData) => {
    try {
        const token = userData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }

        const updatedData = await wallet_controller.updateWallet(userData.body.user_name, userData.body)
        return successResponse(updatedData)


    } catch (error) {
        console.log("Error in update wallet in servicess.....!", error)
        return errorResponse("Error in update wallet in servicess")
    }
};

// DELETE WALLET

const deleteWallet = async (userData) => {
    try {
        const token = userData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }

        if (decodedData) {
            const deletedData = await wallet_controller.deleteWallet(userData.body.user_name, userData.body)
            return successResponse(deletedData)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in delete wallet in  servicess.....!", error)
        return errorResponse("Error in delete wallet in servicess")
    }
};

// GET WALLET BY ID

const getWalletById = async (userData) => {
    try {
        const token = userData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }

        const response = await wallet_controller.getWalletById(userData.body.email)
        return successResponse(response)

    } catch (error) {
        console.log("Error in get by id wallet in  servicess.....!", error)
        return errorResponse("Error in get by id wallet in servicess")
    }
};


const getWalletByUserName = async (userData) => {
    try {
        const token = userData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }

        const response = await wallet_controller.getWalletByIdByUserName(userData.body.user_name)
        return successResponse(response)

    } catch (error) {
        console.log("Error in get by id wallet in  servicess.....!", error)
        return errorResponse("Error in get by id wallet in servicess")
    }
};

// GET ALL WALLET

const getAllWallet = async (userData) => {
    try {
        const token = userData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData) {
            const response = await wallet_controller.getAllWallet(userData.body)
            return successResponse(response)
        }

    } catch (error) {
        console.log("Error in get all wallet in servicess.....!", error)
        return errorResponse("Error in get all wallet in servicess")
    }
};

// SEARCH WALLET DETAILS

const searchWalletDetails = async (userData) => {
    try {
        const token = userData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData) {
            const Response = await wallet_controller.searchWalletDetails(userData.body)
            return successResponse(Response)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in search wallet in  servicess.....!", error)
        return errorResponse("Error in search wallet in  servicess")
    }
};


module.exports = {
    createWallet,
    updateWallet,
    deleteWallet,
    getWalletById,
    getAllWallet,
    searchWalletDetails,
    getWalletByUserName
}