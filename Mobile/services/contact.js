const contact_Controller = require("../controller/contact");
const user_Controller = require("../controller/user");
const bcrypt = require("bcrypt");
const shortUUID = require('short-uuid');
const { successResponse, errorResponse } = require("./res");
const { getAllCart } = require("./cart");


// CREATE CONTACT

const createContact = async (userData) => {
    try {
        const translator = shortUUID(); 
        const userId = translator.new(); 
        userData.body.contact_id = userId;

        const response = await contact_Controller.createContact(userData.body);
        return successResponse(response);

    } catch (error) {
        console.log("Error in create contact in services..", error);
        return errorResponse("Error in create contact in services..");
    }
};

// GET CONTACT BY ID

const getContactById = async (userData) => {
    try {
            const response = await contact_Controller.getContactById(userData.body.contact_id);
            return successResponse(response);

    } catch (error) {
        console.log("Error in get by id contact in services.....!", error);
        return errorResponse("Error in get by id contact in services");
    }
};

// GET ALL CONTACT

const getAllContact = async (userData) => {
    try {
        const user = await user_Controller.getUserById(userData.body.user_id)
        if (user.role == "admin") {
            const response = await contact_Controller.getAllContact(userData.body);
            return successResponse(response);
        } else {
            return errorResponse("access denied")
        }
    } catch (error) {
        console.log("Error in get all contact in services.....!", error);
        return errorResponse("Error in get all contact in services");
    }
};

module.exports = {
    createContact,
    getAllContact,
    getContactById
};
