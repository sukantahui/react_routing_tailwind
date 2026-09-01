const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

const moduleDir = __dirname;
const excelFilesDir = path.join(moduleDir, 'excel_files');
if (!fs.existsSync(excelFilesDir)) fs.mkdirSync(excelFilesDir, { recursive: true });

const sampleNames = ['Swadeep Hui', 'Tuhina Das', 'Abhronila Ray', 'Susmita Sen', 'Debangshu Roy', 'Rahul Kumar', 'Priya Sharma', 'Aniket Verma', 'Sourav Ganguly', 'Sneha Ghosh', 'Arpan Dey', 'Subhajit Pal', 'Riya Sarkar', 'Dipankar Mitra', 'Barnali Dutta', 'Vikram Singh', 'Kavita Nair', 'Amitabh Basu', 'Pooja Bannerjee', 'Sanjay Chakraborty', 'Tanmoy Das', 'Mousumi Mukhopadhyay', 'Bikash Chatterjee', 'Sayani Bose', 'Aritra Sen', 'Niladri Roy', 'Paromita Guha', 'Siddharth Mallick', 'Trisha Roy', 'Kaushik Hazra'];
const sampleCities = ['Barrackpore', 'Shyamnagar', 'Ichapur', 'Naihati', 'Titagarh', 'Kolkata', 'Howrah', 'Hooghly', 'Kanchrapara', 'Sodepur'];
const sampleDepts = ['Finance', 'Accounts', 'Engineering', 'HR', 'Logistics', 'Procurement', 'Taxation', 'Audit'];

async function buildMasterWorkbook() {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Coder & AccoTax';
  wb.lastModifiedBy = 'Sukanta Hui';
  wb.created = new Date();
  wb.modified = new Date();

  // ---------------------------------------------------------------------------
  // 1. SHEET 1: OVERVIEW (EXECUTIVE LANDING PAGE)
  // ---------------------------------------------------------------------------
  const wsOverview = wb.addWorksheet('Overview', { views: [{ showGridLines: true }] });
  wsOverview.columns = [
    { width: 18 }, // Col A
    { width: 34 }, // Col B
    { width: 34 }, // Col C
    { width: 42 }, // Col D
    { width: 30 }, // Col E
    { width: 14 }  // Col F
  ];

  // Official CNAT Logo
  const logoPath = path.resolve(__dirname, '../../assets/cnat.png');
  if (fs.existsSync(logoPath)) {
    const logoId = wb.addImage({
      filename: logoPath,
      extension: 'png',
    });
    wsOverview.addImage(logoId, {
      tl: { col: 0.08, row: 0.15 },
      ext: { width: 110, height: 110 },
      editAs: 'oneCell'
    });
  }

  // Header Banners
  wsOverview.mergeCells('B1:F2');
  const bannerCell = wsOverview.getCell('B1');
  bannerCell.value = 'CODER & ACCOTAX';
  bannerCell.font = { name: 'Segoe UI', size: 18, bold: true, color: { argb: 'FFFFFFFF' } };
  bannerCell.alignment = { vertical: 'middle', horizontal: 'left', indent: 2 };
  bannerCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } };

  wsOverview.mergeCells('B3:F3');
  const subBanner = wsOverview.getCell('B3');
  subBanner.value = 'ISO 9001:2015 Certified Centre of Excellence in Computer Science & Financial Modeling';
  subBanner.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FF38BDF8' } };
  subBanner.alignment = { vertical: 'middle', horizontal: 'left', indent: 2 };
  subBanner.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E293B' } };

  wsOverview.mergeCells('B4:F4');
  const metaBanner = wsOverview.getCell('B4');
  const expYears = new Date().getFullYear() - 1998;
  metaBanner.value = `Interactive Chapter Practice Workbook · Mentored by Sukanta Hui (${expYears}+ Years Exp.) · Barrackpore`;
  metaBanner.font = { name: 'Segoe UI', size: 9, italic: true, color: { argb: 'FFF59E0B' } };
  metaBanner.alignment = { vertical: 'middle', horizontal: 'left', indent: 2 };
  metaBanner.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E293B' } };

  wsOverview.getRow(1).height = 24;
  wsOverview.getRow(2).height = 24;
  wsOverview.getRow(3).height = 20;
  wsOverview.getRow(4).height = 20;
  wsOverview.getRow(5).height = 12;

  // Hero Graphic
  const landingImgPath = path.resolve(__dirname, '../../assets/landing_sheet.jpg');
  if (fs.existsSync(landingImgPath)) {
    const landingImgId = wb.addImage({
      filename: landingImgPath,
      extension: 'jpeg',
    });
    wsOverview.addImage(landingImgId, {
      tl: { col: 0.15, row: 5.2 },
      ext: { width: 600, height: 400 },
      editAs: 'oneCell'
    });
  }

  for (let r = 6; r <= 25; r++) {
    wsOverview.getRow(r).height = 20;
  }
  wsOverview.getRow(26).height = 12;

  let curRow = 27;

  function addSectionHeader(title, hexColor) {
    wsOverview.mergeCells(`A${curRow}:F${curRow}`);
    const cell = wsOverview.getCell(`A${curRow}`);
    cell.value = title;
    cell.font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: hexColor } };
    cell.alignment = { vertical: 'middle', indent: 1 };
    wsOverview.getRow(curRow).height = 24;
    curRow++;
  }

  function addInfoRow(label, val) {
    const r = wsOverview.getRow(curRow);
    r.height = 19;
    wsOverview.mergeCells(`A${curRow}:B${curRow}`);
    const c1 = wsOverview.getCell(`A${curRow}`);
    c1.value = label;
    c1.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FF1E293B' } };
    c1.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF1F5F9' } };
    c1.alignment = { vertical: 'middle', indent: 1 };

    wsOverview.mergeCells(`C${curRow}:F${curRow}`);
    const c2 = wsOverview.getCell(`C${curRow}`);
    c2.value = val;
    c2.font = { name: 'Segoe UI', size: 9.5, color: { argb: 'FF334155' } };
    c2.alignment = { vertical: 'middle', indent: 1 };
    curRow++;
  }

  addSectionHeader('🏢 1. ORGANISATION PROFILE & CONTACT DETAILS', 'FF0284C7');
  addInfoRow('Institute Name', 'Coder & AccoTax (Centre of Excellence)');
  addInfoRow('Campus Address', '25(10/A) Shibtala Road, Nona Chandan Pukur, Barrackpore, Kolkata 700122, WB, India');
  addInfoRow('Contact Numbers', '+91 70037 56860 / +91 84202 04207 (WhatsApp Available)');
  addInfoRow('Official Email', 'sukantahui@codernaccotax.co.in | info@codernaccotax.co.in');
  addInfoRow('Web Portal', 'https://www.codernaccotax.co.in');
  addInfoRow('Core Domains', 'Full Stack Engineering, Advanced Excel, Power BI Stack, Financial Modeling & Quantitative Analytics');
  curRow++;

  addSectionHeader('👨‍🏫 2. LEAD INSTRUCTOR & MASTER MENTOR PROFILE', 'FF059669');
  addInfoRow('Lead Instructor', 'Sukanta Hui');
  addInfoRow('Designation', 'Senior Software Architect, Corporate Financial Consultant & Lead Academic Mentor');
  addInfoRow('Experience', `${expYears}+ Years of Industrial & Academic Mentoring Experience (Since May 1998)`);
  addInfoRow('GitHub Portfolio', 'https://github.com/sukantahui');
  addInfoRow('Teaching Focus', 'Advanced Mathematical Modeling, Precision Rounding, Vectorized Array Computation & Aggregation Architecture');
  curRow++;

  addSectionHeader('🎓 3. CHAPTER ACADEMIC & MODULE SPECIFICATIONS', 'FF7C3AED');
  addInfoRow('Course Code & Title', 'EXCEL-PRO-901: Microsoft Excel From Zero to Ultra Expert');
  addInfoRow('Module Directory', '009_001_advanced-mathematical-arithmetic-and-aggregation-functions');
  addInfoRow('Bloom\'s Taxonomy', 'Level 4 (Analyze), Level 5 (Evaluate) & Level 6 (Create)');
  curRow++;

  addSectionHeader('📑 4. WORKBOOK SHEET DIRECTORY & QUICK-JUMP NAVIGATION', 'FFD97706');

  const tableHeaderRow = wsOverview.getRow(curRow);
  tableHeaderRow.height = 22;
  const headers = ['SL #', 'Target Sheet / Topic', 'Primary Formula / Technique', 'Business Context / Dataset', '🚀 Instant Jump Action', 'Status'];
  const colLetters = ['A', 'B', 'C', 'D', 'E', 'F'];
  headers.forEach((h, idx) => {
    const c = wsOverview.getCell(`${colLetters[idx]}${curRow}`);
    c.value = h;
    c.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FFFFFFFF' } };
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF334155' } };
    c.alignment = { vertical: 'middle', horizontal: idx === 0 || idx === 5 ? 'center' : 'left', indent: idx === 0 || idx === 5 ? 0 : 1 };
  });
  curRow++;

  const topicTitles = [
    "SUMPRODUCT Function — Multi-Array Mathematical Aggregation",
    "AGGREGATE Function — Error-Aware Aggregation and Hidden-Row Control",
    "PRODUCT Function — Multiplication Across Values",
    "SUMSQ Function — Sum of Squares",
    "MOD Function — Remainder Calculations",
    "QUOTIENT Function — Integer Division",
    "MROUND Function — Multiple-Based Rounding",
    "CEILING.MATH Function — Mathematical Ceiling",
    "CEILING.PRECISE Function — Precise Ceiling",
    "FLOOR.MATH Function — Mathematical Floor",
    "FLOOR.PRECISE Function — Precise Floor",
    "EVEN and ODD Functions — Integer Rounding",
    "SIGN Function — Positive and Negative Direction Detection",
    "GCD Function — Greatest Common Divisor",
    "LCM Function — Least Common Multiple",
    "FACT Function — Factorial Calculations",
    "FACTDOUBLE Function — Double Factorials",
    "COMBIN Function — Combinations Without Repetition",
    "COMBINA Function — Combinations With Repetition",
    "PERMUT Function — Permutations Without Repetition",
    "PERMUTATIONA Function — Permutations With Repetition",
    "MULTINOMIAL Function — Multinomial Calculations",
    "SERIESSUM Function — Power-Series Evaluation",
    "SUMX2MY2 Function — Sum of Difference of Squares",
    "SUMX2PY2 Function — Sum of Sum of Squares",
    "SUMXMY2 Function — Sum of Squared Differences",
    "Advanced Aggregation Design",
    "Mathematical Formula Optimization",
    "Combining Mathematical Functions with Dynamic Arrays",
    "Advanced Mathematical Functions Project"
  ];

  const topicFormulas = [
    "=SUMPRODUCT(array1, array2)",
    "=AGGREGATE(function_num, options, range, [k])",
    "=PRODUCT(number1, [number2])",
    "=SUMSQ(number1, [number2])",
    "=MOD(number, divisor)",
    "=QUOTIENT(numerator, denominator)",
    "=MROUND(number, multiple)",
    "=CEILING.MATH(number, [significance])",
    "=CEILING.PRECISE(number, [significance])",
    "=FLOOR.MATH(number, [significance])",
    "=FLOOR.PRECISE(number, [significance])",
    "=EVEN(number) / =ODD(number)",
    "=SIGN(number)",
    "=GCD(number1, [number2])",
    "=LCM(number1, [number2])",
    "=FACT(number)",
    "=FACTDOUBLE(number)",
    "=COMBIN(number, number_chosen)",
    "=COMBINA(number, number_chosen)",
    "=PERMUT(number, number_chosen)",
    "=PERMUTATIONA(number, number_chosen)",
    "=MULTINOMIAL(number1, [number2])",
    "=SERIESSUM(x, n, m, coefficients)",
    "=SUMX2MY2(array_x, array_y)",
    "=SUMX2PY2(array_x, array_y)",
    "=SUMXMY2(array_x, array_y)",
    "SUMPRODUCT + Vector Criteria Masking",
    "LET() Variable Binding + Volatility Reduction",
    "MAP / REDUCE / BYROW / SCAN Dynamic Arrays",
    "Full Stack Master Engineering Project"
  ];

  const topicSheets = topicTitles.map((t, idx) => ({
    id: idx + 1,
    sheet: `Topic${idx}`,
    title: `Topic ${idx}: ${t}`,
    formula: topicFormulas[idx],
    context: `${sampleCities[idx % sampleCities.length]} Industrial Dataset`,
    status: idx === 29 ? 'Capstone' : 'Core Lab'
  }));

  topicSheets.forEach((t, idx) => {
    const r = wsOverview.getRow(curRow);
    r.height = 20;
    const isEven = idx % 2 === 0;
    const rowBg = isEven ? 'FFFFFFFF' : 'FFF8FAFC';

    const c1 = wsOverview.getCell(`A${curRow}`);
    c1.value = t.id;
    c1.alignment = { vertical: 'middle', horizontal: 'center' };

    const c2 = wsOverview.getCell(`B${curRow}`);
    c2.value = t.title;
    c2.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FF0F172A' } };
    c2.alignment = { vertical: 'middle', indent: 1 };

    const c3 = wsOverview.getCell(`C${curRow}`);
    c3.value = t.formula;
    c3.font = { name: 'Consolas', size: 9, color: { argb: 'FF0284C7' } };
    c3.alignment = { vertical: 'middle', indent: 1 };

    const c4 = wsOverview.getCell(`D${curRow}`);
    c4.value = t.context;
    c4.font = { name: 'Segoe UI', size: 9, color: { argb: 'FF475569' } };
    c4.alignment = { vertical: 'middle', indent: 1 };

    const c5 = wsOverview.getCell(`E${curRow}`);
    c5.value = {
      text: `👉 Open ${t.sheet} Sheet`,
      hyperlink: `#'${t.sheet}'!A1`,
      tooltip: `Click to navigate to ${t.sheet}`
    };
    c5.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FF0284C7' }, underline: true };
    c5.alignment = { vertical: 'middle', indent: 1 };

    const c6 = wsOverview.getCell(`F${curRow}`);
    c6.value = t.status;
    c6.font = { name: 'Segoe UI', size: 8.5, bold: true, color: { argb: 'FF059669' } };
    c6.alignment = { vertical: 'middle', horizontal: 'center' };

    colLetters.forEach((col) => {
      const cell = wsOverview.getCell(`${col}${curRow}`);
      if (cell !== c5) {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: rowBg } };
      } else {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: isEven ? 'FFF0F9FF' : 'FFE0F2FE' } };
      }
      cell.border = {
        top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        right: { style: 'thin', color: { argb: 'FFE2E8F0' } }
      };
    });

    curRow++;
  });

  wsOverview.eachRow((row) => {
    row.eachCell((cell) => {
      cell.protection = { locked: true };
    });
  });

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

  function addStyledTopicSheet(sheetName, headerColor, columns, data) {
    const ws = wb.addWorksheet(sheetName, { views: [{ showGridLines: true }] });
    ws.columns = columns;

    const navRow = ws.getRow(1);
    navRow.height = 22;
    ws.mergeCells(`A1:${colLetters[columns.length - 1]}1`);
    const navCell = ws.getCell('A1');
    navCell.value = {
      text: '⬅ Back to Executive Overview Directory',
      hyperlink: "#'Overview'!A1",
      tooltip: 'Return to Executive Overview'
    };
    navCell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FF0284C7' }, underline: true };
    navCell.alignment = { vertical: 'middle', indent: 1 };
    navCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF0F9FF' } };

    const headerRow = ws.getRow(2);
    headerRow.height = 24;
    columns.forEach((col, idx) => {
      const cell = ws.getCell(`${colLetters[idx]}2`);
      cell.value = col.header;
      cell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFFFF' } };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: headerColor } };
      cell.alignment = { vertical: 'middle', horizontal: col.alignment || 'left', indent: col.alignment === 'center' ? 0 : 1 };
    });

    data.forEach((item, rIdx) => {
      const rowNum = rIdx + 3;
      const row = ws.getRow(rowNum);
      row.height = 20;
      const isEven = rIdx % 2 === 0;
      const bg = isEven ? 'FFFFFFFF' : 'FFF8FAFC';

      columns.forEach((col, cIdx) => {
        const cell = ws.getCell(`${colLetters[cIdx]}${rowNum}`);
        const val = item[col.key];
        if (val && typeof val === 'object' && val.f) {
          cell.value = { formula: val.f };
        } else {
          cell.value = val;
        }
        cell.font = { name: col.key.includes('f') || col.key.includes('formula') || col.key.includes('mod') || col.key.includes('quotient') ? 'Consolas' : 'Segoe UI', size: 9.5, color: { argb: 'FF1E293B' } };
        cell.alignment = { vertical: 'middle', horizontal: col.alignment || 'left', indent: col.alignment === 'center' ? 0 : 1 };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: bg } };
        cell.border = {
          top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
          bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
          left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
          right: { style: 'thin', color: { argb: 'FFE2E8F0' } }
        };
      });
    });
  }

  // --- Generate 30 Topic Worksheets (Topic0 to Topic29) ---
  for (let idx = 0; idx < 30; idx++) {
    const sName = `Topic${idx}`;
    const cols = [
      { header: 'Row ID', key: 'id', width: 14, alignment: 'center' },
      { header: 'Client / Person', key: 'name', width: 22 },
      { header: 'Branch Location', key: 'city', width: 18 },
      { header: 'Input Value A', key: 'valA', width: 18, alignment: 'right' },
      { header: 'Input Value B', key: 'valB', width: 18, alignment: 'right' },
      { header: 'Evaluated Calculation Formula', key: 'result', width: 28, alignment: 'right' }
    ];

    const data = Array.from({ length: 25 }, (_, i) => {
      const rNum = i + 3;
      const vA = 100 + i * 15;
      const vB = 3 + (i % 5);
      let form = `D${rNum} * E${rNum}`;
      if (idx === 0) form = `SUMPRODUCT(D${rNum}, E${rNum})`;
      else if (idx === 1) form = `AGGREGATE(9, 6, D${rNum}:E${rNum})`;
      else if (idx === 2) form = `PRODUCT(D${rNum}, E${rNum})`;
      else if (idx === 3) form = `SUMSQ(D${rNum}, E${rNum})`;
      else if (idx === 4) form = `MOD(D${rNum}, E${rNum})`;
      else if (idx === 5) form = `QUOTIENT(D${rNum}, E${rNum})`;
      else if (idx === 6) form = `MROUND(D${rNum}, 50)`;
      else if (idx === 7) form = `CEILING.MATH(D${rNum}, 100)`;
      else if (idx === 8) form = `CEILING.PRECISE(D${rNum}, 100)`;
      else if (idx === 9) form = `FLOOR.MATH(D${rNum}, 100)`;
      else if (idx === 10) form = `FLOOR.PRECISE(D${rNum}, 100)`;
      else if (idx === 11) form = `EVEN(D${rNum})`;
      else if (idx === 12) form = `SIGN(D${rNum} - 200)`;
      else if (idx === 13) form = `GCD(D${rNum}, E${rNum} * 10)`;
      else if (idx === 14) form = `LCM(D${rNum}, E${rNum} * 5)`;
      else if (idx === 15) form = `FACT(MIN(E${rNum}, 8))`;
      else if (idx === 16) form = `FACTDOUBLE(MIN(E${rNum}*2, 10))`;
      else if (idx === 17) form = `COMBIN(10, MIN(E${rNum}, 5))`;
      else if (idx === 18) form = `COMBINA(10, MIN(E${rNum}, 5))`;
      else if (idx === 19) form = `PERMUT(10, MIN(E${rNum}, 5))`;
      else if (idx === 20) form = `PERMUTATIONA(5, MIN(E${rNum}, 3))`;
      else if (idx === 21) form = `MULTINOMIAL(2, 3, E${rNum})`;
      else if (idx === 22) form = `SERIESSUM(2, 1, 1, {1,2,3})`;
      else if (idx === 23) form = `SUMX2MY2(D${rNum}, E${rNum})`;
      else if (idx === 24) form = `SUMX2PY2(D${rNum}, E${rNum})`;
      else if (idx === 25) form = `SUMXMY2(D${rNum}, E${rNum})`;
      else if (idx === 26) form = `SUMPRODUCT((C${rNum}="Barrackpore")*(D${rNum}*E${rNum}))`;
      else if (idx === 27) form = `LET(a, D${rNum}, b, E${rNum}, a*b)`;
      else if (idx === 28) form = `MAP(D${rNum}:E${rNum}, LAMBDA(v, MROUND(v, 10)))`;
      else if (idx === 29) form = `LET(val, SUMPRODUCT(D${rNum}, E${rNum}), MROUND(val, 100))`;

      return {
        id: `ROW-${100 + i}`,
        name: sampleNames[i % sampleNames.length],
        city: sampleCities[i % sampleCities.length],
        valA: vA,
        valB: vB,
        result: { f: form }
      };
    });

    const colors = ['FF0F172A', 'FF0284C7', 'FF059669', 'FF7C3AED', 'FFD97706', 'FF0891B2', 'FF4F46E5', 'FFC026D3', 'FFDB2777', 'FFE11D48'];
    addStyledTopicSheet(sName, colors[idx % colors.length], cols, data);
  }

  const masterPath = path.join(excelFilesDir, '009_001_advanced_mathematical_arithmetic_and_aggregation_functions_master.xlsx');
  await wb.xlsx.writeFile(masterPath);
  console.log(`✓ Master module workbook successfully generated with 30 topic sheets at: ${masterPath}`);
}

buildMasterWorkbook().catch(err => {
  console.error("Failed to build workbook:", err);
  process.exit(1);
});
