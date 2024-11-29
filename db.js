const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.join('/tmp', 'items.db');

// Check if the database already exists
const dbExists = fs.existsSync(dbPath);

// Create and initialize the database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log(`Database connected at ${dbPath}`);

        // Initialize the database if it doesn't exist
        if (!dbExists) {
            db.serialize(() => {
                db.run(`
                    CREATE TABLE IF NOT EXISTS items (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name TEXT NOT NULL,
                        description TEXT,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    );
                `);
                console.log('Table "items" created.');
            });
        }
    }
});

module.exports = db;
