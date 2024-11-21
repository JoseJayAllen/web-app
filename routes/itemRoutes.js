const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// Route to display items
router.get('/', itemController.getItems);

// Route to add an item (POST)
router.post('/add', itemController.addItem);

// Route to edit an item (PUT)
router.put('/edit/:id', itemController.updateItem);

// Route to delete an item (DELETE)
router.delete('/delete/:id', itemController.deleteItem);

module.exports = router;
