const { sequelize } = require('../../db')
const cardModel = require('../../model/card')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../services/res');


// CREATE CART

const createCard = async (userData) => {
    try {
        const newUser = await cardModel.create(userData);
        return newUser;
    }
    catch (error) {
        console.error("Error in create card details in controller", error);
        throw new Error("Error in create card in controller");
    }
};

// UPDATE CART

const updateCard = async (card_id, userData) => {
    try {
        const newUser = await cardModel.update(userData, {
            where: {
                card_id: card_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in update card in controller", error);
        throw new Error("Error update card in controller");
    }
};

// DELETE CART

const deleteCard = async (card_id) => {
    try {
        const newUser = await cardModel.destroy({
            where: {
                card_id: card_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in delete card in controller", error);
        throw new Error("Error delete card in controller");
    }
};

// DELETE CART BY USER ID

const deleteCardByUserId = async (user_id) => {
    try {
        const newUser = await cardModel.destroy({
            where: {
                user_id: user_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in delete card in controller", error);
        throw new Error("Error delete card in controller");
    }
};

// GET CART

const getCardById = async (card_id) => {
    try {
        const user = await cardModel.findOne({
            where: {
                card_id: card_id
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get card in controller..!", error);
        throw new Error('enable to  card error')
    }
};

// get all data based on user_id

const getcardUserById = async (user_id) => {
    try {
        const user = await cardModel.findAll({
            where: {
                user_id: user_id
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get card in controller..!", error);
        throw new Error('enable to get card error')
    }
};
// GET ALL CART

const getAllCard = async (userData) => {
    try {

        const user = await cardModel.findAll(userData);
        return user
    }
    catch (error) {
        console.log("error in get card in controller..!", error);
        throw new Error('enable to create card error')
    }
}

// GET ALL CART

const getAllCardByUserId = async (user_id) => {
    try {
        const user = await cardModel.findAll({
            where: {
                user_id: user_id
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get card in controller..!", error);
        throw new Error('enable to get card error')
    }
};

module.exports = {
    createCard,
    updateCard,
    deleteCard,
    getCardById,
    getcardUserById,
    getAllCard,
    getAllCard,
    getAllCardByUserId,
    deleteCardByUserId
}