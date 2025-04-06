const wishlistService = require('../services/wishlist');
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
        })
var upload = multer(
    {
        storage: imageconfig,
        limits: {
            fileSize: 1000000000
        }
    });

//  CREATE WISH LIST

router.post('/create-wishlist', upload.single("image"), async (req, res) => {
    const response = await wishlistService.createWishlist(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// UPDATE WISH LIST

router.post('/update-wishlist', upload.single("image"), async (req, res) => {
    const response = await wishlistService.updateWishlist(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// DELETE WISH LIST

router.post('/delete-wishlist', async (req, res) => {
    const response = await wishlistService.deleteWishlist(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET WISH LIST BY ID

router.post('/get-wishlist-by-id', async (req, res) => {
    const response = await wishlistService.getWishlistById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET WISH LIST BY USER ID

router.post('/get-wishlist-by-user-id', async (req, res) => {
    const response = await wishlistService.getWishlistByUserId(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET ALL WISH LIST

router.post('/get-all-wishlist', async (req, res) => {
    const response = await wishlistService.getAllWishlist(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// SEARCH WISH LIST DETAILS

router.post('/search-wishlist', async (req, res) => {
    const response = await wishlistService.searchWishlistDetails(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});


module.exports = router;