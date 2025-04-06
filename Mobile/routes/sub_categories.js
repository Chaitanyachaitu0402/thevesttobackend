const subcategoryService = require('../services/sub_categories');
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

router.post('/create-sub-categories', upload.single("sub_categories_image"), async (req, res) => {
    const response = await subcategoryService.createSubCategories(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// UPDATE CART

router.post('/update-sub-categories', upload.single("sub_categories_image"), async (req, res) => {
    const response = await categoryService.updateSubCategories(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// DELETE CART

router.post('/delete-sub-categories-id', async (req, res) => {
    const response = await subcategoryService.deleteSubCategories(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});


// GET  SUB CATEGORIES

router.post('/get-sub-categories-by-Id', async (req, res) => {
    const response = await subcategoryService.getSubCategoriesById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET ALL SUB CATEGORIES

router.post('/get-all-sub-categories', async (req, res) => {
    const response = await subcategoryService.getAllSubCategories(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// SEARCH SUB CATEGORIES DETAILS

router.post('/search-sub-categories', async (req, res) => {
    const response = await subcategoryService.searchSubCategoriesDetails(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// COUNT SUB CATEGORIES

router.post('/count-subcategories', async (req, res) => {
    const response = await subcategoryService.countSubCategories(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});


module.exports = router;