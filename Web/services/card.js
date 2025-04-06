const card_controller = require("../controller/card");
const shortUUID = require('short-uuid');
const { generateAccessToken,
    generateRefreshToken,
    verifyToken } = require("../services/jwttoken")
const { successResponse, errorResponse } = require("./response")
const { deleteImage } = require("./deleteimages")


// CREATE CARD

const createCard = async (userData) => {
    try {

        const translator = shortUUID(); 
        const userId = translator.new(); 
        userData.body.card_id = userId;

        const token = userData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData) {

            if (userData.file) {
                userData.body.cart_image = userData.file.filename
            }

            const response = await card_controller.createCard(userData.body);
            return successResponse(response);
        }
    }
    catch (error) {
        console.log("Error in create card in services..", error)
        return errorResponse("Error in create card in services..")
    }
}

// UPDATE CARD

const updateCard = async (userData) => {
    try {
        const token = userData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData) {

            if (userData.file) {
                const getUserDate = await card_controller.getCardById(userData.body.card_id)

                if (getUserDate.card_image !== null) {
                    await deleteImage(getUserDate.card_image)
                    userData.body.card_image = userData.file.filename
                }
                else {
                    userData.body.card_image = userData.file.filename
                }
            }
            const updatedData = await card_controller.updateCard(userData.body.card_id, userData.body)
            return successResponse(updatedData)
        }
        return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update card in servicess.....!", error)
        return errorResponse("Error in update card in servicess")
    }
};


// DELETE CARD

const deleteCard = async (userData) => {
    try {
        const token = userData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }

        if (decodedData) {
            const deletedData = await card_controller.deleteCard(userData.body.card_id)
            return successResponse(deletedData)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in delete card in  servicess.....!", error)
        return errorResponse("Error in delete card in servicess")
    }
};

// DELETE CARD

const deleteCardByUserId = async (userData) => {
    try {
        const token = userData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
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
        const token = userData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData) {
            const response = await card_controller.getCardById(userData.body.card_id)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id card in  servicess.....!", error)
        return errorResponse("Error in get by id card in servicess")
    }
};

// GET ALL CARD BASED ON THE USER ID

const getCardUserById = async (userData) => {
    try {
        const token = userData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData) {
            const response = await card_controller.getAllCardByUserId(userData.body.user_id)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id card in  servicess.....!", error)
        return errorResponse("Error in get by id card in servicess")
    }
};

// GET ALL CARD

const getAllCard = async (userData) => {
    try {
        const token = userData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role == "admin") {
            const response = await card_controller.getAllCard(userData.body)
            return successResponse(response)
        }

    } catch (error) {
        console.log("Error in get all card in servicess.....!", error)
        return errorResponse("Error in get all card in servicess")
    }
}

// GET ALL CARD

const getAllCardByUserId = async (userData) => {
    try {
        const token = userData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role == "admin") {
            const response = await card_controller.getAllCardByUserId(userData.body.user_id)
            return successResponse(response)
        }

    } catch (error) {
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