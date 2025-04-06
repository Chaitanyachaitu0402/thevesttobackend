const offersService = require('../services/offers');
const route = require('express');
const router = route.Router();
const multer = require('multer')
const path = require('path')

//IMAGE CONFRIGATIONS

const imageconfig = multer.diskStorage
    (
        {
            destination: (req, file, callback) => {
                callback(null, "./storege/userdp")
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

// CREATE PRODUCT

router.post('/create-offers', upload.single("image"), async (req, res) => {
    const response = await offersService.createOffers(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// UPDATE PRODUCT

router.post('/update-offers', upload.single("image"), async (req, res) => {
    const response = await offersService.updateOffers(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// DELETE PRODUCT BY ID

router.post('/delete-offers-by-id', async (req, res) => {
    const response = await offersService.deleteOffers(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET PRODUCT

router.post('/get-offers-by-id', async (req, res) => {
    const response = await offersService.getOffersById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET ALL PRODUCT 

router.post('/get-all-offers', async (req, res) => {
    const response = await offersService.getAllOffers(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// SEARCH PRODUCT

router.post("/search-offers", async (req, res) => {
    let response = await offersService.searchOffersDetails(req);
    if (response.success) {
        res.json(response);
    } else {
        res.status(500).json(response);
    }
});

module.exports = router;