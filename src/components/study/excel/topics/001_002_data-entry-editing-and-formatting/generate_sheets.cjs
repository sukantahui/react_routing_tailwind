const ExcelJS = require('E:/react_routing_tailwind/node_modules/exceljs');
const fs = require('fs');
const path = require('path');

const excelBaseDir = 'E:/react_routing_tailwind/src/components/study/excel';
const moduleDir = path.join(excelBaseDir, 'topics/001_002_data-entry-editing-and-formatting');
const excelFilesDir = path.join(moduleDir, 'excel_files');
if (!fs.existsSync(excelFilesDir)) fs.mkdirSync(excelFilesDir, { recursive: true });

async function buildWorkbook002() {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Coder & AccoTax';
  wb.lastModifiedBy = 'Sukanta Hui';
  wb.created = new Date();
  wb.modified = new Date();

  // Overview Sheet
  const wsOverview = wb.addWorksheet('Overview', { views: [{ showGridLines: true }] });
  wsOverview.columns = [{ width: 22 }, { width: 26 }, { width: 28 }, { width: 32 }, { width: 26 }, { width: 36 }];

  const logoPath = path.join(excelBaseDir, 'assets/cnat.png');
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
  bSub2.value = 'EXCEL MASTERCLASS: Module 1.2 - Data Entry, Editing & Custom Number Formatting\nCurriculum Code: EXCEL-PRO-901 | Student Practice & Laboratory Workbook';
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
    ['Curriculum Track', 'EXCEL-PRO-901: Microsoft Excel From Zero to Ultra Expert', 'Module Reference', '001_002_data-entry-editing-and-formatting'],
    ['Competency Level', 'CO1: Data Hygiene, Custom Formatting & Flash Fill', 'Total Topics', '10 Comprehensive Topics & 300 FAQ Questions'],
  ];
  s3Data.forEach((row, idx) => {
    const rowNum = 20 + idx;
    wsOverview.getCell(`A${rowNum}`).value = row[0];
    wsOverview.getCell(`B${rowNum}`).value = row[1];
    wsOverview.getCell(`C${rowNum}`).value = row[2];
    wsOverview.getCell(`D${rowNum}`).value = row[3];
  });

  // Section 4: Directory
  wsOverview.mergeCells('A23:F23');
  const s4Header = wsOverview.getCell('A23');
  s4Header.value = '📑 4. WORKBOOK SHEET DIRECTORY & LAB NAVIGATION';
  s4Header.font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: 'FFFFFFFF' } };
  s4Header.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD97706' } };

  const directoryRows = [
    ['Sheet Name', 'Target Topic', 'Primary Concept / Technique', 'Dataset Context', 'Rows', 'Practice Objective'],
    ['Topic0_Data_Types', 'Topic 0: Data Types', 'Text, Number, Date, Boolean Coercion', 'Barrackpore Academic Student Roster', '35', 'Test type alignment and value detection'],
    ['Topic1_Entry_Shortcuts', 'Topic 1: Entry Shortcuts', 'Ctrl+D, Ctrl+R, Alt+Down, Ctrl+;', 'Shyamnagar Retail Item Inward Register', '30', 'Practice instant date/time and fill shortcuts'],
    ['Topic2_Flash_Fill', 'Topic 2: Flash Fill & Lists', 'Pattern Extraction with Flash Fill (Ctrl+E)', 'Kolkata Corporate Employee Name Split', '40', 'Extract First/Last names, PAN cards, phone numbers'],
    ['Topic3_Row_Col_Ops', 'Topic 3: Row & Col Editing', 'Insert, Delete, Hide, Group & AutoFit', 'Ichapur Factory Machinery Master', '35', 'Manipulate grid structure and layout hygiene'],
    ['Topic4_Number_Format', 'Topic 4: Custom Number Format', 'INR Currency (₹), Thousands (k), Accounting', 'Naihati Wholesale Billing Register', '40', 'Apply custom format strings (₹#,##0.00;[Red]-₹#,##0.00)'],
    ['Topic5_Date_Time_Format', 'Topic 5: Date Serial Formats', 'Julian Serials, DD-MMM-YYYY, Elapsed Time', 'Titagarh Logistics Dispatch Schedule', '35', 'Convert date serials and calculate invoice aging'],
    ['Topic6_Alignment_Styles', 'Topic 6: Alignment & Styles', 'Wrap Text, Orientation, Indent, Cell Styles', 'Barrackpore Executive Income Statement', '30', 'Format board-ready financial statement layouts'],
    ['Topic7_Formatting_Lab', 'Topic 7: Comprehensive Lab', 'Integrated Data Hygiene & Formatting', 'Kolkata Distribution Master Database', '50', 'End-to-end data cleaning, formatting and auditing'],
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

  const students = ['Swadeep', 'Tuhina', 'Abhronila', 'Susmita', 'Debangshu', 'Rahul', 'Priya', 'Aniket', 'Sourav', 'Sneha', 'Bikram', 'Riya', 'Koyel', 'Suman', 'Arpan', 'Dipankar', 'Puja', 'Tanmay', 'Mousumi', 'Amit'];
  const locations = ['Barrackpore', 'Shyamnagar', 'Ichapur', 'Naihati', 'Titagarh', 'Kolkata', 'Kankinara', 'Sodepur'];

  // Topic0 Sheet: Data Types
  const t0Cols = [
    { header: 'Raw_Input_Value', key: 'raw', width: 22 },
    { header: 'Detected_Data_Type', key: 'type', width: 22 },
    { header: 'Default_Alignment', key: 'align', width: 18 },
    { header: 'Internal_Memory_Value', key: 'mem', width: 24 },
    { header: 'Coercion_Behavior', key: 'coer', width: 32 }
  ];
  const t0Data = [
    ['45000', 'Numeric (Integer)', 'Right-Aligned', '8-Byte Double Float', 'Directly usable in math (+, -, *, /)'],
    ['₹ 45,000.00', 'Formatted Number', 'Right-Aligned', '45000 (Format mask applied)', 'Underlying value remains purely numeric'],
    ['="45000"', 'Text String', 'Left-Aligned', 'UTF-16 String', 'Fails with +; converted with =VALUE() or *1'],
    ['27-Aug-2026', 'Date Serial', 'Right-Aligned', '46261 (Days since 1/1/1900)', 'Enables date subtraction and addition'],
    ['14:30:00', 'Time Serial', 'Right-Aligned', '0.604166 (Fraction of 24h)', 'Enables hourly rate multiplication (*24)'],
    ['TRUE', 'Boolean Logic', 'Center-Aligned', '1 (Logical TRUE)', 'Coerces to 1 with double unary (--TRUE)'],
    ['FALSE', 'Boolean Logic', 'Center-Aligned', '0 (Logical FALSE)', 'Coerces to 0 with double unary (--FALSE)'],
    ['#N/A', 'Error Token', 'Center-Aligned', 'Internal Error ID 7', 'Propagates through calculation dependencies']
  ];
  for (let i = 1; i <= 25; i++) {
    const sName = students[(i - 1) % students.length];
    t0Data.push([`STD-${1000 + i}`, 'Text String', 'Left-Aligned', sName, 'Concatenation & lookup key']);
  }
  addStyledTopicSheet('Topic0_Data_Types', 'FF0F172A', t0Cols, t0Data);

  // Topic2 Sheet: Flash Fill
  const t2Cols = [
    { header: 'Full_Customer_Name', key: 'full', width: 26 },
    { header: 'Extracted_First_Name (Ctrl+E)', key: 'first', width: 24 },
    { header: 'Extracted_Last_Name (Ctrl+E)', key: 'last', width: 24 },
    { header: 'Raw_Mobile_Number', key: 'mob', width: 20 },
    { header: 'Formatted_Mobile (Ctrl+E)', key: 'mobForm', width: 24 },
  ];
  const t2Data = [
    ['Swadeep Mukherjee', 'Swadeep', 'Mukherjee', '9830123456', '+91 98301-23456'],
    ['Tuhina Banerjee', 'Tuhina', 'Banerjee', '9831234567', '+91 98312-34567'],
    ['Abhronila Sengupta', 'Abhronila', 'Sengupta', '9832345678', '+91 98323-45678'],
    ['Susmita Chakraborty', 'Susmita', 'Chakraborty', '9833456789', '+91 98334-56789'],
    ['Debangshu Bhattacharya', 'Debangshu', 'Bhattacharya', '9834567890', '+91 98345-67890'],
    ['Rahul Goswami', 'Rahul', 'Goswami', '9835678901', '+91 98356-78901'],
    ['Priya Dutta', 'Priya', 'Dutta', '9836789012', '+91 98367-89012'],
    ['Aniket Majumder', 'Aniket', 'Majumder', '9837890123', '+91 98378-90123']
  ];
  for (let i = 9; i <= 35; i++) {
    const fn = students[(i - 1) % students.length];
    t2Data.push([`${fn} Roy`, fn, 'Roy', `983000${1000 + i}`, `+91 98300-0${1000 + i}`]);
  }
  addStyledTopicSheet('Topic2_Flash_Fill', 'FF0284C7', t2Cols, t2Data);

  // Topic4 Sheet: Number Formatting
  const t4Cols = [
    { header: 'Raw_Number', key: 'raw', width: 16 },
    { header: 'Custom_Format_Code', key: 'code', width: 32 },
    { header: 'Formatted_Display_Output', key: 'out', width: 26 },
    { header: 'Corporate_Accounting_Application', key: 'app', width: 34 }
  ];
  const t4Data = [
    [1250000, '₹ #,##,##0.00', '₹ 12,50,000.00', 'Indian Lakhs / Crores Currency Format'],
    [-45000, '₹ #,##0.00;[Red]-₹ #,##0.00', '-₹ 45,000.00 (Red)', 'Highlighting negative financial deficits'],
    [0.18, '0.0%', '18.0%', 'GST and TDS Statutory Percentage Display'],
    [14500000, '₹ 0.00,, " Cr"', '₹ 1.45 Cr', 'Executive Boardroom Crores Abbreviation'],
    [750000, '₹ 0.0, " L"', '₹ 7.5 L', 'Regional Sales Lakhs Abbreviation'],
    [9830123456, '+91 #####-#####', '+91 98301-23456', 'Indian Mobile Number Formatting Mask'],
    [700122, 'PIN-######', 'PIN-700122', 'Barrackpore Postal Code Masking'],
    [0, '₹ #,##0.00;-₹ #,##0.00;"-";@', '-', 'Standard Corporate Blanking of Zero Balances']
  ];
  for (let i = 9; i <= 35; i++) {
    t4Data.push([25000 + i * 1500, '₹ #,##,##0.00', `₹ ${(25000 + i * 1500).toLocaleString('en-IN')}.00`, 'Employee Monthly CTC Payroll']);
  }
  addStyledTopicSheet('Topic4_Number_Format', 'FF059669', t4Cols, t4Data);

  // Save workbook
  const outputPath = path.join(excelFilesDir, 'data_entry_formatting.xlsx');
  await wb.xlsx.writeFile(outputPath);
  console.log('✓ Successfully generated data_entry_formatting.xlsx');

  fs.copyFileSync(__filename, path.join(moduleDir, 'generate_sheets.cjs'));
  console.log('✓ Saved generate_sheets.cjs in module directory');
}

buildWorkbook002().catch(console.error);
