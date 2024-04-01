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
    const orderedColumns = ['TEST NAME', 'COMPANY', 'LINK', 'Action (Coded)', 'Cancer Type (Coded)', 'FLUID TYPE', 'FDA Appr?', 'CLIA/CAP cert?', 'Target (Coded)'];
    setColumnDefs((columnDefs) => {
      const orderedDefs = columnDefs.slice();
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
