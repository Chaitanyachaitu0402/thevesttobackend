const { sequelize } = require('../../db')
const offersModel = require('../../model/offers')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../services/response');


// CREATE PRODUCT

const createOffers = async (userData) => {
    try {
        const newUser = await offersModel.create(userData);
        return newUser;
    }
    catch (error) {
        console.error("Error in create offers details in controller", error);
        throw new Error("Error in create offers in controller");
    }
};

// UPDATE PRODUCT

const updateOffers = async (id, userData) => {
    try {
        const newUser = await offersModel.update(userData, {
            where: {
                id: id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in update offers in controller", error);
        throw new Error("Error update offers in controller");
    }
};


const updateOffersByName = async (name, userData) => {
    try {
        const newUser = await offersModel.update(userData, {
            where: {
                name: name
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in update offers in controller", error);
        throw new Error("Error update offers in controller");
    }
};

// DELETE PRODUCT

const deleteOffers = async (id) => {
    try {
        const newUser = await offersModel.destroy({
            where: {
                id: id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in delete offers in controller", error);
        throw new Error("Error delete offers in controller");
    }
};



const deleteOffersByName = async (name) => {
    try {
        const newUser = await offersModel.destroy({
            where: {
                name: name
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in delete offers in controller", error);
        throw new Error("Error delete offers in controller");
    }
};

// GET PRODUCT

const getOffersById = async (id) => {
    try {
        const user = await offersModel.findOne({
            where: {
                id: id
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get offers in controller..!", error);
        throw new Error('enable to create offers error')
    }
};



const getOffersByName = async (name) => {
    try {
        const user = await offersModel.findOne({
            where: {
                name: name
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get offers in controller..!", error);
        throw new Error('enable to create offers error')
    }
};

// GET ALL PRODUCT

const getAllOffers = async (userData) => {
    try {

        const user = await offersModel.findAll(userData);
        return user
    }
    catch (error) {
        console.log("error in get offers in controller..!", error);
        throw new Error('enable to get offers error')
    }
}

// SEARCH PRODUCT

const searchOffersDetails = async (userData) => {
    try {

        const data = {};
        if (userData.name) {
            data.name = userData.name
        }

        if (userData.id) {
            data.id = userData.id
        }
        const user = await offersModel.findAll({
            where: data
        });
        return user


    } catch (error) {
        console.log("erorr in search offers in controller", error)
        errorResponse("error in search offers in controller")
    }
};

module.exports = {
    createOffers,
    updateOffers,
    deleteOffers,
    getOffersById,
    getAllOffers,
    searchOffersDetails,
    getOffersByName,
    updateOffersByName,
    deleteOffersByName
 
 
}