const subheadingService = require('../services/subheadings');
const route = require('express');
const router = route.Router();

// CREATE CONTACT

router.post('/create-subheading', async (req, res) => {
    const response = await subheadingService.createSubHeading(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

router.post('/update-subheading', async (req, res) => {
    const response = await subheadingService.updateSubHeading(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})


router.post('/delete-subheading', async (req, res) => {
    const response = await subheadingService.deleteSubHeading(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
})

// GET CONTACT

router.post('/get-subheading-by-name', async (req, res) => {
    const response = await subheadingService.getSubHeadingByName(req);
    if (response.success) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});

// GET ALL CONTACT 

router.post('/get-all-subheading', async (req, res) => {
    const response = await subheadingService.getAllSubHeading(req);
    if (response) {
        res.json(response)
    } else {
        res.status(500).json(response);
    }
});


module.exports = router;