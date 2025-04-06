const topcategories_controller = require("../controller/topcategory");
const shortUUID = require('short-uuid');
const { successResponse, errorResponse } = require("./res")
const { deleteImage } = require("./deleteimages")

// CREATE BRAND

const createTopCategory = async (userData) => {
    try {
        const translator = shortUUID();
        const userId = translator.new();
        userData.body.category_id = userId;

        if (userData.file) {
            userData.body.category_image = userData.file.filename
        }
        const response = await topcategories_controller.createTopCategory(userData.body);
        return successResponse(response);

    }
    catch (error) {
        console.log("Error in create topcategories in services..", error)
        return errorResponse("Error in create topcategories in services..")
    }
}




const getAllTopCategory = async (userData) => {
    try {
        const response = await topcategories_controller.getAllTopCategory(userData.body)
        return successResponse(response)
    }

    catch (error) {
        console.log("Error in get all topcategories in servicess.....!", error)
        return errorResponse("Error in get all topcategories in servicess")
    }
};


module.exports = {
    createTopCategory,
    getAllTopCategory,

}