const bestsellers_controller = require("../controller/bestsellers");
const shortUUID = require('short-uuid');
const { successResponse, errorResponse } = require("./res")
const { deleteImage } = require("./deleteimages")

// CREATE PRODUCT

const createBestSellers = async (userData) => {
    try {
        const translator = shortUUID(); 
        const userId = translator.new(); 
        userData.body.bestsellers_id = userId;

            if (userData.file) {
                userData.body.product_image = userData.file.filename
            }

            const response = await bestsellers_controller.createBestSellers(userData.body);
            return successResponse(response);
        }
    
    catch (error) {
        console.log("Error in create bestsellers in services..", error)
        return errorResponse("Error in create bestsellers in services..")
    }
}

// UPDATE PRODUCT

const updateBestSellers = async (userData) => {
    try {
       
            if (userData.file) {
                const getUserDate = await bestsellers_controller.getBestSellersById(userData.body.bestsellers_id)

                if (getUserDate.product_image !== null) {
                    await deleteImage(getUserDate.product_image)
                    userData.body.product_image = userData.file.filename
                }
                else {
                    userData.body.product_image = userData.file.filename
                }
            }
            const updatedData = await bestsellers_controller.updateBestSellers(userData.body.bestsellers_id, userData.body)
            return successResponse(updatedData)
        }

    catch (error) {
        console.log("Error in update bestsellers in servicess.....!", error)
        return errorResponse("Error in update bestsellers in servicess")
    }
};

// DELETE PRODUCT

const deleteBestSellers= async (userData) => {
    try {
            const deletedData = await bestsellers_controller.deleteProduct(userData.body.bestsellers_id)
            return successResponse(deletedData)
        }
     catch (error) {
        console.log("Error in delete bestsellers in  servicess.....!", error)
        return errorResponse("Error in delete bestsellers in servicess")
    }
};

// DELETE PRODUCT BY PRPDUCT NAME

const deleteBestSellersByName = async (userData) => {
    try {
        
            const deletedData = await bestsellers_controller.deleteBestSellersByName(userData.body.bestsellers_id)
            return successResponse(deletedData)
        }
     catch (error) {
        console.log("Error in delete bestsellers in  servicess.....!", error)
        return errorResponse("Error in delete bestsellers in servicess")
    }
};

// GET PRODUCT BY ID

const getBestSellersById = async (userData) => {
    try {
        
            const response = await bestsellers_controller.getBestSellersById(userData.body.bestsellers_id)
            return successResponse(response)
        }
    catch (error) {
        console.log("Error in get by id bestsellers in  servicess.....!", error)
        return errorResponse("Error in get by id bestsellers in servicess")
    }
};

// GET ALL PRODUCT

const getAllBestSellers= async (userData) => {
    try {
       
            const response = await bestsellers_controller.getAllBestSellers(userData.body)
            return successResponse(response)
        }

     catch (error) {
        console.log("Error in get all bestsellers in servicess.....!", error)
        return errorResponse("Error in get all bestsellers in servicess")
    }
};

// SEARCH PRODUCT DETAILS

const searchBestSellersDetails = async (userData) => {
    try {
        
            const Response = await bestsellers_controller.searchBestSellersDetails(userData.body)
            return successResponse(Response)
        }
     catch (error) {
        console.log("Error in search bestsellers in  servicess.....!", error)
        return errorResponse("Error in search bestsellers in  servicess")
    }
};


module.exports = {
  createBestSellers,
  updateBestSellers,
  deleteBestSellers,
  deleteBestSellersByName,
  getBestSellersById,
  getAllBestSellers,
  searchBestSellersDetails

}