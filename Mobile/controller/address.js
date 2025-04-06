const { sequelize } = require('../../db')
const addressModel = require('../../model/address')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../services/res');

// CREATE ADDRESS

const createAddress = async (userData) => {
    try {
        const newUser = await addressModel.create(userData);
        return newUser;
    }
    catch (error) {
        console.error("Error in create address details in controller", error);
        throw new Error("Error in create address details in controller");
    }
};


// UPDATE ADDRESS

const updateAddress = async (address_id, userData) => {
    try {
        const newUser = await addressModel.update(userData, {
            where: {
                address_id: address_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in update address in controller", error);
        throw new Error("Error update address");
    }
};

// DELETE ADDRESS

const deleteAddress = async (address_id) => {
    try {
        const newUser = await addressModel.destroy({
            where: {
                address_id: address_id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in delete address in controller", error);
        throw new Error("Error delete address");
    }
};

// GET ADDRESS

const getAddressById = async (address_id) => {

    try {
        const user = await addressModel.findOne({
            where: {
                address_id: address_id
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get address in controller..!" + error);
        throw new Error('enable to create address error')
    }
};


// GET ADDRESS

const getAddressByUserId = async (user_id) => {

    try {
        const user = await addressModel.findAll({
            where: {
                user_id: user_id
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get address in controller..!" + error);
        throw new Error('enable to create address error')
    }
};

// GET ALL  ADDRESS

const getAllAddress = async (userData) => {
    try {

        const user = await addressModel.findAll(userData);
        return user
    }
    catch (error) {
        console.log("error in get address in controller..!", error);
        throw new Error('enable to get address error')
    }
}

// SEARCH  ADDRESS

const searchAddressDetails = async (userData) => {
    try {

        const data = {};
        if (userData.name) {
            data.name = userData.name
        }
        if (userData.area) {
            data.area = userData.area
        }
        if (userData.city) {
            data.city = userData.city
        }
        if (userData.state) {
            data.state = userData.state
        }
        if (userData.pincode) {
            data.pincode = userData.pincode
        }
        if (userData.address_id) {
            data.address_id = userData.address_id
        }
        const user = await addressModel.findAll({
            where: data
        });
        return user


    } catch (error) {
        console.log("erorr in search address in controller", error)
        errorResponse("error in search address in controller")
    }
};

module.exports = {
    createAddress,
    updateAddress,
    deleteAddress,
    getAllAddress,
    searchAddressDetails,
    getAddressById,
    getAddressByUserId

}