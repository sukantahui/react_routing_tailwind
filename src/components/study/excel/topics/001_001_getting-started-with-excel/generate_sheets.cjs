const ExcelJS = require('E:/react_routing_tailwind/node_modules/exceljs');
const fs = require('fs');
const path = require('path');

const excelBaseDir = 'E:/react_routing_tailwind/src/components/study/excel';
const moduleDir = path.join(excelBaseDir, 'topics/001_001_getting-started-with-excel');
const excelFilesDir = path.join(moduleDir, 'excel_files');
if (!fs.existsSync(excelFilesDir)) fs.mkdirSync(excelFilesDir, { recursive: true });

// Sample datasets for 30 realistic workplace rows per topic
const names = ['Swadeep Hui', 'Tuhina Das', 'Abhronila Ray', 'Susmita Sen', 'Debangshu Roy', 'Rahul Kumar', 'Priya Sharma', 'Aniket Verma', 'Sourav Ganguly', 'Sneha Ghosh', 'Arpan Dey', 'Subhajit Pal', 'Riya Sarkar', 'Dipankar Mitra', 'Barnali Dutta', 'Vikram Singh', 'Kavita Nair', 'Amitabh Basu', 'Pooja Bannerjee', 'Sanjay Chakraborty', 'Tanmoy Das', 'Mousumi Mukhopadhyay', 'Bikash Chatterjee', 'Sayani Bose', 'Aritra Sen', 'Niladri Roy', 'Paromita Guha', 'Siddharth Mallick', 'Trisha Roy', 'Kaushik Hazra'];
const cities = ['Barrackpore', 'Shyamnagar', 'Ichapur', 'Naihati', 'Titagarh', 'Kolkata', 'Howrah', 'Hooghly', 'Kanchrapara', 'Sodepur'];
const depts = ['Finance', 'Accounts', 'Engineering', 'HR', 'Logistics', 'Procurement', 'Taxation', 'Audit'];

const topicsInfo = [
  {
    id: 'Topic0',
    title: 'What Excel Is and Where It Is Used in Study and Work',
    columns: [
      { header: 'Record_ID', key: 'id' },
      { header: 'Organization / Company', key: 'org' },
      { header: 'Department', key: 'dept' },
      { header: 'City Location', key: 'city' },
      { header: 'Excel Application Area', key: 'area' },
      { header: 'Monthly Data Volume (Rows)', key: 'vol' },
      { header: 'Operational Status', key: 'stat' }
    ],
    generateRows: () => Array.from({ length: 30 }, (_, i) => [
      `EX-00${i + 1}`,
      `${names[i % names.length]} Enterprises`,
      depts[i % depts.length],
      cities[i % cities.length],
      i % 4 === 0 ? 'Financial Modeling & Budgeting' : i % 4 === 1 ? 'Inventory & Stock Tracking' : i % 4 === 2 ? 'Payroll & Tax Audit Preparation' : 'Sales Pipeline Analytics',
      12000 + (i * 3500),
      'Active Production Model'
    ])
  },
  {
    id: 'Topic1',
    title: 'Excel vs Google Sheets vs Modern Spreadsheet Engines',
    columns: [
      { header: 'Feature_ID', key: 'id' },
      { header: 'Spreadsheet Engine', key: 'engine' },
      { header: 'Max Grid Capacity (Rows)', key: 'rows' },
      { header: 'VBA / Macro Automation', key: 'vba' },
      { header: 'Local Calculation Speed', key: 'speed' },
      { header: 'Offline Full Capability', key: 'offline' },
      { header: 'Enterprise Security Rating', key: 'sec' }
    ],
    generateRows: () => Array.from({ length: 30 }, (_, i) => [
      `CMP-10${i + 1}`,
      i % 2 === 0 ? 'Microsoft Excel 365 / 2021' : 'Google Sheets Cloud Engine',
      i % 2 === 0 ? 1048576 : 10000000,
      i % 2 === 0 ? 'Native VBA & C++ Add-Ins' : 'Google Apps Script (JS)',
      i % 2 === 0 ? 'Ultra Fast (Multi-threaded C++)' : 'Browser JS / Server Bound',
      i % 2 === 0 ? 'Full Native Desktop' : 'Limited Offline Sync',
      i % 2 === 0 ? 'ISO/IEC 27001 & AES-256' : 'Google Workspace Cloud Auth'
    ])
  },
  {
    id: 'Topic2',
    title: 'Exploring the Interface: Ribbon, Formula Bar & Quick Access Toolbar',
    columns: [
      { header: 'Control_ID', key: 'id' },
      { header: 'Interface Element', key: 'elem' },
      { header: 'Ribbon Tab Location', key: 'tab' },
      { header: 'Command / Key Combo', key: 'combo' },
      { header: 'Workplace Function', key: 'func' },
      { header: 'Customization Option', key: 'cust' },
      { header: 'Audit Ergonomics Score', key: 'score' }
    ],
    generateRows: () => Array.from({ length: 30 }, (_, i) => [
      `UI-20${i + 1}`,
      i % 5 === 0 ? 'Quick Access Toolbar (QAT)' : i % 5 === 1 ? 'Formula Bar Multi-Line' : i % 5 === 2 ? 'Name Box Range Jump' : i % 5 === 3 ? 'Status Bar Auto-Calculate' : 'Ribbon Display Options',
      i % 5 === 0 ? 'Top Left Window Bar' : i % 5 === 1 ? 'Formula Bar (Expand Ctrl+Shift+U)' : i % 5 === 2 ? 'Left of Formula Bar' : i % 5 === 3 ? 'Bottom Window Status Line' : 'Top Right Ribbon Collapse',
      i % 5 === 0 ? 'Alt + 1, Alt + 2' : i % 5 === 1 ? 'Ctrl + Shift + U' : i % 5 === 2 ? 'Type Cell Ref & Enter' : i % 5 === 3 ? 'Right-click Status Bar' : 'Ctrl + F1',
      i % 5 === 0 ? '1-Click Save / Undo / Redo / Paste Values' : i % 5 === 1 ? 'View long nested IF / XLOOKUP formulas' : i % 5 === 2 ? 'Teleport to distant ranges or Named Ranges' : i % 5 === 3 ? 'Instant Sum, Average, Count on selected range' : 'Toggle Ribbon tabs show/hide',
      'Fully Customizable',
      '10 / 10'
    ])
  },
  {
    id: 'Topic3',
    title: 'Understanding Workbooks, Worksheets, Rows, Columns & Limits',
    columns: [
      { header: 'Limit_ID', key: 'id' },
      { header: 'Workbook Structure Component', key: 'comp' },
      { header: 'Grid Boundary Specification', key: 'spec' },
      { header: 'Maximum Quantity Limit', key: 'limit' },
      { header: 'Memory Model Impact', key: 'impact' },
      { header: 'Workplace Best Practice', key: 'best' },
      { header: 'Verification Status', key: 'stat' }
    ],
    generateRows: () => Array.from({ length: 30 }, (_, i) => [
      `GRID-30${i + 1}`,
      i % 4 === 0 ? 'Total Rows Per Worksheet' : i % 4 === 1 ? 'Total Columns Per Worksheet' : i % 4 === 2 ? 'Cell Text Character Limit' : 'Total Worksheets per Workbook',
      i % 4 === 0 ? 'Row 1 down to Row 1,048,576' : i % 4 === 1 ? 'Column A right to Column XFD (16,384)' : i % 4 === 2 ? '32,767 Characters in Cell Memory' : 'Limited only by available System RAM',
      i % 4 === 0 ? '1,048,576 Rows' : i % 4 === 1 ? '16,384 Columns' : i % 4 === 2 ? '32,767 Chars' : 'Unlimited (RAM dependent)',
      i % 4 === 0 ? '64-bit Memory Addressing' : i % 4 === 1 ? 'OpenXML Column Addressing' : i % 4 === 2 ? 'String Buffer Pointer' : 'Workbook Tree Allocation',
      'Keep data clean and modular',
      'Verified'
    ])
  },
  {
    id: 'Topic4',
    title: 'Creating, Saving, AutoRecover, and File Formats (.xlsx, .xlsm, .xlsb, .csv)',
    columns: [
      { header: 'Format_ID', key: 'id' },
      { header: 'Target File Format', key: 'fmt' },
      { header: 'Extension', key: 'ext' },
      { header: 'VBA Macro Support', key: 'vba' },
      { header: 'Binary Compression', key: 'comp' },
      { header: 'Primary Enterprise Use Case', key: 'use' },
      { header: 'Security Profile', key: 'sec' }
    ],
    generateRows: () => Array.from({ length: 30 }, (_, i) => [
      `FMT-40${i + 1}`,
      i % 5 === 0 ? 'Excel OpenXML Workbook' : i % 5 === 1 ? 'Excel Macro-Enabled Workbook' : i % 5 === 2 ? 'Excel Binary Workbook' : i % 5 === 3 ? 'Comma Separated Values' : 'PDF Document Export',
      i % 5 === 0 ? '.xlsx' : i % 5 === 1 ? '.xlsm' : i % 5 === 2 ? '.xlsb' : i % 5 === 3 ? '.csv' : '.pdf',
      i % 5 === 1 ? 'YES (Full VBA Modules)' : 'NO (Macros stripped on save)',
      i % 5 === 2 ? 'High (Binary Data Stream)' : 'Standard Zip XML',
      i % 5 === 0 ? 'Standard Financial Reports' : i % 5 === 1 ? 'Automated VBA Workflows' : i % 5 === 2 ? 'Massive 500MB Data Models' : i % 5 === 3 ? 'SQL / ERP Database Import' : 'Executive Boardroom Printing',
      i % 5 === 0 ? 'Safe Macro-Free' : 'Macro Security Required'
    ])
  },
  {
    id: 'Topic5',
    title: 'High-Speed Navigation: Keyboard Shortcuts & Teleportation',
    columns: [
      { header: 'Nav_ID', key: 'id' },
      { header: 'Navigation Objective', key: 'obj' },
      { header: 'Keyboard Shortcut / Action', key: 'short' },
      { header: 'Target Coordinates', key: 'coord' },
      { header: 'Execution Speed', key: 'speed' },
      { header: 'Efficiency Gain', key: 'gain' },
      { header: 'Workplace Scenario', key: 'scen' }
    ],
    generateRows: () => Array.from({ length: 30 }, (_, i) => [
      `NAV-50${i + 1}`,
      i % 5 === 0 ? 'Jump to Last Data Row' : i % 5 === 1 ? 'Select Continuous Block' : i % 5 === 2 ? 'Return to Cell A1' : i % 5 === 3 ? 'Jump to Last Used Cell' : 'Teleport via Name Box',
      i % 5 === 0 ? 'Ctrl + Down Arrow' : i % 5 === 1 ? 'Ctrl + Shift + Down/Right' : i % 5 === 2 ? 'Ctrl + Home' : i % 5 === 3 ? 'Ctrl + End' : 'Type cell address in Name Box & Enter',
      i % 5 === 0 ? 'Row 50,000 Edge' : i % 5 === 1 ? 'A1:Z5000 Range' : i % 5 === 2 ? 'Cell A1' : i % 5 === 3 ? 'Bottom-Right Cell' : 'Sheet3!AA500',
      '0.01 seconds',
      '99% Faster than mouse scroll',
      `${cities[i % cities.length]} Ledger Audit`
    ])
  },
  {
    id: 'Topic6',
    title: 'Cell Referencing Fundamentals: Relative, Absolute ($), Mixed & 3D',
    columns: [
      { header: 'Ref_ID', key: 'id' },
      { header: 'Referencing Type', key: 'type' },
      { header: 'Formula Syntax Example', key: 'syn' },
      { header: 'Behavior when Dragged', key: 'beh' },
      { header: 'Dollar Sign ($) Lock', key: 'lock' },
      { header: 'Enterprise Application', key: 'app' },
      { header: 'F4 Cycle Action', key: 'f4' }
    ],
    generateRows: () => Array.from({ length: 30 }, (_, i) => [
      `REF-60${i + 1}`,
      i % 4 === 0 ? 'Relative Reference' : i % 4 === 1 ? 'Absolute Reference' : i % 4 === 2 ? 'Mixed Reference (Row/Col Lock)' : '3D Cross-Sheet Reference',
      i % 4 === 0 ? '=B4*C4' : i % 4 === 1 ? '=B4*$F$1' : i % 4 === 2 ? '=$A4*B$1' : "=SUM('Jan:Dec'!E20)",
      i % 4 === 0 ? 'Shifts row & column relative to drag' : i % 4 === 1 ? 'Stays permanently locked to cell F1' : i % 4 === 2 ? 'Column A locked, Row 1 locked' : 'Aggregates identical cell across sheets',
      i % 4 === 0 ? 'No $ signs' : i % 4 === 1 ? 'Both $ Column & $ Row' : i % 4 === 2 ? 'One $ sign ($A4 or A$4)' : 'Sheet tab stack range',
      i % 4 === 0 ? 'Line-by-line item math' : i % 4 === 1 ? 'Fixed GST / Tax Rate Lookup' : i % 4 === 2 ? '2D Price Multiplier Matrix' : 'Annual Consolidated Financials',
      'Press F4 key to toggle $ locks'
    ])
  },
  {
    id: 'Topic7',
    title: 'Project Work: Real-World Application of Getting Started with Excel',
    columns: [
      { header: 'Project_ID', key: 'id' },
      { header: 'Workplace Project Title', key: 'title' },
      { header: 'Candidate / Auditor', key: 'cand' },
      { header: 'Center Campus Location', key: 'loc' },
      { header: 'Budget Allocated (₹)', key: 'bud' },
      { header: 'Target Practice Formula', key: 'form' },
      { header: 'Project Completion Status', key: 'stat' }
    ],
    generateRows: () => Array.from({ length: 30 }, (_, i) => [
      `PRJ-70${i + 1}`,
      i % 3 === 0 ? 'Personal & Corporate Monthly Budget Engine' : i % 3 === 1 ? 'Multi-Branch Inventory & Stock Audit' : 'Employee Attendance & Payroll Ledger',
      names[i % names.length],
      cities[i % cities.length],
      45000 + (i * 4200),
      i % 3 === 0 ? '=SUM(C4:C33)' : i % 3 === 1 ? '=AVERAGE(E4:E33)' : '=COUNTA(B4:B33)',
      'Passed Lab Inspection'
    ])
  },
  {
    id: 'Topic8',
    title: 'Practice Multiple Choice Questions (MCQ): Comprehensive Mastery',
    columns: [
      { header: 'MCQ_ID', key: 'id' },
      { header: 'Question Category', key: 'cat' },
      { header: 'Target Shortcut / Feature', key: 'feat' },
      { header: 'Option A', key: 'optA' },
      { header: 'Option B (Correct)', key: 'optB' },
      { header: 'Option C', key: 'optC' },
      { header: 'Difficulty Tier', key: 'diff' }
    ],
    generateRows: () => Array.from({ length: 30 }, (_, i) => [
      `MCQ-80${i + 1}`,
      i % 3 === 0 ? 'Interface & Ribbon Ergonomics' : i % 3 === 1 ? 'Navigation & Selection' : 'Cell Referencing ($)',
      i % 3 === 0 ? 'F4 Keystroke Action' : i % 3 === 1 ? 'Ctrl + Down Arrow' : 'Formula Bar Expansion',
      'Changes font size',
      'Toggles Absolute ($) reference locks on selected cell',
      'Deletes current row',
      'Essential Mastery'
    ])
  },
  {
    id: 'Topic9',
    title: 'Quick Check Quiz: Interface Ergonomics, Grid Mechanics & Fundamentals',
    columns: [
      { header: 'Quiz_ID', key: 'id' },
      { header: 'Quiz Topic Focus', key: 'foc' },
      { header: 'Practical Scenario Question', key: 'q' },
      { header: 'Recommended Execution Step', key: 'step' },
      { header: 'Expected Output Result', key: 'out' },
      { header: 'Score (Points)', key: 'pts' },
      { header: 'Mastery Status', key: 'stat' }
    ],
    generateRows: () => Array.from({ length: 30 }, (_, i) => [
      `QUIZ-90${i + 1}`,
      i % 3 === 0 ? 'Workbook File Formats' : i % 3 === 1 ? 'Quick Access Toolbar' : 'Absolute Reference Lock',
      `How do you lock parameter cell $B$1 while dragging formula down in ${cities[i % cities.length]} branch?`,
      'Highlight cell ref and press F4 to insert $ signs',
      'Formula locks parameter permanently without drift',
      10,
      '100% Passed'
    ])
  }
];

async function buildWorkbook() {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Coder & AccoTax';
  wb.lastModifiedBy = 'Sukanta Hui';
  wb.created = new Date();
  wb.modified = new Date();

  // Helper for adding styled sheet
  function addStyledSheet(sheetName, headerColor, columns, data) {
    const ws = wb.addWorksheet(sheetName, { views: [{ showGridLines: true }] });

    // Cell A1 Navigation Return Button
    ws.mergeCells('A1:D1');
    const navCell = ws.getCell('A1');
    navCell.value = { text: '🏠 Jump to Executive Overview Landing Sheet', hyperlink: "#'Overview'!A1" };
    navCell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FF0284C7' }, underline: true };
    navCell.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
    ws.getRow(1).height = 24;

    // Header Row at Row 3
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

    // 30 Data Rows
    data.forEach((row, idx) => {
      const rNum = 4 + idx;
      const r = ws.getRow(rNum);
      r.height = 22;
      row.forEach((val, cIdx) => {
        const cell = r.getCell(cIdx + 1);
        cell.value = val;
        cell.font = { name: 'Segoe UI', size: 10 };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: idx % 2 === 0 ? 'FFF8FAFC' : 'FFFFFFFF' } };
        cell.alignment = { vertical: 'middle', horizontal: typeof val === 'number' ? 'right' : 'left' };
        cell.border = {
          top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
          bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
          left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
          right: { style: 'thin', color: { argb: 'FFE2E8F0' } }
        };
      });
    });

    // Column widths auto-adjust
    columns.forEach((col, colIdx) => {
      let maxLen = col.header ? col.header.toString().length : 12;
      data.forEach(r => {
        if (r[colIdx] !== null && r[colIdx] !== undefined) {
          const s = r[colIdx].toString();
          if (s.length > maxLen) maxLen = s.length;
        }
      });
      ws.getColumn(colIdx + 1).width = Math.max(maxLen + 5, 22);
    });

    return ws;
  }

  // 1. Executive Overview Landing Sheet
  const wsOverview = wb.addWorksheet('Overview', { views: [{ showGridLines: true }] });
  wsOverview.columns = [{ width: 22 }, { width: 35 }, { width: 35 }, { width: 45 }, { width: 25 }, { width: 30 }];

  // Logo insertion if exists
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
  bSub2.value = `Module 001_001: Getting Started with Excel\nMaster Practice Workbook | Created by Sukanta Hui | ISO 9001:2015 Certified`;
  bSub2.font = { name: 'Segoe UI', size: 9, color: { argb: 'FFFBBF24' } };
  bSub2.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true, indent: 1 };
  bSub2.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E293B' } };

  const landingImgPath = path.join(excelBaseDir, 'assets/landing_sheet.jpg');
  if (fs.existsSync(landingImgPath)) {
    const landingImgId = wb.addImage({ filename: landingImgPath, extension: 'jpeg' });
    wsOverview.addImage(landingImgId, { tl: { col: 0.15, row: 5.2 }, ext: { width: 600, height: 380 }, editAs: 'oneCell' });
  }
  for (let r = 6; r <= 25; r++) wsOverview.getRow(r).height = 20;

  // Institute Profile
  wsOverview.mergeCells('A27:F27');
  const s1Header = wsOverview.getCell('A27');
  s1Header.value = '🏢 1. ORGANISATION PROFILE & CONTACT DETAILS';
  s1Header.font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: 'FFFFFFFF' } };
  s1Header.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0284C7' } };

  const s1Data = [
    ['Institute Name', 'Coder & AccoTax', 'Accreditation', 'ISO 9001:2015 Certified Training Centre'],
    ['Campus Address', '25(10/A) Shibtala Road, Nona Chandan Pukur, Barrackpore, Kolkata 700122, WB, India', '', ''],
    ['Phone / WhatsApp', '+91 70037 56860', 'Official Email', 'sukantahui@codernaccotax.co.in | info@codernaccotax.co.in'],
    ['Web Portal', 'https://www.codernaccotax.co.in', 'Core Specializations', 'Full Stack Engineering, Python, Advanced Excel, Power BI, Financial Modeling'],
  ];
  s1Data.forEach((row, idx) => {
    const rowNum = 28 + idx;
    if (idx === 1) {
      wsOverview.mergeCells(`B${rowNum}:F${rowNum}`);
      wsOverview.getCell(`A${rowNum}`).value = row[0];
      wsOverview.getCell(`B${rowNum}`).value = row[1];
    } else {
      wsOverview.getCell(`A${rowNum}`).value = row[0];
      wsOverview.getCell(`B${rowNum}`).value = row[1];
      wsOverview.getCell(`C${rowNum}`).value = row[2];
      wsOverview.getCell(`D${rowNum}`).value = row[3];
    }
  });

  // Sheet Directory Table with Click-to-Jump Hyperlinks
  wsOverview.mergeCells('A34:F34');
  const s4Header = wsOverview.getCell('A34');
  s4Header.value = '📑 2. WORKBOOK SHEET DIRECTORY & CLICK-TO-JUMP NAVIGATION TABLE';
  s4Header.font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: 'FFFFFFFF' } };
  s4Header.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD97706' } };

  const directoryHeaders = ['Sheet Tab Name (Click to Jump)', 'Topic Title & Focus Area', 'Difficulty Tier', 'Rows Count', 'Status'];
  const headerRow = wsOverview.getRow(35);
  headerRow.height = 26;
  directoryHeaders.forEach((h, cIdx) => {
    const cell = headerRow.getCell(cIdx + 1);
    cell.value = h;
    cell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E293B' } };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
  });

  topicsInfo.forEach((t, idx) => {
    const rNum = 36 + idx;
    const r = wsOverview.getRow(rNum);
    r.height = 22;

    // Hyperlink cell to child worksheet
    const navCell = r.getCell(1);
    navCell.value = { text: `➡️ Jump to ${t.id}`, hyperlink: `#'${t.id}'!A1` };
    navCell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FF0284C7' }, underline: true };
    navCell.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };

    r.getCell(2).value = t.title;
    r.getCell(3).value = idx <= 6 ? 'Beginner / Essential' : 'Practice & Assessment';
    r.getCell(4).value = '30 Rows';
    r.getCell(5).value = 'Verified & Ready';

    for (let c = 1; c <= 5; c++) {
      const cell = r.getCell(c);
      if (c > 1) cell.font = { name: 'Segoe UI', size: 10 };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: idx % 2 === 0 ? 'FFF8FAFC' : 'FFFFFFFF' } };
      cell.border = {
        top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        right: { style: 'thin', color: { argb: 'FFE2E8F0' } }
      };
    }
  });

  // Protect Overview sheet structure
  wsOverview.protect('sukantahui', { selectLockedCells: true, selectUnlockedCells: true });

  // 2. Generate child sheets Topic0 to Topic9
  topicsInfo.forEach((t) => {
    addStyledSheet(t.id, 'FF0F172A', t.columns, t.generateRows());
  });

  // Write Master Excel Workbook files
  const masterPath1 = path.join(excelFilesDir, '001_001_getting_started_with_excel_master.xlsx');
  const masterPath2 = path.join(excelFilesDir, 'getting_started_with_excel_master.xlsx');

  await wb.xlsx.writeFile(masterPath1);
  fs.copyFileSync(masterPath1, masterPath2);

  console.log(`✓ Successfully created master workbook for module 001_001_getting-started-with-excel`);
  console.log(`  File Location: ${masterPath1}`);
  console.log(`  Sheets generated: Overview, ${topicsInfo.map(t => t.id).join(', ')}`);
}

buildWorkbook().catch(console.error);
