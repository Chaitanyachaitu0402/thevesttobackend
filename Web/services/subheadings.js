const subheading_controller = require("../controller/subheadings");
const shortUUID = require('short-uuid');
const { verifyToken } = require("../services/jwttoken")
const { successResponse, errorResponse } = require("./response")



// CREATE CONTACT

const createSubHeading = async (userData) => {
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
        const response = await subheading_controller.createSubHeading(userData.body);
        return successResponse(response);
    }
    catch (error) {
        console.log("Error in create  sub headings in services..", error)
        return errorResponse("Error in create  sub headings in services..")
    }
}

// UPDATE SUB HEADING

const updateSubHeading = async (userData) => {
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
            const updatedData = await subheading_controller.updateSubHeading(userData.body.id, userData.body)
            return successResponse(updatedData)
        }
        return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update  sub headings in servicess.....!", error)
        return errorResponse("Error in update  sub headings in servicess")
    }
};


// GET SUB HEADINDGS BY ID

const deleteSubHeading = async (userData) => {
    try {
        const token = userData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }

        const response = await subheading_controller.deleteSubHeading(userData.body.id)
        return successResponse(response)

    } catch (error) {
        console.log("Error in get by id  sub headings in  servicess.....!", error)
        return errorResponse("Error in get by id  sub headings in servicess")
    }
};

// GET ALL SUB HEADIGS BY ID

const getSubHeadingByName = async (userData) => {
    try {
        const token = userData.headers.authorization;
        // if (!token) {
        //     return errorResponse("Missing Token")
        // }
        // const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        // if (decodedData == "invalidtoken") {
        //     return errorResponse(decodedData)
        // }
        const response = await subheading_controller.getSubHeadingByName(userData.body.name)
        return successResponse(response)


    } catch (error) {
        console.log("Error in get all  sub headings in servicess.....!", error)
        return errorResponse("Error in get all  sub headings in servicess")
    }
};


// GET ALL SUB HEADING

const getAllSubHeading = async (userData) => {
    try {
        const token = userData.headers.authorization;
        // if (!token) {
        //     return errorResponse("Missing Token")
        // }
        // const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        // if (decodedData == "invalidtoken") {
        //     return errorResponse(decodedData)
        // }
        const response = await subheading_controller.getAllSubHeading(userData.body)
        return successResponse(response)


    } catch (error) {
        console.log("Error in get all sub headings in servicess.....!", error)
        return errorResponse("Error in get all  sub headings in servicess")
    }
};


module.exports = {
  createSubHeading,
  updateSubHeading,
  deleteSubHeading,
  getSubHeadingByName,
  getAllSubHeading
}