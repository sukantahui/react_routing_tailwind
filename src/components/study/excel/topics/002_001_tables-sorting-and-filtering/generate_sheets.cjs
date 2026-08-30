const ExcelJS = require('E:/react_routing_tailwind/node_modules/exceljs');
const fs = require('fs');
const path = require('path');

const excelBaseDir = 'E:/react_routing_tailwind/src/components/study/excel';
const moduleDir = path.join(excelBaseDir, 'topics/002_001_tables-sorting-and-filtering');
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
  bSub2.value = `Module 6: 002_001_tables-sorting-and-filtering\nCurriculum Track: EXCEL-PRO-901 | Student Practice Workbook`;
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
    "projectId": "EX601",
    "title": "Workplace Problem Scenario 1 (Lab Exercise 1)",
    "difficulty": "beginner",
    "sheetName": "EX601",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for workplace problem scenario 1. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX601.",
    "requirements": [
      "Ensure target worksheet tab is named EX601.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX601** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX601**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=WorkplaceProblemScenario(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "11250",
      "mask": "Mask: EX601_Standard",
      "rendered": "Rendered Output 1 (EX601)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX601-01 | 11250 | Rendered Output | Passed |\n| EX601-02 | 21250 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX601 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX602",
    "title": "Data Hygiene & Audit Exercise 2 (Lab Exercise 2)",
    "difficulty": "beginner",
    "sheetName": "EX602",
    "formula": "=XLOOKUP(A3, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for data hygiene & audit exercise 2. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX602.",
    "requirements": [
      "Ensure target worksheet tab is named EX602.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX602** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX602**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=DataHygieneAuditExercise(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "12500",
      "mask": "Mask: EX602_Standard",
      "rendered": "Rendered Output 2 (EX602)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX602-01 | 12500 | Rendered Output | Passed |\n| EX602-02 | 22500 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX602 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX603",
    "title": "Formula Syntax Practice 3 (Lab Exercise 3)",
    "difficulty": "beginner",
    "sheetName": "EX603",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for formula syntax practice 3. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX603.",
    "requirements": [
      "Ensure target worksheet tab is named EX603.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX603** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX603**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=FormulaSyntaxPractice(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "13750",
      "mask": "Mask: EX603_Standard",
      "rendered": "Rendered Output 3 (EX603)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX603-01 | 13750 | Rendered Output | Passed |\n| EX603-02 | 23750 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX603 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX604",
    "title": "Advanced Grid Operations 4 (Lab Exercise 4)",
    "difficulty": "beginner",
    "sheetName": "EX604",
    "formula": "=XLOOKUP(A5, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for advanced grid operations 4. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX604.",
    "requirements": [
      "Ensure target worksheet tab is named EX604.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX604** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX604**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=AdvancedGridOperations(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "15000",
      "mask": "Mask: EX604_Standard",
      "rendered": "Rendered Output 4 (EX604)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX604-01 | 15000 | Rendered Output | Passed |\n| EX604-02 | 25000 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX604 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX605",
    "title": "Executive Reporting Layout 5 (Lab Exercise 5)",
    "difficulty": "beginner",
    "sheetName": "EX605",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for executive reporting layout 5. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX605.",
    "requirements": [
      "Ensure target worksheet tab is named EX605.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX605** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX605**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=ExecutiveReportingLayout(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "16250",
      "mask": "Mask: EX605_Standard",
      "rendered": "Rendered Output 5 (EX605)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX605-01 | 16250 | Rendered Output | Passed |\n| EX605-02 | 26250 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX605 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX606",
    "title": "Data Modeling & Structure 6 (Lab Exercise 6)",
    "difficulty": "beginner",
    "sheetName": "EX606",
    "formula": "=XLOOKUP(A7, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for data modeling & structure 6. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX606.",
    "requirements": [
      "Ensure target worksheet tab is named EX606.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX606** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX606**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=DataModelingStructure(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "17500",
      "mask": "Mask: EX606_Standard",
      "rendered": "Rendered Output 6 (EX606)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX606-01 | 17500 | Rendered Output | Passed |\n| EX606-02 | 27500 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX606 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX607",
    "title": "Analytical Calculation Matrix 7 (Lab Exercise 7)",
    "difficulty": "beginner",
    "sheetName": "EX607",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for analytical calculation matrix 7. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX607.",
    "requirements": [
      "Ensure target worksheet tab is named EX607.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX607** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX607**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=AnalyticalCalculationMatrix(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "18750",
      "mask": "Mask: EX607_Standard",
      "rendered": "Rendered Output 7 (EX607)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX607-01 | 18750 | Rendered Output | Passed |\n| EX607-02 | 28750 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX607 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX608",
    "title": "Error Handling & Integrity Check 8 (Lab Exercise 8)",
    "difficulty": "beginner",
    "sheetName": "EX608",
    "formula": "=XLOOKUP(A9, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for error handling & integrity check 8. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX608.",
    "requirements": [
      "Ensure target worksheet tab is named EX608.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX608** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX608**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=ErrorHandlingIntegrityCheck(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "20000",
      "mask": "Mask: EX608_Standard",
      "rendered": "Rendered Output 8 (EX608)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX608-01 | 20000 | Rendered Output | Passed |\n| EX608-02 | 30000 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX608 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX609",
    "title": "Automated Workflow Script 9 (Lab Exercise 9)",
    "difficulty": "intermediate",
    "sheetName": "EX609",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for automated workflow script 9. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX609.",
    "requirements": [
      "Ensure target worksheet tab is named EX609.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX609** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX609**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=AutomatedWorkflowScript(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "21250",
      "mask": "Mask: EX609_Standard",
      "rendered": "Rendered Output 9 (EX609)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX609-01 | 21250 | Rendered Output | Passed |\n| EX609-02 | 31250 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX609 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX610",
    "title": "Capstone Comprehensive Audit 10 (Lab Exercise 10)",
    "difficulty": "intermediate",
    "sheetName": "EX610",
    "formula": "=XLOOKUP(A11, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for capstone comprehensive audit 10. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX610.",
    "requirements": [
      "Ensure target worksheet tab is named EX610.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX610** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX610**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=CapstoneComprehensiveAudit(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "22500",
      "mask": "Mask: EX610_Standard",
      "rendered": "Rendered Output 10 (EX610)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX610-01 | 22500 | Rendered Output | Passed |\n| EX610-02 | 32500 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX610 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX611",
    "title": "Workplace Problem Scenario 1 (Lab Exercise 11)",
    "difficulty": "intermediate",
    "sheetName": "EX611",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for workplace problem scenario 1. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX611.",
    "requirements": [
      "Ensure target worksheet tab is named EX611.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX611** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX611**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=WorkplaceProblemScenario(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "23750",
      "mask": "Mask: EX611_Standard",
      "rendered": "Rendered Output 11 (EX611)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX611-01 | 23750 | Rendered Output | Passed |\n| EX611-02 | 33750 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX611 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX612",
    "title": "Data Hygiene & Audit Exercise 2 (Lab Exercise 12)",
    "difficulty": "intermediate",
    "sheetName": "EX612",
    "formula": "=XLOOKUP(A13, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for data hygiene & audit exercise 2. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX612.",
    "requirements": [
      "Ensure target worksheet tab is named EX612.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX612** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX612**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=DataHygieneAuditExercise(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "25000",
      "mask": "Mask: EX612_Standard",
      "rendered": "Rendered Output 12 (EX612)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX612-01 | 25000 | Rendered Output | Passed |\n| EX612-02 | 35000 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX612 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX613",
    "title": "Formula Syntax Practice 3 (Lab Exercise 13)",
    "difficulty": "intermediate",
    "sheetName": "EX613",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for formula syntax practice 3. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX613.",
    "requirements": [
      "Ensure target worksheet tab is named EX613.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX613** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX613**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=FormulaSyntaxPractice(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "26250",
      "mask": "Mask: EX613_Standard",
      "rendered": "Rendered Output 13 (EX613)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX613-01 | 26250 | Rendered Output | Passed |\n| EX613-02 | 36250 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX613 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX614",
    "title": "Advanced Grid Operations 4 (Lab Exercise 14)",
    "difficulty": "intermediate",
    "sheetName": "EX614",
    "formula": "=XLOOKUP(A15, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for advanced grid operations 4. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX614.",
    "requirements": [
      "Ensure target worksheet tab is named EX614.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX614** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX614**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=AdvancedGridOperations(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "27500",
      "mask": "Mask: EX614_Standard",
      "rendered": "Rendered Output 14 (EX614)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX614-01 | 27500 | Rendered Output | Passed |\n| EX614-02 | 37500 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX614 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX615",
    "title": "Executive Reporting Layout 5 (Lab Exercise 15)",
    "difficulty": "intermediate",
    "sheetName": "EX615",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for executive reporting layout 5. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX615.",
    "requirements": [
      "Ensure target worksheet tab is named EX615.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX615** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX615**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=ExecutiveReportingLayout(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "28750",
      "mask": "Mask: EX615_Standard",
      "rendered": "Rendered Output 15 (EX615)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX615-01 | 28750 | Rendered Output | Passed |\n| EX615-02 | 38750 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX615 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX616",
    "title": "Data Modeling & Structure 6 (Lab Exercise 16)",
    "difficulty": "intermediate",
    "sheetName": "EX616",
    "formula": "=XLOOKUP(A17, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for data modeling & structure 6. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX616.",
    "requirements": [
      "Ensure target worksheet tab is named EX616.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX616** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX616**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=DataModelingStructure(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "30000",
      "mask": "Mask: EX616_Standard",
      "rendered": "Rendered Output 16 (EX616)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX616-01 | 30000 | Rendered Output | Passed |\n| EX616-02 | 40000 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX616 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX617",
    "title": "Analytical Calculation Matrix 7 (Lab Exercise 17)",
    "difficulty": "intermediate",
    "sheetName": "EX617",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for analytical calculation matrix 7. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX617.",
    "requirements": [
      "Ensure target worksheet tab is named EX617.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX617** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX617**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=AnalyticalCalculationMatrix(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "31250",
      "mask": "Mask: EX617_Standard",
      "rendered": "Rendered Output 17 (EX617)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX617-01 | 31250 | Rendered Output | Passed |\n| EX617-02 | 41250 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX617 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX618",
    "title": "Error Handling & Integrity Check 8 (Lab Exercise 18)",
    "difficulty": "intermediate",
    "sheetName": "EX618",
    "formula": "=XLOOKUP(A19, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for error handling & integrity check 8. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX618.",
    "requirements": [
      "Ensure target worksheet tab is named EX618.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX618** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX618**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=ErrorHandlingIntegrityCheck(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "32500",
      "mask": "Mask: EX618_Standard",
      "rendered": "Rendered Output 18 (EX618)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX618-01 | 32500 | Rendered Output | Passed |\n| EX618-02 | 42500 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX618 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX619",
    "title": "Automated Workflow Script 9 (Lab Exercise 19)",
    "difficulty": "advanced",
    "sheetName": "EX619",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for automated workflow script 9. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX619.",
    "requirements": [
      "Ensure target worksheet tab is named EX619.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX619** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX619**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=AutomatedWorkflowScript(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "33750",
      "mask": "Mask: EX619_Standard",
      "rendered": "Rendered Output 19 (EX619)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX619-01 | 33750 | Rendered Output | Passed |\n| EX619-02 | 43750 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX619 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX620",
    "title": "Capstone Comprehensive Audit 10 (Lab Exercise 20)",
    "difficulty": "advanced",
    "sheetName": "EX620",
    "formula": "=XLOOKUP(A21, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for capstone comprehensive audit 10. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX620.",
    "requirements": [
      "Ensure target worksheet tab is named EX620.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX620** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX620**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=CapstoneComprehensiveAudit(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "35000",
      "mask": "Mask: EX620_Standard",
      "rendered": "Rendered Output 20 (EX620)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX620-01 | 35000 | Rendered Output | Passed |\n| EX620-02 | 45000 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX620 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX621",
    "title": "Workplace Problem Scenario 1 (Lab Exercise 21)",
    "difficulty": "advanced",
    "sheetName": "EX621",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for workplace problem scenario 1. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX621.",
    "requirements": [
      "Ensure target worksheet tab is named EX621.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX621** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX621**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=WorkplaceProblemScenario(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "36250",
      "mask": "Mask: EX621_Standard",
      "rendered": "Rendered Output 21 (EX621)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX621-01 | 36250 | Rendered Output | Passed |\n| EX621-02 | 46250 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX621 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX622",
    "title": "Data Hygiene & Audit Exercise 2 (Lab Exercise 22)",
    "difficulty": "advanced",
    "sheetName": "EX622",
    "formula": "=XLOOKUP(A23, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for data hygiene & audit exercise 2. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX622.",
    "requirements": [
      "Ensure target worksheet tab is named EX622.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX622** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX622**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=DataHygieneAuditExercise(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "37500",
      "mask": "Mask: EX622_Standard",
      "rendered": "Rendered Output 22 (EX622)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX622-01 | 37500 | Rendered Output | Passed |\n| EX622-02 | 47500 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX622 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX623",
    "title": "Formula Syntax Practice 3 (Lab Exercise 23)",
    "difficulty": "advanced",
    "sheetName": "EX623",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for formula syntax practice 3. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX623.",
    "requirements": [
      "Ensure target worksheet tab is named EX623.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX623** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX623**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=FormulaSyntaxPractice(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "38750",
      "mask": "Mask: EX623_Standard",
      "rendered": "Rendered Output 23 (EX623)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX623-01 | 38750 | Rendered Output | Passed |\n| EX623-02 | 48750 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX623 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX624",
    "title": "Advanced Grid Operations 4 (Lab Exercise 24)",
    "difficulty": "advanced",
    "sheetName": "EX624",
    "formula": "=XLOOKUP(A25, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for advanced grid operations 4. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX624.",
    "requirements": [
      "Ensure target worksheet tab is named EX624.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX624** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX624**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=AdvancedGridOperations(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "40000",
      "mask": "Mask: EX624_Standard",
      "rendered": "Rendered Output 24 (EX624)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX624-01 | 40000 | Rendered Output | Passed |\n| EX624-02 | 50000 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX624 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX625",
    "title": "Executive Reporting Layout 5 (Lab Exercise 25)",
    "difficulty": "advanced",
    "sheetName": "EX625",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for executive reporting layout 5. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX625.",
    "requirements": [
      "Ensure target worksheet tab is named EX625.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX625** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX625**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=ExecutiveReportingLayout(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "41250",
      "mask": "Mask: EX625_Standard",
      "rendered": "Rendered Output 25 (EX625)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX625-01 | 41250 | Rendered Output | Passed |\n| EX625-02 | 51250 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX625 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
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

  const outputPath = path.join(excelFilesDir, '002_001_tables_sorting_and_filtering_master.xlsx');
  await wb.xlsx.writeFile(outputPath);
  console.log(`✓ Generated 002_001_tables_sorting_and_filtering_master.xlsx for module 002_001_tables-sorting-and-filtering`);
  fs.copyFileSync(outputPath, path.join(excelFilesDir, 'tables_sorting_filtering.xlsx'));
  fs.copyFileSync(outputPath, path.join(excelFilesDir, '002_001_tables_sorting_and_filtering_master.xlsx'));
}

buildWorkbook().catch(console.error);
