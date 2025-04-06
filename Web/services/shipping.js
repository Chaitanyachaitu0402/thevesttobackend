const shipping_controller = require("../controller/shipping");
const shortUUID = require('short-uuid');
const {  verifyToken } = require("../services/jwttoken")
const { successResponse, errorResponse } = require("./response")


// CREATE BANNER

const createShipping = async (userData) => {
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
        if (decodedData.role == "admin") {

            if (userData.file) {
                userData.body.banner_image = userData.file.filename
            }

            const response = await shipping_controller.createShipping(userData.body);
            return successResponse(response);
        }else{
            return errorResponse("access Denain........")
        }
    }
    catch (error) {
        console.log("Error in create Shipping in services..", error)
        return errorResponse("Error in create Shipping in services..")
    }
}

// UPDATE BANNER

const updateShipping = async (userData) => {
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

        
            const updatedData = await shipping_controller.updateShipping(userData.body.id, userData.body)
            return successResponse(updatedData)
        }
        return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update Shipping in servicess.....!", error)
        return errorResponse("Error in update Shipping in servicess")
    }
};

// DELETE BANNER

const deleteShipping = async (userData) => {
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
            const deletedData = await shipping_controller.deleteShipping(userData.body.id)
            return successResponse(deletedData)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in delete Shipping in  servicess.....!", error)
        return errorResponse("Error in delete Shipping in servicess")
    }
};


// GET BANNER BY ID

const getShippingById = async (userData) => {
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
            const response = await shipping_controller.getShippingById(userData.body.id)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id Shipping in  servicess.....!", error)
        return errorResponse("Error in get by id Shipping in servicess")
    }
};


// Get all Banners

const getallShipping = async (userData) => {
    try {
       
            const response = await shipping_controller.getallShipping()
            return successResponse(response)
    
    } catch (error) {
        console.log("Error in get by id Shipping in  servicess.....!", error)
        return errorResponse("Error in get by id Shipping in servicess")
    }
};


module.exports = {
createShipping,
updateShipping,
deleteShipping,
getShippingById,
getallShipping
}