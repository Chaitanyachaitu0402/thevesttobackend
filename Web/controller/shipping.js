const { sequelize } = require('../../db')
const shippingmodel = require('../../model/shipping')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../services/response');


// CREATE BANNER

const createShipping = async (userData) => {
    try {
        const newUser = await shippingmodel.create(userData);
        return newUser;
    }
    catch (error) {
        console.error("Error in create Shipping details in controller", error);
        throw new Error("Error in create Shipping in controller");
    }
};

// UPDATE BANNER

const updateShipping = async (id, userData) => {
    try {
        const newUser = await shippingmodel.update(userData, {
            where: {
                id: id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in update Shipping in controller", error);
        throw new Error("Error update Shipping in controller");
    }
};

// DELETE BANNER

const deleteShipping = async (id) => {
    try {
        const newUser = await shippingmodel.destroy({
            where: {
                id: id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in delete Shipping in controller", error);
        throw new Error("Error delete Shipping in controller");
    }
};


// GET BANNER

const getShippingById = async (id) => {
    try {
        const user = await shippingmodel.findOne({
            where: {
                id: id
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get Shipping in controller..!", error);
        throw new Error('enable to create Shipping error')
    }
};

// Get all banners

const getallShipping = async () => {
    try {
        const response = await shippingmodel.findAll();
        return response;
    } catch (error) {
        console.log("Error in getting all Shipping in controller.....", error);
        throw error;
    }
};

module.exports = {
    createShipping,
    updateShipping,
    deleteShipping,
    getShippingById,
    getallShipping

}