import React, { useState } from 'react';
import { addPackage } from '../utils/api';
import { Button, Form } from 'react-bootstrap';

const InputForm = ({ onAdd }) => {
  const [staffId, setStaffId] = useState('');
  const [courierId, setCourierId] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!staffId||!courierId||!trackingNumber) return alert('Isi semua field');
    await addPackage({ staff_id: staffId, courier_id: courierId, tracking_number: trackingNumber });
    setStaffId(''); setCourierId(''); setTrackingNumber('');
    onAdd();
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-3">
      <Form.Group className="mb-2">
        <Form.Label>ID Staff</Form.Label>
        <Form.Control value={staffId} onChange={e=>setStaffId(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>ID Kurir</Form.Label>
        <Form.Control value={courierId} onChange={e=>setCourierId(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Tracking Number</Form.Label>
        <Form.Control value={trackingNumber} onChange={e=>setTrackingNumber(e.target.value)} />
      </Form.Group>
      <Button type="submit">Tambah Paket</Button>
    </Form>
  );
};

export default InputForm;
