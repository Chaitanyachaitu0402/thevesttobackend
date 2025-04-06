const { sequelize } = require('../../db')
const couponModel = require('../../model/coupons')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../services/res');


// CREATE BRAND

const createCoupon = async (userData) => {
    try {
        const newUser = await couponModel.create(userData);
        return newUser;
    }
    catch (error) {
        console.error("Error in create coupon details in controller", error);
        throw new Error("Error in create coupon in controller");
    }
};

// UPDATE BRAND

const updateCoupon = async (coupon_id, userData) => {
    try {
        const newUser = await couponModel.update(userData, {
            where: {
                coupon_id: coupon_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in update coupon in controller", error);
        throw new Error("Error update coupon in controller");
    }
};

// DELETE BRAND

const deleteCoupon = async (coupon_id) => {
    try {
        const newUser = await couponModel.destroy({
            where: {
                coupon_id: coupon_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in delete coupon in controller", error);
        throw new Error("Error delete coupon in controller");
    }
};

// GET BRAND

const getCouponById = async (coupon_id) => {
    try {
        const user = await couponModel.findOne({
            where: {
                coupon_id: coupon_id
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get coupon in controller..!", error);
        throw new Error('enable to get coupon error')
    }
};

// GET ALL BRAND

const getAllCoupon = async (userData) => {
    try {

        const user = await couponModel.findAll(userData);
        return user
    }
    catch (error) {
        console.log("error in get coupon in controller..!", error);
        throw new Error('enable to get coupon error')
    }
}

// SEARCH BRAND

const searchCouponDetails = async (userData) => {
    try {

        const data = {};
        if (userData.coupon_name) {
            data.coupon_name = userData.coupon_name
        }

        if (userData.coupon_id) {
            data.coupon_id = userData.coupon_id
        }
        const user = await couponModel.findAll({
            where: data
        });
        return user


    } catch (error) {
        console.log("erorr in search coupon in controller", error)
        errorResponse("error in search coupon in controller")
    }
};

module.exports = {
    createCoupon,
    updateCoupon,
    deleteCoupon,
    getCouponById,
    getAllCoupon,
    searchCouponDetails


}