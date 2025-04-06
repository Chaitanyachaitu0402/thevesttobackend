const rewards_controller = require("../controller/rewards");
const shortUUID = require('short-uuid');
const { successResponse, errorResponse } = require("./res")

// CREATE BRAND

const createRewards = async (userData) => {
    try {
        const translator = shortUUID(); 
        const userId = translator.new(); 
        userData.body.id = userId;
          
            const response = await rewards_controller.createRewards(userData.body);
            return successResponse(response);
      
        
    }
    catch (error) {
        console.log("Error in create rewards in services..", error)
        return errorResponse("Error in create rewards in services..")
    }
}

// UPDATE BRAND

const updateRewards = async (userData) => {
    try {
        

            const updatedData = await rewards_controller.updateRewards(userData.body.id, userData.body)
            return successResponse(updatedData)
        }

     catch (error) {
        console.log("Error in update rewards in servicess.....!", error)
        return errorResponse("Error in update rewards in servicess")
    }
};

// DELETE BRAND

const deleteRewards = async (userData) => {
    try {
       
            const deletedData = await rewards_controller.deleteRewards(userData.body.id)
            return successResponse(deletedData)
        }
    catch (error) {
        console.log("Error in delete rewards in  servicess.....!", error)
        return errorResponse("Error in delete rewards in servicess")
    }
};

// GET BRAND BY ID

const getRewardsById = async (userData) => {
    try {
        
            const response = await rewards_controller.getRewardsById(userData.body.user_id)
            return successResponse(response)
        }
     catch (error) {
        console.log("Error in get by id rewards in  servicess.....!", error)
        return errorResponse("Error in get by id rewards in servicess")
    }
};

// GET ALL BRAND

const getAllRewards = async (userData) => {
    try {
       
            const response = await rewards_controller.getAllRewards(userData.body)
            return successResponse(response)
        }

     catch (error) {
        console.log("Error in get all rewards in servicess.....!", error)
        return errorResponse("Error in get all rewards in servicess")
    }
};

// SEARCH BRAND DETAILS

const searchRewardsDetails = async (userData) => {
    try {
        
            const Response = await rewards_controller.searchRewardsDetails(userData.body)
            return successResponse(Response)
        }
     catch (error) {
        console.log("Error in search rewards in  servicess.....!", error)
        return errorResponse("Error in search rewards in  servicess")
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