const express = require('express')
const router = express.Router()
const ratingListController =   require('../controllers/rating-list.controller');
// Retrieve all ratinglists
router.get('/', ratingListController.findAll);
// Create a new ratinglist
router.post('/', ratingListController.create);
// Retrieve a single ratinglist with id
router.get('/:id', ratingListController.findById);
// Update a ratinglist with id
router.put('/:id', ratingListController.update);
// Delete a ratinglist with id
router.delete('/:id', ratingListController.delete);
// Delete a brand with id
router.delete('/deletebrand/:id', ratingListController.deletebrand);
// Update a ratinglist with id
router.put('/brand/:id', ratingListController.updatebrand);
module.exports = router