const sub_categories_controller = require("../controller/sub_categories_2");
const { generateAccessToken,
    generateRefreshToken,
    verifyToken } = require("../services/jwttoken")
const { successResponse, errorResponse } = require("./response")
const { deleteImage } = require("./deleteimages")
const fs = require("fs");
const csv = require('csv-parser');



// CREATE SUB CATEGORIES

const createSubCategories = async (userData) => {
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
                userData.body.sub_categories_image = userData.file.filename
            }

            const response = await sub_categories_controller.createSubCategories(userData.body);
            return successResponse(response);
        }
    }
    catch (error) {
        console.log("Error in create sub_categories in services..", error)
        return errorResponse("Error in create sub_categories in services..")
    }
}

// UPDATE  SUB CATEGORIES

const updateSubCategories = async (userData) => {
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
                const getUserDate = await sub_categories_controller.getSubCategoriesById(userData.body.Sub_Cat_Level_2_Id)

                if (getUserDate.sub_categories_image !== null) {
                    await deleteImage(getUserDate.sub_categories_image)
                    userData.body.sub_categories_image = userData.file.filename
                }
                else {
                    userData.body.sub_categories_image = userData.file.filename
                }
            }
            const updatedData = await sub_categories_controller.updateSubCategories(userData.body.Sub_Cat_Level_2_Id, userData.body)
            return successResponse(updatedData)
        }
        return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update sub_categories in servicess.....!", error)
        return errorResponse("Error in update sub_categories in servicess")
    }
};


// DELETE  SUB CATEGORIES

const deleteSubCategories = async (userData) => {
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
            const deletedData = await sub_categories_controller.deleteSubCategories(userData.body.Sub_Cat_Level_2_Id,)
            return successResponse(deletedData)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in delete sub_categories in  servicess.....!", error)
        return errorResponse("Error in delete sub_categories in servicess")
    }
};

// GET  SUB CATEGORIES BY ID

const getSubCategoriesById = async (userData) => {
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
            const response = await sub_categories_controller.getSubCategoriesById(userData.body.Sub_Cat_Level_2_Id)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id sub_categories in  servicess.....!", error)
        return errorResponse("Error in get by id sub_categories in servicess")
    }
};

// GET ALL  SUB CATEGORIES

const getAllSubCategories = async (userData) => {
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
            const response = await sub_categories_controller.getAllSubCategories(userData.body)
            return successResponse(response)
        // }

    } catch (error) {
        console.log("Error in get all sub_categories in servicess.....!", error)
        return errorResponse("Error in get all sub_categories in servicess")
    }
};

// SEARCH  SUB CATEGORIES DETAILS

const searchSubCategoriesDetails = async (userData) => {
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
            const Response = await sub_categories_controller.searchSubCategoriesDetails(userData.body)
            return successResponse(Response)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in search sub_categories in  servicess.....!", error)
        return errorResponse("Error in search sub_categories in  servicess")
    }
};




const bulkUploadCategory = async (req) => {
    try {
        const filePath = req.file.path;
        const categories = [];

        return new Promise((resolve, reject) => {
            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (row) => {
                    const hasData = Object.values(row).some(value => value && value.trim() !== '');

                    if (hasData) {
                        // Add row to categories array
                        // If 'Id' is empty, set it to null to trigger auto-increment
                        if (!row.Sub_Cat_Level_2_Id || row.Sub_Cat_Level_2_Id.trim() === '') {
                            row.Sub_Cat_Level_2_Id = null; // This will allow auto-increment to work
                        }

                        categories.push(row);
                    }
                })
                .on('end', async () => {
                    try {
                        for (const category of categories) {
                            // Check if the category with this Sub_Cat_Level_1_Id exists
                            if (category.Sub_Cat_Level_2_Id && category.Sub_Cat_Level_2_Id.trim() !== '') {
                                // If it exists, update the category
                                await sub_categories_controller.updateOrCreateCategory(category.Sub_Cat_Level_2_Id, category);
                            } else {
                                // If Id is not present, create a new category
                                await sub_categories_controller.createSubCategories(category);
                            }
                        }

                        resolve(successResponse("Categories processed successfully"));
                    } catch (error) {
                        console.error("Error in processing categories:", error);
                        reject(errorResponse("Error in processing categories"));
                    }
                })
                .on('error', (error) => {
                    console.error("Error reading CSV file:", error);
                    reject(errorResponse("Error reading CSV file"));
                });
        });
    } catch (error) {
        console.error("Error in bulk upload category service:", error);
        return errorResponse("Error in bulk upload category service");
    }
};



module.exports = {
    createSubCategories,
    updateSubCategories,
    deleteSubCategories,
    getSubCategoriesById,
    getAllSubCategories,
    searchSubCategoriesDetails,
    bulkUploadCategory
}