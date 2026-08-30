const ExcelJS = require('E:/react_routing_tailwind/node_modules/exceljs');
const fs = require('fs');
const path = require('path');

const moduleDir = __dirname;
const excelFilesDir = path.join(moduleDir, 'excel_files');
if (!fs.existsSync(excelFilesDir)) fs.mkdirSync(excelFilesDir, { recursive: true });

async function buildWorkbook() {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Coder & AccoTax';
  wb.lastModifiedBy = 'Sukanta Hui';
  wb.created = new Date();

  function addStyledTableSheet(sheetName, headerColor, title, columns, data, criteriaHeaders, criteriaData) {
    const ws = wb.addWorksheet(sheetName, { views: [{ showGridLines: true }] });

    ws.mergeCells('A1:D1');
    const navCell = ws.getCell('A1');
    navCell.value = { text: '🏠 Jump to Executive Overview Landing Sheet', hyperlink: "#'Overview'!A1" };
    navCell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FF0284C7' }, underline: true };
    ws.getRow(1).height = 24;

    ws.mergeCells('A2:E2');
    const tCell = ws.getCell('A2');
    tCell.value = `DATABASE QUERY ENGINE LAB: ${title}`;
    tCell.font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: 'FFFFFFFF' } };
    tCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } };
    ws.getRow(2).height = 26;

    if (criteriaHeaders && criteriaData) {
      ws.getCell('F2').value = 'CRITERIA RANGE';
      ws.getCell('F2').font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFF59E0B' } };
      
      criteriaHeaders.forEach((ch, cIdx) => {
        const cell = ws.getCell(3, 6 + cIdx);
        cell.value = ch;
        cell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFFFF' } };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD97706' } };
      });
      criteriaData.forEach((row, rIdx) => {
        row.forEach((val, cIdx) => {
          const cell = ws.getCell(4 + rIdx, 6 + cIdx);
          cell.value = val;
          cell.font = { name: 'Segoe UI', size: 10 };
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFEEBC8' } };
        });
      });
    }

    const headerRow = ws.getRow(3);
    headerRow.height = 26;
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
      ws.getColumn(colIdx + 1).width = Math.max(maxLen + 6, 20);
    });
    ws.getColumn(6).width = 20;
    ws.getColumn(7).width = 20;

    return ws;
  }

  const wsOverview = wb.addWorksheet('Overview', { views: [{ showGridLines: true }] });
  wsOverview.columns = [{ width: 25 }, { width: 35 }, { width: 25 }, { width: 30 }, { width: 20 }];
  
  wsOverview.mergeCells('A1:E2');
  const bTitle = wsOverview.getCell('A1');
  bTitle.value = 'CODER & ACCOTAX - EXCEL DATABASE QUERY ENGINE MASTER WORKBOOK';
  bTitle.font = { name: 'Segoe UI', size: 16, bold: true, color: { argb: 'FFFFFFFF' } };
  bTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } };
  bTitle.alignment = { vertical: 'middle', horizontal: 'center' };

  wsOverview.mergeCells('A3:E3');
  const bSub = wsOverview.getCell('A3');
  bSub.value = 'Module 009_002: Excel Database Query Functions (DSUM, DCOUNT, DCOUNTA, DAVERAGE, DMAX, DMIN, DGET)';
  bSub.font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FF38BDF8' } };
  bSub.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E293B' } };
  bSub.alignment = { vertical: 'middle', horizontal: 'center' };

  const directoryHeaders = ['Sheet Name (Click to Jump)', 'Topic / Method Name', 'Function Syntax', 'Criteria Block', 'Status'];
  const headerRow = wsOverview.getRow(5);
  headerRow.height = 26;
  directoryHeaders.forEach((h, cIdx) => {
    const cell = headerRow.getCell(cIdx + 1);
    cell.value = h;
    cell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0284C7' } };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
  });

  const topicSheets = [
    { sheet: 'Topic0_DSUM', title: 'DSUM Method', syntax: '=DSUM(database, field, criteria)', criteria: 'Region="East", Sales>50000' },
    { sheet: 'Topic1_DCOUNT', title: 'DCOUNT Method', syntax: '=DCOUNT(database, field, criteria)', criteria: 'Status="Paid", Amount>10000' },
    { sheet: 'Topic2_DCOUNTA', title: 'DCOUNTA Method', syntax: '=DCOUNTA(database, field, criteria)', criteria: 'Segment="Corporate"' },
    { sheet: 'Topic3_DAVERAGE', title: 'DAVERAGE Method', syntax: '=DAVERAGE(database, field, criteria)', criteria: 'Category="Electronics"' },
    { sheet: 'Topic4_DMAX', title: 'DMAX Method', syntax: '=DMAX(database, field, criteria)', criteria: 'Dept="Analytics"' },
    { sheet: 'Topic5_DMIN', title: 'DMIN Method', syntax: '=DMIN(database, field, criteria)', criteria: 'Tier="Platinum"' },
    { sheet: 'Topic6_DGET', title: 'DGET Method', syntax: '=DGET(database, field, criteria)', criteria: 'Emp_ID="EMP-104"' },
  ];

  topicSheets.forEach((ts, idx) => {
    const rNum = 6 + idx;
    const r = wsOverview.getRow(rNum);
    r.height = 22;

    const cellNav = r.getCell(1);
    cellNav.value = { text: `📊 ${ts.sheet}`, hyperlink: `#'${ts.sheet}'!A1` };
    cellNav.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FF0284C7' }, underline: true };

    r.getCell(2).value = ts.title;
    r.getCell(3).value = ts.syntax;
    r.getCell(4).value = ts.criteria;
    r.getCell(5).value = 'Verified Master';
    
    for (let c = 1; c <= 5; c++) {
      const cell = r.getCell(c);
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: idx % 2 === 0 ? 'FFF8FAFC' : 'FFFFFFFF' } };
      cell.border = { top: { style: 'thin', color: { argb: 'FFE2E8F0' } }, bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } } };
    }
  });

  addStyledTableSheet('Topic0_DSUM', 'FF0284C7', 'DSUM Method (Multi-Criteria Summation)',
    [{ header: 'ID' }, { header: 'Region' }, { header: 'Rep' }, { header: 'Sales' }],
    [
      ['101', 'East', 'Rahul Sharma', 65000],
      ['102', 'West', 'Priya Singh', 48000],
      ['103', 'East', 'Amit Roy', 72000],
      ['104', 'North', 'Snehha Das', 35000],
      ['105', 'East', 'Vikram Sen', 89000],
      ['106', 'South', 'Ananya Basu', 54000],
      ['107', 'East', 'Kabir Dey', 95000]
    ],
    ['Region', 'Sales'],
    [['East', '>50000']]
  );

  addStyledTableSheet('Topic1_DCOUNT', 'FF059669', 'DCOUNT Method (Numeric Criteria Counting)',
    [{ header: 'Invoice_ID' }, { header: 'Status' }, { header: 'Rep' }, { header: 'Amount' }],
    [
      ['INV-501', 'Paid', 'Rohan', 15000],
      ['INV-502', 'Pending', 'Pooja', 8000],
      ['INV-503', 'Paid', 'Subhash', 24000],
      ['INV-504', 'Paid', 'Rohan', 32000],
      ['INV-505', 'Overdue', 'Riya', 12000],
      ['INV-506', 'Paid', 'Subhash', 18500]
    ],
    ['Status', 'Amount'],
    [['Paid', '>10000']]
  );

  addStyledTableSheet('Topic2_DCOUNTA', 'FF7C3AED', 'DCOUNTA Method (Non-Blank Criteria Counting)',
    [{ header: 'Customer_ID' }, { header: 'Name' }, { header: 'Segment' }, { header: 'City' }],
    [
      ['CUST-10', 'Tata Motors', 'Corporate', 'Kolkata'],
      ['CUST-11', 'ITC Ltd', 'Corporate', 'Kolkata'],
      ['CUST-12', 'Local Retail', 'Retail', 'Howrah'],
      ['CUST-13', 'Wipro Tech', 'Corporate', 'Kolkata'],
      ['CUST-14', 'Individual', 'Retail', 'Barrackpore']
    ],
    ['Segment'],
    [['Corporate']]
  );

  addStyledTableSheet('Topic3_DAVERAGE', 'FFD97706', 'DAVERAGE Method (Filtered Category Average)',
    [{ header: 'Item_Code' }, { header: 'Product' }, { header: 'Category' }, { header: 'Price' }],
    [
      ['P-01', 'Laptop Pro', 'Electronics', 75000],
      ['P-02', 'Desk Chair', 'Furniture', 12000],
      ['P-03', 'Monitor 4K', 'Electronics', 32000],
      ['P-04', 'Office Table', 'Furniture', 22000],
      ['P-05', 'Wireless Mouse', 'Electronics', 2500]
    ],
    ['Category'],
    [['Electronics']]
  );

  addStyledTableSheet('Topic4_DMAX', 'FDC2626', 'DMAX Method (Maximum Criteria Extraction)',
    [{ header: 'Emp_ID' }, { header: 'Name' }, { header: 'Dept' }, { header: 'Score' }],
    [
      ['EMP-80', 'Arjun', 'Analytics', 92],
      ['EMP-81', 'Manoj', 'Sales', 85],
      ['EMP-82', 'Sneha', 'Analytics', 98],
      ['EMP-83', 'Priti', 'Analytics', 89]
    ],
    ['Dept'],
    [['Analytics']]
  );

  addStyledTableSheet('Topic5_DMIN', 'FF2563EB', 'DMIN Method (Minimum Criteria Extraction)',
    [{ header: 'Vendor_ID' }, { header: 'Vendor' }, { header: 'Tier' }, { header: 'Unit_Cost' }],
    [
      ['V-1', 'Alpha Corp', 'Platinum', 450],
      ['V-2', 'Beta Systems', 'Gold', 520],
      ['V-3', 'Gamma Global', 'Platinum', 410],
      ['V-4', 'Delta Traders', 'Platinum', 470]
    ],
    ['Tier'],
    [['Platinum']]
  );

  addStyledTableSheet('Topic6_DGET', 'FF4F46E5', 'DGET Method (Single Unique Record Extraction)',
    [{ header: 'Emp_ID' }, { header: 'Name' }, { header: 'Role' }, { header: 'Salary' }],
    [
      ['EMP-101', 'Debashis', 'Manager', 95000],
      ['EMP-102', 'Tania', 'Analyst', 65000],
      ['EMP-103', 'Rupam', 'Lead', 85000],
      ['EMP-104', 'Shampa', 'Director', 145000]
    ],
    ['Emp_ID'],
    [['EMP-104']]
  );

  const targetPath = path.join(excelFilesDir, 'excel_database_query_functions_master.xlsx');
  await wb.xlsx.writeFile(targetPath);
  console.log(`Generated ${targetPath}`);
}

buildWorkbook();
