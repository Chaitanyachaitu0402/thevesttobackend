const notification_Controller = require("../controller/notification");
const bcrypt = require("bcrypt");
const shortUUID = require('short-uuid');
const { successResponse, errorResponse } = require("./res");
const { deleteImage } = require("./deleteimages");

// CREATE NOTIFICATION

const createNotification = async (userData) => {
    try {
        const translator = shortUUID(); 
        const userId = translator.new(); 
        userData.body.notification_id = userId;

        const response = await notification_Controller.createNotification(userData.body);
        return successResponse(response);

    } catch (error) {
        console.log("Error in create notification in services..", error);
        return errorResponse("Error in create notification in services..");
    }
};


// UPDATE NOTIFICATION

const updateNotification = async (userData) => {
    try {
        const updatedData = await notification_Controller.updateNotification(userData.body.notification_id, userData.body);
        return successResponse(updatedData);
    } catch (error) {
        console.log("Error in update notification in services.....!", error);
        return errorResponse("Error in update notification in services");
    }
};

// DELETE NOTIFICATION

const deleteNotification = async (userData) => {
    try {

        const deletedData = await notification_Controller.deleteNotification(userData.body.notification_id, userData.body);
        return successResponse(deletedData);

    } catch (error) {
        console.log("Error in delete notification in services.....!", error);
        return errorResponse("Error in delete notification in services");
    }
};

// GET NOTIFICATION BY ID

const getNotificationById = async (userData) => {
    try {
        const response = await notification_Controller.getNotificationById(userData.body.notification_id);
        return successResponse(response);

    } catch (error) {
        console.log("Error in get by id notification in services.....!", error);
        return errorResponse("Error in get by id notification in services");
    }
};

// GET ALL NOTIFICATION

const getAllNotification = async (userData) => {
    try {

        const response = await notification_Controller.getAllNotification(userData.body);
        return successResponse(response);

    } catch (error) {
        console.log("Error in get all notification in services.....!", error);
        return errorResponse("Error in get all notification in services");
    }
};

// SEARCH NOTIFICATION DETAILS

const searchNotificationDetails = async (userData) => {
    try {

        const Response = await notification_Controller.searchNotificationDetails(userData.body);
        return successResponse(Response);

    } catch (error) {
        console.log("Error in search notification in services.....!", error);
        return errorResponse("Error in search notification in services");
    }
};

// COUNT NOTIFICATION

const countNotification = async (userData) => {
    try {
        const response = await notification_Controller.countNotification(userData.body);
        return successResponse(response);

    } catch (error) {
        console.log("Error in count in services.....!", error);
        return errorResponse("Error in count in services");
    }
};



module.exports = {
    createNotification,
    updateNotification,
    searchNotificationDetails,
    deleteNotification,
    getAllNotification,
    getNotificationById,
    countNotification
};
