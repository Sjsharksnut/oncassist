"use client";

import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Page() {

  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);

  const getData = async () => {
    // Get all docs from "liquidbiospy1" then...
    await getDocs(collection(db, "liquidbiopsy2")).then((querySnapshot) => {
      // map the docs into a list of objects
      const newData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // Save the docs into the react state
      setRowData(newData);

      // To dynamically determine columns, we'll iterate through each row...
      const newColumnDefs = newData.reduce((accumulator, row) => {
        // Then iterate through each key
        Object.keys(row).forEach((key) => {
          // Check if we already have a column for this key
          if (!accumulator.includes(key)) {
            // if not, then add the key to our list of colums
            accumulator.push(key);
          }
        });
        // return the flat list of columns. i.e. [id, company, target]
        return accumulator;
      }, []);
      // then convert the flat list to the nested struct ag-grid expects
      setColumnDefs(newColumnDefs.map(key => ({ 'field': key })));
    });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    // Define your desired column order here
    const orderedColumns = ['TEST NAME', 'COMPANY', 'LINK', 'Action (Coded)', 'Cancer Type (Coded)', 'FLUID TYPE', 'FDA Appr?', 'CLIA/CAP cert?', 'Target (Coded)']; // Example order
    console.log("Ordered Columns:", orderedColumns);
    console.log("Column Definitions:", columnDefs);
    // Modify columnDefs to set the order that is needed
    setColumnDefs(columnDefs => {
      const orderedDefs = columnDefs.slice(); // Create a copy
      orderedDefs.sort((a, b) => {
        return orderedColumns.indexOf(a.field) - orderedColumns.indexOf(b.field);
      });
      return orderedDefs;
    } );
  }, [columnDefs]); // Trigger when columnDefs change


  return (
    <div
      className={"ag-theme-quartz-dark"}
      style={{ width: "100vw", height: "100vh" }}
    >
      <AgGridReact rowData={rowData} columnDefs={columnDefs}></AgGridReact>
    </div>
  );
}
