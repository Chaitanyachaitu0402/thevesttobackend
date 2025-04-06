const categories_controller = require("../controller/categories");
const { generateAccessToken,
    generateRefreshToken,
    verifyToken } = require("./jwttoken")
const { successResponse, errorResponse } = require("./response")
const { deleteImage } = require("./deleteimages")
const fs = require("fs");
const csv = require('csv-parser');

// CREATE CATEGORIES

const createCategories = async (userData) => {
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
                userData.body.categories_image = userData.file.filename
            }
            const response = await categories_controller.createCategories(userData.body);
            return successResponse(response);
        } else {
            return errorResponse("access denaied")
        }
    }
    catch (error) {
        console.log("Error in create cart in services..", error)
        return errorResponse("Error in create cart in services..")
    }
}

// CATEGORY UPDATE

const updateCategories = async (userData) => {
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
                const getUserDate = await categories_controller.getCategoriesById(userData.body.Category_Level_0)

                if (getUserDate.categories_image !== null) {
                    await deleteImage(getUserDate.categories_image)
                    userData.body.categories_image = userData.file.filename
                }
                else {
                    userData.body.categories_image = userData.file.filename
                }
            }
            const updatedData = await categories_controller.updateCategoriesbyName(userData.body.Category_Level_0, userData.body)
            return successResponse(updatedData)
        }
        return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update categories in servicess.....!", error)
        return errorResponse("Error in update categories in servicess")
    }
};

// DELETE  CATEGORIES

const deleteCategories = async (userData) => {
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
            const deletedData = await categories_controller.deleteCategories(userData.body.Category_Level_0)
            return successResponse(deletedData)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in delete categories in  servicess.....!", error)
        return errorResponse("Error in delete categories in servicess")
    }
};

// GET  CATEGORIES BY ID

const getCategoriesById = async (userData) => {
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
            const response = await categories_controller.getCategoriesById(userData.body.Id)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id categories in  servicess.....!", error)
        return errorResponse("Error in get by id categories in servicess")
    }
};

// GET ALL  CATEGORIES

const getAllCategories = async (userData) => {
    try {
        // const token = userData.headers.authorization;
        // if (!token) {
        //     return errorResponse("Missing Token")
        // }
        // const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        // if (decodedData == "invalidtoken") {
        //     return errorResponse(decodedData)
        // }
        // if (decodedData) {
            const response = await categories_controller.getAllCategories()
            return successResponse(response)
        // }

    } catch (error) {
        console.log("Error in get all categories in servicess.....!", error)
        return errorResponse("Error in get all categories in servicess")
    }
};

// SEARCH  CATEGORIES DETAILS

const searchCategoriesDetails = async (userData) => {
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
            const Response = await categories_controller.searchCategoriesDetails(userData.body)
            return successResponse(Response)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in search categories in  servicess.....!", error)
        return errorResponse("Error in search categories in  servicess")
    }
};

// BULK UPLOAD PRODUCTS FROM CSV

const bulkUploadCategory = async (req) => {
    try {
        const filePath = req.file.path;
        const categories = [];

        return new Promise((resolve, reject) => {
            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (row) => {
                    // Check if at least one field in the row contains data
                    const hasData = Object.values(row).some(value => value && value.trim() !== '');

                    if (hasData) {
                        // If 'Id' is empty, set it to null to trigger auto-increment
                        if (!row.Id || row.Id.trim() === '') {
                            row.Id = null; // This will allow auto-increment to work
                        }

                        // Auto-generate Sub_Cat_Level_1_Id if missing
                        if (!row.Sub_Cat_Level_1_Id || row.Sub_Cat_Level_1_Id.trim() === '') {
                            row.Sub_Cat_Level_1_Id = Math.floor(100000 + Math.random() * 900000); // 6-digit random number
                        }

                        // Auto-generate Sub_Cat_Level_2_Id if missing
                        if (!row.Sub_Cat_Level_2_Id || row.Sub_Cat_Level_2_Id.trim() === '') {
                            row.Sub_Cat_Level_2_Id = Math.floor(100000 + Math.random() * 900000); // 6-digit random number
                        }

                        // Auto-generate Sub_Cat_Level_3_Id if missing
                        if (!row.Sub_Cat_Level_3_Id || row.Sub_Cat_Level_3_Id.trim() === '') {
                            row.Sub_Cat_Level_3_Id = Math.floor(100000 + Math.random() * 900000); // 6-digit random number
                        }

                        categories.push(row);
                    }
                })
                .on('end', async () => {
                    try {
                        const response = await categories_controller.bulkCreateCategory(categories);
                        resolve(successResponse(response));
                    } catch (error) {
                        console.error("Error in bulk create category:", error);
                        reject(errorResponse("Error in bulk create category"));
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
    createCategories,
    updateCategories,
    deleteCategories,
    getCategoriesById,
    getAllCategories,
    searchCategoriesDetails,
    bulkUploadCategory
}