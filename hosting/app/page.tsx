"use client"

import { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

export default function Page() {
  // Row Data: The data to be displayed.
  const [rowData] = useState([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: 'Mercedes', model: 'EQA', price: 48890, electric: true },
    { make: 'Fiat', model: '500', price: 15774, electric: false },
    { make: 'Nissan', model: 'Juke', price: 20675, electric: false },
  ]);
  
  // Column Definitions: Defines & controls grid columns.
  const [columnDefs] = useState([
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "electric" }
  ]);

  // Container: Defines the grid's theme & dimensions.
  return (
    <div className={"ag-theme-quartz-dark"} style={{ width: '800px', height: '800px' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        style={{ height: '100%', width: '100%' }}
      ></AgGridReact>
    </div>
  );
 }
