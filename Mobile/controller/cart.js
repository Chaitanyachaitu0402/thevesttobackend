const { sequelize } = require('../../db')
const cartModel = require('../../model/cart')(sequelize)
const { errorResponse } = require('../services/res');


// CREATE  CART

const createCart = async (userData) => {
    try {
        const newUser = await cartModel.create(userData);
        return newUser;
    }
    catch (error) {
        console.error("Error in create cart details in controller", error);
        throw new Error("Error in create cart details in controller");
    }
};

// UPDATE CART

const updateCart = async (cart_id, userData) => {
    try {
        const newUser = await cartModel.update(userData, {
            where: {
                cart_id: cart_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in update cart in controller", error);
        throw new Error("Error update cart");
    }
};

// DELETE CART

const deleteCartbyCartid = async (cart_id) => {
    try {
        const newUser = await cartModel.destroy({
            where: {
                cart_id: cart_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in delete cart in controller", error);
        throw new Error("Error delete cart");
    }
};

// DELETE CART

const deleteCartbyUserid = async (user_id) => {
    try {
        const newUser = await cartModel.destroy({
            where: {
                user_id: user_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in delete cart in controller", error);
        throw new Error("Error delete cart");
    }
};

// GET CART

const getCartByCartId = async (cart_id) => {

    try {
        const user = await cartModel.findOne({
            where: {
                cart_id:cart_id
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get cart in controller..!" + error);
        throw new Error('unable to cart wallet error')
    }
};

// GET CART

const getCartByUserId = async (user_id) => {

    try {
        const user = await cartModel.findAll({
            where: {
                user_id: user_id
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get cart in controller..!" + error);
        throw new Error('unable to cart wallet error')
    }
};

// GET CART IMAGE 

const getCartImageById = async (cart_id) => {
    try {
        // Retrieve cart record to get image path or filename
        const productRecord = await cartModel.findOne({
            where: { cart_id: cart_id }
        });

        if (!productRecord) {
            throw new Error('product not found');
        }

        // Assuming cart Record has an imagePath field that stores the image file path
        const imagePath = productRecord.imagePath;

        return {
            success: true,
            imagePath,
        };
    } catch (error) {
        console.log("Error in getproductImageById:", error);
        throw new Error('Unable to retrieve product image');
    }
};

// GET ALL CART

const getAllCart = async (userData) => {
    try {
        const user = await cartModel.findAll(userData);
        return user
    }
    catch (error) {
        console.log("error in get cart in controller..!", error);
        throw new Error('unable to get cart error')
    }
}

// SEARCH  CART

const searchCartDetails = async (userData) => {
    try {

        const data = {};
        if (userData.cart_id) {
            data.cart_id = userData.cart_id
        }
        if (userData.user_name) {
            data.user_name = userData.user_name
        }
        if (userData.user_id) {
            data.user_id = userData.user_id
        }
        if (userData.product_name) {
            data.product_name = userData.product_name
        }
        const user = await cartModel.findAll({
            where: data
        });
        return user


    } catch (error) {
        console.log("erorr in search cart in controller", error)
        errorResponse("error in search cart in controller")
    }
};


module.exports = {
    createCart,
    updateCart,
    deleteCartbyCartid,
    deleteCartbyUserid,
    getAllCart,
    searchCartDetails,
    getAllCart,
    getCartByCartId,
    getCartByUserId,
    getCartImageById
}