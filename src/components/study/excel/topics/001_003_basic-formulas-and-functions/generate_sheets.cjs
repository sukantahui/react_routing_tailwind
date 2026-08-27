const ExcelJS = require('E:/react_routing_tailwind/node_modules/exceljs');
const fs = require('fs');
const path = require('path');

const excelBaseDir = 'E:/react_routing_tailwind/src/components/study/excel';
const moduleDir = path.join(excelBaseDir, 'topics/001_003_basic-formulas-and-functions');
const excelFilesDir = path.join(moduleDir, 'excel_files');
if (!fs.existsSync(excelFilesDir)) fs.mkdirSync(excelFilesDir, { recursive: true });

async function buildWorkbook003() {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Coder & AccoTax';
  wb.lastModifiedBy = 'Sukanta Hui';
  wb.created = new Date();
  wb.modified = new Date();

  // Overview Sheet
  const wsOverview = wb.addWorksheet('Overview', { views: [{ showGridLines: true }] });
  wsOverview.columns = [{ width: 22 }, { width: 26 }, { width: 28 }, { width: 32 }, { width: 26 }, { width: 36 }];

  const logoPath = path.join(excelBaseDir, 'assets/cnat.png');
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
  bSub2.value = 'EXCEL MASTERCLASS: Module 1.3 - Basic Formulas, BODMAS Hierarchy & Foundational Math\nCurriculum Code: EXCEL-PRO-901 | Student Practice & Laboratory Workbook';
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
    ['Curriculum Track', 'EXCEL-PRO-901: Microsoft Excel From Zero to Ultra Expert', 'Module Reference', '001_003_basic-formulas-and-functions'],
    ['Competency Level', 'CO1: Core Math Functions, BODMAS & Aggregation', 'Total Topics', '9 Comprehensive Topics & 270 FAQ Questions'],
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
    ['Topic0_BODMAS_Order', 'Topic 0: Formula Anatomy', 'BODMAS / Operator Precedence', 'Barrackpore Trading Commission Schedule', '35', 'Evaluate complex arithmetic expressions'],
    ['Topic1_Core_Arithmetic', 'Topic 1: Arithmetic Ops', 'Add, Subtract, Multiply, Divide, Exponents', 'Kolkata Corporate Product Invoicing', '40', 'Build dynamic unit cost and margin formulas'],
    ['Topic2_Aggregation', 'Topic 2: SUM, AVERAGE, COUNT', 'SUM, AVERAGE, COUNT, COUNTA, COUNTBLANK', 'Shyamnagar Academic Performance Roster', '35', 'Aggregate cohort statistics and attendance'],
    ['Topic3_Min_Max_Rank', 'Topic 3: MIN, MAX, LARGE', 'MIN, MAX, LARGE(k), SMALL(k)', 'Ichapur Manufacturing Quality Metrics', '35', 'Extract top 3 and bottom 3 defect scores'],
    ['Topic4_Rounding_Math', 'Topic 4: Rounding Functions', 'ROUND, ROUNDUP, ROUNDDOWN, INT, TRUNC', 'Naihati Wholesale Billing & Tax Rounding', '40', 'Audit nearest rupee and integer truncation'],
    ['Topic5_AutoSum_Speed', 'Topic 5: AutoSum Shortcuts', 'Alt + = Multi-Directional AutoSum', 'Barrackpore Regional Sales Matrix', '45', 'Simultaneously sum rows and columns in 1 keystroke'],
    ['Topic6_Formulas_Lab', 'Topic 6: Comprehensive Lab', 'Integrated Formulas & Functions Lab', 'Kolkata Enterprise Multi-Branch Accounts', '50', 'End-to-end mathematical ledger auditing'],
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

  const students = ['Swadeep', 'Tuhina', 'Abhronila', 'Susmita', 'Debangshu', 'Rahul', 'Priya', 'Aniket', 'Sourav', 'Sneha', 'Bikram', 'Riya', 'Koyel', 'Suman', 'Arpan', 'Dipankar', 'Puja', 'Tanmay', 'Mousumi', 'Amit'];
  const locations = ['Barrackpore', 'Shyamnagar', 'Ichapur', 'Naihati', 'Titagarh', 'Kolkata', 'Kankinara', 'Sodepur'];

  // Topic0 Sheet: BODMAS
  const t0Cols = [
    { header: 'Trans_ID', key: 'id', width: 14 },
    { header: 'Sales_Rep', key: 'name', width: 22 },
    { header: 'Base_Sales (INR)', key: 'sales', width: 20 },
    { header: 'Commission_Tier_%', key: 'comm', width: 20 },
    { header: 'Bonus_Threshold', key: 'bonus', width: 20 },
    { header: 'Net_Payout_Formula (BODMAS)', key: 'payout', width: 34 }
  ];
  const t0Data = [];
  for (let i = 1; i <= 35; i++) {
    const sName = students[(i - 1) % students.length];
    const sales = 150000 + i * 12500;
    const comm = 0.05 + (i % 3) * 0.02;
    const bonus = 5000;
    const payout = sales * comm + bonus;
    t0Data.push([`TXN-${3000 + i}`, sName, sales, `${(comm * 100).toFixed(1)}%`, bonus, `=C${i+1}*D${i+1}+E${i+1}`]);
  }
  addStyledTopicSheet('Topic0_BODMAS_Order', 'FF0F172A', t0Cols, t0Data);

  // Topic2 Sheet: Aggregation
  const t2Cols = [
    { header: 'Student_ID', key: 'id', width: 14 },
    { header: 'Student_Name', key: 'name', width: 22 },
    { header: 'Accounts_Score', key: 'acc', width: 18 },
    { header: 'Taxation_Score', key: 'tax', width: 18 },
    { header: 'Excel_Score', key: 'exc', width: 18 },
    { header: 'Total_Score', key: 'tot', width: 18 },
    { header: 'Average_Score', key: 'avg', width: 18 },
  ];
  const t2Data = [];
  for (let i = 1; i <= 35; i++) {
    const sName = students[(i - 1) % students.length];
    const acc = 75 + (i * 3) % 25;
    const tax = 70 + (i * 7) % 30;
    const exc = 80 + (i * 5) % 20;
    t2Data.push([`STD-${1000 + i}`, sName, acc, tax, exc, `=SUM(C${i+1}:E${i+1})`, `=AVERAGE(C${i+1}:E${i+1})`]);
  }
  addStyledTopicSheet('Topic2_Aggregation', 'FF0284C7', t2Cols, t2Data);

  // Topic4 Sheet: Rounding
  const t4Cols = [
    { header: 'Bill_ID', key: 'id', width: 14 },
    { header: 'Customer_Name', key: 'name', width: 22 },
    { header: 'Raw_Tax_Amount', key: 'raw', width: 20 },
    { header: 'ROUND_2_Dec', key: 'r2', width: 20 },
    { header: 'ROUND_Nearest_Rupee', key: 'r0', width: 24 },
    { header: 'ROUNDUP (Ceil)', key: 'rup', width: 20 },
    { header: 'INT (Floor)', key: 'rint', width: 20 }
  ];
  const t4Data = [];
  for (let i = 1; i <= 35; i++) {
    const sName = students[(i - 1) % students.length];
    const raw = 1450.457 + (i * 12.345);
    t4Data.push([
      `INV-${4000 + i}`,
      sName,
      raw.toFixed(4),
      `=ROUND(C${i+1}, 2)`,
      `=ROUND(C${i+1}, 0)`,
      `=ROUNDUP(C${i+1}, 0)`,
      `=INT(C${i+1})`
    ]);
  }
  addStyledTopicSheet('Topic4_Rounding_Math', 'FF059669', t4Cols, t4Data);

  const outputPath = path.join(excelFilesDir, 'basic_formulas.xlsx');
  await wb.xlsx.writeFile(outputPath);
  console.log('✓ Successfully generated basic_formulas.xlsx');

  fs.copyFileSync(__filename, path.join(moduleDir, 'generate_sheets.cjs'));
  console.log('✓ Saved generate_sheets.cjs in module directory');
}

buildWorkbook003().catch(console.error);
