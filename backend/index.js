const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Get all packages
app.get('/api/packages', (req, res) => {
  db.all("SELECT * FROM packages", [], (err, rows) => {
    if(err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Add package
app.post('/api/packages', (req, res) => {
  const { staff_id, courier_id, tracking_number, timestamp } = req.body;
  db.run(`INSERT INTO packages (staff_id, courier_id, tracking_number, timestamp)
          VALUES (?, ?, ?, ?)`,
          [staff_id, courier_id, tracking_number, timestamp],
          function(err) {
            if(err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
          });
});

const PORT = 5001;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on http://0.0.0.0:${PORT}`));
