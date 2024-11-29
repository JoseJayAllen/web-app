const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Define the database path
const dbPath = path.join(process.env.DATABASE_PATH || '/tmp', 'items.db');

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
                // Create the table if it doesn't exist
                db.run(`
                    CREATE TABLE IF NOT EXISTS items (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name TEXT NOT NULL,
                        description TEXT,
                        date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                    );
                `, (err) => {
                    if (err) {
                        console.error('Error creating table:', err.message);
                    } else {
                        console.log('Table "items" created successfully.');
                    }
                });
            });
        }
    }
});

module.exports = db;
