const express = require('express');
const { createRide, getRides ,getRideById } = require('../controllers/rideController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Route to create a new ride
router.post('/', authMiddleware, createRide);

// Route to get all rides
router.get('/', getRides);

router.get('/:id', getRideById);


module.exports = router;
