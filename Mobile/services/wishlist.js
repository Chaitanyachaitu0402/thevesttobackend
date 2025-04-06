const wishlist_Controller = require("../controller/wishlist");
const shortUUID = require('short-uuid');
const { successResponse, errorResponse } = require("./res");


// CREATE WISH LIST

const createWishlist = async (userData) => {
    try {
        const translator = shortUUID(); 
        const userId = translator.new(); 
        userData.body.wishlist_id = userId;

        if (userData.file) {
            userData.body.image = userData.file.filename
        }
        const response = await wishlist_Controller.createWishlist(userData.body);
        return successResponse(response);

    } catch (error) {
        console.log("Error in create wishlist in services..", error);
        return errorResponse("Error in create wishlist in services..");
    }
};

// UPDATE WISH LIST

const updateWishlist = async (userData) => {
    try {
        if (userData.file) {
            const getUserDate = await wishlist_Controller.getWishlistById(userData.body.wishlist_id);

            if (getUserDate.image !== null) {
                await deleteImage(getUserDate.image);
                userData.body.image = userData.file.filename;
            } else {
                userData.body.image = userData.file.filename;
            }
        }
        const updatedData = await wishlist_Controller.updateWishlist(userData.body.wishlist_id, userData.body);
        return successResponse(updatedData);
    }
    catch (error) {
        console.log("Error in update wishlist in services.....!", error);
        return errorResponse("Error in update wishlist in services");
    }
};

// DELETE WISH LIST

const deleteWishlist = async (userData) => {
    try {
        const deletedData = await wishlist_Controller.deleteWishlist(userData.body.wishlist_id, userData.body);
        return successResponse(deletedData);

    } catch (error) {
        console.log("Error in delete wishlist in services.....!", error);
        return errorResponse("Error in delete wishlist in services");
    }
};

// GET WISH LIST BY ID

const getWishlistById = async (userData) => {
    try {
        const response = await wishlist_Controller.getWishlistById(userData.body.wishlist_id);
        return successResponse(response);

    } catch (error) {
        console.log("Error in get by id wishlist in services.....!", error);
        return errorResponse("Error in get by id wishlist in services");
    }
};

// GET WISH LIST BY ID

const getWishlistByUserId = async (userData) => {
    try {
        const response = await wishlist_Controller.getWishlistByUserId(userData.body.user_id);
        return successResponse(response);

    } catch (error) {
        console.log("Error in get by id wishlist in services.....!", error);
        return errorResponse("Error in get by id wishlist in services");
    }
};

// GET ALL WISH LIST

const getAllWishlist = async (userData) => {
    try {

        const response = await wishlist_Controller.getAllWishlist(userData.body);
        return successResponse(response);

    } catch (error) {
        console.log("Error in get all wishlist in services.....!", error);
        return errorResponse("Error in get all wishlist in services");
    }
};

// SEARCH WISH LIST DETAILS

const searchWishlistDetails = async (userData) => {
    try {

        const Response = await wishlist_Controller.searchWishlistDetails(userData.body);
        return successResponse(Response);

    } catch (error) {
        console.log("Error in search wishlist in services.....!", error);
        return errorResponse("Error in search wishlist in services");
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
};
