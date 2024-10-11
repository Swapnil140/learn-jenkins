const express = require('express');
const router = express.Router();
const squareClient = require("../common/square");

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

// Create payment
router.get('/get-locations',async function (req, res, next) {
    try {
        const location = await squareClient.getLocations();
        res.status(200).json({
            "data": location,
            "message": "success"
        });
    } catch (error) {
        console.log("Create payment error >>>> ",error);
        res.status(500).json({
            "message": error.result
        });
    }
});

module.exports = router;
