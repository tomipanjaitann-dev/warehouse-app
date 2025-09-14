const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('warehouse.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS packages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    staff_id TEXT,
    courier_id TEXT,
    tracking_number TEXT,
    timestamp TEXT
  )`);
});

module.exports = db;
