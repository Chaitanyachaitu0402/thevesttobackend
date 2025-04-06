const { json } = require('body-parser');
const categoryService = require('../services/categories');
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


//  CREATE CART

router.post('/create-categories', upload.single("categories_image"), async (req, res) => {
    const response = await categoryService.createCategories(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// UPDATE CART

router.post('/update-categories', upload.single("categories_image"), async (req, res) => {
    const response = await categoryService.updateCategories(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// DELETE CART

router.post('/delete-categories-id', async (req, res) => {
    const response = await categoryService.deleteCategories(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET CATEGORIES

router.post('/get-categories-by-Id', async (req, res) => {
    const response = await categoryService.getCategoriesById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET ALL CATEGORIES

router.post('/get-all-categories', async (req, res) => {
    const response = await categoryService.getAllCategories(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// SEARCH CATEGORIES DETAILS

router.post('/search-categories', async (req, res) => {
    const response = await categoryService.searchCategoriesDetails(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// COUNT CATEGORIES

router.post('/count-categories', async (req, res) => {
    const response = await categoryService.countCategories(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});


// BULK UPLOAD PRODUCTS FROM CSV

router.post('/bulk-upload-category', upload.single("csv_file"), async (req, res) => {
   
        const response = await categoryService.bulkUploadCategory(req);
        if (response.success) {
            res.json(response)
        } else {
            res.status(500).json(response);
        }
})

module.exports = router;