const couponService = require('../services/coupons');
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

router.post('/create-coupon', upload.single("coupon_image"), async (req, res) => {
    const response = await couponService.createCoupon(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// UPDATE BRAND

router.post('/update-coupon', upload.single("coupon_image"), async (req, res) => {
    const response = await couponService.updateCoupon(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// DELETE BRAND BY ID

router.post('/delete-coupon-by-id', async (req, res) => {
    const response = await couponService.deleteCoupon(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET BRAND

router.post('/get-coupon-by-id', async (req, res) => {
    const response = await couponService.getCouponById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET ALL BRAND 

router.post('/get-all-coupon', async (req, res) => {
    const response = await couponService.getAllCoupon(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// SEARCH BRAND

router.post("/search-coupon", async (req, res) => {
    let response = await couponService.searchCouponDetails(req);
    if (response.success) {
        res.json(response);
    } else {
        res.status(500).json(response);
    }
});

module.exports = router;