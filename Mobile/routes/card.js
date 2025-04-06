const cardService = require('../services/card');
const route = require('express');
const router = route.Router();


// CREATE CARD

router.post('/create-card', async (req, res) => {
    const response = await cardService.createCard(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// UPDATE CARD

router.post('/update-card', async (req, res) => {
    const response = await cardService.updateCard(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// DELETE CARD

router.post('/delete-card-by-id', async (req, res) => {
    const response = await cardService.deleteCard(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// DELETE CARD BY USER ID

router.post('/delete-card-by-user-id', async (req, res) => {
    const response = await cardService.deleteCartByUserId(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET CARD BY ID 

router.post('/get-card-by-id', async (req, res) => {
    const response = await cardService.getCardById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET CARD BY USER ID

router.post('/get-card-user-by-id', async (req, res) => {
    const response = await cardService.getCardUserById(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET ALL CARD 

router.post('/get-all-card', async (req, res) => {
    const response = await cardService.getAllCard(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET ALL CARD BASED ON THE USER ID 

router.post('/get-all-card-user-id', async (req, res) => {
    const response = await cardService.getAllCardByUserId(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});


module.exports = router;