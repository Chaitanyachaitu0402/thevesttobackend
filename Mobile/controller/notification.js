const { sequelize } = require('../../db')
const notificationModel = require('../../model/notification')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../services/res');
const { countOrder } = require('../services/orders');


// CREATE NOTIFICATION

const createNotification = async (userData) => {
    try {
        const newUser = await notificationModel.create(userData);
        return newUser;
    }
    catch (error) {
        console.error("Error in create notification details in controller", error);
        throw new Error("Error in create notification details in controller");
    }
};

// UPDATE NOTIFICATION

const updateNotification = async (notification_id, userData) => {
    try {
        const newUser = await notificationModel.update(userData, {
            where: {
                notification_id: notification_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in update notification in controller", error);
        throw new Error("Error update notification");
    }
};

// DELETE NOTIFICATION

const deleteNotification = async (notification_id) => {
    try {
        const newUser = await notificationModel.destroy({
            where: {
                notification_id: notification_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in delete notification in controller", error);
        throw new Error("Error delete notification");
    }
};

// GET NOTIFICATION

const getNotificationById = async (notification_id) => {

    try {
        const user = await notificationModel.findOne({
            where: {
                notification_id: notification_id
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get notification in controller..!" + error);
        throw new Error('unable to get notification error')
    }
};

// GET ALL  NOTIFICATION

const getAllNotification = async (userData) => {
    try {

        const user = await notificationModel.findAll(userData);
        return user
    }
    catch (error) {
        console.log("error in get notification in controller..!", error);
        throw new Error('unable to get notification error')
    }
}

// SEARCH  NOTIFICATION

const searchNotificationDetails = async (userData) => {
    try {

        const data = {};
        if (userData.date) {
            data.date = userData.date
        }
        if (userData.notification_id) {
            data.notification_id = userData.notification_id
        }
        const user = await notificationModel.findAll({
            where: data
        });
        return user


    } catch (error) {
        console.log("erorr in search notification in controller", error)
        errorResponse("error in search notification in controller")
    }
};

//  COUNT  NOTIFICATION

const countNotification = async (userData) => {

    try {
        const newUser = await notificationModel.count({
            where: {
                date: userData.date
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in count notification in controller", error);
        throw new Error("Error count notification Details");
    }
}


module.exports = {
    createNotification,
    updateNotification,
    deleteNotification,
    getNotificationById,
    searchNotificationDetails,
    getAllNotification,
    countNotification
}