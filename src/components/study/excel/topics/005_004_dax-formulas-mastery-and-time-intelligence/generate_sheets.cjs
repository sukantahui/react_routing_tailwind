const ExcelJS = require('E:/react_routing_tailwind/node_modules/exceljs');
const fs = require('fs');
const path = require('path');

const excelBaseDir = 'E:/react_routing_tailwind/src/components/study/excel';
const moduleDir = path.join(excelBaseDir, 'topics/005_004_dax-formulas-mastery-and-time-intelligence');
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
  bSub2.value = `Module 23: 005_004_dax-formulas-mastery-and-time-intelligence\nCurriculum Track: EXCEL-PRO-901 | Student Practice Workbook`;
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
    "projectId": "EX2301",
    "title": "Workplace Problem Scenario 1 (Lab Exercise 1)",
    "difficulty": "beginner",
    "sheetName": "EX2301",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for workplace problem scenario 1. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX2301.",
    "requirements": [
      "Ensure target worksheet tab is named EX2301.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX2301** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX2301**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=WorkplaceProblemScenario(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "11250",
      "mask": "Mask: EX2301_Standard",
      "rendered": "Rendered Output 1 (EX2301)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX2301-01 | 11250 | Rendered Output | Passed |\n| EX2301-02 | 21250 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX2301 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX2302",
    "title": "Data Hygiene & Audit Exercise 2 (Lab Exercise 2)",
    "difficulty": "beginner",
    "sheetName": "EX2302",
    "formula": "=XLOOKUP(A3, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for data hygiene & audit exercise 2. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX2302.",
    "requirements": [
      "Ensure target worksheet tab is named EX2302.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX2302** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX2302**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=DataHygieneAuditExercise(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "12500",
      "mask": "Mask: EX2302_Standard",
      "rendered": "Rendered Output 2 (EX2302)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX2302-01 | 12500 | Rendered Output | Passed |\n| EX2302-02 | 22500 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX2302 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX2303",
    "title": "Formula Syntax Practice 3 (Lab Exercise 3)",
    "difficulty": "beginner",
    "sheetName": "EX2303",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for formula syntax practice 3. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX2303.",
    "requirements": [
      "Ensure target worksheet tab is named EX2303.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX2303** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX2303**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=FormulaSyntaxPractice(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "13750",
      "mask": "Mask: EX2303_Standard",
      "rendered": "Rendered Output 3 (EX2303)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX2303-01 | 13750 | Rendered Output | Passed |\n| EX2303-02 | 23750 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX2303 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX2304",
    "title": "Advanced Grid Operations 4 (Lab Exercise 4)",
    "difficulty": "beginner",
    "sheetName": "EX2304",
    "formula": "=XLOOKUP(A5, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for advanced grid operations 4. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX2304.",
    "requirements": [
      "Ensure target worksheet tab is named EX2304.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX2304** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX2304**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=AdvancedGridOperations(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "15000",
      "mask": "Mask: EX2304_Standard",
      "rendered": "Rendered Output 4 (EX2304)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX2304-01 | 15000 | Rendered Output | Passed |\n| EX2304-02 | 25000 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX2304 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX2305",
    "title": "Executive Reporting Layout 5 (Lab Exercise 5)",
    "difficulty": "beginner",
    "sheetName": "EX2305",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for executive reporting layout 5. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX2305.",
    "requirements": [
      "Ensure target worksheet tab is named EX2305.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX2305** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX2305**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=ExecutiveReportingLayout(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "16250",
      "mask": "Mask: EX2305_Standard",
      "rendered": "Rendered Output 5 (EX2305)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX2305-01 | 16250 | Rendered Output | Passed |\n| EX2305-02 | 26250 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX2305 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX2306",
    "title": "Data Modeling & Structure 6 (Lab Exercise 6)",
    "difficulty": "beginner",
    "sheetName": "EX2306",
    "formula": "=XLOOKUP(A7, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for data modeling & structure 6. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX2306.",
    "requirements": [
      "Ensure target worksheet tab is named EX2306.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX2306** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX2306**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=DataModelingStructure(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "17500",
      "mask": "Mask: EX2306_Standard",
      "rendered": "Rendered Output 6 (EX2306)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX2306-01 | 17500 | Rendered Output | Passed |\n| EX2306-02 | 27500 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX2306 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX2307",
    "title": "Analytical Calculation Matrix 7 (Lab Exercise 7)",
    "difficulty": "beginner",
    "sheetName": "EX2307",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for analytical calculation matrix 7. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX2307.",
    "requirements": [
      "Ensure target worksheet tab is named EX2307.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX2307** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX2307**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=AnalyticalCalculationMatrix(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "18750",
      "mask": "Mask: EX2307_Standard",
      "rendered": "Rendered Output 7 (EX2307)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX2307-01 | 18750 | Rendered Output | Passed |\n| EX2307-02 | 28750 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX2307 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX2308",
    "title": "Error Handling & Integrity Check 8 (Lab Exercise 8)",
    "difficulty": "beginner",
    "sheetName": "EX2308",
    "formula": "=XLOOKUP(A9, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for error handling & integrity check 8. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX2308.",
    "requirements": [
      "Ensure target worksheet tab is named EX2308.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX2308** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX2308**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=ErrorHandlingIntegrityCheck(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "20000",
      "mask": "Mask: EX2308_Standard",
      "rendered": "Rendered Output 8 (EX2308)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX2308-01 | 20000 | Rendered Output | Passed |\n| EX2308-02 | 30000 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX2308 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX2309",
    "title": "Automated Workflow Script 9 (Lab Exercise 9)",
    "difficulty": "intermediate",
    "sheetName": "EX2309",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for automated workflow script 9. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX2309.",
    "requirements": [
      "Ensure target worksheet tab is named EX2309.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX2309** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX2309**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=AutomatedWorkflowScript(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "21250",
      "mask": "Mask: EX2309_Standard",
      "rendered": "Rendered Output 9 (EX2309)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX2309-01 | 21250 | Rendered Output | Passed |\n| EX2309-02 | 31250 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX2309 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX2310",
    "title": "Capstone Comprehensive Audit 10 (Lab Exercise 10)",
    "difficulty": "intermediate",
    "sheetName": "EX2310",
    "formula": "=XLOOKUP(A11, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for capstone comprehensive audit 10. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX2310.",
    "requirements": [
      "Ensure target worksheet tab is named EX2310.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX2310** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX2310**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=CapstoneComprehensiveAudit(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "22500",
      "mask": "Mask: EX2310_Standard",
      "rendered": "Rendered Output 10 (EX2310)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX2310-01 | 22500 | Rendered Output | Passed |\n| EX2310-02 | 32500 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX2310 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX2311",
    "title": "Workplace Problem Scenario 1 (Lab Exercise 11)",
    "difficulty": "intermediate",
    "sheetName": "EX2311",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for workplace problem scenario 1. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX2311.",
    "requirements": [
      "Ensure target worksheet tab is named EX2311.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX2311** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX2311**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=WorkplaceProblemScenario(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "23750",
      "mask": "Mask: EX2311_Standard",
      "rendered": "Rendered Output 11 (EX2311)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX2311-01 | 23750 | Rendered Output | Passed |\n| EX2311-02 | 33750 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX2311 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX2312",
    "title": "Data Hygiene & Audit Exercise 2 (Lab Exercise 12)",
    "difficulty": "intermediate",
    "sheetName": "EX2312",
    "formula": "=XLOOKUP(A13, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for data hygiene & audit exercise 2. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX2312.",
    "requirements": [
      "Ensure target worksheet tab is named EX2312.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX2312** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX2312**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=DataHygieneAuditExercise(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "25000",
      "mask": "Mask: EX2312_Standard",
      "rendered": "Rendered Output 12 (EX2312)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX2312-01 | 25000 | Rendered Output | Passed |\n| EX2312-02 | 35000 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX2312 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX2313",
    "title": "Formula Syntax Practice 3 (Lab Exercise 13)",
    "difficulty": "intermediate",
    "sheetName": "EX2313",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for formula syntax practice 3. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX2313.",
    "requirements": [
      "Ensure target worksheet tab is named EX2313.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX2313** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX2313**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=FormulaSyntaxPractice(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "26250",
      "mask": "Mask: EX2313_Standard",
      "rendered": "Rendered Output 13 (EX2313)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX2313-01 | 26250 | Rendered Output | Passed |\n| EX2313-02 | 36250 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX2313 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX2314",
    "title": "Advanced Grid Operations 4 (Lab Exercise 14)",
    "difficulty": "intermediate",
    "sheetName": "EX2314",
    "formula": "=XLOOKUP(A15, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for advanced grid operations 4. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX2314.",
    "requirements": [
      "Ensure target worksheet tab is named EX2314.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX2314** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX2314**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=AdvancedGridOperations(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "27500",
      "mask": "Mask: EX2314_Standard",
      "rendered": "Rendered Output 14 (EX2314)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX2314-01 | 27500 | Rendered Output | Passed |\n| EX2314-02 | 37500 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX2314 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX2315",
    "title": "Executive Reporting Layout 5 (Lab Exercise 15)",
    "difficulty": "intermediate",
    "sheetName": "EX2315",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for executive reporting layout 5. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX2315.",
    "requirements": [
      "Ensure target worksheet tab is named EX2315.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX2315** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX2315**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=ExecutiveReportingLayout(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "28750",
      "mask": "Mask: EX2315_Standard",
      "rendered": "Rendered Output 15 (EX2315)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX2315-01 | 28750 | Rendered Output | Passed |\n| EX2315-02 | 38750 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX2315 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX2316",
    "title": "Data Modeling & Structure 6 (Lab Exercise 16)",
    "difficulty": "intermediate",
    "sheetName": "EX2316",
    "formula": "=XLOOKUP(A17, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for data modeling & structure 6. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX2316.",
    "requirements": [
      "Ensure target worksheet tab is named EX2316.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX2316** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX2316**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=DataModelingStructure(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "30000",
      "mask": "Mask: EX2316_Standard",
      "rendered": "Rendered Output 16 (EX2316)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX2316-01 | 30000 | Rendered Output | Passed |\n| EX2316-02 | 40000 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX2316 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX2317",
    "title": "Analytical Calculation Matrix 7 (Lab Exercise 17)",
    "difficulty": "intermediate",
    "sheetName": "EX2317",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for analytical calculation matrix 7. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX2317.",
    "requirements": [
      "Ensure target worksheet tab is named EX2317.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX2317** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX2317**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=AnalyticalCalculationMatrix(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "31250",
      "mask": "Mask: EX2317_Standard",
      "rendered": "Rendered Output 17 (EX2317)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX2317-01 | 31250 | Rendered Output | Passed |\n| EX2317-02 | 41250 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX2317 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX2318",
    "title": "Error Handling & Integrity Check 8 (Lab Exercise 18)",
    "difficulty": "intermediate",
    "sheetName": "EX2318",
    "formula": "=XLOOKUP(A19, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for error handling & integrity check 8. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX2318.",
    "requirements": [
      "Ensure target worksheet tab is named EX2318.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX2318** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX2318**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=ErrorHandlingIntegrityCheck(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "32500",
      "mask": "Mask: EX2318_Standard",
      "rendered": "Rendered Output 18 (EX2318)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX2318-01 | 32500 | Rendered Output | Passed |\n| EX2318-02 | 42500 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX2318 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX2319",
    "title": "Automated Workflow Script 9 (Lab Exercise 19)",
    "difficulty": "advanced",
    "sheetName": "EX2319",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for automated workflow script 9. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX2319.",
    "requirements": [
      "Ensure target worksheet tab is named EX2319.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX2319** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX2319**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=AutomatedWorkflowScript(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "33750",
      "mask": "Mask: EX2319_Standard",
      "rendered": "Rendered Output 19 (EX2319)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX2319-01 | 33750 | Rendered Output | Passed |\n| EX2319-02 | 43750 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX2319 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX2320",
    "title": "Capstone Comprehensive Audit 10 (Lab Exercise 20)",
    "difficulty": "advanced",
    "sheetName": "EX2320",
    "formula": "=XLOOKUP(A21, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for capstone comprehensive audit 10. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX2320.",
    "requirements": [
      "Ensure target worksheet tab is named EX2320.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX2320** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX2320**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=CapstoneComprehensiveAudit(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "35000",
      "mask": "Mask: EX2320_Standard",
      "rendered": "Rendered Output 20 (EX2320)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX2320-01 | 35000 | Rendered Output | Passed |\n| EX2320-02 | 45000 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX2320 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX2321",
    "title": "Workplace Problem Scenario 1 (Lab Exercise 21)",
    "difficulty": "advanced",
    "sheetName": "EX2321",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for workplace problem scenario 1. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX2321.",
    "requirements": [
      "Ensure target worksheet tab is named EX2321.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX2321** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX2321**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=WorkplaceProblemScenario(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "36250",
      "mask": "Mask: EX2321_Standard",
      "rendered": "Rendered Output 21 (EX2321)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX2321-01 | 36250 | Rendered Output | Passed |\n| EX2321-02 | 46250 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX2321 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX2322",
    "title": "Data Hygiene & Audit Exercise 2 (Lab Exercise 22)",
    "difficulty": "advanced",
    "sheetName": "EX2322",
    "formula": "=XLOOKUP(A23, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for data hygiene & audit exercise 2. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX2322.",
    "requirements": [
      "Ensure target worksheet tab is named EX2322.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX2322** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX2322**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=DataHygieneAuditExercise(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "37500",
      "mask": "Mask: EX2322_Standard",
      "rendered": "Rendered Output 22 (EX2322)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX2322-01 | 37500 | Rendered Output | Passed |\n| EX2322-02 | 47500 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX2322 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX2323",
    "title": "Formula Syntax Practice 3 (Lab Exercise 23)",
    "difficulty": "advanced",
    "sheetName": "EX2323",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for formula syntax practice 3. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX2323.",
    "requirements": [
      "Ensure target worksheet tab is named EX2323.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX2323** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX2323**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=FormulaSyntaxPractice(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "38750",
      "mask": "Mask: EX2323_Standard",
      "rendered": "Rendered Output 23 (EX2323)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX2323-01 | 38750 | Rendered Output | Passed |\n| EX2323-02 | 48750 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX2323 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX2324",
    "title": "Advanced Grid Operations 4 (Lab Exercise 24)",
    "difficulty": "advanced",
    "sheetName": "EX2324",
    "formula": "=XLOOKUP(A25, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for advanced grid operations 4. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX2324.",
    "requirements": [
      "Ensure target worksheet tab is named EX2324.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX2324** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX2324**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=AdvancedGridOperations(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "40000",
      "mask": "Mask: EX2324_Standard",
      "rendered": "Rendered Output 24 (EX2324)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX2324-01 | 40000 | Rendered Output | Passed |\n| EX2324-02 | 50000 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX2324 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX2325",
    "title": "Executive Reporting Layout 5 (Lab Exercise 25)",
    "difficulty": "advanced",
    "sheetName": "EX2325",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for executive reporting layout 5. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX2325.",
    "requirements": [
      "Ensure target worksheet tab is named EX2325.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX2325** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX2325**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=ExecutiveReportingLayout(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "41250",
      "mask": "Mask: EX2325_Standard",
      "rendered": "Rendered Output 25 (EX2325)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX2325-01 | 41250 | Rendered Output | Passed |\n| EX2325-02 | 51250 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX2325 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
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

  moduleProjects.forEach(proj => {
    addStyledSheet(proj.projectId, 'FF0F172A',
      [{ header: 'Item_ID', key: 'id' }, { header: 'Parameter_Name', key: 'p' }, { header: 'Formula_Calculation', key: 'f' }, { header: 'Audit_Result', key: 'r' }],
      [
        [`${proj.projectId}-01`, proj.title, proj.formula, 'Verified'],
        [`${proj.projectId}-02`, 'Secondary Parameter', '=SUM(A1:A10)', 'Verified']
      ]
    );
  });

  const outputPath = path.join(excelFilesDir, '005_004_dax_formulas_mastery_and_time_intelligence_master.xlsx');
  await wb.xlsx.writeFile(outputPath);
  console.log(`✓ Generated 005_004_dax_formulas_mastery_and_time_intelligence_master.xlsx for module 005_004_dax-formulas-mastery-and-time-intelligence`);
  fs.copyFileSync(outputPath, path.join(excelFilesDir, 'dax_formulas_mastery_and_time_intelligence_master.xlsx'));
  fs.copyFileSync(outputPath, path.join(excelFilesDir, '005_004_dax_formulas_mastery_and_time_intelligence_master.xlsx'));
}

buildWorkbook().catch(console.error);
