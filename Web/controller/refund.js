const { sequelize } = require('../../db')
const refundmodel = require('../../model/refund')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../services/response');


// CREATE BANNER

const createRefund = async (userData) => {
    try {
        const newUser = await refundmodel.create(userData);
        return newUser;
    }
    catch (error) {
        console.error("Error in create refund details in controller", error);
        throw new Error("Error in create refund in controller");
    }
};

// UPDATE BANNER

const updateRefund = async (heading, userData) => {
    try {
        const newUser = await refundmodel.update(userData, {
            where: {
                heading: heading
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in update refund in controller", error);
        throw new Error("Error update refund in controller");
    }
};

// DELETE BANNER

const deleteRefund = async (heading) => {
    try {
        const newUser = await refundmodel.destroy({
            where: {
                heading: heading
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in delete refund in controller", error);
        throw new Error("Error delete refund in controller");
    }
};


// GET BANNER

const getRefundById = async (id) => {
    try {
        const user = await refundmodel.findOne({
            where: {
                id: id
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get refund in controller..!", error);
        throw new Error('enable to create refund error')
    }
};

// Get all banners

const getallRefund = async () => {
    try {
        const response = await refundmodel.findAll();
        return response;
    } catch (error) {
        console.log("Error in getting all refund in controller.....", error);
        throw error;
    }
};

// // CREATE BANNER

// const searchRefund = async (userData) => {
//     try {
//         const newUser = await refundmodel.create(userData.body);
//         return newUser;
//     }
//     catch (error) {
//         console.error("Error in create refund details in controller", error);
//         throw new Error("Error in create refund in controller");
//     }
// };

module.exports = {
    createRefund,
    updateRefund,
    deleteRefund,
    getRefundById,
    getallRefund,
    // searchRefund

}