const route = require('express');
const router = route.Router();
const { Gateway } = require('../services/gateway'); // Adjust path as per your SDK location


// Example endpoint to handle payment requests
router.post('/pay', async (req, res) => {
    try {
        const reqFields = req.body; // Ensure reqFields are correctly formatted as per Takepayments SDK
        const response = await Gateway.directRequest(reqFields);

        console.log('Payment Response:', response);
        res.json(response); // Send response back to client
    } catch (error) {
        console.error('Payment Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;