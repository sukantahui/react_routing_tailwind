const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

const excelBaseDir = 'E:/react_routing_tailwind/src/components/study/excel';
const moduleDir = path.join(excelBaseDir, 'topics/001_004_basic-charts-and-visualizations');
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
        if (mod.slug === '001_004_basic-charts-and-visualizations') {
          topicsFromTree = mod.topics || [];
          break;
        }
      }
    }
  } catch (err) {
    console.warn("Could not parse excel-basic-to-advanced.json:", err.message);
  }
}

// Complete 9 Topic Definitions matching JSON topics array for module 001_004
const topicsData = [
  {
    topicId: "Topic0",
    sheetName: "Topic0",
    title: topicsFromTree[0] || "Chart Selection Guide: Matching Business Data Stories to Optimal Chart Types",
    difficulty: "Beginner",
    mask: "Categorical Comparison -> Column / Bar",
    rawExample: "145000.00",
    renderedExample: "₹ 1,45,000.00",
    description: "Match business data stories (comparison, trend, part-to-whole, correlation) to optimal chart types."
  },
  {
    topicId: "Topic1",
    sheetName: "Topic1",
    title: topicsFromTree[1] || "Column and Bar Charts: Comparing Discrete Categories, Ranking and Variance Analysis",
    difficulty: "Beginner",
    mask: "Clustered Column | Stacked Bar",
    rawExample: "85400.00",
    renderedExample: "₹ 85,400.00",
    description: "Build clustered column and horizontal bar charts for categorical ranking and variance analysis."
  },
  {
    topicId: "Topic2",
    sheetName: "Topic2",
    title: topicsFromTree[2] || "Line and Area Charts: Visualizing Chronological Trends, Seasonality and Cumulative Trajectories",
    difficulty: "Beginner",
    mask: "2D Line with Markers | Stacked Area",
    rawExample: "125400.00",
    renderedExample: "₹ 1,25,400.00",
    description: "Plot monthly chronological revenue trends, seasonal spikes, and cumulative volume growth."
  },
  {
    topicId: "Topic3",
    sheetName: "Topic3",
    title: topicsFromTree[3] || "Pie and Doughnut Charts: Part-to-Whole Proportions, Slice Limits and Modern Best Practices",
    difficulty: "Beginner",
    mask: "Doughnut Chart (Max 5 Slices)",
    rawExample: "0.35",
    renderedExample: "35.0%",
    description: "Format part-to-whole market share percentages using donut charts with clean callout leaders."
  },
  {
    topicId: "Topic4",
    sheetName: "Topic4",
    title: topicsFromTree[4] || "Mastering Chart Elements: Titles, Legends, Data Labels, Dual-Axes and Gridline Decluttering",
    difficulty: "Intermediate",
    mask: "Dual-Axis (Column + Secondary Line)",
    rawExample: "450000.00",
    renderedExample: "₹ 4,50,000.00",
    description: "Structure dynamic chart titles, custom data labels, decluttered gridlines, and dual-axis combo charts."
  },
  {
    topicId: "Topic5",
    sheetName: "Topic5",
    title: topicsFromTree[5] || "Formatting and Visual Polish: Corporate Color Palettes, Callout Cards and Modern Dashboard Aesthetics",
    difficulty: "Intermediate",
    mask: "Corporate Palette (#0284C7 Sky Theme)",
    rawExample: "98500.00",
    renderedExample: "₹ 98,500.00",
    description: "Apply executive color palettes, high-contrast callout metric cards, and decluttered dashboard aesthetics."
  },
  {
    topicId: "Topic6",
    sheetName: "Topic6",
    title: topicsFromTree[6] || "Comprehensive Laboratory Practice Session: Chart Creation, Customization and Executive Dashboard Construction",
    difficulty: "Intermediate",
    mask: '=REPT("█", E4/2000)',
    rawExample: "24500.00",
    renderedExample: "████████████ (In-Cell Chart)",
    description: "Construct executive dashboards and generate in-cell micro-sparkline charts using REPT function."
  },
  {
    topicId: "Topic7",
    sheetName: "Topic7",
    title: topicsFromTree[7] || "Project Work: Real-World Application of Basic Charts and Visualizations",
    difficulty: "Advanced",
    mask: "EX501-EX525 Master Visualization Practice",
    rawExample: "1850000.00",
    renderedExample: "₹ 18,50,000.00",
    description: "Capstoning visualization mastery with 25 workplace modeling projects in the master workbook."
  },
  {
    topicId: "Topic8",
    sheetName: "Topic8",
    title: topicsFromTree[8] || "Quick Check Quiz & Visual Storytelling Assessment",
    difficulty: "Intermediate",
    mask: "=NA() (Chart Gap Handler)",
    rawExample: "N/A",
    renderedExample: "#N/A (Suppressed Gap)",
    description: "Verifying data visualization principles, chart choice selection rules, and handling missing data gaps with NA()."
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
  bSub2.value = `Module 4: 001_004_basic-charts-and-visualizations\nCurriculum Track: EXCEL-PRO-901 | Master Student Practice Workbook (9 Sequential Topics)`;
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

  // Section 2 Header: Navigation Directory (Topics Sequence: Topic0 to Topic8)
  wsOverview.mergeCells('A34:F34');
  const s4Header = wsOverview.getCell('A34');
  s4Header.value = '📑 2. WORKBOOK TOPICS DIRECTORY & CLICK-TO-JUMP NAVIGATION TABLE';
  s4Header.font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: 'FFFFFFFF' } };
  s4Header.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD97706' } };

  const directoryHeaders = ['Sheet ID (Click to Jump)', 'Curriculum Topic Title', 'Difficulty Level', 'Target Chart Type / Formula', 'Status'];
  const headerRow = wsOverview.getRow(35);
  headerRow.height = 26;
  directoryHeaders.forEach((h, cIdx) => {
    const cell = headerRow.getCell(cIdx + 1);
    cell.value = h;
    cell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E293B' } };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
  });

  // Render Directory Rows for Topic0 through Topic8
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
  // 2. CREATE TOPIC WORKSHEETS IN SEQUENTIAL ORDER (Topic0 to Topic8)
  // =========================================================================
  const sampleNames = ['Swadeep Hui', 'Tuhina Das', 'Abhronila Ray', 'Susmita Sen', 'Debangshu Roy', 'Rahul Kumar', 'Priya Sharma', 'Aniket Verma', 'Sourav Ganguly', 'Sneha Ghosh', 'Arpan Dey', 'Subhajit Pal', 'Riya Sarkar', 'Dipankar Mitra', 'Barnali Dutta', 'Vikram Singh', 'Kavita Nair', 'Amitabh Basu', 'Pooja Bannerjee', 'Sanjay Chakraborty', 'Tanmoy Das', 'Mousumi Mukhopadhyay', 'Bikash Chatterjee', 'Sayani Bose', 'Aritra Sen', 'Niladri Roy', 'Paromita Guha', 'Siddharth Mallick', 'Trisha Roy', 'Kaushik Hazra'];
  const sampleCities = ['Barrackpore', 'Shyamnagar', 'Ichapur', 'Naihati', 'Titagarh', 'Kolkata', 'Howrah', 'Hooghly', 'Kanchrapara', 'Sodepur'];
  const sampleDepts = ['Finance', 'Accounts', 'Engineering', 'HR', 'Logistics', 'Procurement', 'Taxation', 'Audit'];

  topicsData.forEach((topic, tIdx) => {
    const colSpecs = [
      { header: 'Record_ID', key: 'id' },
      { header: 'Region / Category Name', key: 'name' },
      { header: 'Department / Product Line', key: 'dept' },
      { header: 'Campus Location', key: 'city' },
      { header: 'Quarterly Metric Volume', key: 'rawVal' },
      { header: 'Target Visual Format / Formula', key: 'mask' },
      { header: 'Rendered Chart Display', key: 'rendered' },
      { header: 'Audit Status', key: 'stat' }
    ];

    const richRows = Array.from({ length: 30 }, (_, i) => [
      `${topic.sheetName}-${String(i + 1).padStart(2, '0')}`,
      sampleNames[i % sampleNames.length],
      sampleDepts[i % sampleDepts.length],
      sampleCities[i % sampleCities.length],
      25000 + i * 4250 + (tIdx * 200),
      topic.mask,
      topic.renderedExample,
      'Verified & Audit Passed'
    ]);

    addStyledSheet(
      topic.sheetName,
      'FF0F172A',
      colSpecs,
      richRows
    );
  });

  // Save Workbook Output Files
  const outputPath = path.join(excelFilesDir, '001_004_basic_charts_and_visualizations_master.xlsx');
  await wb.xlsx.writeFile(outputPath);
  console.log(`✓ Rebuilt 001_004_basic_charts_and_visualizations_master.xlsx with 10 sequential sheets (Overview + Topic0..Topic8)`);
  
  // Also save copy to ensure compatibility across all import paths
  fs.copyFileSync(outputPath, path.join(excelFilesDir, 'basic_charts_and_visualizations_master.xlsx'));
  fs.copyFileSync(outputPath, path.join(excelFilesDir, 'basic_charts.xlsx'));
}

buildWorkbook().catch(console.error);
