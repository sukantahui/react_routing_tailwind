const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

const moduleDir = __dirname;
const excelFilesDir = path.join(moduleDir, 'excel_files');
if (!fs.existsSync(excelFilesDir)) fs.mkdirSync(excelFilesDir, { recursive: true });

async function buildWorkbook005() {
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
  bSub2.value = 'EXCEL MASTERCLASS: Module 2.1 - Structured Tables, Sorting, Filtering & Slicers\nCurriculum Code: EXCEL-PRO-901 | Student Practice & Laboratory Workbook';
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
    ['Curriculum Track', 'EXCEL-PRO-901: Microsoft Excel From Zero to Ultra Expert', 'Module Reference', '002_001_tables-sorting-and-filtering'],
    ['Competency Level', 'CO2: Data Wrangling, Structured Tables & Multi-Tier Filtering', 'Total Topics', '9 Comprehensive Topics & 270 FAQ Questions'],
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
    ['Topic0_Excel_Tables', 'Topic 0: Structured Tables', 'Table Objects (Ctrl+T) & [@Column] Syntax', 'Barrackpore Student Enrollment Database', '40', 'Convert grid to dynamic structured table'],
    ['Topic1_Table_Features', 'Topic 1: Calculated Columns', 'Auto-Expansion, Calculated Columns & Totals', 'Kolkata Enterprise Sales Invoicing Table', '45', 'Build auto-calculating GST & Net columns'],
    ['Topic2_Multi_Sort', 'Topic 2: Multi-Level Sort', 'Sort by Region, Dept, and Sales Descending', 'Shyamnagar Regional Employee Compensation', '40', 'Configure 3-tier custom sorting hierarchy'],
    ['Topic3_AutoFilter', 'Topic 3: AutoFilter Search', 'Wildcard Search (*, ?), Top 10, Date Filters', 'Ichapur Inventory Stock Ledger', '40', 'Filter stock reorder levels and expired batches'],
    ['Topic4_Advanced_Filter', 'Topic 4: Advanced Filter', 'Criteria Ranges, Multi-Row OR Logic, Unique Rows', 'Naihati Wholesale Billing Ledger', '35', 'Extract complex Boolean subsets to new range'],
    ['Topic5_Slicers', 'Topic 5: Visual Slicers', 'Interactive 1-Click Slicer Dashboard Buttons', 'Barrackpore Multi-Branch Performance Grid', '40', 'Connect interactive visual filter buttons'],
    ['Topic6_SUBTOTAL', 'Topic 6: SUBTOTAL Function', 'Dynamic Subtotals with Function Code 109', 'Kolkata Corporate Distribution Master', '50', 'Calculate sums on filtered rows only'],
    ['Topic7_Dashboard_Practice', 'Topic 7: Practice Session', 'Dynamic Slicer & Filter Multi-Table Dashboard', 'Barrackpore Commercial Operations Roster', '45', 'Build interactive multi-slicer table dashboard'],
    ['Topic8_Tables_Assessment', 'Topic 8: Assessment & Quiz', 'Structured Tables & Data Wrangling Exam', 'Candidate Table Manipulation Scorecard', '35', 'End-to-end table transformation assessment']
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

  const branches = ['Barrackpore', 'Shyamnagar', 'Ichapur', 'Naihati', 'Titagarh', 'Kolkata HQ', 'Kankinara', 'Sodepur'];
  const depts = ['Software Engineering', 'Taxation & Accounts', 'Financial Analytics', 'Corporate Operations'];
  const students = ['Swadeep Banerjee', 'Tuhina Mukherjee', 'Abhronila Das', 'Susmita Roy', 'Debangshu Ghosh', 'Rahul Sen', 'Priya Saha', 'Aniket Das'];

  // Topic0 Sheet
  const t0Cols = [
    { header: 'Student_ID', key: 'id', width: 16 },
    { header: 'Student_Name', key: 'name', width: 22 },
    { header: 'Branch', key: 'br', width: 18 },
    { header: 'Department', key: 'dept', width: 24 },
    { header: 'Tuition_Fee', key: 'fee', width: 18 },
    { header: 'GST_18%', key: 'gst', width: 18 },
    { header: 'Total_Payable', key: 'tot', width: 20 }
  ];
  const t0Data = [];
  for (let i = 0; i < 40; i++) {
    const fee = 15000 + (i % 6) * 3500;
    t0Data.push([`STU-${1000 + i}`, students[i % students.length], branches[i % branches.length], depts[i % depts.length], fee, `=[@Tuition_Fee]*0.18`, `=[@Tuition_Fee]+[@GST_18%]`]);
  }
  addStyledTopicSheet('Topic0_Excel_Tables', 'FF0F172A', t0Cols, t0Data);

  // Topic1 Sheet
  const t1Cols = [
    { header: 'Invoice_No', key: 'inv', width: 18 },
    { header: 'Client_Name', key: 'client', width: 24 },
    { header: 'Branch', key: 'br', width: 18 },
    { header: 'Units', key: 'units', width: 14 },
    { header: 'Unit_Price', key: 'price', width: 16 },
    { header: 'Gross_Amount', key: 'gross', width: 20 },
    { header: 'Discount_10%', key: 'disc', width: 18 },
    { header: 'Net_Amount', key: 'net', width: 20 }
  ];
  const t1Data = [];
  for (let i = 0; i < 45; i++) {
    const u = 10 + (i % 8) * 5;
    const p = 1200 + (i % 5) * 450;
    t1Data.push([`INV-${202600 + i}`, students[i % students.length], branches[i % branches.length], u, p, `=[@Units]*[@Unit_Price]`, `=[@Gross_Amount]*0.10`, `=[@Gross_Amount]-[@Discount_10%]`]);
  }
  addStyledTopicSheet('Topic1_Table_Features', 'FF0284C7', t1Cols, t1Data);

  // Topic2 Sheet: Multi Sort
  const t2Cols = [
    { header: 'Emp_ID', key: 'id', width: 16 },
    { header: 'Employee_Name', key: 'name', width: 22 },
    { header: 'Region', key: 'reg', width: 18 },
    { header: 'Division', key: 'div', width: 24 },
    { header: 'Monthly_Sales', key: 'sales', width: 20 },
    { header: 'Performance_Tier', key: 'tier', width: 20 }
  ];
  const t2Data = [];
  for (let i = 0; i < 40; i++) {
    const s = 180000 + (i % 12) * 25000;
    t2Data.push([`EMP-${500 + i}`, students[i % students.length], branches[i % branches.length], depts[i % depts.length], s, `=[@Monthly_Sales]>=350000`]);
  }
  addStyledTopicSheet('Topic2_Multi_Sort', 'FF059669', t2Cols, t2Data);

  // Topic3 Sheet: AutoFilter
  const t3Cols = [
    { header: 'Item_Code', key: 'code', width: 16 },
    { header: 'Item_Description', key: 'desc', width: 28 },
    { header: 'Warehouse', key: 'wh', width: 18 },
    { header: 'Current_Stock', key: 'stock', width: 16 },
    { header: 'Reorder_Level', key: 'reorder', width: 16 },
    { header: 'Action_Required', key: 'act', width: 20 }
  ];
  const items = ['Dell Precision 3660 Workstation', 'HP EliteBook 840 G10', 'Lenovo ThinkPad P16', 'Cisco Gigabit Switch 24-Port', 'Samsung 34" Curved Monitor'];
  const t3Data = [];
  for (let i = 0; i < 40; i++) {
    const st = 5 + (i * 7) % 45;
    const re = 20;
    t3Data.push([`SKU-${9000 + i}`, items[i % items.length], branches[i % branches.length], st, re, `=[@Current_Stock]<=[@Reorder_Level]`]);
  }
  addStyledTopicSheet('Topic3_AutoFilter', 'FF7C3AED', t3Cols, t3Data);

  // Topic4 Sheet: Advanced Filter
  const t4Cols = [
    { header: 'Order_ID', key: 'oid', width: 16 },
    { header: 'Customer', key: 'cust', width: 22 },
    { header: 'City', key: 'city', width: 18 },
    { header: 'Order_Total', key: 'tot', width: 20 },
    { header: 'Payment_Method', key: 'pay', width: 20 },
    { header: 'Order_Status', key: 'stat', width: 18 }
  ];
  const t4Data = [];
  for (let i = 0; i < 35; i++) {
    t4Data.push([`ORD-${8800 + i}`, students[i % students.length], branches[i % branches.length], 45000 + (i * 3200) % 80000, i % 2 === 0 ? 'NEFT / RTGS' : 'UPI Instant', i % 3 === 0 ? 'DISPATCHED' : 'DELIVERED']);
  }
  addStyledTopicSheet('Topic4_Advanced_Filter', 'FFD97706', t4Cols, t4Data);

  // Topic5 Sheet: Slicers
  const t5Cols = [
    { header: 'Record_ID', key: 'rid', width: 16 },
    { header: 'Branch', key: 'br', width: 18 },
    { header: 'Category', key: 'cat', width: 24 },
    { header: 'Sales_Rep', key: 'rep', width: 22 },
    { header: 'Quarterly_Target', key: 'tgt', width: 20 },
    { header: 'Quarterly_Actual', key: 'act', width: 20 }
  ];
  const t5Data = [];
  for (let i = 0; i < 40; i++) {
    t5Data.push([`REC-${7700 + i}`, branches[i % branches.length], depts[i % depts.length], students[i % students.length], 500000, 480000 + (i * 12000) % 150000]);
  }
  addStyledTopicSheet('Topic5_Slicers', 'FF0F172A', t5Cols, t5Data);

  // Topic6 Sheet: SUBTOTAL
  const t6Cols = [
    { header: 'Batch_ID', key: 'bid', width: 16 },
    { header: 'Location', key: 'loc', width: 18 },
    { header: 'Department', key: 'dept', width: 22 },
    { header: 'Operating_Cost', key: 'cost', width: 20 },
    { header: 'Revenue', key: 'rev', width: 20 },
    { header: 'Net_Operating_Margin', key: 'margin', width: 24 }
  ];
  const t6Data = [];
  for (let i = 0; i < 50; i++) {
    const cost = 250000 + (i * 8000) % 120000;
    const rev = 380000 + (i * 14000) % 200000;
    t6Data.push([`BAT-${6600 + i}`, branches[i % branches.length], depts[i % depts.length], cost, rev, rev - cost]);
  }
  addStyledTopicSheet('Topic6_SUBTOTAL', 'FF0284C7', t6Cols, t6Data);

  // Topic7 Sheet: Dashboard Practice
  const t7Cols = [
    { header: 'Dashboard_Ref', key: 'dref', width: 18 },
    { header: 'Branch_Center', key: 'bc', width: 20 },
    { header: 'Product_Segment', key: 'seg', width: 24 },
    { header: 'Lead_Specialist', key: 'lead', width: 22 },
    { header: 'Annual_Quota', key: 'qta', width: 20 },
    { header: 'Realized_Revenue', key: 'real', width: 22 },
    { header: 'Variance_%', key: 'var', width: 18 }
  ];
  const t7Data = [];
  for (let i = 0; i < 45; i++) {
    const qta = 1200000;
    const real = 1150000 + (i * 24000) % 350000;
    t7Data.push([`DSH-${5500 + i}`, branches[i % branches.length], depts[i % depts.length], students[i % students.length], qta, real, `=(F${i+2}-E${i+2})/E${i+2}`]);
  }
  addStyledTopicSheet('Topic7_Dashboard_Practice', 'FF059669', t7Cols, t7Data);

  // Topic8 Sheet: Assessment
  const t8Cols = [
    { header: 'Candidate_ID', key: 'cid', width: 16 },
    { header: 'Candidate_Name', key: 'cname', width: 22 },
    { header: 'Exam_Branch', key: 'ebr', width: 18 },
    { header: 'Table_Syntax_Score', key: 's1', width: 20 },
    { header: 'Filter_Logic_Score', key: 's2', width: 20 },
    { header: 'Slicer_Setup_Score', key: 's3', width: 20 },
    { header: 'Total_Score', key: 'tot', width: 18 },
    { header: 'Qualification', key: 'qual', width: 20 }
  ];
  const t8Data = [];
  students.forEach((st, i) => {
    const s1 = 28 + (i * 2) % 6;
    const s2 = 29 + (i * 3) % 5;
    const s3 = 33 + (i * 4) % 6;
    t8Data.push([`CAND-${4400 + i}`, st, branches[i % branches.length], s1, s2, s3, `=D${i+2}+E${i+2}+F${i+2}`, `=IF(G${i+2}>=85, "EXCELLENCE", "PASS")`]);
  });
  addStyledTopicSheet('Topic8_Tables_Assessment', 'FF7C3AED', t8Cols, t8Data);

  const outputPath = path.join(excelFilesDir, 'tables_sorting_filtering.xlsx');
  await wb.xlsx.writeFile(outputPath);
  console.log('✓ Successfully generated updated tables_sorting_filtering.xlsx with all 9 topic sheets');
}

buildWorkbook005().catch(console.error);
