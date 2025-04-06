const brand_controller = require("../controller/brand");
const shortUUID = require('short-uuid');
const { verifyToken } = require("./jwttoken")
const { successResponse, errorResponse } = require("./response")
const { deleteImage } = require("./deleteimages")

// CREATE BRAND

const createBrand = async (userData) => {
    try {
        const translator = shortUUID(); 
        const userId = translator.new(); 
        userData.body.brand_id = userId;

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
                userData.body.brand_image = userData.file.filename
            }

            const response = await brand_controller.createBrand(userData.body);
            return successResponse(response);
        }else{
            return errorResponse("access denaine.........!")
        }
    }
    catch (error) {
        console.log("Error in create brand in services..", error)
        return errorResponse("Error in create brand in services..")
    }
}

// UPDATE BRAND

const updateBrand = async (userData) => {
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
                const getUserDate = await brand_controller.getBrandByName(userData.body.brand_name)

                if (getUserDate.brand_image !== null) {
                    await deleteImage(getUserDate.brand_image)
                    userData.body.brand_image = userData.file.filename
                }
                else {
                    userData.body.brand_image = userData.file.filename
                }
            }
            const updatedData = await brand_controller.updateBrandByName(userData.body.brand_name, userData.body)
            return successResponse(updatedData)
        }
        return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update brand in servicess.....!", error)
        return errorResponse("Error in update brand in servicess")
    }
};

// DELETE BRAND

const deleteBrand = async (userData) => {
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
            const deletedData = await brand_controller.deleteBrand(userData.body.brand_id)
            return successResponse(deletedData)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in delete brand in  servicess.....!", error)
        return errorResponse("Error in delete brand in servicess")
    }
};




const deleteBrandByName = async (userData) => {
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
            const deletedData = await brand_controller.deleteBrandByName(userData.body.brand_name)
            return successResponse(deletedData)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in delete brand in  servicess.....!", error)
        return errorResponse("Error in delete brand in servicess")
    }
};

// GET BRAND BY ID

const getBrandById = async (userData) => {
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
            const response = await brand_controller.getBrandById(userData.body.brand_id)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id brand in  servicess.....!", error)
        return errorResponse("Error in get by id brand in servicess")
    }
};

// GET ALL BRAND

const getAllBrand = async (userData) => {
    try {
        const token = userData.headers.authorization;
        // if (!token) {
        //     return errorResponse("Missing Token")
        // }
        // const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        // if (decodedData == "invalidtoken") {
        //     return errorResponse(decodedData)
        // }
        // if (decodedData) {
            const response = await brand_controller.getAllBrand(userData.body)
            return successResponse(response)
        // }

    } catch (error) {
        console.log("Error in get all brand in servicess.....!", error)
        return errorResponse("Error in get all brand in servicess")
    }
};

// SEARCH BRAND DETAILS

const searchBrandDetails = async (userData) => {
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
            const Response = await brand_controller.searchBrandDetails(userData.body)
            return successResponse(Response)
        }
        return errorResponse("access denied...!")
    } catch (error) {
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
 searchBrandDetails,
 deleteBrandByName

}