const brand_controller = require("../controller/brand");
const shortUUID = require('short-uuid');
const { successResponse, errorResponse } = require("./res")
const { deleteImage } = require("./deleteimages")

// CREATE BRAND

const createBrand = async (userData) => {
    try {
        const translator = shortUUID(); 
        const userId = translator.new(); 
        userData.body.brand_id = userId;

            if (userData.file) {
                userData.body.brand_image = userData.file.filename
            }
            const response = await brand_controller.createBrand(userData.body);
            return successResponse(response);
        }
    
    catch (error) {
        console.log("Error in create brand in services..", error)
        return errorResponse("Error in create brand in services..")
    }
}

// UPDATE BRAND

const updateBrand = async (userData) => {
    try {
       
            if (userData.file) {
                const getUserDate = await brand_controller.getBrandById(userData.body.brand_id)

                if (getUserDate.brand_image !== null) {
                    await deleteImage(getUserDate.brand_image)
                    userData.body.brand_image = userData.file.filename
                }
                else {
                    userData.body.brand_image = userData.file.filename
                }
            }
            const updatedData = await brand_controller.updateBrand(userData.body.brand_id, userData.body)
            return successResponse(updatedData)
        }

     catch (error) {
        console.log("Error in update brand in servicess.....!", error)
        return errorResponse("Error in update brand in servicess")
    }
};

// DELETE BRAND

const deleteBrand = async (userData) => {
    try {
       
            const deletedData = await brand_controller.deleteBrand(userData.body.brand_id)
            return successResponse(deletedData)
        }
     catch (error) {
        console.log("Error in delete brand in  servicess.....!", error)
        return errorResponse("Error in delete brand in servicess")
    }
};

// GET BRAND BY ID

const getBrandById = async (userData) => {
    try {
        
            const response = await brand_controller.getBrandById(userData.body.brand_id)
            return successResponse(response)
        }
    catch (error) {
        console.log("Error in get by id brand in  servicess.....!", error)
        return errorResponse("Error in get by id brand in servicess")
    }
};

// GET ALL BRAND

const getAllBrand = async (userData) => {
    try {
       
            const response = await brand_controller.getAllBrand(userData.body)
            return successResponse(response)
        }

     catch (error) {
        console.log("Error in get all brand in servicess.....!", error)
        return errorResponse("Error in get all brand in servicess")
    }
};

// SEARCH BRAND DETAILS

const searchBrandDetails = async (userData) => {
    try {
            const Response = await brand_controller.searchBrandDetails(userData.body)
            return successResponse(Response)
        }
     catch (error) {
        console.log("Error in search brand in  servicess.....!", error)
        return errorResponse("Error in search brand in  servicess")
    }
};


module.exports = {
 createBrand,
 updateBrand,
 deleteBrand,
 getBrandById,
 getAllBrand,
 searchBrandDetails

}