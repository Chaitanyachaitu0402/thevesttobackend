const { sequelize } = require('../../db')
const wishlistModel = require('../../model/wishlist')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../services/res');

// CREATE WISH LIST

const createWishlist = async (userData) => {
    try {
        const newUser = await wishlistModel.create(userData);
        return newUser;
    }
    catch (error) {
        console.error("Error in create wishlist details in controller", error);
        throw new Error("Error in create wishlist details in controller");
    }
};

// UPDATE WISH LIST

const updateWishlist = async (wishlist_id, userData) => {
    try {
        const newUser = await wishlistModel.update(userData, {
            where: {
                wishlist_id: wishlist_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in update wishlist in controller", error);
        throw new Error("Error update wishlist");
    }
};

// DELETE WISH LIST

const deleteWishlist = async (wishlist_id) => {
    try {
        const newUser = await wishlistModel.destroy({
            where: {
                wishlist_id: wishlist_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in delete wishlist in controller", error);
        throw new Error("Error delete wishlist");
    }
};

// GET WISH LIST

const getWishlistById = async (wishlist_id) => {
    try {
        const user = await wishlistModel.findOne({
            where: {
                wishlist_id: wishlist_id
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get wishlist in controller..!" + error);
        throw new Error('enable to create wishlist error')
    }
};

// GET WISH LIST

const getWishlistByUserId = async (user_id) => {

    try {
        const user = await wishlistModel.findOne({
            where: {
                user_id: user_id
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get wishlist in controller..!" + error);
        throw new Error('enable to create wishlist error')
    }
};

// GET ALL  WISH LIST

const getAllWishlist = async (userData) => {
    try {

        const user = await wishlistModel.findAll(userData);
        return user
    }
    catch (error) {
        console.log("error in get wishlist in controller..!", error);
        throw new Error('enable to get wishlist error')
    }
}

// SEARCH  WISH LIST

const searchWishlistDetails = async (userData) => {
    try {
        const data = {};
        if (userData.name) {
            data.name = userData.name
        }
        if (userData.wishlist_id) {
            data.wishlist_id = userData.wishlist_id
        }
        const user = await wishlistModel.findAll({
            where: data
        });
        return user
    } catch (error) {
        console.log("erorr in search wishlist in controller", error)
        errorResponse("error in search wishlist in controller")
    }
};

module.exports = {
    createWishlist,
    updateWishlist,
    deleteWishlist,
    getWishlistById,
    getWishlistByUserId,
    getAllWishlist,
    searchWishlistDetails

}