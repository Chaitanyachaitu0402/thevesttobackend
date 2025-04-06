const { json } = require('body-parser');
const topcategories = require('../services/topcategory');
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

//  CREATE ORDERS

router.post('/create-topcategory',upload.single("category_image"), async (req, res) => {
    const response = await topcategories.createTopCategory(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})



router.post('/get-all-topcategory', async (req, res) => {
    const response = await topcategories.getAllTopCategory(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});



module.exports = router;