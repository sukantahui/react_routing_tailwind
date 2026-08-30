const ExcelJS = require('E:/react_routing_tailwind/node_modules/exceljs');
const fs = require('fs');
const path = require('path');

const excelBaseDir = 'E:/react_routing_tailwind/src/components/study/excel';
const moduleDir = path.join(excelBaseDir, 'topics/001_004_basic-charts-and-visualizations');
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
  bSub2.value = `Module 5: 001_004_basic-charts-and-visualizations\nCurriculum Track: EXCEL-PRO-901 | Student Practice Workbook`;
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
    "projectId": "EX501",
    "title": "Workplace Problem Scenario 1 (Lab Exercise 1)",
    "difficulty": "beginner",
    "sheetName": "EX501",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for workplace problem scenario 1. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX501.",
    "requirements": [
      "Ensure target worksheet tab is named EX501.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX501** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX501**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=WorkplaceProblemScenario(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "11250",
      "mask": "Mask: EX501_Standard",
      "rendered": "Rendered Output 1 (EX501)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX501-01 | 11250 | Rendered Output | Passed |\n| EX501-02 | 21250 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX501 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX502",
    "title": "Data Hygiene & Audit Exercise 2 (Lab Exercise 2)",
    "difficulty": "beginner",
    "sheetName": "EX502",
    "formula": "=XLOOKUP(A3, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for data hygiene & audit exercise 2. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX502.",
    "requirements": [
      "Ensure target worksheet tab is named EX502.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX502** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX502**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=DataHygieneAuditExercise(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "12500",
      "mask": "Mask: EX502_Standard",
      "rendered": "Rendered Output 2 (EX502)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX502-01 | 12500 | Rendered Output | Passed |\n| EX502-02 | 22500 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX502 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX503",
    "title": "Formula Syntax Practice 3 (Lab Exercise 3)",
    "difficulty": "beginner",
    "sheetName": "EX503",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for formula syntax practice 3. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX503.",
    "requirements": [
      "Ensure target worksheet tab is named EX503.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX503** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX503**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=FormulaSyntaxPractice(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "13750",
      "mask": "Mask: EX503_Standard",
      "rendered": "Rendered Output 3 (EX503)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX503-01 | 13750 | Rendered Output | Passed |\n| EX503-02 | 23750 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX503 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX504",
    "title": "Advanced Grid Operations 4 (Lab Exercise 4)",
    "difficulty": "beginner",
    "sheetName": "EX504",
    "formula": "=XLOOKUP(A5, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for advanced grid operations 4. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX504.",
    "requirements": [
      "Ensure target worksheet tab is named EX504.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX504** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX504**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=AdvancedGridOperations(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "15000",
      "mask": "Mask: EX504_Standard",
      "rendered": "Rendered Output 4 (EX504)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX504-01 | 15000 | Rendered Output | Passed |\n| EX504-02 | 25000 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX504 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX505",
    "title": "Executive Reporting Layout 5 (Lab Exercise 5)",
    "difficulty": "beginner",
    "sheetName": "EX505",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for executive reporting layout 5. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX505.",
    "requirements": [
      "Ensure target worksheet tab is named EX505.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX505** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX505**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=ExecutiveReportingLayout(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "16250",
      "mask": "Mask: EX505_Standard",
      "rendered": "Rendered Output 5 (EX505)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX505-01 | 16250 | Rendered Output | Passed |\n| EX505-02 | 26250 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX505 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX506",
    "title": "Data Modeling & Structure 6 (Lab Exercise 6)",
    "difficulty": "beginner",
    "sheetName": "EX506",
    "formula": "=XLOOKUP(A7, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for data modeling & structure 6. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX506.",
    "requirements": [
      "Ensure target worksheet tab is named EX506.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX506** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX506**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=DataModelingStructure(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "17500",
      "mask": "Mask: EX506_Standard",
      "rendered": "Rendered Output 6 (EX506)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX506-01 | 17500 | Rendered Output | Passed |\n| EX506-02 | 27500 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX506 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX507",
    "title": "Analytical Calculation Matrix 7 (Lab Exercise 7)",
    "difficulty": "beginner",
    "sheetName": "EX507",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for analytical calculation matrix 7. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX507.",
    "requirements": [
      "Ensure target worksheet tab is named EX507.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX507** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX507**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=AnalyticalCalculationMatrix(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "18750",
      "mask": "Mask: EX507_Standard",
      "rendered": "Rendered Output 7 (EX507)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX507-01 | 18750 | Rendered Output | Passed |\n| EX507-02 | 28750 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX507 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX508",
    "title": "Error Handling & Integrity Check 8 (Lab Exercise 8)",
    "difficulty": "beginner",
    "sheetName": "EX508",
    "formula": "=XLOOKUP(A9, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for error handling & integrity check 8. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX508.",
    "requirements": [
      "Ensure target worksheet tab is named EX508.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX508** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX508**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=ErrorHandlingIntegrityCheck(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "20000",
      "mask": "Mask: EX508_Standard",
      "rendered": "Rendered Output 8 (EX508)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX508-01 | 20000 | Rendered Output | Passed |\n| EX508-02 | 30000 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX508 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX509",
    "title": "Automated Workflow Script 9 (Lab Exercise 9)",
    "difficulty": "intermediate",
    "sheetName": "EX509",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for automated workflow script 9. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX509.",
    "requirements": [
      "Ensure target worksheet tab is named EX509.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX509** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX509**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=AutomatedWorkflowScript(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "21250",
      "mask": "Mask: EX509_Standard",
      "rendered": "Rendered Output 9 (EX509)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX509-01 | 21250 | Rendered Output | Passed |\n| EX509-02 | 31250 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX509 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX510",
    "title": "Capstone Comprehensive Audit 10 (Lab Exercise 10)",
    "difficulty": "intermediate",
    "sheetName": "EX510",
    "formula": "=XLOOKUP(A11, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for capstone comprehensive audit 10. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX510.",
    "requirements": [
      "Ensure target worksheet tab is named EX510.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX510** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX510**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=CapstoneComprehensiveAudit(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "22500",
      "mask": "Mask: EX510_Standard",
      "rendered": "Rendered Output 10 (EX510)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX510-01 | 22500 | Rendered Output | Passed |\n| EX510-02 | 32500 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX510 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX511",
    "title": "Workplace Problem Scenario 1 (Lab Exercise 11)",
    "difficulty": "intermediate",
    "sheetName": "EX511",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for workplace problem scenario 1. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX511.",
    "requirements": [
      "Ensure target worksheet tab is named EX511.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX511** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX511**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=WorkplaceProblemScenario(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "23750",
      "mask": "Mask: EX511_Standard",
      "rendered": "Rendered Output 11 (EX511)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX511-01 | 23750 | Rendered Output | Passed |\n| EX511-02 | 33750 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX511 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX512",
    "title": "Data Hygiene & Audit Exercise 2 (Lab Exercise 12)",
    "difficulty": "intermediate",
    "sheetName": "EX512",
    "formula": "=XLOOKUP(A13, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for data hygiene & audit exercise 2. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX512.",
    "requirements": [
      "Ensure target worksheet tab is named EX512.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX512** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX512**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=DataHygieneAuditExercise(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "25000",
      "mask": "Mask: EX512_Standard",
      "rendered": "Rendered Output 12 (EX512)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX512-01 | 25000 | Rendered Output | Passed |\n| EX512-02 | 35000 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX512 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX513",
    "title": "Formula Syntax Practice 3 (Lab Exercise 13)",
    "difficulty": "intermediate",
    "sheetName": "EX513",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for formula syntax practice 3. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX513.",
    "requirements": [
      "Ensure target worksheet tab is named EX513.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX513** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX513**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=FormulaSyntaxPractice(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "26250",
      "mask": "Mask: EX513_Standard",
      "rendered": "Rendered Output 13 (EX513)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX513-01 | 26250 | Rendered Output | Passed |\n| EX513-02 | 36250 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX513 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX514",
    "title": "Advanced Grid Operations 4 (Lab Exercise 14)",
    "difficulty": "intermediate",
    "sheetName": "EX514",
    "formula": "=XLOOKUP(A15, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for advanced grid operations 4. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX514.",
    "requirements": [
      "Ensure target worksheet tab is named EX514.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX514** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX514**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=AdvancedGridOperations(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "27500",
      "mask": "Mask: EX514_Standard",
      "rendered": "Rendered Output 14 (EX514)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX514-01 | 27500 | Rendered Output | Passed |\n| EX514-02 | 37500 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX514 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX515",
    "title": "Executive Reporting Layout 5 (Lab Exercise 15)",
    "difficulty": "intermediate",
    "sheetName": "EX515",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for executive reporting layout 5. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX515.",
    "requirements": [
      "Ensure target worksheet tab is named EX515.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX515** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX515**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=ExecutiveReportingLayout(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "28750",
      "mask": "Mask: EX515_Standard",
      "rendered": "Rendered Output 15 (EX515)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX515-01 | 28750 | Rendered Output | Passed |\n| EX515-02 | 38750 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX515 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX516",
    "title": "Data Modeling & Structure 6 (Lab Exercise 16)",
    "difficulty": "intermediate",
    "sheetName": "EX516",
    "formula": "=XLOOKUP(A17, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for data modeling & structure 6. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX516.",
    "requirements": [
      "Ensure target worksheet tab is named EX516.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX516** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX516**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=DataModelingStructure(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "30000",
      "mask": "Mask: EX516_Standard",
      "rendered": "Rendered Output 16 (EX516)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX516-01 | 30000 | Rendered Output | Passed |\n| EX516-02 | 40000 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX516 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX517",
    "title": "Analytical Calculation Matrix 7 (Lab Exercise 17)",
    "difficulty": "intermediate",
    "sheetName": "EX517",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for analytical calculation matrix 7. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX517.",
    "requirements": [
      "Ensure target worksheet tab is named EX517.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX517** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX517**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=AnalyticalCalculationMatrix(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "31250",
      "mask": "Mask: EX517_Standard",
      "rendered": "Rendered Output 17 (EX517)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX517-01 | 31250 | Rendered Output | Passed |\n| EX517-02 | 41250 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX517 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX518",
    "title": "Error Handling & Integrity Check 8 (Lab Exercise 18)",
    "difficulty": "intermediate",
    "sheetName": "EX518",
    "formula": "=XLOOKUP(A19, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for error handling & integrity check 8. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX518.",
    "requirements": [
      "Ensure target worksheet tab is named EX518.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX518** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX518**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=ErrorHandlingIntegrityCheck(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "32500",
      "mask": "Mask: EX518_Standard",
      "rendered": "Rendered Output 18 (EX518)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX518-01 | 32500 | Rendered Output | Passed |\n| EX518-02 | 42500 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX518 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX519",
    "title": "Automated Workflow Script 9 (Lab Exercise 19)",
    "difficulty": "advanced",
    "sheetName": "EX519",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for automated workflow script 9. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX519.",
    "requirements": [
      "Ensure target worksheet tab is named EX519.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX519** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX519**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=AutomatedWorkflowScript(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "33750",
      "mask": "Mask: EX519_Standard",
      "rendered": "Rendered Output 19 (EX519)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX519-01 | 33750 | Rendered Output | Passed |\n| EX519-02 | 43750 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX519 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX520",
    "title": "Capstone Comprehensive Audit 10 (Lab Exercise 20)",
    "difficulty": "advanced",
    "sheetName": "EX520",
    "formula": "=XLOOKUP(A21, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for capstone comprehensive audit 10. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX520.",
    "requirements": [
      "Ensure target worksheet tab is named EX520.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX520** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX520**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=CapstoneComprehensiveAudit(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "35000",
      "mask": "Mask: EX520_Standard",
      "rendered": "Rendered Output 20 (EX520)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX520-01 | 35000 | Rendered Output | Passed |\n| EX520-02 | 45000 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX520 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX521",
    "title": "Workplace Problem Scenario 1 (Lab Exercise 21)",
    "difficulty": "advanced",
    "sheetName": "EX521",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for workplace problem scenario 1. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX521.",
    "requirements": [
      "Ensure target worksheet tab is named EX521.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX521** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX521**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=WorkplaceProblemScenario(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "36250",
      "mask": "Mask: EX521_Standard",
      "rendered": "Rendered Output 21 (EX521)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX521-01 | 36250 | Rendered Output | Passed |\n| EX521-02 | 46250 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX521 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX522",
    "title": "Data Hygiene & Audit Exercise 2 (Lab Exercise 22)",
    "difficulty": "advanced",
    "sheetName": "EX522",
    "formula": "=XLOOKUP(A23, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for data hygiene & audit exercise 2. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX522.",
    "requirements": [
      "Ensure target worksheet tab is named EX522.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX522** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX522**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=DataHygieneAuditExercise(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "37500",
      "mask": "Mask: EX522_Standard",
      "rendered": "Rendered Output 22 (EX522)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX522-01 | 37500 | Rendered Output | Passed |\n| EX522-02 | 47500 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX522 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX523",
    "title": "Formula Syntax Practice 3 (Lab Exercise 23)",
    "difficulty": "advanced",
    "sheetName": "EX523",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for formula syntax practice 3. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX523.",
    "requirements": [
      "Ensure target worksheet tab is named EX523.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX523** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX523**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=FormulaSyntaxPractice(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "38750",
      "mask": "Mask: EX523_Standard",
      "rendered": "Rendered Output 23 (EX523)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX523-01 | 38750 | Rendered Output | Passed |\n| EX523-02 | 48750 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX523 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX524",
    "title": "Advanced Grid Operations 4 (Lab Exercise 24)",
    "difficulty": "advanced",
    "sheetName": "EX524",
    "formula": "=XLOOKUP(A25, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for advanced grid operations 4. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX524.",
    "requirements": [
      "Ensure target worksheet tab is named EX524.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX524** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX524**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=AdvancedGridOperations(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "40000",
      "mask": "Mask: EX524_Standard",
      "rendered": "Rendered Output 24 (EX524)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX524-01 | 40000 | Rendered Output | Passed |\n| EX524-02 | 50000 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX524 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX525",
    "title": "Executive Reporting Layout 5 (Lab Exercise 25)",
    "difficulty": "advanced",
    "sheetName": "EX525",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for executive reporting layout 5. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX525.",
    "requirements": [
      "Ensure target worksheet tab is named EX525.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX525** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX525**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=ExecutiveReportingLayout(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "41250",
      "mask": "Mask: EX525_Standard",
      "rendered": "Rendered Output 25 (EX525)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX525-01 | 41250 | Rendered Output | Passed |\n| EX525-02 | 51250 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX525 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
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

  const outputPath = path.join(excelFilesDir, '001_004_basic_charts_and_visualizations_master.xlsx');
  await wb.xlsx.writeFile(outputPath);
  console.log(`✓ Generated 001_004_basic_charts_and_visualizations_master.xlsx for module 001_004_basic-charts-and-visualizations`);
  fs.copyFileSync(outputPath, path.join(excelFilesDir, 'basic_charts.xlsx'));
  fs.copyFileSync(outputPath, path.join(excelFilesDir, '001_004_basic_charts_and_visualizations_master.xlsx'));
}

buildWorkbook().catch(console.error);
