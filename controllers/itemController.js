const itemModel = require('../models/itemModel');

// Display all items with pagination
exports.getItems = (req, res) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 4; // Default to 10 items per page

    // Get the total item count for pagination
    itemModel.getItemCount((err, count) => {
        if (err) {
            return res.status(500).send('Error retrieving item count');
        }

        // Calculate the total number of pages
        const totalPages = Math.ceil(count / limit);

        // Fetch items with pagination
        itemModel.getItemsWithPagination(page, limit, (err, items) => {
            if (err) {
                return res.status(500).send('Error retrieving items');
            }

            // Pass the data to the view
            res.render('index', { items, page, limit, totalPages });
        });
    });
};

// Add a new item
exports.addItem = (req, res) => {
    const { name, description } = req.body;
    itemModel.addItem(name, description, (err, id) => {
        if (err) {
            return res.status(500).send('Error adding item');
        }
        res.redirect('/');
    });
};

// Update an item
exports.updateItem = (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    itemModel.updateItem(id, name, description, (err) => {
        if (err) {
            console.error('Error updating item:', err.message);
            return res.status(500).json({ error: 'Error updating item' });
        }
        res.redirect('/');
    });
};

// Delete an item
exports.deleteItem = (req, res) => {
    const { id } = req.params;

    itemModel.deleteItem(id, (err) => {
        if (err) {
            console.error('Error deleting item:', err.message);
            return res.status(500).json({ error: 'Error deleting item' });
        }
        res.redirect('/');
    });
};
