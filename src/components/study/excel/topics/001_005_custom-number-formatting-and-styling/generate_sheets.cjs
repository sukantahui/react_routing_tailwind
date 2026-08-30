const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

const excelBaseDir = 'E:/react_routing_tailwind/src/components/study/excel';
const moduleDir = path.join(excelBaseDir, 'topics/001_005_custom-number-formatting-and-styling');
const excelFilesDir = path.join(moduleDir, 'excel_files');
if (!fs.existsSync(excelFilesDir)) fs.mkdirSync(excelFilesDir, { recursive: true });

// Read curriculum topics directly from excel-basic-to-advanced.json
const jsonPath = path.join(excelBaseDir, 'excel-basic-to-advanced.json');
let topicsFromTree = [];
if (fs.existsSync(jsonPath)) {
  try {
    const rawJson = fs.readFileSync(jsonPath, 'utf8');
    const parsed = JSON.parse(rawJson);
    for (const seg of parsed.segments || []) {
      for (const mod of seg.modules || []) {
        if (mod.slug === '001_005_custom-number-formatting-and-styling') {
          topicsFromTree = mod.topics || [];
          break;
        }
      }
    }
  } catch (err) {
    console.warn("Could not parse excel-basic-to-advanced.json:", err.message);
  }
}

// Complete 15 Topic Definitions matching JSON topics array
const topicsData = [
  {
    topicId: "Topic0",
    sheetName: "Topic0",
    title: topicsFromTree[0] || "Introduction to Excel's Format Engine: Display Values vs Underlying Stored Values",
    difficulty: "Beginner",
    mask: "0.00",
    rawExample: "125438.8765",
    renderedExample: "125438.88",
    description: "Demonstrating how cell formatting changes visual representation without altering underlying floating-point numbers in memory."
  },
  {
    topicId: "Topic1",
    sheetName: "Topic1",
    title: topicsFromTree[1] || "The 4-Section Syntax Architecture: Positive ; Negative ; Zero ; Text",
    difficulty: "Beginner",
    mask: '₹ #,##,##0.00;[Red](₹ #,##,##0.00);"-";@',
    rawExample: "-14500.50",
    renderedExample: "(₹ 14,500.50)",
    description: "Structuring the four fundamental format sections: [Positive];[Negative];[Zero];[Text]."
  },
  {
    topicId: "Topic2",
    sheetName: "Topic2",
    title: topicsFromTree[2] || "Digit Placeholders Deep-Dive: Forced Zero (0), Optional Digits (#), and Decimal Alignment (?)",
    difficulty: "Beginner",
    mask: "00000 | #,##0.## | ??/??",
    rawExample: "42.5",
    renderedExample: "00042.50",
    description: "Comparing mandatory zero padding (0), optional digit suppression (#), and fractional decimal alignment (?)."
  },
  {
    topicId: "Topic3",
    sheetName: "Topic3",
    title: topicsFromTree[3] || "Currency and International Formats: $, ₹, €, £, and Indian Numbering (##,##,##0)",
    difficulty: "Beginner",
    mask: "[$-en-IN]₹ #,##,##0.00",
    rawExample: "1234567.89",
    renderedExample: "₹ 12,34,567.89",
    description: "Formatting global currencies including Indian Lakhs and Crores numbering standards."
  },
  {
    topicId: "Topic4",
    sheetName: "Topic4",
    title: topicsFromTree[4] || "Financial Statement Presentation: Wall Street Accounting Alignment Using _) and *",
    difficulty: "Intermediate",
    mask: '_($* #,##0.00_);_($* (#,##0.00);_($* "-"??_);_(@_)',
    rawExample: "85400.00",
    renderedExample: "$      85,400.00 ",
    description: "Aligning currency symbols flush-left and numbers flush-right for Wall Street publication standards."
  },
  {
    topicId: "Topic5",
    sheetName: "Topic5",
    title: topicsFromTree[5] || "Scaling Large Numbers into Thousands (K), Millions (M), and Billions (B)",
    difficulty: "Intermediate",
    mask: '$#,##0.0,," M"',
    rawExample: "14500000",
    renderedExample: "$14.5 M",
    description: "Scaling multi-million dollar corporate balances into compact executive board metrics using trailing commas."
  },
  {
    topicId: "Topic6",
    sheetName: "Topic6",
    title: topicsFromTree[6] || "Embedded Conditional Criteria ([>1000]) and Color Formatting ([Red], [Green], [ColorN])",
    difficulty: "Advanced",
    mask: '[Green][>1000]▲ #,##0;[Red][<0]▼ (#,##0);[Color10]#,##0',
    rawExample: "1450",
    renderedExample: "▲ 1,450",
    description: "Creating native C++ GPU speed conditional color alerts without Conditional Formatting overhead."
  },
  {
    topicId: "Topic7",
    sheetName: "Topic7",
    title: topicsFromTree[7] || "Date & Time Custom Formatting: Dates, Times, Quarters, Weekdays, and Dynamic Period Labels",
    difficulty: "Intermediate",
    mask: 'dd-mmm-yyyy hh:mm AM/PM',
    rawExample: "46261.604167",
    renderedExample: "27-Aug-2026 02:30 PM",
    description: "Formatting raw date serial integers and time fractions into unambiguous corporate dates and timestamps."
  },
  {
    topicId: "Topic8",
    sheetName: "Topic8",
    title: topicsFromTree[8] || "Elapsed Duration Tracking Exceeding 24 Hours with [h]:mm:ss for Timesheets",
    difficulty: "Intermediate",
    mask: '[h]:mm:ss',
    rawExample: "1.541667",
    renderedExample: "37:00:00",
    description: "Preventing 24-hour clock rollover in timesheets, SLA timers, and payroll shift calculations using bracketed hour tokens [h]."
  },
  {
    topicId: "Topic9",
    sheetName: "Topic9",
    title: topicsFromTree[9] || "Phone Numbers, Tax IDs (PAN/GSTIN/SSN), and Credit Card Masking Patterns",
    difficulty: "Beginner",
    mask: '+91 00000-00000',
    rawExample: "9830123456",
    renderedExample: "+91 98301-23456",
    description: "Masking national identification numbers, phone codes, and financial account numbers with fixed zero digit masks."
  },
  {
    topicId: "Topic10",
    sheetName: "Topic10",
    title: topicsFromTree[10] || "Text Placeholder Tokens (@), Literals, and Unit Suffixes (KG, Units, Hrs) Without Breaking Math",
    difficulty: "Intermediate",
    mask: '0.00" KG"',
    rawExample: "75.5",
    renderedExample: "75.50 KG",
    description: "Appending physical measurement units (KG, Units, Hrs) while preserving cell math and SUM() operations."
  },
  {
    topicId: "Topic11",
    sheetName: "Topic11",
    title: topicsFromTree[11] || "The Stealth Cloaking Operator (;;;) for Hiding Cell Contents and Dashboard Security",
    difficulty: "Advanced",
    mask: ';;;',
    rawExample: "948500",
    renderedExample: "[Hidden]",
    description: "Cloaking sensitive cell payloads and financial assumptions from visual display while maintaining active formula dependencies."
  },
  {
    topicId: "Topic12",
    sheetName: "Topic12",
    title: topicsFromTree[12] || "Real-World Project: Building an Executive Financial Income Statement with Dynamic Scaling and Color Alerts",
    difficulty: "Advanced",
    mask: '_($* #,##0.0,," M"_);[Red]_($* (#,##0.0,," M");_($* "-"??_);_(@_)',
    rawExample: "45800000",
    renderedExample: "$      45.8 M ",
    description: "Integrating scaled financial metrics, Wall Street alignment, and color alerts into an executive income statement model."
  },
  {
    topicId: "Topic13",
    sheetName: "Topic13",
    title: topicsFromTree[13] || "Practice Lab: 15 MCQs and 10 Custom Formatting Practical Workbook Challenges",
    difficulty: "Advanced",
    mask: '[$-409]dd-mmm-yyyy',
    rawExample: "46261",
    renderedExample: "27-Aug-2026",
    description: "Comprehensive practical laboratory exercises verifying custom formatting skills against industrial audit benchmarks."
  },
  {
    topicId: "Topic14",
    sheetName: "Topic14",
    title: topicsFromTree[14] || "Project Work",
    difficulty: "Advanced",
    mask: 'EX301-EX325 Master Financial Presentation Practice',
    rawExample: "1450000",
    renderedExample: "₹ 14,50,000.00",
    description: "Capstoning module mastery with 25 workplace modeling projects in the master workbook."
  }
];

async function buildWorkbook() {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Coder & AccoTax';
  wb.lastModifiedBy = 'Sukanta Hui';
  wb.created = new Date();
  wb.modified = new Date();

  // Helper to add styled worksheet with return hyperlink
  function addStyledSheet(sheetName, headerColor, columns, data) {
    const ws = wb.addWorksheet(sheetName, { views: [{ showGridLines: true }] });

    // Top Navigation Bar (Row 1)
    ws.mergeCells('A1:D1');
    const navCell = ws.getCell('A1');
    navCell.value = { text: '🏠 Jump to Executive Overview Landing Sheet', hyperlink: "#'Overview'!A1" };
    navCell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FF0284C7' }, underline: true };
    navCell.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
    ws.getRow(1).height = 24;

    // Header Row (Row 3)
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

    // Data Rows (Row 4 onwards)
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

    // Dynamic Column Width Calculation (Zero Truncation Rule)
    columns.forEach((col, colIdx) => {
      let maxLen = col.header ? col.header.toString().length : 12;
      data.forEach(r => {
        if (r[colIdx] !== null && r[colIdx] !== undefined) {
          const s = r[colIdx].toString();
          if (s.length > maxLen) maxLen = s.length;
        }
      });
      ws.getColumn(colIdx + 1).width = Math.min(Math.max(maxLen + 6, 22), 65);
    });

    return ws;
  }

  // =========================================================================
  // 1. EXECUTIVE OVERVIEW LANDING SHEET (Sheet 1: Overview)
  // =========================================================================
  const wsOverview = wb.addWorksheet('Overview', { views: [{ showGridLines: true }] });
  wsOverview.columns = [{ width: 18 }, { width: 32 }, { width: 35 }, { width: 45 }, { width: 30 }, { width: 40 }];

  // Organization Brand Logo Placement (A1:A5)
  const logoPath = path.join(excelBaseDir, 'assets/cnat.png');
  if (fs.existsSync(logoPath)) {
    const logoId = wb.addImage({ filename: logoPath, extension: 'png' });
    wsOverview.addImage(logoId, { tl: { col: 0.08, row: 0.15 }, ext: { width: 110, height: 110 }, editAs: 'oneCell' });
  }

  // Top Title Banner (B1:F2)
  wsOverview.mergeCells('B1:F2');
  const bTitle = wsOverview.getCell('B1');
  bTitle.value = 'CODER & ACCOTAX';
  bTitle.font = { name: 'Segoe UI', size: 20, bold: true, color: { argb: 'FFFFFFFF' } };
  bTitle.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
  bTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } };

  // Subtitle (B3:F3)
  wsOverview.mergeCells('B3:F3');
  const bSub1 = wsOverview.getCell('B3');
  bSub1.value = 'ISO 9001:2015 Certified Centre of Excellence in Computer Science & Financial Modeling';
  bSub1.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FF38BDF8' } };
  bSub1.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
  bSub1.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E293B' } };

  // Metadata Subtitle (B4:F5)
  wsOverview.mergeCells('B4:F5');
  const bSub2 = wsOverview.getCell('B4');
  bSub2.value = `Module 5: 001_005_custom-number-formatting-and-styling\nCurriculum Track: EXCEL-PRO-901 | Master Student Practice Workbook (15 Sequential Topics)`;
  bSub2.font = { name: 'Segoe UI', size: 9, color: { argb: 'FFFBBF24' } };
  bSub2.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true, indent: 1 };
  bSub2.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E293B' } };

  // Landing Hero Artwork Placement (rows 6 to 25)
  const landingImgPath = path.join(excelBaseDir, 'assets/landing_sheet.jpg');
  if (fs.existsSync(landingImgPath)) {
    const landingImgId = wb.addImage({ filename: landingImgPath, extension: 'jpeg' });
    wsOverview.addImage(landingImgId, { tl: { col: 0.15, row: 5.2 }, ext: { width: 600, height: 400 }, editAs: 'oneCell' });
  }
  for (let r = 6; r <= 25; r++) wsOverview.getRow(r).height = 20;

  // Section 1 Header: Organization Profile
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

  // Section 2 Header: Navigation Directory (Topics Sequence: Topic0 to Topic14)
  wsOverview.mergeCells('A34:F34');
  const s4Header = wsOverview.getCell('A34');
  s4Header.value = '📑 2. WORKBOOK TOPICS DIRECTORY & CLICK-TO-JUMP NAVIGATION TABLE';
  s4Header.font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: 'FFFFFFFF' } };
  s4Header.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD97706' } };

  const directoryHeaders = ['Sheet ID (Click to Jump)', 'Curriculum Topic Title', 'Difficulty Level', 'Target Format Code / Mask', 'Status'];
  const headerRow = wsOverview.getRow(35);
  headerRow.height = 26;
  directoryHeaders.forEach((h, cIdx) => {
    const cell = headerRow.getCell(cIdx + 1);
    cell.value = h;
    cell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E293B' } };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
  });

  // Render Directory Rows for Topic0 through Topic14
  topicsData.forEach((topic, idx) => {
    const rowNum = 36 + idx;
    const r = wsOverview.getRow(rowNum);
    r.height = 22;

    const cellId = r.getCell(1);
    cellId.value = { text: `🔗 ${topic.sheetName} (Jump)`, hyperlink: `#'${topic.sheetName}'!A1` };
    cellId.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FF0284C7' }, underline: true };
    cellId.alignment = { vertical: 'middle', horizontal: 'center' };

    r.getCell(2).value = topic.title;
    r.getCell(3).value = topic.difficulty;
    r.getCell(4).value = topic.mask;
    r.getCell(5).value = 'Verified Topic Practice Sheet';

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

  // Calculate Overview Column Widths
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

  // =========================================================================
  // 2. CREATE TOPIC WORKSHEETS IN SEQUENTIAL ORDER (Topic0 to Topic14)
  // =========================================================================
  const sampleNames = ['Swadeep Hui', 'Tuhina Das', 'Abhronila Ray', 'Susmita Sen', 'Debangshu Roy', 'Rahul Kumar', 'Priya Sharma', 'Aniket Verma', 'Sourav Ganguly', 'Sneha Ghosh', 'Arpan Dey', 'Subhajit Pal', 'Riya Sarkar', 'Dipankar Mitra', 'Barnali Dutta', 'Vikram Singh', 'Kavita Nair', 'Amitabh Basu', 'Pooja Bannerjee', 'Sanjay Chakraborty', 'Tanmoy Das', 'Mousumi Mukhopadhyay', 'Bikash Chatterjee', 'Sayani Bose', 'Aritra Sen', 'Niladri Roy', 'Paromita Guha', 'Siddharth Mallick', 'Trisha Roy', 'Kaushik Hazra'];
  const sampleCities = ['Barrackpore', 'Shyamnagar', 'Ichapur', 'Naihati', 'Titagarh', 'Kolkata', 'Howrah', 'Hooghly', 'Kanchrapara', 'Sodepur'];
  const sampleDepts = ['Finance', 'Accounts', 'Engineering', 'HR', 'Logistics', 'Procurement', 'Taxation', 'Audit'];

  topicsData.forEach((topic, tIdx) => {
    const richRows = Array.from({ length: 30 }, (_, i) => [
      `${topic.sheetName}-${String(i + 1).padStart(2, '0')}`,
      sampleNames[i % sampleNames.length],
      sampleDepts[i % sampleDepts.length],
      sampleCities[i % sampleCities.length],
      18500 + i * 2450 + (tIdx * 120),
      topic.mask,
      topic.renderedExample,
      'Verified & Audit Passed'
    ]);

    addStyledSheet(
      topic.sheetName,
      'FF0F172A',
      [
        { header: 'Record_ID', key: 'id' },
        { header: 'Candidate / Employee Name', key: 'name' },
        { header: 'Department', key: 'dept' },
        { header: 'Campus Location', key: 'city' },
        { header: 'Raw Numeric Payload', key: 'rawVal' },
        { header: 'Target Custom Format Mask', key: 'mask' },
        { header: 'Rendered Cell Display', key: 'rendered' },
        { header: 'Audit Status', key: 'stat' }
      ],
      richRows
    );
  });

  // Save Workbook Output Files
  const outputPath = path.join(excelFilesDir, '001_005_custom_number_formatting_and_styling_master.xlsx');
  await wb.xlsx.writeFile(outputPath);
  console.log(`✓ Rebuilt 001_005_custom_number_formatting_and_styling_master.xlsx with 16 sequential sheets (Overview + Topic0..Topic14)`);
  fs.copyFileSync(outputPath, path.join(excelFilesDir, 'custom_number_formatting_and_styling_master.xlsx'));
}

buildWorkbook().catch(console.error);
