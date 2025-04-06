const { sequelize } = require('../../db')
const contactModel = require('../../model/contact')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../services/res');


// CREATE CONTACT

const createContact = async (userData) => {
    try {
        const newUser = await contactModel.create(userData);
        return newUser;
    }
    catch (error) {
        console.error("Error in create contact details in controller", error);
        throw new Error("Error in create contact details in controller");
    }
};

// GET CONTACT

const getContactById = async (contact_id) => {
    
    try {
        const user = await contactModel.findOne({
            where: {
                contact_id:contact_id
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get contact in controller..!"+ error);
        throw new Error('unable to get contact error')
    }
};

// GET ALL CONTACT

const getAllContact = async (userData) => {
    try {
        const user = await contactModel.findAll(userData);
        return user
    }
    catch (error) {
        console.log("error in get contact in controller..!", error);
        throw new Error('unable to get contact error')
    }
}
module.exports = {
    createContact,
    getContactById,
    getAllContact,
}