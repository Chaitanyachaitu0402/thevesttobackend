const refund_controller = require("../controller/refund");
const shortUUID = require('short-uuid');
const {  verifyToken } = require("../services/jwttoken")
const { successResponse, errorResponse } = require("./response")


// CREATE BANNER

const createRefund = async (userData) => {
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

            const response = await refund_controller.createRefund(userData.body);
            return successResponse(response);
        }else{
            return errorResponse("access Denain........")
        }
    }
    catch (error) {
        console.log("Error in create refund in services..", error)
        return errorResponse("Error in create refund in services..")
    }
}

// UPDATE BANNER

const updateRefund = async (userData) => {
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

        
            const updatedData = await refund_controller.updateRefund(userData.body.heading, userData.body)
            return successResponse(updatedData)
        }
        return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update refund in servicess.....!", error)
        return errorResponse("Error in update refund in servicess")
    }
};

// DELETE BANNER

const deleteRefund = async (userData) => {
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
            const deletedData = await refund_controller.deleteRefund(userData.body.heading)
            return successResponse(deletedData)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in delete refund in  servicess.....!", error)
        return errorResponse("Error in delete refund in servicess")
    }
};


// GET BANNER BY ID

const getRefundById = async (userData) => {
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
            const response = await refund_controller.getRefundById(userData.body.id)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id refund in  servicess.....!", error)
        return errorResponse("Error in get by id refund in servicess")
    }
};


// Get all Banners

const getallRefund = async (userData) => {
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
            const response = await refund_controller.getallRefund()
            return successResponse(response)
        // }
    } catch (error) {
        console.log("Error in get by id refund in  servicess.....!", error)
        return errorResponse("Error in get by id refund in servicess")
    }
};

// // search terms and conditions

// const searchRefund = async (userData) => {
//     try {
//         const token = userData.headers.authorization;
//         if (!token) {
//             return errorResponse("Missing Token")
//         }
//         const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
//         if (decodedData == "invalidtoken") {
//             return errorResponse(decodedData)
//         }
//         if (decodedData) {
//             const response = await refund_controller.searchRefund(userData.body)
//             return successResponse(response)
//         }
//     } catch (error) {
//         console.log("Error in get by id refund in  servicess.....!", error)
//         return errorResponse("Error in get by id refund in servicess")
//     }
// };


module.exports = {
createRefund,
updateRefund,
deleteRefund,
getRefundById,
getallRefund,
// searchRefund
}