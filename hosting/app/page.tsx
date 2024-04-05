"use client";

import { useState, useEffect } from "react";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import Header from "./Header";
import LinkRenderer from "./LinkRenderer";
import { GridOptions } from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

interface CustomAgGridReactProps extends AgGridReactProps {
  frameworkComponents: { [key: string]: React.ComponentType<any> };
}

export default function Page() {
  const [rowData, setRowData] = useState<any[]>([]);
  const [columnDefs, setColumnDefs] = useState<any[]>([]);

  // Function to fetch data from Firestore
  const getData = async () => {
    // Get all docs from "test2" collection
    await getDocs(collection(db, "test30")).then((querySnapshot) => {
      // map the docs into a list of objects
      const newData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // Save the docs into the react state
      setRowData(newData);

      // Define the desired column order
      const desiredColumnOrder = ["\ufeffTest", "Company", "Link", "Action (Coded)", "Cancer Type (Coded)", "Fluid Type", "FDA approval", "CLIA or CAP certification", "Target (Coded)", "Genetic or Protein targets", "Notes"];

      // Generate column definitions based on the desired order
      const newColumnDefs = desiredColumnOrder.map(key => {
        // For the "Link" column, use a custom cell renderer to render clickable links
        if (key === "Link") {
          return {
            field: key,
            headerName: key,
            cellRenderer: LinkRenderer,
            sortable: false,
            filter: false
          };
        } else {
          // Add autoHeight property for the "Genetic or Protein Targets" and "Notes" columns
          return {
            field: key,
            headerName: key,
            sortable: true,
            filter: true,
            autoHeight: key === "Genetic or Protein targets" || key === "Notes"
          };
        }
      });

      // Set the column definitions
      setColumnDefs(newColumnDefs);
    });
  };

  // Fetch data on component mount
  useEffect(() => {
    getData();
  }, []);

   // Define grid options
   const gridOptions = {
    frameworkComponents: {
      linkRenderer: LinkRenderer
    }
  };

  // Render the page
  return (
    <div>
      {/* Header component */}
      <Header />
      {/* AG Grid component */}
      <div className={"ag-theme-quartz"} style={{ width: "100vw", height: "calc(100vh - 100px)" }}>
        <AgGridReact 
          rowData={rowData} 
          columnDefs={columnDefs} 
          gridOptions={gridOptions as CustomAgGridReactProps} 
        />
      </div>
    </div>
  );
}
