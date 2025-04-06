const tc_controller = require("../controller/t & c ");
const shortUUID = require('short-uuid');
const { verifyToken } = require("../services/jwttoken")
const { successResponse, errorResponse } = require("./response")


// CREATE BANNER

const createTc = async (userData) => {
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

            const response = await tc_controller.createTc(userData.body);
            return successResponse(response);
        } else {
            return errorResponse("access Denain........")
        }
    }
    catch (error) {
        console.log("Error in create t & c in services..", error)
        return errorResponse("Error in create t & c in services..")
    }
}

// UPDATE BANNER

const updateTc = async (userData) => {
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


            const updatedData = await tc_controller.updateTc(userData.body.heading, userData.body)
            return successResponse(updatedData)
        }
        return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update t & c in servicess.....!", error)
        return errorResponse("Error in update t & c in servicess")
    }
};


const updateTcById = async (userData) => {
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


            const updatedData = await tc_controller.updateTcById(userData.body.id, userData.body)
            return successResponse(updatedData)
        }
        return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update t & c in servicess.....!", error)
        return errorResponse("Error in update t & c in servicess")
    }
};

// DELETE BANNER

const deleteTc = async (userData) => {
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
            const deletedData = await tc_controller.deleteTc(userData.body.heading)
            return successResponse(deletedData)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in delete t & c in  servicess.....!", error)
        return errorResponse("Error in delete t & c in servicess")
    }
};

const deleteTcById = async (userData) => {
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
            const deletedData = await tc_controller.deleteTc(userData.body.id)
            return successResponse(deletedData)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in delete t & c in  servicess.....!", error)
        return errorResponse("Error in delete t & c in servicess")
    }
};


// GET BANNER BY ID

const getTcById = async (userData) => {
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
            const response = await tc_controller.getTcById(userData.body.id)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id t & c in  servicess.....!", error)
        return errorResponse("Error in get by id t & c in servicess")
    }
};


// Get all Banners

const getallTc = async (userData) => {
    try {
        // const token = userData.headers.authorization;
        // if (!token) {
        //     return errorResponse("Missing Token")
        // }
        // const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        // if (decodedData == "invalidtoken") {
        //     return errorResponse(decodedData)
        // }
        // if (decodedData.role == "admin") {
        const response = await tc_controller.getallTc()
        return successResponse(response)
        // }
    } catch (error) {
        console.log("Error in get by id t & c in  servicess.....!", error)
        return errorResponse("Error in get by id t & c in servicess")
    }
};

// search terms and conditions

const searchTc = async (userData) => {
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
            const response = await tc_controller.searchTc(userData.body)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id t & c in  servicess.....!", error)
        return errorResponse("Error in get by id t & c in servicess")
    }
};


module.exports = {
    createTc,
    updateTc,
    deleteTc,
    getTcById,
    getallTc,
    searchTc,
    deleteTcById,
    updateTcById

}