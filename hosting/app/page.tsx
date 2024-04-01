import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Page() {
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "liquidbiopsy2"));
    const newData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() || {}),
    }));
    setRowData(newData);

    const newColumnDefs = newData.reduce((accumulator, row) => {
      Object.keys(row).forEach((key) => {
        if (!accumulator.includes(key)) {
          accumulator.push(key);
        }
      });
      return accumulator;
    }, []);

    setColumnDefs(newColumnDefs.map((key) => ({ field: key })));
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const orderedColumns = ['TEST NAME', 'COMPANY', 'LINK', 'Action (Coded)', 'Cancer Type (Coded)', 'FLUID TYPE', 'FDA Appr?', 'CLIA/CAP cert?', 'Target (Coded)'];
    setColumnDefs((columnDefs) => {
      const orderedDefs = columnDefs.slice();
      orderedDefs.sort((a, b) => {
        return orderedColumns.indexOf(a.field) - orderedColumns.indexOf(b.field);
      });
      return orderedDefs;
    });
  }, [columnDefs]);

  return (
    <div className={"ag-theme-quartz-dark"} style={{ width: "100vw", height: "100vh" }}>
      <AgGridReact rowData={rowData} columnDefs={columnDefs}></AgGridReact>
    </div>
  );
}


