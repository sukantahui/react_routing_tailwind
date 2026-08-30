const ExcelJS = require('E:/react_routing_tailwind/node_modules/exceljs');
const fs = require('fs');
const path = require('path');

const excelBaseDir = 'E:/react_routing_tailwind/src/components/study/excel';
const moduleDir = path.join(excelBaseDir, 'topics/001_002_data-entry-editing-and-formatting');
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
  bSub2.value = `Module 2: 001_002_data-entry-editing-and-formatting\nCurriculum Track: EXCEL-PRO-901 | Student Practice Workbook`;
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
    "projectId": "EX201",
    "title": "Indian Rupee (₹) Financial Formatting (Lab Exercise 1)",
    "difficulty": "beginner",
    "sheetName": "EX201",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for indian rupee (₹) financial formatting. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX201.",
    "requirements": [
      "Ensure target worksheet tab is named EX201.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX201** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX201**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=IndianRupeeFinancialFormatting(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "11250",
      "mask": "Mask: EX201_Standard",
      "rendered": "Rendered Output 1 (EX201)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX201-01 | 11250 | Rendered Output | Passed |\n| EX201-02 | 21250 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX201 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX202",
    "title": "Flash Fill (Ctrl+E) Name Extraction (Lab Exercise 2)",
    "difficulty": "beginner",
    "sheetName": "EX202",
    "formula": "=XLOOKUP(A3, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for flash fill (ctrl+e) name extraction. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX202.",
    "requirements": [
      "Ensure target worksheet tab is named EX202.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX202** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX202**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=FlashFillCtrlENameExtraction(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "12500",
      "mask": "Mask: EX202_Standard",
      "rendered": "Rendered Output 2 (EX202)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX202-01 | 12500 | Rendered Output | Passed |\n| EX202-02 | 22500 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX202 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX203",
    "title": "Center Across Selection Header Banner (Lab Exercise 3)",
    "difficulty": "beginner",
    "sheetName": "EX203",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for center across selection header banner. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX203.",
    "requirements": [
      "Ensure target worksheet tab is named EX203.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX203** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX203**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=CenterAcrossSelectionHeaderBanner(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "13750",
      "mask": "Mask: EX203_Standard",
      "rendered": "Rendered Output 3 (EX203)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX203-01 | 13750 | Rendered Output | Passed |\n| EX203-02 | 23750 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX203 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX204",
    "title": "1900 Date Serials & Elapsed Hours ([h]:mm:ss) (Lab Exercise 4)",
    "difficulty": "beginner",
    "sheetName": "EX204",
    "formula": "=XLOOKUP(A5, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for 1900 date serials & elapsed hours ([h]:mm:ss). Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX204.",
    "requirements": [
      "Ensure target worksheet tab is named EX204.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX204** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX204**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=DateSerialsElapsedHourshmmss(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "15000",
      "mask": "Mask: EX204_Standard",
      "rendered": "Rendered Output 4 (EX204)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX204-01 | 15000 | Rendered Output | Passed |\n| EX204-02 | 25000 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX204 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX205",
    "title": "4-Section Accounting Format Mask (Lab Exercise 5)",
    "difficulty": "beginner",
    "sheetName": "EX205",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for 4-section accounting format mask. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX205.",
    "requirements": [
      "Ensure target worksheet tab is named EX205.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX205** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX205**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=SectionAccountingFormatMask(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "16250",
      "mask": "Mask: EX205_Standard",
      "rendered": "Rendered Output 5 (EX205)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX205-01 | 16250 | Rendered Output | Passed |\n| EX205-02 | 26250 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX205 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX206",
    "title": "Text-Stored Numbers & ASCII Cleaning (Lab Exercise 6)",
    "difficulty": "beginner",
    "sheetName": "EX206",
    "formula": "=XLOOKUP(A7, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for text-stored numbers & ascii cleaning. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX206.",
    "requirements": [
      "Ensure target worksheet tab is named EX206.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX206** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX206**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=TextStoredNumbersASCIICleaning(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "17500",
      "mask": "Mask: EX206_Standard",
      "rendered": "Rendered Output 6 (EX206)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX206-01 | 17500 | Rendered Output | Passed |\n| EX206-02 | 27500 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX206 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX207",
    "title": "Row Vector Insertion & Range Shift (Lab Exercise 7)",
    "difficulty": "beginner",
    "sheetName": "EX207",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for row vector insertion & range shift. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX207.",
    "requirements": [
      "Ensure target worksheet tab is named EX207.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX207** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX207**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=RowVectorInsertionRangeShift(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "18750",
      "mask": "Mask: EX207_Standard",
      "rendered": "Rendered Output 7 (EX207)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX207-01 | 18750 | Rendered Output | Passed |\n| EX207-02 | 28750 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX207 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX208",
    "title": "Phone & Aadhaar Security Redaction (Lab Exercise 8)",
    "difficulty": "beginner",
    "sheetName": "EX208",
    "formula": "=XLOOKUP(A9, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for phone & aadhaar security redaction. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX208.",
    "requirements": [
      "Ensure target worksheet tab is named EX208.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX208** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX208**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=PhoneAadhaarSecurityRedaction(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "20000",
      "mask": "Mask: EX208_Standard",
      "rendered": "Rendered Output 8 (EX208)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX208-01 | 20000 | Rendered Output | Passed |\n| EX208-02 | 30000 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX208 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX209",
    "title": "Bounding Box Touch Entry Mode (Lab Exercise 9)",
    "difficulty": "intermediate",
    "sheetName": "EX209",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for bounding box touch entry mode. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX209.",
    "requirements": [
      "Ensure target worksheet tab is named EX209.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX209** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX209**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=BoundingBoxTouchEntryMode(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "21250",
      "mask": "Mask: EX209_Standard",
      "rendered": "Rendered Output 9 (EX209)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX209-01 | 21250 | Rendered Output | Passed |\n| EX209-02 | 31250 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX209 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX210",
    "title": "Wall Street Auditing Color Discipline (Lab Exercise 10)",
    "difficulty": "intermediate",
    "sheetName": "EX210",
    "formula": "=XLOOKUP(A11, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for wall street auditing color discipline. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX210.",
    "requirements": [
      "Ensure target worksheet tab is named EX210.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX210** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX210**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=WallStreetAuditingColorDiscipline(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "22500",
      "mask": "Mask: EX210_Standard",
      "rendered": "Rendered Output 10 (EX210)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX210-01 | 22500 | Rendered Output | Passed |\n| EX210-02 | 32500 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX210 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX211",
    "title": "Indian Rupee (₹) Financial Formatting (Lab Exercise 11)",
    "difficulty": "intermediate",
    "sheetName": "EX211",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for indian rupee (₹) financial formatting. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX211.",
    "requirements": [
      "Ensure target worksheet tab is named EX211.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX211** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX211**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=IndianRupeeFinancialFormatting(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "23750",
      "mask": "Mask: EX211_Standard",
      "rendered": "Rendered Output 11 (EX211)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX211-01 | 23750 | Rendered Output | Passed |\n| EX211-02 | 33750 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX211 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX212",
    "title": "Flash Fill (Ctrl+E) Name Extraction (Lab Exercise 12)",
    "difficulty": "intermediate",
    "sheetName": "EX212",
    "formula": "=XLOOKUP(A13, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for flash fill (ctrl+e) name extraction. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX212.",
    "requirements": [
      "Ensure target worksheet tab is named EX212.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX212** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX212**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=FlashFillCtrlENameExtraction(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "25000",
      "mask": "Mask: EX212_Standard",
      "rendered": "Rendered Output 12 (EX212)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX212-01 | 25000 | Rendered Output | Passed |\n| EX212-02 | 35000 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX212 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX213",
    "title": "Center Across Selection Header Banner (Lab Exercise 13)",
    "difficulty": "intermediate",
    "sheetName": "EX213",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for center across selection header banner. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX213.",
    "requirements": [
      "Ensure target worksheet tab is named EX213.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX213** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX213**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=CenterAcrossSelectionHeaderBanner(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "26250",
      "mask": "Mask: EX213_Standard",
      "rendered": "Rendered Output 13 (EX213)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX213-01 | 26250 | Rendered Output | Passed |\n| EX213-02 | 36250 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX213 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX214",
    "title": "1900 Date Serials & Elapsed Hours ([h]:mm:ss) (Lab Exercise 14)",
    "difficulty": "intermediate",
    "sheetName": "EX214",
    "formula": "=XLOOKUP(A15, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for 1900 date serials & elapsed hours ([h]:mm:ss). Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX214.",
    "requirements": [
      "Ensure target worksheet tab is named EX214.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX214** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX214**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=DateSerialsElapsedHourshmmss(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "27500",
      "mask": "Mask: EX214_Standard",
      "rendered": "Rendered Output 14 (EX214)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX214-01 | 27500 | Rendered Output | Passed |\n| EX214-02 | 37500 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX214 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX215",
    "title": "4-Section Accounting Format Mask (Lab Exercise 15)",
    "difficulty": "intermediate",
    "sheetName": "EX215",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for 4-section accounting format mask. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX215.",
    "requirements": [
      "Ensure target worksheet tab is named EX215.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX215** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX215**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=SectionAccountingFormatMask(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "28750",
      "mask": "Mask: EX215_Standard",
      "rendered": "Rendered Output 15 (EX215)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX215-01 | 28750 | Rendered Output | Passed |\n| EX215-02 | 38750 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX215 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX216",
    "title": "Text-Stored Numbers & ASCII Cleaning (Lab Exercise 16)",
    "difficulty": "intermediate",
    "sheetName": "EX216",
    "formula": "=XLOOKUP(A17, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for text-stored numbers & ascii cleaning. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX216.",
    "requirements": [
      "Ensure target worksheet tab is named EX216.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX216** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX216**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=TextStoredNumbersASCIICleaning(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "30000",
      "mask": "Mask: EX216_Standard",
      "rendered": "Rendered Output 16 (EX216)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX216-01 | 30000 | Rendered Output | Passed |\n| EX216-02 | 40000 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX216 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX217",
    "title": "Row Vector Insertion & Range Shift (Lab Exercise 17)",
    "difficulty": "intermediate",
    "sheetName": "EX217",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for row vector insertion & range shift. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX217.",
    "requirements": [
      "Ensure target worksheet tab is named EX217.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX217** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX217**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=RowVectorInsertionRangeShift(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "31250",
      "mask": "Mask: EX217_Standard",
      "rendered": "Rendered Output 17 (EX217)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX217-01 | 31250 | Rendered Output | Passed |\n| EX217-02 | 41250 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX217 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX218",
    "title": "Phone & Aadhaar Security Redaction (Lab Exercise 18)",
    "difficulty": "intermediate",
    "sheetName": "EX218",
    "formula": "=XLOOKUP(A19, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for phone & aadhaar security redaction. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX218.",
    "requirements": [
      "Ensure target worksheet tab is named EX218.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX218** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX218**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=PhoneAadhaarSecurityRedaction(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "32500",
      "mask": "Mask: EX218_Standard",
      "rendered": "Rendered Output 18 (EX218)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX218-01 | 32500 | Rendered Output | Passed |\n| EX218-02 | 42500 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX218 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX219",
    "title": "Bounding Box Touch Entry Mode (Lab Exercise 19)",
    "difficulty": "advanced",
    "sheetName": "EX219",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for bounding box touch entry mode. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX219.",
    "requirements": [
      "Ensure target worksheet tab is named EX219.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX219** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX219**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=BoundingBoxTouchEntryMode(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "33750",
      "mask": "Mask: EX219_Standard",
      "rendered": "Rendered Output 19 (EX219)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX219-01 | 33750 | Rendered Output | Passed |\n| EX219-02 | 43750 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX219 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX220",
    "title": "Wall Street Auditing Color Discipline (Lab Exercise 20)",
    "difficulty": "advanced",
    "sheetName": "EX220",
    "formula": "=XLOOKUP(A21, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for wall street auditing color discipline. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX220.",
    "requirements": [
      "Ensure target worksheet tab is named EX220.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX220** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX220**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=WallStreetAuditingColorDiscipline(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "35000",
      "mask": "Mask: EX220_Standard",
      "rendered": "Rendered Output 20 (EX220)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX220-01 | 35000 | Rendered Output | Passed |\n| EX220-02 | 45000 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX220 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX221",
    "title": "Indian Rupee (₹) Financial Formatting (Lab Exercise 21)",
    "difficulty": "advanced",
    "sheetName": "EX221",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for indian rupee (₹) financial formatting. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX221.",
    "requirements": [
      "Ensure target worksheet tab is named EX221.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX221** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX221**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=IndianRupeeFinancialFormatting(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "36250",
      "mask": "Mask: EX221_Standard",
      "rendered": "Rendered Output 21 (EX221)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX221-01 | 36250 | Rendered Output | Passed |\n| EX221-02 | 46250 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX221 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX222",
    "title": "Flash Fill (Ctrl+E) Name Extraction (Lab Exercise 22)",
    "difficulty": "advanced",
    "sheetName": "EX222",
    "formula": "=XLOOKUP(A23, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for flash fill (ctrl+e) name extraction. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX222.",
    "requirements": [
      "Ensure target worksheet tab is named EX222.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX222** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX222**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=FlashFillCtrlENameExtraction(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "37500",
      "mask": "Mask: EX222_Standard",
      "rendered": "Rendered Output 22 (EX222)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX222-01 | 37500 | Rendered Output | Passed |\n| EX222-02 | 47500 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX222 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX223",
    "title": "Center Across Selection Header Banner (Lab Exercise 23)",
    "difficulty": "advanced",
    "sheetName": "EX223",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for center across selection header banner. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX223.",
    "requirements": [
      "Ensure target worksheet tab is named EX223.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX223** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX223**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=CenterAcrossSelectionHeaderBanner(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "38750",
      "mask": "Mask: EX223_Standard",
      "rendered": "Rendered Output 23 (EX223)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX223-01 | 38750 | Rendered Output | Passed |\n| EX223-02 | 48750 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX223 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX224",
    "title": "1900 Date Serials & Elapsed Hours ([h]:mm:ss) (Lab Exercise 24)",
    "difficulty": "advanced",
    "sheetName": "EX224",
    "formula": "=XLOOKUP(A25, Data!A:A, Data!B:B, \"Not Found\")",
    "description": "Execute workplace practical modeling for 1900 date serials & elapsed hours ([h]:mm:ss). Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX224.",
    "requirements": [
      "Ensure target worksheet tab is named EX224.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX224** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX224**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=DateSerialsElapsedHourshmmss(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "40000",
      "mask": "Mask: EX224_Standard",
      "rendered": "Rendered Output 24 (EX224)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX224-01 | 40000 | Rendered Output | Passed |\n| EX224-02 | 50000 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX224 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
  },
  {
    "projectId": "EX225",
    "title": "4-Section Accounting Format Mask (Lab Exercise 25)",
    "difficulty": "advanced",
    "sheetName": "EX225",
    "formula": "₹ #,##,##0.00;[Red](₹ #,##,##0.00);\"-\";@",
    "description": "Execute workplace practical modeling for 4-section accounting format mask. Clean input payloads, structure grid formulas, verify memory models, and enforce zero-error cell dependencies on worksheet EX225.",
    "requirements": [
      "Ensure target worksheet tab is named EX225.",
      "Apply strict formula syntax or formatting rules specified in the execution guide.",
      "Guarantee underlying cell memory remains pure float/number for dynamic math.",
      "Pass auditing checks without #VALUE!, #REF!, or #N/A error propagation."
    ],
    "stepByStep": "1. **Navigate to Worksheet**: Open tab **EX225** in the master workbook.\n2. **Select Target Range**: Highlight cell range `B2:B50` on sheet **EX225**.\n3. **Execute Formula/Operation**: Press `Ctrl + 1` or type formula `=SectionAccountingFormatMask(A2:A50)`.\n4. **Audit Verification**: Verify calculation output and confirm zero truncation.",
    "rawMemoryVsRendered": {
      "raw": "41250",
      "mask": "Mask: EX225_Standard",
      "rendered": "Rendered Output 25 (EX225)"
    },
    "expectedOutput": "| Item ID | Raw Input Value | Formatted Display | Status |\n| ------- | --------------- | ----------------- | ------ |\n| EX225-01 | 41250 | Rendered Output | Passed |\n| EX225-02 | 51250 | Rendered Output | Passed |",
    "proTip": "Always use explicit alphanumeric sheet IDs like EX225 to ensure 1-to-1 mapping between web training cards and local Excel workbooks."
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

  const outputPath = path.join(excelFilesDir, '001_002_data_entry_editing_and_formatting_master.xlsx');
  await wb.xlsx.writeFile(outputPath);
  console.log(`✓ Generated 001_002_data_entry_editing_and_formatting_master.xlsx for module 001_002_data-entry-editing-and-formatting`);
  fs.copyFileSync(outputPath, path.join(excelFilesDir, 'data_entry_formatting.xlsx'));
  fs.copyFileSync(outputPath, path.join(excelFilesDir, '001_002_data_entry_editing_and_formatting_master.xlsx'));
}

buildWorkbook().catch(console.error);
