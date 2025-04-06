const sub_categoriesService = require('../services/sub_categories_2');
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

// CREATE  SUB CATEGORIES

router.post('/create-sub-categories-2', upload.single("sub_categories_image"), async (req, res) => {
    const response = await sub_categoriesService.createSubCategories(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// UPDATE  SUB CATEGORIES

router.post('/update-sub-categories-2', upload.single("sub_categories_image"), async (req, res) => {
    const response = await sub_categoriesService.updateSubCategories(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// DELETE  SUB CATEGORIES

router.post('/delete-sub-categories-2-by-id', async (req, res) => {
    const response = await sub_categoriesService.deleteSubCategories(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET  SUB CATEGORIES

router.post('/get-sub-categories-2-by-id', async (req, res) => {
    const response = await sub_categoriesService.getSubCategoriesById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET ALL  SUB CATEGORIES 

router.get('/get-all-sub-categories-2', async (req, res) => {
    const response = await sub_categoriesService.getAllSubCategories(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// SEARCH  SUB CATEGORIES

router.post("/search-sub-categories-2", async (req, res) => {
    let response = await sub_categoriesService.searchSubCategoriesDetails(req);
    if (response.success) {
        res.json(response);
    } else {
        res.status(500).json(response);
    }
});



router.post('/bulk-upload-category-2', upload.single("csv_file"), async (req, res) => {
    
    const response = await sub_categoriesService.bulkUploadCategory(req);
    if (response.success) {
        res.json(response);
      }  else
       {
        res.status(500).json(response);
      }
});



module.exports = router;