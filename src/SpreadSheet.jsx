"use client";

import React from "react";
import { useState } from "react";
import * as XLSX from "xlsx";
import Navbar from "./components/Navbar";

function SpreadSheet() {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  const handleGetFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "array" });

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json(worksheet);

    setData(json);

    const cols = XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0];
    setColumns(cols);
    console.log(json);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-50 ">
      <Navbar />
      <div className="container mx-auto mt-5 p-5">
        <h1 className="text-2xl font-bold mb-4 text-gray-700 px-2">
          SpreadSheet
        </h1>
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleGetFile}
          className="w-100 border border-gray-300 rounded-xl px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500
          file:bg-purple-500 file:text-white file:border-none file:rounded-l-xl file:px-4 file:py-2 file:cursor-pointer file:mr-6"
        />

        <div className="mt-5">
          <div className="w-full overflow-auto max-h-[400px]">
            <table className="min-w-full border-collapse border border-gray-500 ">
              {data.length > 0 ? (
                <>
                  <thead className="bg-gray-900 text-white text-xl sticky top-0">
                    <tr className="h-10">
                      {columns.map((col, index) => (
                        <th key={index}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-gray-200 text-center font-semibold text-md">
                    {data.map((item, index) => (
                      <tr key={index}>
                        {columns.map((col, index) => (
                          <td key={index}>{item[col]}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </>
              ) : (
                <tbody className="bg-gray-200 text-center font-semibold text-md">
                  <tr>
                    <td
                      colSpan={data.length}
                      className="px-4 py-2 border border-gray-500 text-center"
                    >
                      No data available
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpreadSheet;
