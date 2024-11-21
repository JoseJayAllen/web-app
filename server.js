const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const methodOverride = require('method-override');

app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const itemRoutes = require('./routes/itemRoutes');
app.use('/', itemRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/items.db');

db.all('SELECT * FROM items', [], (err, rows) => {
    if (err) {
        console.error('Error fetching items:', err.message);
    } else {
        console.log('Items:', rows);
    }
});

db.close();

