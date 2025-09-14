import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { deletePackage } from '../utils/api';

const DataTable = ({ packages, onDelete }) => {
  const handleDelete = async (id) => {
    if(window.confirm('Yakin ingin hapus paket ini?')){
      await deletePackage(id);
      onDelete();
    }
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Staff ID</th>
          <th>Courier ID</th>
          <th>Tracking Number</th>
          <th>Timestamp</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {packages.map(pkg => (
          <tr key={pkg.id}>
            <td>{pkg.id}</td>
            <td>{pkg.staff_id}</td>
            <td>{pkg.courier_id}</td>
            <td>{pkg.tracking_number}</td>
            <td>{pkg.timestamp}</td>
            <td>
              <Button variant="danger" size="sm" onClick={()=>handleDelete(pkg.id)}>Hapus</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DataTable;
