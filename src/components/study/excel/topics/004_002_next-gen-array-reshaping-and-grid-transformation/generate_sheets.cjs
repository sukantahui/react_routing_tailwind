const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

async function buildMasterWorkbook() {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Coder & AccoTax';
  wb.lastModifiedBy = 'Sukanta Hui';
  wb.created = new Date();
  wb.modified = new Date();

  // =========================================================================
  // SHEET 1: Overview (Landing Page - Protected with password 'sukantahui')
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

  // Embed CNAT Logo
  const logoPath = path.resolve(__dirname, '../../assets/cnat.png');
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

  // Header Banner (Rows 1-5, Cols C to F)
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
  bannerSub2.value = 'Official Enterprise Practice & Laboratory Master Workbook — EXCEL-PRO-901\nModule: Next-Gen Array Reshaping & Grid Transformation (004_002)\nCampus: 25(10/A) Shibtala Road, Nona Chandan Pukur, Barrackpore, Kolkata 700122';
  bannerSub2.font = { name: 'Segoe UI', size: 9, italic: true, color: { argb: 'FFFDE68A' } };
  bannerSub2.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true, indent: 1 };
  bannerSub2.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } };

  wsOverview.getRow(1).height = 22;
  wsOverview.getRow(2).height = 22;
  wsOverview.getRow(3).height = 20;
  wsOverview.getRow(4).height = 18;
  wsOverview.getRow(5).height = 18;
  wsOverview.getRow(6).height = 10;

  const borderStyle = {
    top: { style: 'thin', color: { argb: 'FFCBD5E1' } },
    left: { style: 'thin', color: { argb: 'FFCBD5E1' } },
    bottom: { style: 'thin', color: { argb: 'FFCBD5E1' } },
    right: { style: 'thin', color: { argb: 'FFCBD5E1' } }
  };

  const addSectionHeader = (rowNum, title, bgColor) => {
    wsOverview.mergeCells(`A${rowNum}:F${rowNum}`);
    const cell = wsOverview.getCell(`A${rowNum}`);
    cell.value = title;
    cell.font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FFFFFFFF' } };
    cell.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: bgColor } };
    wsOverview.getRow(rowNum).height = 24;
  };

  const addInfoRow = (rowNum, label, value, mergeCols = 'B:F') => {
    wsOverview.getCell(`A${rowNum}`).value = label;
    wsOverview.getCell(`A${rowNum}`).font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FF1E293B' } };
    wsOverview.getCell(`A${rowNum}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF1F5F9' } };
    wsOverview.getCell(`A${rowNum}`).border = borderStyle;
    wsOverview.getCell(`A${rowNum}`).alignment = { vertical: 'middle', horizontal: 'left' };

    const startCol = mergeCols.split(':')[0];
    const endCol = mergeCols.split(':')[1];
    wsOverview.mergeCells(`${startCol}${rowNum}:${endCol}${rowNum}`);
    const valCell = wsOverview.getCell(`${startCol}${rowNum}`);
    valCell.value = value;
    valCell.font = { name: 'Segoe UI', size: 9.5, color: { argb: 'FF334155' } };
    valCell.border = borderStyle;
    valCell.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };
    wsOverview.getRow(rowNum).height = 20;
  };

  // Section 1: Organisation Profile
  addSectionHeader(7, '🏢  SECTION 1: ORGANISATION PROFILE & CONTACT DETAILS', 'FF0284C7');
  addInfoRow(8, 'Institute Name', 'Coder & AccoTax');
  addInfoRow(9, 'Accreditation', 'ISO 9001:2015 Certified Centre of Excellence for IT & Financial Modeling');
  addInfoRow(10, 'Registered Campus', '25(10/A) Shibtala Road, Nona Chandan Pukur, Barrackpore, Kolkata 700122, WB, India');
  addInfoRow(11, 'Phone / WhatsApp', '+91 70037 56860');
  addInfoRow(12, 'Official Email', 'sukantahui@codernaccotax.co.in | info@codernaccotax.co.in');
  addInfoRow(13, 'Web Portal', 'https://codernaccotax.co.in');
  addInfoRow(14, 'Core Specializations', 'Full Stack Engineering, Modern Dynamic Arrays, Power Query, DAX, Corporate Taxation');

  wsOverview.getRow(15).height = 8;

  // Section 2: Mentor Profile
  addSectionHeader(16, '👨‍🏫  SECTION 2: LEAD INSTRUCTOR & MASTER MENTOR PROFILE', 'FF059669');
  addInfoRow(17, 'Lead Instructor', 'Sukanta Hui');
  addInfoRow(18, 'Designation', 'Senior Software Engineer, Corporate Financial Consultant & Lead Academic Mentor');
  addInfoRow(19, 'Industry Experience', '27+ Years of Experience in Building Scalable Software Applications & Mentoring (Since May 1998)');
  addInfoRow(20, 'GitHub Portfolio', 'https://github.com/sukantahui');
  addInfoRow(21, 'Technical Arsenal', 'Python, Advanced Excel 365, Power BI, DAX, SQL, Financial Modeling, React 19, Angular, C, C++');
  addInfoRow(22, 'Teaching Philosophy', 'Zero-VBA modern spreadsheet architecture using native dynamic vectorization and reshaping.');

  wsOverview.getRow(23).height = 8;

  // Section 3: Course Metrics
  addSectionHeader(24, '🎓  SECTION 3: COURSE & MODULE ACADEMIC METRICS', 'FF7C3AED');
  addInfoRow(25, 'Curriculum Code & Title', 'EXCEL-PRO-901: Microsoft Excel From Zero to Ultra Expert');
  addInfoRow(26, 'Active Module & Slug', 'Next-Gen Array Reshaping & Grid Transformation (004_002_next-gen-array-reshaping-and-grid-transformation)');
  addInfoRow(27, 'Bloom Taxonomy Level', 'Level 4 (Analyze), Level 5 (Evaluate) & Level 6 (Create)');
  addInfoRow(28, 'Prerequisites', 'Modern Lookup & Dynamic Array Functions (004_001)');
  addInfoRow(29, 'Total Module Topics', '14 Topics (Topic 0 to Topic 13) with 420 Assessment FAQs & Real-World Lab Data');

  wsOverview.getRow(30).height = 8;

  // Section 4: Sheet Navigation Directory
  addSectionHeader(31, '📑  SECTION 4: WORKBOOK SHEET DIRECTORY & LAB NAVIGATION', 'FFD97706');

  const dirHeaders = ['Sheet Name', 'Topic ID & Target', 'Primary Functions', 'Dataset Context', 'Rows / Dimension', 'Difficulty'];
  const dirCols = ['A', 'B', 'C', 'D', 'E', 'F'];
  dirHeaders.forEach((h, i) => {
    const cell = wsOverview.getCell(`${dirCols[i]}32`);
    cell.value = h;
    cell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E293B' } };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
    cell.border = borderStyle;
  });
  wsOverview.getRow(32).height = 22;

  const directoryRows = [
    ['Topic0_Overview', 'Topic 0: Overview', 'All 14 Reshaping Functions', 'Function Classification Matrix', '11 records', 'Intermediate'],
    ['Topic1_TOCOL', 'Topic 1: TOCOL Vector', 'TOCOL(range, ignore, scan)', 'Regional Quarterly Sales Matrix', '25 records', 'Moderate'],
    ['Topic2_TOROW', 'Topic 2: TOROW Vector', 'TOROW(range, ignore, scan)', 'Monthly Marketing Spend Matrix', '10 records', 'Moderate'],
    ['Topic3_CHOOSEROWS', 'Topic 3: CHOOSEROWS', 'CHOOSEROWS(array, r1, r2)', 'Employee Master Register', '15 records', 'Advanced'],
    ['Topic4_CHOOSECOLS', 'Topic 4: CHOOSECOLS', 'CHOOSECOLS(array, c1, c2)', 'Corporate Payroll Ledger', '10 records', 'Advanced'],
    ['Topic5_TAKE', 'Topic 5: TAKE Slicing', 'TAKE(array, rows, [cols])', 'Student Performance Rank List', '12 records', 'Moderate'],
    ['Topic6_DROP', 'Topic 6: DROP Exclusion', 'DROP(array, rows, [cols])', 'Raw Monthly Financial Report', '12 records', 'Moderate'],
    ['Topic7_EXPAND', 'Topic 7: EXPAND Padding', 'EXPAND(array, rows, cols)', 'Branch Disparate Dimension Data', '5 records', 'Advanced'],
    ['Topic8_WRAPROWS', 'Topic 8: WRAPROWS', 'WRAPROWS(vector, count)', 'Linear Customer Registration Stream', '30 items', 'Advanced'],
    ['Topic9_WRAPCOLS', 'Topic 9: WRAPCOLS', 'WRAPCOLS(vector, count)', 'Academic Timetable Period Stream', '25 items', 'Advanced'],
    ['Topic10_VSTACK_HSTACK', 'Topic 10: VSTACK & HSTACK', 'VSTACK, HSTACK', '3 Branch Ledgers & Department KPIs', '9 records', 'Expert'],
    ['Topic11_Matrix_Alignment', 'Topic 11: Matrix Align', 'TRANSPOSE, VSTACK, TOCOL', 'Multi-Year Budget Schedules', '6 records', 'Expert'],
    ['Topic12_Bank_Statement', 'Topic 12: Bank Statement Project', 'WRAPROWS, CHOOSECOLS, TOCOL', 'Unformatted Multi-Column Bank Dump', '20 records', 'Expert'],
    ['Topic13_Challenge_Lab', 'Topic 13: Capstone Challenge', 'VSTACK, CHOOSEROWS, FILTER, TAKE', 'Consolidated Supply Chain Dispatch', '10 records', 'Mastery'],
  ];

  directoryRows.forEach((row, idx) => {
    const rowNum = 33 + idx;
    row.forEach((val, cIdx) => {
      const cell = wsOverview.getCell(`${dirCols[cIdx]}${rowNum}`);
      cell.value = val;
      cell.font = { name: 'Segoe UI', size: 9, color: { argb: 'FF334155' } };
      cell.border = borderStyle;
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: idx % 2 === 0 ? 'FFFFFFFF' : 'FFF8FAFC' }
      };
      cell.alignment = {
        vertical: 'middle',
        horizontal: cIdx === 0 || cIdx === 2 ? 'left' : (cIdx === 4 || cIdx === 5 ? 'center' : 'left'),
        indent: cIdx === 0 ? 1 : 0
      };
    });
    wsOverview.getRow(rowNum).height = 20;
  });

  // Protect Overview Landing Sheet
  await wsOverview.protect('sukantahui', {
    selectLockedCells: true,
    selectUnlockedCells: true
  });

  // Helper for Styled Topic Sheets
  const addStyledTopicSheet = (sheetName, headerColor, columns, data, columnWidths = {}) => {
    const ws = wb.addWorksheet(sheetName, { views: [{ showGridLines: true }] });

    ws.columns = columns.map(c => ({
      key: c.key,
      width: columnWidths[c.key] || 22
    }));

    // Header Row
    const headerRow = ws.getRow(1);
    columns.forEach((col, idx) => {
      const cell = headerRow.getCell(idx + 1);
      cell.value = col.header;
      cell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFFFF' } };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: headerColor } };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
      cell.border = borderStyle;
    });
    headerRow.height = 26;

    // Data Rows
    data.forEach((item, rIdx) => {
      const row = ws.getRow(rIdx + 2);
      columns.forEach((col, cIdx) => {
        const cell = row.getCell(cIdx + 1);
        const val = item[col.key];
        if (val !== undefined && val !== null) {
          if (typeof val === 'object' && val.f) {
            cell.value = val;
          } else {
            cell.value = val;
          }
        } else {
          cell.value = '';
        }

        cell.font = { name: 'Segoe UI', size: 9.5, color: { argb: 'FF1E293B' } };
        cell.border = borderStyle;
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: rIdx % 2 === 0 ? 'FFFFFFFF' : 'FFF8FAFC' }
        };

        if (typeof val === 'number') {
          cell.alignment = { vertical: 'middle', horizontal: 'right' };
          if (col.isCurrency) cell.numFmt = '₹#,##0.00';
          else if (col.isNumber) cell.numFmt = '#,##0';
        } else {
          cell.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
        }
      });
      row.height = 20;
    });

    return ws;
  };

  // =========================================================================
  // SHEET 2: Topic0_Overview (Reshaping Functions Classification Matrix)
  // =========================================================================
  const t0Cols = [
    { header: 'Function_Name', key: 'name' },
    { header: 'Category', key: 'category' },
    { header: 'Syntax_Signature', key: 'syntax' },
    { header: 'Input_Type', key: 'input' },
    { header: 'Output_Type', key: 'output' },
    { header: 'Key_Use_Case', key: 'useCase' },
  ];
  const t0Data = [
    { name: 'TOCOL', category: 'Vector Flattening', syntax: '=TOCOL(array, [ignore], [scan_by_col])', input: '2D Matrix / Range', output: '1D Vertical Column', useCase: 'Flatten cross-tab tables into single vertical lists' },
    { name: 'TOROW', category: 'Vector Flattening', syntax: '=TOROW(array, [ignore], [scan_by_col])', input: '2D Matrix / Range', output: '1D Horizontal Row', useCase: 'Unpivot 2D tables into horizontal banner streams' },
    { name: 'CHOOSEROWS', category: 'Slicing & Subsetting', syntax: '=CHOOSEROWS(array, row_num1, [row_num2]...)', input: '2D Matrix', output: 'Subset 2D Matrix', useCase: 'Extract specific rows using positive or negative indexes' },
    { name: 'CHOOSECOLS', category: 'Slicing & Subsetting', syntax: '=CHOOSECOLS(array, col_num1, [col_num2]...)', input: '2D Matrix', output: 'Subset 2D Matrix', useCase: 'Extract and dynamically reorder table columns' },
    { name: 'TAKE', category: 'Boundary Slicing', syntax: '=TAKE(array, rows, [columns])', input: '2D Matrix', output: 'Subset 2D Matrix', useCase: 'Extract Top N or Bottom N records from tables' },
    { name: 'DROP', category: 'Boundary Exclusion', syntax: '=DROP(array, rows, [columns])', input: '2D Matrix', output: 'Subset 2D Matrix', useCase: 'Strip headers, footers, or margin columns dynamically' },
    { name: 'EXPAND', category: 'Matrix Resizing', syntax: '=EXPAND(array, rows, [cols], [pad_with])', input: '2D Matrix / Vector', output: 'Expanded 2D Matrix', useCase: 'Pad mismatched tables with default values before stacking' },
    { name: 'WRAPROWS', category: 'Stream Transformation', syntax: '=WRAPROWS(vector, wrap_count, [pad_with])', input: '1D Vector', output: '2D Matrix (Row-wise)', useCase: 'Reshape continuous text/number feeds into tabular records' },
    { name: 'WRAPCOLS', category: 'Stream Transformation', syntax: '=WRAPCOLS(vector, wrap_count, [pad_with])', input: '1D Vector', output: '2D Matrix (Col-wise)', useCase: 'Reshape 1D data streams into fixed-height column matrices' },
    { name: 'VSTACK', category: 'Array Stacking', syntax: '=VSTACK(array1, [array2]...)', input: 'Multiple Arrays', output: 'Unified Vertical Array', useCase: 'Append multiple branch or monthly tables vertically' },
    { name: 'HSTACK', category: 'Array Stacking', syntax: '=HSTACK(array1, [array2]...)', input: 'Multiple Arrays', output: 'Unified Horizontal Array', useCase: 'Combine side-by-side datasets into a wide matrix' },
  ];
  addStyledTopicSheet('Topic0_Overview', 'FF0F172A', t0Cols, t0Data, {
    name: 18, category: 22, syntax: 38, input: 20, output: 22, useCase: 45
  });

  // =========================================================================
  // SHEET 3: Topic1_TOCOL (Regional Quarterly Sales Matrix with Blanks & Errors)
  // =========================================================================
  const t1Cols = [
    { header: 'Store_Branch', key: 'branch' },
    { header: 'Q1_Sales', key: 'q1', isCurrency: true },
    { header: 'Q2_Sales', key: 'q2', isCurrency: true },
    { header: 'Q3_Sales', key: 'q3', isCurrency: true },
    { header: 'Q4_Sales', key: 'q4', isCurrency: true },
  ];
  const t1Data = [
    { branch: 'Barrackpore Central', q1: 145000, q2: 168000, q3: 192000, q4: 215000 },
    { branch: 'Shyamnagar North', q1: 98000, q2: null, q3: 115000, q4: 132000 },
    { branch: 'Ichapur Bazar', q1: 112000, q2: 124000, q3: null, q4: 148000 },
    { branch: 'Naihati Station Road', q1: 178000, q2: 195000, q3: 210000, q4: 245000 },
    { branch: 'Titagarh Link Road', q1: 85000, q2: 92000, q3: 99000, q4: null },
    { branch: 'Kolkata Salt Lake', q1: 320000, q2: 345000, q3: 380000, q4: 410000 },
    { branch: 'Sodepur High Road', q1: 135000, q2: 148000, q3: 162000, q4: 175000 },
    { branch: 'Khardah Station Rd', q1: 92000, q2: 104000, q3: 118000, q4: 129000 },
    { branch: 'Barasat Pioneer Park', q1: 210000, q2: 228000, q3: 252000, q4: 280000 },
    { branch: 'Madhyamgram Chowrasta', q1: 125000, q2: 138000, q3: 154000, q4: 168000 },
    { branch: 'Dum Dum Junction', q1: 275000, q2: 295000, q3: 318000, q4: 350000 },
    { branch: 'Belgharia Bazar', q1: 140000, q2: 155000, q3: 170000, q4: 188000 },
    { branch: 'Agarpara Station Rd', q1: 88000, q2: 96000, q3: 108000, q4: 119000 },
    { branch: 'Panihati Main Road', q1: 115000, q2: 128000, q3: 142000, q4: 158000 },
    { branch: 'Rajarhat Expressway', q1: 340000, q2: 375000, q3: 410000, q4: 460000 },
    { branch: 'New Town Axis Mall', q1: 420000, q2: 465000, q3: 510000, q4: 580000 },
    { branch: 'Howrah Station Link', q1: 260000, q2: 285000, q3: 310000, q4: 340000 },
    { branch: 'Bally Bridge Hub', q1: 105000, q2: 118000, q3: 130000, q4: 145000 },
    { branch: 'Uttarpara GT Road', q1: 130000, q2: 142000, q3: 158000, q4: 172000 },
    { branch: 'Serampore Court Rd', q1: 165000, q2: 182000, q3: 198000, q4: 220000 },
    { branch: 'Chinsurah Strand Rd', q1: 150000, q2: 168000, q3: 185000, q4: 205000 },
    { branch: 'Chandannagar Ferry', q1: 142000, q2: 156000, q3: 172000, q4: 190000 },
    { branch: 'Bandel Junction', q1: 120000, q2: 134000, q3: 148000, q4: 164000 },
    { branch: 'Kanchrapara Workshop', q1: 138000, q2: 152000, q3: 166000, q4: 182000 },
    { branch: 'Kalyani Central Park', q1: 185000, q2: 205000, q3: 228000, q4: 255000 },
  ];
  addStyledTopicSheet('Topic1_TOCOL', 'FF0284C7', t1Cols, t1Data, {
    branch: 26, q1: 18, q2: 18, q3: 18, q4: 18
  });

  // =========================================================================
  // SHEET 4: Topic2_TOROW (Monthly Marketing Spend Matrix to Unpivot Horizontally)
  // =========================================================================
  const t2Cols = [
    { header: 'Channel', key: 'channel' },
    { header: 'Jan_Spend', key: 'jan', isCurrency: true },
    { header: 'Feb_Spend', key: 'feb', isCurrency: true },
    { header: 'Mar_Spend', key: 'mar', isCurrency: true },
    { header: 'Apr_Spend', key: 'apr', isCurrency: true },
    { header: 'May_Spend', key: 'may', isCurrency: true },
  ];
  const t2Data = [
    { channel: 'Google Search Ads', jan: 45000, feb: 52000, mar: 58000, apr: 64000, may: 70000 },
    { channel: 'Meta / Instagram Ads', jan: 38000, feb: 42000, mar: 49000, apr: 55000, may: 62000 },
    { channel: 'YouTube Video Promos', jan: 25000, feb: 28000, mar: 34000, apr: 39000, may: 45000 },
    { channel: 'LinkedIn B2B Campaign', jan: 30000, feb: 35000, mar: 40000, apr: 44000, may: 48000 },
    { channel: 'Local Hoardings (BT Rd)', jan: 50000, feb: 50000, mar: 50000, apr: 50000, may: 50000 },
    { channel: 'Newspaper Inserts', jan: 15000, feb: 18000, mar: 16000, apr: 19000, may: 22000 },
    { channel: 'WhatsApp Broadcasts', jan: 8000, feb: 9500, mar: 11000, apr: 12500, may: 14000 },
    { channel: 'SMS Marketing Gateway', jan: 6000, feb: 6500, mar: 7200, apr: 8000, may: 9000 },
    { channel: 'Influencer Collabs', jan: 20000, feb: 25000, mar: 30000, apr: 35000, may: 40000 },
    { channel: 'Email Newsletter Push', jan: 5000, feb: 5500, mar: 6000, apr: 6500, may: 7000 },
  ];
  addStyledTopicSheet('Topic2_TOROW', 'FF0D9488', t2Cols, t2Data, {
    channel: 26, jan: 16, feb: 16, mar: 16, apr: 16, may: 16
  });

  // =========================================================================
  // SHEET 5: Topic3_CHOOSEROWS (Employee Master Register for Slicing)
  // =========================================================================
  const t3Cols = [
    { header: 'Emp_ID', key: 'id' },
    { header: 'Employee_Name', key: 'name' },
    { header: 'Department', key: 'dept' },
    { header: 'Designation', key: 'role' },
    { header: 'Location', key: 'location' },
    { header: 'Experience_Yrs', key: 'exp', isNumber: true },
    { header: 'Monthly_Salary', key: 'salary', isCurrency: true },
  ];
  const t3Data = [
    { id: 'EMP-101', name: 'Swadeep Banerjee', dept: 'Software Dev', role: 'Full Stack Engineer', location: 'Barrackpore', exp: 6, salary: 85000 },
    { id: 'EMP-102', name: 'Tuhina Mukherjee', dept: 'Data Science', role: 'Lead Data Analyst', location: 'Shyamnagar', exp: 5, salary: 78000 },
    { id: 'EMP-103', name: 'Abhronila Sengupta', dept: 'Taxation & Audit', role: 'Senior Tax Consultant', location: 'Ichapur', exp: 7, salary: 92000 },
    { id: 'EMP-104', name: 'Susmita Roy', dept: 'Finance', role: 'Corporate Controller', location: 'Naihati', exp: 8, salary: 98000 },
    { id: 'EMP-105', name: 'Debangshu Ghosh', dept: 'Software Dev', role: 'DevOps Architect', location: 'Titagarh', exp: 9, salary: 115000 },
    { id: 'EMP-106', name: 'Rahul Karmakar', dept: 'Digital Marketing', role: 'Campaign Strategist', location: 'Kolkata', exp: 4, salary: 62000 },
    { id: 'EMP-107', name: 'Priya Chakraborty', dept: 'Human Resources', role: 'Talent Acquisition Lead', location: 'Sodepur', exp: 5, salary: 68000 },
    { id: 'EMP-108', name: 'Aniket Dutta', dept: 'Software Dev', role: 'Frontend Specialist', location: 'Khardah', exp: 3, salary: 55000 },
    { id: 'EMP-109', name: 'Sourav Paul', dept: 'Data Science', role: 'BI & DAX Developer', location: 'Barasat', exp: 6, salary: 82000 },
    { id: 'EMP-110', name: 'Sneha Sarkar', dept: 'Taxation & Audit', role: 'GST & Compliance Officer', location: 'Madhyamgram', exp: 4, salary: 64000 },
    { id: 'EMP-111', name: 'Sayandeep Bose', dept: 'Software Dev', role: 'Cloud Engineer', location: 'Barrackpore', exp: 5, salary: 79000 },
    { id: 'EMP-112', name: 'Riya Chatterjee', dept: 'Finance', role: 'Financial Analyst', location: 'Dum Dum', exp: 3, salary: 58000 },
    { id: 'EMP-113', name: 'Anupam Maitra', dept: 'Taxation & Audit', role: 'Audit Manager', location: 'Rajarhat', exp: 10, salary: 125000 },
    { id: 'EMP-114', name: 'Moumita Nandi', dept: 'Human Resources', role: 'HR Business Partner', location: 'Salt Lake', exp: 6, salary: 76000 },
    { id: 'EMP-115', name: 'Subham Adhikary', dept: 'Software Dev', role: 'Backend Developer', location: 'Howrah', exp: 4, salary: 65000 },
  ];
  addStyledTopicSheet('Topic3_CHOOSEROWS', 'FF7C3AED', t3Cols, t3Data, {
    id: 14, name: 22, dept: 20, role: 24, location: 18, exp: 16, salary: 18
  });

  // =========================================================================
  // SHEET 6: Topic4_CHOOSECOLS (Corporate Payroll Ledger for Column Selection)
  // =========================================================================
  const t4Cols = [
    { header: 'Emp_ID', key: 'id' },
    { header: 'First_Name', key: 'fname' },
    { header: 'Last_Name', key: 'lname' },
    { header: 'Dept_Code', key: 'dcode' },
    { header: 'Branch_City', key: 'city' },
    { header: 'Basic_Pay', key: 'basic', isCurrency: true },
    { header: 'HRA_Allowance', key: 'hra', isCurrency: true },
    { header: 'PF_Deduction', key: 'pf', isCurrency: true },
    { header: 'Gross_Salary', key: 'gross', isCurrency: true },
    { header: 'Net_Payable', key: 'net', isCurrency: true },
  ];
  const t4Data = [
    { id: 'EMP-101', fname: 'Swadeep', lname: 'Banerjee', dcode: 'DEV-01', city: 'Barrackpore', basic: 50000, hra: 25000, pf: 6000, gross: 75000, net: 69000 },
    { id: 'EMP-102', fname: 'Tuhina', lname: 'Mukherjee', dcode: 'DS-02', city: 'Shyamnagar', basic: 46000, hra: 23000, pf: 5520, gross: 69000, net: 63480 },
    { id: 'EMP-103', fname: 'Abhronila', lname: 'Sengupta', dcode: 'TAX-03', city: 'Ichapur', basic: 54000, hra: 27000, pf: 6480, gross: 81000, net: 74520 },
    { id: 'EMP-104', fname: 'Susmita', lname: 'Roy', dcode: 'FIN-04', city: 'Naihati', basic: 58000, hra: 29000, pf: 6960, gross: 87000, net: 80040 },
    { id: 'EMP-105', fname: 'Debangshu', lname: 'Ghosh', dcode: 'DEV-01', city: 'Titagarh', basic: 68000, hra: 34000, pf: 8160, gross: 102000, net: 93840 },
    { id: 'EMP-106', fname: 'Rahul', lname: 'Karmakar', dcode: 'MKT-05', city: 'Kolkata', basic: 36000, hra: 18000, pf: 4320, gross: 54000, net: 49680 },
    { id: 'EMP-107', fname: 'Priya', lname: 'Chakraborty', dcode: 'HR-06', city: 'Sodepur', basic: 40000, hra: 20000, pf: 4800, gross: 60000, net: 55200 },
    { id: 'EMP-108', fname: 'Aniket', lname: 'Dutta', dcode: 'DEV-01', city: 'Khardah', basic: 32000, hra: 16000, pf: 3840, gross: 48000, net: 44160 },
    { id: 'EMP-109', fname: 'Sourav', lname: 'Paul', dcode: 'DS-02', city: 'Barasat', basic: 48000, hra: 24000, pf: 5760, gross: 72000, net: 66240 },
    { id: 'EMP-110', fname: 'Sneha', lname: 'Sarkar', dcode: 'TAX-03', city: 'Madhyamgram', basic: 38000, hra: 19000, pf: 4560, gross: 57000, net: 52440 },
  ];
  addStyledTopicSheet('Topic4_CHOOSECOLS', 'FF4F46E5', t4Cols, t4Data, {
    id: 14, fname: 16, lname: 16, dcode: 14, city: 18, basic: 16, hra: 16, pf: 16, gross: 16, net: 16
  });

  // =========================================================================
  // SHEET 7: Topic5_TAKE (Student Scorecard for Top/Bottom N extraction)
  // =========================================================================
  const t5Cols = [
    { header: 'Rank', key: 'rank', isNumber: true },
    { header: 'Student_Name', key: 'name' },
    { header: 'Centre_Location', key: 'centre' },
    { header: 'Excel_Score', key: 'excel', isNumber: true },
    { header: 'Python_Score', key: 'python', isNumber: true },
    { header: 'PowerBI_Score', key: 'powerbi', isNumber: true },
    { header: 'Aggregate_Total', key: 'total', isNumber: true },
    { header: 'Grade', key: 'grade' },
  ];
  const t5Data = [
    { rank: 1, name: 'Abhronila Sengupta', centre: 'Ichapur', excel: 99, python: 96, powerbi: 98, total: 293, grade: 'A++' },
    { rank: 2, name: 'Debangshu Ghosh', centre: 'Titagarh', excel: 98, python: 97, powerbi: 95, total: 290, grade: 'A++' },
    { rank: 3, name: 'Swadeep Banerjee', centre: 'Barrackpore', excel: 97, python: 95, powerbi: 96, total: 288, grade: 'A++' },
    { rank: 4, name: 'Tuhina Mukherjee', centre: 'Shyamnagar', excel: 96, python: 94, powerbi: 97, total: 287, grade: 'A+' },
    { rank: 5, name: 'Susmita Roy', centre: 'Naihati', excel: 95, python: 93, powerbi: 94, total: 282, grade: 'A+' },
    { rank: 6, name: 'Sourav Paul', centre: 'Barasat', excel: 92, python: 91, powerbi: 93, total: 276, grade: 'A+' },
    { rank: 7, name: 'Sayandeep Bose', centre: 'Barrackpore', excel: 90, python: 89, powerbi: 91, total: 270, grade: 'A' },
    { rank: 8, name: 'Priya Chakraborty', centre: 'Sodepur', excel: 88, python: 87, powerbi: 90, total: 265, grade: 'A' },
    { rank: 9, name: 'Sneha Sarkar', centre: 'Madhyamgram', excel: 86, python: 85, powerbi: 88, total: 259, grade: 'A' },
    { rank: 10, name: 'Rahul Karmakar', centre: 'Kolkata', excel: 84, python: 82, powerbi: 85, total: 251, grade: 'B+' },
    { rank: 11, name: 'Aniket Dutta', centre: 'Khardah', excel: 82, python: 80, powerbi: 83, total: 245, grade: 'B+' },
    { rank: 12, name: 'Riya Chatterjee', centre: 'Dum Dum', excel: 79, python: 78, powerbi: 81, total: 238, grade: 'B' },
  ];
  addStyledTopicSheet('Topic5_TAKE', 'FF059669', t5Cols, t5Data, {
    rank: 10, name: 22, centre: 18, excel: 14, python: 14, powerbi: 14, total: 16, grade: 12
  });

  // =========================================================================
  // SHEET 8: Topic6_DROP (Raw Report with Headers & Footers to Strip)
  // =========================================================================
  const t6Cols = [
    { header: 'Report_Metadata_Col1', key: 'c1' },
    { header: 'Report_Metadata_Col2', key: 'c2' },
    { header: 'Report_Metadata_Col3', key: 'c3' },
    { header: 'Report_Metadata_Col4', key: 'c4' },
    { header: 'Report_Metadata_Col5', key: 'c5' },
  ];
  const t6Data = [
    { c1: '*** REPORT TITLE: MONTHLY REVENUE STATEMENT ***', c2: '', c3: '', c4: '', c5: '' },
    { c1: '*** GENERATED BY SAP ERP AT 2026-08-01 00:00 ***', c2: '', c3: '', c4: '', c5: '' },
    { c1: 'Invoice_No', c2: 'Customer_Name', c3: 'Branch_Location', c4: 'Net_Amount', c5: 'GST_Amount' },
    { c1: 'INV-9001', c2: 'Swadeep Banerjee', c3: 'Barrackpore', c4: 45000, c5: 8100 },
    { c1: 'INV-9002', c2: 'Tuhina Mukherjee', c3: 'Shyamnagar', c4: 38000, c5: 6840 },
    { c1: 'INV-9003', c2: 'Abhronila Sengupta', c3: 'Ichapur', c4: 52000, c5: 9360 },
    { c1: 'INV-9004', c2: 'Susmita Roy', c3: 'Naihati', c4: 61000, c5: 10980 },
    { c1: 'INV-9005', c2: 'Debangshu Ghosh', c3: 'Titagarh', c4: 74000, c5: 13320 },
    { c1: 'INV-9006', c2: 'Rahul Karmakar', c3: 'Kolkata', c4: 29000, c5: 5220 },
    { c1: 'INV-9007', c2: 'Priya Chakraborty', c3: 'Sodepur', c4: 35000, c5: 6300 },
    { c1: '*** SUMMARY: TOTAL MONTHLY REVENUE ***', c2: '7 INVOICES', c3: 'ALL BRANCHES', c4: 334000, c5: 60120 },
    { c1: '*** END OF REPORT — CONFIDENTIAL ***', c2: '', c3: '', c4: '', c5: '' },
  ];
  addStyledTopicSheet('Topic6_DROP', 'FFB45309', t6Cols, t6Data, {
    c1: 30, c2: 24, c3: 20, c4: 18, c5: 18
  });

  // =========================================================================
  // SHEET 9: Topic7_EXPAND (Branch Tables with Disparate Shapes to Pad)
  // =========================================================================
  const t7Cols = [
    { header: 'Item_SKU', key: 'sku' },
    { header: 'Product_Name', key: 'prod' },
    { header: 'Stock_Qty', key: 'qty', isNumber: true },
    { header: 'Unit_Price', key: 'price', isCurrency: true },
  ];
  const t7Data = [
    { sku: 'SKU-01', prod: 'Excel Pro 365 Handbook', qty: 150, price: 650 },
    { sku: 'SKU-02', prod: 'Python Data Science Kit', qty: 120, price: 950 },
    { sku: 'SKU-03', prod: 'Power BI Master Workbook', qty: 95, price: 800 },
    { sku: 'SKU-04', prod: 'Tally Prime GST Guide', qty: 180, price: 550 },
    { sku: 'SKU-05', prod: 'Corporate Tax Handbook', qty: 80, price: 1100 },
  ];
  addStyledTopicSheet('Topic7_EXPAND', 'FFD97706', t7Cols, t7Data, {
    sku: 16, prod: 28, qty: 14, price: 16
  });

  // =========================================================================
  // SHEET 10: Topic8_WRAPROWS (Continuous 1D Stream of Customer Signups)
  // =========================================================================
  const t8Cols = [
    { header: 'Feed_Index', key: 'idx', isNumber: true },
    { header: 'Raw_Data_Stream', key: 'stream' },
  ];
  const t8Data = [
    { idx: 1, stream: 'REG-201' }, { idx: 2, stream: 'Swadeep Banerjee' }, { idx: 3, stream: 'Barrackpore' }, { idx: 4, stream: 'Advanced Excel' }, { idx: 5, stream: '9500' },
    { idx: 6, stream: 'REG-202' }, { idx: 7, stream: 'Tuhina Mukherjee' }, { idx: 8, stream: 'Shyamnagar' }, { idx: 9, stream: 'Python Data' }, { idx: 10, stream: '12000' },
    { idx: 11, stream: 'REG-203' }, { idx: 12, stream: 'Abhronila Sengupta' }, { idx: 13, stream: 'Ichapur' }, { idx: 14, stream: 'GST Corporate' }, { idx: 15, stream: '8500' },
    { idx: 16, stream: 'REG-204' }, { idx: 17, stream: 'Susmita Roy' }, { idx: 18, stream: 'Naihati' }, { idx: 19, stream: 'Power BI DAX' }, { idx: 20, stream: '11000' },
    { idx: 21, stream: 'REG-205' }, { idx: 22, stream: 'Debangshu Ghosh' }, { idx: 23, stream: 'Titagarh' }, { idx: 24, stream: 'Full Stack Web' }, { idx: 25, stream: '15000' },
    { idx: 26, stream: 'REG-206' }, { idx: 27, stream: 'Rahul Karmakar' }, { idx: 28, stream: 'Kolkata' }, { idx: 29, stream: 'Digital Marketing' }, { idx: 30, stream: '7500' },
  ];
  addStyledTopicSheet('Topic8_WRAPROWS', 'FF0284C7', t8Cols, t8Data, {
    idx: 14, stream: 28
  });

  // =========================================================================
  // SHEET 11: Topic9_WRAPCOLS (Weekly Class Schedule Stream)
  // =========================================================================
  const t9Cols = [
    { header: 'Period_Index', key: 'pid', isNumber: true },
    { header: 'Class_Lecture_Topic', key: 'lecture' },
  ];
  const t9Data = [
    { pid: 1, lecture: 'Mon P1: Dynamic Arrays' }, { pid: 2, lecture: 'Mon P2: Spill Operator' }, { pid: 3, lecture: 'Mon P3: UNIQUE' }, { pid: 4, lecture: 'Mon P4: FILTER' }, { pid: 5, lecture: 'Mon P5: SORT' },
    { pid: 6, lecture: 'Tue P1: SORTBY' }, { pid: 7, lecture: 'Tue P2: SEQUENCE' }, { pid: 8, lecture: 'Tue P3: RANDARRAY' }, { pid: 9, lecture: 'Tue P4: XLOOKUP 2-Way' }, { pid: 10, lecture: 'Tue P5: Dynamic Lists' },
    { pid: 11, lecture: 'Wed P1: TOCOL Basics' }, { pid: 12, lecture: 'Wed P2: TOCOL Flags' }, { pid: 13, lecture: 'Wed P3: TOROW Vector' }, { pid: 14, lecture: 'Wed P4: CHOOSEROWS' }, { pid: 15, lecture: 'Wed P5: CHOOSECOLS' },
    { pid: 16, lecture: 'Thu P1: TAKE Top N' }, { pid: 17, lecture: 'Thu P2: DROP Headers' }, { pid: 18, lecture: 'Thu P3: EXPAND Matrix' }, { pid: 19, lecture: 'Thu P4: WRAPROWS' }, { pid: 20, lecture: 'Thu P5: WRAPCOLS' },
    { pid: 21, lecture: 'Fri P1: VSTACK Consolidation' }, { pid: 22, lecture: 'Fri P2: HSTACK Metrics' }, { pid: 23, lecture: 'Fri P3: Matrix Transpose' }, { pid: 24, lecture: 'Fri P4: Bank Project' }, { pid: 25, lecture: 'Fri P5: Capstone Lab' },
  ];
  addStyledTopicSheet('Topic9_WRAPCOLS', 'FF0D9488', t9Cols, t9Data, {
    pid: 14, lecture: 32
  });

  // =========================================================================
  // SHEET 12: Topic10_VSTACK_HSTACK (Multi-Branch Transaction Ledger Consolidation)
  // =========================================================================
  const t10Cols = [
    { header: 'Branch_Unit', key: 'branch' },
    { header: 'Txn_ID', key: 'tid' },
    { header: 'Client_Name', key: 'client' },
    { header: 'Service_Package', key: 'pkg' },
    { header: 'Invoice_Amount', key: 'amt', isCurrency: true },
    { header: 'Payment_Mode', key: 'mode' },
  ];
  const t10Data = [
    { branch: 'Barrackpore Central', tid: 'BK-101', client: 'Swadeep Banerjee', pkg: 'Advanced Excel 365', amt: 9500, mode: 'UPI' },
    { branch: 'Barrackpore Central', tid: 'BK-102', client: 'Debangshu Ghosh', pkg: 'Full Stack MERN', amt: 16000, mode: 'Net Banking' },
    { branch: 'Barrackpore Central', tid: 'BK-103', client: 'Sayandeep Bose', pkg: 'Python AI & DS', amt: 12500, mode: 'UPI' },
    { branch: 'Shyamnagar North', tid: 'SH-201', client: 'Tuhina Mukherjee', pkg: 'Data Analytics Mastery', amt: 11000, mode: 'Card' },
    { branch: 'Shyamnagar North', tid: 'SH-202', client: 'Aniket Dutta', pkg: 'Frontend UI/UX', amt: 8500, mode: 'UPI' },
    { branch: 'Ichapur Hub', tid: 'IC-301', client: 'Abhronila Sengupta', pkg: 'Corporate GST & Tax', amt: 9000, mode: 'UPI' },
    { branch: 'Ichapur Hub', tid: 'IC-302', client: 'Priya Chakraborty', pkg: 'HR Management', amt: 7800, mode: 'Net Banking' },
    { branch: 'Naihati South', tid: 'NH-401', client: 'Susmita Roy', pkg: 'Financial Modeling', amt: 13500, mode: 'UPI' },
    { branch: 'Naihati South', tid: 'NH-402', client: 'Sourav Paul', pkg: 'Power BI & DAX', amt: 10500, mode: 'Card' },
  ];
  addStyledTopicSheet('Topic10_VSTACK_HSTACK', 'FF7C3AED', t10Cols, t10Data, {
    branch: 22, tid: 14, client: 22, pkg: 24, amt: 16, mode: 16
  });

  // =========================================================================
  // SHEET 13: Topic11_Matrix_Alignment (Multi-Year Budget Comparison Blocks)
  // =========================================================================
  const t11Cols = [
    { header: 'Department', key: 'dept' },
    { header: 'FY2024_Budget', key: 'fy24', isCurrency: true },
    { header: 'FY2025_Budget', key: 'fy25', isCurrency: true },
    { header: 'FY2026_Projected', key: 'fy26', isCurrency: true },
    { header: 'YoY_Growth_Pct', key: 'growth' },
  ];
  const t11Data = [
    { dept: 'Software Development', fy24: 1200000, fy25: 1500000, fy26: 1850000, growth: '23.3%' },
    { dept: 'Data Science & AI', fy24: 950000, fy25: 1300000, fy26: 1700000, growth: '30.8%' },
    { dept: 'Taxation & Legal Compliance', fy24: 800000, fy25: 920000, fy26: 1100000, growth: '19.6%' },
    { dept: 'Corporate Financial Advisory', fy24: 1100000, fy25: 1280000, fy26: 1450000, growth: '13.3%' },
    { dept: 'Digital Growth & Media', fy24: 650000, fy25: 850000, fy26: 1150000, growth: '35.3%' },
    { dept: 'Human Capital Development', fy24: 500000, fy25: 600000, fy26: 720000, growth: '20.0%' },
  ];
  addStyledTopicSheet('Topic11_Matrix_Alignment', 'FF0284C7', t11Cols, t11Data, {
    dept: 28, fy24: 18, fy25: 18, fy26: 18, growth: 16
  });

  // =========================================================================
  // SHEET 14: Topic12_Bank_Statement (Unformatted 3-Column Raw Bank Dump)
  // =========================================================================
  const t12Cols = [
    { header: 'Raw_Line_Index', key: 'lidx', isNumber: true },
    { header: 'Raw_Dump_Header', key: 'tag' },
    { header: 'Raw_Value_Field', key: 'val' },
  ];
  const t12Data = [
    { lidx: 1, tag: 'TXN_REF', val: 'TXN-98012' },
    { lidx: 2, tag: 'DATE_TIME', val: '2026-08-01 10:15' },
    { lidx: 3, tag: 'PARTICULARS', val: 'UPI/Swadeep/Barrackpore' },
    { lidx: 4, tag: 'DR_CR', val: 'CR' },
    { lidx: 5, tag: 'AMOUNT', val: 9500 },
    { lidx: 6, tag: 'TXN_REF', val: 'TXN-98013' },
    { lidx: 7, tag: 'DATE_TIME', val: '2026-08-01 11:30' },
    { lidx: 8, tag: 'PARTICULARS', val: 'NEFT/Tuhina/Shyamnagar' },
    { lidx: 9, tag: 'DR_CR', val: 'CR' },
    { lidx: 10, tag: 'AMOUNT', val: 12000 },
    { lidx: 11, tag: 'TXN_REF', val: 'TXN-98014' },
    { lidx: 12, tag: 'DATE_TIME', val: '2026-08-01 14:20' },
    { lidx: 13, tag: 'PARTICULARS', val: 'POS/Abhronila/Ichapur' },
    { lidx: 14, tag: 'DR_CR', val: 'CR' },
    { lidx: 15, tag: 'AMOUNT', val: 8500 },
    { lidx: 16, tag: 'TXN_REF', val: 'TXN-98015' },
    { lidx: 17, tag: 'DATE_TIME', val: '2026-08-02 09:45' },
    { lidx: 18, tag: 'PARTICULARS', val: 'RENT/BarrackporeCampus' },
    { lidx: 19, tag: 'DR_CR', val: 'DR' },
    { lidx: 20, tag: 'AMOUNT', val: 35000 },
  ];
  addStyledTopicSheet('Topic12_Bank_Statement', 'FF4338CA', t12Cols, t12Data, {
    lidx: 16, tag: 22, val: 32
  });

  // =========================================================================
  // SHEET 15: Topic13_Challenge_Lab (Consolidated Supply Chain Dispatch Grid)
  // =========================================================================
  const t13Cols = [
    { header: 'Order_ID', key: 'oid' },
    { header: 'Customer_Name', key: 'cust' },
    { header: 'Destination_Hub', key: 'hub' },
    { header: 'Package_Weight_Kg', key: 'wt', isNumber: true },
    { header: 'Dispatch_Priority', key: 'prio' },
    { header: 'Freight_Charges', key: 'freight', isCurrency: true },
    { header: 'Delivery_Status', key: 'status' },
  ];
  const t13Data = [
    { oid: 'DSP-8001', cust: 'Swadeep Banerjee', hub: 'Barrackpore', wt: 12.5, prio: 'Express', freight: 1250, status: 'In Transit' },
    { oid: 'DSP-8002', cust: 'Tuhina Mukherjee', hub: 'Shyamnagar', wt: 8.2, prio: 'Standard', freight: 650, status: 'Delivered' },
    { oid: 'DSP-8003', cust: 'Abhronila Sengupta', hub: 'Ichapur', wt: 15.0, prio: 'Express', freight: 1500, status: 'Out for Delivery' },
    { oid: 'DSP-8004', cust: 'Susmita Roy', hub: 'Naihati', wt: 22.4, prio: 'Heavy Freight', freight: 2200, status: 'Delivered' },
    { oid: 'DSP-8005', cust: 'Debangshu Ghosh', hub: 'Titagarh', wt: 6.8, prio: 'Standard', freight: 550, status: 'In Transit' },
    { oid: 'DSP-8006', cust: 'Rahul Karmakar', hub: 'Kolkata Central', wt: 3.5, prio: 'Express', freight: 450, status: 'Delivered' },
    { oid: 'DSP-8007', cust: 'Priya Chakraborty', hub: 'Sodepur', wt: 11.0, prio: 'Standard', freight: 880, status: 'Delivered' },
    { oid: 'DSP-8008', cust: 'Aniket Dutta', hub: 'Khardah', wt: 9.4, prio: 'Standard', freight: 750, status: 'Out for Delivery' },
    { oid: 'DSP-8009', cust: 'Sourav Paul', hub: 'Barasat', wt: 18.2, prio: 'Heavy Freight', freight: 1800, status: 'Delivered' },
    { oid: 'DSP-8010', cust: 'Sneha Sarkar', hub: 'Madhyamgram', wt: 5.2, prio: 'Express', freight: 600, status: 'In Transit' },
  ];
  addStyledTopicSheet('Topic13_Challenge_Lab', 'FF059669', t13Cols, t13Data, {
    oid: 14, cust: 22, hub: 18, wt: 18, prio: 16, freight: 16, status: 18
  });

  const outputDir = path.join(__dirname, 'excel_files');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  const finalFile = path.join(outputDir, 'array_reshaping_master.xlsx');
  await wb.xlsx.writeFile(finalFile);
  console.log(`✓ Master Workbook successfully generated at: ${finalFile}`);
}

buildMasterWorkbook().catch(err => {
  console.error('Error generating workbook:', err);
  process.exit(1);
});
