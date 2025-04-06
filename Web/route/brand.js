const brandService = require('../services/brand');
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

// CREATE BRAND

router.post('/create-brand', upload.single("brand_image"), async (req, res) => {
    const response = await brandService.createBrand(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// UPDATE BRAND

router.post('/update-brand', upload.single("brand_image"), async (req, res) => {
    const response = await brandService.updateBrand(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// DELETE BRAND BY ID

router.post('/delete-brand-by-id', async (req, res) => {
    const response = await brandService.deleteBrand(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});



router.post('/delete-brand-by-name', async (req, res) => {
    const response = await brandService.deleteBrandByName(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET BRAND

router.post('/get-brand-by-id', async (req, res) => {
    const response = await brandService.getBrandById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET ALL BRAND 

router.post('/get-all-brand', async (req, res) => {
    const response = await brandService.getAllBrand(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// SEARCH BRAND

router.post("/search-brand", async (req, res) => {
    let response = await brandService.searchBrandDetails(req);
    if (response.success) {
        res.json(response);
    } else {
        res.status(500).json(response);
    }
});

module.exports = router;