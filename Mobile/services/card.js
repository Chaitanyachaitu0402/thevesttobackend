const card_controller = require("../controller/card");
const shortUUID = require('short-uuid');
const { successResponse, errorResponse } = require("./res")

// CREATE CARD

const createCard = async (userData) => {
    try {

        const translator = shortUUID(); 
        const userId = translator.new(); 
        userData.body.card_id = userId;

        const response = await card_controller.createCard(userData.body);
        return successResponse(response);
    }
    catch (error) {
        console.log("Error in create card in services..", error)
        return errorResponse("Error in create card in services..")
    }
}

// UPDATE CARD

const updateCard = async (userData) => {
    try {
        const updatedData = await card_controller.updateCard(userData.body.card_id, userData.body)
        return successResponse(updatedData)
    }
    catch (error) {
        console.log("Error in update card in servicess.....!", error)
        return errorResponse("Error in update card in servicess")
    }
};

// DELETE CARD

const deleteCard = async (userData) => {
    try {

        const deletedData = await card_controller.deleteCard(userData.body.card_id)
        return successResponse(deletedData)
    }
    catch (error) {
        console.log("Error in delete card in  servicess.....!", error)
        return errorResponse("Error in delete card in servicess")
    }
};

// DELETE CARD BY USER ID

const deleteCardByUserId = async (userData) => {
    try {
        const deletedData = await card_controller.deleteCardByUserId(userData.body.user_id)
        return successResponse(deletedData)

    } catch (error) {
        console.log("Error in delete cart in  servicess.....!", error)
        return errorResponse("Error in delete cart in servicess")
    }
};

// GET CARD BY ID

const getCardById = async (userData) => {
    try {
        const response = await card_controller.getCardById(userData.body.card_id)
        return successResponse(response)
    }
    catch (error) {
        console.log("Error in get by id card in  servicess.....!", error)
        return errorResponse("Error in get by id card in servicess")
    }
};

// GET ALL DATA BASED ON THE USER ID

const getCardUserById = async (userData) => {
    try {
        const response = await card_controller.getAllCardByUserId(userData.body.user_id)
        return successResponse(response)
    }
    catch (error) {
        console.log("Error in get by id card in  servicess.....!", error)
        return errorResponse("Error in get by id card in servicess")
    }
};

// GET ALL CARD

const getAllCard = async (userData) => {
    try {
        const response = await card_controller.getAllCard(userData.body)
        return successResponse(response)
    }

    catch (error) {
        console.log("Error in get all card in servicess.....!", error)
        return errorResponse("Error in get all card in servicess")
    }
}

// GET ALL CARD BASED ON THE USER ID

const getAllCardByUserId = async (userData) => {
    try {
        const response = await card_controller.getAllCardByUserId(userData.body.user_id)
        return successResponse(response)
    }

    catch (error) {
        console.log("Error in get all card in servicess.....!", error)
        return errorResponse("Error in get all card in servicess")
    }
};

module.exports = {
    createCard,
    updateCard,
    deleteCard,
    getCardById,
    getCardUserById,
    getAllCard,
    getAllCard,
    getAllCardByUserId,
    deleteCardByUserId
}