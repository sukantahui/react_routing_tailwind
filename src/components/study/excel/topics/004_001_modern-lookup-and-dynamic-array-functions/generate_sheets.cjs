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
  // SHEET 1: Overview (Landing Page - Colourful, Graphical with CNAT Logo)
  // =========================================================================
  const wsOverview = wb.addWorksheet('Overview', {
    views: [{ showGridLines: true }]
  });

  // Set explicit column widths
  wsOverview.columns = [
    { key: 'A', width: 22 },
    { key: 'B', width: 26 },
    { key: 'C', width: 28 },
    { key: 'D', width: 32 },
    { key: 'E', width: 26 },
    { key: 'F', width: 36 },
  ];

  // Embed CNAT Logo Image from dedicated study/excel/assets directory
  const logoPath = path.resolve(__dirname, '../../assets/cnat.png');
  if (fs.existsSync(logoPath)) {
    const logoId = wb.addImage({
      filename: logoPath,
      extension: 'png',
    });
    // Place logo in cells A1:B5
    wsOverview.addImage(logoId, {
      tl: { col: 0.3, row: 0.3 },
      ext: { width: 120, height: 120 },
      editAs: 'oneCell'
    });
  }

  // Header Banner (Rows 1-5, Columns C to F)
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
  bannerSub2.value = 'Official Enterprise Practice & Laboratory Master Workbook — EXCEL-PRO-901\nCampus: 25(10/A) Shibtala Road, Nona Chandan Pukur, Barrackpore, Kolkata 700122';
  bannerSub2.font = { name: 'Segoe UI', size: 9, italic: true, color: { argb: 'FFFDE68A' } };
  bannerSub2.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true, indent: 1 };
  bannerSub2.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } };

  // Set Row Heights for Banner
  wsOverview.getRow(1).height = 22;
  wsOverview.getRow(2).height = 22;
  wsOverview.getRow(3).height = 20;
  wsOverview.getRow(4).height = 18;
  wsOverview.getRow(5).height = 18;
  wsOverview.getRow(6).height = 10; // Spacing

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
    valCell.font = { name: 'Segoe UI', size: 10, color: { argb: 'FF0F172A' } };
    valCell.border = borderStyle;
    valCell.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };
    wsOverview.getRow(rowNum).height = 21;
  };

  // Section 1: Organisation Profile
  addSectionHeader(7, '1. 🏢 ORGANISATION PROFILE & INSTITUTIONAL CREDENTIALS', 'FF0284C7'); // Sky Blue
  addInfoRow(8, 'Institute Name', 'Coder & AccoTax');
  addInfoRow(9, 'Accreditation', 'ISO 9001:2015 Certified Training & Professional Development Institute');
  addInfoRow(10, 'Campus Address', '25(10/A) Shibtala Road, Nona Chandan Pukur, Barrackpore, Kolkata 700122, West Bengal, India');
  addInfoRow(11, 'Official Contact', '+91 70037 56860  |  sukantahui@codernaccotax.co.in  |  info@codernaccotax.co.in');
  addInfoRow(12, 'Official Web Portal', 'https://codernaccotax.co.in');
  addInfoRow(13, 'Core Specializations', 'Full Stack Software Engineering, Python & Data Science, Advanced Excel (Dynamic Arrays, Power Query), Power BI, Tally Prime, GST, Corporate Income Tax & Financial Modeling');

  wsOverview.getRow(14).height = 10;

  // Section 2: Lead Instructor Profile
  addSectionHeader(15, '2. 👨‍🏫 LEAD INSTRUCTOR & MASTER MENTOR PROFILE', 'FF059669'); // Emerald
  addInfoRow(16, 'Lead Instructor', 'Sukanta Hui');
  addInfoRow(17, 'Professional Title', 'Senior Software Engineer, Corporate Financial Consultant & Lead Academic Mentor');
  addInfoRow(18, 'Industry Experience', '27+ Years of Industry Experience in Building Scalable Software Applications & Mentoring (Since May 1998)');
  addInfoRow(19, 'GitHub Portfolio', 'https://github.com/sukantahui');
  addInfoRow(20, 'Technical Arsenal', 'Python, Advanced Excel, Power BI, SQL, Financial Modeling, C, C++, Java, JavaScript, Angular, React, Laravel, Shell Scripting, Data Structures & Algorithms');
  addInfoRow(21, 'Teaching Philosophy', 'Bridging rigorous industrial standard practices with practical, hands-on, zero-VBA modern spreadsheet architecture.');

  wsOverview.getRow(22).height = 10;

  // Section 3: Course Metrics
  addSectionHeader(23, '3. 🎓 COURSE & MODULE ACADEMIC METRICS', 'FF7C3AED'); // Violet
  addInfoRow(24, 'Curriculum Code', 'EXCEL-PRO-901: Advanced Excel & Modern Dynamic Array Mastery');
  addInfoRow(25, 'Active Module Slug', '004_001_modern-lookup-and-dynamic-array-functions');
  addInfoRow(26, 'Module Overview', 'Modern Lookup & Dynamic Array Functions (Spill Engine, UNIQUE, FILTER, SORT, SORTBY, SEQUENCE, RANDARRAY, 2-Way XLOOKUP, Dynamic Dropdowns, Live Search Portals)');
  addInfoRow(27, 'Competency Taxonomy', "Bloom's Taxonomy CO1 to CO8 (Cognitive Understanding through Synthesis & Real-World Application)");
  addInfoRow(28, 'Total Topics', '14 Topics (Topic 0 through Topic 13 with 420 Structured Assessment FAQs)');

  wsOverview.getRow(29).height = 10;

  // Section 4: Workbook Directory Table
  addSectionHeader(30, '4. 📑 WORKBOOK SHEET DIRECTORY & LAB NAVIGATION', 'FFD97706'); // Amber

  // Table Headers
  const dirHeaders = ['Sheet Name', 'Target Topic', 'Primary Formula / Technique', 'Dataset Description'];
  wsOverview.getCell('A31').value = 'Sheet Name';
  wsOverview.getCell('B31').value = 'Topic Covered';
  wsOverview.mergeCells('C31:D31');
  wsOverview.getCell('C31').value = 'Primary Formula / Technique';
  wsOverview.mergeCells('E31:F31');
  wsOverview.getCell('E31').value = 'Dataset Context & Role';

  ['A31', 'B31', 'C31', 'D31', 'E31', 'F31'].forEach(cellId => {
    const c = wsOverview.getCell(cellId);
    c.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFFFF' } };
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E293B' } };
    c.border = borderStyle;
    c.alignment = { vertical: 'middle', horizontal: 'center' };
  });
  wsOverview.getRow(31).height = 22;

  const directoryEntries = [
    ['Overview', 'Landing Page', 'Institutional & Mentor Overview Profile', 'Welcome & Master Architecture Overview'],
    ['Topic0_Spill_Engine', 'Topic 0 & Topic 9', '=A2:A20 (Array Spilling, Grid Geometry, #SPILL! Collision Fixes)', 'Branch Transaction Register (20 Rows)'],
    ['Topic1_Spill_Operator', 'Topic 1', '=$OriginCell# (Spill Operator, Downstream Vectorization, GST)', 'Spill Formula Audit & GST Vectors'],
    ['Topic2_Unique_Deduplication', 'Topic 2 & Topic 11', '=UNIQUE(Range), =SORT(UNIQUE()), Dynamic Validation Lists (A2#)', 'Student Enrollment Master (Duplicates Included)'],
    ['Topic3_Filter_MultiCriteria', 'Topic 3 & Topic 12', '=FILTER(Data, (Cond1)*(Cond2)), Live Search Portals', 'Billing & Invoice Register (Multi-Branch)'],
    ['Topic4_Sort_Dynamics', 'Topic 4 & Topic 13', '=SORT(Array, ColIndex, SortOrder), Customer Segmentation', 'Consultant Performance & Target Attainment'],
    ['Topic5_SortBy_MultiLevel', 'Topic 5', '=SORTBY(Array, ByArray1, Order1, ByArray2, Order2)', 'Corporate HR Salary & Grade Slices'],
    ['Topic6_Sequence_Generators', 'Topic 6', '=SEQUENCE(Rows, Cols, Start, Step)', '1D Serials, 2D Seating Matrices, Amortization'],
    ['Topic7_RandArray_Simulations', 'Topic 7', '=RANDARRAY(Rows, Cols, Min, Max, IsInteger)', 'Stochastic Footfall & WACC Monte Carlo Models'],
    ['Topic8_Filter_Unique_Sort', 'Topic 8', '=SORT(UNIQUE(FILTER(Array, Criteria)))', 'Automated Three-Way Filtered Pipelines'],
    ['Topic10_2Way_XLookup_Spill', 'Topic 10', '=XLOOKUP(RowVal, RowH, XLOOKUP(ColVal, ColH, Grid))', '2D Regional Course Fee Matrix']
  ];

  directoryEntries.forEach((entry, idx) => {
    const rowIdx = 32 + idx;
    const isZebra = idx % 2 === 1;
    const rowBg = isZebra ? 'FFF8FAFC' : 'FFFFFFFF';

    wsOverview.getCell(`A${rowIdx}`).value = entry[0];
    wsOverview.getCell(`A${rowIdx}`).font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: 'FF0284C7' } };

    wsOverview.getCell(`B${rowIdx}`).value = entry[1];
    wsOverview.getCell(`B${rowIdx}`).font = { name: 'Segoe UI', size: 9, color: { argb: 'FF334155' } };

    wsOverview.mergeCells(`C${rowIdx}:D${rowIdx}`);
    wsOverview.getCell(`C${rowIdx}`).value = entry[2];
    wsOverview.getCell(`C${rowIdx}`).font = { name: 'Consolas', size: 9, color: { argb: 'FF0F172A' } };

    wsOverview.mergeCells(`E${rowIdx}:F${rowIdx}`);
    wsOverview.getCell(`E${rowIdx}`).value = entry[3];
    wsOverview.getCell(`E${rowIdx}`).font = { name: 'Segoe UI', size: 9, color: { argb: 'FF475569' } };

    ['A', 'B', 'C', 'D', 'E', 'F'].forEach(col => {
      const c = wsOverview.getCell(`${col}${rowIdx}`);
      c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: rowBg } };
      c.border = borderStyle;
      c.alignment = { vertical: 'middle', horizontal: col === 'A' || col === 'B' ? 'left' : 'left' };
    });
    wsOverview.getRow(rowIdx).height = 20;
  });

  // Protect the Overview Landing Sheet with password "sukantahui"
  await wsOverview.protect('sukantahui', {
    selectLockedCells: true,
    selectUnlockedCells: true,
    formatCells: false,
    formatColumns: false,
    formatRows: false,
    insertColumns: false,
    insertRows: false,
    insertHyperlinks: false,
    deleteColumns: false,
    deleteRows: false,
    sort: false,
    autoFilter: false,
    pivotTables: false
  });

  // Helper function to build styled topic worksheets
  const addStyledTopicSheet = (sheetName, headerColor, columns, data) => {
    const ws = wb.addWorksheet(sheetName, {
      views: [{ showGridLines: true }]
    });

    ws.columns = columns.map(c => ({ header: c.header, key: c.key, width: c.width }));

    // Format Header Row
    const headerRow = ws.getRow(1);
    headerRow.height = 26;
    headerRow.eachCell((cell) => {
      cell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFFFF' } };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: headerColor } };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
      cell.border = borderStyle;
    });

    // Add Data Rows
    data.forEach((rowValues, idx) => {
      const row = ws.addRow(rowValues);
      row.height = 20;
      const isZebra = idx % 2 === 1;
      const rowBg = isZebra ? 'FFF8FAFC' : 'FFFFFFFF';

      row.eachCell((cell) => {
        cell.font = { name: 'Segoe UI', size: 9.5, color: { argb: 'FF1E293B' } };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: rowBg } };
        cell.border = borderStyle;
        cell.alignment = { vertical: 'middle', horizontal: typeof cell.value === 'number' ? 'right' : 'left' };
      });
    });

    return ws;
  };

  // =========================================================================
  // SHEET 2: Topic0_Spill_Engine
  // =========================================================================
  addStyledTopicSheet('Topic0_Spill_Engine', 'FF0F172A', [
    { header: 'Tx_ID', key: 'id', width: 12 },
    { header: 'Agent_Name', key: 'agent', width: 22 },
    { header: 'Branch_Location', key: 'branch', width: 18 },
    { header: 'Course_Category', key: 'course', width: 26 },
    { header: 'Enrolled_Students', key: 'students', width: 18 },
    { header: 'Course_Fee', key: 'fee', width: 15 },
    { header: 'Gross_Revenue', key: 'revenue', width: 18 },
    { header: 'Enrollment_Status', key: 'status', width: 18 }
  ], [
    ["TX-1001", "Swadeep Roy", "Barrackpore", "Advanced Excel & BI", 28, 4500, 126000, "Confirmed"],
    ["TX-1002", "Tuhina Mukherjee", "Shyamnagar", "Financial Modeling", 22, 5500, 121000, "Confirmed"],
    ["TX-1003", "Susmita Saha", "Ichapur", "Python Data Science", 30, 6000, 180000, "Confirmed"],
    ["TX-1004", "Abhronila Das", "Naihati", "Advanced Excel & BI", 25, 4500, 112500, "Confirmed"],
    ["TX-1005", "Debangshu Hui", "Barrackpore", "Full Stack Web Dev", 18, 7500, 135000, "Confirmed"],
    ["TX-1006", "Rahul Sen", "Kolkata", "Financial Modeling", 15, 5500, 82500, "Pending"],
    ["TX-1007", "Priya Ghosh", "Barrackpore", "Python Data Science", 32, 6000, 192000, "Confirmed"],
    ["TX-1008", "Aniket Pal", "Shyamnagar", "Advanced Excel & BI", 20, 4500, 90000, "Confirmed"],
    ["TX-1009", "Sourav Banerjee", "Ichapur", "Full Stack Web Dev", 24, 7500, 180000, "Confirmed"],
    ["TX-1010", "Sneha Dutta", "Naihati", "Financial Modeling", 19, 5500, 104500, "Confirmed"],
    ["TX-1011", "Swadeep Roy", "Barrackpore", "Python Data Science", 26, 6000, 156000, "Confirmed"],
    ["TX-1012", "Tuhina Mukherjee", "Shyamnagar", "Full Stack Web Dev", 16, 7500, 120000, "Confirmed"],
    ["TX-1013", "Susmita Saha", "Ichapur", "Advanced Excel & BI", 35, 4500, 157500, "Confirmed"],
    ["TX-1014", "Abhronila Das", "Naihati", "Python Data Science", 21, 6000, 126000, "Confirmed"],
    ["TX-1015", "Debangshu Hui", "Barrackpore", "Financial Modeling", 27, 5500, 148500, "Confirmed"],
    ["TX-1016", "Rahul Sen", "Kolkata", "Advanced Excel & BI", 14, 4500, 63000, "Waitlisted"],
    ["TX-1017", "Priya Ghosh", "Barrackpore", "Full Stack Web Dev", 22, 7500, 165000, "Confirmed"],
    ["TX-1018", "Aniket Pal", "Shyamnagar", "Python Data Science", 17, 6000, 102000, "Confirmed"],
    ["TX-1019", "Sourav Banerjee", "Ichapur", "Financial Modeling", 29, 5500, 159500, "Confirmed"],
    ["TX-1020", "Sneha Dutta", "Naihati", "Advanced Excel & BI", 31, 4500, 139500, "Confirmed"]
  ]);

  // =========================================================================
  // SHEET 3: Topic1_Spill_Operator
  // =========================================================================
  addStyledTopicSheet('Topic1_Spill_Operator', 'FF0369A1', [
    { header: 'Origin_Cell', key: 'origin', width: 14 },
    { header: 'Source_Formula', key: 'formula', width: 48 },
    { header: 'Spill_Range', key: 'range', width: 16 },
    { header: 'Downstream_Formula', key: 'downstream', width: 28 },
    { header: 'Calculated_Result', key: 'result', width: 20 },
    { header: 'Operational_Significance', key: 'desc', width: 48 }
  ], [
    ["B3", "=UNIQUE(Topic0_Spill_Engine!C2:C21)", "B3:B7", "=COUNTA(B3#)", 5, "Counts total distinct branch hubs dynamically"],
    ["D3", "=FILTER(Topic0_Spill_Engine!G2:G21, Topic0_Spill_Engine!C2:C21=\"Barrackpore\")", "D3:D8", "=SUM(D3#)", 823500, "Total revenue generated by Barrackpore branch"],
    ["F3", "=SORT(Topic0_Spill_Engine!G2:G21, 1, -1)", "F3:F22", "=AVERAGE(F3#)", 131950, "Average revenue across all sorted transaction rows"],
    ["H3", "=D3# * 0.18", "H3:H8", "=SUM(H3#)", 148230, "Dynamic vectorized 18% GST calculation across spilled revenue array"],
    ["J3", "=B3# & \" Branch HQ\"", "J3:J7", "=TEXTJOIN(\", \", TRUE, J3#)", "Combined String", "Dynamic array string concatenation"]
  ]);

  // =========================================================================
  // SHEET 4: Topic2_Unique_Deduplication
  // =========================================================================
  addStyledTopicSheet('Topic2_Unique_Deduplication', 'FF0D9488', [
    { header: 'Client_ID', key: 'id', width: 12 },
    { header: 'Student_Name', key: 'name', width: 22 },
    { header: 'City_Location', key: 'city', width: 18 },
    { header: 'Course_Track', key: 'track', width: 26 },
    { header: 'Batch_Type', key: 'batch', width: 15 },
    { header: 'Attendance_Score', key: 'attendance', width: 18 },
    { header: 'Remarks', key: 'remarks', width: 28 }
  ], [
    ["C-101", "Swadeep Roy", "Barrackpore", "Advanced Excel & BI", "Weekend", 94, "Active"],
    ["C-102", "Tuhina Mukherjee", "Shyamnagar", "Financial Modeling", "Weekday", 88, "Active"],
    ["C-103", "Susmita Saha", "Ichapur", "Python Data Science", "Weekend", 92, "Active"],
    ["C-104", "Swadeep Roy", "Barrackpore", "Advanced Excel & BI", "Weekend", 94, "Duplicate Log"],
    ["C-105", "Abhronila Das", "Naihati", "Advanced Excel & BI", "Weekday", 96, "Active"],
    ["C-106", "Debangshu Hui", "Barrackpore", "Full Stack Web Dev", "Weekend", 90, "Active"],
    ["C-107", "Tuhina Mukherjee", "Shyamnagar", "Financial Modeling", "Weekday", 88, "Duplicate Log"],
    ["C-108", "Priya Ghosh", "Barrackpore", "Python Data Science", "Weekend", 91, "Active"],
    ["C-109", "Swadeep Roy", "Kolkata", "Financial Modeling", "Weekday", 85, "Cross-Branch Enrollment"],
    ["C-110", "Aniket Pal", "Shyamnagar", "Advanced Excel & BI", "Weekend", 89, "Active"],
    ["C-111", "Susmita Saha", "Ichapur", "Advanced Excel & BI", "Weekday", 95, "Second Course"],
    ["C-112", "Sourav Banerjee", "Ichapur", "Full Stack Web Dev", "Weekend", 87, "Active"],
    ["C-113", "Sneha Dutta", "Naihati", "Financial Modeling", "Weekday", 93, "Active"],
    ["C-114", "Abhronila Das", "Naihati", "Python Data Science", "Weekend", 98, "Second Course"],
    ["C-115", "Debangshu Hui", "Barrackpore", "Financial Modeling", "Weekday", 92, "Second Course"],
    ["C-116", "Rahul Sen", "Kolkata", "Advanced Excel & BI", "Weekend", 78, "Active"],
    ["C-117", "Aniket Pal", "Shyamnagar", "Python Data Science", "Weekday", 84, "Second Course"],
    ["C-118", "Priya Ghosh", "Barrackpore", "Full Stack Web Dev", "Weekday", 89, "Second Course"],
    ["C-119", "Sourav Banerjee", "Ichapur", "Financial Modeling", "Weekend", 91, "Second Course"],
    ["C-120", "Sneha Dutta", "Naihati", "Advanced Excel & BI", "Weekend", 96, "Duplicate Log"]
  ]);

  // =========================================================================
  // SHEET 5: Topic3_Filter_MultiCriteria
  // =========================================================================
  addStyledTopicSheet('Topic3_Filter_MultiCriteria', 'FF1E3A8A', [
    { header: 'Invoice_ID', key: 'id', width: 14 },
    { header: 'Sales_Officer', key: 'officer', width: 20 },
    { header: 'Branch_Office', key: 'branch', width: 18 },
    { header: 'Course_Program', key: 'program', width: 24 },
    { header: 'Students_Count', key: 'count', width: 16 },
    { header: 'Fee_Per_Student', key: 'fee', width: 16 },
    { header: 'Gross_Total', key: 'total', width: 16 },
    { header: 'Payment_Mode', key: 'mode', width: 18 },
    { header: 'Delivery_Status', key: 'status', width: 18 }
  ], [
    ["INV-201", "Swadeep Roy", "Barrackpore", "Advanced Excel & BI", 12, 4500, 54000, "UPI / Online", "Delivered"],
    ["INV-202", "Tuhina Mukherjee", "Shyamnagar", "Financial Modeling", 8, 5500, 44000, "Bank Transfer", "Delivered"],
    ["INV-203", "Susmita Saha", "Ichapur", "Python Data Science", 15, 6000, 90000, "UPI / Online", "Delivered"],
    ["INV-204", "Abhronila Das", "Naihati", "Advanced Excel & BI", 10, 4500, 45000, "Cash Deposit", "Delivered"],
    ["INV-205", "Debangshu Hui", "Barrackpore", "Full Stack Web Dev", 6, 7500, 45000, "Bank Transfer", "Pending"],
    ["INV-206", "Rahul Sen", "Kolkata", "Financial Modeling", 5, 5500, 27500, "Cash Deposit", "Cancelled"],
    ["INV-207", "Priya Ghosh", "Barrackpore", "Python Data Science", 14, 6000, 84000, "UPI / Online", "Delivered"],
    ["INV-208", "Aniket Pal", "Shyamnagar", "Advanced Excel & BI", 11, 4500, 49500, "Bank Transfer", "Delivered"],
    ["INV-209", "Sourav Banerjee", "Ichapur", "Full Stack Web Dev", 9, 7500, 67500, "UPI / Online", "Delivered"],
    ["INV-210", "Sneha Dutta", "Naihati", "Financial Modeling", 7, 5500, 38500, "Bank Transfer", "Pending"],
    ["INV-211", "Swadeep Roy", "Barrackpore", "Python Data Science", 16, 6000, 96000, "UPI / Online", "Delivered"],
    ["INV-212", "Tuhina Mukherjee", "Shyamnagar", "Full Stack Web Dev", 8, 7500, 60000, "UPI / Online", "Delivered"],
    ["INV-213", "Susmita Saha", "Ichapur", "Advanced Excel & BI", 20, 4500, 90000, "Bank Transfer", "Delivered"],
    ["INV-214", "Abhronila Das", "Naihati", "Python Data Science", 12, 6000, 72000, "UPI / Online", "Delivered"],
    ["INV-215", "Debangshu Hui", "Barrackpore", "Financial Modeling", 14, 5500, 77000, "Bank Transfer", "Delivered"],
    ["INV-216", "Rahul Sen", "Kolkata", "Advanced Excel & BI", 4, 4500, 18000, "Cash Deposit", "Pending"],
    ["INV-217", "Priya Ghosh", "Barrackpore", "Full Stack Web Dev", 10, 7500, 75000, "UPI / Online", "Delivered"],
    ["INV-218", "Aniket Pal", "Shyamnagar", "Python Data Science", 8, 6000, 48000, "Bank Transfer", "Delivered"],
    ["INV-219", "Sourav Banerjee", "Ichapur", "Financial Modeling", 13, 5500, 71500, "UPI / Online", "Delivered"],
    ["INV-220", "Sneha Dutta", "Naihati", "Advanced Excel & BI", 18, 4500, 81000, "Bank Transfer", "Delivered"]
  ]);

  // =========================================================================
  // SHEET 6: Topic4_Sort_Dynamics
  // =========================================================================
  addStyledTopicSheet('Topic4_Sort_Dynamics', 'FF047857', [
    { header: 'Rank_ID', key: 'id', width: 12 },
    { header: 'Consultant_Name', key: 'name', width: 22 },
    { header: 'Region_Hub', key: 'hub', width: 18 },
    { header: 'Quarter_Sales', key: 'sales', width: 18 },
    { header: 'Customer_Rating', key: 'rating', width: 18 },
    { header: 'Target_Attainment_%', key: 'attainment', width: 22 }
  ], [
    ["RK-1", "Swadeep Roy", "Barrackpore", 1420000, 4.9, 1.25],
    ["RK-2", "Tuhina Mukherjee", "Shyamnagar", 1280000, 4.8, 1.18],
    ["RK-3", "Abhronila Das", "Naihati", 1350000, 4.95, 1.22],
    ["RK-4", "Susmita Saha", "Ichapur", 1190000, 4.75, 1.12],
    ["RK-5", "Debangshu Hui", "Barrackpore", 1080000, 4.65, 1.05],
    ["RK-6", "Priya Ghosh", "Barrackpore", 1310000, 4.85, 1.19],
    ["RK-7", "Aniket Pal", "Shyamnagar", 980000, 4.5, 0.95],
    ["RK-8", "Sourav Banerjee", "Ichapur", 1120000, 4.7, 1.08],
    ["RK-9", "Sneha Dutta", "Naihati", 1250000, 4.82, 1.15],
    ["RK-10", "Rahul Sen", "Kolkata", 890000, 4.4, 0.88]
  ]);

  // =========================================================================
  // SHEET 7: Topic5_SortBy_MultiLevel
  // =========================================================================
  addStyledTopicSheet('Topic5_SortBy_MultiLevel', 'FF7C3AED', [
    { header: 'Emp_Code', key: 'code', width: 14 },
    { header: 'Employee_Name', key: 'name', width: 22 },
    { header: 'Department', key: 'dept', width: 22 },
    { header: 'Office_Branch', key: 'branch', width: 18 },
    { header: 'Years_Exp', key: 'exp', width: 14 },
    { header: 'Annual_CTC', key: 'ctc', width: 16 },
    { header: 'Appraisal_Grade', key: 'grade', width: 18 }
  ], [
    ["EMP-301", "Swadeep Roy", "Tax & Audit", "Barrackpore", 6, 850000, "A+"],
    ["EMP-302", "Tuhina Mukherjee", "Corporate Finance", "Shyamnagar", 5, 780000, "A+"],
    ["EMP-303", "Susmita Saha", "Tax & Audit", "Ichapur", 4, 690000, "A"],
    ["EMP-304", "Abhronila Das", "Data Analytics", "Naihati", 5, 820000, "A+"],
    ["EMP-305", "Debangshu Hui", "Corporate Finance", "Barrackpore", 3, 580000, "B+"],
    ["EMP-306", "Priya Ghosh", "Data Analytics", "Barrackpore", 4, 720000, "A"],
    ["EMP-307", "Aniket Pal", "Tax & Audit", "Shyamnagar", 3, 540000, "B+"],
    ["EMP-308", "Sourav Banerjee", "Corporate Finance", "Ichapur", 4, 640000, "A"],
    ["EMP-309", "Sneha Dutta", "Data Analytics", "Naihati", 3, 610000, "A"],
    ["EMP-310", "Rahul Sen", "Tax & Audit", "Kolkata", 2, 480000, "B"]
  ]);

  // =========================================================================
  // SHEET 8: Topic6_Sequence_Generators
  // =========================================================================
  addStyledTopicSheet('Topic6_Sequence_Generators', 'FF0284C7', [
    { header: 'Sequence_Pattern', key: 'pattern', width: 32 },
    { header: 'Formula_Used', key: 'formula', width: 42 },
    { header: 'Generated_Output_Type', key: 'type', width: 28 },
    { header: 'Industrial_Use_Case', key: 'usecase', width: 48 }
  ], [
    ["Consecutive Serials (1 to 20)", "=SEQUENCE(20, 1, 1, 1)", "Row Vector (1 to 20)", "Invoice / Voucher auto-numbering"],
    ["Quarterly Financial Days", "=SEQUENCE(12, 1, DATE(2026,1,1), 30)", "Date Serials (Jan-Dec)", "Amortization & cashflow scheduling"],
    ["2D Seat Allocation Matrix (5x4)", "=SEQUENCE(5, 4, 101, 1)", "2D Grid (101 to 120)", "Examination hall seat mapping in Barrackpore"],
    ["Step Increments of 500", "=SEQUENCE(10, 1, 5000, 500)", "Price Slab Vector", "Tiered fee rate card modeling"]
  ]);

  // =========================================================================
  // SHEET 9: Topic7_RandArray_Simulations
  // =========================================================================
  addStyledTopicSheet('Topic7_RandArray_Simulations', 'FFBE185D', [
    { header: 'Sim_ID', key: 'id', width: 12 },
    { header: 'Simulation_Metric', key: 'metric', width: 28 },
    { header: 'Formula_Used', key: 'formula', width: 46 },
    { header: 'Bounds', key: 'bounds', width: 20 },
    { header: 'Distribution_Role', key: 'role', width: 48 }
  ], [
    ["SIM-01", "Daily Footfall Simulation", "=RANDARRAY(30, 1, 50, 200, TRUE)", "50 to 200 (Int)", "Daily store footfall testing in Shyamnagar"],
    ["SIM-02", "Discount Rate Perturbation", "=RANDARRAY(30, 1, 0.08, 0.15, FALSE)", "8% to 15% (Float)", "Monte Carlo WACC sensitivity analysis"],
    ["SIM-03", "Defect Rate Modeling", "=RANDARRAY(20, 1, 0.001, 0.025, FALSE)", "0.1% to 2.5%", "Quality control probability bounds in Ichapur"]
  ]);

  // =========================================================================
  // SHEET 10: Topic8_Filter_Unique_Sort
  // =========================================================================
  addStyledTopicSheet('Topic8_Filter_Unique_Sort', 'FF0F766E', [
    { header: 'Tx_Code', key: 'code', width: 14 },
    { header: 'Trainer_Name', key: 'name', width: 22 },
    { header: 'Center', key: 'center', width: 18 },
    { header: 'Skill_Track', key: 'track', width: 24 },
    { header: 'Status', key: 'status', width: 14 },
    { header: 'Batch_Revenue', key: 'revenue', width: 18 }
  ], [
    ["TR-101", "Swadeep Roy", "Barrackpore", "Power BI & DAX", "Active", 185000],
    ["TR-102", "Tuhina Mukherjee", "Shyamnagar", "Financial Modeling", "Active", 160000],
    ["TR-103", "Susmita Saha", "Ichapur", "Python Analytics", "Active", 195000],
    ["TR-104", "Swadeep Roy", "Barrackpore", "Power BI & DAX", "Active", 185000],
    ["TR-105", "Abhronila Das", "Naihati", "Power BI & DAX", "Active", 175000],
    ["TR-106", "Debangshu Hui", "Barrackpore", "Full Stack Dev", "Inactive", 95000],
    ["TR-107", "Priya Ghosh", "Barrackpore", "Python Analytics", "Active", 210000],
    ["TR-108", "Aniket Pal", "Shyamnagar", "Power BI & DAX", "Active", 140000],
    ["TR-109", "Sourav Banerjee", "Ichapur", "Full Stack Dev", "Active", 165000],
    ["TR-110", "Sneha Dutta", "Naihati", "Financial Modeling", "Active", 155000]
  ]);

  // =========================================================================
  // SHEET 11: Topic10_2Way_XLookup_Spill
  // =========================================================================
  addStyledTopicSheet('Topic10_2Way_XLookup_Spill', 'FF1E293B', [
    { header: 'Course_Program', key: 'program', width: 26 },
    { header: 'Barrackpore', key: 'bkp', width: 16 },
    { header: 'Shyamnagar', key: 'shyam', width: 16 },
    { header: 'Ichapur', key: 'ichapur', width: 16 },
    { header: 'Naihati', key: 'naihati', width: 16 },
    { header: 'Kolkata_HQ', key: 'kolkata', width: 16 }
  ], [
    ["Advanced Excel & BI", 4500, 4200, 4000, 4200, 5000],
    ["Financial Modeling", 5500, 5200, 5000, 5200, 6000],
    ["Python Data Science", 6000, 5800, 5500, 5800, 6500],
    ["Full Stack Web Dev", 7500, 7200, 7000, 7200, 8000],
    ["Power BI Stack", 6500, 6200, 6000, 6200, 7000]
  ]);

  // Output directory
  const outputDir = path.join(__dirname, 'excel_files');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const filePath = path.join(outputDir, 'dynamic_arrays_master.xlsx');
  await wb.xlsx.writeFile(filePath);
  console.log('✓ Master Excel workbook generated with colorful graphics & embedded CNAT logo: ' + filePath);
}

buildMasterWorkbook().catch(err => {
  console.error('Error generating workbook:', err);
  process.exit(1);
});
