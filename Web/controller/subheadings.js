const { sequelize } = require('../../db')
const subheadingModel = require('../../model/subheadings')(sequelize)
const { Op } = require("sequelize");
const { errorResponse } = require('../services/response');


// CREATE CONTACT

const createSubHeading = async (userData) => {
    try {
        const newUser = await subheadingModel.create(userData);
        return newUser;
    }
    catch (error) {
        console.error("Error in create  sub headings details in controller", error);
        throw new Error("Error in create  sub headings in controller");
    }
};
// GET CONTACT

const updateSubHeading = async (id,userData) => {
    try {
        const user = await subheadingModel.update(userData,{
            where: {
                id:id
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get  sub headings in controller..!", error);
        throw new Error('enable to create  sub headings error')
    }
};

// GET CONTACT

const deleteSubHeading = async (id) => {
    try {
        const user = await subheadingModel.destroy({
            where: {
                id: id
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get  sub headings in controller..!", error);
        throw new Error('enable to create  sub headings error')
    }
};

// GET CONTACT

const getSubHeadingByName = async (name) => {
    try {
        const user = await subheadingModel.findOne({
            where: {
                name: name
            }
        })
        return user
    }
    catch (error) {
        console.log("error in get  sub headings in controller..!", error);
        throw new Error('enable to create  sub headings error')
    }
};

// GET ALL CONTACT

const getAllSubHeading = async (userData) => {
    try {

        const user = await subheadingModel.findAll(userData);
        return user
    }
    catch (error) {
        console.log("error in get  sub headings in controller..!", error);
        throw new Error('enable to create  sub headings error')
    }
}


module.exports = {
    createSubHeading,
    updateSubHeading,
    deleteSubHeading,
    getSubHeadingByName,
    getAllSubHeading
  }