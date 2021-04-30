const express = require('express')
const router = express.Router()
const brandController =   require('../controllers/brand.controller');
// Retrieve all brands
router.get('/', brandController.findAll);
// Create a new brand
router.post('/', brandController.create);
// Retrieve a single brand with id
router.get('/:id', brandController.findById);
// Update a brand with id
router.put('/:id', brandController.update);
// Delete a brand with id
router.delete('/:id', brandController.delete);
module.exports = router