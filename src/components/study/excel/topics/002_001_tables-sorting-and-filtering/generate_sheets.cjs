const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

const moduleDir = __dirname;
const excelFilesDir = path.join(moduleDir, 'excel_files');
if (!fs.existsSync(excelFilesDir)) fs.mkdirSync(excelFilesDir, { recursive: true });

const sampleNames = ['Swadeep Hui', 'Tuhina Das', 'Abhronila Ray', 'Susmita Sen', 'Debangshu Roy', 'Rahul Kumar', 'Priya Sharma', 'Aniket Verma', 'Sourav Ganguly', 'Sneha Ghosh', 'Arpan Dey', 'Subhajit Pal', 'Riya Sarkar', 'Dipankar Mitra', 'Barnali Dutta', 'Vikram Singh', 'Kavita Nair', 'Amitabh Basu', 'Pooja Bannerjee', 'Sanjay Chakraborty', 'Tanmoy Das', 'Mousumi Mukhopadhyay', 'Bikash Chatterjee', 'Sayani Bose', 'Aritra Sen', 'Niladri Roy', 'Paromita Guha', 'Siddharth Mallick', 'Trisha Roy', 'Kaushik Hazra'];
const sampleCities = ['Barrackpore', 'Shyamnagar', 'Ichapur', 'Naihati', 'Titagarh', 'Kolkata', 'Howrah', 'Hooghly', 'Kanchrapara', 'Sodepur'];
const sampleDepts = ['Finance', 'Accounts', 'Engineering', 'HR', 'Logistics', 'Procurement', 'Taxation', 'Audit'];

async function buildWorkbook() {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Coder & AccoTax';
  wb.lastModifiedBy = 'Sukanta Hui';
  wb.created = new Date();
  wb.modified = new Date();

  function addStyledTableSheet(sheetName, headerColor, title, columns, data) {
    const ws = wb.addWorksheet(sheetName, { views: [{ showGridLines: true }] });

    ws.mergeCells('A1:E1');
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
        cell.alignment = { vertical: 'middle', horizontal: typeof val === 'number' ? 'right' : 'left', indent: typeof val === 'number' ? 0 : 1 };
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

  wsOverview.mergeCells('B1:F2');
  const bTitle = wsOverview.getCell('B1');
  bTitle.value = 'CODER & ACCOTAX';
  bTitle.font = { name: 'Segoe UI', size: 20, bold: true, color: { argb: 'FFFFFFFF' } };
  bTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } };
  bTitle.alignment = { vertical: 'middle', indent: 1 };

  wsOverview.mergeCells('B3:F3');
  const bSub1 = wsOverview.getCell('B3');
  bSub1.value = 'ISO 9001:2015 Certified Centre of Excellence in Computer Science & Financial Modeling';
  bSub1.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FF38BDF8' } };
  bSub1.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E293B' } };
  bSub1.alignment = { vertical: 'middle', indent: 1 };

  wsOverview.mergeCells('B4:F5');
  const bSub2 = wsOverview.getCell('B4');
  bSub2.value = "Module 002_001: Tables, Sorting and Filtering\nCurriculum Track: EXCEL-PRO-901 | Student Practice Master Workbook";
  bSub2.font = { name: 'Segoe UI', size: 9, color: { argb: 'FFFBBF24' } };
  bSub2.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E293B' } };
  bSub2.alignment = { vertical: 'middle', wrapText: true, indent: 1 };

  const directoryHeaders = ['SL #', 'Sheet Name / Topic', 'Primary Formula / Technique', 'Business Context / Dataset', '🚀 Instant Quick Jump', 'Status'];
  const headerRow = wsOverview.getRow(7);
  headerRow.height = 26;
  directoryHeaders.forEach((h, cIdx) => {
    const cell = headerRow.getCell(cIdx + 1);
    cell.value = h;
    cell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E293B' } };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
  });

  const topicCatalog = [
    { id: 1, sheet: 'EX101', title: 'Topic 0: Converting data ranges into Excel Tables', formula: 'Ctrl + T (ListObjects)', context: 'Barrackpore Employee Ledger', status: 'Core Lab' },
    { id: 2, sheet: 'EX102', title: 'Topic 1: Benefits of Tables: Structured References & Auto-Expansion', formula: '=[@Salary] * (1 + [@Bonus])', context: 'Shyamnagar Payroll Ledger', status: 'Core Lab' },
    { id: 3, sheet: 'EX103', title: 'Topic 2: Sorting Data: Single-Column, Multi-Level & Custom Lists', formula: 'Sort -> Order -> Custom List', context: 'Kolkata Customer Orders', status: 'Core Lab' },
    { id: 4, sheet: 'EX104', title: 'Topic 3: Filtering Data: AutoFilter & Filter Drop-Downs', formula: '=FILTER(tblSales, Criteria)', context: 'Ichapur Sales Invoices', status: 'Core Lab' },
    { id: 5, sheet: 'EX105', title: 'Topic 4: Advanced Filter Rules: Text, Number & Date Filters', formula: 'DateRange & Top 10% Filters', context: 'Naihati Procurement Contracts', status: 'Core Lab' },
    { id: 6, sheet: 'EX106', title: 'Topic 5: Removing Duplicates & Unique Record Extraction', formula: '=UNIQUE(tblCustomers[ID])', context: 'Titagarh Client Registry', status: 'Core Lab' },
    { id: 7, sheet: 'EX107', title: 'Topic 6: Total Row Integration & Dynamic Summaries', formula: '=SUBTOTAL(109, [Amount])', context: 'Sodepur Inventory Audit', status: 'Core Lab' },
    { id: 8, sheet: 'EX108', title: 'Topic 7: SUBTOTAL Function Mechanics & Hidden Row Calculations', formula: '=SUBTOTAL(109, C4:C33)', context: 'Executive Dashboard Subtotals', status: 'Core Lab' },
    { id: 9, sheet: 'EX109', title: 'Topic 8: Test Your Skill: Dynamic Tables, Sorting & Filtering Assessment', formula: 'Comprehensive Skill Test', context: 'Skill Test Assessment Grid', status: 'Assessment' },
    { id: 10, sheet: 'EX110', title: 'Topic 9: Practical Laboratory Exercises: Projects_002_001 Master Class', formula: 'Master Project Modeling Suite', context: 'Executive Capstone Master Class', status: 'Project Lab' }
  ];

  topicCatalog.forEach((t, idx) => {
    const curRow = 8 + idx;
    const r = wsOverview.getRow(curRow);
    r.height = 20;

    wsOverview.getCell("A" + curRow).value = t.id;
    wsOverview.getCell("B" + curRow).value = t.title;
    wsOverview.getCell("C" + curRow).value = t.formula;
    wsOverview.getCell("D" + curRow).value = t.context;
    wsOverview.getCell("E" + curRow).value = { text: "👉 Open " + t.sheet + " Sheet", hyperlink: "#'" + t.sheet + "'!A1", tooltip: "Jump to " + t.sheet };
    wsOverview.getCell("F" + curRow).value = t.status;

    ['A', 'B', 'C', 'D', 'E', 'F'].forEach(col => {
      const cell = wsOverview.getCell(col + curRow);
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: idx % 2 === 0 ? 'FFFFFFFF' : 'FFF8FAFC' } };
      cell.border = {
        top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        right: { style: 'thin', color: { argb: 'FFE2E8F0' } }
      };
    });
  });

  // Lock Overview sheet
  wsOverview.eachRow(r => r.eachCell(c => c.protection = { locked: true }));
  await wsOverview.protect('sukantahui', { selectLockedCells: true, selectUnlockedCells: true });

  // Add 10 Topic Worksheets (EX101 to EX110) with 30 rich rows per tab
  topicCatalog.forEach((t, pIdx) => {
    const richRows = Array.from({ length: 30 }, (_, i) => [
      `${t.sheet}-${String(i + 1).padStart(2, '0')}`,
      sampleNames[i % sampleNames.length],
      sampleDepts[i % sampleDepts.length],
      sampleCities[i % sampleCities.length],
      25000 + i * 2850 + (pIdx * 150),
      t.formula,
      'Verified & Audit Passed'
    ]);

    addStyledTableSheet(t.sheet, 'FF0F172A', t.title,
      [
        { header: 'Record_ID' },
        { header: 'Employee / Client Name' },
        { header: 'Department' },
        { header: 'Campus Location' },
        { header: 'Transaction Amount (₹)' },
        { header: 'Applied Table Formula' },
        { header: 'Audit Status' }
      ],
      richRows
    );
  });

  // Write Master Workbook
  const masterPath = path.join(excelFilesDir, '002_001_tables_sorting_and_filtering_master.xlsx');
  const legacyPath = path.join(excelFilesDir, 'tables_sorting_and_filtering_master.xlsx');

  await wb.xlsx.writeFile(masterPath);
  fs.copyFileSync(masterPath, legacyPath);
  console.log('✓ Generated 002_001_tables_sorting_and_filtering_master.xlsx with 10 rich topic tabs!');
}

buildWorkbook();
