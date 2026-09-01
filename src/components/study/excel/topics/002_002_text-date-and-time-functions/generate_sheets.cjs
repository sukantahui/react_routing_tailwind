const ExcelJS = require('E:/react_routing_tailwind/node_modules/exceljs');
const fs = require('fs');
const path = require('path');

const excelBaseDir = 'E:/react_routing_tailwind/src/components/study/excel';
const moduleDir = path.join(excelBaseDir, 'topics/002_002_text-date-and-time-functions');
const excelFilesDir = path.join(moduleDir, 'excel_files');
if (!fs.existsSync(excelFilesDir)) fs.mkdirSync(excelFilesDir, { recursive: true });

// Rich sample generator
const sampleNames = ['Swadeep Hui', 'Tuhina Das', 'Abhronila Ray', 'Susmita Sen', 'Debangshu Roy', 'Rahul Kumar', 'Priya Sharma', 'Aniket Verma', 'Sourav Ganguly', 'Sneha Ghosh', 'Arpan Dey', 'Subhajit Pal', 'Riya Sarkar', 'Dipankar Mitra', 'Barnali Dutta', 'Vikram Singh', 'Kavita Nair', 'Amitabh Basu', 'Pooja Bannerjee', 'Sanjay Chakraborty'];
const sampleCities = ['Barrackpore', 'Shyamnagar', 'Ichapur', 'Naihati', 'Titagarh', 'Kolkata', 'Howrah', 'Hooghly', 'Kanchrapara', 'Sodepur'];
const sampleDepts = ['Finance', 'Accounts', 'Engineering', 'HR', 'Logistics', 'Procurement', 'Taxation', 'Audit'];

const topicSheets = [
  {
    sheetName: 'Text Manipulation Essentials',
    topicTitle: 'Text manipulation essentials: UPPER, LOWER, PROPER, TRIM, and CLEAN',
    difficulty: 'Beginner',
    formula: '=TRIM(CLEAN(PROPER(A2)))',
    headerColor: 'FF0F172A',
    columns: [
      { header: 'Record_ID', key: 'id' },
      { header: 'Raw Payload Input', key: 'raw' },
      { header: 'Target Excel Formula', key: 'formula' },
      { header: 'Evaluated String Output', key: 'output' },
      { header: 'Audit Status', key: 'status' }
    ],
    sampleData: [
      ['REC-101', '  swadeep BANERJEE  ', '=TRIM(CLEAN(PROPER(B2)))', 'Swadeep Banerjee', 'Verified & Clean'],
      ['REC-102', '  tuhina DAS  ', '=TRIM(CLEAN(PROPER(B3)))', 'Tuhina Das', 'Verified & Clean'],
      ['REC-103', '  abhronila RAY  ', '=TRIM(CLEAN(PROPER(B4)))', 'Abhronila Ray', 'Verified & Clean'],
      ['REC-104', '  susmita SEN  ', '=TRIM(CLEAN(PROPER(B5)))', 'Susmita Sen', 'Verified & Clean'],
      ['REC-105', '  debangshu ROY  ', '=TRIM(CLEAN(PROPER(B6)))', 'Debangshu Roy', 'Verified & Clean'],
      ['REC-106', '  rahul KUMAR  ', '=TRIM(CLEAN(PROPER(B7)))', 'Rahul Kumar', 'Verified & Clean'],
      ['REC-107', '  priya SHARMA  ', '=TRIM(CLEAN(PROPER(B8)))', 'Priya Sharma', 'Verified & Clean'],
      ['REC-108', '  aniket VERMA  ', '=TRIM(CLEAN(PROPER(B9)))', 'Aniket Verma', 'Verified & Clean'],
      ['REC-109', '  sourav GANGULY  ', '=TRIM(CLEAN(PROPER(B10)))', 'Sourav Ganguly', 'Verified & Clean'],
      ['REC-110', '  sneha GHOSH  ', '=TRIM(CLEAN(PROPER(B11)))', 'Sneha Ghosh', 'Verified & Clean'],
    ]
  },
  {
    sheetName: 'Substring Extraction',
    topicTitle: 'Substring extraction: LEFT, RIGHT, MID, LEN, and FIND vs SEARCH',
    difficulty: 'Beginner',
    formula: '=MID(A2, FIND("@", A2)+1, 100)',
    headerColor: 'FF0F172A',
    columns: [
      { header: 'Record_ID', key: 'id' },
      { header: 'User Email Address', key: 'email' },
      { header: 'Extracted Username', key: 'user' },
      { header: 'Extracted Domain', key: 'domain' },
      { header: 'Audit Status', key: 'status' }
    ],
    sampleData: [
      ['REC-201', 'swadeep.hui@codernaccotax.co.in', '=LEFT(B2, FIND("@", B2)-1)', '=MID(B2, FIND("@", B2)+1, 100)', 'Parsed Successfully'],
      ['REC-202', 'tuhina.das@codernaccotax.co.in', '=LEFT(B3, FIND("@", B3)-1)', '=MID(B3, FIND("@", B3)+1, 100)', 'Parsed Successfully'],
      ['REC-203', 'abhronila.ray@codernaccotax.co.in', '=LEFT(B4, FIND("@", B4)-1)', '=MID(B4, FIND("@", B4)+1, 100)', 'Parsed Successfully'],
      ['REC-204', 'susmita.sen@codernaccotax.co.in', '=LEFT(B5, FIND("@", B5)-1)', '=MID(B5, FIND("@", B5)+1, 100)', 'Parsed Successfully'],
      ['REC-205', 'debangshu.roy@codernaccotax.co.in', '=LEFT(B6, FIND("@", B6)-1)', '=MID(B6, FIND("@", B6)+1, 100)', 'Parsed Successfully'],
    ]
  },
  {
    sheetName: 'Concatenation Strategies',
    topicTitle: 'Concatenation strategies: CONCAT, TEXTJOIN with custom delimiters, and the & operator',
    difficulty: 'Intermediate',
    formula: '=TEXTJOIN(", ", TRUE, A2:D2)',
    headerColor: 'FF0F172A',
    columns: [
      { header: 'Record_ID', key: 'id' },
      { header: 'First Name', key: 'fn' },
      { header: 'Last Name', key: 'ln' },
      { header: 'Department', key: 'dept' },
      { header: 'Assembled Full Bio String', key: 'bio' }
    ],
    sampleData: [
      ['REC-301', 'Swadeep', 'Hui', 'Executive', '=TEXTJOIN(" | ", TRUE, B2, C2, D2)'],
      ['REC-302', 'Tuhina', 'Das', 'Finance', '=TEXTJOIN(" | ", TRUE, B3, C3, D3)'],
      ['REC-303', 'Abhronila', 'Ray', 'Engineering', '=TEXTJOIN(" | ", TRUE, B4, C4, D4)'],
      ['REC-304', 'Susmita', 'Sen', 'Accounts', '=TEXTJOIN(" | ", TRUE, B5, C5, D5)'],
      ['REC-305', 'Debangshu', 'Roy', 'Audit', '=TEXTJOIN(" | ", TRUE, B6, C6, D6)'],
    ]
  },
  {
    sheetName: 'Number to Text Formatting',
    topicTitle: 'Number-to-text formatting with the TEXT function (custom number formats, currency, dates)',
    difficulty: 'Intermediate',
    formula: '=TEXT(A2, "$#,##0.00")',
    headerColor: 'FF0F172A',
    columns: [
      { header: 'Record_ID', key: 'id' },
      { header: 'Raw Numeric Float', key: 'val' },
      { header: 'Target Format Mask', key: 'mask' },
      { header: 'Formatted Text Result', key: 'text' },
      { header: 'Audit Status', key: 'status' }
    ],
    sampleData: [
      ['REC-401', 1250.75, '$#,##0.00', '=TEXT(B2, "$#,##0.00")', 'Formatted String'],
      ['REC-402', 8450.5, '₹ #,##0.00', '=TEXT(B3, "₹ #,##0.00")', 'Formatted String'],
      ['REC-403', 0.854, '0.0%', '=TEXT(B4, "0.0%")', 'Formatted String'],
      ['REC-404', 45427, 'dd-mmm-yyyy', '=TEXT(B5, "dd-mmm-yyyy")', 'Formatted String'],
    ]
  },
  {
    sheetName: 'Date Serial Numbering',
    topicTitle: 'Date serial numbering in Excel: DATE, DAY, MONTH, YEAR, and TODAY',
    difficulty: 'Intermediate',
    formula: '=DATE(YEAR(TODAY()), 12, 31)',
    headerColor: 'FF0F172A',
    columns: [
      { header: 'Record_ID', key: 'id' },
      { header: 'Date Serial / Entry', key: 'dt' },
      { header: 'Extracted Year', key: 'yr' },
      { header: 'Extracted Month', key: 'mo' },
      { header: 'Extracted Day', key: 'dy' }
    ],
    sampleData: [
      ['REC-501', '2024-05-15', '=YEAR(B2)', '=MONTH(B2)', '=DAY(B2)'],
      ['REC-502', '2025-01-01', '=YEAR(B3)', '=MONTH(B3)', '=DAY(B3)'],
      ['REC-503', '2025-08-15', '=YEAR(B4)', '=MONTH(B4)', '=DAY(B4)'],
    ]
  },
  {
    sheetName: 'Working Day Calculations',
    topicTitle: 'Working day calculations: WORKDAY, WORKDAY.INTL, NETWORKDAYS, and NETWORKDAYS.INTL',
    difficulty: 'Intermediate',
    formula: '=WORKDAY(A2, 10, Holidays)',
    headerColor: 'FF0F172A',
    columns: [
      { header: 'Record_ID', key: 'id' },
      { header: 'Project Start Date', key: 'start' },
      { header: 'Allotted Business Days', key: 'days' },
      { header: 'Calculated Completion Date', key: 'end' },
      { header: 'Audit Status', key: 'status' }
    ],
    sampleData: [
      ['REC-601', '2024-05-01', 15, '=WORKDAY(B2, C2)', 'SLA Met'],
      ['REC-602', '2024-06-01', 10, '=WORKDAY(B3, C3)', 'SLA Met'],
      ['REC-603', '2024-07-01', 20, '=WORKDAY(B4, C4)', 'SLA Met'],
    ]
  },
  {
    sheetName: 'Date Differences & Tenures',
    topicTitle: 'Date differences and milestone calculations: DATEDIF and YEARFRAC',
    difficulty: 'Intermediate',
    formula: '=DATEDIF(A2, B2, "Y")',
    headerColor: 'FF0F172A',
    columns: [
      { header: 'Employee_ID', key: 'id' },
      { header: 'Joining Date', key: 'join' },
      { header: 'Audit Date', key: 'today' },
      { header: 'Tenure Years (DATEDIF)', key: 'yrs' },
      { header: 'Fractional Years (YEARFRAC)', key: 'frac' }
    ],
    sampleData: [
      ['EMP-701', '2018-03-15', '2024-05-15', '=DATEDIF(B2, C2, "Y")', '=YEARFRAC(B2, C2)'],
      ['EMP-702', '2020-07-01', '2024-05-15', '=DATEDIF(B3, C3, "Y")', '=YEARFRAC(B3, C3)'],
      ['EMP-703', '2021-11-10', '2024-05-15', '=DATEDIF(B4, C4, "Y")', '=YEARFRAC(B4, C4)'],
    ]
  },
  {
    sheetName: 'Lab Practice Session',
    topicTitle: 'Practical Laboratory Exercises: Text, Date and Time Functions Master Class',
    difficulty: 'Intermediate',
    formula: '=SUBTOTAL(109, Value_Range)',
    headerColor: 'FF0F172A',
    columns: [
      { header: 'Lab_Card_ID', key: 'id' },
      { header: 'Exercise Title', key: 'title' },
      { header: 'Target Category', key: 'cat' },
      { header: 'Applied Formula', key: 'form' },
      { header: 'Verification Status', key: 'stat' }
    ],
    sampleData: [
      ['EX701', 'Workplace Text Sanitizer', 'Text', '=TRIM(CLEAN(PROPER(A2)))', 'Verified & Passed'],
      ['EX702', 'Email Domain Separator', 'Text', '=TEXTAFTER(A2, "@")', 'Verified & Passed'],
      ['EX703', 'Invoice SLA Due Date Calculator', 'Date', '=WORKDAY(A2, 15)', 'Verified & Passed'],
      ['EX704', 'Employee Seniority Tenures', 'Date', '=DATEDIF(A2, TODAY(), "Y")', 'Verified & Passed'],
    ]
  },
  {
    sheetName: 'Modern Text Manipulation',
    topicTitle: 'Modern text manipulation: TEXTBEFORE, TEXTAFTER, and TEXTSPLIT',
    difficulty: 'Advanced',
    formula: '=TEXTBEFORE(A2, "@")',
    headerColor: 'FF0F172A',
    columns: [
      { header: 'Record_ID', key: 'id' },
      { header: 'Delimited Payload', key: 'text' },
      { header: 'TEXTBEFORE Result', key: 'tb' },
      { header: 'TEXTAFTER Result', key: 'ta' },
      { header: 'Audit Status', key: 'stat' }
    ],
    sampleData: [
      ['REC-901', 'Kolkata-West Bengal-700001', '=TEXTBEFORE(B2, "-")', '=TEXTAFTER(B2, "-")', 'Processed'],
      ['REC-902', 'Barrackpore-North 24 Parganas-700122', '=TEXTBEFORE(B3, "-")', '=TEXTAFTER(B3, "-")', 'Processed'],
      ['REC-903', 'Naihati-North 24 Parganas-700123', '=TEXTBEFORE(B4, "-")', '=TEXTAFTER(B4, "-")', 'Processed'],
    ]
  },
  {
    sheetName: 'Replacing & Substituting',
    topicTitle: 'Replacing and substituting strings: REPLACE and SUBSTITUTE',
    difficulty: 'Advanced',
    formula: '=SUBSTITUTE(A2, "-", "")',
    headerColor: 'FF0F172A',
    columns: [
      { header: 'Record_ID', key: 'id' },
      { header: 'Raw Code Payload', key: 'raw' },
      { header: 'Target Substitute Target', key: 'target' },
      { header: 'Cleaned Substitute Result', key: 'res' },
      { header: 'Audit Status', key: 'stat' }
    ],
    sampleData: [
      ['REC-1001', 'GST-19-ABCDE-1234-F1Z5', '-', '=SUBSTITUTE(B2, "-", "")', 'Cleaned Code'],
      ['REC-1002', 'PAN-ABCDE-1234-F', '-', '=SUBSTITUTE(B3, "-", "")', 'Cleaned Code'],
      ['REC-1003', 'AADHAAR-1234-5678-9012', '-', '=SUBSTITUTE(B4, "-", "")', 'Cleaned Code'],
    ]
  },
  {
    sheetName: 'Converting Text Strings',
    topicTitle: 'Converting text strings to numeric values: VALUE, NUMBERVALUE, and DATEVALUE',
    difficulty: 'Advanced',
    formula: '=VALUE(TRIM(A2))',
    headerColor: 'FF0F172A',
    columns: [
      { header: 'Record_ID', key: 'id' },
      { header: 'Text Serial String', key: 'str' },
      { header: 'Target Coercion Function', key: 'func' },
      { header: 'Numeric Float/Serial Output', key: 'out' },
      { header: 'Audit Status', key: 'stat' }
    ],
    sampleData: [
      ['REC-1101', '₹ 15,450.00', 'VALUE', '=VALUE(SUBSTITUTE(SUBSTITUTE(B2, "₹", ""), ",", ""))', 'Coerced to Float'],
      ['REC-1102', '15.05.2024', 'DATEVALUE', '=DATEVALUE(SUBSTITUTE(B3, ".", "-"))', 'Coerced to Date Serial'],
      ['REC-1103', '14:30:00', 'TIMEVALUE', '=TIMEVALUE(B4)', 'Coerced to Time Serial'],
    ]
  },
  {
    sheetName: 'Real-World ETL Case Study',
    topicTitle: 'Real-world case study: Parsing messy customer names, addresses, and timestamps',
    difficulty: 'Advanced',
    formula: '=TRIM(CLEAN(PROPER(SUBSTITUTE(A2, CHAR(160), " "))))',
    headerColor: 'FF0F172A',
    columns: [
      { header: 'Case_ID', key: 'id' },
      { header: 'Messy Ingestion String', key: 'messy' },
      { header: 'ETL Pipeline Formula', key: 'form' },
      { header: 'Sanitized Record Result', key: 'clean' },
      { header: 'Audit Status', key: 'stat' }
    ],
    sampleData: [
      ['ETL-1201', '  swadeep BANERJEE (+91 9830012345) ', '=TRIM(CLEAN(PROPER(TEXTBEFORE(B2, "("))))', 'Swadeep Banerjee', 'ETL Passed'],
      ['ETL-1202', '  tuhina DAS (+91 9830099999) ', '=TRIM(CLEAN(PROPER(TEXTBEFORE(B3, "("))))', 'Tuhina Das', 'ETL Passed'],
      ['ETL-1203', '  abhronila RAY (+91 9830088888) ', '=TRIM(CLEAN(PROPER(TEXTBEFORE(B4, "("))))', 'Abhronila Ray', 'ETL Passed'],
    ]
  },
  {
    sheetName: 'Shift Duration & Overtime',
    topicTitle: 'Practice: Employee shift duration and overtime calculator',
    difficulty: 'Advanced',
    formula: '=MOD(B2 - A2, 1) * 24',
    headerColor: 'FF0F172A',
    columns: [
      { header: 'Shift_ID', key: 'id' },
      { header: 'Clock-In Time', key: 'in' },
      { header: 'Clock-Out Time', key: 'out' },
      { header: 'Break Mins', key: 'break' },
      { header: 'Gross Hours worked', key: 'gross' },
      { header: 'Net Paid Hours', key: 'net' },
      { header: 'Overtime Hours (>8h)', key: 'ot' }
    ],
    sampleData: [
      ['SFT-1301', '09:00:00', '17:30:00', 30, '=MOD(C2 - B2, 1)*24', '=E2 - (D2/60)', '=MAX(0, F2 - 8)'],
      ['SFT-1302', '22:00:00', '06:30:00', 30, '=MOD(C3 - B3, 1)*24', '=E3 - (D3/60)', '=MAX(0, F3 - 8)'],
      ['SFT-1303', '08:00:00', '19:00:00', 60, '=MOD(C4 - B4, 1)*24', '=E4 - (D4/60)', '=MAX(0, F4 - 8)'],
    ]
  },
  {
    sheetName: 'Advanced Text & Date Challenge',
    topicTitle: 'Assessment: Advanced Text and Date Functions Challenge',
    difficulty: 'Mastery',
    formula: '=WORKDAY(DATEVALUE(TEXT(A2,"yyyy-mm-dd")), 15, HOLIDAYS)',
    headerColor: 'FF0F172A',
    columns: [
      { header: 'Challenge_ID', key: 'id' },
      { header: 'Assessment Task Name', key: 'task' },
      { header: 'Target Skill Domain', key: 'skill' },
      { header: 'Mastery Formula', key: 'form' },
      { header: 'Evaluation Grade', key: 'grade' }
    ],
    sampleData: [
      ['CHL-1401', 'Multi-Step Name & Phone Cleaner', 'Text Clean & Parse', '=TEXTBEFORE(TRIM(CLEAN(PROPER(A2))), "(")', 'Mastered'],
      ['CHL-1402', 'Dynamic Milestone Scheduler', 'Date Working Day Math', '=WORKDAY(A2, 15)', 'Mastered'],
      ['CHL-1403', 'Overnight Shift Wage Engine', 'Time Math & Logic', '=MIN(8, Net)*Rate + MAX(0, Net-8)*Rate*1.5', 'Mastered'],
    ]
  }
];

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
  bSub2.value = `Module 7: 002_002_text-date-and-time-functions\nCurriculum Track: EXCEL-PRO-901 | Student Practice Workbook`;
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

  const directoryHeaders = ['Sheet Name (Click to Jump)', 'Topic Title', 'Difficulty Level', 'Target Formula / Mask', 'Status'];
  const headerRow = wsOverview.getRow(35);
  headerRow.height = 26;
  directoryHeaders.forEach((h, cIdx) => {
    const cell = headerRow.getCell(cIdx + 1);
    cell.value = h;
    cell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E293B' } };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
  });

  topicSheets.forEach((proj, idx) => {
    const rowNum = 36 + idx;
    const r = wsOverview.getRow(rowNum);
    r.height = 22;

    const cellId = r.getCell(1);
    cellId.value = { text: `🔗 ${proj.sheetName}`, hyperlink: `#'${proj.sheetName}'!A1` };
    cellId.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FF0284C7' }, underline: true };
    cellId.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };

    r.getCell(2).value = proj.topicTitle;
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

  topicSheets.forEach((tSheet) => {
    addStyledSheet(
      tSheet.sheetName,
      tSheet.headerColor,
      tSheet.columns,
      tSheet.sampleData
    );
  });

  const outputPath = path.join(excelFilesDir, '002_002_text_date_and_time_functions_master.xlsx');
  await wb.xlsx.writeFile(outputPath);
  console.log(`✓ Generated 002_002_text_date_and_time_functions_master.xlsx with topic-named sheets for module 002_002_text-date-and-time-functions`);
  fs.copyFileSync(outputPath, path.join(excelFilesDir, 'text_date_and_time_functions_master.xlsx'));
}

buildWorkbook().catch(console.error);
