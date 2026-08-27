const ExcelJS = require('e:/react_routing_tailwind/node_modules/exceljs');
const fs = require('fs');
const path = require('path');

const moduleDir = __dirname;
const excelFilesDir = path.join(moduleDir, 'excel_files');
if (!fs.existsSync(excelFilesDir)) fs.mkdirSync(excelFilesDir, { recursive: true });

async function buildMasterWorkbook() {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Coder & AccoTax';
  wb.lastModifiedBy = 'Sukanta Hui';
  wb.created = new Date();
  wb.modified = new Date();

  // 1. Overview Landing Sheet
  const wsOverview = wb.addWorksheet('Overview', { views: [{ showGridLines: true }] });
  wsOverview.columns = [{ width: 22 }, { width: 26 }, { width: 28 }, { width: 32 }, { width: 26 }, { width: 36 }];

  const logoPath = path.resolve('src/components/study/excel/assets/cnat.png');
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
  bSub2.value = 'EXCEL MASTERCLASS: Module 1.5 - Custom Number Formatting & Financial Data Presentation\nCurriculum Code: EXCEL-PRO-901 | Student Practice & Laboratory Master Workbook';
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
    ['Curriculum Track', 'EXCEL-PRO-901: Microsoft Excel From Zero to Ultra Expert', 'Module Reference', '001_005_custom-number-formatting-and-styling'],
    ['Competency Level', 'CO1: Core Foundations & Financial Presentation Modeling', 'Total Topics', '14 Comprehensive Topics & 420 FAQ Questions'],
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
    ['Topic0_Format_Engine_Overview', 'Topic 0: Format Engine Overview', 'Display vs Underlying Stored Value', 'Barrackpore Client Master Accounts', '40', 'Understand formatting layer vs underlying math'],
    ['Topic1_Four_Section_Syntax', 'Topic 1: 4-Section Syntax', 'Positive ; Negative ; Zero ; Text', 'Kolkata Enterprise Profit & Loss Ledger', '40', 'Apply 4-part syntax rules to financial transactions'],
    ['Topic2_Digit_Placeholders', 'Topic 2: Digit Placeholders', '0 (Forced), # (Optional), ? (Decimal Align)', 'Shyamnagar Manufacturing Spec Sheet', '40', 'Align fractional digits and preserve fixed codes'],
    ['Topic3_Currency_International', 'Topic 3: Currency & Indian Numbering', '$, ₹, €, £ & Indian ##,##,##0 formats', 'Ichapur Multi-Currency Invoicing Mart', '40', 'Format lakhs and crores alongside global currencies'],
    ['Topic4_Accounting_Alignment', 'Topic 4: Wall Street Alignment', 'Accounting _) parentheses & * fill space', 'Naihati Corporate Balance Sheet Ledger', '40', 'Create institutional-grade financial statement layout'],
    ['Topic5_Scaling_Thousands_M', 'Topic 5: Large Number Scaling', 'Comma scaling: #,##0, "K" and #,##0.0,, "M"', 'Barrackpore Regional Revenue Scorecard', '40', 'Condense 8-digit values into clean K, M & B figures'],
    ['Topic6_Conditional_Colors', 'Topic 6: Conditional Colors', '[>1000][Green] & [<0][Red] embedded logic', 'Kolkata Sales Variance Audit Matrix', '40', 'Build dynamic color alerts without conditional formatting'],
    ['Topic7_Custom_Dates_Times', 'Topic 7: Custom Date & Time Tokens', 'dddd, mmmm dd, yyyy & hh:mm AM/PM', 'Shyamnagar Dispatch Delivery Schedule', '40', 'Format timestamps and localized date strings'],
    ['Topic8_Elapsed_Time_Log', 'Topic 8: Timesheet Hours >24h', '[h]:mm:ss cumulative duration token', 'Ichapur Factory Shift Timesheet Log', '40', 'Prevent 24-hour rollover in cumulative time tracking'],
    ['Topic9_Tax_Phone_Masking', 'Topic 9: Phone & Tax ID Masking', 'PAN @@@@@0000@, GSTIN & Phone formatting', 'Naihati Vendor Compliance Repository', '40', 'Apply structured masks to alphanumeric identifiers'],
    ['Topic10_Text_Unit_Suffixes', 'Topic 10: Text Tokens & Suffixes', '0" KG", 0.0" MT", 0" Hrs" & @ literal token', 'Barrackpore Logistics Weight Ledger', '40', 'Attach physical units to numbers while preserving SUM()'],
    ['Topic11_Stealth_Cloaking', 'Topic 11: Stealth Cloaking (;;;)', ';;; Operator for hidden cells & security', 'Executive KPI Security Config Table', '40', 'Hide sensitive coordinates and zero values cleanly'],
    ['Topic12_Financial_Statement', 'Topic 12: Executive P&L Statement', 'Boardroom Income Statement Model', 'Coder & AccoTax Annual Statement', '40', 'End-to-end institutional financial model styling'],
    ['Topic13_Formatting_Lab', 'Topic 13: Mastery Lab Challenges', '10 Comprehensive Formatting Scenarios', 'Master Certification Practice Deck', '40', 'Test full custom number formatting proficiency']
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

  // 2. Topic Practice Sheets
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

  const students = ['Swadeep Banerjee', 'Tuhina Mukherjee', 'Abhronila Das', 'Susmita Roy', 'Debangshu Ghosh', 'Rahul Sen', 'Priya Saha', 'Aniket Das', 'Sourav Ganguly', 'Sneha Roy'];
  const locations = ['Barrackpore', 'Shyamnagar', 'Ichapur', 'Naihati', 'Titagarh', 'Kolkata HQ'];
  const colors = ['FF0F172A', 'FF0284C7', 'FF059669', 'FF7C3AED', 'FFD97706', 'FFDC2626', 'FF0891B2', 'FF4F46E5', 'FF15803D', 'FFB45309', 'FF9333EA', 'FF0369A1', 'FF047857', 'FF334155'];

  for (let t = 0; t < 14; t++) {
    const sheetName = directoryRows[t + 1][0];
    const headerColor = colors[t % colors.length];
    const cols = [
      { header: 'Account_ID', key: 'id', width: 16 },
      { header: 'Client_Name', key: 'name', width: 22 },
      { header: 'Region_Branch', key: 'loc', width: 18 },
      { header: 'Raw_Stored_Numeric_Value', key: 'raw', width: 28 },
      { header: 'Custom_Formatted_Display', key: 'fmt', width: 30 },
      { header: 'Format_String_Code', key: 'code', width: 28 },
      { header: 'Audit_Validation_Status', key: 'stat', width: 22 }
    ];
    const data = [];
    for (let r = 1; r <= 35; r++) {
      const st = students[(r - 1) % students.length];
      const loc = locations[(r - 1) % locations.length];
      const rawVal = 1250000 + r * 74500;
      data.push([
        `ACC-${(t + 1) * 1000 + r}`,
        st,
        loc,
        rawVal,
        `₹${(rawVal / 100000).toFixed(2)} Lakhs`,
        '₹##,##,##0.00 "Lakhs"',
        'COMPLIANT_ACTIVE'
      ]);
    }
    addStyledTopicSheet(sheetName, headerColor, cols, data);
  }

  const outputPath = path.join(excelFilesDir, 'custom_number_formatting_and_styling_master.xlsx');
  await wb.xlsx.writeFile(outputPath);
  console.log('✓ Successfully generated custom_number_formatting_and_styling_master.xlsx with 15 sheets & protected Overview');
}

buildMasterWorkbook().catch(console.error);
