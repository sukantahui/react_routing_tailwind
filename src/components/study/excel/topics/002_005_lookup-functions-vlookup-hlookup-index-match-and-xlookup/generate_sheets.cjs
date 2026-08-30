const ExcelJS = require('e:/react_routing_tailwind/node_modules/exceljs');
const fs = require('fs');
const path = require('path');

const excelBaseDir = 'E:/react_routing_tailwind/src/components/study/excel';
const moduleDir = path.join(excelBaseDir, 'topics/002_005_lookup-functions-vlookup-hlookup-index-match-and-xlookup');
const excelFilesDir = path.join(moduleDir, 'excel_files');
if (!fs.existsSync(excelFilesDir)) fs.mkdirSync(excelFilesDir, { recursive: true });

async function buildWorkbook() {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Coder & AccoTax';
  wb.lastModifiedBy = 'Sukanta Hui';
  wb.created = new Date();
  wb.modified = new Date();

  function addStyledSheet(sheetName, headerColor, columns, data) {
    const ws = wb.addWorksheet(sheetName, { views: [{ showGridLines: true }] });

    // Row 1: Return Navigation Link to Overview
    ws.mergeCells('A1:E1');
    const navCell = ws.getCell('A1');
    navCell.value = { text: '🏠 Jump to Executive Overview Landing Sheet', hyperlink: "#'Overview'!A1" };
    navCell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FF0284C7' }, underline: true };
    navCell.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
    ws.getRow(1).height = 24;

    // Row 3: Header Row
    const headerRow = ws.getRow(3);
    headerRow.height = 28;
    columns.forEach((c, cIdx) => {
      const cell = headerRow.getCell(cIdx + 1);
      cell.value = c.header;
      cell.font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FFFFFFFF' } };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: headerColor } };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
      cell.border = {
        top: { style: 'medium', color: { argb: 'FF0F172A' } },
        bottom: { style: 'medium', color: { argb: 'FF0F172A' } },
        left: { style: 'thin', color: { argb: 'FF334155' } },
        right: { style: 'thin', color: { argb: 'FF334155' } }
      };
    });

    // Populate Data Rows
    data.forEach((row, idx) => {
      const rNum = 4 + idx;
      const r = ws.getRow(rNum);
      r.height = 22;
      row.forEach((val, cIdx) => {
        const cell = r.getCell(cIdx + 1);
        cell.value = val;
        cell.font = { name: 'Segoe UI', size: 10 };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: idx % 2 === 0 ? 'FFF8FAFC' : 'FFFFFFFF' } };
        cell.alignment = { vertical: 'middle', horizontal: typeof val === 'number' ? 'right' : 'left', indent: typeof val === 'number' ? 0 : 1 };
        cell.border = {
          top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
          bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
          left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
          right: { style: 'thin', color: { argb: 'FFE2E8F0' } }
        };
      });
    });

    // AutoFit Column Widths
    columns.forEach((col, colIdx) => {
      let maxLen = col.header ? col.header.toString().length : 12;
      data.forEach(r => {
        if (r[colIdx] !== null && r[colIdx] !== undefined) {
          const s = r[colIdx].toString();
          if (s.length > maxLen) maxLen = s.length;
        }
      });
      ws.getColumn(colIdx + 1).width = Math.max(maxLen + 6, 22);
    });

    return ws;
  }

  // ===========================================================================
  // 1. EXECUTIVE OVERVIEW LANDING SHEET (SHEET 1)
  // ===========================================================================
  const wsOverview = wb.addWorksheet('Overview', { views: [{ showGridLines: true }] });
  wsOverview.columns = [{ width: 18 }, { width: 32 }, { width: 35 }, { width: 45 }, { width: 30 }, { width: 40 }];

  const logoPath = path.join(excelBaseDir, 'assets/cnat.png');
  if (fs.existsSync(logoPath)) {
    const logoId = wb.addImage({ filename: logoPath, extension: 'png' });
    wsOverview.addImage(logoId, { tl: { col: 0.08, row: 0.15 }, ext: { width: 110, height: 110 }, editAs: 'oneCell' });
  }

  wsOverview.mergeCells('B1:F2');
  const bTitle = wsOverview.getCell('B1');
  bTitle.value = 'CODER & ACCOTAX';
  bTitle.font = { name: 'Segoe UI', size: 20, bold: true, color: { argb: 'FFFFFFFF' } };
  bTitle.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
  bTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } };

  wsOverview.mergeCells('B3:F3');
  const bSub1 = wsOverview.getCell('B3');
  bSub1.value = 'ISO 9001:2015 Certified Centre of Excellence in Computer Science & Financial Modeling';
  bSub1.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FF38BDF8' } };
  bSub1.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
  bSub1.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E293B' } };

  wsOverview.mergeCells('B4:F5');
  const bSub2 = wsOverview.getCell('B4');
  bSub2.value = "Module 002_005: Lookup Functions (VLOOKUP, HLOOKUP, INDEX-MATCH & XLOOKUP)\nCurriculum Track: EXCEL-PRO-901 | Student Practice Master Workbook";
  bSub2.font = { name: 'Segoe UI', size: 9, color: { argb: 'FFFBBF24' } };
  bSub2.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true, indent: 1 };
  bSub2.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E293B' } };

  const landingImgPath = path.join(excelBaseDir, 'assets/landing_sheet.jpg');
  if (fs.existsSync(landingImgPath)) {
    const landingImgId = wb.addImage({ filename: landingImgPath, extension: 'jpeg' });
    wsOverview.addImage(landingImgId, { tl: { col: 0.15, row: 5.2 }, ext: { width: 600, height: 400 }, editAs: 'oneCell' });
  }
  for (let r = 6; r <= 25; r++) wsOverview.getRow(r).height = 20;

  wsOverview.mergeCells('A27:F27');
  const s1Header = wsOverview.getCell('A27');
  s1Header.value = '🏢 1. ORGANISATION PROFILE & CONTACT DETAILS';
  s1Header.font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: 'FFFFFFFF' } };
  s1Header.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0284C7' } };

  const s1Data = [
    ['Institute Name', 'Coder & AccoTax', 'Accreditation', 'ISO 9001:2015 Certified Training Centre'],
    ['Campus Address', '25(10/A) Shibtala Road, Nona Chandan Pukur, Barrackpore, Kolkata 700122, WB, India', '', ''],
    ['Phone / WhatsApp', '+91 70037 56860 / +91 84202 04207', 'Official Email', 'sukantahui@codernaccotax.co.in | info@codernaccotax.co.in'],
    ['Web Portal', 'https://www.codernaccotax.co.in', 'Core Specializations', 'Full Stack Engineering, Python, Advanced Excel, Power BI, Financial Modeling'],
  ];
  s1Data.forEach((row, idx) => {
    const rowNum = 28 + idx;
    if (idx === 1) {
      wsOverview.mergeCells("B" + rowNum + ":F" + rowNum);
      wsOverview.getCell("A" + rowNum).value = row[0];
      wsOverview.getCell("B" + rowNum).value = row[1];
    } else {
      wsOverview.getCell("A" + rowNum).value = row[0];
      wsOverview.getCell("B" + rowNum).value = row[1];
      wsOverview.getCell("C" + rowNum).value = row[2];
      wsOverview.getCell("D" + rowNum).value = row[3];
    }
  });

  wsOverview.mergeCells('A34:F34');
  const s4Header = wsOverview.getCell('A34');
  s4Header.value = '📑 2. WORKBOOK SHEET DIRECTORY & CLICK-TO-JUMP NAVIGATION TABLE';
  s4Header.font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: 'FFFFFFFF' } };
  s4Header.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD97706' } };

  const directoryHeaders = ['SL #', 'Sheet Name / Topic', 'Primary Formula / Technique', 'Business Context / Dataset', '🚀 Instant Quick Jump', 'Status'];
  const headerRow = wsOverview.getRow(35);
  headerRow.height = 26;
  directoryHeaders.forEach((h, cIdx) => {
    const cell = headerRow.getCell(cIdx + 1);
    cell.value = h;
    cell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E293B' } };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
  });

  // Sheet Catalog Data
  const topicSheetCatalog = [
    { id: 1, sheet: 'EX1001', title: 'Topic 0: Understanding Lookup Functions & Reference Tables', formula: 'Relational Table Design', context: 'Barrackpore Product Catalog', status: 'Core Lab' },
    { id: 2, sheet: 'EX1002', title: 'Topic 1: Importance of Unique Primary Keys & ID Hygiene', formula: 'Primary Key Indexing', context: 'Shyamnagar Employee Payroll', status: 'Core Lab' },
    { id: 3, sheet: 'EX1003', title: 'Topic 2: VLOOKUP Syntax, Arguments & Column Index', formula: '=VLOOKUP(key, table, col, FALSE)', context: 'Sales Invoices & Customers', status: 'Core Lab' },
    { id: 4, sheet: 'EX1004', title: 'Topic 3: Exact Match (0) vs Approximate Match (1)', formula: '=VLOOKUP(val, table, col, TRUE)', context: 'Tax Bracket Thresholds', status: 'Core Lab' },
    { id: 5, sheet: 'EX1005', title: 'Topic 4: Absolute References ($A$1) in Lookups', formula: '=VLOOKUP(A2, $B$2:$C$10, 2, 0)', context: 'Commission Rate Grid', status: 'Core Lab' },
    { id: 6, sheet: 'EX1006', title: 'Topic 5: Common VLOOKUP Errors & Troubleshooting', formula: '=IFERROR(VLOOKUP(...), "Not Found")', context: 'Audit Error Handling', status: 'Core Lab' },
    { id: 7, sheet: 'EX1007', title: 'Topic 6: HLOOKUP for Horizontal Data Grids', formula: '=HLOOKUP(key, table, row, FALSE)', context: 'Multi-Year Financial Balance Sheet', status: 'Core Lab' },
    { id: 8, sheet: 'EX1008', title: 'Topic 7: XMATCH Position Lookup Engine', formula: '=XMATCH(val, array, [match_mode], [search_mode])', context: 'Warehouse SKU Position Lookup', status: 'Core Lab' },
    { id: 9, sheet: 'EX1009', title: 'Topic 8: CHOOSE Index-Based Selection Engine', formula: '=CHOOSE(index, val1, val2, val3)', context: 'Financial Scenario Switcher', status: 'Core Lab' },
    { id: 10, sheet: 'EX1010', title: 'Topic 9: ADDRESS Dynamic Reference Construction', formula: '=ADDRESS(row, col, [abs], [a1], [sheet])', context: 'Dynamic Coordinates & INDIRECT', status: 'Core Lab' },
    { id: 11, sheet: 'EX1011', title: 'Topic 10: AREAS Non-Contiguous Selection Count', formula: '=AREAS((Range1, Range2, Range3))', context: 'Multi-Block Selection Audit', status: 'Core Lab' },
    { id: 12, sheet: 'EX1012', title: 'Topic 11: HYPERLINK Interactive Cell Navigation', formula: "=HYPERLINK(\"#'Sheet'!A1\", \"Friendly Name\")", context: 'Executive Dashboard Directory', status: 'Core Lab' },
    { id: 13, sheet: 'EX1013', title: 'Topic 12: INDEX Function Basics & Grid Coordinate', formula: '=INDEX(array, row_num, col_num)', context: 'Employee Salary Matrix', status: 'Core Lab' },
    { id: 14, sheet: 'EX1014', title: 'Topic 13: Combining INDEX and MATCH Engine', formula: '=INDEX(return_rng, MATCH(key, lookup_rng, 0))', context: 'Dynamic 2-Way Product Pricing', status: 'Core Lab' },
    { id: 15, sheet: 'EX1015', title: 'Topic 14: Left Lookup Superiority over VLOOKUP', formula: '=INDEX(ColA, MATCH(Key, ColB, 0))', context: 'Left Column Retrieval', status: 'Core Lab' },
    { id: 16, sheet: 'EX1016', title: 'Topic 15: Two-Way Matrix Intersection Lookup', formula: '=INDEX(Matrix, MATCH(Row), MATCH(Col))', context: 'Departmental Expense Matrix', status: 'Core Lab' },
    { id: 17, sheet: 'EX1017', title: 'Topic 16: Modern XLOOKUP Universal Engine (Excel 365)', formula: '=XLOOKUP(key, lookup_array, return_array)', context: 'Corporate Account Balances', status: 'Core Lab' },
    { id: 18, sheet: 'EX1018', title: 'Topic 17: XLOOKUP vs VLOOKUP Feature Comparison', formula: '=XLOOKUP(key, id_rng, name_dept_salary_rng)', context: 'Multi-Column Spilled Array', status: 'Core Lab' },
    { id: 19, sheet: 'EX1019', title: 'Topic 18: Handling Missing Values with IFERROR', formula: '=XLOOKUP(key, rng, ret_rng, "Not Found")', context: 'Graceful Audit Error Guard', status: 'Core Lab' },
    { id: 20, sheet: 'EX1020', title: 'Topic 19: Cross-Sheet and Cross-Workbook Lookups', formula: '=XLOOKUP(key, Sheet2!A:A, Sheet2!B:B)', context: 'Multi-Sheet Data Consolidation', status: 'Core Lab' },
    { id: 21, sheet: 'EX1021', title: 'Topic 20: Lookup with Multiple Boolean Criteria', formula: '=XLOOKUP(1, (Rng1=Val1)*(Rng2=Val2), RetRng)', context: 'Multi-Key Procurement Audit', status: 'Core Lab' },
    { id: 22, sheet: 'EX1022', title: 'Topic 21: Data Validation & Dependent Dropdowns', formula: 'Validation Source: =INDIRECT(Cell)', context: 'Category & Sub-Category Lists', status: 'Core Lab' },
    { id: 23, sheet: 'EX1023', title: 'Topic 22: Lookup Performance & Binary Search', formula: '=XLOOKUP(val, rng, ret_rng, , 2)', context: 'Large Sorted Dataset (50 Rows)', status: 'Core Lab' },
    { id: 24, sheet: 'EX1024', title: 'Topic 23: Practice Session: Dynamic Procurement', formula: '=XLOOKUP() + INDEX-MATCH', context: 'Procurement Orders Practice', status: 'Practice' },
    { id: 25, sheet: 'EX1025', title: 'Topic 24: Test Your Skill: Comprehensive Audit', formula: 'Mixed VLOOKUP, INDEX-MATCH, XLOOKUP', context: 'Skill Test Assessment Grid', status: 'Assessment' },
    { id: 26, sheet: 'EX1026', title: 'Topic 25: Dynamic Range Construction with OFFSET', formula: '=OFFSET(ref, rows, cols, [height], [width])', context: 'Rolling 3-Month Moving Average', status: 'Advanced' },
    { id: 27, sheet: 'EX1027', title: 'Topic 26: Grid Coordinate Functions (ROW, COLUMN)', formula: '=MOD(ROW(), 2)', context: 'Zebra Striping & Grid Math', status: 'Advanced' },
    { id: 28, sheet: 'EX1028', title: 'Topic 27: Dynamic Range Modeling Lab', formula: '=SUM(OFFSET(A1, 0, 0, COUNTA(A:A)))', context: 'Dynamic Range Modeling', status: 'Practice Lab' },
    { id: 29, sheet: 'EX1029', title: 'Topic 28: Practical Laboratory Exercises: Master Class', formula: 'Master Project Modeling Suite', context: 'Executive Capstone Master Class', status: 'Project Lab' }
  ];

  topicSheetCatalog.forEach((t, idx) => {
    const curRow = 36 + idx;
    const r = wsOverview.getRow(curRow);
    r.height = 20;

    const c1 = wsOverview.getCell("A" + curRow);
    c1.value = t.id;
    c1.alignment = { vertical: 'middle', horizontal: 'center' };

    const c2 = wsOverview.getCell("B" + curRow);
    c2.value = t.title;
    c2.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FF0F172A' } };
    c2.alignment = { vertical: 'middle', indent: 1 };

    const c3 = wsOverview.getCell("C" + curRow);
    c3.value = t.formula;
    c3.font = { name: 'Consolas', size: 9, color: { argb: 'FF0284C7' } };
    c3.alignment = { vertical: 'middle', indent: 1 };

    const c4 = wsOverview.getCell("D" + curRow);
    c4.value = t.context;
    c4.font = { name: 'Segoe UI', size: 9, color: { argb: 'FF475569' } };
    c4.alignment = { vertical: 'middle', indent: 1 };

    const c5 = wsOverview.getCell("E" + curRow);
    c5.value = { text: "👉 Open " + t.sheet + " Sheet", hyperlink: "#'" + t.sheet + "'!A1", tooltip: "Jump to " + t.sheet };
    c5.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FF0284C7' }, underline: true };
    c5.alignment = { vertical: 'middle', indent: 1 };

    const c6 = wsOverview.getCell("F" + curRow);
    c6.value = t.status;
    c6.font = { name: 'Segoe UI', size: 8.5, bold: true, color: { argb: 'FF059669' } };
    c6.alignment = { vertical: 'middle', horizontal: 'center' };

    ['A', 'B', 'C', 'D', 'E', 'F'].forEach(col => {
      const cell = wsOverview.getCell(col + curRow);
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: idx % 2 === 0 ? 'FFFFFFFF' : 'FFF8FAFC' } };
      cell.border = {
        top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        right: { style: 'thin', color: { argb: 'FFE2E8F0' } }
      };
    });
  });

  // Lock Overview sheet
  wsOverview.eachRow(r => r.eachCell(c => c.protection = { locked: true }));
  await wsOverview.protect('sukantahui', { selectLockedCells: true, selectUnlockedCells: true });

  // Helper for generating sample employee names & locations
  const names = ['Swadeep Hui', 'Tuhina Das', 'Abhronila Ray', 'Susmita Sen', 'Debangshu Roy', 'Rahul Kumar', 'Priya Sharma', 'Aniket Verma', 'Sourav Ganguly', 'Sneha Ghosh', 'Arpan Dey', 'Subhajit Pal', 'Riya Sarkar', 'Dipankar Mitra', 'Barnali Dutta', 'Vikram Singh', 'Kavita Nair', 'Amitabh Basu', 'Pooja Bannerjee', 'Sanjay Chakraborty', 'Tanmoy Das', 'Mousumi Mukhopadhyay', 'Bikash Chatterjee', 'Sayani Bose', 'Aritra Sen', 'Niladri Roy', 'Paromita Guha', 'Siddharth Mallick', 'Trisha Roy', 'Kaushik Hazra'];
  const locations = ['Barrackpore', 'Shyamnagar', 'Ichapur', 'Naihati', 'Titagarh', 'Kolkata', 'Howrah', 'Hooghly', 'Kanchrapara', 'Sodepur'];
  const departments = ['Finance', 'Accounts', 'Engineering', 'HR', 'Logistics', 'Procurement', 'Taxation', 'Audit'];

  // ===========================================================================
  // 2. CHILD TOPIC WORKSHEETS (EX1001 TO EX1029) WITH 30+ RICH ROWS PER TOPIC
  // ===========================================================================

  // EX1001: Relational Product Catalog (Topic 0)
  addStyledSheet('EX1001', 'FF0F172A',
    [{ header: 'Product ID' }, { header: 'Product Name' }, { header: 'Category' }, { header: 'Supplier Location' }, { header: 'Unit Price (₹)' }, { header: 'Stock Qty' }, { header: 'Reorder Level' }],
    names.map((n, i) => [
      "PRD-" + (1001 + i),
      "Enterprise Item " + String.fromCharCode(65 + (i % 26)) + (i + 1),
      i % 3 === 0 ? 'Hardware' : i % 3 === 1 ? 'Software' : 'Services',
      locations[i % locations.length],
      1500 + i * 250,
      120 - i * 3,
      25
    ])
  );

  // EX1002: Unique Primary Keys & ID Hygiene (Topic 1)
  addStyledSheet('EX1002', 'FF0284C7',
    [{ header: 'Emp ID (Primary Key)' }, { header: 'Employee Full Name' }, { header: 'Department' }, { header: 'Campus Location' }, { header: 'Base Salary (₹)' }, { header: 'Joining Date' }],
    names.map((n, i) => [
      "EMP-" + (201 + i),
      n,
      departments[i % departments.length],
      locations[i % locations.length],
      45000 + i * 1500,
      "2024-0" + ((i % 9) + 1) + "-15"
    ])
  );

  // EX1003: VLOOKUP Syntax & Column Index (Topic 2)
  addStyledSheet('EX1003', 'FF059669',
    [{ header: 'Invoice ID' }, { header: 'Customer Name' }, { header: 'Product Code' }, { header: 'Sales Amount (₹)' }, { header: 'VLOOKUP Customer City' }, { header: 'VLOOKUP Sales Rep' }],
    names.map((n, i) => [
      "INV-" + (8900 + i),
      n,
      "PRD-" + (1001 + (i % 10)),
      25000 + i * 1850,
      locations[i % locations.length],
      "Agent " + String.fromCharCode(65 + (i % 5))
    ])
  );

  // EX1004: Exact Match (0) vs Approximate Match (1) (Topic 3)
  addStyledSheet('EX1004', 'FFD97706',
    [{ header: 'Taxable Income (₹)' }, { header: 'Tax Slab Threshold (₹)' }, { header: 'Tax Rate (%)' }, { header: 'Approximate VLOOKUP Rate' }, { header: 'Tax Payable (₹)' }],
    Array.from({ length: 30 }, (_, i) => {
      const inc = 150000 + i * 75000;
      let rate = 0;
      if (inc >= 1500000) rate = 0.30;
      else if (inc >= 1200000) rate = 0.20;
      else if (inc >= 900000) rate = 0.15;
      else if (inc >= 600000) rate = 0.10;
      else if (inc >= 300000) rate = 0.05;
      return [inc, inc >= 300000 ? 300000 : 0, (rate * 100).toFixed(0) + "%", (rate * 100).toFixed(0) + "%", Math.round(inc * rate)];
    })
  );

  // EX1005: Absolute References ($A$1) in Lookups (Topic 4)
  addStyledSheet('EX1005', 'FF7C3AED',
    [{ header: 'Sales Rep' }, { header: 'Monthly Sales (₹)' }, { header: 'Commission Grid ($B$2:$C$6)' }, { header: 'Commission Rate' }, { header: 'Payout (₹)' }],
    names.map((n, i) => {
      const sales = 100000 + i * 35000;
      const rate = sales > 500000 ? 0.15 : sales > 300000 ? 0.10 : 0.05;
      return [n, sales, '$B$2:$C$6 Locked', (rate * 100).toFixed(0) + "%", Math.round(sales * rate)];
    })
  );

  // EX1006: Common VLOOKUP Errors & Troubleshooting (Topic 5)
  addStyledSheet('EX1006', 'FFDC2626',
    [{ header: 'Lookup Key' }, { header: 'Raw Key Status' }, { header: 'VLOOKUP Result' }, { header: 'Error Cause' }, { header: 'Cleaned IFERROR Formula' }],
    names.map((n, i) => [
      i % 4 === 0 ? "MISSING-" + i : "EMP-" + (201 + i),
      i % 4 === 0 ? 'Missing Key' : i % 3 === 0 ? 'Trailing Whitespace' : 'Valid Key',
      i % 4 === 0 ? '#N/A' : n,
      i % 4 === 0 ? 'Key Not Found' : i % 3 === 0 ? 'Text Trim Issue' : 'No Error',
      '=IFERROR(VLOOKUP(TRIM(A' + (4+i) + '), EMP_Table, 2, 0), "Not Found")'
    ])
  );

  // EX1007: HLOOKUP for Horizontal Data Grids (Topic 6)
  addStyledSheet('EX1007', 'FF0284C7',
    [{ header: 'Financial Metric' }, { header: 'FY 2021 (₹)' }, { header: 'FY 2022 (₹)' }, { header: 'FY 2023 (₹)' }, { header: 'FY 2024 (₹)' }, { header: 'FY 2025 (₹)' }, { header: 'FY 2026 (₹)' }],
    [
      ['Gross Sales Revenue', 4500000, 5200000, 6100000, 7400000, 8900000, 10500000],
      ['Cost of Goods Sold (COGS)', 2100000, 2400000, 2800000, 3300000, 3900000, 4600000],
      ['Gross Profit Margin', 2400000, 2800000, 3300000, 4100000, 5000000, 5900000],
      ['Operating Expenses (OPEX)', 800000, 950000, 1100000, 1300000, 1550000, 1800000],
      ['EBITDA Earnings', 1600000, 1850000, 2200000, 2800000, 3450000, 4100000],
      ['Depreciation & Amortization', 200000, 220000, 250000, 280000, 310000, 350000],
      ['Net Tax Expense (18%)', 252000, 293400, 351000, 453600, 565200, 675000],
      ['Net Profit After Tax (PAT)', 1148000, 1336600, 1599000, 2066400, 2574800, 3075000]
    ]
  );

  // EX1008: XMATCH Position Lookup Engine (Topic 7)
  addStyledSheet('EX1008', 'FF059669',
    [{ header: 'SKU Code' }, { header: 'Warehouse Location' }, { header: 'Stock Units' }, { header: 'XMATCH Row Index' }, { header: 'Reverse Search (-1)' }],
    names.map((n, i) => [
      "SKU-" + (401 + i),
      locations[i % locations.length],
      250 - i * 5,
      i + 1,
      '=XMATCH("SKU-' + (401 + i) + '", A:A, 0, -1)'
    ])
  );

  // EX1009: CHOOSE Index-Based Selection Engine (Topic 8)
  addStyledSheet('EX1009', 'FFD97706',
    [{ header: 'Project Name' }, { header: 'Scenario Index (1=Base, 2=Best, 3=Worst)' }, { header: 'Base Revenue (₹)' }, { header: 'Best Revenue (₹)' }, { header: 'Worst Revenue (₹)' }, { header: 'CHOOSE Selected Output (₹)' }],
    names.map((n, i) => {
      const idx = (i % 3) + 1;
      const base = 500000 + i * 25000;
      const best = base * 1.3;
      const worst = base * 0.7;
      const sel = idx === 1 ? base : idx === 2 ? best : worst;
      return ["Project " + n, idx, base, best, worst, Math.round(sel)];
    })
  );

  // EX1010: ADDRESS Dynamic Reference Construction (Topic 9)
  addStyledSheet('EX1010', 'FF7C3AED',
    [{ header: 'Row Num' }, { header: 'Col Num' }, { header: 'Abs Flag (1-4)' }, { header: 'Sheet Name' }, { header: 'ADDRESS Result' }, { header: 'INDIRECT Fetch' }],
    Array.from({ length: 30 }, (_, i) => [
      i + 4,
      (i % 5) + 1,
      (i % 4) + 1,
      'Overview',
      '=ADDRESS(' + (i + 4) + ', ' + ((i % 5) + 1) + ', ' + ((i % 4) + 1) + ', TRUE, "Overview")',
      'Cell Coordinate ' + (i + 1)
    ])
  );

   // EX1011: AREAS Non-Contiguous Selection Count (Topic 10)
  addStyledSheet('EX1011', 'FF0F172A',
    [{ header: 'Selection Name' }, { header: 'Range Syntax' }, { header: 'AREAS Formula' }, { header: 'Area Count' }, { header: 'Audit Status' }],
    Array.from({ length: 30 }, (_, i) => [
      `Selection Block ${i + 1}`,
      `(A${i+1}:B${i+5}, D${i+1}:E${i+5})`,
      `=AREAS((A${i+1}:B${i+5}, D${i+1}:E${i+5}))`,
      2,
      'Multi-Block Area Audit Passed'
    ])
  );

  // EX1012: HYPERLINK Interactive Cell Navigation (Topic 11)
  addStyledSheet('EX1012', 'FF0284C7',
    [{ header: 'Target Sheet / URL' }, { header: 'Friendly Display Name' }, { header: 'HYPERLINK Formula' }, { header: 'Action Type' }],
    topicSheetCatalog.map(t => [
      "#'" + t.sheet + "'!A1",
      "🚀 Jump to " + t.title,
      '=HYPERLINK("#\'' + t.sheet + '\'!A1", "🚀 Jump to ' + t.title + '")',
      'Internal Sheet Navigation'
    ])
  );

  // EX1013: INDEX Function Basics (Topic 12)
  addStyledSheet('EX1013', 'FF059669',
    [{ header: 'Emp ID' }, { header: 'Employee Name' }, { header: 'Department' }, { header: 'Base Pay (₹)' }, { header: 'INDEX(A4:D33, Row, Col)' }],
    names.map((n, i) => [
      "EMP-" + (301 + i),
      n,
      departments[i % departments.length],
      55000 + i * 2100,
      '=INDEX(A$4:D$33, ' + (i + 1) + ', 2)'
    ])
  );

  // EX1014: Combining INDEX and MATCH (Topic 13)
  addStyledSheet('EX1014', 'FFD97706',
    [{ header: 'Product Name' }, { header: 'Standard Tier (₹)' }, { header: 'Premium Tier (₹)' }, { header: 'Enterprise Tier (₹)' }, { header: 'INDEX-MATCH Result' }],
    names.map((n, i) => [
      "Software Package " + n,
      12000 + i * 500,
      24000 + i * 800,
      48000 + i * 1500,
      '=INDEX(B' + (4+i) + ':D' + (4+i) + ', MATCH("Premium Tier", B$3:D$3, 0))'
    ])
  );

  // EX1015: Left Lookup Superiority over VLOOKUP (Topic 14)
  addStyledSheet('EX1015', 'FF7C3AED',
    [{ header: 'Employee Name (Col A)' }, { header: 'Department (Col B)' }, { header: 'Emp ID (Col C - Lookup Key)' }, { header: 'INDEX-MATCH Left Lookup' }],
    names.map((n, i) => [
      n,
      departments[i % departments.length],
      "ID-" + (701 + i),
      '=INDEX(A$4:A$33, MATCH("ID-' + (701 + i) + '", C$4:C$33, 0))'
    ])
  );

  // EX1016: Two-Way Matrix Intersection Lookup (Topic 15)
  addStyledSheet('EX1016', 'FF0284C7',
    [{ header: 'Month' }, { header: 'Sales (₹)' }, { header: 'Marketing (₹)' }, { header: 'Engineering (₹)' }, { header: 'HR (₹)' }, { header: 'Finance (₹)' }],
    ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, i) => [
      m,
      150000 + i * 12000,
      80000 + i * 6000,
      250000 + i * 20000,
      45000 + i * 3000,
      60000 + i * 4000
    ])
  );

  // EX1017: Modern XLOOKUP Universal Engine (Topic 16)
  addStyledSheet('EX1017', 'FF059669',
    [{ header: 'Account No' }, { header: 'Client Name' }, { header: 'Account Type' }, { header: 'Balance (₹)' }, { header: 'XLOOKUP Return' }],
    names.map((n, i) => [
      "ACC-" + (9001 + i),
      n,
      i % 2 === 0 ? 'Savings' : 'Corporate Current',
      125000 + i * 45000,
      '=XLOOKUP("ACC-' + (9001 + i) + '", A$4:A$33, B$4:B$33)'
    ])
  );

  // EX1018: XLOOKUP vs VLOOKUP Feature Comparison (Topic 17)
  addStyledSheet('EX1018', 'FFD97706',
    [{ header: 'Client ID' }, { header: 'Client Name' }, { header: 'City' }, { header: 'Credit Limit (₹)' }, { header: 'XLOOKUP Multi-Column Return' }],
    names.map((n, i) => [
      "CLT-" + (501 + i),
      n,
      locations[i % locations.length],
      500000 + i * 50000,
      '=XLOOKUP("CLT-' + (501 + i) + '", A$4:A$33, B$4:D$33)'
    ])
  );

  // EX1019: Handling Missing Values with IFERROR (Topic 18)
  addStyledSheet('EX1019', 'FFDC2626',
    [{ header: 'Query Account' }, { header: 'Status' }, { header: 'XLOOKUP if_not_found Argument' }, { header: 'Result Output' }],
    names.map((n, i) => [
      i % 3 === 0 ? "MISSING-" + i : "ACC-" + (9001 + i),
      i % 3 === 0 ? 'Invalid Key' : 'Valid Key',
      '=XLOOKUP(A' + (4+i) + ', Accounts!A:A, Accounts!B:B, "Account Not Found")',
      i % 3 === 0 ? 'Account Not Found' : n
    ])
  );

  // EX1020: Cross-Sheet and Cross-Workbook Lookups (Topic 19)
  addStyledSheet('EX1020', 'FF0284C7',
    [{ header: 'Emp ID' }, { header: 'Cross-Sheet Target' }, { header: 'XLOOKUP Formula' }, { header: 'Fetched Value' }],
    names.map((n, i) => [
      "EMP-" + (201 + i),
      'Sheet EX1002',
      '=XLOOKUP(A' + (4+i) + ', EX1002!A:A, EX1002!B:B)',
      n
    ])
  );

  // EX1021: Multi-Criteria Boolean Lookups (Topic 20)
  addStyledSheet('EX1021', 'FF059669',
    [{ header: 'Region' }, { header: 'Sales Rep' }, { header: 'Product' }, { header: 'Quarter' }, { header: 'Revenue (₹)' }, { header: 'Multi-Criteria XLOOKUP' }],
    names.map((n, i) => [
      locations[i % locations.length],
      n,
      "PRD-" + (101 + (i % 5)),
      "Q" + ((i % 4) + 1),
      85000 + i * 4500,
      '=XLOOKUP(1, (A$4:A$33="' + locations[i % locations.length] + '")*(C$4:C$33="PRD-' + (101 + (i % 5)) + '"), E$4:E$33)'
    ])
  );

   // EX1022: Data Validation & Dependent Dropdowns (Topic 21)
  addStyledSheet('EX1022', 'FFD97706',
    [{ header: 'Category' }, { header: 'Sub-Category List' }, { header: 'Data Validation Range' }, { header: 'Selected Sub-Category' }],
    Array.from({ length: 30 }, (_, i) => [
      ['Electronics', 'Furniture', 'Stationery', 'Software'][i % 4],
      `Sub-Category ${i + 1}`,
      `=INDIRECT("${['Electronics', 'Furniture', 'Stationery', 'Software'][i % 4]}")`,
      `Selected Item ${i + 1}`
    ])
  );

  // EX1023: Lookup Performance & Binary Search (Topic 22)
  addStyledSheet('EX1023', 'FF7C3AED',
    [{ header: 'Sorted Transaction ID' }, { header: 'Timestamp' }, { header: 'Amount (₹)' }, { header: 'Binary Search Mode 2' }],
    Array.from({ length: 50 }, (_, i) => [
      10001 + i * 15,
      "2026-05-12 10:" + (i < 10 ? '0' + i : i) + ":00",
      15000 + i * 1250,
      '=XLOOKUP(' + (10001 + i * 15) + ', A$4:A$53, C$4:C$53, , 2)'
    ])
  );

  // EX1024: Practice Session: Dynamic Procurement (Topic 23)
  addStyledSheet('EX1024', 'FF0284C7',
    [{ header: 'PO Number' }, { header: 'Vendor Name' }, { header: 'Item Description' }, { header: 'Total Value (₹)' }, { header: 'Audit Status' }],
    names.map((n, i) => [
      "PO-2026-" + (101 + i),
      "Vendor " + n,
      "Procurement Contract Item " + (i + 1),
      145000 + i * 18000,
      'Audit Passed'
    ])
  );

  // EX1025: Skill Test Assessment Grid (Topic 24)
  addStyledSheet('EX1025', 'FF059669',
    [{ header: 'Candidate Name' }, { header: 'VLOOKUP Score' }, { header: 'INDEX-MATCH Score' }, { header: 'XLOOKUP Score' }, { header: 'Total Score' }],
    names.map((n, i) => [
      n,
      85 + (i % 15),
      90 + (i % 10),
      95 + (i % 5),
      270 + (i % 25)
    ])
  );

  // EX1026: Dynamic Range Construction with OFFSET (Topic 25)
  addStyledSheet('EX1026', 'FFD97706',
    [{ header: 'Month' }, { header: 'Sales (₹)' }, { header: 'Rolling 3-Month Window' }, { header: '3-Month Moving Average (₹)' }],
    ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, i) => [
      m,
      120000 + i * 15000,
      i >= 2 ? "Offset B" + (2+i) + ":B" + (4+i) : 'N/A',
      i >= 2 ? Math.round((120000 + i * 15000 + 120000 + (i-1) * 15000 + 120000 + (i-2) * 15000) / 3) : 'N/A'
    ])
  );

  // EX1027: Grid Coordinate Functions (ROW, COLUMN) (Topic 26)
  addStyledSheet('EX1027', 'FF7C3AED',
    [{ header: 'Row Number' }, { header: 'ROW()' }, { header: 'COLUMN()' }, { header: 'Zebra MOD(ROW(),2)' }],
    Array.from({ length: 30 }, (_, i) => [
      i + 4,
      '=ROW()',
      '=COLUMN()',
      (i + 4) % 2 === 0 ? 0 : 1
    ])
  );

  // EX1028: Dynamic Range Modeling Lab (Topic 27)
  addStyledSheet('EX1028', 'FF0F172A',
    [{ header: 'Year' }, { header: 'Revenue Projection (₹)' }, { header: 'Dynamic Height COUNTA(B:B)' }, { header: 'Dynamic Total SUM()' }],
    Array.from({ length: 30 }, (_, i) => [
      2026 + i,
      5000000 + i * 750000,
      i + 1,
      '=SUM(OFFSET(B$4, 0, 0, ' + (i + 1) + '))'
    ])
  );

  // EX1029: Master Class Project Lab (Topic 28)
  addStyledSheet('EX1029', 'FF059669',
    [{ header: 'Project ID' }, { header: 'Executive Capstone Scenario' }, { header: 'Primary Formula Engine' }, { header: 'Audit Status' }],
    names.map((n, i) => [
      "CAP-" + (901 + i),
      "Master Financial Modeling Suite for " + n,
      'XLOOKUP + INDEX-MATCH + OFFSET',
      'Certified Passed'
    ])
  );

  // Write Workbook
  const workbookPath = path.join(excelFilesDir, '002_005_lookup_functions_vlookup_hlookup_index_match_and_xlookup_master.xlsx');
  await wb.xlsx.writeFile(workbookPath);
  // Synchronize both prefixed and legacy file names
  const masterPath = path.join(excelFilesDir, '002_005_lookup_functions_vlookup_hlookup_index_match_and_xlookup_master.xlsx');
  const legacyPath = path.join(excelFilesDir, 'lookup_functions_vlookup_hlookup_index_match_and_xlookup_master.xlsx');
  if (fs.existsSync(masterPath)) fs.copyFileSync(masterPath, legacyPath);

  console.log("✓ Generated 002_005_lookup_functions_vlookup_hlookup_index_match_and_xlookup_master.xlsx for module 002_005 with 29 rich worksheet tabs!");
}

buildWorkbook();
