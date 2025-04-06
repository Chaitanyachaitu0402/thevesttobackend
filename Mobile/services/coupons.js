const coupons_controller = require("../controller/coupons");
const shortUUID = require('short-uuid');
const { successResponse, errorResponse } = require("./res")
const { deleteImage } = require("./deleteimages")

// CREATE BRAND

const createCoupon = async (userData) => {
    try {
        const translator = shortUUID(); 
        const userId = translator.new(); 
        userData.body.coupon_id = userId;

            if (userData.file) {
                userData.body.coupon_image = userData.file.filename
            }

            const response = await coupons_controller.createCoupon(userData.body);
            return successResponse(response);
       
        }
    
    catch (error) {
        console.log("Error in create coupon in services..", error)
        return errorResponse("Error in create coupon in services..")
    }
}

// UPDATE BRAND

const updateCoupon = async (userData) => {
    try {
        
            if (userData.file) {
                const getUserDate = await coupons_controller.getCouponById(userData.body.coupon_id)

                if (getUserDate.coupon_image !== null) {
                    await deleteImage(getUserDate.coupon_image)
                    userData.body.coupon_image = userData.file.filename
                }
                else {
                    userData.body.coupon_image = userData.file.filename
                }
            }
            const updatedData = await coupons_controller.updateCoupon(userData.body.coupon_id, userData.body)
            return successResponse(updatedData)
        }

     catch (error) {
        console.log("Error in update coupon in servicess.....!", error)
        return errorResponse("Error in update coupon in servicess")
    }
};

// DELETE BRAND

const deleteCoupon = async (userData) => {
    try {
        
            const deletedData = await coupons_controller.deleteCoupon(userData.body.coupon_id)
            return successResponse(deletedData)
        }
     catch (error) {
        console.log("Error in delete coupon in  servicess.....!", error)
        return errorResponse("Error in delete coupon in servicess")
    }
};

// GET BRAND BY ID

const getCouponById = async (userData) => {
    try {
       
            const response = await coupons_controller.getCouponById(userData.body.coupon_id)
            return successResponse(response)
        }
    catch (error) {
        console.log("Error in get by id coupon in  servicess.....!", error)
        return errorResponse("Error in get by id coupon in servicess")
    }
};

// GET ALL BRAND

const getAllCoupon = async (userData) => {
    try {
       
            const response = await coupons_controller.getAllCoupon(userData.body)
            return successResponse(response)
        }

     catch (error) {
        console.log("Error in get all coupon in servicess.....!", error)
        return errorResponse("Error in get all coupon in servicess")
    }
};

// SEARCH BRAND DETAILS

const searchCouponDetails = async (userData) => {
    try {
        
            const Response = await coupons_controller.searchCouponDetails(userData.body)
            return successResponse(Response)
        }
     catch (error) {
        console.log("Error in search coupon in  servicess.....!", error)
        return errorResponse("Error in search coupon in  servicess")
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