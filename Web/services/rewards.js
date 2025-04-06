const rewards_controller = require("../controller/rewards");
const shortUUID = require('short-uuid');
const { verifyToken } = require("./jwttoken")
const { successResponse, errorResponse } = require("./response")

// Helper function to update all users' rewards
const updateAllUsersRewards = async (fieldsToUpdate) => {
    try {
        const allUsers = await rewards_controller.getAllRewards({});
        const updatePromises = allUsers.map(user => {
            return rewards_controller.updateRewards(user.id, fieldsToUpdate);
        });
        await Promise.all(updatePromises);
    } catch (error) {
        console.error("Error updating all users' rewards", error);
        throw new Error("Error updating all users' rewards");
    }
};

// CREATE REWARDS
const createRewards = async (userData) => {
    try {
        const translator = shortUUID();
        const userId = translator.new();
        userData.body.id = userId;

        const token = userData.headers.authorization;
        if (!token) {
            return errorResponse("Missing Token")
        }
        const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
        if (decodedData == "invalidtoken") {
            return errorResponse(decodedData)
        }
        // if (decodedData.role == "admin") {
            const response = await rewards_controller.createRewards(userData.body);

            // Apply the rewards to all users if the admin set these fields
            const { pointstopounds, poundstopoints, poundstogather } = userData.body;
            if (pointstopounds || poundstopoints || poundstogather) {
                await updateAllUsersRewards({ pointstopounds, poundstopoints, poundstogather });
            }

            return successResponse(response);
        // } else {
        //     return errorResponse("access denied.........!")
        // }
    } catch (error) {
        console.log("Error in create rewards in services..", error)
        return errorResponse("Error in create rewards in services..")
    }
}



// const createRewards = async (userData) => {
//     try {
//         const translator = shortUUID(); 
//         const userId = translator.new(); 
//         userData.body.id = userId;

//         const token = userData.headers.authorization;
//         if (!token) {
//             return errorResponse("Missing Token")
//         }
//         const decodedData = await verifyToken(token, process.env.JWT_TOKEN_SECRETE_KEY)
//         if (decodedData == "invalidtoken") {
//             return errorResponse(decodedData)
//         }
//         // if (decodedData.role == "admin") {

          
//             const response = await rewards_controller.createRewards(userData.body);
//             return successResponse(response);
//         // }else{
//         //     return errorResponse("access denaine.........!")
//         // }
//     }
//     catch (error) {
//         console.log("Error in create rewards in services..", error)
//         return errorResponse("Error in create rewards in services..")
//     }
// }


// UPDATE REWARDS
const updateRewards = async (userData) => {
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

            const updatedData = await rewards_controller.updateRewards(userData.body.user_name, userData.body);

            // Apply the updates to all users if the admin updated these fields
            const { pointstopounds, poundstopoints, poundstogather } = userData.body;
            if (pointstopounds || poundstopoints || poundstogather) {
                await updateAllUsersRewards({ pointstopounds, poundstopoints, poundstogather });
            }

            return successResponse(updatedData);
        }
        return errorResponse("access denied....!")

    } catch (error) {
        console.log("Error in update rewards in services.....!", error)
        return errorResponse("Error in update rewards in services")
    }
};

// DELETE REWARDS

const deleteRewards = async (userData) => {
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
            const deletedData = await rewards_controller.deleteRewards(userData.body.user_name)
            return successResponse(deletedData)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in delete rewards in services.....!", error)
        return errorResponse("Error in delete rewards in services")
    }
};

// GET REWARDS BY ID

const getRewardsById = async (userData) => {
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
            const response = await rewards_controller.getRewardsById(userData.body.user_id)
            return successResponse(response)
        }
    } catch (error) {
        console.log("Error in get by id rewards in services.....!", error);
        return errorResponse("Error in get by id rewards in services")
    }
};

// GET ALL REWARDS

const getAllRewards = async (userData) => {
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
            const response = await rewards_controller.getAllRewards(userData.body)
            return successResponse(response)
        }

    } catch (error) {
        console.log("Error in get all rewards in services.....!", error);
        return errorResponse("Error in get all rewards in services")
    }
};

// SEARCH REWARDS DETAILS

const searchRewardsDetails = async (userData) => {
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
            const Response = await rewards_controller.searchRewardsDetails(userData.body)
            return successResponse(Response)
        }
        return errorResponse("access denied...!")
    } catch (error) {
        console.log("Error in search rewards in services.....!", error)
        return errorResponse("Error in search rewards in services")
    }
};

module.exports = {
    createRewards,
    updateRewards,
    deleteRewards,
    getRewardsById,
    getAllRewards,
    searchRewardsDetails
}