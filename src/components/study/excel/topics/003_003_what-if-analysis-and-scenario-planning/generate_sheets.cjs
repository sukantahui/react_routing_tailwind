const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

const moduleDir = path.join(__dirname);
const excelBaseDir = path.resolve(moduleDir, '../../');
const excelFilesDir = path.join(moduleDir, 'excel_files');
if (!fs.existsSync(excelFilesDir)) fs.mkdirSync(excelFilesDir, { recursive: true });

async function buildWorkbook() {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Sukanta Hui - Coder & AccoTax';
  wb.lastModifiedBy = 'Sukanta Hui';
  wb.created = new Date();
  wb.modified = new Date();

  // Helper styles
  const fontMain = { name: 'Segoe UI', size: 10 };
  const fontBold = { name: 'Segoe UI', size: 10, bold: true };
  const fontTitle = { name: 'Segoe UI', size: 14, bold: true, color: { argb: 'FFFFFFFF' } };
  const fontSection = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FFFFFFFF' } };
  const fontFormula = { name: 'Consolas', size: 9, color: { argb: 'FF0369A1' }, italic: true };
  
  const borderThin = {
    top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
    bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
    left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
    right: { style: 'thin', color: { argb: 'FFE2E8F0' } }
  };
  const borderHeader = {
    top: { style: 'medium', color: { argb: 'FF0F172A' } },
    bottom: { style: 'medium', color: { argb: 'FF0F172A' } },
    left: { style: 'thin', color: { argb: 'FF334155' } },
    right: { style: 'thin', color: { argb: 'FF334155' } }
  };

  const fillNavy = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } };
  const fillSky = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0284C7' } };
  const fillEmerald = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF059669' } };
  const fillAmber = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD97706' } };
  const fillIndigo = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4338CA' } };
  const fillPurple = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF7C3AED' } };
  const fillInput = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFEF3C7' } };
  const fillOutput = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE0F2FE' } };
  const fillZebra1 = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF8FAFC' } };
  const fillZebra2 = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFFFF' } };

  function addTopBanner(ws, title, subtitle, colorFill) {
    ws.views = [{ showGridLines: true }];
    ws.mergeCells('A1:B1');
    const nav = ws.getCell('A1');
    nav.value = { text: '🏠 Back to Master Overview', hyperlink: "#'Overview'!A1" };
    nav.font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: 'FF0284C7' }, underline: true };
    nav.alignment = { vertical: 'middle', horizontal: 'left' };
    ws.getRow(1).height = 20;

    ws.mergeCells('A2:H2');
    const tCell = ws.getCell('A2');
    tCell.value = title;
    tCell.font = fontTitle;
    tCell.fill = colorFill;
    tCell.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
    ws.getRow(2).height = 28;

    ws.mergeCells('A3:H3');
    const sCell = ws.getCell('A3');
    sCell.value = subtitle;
    sCell.font = { name: 'Segoe UI', size: 9, italic: true, color: { argb: 'FF94A3B8' } };
    sCell.fill = fillNavy;
    sCell.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
    ws.getRow(3).height = 20;
  }

  // =========================================================================
  // 1. OVERVIEW & LANDING SHEET WITH TEACHER PICTURE AND LOGO
  // =========================================================================
  const wsOverview = wb.addWorksheet('Overview', { views: [{ showGridLines: true }] });
  wsOverview.columns = [{ width: 24 }, { width: 34 }, { width: 24 }, { width: 38 }, { width: 22 }, { width: 32 }];

  // 1. Embed CNAT Logo
  const logoPath = path.join(excelBaseDir, 'assets/cnat.png');
  if (fs.existsSync(logoPath)) {
    const logoId = wb.addImage({ filename: logoPath, extension: 'png' });
    wsOverview.addImage(logoId, {
      tl: { col: 0.08, row: 0.15 },
      ext: { width: 105, height: 105 },
      editAs: 'oneCell'
    });
  }

  // Header Banners
  wsOverview.mergeCells('B1:F2');
  const oTitle = wsOverview.getCell('B1');
  oTitle.value = 'CODER & ACCOTAX · WHAT-IF ANALYSIS MASTER WORKBOOK';
  oTitle.font = { name: 'Segoe UI', size: 16, bold: true, color: { argb: 'FFFFFFFF' } };
  oTitle.fill = fillNavy;
  oTitle.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };

  wsOverview.mergeCells('B3:F3');
  const oSub1 = wsOverview.getCell('B3');
  oSub1.value = 'ISO 9001:2015 Certified Centre of Excellence in Computer Science, Advanced Excel & Financial Modeling';
  oSub1.font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: 'FF38BDF8' } };
  oSub1.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E293B' } };
  oSub1.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };

  wsOverview.mergeCells('B4:F4');
  const oSub2 = wsOverview.getCell('B4');
  oSub2.value = 'Module 003_003: What-If Analysis, Scenario Planning, 1-Var & 2-Var Data Tables, Goal Seek & Solver';
  oSub2.font = { name: 'Segoe UI', size: 9, italic: true, color: { argb: 'FFFBBF24' } };
  oSub2.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E293B' } };
  oSub2.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };

  wsOverview.getRow(1).height = 24;
  wsOverview.getRow(2).height = 24;
  wsOverview.getRow(3).height = 20;
  wsOverview.getRow(4).height = 20;
  wsOverview.getRow(5).height = 12;

  // 2. Embed Teacher Picture & Profile Box
  const teacherPicPath = path.join(excelBaseDir, 'assets/sukantahui.jpg');
  if (fs.existsSync(teacherPicPath)) {
    const teacherImgId = wb.addImage({ filename: teacherPicPath, extension: 'jpeg' });
    wsOverview.addImage(teacherImgId, {
      tl: { col: 0.15, row: 5.2 },
      ext: { width: 140, height: 160 },
      editAs: 'oneCell'
    });
  }

  // Teacher Profile Bio Section next to picture
  wsOverview.mergeCells('B6:F6');
  const tHeader = wsOverview.getCell('B6');
  tHeader.value = '👨‍🏫 LEAD COURSE MENTOR & CORPORATE TRAINER PROFILE';
  tHeader.font = fontSection;
  tHeader.fill = fillSky;

  const teacherDetails = [
    ['Instructor Name', 'Sukanta Hui', 'Designation', 'Senior Technology Educator & Financial Modeling Trainer'],
    ['Institution', 'Founder, Coder & AccoTax', 'Experience', '25+ Years in Software Engineering, Accounts & Analytics'],
    ['Campus Location', 'Barrackpore, Kolkata 700122, WB', 'Specialization', 'Financial Modeling (FAST), Advanced Excel, Power BI, Python'],
    ['Direct Helpline', '+91 70037 56860 (WhatsApp)', 'Official Email', 'sukantahui@codernaccotax.co.in | info@codernaccotax.co.in'],
    ['Web Portal', 'https://www.codernaccotax.co.in', 'Student Support', 'Dedicated Doubt Clearance & Masterclass Mentorship']
  ];

  teacherDetails.forEach((row, idx) => {
    const rNum = 7 + idx;
    const r = wsOverview.getRow(rNum);
    r.height = 22;

    r.getCell(2).value = row[0];
    r.getCell(2).font = fontBold;
    r.getCell(2).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE2E8F0' } };
    r.getCell(2).border = borderThin;

    r.getCell(3).value = row[1];
    r.getCell(3).font = fontMain;
    r.getCell(3).fill = fillZebra1;
    r.getCell(3).border = borderThin;

    r.getCell(4).value = row[2];
    r.getCell(4).font = fontBold;
    r.getCell(4).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE2E8F0' } };
    r.getCell(4).border = borderThin;

    r.getCell(5).value = row[3];
    r.getCell(5).font = fontMain;
    r.getCell(5).fill = fillZebra1;
    r.getCell(5).border = borderThin;
  });

  // 3. Shortcuts Reference Box
  wsOverview.mergeCells('A14:F14');
  const scH = wsOverview.getCell('A14');
  scH.value = '⌨️ CORE WHAT-IF ANALYSIS SHORTCUTS & ACCESS PATHWAYS';
  scH.font = fontSection;
  scH.fill = fillEmerald;
  scH.alignment = { vertical: 'middle', indent: 1 };

  const scData = [
    ['Tool', 'Ribbon Access Pathway', 'Keyboard Accelerator', 'Primary Architectural Function'],
    ['Data Table', 'Data > Forecast > What-If Analysis > Data Table', 'Alt + A + W + T', 'Systematic 1D & 2D sensitivity matrix calculation'],
    ['Goal Seek', 'Data > Forecast > What-If Analysis > Goal Seek', 'Alt + A + W + G', 'Single-variable reverse engineering to hit target'],
    ['Scenario Manager', 'Data > Forecast > What-If Analysis > Scenario Manager', 'Alt + A + W + S', 'Multi-scenario comparison (Best, Base, Worst Case)'],
    ['Performance Recalc', 'Formulas > Calculation Options > Auto Except Tables', 'Alt + M + X + E', 'Suppresses table calculation freezes; refresh with F9'],
    ['Solver Add-in', 'Data > Analyze > Solver', 'Alt + A + Y + 2', 'Constrained linear/nonlinear mathematical optimization']
  ];

  scData.forEach((row, idx) => {
    const rNum = 15 + idx;
    const r = wsOverview.getRow(rNum);
    r.height = 20;
    row.forEach((val, cIdx) => {
      const cell = r.getCell(cIdx + 1);
      cell.value = val;
      cell.font = idx === 0 ? fontBold : fontMain;
      cell.fill = idx === 0 ? { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE2E8F0' } } : (idx % 2 === 0 ? fillZebra1 : fillZebra2);
      cell.border = borderThin;
      cell.alignment = { vertical: 'middle', horizontal: 'left' };
    });
  });

  // 4. Sheet Directory
  wsOverview.mergeCells('A22:F22');
  const dirH = wsOverview.getCell('A22');
  dirH.value = '📑 WORKBOOK EXERCISE SHEETS DIRECTORY (CLICK TO JUMP)';
  dirH.font = fontSection;
  dirH.fill = fillAmber;
  dirH.alignment = { vertical: 'middle', indent: 1 };

  const directoryList = [
    { sheet: 'Ex1_Loan_Interest_EMI', name: 'Commercial Loan Interest Rate Sensitivity', type: '1-Var Data Table (Column)', formula: '{=TABLE(, B6)}', desc: 'Tests 7.0% to 12.0% rates against Monthly EMI (=B9)' },
    { sheet: 'Ex2_Multi_Output_EMI', name: 'Multi-Output Loan Outflow Analysis', type: '1-Var Data Table (Multi-Col)', formula: '{=TABLE(, B6)}', desc: 'Simultaneously evaluates EMI, Total Payment & Total Interest' },
    { sheet: 'Ex3_BreakEven_Production', name: 'Manufacturing Volume vs EBIT Break-Even', type: '1-Var Data Table (Cost/EBIT)', formula: '{=TABLE(, B9)}', desc: 'Evaluates fixed cost absorption across 5k to 30k units' },
    { sheet: 'Ex4_Capex_WACC_NPV', name: 'Discount Rate (WACC) Sensitivity on Project NPV', type: '1-Var Data Table (DCF/NPV)', formula: '{=TABLE(, B12)}', desc: 'Identifies hurdle rate & zero-NPV IRR point (21.4%)' },
    { sheet: 'Ex5_RealEstate_Occupancy', name: 'Commercial Park Occupancy vs NOI & DSCR', type: '1-Var Data Table (Real Estate)', formula: '{=TABLE(, B7)}', desc: 'Tests 60% to 100% occupancy against Debt Service Buffer' },
    { sheet: 'Ex6_Multi_Output_FX', name: 'USD/INR Spot Exchange Rate Sensitivity Matrix', type: '1-Var Data Table (Forex Risk)', formula: '{=TABLE(, B8)}', desc: 'Evaluates export revenues and landed margin volatility' },
    { sheet: 'Ex7_Row_Oriented_Table', name: 'Row-Oriented Product Price Sensitivity Table', type: '1-Var Data Table (Horizontal)', formula: '{=TABLE(B5, )}', desc: 'Horizontal price steps across Row 4 with formula in D5' },
    { sheet: 'Ex8_Performance_Tuning', name: 'Calculation Engine Optimization & Benchmarking', type: 'Performance Tuning', formula: 'Alt + M + X + E', desc: 'Automatic except Data Tables configuration guide & lab' },
    { sheet: 'Ex9_Two_Var_Price_Volume', name: 'Two-Variable Price vs Volume Profit Matrix', type: '2-Var Data Table (2D Grid)', formula: '{=TABLE(B6, B5)}', desc: '2D matrix testing Unit Price vs Production Volume' },
    { sheet: 'Ex10_Scenario_Manager', name: 'Scenario Manager: Best, Base & Worst Case', type: 'Scenario Planning', formula: 'Alt + A + W + S', desc: 'Multi-input macroeconomic scenario modeling & summary report' },
    { sheet: 'Ex11_Goal_Seek_BreakEven', name: 'Goal Seek: Target Profit & EMI Reverse Engineering', type: 'Goal Seek', formula: 'Alt + A + W + G', desc: 'Reverse engineering target sales volume to hit break-even EBIT' }
  ];

  const dirHeaderRow = wsOverview.getRow(23);
  dirHeaderRow.height = 22;
  ['Sheet Tab (Click to Open)', 'Project / Model Title', 'What-If Technique', 'Table Formula / Code', 'Description', 'Status'].forEach((h, idx) => {
    const c = dirHeaderRow.getCell(idx + 1);
    c.value = h;
    c.font = fontBold;
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE2E8F0' } };
    c.border = borderThin;
  });

  directoryList.forEach((item, idx) => {
    const rNum = 24 + idx;
    const r = wsOverview.getRow(rNum);
    r.height = 20;

    const c1 = r.getCell(1);
    c1.value = { text: `▶ ${item.sheet}`, hyperlink: `#'${item.sheet}'!A1` };
    c1.font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: 'FF0284C7' }, underline: true };
    c1.border = borderThin;
    c1.fill = idx % 2 === 0 ? fillZebra1 : fillZebra2;

    const c2 = r.getCell(2);
    c2.value = item.name;
    c2.font = fontMain;
    c2.border = borderThin;
    c2.fill = idx % 2 === 0 ? fillZebra1 : fillZebra2;

    const c3 = r.getCell(3);
    c3.value = item.type;
    c3.font = fontBold;
    c3.border = borderThin;
    c3.fill = idx % 2 === 0 ? fillZebra1 : fillZebra2;

    const c4 = r.getCell(4);
    c4.value = item.formula;
    c4.font = fontFormula;
    c4.border = borderThin;
    c4.fill = idx % 2 === 0 ? fillZebra1 : fillZebra2;

    const c5 = r.getCell(5);
    c5.value = item.desc;
    c5.font = fontMain;
    c5.border = borderThin;
    c5.fill = idx % 2 === 0 ? fillZebra1 : fillZebra2;

    const c6 = r.getCell(6);
    c6.value = '✓ Verified Model';
    c6.font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: 'FF059669' } };
    c6.border = borderThin;
    c6.fill = idx % 2 === 0 ? fillZebra1 : fillZebra2;
  });


  // =========================================================================
  // 2. EX1: LOAN INTEREST RATE SENSITIVITY TABLE (COLUMN-ORIENTED)
  // =========================================================================
  const wsEx1 = wb.addWorksheet('Ex1_Loan_Interest_EMI');
  addTopBanner(wsEx1, 'Exercise 1: Commercial Loan Interest Rate Sensitivity Table', 'Topic 2: 1-Variable Column-Oriented Data Table | Formula: {=TABLE(, B6)}', fillSky);
  wsEx1.columns = [{ width: 22 }, { width: 18 }, { width: 4 }, { width: 16 }, { width: 18 }, { width: 22 }, { width: 22 }, { width: 28 }];

  wsEx1.mergeCells('A5:B5');
  wsEx1.getCell('A5').value = '1. BASELINE LOAN MODEL';
  wsEx1.getCell('A5').font = fontBold;
  wsEx1.getCell('A5').fill = fillSky;

  const ex1Base = [
    ['Loan Principal (₹)', 5000000, '₹ #,##,##0'],
    ['Annual Interest Rate', 0.085, '0.00%'],
    ['Loan Tenure (Years)', 20, '0'],
    ['Total Monthly Tenure', { formula: 'B8*12' }, '0 "Months"'],
    ['Monthly EMI (₹)', { formula: 'PMT(B7/12, B9, -B6)' }, '₹ #,##,##0.00']
  ];

  ex1Base.forEach((row, idx) => {
    const rNum = 6 + idx;
    const r = wsEx1.getRow(rNum);
    r.getCell(1).value = row[0];
    r.getCell(1).font = fontMain;
    r.getCell(1).border = borderThin;
    r.getCell(1).fill = fillZebra1;

    const valCell = r.getCell(2);
    if (typeof row[1] === 'object') {
      valCell.value = row[1];
      valCell.fill = fillOutput;
      valCell.font = fontBold;
    } else {
      valCell.value = row[1];
      valCell.fill = fillInput;
      valCell.font = fontMain;
    }
    valCell.numFmt = row[2];
    valCell.border = borderThin;
    valCell.alignment = { horizontal: 'right' };
  });

  wsEx1.mergeCells('D5:F5');
  wsEx1.getCell('D5').value = '2. ONE-VARIABLE DATA TABLE (COLUMN-ORIENTED)';
  wsEx1.getCell('D5').font = fontBold;
  wsEx1.getCell('D5').fill = fillEmerald;

  wsEx1.getCell('D6').value = 'Scenario Rate';
  wsEx1.getCell('D6').font = fontBold;
  wsEx1.getCell('D6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE2E8F0' } };
  wsEx1.getCell('D6').border = borderHeader;

  wsEx1.getCell('E6').value = { formula: 'B10' };
  wsEx1.getCell('E6').font = fontBold;
  wsEx1.getCell('E6').numFmt = ';;;"Monthly EMI (₹)"';
  wsEx1.getCell('E6').fill = fillOutput;
  wsEx1.getCell('E6').border = borderHeader;
  wsEx1.getCell('E6').alignment = { horizontal: 'right' };

  const rates = [0.070, 0.075, 0.080, 0.085, 0.090, 0.095, 0.100, 0.105, 0.110, 0.115, 0.120];
  rates.forEach((rate, idx) => {
    const rNum = 7 + idx;
    const r = wsEx1.getRow(rNum);
    
    const rateCell = r.getCell(4);
    rateCell.value = rate;
    rateCell.numFmt = '0.00%';
    rateCell.font = fontMain;
    rateCell.fill = fillInput;
    rateCell.border = borderThin;
    rateCell.alignment = { horizontal: 'right' };

    const resCell = r.getCell(5);
    resCell.value = { formula: `PMT(D${rNum}/12, $B$9, -$B$6)` };
    resCell.numFmt = '₹ #,##,##0.00';
    resCell.font = rate === 0.085 ? { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FF059669' } } : fontMain;
    resCell.fill = rate === 0.085 ? { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFDCFCE7' } } : (idx % 2 === 0 ? fillZebra1 : fillZebra2);
    resCell.border = borderThin;
    resCell.alignment = { horizontal: 'right' };
  });

  wsEx1.mergeCells('D19:H23');
  const box = wsEx1.getCell('D19');
  box.value = "💡 HOW TO CONSTRUCT THIS DATA TABLE IN EXCEL:\n1. Select range D6:E17 (both input rates and top formula header).\n2. Navigate to: Data Tab > Forecast Group > What-If Analysis > Data Table (Shortcut: Alt + A + W + T).\n3. Leave 'Row input cell' BLANK.\n4. Set 'Column input cell' to: B7 (the Annual Interest Rate cell in the base model).\n5. Click OK. Excel wraps the range in the dynamic array: {=TABLE(, B7)}.";
  box.font = { name: 'Segoe UI', size: 9, color: { argb: 'FF1E293B' } };
  box.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF0FDF4' } };
  box.border = { top: { style: 'medium', color: { argb: 'FF059669' } }, bottom: { style: 'medium', color: { argb: 'FF059669' } }, left: { style: 'medium', color: { argb: 'FF059669' } }, right: { style: 'medium', color: { argb: 'FF059669' } } };
  box.alignment = { wrapText: true, vertical: 'top' };


  // =========================================================================
  // 3. EX2: MULTI-OUTPUT LOAN SENSITIVITY TABLE
  // =========================================================================
  const wsEx2 = wb.addWorksheet('Ex2_Multi_Output_EMI');
  addTopBanner(wsEx2, 'Exercise 2: Multi-Output One-Variable Sensitivity Evaluation', 'Topic 2: Evaluating Monthly EMI, Total Outflow & Total Interest in 1 Table', fillIndigo);
  wsEx2.columns = [{ width: 22 }, { width: 18 }, { width: 4 }, { width: 16 }, { width: 18 }, { width: 20 }, { width: 20 }, { width: 25 }];

  wsEx2.mergeCells('A5:B5');
  wsEx2.getCell('A5').value = '1. BASELINE LOAN MODEL';
  wsEx2.getCell('A5').font = fontBold;
  wsEx2.getCell('A5').fill = fillIndigo;

  const ex2Base = [
    ['Loan Principal (₹)', 5000000, '₹ #,##,##0'],
    ['Annual Interest Rate', 0.085, '0.00%'],
    ['Tenure (Years)', 20, '0'],
    ['Total Months', { formula: 'B8*12' }, '0'],
    ['Monthly EMI (₹)', { formula: 'PMT(B7/12, B9, -B6)' }, '₹ #,##,##0.00'],
    ['Total Outflow (₹)', { formula: 'B10*B9' }, '₹ #,##,##0.00'],
    ['Total Interest Paid (₹)', { formula: 'B11-B6' }, '₹ #,##,##0.00']
  ];

  ex2Base.forEach((row, idx) => {
    const rNum = 6 + idx;
    const r = wsEx2.getRow(rNum);
    r.getCell(1).value = row[0];
    r.getCell(1).font = fontMain;
    r.getCell(1).border = borderThin;
    r.getCell(1).fill = fillZebra1;

    const valCell = r.getCell(2);
    valCell.value = row[1];
    valCell.numFmt = row[2];
    valCell.border = borderThin;
    valCell.fill = typeof row[1] === 'object' ? fillOutput : fillInput;
    valCell.font = typeof row[1] === 'object' ? fontBold : fontMain;
    valCell.alignment = { horizontal: 'right' };
  });

  wsEx2.mergeCells('D5:G5');
  wsEx2.getCell('D5').value = '2. MULTI-OUTPUT SENSITIVITY TABLE';
  wsEx2.getCell('D5').font = fontBold;
  wsEx2.getCell('D5').fill = fillPurple;

  wsEx2.getCell('D6').value = 'Interest Rate';
  wsEx2.getCell('D6').font = fontBold;
  wsEx2.getCell('D6').border = borderHeader;
  wsEx2.getCell('D6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE2E8F0' } };

  wsEx2.getCell('E6').value = { formula: 'B10' };
  wsEx2.getCell('E6').numFmt = ';;;"Monthly EMI"';
  wsEx2.getCell('E6').font = fontBold;
  wsEx2.getCell('E6').border = borderHeader;
  wsEx2.getCell('E6').fill = fillOutput;

  wsEx2.getCell('F6').value = { formula: 'B11' };
  wsEx2.getCell('F6').numFmt = ';;;"Total Repayment"';
  wsEx2.getCell('F6').font = fontBold;
  wsEx2.getCell('F6').border = borderHeader;
  wsEx2.getCell('F6').fill = fillOutput;

  wsEx2.getCell('G6').value = { formula: 'B12' };
  wsEx2.getCell('G6').numFmt = ';;;"Total Interest"';
  wsEx2.getCell('G6').font = fontBold;
  wsEx2.getCell('G6').border = borderHeader;
  wsEx2.getCell('G6').fill = fillOutput;

  rates.forEach((rate, idx) => {
    const rNum = 7 + idx;
    const r = wsEx2.getRow(rNum);
    
    r.getCell(4).value = rate;
    r.getCell(4).numFmt = '0.00%';
    r.getCell(4).fill = fillInput;
    r.getCell(4).border = borderThin;

    r.getCell(5).value = { formula: `PMT(D${rNum}/12, $B$9, -$B$6)` };
    r.getCell(5).numFmt = '₹ #,##,##0';
    r.getCell(5).border = borderThin;
    r.getCell(5).fill = idx % 2 === 0 ? fillZebra1 : fillZebra2;

    r.getCell(6).value = { formula: `E${rNum}*$B$9` };
    r.getCell(6).numFmt = '₹ #,##,##0';
    r.getCell(6).border = borderThin;
    r.getCell(6).fill = idx % 2 === 0 ? fillZebra1 : fillZebra2;

    r.getCell(7).value = { formula: `F${rNum}-$B$6` };
    r.getCell(7).numFmt = '₹ #,##,##0';
    r.getCell(7).border = borderThin;
    r.getCell(7).fill = idx % 2 === 0 ? fillZebra1 : fillZebra2;
  });


  // =========================================================================
  // 4. EX3: BREAK-EVEN PRODUCTION & EBIT SENSITIVITY
  // =========================================================================
  const wsEx3 = wb.addWorksheet('Ex3_BreakEven_Production');
  addTopBanner(wsEx3, 'Exercise 3: Manufacturing Volume vs EBIT Operating Leverage', 'Topic 2: Analyzing Fixed Cost Absorption across Production Tiers', fillEmerald);
  wsEx3.columns = [{ width: 24 }, { width: 18 }, { width: 4 }, { width: 18 }, { width: 20 }, { width: 20 }, { width: 25 }];

  wsEx3.mergeCells('A5:B5');
  wsEx3.getCell('A5').value = '1. COST & PROFIT MODEL';
  wsEx3.getCell('A5').font = fontBold;
  wsEx3.getCell('A5').fill = fillEmerald;

  const ex3Base = [
    ['Selling Price per Unit (₹)', 2500, '₹ #,##,##0'],
    ['Variable Cost per Unit (₹)', 1200, '₹ #,##,##0'],
    ['Unit Contribution Margin (₹)', { formula: 'B6-B7' }, '₹ #,##,##0'],
    ['Fixed Factory Overhead (₹)', 15000000, '₹ #,##,##0'],
    ['Baseline Volume (Units)', 15000, '#,##0'],
    ['Gross Revenue (₹)', { formula: 'B6*B10' }, '₹ #,##,##0'],
    ['Total Variable Costs (₹)', { formula: 'B7*B10' }, '₹ #,##,##0'],
    ['Net Operating EBIT (₹)', { formula: '(B8*B10)-B9' }, '₹ #,##,##0']
  ];

  ex3Base.forEach((row, idx) => {
    const rNum = 6 + idx;
    const r = wsEx3.getRow(rNum);
    r.getCell(1).value = row[0];
    r.getCell(1).font = fontMain;
    r.getCell(1).border = borderThin;

    const valCell = r.getCell(2);
    valCell.value = row[1];
    valCell.numFmt = row[2];
    valCell.border = borderThin;
    valCell.fill = typeof row[1] === 'object' ? fillOutput : fillInput;
    valCell.font = typeof row[1] === 'object' ? fontBold : fontMain;
  });

  wsEx3.mergeCells('D5:F5');
  wsEx3.getCell('D5').value = '2. PRODUCTION VOLUME SENSITIVITY TABLE';
  wsEx3.getCell('D5').font = fontBold;
  wsEx3.getCell('D5').fill = fillNavy;

  wsEx3.getCell('D6').value = 'Production Units';
  wsEx3.getCell('D6').font = fontBold;
  wsEx3.getCell('D6').border = borderHeader;

  wsEx3.getCell('E6').value = { formula: 'B11' };
  wsEx3.getCell('E6').numFmt = ';;;"Gross Revenue"';
  wsEx3.getCell('E6').font = fontBold;
  wsEx3.getCell('E6').border = borderHeader;
  wsEx3.getCell('E6').fill = fillOutput;

  wsEx3.getCell('F6').value = { formula: 'B13' };
  wsEx3.getCell('F6').numFmt = ';;;"Operating EBIT"';
  wsEx3.getCell('F6').font = fontBold;
  wsEx3.getCell('F6').border = borderHeader;
  wsEx3.getCell('F6').fill = fillOutput;

  const volumes = [5000, 7500, 10000, 11538, 12500, 15000, 17500, 20000, 22500, 25000, 30000];
  volumes.forEach((vol, idx) => {
    const rNum = 7 + idx;
    const r = wsEx3.getRow(rNum);
    
    r.getCell(4).value = vol;
    r.getCell(4).numFmt = '#,##0';
    r.getCell(4).fill = fillInput;
    r.getCell(4).border = borderThin;

    r.getCell(5).value = { formula: `D${rNum}*$B$6` };
    r.getCell(5).numFmt = '₹ #,##,##0';
    r.getCell(5).border = borderThin;

    r.getCell(6).value = { formula: `(D${rNum}*$B$8)-$B$9` };
    r.getCell(6).numFmt = '₹ #,##,##0;[Red](₹ #,##,##0);"-"';
    r.getCell(6).border = borderThin;
    r.getCell(6).font = vol === 15000 ? fontBold : fontMain;
  });


  // =========================================================================
  // 5. EX4: CAPEX WACC DISCOUNT RATE SENSITIVITY (DCF / NPV)
  // =========================================================================
  const wsEx4 = wb.addWorksheet('Ex4_Capex_WACC_NPV');
  addTopBanner(wsEx4, 'Exercise 4: Discount Rate (WACC) Sensitivity on Project NPV', 'Topic 2: Finding Zero-NPV Hurdle Rate (IRR = 21.4%) via Data Table', fillAmber);
  wsEx4.columns = [{ width: 22 }, { width: 18 }, { width: 4 }, { width: 18 }, { width: 20 }, { width: 25 }];

  wsEx4.mergeCells('A5:B5');
  wsEx4.getCell('A5').value = '1. 5-YEAR CAPEX CASH FLOWS';
  wsEx4.getCell('A5').font = fontBold;
  wsEx4.getCell('A5').fill = fillAmber;

  const ex4Base = [
    ['Year 0 Outlay (₹)', -10000000, '₹ #,##,##0;[Red](₹ #,##,##0)'],
    ['Year 1 Cash Inflow (₹)', 2800000, '₹ #,##,##0'],
    ['Year 2 Cash Inflow (₹)', 3200000, '₹ #,##,##0'],
    ['Year 3 Cash Inflow (₹)', 3600000, '₹ #,##,##0'],
    ['Year 4 Cash Inflow (₹)', 4000000, '₹ #,##,##0'],
    ['Year 5 Cash Inflow (₹)', 4500000, '₹ #,##,##0'],
    ['Baseline WACC Rate', 0.12, '0.00%'],
    ['Project Net Present Value', { formula: 'NPV(B12, B7:B11)+B6' }, '₹ #,##,##0.00'],
    ['Internal Rate of Return', { formula: 'IRR(B6:B11)' }, '0.00%']
  ];

  ex4Base.forEach((row, idx) => {
    const rNum = 6 + idx;
    const r = wsEx4.getRow(rNum);
    r.getCell(1).value = row[0];
    r.getCell(1).font = fontMain;
    r.getCell(1).border = borderThin;

    const valCell = r.getCell(2);
    valCell.value = row[1];
    valCell.numFmt = row[2];
    valCell.border = borderThin;
    valCell.fill = typeof row[1] === 'object' ? fillOutput : fillInput;
    valCell.font = typeof row[1] === 'object' ? fontBold : fontMain;
  });

  wsEx4.mergeCells('D5:E5');
  wsEx4.getCell('D5').value = '2. WACC SENSITIVITY TABLE';
  wsEx4.getCell('D5').font = fontBold;
  wsEx4.getCell('D5').fill = fillNavy;

  wsEx4.getCell('D6').value = 'Discount Rate';
  wsEx4.getCell('D6').font = fontBold;
  wsEx4.getCell('D6').border = borderHeader;

  wsEx4.getCell('E6').value = { formula: 'B13' };
  wsEx4.getCell('E6').numFmt = ';;;"Project NPV (₹)"';
  wsEx4.getCell('E6').font = fontBold;
  wsEx4.getCell('E6').border = borderHeader;
  wsEx4.getCell('E6').fill = fillOutput;

  const waccSteps = [0.08, 0.10, 0.12, 0.14, 0.16, 0.18, 0.20, 0.214, 0.22, 0.24, 0.26];
  waccSteps.forEach((rate, idx) => {
    const rNum = 7 + idx;
    const r = wsEx4.getRow(rNum);
    
    r.getCell(4).value = rate;
    r.getCell(4).numFmt = '0.0%';
    r.getCell(4).fill = fillInput;
    r.getCell(4).border = borderThin;

    r.getCell(5).value = { formula: `NPV(D${rNum}, $B$7:$B$11)+$B$6` };
    r.getCell(5).numFmt = '₹ #,##,##0;[Red](₹ #,##,##0);"-"';
    r.getCell(5).border = borderThin;
    r.getCell(5).font = rate === 0.214 ? { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFD97706' } } : fontMain;
  });


  // =========================================================================
  // 6. EX5: COMMERCIAL REAL ESTATE OCCUPANCY & DSCR SENSITIVITY
  // =========================================================================
  const wsEx5 = wb.addWorksheet('Ex5_RealEstate_Occupancy');
  addTopBanner(wsEx5, 'Exercise 5: Real Estate Occupancy Rate vs NOI & DSCR', 'Topic 2: Stress-Testing Debt Service Coverage Buffers under Vacancy', fillIndigo);
  wsEx5.columns = [{ width: 24 }, { width: 18 }, { width: 4 }, { width: 16 }, { width: 18 }, { width: 18 }, { width: 18 }];

  wsEx5.mergeCells('A5:B5');
  wsEx5.getCell('A5').value = '1. COMMERCIAL PROPERTY MODEL';
  wsEx5.getCell('A5').font = fontBold;
  wsEx5.getCell('A5').fill = fillIndigo;

  const ex5Base = [
    ['Total Leasable Area (Sq.Ft)', 100000, '#,##0'],
    ['Annual Rent per Sq.Ft (₹)', 1200, '₹ #,##,##0'],
    ['Baseline Occupancy Rate', 0.85, '0.0%'],
    ['Operating Expense Ratio', 0.25, '0.0%'],
    ['Annual Debt Service EMI (₹)', 60000000, '₹ #,##,##0'],
    ['Gross Rental Income (₹)', { formula: 'B6*B7*B8' }, '₹ #,##,##0'],
    ['Net Operating Income (₹)', { formula: 'B11*(1-B9)' }, '₹ #,##,##0'],
    ['DSCR Coverage Ratio', { formula: 'B12/B10' }, '0.00 "x"']
  ];

  ex5Base.forEach((row, idx) => {
    const rNum = 6 + idx;
    const r = wsEx5.getRow(rNum);
    r.getCell(1).value = row[0];
    r.getCell(1).font = fontMain;
    r.getCell(1).border = borderThin;

    const valCell = r.getCell(2);
    valCell.value = row[1];
    valCell.numFmt = row[2];
    valCell.border = borderThin;
    valCell.fill = typeof row[1] === 'object' ? fillOutput : fillInput;
    valCell.font = typeof row[1] === 'object' ? fontBold : fontMain;
  });

  wsEx5.mergeCells('D5:G5');
  wsEx5.getCell('D5').value = '2. OCCUPANCY SENSITIVITY TABLE';
  wsEx5.getCell('D5').font = fontBold;
  wsEx5.getCell('D5').fill = fillNavy;

  wsEx5.getCell('D6').value = 'Occupancy %';
  wsEx5.getCell('D6').font = fontBold;
  wsEx5.getCell('D6').border = borderHeader;

  wsEx5.getCell('E6').value = { formula: 'B11' };
  wsEx5.getCell('E6').numFmt = ';;;"Gross Rent"';
  wsEx5.getCell('E6').font = fontBold;
  wsEx5.getCell('E6').border = borderHeader;

  wsEx5.getCell('F6').value = { formula: 'B12' };
  wsEx5.getCell('F6').numFmt = ';;;"Net Operating Income"';
  wsEx5.getCell('F6').font = fontBold;
  wsEx5.getCell('F6').border = borderHeader;

  wsEx5.getCell('G6').value = { formula: 'B13' };
  wsEx5.getCell('G6').numFmt = ';;;"DSCR Ratio"';
  wsEx5.getCell('G6').font = fontBold;
  wsEx5.getCell('G6').border = borderHeader;

  const occupancies = [0.60, 0.65, 0.70, 0.75, 0.80, 0.85, 0.90, 0.95, 1.00];
  occupancies.forEach((occ, idx) => {
    const rNum = 7 + idx;
    const r = wsEx5.getRow(rNum);
    
    r.getCell(4).value = occ;
    r.getCell(4).numFmt = '0.0%';
    r.getCell(4).fill = fillInput;
    r.getCell(4).border = borderThin;

    r.getCell(5).value = { formula: `$B$6*$B$7*D${rNum}` };
    r.getCell(5).numFmt = '₹ #,##,##0';
    r.getCell(5).border = borderThin;

    r.getCell(6).value = { formula: `E${rNum}*(1-$B$9)` };
    r.getCell(6).numFmt = '₹ #,##,##0';
    r.getCell(6).border = borderThin;

    r.getCell(7).value = { formula: `F${rNum}/$B$10` };
    r.getCell(7).numFmt = '0.00 "x"';
    r.getCell(7).border = borderThin;
    r.getCell(7).font = occ === 0.85 ? fontBold : fontMain;
  });


  // =========================================================================
  // 7. EX6: MULTI-OUTPUT FX (USD/INR) SENSITIVITY
  // =========================================================================
  const wsEx6 = wb.addWorksheet('Ex6_Multi_Output_FX');
  addTopBanner(wsEx6, 'Exercise 6: USD/INR Spot Exchange Rate Sensitivity Matrix', 'Topic 2: Measuring Landed Margin Volatility Across Currency Fluctuations', fillPurple);
  wsEx6.columns = [{ width: 24 }, { width: 18 }, { width: 4 }, { width: 16 }, { width: 18 }, { width: 18 }, { width: 18 }];

  wsEx6.mergeCells('A5:B5');
  wsEx6.getCell('A5').value = '1. EXPORT CONTRACT FINANCIALS';
  wsEx6.getCell('A5').font = fontBold;
  wsEx6.getCell('A5').fill = fillPurple;

  const ex6Base = [
    ['Export Contract ($)', 500000, '$ #,##0'],
    ['Domestic Procurement (₹)', 32000000, '₹ #,##,##0'],
    ['Shipping & Customs (₹)', 2500000, '₹ #,##,##0'],
    ['Baseline USD/INR Rate', 84.00, '₹ 0.00'],
    ['Gross Export Revenue (₹)', { formula: 'B6*B9' }, '₹ #,##,##0'],
    ['Total Landed Cost (₹)', { formula: 'B7+B8' }, '₹ #,##,##0'],
    ['Net Operating Margin (₹)', { formula: 'B10-B11' }, '₹ #,##,##0'],
    ['Net Margin %', { formula: 'B12/B10' }, '0.0%']
  ];

  ex6Base.forEach((row, idx) => {
    const rNum = 6 + idx;
    const r = wsEx6.getRow(rNum);
    r.getCell(1).value = row[0];
    r.getCell(1).font = fontMain;
    r.getCell(1).border = borderThin;

    const valCell = r.getCell(2);
    valCell.value = row[1];
    valCell.numFmt = row[2];
    valCell.border = borderThin;
    valCell.fill = typeof row[1] === 'object' ? fillOutput : fillInput;
    valCell.font = typeof row[1] === 'object' ? fontBold : fontMain;
  });

  wsEx6.mergeCells('D5:G5');
  wsEx6.getCell('D5').value = '2. FOREX RATE SENSITIVITY TABLE';
  wsEx6.getCell('D5').font = fontBold;
  wsEx6.getCell('D5').fill = fillNavy;

  wsEx6.getCell('D6').value = 'USD/INR Rate';
  wsEx6.getCell('D6').font = fontBold;
  wsEx6.getCell('D6').border = borderHeader;

  wsEx6.getCell('E6').value = { formula: 'B10' };
  wsEx6.getCell('E6').numFmt = ';;;"Export Revenue (₹)"';
  wsEx6.getCell('E6').font = fontBold;
  wsEx6.getCell('E6').border = borderHeader;

  wsEx6.getCell('F6').value = { formula: 'B12' };
  wsEx6.getCell('F6').numFmt = ';;;"Net Margin (₹)"';
  wsEx6.getCell('F6').font = fontBold;
  wsEx6.getCell('F6').border = borderHeader;

  wsEx6.getCell('G6').value = { formula: 'B13' };
  wsEx6.getCell('G6').numFmt = ';;;"Margin %"';
  wsEx6.getCell('G6').font = fontBold;
  wsEx6.getCell('G6').border = borderHeader;

  const fxRates = [78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98];
  fxRates.forEach((fx, idx) => {
    const rNum = 7 + idx;
    const r = wsEx6.getRow(rNum);
    
    r.getCell(4).value = fx;
    r.getCell(4).numFmt = '₹ 0.00';
    r.getCell(4).fill = fillInput;
    r.getCell(4).border = borderThin;

    r.getCell(5).value = { formula: `$B$6*D${rNum}` };
    r.getCell(5).numFmt = '₹ #,##,##0';
    r.getCell(5).border = borderThin;

    r.getCell(6).value = { formula: `E${rNum}-$B$11` };
    r.getCell(6).numFmt = '₹ #,##,##0;[Red](₹ #,##,##0);"-"';
    r.getCell(6).border = borderThin;

    r.getCell(7).value = { formula: `F${rNum}/E${rNum}` };
    r.getCell(7).numFmt = '0.0%';
    r.getCell(7).border = borderThin;
  });


  // =========================================================================
  // 8. EX7: ROW-ORIENTED PRODUCT PRICE SENSITIVITY TABLE
  // =========================================================================
  const wsEx7 = wb.addWorksheet('Ex7_Row_Oriented_Table');
  addTopBanner(wsEx7, 'Exercise 7: Row-Oriented Product Price Sensitivity Table', 'Topic 2: Setting Row Input Cell = B5 with Horizontal Header Inputs | Formula: {=TABLE(B5, )}', fillSky);
  wsEx7.columns = [{ width: 22 }, { width: 18 }, { width: 4 }, { width: 18 }, { width: 16 }, { width: 16 }, { width: 16 }, { width: 16 }, { width: 16 }];

  wsEx7.mergeCells('A5:B5');
  wsEx7.getCell('A5').value = '1. PRICING & PROFIT MODEL';
  wsEx7.getCell('A5').font = fontBold;
  wsEx7.getCell('A5').fill = fillSky;

  const ex7Base = [
    ['Unit Selling Price (₹)', 1200, '₹ #,##0'],
    ['Sales Volume (Units)', 10000, '#,##0'],
    ['Unit COGS (₹)', 750, '₹ #,##0'],
    ['Fixed Overhead (₹)', 2500000, '₹ #,##,##0'],
    ['Gross Sales Revenue (₹)', { formula: 'B6*B7' }, '₹ #,##,##0'],
    ['Total COGS (₹)', { formula: 'B8*B7' }, '₹ #,##,##0'],
    ['Net Operating Profit (₹)', { formula: 'B10-B11-B9' }, '₹ #,##,##0']
  ];

  ex7Base.forEach((row, idx) => {
    const rNum = 6 + idx;
    const r = wsEx7.getRow(rNum);
    r.getCell(1).value = row[0];
    r.getCell(1).font = fontMain;
    r.getCell(1).border = borderThin;

    const valCell = r.getCell(2);
    valCell.value = row[1];
    valCell.numFmt = row[2];
    valCell.border = borderThin;
    valCell.fill = typeof row[1] === 'object' ? fillOutput : fillInput;
    valCell.font = typeof row[1] === 'object' ? fontBold : fontMain;
  });

  wsEx7.mergeCells('D5:I5');
  wsEx7.getCell('D5').value = '2. ROW-ORIENTED SENSITIVITY TABLE (HORIZONTAL INPUTS ACROSS ROW 6)';
  wsEx7.getCell('D5').font = fontBold;
  wsEx7.getCell('D5').fill = fillEmerald;

  wsEx7.getCell('D6').value = 'Price Scenarios ➔';
  wsEx7.getCell('D6').font = fontBold;
  wsEx7.getCell('D6').border = borderHeader;
  wsEx7.getCell('D6').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE2E8F0' } };

  const hPrices = [800, 1000, 1200, 1400, 1600];
  hPrices.forEach((p, idx) => {
    const c = wsEx7.getRow(6).getCell(5 + idx);
    c.value = p;
    c.numFmt = '₹ #,##0';
    c.font = fontBold;
    c.fill = fillInput;
    c.border = borderHeader;
    c.alignment = { horizontal: 'right' };
  });

  wsEx7.getCell('D7').value = { formula: 'B12' };
  wsEx7.getCell('D7').font = fontBold;
  wsEx7.getCell('D7').numFmt = ';;;"Net Operating Profit"';
  wsEx7.getCell('D7').fill = fillOutput;
  wsEx7.getCell('D7').border = borderThin;

  hPrices.forEach((p, idx) => {
    const c = wsEx7.getRow(7).getCell(5 + idx);
    c.value = { formula: `(${wsEx7.getRow(6).getCell(5+idx).address}*$B$7)-($B$8*$B$7)-$B$9` };
    c.numFmt = '₹ #,##,##0;[Red](₹ #,##,##0);"-"';
    c.font = p === 1200 ? fontBold : fontMain;
    c.fill = p === 1200 ? { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFDCFCE7' } } : fillZebra1;
    c.border = borderThin;
    c.alignment = { horizontal: 'right' };
  });


  // =========================================================================
  // 9. EX8: PERFORMANCE TUNING & CALCULATION ENGINE MODES
  // =========================================================================
  const wsEx8 = wb.addWorksheet('Ex8_Performance_Tuning');
  addTopBanner(wsEx8, 'Exercise 8: Calculation Engine Optimization & Benchmarking', 'Topic 2 & 4: Setting Calculation Mode to "Automatic Except for Data Tables" (Alt + M + X + E)', fillNavy);
  wsEx8.columns = [{ width: 22 }, { width: 32 }, { width: 30 }, { width: 36 }];

  wsEx8.mergeCells('A5:D5');
  wsEx8.getCell('A5').value = '⚙️ EXCEL CALCULATION ENGINE MODES COMPARISON MATRIX';
  wsEx8.getCell('A5').font = fontSection;
  wsEx8.getCell('A5').fill = fillSky;

  const perfModes = [
    ['Mode', 'Ribbon & Shortcut', 'Behavior During Routine Edits', 'Optimal Production Use Case'],
    ['Automatic (Default)', 'Formulas > Calc Options > Automatic (Alt + M + X + A)', 'Recalculates ALL formulas & all data tables instantly on every cell edit', 'Small-to-medium workbooks (< 5,000 formulas) without heavy iterative tables'],
    ['Automatic Except Data Tables', 'Formulas > Calc Options > Automatic Except Tables (Alt + M + X + E)', 'Recalculates formulas instantly, but SKIPS table arrays until F9 is pressed', 'Large financial models with multiple 1-Var or 2-Var Data Tables (Prevents UI lag)'],
    ['Manual', 'Formulas > Calc Options > Manual (Alt + M + X + M)', 'Completely stops all background calculation until F9 is manually pressed', 'Massive enterprise database workbooks (> 500k rows) during batch data entry']
  ];

  perfModes.forEach((row, idx) => {
    const rNum = 6 + idx;
    const r = wsEx8.getRow(rNum);
    r.height = 24;
    row.forEach((val, cIdx) => {
      const cell = r.getCell(cIdx + 1);
      cell.value = val;
      cell.font = idx === 0 ? fontBold : fontMain;
      cell.fill = idx === 0 ? { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE2E8F0' } } : (idx === 2 ? { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFEF3C7' } } : fillZebra1);
      cell.border = borderThin;
      cell.alignment = { vertical: 'middle', wrapText: true };
    });
  });

  wsEx8.mergeCells('A12:D16');
  const perfCallout = wsEx8.getCell('A12');
  perfCallout.value = "🚀 PROFESSIONAL MODELING TIP BY SUKANTA SIR:\nWhen building institutional M&A, DCF, and debt amortization models, large One-Variable and Two-Variable Data Tables force Excel to run dozens of hidden calculation passes for each table cell. If your workbook freezes for 2–5 seconds every time you type a number, immediately press 'Alt + M + X + E' to switch to 'Automatic Except for Data Tables'. Then simply tap 'F9' whenever you need to refresh your sensitivity tables!";
  perfCallout.font = { name: 'Segoe UI', size: 10, color: { argb: 'FF0F172A' }, bold: true };
  perfCallout.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE0F2FE' } };
  perfCallout.border = { top: { style: 'medium', color: { argb: 'FF0284C7' } }, bottom: { style: 'medium', color: { argb: 'FF0284C7' } }, left: { style: 'medium', color: { argb: 'FF0284C7' } }, right: { style: 'medium', color: { argb: 'FF0284C7' } } };
  perfCallout.alignment = { wrapText: true, vertical: 'middle', indent: 1 };


  // =========================================================================
  // 10. EX9: TWO-VARIABLE DATA TABLE (PRICE VS VOLUME MATRIX)
  // =========================================================================
  const wsEx9 = wb.addWorksheet('Ex9_Two_Var_Price_Volume');
  addTopBanner(wsEx9, 'Exercise 9: Two-Variable Price vs Volume Profit Matrix', 'Topic 3: Cross-Matrix 2D Sensitivity Model | Formula: {=TABLE(B7, B6)}', fillEmerald);
  wsEx9.columns = [{ width: 22 }, { width: 18 }, { width: 4 }, { width: 16 }, { width: 16 }, { width: 16 }, { width: 16 }, { width: 16 }, { width: 16 }];

  wsEx9.mergeCells('A5:B5');
  wsEx9.getCell('A5').value = '1. CORE BUSINESS PARAMETERS';
  wsEx9.getCell('A5').font = fontBold;
  wsEx9.getCell('A5').fill = fillEmerald;

  const ex9Base = [
    ['Unit Selling Price (₹)', 1200, '₹ #,##0'],
    ['Production Volume (Units)', 10000, '#,##0'],
    ['Unit Variable Cost (₹)', 750, '₹ #,##0'],
    ['Fixed Overhead (₹)', 2500000, '₹ #,##,##0'],
    ['Net Profit (₹)', { formula: '(B6-B8)*B7-B9' }, '₹ #,##,##0']
  ];

  ex9Base.forEach((row, idx) => {
    const rNum = 6 + idx;
    const r = wsEx9.getRow(rNum);
    r.getCell(1).value = row[0];
    r.getCell(1).font = fontMain;
    r.getCell(1).border = borderThin;

    const valCell = r.getCell(2);
    valCell.value = row[1];
    valCell.numFmt = row[2];
    valCell.border = borderThin;
    valCell.fill = typeof row[1] === 'object' ? fillOutput : fillInput;
    valCell.font = typeof row[1] === 'object' ? fontBold : fontMain;
  });

  wsEx9.mergeCells('D5:I5');
  wsEx9.getCell('D5').value = '2. TWO-VARIABLE DATA TABLE (NET PROFIT MATRIX)';
  wsEx9.getCell('D5').font = fontBold;
  wsEx9.getCell('D5').fill = fillNavy;

  wsEx9.getCell('D6').value = { formula: 'B10' };
  wsEx9.getCell('D6').font = fontBold;
  wsEx9.getCell('D6').numFmt = ';;;"Price \\ Vol"';
  wsEx9.getCell('D6').fill = fillOutput;
  wsEx9.getCell('D6').border = borderHeader;

  const colVols = [5000, 7500, 10000, 15000, 20000];
  colVols.forEach((vol, idx) => {
    const c = wsEx9.getRow(6).getCell(5 + idx);
    c.value = vol;
    c.numFmt = '#,##0 "Units"';
    c.font = fontBold;
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE2E8F0' } };
    c.border = borderHeader;
    c.alignment = { horizontal: 'right' };
  });

  const rowPrices = [900, 1000, 1100, 1200, 1300, 1400, 1500];
  rowPrices.forEach((price, rIdx) => {
    const rNum = 7 + rIdx;
    const r = wsEx9.getRow(rNum);
    
    const pCell = r.getCell(4);
    pCell.value = price;
    pCell.numFmt = '₹ #,##0';
    pCell.font = fontBold;
    pCell.fill = fillInput;
    pCell.border = borderHeader;
    pCell.alignment = { horizontal: 'right' };

    colVols.forEach((vol, cIdx) => {
      const valCell = r.getCell(5 + cIdx);
      valCell.value = { formula: `(D${rNum}-$B$8)*${wsEx9.getRow(6).getCell(5+cIdx).address}-$B$9` };
      valCell.numFmt = '₹ #,##,##0;[Red](₹ #,##,##0);"-"';
      valCell.border = borderThin;
      valCell.alignment = { horizontal: 'right' };
      valCell.font = (price === 1200 && vol === 10000) ? fontBold : fontMain;
      valCell.fill = (price === 1200 && vol === 10000) ? { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFDCFCE7' } } : (rIdx % 2 === 0 ? fillZebra1 : fillZebra2);
    });
  });


  // =========================================================================
  // 11. EX10: SCENARIO MANAGER COMPARISON
  // =========================================================================
  const wsEx10 = wb.addWorksheet('Ex10_Scenario_Manager');
  addTopBanner(wsEx10, 'Exercise 10: Scenario Manager Macro-Economic Planning', 'Topic 5 & 6: Comparing Best Case, Base Case & Worst Case Assumptions (Alt + A + W + S)', fillPurple);
  wsEx10.columns = [{ width: 26 }, { width: 18 }, { width: 18 }, { width: 18 }, { width: 22 }];

  wsEx10.mergeCells('A5:D5');
  wsEx10.getCell('A5').value = '📊 SCENARIO SUMMARY COMPARISON MATRIX';
  wsEx10.getCell('A5').font = fontSection;
  wsEx10.getCell('A5').fill = fillPurple;

  const scHeaders = ['Model Variable / KPI', 'Worst Case (Recession)', 'Base Case (Budget)', 'Best Case (Expansion)'];
  const scHeadRow = wsEx10.getRow(6);
  scHeadRow.height = 24;
  scHeaders.forEach((h, idx) => {
    const c = scHeadRow.getCell(idx + 1);
    c.value = h;
    c.font = fontBold;
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE2E8F0' } };
    c.border = borderHeader;
    c.alignment = { horizontal: idx === 0 ? 'left' : 'right' };
  });

  const scRows = [
    ['Changing Cell: Sales Price (₹)', 1000, 1200, 1450, '₹ #,##0'],
    ['Changing Cell: Sales Volume (Units)', 7000, 10000, 14000, '#,##0'],
    ['Changing Cell: Variable Cost %', 0.68, 0.625, 0.55, '0.0%'],
    ['Changing Cell: Fixed Overhead (₹)', 2800000, 2500000, 2400000, '₹ #,##,##0'],
    ['Result KPI: Total Revenue (₹)', { formula: 'B7*B8' }, { formula: 'C7*C8' }, { formula: 'D7*D8' }, '₹ #,##,##0'],
    ['Result KPI: Total Costs (₹)', { formula: '(B11*B9)+B10' }, { formula: '(C11*C9)+C10' }, { formula: '(D11*D9)+D10' }, '₹ #,##,##0'],
    ['Result KPI: Net Profit (₹)', { formula: 'B11-B12' }, { formula: 'C11-C12' }, { formula: 'D11-D12' }, '₹ #,##,##0;[Red](₹ #,##,##0)']
  ];

  scRows.forEach((row, idx) => {
    const rNum = 7 + idx;
    const r = wsEx10.getRow(rNum);
    r.getCell(1).value = row[0];
    r.getCell(1).font = idx >= 4 ? fontBold : fontMain;
    r.getCell(1).border = borderThin;

    for (let i = 1; i <= 3; i++) {
      const valCell = r.getCell(i + 1);
      valCell.value = row[i];
      valCell.numFmt = row[4];
      valCell.font = idx >= 4 ? fontBold : fontMain;
      valCell.fill = idx >= 4 ? fillOutput : fillInput;
      valCell.border = borderThin;
      valCell.alignment = { horizontal: 'right' };
    }
  });


  // =========================================================================
  // 12. EX11: GOAL SEEK BREAK-EVEN
  // =========================================================================
  const wsEx11 = wb.addWorksheet('Ex11_Goal_Seek_BreakEven');
  addTopBanner(wsEx11, 'Exercise 11: Goal Seek Reverse Engineering Lab', 'Topic 1: Finding Exact Sales Volume to Hit Zero Break-Even EBIT (Alt + A + W + G)', fillAmber);
  wsEx11.columns = [{ width: 26 }, { width: 18 }, { width: 4 }, { width: 36 }];

  wsEx11.mergeCells('A5:B5');
  wsEx11.getCell('A5').value = '🎯 GOAL SEEK BREAK-EVEN MODEL';
  wsEx11.getCell('A5').font = fontBold;
  wsEx11.getCell('A5').fill = fillAmber;

  const ex11Base = [
    ['Unit Selling Price (₹)', 2500, '₹ #,##0'],
    ['Unit Variable Cost (₹)', 1200, '₹ #,##0'],
    ['Fixed Overhead (₹)', 15000000, '₹ #,##,##0'],
    ['Current Sales Volume (Changing Cell)', 8000, '#,##0'],
    ['Current Net Operating EBIT (Set Cell)', { formula: '((B6-B7)*B9)-B8' }, '₹ #,##,##0;[Red](₹ #,##,##0)'],
    ['Target Break-Even EBIT (Goal)', 0, '₹ #,##,##0'],
    ['Required Break-Even Units (Formula Check)', { formula: 'B8/(B6-B7)' }, '#,##0 "Units"']
  ];

  ex11Base.forEach((row, idx) => {
    const rNum = 6 + idx;
    const r = wsEx11.getRow(rNum);
    r.getCell(1).value = row[0];
    r.getCell(1).font = idx >= 4 ? fontBold : fontMain;
    r.getCell(1).border = borderThin;

    const valCell = r.getCell(2);
    valCell.value = row[1];
    valCell.numFmt = row[2];
    valCell.border = borderThin;
    valCell.fill = idx === 3 ? fillInput : (idx >= 4 ? fillOutput : fillZebra1);
    valCell.font = fontBold;
    valCell.alignment = { horizontal: 'right' };
  });

  wsEx11.mergeCells('D6:D12');
  const gsInstructions = wsEx11.getCell('D6');
  gsInstructions.value = "🎯 HOW TO RUN GOAL SEEK (Alt + A + W + G):\n1. Click cell B10 (Current Net Operating EBIT).\n2. Open: Data > What-If Analysis > Goal Seek.\n3. Configure Dialog:\n   • Set cell: B10\n   • To value: 0\n   • By changing cell: B9 (Sales Volume)\n4. Click OK. Excel iterates through calculus passes and finds the exact volume: 11,538 Units!";
  gsInstructions.font = { name: 'Segoe UI', size: 9, color: { argb: 'FF1E293B' } };
  gsInstructions.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFEF3C7' } };
  gsInstructions.border = borderHeader;
  gsInstructions.alignment = { wrapText: true, vertical: 'middle', indent: 1 };


  // Write file
  const outPath = path.join(excelFilesDir, '003_003_what_if_analysis_and_scenario_planning_master.xlsx');
  await wb.xlsx.writeFile(outPath);
  console.log(`✅ Master What-If Analysis workbook with Teacher Picture & Logo generated at: ${outPath}`);
}

buildWorkbook().catch(err => {
  console.error("❌ Error generating workbook:", err);
  process.exit(1);
});
