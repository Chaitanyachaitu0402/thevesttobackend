const cart_Controller = require("../controller/cart");
const bcrypt = require("bcrypt");
const shortUUID = require('short-uuid');
const { successResponse, errorResponse } = require("./res");
const { deleteImage } = require("./deleteimages");

// CREATE CART

const createCart = async (userData) => {
    try {
        const rrr = await cart_Controller.getCartByUserId(userData.body.user_id);
        if (rrr) {
            const sss = rrr.filter((item) => {
                return item.product_id == userData.body.product_id
            })
            if (sss.length > 0) {
                userData.body.quantity = parseInt(sss[0].quantity) + parseInt(userData.body.quantity);
                userData.body.total_price = parseFloat(sss[0].total_price) + parseFloat(userData.body.total_price);
                const response = await cart_Controller.updateCart(sss[0].cart_id, userData.body);
                return successResponse(response);
            } else {
                const translator = shortUUID(); 
                const userId = translator.new(); 
                userData.body.cart_id = userId;

                const response = await cart_Controller.createCart(userData.body);
                return successResponse(response);
            }

        } else {
            const translator = shortUUID(); 
            const userId = translator.new(); 
            userData.body.cart_id = userId;

            const response = await cart_Controller.createCart(userData.body);
            return successResponse(response);
        }
    } catch (error) {
        console.log("Error in create cart in services..", error);
        return errorResponse("Error in create cart in services..");
    }
};

// UPDATE CART

const updateCart = async (userData) => {
    try {
        if (userData.file) {
            const getUserDate = await cart_Controller.getCartByCartId(userData.body.cart_id);

            if (getUserDate.cart_image !== null) {
                await deleteImage(getUserDate.cart_image);
                userData.body.cart_image = userData.file.filename;
            } else {
                userData.body.cart_image = userData.file.filename;
            }
        }
        const updatedData = await cart_Controller.updateCart(userData.body.cart_id, userData.body);
        return successResponse(updatedData);
    } catch (error) {
        console.log("Error in update cart in services.....!", error);
        return errorResponse("Error in update cart in services");
    }
};

// DELETE CART

const deleteCartbyCartid = async (userData) => {
    try {

        const deletedData = await cart_Controller.deleteCartbyCartid(userData.body.cart_id, userData.body);
        // const remainingCartData = await cart_Controller.getCartByUserId(userData.body.user_id);

        return successResponse(deletedData);

    } catch (error) {
        console.log("Error in delete cart in services.....!", error);
        return errorResponse("Error in delete cart in services");
    }
};

// DELETE CART

const deleteCartbyUserid = async (userData) => {
    try {

        const deletedData = await cart_Controller.deleteCartbyUserid(userData.body.user_id, userData.body);
        return successResponse(deletedData);

    } catch (error) {
        console.log("Error in delete cart in services.....!", error);
        return errorResponse("Error in delete cart in services");
    }
};
// GET CART BY ID

const getCartByCartId = async (userData) => {
    try {
        const response = await cart_Controller.getCartByCartId(userData.body.cart_id);
        return successResponse(response);

    } catch (error) {
        console.log("Error in get by id cart in services.....!", error);
        return errorResponse("Error in get by id cart in services");
    }
};

// GET CART BY ID

const getCartByUserId = async (userData) => {
    try {
        const response = await cart_Controller.getCartByUserId(userData.body.user_id);
        return successResponse(response);

    } catch (error) {
        console.log("Error in get by id cart in services.....!", error);
        return errorResponse("Error in get by id cart in services");
    }
};

//GET CART IMAGE 

const getCartImageById = async (cart_id) => {
    try {
        const response = await cart_Controller.getCartImageById(cart_id);

        if (!response.success) {
            throw new Error(response.message);
        }

        // Read the image file as a buffer
        const imageBuffer = fs.readFileSync(response.imagePath);

        return {
            success: true,
            data: imageBuffer,
        };
    } catch (error) {
        console.log("Error in getproductImageById service:", error);
        return {
            success: false,
            message: 'Unable to retrieve product image',
        };
    }
};

// GET ALL CART

const getAllCart = async (userData) => {
    try {

        const response = await cart_Controller.getAllCart(userData.body);
        return successResponse(response);

    } catch (error) {
        console.log("Error in get all cart in services.....!", error);
        return errorResponse("Error in get all cart in services");
    }
};

// SEARCH CART DETAILS

const searchCartDetails = async (userData) => {
    try {

        const Response = await cart_Controller.searchCartDetails(userData.body);
        return successResponse(Response);

    } catch (error) {
        console.log("Error in search cart in services.....!", error);
        return errorResponse("Error in search cart in services");
    }
};


module.exports = {
    createCart,
    updateCart,
    searchCartDetails,
    deleteCartbyCartid,
    deleteCartbyUserid,
    getAllCart,
    getCartByCartId,
    getCartByUserId,
    getCartImageById
};
