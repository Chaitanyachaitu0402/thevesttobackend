const banner_controller = require("../controller/banners");
const shortUUID = require('short-uuid');
const { successResponse, errorResponse } = require("./res")
const { deleteImage } = require("./deleteimages")


// CREATE BANNER

const createBanner = async (userData) => {
    try {
        const translator = shortUUID(); 
        const userId = translator.new(); 
        userData.body.banner_id = userId;

        
            if (userData.file) {
                userData.body.banner_image = userData.file.filename
            }

            const response = await banner_controller.createBanner(userData.body);
            return successResponse(response);
    
        }
    
    catch (error) {
        console.log("Error in create Banner in services..", error)
        return errorResponse("Error in create Banner in services..")
    }
}

// UPDATE BANNER

const updateBanner = async (userData) => {
    try {
       
            if (userData.file) {
                const getUserDate = await banner_controller.getBannerById(userData.body.banner_id)

                if (getUserDate.banner_image !== null) {
                    await deleteImage(getUserDate.banner_image)
                    userData.body.banner_image = userData.file.filename
                }
                else {
                    userData.body.banner_image = userData.file.filename
                }
            }
            const updatedData = await banner_controller.updateBanner(userData.body.banner_id, userData.body)
            return successResponse(updatedData)
        }

     catch (error) {
        console.log("Error in update Banner in servicess.....!", error)
        return errorResponse("Error in update Banner in servicess")
    }
};

// DELETE BANNER

const deleteBanner = async (userData) => {
    try {
            const deletedData = await banner_controller.deleteBanner(userData.body.banner_id)
            return successResponse(deletedData)
        }
    catch (error) {
        console.log("Error in delete Banner in  servicess.....!", error)
        return errorResponse("Error in delete Banner in servicess")
    }
};

// DELETE BANNER BY BANNER NAME

const getBannerByName = async (userData) => {
    try {
        
            const deletedData = await banner_controller.getBannerByName(userData.body.banner_name)
            return successResponse(deletedData)
        }
     catch (error) {
        console.log("Error in delete Banner in  servicess.....!", error)
        return errorResponse("Error in delete Banner in servicess")
    }
};

// GET BANNER BY ID

const getBannerById = async (userData) => {
    try {
            const response = await banner_controller.getBannerById(userData.body.banner_id)
            return successResponse(response)
        }
     catch (error) {
        console.log("Error in get by id Banner in  servicess.....!", error)
        return errorResponse("Error in get by id Banner in servicess")
    }
};

const getallbanners = async (userData) => {
    try {
            const response = await banner_controller.getallbanners()
            return successResponse(response)
        }
     catch (error) {
        console.log("Error in get by id Banner in  servicess.....!", error)
        return errorResponse("Error in get by id Banner in servicess")
    }
};
module.exports = {
    createBanner,
    updateBanner,
    deleteBanner,
    getBannerByName,
    getBannerById,
    getallbanners

}