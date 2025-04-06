const offers_controller = require("../controller/offers");
const shortUUID = require('short-uuid');
const { verifyToken } = require("./jwttoken")
const { successResponse, errorResponse } = require("./response")
const { deleteImage } = require("./deleteimages")

// CREATE PRODUCT

const createOffers = async (userData) => {
    try {
        const translator = shortUUID(); 
        const userId = translator.new(); 
        userData.body.id = userId;

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
                userData.body.image = userData.file.filename
            }

            const response = await offers_controller.createOffers(userData.body);
            return successResponse(response);
        }
    }
    catch (error) {
        console.log("Error in create offers in services..", error)
        return errorResponse("Error in offers cart in services..")
    }
}

// UPDATE PRODUCT

const updateOffers = async (userData) => {
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
                const getUserDate = await offers_controller.getOffersByName(userData.body.name)

                if (getUserDate.image !== null) {
                    await deleteImage(getUserDate.image)
                    userData.body.image = userData.file.filename
                }
                else {
                    userData.body.image = userData.file.filename
                }
            }
            const updatedData = await offers_controller.updateOffersByName(userData.body.name, userData.body)
            return successResponse(updatedData)
        }
        return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update offers in servicess.....!", error)
        return errorResponse("Error in update offers in servicess")
    }
};

// DELETE PRODUCT

const deleteOffers= async (userData) => {
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
            const deletedData = await offers_controller.deleteOffers(userData.body.id)
            return successResponse(deletedData)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in delete offers in  servicess.....!", error)
        return errorResponse("Error in delete offers in servicess")
    }
};


const deleteOffersByName= async (userData) => {
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
            const deletedData = await offers_controller.deleteOffersByName(userData.body.name)
            return successResponse(deletedData)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in delete offers in  servicess.....!", error)
        return errorResponse("Error in delete offers in servicess")
    }
};

// GET PRODUCT BY ID

const getOffersById = async (userData) => {
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
            const response = await offers_controller.getOffersById(userData.body.id)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id offers in  servicess.....!", error)
        return errorResponse("Error in get by id offers in servicess")
    }
};

// GET ALL PRODUCT

const getAllOffers = async (userData) => {
    try {
        const token = userData.headers.authorization;
        // if (!token) {
        //     return errorResponse("Missing Token")
        // }
        // const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        // if (decodedData == "invalidtoken") {
        //     return errorResponse(decodedData)
        // }
        // if (decodedData) {
            const response = await offers_controller.getAllOffers(userData.body)
            return successResponse(response)
        // }

    } catch (error) {
        console.log("Error in get all offers in servicess.....!", error)
        return errorResponse("Error in get all offers in servicess")
    }
};

// SEARCH PRODUCT DETAILS

const searchOffersDetails = async (userData) => {
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
            const Response = await offers_controller.searchOffersDetails(userData.body)
            return successResponse(Response)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in search offers in  servicess.....!", error)
        return errorResponse("Error in search offers in  servicess")
    }
};


module.exports = {
   createOffers,
   updateOffers,
   deleteOffers,
   getOffersById,
   getAllOffers,
   searchOffersDetails,
   deleteOffersByName


}