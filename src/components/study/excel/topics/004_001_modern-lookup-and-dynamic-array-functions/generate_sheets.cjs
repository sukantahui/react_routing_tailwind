const ExcelJS = require('E:/react_routing_tailwind/node_modules/exceljs');
const fs = require('fs');
const path = require('path');

const excelBaseDir = 'E:/react_routing_tailwind/src/components/study/excel';
const moduleDir = path.join(excelBaseDir, 'topics/004_001_modern-lookup-and-dynamic-array-functions');
const excelFilesDir = path.join(moduleDir, 'excel_files');
if (!fs.existsSync(excelFilesDir)) fs.mkdirSync(excelFilesDir, { recursive: true });

const sampleReps = [
  'Swadeep Banerjee', 'Tuhina Mukherjee', 'Abhronila Das', 'Debangshu Roy',
  'Susmita Sen', 'Rahul Kumar', 'Priya Sharma', 'Aniket Verma',
  'Sourav Ganguly', 'Sneha Ghosh', 'Arpan Dey', 'Subhajit Pal',
  'Riya Sarkar', 'Dipankar Mitra', 'Barnali Dutta', 'Vikram Singh',
  'Kavita Nair', 'Amitabh Basu', 'Pooja Bannerjee', 'Sanjay Chakraborty',
  'Tanmoy Das', 'Mousumi Mukhopadhyay', 'Bikash Chatterjee', 'Sayani Bose',
  'Aritra Sen', 'Niladri Roy', 'Paromita Guha', 'Siddharth Mallick',
  'Trisha Roy', 'Kaushik Hazra'
];

const departments = ['Enterprise Software', 'Financial Cloud', 'Cybersecurity', 'AI Solutions', 'DevOps & Infra', 'Data Analytics', 'Tax & Compliance', 'Digital Advisory'];
const regions = ['East', 'West', 'North', 'South', 'Central'];
const productCategories = ['Cloud License', 'Enterprise ERP', 'SaaS Security', 'Advisory Retainer', 'Implementation Sprint', 'Annual Support SLA'];
const dealRatings = ['Tier 1 Gold', 'Tier 2 Silver', 'Tier 3 Bronze', 'Strategic Key Account'];

function generateSalesData(prefix = 'TX') {
  return Array.from({ length: 30 }, (_, i) => {
    const units = 10 + ((i * 7) % 45);
    const unitPrice = 2500 + ((i * 350) % 8500);
    const gross = units * unitPrice;
    const discountPct = (i % 5) * 0.05;
    const netRevenue = Math.round(gross * (1 - discountPct));
    return [
      `${prefix}-${String(1001 + i)}`,
      sampleReps[i % sampleReps.length],
      departments[i % departments.length],
      regions[i % regions.length],
      productCategories[i % productCategories.length],
      units,
      unitPrice,
      discountPct,
      netRevenue,
      dealRatings[i % dealRatings.length],
      i % 6 === 0 ? 'Pending Review' : 'Completed'
    ];
  });
}

const TOPIC_SPECS = [
  {
    sheetId: 'EX1601',
    topicIndex: 0,
    title: 'Understanding Modern Dynamic Array Spill Engine (#SPILL!)',
    formula: '=UNIQUE(C7:C36)',
    desc: 'Extract distinct departments dynamically from the source transactions grid.',
    color: 'FF0284C7'
  },
  {
    sheetId: 'EX1602',
    topicIndex: 1,
    title: 'The Spill Operator (#) & Dynamic Range Referencing',
    formula: '=SUM(I7#)',
    desc: 'Aggregate entire spilled net revenue array dynamically using the # reference operator.',
    color: 'FF0284C7'
  },
  {
    sheetId: 'EX1603',
    topicIndex: 2,
    title: 'Extracting Distinct Data with UNIQUE (Single & Multi-Column)',
    formula: '=UNIQUE(CHOOSECOLS(A7:K36, 3, 4))',
    desc: 'Extract multi-column distinct Department and Region tuples across all transactions.',
    color: 'FF0284C7'
  },
  {
    sheetId: 'EX1604',
    topicIndex: 3,
    title: 'Dynamic Multi-Condition Filtering with FILTER Function',
    formula: '=FILTER(A7:I36, (D7:D36="East")*(I7:I36>50000), "No Orders Found")',
    desc: 'Filter all East region transactions generating over ₹50,000 net revenue.',
    color: 'FF0284C7'
  },
  {
    sheetId: 'EX1605',
    topicIndex: 4,
    title: 'Dynamic Sorting with SORT (Single & Multi-Index)',
    formula: '=SORT(FILTER(A7:I36, I7:I36>40000), 9, -1)',
    desc: 'Sort high-value deals by column 9 (Net Revenue) in descending order.',
    color: 'FF059669'
  },
  {
    sheetId: 'EX1606',
    topicIndex: 5,
    title: 'Multi-Level Custom Sorting with SORTBY on Auxiliary Columns',
    formula: '=SORTBY(B7:B36, D7:D36, 1, I7:I36, -1)',
    desc: 'Sort Sales Rep names alphabetically by Region, then by highest Net Revenue.',
    color: 'FF059669'
  },
  {
    sheetId: 'EX1607',
    topicIndex: 6,
    title: 'Generating Number & Date Sequences with SEQUENCE',
    formula: '=SEQUENCE(10, 4, 1000, 250)',
    desc: 'Generate a 10-row by 4-column projection matrix of revenue milestones.',
    color: 'FF059669'
  },
  {
    sheetId: 'EX1608',
    topicIndex: 7,
    title: 'Master Lab Exercises: Modern Lookup & Dynamic Arrays',
    formula: '=SORT(UNIQUE(FILTER(B7:B36, D7:D36="East")))',
    desc: 'Master comprehensive multi-function dynamic array laboratory challenge.',
    color: 'FF4F46E5'
  },
  {
    sheetId: 'EX1609',
    topicIndex: 8,
    title: 'Combining FILTER + UNIQUE + SORT for Searchable Menus',
    formula: '=SORT(UNIQUE(FILTER(B7:B36, ISNUMBER(SEARCH("a", B7:B36)))))',
    desc: 'Construct self-updating, alphabetical dropdown feed containing specific characters.',
    color: 'FF4F46E5'
  },
  {
    sheetId: 'EX1610',
    topicIndex: 9,
    title: 'Resolving #SPILL! Errors: Grid Collisions & Range Clashes',
    formula: '=SORT(UNIQUE(C7:C36))',
    desc: 'Demonstrate spill boundary allocation and clear cell blocking obstructions.',
    color: 'FFDC2626'
  },
  {
    sheetId: 'EX1611',
    topicIndex: 10,
    title: 'Dynamic 2-Way Lookups with XLOOKUP Spilling Entire Rows',
    formula: '=XLOOKUP(M7#, A7:A36, B7:I36, "Unknown")',
    desc: 'Perform vectorized lookups returning multi-column customer profiles in real time.',
    color: 'FF0891B2'
  },
  {
    sheetId: 'EX1612',
    topicIndex: 11,
    title: 'Dynamic Data Validation Dropdown Lists Fed by Spilled Arrays',
    formula: '=N7#',
    desc: 'Bind Excel In-Cell Data Validation dropdown lists directly to dynamic spill ranges.',
    color: 'FF0891B2'
  },
  {
    sheetId: 'EX1613',
    topicIndex: 12,
    title: 'Automated Live Search & Filter Table Engine Without VBA',
    formula: '=FILTER(A7:I36, ISNUMBER(SEARCH(M4, B7:B36)), "No Matches")',
    desc: 'Interactive search dashboard updating immediately upon query cell change.',
    color: 'FFD97706'
  },
  {
    sheetId: 'EX1614',
    topicIndex: 13,
    title: 'Practice Lab: Multi-Criteria Customer Segmentation Engine',
    formula: '=LET(data, A7:I36, seg, FILTER(data, (INDEX(data,,4)="East")*(INDEX(data,,9)>60000)), SORT(seg, 9, -1))',
    desc: 'Segment top-tier customers with zero helper columns and self-expanding layout.',
    color: 'FFD97706'
  },
  {
    sheetId: 'EX1615',
    topicIndex: 14,
    title: 'Formula-Driven Pivot Tables with GROUPBY & PIVOTBY',
    formula: '=GROUPBY(C7:C36, I7:I36, SUM, 3, 1)',
    desc: 'Summarize departmental sales with automatic grand totals and header formatting.',
    color: 'FF9333EA'
  },
  {
    sheetId: 'EX1616',
    topicIndex: 15,
    title: 'Advanced #Spill Matrix Transformations (LET + UNIQUE + FILTER + Reshaping)',
    formula: '=LET(src, A7:I36, f, FILTER(src, (INDEX(src,,4)="East")*(INDEX(src,,9)>50000)), u, UNIQUE(CHOOSECOLS(f, 2, 3, 5, 9)), SORT(u, 4, -1))',
    desc: 'Orchestrate multi-stage vectorized pipelines combining LET, UNIQUE, FILTER, SORT, and dynamic matrix reshaping.',
    color: 'FF0284C7',
    isMasterTopic15: true
  },
  {
    sheetId: 'EX1617',
    topicIndex: 16,
    title: 'Modern Formula-Driven Pivot Reports with GROUPBY & PIVOTBY',
    formula: '=PIVOTBY(C7:C36, D7:D36, I7:I36, SUM, 3, 1, 0, 1)',
    desc: 'Build full 2D cross-tab matrix reports with row/column totals via formula engine.',
    color: 'FF9333EA'
  }
];

async function generateMasterWorkbook() {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Sukanta Hui - Coder & AccoTax';
  wb.lastModifiedBy = 'Sukanta Hui';
  wb.created = new Date();
  wb.modified = new Date();

  // 1. Overview Sheet
  const wsOverview = wb.addWorksheet('Overview', { views: [{ showGridLines: true }] });
  wsOverview.columns = [
    { width: 20 }, { width: 35 }, { width: 22 }, { width: 45 }, { width: 35 }, { width: 25 }
  ];

  wsOverview.mergeCells('A1:F2');
  const oTitle = wsOverview.getCell('A1');
  oTitle.value = '⚡ CODER & ACCOTAX — MODERN EXCEL MASTER WORKBOOK';
  oTitle.font = { name: 'Segoe UI', size: 16, bold: true, color: { argb: 'FFFFFFFF' } };
  oTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } };
  oTitle.alignment = { vertical: 'middle', horizontal: 'center' };

  wsOverview.mergeCells('A3:F3');
  const oSub = wsOverview.getCell('A3');
  oSub.value = 'Module 004_001: Modern Lookup & Dynamic Array Functions (#Spill, LET, UNIQUE, FILTER, SORT, Reshaping)';
  oSub.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FF38BDF8' } };
  oSub.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E293B' } };
  oSub.alignment = { vertical: 'middle', horizontal: 'center' };

  wsOverview.mergeCells('A5:F5');
  const dHeader = wsOverview.getCell('A5');
  dHeader.value = '📑 WORKBOOK WORKSHEET DIRECTORY & QUICK-JUMP NAVIGATION';
  dHeader.font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FFFFFFFF' } };
  dHeader.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0284C7' } };
  dHeader.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };

  const tableHeaders = ['Worksheet ID', 'Topic & Exercise Title', 'Difficulty Level', 'Target Practice Formula', 'Transformation Objective', 'Direct Jump'];
  const hRow = wsOverview.getRow(6);
  hRow.height = 26;
  tableHeaders.forEach((h, i) => {
    const cell = hRow.getCell(i + 1);
    cell.value = h;
    cell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E293B' } };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
    cell.border = {
      top: { style: 'medium', color: { argb: 'FF0F172A' } },
      bottom: { style: 'medium', color: { argb: 'FF0F172A' } },
      left: { style: 'thin', color: { argb: 'FF334155' } },
      right: { style: 'thin', color: { argb: 'FF334155' } }
    };
  });

  TOPIC_SPECS.forEach((spec, idx) => {
    const rNum = 7 + idx;
    const r = wsOverview.getRow(rNum);
    r.height = 22;

    r.getCell(1).value = spec.sheetId;
    r.getCell(1).font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FF0284C7' } };
    r.getCell(1).alignment = { vertical: 'middle', horizontal: 'center' };

    r.getCell(2).value = spec.title;
    r.getCell(2).font = { name: 'Segoe UI', size: 10, bold: spec.isMasterTopic15 };

    r.getCell(3).value = spec.isMasterTopic15 ? 'Ultra-Expert' : (spec.topicIndex > 10 ? 'Advanced' : 'Intermediate');
    r.getCell(3).alignment = { vertical: 'middle', horizontal: 'center' };
    r.getCell(3).font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: spec.isMasterTopic15 ? 'FF0284C7' : 'FF059669' } };

    r.getCell(4).value = spec.formula;
    r.getCell(4).font = { name: 'Consolas', size: 9, color: { argb: 'FF0369A1' } };

    r.getCell(5).value = spec.desc;
    r.getCell(5).font = { name: 'Segoe UI', size: 9 };

    const jumpCell = r.getCell(6);
    jumpCell.value = { text: `🔗 Open ${spec.sheetId}`, hyperlink: `#'${spec.sheetId}'!A1` };
    jumpCell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FF0284C7' }, underline: true };
    jumpCell.alignment = { vertical: 'middle', horizontal: 'center' };

    for (let c = 1; c <= 6; c++) {
      const cell = r.getCell(c);
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: spec.isMasterTopic15 ? 'FFF0F9FF' : (idx % 2 === 0 ? 'FFF8FAFC' : 'FFFFFFFF') } };
      cell.border = {
        top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        right: { style: 'thin', color: { argb: 'FFE2E8F0' } }
      };
    }
  });

  // 2. Build Each Topic Sheet (Especially EX1616 for Topic 15)
  TOPIC_SPECS.forEach((spec) => {
    const ws = wb.addWorksheet(spec.sheetId, { views: [{ showGridLines: true }] });

    // Navigation & Header
    ws.mergeCells('A1:C1');
    const nav = ws.getCell('A1');
    nav.value = { text: '🏠 Jump to Overview Landing Sheet', hyperlink: "#'Overview'!A1" };
    nav.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FF0284C7' }, underline: true };
    nav.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
    ws.getRow(1).height = 24;

    ws.mergeCells('A3:K3');
    const titleCell = ws.getCell('A3');
    titleCell.value = `⚡ ${spec.sheetId}: ${spec.title}`;
    titleCell.font = { name: 'Segoe UI', size: 13, bold: true, color: { argb: 'FFFFFFFF' } };
    titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: spec.color } };
    titleCell.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
    ws.getRow(3).height = 30;

    ws.mergeCells('A4:K4');
    const formulaBar = ws.getCell('A4');
    formulaBar.value = `Target Master Pipeline Formula: ${spec.formula}`;
    formulaBar.font = { name: 'Consolas', size: 11, bold: true, color: { argb: 'FF38BDF8' } };
    formulaBar.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } };
    formulaBar.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
    ws.getRow(4).height = 24;

    // Source Data Table Headers
    const rawSales = generateSalesData(spec.sheetId);
    const sourceHeaders = [
      'Transaction ID', 'Sales Rep Name', 'Department', 'Region',
      'Product Category', 'Units Sold', 'Unit Price (₹)', 'Discount %',
      'Net Revenue (₹)', 'Deal Rating', 'Transaction Status'
    ];

    const shRow = ws.getRow(6);
    shRow.height = 26;
    sourceHeaders.forEach((h, i) => {
      const cell = shRow.getCell(i + 1);
      cell.value = h;
      cell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFFFF' } };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E293B' } };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
      cell.border = {
        top: { style: 'medium', color: { argb: 'FF0F172A' } },
        bottom: { style: 'medium', color: { argb: 'FF0F172A' } },
        left: { style: 'thin', color: { argb: 'FF334155' } },
        right: { style: 'thin', color: { argb: 'FF334155' } }
      };
    });

    // Populate Source Data Rows
    rawSales.forEach((row, rIdx) => {
      const rowNum = 7 + rIdx;
      const r = ws.getRow(rowNum);
      r.height = 20;
      row.forEach((val, cIdx) => {
        const cell = r.getCell(cIdx + 1);
        cell.value = val;
        cell.font = { name: 'Segoe UI', size: 10 };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: rIdx % 2 === 0 ? 'FFF8FAFC' : 'FFFFFFFF' } };
        
        if (cIdx === 0) {
          cell.alignment = { vertical: 'middle', horizontal: 'center' };
          cell.font = { name: 'Consolas', size: 9, bold: true, color: { argb: 'FF0284C7' } };
        } else if (cIdx === 5) {
          cell.alignment = { vertical: 'middle', horizontal: 'right' };
          cell.numFmt = '#,##0';
        } else if (cIdx === 6 || cIdx === 8) {
          cell.alignment = { vertical: 'middle', horizontal: 'right' };
          cell.numFmt = '₹ #,##,##0';
          cell.font = { name: 'Segoe UI', size: 10, bold: cIdx === 8 };
        } else if (cIdx === 7) {
          cell.alignment = { vertical: 'middle', horizontal: 'right' };
          cell.numFmt = '0.0%';
        } else {
          cell.alignment = { vertical: 'middle', horizontal: 'left' };
        }

        cell.border = {
          top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
          bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
          left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
          right: { style: 'thin', color: { argb: 'FFE2E8F0' } }
        };
      });
    });

    // For Topic 15 (EX1616), add dedicated calculation models on columns M to V
    if (spec.isMasterTopic15) {
      // Column M: Transformation Pipeline 1 (Top Performers LET+FILTER+UNIQUE+SORT)
      ws.mergeCells('M6:P6');
      const p1Head = ws.getCell('M6');
      p1Head.value = '🚀 Pipeline 1: =LET(src, A7:I36, f, FILTER(src, (D7:D36="East")*(I7:I36>50000)), u, UNIQUE(CHOOSECOLS(f, 2, 3, 9)), SORT(u, 3, -1))';
      p1Head.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFFFF' } };
      p1Head.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0284C7' } };
      p1Head.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };

      const p1SubHeaders = ['Sales Rep Name', 'Department', 'Net Revenue (₹)', 'Pipeline Stage'];
      const p1SubRow = ws.getRow(7);
      p1SubHeaders.forEach((h, i) => {
        const cell = p1SubRow.getCell(13 + i);
        cell.value = h;
        cell.font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: 'FFFFFFFF' } };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      });

      // Populate Live Computed Results for Pipeline 1
      const eastTopDeals = rawSales
        .filter(r => r[3] === 'East' && r[8] > 50000)
        .map(r => [r[1], r[2], r[8], 'Spilled Live Vector'])
        .sort((a, b) => b[2] - a[2]);

      eastTopDeals.forEach((row, i) => {
        const r = ws.getRow(8 + i);
        row.forEach((val, cIdx) => {
          const cell = r.getCell(13 + cIdx);
          cell.value = val;
          cell.font = { name: 'Segoe UI', size: 9 };
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: i % 2 === 0 ? 'FFF0F9FF' : 'FFFFFFFF' } };
          if (cIdx === 2) {
            cell.numFmt = '₹ #,##,##0';
            cell.font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: 'FF0284C7' } };
          }
          cell.border = {
            top: { style: 'thin', color: { argb: 'FFBAE6FD' } },
            bottom: { style: 'thin', color: { argb: 'FFBAE6FD' } },
            left: { style: 'thin', color: { argb: 'FFBAE6FD' } },
            right: { style: 'thin', color: { argb: 'FFBAE6FD' } }
          };
        });
      });

      // Pipeline 2: Grid Reshaping with WRAPROWS
      const wrapStartRow = 8 + eastTopDeals.length + 2;
      ws.mergeCells(`M${wrapStartRow}:P${wrapStartRow}`);
      const p2Head = ws.getCell(`M${wrapStartRow}`);
      p2Head.value = '📐 Pipeline 2: =WRAPROWS(SORT(UNIQUE(C7:C36)), 4, "N/A") — Department Matrix';
      p2Head.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFFFF' } };
      p2Head.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF059669' } };
      p2Head.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };

      const uniqueDepts = Array.from(new Set(rawSales.map(r => r[2]))).sort();
      for (let rIdx = 0; rIdx < 2; rIdx++) {
        const currR = ws.getRow(wrapStartRow + 1 + rIdx);
        for (let cIdx = 0; cIdx < 4; cIdx++) {
          const val = uniqueDepts[rIdx * 4 + cIdx] || 'N/A';
          const cell = currR.getCell(13 + cIdx);
          cell.value = val;
          cell.font = { name: 'Segoe UI', size: 9, bold: true };
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFECFDF5' } };
          cell.alignment = { vertical: 'middle', horizontal: 'center' };
          cell.border = {
            top: { style: 'thin', color: { argb: 'FFA7F3D0' } },
            bottom: { style: 'thin', color: { argb: 'FFA7F3D0' } },
            left: { style: 'thin', color: { argb: 'FFA7F3D0' } },
            right: { style: 'thin', color: { argb: 'FFA7F3D0' } }
          };
        }
      }
    }

    const colWidths = [16, 24, 22, 14, 22, 12, 16, 14, 18, 20, 18, 5, 24, 24, 20, 20];
    colWidths.forEach((w, i) => {
      ws.getColumn(i + 1).width = w;
    });
  });

  const outputPath = path.join(excelFilesDir, '004_001_modern_lookup_and_dynamic_array_functions_master.xlsx');
  await wb.xlsx.writeFile(outputPath);
  console.log(`✓ Master Workbook generated at: ${outputPath}`);

  fs.copyFileSync(outputPath, path.join(excelFilesDir, 'dynamic_arrays_master.xlsx'));
  fs.copyFileSync(outputPath, path.join(excelFilesDir, 'modern_lookup_and_dynamic_array_functions_master.xlsx'));
}

generateMasterWorkbook().catch(console.error);
