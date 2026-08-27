const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

const moduleDir = __dirname;
const excelFilesDir = path.join(moduleDir, 'excel_files');
if (!fs.existsSync(excelFilesDir)) fs.mkdirSync(excelFilesDir, { recursive: true });

async function buildWorkbook002_002() {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Coder & AccoTax';
  wb.lastModifiedBy = 'Sukanta Hui';
  wb.created = new Date();
  wb.modified = new Date();

  // Overview Sheet
  const wsOverview = wb.addWorksheet('Overview', { views: [{ showGridLines: true }] });
  wsOverview.columns = [{ width: 22 }, { width: 26 }, { width: 28 }, { width: 32 }, { width: 26 }, { width: 36 }];

  const logoPath = path.resolve(__dirname, '../../assets/cnat.png');
  if (fs.existsSync(logoPath)) {
    const logoId = wb.addImage({ filename: logoPath, extension: 'png' });
    wsOverview.addImage(logoId, { tl: { col: 0.3, row: 0.3 }, ext: { width: 120, height: 120 }, editAs: 'oneCell' });
  }

  // Header Banner
  wsOverview.mergeCells('C1:F2');
  const bTitle = wsOverview.getCell('C1');
  bTitle.value = 'CODER & ACCOTAX';
  bTitle.font = { name: 'Segoe UI', size: 20, bold: true, color: { argb: 'FFFFFFFF' } };
  bTitle.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
  bTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } };

  wsOverview.mergeCells('C3:F3');
  const bSub1 = wsOverview.getCell('C3');
  bSub1.value = 'ISO 9001:2015 Certified Centre of Excellence for Coding, Taxation & Advanced Data Analytics';
  bSub1.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FF38BDF8' } };
  bSub1.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
  bSub1.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } };

  wsOverview.mergeCells('C4:F5');
  const bSub2 = wsOverview.getCell('C4');
  bSub2.value = 'EXCEL MASTERCLASS: Module 2.2 - Text, Date and Time Functions: Data Cleaning, Parsing & Temporal Calculations\nCurriculum Code: EXCEL-PRO-901 | Student Practice & Laboratory Workbook';
  bSub2.font = { name: 'Segoe UI', size: 9, color: { argb: 'FFFBBF24' } };
  bSub2.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true, indent: 1 };
  bSub2.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } };

  // Profile Section
  wsOverview.mergeCells('A7:F7');
  const s1Header = wsOverview.getCell('A7');
  s1Header.value = '🏢 1. ORGANISATION PROFILE & CONTACT DETAILS';
  s1Header.font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: 'FFFFFFFF' } };
  s1Header.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0284C7' } };

  const s1Data = [
    ['Institute Name', 'Coder & AccoTax', 'Accreditation', 'ISO 9001:2015 Certified Training Centre'],
    ['Campus Address', '25(10/A) Shibtala Road, Nona Chandan Pukur, Barrackpore, Kolkata 700122, WB, India', '', ''],
    ['Phone / WhatsApp', '+91 70037 56860', 'Official Email', 'sukantahui@codernaccotax.co.in | info@codernaccotax.co.in'],
    ['Web Portal', 'https://codernaccotax.co.in', 'Core Specializations', 'Full Stack Engineering, Python, Advanced Excel, Power BI, Tally Prime, GST & Financial Modeling'],
  ];
  s1Data.forEach((row, idx) => {
    const rowNum = 8 + idx;
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

  // Lead Instructor Profile
  wsOverview.mergeCells('A13:F13');
  const s2Header = wsOverview.getCell('A13');
  s2Header.value = '👨‍🏫 2. LEAD INSTRUCTOR & MASTER MENTOR PROFILE';
  s2Header.font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: 'FFFFFFFF' } };
  s2Header.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF059669' } };

  const s2Data = [
    ['Lead Instructor', 'Sukanta Hui', 'Designation', 'Senior Software Engineer, Corporate Financial Consultant & Mentor'],
    ['Industry Experience', '27+ Years of Experience in Building Scalable Software & Mentoring (Since May 1998)', '', ''],
    ['GitHub Portfolio', 'https://github.com/sukantahui', 'Technical Arsenal', 'Python, Advanced Excel, Power BI, SQL, Financial Modeling, React, Angular, C, C++, Java'],
    ['Teaching Philosophy', 'Bridging rigorous industrial standard practices with practical, hands-on, zero-VBA modern spreadsheet architecture.', '', '']
  ];
  s2Data.forEach((row, idx) => {
    const rowNum = 14 + idx;
    if (idx === 1 || idx === 3) {
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

  // Course Metrics
  wsOverview.mergeCells('A19:F19');
  const s3Header = wsOverview.getCell('A19');
  s3Header.value = '🎓 3. COURSE & MODULE ACADEMIC METRICS';
  s3Header.font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: 'FFFFFFFF' } };
  s3Header.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF7C3AED' } };

  const s3Data = [
    ['Curriculum Track', 'EXCEL-PRO-901: Microsoft Excel From Zero to Ultra Expert', 'Module Reference', '002_002_text-date-and-time-functions'],
    ['Competency Level', 'CO2: Advanced String Engineering & Temporal Analytics', 'Total Topics', '14 Comprehensive Topics & 420 FAQ Questions'],
  ];
  s3Data.forEach((row, idx) => {
    const rowNum = 20 + idx;
    wsOverview.getCell(`A${rowNum}`).value = row[0];
    wsOverview.getCell(`B${rowNum}`).value = row[1];
    wsOverview.getCell(`C${rowNum}`).value = row[2];
    wsOverview.getCell(`D${rowNum}`).value = row[3];
  });

  // Directory Section
  wsOverview.mergeCells('A23:F23');
  const s4Header = wsOverview.getCell('A23');
  s4Header.value = '📑 4. WORKBOOK SHEET DIRECTORY & LAB NAVIGATION';
  s4Header.font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: 'FFFFFFFF' } };
  s4Header.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD97706' } };

  const directoryRows = [
    ['Sheet Name', 'Target Topic', 'Primary Concept / Technique', 'Dataset Context', 'Rows', 'Practice Objective'],
    ['Topic0_Case_Standardize', 'Topic 0: Case Standardization', 'UPPER, LOWER, PROPER functions', 'Barrackpore Client Master Names', '40', 'Standardize case inconsistencies in names'],
    ['Topic1_String_Extraction', 'Topic 1: String Parsing', 'LEFT, RIGHT, MID extraction', 'Kolkata Enterprise Invoice Codes', '45', 'Parse prefixes, suffixes and middle codes'],
    ['Topic2_String_Search', 'Topic 2: String Search', 'FIND vs SEARCH (Wildcards & Case)', 'Shyamnagar Employee Audit Ledger', '40', 'Locate character positions inside strings'],
    ['Topic3_Spaces_Clean', 'Topic 3: Spaces & Clean', 'LEN, TRIM & CHAR(160) Non-Breaking Spaces', 'Ichapur Inventory Barcode Feed', '40', 'Strip hidden trailing spaces and non-printables'],
    ['Topic4_Assembly_TEXTJOIN', 'Topic 4: String Assembly', 'CONCAT, TEXTJOIN with custom delimiters', 'Naihati Supplier Contact Registry', '40', 'Concatenate fields with comma delimiters'],
    ['Topic5_Substitution', 'Topic 5: String Replacement', 'SUBSTITUTE (instance) vs REPLACE (position)', 'Barrackpore Contract ID Formatter', '40', 'Replace specific characters and masks'],
    ['Topic6_TEXT_Formatting', 'Topic 6: Dynamic Formatting', 'TEXT function custom number & date format', 'Kolkata Multi-Currency Invoicing', '45', 'Format currency and dates inside dynamic text'],
    ['Topic7_Serial_Dates', 'Topic 7: Serial Date System', 'Day 1 = Jan 1 1900 & Negative Handling', 'Barrackpore Financial Milestone Schedule', '40', 'Understand underlying date serial numbers'],
    ['Topic8_Temporal_Stamps', 'Topic 8: Dynamic Timestamps', 'TODAY(), NOW() & Volatility Mechanics', 'Shyamnagar Plant Attendance Clock', '40', 'Calculate live aging and elapsed days'],
    ['Topic9_Date_Components', 'Topic 9: Date Construction', 'YEAR, MONTH, DAY & DATE functions', 'Ichapur Billing Cycle Generator', '40', 'Extract date parts and assemble valid dates'],
    ['Topic10_Month_End_Logic', 'Topic 10: End-of-Month Logic', 'EDATE & EOMONTH maturity scheduling', 'Naihati Commercial Loan Amortization', '45', 'Compute maturity dates and month ends'],
    ['Topic11_Workday_Calc', 'Topic 11: Business Day Engines', 'NETWORKDAYS.INTL & WORKDAY.INTL', 'Barrackpore Project Delivery Sprints', '45', 'Calculate business working days excluding holidays'],
    ['Topic12_Tenure_Intervals', 'Topic 12: Tenure & Aging', 'DATEDIF & YEARFRAC exact duration', 'Shyamnagar Employee Service Gratuity', '40', 'Calculate exact years, months and days of tenure'],
    ['Topic13_Time_Elapsed', 'Topic 13: Time & Shift Ops', 'TIME, HOUR, MINUTE, SECOND & [h]:mm:ss', 'Ichapur 24-Hour Plant Shift Ledger', '45', 'Calculate hours spanning across midnight shifts']
  ];

  directoryRows.forEach((r, idx) => {
    const rowNum = 24 + idx;
    r.forEach((val, cIdx) => {
      const cell = wsOverview.getCell(rowNum, cIdx + 1);
      cell.value = val;
      if (idx === 0) {
        cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E293B' } };
      } else {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: idx % 2 === 0 ? 'FFF8FAFC' : 'FFFFFFFF' } };
      }
      cell.border = {
        top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        right: { style: 'thin', color: { argb: 'FFE2E8F0' } },
      };
    });
  });

  await wsOverview.protect('sukantahui', { selectLockedCells: true, selectUnlockedCells: true });

  function addStyledTopicSheet(sheetName, headerColor, columns, data) {
    const ws = wb.addWorksheet(sheetName, { views: [{ showGridLines: true }] });
    ws.columns = columns;

    const headerRow = ws.addRow(columns.map(c => c.header));
    headerRow.height = 26;
    headerRow.eachCell(cell => {
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
      const r = ws.addRow(row);
      r.height = 20;
      r.eachCell(cell => {
        cell.font = { name: 'Segoe UI', size: 10 };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: idx % 2 === 0 ? 'FFF8FAFC' : 'FFFFFFFF' } };
        cell.border = {
          top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
          bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
          left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
          right: { style: 'thin', color: { argb: 'FFE2E8F0' } }
        };
      });
    });

    return ws;
  }

  const students = ['Swadeep Banerjee', 'Tuhina Mukherjee', 'Abhronila Das', 'Susmita Roy', 'Debangshu Ghosh', 'Rahul Sen', 'Priya Saha', 'Aniket Das', 'Sourav Ganguly', 'Sneha Roy'];
  const locations = ['Barrackpore', 'Shyamnagar', 'Ichapur', 'Naihati', 'Titagarh', 'Kolkata HQ'];
  const colors = ['FF0F172A', 'FF0284C7', 'FF059669', 'FF7C3AED', 'FFD97706', 'FFDC2626', 'FF0891B2', 'FF4F46E5', 'FF15803D', 'FFB45309', 'FF9333EA', 'FF0369A1', 'FF047857', 'FF334155'];

  for (let t = 0; t < 14; t++) {
    const sheetName = directoryRows[t][0];
    const headerColor = colors[t % colors.length];
    const cols = [
      { header: 'Record_ID', key: 'id', width: 16 },
      { header: 'Candidate_Name', key: 'name', width: 22 },
      { header: 'Location', key: 'loc', width: 18 },
      { header: 'Raw_Input_Text', key: 'raw', width: 28 },
      { header: 'Transformed_Formula_Output', key: 'out', width: 30 },
      { header: 'Temporal_Timestamp', key: 'ts', width: 22 },
      { header: 'Audit_Validation_Status', key: 'stat', width: 24 }
    ];
    const data = [];
    for (let r = 1; r <= 40; r++) {
      const st = students[(r - 1) % students.length];
      const loc = locations[(r - 1) % locations.length];
      data.push([
        `REC-${(t + 1) * 1000 + r}`,
        st,
        loc,
        `  ${st.toLowerCase()} // ${loc}  `,
        `=PROPER(TRIM(D${r+1}))`,
        `2026-08-${10 + (r % 18)}`,
        'VERIFIED_OK'
      ]);
    }
    addStyledTopicSheet(sheetName, headerColor, cols, data);
  }

  const outputPath = path.join(excelFilesDir, 'text_date_time_functions.xlsx');
  await wb.xlsx.writeFile(outputPath);
  console.log('✓ Successfully generated text_date_time_functions.xlsx with all 14 topic sheets');
}

buildWorkbook002_002().catch(console.error);
