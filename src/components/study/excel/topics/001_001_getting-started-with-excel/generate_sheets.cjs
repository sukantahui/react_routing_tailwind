const ExcelJS = require('E:/react_routing_tailwind/node_modules/exceljs');
const fs = require('fs');
const path = require('path');

const excelBaseDir = 'E:/react_routing_tailwind/src/components/study/excel';
const moduleDir = path.join(excelBaseDir, 'topics/001_001_getting-started-with-excel');
const excelFilesDir = path.join(moduleDir, 'excel_files');
if (!fs.existsSync(excelFilesDir)) fs.mkdirSync(excelFilesDir, { recursive: true });

async function buildModule001() {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Coder & AccoTax';
  wb.lastModifiedBy = 'Sukanta Hui';
  wb.created = new Date();
  wb.modified = new Date();

  // =========================================================================
  // SHEET 1: Overview (Landing Page - Colourful, Graphical with CNAT Logo)
  // =========================================================================
  const wsOverview = wb.addWorksheet('Overview', {
    views: [{ showGridLines: true }]
  });

  wsOverview.columns = [
    { key: 'A', width: 22 },
    { key: 'B', width: 26 },
    { key: 'C', width: 28 },
    { key: 'D', width: 32 },
    { key: 'E', width: 26 },
    { key: 'F', width: 36 },
  ];

  const logoPath = path.join(excelBaseDir, 'assets/cnat.png');
  if (fs.existsSync(logoPath)) {
    const logoId = wb.addImage({
      filename: logoPath,
      extension: 'png',
    });
    wsOverview.addImage(logoId, {
      tl: { col: 0.3, row: 0.3 },
      ext: { width: 120, height: 120 },
      editAs: 'oneCell'
    });
  }

  // Header Banner
  wsOverview.mergeCells('C1:F2');
  const bannerTitle = wsOverview.getCell('C1');
  bannerTitle.value = 'CODER & ACCOTAX';
  bannerTitle.font = { name: 'Segoe UI', size: 20, bold: true, color: { argb: 'FFFFFFFF' } };
  bannerTitle.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
  bannerTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } };

  wsOverview.mergeCells('C3:F3');
  const bannerSub1 = wsOverview.getCell('C3');
  bannerSub1.value = 'ISO 9001:2015 Certified Centre of Excellence for Coding, Taxation & Advanced Data Analytics';
  bannerSub1.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FF38BDF8' } };
  bannerSub1.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
  bannerSub1.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } };

  wsOverview.mergeCells('C4:F5');
  const bannerSub2 = wsOverview.getCell('C4');
  bannerSub2.value = 'EXCEL MASTERCLASS: Module 1.1 - Getting Started with Excel & Interface Mastery\nCurriculum Code: EXCEL-PRO-901 | Student Practice & Laboratory Workbook';
  bannerSub2.font = { name: 'Segoe UI', size: 9, bold: false, color: { argb: 'FFFBBF24' } };
  bannerSub2.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true, indent: 1 };
  bannerSub2.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } };

  // Section 1: Organisation Profile
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

  // Section 2: Lead Instructor Profile
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

  // Section 3: Course Metrics
  wsOverview.mergeCells('A19:F19');
  const s3Header = wsOverview.getCell('A19');
  s3Header.value = '🎓 3. COURSE & MODULE ACADEMIC METRICS';
  s3Header.font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: 'FFFFFFFF' } };
  s3Header.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF7C3AED' } };

  const s3Data = [
    ['Curriculum Track', 'EXCEL-PRO-901: Microsoft Excel From Zero to Ultra Expert', 'Module Reference', '001_001_getting-started-with-excel'],
    ['Competency Level', 'CO1: Core Foundations & Interface Ergonomics', 'Total Topics', '10 Comprehensive Topics & 300 FAQ Questions'],
  ];

  s3Data.forEach((row, idx) => {
    const rowNum = 20 + idx;
    wsOverview.getCell(`A${rowNum}`).value = row[0];
    wsOverview.getCell(`B${rowNum}`).value = row[1];
    wsOverview.getCell(`C${rowNum}`).value = row[2];
    wsOverview.getCell(`D${rowNum}`).value = row[3];
  });

  // Section 4: Workbook Directory
  wsOverview.mergeCells('A23:F23');
  const s4Header = wsOverview.getCell('A23');
  s4Header.value = '📑 4. WORKBOOK SHEET DIRECTORY & LAB NAVIGATION';
  s4Header.font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: 'FFFFFFFF' } };
  s4Header.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD97706' } };

  const directoryRows = [
    ['Sheet Name', 'Target Topic', 'Primary Concept / Technique', 'Dataset Context', 'Rows', 'Practice Objective'],
    ['Topic0_Excel_Overview', 'Topic 0: Intro to Excel', 'Spreadsheet Architecture & Workbooks', 'Barrackpore Institute Student Registry', '35', 'Explore grid layout and cell coordinates'],
    ['Topic1_Tool_Comparison', 'Topic 1: Excel vs Others', 'Feature Matrix & Enterprise Capacity', 'Software Specification Comparison', '25', 'Analyze capacity and feature limitations'],
    ['Topic2_Ribbon_Interface', 'Topic 2: Ribbon & Tabs', 'Command Ribbon & Quick Access', 'Barrackpore Retail MIS Command Log', '30', 'Locate ribbon tabs and shortcut keys'],
    ['Topic3_Workbook_Grid', 'Topic 3: Workbook & Cells', 'Rows, Columns, Grid Limits & Used Range', 'Kolkata Corporate Inventory Master', '40', 'Understand 1,048,576 row grid mechanics'],
    ['Topic4_File_Management', 'Topic 4: Saving & Formats', '.xlsx vs .xlsm vs .xlsb vs .csv Formats', 'Financial Report Archival Log', '30', 'Inspect file size and compression formats'],
    ['Topic5_Navigation_Shortcuts', 'Topic 5: Fast Navigation', 'Ctrl+Arrows, Name Box, Go To (F5)', 'Shyamnagar Regional Sales Orders', '45', 'Navigate large 1000+ cell boundaries'],
    ['Topic6_Cell_References', 'Topic 6: References & Address', 'Relative vs Absolute ($) vs Mixed', 'Ichapur Branch Staff Payroll Model', '35', 'Test coordinate formulas and cell anchoring'],
    ['Topic7_Practice_Lab', 'Topic 7: Comprehensive Lab', 'Integrated Foundations Challenge', 'Naihati Trading Enterprise Accounts', '50', 'End-to-end practical navigation & formula lab'],
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

  // Password protect Overview sheet with 'sukantahui'
  await wsOverview.protect('sukantahui', { selectLockedCells: true, selectUnlockedCells: true });

  // Helper for adding styled topic sheets
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

  // Student dataset for topic sheets
  const students = ['Swadeep', 'Tuhina', 'Abhronila', 'Susmita', 'Debangshu', 'Rahul', 'Priya', 'Aniket', 'Sourav', 'Sneha', 'Bikram', 'Riya', 'Koyel', 'Suman', 'Arpan', 'Dipankar', 'Puja', 'Tanmay', 'Mousumi', 'Amit'];
  const locations = ['Barrackpore', 'Shyamnagar', 'Ichapur', 'Naihati', 'Titagarh', 'Kolkata', 'Kankinara', 'Sodepur'];
  const depts = ['Software Engineering', 'Corporate Accounts', 'Taxation & GST', 'Data Analytics', 'Digital MIS', 'Financial Modeling'];

  // Sheet 2: Topic0_Excel_Overview
  const topic0Cols = [
    { header: 'Student_ID', key: 'id', width: 14 },
    { header: 'Student_Name', key: 'name', width: 22 },
    { header: 'Enrolled_Module', key: 'module', width: 26 },
    { header: 'Location', key: 'loc', width: 18 },
    { header: 'Lab_Attendance_%', key: 'att', width: 18 },
    { header: 'Assignment_Score', key: 'score', width: 18 },
    { header: 'Certification_Status', key: 'status', width: 22 },
  ];
  const topic0Data = [];
  for (let i = 1; i <= 35; i++) {
    const sName = students[(i - 1) % students.length] + (i > 20 ? ` (${Math.floor(i/20) + 1})` : '');
    const loc = locations[(i - 1) % locations.length];
    const dept = depts[(i - 1) % depts.length];
    const att = 80 + (i * 3) % 20;
    const score = 70 + (i * 7) % 30;
    topic0Data.push([`STD-${1000 + i}`, sName, dept, loc, att, score, score >= 85 ? 'Distinction' : score >= 75 ? 'First Class' : 'Passed']);
  }
  addStyledTopicSheet('Topic0_Excel_Overview', 'FF0F172A', topic0Cols, topic0Data);

  // Sheet 3: Topic1_Tool_Comparison
  const topic1Cols = [
    { header: 'Feature_Parameter', key: 'param', width: 28 },
    { header: 'Microsoft_Excel_365', key: 'excel', width: 28 },
    { header: 'Google_Sheets', key: 'sheets', width: 26 },
    { header: 'LibreOffice_Calc', key: 'libre', width: 24 },
    { header: 'Industrial_Recommendation', key: 'rec', width: 32 },
  ];
  const topic1Data = [
    ['Max Grid Rows', '1,048,576 rows', '10,000,000 total cells', '1,048,576 rows', 'Excel 365 for Heavy Data Modeling'],
    ['Max Grid Columns', '16,384 columns (XFD)', '18,278 columns (ZZZ)', '1,024 columns (AMJ)', 'Excel 365 for Wide Datasets'],
    ['Calculation Engine', 'Multi-Threaded Vectorized Dynamic Arrays', 'Cloud-Threaded ArrayFormula', 'Single-Threaded Classic', 'Excel 365 Engine (Fastest Desktop)'],
    ['Data Modeling & ETL', 'Power Query (M) & Power Pivot (DAX)', 'Limited Apps Script / BigQuery Join', 'Basic Data Pilot', 'Excel 365 (Enterprise Star Schema)'],
    ['VBA & Macro Automation', 'Full COM, Win32 API, UserForms', 'Google Apps Script (JavaScript)', 'LibreOffice Basic & Python', 'Excel VBA for Corporate Automation'],
    ['Cloud Modern Scripting', 'Office Scripts (TypeScript) + Power Automate', 'Google Apps Script (Cloud Triggered)', 'None Native', 'Excel Cloud Scripts for Office 365'],
    ['Python Integration', 'Native Python in Excel (pandas, seaborn, statsmodels)', 'Via Colab / Sheets API only', 'Python Scripting Bridge', 'Excel 365 Native Anaconda Engine'],
    ['Maximum File Size', 'Limited only by available RAM (64-bit: 100+ GB)', 'Limited by Google Drive Quotas', 'Limited by 32/64-bit OS RAM', 'Excel 64-bit for Big Data Financials'],
    ['Offline Availability', '100% Native Desktop & Zero Latency', 'Offline Cache Mode (Limited)', '100% Native Desktop', 'Excel Desktop for High Confidentiality'],
    ['Regulatory GST & Tax Compatibility', 'Full Tally Prime & GSTN Portal Export (.xlsx/.json)', 'Requires add-on or export', 'Basic CSV import', 'Excel 365 is Corporate India Standard'],
  ];
  addStyledTopicSheet('Topic1_Tool_Comparison', 'FF0284C7', topic1Cols, topic1Data);

  // Sheet 4: Topic2_Ribbon_Interface
  const topic2Cols = [
    { header: 'Ribbon_Tab', key: 'tab', width: 18 },
    { header: 'Command_Group', key: 'grp', width: 22 },
    { header: 'Key_Tools_Available', key: 'tools', width: 36 },
    { header: 'Primary_Shortcut_Key', key: 'key', width: 22 },
    { header: 'Corporate_MIS_Use_Case', key: 'case', width: 34 },
  ];
  const topic2Data = [
    ['Home', 'Clipboard', 'Cut, Copy, Paste Special, Format Painter', 'Ctrl+C, Ctrl+V, Alt+E+S', 'Copying formatted tax schedules'],
    ['Home', 'Font & Alignment', 'Font family, Size, Wrap Text, Merge & Center', 'Alt+H+W, Alt+H+M+C', 'Structuring executive ledger titles'],
    ['Home', 'Number', 'Accounting Format, Percentage, Custom Date, Currency', 'Ctrl+Shift+$ / % / #', 'Formatting INR currency and GST percentages'],
    ['Home', 'Styles', 'Conditional Formatting, Format as Table', 'Alt+H+L, Ctrl+T', 'Highlighting high-value sales transactions'],
    ['Home', 'Editing', 'AutoSum, Fill Down, Clear All, Sort & Filter, Find', 'Alt+=, Ctrl+D, Ctrl+F', 'Quick arithmetic totals and auditing'],
    ['Insert', 'Tables', 'PivotTable, Recommended PivotTables, Table', 'Alt+N+V, Ctrl+T', 'Building dynamic summarization reports'],
    ['Insert', 'Charts', 'Column, Bar, Line, Waterfall, Map, Combo Chart', 'Alt+F1, F11', 'Creating visual management presentations'],
    ['Page Layout', 'Page Setup', 'Margins, Orientation, Print Area, Print Titles', 'Alt+P+S+P', 'Configuring GST invoices for clean printing'],
    ['Formulas', 'Function Library', 'Financial, Logical, Text, Lookup & Reference, Math', 'Shift+F3, Alt+M', 'Inserting verified financial calculations'],
    ['Formulas', 'Formula Auditing', 'Trace Precedents, Trace Dependents, Evaluate Formula', 'Ctrl+[, Ctrl+], Alt+M+V', 'Step-by-step corporate model debugging'],
    ['Data', 'Get & Transform', 'From Text/CSV, From Web, From Database, Power Query', 'Alt+A+P+N', 'Automating monthly multi-branch bank ETL'],
    ['Data', 'Data Tools', 'Text to Columns, Flash Fill, Data Validation, Consolidate', 'Alt+A+E, Ctrl+E, Alt+A+V', 'Cleaning dirty ERP client lists'],
    ['Review', 'Protect', 'Protect Sheet, Protect Workbook, Allow Edit Ranges', 'Alt+R+P+S', 'Locking formula cells against accidental edits'],
    ['View', 'Window', 'Freeze Panes, Split, New Window, Arrange All', 'Alt+W+F+F', 'Freezing header rows in 10,000-row records'],
  ];
  addStyledTopicSheet('Topic2_Ribbon_Interface', 'FF059669', topic2Cols, topic2Data);

  // Sheet 5: Topic3_Workbook_Grid
  const topic3Cols = [
    { header: 'Cell_Address', key: 'addr', width: 16 },
    { header: 'Row_Index', key: 'row', width: 14 },
    { header: 'Column_Index', key: 'col', width: 14 },
    { header: 'Data_Type', key: 'type', width: 18 },
    { header: 'Stored_Value', key: 'val', width: 26 },
    { header: 'Formula_or_Constant', key: 'isForm', width: 22 },
    { header: 'Memory_Footprint', key: 'mem', width: 20 },
  ];
  const topic3Data = [];
  for (let i = 1; i <= 30; i++) {
    const isFormula = i % 4 === 0;
    topic3Data.push([
      `C${i + 1}`,
      i + 1,
      3,
      isFormula ? 'Calculated Numeric' : (i % 2 === 0 ? 'Text String' : 'Numeric Currency'),
      isFormula ? 45000 + i * 250 : (i % 2 === 0 ? `Branch Item #${100 + i}` : (12000 + i * 150)),
      isFormula ? `=SUM(A${i+1}:B${i+1})` : 'Constant Literal',
      isFormula ? '8 Bytes + Formula Pointer' : '8 Bytes Float / String Pool'
    ]);
  }
  addStyledTopicSheet('Topic3_Workbook_Grid', 'FF7C3AED', topic3Cols, topic3Data);

  // Sheet 6: Topic4_File_Management
  const topic4Cols = [
    { header: 'File_Extension', key: 'ext', width: 18 },
    { header: 'Format_Description', key: 'desc', width: 32 },
    { header: 'Macro_Support', key: 'vba', width: 18 },
    { header: 'Compression_Type', key: 'comp', width: 22 },
    { header: 'Best_Suited_For', key: 'suit', width: 34 },
  ];
  const topic4Data = [
    ['.xlsx', 'Standard OpenXML Spreadsheet', 'No (VBA stripped on save)', 'ZIP / XML Structured', 'Daily corporate reports, clean models, data sharing'],
    ['.xlsm', 'Macro-Enabled OpenXML Spreadsheet', 'Yes (Full VBA Code & Forms)', 'ZIP / XML Structured', 'Automated accounting sheets, custom UserForms'],
    ['.xlsb', 'Binary Spreadsheet Format', 'Yes (Full VBA Code & Forms)', 'Binary Direct Stream', 'Ultra-large datasets (1M+ rows), fast opening speed'],
    ['.xltx', 'Excel Template File', 'No (Clean Starter Layout)', 'ZIP / XML Structured', 'Standardized corporate invoice and quotation blanks'],
    ['.xltm', 'Macro-Enabled Excel Template', 'Yes (Pre-configured Automation)', 'ZIP / XML Structured', 'Automated salary and GST invoice generators'],
    ['.csv', 'Comma Separated Values', 'No (Plain Flat Text Only)', 'Uncompressed Plain Text', 'Cross-platform ETL, database bulk loading, Python data transfer'],
    ['.pdf', 'Portable Document Format', 'No (Fixed Page Representation)', 'Adobe PostScript Layout', 'Official audited balance sheets and client tax invoices'],
  ];
  addStyledTopicSheet('Topic4_File_Management', 'FFD97706', topic4Cols, topic4Data);

  // Sheet 7: Topic5_Navigation_Shortcuts
  const topic5Cols = [
    { header: 'Shortcut_Key', key: 'key', width: 20 },
    { header: 'Navigation_Action', key: 'act', width: 34 },
    { header: 'Behavior_with_Empty_Cells', key: 'empty', width: 28 },
    { header: 'Speed_Gain_Factor', key: 'gain', width: 20 },
    { header: 'Classroom_Mentor_Tip', key: 'tip', width: 36 },
  ];
  const topic5Data = [
    ['Ctrl + Arrow Keys', 'Jump to edge of current data region (Up/Down/Left/Right)', 'Stops before the next non-empty cell', '10x vs mouse scrolling', 'Use to instantly verify bottom row count in 50,000 lines'],
    ['Ctrl + Shift + Arrows', 'Extend selection to edge of data region', 'Selects contiguous blocks up to empty cell', '15x vs mouse dragging', 'Combine with formulas to select entire lookup ranges instantly'],
    ['Ctrl + Home', 'Jump to top-left active cell (A1 or post-freeze)', 'Always returns to top origin', 'Essential for navigation reset', 'Press before saving workbook for professional presentation'],
    ['Ctrl + End', 'Jump to bottom-right used cell in worksheet', 'Locates the furthest dirty cell used', 'Crucial for file bloating audit', 'If Ctrl+End goes to row 500,000 with 100 rows of data, clear excess rows!'],
    ['F5 / Ctrl + G', 'Open Go To Dialog', 'Jump to any cell address, named range, or special cell', 'Instant precision jump', 'Press F5 -> Special -> Formulas/Blanks for fast auditing'],
    ['Alt + Page Down', 'Screen jump one viewport to the right', 'Moves horizontal viewport across large tables', '5x vs horizontal scrollbar', 'Great for reviewing wide 30-column financial models'],
    ['Ctrl + Page Up/Down', 'Switch between adjacent worksheet tabs', 'Cycles forward and backward through sheet tabs', 'Instant sheet switching', 'Never touch the mouse to flip between Master and Detail sheets'],
    ['Name Box (Top Left)', 'Type any coordinate (e.g. XFD1048576) and Enter', 'Immediate direct teleportation', 'Infinite range jump', 'Type A1:Z100 in Name Box to select exact rectangular block instantly'],
  ];
  addStyledTopicSheet('Topic5_Navigation_Shortcuts', 'FF0F172A', topic5Cols, topic5Data);

  // Sheet 8: Topic6_Cell_References
  const topic6Cols = [
    { header: 'Emp_ID', key: 'id', width: 14 },
    { header: 'Employee_Name', key: 'name', width: 22 },
    { header: 'Branch_Location', key: 'loc', width: 18 },
    { header: 'Basic_Salary (INR)', key: 'basic', width: 20 },
    { header: 'HRA (40% Basic)', key: 'hra', width: 20 },
    { header: 'DA (15% Basic)', key: 'da', width: 20 },
    { header: 'Gross_Salary (INR)', key: 'gross', width: 22 },
    { header: 'Reference_Type_Used', key: 'refType', width: 26 },
  ];
  const topic6Data = [];
  for (let i = 1; i <= 35; i++) {
    const sName = students[(i - 1) % students.length];
    const loc = locations[(i - 1) % locations.length];
    const basic = 25000 + (i * 1250);
    const hra = basic * 0.40;
    const da = basic * 0.15;
    const gross = basic + hra + da;
    topic6Data.push([
      `EMP-${2000 + i}`,
      sName,
      loc,
      basic,
      hra,
      da,
      gross,
      i === 1 ? 'Relative Formula: =D2+E2+F2' : 'Copied Down (Relative Referencing)'
    ]);
  }
  addStyledTopicSheet('Topic6_Cell_References', 'FF0284C7', topic6Cols, topic6Data);

  // Save workbook
  const outputPath = path.join(excelFilesDir, 'getting_started.xlsx');
  await wb.xlsx.writeFile(outputPath);
  console.log('✓ Successfully generated getting_started.xlsx in ' + outputPath);

  // Also write generate_sheets.cjs in the module directory for future reproducibility
  fs.copyFileSync(__filename, path.join(moduleDir, 'generate_sheets.cjs'));
  console.log('✓ Copied generate_sheets.cjs to module directory');
}

buildModule001().catch(console.error);
