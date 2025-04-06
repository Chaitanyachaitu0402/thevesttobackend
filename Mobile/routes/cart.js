const cartService = require('../services/cart');
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

router.post('/create-cart', upload.single("cart_image"), async (req, res) => {
    const response = await cartService.createCart(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// UPDATE CART

router.post('/update-cart', upload.single("cart_image"), async (req, res) => {
    const response = await cartService.updateCart(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// DELETE CART

router.post('/delete-cart-cart-id', async (req, res) => {
    const response = await cartService.deleteCartbyCartid(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// DELETE CART

router.post('/delete-cart-user-id', async (req, res) => {
    const response = await cartService.deleteCartbyUserid(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET CART

router.post('/get-cart-by-cart-id', async (req, res) => {
    const response = await cartService.getCartByCartId(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET CART

router.post('/get-cart-by-user-id', async (req, res) => {
    const response = await cartService.getCartByUserId(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET CART IMAGE BY ID

router.get('/get-cart-image-by-id', async (req, res) => {
    try {
        const cartId = req.query.id; // Assuming the cart ID is passed as a query parameter
        const response = await cartService.getBeveragesImageById(cartId);

        if (response.success) {
            res.writeHead(200, {
                'Content-Type': 'image/jpeg',
                'Content-Length': response.data.length,
            });
            res.end(response.data); // response.data should be the image buffer
        } else {
            res.status(500).json({ success: false, message: response.message });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'An error occurred while retrieving the image' });
    }
});

// GET ALL CART

router.post('/get-all-cart', async (req, res) => {
    const response = await cartService.getAllCart(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// SEARCH CART DETAILS

router.post('/search-cart', async (req, res) => {
    const response = await cartService.searchCartDetails(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});


module.exports = router;