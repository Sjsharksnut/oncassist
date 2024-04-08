"use client";

import React, { useState, useEffect } from "react";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import Header from "./Header";
import Footer from "./Footer";
import LinkRenderer from "./LinkRenderer";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

interface CustomAgGridReactProps extends AgGridReactProps {
  frameworkComponents: { [key: string]: React.ComponentType<any> };
}

export default function Page() {
  const [rowData, setRowData] = useState<any[]>([]);
  const [columnDefs, setColumnDefs] = useState<any[]>([]);

  const getData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "test30"));
      const newData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRowData(newData);

      const desiredColumnOrder = ["\ufeffTest", "Company", "Link", "Action (Coded)", "Cancer Type (Coded)", "Fluid Type", "FDA approval", "CLIA or CAP certification", "Target (Coded)", "Genetic or Protein targets", "Notes"];

      const newColumnDefs = desiredColumnOrder.map(key => {
        return {
          field: key,
          headerName: key,
          tooltipField: key, // Add tooltip field to display full text on hover
          cellRenderer: key === "Link" ? LinkRenderer : null,
          sortable: true,
          filter: true,
          suppressMovableColumns: true
        };
      });

      setColumnDefs(newColumnDefs);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Consider implementing user-facing error handling here
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const gridOptions = {
    frameworkComponents: {
      linkRenderer: LinkRenderer,
    },
    // Additional grid options can be configured here
  };

  return (
    <div>
      <Header />
      <div className={"ag-theme-quartz"} style={{ width: "100vw", height: "calc(100vh - 100px)" }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          gridOptions={gridOptions as CustomAgGridReactProps}
        />
      </div>
      <Footer />
    </div>
  );
}

