const ExcelJS = require('E:/react_routing_tailwind/node_modules/exceljs');
const fs = require('fs');
const path = require('path');

const excelBaseDir = 'E:/react_routing_tailwind/src/components/study/excel';
const moduleDir = path.join(excelBaseDir, 'topics/008_001_excel-beginner-skill-test');
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
  bSub2.value = `Module 30: 008_001_excel-beginner-skill-test\nCurriculum Track: EXCEL-PRO-901 | Student Practice Workbook`;
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
    "projectId": "EX3001",
    "title": "Workplace Problem Scenario 1 (Lab Exercise 1)",
    "difficulty": "beginner",
    "sheetName": "EX3001",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for workplace problem scenario 1. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX3001.",
    "requirements": [
      "Ensure target worksheet tab is named EX3001.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX3001** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX3001**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=WorkplaceProblemScenario(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "11250",
      "mask": "Mask: EX3001_Standard",
      "rendered": "Rendered Output 1 (EX3001)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX3001-01 | 11250 | Rendered Output | Passed |\n| EX3001-02 | 21250 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX3001 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX3002",
    "title": "Data Hygiene & Audit Exercise 2 (Lab Exercise 2)",
    "difficulty": "beginner",
    "sheetName": "EX3002",
    "formula": "=XLOOKUP(A3, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for data hygiene & audit exercise 2. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX3002.",
    "requirements": [
      "Ensure target worksheet tab is named EX3002.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX3002** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX3002**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=DataHygieneAuditExercise(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "12500",
      "mask": "Mask: EX3002_Standard",
      "rendered": "Rendered Output 2 (EX3002)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX3002-01 | 12500 | Rendered Output | Passed |\n| EX3002-02 | 22500 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX3002 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX3003",
    "title": "Formula Syntax Practice 3 (Lab Exercise 3)",
    "difficulty": "beginner",
    "sheetName": "EX3003",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for formula syntax practice 3. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX3003.",
    "requirements": [
      "Ensure target worksheet tab is named EX3003.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX3003** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX3003**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=FormulaSyntaxPractice(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "13750",
      "mask": "Mask: EX3003_Standard",
      "rendered": "Rendered Output 3 (EX3003)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX3003-01 | 13750 | Rendered Output | Passed |\n| EX3003-02 | 23750 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX3003 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX3004",
    "title": "Advanced Grid Operations 4 (Lab Exercise 4)",
    "difficulty": "beginner",
    "sheetName": "EX3004",
    "formula": "=XLOOKUP(A5, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for advanced grid operations 4. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX3004.",
    "requirements": [
      "Ensure target worksheet tab is named EX3004.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX3004** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX3004**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=AdvancedGridOperations(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "15000",
      "mask": "Mask: EX3004_Standard",
      "rendered": "Rendered Output 4 (EX3004)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX3004-01 | 15000 | Rendered Output | Passed |\n| EX3004-02 | 25000 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX3004 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX3005",
    "title": "Executive Reporting Layout 5 (Lab Exercise 5)",
    "difficulty": "beginner",
    "sheetName": "EX3005",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for executive reporting layout 5. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX3005.",
    "requirements": [
      "Ensure target worksheet tab is named EX3005.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX3005** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX3005**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=ExecutiveReportingLayout(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "16250",
      "mask": "Mask: EX3005_Standard",
      "rendered": "Rendered Output 5 (EX3005)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX3005-01 | 16250 | Rendered Output | Passed |\n| EX3005-02 | 26250 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX3005 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX3006",
    "title": "Data Modeling & Structure 6 (Lab Exercise 6)",
    "difficulty": "beginner",
    "sheetName": "EX3006",
    "formula": "=XLOOKUP(A7, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for data modeling & structure 6. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX3006.",
    "requirements": [
      "Ensure target worksheet tab is named EX3006.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX3006** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX3006**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=DataModelingStructure(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "17500",
      "mask": "Mask: EX3006_Standard",
      "rendered": "Rendered Output 6 (EX3006)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX3006-01 | 17500 | Rendered Output | Passed |\n| EX3006-02 | 27500 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX3006 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX3007",
    "title": "Analytical Calculation Matrix 7 (Lab Exercise 7)",
    "difficulty": "beginner",
    "sheetName": "EX3007",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for analytical calculation matrix 7. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX3007.",
    "requirements": [
      "Ensure target worksheet tab is named EX3007.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX3007** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX3007**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=AnalyticalCalculationMatrix(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "18750",
      "mask": "Mask: EX3007_Standard",
      "rendered": "Rendered Output 7 (EX3007)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX3007-01 | 18750 | Rendered Output | Passed |\n| EX3007-02 | 28750 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX3007 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX3008",
    "title": "Error Handling & Integrity Check 8 (Lab Exercise 8)",
    "difficulty": "beginner",
    "sheetName": "EX3008",
    "formula": "=XLOOKUP(A9, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for error handling & integrity check 8. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX3008.",
    "requirements": [
      "Ensure target worksheet tab is named EX3008.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX3008** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX3008**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=ErrorHandlingIntegrityCheck(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "20000",
      "mask": "Mask: EX3008_Standard",
      "rendered": "Rendered Output 8 (EX3008)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX3008-01 | 20000 | Rendered Output | Passed |\n| EX3008-02 | 30000 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX3008 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX3009",
    "title": "Automated Workflow Script 9 (Lab Exercise 9)",
    "difficulty": "intermediate",
    "sheetName": "EX3009",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for automated workflow script 9. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX3009.",
    "requirements": [
      "Ensure target worksheet tab is named EX3009.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX3009** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX3009**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=AutomatedWorkflowScript(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "21250",
      "mask": "Mask: EX3009_Standard",
      "rendered": "Rendered Output 9 (EX3009)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX3009-01 | 21250 | Rendered Output | Passed |\n| EX3009-02 | 31250 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX3009 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX3010",
    "title": "Capstone Comprehensive Audit 10 (Lab Exercise 10)",
    "difficulty": "intermediate",
    "sheetName": "EX3010",
    "formula": "=XLOOKUP(A11, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for capstone comprehensive audit 10. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX3010.",
    "requirements": [
      "Ensure target worksheet tab is named EX3010.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX3010** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX3010**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=CapstoneComprehensiveAudit(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "22500",
      "mask": "Mask: EX3010_Standard",
      "rendered": "Rendered Output 10 (EX3010)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX3010-01 | 22500 | Rendered Output | Passed |\n| EX3010-02 | 32500 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX3010 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX3011",
    "title": "Workplace Problem Scenario 1 (Lab Exercise 11)",
    "difficulty": "intermediate",
    "sheetName": "EX3011",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for workplace problem scenario 1. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX3011.",
    "requirements": [
      "Ensure target worksheet tab is named EX3011.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX3011** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX3011**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=WorkplaceProblemScenario(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "23750",
      "mask": "Mask: EX3011_Standard",
      "rendered": "Rendered Output 11 (EX3011)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX3011-01 | 23750 | Rendered Output | Passed |\n| EX3011-02 | 33750 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX3011 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX3012",
    "title": "Data Hygiene & Audit Exercise 2 (Lab Exercise 12)",
    "difficulty": "intermediate",
    "sheetName": "EX3012",
    "formula": "=XLOOKUP(A13, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for data hygiene & audit exercise 2. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX3012.",
    "requirements": [
      "Ensure target worksheet tab is named EX3012.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX3012** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX3012**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=DataHygieneAuditExercise(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "25000",
      "mask": "Mask: EX3012_Standard",
      "rendered": "Rendered Output 12 (EX3012)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX3012-01 | 25000 | Rendered Output | Passed |\n| EX3012-02 | 35000 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX3012 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX3013",
    "title": "Formula Syntax Practice 3 (Lab Exercise 13)",
    "difficulty": "intermediate",
    "sheetName": "EX3013",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for formula syntax practice 3. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX3013.",
    "requirements": [
      "Ensure target worksheet tab is named EX3013.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX3013** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX3013**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=FormulaSyntaxPractice(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "26250",
      "mask": "Mask: EX3013_Standard",
      "rendered": "Rendered Output 13 (EX3013)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX3013-01 | 26250 | Rendered Output | Passed |\n| EX3013-02 | 36250 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX3013 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX3014",
    "title": "Advanced Grid Operations 4 (Lab Exercise 14)",
    "difficulty": "intermediate",
    "sheetName": "EX3014",
    "formula": "=XLOOKUP(A15, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for advanced grid operations 4. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX3014.",
    "requirements": [
      "Ensure target worksheet tab is named EX3014.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX3014** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX3014**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=AdvancedGridOperations(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "27500",
      "mask": "Mask: EX3014_Standard",
      "rendered": "Rendered Output 14 (EX3014)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX3014-01 | 27500 | Rendered Output | Passed |\n| EX3014-02 | 37500 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX3014 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX3015",
    "title": "Executive Reporting Layout 5 (Lab Exercise 15)",
    "difficulty": "intermediate",
    "sheetName": "EX3015",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for executive reporting layout 5. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX3015.",
    "requirements": [
      "Ensure target worksheet tab is named EX3015.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX3015** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX3015**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=ExecutiveReportingLayout(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "28750",
      "mask": "Mask: EX3015_Standard",
      "rendered": "Rendered Output 15 (EX3015)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX3015-01 | 28750 | Rendered Output | Passed |\n| EX3015-02 | 38750 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX3015 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX3016",
    "title": "Data Modeling & Structure 6 (Lab Exercise 16)",
    "difficulty": "intermediate",
    "sheetName": "EX3016",
    "formula": "=XLOOKUP(A17, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for data modeling & structure 6. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX3016.",
    "requirements": [
      "Ensure target worksheet tab is named EX3016.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX3016** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX3016**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=DataModelingStructure(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "30000",
      "mask": "Mask: EX3016_Standard",
      "rendered": "Rendered Output 16 (EX3016)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX3016-01 | 30000 | Rendered Output | Passed |\n| EX3016-02 | 40000 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX3016 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX3017",
    "title": "Analytical Calculation Matrix 7 (Lab Exercise 17)",
    "difficulty": "intermediate",
    "sheetName": "EX3017",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for analytical calculation matrix 7. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX3017.",
    "requirements": [
      "Ensure target worksheet tab is named EX3017.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX3017** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX3017**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=AnalyticalCalculationMatrix(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "31250",
      "mask": "Mask: EX3017_Standard",
      "rendered": "Rendered Output 17 (EX3017)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX3017-01 | 31250 | Rendered Output | Passed |\n| EX3017-02 | 41250 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX3017 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX3018",
    "title": "Error Handling & Integrity Check 8 (Lab Exercise 18)",
    "difficulty": "intermediate",
    "sheetName": "EX3018",
    "formula": "=XLOOKUP(A19, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for error handling & integrity check 8. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX3018.",
    "requirements": [
      "Ensure target worksheet tab is named EX3018.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX3018** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX3018**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=ErrorHandlingIntegrityCheck(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "32500",
      "mask": "Mask: EX3018_Standard",
      "rendered": "Rendered Output 18 (EX3018)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX3018-01 | 32500 | Rendered Output | Passed |\n| EX3018-02 | 42500 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX3018 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX3019",
    "title": "Automated Workflow Script 9 (Lab Exercise 19)",
    "difficulty": "advanced",
    "sheetName": "EX3019",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for automated workflow script 9. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX3019.",
    "requirements": [
      "Ensure target worksheet tab is named EX3019.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX3019** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX3019**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=AutomatedWorkflowScript(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "33750",
      "mask": "Mask: EX3019_Standard",
      "rendered": "Rendered Output 19 (EX3019)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX3019-01 | 33750 | Rendered Output | Passed |\n| EX3019-02 | 43750 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX3019 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX3020",
    "title": "Capstone Comprehensive Audit 10 (Lab Exercise 20)",
    "difficulty": "advanced",
    "sheetName": "EX3020",
    "formula": "=XLOOKUP(A21, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for capstone comprehensive audit 10. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX3020.",
    "requirements": [
      "Ensure target worksheet tab is named EX3020.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX3020** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX3020**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=CapstoneComprehensiveAudit(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "35000",
      "mask": "Mask: EX3020_Standard",
      "rendered": "Rendered Output 20 (EX3020)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX3020-01 | 35000 | Rendered Output | Passed |\n| EX3020-02 | 45000 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX3020 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX3021",
    "title": "Workplace Problem Scenario 1 (Lab Exercise 21)",
    "difficulty": "advanced",
    "sheetName": "EX3021",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for workplace problem scenario 1. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX3021.",
    "requirements": [
      "Ensure target worksheet tab is named EX3021.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX3021** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX3021**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=WorkplaceProblemScenario(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "36250",
      "mask": "Mask: EX3021_Standard",
      "rendered": "Rendered Output 21 (EX3021)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX3021-01 | 36250 | Rendered Output | Passed |\n| EX3021-02 | 46250 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX3021 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX3022",
    "title": "Data Hygiene & Audit Exercise 2 (Lab Exercise 22)",
    "difficulty": "advanced",
    "sheetName": "EX3022",
    "formula": "=XLOOKUP(A23, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for data hygiene & audit exercise 2. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX3022.",
    "requirements": [
      "Ensure target worksheet tab is named EX3022.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX3022** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX3022**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=DataHygieneAuditExercise(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "37500",
      "mask": "Mask: EX3022_Standard",
      "rendered": "Rendered Output 22 (EX3022)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX3022-01 | 37500 | Rendered Output | Passed |\n| EX3022-02 | 47500 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX3022 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX3023",
    "title": "Formula Syntax Practice 3 (Lab Exercise 23)",
    "difficulty": "advanced",
    "sheetName": "EX3023",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for formula syntax practice 3. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX3023.",
    "requirements": [
      "Ensure target worksheet tab is named EX3023.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX3023** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX3023**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=FormulaSyntaxPractice(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "38750",
      "mask": "Mask: EX3023_Standard",
      "rendered": "Rendered Output 23 (EX3023)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX3023-01 | 38750 | Rendered Output | Passed |\n| EX3023-02 | 48750 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX3023 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX3024",
    "title": "Advanced Grid Operations 4 (Lab Exercise 24)",
    "difficulty": "advanced",
    "sheetName": "EX3024",
    "formula": "=XLOOKUP(A25, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for advanced grid operations 4. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX3024.",
    "requirements": [
      "Ensure target worksheet tab is named EX3024.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX3024** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX3024**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=AdvancedGridOperations(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "40000",
      "mask": "Mask: EX3024_Standard",
      "rendered": "Rendered Output 24 (EX3024)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX3024-01 | 40000 | Rendered Output | Passed |\n| EX3024-02 | 50000 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX3024 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX3025",
    "title": "Executive Reporting Layout 5 (Lab Exercise 25)",
    "difficulty": "advanced",
    "sheetName": "EX3025",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for executive reporting layout 5. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX3025.",
    "requirements": [
      "Ensure target worksheet tab is named EX3025.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX3025** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX3025**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=ExecutiveReportingLayout(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "41250",
      "mask": "Mask: EX3025_Standard",
      "rendered": "Rendered Output 25 (EX3025)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX3025-01 | 41250 | Rendered Output | Passed |\n| EX3025-02 | 51250 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX3025 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
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

  const outputPath = path.join(excelFilesDir, '008_001_excel_beginner_skill_test_master.xlsx');
  await wb.xlsx.writeFile(outputPath);
  console.log(`✓ Generated 008_001_excel_beginner_skill_test_master.xlsx for module 008_001_excel-beginner-skill-test`);
  fs.copyFileSync(outputPath, path.join(excelFilesDir, 'excel_beginner_skill_test_master.xlsx'));
  fs.copyFileSync(outputPath, path.join(excelFilesDir, '008_001_excel_beginner_skill_test_master.xlsx'));
}

buildWorkbook().catch(console.error);
