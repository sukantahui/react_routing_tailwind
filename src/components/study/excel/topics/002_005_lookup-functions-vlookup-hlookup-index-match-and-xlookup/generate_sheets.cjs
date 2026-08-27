const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

const moduleDir = __dirname;
const excelFilesDir = path.join(moduleDir, 'excel_files');
if (!fs.existsSync(excelFilesDir)) fs.mkdirSync(excelFilesDir, { recursive: true });

async function buildWorkbookLookup() {
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
  bSub2.value = 'EXCEL MASTERCLASS: Module 2.5 - Lookup Functions: VLOOKUP, HLOOKUP, INDEX-MATCH & XLOOKUP\nCurriculum Code: EXCEL-PRO-901 | Student Practice & Laboratory Workbook';
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
    ['Curriculum Track', 'EXCEL-PRO-901: Microsoft Excel From Zero to Ultra Expert', 'Module Reference', '002_005_lookup-functions-vlookup-hlookup-index-match-and-xlookup'],
    ['Competency Level', 'CO2: Advanced Relational Data Retrieval & Index-Match Architecture', 'Total Topics', '21 Comprehensive Topics & 630 FAQ Questions'],
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
    ['Topic0_Reference_Tables', 'Topic 0: Intro to Lookups', 'Reference Table Design & Key Columns', 'Barrackpore Student Enrollment Master', '40', 'Understand relational lookup table architecture'],
    ['Topic1_Primary_Keys', 'Topic 1: Unique Keys', 'Primary Key Hygiene & Duplicate Prevention', 'Kolkata Customer Identification Ledger', '40', 'Validate key uniqueness for exact matching'],
    ['Topic2_VLOOKUP_Syntax', 'Topic 2: VLOOKUP Exact Match', '=VLOOKUP(lookup, table, col, FALSE)', 'Shyamnagar Employee Payroll Master', '45', 'Perform exact match vertical lookups'],
    ['Topic3_Approximate_Match', 'Topic 3: Approx Lookups', 'Tax Brackets & Commission Tiers (TRUE)', 'Ichapur Commission Tier Scale', '35', 'Map numerical ranges with approximate match'],
    ['Topic7_MATCH_Basics', 'Topic 7: MATCH Function', '=MATCH(lookup_val, lookup_array, 0)', 'Naihati Product SKU Directory', '40', 'Locate relative position coordinates of items'],
    ['Topic8_INDEX_Basics', 'Topic 8: INDEX Function', '=INDEX(array, row_num, col_num)', 'Barrackpore Price Matrix', '35', 'Extract cell values by coordinate indices'],
    ['Topic9_INDEX_MATCH', 'Topic 9: INDEX-MATCH Duo', '=INDEX(return_col, MATCH(key, key_col, 0))', 'Kolkata Enterprise Sales Roster', '50', 'Execute resilient two-way and left lookups'],
    ['Topic12_XLOOKUP_Modern', 'Topic 12: Modern XLOOKUP', '=XLOOKUP(key, lookup_arr, return_arr)', 'Titagarh Logistics Dispatch Schedule', '45', 'Universal modern lookup with if_not_found'],
    ['Topic19_Lookup_Practice', 'Topic 19: Comprehensive Practice', 'Multi-Criteria Two-Way Dynamic Lookup Hub', 'Barrackpore Commercial Pricing Engine', '50', 'Build dynamic two-way product pricing lookup'],
    ['Topic20_Lookup_Assessment', 'Topic 20: Capstone Assessment', 'Relational Lookup & Data Retrieval Exam', 'Candidate Lookup Exam Scorecard', '35', 'Comprehensive relational lookup evaluation']
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
  const locations = ['Barrackpore', 'Shyamnagar', 'Ichapur', 'Naihati', 'Titagarh', 'Kolkata HQ', 'Kankinara', 'Sodepur'];
  const depts = ['Software Engg', 'Taxation & GST', 'Data Analytics', 'Financial Modeling'];

  // Topic2 Sheet: VLOOKUP
  const t2Cols = [
    { header: 'Emp_ID (Key)', key: 'id', width: 16 },
    { header: 'Employee_Name', key: 'name', width: 22 },
    { header: 'Branch_Location', key: 'loc', width: 20 },
    { header: 'Department', key: 'dept', width: 22 },
    { header: 'Monthly_Salary (INR)', key: 'sal', width: 22 },
    { header: 'Tax_Slab_Tier', key: 'slab', width: 18 }
  ];
  const t2Data = [];
  for (let i = 1; i <= 45; i++) {
    const sName = students[(i - 1) % students.length];
    const loc = locations[(i - 1) % locations.length];
    const dept = depts[(i - 1) % depts.length];
    const sal = 35000 + i * 1500;
    t2Data.push([`EMP-${2000 + i}`, sName, loc, dept, sal, sal > 75000 ? 'Tier 3 (30%)' : sal > 50000 ? 'Tier 2 (20%)' : 'Tier 1 (10%)']);
  }
  addStyledTopicSheet('Topic2_VLOOKUP_Syntax', 'FF0F172A', t2Cols, t2Data);

  // Topic9 Sheet: INDEX MATCH
  const t9Cols = [
    { header: 'SKU_Code', key: 'sku', width: 16 },
    { header: 'Product_Description', key: 'desc', width: 26 },
    { header: 'Category', key: 'cat', width: 20 },
    { header: 'Unit_Cost (INR)', key: 'cost', width: 20 },
    { header: 'Retail_Price (INR)', key: 'price', width: 20 },
    { header: 'Stock_Quantity', key: 'qty', width: 18 }
  ];
  const t9Data = [];
  for (let i = 1; i <= 45; i++) {
    t9Data.push([`SKU-${5000 + i}`, `Industrial Component ${i}`, 'Hardware', 450 + i * 25, 650 + i * 35, 100 + (i * 7) % 50]);
  }
  addStyledTopicSheet('Topic9_INDEX_MATCH', 'FF0284C7', t9Cols, t9Data);

  // Topic12 Sheet: Modern XLOOKUP
  const t12Cols = [
    { header: 'Dispatch_ID', key: 'did', width: 18 },
    { header: 'Client_Code', key: 'cid', width: 18 },
    { header: 'Origin_Hub', key: 'hub', width: 20 },
    { header: 'Consignment_Weight', key: 'wt', width: 22 },
    { header: 'Freight_Cost', key: 'cost', width: 20 },
    { header: 'Delivery_Status', key: 'stat', width: 20 }
  ];
  const t12Data = [];
  for (let i = 1; i <= 45; i++) {
    t12Data.push([`DSP-${8800 + i}`, `CL-${300 + (i % 15)}`, locations[i % locations.length], 250 + (i * 15) % 1000, 1800 + (i * 120) % 5000, i % 3 === 0 ? 'DELIVERED' : 'IN_TRANSIT']);
  }
  addStyledTopicSheet('Topic12_XLOOKUP_Modern', 'FF059669', t12Cols, t12Data);

  // Topic19 Sheet: Practice
  const t19Cols = [
    { header: 'Pricing_Ref', key: 'pref', width: 18 },
    { header: 'Product_Family', key: 'fam', width: 22 },
    { header: 'Service_Tier', key: 'tier', width: 20 },
    { header: 'Region', key: 'reg', width: 18 },
    { header: 'Base_Tariff', key: 'base', width: 20 },
    { header: 'Surge_Multiplier', key: 'mult', width: 20 },
    { header: 'Effective_Price', key: 'eff', width: 22 }
  ];
  const t19Data = [];
  for (let i = 1; i <= 50; i++) {
    const base = 4500 + (i * 350) % 8000;
    const mult = 1.15;
    t19Data.push([`PRC-${7700 + i}`, 'Enterprise Cloud', 'Platinum', locations[i % locations.length], base, mult, base * mult]);
  }
  addStyledTopicSheet('Topic19_Lookup_Practice', 'FF7C3AED', t19Cols, t19Data);

  // Topic20 Sheet: Assessment
  const t20Cols = [
    { header: 'Candidate_ID', key: 'cid', width: 16 },
    { header: 'Candidate_Name', key: 'cname', width: 22 },
    { header: 'Exam_Branch', key: 'ebr', width: 18 },
    { header: 'VLOOKUP_Score', key: 's1', width: 18 },
    { header: 'INDEX_MATCH_Score', key: 's2', width: 20 },
    { header: 'XLOOKUP_Score', key: 's3', width: 18 },
    { header: 'Total_Score', key: 'tot', width: 18 },
    { header: 'Qualification', key: 'qual', width: 20 }
  ];
  const t20Data = [];
  students.forEach((st, i) => {
    const s1 = 28 + (i * 2) % 6;
    const s2 = 29 + (i * 3) % 5;
    const s3 = 34 + (i * 4) % 6;
    t20Data.push([`CAND-${9900 + i}`, st, locations[i % locations.length], s1, s2, s3, `=D${i+2}+E${i+2}+F${i+2}`, `=IF(G${i+2}>=85, "DISTINCTION", "PASS")`]);
  });
  addStyledTopicSheet('Topic20_Lookup_Assessment', 'FFD97706', t20Cols, t20Data);

  const outputPath = path.join(excelFilesDir, 'lookup_functions.xlsx');
  await wb.xlsx.writeFile(outputPath);
  console.log('✓ Successfully generated lookup_functions.xlsx with Topic 19 and 20 sheets');
}

buildWorkbookLookup().catch(console.error);
