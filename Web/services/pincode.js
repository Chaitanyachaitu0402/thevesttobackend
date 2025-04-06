const pincode_controller = require("../controller/pincode");
const shortUUID = require('short-uuid');
const { generateAccessToken,
    generateRefreshToken,
    verifyToken } = require("../services/jwttoken")
const { successResponse, errorResponse } = require("./response")
const fs = require('file-system');


// CREATE CARD

const createPincode = async (userData) => {
    try {

        const translator = shortUUID(); 
        const userId = translator.new(); 
        userData.body.Id = userId;

        // const token = userData.headers.authorization;
        // if (!token) {
        //     return errorResponse("Missing Token")
        // }
        // const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        // if (decodedData == "invalidtoken") {
        //     return errorResponse(decodedData)
        // }
        // if (decodedData) {
            if (userData.file) {
                userData.body.Product_image = userData.file.filename;
            }
            const response = await pincode_controller.createPincode(userData.body);
            return successResponse(response);
        // }
    }
    catch (error) {
        console.log("Error in create Pincode in services..", error)
        return errorResponse("Error in create Pincode in services..")
    }
}

// UPDATE CARD

const updatePincode = async (userData) => {
    try {
        // const token = userData.headers.authorization;
        // if (!token) {
        //     return errorResponse("Missing Token")
        // }
        // const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        // if (decodedData == "invalidtoken") {
        //     return errorResponse(decodedData)
        // }
        // if (decodedData) {
            const updatedData = await pincode_controller.updatePincode(userData.body.Id, userData.body)
            return successResponse(updatedData)
        // }
        // return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update Pincode in servicess.....!", error)
        return errorResponse("Error in update Pincode in servicess")
    }
};

// DELETE CARD

const deletePincode = async (userData) => {
    try {
        // const token = userData.headers.authorization;
        // if (!token) {
        //     return errorResponse("Missing Token")
        // }
        // const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        // if (decodedData == "invalidtoken") {
        //     return errorResponse(decodedData)
        // }

        // if (decodedData) {
            const deletedData = await pincode_controller.deletePincode(userData.body.Id)
            return successResponse(deletedData)
        // }
        // return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in delete Pincode in  servicess.....!", error)
        return errorResponse("Error in delete Pincode in servicess")
    }
};

// GET CARD BY ID

const getPincodeByPincode = async (userData) => {
    try {
        // const token = userData.headers.authorization;
        // if (!token) {
        //     return errorResponse("Missing Token")
        // }
        // const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        // if (decodedData == "invalidtoken") {
        //     return errorResponse(decodedData)
        // }
        // if (decodedData) {
            const response = await pincode_controller.getPincodeByPincode(userData.body.pincode)
            return successResponse(response)
        // }
    } catch (error) {
        console.log("Error in get by id Pincode in  servicess.....!", error)
        return errorResponse("Error in get by id Pincode in servicess")
    }
};

const getPincodeById = async (userData) => {
    try {
        // const token = userData.headers.authorization;
        // if (!token) {
        //     return errorResponse("Missing Token");
        // }
        // const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY);
        // if (decodedData == "invalidtoken") {
        //     return errorResponse(decodedData);
        // }
        // if (decodedData) {
            const response = await product_controller.getPincodeById(userData.body.Id);
            return successResponse(response);
        // }
    } catch (error) {
        console.log("Error in get by id Pincode in services.....!", error);
        return errorResponse("Error in get by id Pincode in services");
    }
};

// GET ALL CARD

const getAllPincode = async (userData) => {
    try {
        // const token = userData.headers.authorization;
        // if (!token) {
        //     return errorResponse("Missing Token")
        // }
        // const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        // if (decodedData == "invalidtoken") {
        //     return errorResponse(decodedData)
        // }
        // if (decodedData.role == "admin") {
            const response = await pincode_controller.getAllPincode(userData.body)
            return successResponse(response)
        // }

    } catch (error) {
        console.log("Error in get all Pincode in servicess.....!", error)
        return errorResponse("Error in get all Pincode in servicess")
    }
}


module.exports = {
    createPincode,
    updatePincode,
    deletePincode,
    getPincodeByPincode,
    getAllPincode,
    getPincodeById,
}