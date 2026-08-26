import React, { useState, useEffect, useMemo, useCallback } from "react";
import * as XLSX from "xlsx";

/**
 * Pro Excel File Loader – loads .xlsx/.xls/.xlsm files as an interactive table.
 *
 * @param {string|object} fileModule - URL or imported file module.
 * @param {string} title - Optional title above table.
 * @param {number} sheetIndex - Fallback sheet index (default: 0).
 * @param {string} sheetName - Preferred sheet name (overrides index if found).
 * @param {number} rowsPerPage - Initial rows per page (default: 50, 0 to disable).
 * @param {boolean} showSheetSelector - Show sheet dropdown (default: true).
 * @param {boolean} enableSearch - Enable global text search (default: true).
 * @param {boolean} enableSorting - Enable column sorting (default: true).
 * @param {boolean} enableExport - Show export to CSV button (default: true).
 * @param {boolean} enableRowSelection - Show row checkboxes (default: false).
 * @param {number[]} pageSizeOptions - Available page sizes (default: [25,50,100,250]).
 */
export default function ExcelFileLoader({
  fileModule,
  title = null,
  sheetIndex = 0,
  sheetName = null,
  rowsPerPage = 50,
  showSheetSelector = true,
  enableSearch = true,
  enableSorting = true,
  enableExport = true,
  enableRowSelection = false,
  pageSizeOptions = [25, 50, 100, 250],
}) {
  // ---- Core state ----
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [workbook, setWorkbook] = useState(null);
  const [sheetNames, setSheetNames] = useState([]);
  const [currentSheetIdx, setCurrentSheetIdx] = useState(sheetIndex);

  // ---- Raw sheet data (headers + rows) ----
  const [rawHeaders, setRawHeaders] = useState([]);
  const [rawRows, setRawRows] = useState([]);

  // ---- Interaction state ----
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc"); // 'asc' or 'desc'
  const [selectedRows, setSelectedRows] = useState(new Set()); // indices in *filtered & sorted* view
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(rowsPerPage > 0 ? rowsPerPage : 50);

  // ---- Load Excel file (same robust logic as original) ----
  const loadExcelFile = useCallback(async (module) => {
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
      const wb = XLSX.read(arrayBuffer, { type: "array" });
      setWorkbook(wb);
      const names = wb.SheetNames;
      setSheetNames(names);

      // Determine sheet to show
      let targetIndex = sheetIndex;
      if (sheetName && names.includes(sheetName)) {
        targetIndex = names.indexOf(sheetName);
      } else if (sheetName && !names.includes(sheetName)) {
        console.warn(`Sheet "${sheetName}" not found. Using index ${sheetIndex}.`);
      }
      if (targetIndex >= names.length) targetIndex = 0;
      setCurrentSheetIdx(targetIndex);
    } catch (err) {
      console.error("Excel load error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [sheetIndex, sheetName]);

  useEffect(() => {
    if (!fileModule) {
      setError("No file provided");
      setLoading(false);
      return;
    }
    loadExcelFile(fileModule);
  }, [fileModule, loadExcelFile]);

  // ---- Extract headers & rows when workbook or sheet changes ----
  useEffect(() => {
    if (workbook && sheetNames.length > 0 && currentSheetIdx < sheetNames.length) {
      const sheetKey = sheetNames[currentSheetIdx];
      const worksheet = workbook.Sheets[sheetKey];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: "" });
      if (jsonData.length > 0) {
        setRawHeaders(jsonData[0]);
        setRawRows(jsonData.slice(1));
      } else {
        setRawHeaders([]);
        setRawRows([]);
      }
      // Reset all interactions when sheet changes
      setSearchQuery("");
      setSortColumn(null);
      setSortDirection("asc");
      setSelectedRows(new Set());
      setCurrentPage(0);
    }
  }, [workbook, currentSheetIdx, sheetNames]);

  // ---- Filtered rows (global search across all columns) ----
  const filteredRows = useMemo(() => {
    if (!searchQuery.trim()) return rawRows;
    const lowerQuery = searchQuery.toLowerCase();
    return rawRows.filter((row) =>
      row.some(
        (cell) =>
          cell != null &&
          String(cell).toLowerCase().includes(lowerQuery)
      )
    );
  }, [rawRows, searchQuery]);

  // ---- Sorted rows ----
  const sortedRows = useMemo(() => {
    if (!enableSorting || sortColumn === null) return filteredRows;
    const colIndex = sortColumn;
    const direction = sortDirection === "asc" ? 1 : -1;
    return [...filteredRows].sort((a, b) => {
      const valA = a[colIndex] ?? "";
      const valB = b[colIndex] ?? "";
      if (typeof valA === "number" && typeof valB === "number") {
        return (valA - valB) * direction;
      }
      return String(valA).localeCompare(String(valB)) * direction;
    });
  }, [filteredRows, sortColumn, sortDirection, enableSorting]);

  // ---- Pagination ----
  const totalPages = pageSize > 0 ? Math.ceil(sortedRows.length / pageSize) : 1;
  const paginatedRows = useMemo(() => {
    if (pageSize <= 0) return sortedRows;
    const start = currentPage * pageSize;
    const end = start + pageSize;
    return sortedRows.slice(start, end);
  }, [sortedRows, currentPage, pageSize]);

  // Reset page when filter/sort/pageSize changes
  useEffect(() => {
    setCurrentPage(0);
  }, [searchQuery, sortColumn, sortDirection, pageSize]);

  // ---- Handlers ----
  const handleSheetChange = (e) => {
    setCurrentSheetIdx(parseInt(e.target.value, 10));
  };

  const handleSort = (colIdx) => {
    if (!enableSorting) return;
    if (sortColumn === colIdx) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(colIdx);
      setSortDirection("asc");
    }
  };

  const handleSelectRow = (rowIdxInView) => {
    if (!enableRowSelection) return;
    const globalRowIndex = currentPage * pageSize + rowIdxInView;
    setSelectedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(globalRowIndex)) newSet.delete(globalRowIndex);
      else newSet.add(globalRowIndex);
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (!enableRowSelection) return;
    if (selectedRows.size === paginatedRows.length) {
      setSelectedRows(new Set());
    } else {
      const start = currentPage * pageSize;
      const newSet = new Set();
      for (let i = 0; i < paginatedRows.length; i++) {
        newSet.add(start + i);
      }
      setSelectedRows(newSet);
    }
  };

  const exportToCSV = () => {
    if (!enableExport) return;
    const dataToExport = [rawHeaders, ...sortedRows];
    const ws = XLSX.utils.aoa_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Exported_Data");
    XLSX.writeFile(wb, `export_${sheetNames[currentSheetIdx] || "sheet"}.xlsx`);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSortColumn(null);
    setSortDirection("asc");
    setSelectedRows(new Set());
  };

  // ---- Render helpers ----
  const renderSortIcon = (colIdx) => {
    if (sortColumn !== colIdx) return " ↕️";
    return sortDirection === "asc" ? " ↑" : " ↓";
  };

  if (loading) {
    return (
      <div className="rounded-lg border border-slate-700 p-4 animate-pulse">
        <div className="h-6 bg-slate-700 rounded w-1/3 mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-slate-700 rounded w-full"></div>
          <div className="h-4 bg-slate-700 rounded w-5/6"></div>
          <div className="h-4 bg-slate-700 rounded w-4/5"></div>
        </div>
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

  if (!workbook || rawRows.length === 0) {
    return <div className="text-slate-400">No data to display.</div>;
  }

  return (
    <div className="excel-file-loader border border-slate-700 rounded-lg overflow-hidden my-4">
      {/* Header toolbar */}
      <div className="p-3 bg-slate-800 border-b border-slate-700 flex flex-wrap gap-3 justify-between items-center">
        <div className="flex flex-wrap gap-3 items-center">
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

        <div className="flex flex-wrap gap-2">
          {enableSearch && (
            <input
              type="text"
              placeholder="Search all columns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-700 text-slate-200 text-sm rounded-md px-3 py-1 border border-slate-600 focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
          )}
          {(searchQuery || sortColumn !== null) && (
            <button
              onClick={clearFilters}
              className="px-3 py-1 text-sm bg-slate-700 hover:bg-slate-600 rounded-md text-slate-200"
            >
              Clear filters
            </button>
          )}
          {enableExport && (
            <button
              onClick={exportToCSV}
              className="px-3 py-1 text-sm bg-emerald-700 hover:bg-emerald-600 rounded-md text-white"
            >
              Export CSV
            </button>
          )}
        </div>
      </div>

      {/* Stats cards (based on filtered data) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-3 bg-slate-900/50">
        <div className="bg-gradient-to-r from-emerald-600/20 to-emerald-800/20 border border-emerald-500/30 rounded-xl p-3">
          <div className="text-xs text-slate-400">Total rows (original)</div>
          <div className="text-2xl font-bold text-white">{rawRows.length.toLocaleString()}</div>
        </div>
        <div className="bg-gradient-to-r from-sky-600/20 to-sky-800/20 border border-sky-500/30 rounded-xl p-3">
          <div className="text-xs text-slate-400">Filtered rows</div>
          <div className="text-2xl font-bold text-white">{sortedRows.length.toLocaleString()}</div>
        </div>
        <div className="bg-gradient-to-r from-purple-600/20 to-purple-800/20 border border-purple-500/30 rounded-xl p-3">
          <div className="text-xs text-slate-400">Columns</div>
          <div className="text-2xl font-bold text-white">{rawHeaders.length}</div>
        </div>
        <div className="bg-gradient-to-r from-orange-600/20 to-orange-800/20 border border-orange-500/30 rounded-xl p-3">
          <div className="text-xs text-slate-400">Active sheet</div>
          <div className="font-semibold text-white truncate">{sheetNames[currentSheetIdx]}</div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead className="sticky top-0 z-20 bg-slate-800">
            <tr>
              {enableRowSelection && (
                <th className="border border-slate-600 px-3 py-2 w-8 text-center">
                  <input
                    type="checkbox"
                    checked={selectedRows.size === paginatedRows.length && paginatedRows.length > 0}
                    onChange={handleSelectAll}
                    className="rounded bg-slate-700"
                  />
                </th>
              )}
              <th className="border border-slate-600 px-3 py-2 w-12 text-center">#</th>
              {rawHeaders.map((header, idx) => (
                <th
                  key={idx}
                  className={`border border-slate-600 px-3 py-2 text-left font-semibold cursor-pointer select-none ${
                    enableSorting ? "hover:bg-slate-700" : ""
                  }`}
                  onClick={() => handleSort(idx)}
                >
                  {header || `Column ${idx + 1}`}
                  {enableSorting && renderSortIcon(idx)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedRows.map((row, rowIdx) => {
              const globalRowIndex = currentPage * pageSize + rowIdx;
              const isSelected = enableRowSelection && selectedRows.has(globalRowIndex);
              return (
                <tr
                  key={globalRowIndex}
                  className={`${rowIdx % 2 === 0 ? "bg-slate-900/50" : "bg-slate-800/30"} ${
                    isSelected ? "bg-sky-900/40" : ""
                  }`}
                >
                  {enableRowSelection && (
                    <td className="border border-slate-700 px-3 py-1 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectRow(rowIdx)}
                        className="rounded bg-slate-700"
                      />
                    </td>
                  )}
                  <td className="border border-slate-700 px-3 py-1 text-slate-400 font-mono text-right">
                    {globalRowIndex + 1}
                  </td>
                  {row.map((cell, colIdx) => (
                    <td key={colIdx} className="border border-slate-700 px-3 py-1 text-slate-200">
                      {cell !== undefined && cell !== "" ? String(cell) : "—"}
                    </td>
                  ))}
                </tr>
              );
            })}
            {paginatedRows.length === 0 && (
              <tr>
                <td colSpan={rawHeaders.length + (enableRowSelection ? 2 : 1)} className="text-center py-8 text-slate-400">
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      {pageSize > 0 && totalPages > 1 && (
        <div className="flex flex-wrap justify-between items-center gap-3 p-3 bg-slate-800 border-t border-slate-700 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-slate-300">Rows per page:</span>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="bg-slate-700 text-slate-200 rounded px-2 py-1 border border-slate-600"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              className="px-3 py-1 rounded bg-slate-700 text-slate-200 disabled:opacity-50 hover:bg-slate-600 transition"
            >
              Previous
            </button>
            <span className="text-slate-300">
              Page {currentPage + 1} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={currentPage === totalPages - 1}
              className="px-3 py-1 rounded bg-slate-700 text-slate-200 disabled:opacity-50 hover:bg-slate-600 transition"
            >
              Next
            </button>
          </div>

          <div className="text-slate-400 text-xs">
            Showing {currentPage * pageSize + 1} – {Math.min((currentPage + 1) * pageSize, sortedRows.length)} of {sortedRows.length}
          </div>
        </div>
      )}
    </div>
  );
}