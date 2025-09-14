const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const ExcelJS = require('exceljs');
const db = require('./db');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Get semua paket
app.get('/api/packages', (req, res) => {
  db.all('SELECT * FROM packages ORDER BY id DESC', [], (err, rows) => {
    if(err) return res.status(500).json({error: err.message});
    res.json(rows);
  });
});

// Tambah paket
app.post('/api/packages', (req, res) => {
  const { staff_id, courier_id, tracking_number } = req.body;
  const timestamp = new Date().toISOString();
  db.run(
    'INSERT INTO packages (staff_id, courier_id, tracking_number, timestamp) VALUES (?, ?, ?, ?)',
    [staff_id, courier_id, tracking_number, timestamp],
    function(err){
      if(err) return res.status(500).json({error: err.message});
      res.json({id: this.lastID, staff_id, courier_id, tracking_number, timestamp});
    }
  );
});

// Hapus paket
app.delete('/api/packages/:id', (req, res) => {
  db.run('DELETE FROM packages WHERE id=?', [req.params.id], function(err){
    if(err) return res.status(500).json({error: err.message});
    res.json({deletedID: req.params.id});
  });
});

// Export Excel
app.get('/api/packages/export', async (req, res) => {
  db.all('SELECT * FROM packages', [], async (err, rows) => {
    if(err) return res.status(500).json({error: err.message});
    
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Packages');
    sheet.columns = [
      { header: 'ID', key: 'id' },
      { header: 'Staff ID', key: 'staff_id' },
      { header: 'Courier ID', key: 'courier_id' },
      { header: 'Tracking Number', key: 'tracking_number' },
      { header: 'Timestamp', key: 'timestamp' },
    ];
    sheet.addRows(rows);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=packages.xlsx');
    await workbook.xlsx.write(res);
    res.end();
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
