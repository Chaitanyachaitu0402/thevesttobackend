const pincodeService = require('../services/pincode');
const route = require('express');
const router = route.Router();
const multer = require('multer');

// CREATE CARD

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './storege/userdp');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage });

router.post('/create-pincode',upload.single('Product_image'), async (req, res) => {
    const response = await pincodeService.createPincode(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// UPDATE CARD

router.post('/update-pincode',upload.single('Product_image'), async (req, res) => {
    const response = await pincodeService.updatePincode(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// DELETE CARD

router.post('/delete-pincode-by-id', async (req, res) => {
    const response = await pincodeService.deletePincode(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET CARD BY ID

router.post('/get-pincode-by-pincode', async (req, res) => {
    const response = await pincodeService.getPincodeByPincode(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});
router.post('/get-pincode-by-id', async (req, res) => {
    const response = await getPincodeById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET ALL CARD 

router.post('/get-all-pincode', async (req, res) => {
    const response = await pincodeService.getAllPincode(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});


module.exports = router;