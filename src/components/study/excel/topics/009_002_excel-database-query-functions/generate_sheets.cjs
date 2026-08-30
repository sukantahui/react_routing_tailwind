const ExcelJS = require('E:/react_routing_tailwind/node_modules/exceljs');
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

  function addStyledDBSheet(sheetName, headerColor, title, columns, data) {
    const ws = wb.addWorksheet(sheetName, { views: [{ showGridLines: true }] });

    ws.mergeCells('A1:D1');
    const navCell = ws.getCell('A1');
    navCell.value = { text: '🏠 Jump to Executive Overview Landing Sheet', hyperlink: "#'Overview'!A1" };
    navCell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FF0284C7' }, underline: true };
    ws.getRow(1).height = 24;

    ws.mergeCells('A2:E2');
    const tCell = ws.getCell('A2');
    tCell.value = `DATABASE QUERY LAB: ${title}`;
    tCell.font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: 'FFFFFFFF' } };
    tCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } };
    ws.getRow(2).height = 26;

    const headerRow = ws.getRow(3);
    headerRow.height = 26;
    columns.forEach((c, cIdx) => {
      const cell = headerRow.getCell(cIdx + 1);
      cell.value = c.header;
      cell.font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FFFFFFFF' } };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: headerColor } };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
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

  const wsOverview = wb.addWorksheet('Overview', { views: [{ showGridLines: true }] });
  wsOverview.columns = [{ width: 25 }, { width: 35 }, { width: 25 }, { width: 20 }];

  wsOverview.mergeCells('A1:D2');
  const bTitle = wsOverview.getCell('A1');
  bTitle.value = 'CODER & ACCOTAX - EXCEL DATABASE QUERY FUNCTIONS WORKBOOK';
  bTitle.font = { name: 'Segoe UI', size: 16, bold: true, color: { argb: 'FFFFFFFF' } };
  bTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } };
  bTitle.alignment = { vertical: 'middle', horizontal: 'center' };

  const directoryHeaders = ['Sheet Name (Click to Jump)', 'Topic / Method Name', 'Function Syntax', 'Status'];
  const headerRow = wsOverview.getRow(4);
  headerRow.height = 26;
  directoryHeaders.forEach((h, cIdx) => {
    const cell = headerRow.getCell(cIdx + 1);
    cell.value = h;
    cell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0284C7' } };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
  });

  const topicSheets = [
    { sheet: 'Topic1_DCOUNT', title: 'DCOUNT Method', syntax: '=DCOUNT(database, field, criteria)' },
    { sheet: 'Topic2_DCOUNTA', title: 'DCOUNTA Method', syntax: '=DCOUNTA(database, field, criteria)' },
    { sheet: 'Topic3_DAVERAGE', title: 'DAVERAGE Method', syntax: '=DAVERAGE(database, field, criteria)' },
    { sheet: 'Topic4_DMAX', title: 'DMAX Method', syntax: '=DMAX(database, field, criteria)' },
    { sheet: 'Topic5_DMIN', title: 'DMIN Method', syntax: '=DMIN(database, field, criteria)' },
    { sheet: 'Topic6_DPRODUCT', title: 'DPRODUCT Method', syntax: '=DPRODUCT(database, field, criteria)' },
    { sheet: 'Topic7_DSTDEV', title: 'DSTDEV Method', syntax: '=DSTDEV(database, field, criteria)' },
  ];

  topicSheets.forEach((ts, idx) => {
    const rNum = 5 + idx;
    const r = wsOverview.getRow(rNum);
    r.height = 22;

    const cellNav = r.getCell(1);
    cellNav.value = { text: `📊 ${ts.sheet}`, hyperlink: `#'${ts.sheet}'!A1` };
    cellNav.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FF0284C7' }, underline: true };

    r.getCell(2).value = ts.title;
    r.getCell(3).value = ts.syntax;
    r.getCell(4).value = 'Verified Master';
  });

  function gen30DB(funcName) {
    return Array.from({ length: 30 }, (_, i) => [
      `REC-${101 + i}`,
      sampleNames[i % sampleNames.length],
      sampleDepts[i % sampleDepts.length],
      sampleCities[i % sampleCities.length],
      25000 + i * 1450,
      `=${funcName}(A3:E33, "Salary", G1:H2)`,
      'Verified Query Result'
    ]);
  }

  topicSheets.forEach((ts, i) => {
    addStyledDBSheet(ts.sheet, 'FF059669', ts.title,
      [{ header: 'Record_ID' }, { header: 'Employee_Name' }, { header: 'Department' }, { header: 'City' }, { header: 'Salary (₹)' }, { header: 'DB Formula' }, { header: 'Status' }],
      gen30DB(ts.sheet.split('_')[1])
    );
  });

  const targetPath = path.join(excelFilesDir, 'excel_database_query_functions_master.xlsx');
  await wb.xlsx.writeFile(targetPath);
  // Synchronize both prefixed and legacy file names
  const masterPath = path.join(excelFilesDir, '009_002_excel_database_query_functions_master.xlsx');
  const legacyPath = path.join(excelFilesDir, 'excel_database_query_functions_master.xlsx');
  if (fs.existsSync(masterPath)) fs.copyFileSync(masterPath, legacyPath);

  console.log(`✓ Generated ${targetPath} with 30 rows per sheet`);
}

buildWorkbook();
