const ExcelJS = require('E:/react_routing_tailwind/node_modules/exceljs');
const fs = require('fs');
const path = require('path');

const excelBaseDir = 'E:/react_routing_tailwind/src/components/study/excel';
const moduleDir = path.join(excelBaseDir, 'topics/001_001_getting-started-with-excel');
const excelFilesDir = path.join(moduleDir, 'excel_files');
if (!fs.existsSync(excelFilesDir)) fs.mkdirSync(excelFilesDir, { recursive: true });


  // Rich 30-Row Workplace Data Generator Helper
  const sampleNames = ['Swadeep Hui', 'Tuhina Das', 'Abhronila Ray', 'Susmita Sen', 'Debangshu Roy', 'Rahul Kumar', 'Priya Sharma', 'Aniket Verma', 'Sourav Ganguly', 'Sneha Ghosh', 'Arpan Dey', 'Subhajit Pal', 'Riya Sarkar', 'Dipankar Mitra', 'Barnali Dutta', 'Vikram Singh', 'Kavita Nair', 'Amitabh Basu', 'Pooja Bannerjee', 'Sanjay Chakraborty', 'Tanmoy Das', 'Mousumi Mukhopadhyay', 'Bikash Chatterjee', 'Sayani Bose', 'Aritra Sen', 'Niladri Roy', 'Paromita Guha', 'Siddharth Mallick', 'Trisha Roy', 'Kaushik Hazra'];
  const sampleCities = ['Barrackpore', 'Shyamnagar', 'Ichapur', 'Naihati', 'Titagarh', 'Kolkata', 'Howrah', 'Hooghly', 'Kanchrapara', 'Sodepur'];
  const sampleDepts = ['Finance', 'Accounts', 'Engineering', 'HR', 'Logistics', 'Procurement', 'Taxation', 'Audit'];
  const sampleCats = ['Hardware', 'Software', 'Services', 'Cloud Subscriptions', 'Office Assets', 'Consumables'];

  function generate30Rows(sheetPrefix, formulaType) {
    return Array.from({ length: 30 }, (_, i) => [
      `${sheetPrefix}-${101 + i}`,
      sampleNames[i % sampleNames.length],
      sampleDepts[i % sampleDepts.length],
      sampleCities[i % sampleCities.length],
      sampleCats[i % sampleCats.length],
      15000 + i * 3250,
      i % 2 === 0 ? 'Active / Verified' : 'Pending Audit'
    ]);
  }

async function buildWorkbook() {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Coder & AccoTax';
  wb.lastModifiedBy = 'Sukanta Hui';
  wb.created = new Date();
  wb.modified = new Date();

  function addStyledSheet(sheetName, headerColor, columns, data) {
    const ws = wb.addWorksheet(sheetName, { views: [{ showGridLines: true }] });

    ws.mergeCells('A1:D1');
    const navCell = ws.getCell('A1');
    navCell.value = { text: '🏠 Jump to Executive Overview Landing Sheet', hyperlink: "#'Overview'!A1" };
    navCell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FF0284C7' }, underline: true };
    navCell.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
    ws.getRow(1).height = 24;

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

  // 1. Executive Overview Sheet
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
  bSub2.value = `Module 1: 001_001_getting-started-with-excel\nCurriculum Track: EXCEL-PRO-901 | Student Practice Workbook`;
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

  wsOverview.mergeCells('A34:F34');
  const s4Header = wsOverview.getCell('A34');
  s4Header.value = '📑 2. WORKBOOK SHEET DIRECTORY & CLICK-TO-JUMP NAVIGATION TABLE';
  s4Header.font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: 'FFFFFFFF' } };
  s4Header.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD97706' } };

  const directoryHeaders = ['Sheet ID (Click to Jump)', 'Project Title', 'Difficulty Level', 'Target Formula / Mask', 'Status'];
  const headerRow = wsOverview.getRow(35);
  headerRow.height = 26;
  directoryHeaders.forEach((h, cIdx) => {
    const cell = headerRow.getCell(cIdx + 1);
    cell.value = h;
    cell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E293B' } };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
  });

  const moduleProjects = [
  {
    "projectId": "EX101",
    "title": "Excel Interface & Ribbon Setup (Lab Exercise 1)",
    "difficulty": "beginner",
    "sheetName": "EX101",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for excel interface & ribbon setup. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX101.",
    "requirements": [
      "Ensure target worksheet tab is named EX101.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX101** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX101**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=ExcelInterfaceRibbonSetup(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "11250",
      "mask": "Mask: EX101_Standard",
      "rendered": "Rendered Output 1 (EX101)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX101-01 | 11250 | Rendered Output | Passed |\n| EX101-02 | 21250 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX101 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX102",
    "title": "Quick Access Toolbar Customization (Lab Exercise 2)",
    "difficulty": "beginner",
    "sheetName": "EX102",
    "formula": "=XLOOKUP(A3, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for quick access toolbar customization. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX102.",
    "requirements": [
      "Ensure target worksheet tab is named EX102.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX102** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX102**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=QuickAccessToolbarCustomization(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "12500",
      "mask": "Mask: EX102_Standard",
      "rendered": "Rendered Output 2 (EX102)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX102-01 | 12500 | Rendered Output | Passed |\n| EX102-02 | 22500 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX102 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX103",
    "title": "Name Box & Cell Reference Navigation (Lab Exercise 3)",
    "difficulty": "beginner",
    "sheetName": "EX103",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for name box & cell reference navigation. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX103.",
    "requirements": [
      "Ensure target worksheet tab is named EX103.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX103** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX103**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=NameBoxCellReferenceNavigation(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "13750",
      "mask": "Mask: EX103_Standard",
      "rendered": "Rendered Output 3 (EX103)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX103-01 | 13750 | Rendered Output | Passed |\n| EX103-02 | 23750 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX103 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX104",
    "title": "Formula Bar Expansion & Edit Mode (Lab Exercise 4)",
    "difficulty": "beginner",
    "sheetName": "EX104",
    "formula": "=XLOOKUP(A5, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for formula bar expansion & edit mode. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX104.",
    "requirements": [
      "Ensure target worksheet tab is named EX104.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX104** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX104**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=FormulaBarExpansionEditMode(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "15000",
      "mask": "Mask: EX104_Standard",
      "rendered": "Rendered Output 4 (EX104)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX104-01 | 15000 | Rendered Output | Passed |\n| EX104-02 | 25000 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX104 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX105",
    "title": "Status Bar Statistical Summary (Lab Exercise 5)",
    "difficulty": "beginner",
    "sheetName": "EX105",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for status bar statistical summary. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX105.",
    "requirements": [
      "Ensure target worksheet tab is named EX105.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX105** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX105**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=StatusBarStatisticalSummary(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "16250",
      "mask": "Mask: EX105_Standard",
      "rendered": "Rendered Output 5 (EX105)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX105-01 | 16250 | Rendered Output | Passed |\n| EX105-02 | 26250 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX105 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX106",
    "title": "Worksheet Tab Management & Color Coding (Lab Exercise 6)",
    "difficulty": "beginner",
    "sheetName": "EX106",
    "formula": "=XLOOKUP(A7, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for worksheet tab management & color coding. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX106.",
    "requirements": [
      "Ensure target worksheet tab is named EX106.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX106** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX106**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=WorksheetTabManagementColorCoding(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "17500",
      "mask": "Mask: EX106_Standard",
      "rendered": "Rendered Output 6 (EX106)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX106-01 | 17500 | Rendered Output | Passed |\n| EX106-02 | 27500 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX106 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX107",
    "title": "Workbook Saving (.xlsx vs .csv vs .xlsb) (Lab Exercise 7)",
    "difficulty": "beginner",
    "sheetName": "EX107",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for workbook saving (.xlsx vs .csv vs .xlsb). Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX107.",
    "requirements": [
      "Ensure target worksheet tab is named EX107.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX107** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX107**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=WorkbookSavingxlsxvscsvvsxlsb(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "18750",
      "mask": "Mask: EX107_Standard",
      "rendered": "Rendered Output 7 (EX107)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX107-01 | 18750 | Rendered Output | Passed |\n| EX107-02 | 28750 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX107 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX108",
    "title": "Gridlines & View Customization (Lab Exercise 8)",
    "difficulty": "beginner",
    "sheetName": "EX108",
    "formula": "=XLOOKUP(A9, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for gridlines & view customization. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX108.",
    "requirements": [
      "Ensure target worksheet tab is named EX108.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX108** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX108**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=GridlinesViewCustomization(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "20000",
      "mask": "Mask: EX108_Standard",
      "rendered": "Rendered Output 8 (EX108)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX108-01 | 20000 | Rendered Output | Passed |\n| EX108-02 | 30000 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX108 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX109",
    "title": "Zoom Scaling & Freeze Panes (Lab Exercise 9)",
    "difficulty": "intermediate",
    "sheetName": "EX109",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for zoom scaling & freeze panes. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX109.",
    "requirements": [
      "Ensure target worksheet tab is named EX109.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX109** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX109**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=ZoomScalingFreezePanes(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "21250",
      "mask": "Mask: EX109_Standard",
      "rendered": "Rendered Output 9 (EX109)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX109-01 | 21250 | Rendered Output | Passed |\n| EX109-02 | 31250 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX109 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX110",
    "title": "Keyboard Navigation Shortcuts (Lab Exercise 10)",
    "difficulty": "intermediate",
    "sheetName": "EX110",
    "formula": "=XLOOKUP(A11, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for keyboard navigation shortcuts. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX110.",
    "requirements": [
      "Ensure target worksheet tab is named EX110.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX110** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX110**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=KeyboardNavigationShortcuts(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "22500",
      "mask": "Mask: EX110_Standard",
      "rendered": "Rendered Output 10 (EX110)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX110-01 | 22500 | Rendered Output | Passed |\n| EX110-02 | 32500 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX110 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX111",
    "title": "Excel Interface & Ribbon Setup (Lab Exercise 11)",
    "difficulty": "intermediate",
    "sheetName": "EX111",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for excel interface & ribbon setup. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX111.",
    "requirements": [
      "Ensure target worksheet tab is named EX111.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX111** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX111**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=ExcelInterfaceRibbonSetup(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "23750",
      "mask": "Mask: EX111_Standard",
      "rendered": "Rendered Output 11 (EX111)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX111-01 | 23750 | Rendered Output | Passed |\n| EX111-02 | 33750 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX111 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX112",
    "title": "Quick Access Toolbar Customization (Lab Exercise 12)",
    "difficulty": "intermediate",
    "sheetName": "EX112",
    "formula": "=XLOOKUP(A13, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for quick access toolbar customization. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX112.",
    "requirements": [
      "Ensure target worksheet tab is named EX112.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX112** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX112**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=QuickAccessToolbarCustomization(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "25000",
      "mask": "Mask: EX112_Standard",
      "rendered": "Rendered Output 12 (EX112)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX112-01 | 25000 | Rendered Output | Passed |\n| EX112-02 | 35000 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX112 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX113",
    "title": "Name Box & Cell Reference Navigation (Lab Exercise 13)",
    "difficulty": "intermediate",
    "sheetName": "EX113",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for name box & cell reference navigation. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX113.",
    "requirements": [
      "Ensure target worksheet tab is named EX113.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX113** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX113**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=NameBoxCellReferenceNavigation(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "26250",
      "mask": "Mask: EX113_Standard",
      "rendered": "Rendered Output 13 (EX113)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX113-01 | 26250 | Rendered Output | Passed |\n| EX113-02 | 36250 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX113 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX114",
    "title": "Formula Bar Expansion & Edit Mode (Lab Exercise 14)",
    "difficulty": "intermediate",
    "sheetName": "EX114",
    "formula": "=XLOOKUP(A15, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for formula bar expansion & edit mode. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX114.",
    "requirements": [
      "Ensure target worksheet tab is named EX114.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX114** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX114**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=FormulaBarExpansionEditMode(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "27500",
      "mask": "Mask: EX114_Standard",
      "rendered": "Rendered Output 14 (EX114)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX114-01 | 27500 | Rendered Output | Passed |\n| EX114-02 | 37500 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX114 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX115",
    "title": "Status Bar Statistical Summary (Lab Exercise 15)",
    "difficulty": "intermediate",
    "sheetName": "EX115",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for status bar statistical summary. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX115.",
    "requirements": [
      "Ensure target worksheet tab is named EX115.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX115** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX115**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=StatusBarStatisticalSummary(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "28750",
      "mask": "Mask: EX115_Standard",
      "rendered": "Rendered Output 15 (EX115)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX115-01 | 28750 | Rendered Output | Passed |\n| EX115-02 | 38750 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX115 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX116",
    "title": "Worksheet Tab Management & Color Coding (Lab Exercise 16)",
    "difficulty": "intermediate",
    "sheetName": "EX116",
    "formula": "=XLOOKUP(A17, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for worksheet tab management & color coding. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX116.",
    "requirements": [
      "Ensure target worksheet tab is named EX116.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX116** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX116**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=WorksheetTabManagementColorCoding(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "30000",
      "mask": "Mask: EX116_Standard",
      "rendered": "Rendered Output 16 (EX116)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX116-01 | 30000 | Rendered Output | Passed |\n| EX116-02 | 40000 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX116 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX117",
    "title": "Workbook Saving (.xlsx vs .csv vs .xlsb) (Lab Exercise 17)",
    "difficulty": "intermediate",
    "sheetName": "EX117",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for workbook saving (.xlsx vs .csv vs .xlsb). Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX117.",
    "requirements": [
      "Ensure target worksheet tab is named EX117.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX117** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX117**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=WorkbookSavingxlsxvscsvvsxlsb(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "31250",
      "mask": "Mask: EX117_Standard",
      "rendered": "Rendered Output 17 (EX117)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX117-01 | 31250 | Rendered Output | Passed |\n| EX117-02 | 41250 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX117 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX118",
    "title": "Gridlines & View Customization (Lab Exercise 18)",
    "difficulty": "intermediate",
    "sheetName": "EX118",
    "formula": "=XLOOKUP(A19, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for gridlines & view customization. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX118.",
    "requirements": [
      "Ensure target worksheet tab is named EX118.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX118** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX118**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=GridlinesViewCustomization(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "32500",
      "mask": "Mask: EX118_Standard",
      "rendered": "Rendered Output 18 (EX118)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX118-01 | 32500 | Rendered Output | Passed |\n| EX118-02 | 42500 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX118 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX119",
    "title": "Zoom Scaling & Freeze Panes (Lab Exercise 19)",
    "difficulty": "advanced",
    "sheetName": "EX119",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for zoom scaling & freeze panes. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX119.",
    "requirements": [
      "Ensure target worksheet tab is named EX119.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX119** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX119**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=ZoomScalingFreezePanes(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "33750",
      "mask": "Mask: EX119_Standard",
      "rendered": "Rendered Output 19 (EX119)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX119-01 | 33750 | Rendered Output | Passed |\n| EX119-02 | 43750 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX119 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX120",
    "title": "Keyboard Navigation Shortcuts (Lab Exercise 20)",
    "difficulty": "advanced",
    "sheetName": "EX120",
    "formula": "=XLOOKUP(A21, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for keyboard navigation shortcuts. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX120.",
    "requirements": [
      "Ensure target worksheet tab is named EX120.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX120** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX120**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=KeyboardNavigationShortcuts(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "35000",
      "mask": "Mask: EX120_Standard",
      "rendered": "Rendered Output 20 (EX120)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX120-01 | 35000 | Rendered Output | Passed |\n| EX120-02 | 45000 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX120 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX121",
    "title": "Excel Interface & Ribbon Setup (Lab Exercise 21)",
    "difficulty": "advanced",
    "sheetName": "EX121",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for excel interface & ribbon setup. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX121.",
    "requirements": [
      "Ensure target worksheet tab is named EX121.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX121** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX121**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=ExcelInterfaceRibbonSetup(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "36250",
      "mask": "Mask: EX121_Standard",
      "rendered": "Rendered Output 21 (EX121)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX121-01 | 36250 | Rendered Output | Passed |\n| EX121-02 | 46250 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX121 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX122",
    "title": "Quick Access Toolbar Customization (Lab Exercise 22)",
    "difficulty": "advanced",
    "sheetName": "EX122",
    "formula": "=XLOOKUP(A23, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for quick access toolbar customization. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX122.",
    "requirements": [
      "Ensure target worksheet tab is named EX122.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX122** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX122**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=QuickAccessToolbarCustomization(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "37500",
      "mask": "Mask: EX122_Standard",
      "rendered": "Rendered Output 22 (EX122)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX122-01 | 37500 | Rendered Output | Passed |\n| EX122-02 | 47500 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX122 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX123",
    "title": "Name Box & Cell Reference Navigation (Lab Exercise 23)",
    "difficulty": "advanced",
    "sheetName": "EX123",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for name box & cell reference navigation. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX123.",
    "requirements": [
      "Ensure target worksheet tab is named EX123.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX123** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX123**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=NameBoxCellReferenceNavigation(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "38750",
      "mask": "Mask: EX123_Standard",
      "rendered": "Rendered Output 23 (EX123)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX123-01 | 38750 | Rendered Output | Passed |\n| EX123-02 | 48750 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX123 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX124",
    "title": "Formula Bar Expansion & Edit Mode (Lab Exercise 24)",
    "difficulty": "advanced",
    "sheetName": "EX124",
    "formula": "=XLOOKUP(A25, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for formula bar expansion & edit mode. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX124.",
    "requirements": [
      "Ensure target worksheet tab is named EX124.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX124** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX124**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=FormulaBarExpansionEditMode(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "40000",
      "mask": "Mask: EX124_Standard",
      "rendered": "Rendered Output 24 (EX124)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX124-01 | 40000 | Rendered Output | Passed |\n| EX124-02 | 50000 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX124 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX125",
    "title": "Status Bar Statistical Summary (Lab Exercise 25)",
    "difficulty": "advanced",
    "sheetName": "EX125",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for status bar statistical summary. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX125.",
    "requirements": [
      "Ensure target worksheet tab is named EX125.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX125** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX125**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=StatusBarStatisticalSummary(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "41250",
      "mask": "Mask: EX125_Standard",
      "rendered": "Rendered Output 25 (EX125)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX125-01 | 41250 | Rendered Output | Passed |\n| EX125-02 | 51250 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX125 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  }
];

  moduleProjects.forEach((proj, idx) => {
    const rowNum = 36 + idx;
    const r = wsOverview.getRow(rowNum);
    r.height = 22;

    const cellId = r.getCell(1);
    cellId.value = { text: `🔗 ${proj.projectId} (Jump)`, hyperlink: `#'${proj.projectId}'!A1` };
    cellId.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FF0284C7' }, underline: true };
    cellId.alignment = { vertical: 'middle', horizontal: 'center' };

    r.getCell(2).value = proj.title;
    r.getCell(3).value = proj.difficulty;
    r.getCell(4).value = proj.formula;
    r.getCell(5).value = 'Verified Practice Sheet';

    for (let c = 1; c <= 5; c++) {
      const cell = r.getCell(c);
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: idx % 2 === 0 ? 'FFF8FAFC' : 'FFFFFFFF' } };
      cell.border = {
        top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        right: { style: 'thin', color: { argb: 'FFE2E8F0' } },
      };
    }
  });

  wsOverview.columns.forEach((col) => {
    let maxLen = 22;
    col.eachCell({ includeEmpty: true }, (cell) => {
      if (cell && cell.value !== null && cell.value !== undefined) {
        const valStr = typeof cell.value === 'object' && cell.value.text ? cell.value.text : cell.value.toString();
        if (valStr.length > maxLen) maxLen = valStr.length;
      }
    });
    col.width = Math.min(Math.max(maxLen + 5, 22), 65);
  });

  moduleProjects.forEach((proj, pIdx) => {
    const sampleNames = ['Swadeep Hui', 'Tuhina Das', 'Abhronila Ray', 'Susmita Sen', 'Debangshu Roy', 'Rahul Kumar', 'Priya Sharma', 'Aniket Verma', 'Sourav Ganguly', 'Sneha Ghosh', 'Arpan Dey', 'Subhajit Pal', 'Riya Sarkar', 'Dipankar Mitra', 'Barnali Dutta', 'Vikram Singh', 'Kavita Nair', 'Amitabh Basu', 'Pooja Bannerjee', 'Sanjay Chakraborty', 'Tanmoy Das', 'Mousumi Mukhopadhyay', 'Bikash Chatterjee', 'Sayani Bose', 'Aritra Sen', 'Niladri Roy', 'Paromita Guha', 'Siddharth Mallick', 'Trisha Roy', 'Kaushik Hazra'];
    const sampleCities = ['Barrackpore', 'Shyamnagar', 'Ichapur', 'Naihati', 'Titagarh', 'Kolkata', 'Howrah', 'Hooghly', 'Kanchrapara', 'Sodepur'];
    const sampleDepts = ['Finance', 'Accounts', 'Engineering', 'HR', 'Logistics', 'Procurement', 'Taxation', 'Audit'];

    const richRows = Array.from({ length: 30 }, (_, i) => [
      `${proj.projectId}-${String(i + 1).padStart(2, '0')}`,
      sampleNames[i % sampleNames.length],
      sampleDepts[i % sampleDepts.length],
      sampleCities[i % sampleCities.length],
      18500 + i * 2450 + (pIdx * 100),
      proj.formula || `=PRACTICE_FORMULA(${proj.projectId})`,
      'Verified & Audit Passed'
    ]);

    addStyledSheet(proj.projectId, 'FF0F172A',
      [
        { header: 'Record_ID', key: 'id' },
        { header: 'Candidate / Employee Name', key: 'name' },
        { header: 'Department', key: 'dept' },
        { header: 'Campus Location', key: 'city' },
        { header: 'Transaction Value (₹)', key: 'val' },
        { header: 'Target Practice Formula', key: 'form' },
        { header: 'Audit Status', key: 'stat' }
      ],
      richRows
    );
  });

  const outputPath = path.join(excelFilesDir, '001_001_getting_started_with_excel_master.xlsx');
  await wb.xlsx.writeFile(outputPath);
  console.log(`✓ Generated 001_001_getting_started_with_excel_master.xlsx for module 001_001_getting-started-with-excel`);
  fs.copyFileSync(outputPath, path.join(excelFilesDir, 'getting_started_with_excel_master.xlsx'));
  fs.copyFileSync(outputPath, path.join(excelFilesDir, '001_001_getting_started_with_excel_master.xlsx'));
}

buildWorkbook().catch(console.error);
