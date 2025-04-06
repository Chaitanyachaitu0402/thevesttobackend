const bestsellers_controller = require("../controller/bestsellers");
const shortUUID = require('short-uuid');
const { generateAccessToken,
    generateRefreshToken,
    verifyToken } = require("./jwttoken")
const { successResponse, errorResponse } = require("./response")
const { deleteImage } = require("./deleteimages")
const csv = require('csv-parser');
const fs = require('file-system');


// CREATE PRODUCT

const createBestSellers = async (userData) => {
    try {
        const translator = shortUUID();
        const userId = translator.new();
        userData.body.bestsellers_id = userId;

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
                userData.body.Product_image = userData.file.filename
            }

            const response = await bestsellers_controller.createBestSellers(userData.body);
            return successResponse(response);
        }
    }
    catch (error) {
        console.log("Error in create bestsellers in services..", error)
        return errorResponse("Error in create bestsellers in services..")
    }
}

// UPDATE PRODUCT

const updateBestSellers = async (userData) => {
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
                const getUserDate = await bestsellers_controller.getBestSellersById(userData.body.bestsellers_id)

                if (getUserDate.Product_image !== null) {
                    await deleteImage(getUserDate.Product_image)
                    userData.body.Product_image = userData.file.filename
                }
                else {
                    userData.body.Product_image = userData.file.filename
                }
            }
            const updatedData = await bestsellers_controller.updateBestSellers(userData.body.bestsellers_id, userData.body)
            return successResponse(updatedData)
        }
        return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update bestsellers in servicess.....!", error)
        return errorResponse("Error in update bestsellers in servicess")
    }
};


const updateProductImage = async (userData) => {
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
                const getUserDate = await bestsellers_controller.getProductByName(userData.body.Name)

                if (getUserDate.Product_image !== null) {
                    await deleteImage(getUserDate.Product_image)
                    userData.body.Product_image = userData.file.filename
                }
                else {
                    userData.body.Product_image = userData.file.filename
                }
            }
            const updatedData = await bestsellers_controller.updateProductImage(userData.body.Name, userData.body)
            return successResponse(updatedData)
        }
        return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update Product in servicess.....!", error)
        return errorResponse("Error in update Product in servicess")
    }
};


// DELETE PRODUCT

const deleteBestSellers = async (userData) => {
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
            const deletedData = await bestsellers_controller.deleteProduct(userData.body.bestsellers_id)
            return successResponse(deletedData)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in delete bestsellers in  servicess.....!", error)
        return errorResponse("Error in delete bestsellers in servicess")
    }
};

// DELETE PRODUCT BY PRPDUCT NAME

const deleteBestSellersByName = async (userData) => {
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
            const deletedData = await bestsellers_controller.deleteBestSellersByName(userData.body.bestsellers_id)
            return successResponse(deletedData)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in delete bestsellers in  servicess.....!", error)
        return errorResponse("Error in delete bestsellers in servicess")
    }
};

// GET PRODUCT BY ID

const getBestSellersById = async (userData) => {
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
            const response = await bestsellers_controller.getBestSellersById(userData.body.bestsellers_id)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id bestsellers in  servicess.....!", error)
        return errorResponse("Error in get by id bestsellers in servicess")
    }
};

// GET ALL PRODUCT

const getAllBestSellers = async (userData) => {
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
        const response = await bestsellers_controller.getAllBestSellers(userData.body)
        return successResponse(response)
        // }

    } catch (error) {
        console.log("Error in get all bestsellers in servicess.....!", error)
        return errorResponse("Error in get all bestsellers in servicess")
    }
};

// SEARCH PRODUCT DETAILS

const searchBestSellersDetails = async (userData) => {
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
            const Response = await bestsellers_controller.searchBestSellersDetails(userData.body)
            return successResponse(Response)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in search bestsellers in  servicess.....!", error)
        return errorResponse("Error in search bestsellers in  servicess")
    }
};

const bulkProductUpload = async (userData, res) => {
    try {
        const token = userData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token");
        }

        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY);
        if (decodedData === "invalidtoken") {
            return errorResponse(decodedData);
        }

        if (decodedData.role !== "admin") {
            return errorResponse("Access denied....!");
        }

        const results = [];
        const rows = [];

        // Read CSV data into memory
        const productCSV = fs.createReadStream(userData.file.path).pipe(csv({}));

        // Collect and validate rows
        for await (const row of productCSV) {
            if (row) {
                // Ensure each row has an Id, if not, generate one
                if (!row.Id || row.Id.trim() === '') {
                    row.Id = Math.floor(100000 + Math.random() * 900000); // Generate a random six-digit integer
                }

                // Check if the Name field is filled
                if (row.Name && row.Name.trim() !== '') {
                    // Add row to the list for processing
                    rows.push(row);
                } else {
                    console.log("Skipping row without Name field:", row);
                }
            } else {
                console.log("Skipping empty row");
            }
        }

        // Process each row
        for (const row of rows) {
            try {
                // Provide default values for missing fields
                row.Cost_Price = row.Cost_Price || 0;
                row.Sale_Price = row.Sale_Price || 0;
                row.Regular_Price = row.Regular_Price || 0;
                row.Tax_Class = row.Tax_Class || '0VAT';

                // Calculate VAT and margin
                const calc = calculateVATAndMargin(row.Cost_Price, row.Sale_Price, row.Regular_Price, row.Tax_Class);
                row.Cost_Including_VAT = calc.costIncludingVAT;
                row.Sale_Including_VAT = calc.saleIncluding_VAT;
                row.Margin = calc.margin;
                row.Margin_Percentage = calc.marginPercentage;

                // Repeat for other price fields
                const calc1 = calculateVATAndMargin(row.Cost_Price_1, row.Sale_Price_1, row.Regular_Price_1, row.Tax_Class);
                row.Cost_1_Including_VAT = calc1.costIncludingVAT;
                row.Sale_Regular_Including_VAT_1 = calc1.saleIncluding_VAT;
                row.Margin_1 = calc1.margin;
                row.Margin_1_Percentage = calc1.marginPercentage;

                const calc2 = calculateVATAndMargin(row.Cost_Price_2, row.Sale_Price_2, row.Regular_Price_2, row.Tax_Class);
                row.Cost_2_Including_VAT = calc2.costIncludingVAT;
                row.Sale_Regular_Including_VAT_2 = calc2.saleIncluding_VAT;
                row.Margin_2 = calc2.margin;
                row.Margin_2_Percentage = calc2.marginPercentage;

                const calc3 = calculateVATAndMargin(row.Cost_Price_3, row.Sale_Price_3, row.Regular_Price_3, row.Tax_Class);
                row.Cost_3_Including_VAT = calc3.costIncluding_VAT;
                row.Sale_Regular_Including_VAT_3 = calc3.saleIncluding_VAT;
                row.Margin_3 = calc3.margin;
                row.Margin_3_Percentage = calc3.marginPercentage;

                // Check if product already exists
                const existingProduct = await bestsellers_controller.getBestSellersById(row.Id);

                if (existingProduct) {
                    // Update existing product
                    await bestsellers_controller.updateBestSellers(row.Id, row);
                    results.push({ ...row, action: 'updated' });
                } else {
                    // Create new product
                    await bestsellers_controller.createBestSellers(row);
                    results.push({ ...row, action: 'created' });
                }
            } catch (innerError) {
                console.log("Error processing row:", row, innerError);
                results.push({ ...row, action: 'error', error: innerError.message });
            }
        }

        return successResponse(results);
    } catch (error) {
        console.log("Error in bulk upload product in services.....!", error);
        return errorResponse("Error in bulk upload product in services");
    }
};

const calculateVATAndMargin = (costPrice, salePrice, regularPrice, taxClass) => {
    let costIncludingVAT = parseFloat(costPrice) || 0;
    let saleIncluding_VAT = 0;
    let margin = 0;
    let marginPercentage = 0;

    if (taxClass && taxClass.includes('VAT')) {
        const vatPercentage = parseFloat(taxClass.replace('VAT', '')) || 0;
        if (!isNaN(vatPercentage)) {
            const vatMultiplier = 1 + (vatPercentage / 100);
            costIncludingVAT *= vatMultiplier;
        }
    }

    const priceToUse = regularPrice || salePrice || 0;
    if (priceToUse > 0) {
        saleIncluding_VAT = priceToUse * (1 + (parseFloat(taxClass.replace('VAT', '')) / 100));
        margin = priceToUse - costIncludingVAT;
        marginPercentage = (margin / costIncludingVAT) * 100;
    }

    return {
        costIncludingVAT: costIncludingVAT.toFixed(2),
        saleIncluding_VAT: saleIncluding_VAT.toFixed(2),
        margin: margin.toFixed(2),
        marginPercentage: marginPercentage.toFixed(2)
    };
};


module.exports = {
    createBestSellers,
    updateBestSellers,
    deleteBestSellers,
    deleteBestSellersByName,
    getBestSellersById,
    getAllBestSellers,
    searchBestSellersDetails,
    updateProductImage,
    bulkProductUpload

}