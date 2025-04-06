const orderagain_controller = require("../controller/orderagain");
const shortUUID = require('short-uuid');
const { verifyToken } = require("./jwttoken")
const { successResponse, errorResponse } = require("./response")
const { deleteImage } = require("./deleteimages")

// CREATE BRAND

const createOrderAgain = async (userData) => {
    try {
        const translator = shortUUID(); 
        const userId = translator.new(); 
        userData.body.Id = userId;

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
                userData.body.product_image = userData.file.filename
            }

            const response = await orderagain_controller.createOrderAgain(userData.body);
            return successResponse(response);
        }else{
            return errorResponse("access denaine.........!")
        }
    }
    catch (error) {
        console.log("Error in create orderagain in services..", error)
        return errorResponse("Error in create orderagain in services..")
    }
}

// UPDATE BRAND

const updateOrderAgain = async (userData) => {
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

            if (userData.file) {
                const getUserDate = await orderagain_controller.getOrderAgainById(userData.body.Id)

                if (getUserDate.product_image !== null) {
                    await deleteImage(getUserDate.product_image)
                    userData.body.product_image = userData.file.filename
                }
                else {
                    userData.body.product_image = userData.file.filename
                }
            }
            const updatedData = await orderagain_controller.updateOrderAgain(userData.body.Id, userData.body)
            return successResponse(updatedData)
        }
        return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update orderagain in servicess.....!", error)
        return errorResponse("Error in update orderagain in servicess")
    }
};

// DELETE BRAND

const deleteOrderAgain = async (userData) => {
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
            const deletedData = await orderagain_controller.deleteOrderAgain(userData.body.Id)
            return successResponse(deletedData)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in delete orderagain in  servicess.....!", error)
        return errorResponse("Error in delete orderagain in servicess")
    }
};

// GET BRAND BY ID

const getOrderAgainById = async (userData) => {
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
            const response = await orderagain_controller.getOrderAgainById(userData.body.Id)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id orderagain in  servicess.....!", error)
        return errorResponse("Error in get by id orderagain in servicess")
    }
};

// GET ALL BRAND

const getAllOrderAgain = async (userData) => {
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
            const response = await orderagain_controller.getAllOrderAgain(userData.body)
            return successResponse(response)
        }

    } catch (error) {
        console.log("Error in get all orderagain in servicess.....!", error)
        return errorResponse("Error in get all orderagain in servicess")
    }
};

// SEARCH BRAND DETAILS

const searchOrderAgainDetails = async (userData) => {
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
            const Response = await orderagain_controller.searchOrderAgainDetails(userData.body)
            return successResponse(Response)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in search orderagain in  servicess.....!", error)
        return errorResponse("Error in search orderagain in  servicess")
    }
};


module.exports = {
 createOrderAgain,
 updateOrderAgain,
 deleteOrderAgain,
 getOrderAgainById,
 getAllOrderAgain,
 searchOrderAgainDetails

}