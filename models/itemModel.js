const db = require('../db'); 

// Function to get all items (without pagination)
function getAllItems(callback) {
    db.all('SELECT * FROM items ORDER BY id ASC', [], callback);
}

// Function to get the total count of items
function getItemCount(callback) {
    db.get('SELECT COUNT(*) AS count FROM items', [], (err, row) => {
        if (err) {
            callback(err);
        } else {
            callback(null, row.count); // Return the count value
        }
    });
}

// Function to get items with pagination
function getItemsWithPagination(page, limit, callback) {
    const offset = (page - 1) * limit;
    db.all('SELECT * FROM items LIMIT ? OFFSET ?', [limit, offset], callback);
}

// Function to add a new item
function addItem(name, description, callback) {
    const stmt = db.prepare('INSERT INTO items (name, description) VALUES (?, ?)');
    stmt.run(name, description, function (err) {
        callback(err, this.lastID); // Return the ID of the inserted item
    });
    stmt.finalize();
}

// Function to update an item by ID
function updateItem(id, name, description, callback) {
    const stmt = db.prepare('UPDATE items SET name = ?, description = ? WHERE id = ?');
    stmt.run(name, description, id, callback);
    stmt.finalize();
}

// Function to delete an item by ID
function deleteItem(id, callback) {
    const stmt = db.prepare('DELETE FROM items WHERE id = ?');
    stmt.run(id, callback);
    stmt.finalize();
}

module.exports = { getAllItems, getItemCount, getItemsWithPagination, addItem, updateItem, deleteItem };
