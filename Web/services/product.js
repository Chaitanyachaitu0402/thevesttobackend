const product_controller = require("../controller/product");
const { generateAccessToken, generateRefreshToken, verifyToken } = require("./jwttoken");
const { successResponse, errorResponse } = require("./response");
const { deleteImage } = require("./deleteimages");
const csv = require('csv-parser');
const fs = require('file-system');

// CREATE PRODUCT
const createProduct = async (userData) => {
    try {
        // const token = userData.headers.authorization;
        // if (!token) {
        //     return errorResponse("Missing Token");
        // }
        // const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY);
        // if (decodedData == "invalidtoken") {
        //     return errorResponse(decodedData);
        // }
        // if (decodedData.role == "admin") {
            if (userData.file) {
                userData.body.Product_image = userData.file.filename;
            }
            const response = await product_controller.createProduct(userData.body);
            return successResponse(response);
        // }
    } catch (error) {
        console.log("Error in create cart in services..", error);
        return errorResponse("Error in create cart in services..");
    }
};

// UPDATE PRODUCT
const updateProduct1 = async (userData) => {
    try {
        if (userData.file) {
            userData.body.Product_image1 = userData.file.filename;
        }
            const updatedData = await product_controller.updateProduct1(userData.body.Id, userData.body);
            return successResponse(updatedData);
        
    } catch (error) {
        console.log("Error in update Product in services.....!", error);
        return errorResponse("Error in update Product in services");
    }
};

const updateProduct2 = async (userData) => {
    try {
        if (userData.file) {
            userData.body.Product_image2 = userData.file.filename;
        }
            const updatedData = await product_controller.updateProduct2(userData.body.Id, userData.body);
            return successResponse(updatedData);
        
    } catch (error) {
        console.log("Error in update Product in services.....!", error);
        return errorResponse("Error in update Product in services");
    }
};

const updateProduct3 = async (userData) => {
    try {
        if (userData.file) {
            userData.body.Product_image3 = userData.file.filename;
        }
            const updatedData = await product_controller.updateProduct3(userData.body.Id, userData.body);
            return successResponse(updatedData);
        
    } catch (error) {
        console.log("Error in update Product in services.....!", error);
        return errorResponse("Error in update Product in services");
    }
};

const updateProduct4 = async (userData) => {
    try {
        if (userData.file) {
            userData.body.Product_image4 = userData.file.filename;
        }
            const updatedData = await product_controller.updateProduct4(userData.body.Id, userData.body);
            return successResponse(updatedData);
        
    } catch (error) {
        console.log("Error in update Product in services.....!", error);
        return errorResponse("Error in update Product in services");
    }
};

const updateProduct5 = async (userData) => {
    try {
        if (userData.file) {
            userData.body.Product_image5 = userData.file.filename;
        }
            const updatedData = await product_controller.updateProduct5(userData.body.Id, userData.body);
            return successResponse(updatedData);
        
    } catch (error) {
        console.log("Error in update Product in services.....!", error);
        return errorResponse("Error in update Product in services");
    }
};

const updateProductImage = async (userData) => {
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

        //     if (userData.file) {
        //         const getUserDate = await product_controller.getProductByName(userData.body.Name)

        //         if (getUserDate.Product_image !== null) {
        //             await deleteImage(getUserDate.Product_image)
        //             userData.body.Product_image = userData.file.filename
        //         }
        //         else {
        //             userData.body.Product_image = userData.file.filename
        //         }
        //     }
            const updatedData = await product_controller.updateProductImage(userData.body.Name, userData.body)
            return successResponse(updatedData)
        // }
        // return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update Product in servicess.....!", error)
        return errorResponse("Error in update Product in servicess")
    }
};


// DELETE PRODUCT
const deleteProduct = async (userData) => {
    try {
        // const token = userData.headers.authorization;
        // if (!token) {
        //     return errorResponse("Missing Token");
        // }
        // const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY);
        // if (decodedData == "invalidtoken") {
        //     return errorResponse(decodedData);
        // }
        // if (decodedData.role == "admin") {
            const deletedData = await product_controller.deleteProduct(userData.body.Id);
            return successResponse(deletedData);
        // }
        // return errorResponse("access denied...!");
    } catch (error) {
        console.log("Error in delete Product in services.....!", error);
        return errorResponse("Error in delete Product in services");
    }
};

// DELETE PRODUCT BY PRODUCT NAME
const deleteProductByName = async (userData) => {
    try {
        // const token = userData.headers.authorization;
        // if (!token) {
        //     return errorResponse("Missing Token");
        // }
        // const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY);
        // if (decodedData == "invalidtoken") {
        //     return errorResponse(decodedData);
        // }
        // if (decodedData.role == "admin") {
            const deletedData = await product_controller.deleteProductByName(userData.body.Name);
            return successResponse(deletedData);
        // }
        // return errorResponse("access denied...!");
    } catch (error) {
        console.log("Error in delete Product in services.....!", error);
        return errorResponse("Error in delete Product in services");
    }
};

// GET PRODUCT BY ID

const getProductById = async (userData) => {
    try {
        // const token = userData.headers.authorization;
        // if (!token) {
        //     return errorResponse("Missing Token");
        // }
        // const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY);
        // if (decodedData == "invalidtoken") {
        //     return errorResponse(decodedData);
        // }
        // if (decodedData) {
            const response = await product_controller.getProductById(userData.body.Id);
            return successResponse(response);
        // }
    } catch (error) {
        console.log("Error in get by id Product in services.....!", error);
        return errorResponse("Error in get by id Product in services");
    }
};


const getProductByName = async (userData) => {
    try {
        // const token = userData.headers.authorization;
        // if (!token) {
        //     return errorResponse("Missing Token");
        // }
        // const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY);
        // if (decodedData == "invalidtoken") {
        //     return errorResponse(decodedData);
        // }
        // if (decodedData) {
            const response = await product_controller.getProductByName(userData.body.Name);
            return successResponse(response);
        // }
    } catch (error) {
        console.log("Error in get by id Product in services.....!", error);
        return errorResponse("Error in get by id Product in services");
    }
};


const getProductByCategoryId = async (userData) => {
    try {
        // const token = userData.headers.authorization;
        // if (!token) {
        //     return errorResponse("Missing Token");
        // }
        // const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY);
        // if (decodedData == "invalidtoken") {
        //     return errorResponse(decodedData);
        // }
        // if (decodedData) {
            const response = await product_controller.getProductByCategoryId(userData.body.CategoryId);
            return successResponse(response);
        // }
    } catch (error) {
        console.log("Error in get by id Product in services.....!", error);
        return errorResponse("Error in get by id Product in services");
    }
};

// GET ALL PRODUCTS

const getAllProduct = async (userData) => {
    try {
        // const token = userData.headers.authorization;
        // if (!token) {
        //     return errorResponse("Missing Token");
        // }
        // const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY);
        // if (decodedData == "invalidtoken") {
        //     return errorResponse(decodedData);
        // }
        // if (decodedData) {
        const response = await product_controller.getAllProduct(userData.body);
        return successResponse(response);
        // }
    } catch (error) {
        console.log("Error in get all Product in services.....!", error);
        return errorResponse("Error in get all Product in services");
    }
};

// SEARCH PRODUCT DETAILS

const searchProductDetails = async (userData) => {
    try {
        const token = userData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token");
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY);
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData);
        }
        if (decodedData) {
            const Response = await product_controller.searchProductDetails(userData.body);
            return successResponse(Response);
        }
        return errorResponse("access denied...!");
    } catch (error) {
        console.log("Error in search Product in services.....!", error);
        return errorResponse("Error in search Product in services");
    }
};

const bulkProductUpload = async (userData, res) => {
    try {
        // const token = userData.headers.authorization;
        // if (!token) {
        //     return errorResponse("Missing Token");
        // }

        // const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY);
        // if (decodedData === "invalidtoken") {
        //     return errorResponse(decodedData);
        // }

        // if (decodedData.role !== "admin") {
        //     return errorResponse("Access denied....!");
        // }

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
                const existingProduct = await product_controller.getProductById(row.Id);

                if (existingProduct) {
                    // Update existing product
                    await product_controller.updateProduct(row.Id, row);
                    results.push({ ...row, action: 'updated' });
                } else {
                    // Create new product
                    await product_controller.createProduct(row);
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
    createProduct,
    updateProduct1,
    updateProduct2,
    updateProduct3,
    updateProduct4,
    updateProduct5,
    deleteProduct,
    getProductById,
    getAllProduct,
    deleteProductByName,
    searchProductDetails,
    bulkProductUpload,
    updateProductImage,
    getProductByCategoryId,
    getProductByName
}
