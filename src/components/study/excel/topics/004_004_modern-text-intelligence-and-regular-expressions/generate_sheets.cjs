const ExcelJS = require('E:/react_routing_tailwind/node_modules/exceljs');
const fs = require('fs');
const path = require('path');

async function buildMasterWorkbook() {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Coder & AccoTax';
  wb.lastModifiedBy = 'Sukanta Hui';
  wb.created = new Date();
  wb.modified = new Date();

  // Overview Sheet
  const wsOverview = wb.addWorksheet('Overview', { views: [{ showGridLines: true }] });
  wsOverview.columns = [{ width: 22 }, { width: 26 }, { width: 28 }, { width: 32 }, { width: 26 }, { width: 36 }];

  const logoPath = path.resolve(__dirname, '../../assets/cnat.png');
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
  bSub2.value = 'EXCEL MASTERCLASS: Modern Text Intelligence & Regular Expressions\nCurriculum Code: EXCEL-PRO-404 | Student Practice Workbook';
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

  await wsOverview.protect('sukantahui', { selectLockedCells: true, selectUnlockedCells: true });

  // Add Practice Sheets
  [{"name":"Topic0_Regex_Overview"},{"name":"Topic1_REGEXTEST"},{"name":"Topic2_REGEXEXTRACT"},{"name":"Topic3_REGEXREPLACE"}].forEach((sh, idx) => {
    const ws = wb.addWorksheet(sh.name, { views: [{ showGridLines: true }] });
    ws.columns = [
      { header: 'Record_ID', key: 'id', width: 16 },
      { header: 'Candidate_Name', key: 'name', width: 22 },
      { header: 'Location', key: 'loc', width: 20 },
      { header: 'Primary_Metric', key: 'm1', width: 22 },
      { header: 'Evaluated_Result', key: 'res', width: 26 }
    ];
    ws.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    ws.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } };
    
    const students = ['Swadeep', 'Tuhina', 'Abhronila', 'Susmita', 'Debangshu', 'Rahul', 'Priya', 'Aniket'];
    for (let i = 1; i <= 35; i++) {
      ws.addRow([`REC-${1000+i}`, students[(i-1)%students.length], 'Barrackpore', 45000 + i*1200, 'VERIFIED']);
    }
  });

  const out = path.join(__dirname, 'excel_files/regex_master.xlsx');
  await wb.xlsx.writeFile(out);
  console.log('✓ Generated regex_master.xlsx');
}

buildMasterWorkbook().catch(console.error);
