// generate_sheets.cjs - Generates the Master Excel Practice Workbook for Module 004_003
// Module: Custom Functions with LAMBDA & Helper Engines
// Output: excel_files/lambda_master.xlsx

const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

async function createMasterWorkbook() {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Sukanta Hui - Coder & AccoTax";
  workbook.lastModifiedBy = "Sukanta Hui";
  workbook.created = new Date();
  workbook.modified = new Date();

  // Helper styles
  const navyHeaderFill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF1E293B' } // Slate 800
  };
  const emeraldFill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF065F46' } // Emerald 800
  };
  const purpleFill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF581C87' } // Purple 900
  };
  const headerFont = {
    name: 'Segoe UI',
    size: 11,
    bold: true,
    color: { argb: 'FFFFFFFF' }
  };
  const regularFont = {
    name: 'Segoe UI',
    size: 10,
    color: { argb: 'FF0F172A' }
  };
  const codeFont = {
    name: 'Consolas',
    size: 10,
    color: { argb: 'FF0369A1' } // Sky 700
  };
  const thinBorder = {
    top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
    left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
    bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
    right: { style: 'thin', color: { argb: 'FFE2E8F0' } }
  };

  // =========================================================================
  // SHEET 1: Overview (Protected with password 'sukantahui')
  // =========================================================================
  const overviewSheet = workbook.addWorksheet('Overview', {
    views: [{ showGridLines: true }]
  });

  overviewSheet.columns = [
    { width: 8 },
    { width: 28 },
    { width: 45 },
    { width: 32 }
  ];

  const logoPath = path.resolve(__dirname, '../../assets/cnat.png');
  if (fs.existsSync(logoPath)) {
    const logoId = workbook.addImage({ filename: logoPath, extension: 'png' });
    overviewSheet.addImage(logoId, { tl: { col: 0.2, row: 0.2 }, ext: { width: 100, height: 100 }, editAs: 'oneCell' });
  }

  overviewSheet.mergeCells('B2:D2');
  const titleCell = overviewSheet.getCell('B2');
  titleCell.value = "CODER & ACCOTAX — ADVANCED EXCEL MASTER CURRICULUM";
  titleCell.font = { name: 'Segoe UI', size: 16, bold: true, color: { argb: 'FFFFFFFF' } };
  titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } };
  titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
  overviewSheet.getRow(2).height = 35;

  overviewSheet.mergeCells('B3:D3');
  const subTitleCell = overviewSheet.getCell('B3');
  subTitleCell.value = "Module 004_003: Custom Functions with LAMBDA & Helper Engines";
  subTitleCell.font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: 'FF38BDF8' } };
  subTitleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E293B' } };
  subTitleCell.alignment = { horizontal: 'center', vertical: 'middle' };
  overviewSheet.getRow(3).height = 25;

  // Metadata cards
  const metaRows = [
    ["Academic Director", "Sukanta Hui (Senior Software Engineer & Financial Consultant)", "Coder & AccoTax"],
    ["Target Audience", "Corporate Analysts, Financial Engineers, Chartered Accountants", "Barrackpore, Shyamnagar, Ichapur"],
    ["Core Functions", "LAMBDA, LET, MAP, SCAN, REDUCE, BYROW, BYCOL, MAKEARRAY, ISOMITTED", "Excel 365 Native Dynamic Arrays"],
    ["Workbook Security", "Overview sheet protected (Password: sukantahui)", "15 Practice Worksheets Included"]
  ];

  let curRow = 5;
  metaRows.forEach(([k, v, note]) => {
    const row = overviewSheet.getRow(curRow);
    row.getCell(2).value = k;
    row.getCell(2).font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FF1E293B' } };
    row.getCell(3).value = v;
    row.getCell(3).font = regularFont;
    row.getCell(4).value = note;
    row.getCell(4).font = { name: 'Segoe UI', size: 9, italic: true, color: { argb: 'FF64748B' } };
    curRow++;
  });

  // Sheet Directory Table
  curRow += 2;
  overviewSheet.getCell(`B${curRow}`).value = "Worksheet Directory";
  overviewSheet.getCell(`C${curRow}`).value = "Core Function / Subject";
  overviewSheet.getCell(`D${curRow}`).value = "Practical Corporate Application";
  [2, 3, 4].forEach(col => {
    const c = overviewSheet.getRow(curRow).getCell(col);
    c.fill = emeraldFill;
    c.font = headerFont;
    c.alignment = { vertical: 'middle' };
  });
  overviewSheet.getRow(curRow).height = 25;

  const directory = [
    ["Topic0_Overview", "LAMBDA Ecosystem Overview", "Zero-VBA Custom Functions & Functional Engine"],
    ["Topic1_Syntax", "LAMBDA Syntax & Testing", "Immediate execution `(LAMBDA(x, x*2)(5))`"],
    ["Topic2_Name_Manager", "Name Manager Registration", "Creating permanent named workbook functions"],
    ["Topic3_Documentation", "Parameter Tooltips & Hints", "Documenting custom functions for end-users"],
    ["Topic4_ISOMITTED", "Optional Parameters & Defaults", "Graceful fallback assignment with ISOMITTED"],
    ["Topic5_LET_Variables", "LET Local Scoped Variables", "Sub-millisecond memory caching & formula optimization"],
    ["Topic6_MAP", "MAP Array Iteration", "Element-by-element transformations across matrices"],
    ["Topic7_BYROW", "BYROW Vector Aggregation", "Row-by-row matrix processing & weighted averages"],
    ["Topic8_BYCOL", "BYCOL Column Aggregation", "Column-by-column matrix processing & metrics"],
    ["Topic9_MAKEARRAY", "MAKEARRAY Grid Generation", "Dynamic procedural matrix & multiplier creation"],
    ["Topic10_SCAN", "SCAN Accumulator Engine", "Progressive running bank balances & cumulative totals"],
    ["Topic11_REDUCE", "REDUCE Aggregation Engine", "Custom multi-step tensor reductions & string chaining"],
    ["Topic12_Recursive_LAMBDA", "Recursive Algorithmic Loops", "Nested string sanitization & factorial computation"],
    ["Topic13_Function_Library", "Corporate Central Library", "Centralized .xlsx corporate custom function repository"],
    ["Topic14_Corporate_Project", "Real-World Business Project", "GST_CALC, REVERSE_TEXT, CLEAN_PHONE, LOAN_SCHEDULE"]
  ];

  directory.forEach(([sheetName, topic, desc]) => {
    curRow++;
    const row = overviewSheet.getRow(curRow);
    row.getCell(2).value = sheetName;
    row.getCell(2).font = codeFont;
    row.getCell(2).border = thinBorder;
    row.getCell(3).value = topic;
    row.getCell(3).font = regularFont;
    row.getCell(3).border = thinBorder;
    row.getCell(4).value = desc;
    row.getCell(4).font = regularFont;
    row.getCell(4).border = thinBorder;
  });

  // Protect Overview sheet with password
  await overviewSheet.protect('sukantahui', {
    selectLockedCells: true,
    selectUnlockedCells: true
  });

  // =========================================================================
  // HELPER FOR TOPIC WORKSHEETS
  // =========================================================================
  function createTopicSheet(name, titleText, headers, dataRows, formulaExamples = []) {
    const ws = workbook.addWorksheet(name, { views: [{ showGridLines: true }] });
    
    // Column widths
    ws.columns = [
      { width: 4 },
      ...headers.map(h => ({ width: Math.max(h.length + 6, 16) })),
      { width: 40 }
    ];

    // Banner
    ws.mergeCells(2, 2, 2, headers.length + 1);
    const titleCell = ws.getCell(2, 2);
    titleCell.value = titleText;
    titleCell.font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: 'FFFFFFFF' } };
    titleCell.fill = navyHeaderFill;
    titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
    ws.getRow(2).height = 30;

    // Headers
    const headerRow = ws.getRow(4);
    headerRow.height = 24;
    headers.forEach((h, idx) => {
      const cell = headerRow.getCell(idx + 2);
      cell.value = h;
      cell.fill = emeraldFill;
      cell.font = headerFont;
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
      cell.border = thinBorder;
    });

    // Data rows
    let rIdx = 5;
    dataRows.forEach(rowVals => {
      const r = ws.getRow(rIdx);
      r.height = 20;
      rowVals.forEach((val, cIdx) => {
        const cell = r.getCell(cIdx + 2);
        cell.value = val;
        cell.font = regularFont;
        cell.border = thinBorder;
        if (typeof val === 'number') {
          cell.alignment = { horizontal: 'right', vertical: 'middle' };
          if (val > 1000) cell.numFmt = '#,##0.00';
        } else {
          cell.alignment = { horizontal: 'left', vertical: 'middle' };
        }
      });
      rIdx++;
    });

    // Formula instruction card
    if (formulaExamples.length > 0) {
      rIdx += 2;
      ws.mergeCells(rIdx, 2, rIdx, headers.length + 1);
      const fTitle = ws.getCell(rIdx, 2);
      fTitle.value = "💡 Recommended Practice Formulas & Functional Patterns";
      fTitle.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFFFF' } };
      fTitle.fill = purpleFill;
      fTitle.alignment = { vertical: 'middle' };
      ws.getRow(rIdx).height = 22;

      formulaExamples.forEach(fe => {
        rIdx++;
        ws.mergeCells(rIdx, 2, rIdx, headers.length + 1);
        const fCell = ws.getCell(rIdx, 2);
        fCell.value = fe;
        fCell.font = codeFont;
        fCell.alignment = { vertical: 'middle' };
        ws.getRow(rIdx).height = 20;
      });
    }

    return ws;
  }

  // =========================================================================
  // TOPIC 0: Overview of LAMBDA & Helper Engines
  // =========================================================================
  createTopicSheet(
    'Topic0_Overview',
    'Module 004_003 Master Overview — Pure Functional Excel Architecture',
    ['Function', 'Type', 'Primary Syntax', 'Target Use Case'],
    [
      ['LAMBDA', 'Core Operator', '=LAMBDA(param1, ..., calc)', 'Custom named reusable worksheet functions'],
      ['LET', 'Optimization', '=LET(var1, val1, ..., calc)', 'Sub-millisecond memory caching & variable scoping'],
      ['MAP', 'Helper Function', '=MAP(array1, ..., LAMBDA)', 'Element-by-element matrix transformation'],
      ['BYROW', 'Helper Function', '=BYROW(array, LAMBDA)', 'Row-by-row matrix aggregation (e.g. Row Sums)'],
      ['BYCOL', 'Helper Function', '=BYCOL(array, LAMBDA)', 'Column-by-column matrix aggregation'],
      ['MAKEARRAY', 'Grid Generator', '=MAKEARRAY(rows, cols, LAMBDA)', 'Procedural dynamic matrix generation'],
      ['SCAN', 'Accumulator', '=SCAN(init, array, LAMBDA)', 'Running balances & progressive cumulative sums'],
      ['REDUCE', 'Reducer', '=REDUCE(init, array, LAMBDA)', 'Custom multi-step array reduction to scalar'],
      ['ISOMITTED', 'Introspection', '=ISOMITTED(parameter)', 'Testing for optional parameter presence']
    ],
    [
      '=LAMBDA(price, qty, price * qty)(150, 4)',
      '=LET(sub, B5:B10*C5:C10, HSTACK(sub, sub*0.18))',
      '=SCAN(0, D5:D15, LAMBDA(acc, val, acc + val))'
    ]
  );

  // =========================================================================
  // TOPIC 1: LAMBDA Syntax & Immediate Execution
  // =========================================================================
  createTopicSheet(
    'Topic1_Syntax',
    'Topic 1: LAMBDA Syntax & In-Cell Immediate Execution `(LAMBDA(...)(...))`',
    ['Item_ID', 'Product_Name', 'Unit_Price', 'Qty_Sold', 'Discount_Rate', 'Standard_Total'],
    [
      ['PRD-101', 'Smart Inverter Pro', 12500, 4, 0.05, 47500],
      ['PRD-102', 'Solar Panel Array', 28000, 2, 0.08, 51520],
      ['PRD-103', 'Lithium Battery 5kWh', 65000, 1, 0.10, 58500],
      ['PRD-104', 'Charge Controller 60A', 4500, 6, 0.04, 25920],
      ['PRD-105', 'Micro Inverter 800W', 14200, 3, 0.05, 40470],
      ['PRD-106', 'Mounting Rail Kit', 3200, 10, 0.12, 28160]
    ],
    [
      'Immediate Execution: =(LAMBDA(p, q, d, p * q * (1 - d)))(C5, D5, E5)',
      'Inline Tax Calculation: =(LAMBDA(net, net * 1.18))(F5)'
    ]
  );

  // =========================================================================
  // TOPIC 2: Registering in Name Manager
  // =========================================================================
  createTopicSheet(
    'Topic2_Name_Manager',
    'Topic 2: Registering & Deploying Named Functions in Name Manager',
    ['Emp_ID', 'Staff_Name', 'Campus', 'Basic_Pay', 'DA_Percent', 'HRA_Percent'],
    [
      ['EMP-801', 'Swadeep Banerjee', 'Barrackpore', 45000, 0.38, 0.15],
      ['EMP-802', 'Tuhina Mukherjee', 'Shyamnagar', 42000, 0.38, 0.15],
      ['EMP-803', 'Abhronila Sengupta', 'Ichapur', 51000, 0.38, 0.15],
      ['EMP-804', 'Susmita Roy', 'Naihati', 48000, 0.38, 0.15],
      ['EMP-805', 'Debangshu Ghosh', 'Titagarh', 55000, 0.38, 0.15]
    ],
    [
      'Name Manager Definition: GROSS_SALARY = LAMBDA(basic, da_pct, hra_pct, basic * (1 + da_pct + hra_pct))',
      'Worksheet Invocation: =GROSS_SALARY(E5, F5, G5)'
    ]
  );

  // =========================================================================
  // TOPIC 3: Documenting Parameters & Hints
  // =========================================================================
  createTopicSheet(
    'Topic3_Documentation',
    'Topic 3: Authoring Parameter Hints & Self-Documenting Functions',
    ['Invoice_No', 'Client_Name', 'Taxable_Value', 'Supply_Type', 'Expected_GST_Rate'],
    [
      ['INV-901', 'Barrackpore Steel Fab', 150000, 'Intra-State', 0.18],
      ['INV-902', 'Shyamnagar Agro Tools', 85000, 'Inter-State', 0.18],
      ['INV-903', 'Ichapur Heavy Engg', 340000, 'Intra-State', 0.18],
      ['INV-904', 'Naihati Jute Mills', 120000, 'Inter-State', 0.12]
    ],
    [
      'Documented Name Manager Function: GST_BREAKDOWN = LAMBDA(amount, is_interstate, LET(rate, 0.18, IF(is_interstate, HSTACK(0, 0, amount*rate), HSTACK(amount*rate/2, amount*rate/2, 0))))'
    ]
  );

  // =========================================================================
  // TOPIC 4: Optional Parameters & ISOMITTED
  // =========================================================================
  createTopicSheet(
    'Topic4_ISOMITTED',
    'Topic 4: Optional Parameter Handling & Default Values with ISOMITTED',
    ['Booking_ID', 'Customer_Name', 'Room_Type', 'Base_Rate', 'Custom_Discount_Rate'],
    [
      ['BKG-501', 'Swadeep Banerjee', 'Deluxe Suite', 4500, null],
      ['BKG-502', 'Tuhina Mukherjee', 'Executive Room', 3200, 0.10],
      ['BKG-503', 'Abhronila Sengupta', 'Presidential Suite', 8500, null],
      ['BKG-504', 'Susmita Roy', 'Standard Studio', 2400, 0.15],
      ['BKG-505', 'Debangshu Ghosh', 'Deluxe Suite', 4500, null]
    ],
    [
      'CALCULATE_ROOM_FEE = LAMBDA(rate, [disc], LET(d, IF(ISOMITTED(disc), 0.05, disc), rate * (1 - d)))',
      'Usage with default: =CALCULATE_ROOM_FEE(E5) | Usage with override: =CALCULATE_ROOM_FEE(E6, F6)'
    ]
  );

  // =========================================================================
  // TOPIC 5: LET Function Scoped Variables
  // =========================================================================
  createTopicSheet(
    'Topic5_LET_Variables',
    'Topic 5: Memory Optimization & Local Variable Scoping with LET',
    ['Loan_ID', 'Borrower_Name', 'Principal', 'Annual_Interest_Rate', 'Tenure_Months'],
    [
      ['LON-701', 'Swadeep Banerjee', 500000, 0.085, 36],
      ['LON-702', 'Tuhina Mukherjee', 1200000, 0.082, 60],
      ['LON-703', 'Abhronila Sengupta', 750000, 0.090, 48],
      ['LON-704', 'Susmita Roy', 300000, 0.095, 24],
      ['LON-705', 'Debangshu Ghosh', 1800000, 0.080, 84]
    ],
    [
      '=LET(P, D5, r, E5/12, n, F5, emi, P * r * (1+r)^n / ((1+r)^n - 1), total_pay, emi * n, total_interest, total_pay - P, HSTACK(emi, total_pay, total_interest))'
    ]
  );

  // =========================================================================
  // TOPIC 6: MAP Array Iteration
  // =========================================================================
  createTopicSheet(
    'Topic6_MAP',
    'Topic 6: Iterating Across Matrices Element-by-Element with MAP',
    ['Staff_ID', 'Staff_Name', 'Attendance_Days', 'Bonus_Score', 'Gross_Salary'],
    [
      ['STF-101', 'Swadeep Banerjee', 24, 88, 45000],
      ['STF-102', 'Tuhina Mukherjee', 26, 94, 48000],
      ['STF-103', 'Abhronila Sengupta', 22, 79, 52000],
      ['STF-104', 'Susmita Roy', 25, 91, 46000],
      ['STF-105', 'Debangshu Ghosh', 26, 96, 58000]
    ],
    [
      '=MAP(E5:E9, F5:F9, LAMBDA(days, score, IF(AND(days>=25, score>=90), "Tier-1 Bonus", "Standard")))'
    ]
  );

  // =========================================================================
  // TOPIC 7: BYROW Matrix Aggregation
  // =========================================================================
  createTopicSheet(
    'Topic7_BYROW',
    'Topic 7: Row-by-Row Matrix Vector Processing with BYROW',
    ['Student_Name', 'Accounting', 'Corporate_Tax', 'Financial_Modeling', 'Excel_Analytics'],
    [
      ['Swadeep Banerjee', 88, 92, 85, 96],
      ['Tuhina Mukherjee', 79, 84, 88, 91],
      ['Abhronila Sengupta', 95, 91, 94, 98],
      ['Susmita Roy', 82, 86, 78, 89],
      ['Debangshu Ghosh', 91, 95, 96, 99]
    ],
    [
      'Row Average: =BYROW(C5:F9, LAMBDA(r, AVERAGE(r)))',
      'Row Weighted Score: =BYROW(C5:F9, LAMBDA(r, SUMPRODUCT(r, {0.2, 0.3, 0.25, 0.25})))'
    ]
  );

  // =========================================================================
  // TOPIC 8: BYCOL Column Aggregation
  // =========================================================================
  createTopicSheet(
    'Topic8_BYCOL',
    'Topic 8: Column-by-Column Matrix Vector Processing with BYCOL',
    ['Branch_Location', 'Jan_Sales', 'Feb_Sales', 'Mar_Sales', 'Apr_Sales'],
    [
      ['Barrackpore Hub', 145000, 162000, 178000, 195000],
      ['Shyamnagar Centre', 120000, 131000, 142000, 158000],
      ['Ichapur Unit', 98000, 105000, 114000, 126000],
      ['Naihati Facility', 110000, 118000, 129000, 141000]
    ],
    [
      'Column Means: =BYCOL(C5:F8, LAMBDA(col, AVERAGE(col)))',
      'Column Maximums: =BYCOL(C5:F8, LAMBDA(col, MAX(col)))'
    ]
  );

  // =========================================================================
  // TOPIC 9: MAKEARRAY Grid Generation
  // =========================================================================
  createTopicSheet(
    'Topic9_MAKEARRAY',
    'Topic 9: Generating Dynamic Procedural Grids with MAKEARRAY',
    ['Row_Index', 'Col_A', 'Col_B', 'Col_C', 'Col_D', 'Col_E'],
    [
      ['Row 1', null, null, null, null, null],
      ['Row 2', null, null, null, null, null],
      ['Row 3', null, null, null, null, null],
      ['Row 4', null, null, null, null, null],
      ['Row 5', null, null, null, null, null]
    ],
    [
      'Multiplication Grid: =MAKEARRAY(5, 5, LAMBDA(r, c, r * c))',
      'Custom Coordinate Matrix: =MAKEARRAY(4, 3, LAMBDA(r, c, "R" & r & "C" & c))'
    ]
  );

  // =========================================================================
  // TOPIC 10: SCAN Running Balances
  // =========================================================================
  createTopicSheet(
    'Topic10_SCAN',
    'Topic 10: Progressive Cumulative Totals & Running Balances with SCAN',
    ['Txn_Date', 'Description', 'Deposit_Amount', 'Withdrawal_Amount', 'Net_Movement'],
    [
      ['2024-08-01', 'Opening Balance Fund', 50000, 0, 50000],
      ['2024-08-03', 'Client Retainer - Swadeep', 35000, 0, 35000],
      ['2024-08-05', 'Office Rent - Barrackpore', 0, 18000, -18000],
      ['2024-08-08', 'Consulting Fee - Abhronila', 42000, 0, 42000],
      ['2024-08-12', 'Software Subscriptions', 0, 8500, -8500],
      ['2024-08-15', 'Staff Stipends - Tuhina/Susmita', 0, 45000, -45000]
    ],
    [
      'Running Bank Balance: =SCAN(0, F5:F10, LAMBDA(acc, val, acc + val))'
    ]
  );

  // =========================================================================
  // TOPIC 11: REDUCE Aggregation Engine
  // =========================================================================
  createTopicSheet(
    'Topic11_REDUCE',
    'Topic 11: Custom Multi-Step Array Reductions with REDUCE',
    ['Item_Code', 'Category', 'Quantity', 'Unit_Cost', 'Hazard_Multiplier'],
    [
      ['MAT-01', 'Industrial Chemical', 15, 450, 1.25],
      ['MAT-02', 'High-Grade Solvent', 25, 320, 1.40],
      ['MAT-03', 'Polymer Coating', 40, 180, 1.10],
      ['MAT-04', 'Acid Neutralizer', 10, 650, 1.50]
    ],
    [
      'Custom Reduction: =REDUCE(0, E5:E8 * F5:F8 * G5:G8, LAMBDA(acc, val, acc + val))',
      'String Concat Reducer: =REDUCE("", C5:C8, LAMBDA(acc, val, IF(acc="", val, acc & " | " & val)))'
    ]
  );

  // =========================================================================
  // TOPIC 12: Recursive LAMBDAs
  // =========================================================================
  createTopicSheet(
    'Topic12_Recursive_LAMBDA',
    'Topic 12: Recursive LAMBDAs — Algorithmic Loops & Nested Sanitization',
    ['Raw_Input_Text', 'Target_Characters_To_Remove', 'Expected_Clean_Output'],
    [
      ['#BK-9001*Deluxe!$', '#*!$', 'BK-9001Deluxe'],
      ['@Shyamnagar(2024)&', '@()&', 'Shyamnagar2024'],
      ['$Ichapur%Heavy#Engg^', '$%#^', 'IchapurHeavyEngg'],
      ['!Naihati/Hub?', '!/?', 'NaihatiHub']
    ],
    [
      'Recursive Sanitizer: CLEAN_CHARS = LAMBDA(text, chars, IF(chars="", text, CLEAN_CHARS(SUBSTITUTE(text, LEFT(chars, 1), ""), MID(chars, 2, LEN(chars)))))',
      'Factorial Recursion: FACT = LAMBDA(n, IF(n<=1, 1, n * FACT(n-1)))'
    ]
  );

  // =========================================================================
  // TOPIC 13: Central Corporate LAMBDA Library
  // =========================================================================
  createTopicSheet(
    'Topic13_Function_Library',
    'Topic 13: Central Corporate LAMBDA Function Repository (.xlsx Add-In)',
    ['Function_Name', 'Argument_Signature', 'Business_Category', 'Description'],
    [
      ['FX_GST_INVOICE', 'amount, gst_rate', 'Tax & Compliance', 'Computes Taxable, CGST, SGST/IGST, Gross in 1 dynamic row'],
      ['FX_CLEAN_PHONE', 'raw_phone_text', 'Data Hygiene', 'Strips non-digits and prepends +91 Indian dialing prefix'],
      ['FX_RUNNING_BAL', 'movement_vector', 'Banking & Treasury', 'Calculates running balance vector using SCAN'],
      ['FX_UNPIVOT_GRID', 'row_hdrs, col_hdrs, matrix', 'Data Engineering', 'Unpivots 2D cross-tab matrix to 3-column relational table'],
      ['FX_LOAN_SCHEDULE', 'principal, rate, months', 'Financial Modeling', 'Generates complete monthly amortization schedule grid']
    ],
    [
      '=FX_GST_INVOICE(150000, 0.18)',
      '=FX_CLEAN_PHONE("98300 12345")',
      '=FX_RUNNING_BAL(F5:F10)'
    ]
  );

  // =========================================================================
  // TOPIC 14: Real-World Business Project & Assessment Lab
  // =========================================================================
  createTopicSheet(
    'Topic14_Corporate_Project',
    'Topic 14: Capstone Project — Corporate Calculation Engines & Amortization',
    ['Loan_Ref', 'Borrower', 'Principal_Amount', 'Annual_Interest', 'Tenure_Yrs', 'Repayment_Type'],
    [
      ['LN-8801', 'Swadeep Banerjee', 600000, 0.0875, 5, 'Monthly EMI'],
      ['LN-8802', 'Tuhina Mukherjee', 1500000, 0.0840, 10, 'Monthly EMI'],
      ['LN-8803', 'Abhronila Sengupta', 800000, 0.0900, 7, 'Monthly EMI'],
      ['LN-8804', 'Susmita Roy', 450000, 0.0920, 3, 'Monthly EMI'],
      ['LN-8805', 'Debangshu Ghosh', 2200000, 0.0810, 15, 'Monthly EMI']
    ],
    [
      'Complete Loan Schedule Generator:',
      '=LET(P, D5, r, E5/12, n, F5*12, emi, P*r*(1+r)^n/((1+r)^n-1), m_seq, SEQUENCE(n), ...)'
    ]
  );

  // Save workbook
  const outDir = path.resolve(__dirname, 'excel_files');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  const outPath = path.join(outDir, 'lambda_master.xlsx');
  await workbook.xlsx.writeFile(outPath);
  console.log('✅ Successfully created master workbook:', outPath);
}

createMasterWorkbook().catch(err => {
  console.error('❌ Error generating master workbook:', err);
  process.exit(1);
});
