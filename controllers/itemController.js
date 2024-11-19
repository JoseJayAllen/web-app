const db = require('../models/database');

exports.getItems = (req, res) => {
    db.all('SELECT * FROM items', [], (err,rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
};

exports.addItem = (req,res) => {
    const { name, description } = req.body;
    db.run(
        'INSERT INTO items (name,description) VALUES (?, ?)',
        [name, description],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
            }else {
                res.status(200).json({ id: this.lastID });
            }
        }
    );
};

exports.updatteItem = (req,res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    db.run(
        'UPDATE items SET name = ?, description = ? WHERE id = ?',
        [name, description, id],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message});
            } else {
                res.status(200).json({ changes: this.changes});
            }
        }
    );
};

exports.patchItem = (req, res) => {
    const { id } = req.params;
    const fields = Object.entries(req.body)
        .map(([key, value]) => `${key} = '${value}'`)
        .join(', ');
    db.run(`UPDATE items SET ${fields} WHERE id = ?`, [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json({ changes: this.changes });
        }
    });
};

exports.deleteItem = (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM items WHERE id = ?', [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json({ changes: this.changes });
        }
    });
};
