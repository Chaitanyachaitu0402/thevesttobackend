const subheading_controller = require("../controller/subheadings");
const shortUUID = require('short-uuid');
const { successResponse, errorResponse } = require("./res")



// CREATE CONTACT

const createSubHeading = async (userData) => {
    try {

        const translator = shortUUID(); 
        const userId = translator.new(); 
        userData.body.id = userId;

        
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
       
            const updatedData = await subheading_controller.updateSubHeading(userData.body.id, userData.body)
            return successResponse(updatedData)
        }

    catch (error) {
        console.log("Error in update  sub headings in servicess.....!", error)
        return errorResponse("Error in update  sub headings in servicess")
    }
};


// GET SUB HEADINDGS BY ID

const deleteSubHeading = async (userData) => {
    try {
       
        const response = await subheading_controller.deleteSubHeading(userData.body.id)
        return successResponse(response)

    } catch (error) {
        console.log("Error in get by id  sub headings in  servicess.....!", error)
        return errorResponse("Error in get by id  sub headings in servicess")
    }
};

// GET ALL SUB HEADIGS BY ID

const getSubHeadingById = async (userData) => {
    try {
       
        const response = await subheading_controller.getSubHeadingById(userData.body.id)
        return successResponse(response)


    } catch (error) {
        console.log("Error in get all  sub headings in servicess.....!", error)
        return errorResponse("Error in get all  sub headings in servicess")
    }
};


// GET ALL SUB HEADING

const getAllSubHeading = async (userData) => {
    try {
       
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
  getSubHeadingById,
  getAllSubHeading
}