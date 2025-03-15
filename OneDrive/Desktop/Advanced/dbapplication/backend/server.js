const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Connect to the database (or create if it doesn't exist)
const db = new sqlite3.Database("./database.db", (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log("Connected to the SQLite database.");
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE
            )
        `);
    }
});

// Create (Add Data)
app.post("/add", (req, res) => {
    const { name, email } = req.body;
    db.run(`INSERT INTO users (name, email) VALUES (?, ?)`, [name, email], function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ id: this.lastID });
    });
});

// Read (View Data)
app.get("/users", (req, res) => {
    db.all(`SELECT * FROM users`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Delete Data
app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM users WHERE id = ?`, id, function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ message: "User deleted", rowsAffected: this.changes });
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
