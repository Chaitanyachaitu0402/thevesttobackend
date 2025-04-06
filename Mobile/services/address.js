const address_Controller = require("../controller/address");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');
const { successResponse, errorResponse } = require("./res");


// CREATE ADDRESS

const createAddress = async (userData) => {
    try {
        const userId = uuidv4();
        userData.body.address_id = userId;

        const response = await address_Controller.createAddress(userData.body);
        return successResponse(response);

    } catch (error) {
        console.log("Error in create address in services..", error);
        return errorResponse("Error in create address in services..");
    }
};


// UPDATE ADDRESS


const updateAddress = async (userData) => {
    try {
        const updatedData = await address_Controller.updateAddress(userData.body.address_id, userData.body);
        return successResponse(updatedData);
    } catch (error) {
        console.log("Error in update address in services.....!", error);
        return errorResponse("Error in update address in services");
    }
};

// DELETE ADDRESS

const deleteAddress = async (userData) => {
    try {
        const deletedData = await address_Controller.deleteAddress(userData.body.address_id, userData.body);
        return successResponse(deletedData);

    } catch (error) {
        console.log("Error in delete address in services.....!", error);
        return errorResponse("Error in delete address in services");
    }
};

// GET ADDRESS BY ID

const getAddressById = async (userData) => {
    try {
        const response = await address_Controller.getAddressById(userData.body.address_id);
        return successResponse(response);

    } catch (error) {
        console.log("Error in get by id address in services.....!", error);
        return errorResponse("Error in get by id address in services");
    }
};

// GET ADDRESS BY ID

const getAddressByUserId = async (userData) => {
    try {
        const response = await address_Controller.getAddressByUserId(userData.body.user_id);
        console.log("==============>",response)
        return successResponse(response);

    } catch (error) {
        console.log("Error in get by id address in services.....!", error);
        return errorResponse("Error in get by id address in services");
    }
};

// GET ALL ADDRESS

const getAllAddress = async (userData) => {
    try {

        const response = await address_Controller.getAllAddress(userData.body);
        return successResponse(response);

    } catch (error) {
        console.log("Error in get all address in services.....!", error);
        return errorResponse("Error in get all address in services");
    }
};

// SEARCH ADDRESS DETAILS

const searchAddressDetails = async (userData) => {
    try {

        const Response = await address_Controller.searchAddressDetails(userData.body);
        return successResponse(Response);

    } catch (error) {
        console.log("Error in search address in services.....!", error);
        return errorResponse("Error in search address in services");
    }
};


module.exports = {
    createAddress,
    updateAddress,
    searchAddressDetails,
    deleteAddress,
    getAllAddress,
    getAddressById,
    getAddressByUserId
};
