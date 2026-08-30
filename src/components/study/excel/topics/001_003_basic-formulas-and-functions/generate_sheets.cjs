const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

const excelBaseDir = 'E:/react_routing_tailwind/src/components/study/excel';
const moduleDir = path.join(excelBaseDir, 'topics/001_003_basic-formulas-and-functions');
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
        if (mod.slug === '001_003_basic-formulas-and-functions') {
          topicsFromTree = mod.topics || [];
          break;
        }
      }
    }
  } catch (err) {
    console.warn("Could not parse excel-basic-to-advanced.json:", err.message);
  }
}

// Complete 10 Topic Definitions matching JSON topics array for module 001_003
const topicsData = [
  {
    topicId: "Topic0",
    sheetName: "Topic0",
    title: topicsFromTree[0] || "Anatomy of a Formula: Equal Sign (=), Operators, Operands and BODMAS Order of Precedence",
    difficulty: "Beginner",
    mask: "=B4+C4*(D4-E4)",
    rawExample: "1250.00",
    renderedExample: "₹ 1,250.00",
    description: "Structure fundamental formula components, parenthesis grouping, and strict mathematical operator hierarchy."
  },
  {
    topicId: "Topic1",
    sheetName: "Topic1",
    title: topicsFromTree[1] || "Core Arithmetic Operations: Addition (+), Subtraction (-), Multiplication (*), Division (/) and Powers (^)",
    difficulty: "Beginner",
    mask: "=B4*C4-(D4/E4)",
    rawExample: "8540.50",
    renderedExample: "₹ 8,540.50",
    description: "Executing fundamental arithmetic calculations across multi-column financial ledgers."
  },
  {
    topicId: "Topic2",
    sheetName: "Topic2",
    title: topicsFromTree[2] || "Foundational Aggregation Functions: SUM, AVERAGE, COUNT, COUNTA and COUNTBLANK Mechanics",
    difficulty: "Beginner",
    mask: "=SUM(E4:E33) | =AVERAGE(E4:E33)",
    rawExample: "458900.00",
    renderedExample: "₹ 4,58,900.00",
    description: "Building primary summary statistical aggregations and distinguishing numeric COUNT vs text COUNTA."
  },
  {
    topicId: "Topic3",
    sheetName: "Topic3",
    title: topicsFromTree[3] || "Extreme Value and Positional Ranking Functions: MIN, MAX, LARGE and SMALL Analysis",
    difficulty: "Intermediate",
    mask: "=MIN(E4:E33) | =MAX(E4:E33) | =LARGE(E4:E33, 2)",
    rawExample: "98500.00",
    renderedExample: "₹ 98,500.00",
    description: "Extracting corporate high/low bounds and kth positional rank values for executive scorecards."
  },
  {
    topicId: "Topic4",
    sheetName: "Topic4",
    title: topicsFromTree[4] || "Mathematical Rounding Functions: ROUND, ROUNDUP, ROUNDDOWN, INT and TRUNC Precision Control",
    difficulty: "Intermediate",
    mask: "=ROUND(E4, 2) | =INT(E4) | =TRUNC(E4, 1)",
    rawExample: "14589.8765",
    renderedExample: "14589.88",
    description: "Controlling floating-point decimal precision for audit-compliant corporate billing calculations."
  },
  {
    topicId: "Topic5",
    sheetName: "Topic5",
    title: topicsFromTree[5] || "High-Speed AutoSum Mastery: Multi-Directional Summing and Keyboard Shortcuts",
    difficulty: "Beginner",
    mask: "Alt + = (AutoSum)",
    rawExample: "65000.00",
    renderedExample: "₹ 65,000.00",
    description: "Accelerating financial model construction with multi-range vertical and horizontal AutoSum shortcuts."
  },
  {
    topicId: "Topic6",
    sheetName: "Topic6",
    title: topicsFromTree[6] || "Comprehensive Laboratory Practice Session: Basic Formulas, Functions and Calculation Auditing",
    difficulty: "Intermediate",
    mask: "=SUMPRODUCT(C4:C33, D4:D33)",
    rawExample: "1245000.00",
    renderedExample: "₹ 12,45,000.00",
    description: "Comprehensive practical auditing and error troubleshooting for corporate calculation workbooks."
  },
  {
    topicId: "Topic7",
    sheetName: "Topic7",
    title: topicsFromTree[7] || "Project Work: Real-World Application of Basic Formulas and Functions",
    difficulty: "Advanced",
    mask: "EX401-EX425 Master Modeling Practice",
    rawExample: "2450000.00",
    renderedExample: "₹ 24,50,000.00",
    description: "Capstoning basic formulas mastery with 25 workplace modeling projects in the master workbook."
  },
  {
    topicId: "Topic8",
    sheetName: "Topic8",
    title: topicsFromTree[8] || "Quick Check Quiz: Core Mathematical Functions, BODMAS & Aggregation Foundations",
    difficulty: "Intermediate",
    mask: "=COUNTBLANK(E4:E33)",
    rawExample: "0",
    renderedExample: "0 Missing Records",
    description: "Verifying theoretical concepts, BODMAS evaluation order, and formula error code troubleshooting."
  },
  {
    topicId: "Topic9",
    sheetName: "Topic9",
    title: topicsFromTree[9] || "Engineering Conversions & Bitwise Operations",
    difficulty: "Advanced",
    mask: "=CONVERT(E4, \"C\", \"F\") | =BITAND(E4, F4)",
    rawExample: "100.0",
    renderedExample: "212.00 °F",
    description: "Executing technical engineering unit transformations and low-level bitwise binary operations."
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
  bSub2.value = `Module 3: 001_003_basic-formulas-and-functions\nCurriculum Track: EXCEL-PRO-901 | Master Student Practice Workbook (10 Sequential Topics)`;
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

  // Section 2 Header: Navigation Directory (Topics Sequence: Topic0 to Topic9)
  wsOverview.mergeCells('A34:F34');
  const s4Header = wsOverview.getCell('A34');
  s4Header.value = '📑 2. WORKBOOK TOPICS DIRECTORY & CLICK-TO-JUMP NAVIGATION TABLE';
  s4Header.font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: 'FFFFFFFF' } };
  s4Header.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD97706' } };

  const directoryHeaders = ['Sheet ID (Click to Jump)', 'Curriculum Topic Title', 'Difficulty Level', 'Target Formula / Mask', 'Status'];
  const headerRow = wsOverview.getRow(35);
  headerRow.height = 26;
  directoryHeaders.forEach((h, cIdx) => {
    const cell = headerRow.getCell(cIdx + 1);
    cell.value = h;
    cell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E293B' } };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
  });

  // Render Directory Rows for Topic0 through Topic9
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
  // 2. CREATE TOPIC WORKSHEETS IN SEQUENTIAL ORDER (Topic0 to Topic9)
  // =========================================================================
  const sampleNames = ['Swadeep Hui', 'Tuhina Das', 'Abhronila Ray', 'Susmita Sen', 'Debangshu Roy', 'Rahul Kumar', 'Priya Sharma', 'Aniket Verma', 'Sourav Ganguly', 'Sneha Ghosh', 'Arpan Dey', 'Subhajit Pal', 'Riya Sarkar', 'Dipankar Mitra', 'Barnali Dutta', 'Vikram Singh', 'Kavita Nair', 'Amitabh Basu', 'Pooja Bannerjee', 'Sanjay Chakraborty', 'Tanmoy Das', 'Mousumi Mukhopadhyay', 'Bikash Chatterjee', 'Sayani Bose', 'Aritra Sen', 'Niladri Roy', 'Paromita Guha', 'Siddharth Mallick', 'Trisha Roy', 'Kaushik Hazra'];
  const sampleCities = ['Barrackpore', 'Shyamnagar', 'Ichapur', 'Naihati', 'Titagarh', 'Kolkata', 'Howrah', 'Hooghly', 'Kanchrapara', 'Sodepur'];
  const sampleDepts = ['Finance', 'Accounts', 'Engineering', 'HR', 'Logistics', 'Procurement', 'Taxation', 'Audit'];

  // Topic 9 Engineering Telemetry Sample Data (30 Scenarios)
  const engineeringScenarios = [
    { sensor: 'HVAC Steam Boiler Temp', cat: 'Thermodynamics', raw: 100.0, mask: '"F"', formula: '=CONVERT(E4, "C", "F")', out: '212.00 °F' },
    { sensor: 'Thermodynamic Chamber', cat: 'Thermodynamics', raw: 25.0, mask: '"K"', formula: '=CONVERT(E5, "C", "K")', out: '298.15 K' },
    { sensor: 'Bridge Structural Load', cat: 'Structural Mechanics', raw: 100.0, mask: '"N"', formula: '=CONVERT(E6, "lbf", "N")', out: '444.82 N' },
    { sensor: 'Freight Transit Distance', cat: 'Logistics', raw: 100.0, mask: '"mi"', formula: '=CONVERT(E7, "km", "mi")', out: '62.14 mi' },
    { sensor: 'Hydraulic Pump Pressure', cat: 'Fluid Dynamics', raw: 1.0, mask: '"psi"', formula: '=CONVERT(E8, "atm", "psi")', out: '14.70 psi' },
    { sensor: 'SCADA Auth Bitmask', cat: 'SCADA Security', raw: 13, mask: '4', formula: '=BITAND(E9, 4)', out: '4 (Execute Active)' },
    { sensor: 'IoT Thermal Trip Byte', cat: 'IoT Telemetry', raw: 36, mask: '32', formula: '=IF(BITAND(E10, 32)=32, "ALERT", "NORMAL")', out: 'ALERT' },
    { sensor: 'Role Permission Assembler', cat: 'Bitwise Logic', raw: 1, mask: 'BITOR', formula: '=BITOR(E11, 4)', out: '5 (Read + Exec)' },
    { sensor: 'Telemetry Register Delta', cat: 'Signal Processing', raw: 12, mask: 'BITXOR', formula: '=BITXOR(E12, 10)', out: '6 (Delta Bit)' },
    { sensor: 'Microcontroller Sensor Payload', cat: 'Hardware Telemetry', raw: '00001101', mask: 'DEC', formula: '=BIN2DEC("00001101")', out: '13' },
    { sensor: 'Turbine Exhaust Heat', cat: 'Thermodynamics', raw: 450.0, mask: '"F"', formula: '=CONVERT(E14, "C", "F")', out: '842.00 °F' },
    { sensor: 'Cryogenic Liquid Nitrogen', cat: 'Thermodynamics', raw: -196.0, mask: '"K"', formula: '=CONVERT(E15, "C", "K")', out: '77.15 K' },
    { sensor: 'Steel Cable Tensile Strength', cat: 'Structural Mechanics', raw: 500.0, mask: '"N"', formula: '=CONVERT(E16, "lbf", "N")', out: '2224.11 N' },
    { sensor: 'Maritime Vessel Speed', cat: 'Logistics', raw: 25.0, mask: '"km/h"', formula: '=CONVERT(E17, "mph", "km/h")', out: '40.23 km/h' },
    { sensor: 'Subsea Gas Pipeline Pressure', cat: 'Fluid Dynamics', raw: 5.0, mask: '"psi"', formula: '=CONVERT(E18, "atm", "psi")', out: '73.48 psi' },
    { sensor: 'PLC Control Word Bit 0', cat: 'SCADA Security', raw: 15, mask: '1', formula: '=BITAND(E19, 1)', out: '1 (Read Active)' },
    { sensor: 'High Voltage Breaker Alarm', cat: 'IoT Telemetry', raw: 64, mask: '64', formula: '=IF(BITAND(E20, 64)=64, "TRIPPED", "OK")', out: 'TRIPPED' },
    { sensor: 'Admin Privilege Aggregation', cat: 'Bitwise Logic', raw: 7, mask: 'BITOR', formula: '=BITOR(E21, 8)', out: '15 (Full Admin)' },
    { sensor: 'Modbus Holding Register Shift', cat: 'Signal Processing', raw: 16, mask: 'BITLSHIFT', formula: '=BITLSHIFT(E22, 2)', out: '64' },
    { sensor: 'Hexadecimal Sensor Address', cat: 'Hardware Telemetry', raw: '2F', mask: 'DEC', formula: '=HEX2DEC("2F")', out: '47' },
    { sensor: 'Solar Array Temperature', cat: 'Thermodynamics', raw: 65.0, mask: '"F"', formula: '=CONVERT(E24, "C", "F")', out: '149.00 °F' },
    { sensor: 'Superconducting Magnet', cat: 'Thermodynamics', raw: 4.2, mask: '"C"', formula: '=CONVERT(E25, "K", "C")', out: '-268.95 °C' },
    { sensor: 'Crane Lift Hook Capacity', cat: 'Structural Mechanics', raw: 2000.0, mask: '"N"', formula: '=CONVERT(E26, "lbf", "N")', out: '8896.44 N' },
    { sensor: 'Highway Express Corridor', cat: 'Logistics', raw: 120.0, mask: '"mi"', formula: '=CONVERT(E27, "km", "mi")', out: '74.56 mi' },
    { sensor: 'Compressed Air Tank', cat: 'Fluid Dynamics', raw: 8.5, mask: '"psi"', formula: '=CONVERT(E28, "atm", "psi")', out: '124.92 psi' },
    { sensor: 'Database Access Control List', cat: 'SCADA Security', raw: 31, mask: '16', formula: '=BITAND(E29, 16)', out: '16 (Delete Active)' },
    { sensor: 'Coolant Flow Valve Status', cat: 'IoT Telemetry', raw: 128, mask: '128', formula: '=IF(BITAND(E30, 128)=128, "OPEN", "CLOSED")', out: 'OPEN' },
    { sensor: 'Security Group Mask', cat: 'Bitwise Logic', raw: 3, mask: 'BITOR', formula: '=BITOR(E31, 12)', out: '15' },
    { sensor: 'Bitwise Right Shift Mask', cat: 'Signal Processing', raw: 64, mask: 'BITRSHIFT', formula: '=BITRSHIFT(E32, 2)', out: '16' },
    { sensor: 'Octal Register Input Payload', cat: 'Hardware Telemetry', raw: '77', mask: 'DEC', formula: '=OCT2DEC("77")', out: '63' }
  ];

  topicsData.forEach((topic, tIdx) => {
    let richRows;
    let colSpecs;

    if (topic.sheetName === 'Topic9') {
      colSpecs = [
        { header: 'Record_ID', key: 'id' },
        { header: 'Telemetry / Sensor System', key: 'name' },
        { header: 'Engineering Category', key: 'dept' },
        { header: 'Raw Input Payload', key: 'rawVal' },
        { header: 'Target Unit / Bitmask', key: 'maskVal' },
        { header: 'Applied Excel Formula', key: 'mask' },
        { header: 'Evaluated Output', key: 'rendered' },
        { header: 'Audit Status', key: 'stat' }
      ];
      richRows = engineeringScenarios.map((sc, i) => [
        `ENG-${101 + i}`,
        sc.sensor,
        sc.cat,
        sc.raw,
        sc.mask,
        sc.formula,
        sc.out,
        'Verified & Audit Passed'
      ]);
    } else {
      colSpecs = [
        { header: 'Record_ID', key: 'id' },
        { header: 'Candidate / Employee Name', key: 'name' },
        { header: 'Department', key: 'dept' },
        { header: 'Campus Location', key: 'city' },
        { header: 'Raw Numeric Payload', key: 'rawVal' },
        { header: 'Target Formula / Mask', key: 'mask' },
        { header: 'Rendered Cell Display', key: 'rendered' },
        { header: 'Audit Status', key: 'stat' }
      ];
      richRows = Array.from({ length: 30 }, (_, i) => [
        `${topic.sheetName}-${String(i + 1).padStart(2, '0')}`,
        sampleNames[i % sampleNames.length],
        sampleDepts[i % sampleDepts.length],
        sampleCities[i % sampleCities.length],
        15000 + i * 3250 + (tIdx * 150),
        topic.mask,
        topic.renderedExample,
        'Verified & Audit Passed'
      ]);
    }

    addStyledSheet(
      topic.sheetName,
      'FF0F172A',
      colSpecs,
      richRows
    );
  });

  // Save Workbook Output Files
  const outputPath = path.join(excelFilesDir, '001_003_basic_formulas_and_functions_master.xlsx');
  await wb.xlsx.writeFile(outputPath);
  console.log(`✓ Rebuilt 001_003_basic_formulas_and_functions_master.xlsx with 11 sequential sheets (Overview + Topic0..Topic9)`);
  
  // Also save copies to ensure compatibility across all import paths
  fs.copyFileSync(outputPath, path.join(excelFilesDir, 'basic_formulas_and_functions_master.xlsx'));
  fs.copyFileSync(outputPath, path.join(excelFilesDir, 'basic_formulas.xlsx'));
}

buildWorkbook().catch(console.error);
