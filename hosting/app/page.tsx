"use client";

// src/pages/page.tsx
import React, { useState, useEffect } from "react";
import Link from 'next/link'; // Import Link from next/link
import { AgGridReact } from "ag-grid-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LinkRenderer from "./components/LinkRenderer";
import TooltipCellRenderer from "./components/TooltipCellRenderer"; 
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

interface CustomAgGridReactProps {
  frameworkComponents: { [key: string]: React.ComponentType<any> };
}

export default function Page() {
  const [rowData, setRowData] = useState<any[]>([]);
  const [columnDefs, setColumnDefs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "test31"));
      const newData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRowData(newData);

      const desiredColumnOrder = ["\ufeffTest", "Company", "Link", "Action (Coded)", "Cancer Type (Coded)", "Fluid Type", "FDA approval", "CLIA or CAP certification", "Target (Coded)", "Genetic or Protein targets", "Notes"];

      const newColumnDefs = desiredColumnOrder.map(key => ({
        field: key, 
        headerName: key,
        cellRenderer: key === "Notes" || key === "Genetic or Protein targets" ? TooltipCellRenderer : key === "Link" ? LinkRenderer : null,
        sortable: true,
        filter: true,
        suppressMovableColumns: true
      }));

      setColumnDefs(newColumnDefs);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load data.");
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Header />
      <div>
      <Link href="./info">Go to Information Page</Link> 
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className={"ag-theme-quartz"} style={{ width: "100vw", height: "calc(100vh - 100px)" }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
          />
        </div>
      )}
      <Footer />
    </div>
  );
}