const { sequelize } = require('../../db');
const productModel = require('../../model/product')(sequelize);
const { Op } = require("sequelize");
const { errorResponse } = require('../services/response');


const createProduct = async (productData) => {
    try {
        const response = await productModel.create(productData);
        return response;
    } catch (error) {
        console.log("Error in creating product in controller.....", error);
        throw error;
    }
};

const updateProduct1 = async (id, productData) => {
    console.log("Updating product with ID:", id);
    console.log("New Data:", productData);
    try {
        const [affectedCount] = await productModel.update(productData, { where: { Id: id } });
        if (affectedCount === 0) {
            console.log("No rows updated. Possible invalid ID.");
            return { updated: false };
        }
        return { updated: true };
    } catch (error) {
        console.log("Error in updating product in controller:", error);
        throw error;
    }
};

const updateProduct2 = async (id, productData) => {
    console.log("Updating product with ID:", id);
    console.log("New Data:", productData);
    try {
        const [affectedCount] = await productModel.update(productData, { where: { Id: id } });
        if (affectedCount === 0) {
            console.log("No rows updated. Possible invalid ID.");
            return { updated: false };
        }
        return { updated: true };
    } catch (error) {
        console.log("Error in updating product in controller:", error);
        throw error;
    }
};

const updateProduct3 = async (id, productData) => {
    console.log("Updating product with ID:", id);
    console.log("New Data:", productData);
    try {
        const [affectedCount] = await productModel.update(productData, { where: { Id: id } });
        if (affectedCount === 0) {
            console.log("No rows updated. Possible invalid ID.");
            return { updated: false };
        }
        return { updated: true };
    } catch (error) {
        console.log("Error in updating product in controller:", error);
        throw error;
    }
};

const updateProduct4 = async (id, productData) => {
    console.log("Updating product with ID:", id);
    console.log("New Data:", productData);
    try {
        const [affectedCount] = await productModel.update(productData, { where: { Id: id } });
        if (affectedCount === 0) {
            console.log("No rows updated. Possible invalid ID.");
            return { updated: false };
        }
        return { updated: true };
    } catch (error) {
        console.log("Error in updating product in controller:", error);
        throw error;
    }
};

const updateProduct5 = async (id, productData) => {
    console.log("Updating product with ID:", id);
    console.log("New Data:", productData);
    try {
        const [affectedCount] = await productModel.update(productData, { where: { Id: id } });
        if (affectedCount === 0) {
            console.log("No rows updated. Possible invalid ID.");
            return { updated: false };
        }
        return { updated: true };
    } catch (error) {
        console.log("Error in updating product in controller:", error);
        throw error;
    }
};


const updateProductImage = async (Name, userData) => {
    try {
        const newUser = await productModel.update(userData, {
            where: {
                Name: Name
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in update product in controller", error);
        throw new Error("Error update product in controller");
    }
};

const deleteProduct = async (id) => {
    try {
        const response = await productModel.destroy({ where: { Id: id } });
        return response;
    } catch (error) {
        console.log("Error in deleting product in controller.....", error);
        throw error;
    }
};

const deleteProductByName = async (name) => {
    try {
        const response = await productModel.destroy({ where: { Name: name } });
        return response;
    } catch (error) {
        console.log("Error in deleting product by name in controller.....", error);
        throw error;
    }
};

const getProductById = async (id) => {
    try {
        const response = await productModel.findOne({ where: { Id: id } });
        return response;
    } catch (error) {
        console.log("Error in getting product by id in controller.....", error);
        throw error;
    }
};




const getProductByCategoryId = async (CategoryId) => {
    try {
        const response = await productModel.findAll({ where: { CategoryId: CategoryId } });
        return response;
    } catch (error) {
        console.log("Error in getting product by id in controller.....", error);
        throw error;
    }
};

const getProductByName = async (Name) => {
    try {
        const user = await productModel.findOne({
            where: {
                Name: Name
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get product in controller..!", error);
        throw new Error('enable to create product error')
    }
};

const getAllProduct = async () => {
    try {
        const response = await productModel.findAll();
        return response;
    } catch (error) {
        console.log("Error in getting all products in controller.....", error);
        throw error;
    }
};

const searchProductDetails = async (searchData) => {
    try {
        const response = await productModel.findAll({
            where: {
                [Op.or]: [
                    { Name: { [Op.like]: `%${searchData.query}%` } },
                    { Description: { [Op.like]: `%${searchData.query}%` } },
                ]
            }
        });
        return response;
    } catch (error) {
        console.log("Error in searching product details in controller.....", error);
        throw error;
    }
};

const bulkProductUpload = async (productData) => {
    try {
        const response = await productModel.bulkCreate(productData);
        return response;
    } catch (error) {
        console.log("Error in bulk uploading products in controller.....", error);
        throw error;
    }
};

module.exports = {
    createProduct,
    updateProduct1,
    updateProduct2,
    updateProduct3,
    updateProduct4,
    updateProduct5,
    deleteProduct,
    deleteProductByName,
    getProductById,
    getAllProduct,
    searchProductDetails,
    bulkProductUpload,
    updateProductImage,
    getProductByName,
    getProductByCategoryId
};
