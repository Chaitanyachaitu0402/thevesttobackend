const user_Controller = require("../controller/user");
const bcrypt = require("bcrypt");
const shortUUID = require('short-uuid');
const { successResponse, errorResponse } = require("./res");
const { deleteImage } = require("./deleteimages");
const fs = require('fs');

// CREATE USER

const createUser = async (userData) => {
    try {
        const translator = shortUUID(); 
        const userId = translator.new(); 
        userData.body.user_id = userId;

        if (userData.body.password == userData.body.confirm_password) {
            userData.body.password = await passwordEncryption(userData.body.password);
            if (userData.file) {
                userData.body.profilepic = userData.file.filename
            }
            const response = await user_Controller.createUser(userData.body);
            return successResponse(response);
        }
    } catch (error) {
        console.log("Error in create user in services..", error);
        return errorResponse("Error in create user in services..");
    }
};

// LOGIN USER

const userLogin = async (userData) => {
    try {
        const useremailController = await user_Controller.userLogin(userData.email);
        if (useremailController) {
            const validatePassword = await comparePassword(
                userData.password, useremailController.password
            );
            if (validatePassword) {
                return successResponse(useremailController);
            } else {
                return errorResponse("Invalid password");
            }
        } else {
            return errorResponse("Invalid Email");
        }

    } catch (error) {
        console.log("Error in user login services...!", error);
        return errorResponse("Error in user login services....");
    }
};

// UPDATE USER

const updateUser = async (userData) => {
    try {
        // Fetch the existing user data
        const getUserDate = await user_Controller.getUserById(userData.body.user_id);

        // Check and update profile picture if provided
        if (userData.file) {
            if (getUserDate.profilepic !== null) {
                await deleteImage(getUserDate.profilepic);
            }
            userData.body.profilepic = userData.file.filename;
        }

        // Update user data in the database
        const updatedData = await user_Controller.updateUser(userData.body.user_id, userData.body);

        // Ensure all fields in response are taken from the updated data
        return successResponse({
            message: "Successfully updated"

        });
    } catch (error) {
        console.log("Error in update User in services.....!", error);
        return errorResponse("Error in update User in services");
    }
};

// DELETE USER

const deleteUser = async (userData) => {
    try {

        const deletedData = await user_Controller.deleteUser(userData.body.user_id, userData.body);
        return successResponse(deletedData);

    } catch (error) {
        console.log("Error in delete User in services.....!", error);
        return errorResponse("Error in delete User in services");
    }
};

// GET USER BY ID

const getUserById = async (userData) => {
    try {
        const response = await user_Controller.getUserById(userData.body.user_id);
        return successResponse(response);

    } catch (error) {
        console.log("Error in get by id User in services.....!", error);
        return errorResponse("Error in get by id User in services");
    }
};

// GET ALL USERS

const getAllUser = async (userData) => {
    try {
        const user = await user_Controller.getUserById(userData.body.user_id);
        if (user.role == "admin") {
            const response = await user_Controller.getAllUser(userData.body);
            return successResponse(response);
        }
        else {
            return errorResponse("Access denied...!");
        }
    } catch (error) {
        console.log("Error in get all User in services.....!", error);
        return errorResponse("Error in get all User in services");
    }
};

// SEARCH USER DETAILS

const searchUserDetails = async (userData) => {
    try {

        const employeeResponse = await user_Controller.searchUserDetails(userData.body);
        return successResponse(employeeResponse);

    } catch (error) {
        console.log("Error in search User in services.....!", error);
        return errorResponse("Error in search user in services");
    }
};

// COUNT USER

const countUserDetails = async (userData) => {
    try {
        const decodedData = await user_Controller.getUserById(userData.body.user_id);

        if (decodedData.role == "admin") {
            const response = await user_Controller.countUserDetails(userData.body);
            return successResponse(response);
        }
        return errorResponse("Access denied...!");
    } catch (error) {
        console.log("Error in count in services.....!", error);
        return errorResponse("Error in count in services");
    }
};

// RESET PASSWORD

const resetPassword = async (userData) => {
    try {
        const getUserDate = await user_Controller.getUserById(userData.body.user_id);
        const validatePassword = await comparePassword(
            userData.body.password,
            getUserDate.password
        );

        if (validatePassword) {
            if (userData.body.newpassword == userData.body.confirmpassword) {
                const hashedpassword = await passwordEncryption(userData.body.newpassword);
                const newpassword = { password: hashedpassword };
                const updateResetpassword = await user_Controller.updateUser(getUserDate.user_id, newpassword);
                return successResponse(updateResetpassword);
            } else {
                return errorResponse("Confirm password does not match");
            }
        } else {
            return errorResponse("Invalid password");
        }
    } catch (error) {
        console.log("Error in reset password in services.....!", error);
        return errorResponse("Error in reset password in services");
    }
};

// RESET PASSWORD

const pargotPassword = async (userData) => {
    try {

        const getUserData = await user_Controller.pargotPassword(userData.body.email)
        if (getUserData) {
            if (userData.body.newpassword == userData.body.confirmpassword) {
                const hashedpassword = await passwordEncryption(userData.body.newpassword)
                const newpassword = { password: hashedpassword }
                const updateResetpassword = await user_Controller.updateUser(getUserData.user_id, newpassword)
                return successResponse(updateResetpassword)
            }
            else {
                return errorResponse("conform password is not matched")
            }
        }
        else {
            return errorResponse("invalied Password")
        }
    }
    catch (error) {
        console.log("Error in reset password in  servicess.....!", error)
        return errorResponse("Error in reset password in  servicess")
    }
}

// COMPARE PASSWORD

const comparePassword = async (password, encryptedPassword) => {
    try {
        const validatePassword = await bcrypt.compare(password, encryptedPassword);
        return validatePassword;
    } catch (error) {
        console.log("Error in the compare password");
    }
};

// PASSWORD ENCRYPTION

const passwordEncryption = async (password) => {
    const saltRound = 10;
    const hashcode = await bcrypt.hash(password, saltRound);
    return hashcode;
};

const CheckEmail = async (userData) => {
    try {
        const Response = await user_Controller.getUserByEmail(userData.body.email);

        if (!Response) {
            // If no user is found, return an error response
            return errorResponse("Invalid email");
        }

        // If a user is found, return a success response
        return successResponse(Response);
       
    } catch (error) {
        console.log("Error in search User in services.....!", error);
        return errorResponse("Error in search user in services");
    }
};



module.exports = {
    createUser,
    userLogin,
    updateUser,
    searchUserDetails,
    deleteUser,
    countUserDetails,
    getAllUser,
    getUserById,
    resetPassword,
    pargotPassword,
    CheckEmail

};
