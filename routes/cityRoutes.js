const express = require('express');
const cityController = require('../controllers/cityController');

const router = express.Router();

// Add a new city
router.post('/', cityController.addCity);

// Update an existing city
router.put('/:id', cityController.updateCity);

// Delete a city
router.delete('/:id', cityController.deleteCity);

// Get cities (with pagination, filtering, sorting, searching, and projection)
router.get('/', cityController.getCities);

module.exports = router;