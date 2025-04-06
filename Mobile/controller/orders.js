const { sequelize } = require('../../db')
const ordersModel = require('../../model/orders')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../services/res');


// CREATE  ORDERS

const createOrder  = async (userData) => {
    try {
        const newUser = await ordersModel.create(userData);
        return newUser;
    }
    catch (error) {
        console.error("Error in create orders details in controller", error);
        throw new Error("Error in create orders details in controller");
    }
};


// UPDATE  ORDERS

const updateOrder = async (order_id, userData) => {
    try {
        const newUser = await ordersModel.update(userData, {
            where: {
                order_id:order_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in update orders in controller", error);
        throw new Error("Error update orders");
    }
};

// DELETE  ORDERS

const deleteOrder  = async (order_id) => {
    try {
        const newUser = await ordersModel.destroy({
            where: {
                order_id: order_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in delete orders in controller", error);
        throw new Error("Error delete orders");
    }
};

// GET ORDERS

const  getOrderId= async (order_id) => {
    
    try {
        const user = await ordersModel.findAll({
            where: {
                order_id:order_id
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get orders in controller..!"+ error);
        throw new Error('unable to get orders error')
    }
};

const getOrderById = async (user_id) => {
    
    try {
        const user = await ordersModel.findAll({
            where: {
                user_id:user_id
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get orders in controller..!"+ error);
        throw new Error('unable to get orders error')
    }
};


// const getOrderByProductId = async (cart_details) => {
    
//     try {
//         const user = await ordersModel.findAll({
//             where: {
//                 cart_details:cart_details
//             }
//         })
//         return user
//     }
//     catch (error) {
//         console.log("error in get orders in controller..!"+ error);
//         throw new Error('unable to get orders error')
//     }
// };

// GET ALL  ORDERS
const getOrderByProductId = async (cart_details) => {
    try {
        // Extract Ids from cart_details array
        const productIds = cart_details.map(item => item.Id);

        // Fetch orders based on the extracted product Ids
        const user = await ordersModel.findAll({
            where: {
                cart_details: {
                    [Op.contains]: productIds // Use Sequelize Op.contains to match array elements
                }
            }
        });

        return user;
    } catch (error) {
        console.log("Error in getOrderByProductId controller: " + error);
        throw new Error('Unable to get orders, error occurred');
    }
};

const getAllOrder = async (userData) => {
    try {

        const user = await ordersModel.findAll(userData);
        return user
    }
    catch (error) {
        console.log("error in get orders in controller..!", error);
        throw new Error('unable to get all orders error')
    }
}

// SEARCH  ORDERS

const searchOrderDetails = async (userData) => {
    try {

        const data = {};
        if (userData.delivery_date) {
            data.delivery_date = userData.delivery_date
        }
        if (userData.order_id) {
            data.order_id = userData.order_id
        }
        const user = await ordersModel.findAll({
            where: data
        });
        return user


    } catch (error) {
        console.log("erorr in search orders in controller", error)
        errorResponse("error in search orders in controller")
    }
};

//  COUNT  ORDERS

const countOrder = async (userData) => {

    try {
        const newUser = await ordersModel.count({
            where: {
                order_id: userData.order_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in count orders in controller", error);
        throw new Error("Error count orders Details");
    }
}






module.exports = {
    createOrder,
    updateOrder,
    deleteOrder,
    getOrderById,
    searchOrderDetails,
    getAllOrder,
    countOrder,
    getOrderByProductId,
    getOrderId
}