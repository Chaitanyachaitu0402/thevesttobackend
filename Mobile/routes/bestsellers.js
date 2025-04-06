const bestsellersService = require('../services/bestsellers');
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

router.post('/create-bestseller', upload.single("product_image"), async (req, res) => {
    const response = await bestsellersService.createBestSellers(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// UPDATE PRODUCT

router.post('/update-bestseller', upload.single("product_image"), async (req, res) => {
    const response = await bestsellersService.updateBestSellers(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// DELETE PRODUCT BY ID

router.post('/delete-bestseller-by-id', async (req, res) => {
    const response = await bestsellersService.deleteBestSellers(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// DELETE PRODUCT BY PRODUCT NAME

router.post('/delete-bestseller-by-name', async (req, res) => {
    const response = await bestsellersService.deleteBestSellersByName(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET PRODUCT

router.post('/get-bestseller-by-id', async (req, res) => {
    const response = await bestsellersService.getBestSellersById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET ALL PRODUCT 

router.post('/get-all-bestseller', async (req, res) => {
    const response = await bestsellersService.getAllBestSellers(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// SEARCH PRODUCT

router.post("/search-bestseller", async (req, res) => {
    let response = await bestsellersService.searchBestSellersDetails(req);
    if (response.success) {
        res.json(response);
    } else {
        res.status(500).json(response);
    }
});

module.exports = router;