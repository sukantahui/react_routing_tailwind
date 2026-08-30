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

  function addStyledInspectionSheet(sheetName, headerColor, title, columns, data) {
    const ws = wb.addWorksheet(sheetName, { views: [{ showGridLines: true }] });

    ws.mergeCells('A1:D1');
    const navCell = ws.getCell('A1');
    navCell.value = { text: '🏠 Jump to Executive Overview Landing Sheet', hyperlink: "#'Overview'!A1" };
    navCell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FF0284C7' }, underline: true };
    ws.getRow(1).height = 24;

    ws.mergeCells('A2:E2');
    const tCell = ws.getCell('A2');
    tCell.value = `INFORMATION AUDIT LAB: ${title}`;
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

  const wsOverview = wb.addWorksheet('Overview', { views: [{ showGridLines: true }] });
  wsOverview.columns = [{ width: 25 }, { width: 35 }, { width: 25 }, { width: 20 }];

  wsOverview.mergeCells('A1:D2');
  const bTitle = wsOverview.getCell('A1');
  bTitle.value = 'CODER & ACCOTAX - INFORMATION & CELL INSPECTION FUNCTIONS WORKBOOK';
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
    { sheet: 'Topic0_ISTEXT', title: 'ISTEXT Method', syntax: '=ISTEXT(value)' },
    { sheet: 'Topic1_ISNONTEXT', title: 'ISNONTEXT Method', syntax: '=ISNONTEXT(value)' },
    { sheet: 'Topic2_ISREF', title: 'ISREF Method', syntax: '=ISREF(value)' },
    { sheet: 'Topic3_ISFORMULA', title: 'ISFORMULA Method', syntax: '=ISFORMULA(reference)' },
    { sheet: 'Topic4_TYPE', title: 'TYPE Method', syntax: '=TYPE(value)' },
    { sheet: 'Topic5_FORMULATEXT', title: 'FORMULATEXT Method', syntax: '=FORMULATEXT(reference)' },
    { sheet: 'Topic6_CELL', title: 'CELL Method', syntax: '=CELL(info_type, [ref])' },
    { sheet: 'Topic7_INFO', title: 'INFO Method', syntax: '=INFO(type_text)' },
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

  addStyledInspectionSheet('Topic0_ISTEXT', 'FF0284C7', 'ISTEXT (Text Verification)',
    [{ header: 'Cell_Ref' }, { header: 'Content' }, { header: 'Formula' }, { header: 'Evaluated Result' }],
    [['A4', 'Kolkata Branch', '=ISTEXT(B4)', 'TRUE'], ['A5', 145000, '=ISTEXT(B5)', 'FALSE']]
  );

  addStyledInspectionSheet('Topic1_ISNONTEXT', 'FF059669', 'ISNONTEXT (Non-Text Verification)',
    [{ header: 'Cell_Ref' }, { header: 'Content' }, { header: 'Formula' }, { header: 'Evaluated Result' }],
    [['A4', 98000, '=ISNONTEXT(B4)', 'TRUE'], ['A5', 'Verified', '=ISNONTEXT(B5)', 'FALSE']]
  );

  addStyledInspectionSheet('Topic2_ISREF', 'FF7C3AED', 'ISREF (Cell Reference Validation)',
    [{ header: 'Ref_String' }, { header: 'Formula' }, { header: 'Evaluated Result' }],
    [['B4:B10', '=ISREF(INDIRECT(A4))', 'TRUE'], ['Invalid_Name', '=ISREF(INDIRECT(A5))', 'FALSE']]
  );

  addStyledInspectionSheet('Topic3_ISFORMULA', 'FFD97706', 'ISFORMULA (Formula Presence Audit)',
    [{ header: 'Cell' }, { header: 'Entry Type' }, { header: 'Applied Formula' }, { header: 'Audit Result' }],
    [['C4', 'Formula Calculation', '=ISFORMULA(C4)', 'TRUE'], ['C5', 'Hardcoded Constant', '=ISFORMULA(C5)', 'FALSE']]
  );

  addStyledInspectionSheet('Topic4_TYPE', 'FDC2626', 'TYPE (Data Type Classification)',
    [{ header: 'Value' }, { header: 'Data Category' }, { header: 'TYPE Code' }],
    [[145.89, 'Number', '1'], ['Barrackpore', 'Text', '2'], [true, 'Logical Boolean', '4']]
  );

  addStyledInspectionSheet('Topic5_FORMULATEXT', 'FF2563EB', 'FORMULATEXT (Formula Expression Audit)',
    [{ header: 'Target Cell' }, { header: 'Formula Content' }, { header: 'Extracted Formula' }],
    [['E10', '=SUM(B4:B9)', '=FORMULATEXT(E10)']]
  );

  addStyledInspectionSheet('Topic6_CELL', 'FF4F46E5', 'CELL (Cell Environment Metadata)',
    [{ header: 'Info Type' }, { header: 'Formula' }, { header: 'Returned Value' }],
    [['filename', '=CELL("filename", A1)', 'Active Workbook Path & Sheet Name'], ['address', '=CELL("address", B4)', '$B$4']]
  );

  addStyledInspectionSheet('Topic7_INFO', 'FF0891B2', 'INFO (System & Calculation Environment)',
    [{ header: 'Environment Type' }, { header: 'Formula' }, { header: 'Returned Output' }],
    [['recalc', '=INFO("recalc")', 'Automatic'], ['osversion', '=INFO("osversion")', 'Windows (64-bit)']]
  );

  const targetPath = path.join(excelFilesDir, 'information_and_cell_inspection_functions_master.xlsx');
  await wb.xlsx.writeFile(targetPath);
  console.log(`Generated ${targetPath}`);
}

buildWorkbook();
