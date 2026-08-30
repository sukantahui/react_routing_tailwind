const ExcelJS = require('E:/react_routing_tailwind/node_modules/exceljs');
const fs = require('fs');
const path = require('path');

const excelBaseDir = 'E:/react_routing_tailwind/src/components/study/excel';
const moduleDir = path.join(excelBaseDir, 'topics/006_004_modern-office-scripts-typescript-and-power-automate');
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
  bSub2.value = `Module 27: 006_004_modern-office-scripts-typescript-and-power-automate\nCurriculum Track: EXCEL-PRO-901 | Student Practice Workbook`;
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
    "projectId": "EX2701",
    "title": "Workplace Problem Scenario 1 (Lab Exercise 1)",
    "difficulty": "beginner",
    "sheetName": "EX2701",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for workplace problem scenario 1. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX2701.",
    "requirements": [
      "Ensure target worksheet tab is named EX2701.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX2701** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX2701**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=WorkplaceProblemScenario(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "11250",
      "mask": "Mask: EX2701_Standard",
      "rendered": "Rendered Output 1 (EX2701)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX2701-01 | 11250 | Rendered Output | Passed |\n| EX2701-02 | 21250 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX2701 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX2702",
    "title": "Data Hygiene & Audit Exercise 2 (Lab Exercise 2)",
    "difficulty": "beginner",
    "sheetName": "EX2702",
    "formula": "=XLOOKUP(A3, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for data hygiene & audit exercise 2. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX2702.",
    "requirements": [
      "Ensure target worksheet tab is named EX2702.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX2702** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX2702**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=DataHygieneAuditExercise(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "12500",
      "mask": "Mask: EX2702_Standard",
      "rendered": "Rendered Output 2 (EX2702)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX2702-01 | 12500 | Rendered Output | Passed |\n| EX2702-02 | 22500 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX2702 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX2703",
    "title": "Formula Syntax Practice 3 (Lab Exercise 3)",
    "difficulty": "beginner",
    "sheetName": "EX2703",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for formula syntax practice 3. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX2703.",
    "requirements": [
      "Ensure target worksheet tab is named EX2703.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX2703** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX2703**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=FormulaSyntaxPractice(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "13750",
      "mask": "Mask: EX2703_Standard",
      "rendered": "Rendered Output 3 (EX2703)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX2703-01 | 13750 | Rendered Output | Passed |\n| EX2703-02 | 23750 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX2703 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX2704",
    "title": "Advanced Grid Operations 4 (Lab Exercise 4)",
    "difficulty": "beginner",
    "sheetName": "EX2704",
    "formula": "=XLOOKUP(A5, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for advanced grid operations 4. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX2704.",
    "requirements": [
      "Ensure target worksheet tab is named EX2704.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX2704** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX2704**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=AdvancedGridOperations(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "15000",
      "mask": "Mask: EX2704_Standard",
      "rendered": "Rendered Output 4 (EX2704)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX2704-01 | 15000 | Rendered Output | Passed |\n| EX2704-02 | 25000 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX2704 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX2705",
    "title": "Executive Reporting Layout 5 (Lab Exercise 5)",
    "difficulty": "beginner",
    "sheetName": "EX2705",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for executive reporting layout 5. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX2705.",
    "requirements": [
      "Ensure target worksheet tab is named EX2705.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX2705** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX2705**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=ExecutiveReportingLayout(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "16250",
      "mask": "Mask: EX2705_Standard",
      "rendered": "Rendered Output 5 (EX2705)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX2705-01 | 16250 | Rendered Output | Passed |\n| EX2705-02 | 26250 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX2705 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX2706",
    "title": "Data Modeling & Structure 6 (Lab Exercise 6)",
    "difficulty": "beginner",
    "sheetName": "EX2706",
    "formula": "=XLOOKUP(A7, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for data modeling & structure 6. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX2706.",
    "requirements": [
      "Ensure target worksheet tab is named EX2706.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX2706** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX2706**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=DataModelingStructure(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "17500",
      "mask": "Mask: EX2706_Standard",
      "rendered": "Rendered Output 6 (EX2706)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX2706-01 | 17500 | Rendered Output | Passed |\n| EX2706-02 | 27500 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX2706 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX2707",
    "title": "Analytical Calculation Matrix 7 (Lab Exercise 7)",
    "difficulty": "beginner",
    "sheetName": "EX2707",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for analytical calculation matrix 7. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX2707.",
    "requirements": [
      "Ensure target worksheet tab is named EX2707.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX2707** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX2707**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=AnalyticalCalculationMatrix(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "18750",
      "mask": "Mask: EX2707_Standard",
      "rendered": "Rendered Output 7 (EX2707)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX2707-01 | 18750 | Rendered Output | Passed |\n| EX2707-02 | 28750 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX2707 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX2708",
    "title": "Error Handling & Integrity Check 8 (Lab Exercise 8)",
    "difficulty": "beginner",
    "sheetName": "EX2708",
    "formula": "=XLOOKUP(A9, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for error handling & integrity check 8. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX2708.",
    "requirements": [
      "Ensure target worksheet tab is named EX2708.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX2708** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX2708**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=ErrorHandlingIntegrityCheck(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "20000",
      "mask": "Mask: EX2708_Standard",
      "rendered": "Rendered Output 8 (EX2708)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX2708-01 | 20000 | Rendered Output | Passed |\n| EX2708-02 | 30000 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX2708 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX2709",
    "title": "Automated Workflow Script 9 (Lab Exercise 9)",
    "difficulty": "intermediate",
    "sheetName": "EX2709",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for automated workflow script 9. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX2709.",
    "requirements": [
      "Ensure target worksheet tab is named EX2709.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX2709** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX2709**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=AutomatedWorkflowScript(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "21250",
      "mask": "Mask: EX2709_Standard",
      "rendered": "Rendered Output 9 (EX2709)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX2709-01 | 21250 | Rendered Output | Passed |\n| EX2709-02 | 31250 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX2709 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX2710",
    "title": "Capstone Comprehensive Audit 10 (Lab Exercise 10)",
    "difficulty": "intermediate",
    "sheetName": "EX2710",
    "formula": "=XLOOKUP(A11, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for capstone comprehensive audit 10. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX2710.",
    "requirements": [
      "Ensure target worksheet tab is named EX2710.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX2710** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX2710**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=CapstoneComprehensiveAudit(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "22500",
      "mask": "Mask: EX2710_Standard",
      "rendered": "Rendered Output 10 (EX2710)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX2710-01 | 22500 | Rendered Output | Passed |\n| EX2710-02 | 32500 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX2710 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX2711",
    "title": "Workplace Problem Scenario 1 (Lab Exercise 11)",
    "difficulty": "intermediate",
    "sheetName": "EX2711",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for workplace problem scenario 1. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX2711.",
    "requirements": [
      "Ensure target worksheet tab is named EX2711.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX2711** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX2711**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=WorkplaceProblemScenario(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "23750",
      "mask": "Mask: EX2711_Standard",
      "rendered": "Rendered Output 11 (EX2711)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX2711-01 | 23750 | Rendered Output | Passed |\n| EX2711-02 | 33750 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX2711 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX2712",
    "title": "Data Hygiene & Audit Exercise 2 (Lab Exercise 12)",
    "difficulty": "intermediate",
    "sheetName": "EX2712",
    "formula": "=XLOOKUP(A13, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for data hygiene & audit exercise 2. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX2712.",
    "requirements": [
      "Ensure target worksheet tab is named EX2712.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX2712** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX2712**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=DataHygieneAuditExercise(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "25000",
      "mask": "Mask: EX2712_Standard",
      "rendered": "Rendered Output 12 (EX2712)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX2712-01 | 25000 | Rendered Output | Passed |\n| EX2712-02 | 35000 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX2712 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX2713",
    "title": "Formula Syntax Practice 3 (Lab Exercise 13)",
    "difficulty": "intermediate",
    "sheetName": "EX2713",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for formula syntax practice 3. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX2713.",
    "requirements": [
      "Ensure target worksheet tab is named EX2713.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX2713** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX2713**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=FormulaSyntaxPractice(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "26250",
      "mask": "Mask: EX2713_Standard",
      "rendered": "Rendered Output 13 (EX2713)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX2713-01 | 26250 | Rendered Output | Passed |\n| EX2713-02 | 36250 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX2713 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX2714",
    "title": "Advanced Grid Operations 4 (Lab Exercise 14)",
    "difficulty": "intermediate",
    "sheetName": "EX2714",
    "formula": "=XLOOKUP(A15, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for advanced grid operations 4. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX2714.",
    "requirements": [
      "Ensure target worksheet tab is named EX2714.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX2714** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX2714**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=AdvancedGridOperations(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "27500",
      "mask": "Mask: EX2714_Standard",
      "rendered": "Rendered Output 14 (EX2714)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX2714-01 | 27500 | Rendered Output | Passed |\n| EX2714-02 | 37500 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX2714 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX2715",
    "title": "Executive Reporting Layout 5 (Lab Exercise 15)",
    "difficulty": "intermediate",
    "sheetName": "EX2715",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for executive reporting layout 5. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX2715.",
    "requirements": [
      "Ensure target worksheet tab is named EX2715.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX2715** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX2715**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=ExecutiveReportingLayout(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "28750",
      "mask": "Mask: EX2715_Standard",
      "rendered": "Rendered Output 15 (EX2715)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX2715-01 | 28750 | Rendered Output | Passed |\n| EX2715-02 | 38750 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX2715 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX2716",
    "title": "Data Modeling & Structure 6 (Lab Exercise 16)",
    "difficulty": "intermediate",
    "sheetName": "EX2716",
    "formula": "=XLOOKUP(A17, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for data modeling & structure 6. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX2716.",
    "requirements": [
      "Ensure target worksheet tab is named EX2716.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX2716** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX2716**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=DataModelingStructure(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "30000",
      "mask": "Mask: EX2716_Standard",
      "rendered": "Rendered Output 16 (EX2716)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX2716-01 | 30000 | Rendered Output | Passed |\n| EX2716-02 | 40000 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX2716 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX2717",
    "title": "Analytical Calculation Matrix 7 (Lab Exercise 17)",
    "difficulty": "intermediate",
    "sheetName": "EX2717",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for analytical calculation matrix 7. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX2717.",
    "requirements": [
      "Ensure target worksheet tab is named EX2717.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX2717** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX2717**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=AnalyticalCalculationMatrix(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "31250",
      "mask": "Mask: EX2717_Standard",
      "rendered": "Rendered Output 17 (EX2717)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX2717-01 | 31250 | Rendered Output | Passed |\n| EX2717-02 | 41250 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX2717 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX2718",
    "title": "Error Handling & Integrity Check 8 (Lab Exercise 18)",
    "difficulty": "intermediate",
    "sheetName": "EX2718",
    "formula": "=XLOOKUP(A19, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for error handling & integrity check 8. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX2718.",
    "requirements": [
      "Ensure target worksheet tab is named EX2718.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX2718** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX2718**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=ErrorHandlingIntegrityCheck(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "32500",
      "mask": "Mask: EX2718_Standard",
      "rendered": "Rendered Output 18 (EX2718)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX2718-01 | 32500 | Rendered Output | Passed |\n| EX2718-02 | 42500 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX2718 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX2719",
    "title": "Automated Workflow Script 9 (Lab Exercise 19)",
    "difficulty": "advanced",
    "sheetName": "EX2719",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for automated workflow script 9. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX2719.",
    "requirements": [
      "Ensure target worksheet tab is named EX2719.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX2719** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX2719**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=AutomatedWorkflowScript(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "33750",
      "mask": "Mask: EX2719_Standard",
      "rendered": "Rendered Output 19 (EX2719)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX2719-01 | 33750 | Rendered Output | Passed |\n| EX2719-02 | 43750 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX2719 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX2720",
    "title": "Capstone Comprehensive Audit 10 (Lab Exercise 20)",
    "difficulty": "advanced",
    "sheetName": "EX2720",
    "formula": "=XLOOKUP(A21, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for capstone comprehensive audit 10. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX2720.",
    "requirements": [
      "Ensure target worksheet tab is named EX2720.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX2720** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX2720**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=CapstoneComprehensiveAudit(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "35000",
      "mask": "Mask: EX2720_Standard",
      "rendered": "Rendered Output 20 (EX2720)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX2720-01 | 35000 | Rendered Output | Passed |\n| EX2720-02 | 45000 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX2720 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX2721",
    "title": "Workplace Problem Scenario 1 (Lab Exercise 21)",
    "difficulty": "advanced",
    "sheetName": "EX2721",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for workplace problem scenario 1. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX2721.",
    "requirements": [
      "Ensure target worksheet tab is named EX2721.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX2721** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX2721**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=WorkplaceProblemScenario(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "36250",
      "mask": "Mask: EX2721_Standard",
      "rendered": "Rendered Output 21 (EX2721)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX2721-01 | 36250 | Rendered Output | Passed |\n| EX2721-02 | 46250 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX2721 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX2722",
    "title": "Data Hygiene & Audit Exercise 2 (Lab Exercise 22)",
    "difficulty": "advanced",
    "sheetName": "EX2722",
    "formula": "=XLOOKUP(A23, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for data hygiene & audit exercise 2. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX2722.",
    "requirements": [
      "Ensure target worksheet tab is named EX2722.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX2722** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX2722**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=DataHygieneAuditExercise(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "37500",
      "mask": "Mask: EX2722_Standard",
      "rendered": "Rendered Output 22 (EX2722)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX2722-01 | 37500 | Rendered Output | Passed |\n| EX2722-02 | 47500 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX2722 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX2723",
    "title": "Formula Syntax Practice 3 (Lab Exercise 23)",
    "difficulty": "advanced",
    "sheetName": "EX2723",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for formula syntax practice 3. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX2723.",
    "requirements": [
      "Ensure target worksheet tab is named EX2723.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX2723** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX2723**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=FormulaSyntaxPractice(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "38750",
      "mask": "Mask: EX2723_Standard",
      "rendered": "Rendered Output 23 (EX2723)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX2723-01 | 38750 | Rendered Output | Passed |\n| EX2723-02 | 48750 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX2723 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX2724",
    "title": "Advanced Grid Operations 4 (Lab Exercise 24)",
    "difficulty": "advanced",
    "sheetName": "EX2724",
    "formula": "=XLOOKUP(A25, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for advanced grid operations 4. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX2724.",
    "requirements": [
      "Ensure target worksheet tab is named EX2724.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX2724** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX2724**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=AdvancedGridOperations(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "40000",
      "mask": "Mask: EX2724_Standard",
      "rendered": "Rendered Output 24 (EX2724)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX2724-01 | 40000 | Rendered Output | Passed |\n| EX2724-02 | 50000 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX2724 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX2725",
    "title": "Executive Reporting Layout 5 (Lab Exercise 25)",
    "difficulty": "advanced",
    "sheetName": "EX2725",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for executive reporting layout 5. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX2725.",
    "requirements": [
      "Ensure target worksheet tab is named EX2725.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX2725** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX2725**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=ExecutiveReportingLayout(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "41250",
      "mask": "Mask: EX2725_Standard",
      "rendered": "Rendered Output 25 (EX2725)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX2725-01 | 41250 | Rendered Output | Passed |\n| EX2725-02 | 51250 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX2725 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
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

  const outputPath = path.join(excelFilesDir, '006_004_modern_office_scripts_typescript_and_power_automate_master.xlsx');
  await wb.xlsx.writeFile(outputPath);
  console.log(`✓ Generated 006_004_modern_office_scripts_typescript_and_power_automate_master.xlsx for module 006_004_modern-office-scripts-typescript-and-power-automate`);
  fs.copyFileSync(outputPath, path.join(excelFilesDir, 'modern_office_scripts_typescript_and_power_automate_master.xlsx'));
  fs.copyFileSync(outputPath, path.join(excelFilesDir, '006_004_modern_office_scripts_typescript_and_power_automate_master.xlsx'));
}

buildWorkbook().catch(console.error);
