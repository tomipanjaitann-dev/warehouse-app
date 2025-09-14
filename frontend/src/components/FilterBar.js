import React from 'react';
import { Form } from 'react-bootstrap';

const FilterBar = ({ filter, setFilter }) => (
  <Form className="mb-3">
    <Form.Control
      placeholder="Cari berdasarkan ID Staff, ID Kurir atau Tracking Number"
      value={filter}
      onChange={e=>setFilter(e.target.value)}
    />
  </Form>
);

export default FilterBar;
