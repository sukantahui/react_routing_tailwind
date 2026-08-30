const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

const excelBaseDir = 'E:/react_routing_tailwind/src/components/study/excel';
const moduleDir = path.join(excelBaseDir, 'topics/001_002_data-entry-editing-and-formatting');
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
        if (mod.slug === '001_002_data-entry-editing-and-formatting') {
          topicsFromTree = mod.topics || [];
          break;
        }
      }
    }
  } catch (err) {
    console.warn("Could not parse excel-basic-to-advanced.json:", err.message);
  }
}

// 10 Topic Definitions matching JSON topics array
const topicsData = [
  {
    topicId: "Topic0",
    sheetName: "Topic0",
    title: topicsFromTree[0] || "Types of Data in Excel: Text, Numbers, Dates, Times, Booleans and Error Tokens",
    difficulty: "Beginner",
    technique: "Data Token Encodings",
    formula: 'TEXT, NUMBER, DATE, BOOLEAN, #N/A',
    description: "Understanding raw data tokens in Excel memory (Text left-aligned, Numbers right-aligned, Dates as serial integers)."
  },
  {
    topicId: "Topic1",
    sheetName: "Topic1",
    title: topicsFromTree[1] || "Efficient Data Entry Techniques, AutoComplete, Pick from Drop-Down and Keyboard Shortcuts",
    difficulty: "Beginner",
    technique: "AutoComplete & Quick Fill",
    formula: 'Alt + DownArrow, Tab, Enter, Ctrl + Enter',
    description: "Accelerating workplace data entry using built-in AutoComplete, drop-down lists, and multi-cell Ctrl+Enter entry."
  },
  {
    topicId: "Topic2",
    sheetName: "Topic2",
    title: topicsFromTree[2] || "AutoFill Magic, Custom Lists and AI-Powered Flash Fill (Ctrl + E) Pattern Intelligence",
    difficulty: "Beginner",
    technique: "Flash Fill Pattern Matching",
    formula: 'Ctrl + E, AutoFill Series',
    description: "Leveraging pattern recognition to split names, parse phone numbers, and generate sequential custom lists."
  },
  {
    topicId: "Topic3",
    sheetName: "Topic3",
    title: topicsFromTree[3] || "Grid Structure Editing: Inserting, Deleting, Hiding, Grouping and Resizing Rows & Columns",
    difficulty: "Beginner",
    technique: "Grid Structure Operations",
    formula: 'Shift + Space, Ctrl + Space, Alt + A + G',
    description: "Manipulating worksheet layout, inserting/deleting structural rows & columns, and grouping outline levels."
  },
  {
    topicId: "Topic4",
    sheetName: "Topic4",
    title: topicsFromTree[4] || "Editing Cell Contents: F2, Formula Bar, Find & Replace, Clear, Undo/Redo and Paste Special Fundamentals",
    difficulty: "Essential",
    technique: "Cell Editing & Paste Special",
    formula: 'F2, Ctrl+Alt+V, Ctrl+H, Alt+H+E+A',
    description: "Editing cell contents in-cell (F2), formula bar expansion, Find & Replace wildcards, nuclear clear options, and Paste Special values/transpose/operations."
  },
  {
    topicId: "Topic5",
    sheetName: "Topic5",
    title: topicsFromTree[5] || "Date and Time Mechanics: Serial Numbers, Epoch 1900, Elapsed Time and Custom Date Codes",
    difficulty: "Intermediate",
    technique: "Epoch 1900 Date Serials",
    formula: 'DD/MM/YYYY hh:mm:ss, INT(DATE)',
    description: "Understanding Excel date serial numbers (Day 1 = 1 Jan 1900), elapsed hours formatting [h]:mm, and custom date masks."
  },
  {
    topicId: "Topic6",
    sheetName: "Topic6",
    title: topicsFromTree[6] || "Alignment, Text Wrapping, Center Across Selection vs Merge, and Executive Cell Styles",
    difficulty: "Intermediate",
    technique: "Cell Styling & Alignment",
    formula: 'Center Across Selection, Wrap Text',
    description: "Applying executive typography, wrap text, and Center Across Selection to avoid merged cell sort/filter errors."
  },
  {
    topicId: "Topic7",
    sheetName: "Topic7",
    title: topicsFromTree[7] || "Project Work: Real-World Application of Data Entry, Editing & Custom Number Formatting",
    difficulty: "Advanced",
    technique: "Module Capstone Modeling",
    formula: 'FULL DATA ENTRY & FORMATTING STACK',
    description: "Comprehensive practical workplace project incorporating data entry hygiene, cell styling, custom formatting, and grid editing."
  },
  {
    topicId: "Topic8",
    sheetName: "Topic8",
    title: topicsFromTree[8] || "Practice Multiple Choice Questions (MCQ): Data Entry, Editing & Custom Number Formatting Mastery",
    difficulty: "Advanced",
    technique: "MCQ Evaluation Matrix",
    formula: 'THEORETICAL & COMPUTATIONAL EVALUATION',
    description: "Testing candidate mastery across data types, keyboard accelerators, format syntax, and grid operations."
  },
  {
    topicId: "Topic9",
    sheetName: "Topic9",
    title: topicsFromTree[9] || "Quick Check Quiz: Number Formatting, Data Hygiene & Grid Editing Fundamentals",
    difficulty: "Advanced",
    technique: "Final Capstone Assessment",
    formula: 'QUALITATIVE & QUANTITATIVE AUDIT',
    description: "Final evaluation assessment certifying proficiency in Excel data entry, cell formatting, and spreadsheet architecture."
  }
];

const sampleNames = ['Swadeep Hui', 'Tuhina Das', 'Abhronila Ray', 'Susmita Sen', 'Debangshu Roy', 'Rahul Kumar', 'Priya Sharma', 'Aniket Verma', 'Sourav Ganguly', 'Sneha Ghosh', 'Arpan Dey', 'Subhajit Pal', 'Riya Sarkar', 'Dipankar Mitra', 'Barnali Dutta', 'Vikram Singh', 'Kavita Nair', 'Amitabh Basu', 'Pooja Bannerjee', 'Sanjay Chakraborty', 'Tanmoy Das', 'Mousumi Mukhopadhyay', 'Bikash Chatterjee', 'Sayani Bose', 'Aritra Sen', 'Niladri Roy', 'Paromita Guha', 'Siddharth Mallick', 'Trisha Roy', 'Kaushik Hazra'];
const sampleCities = ['Barrackpore', 'Shyamnagar', 'Ichapur', 'Naihati', 'Titagarh', 'Kolkata', 'Howrah', 'Hooghly', 'Kanchrapara', 'Sodepur'];
const sampleDepts = ['Finance', 'Accounts', 'Engineering', 'HR', 'Logistics', 'Procurement', 'Taxation', 'Audit'];

async function buildMasterWorkbook() {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Coder & AccoTax';
  wb.lastModifiedBy = 'Sukanta Hui';
  wb.created = new Date();
  wb.modified = new Date();

  // ---------------------------------------------------------------------------
  // 1. SHEET 1: OVERVIEW (EXECUTIVE LANDING PAGE WITH ZERO-UNDERLAP CLEARANCE)
  // ---------------------------------------------------------------------------
  const wsOverview = wb.addWorksheet('Overview', { views: [{ showGridLines: true }] });
  wsOverview.columns = [
    { width: 18 }, // Col A (Dedicated Logo Column - 135px width)
    { width: 32 }, // Col B (Sheet Name / Topic)
    { width: 34 }, // Col C (Primary Formula / Technique)
    { width: 40 }, // Col D (Business Context / Details)
    { width: 30 }, // Col E (Clickable Quick Jump Action)
    { width: 16 }  // Col F (Status / Level)
  ];

  // 1A. Embed Official CNAT Logo (Inside Column A: 110x110px)
  const logoPath = path.join(excelBaseDir, 'assets/cnat.png');
  if (fs.existsSync(logoPath)) {
    const logoId = wb.addImage({
      filename: logoPath,
      extension: 'png',
    });
    wsOverview.addImage(logoId, {
      tl: { col: 0.08, row: 0.15 },
      ext: { width: 110, height: 110 },
      editAs: 'oneCell'
    });
  }

  // 1B. Top Executive Header Banner (Merged B to F with Indent 2)
  wsOverview.mergeCells('B1:F2');
  const bannerCell = wsOverview.getCell('B1');
  bannerCell.value = 'CODER & ACCOTAX';
  bannerCell.font = { name: 'Segoe UI', size: 18, bold: true, color: { argb: 'FFFFFFFF' } };
  bannerCell.alignment = { vertical: 'middle', horizontal: 'left', indent: 2 };
  bannerCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } };

  wsOverview.mergeCells('B3:F3');
  const subBanner = wsOverview.getCell('B3');
  subBanner.value = 'ISO 9001:2015 Certified Centre of Excellence in Computer Science & Financial Modeling';
  subBanner.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FF38BDF8' } };
  subBanner.alignment = { vertical: 'middle', horizontal: 'left', indent: 2 };
  subBanner.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E293B' } };

  wsOverview.mergeCells('B4:F4');
  const metaBanner = wsOverview.getCell('B4');
  const expYears = new Date().getFullYear() - 1998;
  metaBanner.value = `Module 2: Data Entry, Editing & Formatting · Mentored by Sukanta Hui (${expYears}+ Years Exp.) · Barrackpore`;
  metaBanner.font = { name: 'Segoe UI', size: 9, italic: true, color: { argb: 'FFF59E0B' } };
  metaBanner.alignment = { vertical: 'middle', horizontal: 'left', indent: 2 };
  metaBanner.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E293B' } };

  wsOverview.getRow(1).height = 24;
  wsOverview.getRow(2).height = 24;
  wsOverview.getRow(3).height = 20;
  wsOverview.getRow(4).height = 20;
  wsOverview.getRow(5).height = 12; // Gap row

  // 1C. Embed Executive Landing Hero Graphic (Native 1536x1024 -> 3:2 Ratio: 600x400px)
  const landingImgPath = path.join(excelBaseDir, 'assets/landing_sheet.jpg');
  if (fs.existsSync(landingImgPath)) {
    const landingImgId = wb.addImage({
      filename: landingImgPath,
      extension: 'jpeg',
    });
    wsOverview.addImage(landingImgId, {
      tl: { col: 0.15, row: 5.2 },
      ext: { width: 600, height: 400 }, // Exact 1.5 aspect ratio (3:2) preserved
      editAs: 'oneCell'
    });
  }

  // Reserve rows 6 to 25 (20 rows * 20px = 400px height)
  for (let r = 6; r <= 25; r++) {
    wsOverview.getRow(r).height = 20;
  }
  wsOverview.getRow(26).height = 12; // Gap row before Section 1

  let curRow = 27;

  // Helper for Section Headers
  function addSectionHeader(title, hexColor) {
    wsOverview.mergeCells(`A${curRow}:F${curRow}`);
    const cell = wsOverview.getCell(`A${curRow}`);
    cell.value = title;
    cell.font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: hexColor } };
    cell.alignment = { vertical: 'middle', indent: 1 };
    wsOverview.getRow(curRow).height = 24;
    curRow++;
  }

  // Helper for Two-Column Info Rows
  function addInfoRow(label, val) {
    const r = wsOverview.getRow(curRow);
    r.height = 19;
    wsOverview.mergeCells(`A${curRow}:B${curRow}`);
    const c1 = wsOverview.getCell(`A${curRow}`);
    c1.value = label;
    c1.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FF1E293B' } };
    c1.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF1F5F9' } };
    c1.alignment = { vertical: 'middle', indent: 1 };

    wsOverview.mergeCells(`C${curRow}:F${curRow}`);
    const c2 = wsOverview.getCell(`C${curRow}`);
    c2.value = val;
    c2.font = { name: 'Segoe UI', size: 9.5, color: { argb: 'FF334155' } };
    c2.alignment = { vertical: 'middle', indent: 1 };
    curRow++;
  }

  // Section 1: Organisation Profile
  addSectionHeader('🏢 1. ORGANISATION PROFILE & CONTACT DETAILS', 'FF0284C7');
  addInfoRow('Institute Name', 'Coder & AccoTax (Centre of Excellence)');
  addInfoRow('Campus Address', '25(10/A) Shibtala Road, Nona Chandan Pukur, Barrackpore, Kolkata 700122, WB, India');
  addInfoRow('Contact Numbers', '+91 70037 56860 / +91 84202 04207 (WhatsApp Available)');
  addInfoRow('Official Email', 'sukantahui@codernaccotax.co.in | info@codernaccotax.co.in');
  addInfoRow('Web Portal', 'https://www.codernaccotax.co.in');
  addInfoRow('Core Specializations', 'Full Stack Software Engineering, Python & Data Science, Advanced Excel, Power BI, Financial Modeling & Taxation');
  curRow++;

  // Section 2: Master Mentor Profile
  addSectionHeader('👨‍🏫 2. LEAD INSTRUCTOR & MASTER MENTOR PROFILE', 'FF059669');
  addInfoRow('Lead Instructor', 'Sukanta Hui');
  addInfoRow('Designation', 'Senior Software Architect, Corporate Financial Consultant & Lead Academic Mentor');
  addInfoRow('Experience', `${expYears}+ Years of Industrial & Academic Mentoring Experience (Since May 1998)`);
  addInfoRow('GitHub Portfolio', 'https://github.com/sukantahui');
  addInfoRow('Teaching Philosophy', 'Bridging industrial standards with practical, hands-on, modern spreadsheet architecture.');
  curRow++;

  // Section 3: Chapter Academic Metrics
  addSectionHeader('🎓 3. CHAPTER ACADEMIC & MODULE SPECIFICATIONS', 'FF7C3AED');
  addInfoRow('Course Code & Title', 'EXCEL-PRO-901: Microsoft Excel From Zero to Ultra Expert');
  addInfoRow('Active Module Slug', '001_002_data-entry-editing-and-formatting');
  addInfoRow('Bloom\'s Taxonomy', 'Level 4 (Analyze), Level 5 (Evaluate) & Level 6 (Create)');
  curRow++;

  // Section 4: Interactive Sheet Navigation Directory (Click-to-Jump Table)
  addSectionHeader('📑 4. WORKBOOK SHEET DIRECTORY & QUICK-JUMP NAVIGATION', 'FFD97706');

  // Directory Table Headers
  const tableHeaderRow = wsOverview.getRow(curRow);
  tableHeaderRow.height = 22;
  const headers = ['SL #', 'Target Sheet / Topic', 'Primary Technique / Formula', 'Business Context / Dataset', '🚀 Instant Jump Action', 'Status'];
  const colLetters = ['A', 'B', 'C', 'D', 'E', 'F'];
  headers.forEach((h, idx) => {
    const c = wsOverview.getCell(`${colLetters[idx]}${curRow}`);
    c.value = h;
    c.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FFFFFFFF' } };
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF334155' } };
    c.alignment = { vertical: 'middle', horizontal: idx === 0 || idx === 5 ? 'center' : 'left', indent: idx === 0 || idx === 5 ? 0 : 1 };
  });
  curRow++;

  // Populate Interactive Directory with Clickable Excel Hyperlinks
  topicsData.forEach((t, idx) => {
    const r = wsOverview.getRow(curRow);
    r.height = 20;
    const isEven = idx % 2 === 0;
    const rowBg = isEven ? 'FFFFFFFF' : 'FFF8FAFC';

    // SL
    const c1 = wsOverview.getCell(`A${curRow}`);
    c1.value = idx + 1;
    c1.alignment = { vertical: 'middle', horizontal: 'center' };

    // Sheet Name / Topic Title
    const c2 = wsOverview.getCell(`B${curRow}`);
    c2.value = `${t.sheetName}: ${t.title}`;
    c2.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FF0F172A' } };
    c2.alignment = { vertical: 'middle', indent: 1 };

    // Formula / Technique
    const c3 = wsOverview.getCell(`C${curRow}`);
    c3.value = t.formula;
    c3.font = { name: 'Consolas', size: 9, color: { argb: 'FF0284C7' } };
    c3.alignment = { vertical: 'middle', indent: 1 };

    // Context / Description
    const c4 = wsOverview.getCell(`D${curRow}`);
    c4.value = t.description;
    c4.font = { name: 'Segoe UI', size: 9, color: { argb: 'FF475569' } };
    c4.alignment = { vertical: 'middle', indent: 1 };

    // CLICKABLE HYPERLINK: Jumps straight to the specific sheet!
    const c5 = wsOverview.getCell(`E${curRow}`);
    c5.value = {
      text: `👉 Open ${t.sheetName} Sheet`,
      hyperlink: `#'${t.sheetName}'!A1`,
      tooltip: `Click to navigate to ${t.sheetName}`
    };
    c5.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FF0284C7' }, underline: true };
    c5.alignment = { vertical: 'middle', indent: 1 };

    // Status / Difficulty
    const c6 = wsOverview.getCell(`F${curRow}`);
    c6.value = t.difficulty;
    c6.font = { name: 'Segoe UI', size: 8.5, bold: true, color: { argb: 'FF059669' } };
    c6.alignment = { vertical: 'middle', horizontal: 'center' };

    // Apply borders and alternating background
    colLetters.forEach((col) => {
      const cell = wsOverview.getCell(`${col}${curRow}`);
      if (cell !== c5) {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: rowBg } };
      } else {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: isEven ? 'FFF0F9FF' : 'FFE0F2FE' } };
      }
      cell.border = {
        top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        right: { style: 'thin', color: { argb: 'FFE2E8F0' } }
      };
    });

    curRow++;
  });

  // Lock all cells on wsOverview
  wsOverview.eachRow((row) => {
    row.eachCell((cell) => {
      cell.protection = { locked: true };
    });
  });

  // Protect Overview Landing Sheet (Password: 'sukantahui')
  await wsOverview.protect('sukantahui', {
    selectLockedCells: true,
    selectUnlockedCells: true,
    formatCells: false,
    formatColumns: false,
    formatRows: false,
    insertColumns: false,
    insertRows: false,
    insertHyperlinks: false,
    deleteColumns: false,
    deleteRows: false,
    sort: false,
    autoFilter: false,
    pivotTables: false,
    objects: false,
    scenarios: false
  });

  // ---------------------------------------------------------------------------
  // 2. CHILD TOPIC SHEETS (Topic0 to Topic9 - UNLOCKED FOR STUDENT PRACTICE)
  // ---------------------------------------------------------------------------
  topicsData.forEach((t, tIdx) => {
    const ws = wb.addWorksheet(t.sheetName, { views: [{ showGridLines: true }] });

    // Row 1: Return Navigation Link to Overview
    ws.mergeCells('A1:C1');
    const returnLink = ws.getCell('A1');
    returnLink.value = {
      text: '🏠 Jump to Executive Overview Landing Sheet',
      hyperlink: `#'Overview'!A1`,
      tooltip: 'Return to Executive Overview'
    };
    returnLink.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FF0284C7' }, underline: true };
    returnLink.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
    ws.getRow(1).height = 24;

    // Define 30 Rich Rows of Realistic Bengal Corporate Data
    const dataRows = Array.from({ length: 30 }, (_, i) => {
      const recId = `${t.sheetName}-${101 + i}`;
      const name = sampleNames[i % sampleNames.length];
      const dept = sampleDepts[i % sampleDepts.length];
      const city = sampleCities[i % sampleCities.length];
      const baseVal = 18500 + i * 2450 + (tIdx * 120);
      const formattedVal = `₹ ${baseVal.toLocaleString('en-IN')}.00`;
      const dateSerial = new Date(2026, 0, 1 + i);
      const auditStatus = (i % 3 === 0) ? 'Verified & Audited' : (i % 3 === 1 ? 'Approved' : 'Pending Review');

      return [
        recId,
        name,
        dept,
        city,
        baseVal,
        formattedVal,
        dateSerial,
        t.technique,
        auditStatus
      ];
    });

    const columns = [
      { header: 'Record_ID', key: 'id' },
      { header: 'Candidate / Employee Name', key: 'name' },
      { header: 'Department', key: 'dept' },
      { header: 'Campus Location', key: 'city' },
      { header: 'Raw Value (₹)', key: 'raw' },
      { header: 'Formatted Display', key: 'fmt' },
      { header: 'Entry Date', key: 'date' },
      { header: 'Applied Technique', key: 'tech' },
      { header: 'Audit Status', key: 'stat' }
    ];

    // Row 3: Header Row
    const headerRow = ws.getRow(3);
    headerRow.height = 28;
    columns.forEach((c, cIdx) => {
      const colLetter = String.fromCharCode(65 + cIdx);
      const cell = ws.getCell(`${colLetter}3`);
      cell.value = c.header;
      cell.font = { name: 'Segoe UI', size: 10.5, bold: true, color: { argb: 'FFFFFFFF' } };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
      cell.border = {
        top: { style: 'medium', color: { argb: 'FF0F172A' } },
        bottom: { style: 'medium', color: { argb: 'FF0F172A' } },
        left: { style: 'thin', color: { argb: 'FF334155' } },
        right: { style: 'thin', color: { argb: 'FF334155' } }
      };
    });

    // Populate Rows
    dataRows.forEach((row, rIdx) => {
      const rowNum = rIdx + 4;
      const r = ws.getRow(rowNum);
      r.height = 22;
      const isEven = rIdx % 2 === 0;

      row.forEach((val, cIdx) => {
        const colLetter = String.fromCharCode(65 + cIdx);
        const cell = ws.getCell(`${colLetter}${rowNum}`);
        cell.value = val;
        cell.font = { name: 'Segoe UI', size: 9.5, color: { argb: 'FF0F172A' } };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: isEven ? 'FFFFFFFF' : 'FFF8FAFC' } };
        cell.alignment = { vertical: 'middle', horizontal: typeof val === 'number' ? 'right' : 'left', indent: typeof val === 'number' ? 0 : 1 };
        
        if (cIdx === 4) {
          cell.numFmt = '₹ #,##,##0.00';
        } else if (cIdx === 6) {
          cell.numFmt = 'DD/MM/YYYY';
        }

        cell.border = {
          top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
          bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
          left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
          right: { style: 'thin', color: { argb: 'FFE2E8F0' } }
        };
      });
    });

    // Auto-fit Column Widths with generous padding
    columns.forEach((col, cIdx) => {
      let maxLen = col.header.length;
      dataRows.forEach(r => {
        if (r[cIdx] !== null && r[cIdx] !== undefined) {
          const s = r[cIdx].toString();
          if (s.length > maxLen) maxLen = s.length;
        }
      });
      const colLetter = String.fromCharCode(65 + cIdx);
      ws.getColumn(colLetter).width = Math.max(maxLen + 6, 22);
    });
  });

  const outputPath = path.join(excelFilesDir, '001_002_data_entry_editing_and_formatting_master.xlsx');
  await wb.xlsx.writeFile(outputPath);
  console.log(`✓ Master workbook successfully generated at: ${outputPath}`);

  // Create copies for backward compatibility
  fs.copyFileSync(outputPath, path.join(excelFilesDir, 'data_entry_formatting.xlsx'));
  console.log(`✓ Copied master workbook to data_entry_formatting.xlsx`);
}

buildMasterWorkbook().catch((err) => {
  console.error("Failed to build master workbook:", err);
  process.exit(1);
});
