const coupons_controller = require("../controller/coupons");
const shortUUID = require('short-uuid');
const { verifyToken } = require("./jwttoken")
const { successResponse, errorResponse } = require("./response")
const { deleteImage } = require("./deleteimages")

// CREATE BRAND

const createCoupon = async (userData) => {
    try {
        const translator = shortUUID(); 
        const userId = translator.new(); 
        userData.body.coupon_id = userId;

        const token = userData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role == "admin") {

            if (userData.file) {
                userData.body.coupon_image = userData.file.filename
            }

            const response = await coupons_controller.createCoupon(userData.body);
            return successResponse(response);
        }else{
            return errorResponse("access denaine.........!")
        }
    }
    catch (error) {
        console.log("Error in create coupon in services..", error)
        return errorResponse("Error in create coupon in services..")
    }
}

// UPDATE BRAND

const updateCoupon = async (userData) => {
    try {
        const token = userData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role == "admin") {

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
        return errorResponse("access denaine....!")

    } catch (error) {
        console.log("Error in update coupon in servicess.....!", error)
        return errorResponse("Error in update coupon in servicess")
    }
};




const updateCouponByCode = async (userData) => {
    try {
        const token = userData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData.role == "admin") {

            // if (userData.file) {
            //     const getUserDate = await coupons_controller.getCouponByCode(userData.body.coupon_code)

            //     if (getUserDate.coupon_image !== null) {
            //         await deleteImage(getUserDate.coupon_image)
            //         userData.body.coupon_image = userData.file.filename
            //     }
            //     else {
            //         userData.body.coupon_image = userData.file.filename
            //     }
            // }
            const updatedData = await coupons_controller.updateCouponByCode(userData.body.coupon_code, userData.body)
            return successResponse(updatedData)
        }
        return errorResponse("access denied....!")

    } catch (error) {
        console.log("Error in update coupon in servicess.....!", error)
        return errorResponse("Error in update coupon in servicess")
    }
};

// DELETE BRAND

const deleteCoupon = async (userData) => {
    try {
        const token = userData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }

        if (decodedData.role == "admin") {
            const deletedData = await coupons_controller.deleteCoupon(userData.body.coupon_id)
            return successResponse(deletedData)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in delete coupon in  servicess.....!", error)
        return errorResponse("Error in delete coupon in servicess")
    }
};



const deleteCouponByCode = async (userData) => {
    try {
        const token = userData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }

        if (decodedData.role == "admin") {
            const deletedData = await coupons_controller.deleteCouponByCode(userData.body.coupon_code)
            return successResponse(deletedData)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in delete coupon in  servicess.....!", error)
        return errorResponse("Error in delete coupon in servicess")
    }
};

// GET BRAND BY ID

const getCouponById = async (userData) => {
    try {
        const token = userData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData) {
            const response = await coupons_controller.getCouponById(userData.body.coupon_id)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id coupon in  servicess.....!", error)
        return errorResponse("Error in get by id coupon in servicess")
    }
};



const getCouponByCode = async (userData) => {
    try {
        const token = userData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData) {
            const response = await coupons_controller.getCouponByCode(userData.body.coupon_code)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id coupon in  servicess.....!", error)
        return errorResponse("Error in get by id coupon in servicess")
    }
};

// GET ALL BRAND

const getAllCoupon = async (userData) => {
    try {
        // const token = userData.headers.authorization;
        // if (!token) {
        //     return errorResponse("Missing Token")
        // }
        // const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        // if (decodedData == "invalidtoken") {
        //     return errorResponse(decodedData)
        // }
        // if (decodedData) {
                    const now = new Date(); // Get the current date and time
                    now.setHours(0, 0, 0, 0); // Normalize current date to midnight
                    
                    // Fetch coupons where expiry_date matches the provided expiry_date
                    const coupons = await coupons_controller.getAllCoupon(userData);
                   
                    // Check if the result is an array
                    if (!Array.isArray(coupons)) {
                        throw new Error("Expected an array of coupons.");
                    }
            
                    let deletedCount = 0;
            
                    // Iterate over each coupon
                    for (const coupon of coupons) {
                        const couponExpiryDate = new Date(coupon.expiry_date);
                        couponExpiryDate.setHours(0, 0, 0, 0); // Normalize coupon expiry date to midnight
                        
                        // Compare the coupon's expiry_date with the current date
                        if (couponExpiryDate.getDate() === now.getDate()) {
                            await coupons_controller.deleteCoupon(coupon.coupon_id);
                            deletedCount++;
                        }
                    }
                    const remainingCoupons = await coupons_controller.getAllCoupon(userData);
                    // Return a success response with the count of deleted coupons
                    return successResponse({ deletedCount,remainingCoupons});
        // }

    } catch (error) {
        console.log("Error in get all coupon in servicess.....!", error)
        return errorResponse("Error in get all coupon in servicess")
    }
};

// SEARCH BRAND DETAILS

const searchCouponDetails = async (userData) => {
    try {
        const token = userData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        if (decodedData) {
            const Response = await coupons_controller.searchCouponDetails(userData.body)
            return successResponse(Response)
        }
        return errorResponse("access denied...!")
    } catch (error) {
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
 searchCouponDetails,
 deleteCouponByCode,
 updateCouponByCode,
 getCouponByCode

}