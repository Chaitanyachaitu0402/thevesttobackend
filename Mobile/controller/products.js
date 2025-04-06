const { sequelize } = require('../../db');
const productModel = require('../../model/product')(sequelize);
const { Op } = require("sequelize");
const { errorResponse } = require('../services/res');

// CREATE PRODUCT

const createProduct = async (userData) => {
    try {
        const newUser = await productModel.create(userData);
        return newUser;
    } catch (error) {
        console.error("Error in create product details in controller", error);
        throw new Error("Error in create product in controller");
    }
};

// UPDATE PRODUCT

const updateProduct = async (product_id, userData) => {
    try {
        const newUser = await productModel.update(userData, {
            where: {
                product_id: product_id
            }
        });
        return newUser;
    } catch (error) {
        console.error("Error in update product in controller", error);
        throw new Error("Error update product in controller");
    }
};

// DELETE PRODUCT

const deleteProduct = async (product_id) => {
    try {
        const newUser = await productModel.destroy({
            where: {
                product_id: product_id
            }
        });
        return newUser;
    } catch (error) {
        console.error("Error in delete product in controller", error);
        throw new Error("Error delete product in controller");
    }
};

// DELETE PRODUCT BY PRODUCT NAME

const deleteProductByName = async (product_name) => {
    try {
        const newUser = await productModel.destroy({
            where: {
                product_name: product_name
            }
        });
        return newUser;
    } catch (error) {
        console.error("Error in delete product in controller", error);
        throw new Error("Error delete product in controller");
    }
};

// GET PRODUCT

const getProductById = async (product_id) => {
    try {
        const user = await productModel.findOne({
            where: {
                product_id: product_id
            }
        });
        return user;
    } catch (error) {
        console.log("error in get product in controller..!", error);
        throw new Error('enable to create product error');
    }
};

const getProductByCategoryId = async (CategoriesId) => {
    try {
        const user = await productModel.findAll({
            where: {
                CategoriesId: CategoriesId
            }
        });
        return user;
    } catch (error) {
        console.log("error in get product in controller..!", error);
        throw new Error('enable to create product error');
    }
};
// GET PRODUCT BY NAME

const getProductByName = async (product_name) => {
    try {
        const user = await productModel.findOne({
            where: {
                product_name: product_name
            }
        });
        return user;
    } catch (error) {
        console.log("error in get product in controller..!", error);
        throw new Error('enable to create product error');
    }
};

// GET ALL PRODUCT

const getAllProduct = async (userData) => {
    try {
        const user = await productModel.findAll(userData);
        return user;
    } catch (error) {
        console.log("error in get product in controller..!", error);
        throw new Error('enable to get product error');
    }
}

// SEARCH PRODUCT

const searchProductDetails = async (userData) => {
    try {
        const data = {};
        if (userData.product_name) {
            data.product_name = userData.product_name;
        }

        if (userData.product_id) {
            data.product_id = userData.product_id;
        }
        const user = await productModel.findAll({
            where: data
        });
        return user;
    } catch (error) {
        console.log("error in search product in controller", error);
        errorResponse("error in search product in controller");
    }
};

// BULK CREATE PRODUCTS

const bulkCreateProducts = async (products) => {
    try {
        const response = await productModel.bulkCreate(products);
        return { success: true, data: response };
    } catch (error) {
        console.log("Error in bulk create products in controller", error);
        throw new Error("Error in bulk create products in controller");
    }
};

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getAllProduct,
    searchProductDetails,
    deleteProductByName,
    getProductByName,
    bulkCreateProducts,
    getProductByCategoryId
};
