import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchPackages, exportExcel } from './utils/api';
import InputForm from './components/InputForm';
import FilterBar from './components/FilterBar';
import DataTable from './components/DataTable';
import { Container, Button } from 'react-bootstrap';

function App() {
  const [packages, setPackages] = useState([]);
  const [filter, setFilter] = useState('');

  const loadPackages = async () => {
    const res = await fetchPackages();
    setPackages(res.data);
  };

  useEffect(() => {
    loadPackages();
  }, []);

  const filteredPackages = packages.filter(pkg =>
    pkg.staff_id.includes(filter) ||
    pkg.courier_id.includes(filter) ||
    pkg.tracking_number.includes(filter)
  );

  return (
    <Container className="mt-4">
      <h2>Warehouse Package Management</h2>
      <InputForm onAdd={loadPackages} />
      <FilterBar filter={filter} setFilter={setFilter} />
      <Button className="mb-3" onClick={exportExcel}>Export Excel</Button>
      <DataTable packages={filteredPackages} onDelete={loadPackages} />
    </Container>
  );
}

export default App;
