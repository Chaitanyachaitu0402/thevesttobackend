const { json } = require('body-parser');
const householdService = require('../services/household');
const route = require('express');
const router = route.Router();
const multer = require('multer')
const path = require('path')

//IMAGE CONFRIGATIONS

const imageconfig = multer.diskStorage
    (
        {
            destination: (req, file, callback) => {
                callback(null, "./storage/userdp")
            },
            filename: (req, file, callback) => {
                callback(null, Date.now() + path.extname(file.originalname));
            }
        }
    )
var upload = multer(
    {
        storage: imageconfig,
        limits: {
            fileSize: 1000000000
        }
    }
);


//  CREATE HOUSEHOLD

router.post('/create-household',upload.single("product_image"), async (req, res) => {
    const response = await householdService.createHousehold(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})


// UPDATE HOUSEHOLD

router.post('/update-household', upload.single("product_image"), async (req, res) => {
    const response = await householdService.updateHousehold(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// DELETE HOUSEHOLD

router.post('/delete-household', async (req, res) => {
    const response = await householdService.deleteHousehold(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET HOUSEHOLD

router.post('/get-household-by-Id', async (req, res) => {
    const response = await householdService.getHouseholdById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});



// GET ALL HOUSEHOLD

router.post('/get-all-household', async (req, res) => {
    const response = await householdService.getAllHousehold(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});


// SEARCH HOUSEHOLD DETAILS

router.post('/search-household', async (req, res) => {
    const response = await householdService.searchHouseholdDetails
    (req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// COUNT HOUSEHOLD

router.post('/count-household', async (req, res) => {
    const response = await householdService.countHousehold(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});


module.exports = router;