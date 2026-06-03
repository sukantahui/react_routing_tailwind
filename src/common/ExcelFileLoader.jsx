import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";

/**
 * ExcelFileLoader - Loads and displays Excel files (.xlsx, .xls, .xlsm) as interactive tables.
 *
 * @param {string|object} fileModule - URL to the Excel file or an imported file module (via file-loader/url-loader)
 * @param {string} title - Optional title to display above the table
 * @param {number} sheetIndex - Index of the sheet to display (default: 0) – used only if sheetName not provided or not found
 * @param {string} sheetName - Name of the sheet to display (overrides sheetIndex if found)
 * @param {number} rowsPerPage - Rows per page for pagination (default: 50, set to 0 to disable)
 * @param {boolean} showSheetSelector - Show a dropdown to switch sheets (default: true)
 */
export default function ExcelFileLoader({
  fileModule,
  title = null,
  sheetIndex = 0,
  sheetName = null,
  rowsPerPage = 50,
  showSheetSelector = true,
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [workbook, setWorkbook] = useState(null);
  const [sheetNames, setSheetNames] = useState([]);
  const [currentSheetIdx, setCurrentSheetIdx] = useState(sheetIndex);
  const [sheetData, setSheetData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Load the Excel file
  useEffect(() => {
    if (!fileModule) {
      setError("No file provided");
      setLoading(false);
      return;
    }

    loadExcelFile(fileModule);
  }, [fileModule]);

  // Extract sheet data whenever workbook or sheet index changes
  useEffect(() => {
    if (workbook && sheetNames.length > 0 && currentSheetIdx < sheetNames.length) {
      const sheetNameKey = sheetNames[currentSheetIdx];
      const worksheet = workbook.Sheets[sheetNameKey];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: "" });
      setSheetData(jsonData);
      setCurrentPage(0);
      setTotalPages(Math.ceil(jsonData.length / (rowsPerPage > 0 ? rowsPerPage : Infinity)));
    }
  }, [workbook, currentSheetIdx, rowsPerPage]);

  async function loadExcelFile(module) {
    try {
      setLoading(true);
      setError(null);

      let url;
      if (typeof module === "string") {
        url = module;
      } else if (module?.default) {
        url = module.default;
      } else if (module?.then) {
        const resolved = await module;
        url = resolved.default || resolved;
        if (typeof url !== "string") throw new Error("Loaded module does not provide a file URL");
      } else {
        throw new Error("Unsupported fileModule type");
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
      const arrayBuffer = await response.arrayBuffer();

      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      setWorkbook(workbook);
      const names = workbook.SheetNames;
      setSheetNames(names);

      // Determine which sheet to show
      let targetIndex = sheetIndex;
      if (sheetName && names.includes(sheetName)) {
        targetIndex = names.indexOf(sheetName);
      } else if (sheetName && !names.includes(sheetName)) {
        console.warn(`Sheet name "${sheetName}" not found. Falling back to sheetIndex ${sheetIndex}.`);
      }
      // Ensure targetIndex is within bounds
      if (targetIndex >= names.length) targetIndex = 0;
      setCurrentSheetIdx(targetIndex);
    } catch (err) {
      console.error("Error loading Excel file:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleSheetChange(e) {
    setCurrentSheetIdx(parseInt(e.target.value, 10));
  }

  function handlePageChange(newPage) {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  }

  const startRow = rowsPerPage > 0 ? currentPage * rowsPerPage : 0;
  const endRow = rowsPerPage > 0 ? startRow + rowsPerPage : sheetData.length;
  const visibleRows = sheetData.slice(startRow, endRow);

  if (loading) {
    return (
      <div className="text-center py-8 text-slate-400">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-sky-500 mx-auto mb-2"></div>
        Loading Excel file...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/30 border border-red-700 text-red-200 rounded-md p-4 my-2">
        <strong>Error loading Excel:</strong> {error}
      </div>
    );
  }

  if (!workbook || sheetData.length === 0) {
    return <div className="text-slate-400">No data to display.</div>;
  }

  return (
    <div className="excel-file-loader border border-slate-700 rounded-lg overflow-hidden my-4">
      {(title || (showSheetSelector && sheetNames.length > 1)) && (
        <div className="flex flex-wrap justify-between items-center p-3 bg-slate-800 border-b border-slate-700">
          {title && <h3 className="text-md font-semibold text-slate-200">{title}</h3>}
          {showSheetSelector && sheetNames.length > 1 && (
            <div className="flex items-center gap-2">
              <label htmlFor="sheet-select" className="text-sm text-slate-300">Sheet:</label>
              <select
                id="sheet-select"
                value={currentSheetIdx}
                onChange={handleSheetChange}
                className="bg-slate-700 text-slate-200 text-sm rounded-md px-2 py-1 border border-slate-600"
              >
                {sheetNames.map((name, idx) => (
                  <option key={idx} value={idx}>{name}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead className="bg-slate-800 sticky top-0">
            <tr>
              <th className="border border-slate-600 px-3 py-2 text-left text-slate-300">#</th>
              {visibleRows[0]?.map((_, colIdx) => (
                <th key={colIdx} className="border border-slate-600 px-3 py-2 text-left text-slate-300 font-medium">
                  {String.fromCharCode(65 + colIdx)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row, rowIdx) => (
              <tr key={rowIdx} className={rowIdx % 2 === 0 ? "bg-slate-900/50" : "bg-slate-800/30"}>
                <td className="border border-slate-700 px-3 py-1 text-slate-400 font-mono text-right">
                  {startRow + rowIdx + 1}
                </td>
                {row.map((cell, colIdx) => (
                  <td key={colIdx} className="border border-slate-700 px-3 py-1 text-slate-200">
                    {cell !== undefined && cell !== "" ? String(cell) : "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {rowsPerPage > 0 && totalPages > 1 && (
        <div className="flex justify-between items-center p-2 bg-slate-800 border-t border-slate-700 text-sm">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
            className="px-3 py-1 rounded bg-slate-700 text-slate-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600 transition"
          >
            Previous
          </button>
          <span className="text-slate-300">Page {currentPage + 1} of {totalPages}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
            className="px-3 py-1 rounded bg-slate-700 text-slate-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600 transition"
          >
            Next
          </button>
        </div>
      )}

      <div className="text-xs text-slate-500 p-2 bg-slate-900 border-t border-slate-800">
        {sheetData.length} rows total
        {rowsPerPage > 0 && ` · Showing ${startRow + 1}–${Math.min(endRow, sheetData.length)}`}
      </div>
    </div>
  );
}