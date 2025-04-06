const { sequelize } = require('../../db')
const tcModel = require('../../model/t & c ')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../services/response');


// CREATE BANNER

const createTc = async (userData) => {
    try {
        const newUser = await tcModel.create(userData);
        return newUser;
    }
    catch (error) {
        console.error("Error in create t & c details in controller", error);
        throw new Error("Error in create t & c in controller");
    }
};

// UPDATE BANNER

const updateTc = async (heading, userData) => {
    try {
        const newUser = await tcModel.update(userData, {
            where: {
                heading: heading
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in update t & c in controller", error);
        throw new Error("Error update t & c in controller");
    }
};


const updateTcById = async (id, userData) => {
    try {
        const newUser = await tcModel.update(userData, {
            where: {
                id: id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in update t & c in controller", error);
        throw new Error("Error update t & c in controller");
    }
};

// DELETE BANNER

const deleteTc = async (heading) => {
    try {
        const newUser = await tcModel.destroy({
            where: {
                heading: heading
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in delete t & c in controller", error);
        throw new Error("Error delete t & c in controller");
    }
};



const deleteTcById = async (id) => {
    try {
        const newUser = await tcModel.destroy({
            where: {
                id: id
            }
        });
        return newUser;
    }
    catch (error) {
        console.error("Error in delete t & c in controller", error);
        throw new Error("Error delete t & c in controller");
    }
};

// GET BANNER

const getTcById = async (id) => {
    try {
        const user = await tcModel.findOne({
            where: {
                id: id
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get t & c in controller..!", error);
        throw new Error('enable to create t & c error')
    }
};

// Get all banners

const getallTc = async () => {
    try {
        const response = await tcModel.findAll();
        return response;
    } catch (error) {
        console.log("Error in getting all t & c in controller.....", error);
        throw error;
    }
};

// CREATE BANNER

const searchTc = async (userData) => {
    try {
        const newUser = await tcModel.create(userData.body);
        return newUser;
    }
    catch (error) {
        console.error("Error in create t & c details in controller", error);
        throw new Error("Error in create t & c in controller");
    }
};

module.exports = {
    createTc,
    updateTc,
    deleteTc,
    getTcById,
    getallTc,
    searchTc,
    deleteTcById,
    updateTcById

}