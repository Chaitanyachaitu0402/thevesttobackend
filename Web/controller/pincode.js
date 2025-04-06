const { sequelize } = require('../../db')
const pincodeModel = require('../../model/pincode')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../services/response');


// CREATE CARD

const createPincode = async (userData) => {
    try {
        const newUser = await pincodeModel.create(userData);
        return newUser;
    }
    catch (error) {
        console.error("Error in create Pincode details in controller", error);
        throw new Error("Error in create Pincode in controller");
    }
};

// UPDATE CARD

const updatePincode = async (Id, userData) => {
    try {
        const newUser = await pincodeModel.update(userData, {
            where: {
                Id: Id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in update Pincode in controller", error);
        throw new Error("Error update Pincode in controller");
    }
};

// DELETE CARD

const deletePincode = async (Id) => {
    try {
        const newUser = await pincodeModel.destroy({
            where: {
                Id: Id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in delete Pincode in controller", error);
        throw new Error("Error delete Pincode in controller");
    }
};

// GET CARD BY ID

const getPincodeByPincode = async (pincode) => {
    try {
        const user = await pincodeModel.findOne({
            where: {
                pincode: pincode
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get Pincode in controller..!", error);
        throw new Error('enable to  Pincode error')
    }
};

const getPincodeById = async (id) => {
    try {
        const response = await productModel.findOne({ where: { Id: id } });
        return response;
    } catch (error) {
        console.log("Error in getting pincode by id in controller.....", error);
        throw error;
    }
};

// GET ALL CARD

const getAllPincode = async (userData) => {
    try {
        const user = await pincodeModel.findAll(userData);
        return user
    }
    catch (error) {
        console.log("error in get Pincode in controller..!", error);
        throw new Error('enable to  Pincode error')
    }
}

module.exports = {
    createPincode,
    updatePincode,
    deletePincode,
    getPincodeByPincode,
    getAllPincode,
    getPincodeById,

}