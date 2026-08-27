const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

const moduleDir = __dirname;
const excelFilesDir = path.join(moduleDir, 'excel_files');
if (!fs.existsSync(excelFilesDir)) fs.mkdirSync(excelFilesDir, { recursive: true });

async function buildWorkbook004() {
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
  bSub2.value = 'EXCEL MASTERCLASS: Module 1.4 - Basic Charts, Visual Storytelling & Dashboard Design\nCurriculum Code: EXCEL-PRO-901 | Student Practice & Laboratory Workbook';
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
    ['Curriculum Track', 'EXCEL-PRO-901: Microsoft Excel From Zero to Ultra Expert', 'Module Reference', '001_004_basic-charts-and-visualizations'],
    ['Competency Level', 'CO1: Visual Storytelling, Chart Design & Formatting', 'Total Topics', '9 Comprehensive Topics & 270 FAQ Questions'],
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
    ['Topic0_Chart_Guide', 'Topic 0: Chart Selection', 'Matching Business Stories to Visual Encodings', 'Barrackpore Multi-Branch Sales Matrix', '30', 'Select optimal chart type per KPI'],
    ['Topic1_Column_Bar', 'Topic 1: Column & Bar Charts', 'Discrete Categorical Comparison & Ranking', 'Kolkata Enterprise Product Sales Roster', '35', 'Plot vertical column & horizontal bar charts'],
    ['Topic2_Line_Area', 'Topic 2: Line & Area Charts', 'Time-Series Trends & Cumulative Series', 'Shyamnagar Monthly Revenue & Expense Series', '36', 'Plot multi-year monthly trajectory trends'],
    ['Topic3_Pie_Doughnut', 'Topic 3: Pie & Doughnut', 'Part-to-Whole Composition (Max 5 Slices)', 'Ichapur Factory Budget Allocation Matrix', '25', 'Construct clean doughnut ratio charts'],
    ['Topic4_Combo_DualAxis', 'Topic 4: Combo Charts', 'Dual-Axis Metrics (Revenue vs Margin %)', 'Naihati Distribution Channel Performance', '30', 'Configure high-contrast combo charts'],
    ['Topic5_Sparklines', 'Topic 5: Sparklines', 'In-Cell Micro Trendlines & Win/Loss', 'Barrackpore Branch Monthly KPI Tracker', '35', 'Insert in-cell sparklines for quarterly tracking'],
    ['Topic6_Best_Practices', 'Topic 6: Chart Best Practices', 'Color Harmony, Label Placement, Decluttering', 'Kolkata Enterprise Division Summary', '30', 'Format executive ready presentation charts'],
    ['Topic7_Chart_Pack_Practice', 'Topic 7: Practice Session', 'Building a Corporate Business Chart Pack', 'Barrackpore HQ Executive Pack', '40', 'Consolidate 4 chart views into 1 sheet'],
    ['Topic8_Charts_Assessment', 'Topic 8: Assessment & Quiz', 'Visual Storytelling & Chart Design Exam', 'Comprehensive Chart Evaluation Matrix', '35', 'Capstone chart design and error debugging']
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
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // Topic0 Sheet
  const t0Cols = [
    { header: 'Business_Scenario', key: 'scen', width: 28 },
    { header: 'Primary_Metric', key: 'metric', width: 22 },
    { header: 'Recommended_Chart', key: 'chart', width: 22 },
    { header: 'Secondary_Option', key: 'alt', width: 20 },
    { header: 'Design_Rationale', key: 'why', width: 34 }
  ];
  const t0Data = [
    ['Monthly Sales Trend', 'Revenue (INR)', 'Line Chart', 'Area Chart', 'Shows continuous movement across uniform time intervals'],
    ['Branch Revenue Comparison', 'Sales (INR)', 'Clustered Column', 'Bar Chart', 'Compares discrete discrete categorical groups side-by-side'],
    ['Market Share Ratio', 'Percentage %', 'Doughnut Chart', 'Treemap', 'Part-to-whole comparison with 5 or fewer categories'],
    ['Revenue vs Net Margin %', 'Dual Metric', 'Combo Chart', 'Scatter Plot', 'Combines scale ranges via secondary vertical axis'],
    ['In-Cell Quarterly Trends', 'Mini Trajectory', 'Line Sparklines', 'Column Sparklines', 'Embeds micro-charts directly inside summary table cells']
  ];
  addStyledTopicSheet('Topic0_Chart_Guide', 'FF0F172A', t0Cols, t0Data);

  // Topic1 Sheet: Column & Bar
  const t1Cols = [
    { header: 'Branch_Location', key: 'branch', width: 22 },
    { header: 'Target_Sales (INR)', key: 'target', width: 22 },
    { header: 'Actual_Sales (INR)', key: 'actual', width: 22 },
    { header: 'Achievement_%', key: 'ach', width: 18 },
    { header: 'Variance_Status', key: 'status', width: 22 }
  ];
  const t1Data = [];
  branches.forEach((b, i) => {
    const target = 1000000 + i * 150000;
    const actual = 950000 + i * 180000;
    t1Data.push([b, target, actual, `=C${i+2}/B${i+2}`, `=IF(C${i+2}>=B${i+2}, "SURPLUS", "DEFICIT")`]);
  });
  addStyledTopicSheet('Topic1_Column_Bar', 'FF0F172A', t1Cols, t1Data);

  // Topic2 Sheet: Line & Area
  const t2Cols = [
    { header: 'Month', key: 'm', width: 16 },
    { header: 'FY2025_Revenue', key: 'r25', width: 20 },
    { header: 'FY2026_Revenue', key: 'r26', width: 20 },
    { header: 'Monthly_Expenses', key: 'exp', width: 20 },
    { header: 'Net_Operating_Profit', key: 'nop', width: 24 }
  ];
  const t2Data = [];
  months.forEach((m, i) => {
    const r25 = 450000 + i * 25000;
    const r26 = 520000 + i * 32000;
    const exp = 300000 + i * 12000;
    t2Data.push([m, r25, r26, exp, `=C${i+2}-D${i+2}`]);
  });
  addStyledTopicSheet('Topic2_Line_Area', 'FF0284C7', t2Cols, t2Data);

  // Topic3 Sheet: Pie & Doughnut
  const t3Cols = [
    { header: 'Cost_Centre', key: 'cc', width: 24 },
    { header: 'Annual_Budget (INR)', key: 'bgt', width: 22 },
    { header: 'Actual_Spend (INR)', key: 'spd', width: 22 },
    { header: 'Share_of_Total', key: 'pct', width: 18 }
  ];
  const t3Data = [
    ['Engineering & IT', 3500000, 3420000, '=C2/SUM($C$2:$C$6)'],
    ['Operations & Logistics', 2800000, 2750000, '=C3/SUM($C$2:$C$6)'],
    ['Sales & Marketing', 2200000, 2350000, '=C4/SUM($C$2:$C$6)'],
    ['Finance & Tax Compliance', 1500000, 1420000, '=C5/SUM($C$2:$C$6)'],
    ['Administration & HR', 1000000, 980000, '=C6/SUM($C$2:$C$6)']
  ];
  addStyledTopicSheet('Topic3_Pie_Doughnut', 'FF059669', t3Cols, t3Data);

  // Topic4 Sheet: Combo Dual Axis
  const t4Cols = [
    { header: 'Region', key: 'reg', width: 20 },
    { header: 'Gross_Revenue (INR)', key: 'rev', width: 22 },
    { header: 'Units_Sold', key: 'units', width: 18 },
    { header: 'Profit_Margin_%', key: 'pm', width: 20 }
  ];
  const t4Data = [];
  branches.forEach((b, i) => {
    t4Data.push([b, 2500000 + i * 350000, 450 + i * 60, 0.18 + (i % 4) * 0.03]);
  });
  addStyledTopicSheet('Topic4_Combo_DualAxis', 'FF7C3AED', t4Cols, t4Data);

  // Topic5 Sheet: Sparklines
  const t5Cols = [
    { header: 'Employee_Name', key: 'emp', width: 22 },
    { header: 'Branch', key: 'br', width: 18 },
    { header: 'Q1_Score', key: 'q1', width: 14 },
    { header: 'Q2_Score', key: 'q2', width: 14 },
    { header: 'Q3_Score', key: 'q3', width: 14 },
    { header: 'Q4_Score', key: 'q4', width: 14 },
    { header: 'Annual_Trend_Sparkline', key: 'trend', width: 24 }
  ];
  const students = ['Swadeep Banerjee', 'Tuhina Mukherjee', 'Abhronila Das', 'Susmita Roy', 'Debangshu Ghosh', 'Rahul Sen', 'Priya Saha', 'Aniket Das'];
  const t5Data = [];
  students.forEach((st, i) => {
    t5Data.push([st, branches[i % branches.length], 78 + (i*3)%18, 82 + (i*4)%15, 85 + (i*2)%14, 91 + (i*5)%9, 'Insert Sparkline -> Line']);
  });
  addStyledTopicSheet('Topic5_Sparklines', 'FFD97706', t5Cols, t5Data);

  // Topic6 Sheet: Best Practices
  const t6Cols = [
    { header: 'Chart_Component', key: 'comp', width: 24 },
    { header: 'Common_Mistake', key: 'bad', width: 28 },
    { header: 'Best_Practice_Standard', key: 'good', width: 34 },
    { header: 'Executive_Impact', key: 'imp', width: 26 }
  ];
  const t6Data = [
    ['3D Effects & Tilts', 'Using 3D Column/Pie charts', 'Use flat 2D high-contrast designs', 'Eliminates optical illusions & distortion'],
    ['Gridlines', 'Heavy dark black gridlines', 'Use soft light slate lines or none', 'Reduces cognitive clutter and chart junk'],
    ['Legends', 'Crowded floating legend boxes', 'Use direct data labels on series ends', 'Enables instant recognition in < 3 seconds'],
    ['Axis Truncation', 'Starting bar charts above zero', 'Always anchor bar/column charts at 0', 'Prevents misleading percentage variances']
  ];
  addStyledTopicSheet('Topic6_Best_Practices', 'FF0F172A', t6Cols, t6Data);

  // Topic7 Sheet: Chart Pack Practice
  const t7Cols = [
    { header: 'Product_Line', key: 'prod', width: 24 },
    { header: 'Branch', key: 'br', width: 18 },
    { header: 'FY25_Units', key: 'u25', width: 16 },
    { header: 'FY26_Units', key: 'u26', width: 16 },
    { header: 'YoY_Growth_%', key: 'yoy', width: 18 },
    { header: 'Target_Met', key: 'met', width: 18 }
  ];
  const prods = ['Tally Accounting Suite', 'Advanced Excel Corporate Pack', 'Python Analytics Server', 'Cloud BI Reporting Kit'];
  const t7Data = [];
  for (let i = 0; i < 35; i++) {
    const p = prods[i % prods.length];
    const b = branches[i % branches.length];
    const u25 = 120 + i * 15;
    const u26 = 140 + i * 22;
    t7Data.push([p, b, u25, u26, `=(D${i+2}-C${i+2})/C${i+2}`, `=IF(E${i+2}>0.1, "YES", "NO")`]);
  }
  addStyledTopicSheet('Topic7_Chart_Pack_Practice', 'FF0284C7', t7Cols, t7Data);

  // Topic8 Sheet: Assessment
  const t8Cols = [
    { header: 'Question_ID', key: 'qid', width: 16 },
    { header: 'Candidate_Name', key: 'cand', width: 22 },
    { header: 'Chart_Domain', key: 'dom', width: 22 },
    { header: 'Design_Score', key: 'dscore', width: 16 },
    { header: 'Accuracy_Score', key: 'ascore', width: 16 },
    { header: 'Total_Score', key: 'tscore', width: 16 },
    { header: 'Grade', key: 'gr', width: 16 }
  ];
  const t8Data = [];
  students.forEach((st, i) => {
    const d = 42 + (i * 2) % 8;
    const a = 45 + (i * 3) % 5;
    t8Data.push([`Q-CHART-${101 + i}`, st, 'Executive Dashboard Pack', d, a, `=D${i+2}+E${i+2}`, `=IF(F${i+2}>=85, "A+ DISTINCTION", "A PASS")`]);
  });
  addStyledTopicSheet('Topic8_Charts_Assessment', 'FF7C3AED', t8Cols, t8Data);

  const outputPath = path.join(excelFilesDir, 'basic_charts.xlsx');
  await wb.xlsx.writeFile(outputPath);
  console.log('✓ Successfully generated updated basic_charts.xlsx with all 9 topic sheets');
}

buildWorkbook004().catch(console.error);
