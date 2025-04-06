const order_Controller = require("../controller/orders");
const user_Controller = require("../controller/user");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');
const { successResponse, errorResponse } = require("./res");
const { deleteImage } = require("./deleteimages");
const fs = require('fs');

// CREATE ORDERS

const createOrder = async (userData) => {
    try {
        const userId = uuidv4();
        userData.body.order_id = userId;
        
        const response = await order_Controller.createOrder(userData.body);
        return successResponse(response);

    } catch (error) {
        console.log("Error in create orders in services..", error);
        return errorResponse("Error in create orders in services..");
    }
};


// UPDATE ORDERS

const updateOrder = async (userData) => {
    try {
            const updatedData = await order_Controller.updateOrder (userData.body.order_id, userData.body);
            return successResponse(updatedData);
    } catch (error) {
        console.log("Error in update orders in services.....!", error);
        return errorResponse("Error in update orders in services");
    }
};

// DELETE ORDERS

const deleteOrder   = async (userData) => {
    try {
        
            const deletedData = await order_Controller.deleteOrder(userData.body.order_id, userData.body);
            return successResponse(deletedData);
        
    } catch (error) {
        console.log("Error in delete orders in services.....!", error);
        return errorResponse("Error in delete orders in services");
    }
};

// GET ORDERS BY ID

const getOrderById = async (userData) => {
    try {
            const response = await order_Controller.getOrderById(userData.body.user_id);
            return successResponse(response);

    } catch (error) {
        console.log("Error in get by id orders in services.....!", error);
        return errorResponse("Error in get by id orders in services");
    }
};

const getOrderId= async (userData) => {
    try {
            const response = await order_Controller.getOrderId(userData.body.order_id);
            return successResponse(response);

    } catch (error) {
        console.log("Error in get by id orders in services.....!", error);
        return errorResponse("Error in get by id orders in services");
    }
};

const getOrderByProductId = async (userData) => {
    try {
            const response = await order_Controller.getOrderByProductId(userData.body.Id);
            return successResponse(response);

    } catch (error) {
        console.log("Error in get by getOrderByProductId in services.....!", error);
        return errorResponse("Error in getOrderByProductId in services");
    }
};



// GET ALL ORDERS

const getAllOrder = async (userData) => {
    try {
        const user = await user_Controller.getUserById(userData.body.user_id)
        if (user.role == "admin") {
            const response = await order_Controller.getAllOrder (userData.body);
            return successResponse(response);
        } else {
            return errorResponse("access denied")
        }
    } catch (error) {
        console.log("Error in get all orders in services.....!", error);
        return errorResponse("Error in get all orders in services");
    }
};

// SEARCH ORDERS DETAILS

const searchOrderDetails = async (userData) => {
    try {
        
            const Response = await order_Controller.searchOrderDetails(userData.body);
            return successResponse(Response);
       
    } catch (error) {
        console.log("Error in search orders in services.....!", error);
        return errorResponse("Error in search orders in services");
    }
};

// COUNT ORDERS

const countOrder = async (userData) => {
    try {
            const response = await order_Controller.countOrder(userData.body);
            return successResponse(response);
      
    } catch (error) {
        console.log("Error in count in services.....!", error);
        return errorResponse("Error in count in services");
    }
};



module.exports = {
    createOrder,
    updateOrder,
    searchOrderDetails,
    deleteOrder,
    getAllOrder,
    getOrderById,
    countOrder,
    getOrderByProductId,
    getOrderId
    
};
