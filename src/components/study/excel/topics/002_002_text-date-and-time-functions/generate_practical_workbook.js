// generate_practical_workbook.js
import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import topic0 from './topic0_files/topic0_practical_questions.js';
import topic1 from './topic1_files/topic1_practical_questions.js';
import topic2 from './topic2_files/topic2_practical_questions.js';
import topic3 from './topic3_files/topic3_practical_questions.js';
import topic4 from './topic4_files/topic4_practical_questions.js';
import topic5 from './topic5_files/topic5_practical_questions.js';
import topic6 from './topic6_files/topic6_practical_questions.js';
import topic8 from './topic8_files/topic8_practical_questions.js';
import topic9 from './topic9_files/topic9_practical_questions.js';
import topic10 from './topic10_files/topic10_practical_questions.js';
import topic11 from './topic11_files/topic11_practical_questions.js';
import topic12 from './topic12_files/topic12_practical_questions.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const excelFilesDir = path.join(__dirname, 'excel_files');
if (!fs.existsSync(excelFilesDir)) {
  fs.mkdirSync(excelFilesDir, { recursive: true });
}

// Find teacher photo
const candidatePhotoPaths = [
  path.resolve(__dirname, '../../../../../assets/image/sukantahui.jpg'),
  path.resolve(__dirname, '../../../../../../public/teachers/sukantahui.jpg'),
  'E:/react_routing_tailwind/src/assets/image/sukantahui.jpg',
  'E:/react_routing_tailwind/public/teachers/sukantahui.jpg'
];

let teacherPhotoPath = null;
for (const p of candidatePhotoPaths) {
  if (fs.existsSync(p)) {
    teacherPhotoPath = p;
    break;
  }
}

const topicsConfig = [
  { code: 'Topic 00', shortTitle: 'Text Clean & Case', sheetName: 'T00 - Text Clean & Case', headerColor: 'FF0F172A', questions: topic0 },
  { code: 'Topic 01', shortTitle: 'Substrings & Search', sheetName: 'T01 - Substrings & Search', headerColor: 'FF0F172A', questions: topic1 },
  { code: 'Topic 02', shortTitle: 'Concatenation & Join', sheetName: 'T02 - Concatenation & Join', headerColor: 'FF0F172A', questions: topic2 },
  { code: 'Topic 03', shortTitle: 'Replace & Substitution', sheetName: 'T03 - Replace & Substitution', headerColor: 'FF0F172A', questions: topic3 },
  { code: 'Topic 04', shortTitle: 'Number & Text Format', sheetName: 'T04 - Number & Text Format', headerColor: 'FF0F172A', questions: topic4 },
  { code: 'Topic 05', shortTitle: 'Core Date Operations', sheetName: 'T05 - Core Date Operations', headerColor: 'FF0F172A', questions: topic5 },
  { code: 'Topic 06', shortTitle: 'Temporal Shifts & EOM', sheetName: 'T06 - Temporal Shifts & EOM', headerColor: 'FF0F172A', questions: topic6 },
  { code: 'Topic 08', shortTitle: 'Modern Dynamic Text', sheetName: 'T08 - Modern Dynamic Text', headerColor: 'FF0F172A', questions: topic8 },
  { code: 'Topic 09', shortTitle: 'String Masking & Subs', sheetName: 'T09 - String Masking & Subs', headerColor: 'FF0F172A', questions: topic9 },
  { code: 'Topic 10', shortTitle: 'Text-to-Number Coercion', sheetName: 'T10 - Text-to-Number Coercion', headerColor: 'FF0F172A', questions: topic10 },
  { code: 'Topic 11', shortTitle: 'Industrial ETL Pipeline', sheetName: 'T11 - Industrial ETL Pipeline', headerColor: 'FF0F172A', questions: topic11 },
  { code: 'Topic 12', shortTitle: 'Shift Overtime Engine', sheetName: 'T12 - Shift Overtime Engine', headerColor: 'FF0F172A', questions: topic12 },
];

async function createPracticalWorkbook() {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Coder & AccoTax Centre of Excellence';
  wb.lastModifiedBy = 'Sukanta Hui';
  wb.created = new Date();
  wb.modified = new Date();

  // =========================================================================
  // 1. OVERVIEW & TABLE OF CONTENTS SHEET (LANDING SHEET)
  // =========================================================================
  const wsIndex = wb.addWorksheet('📋 Master Index & Lab Guide', {
    views: [{ showGridLines: true }],
    properties: { tabColor: { argb: 'FF0284C7' } }
  });

  // Top Organisation Brand Banner
  wsIndex.mergeCells('A1:F1');
  const orgTitleCell = wsIndex.getCell('A1');
  orgTitleCell.value = '🏢 CODER & ACCOTAX — CENTRE OF EXCELLENCE';
  orgTitleCell.font = { name: 'Segoe UI', size: 16, bold: true, color: { argb: 'FFFFFFFF' } };
  orgTitleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } };
  orgTitleCell.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
  wsIndex.getRow(1).height = 36;

  wsIndex.mergeCells('A2:F2');
  const orgSubCell = wsIndex.getCell('A2');
  orgSubCell.value = 'ISO 9001:2015 Certified Premier Training Institute • Advanced Excel, Analytics & Corporate Financial Modeling';
  orgSubCell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FF38BDF8' } };
  orgSubCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E293B' } };
  orgSubCell.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
  wsIndex.getRow(2).height = 22;

  wsIndex.mergeCells('A3:F3');
  const moduleBanner = wsIndex.getCell('A3');
  moduleBanner.value = '📊 Module 2.2: Text, Date & Time Functions — 120 Strictly Practical Questions Laboratory';
  moduleBanner.font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FFF59E0B' } };
  moduleBanner.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } };
  moduleBanner.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
  wsIndex.getRow(3).height = 24;

  // Space row
  wsIndex.getRow(4).height = 10;

  // =========================================================================
  // TEACHER & ORGANISATION PROFILE CARD (ROWS 5 to 13)
  // =========================================================================
  // Outer Box outline
  for (let r = 5; r <= 13; r++) {
    wsIndex.getRow(r).height = 21;
    for (let c = 1; c <= 6; c++) {
      const cell = wsIndex.getRow(r).getCell(c);
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF8FAFC' } };
      cell.border = {
        top: { style: r === 5 ? 'medium' : 'thin', color: { argb: r === 5 ? 'FF0284C7' : 'FFE2E8F0' } },
        bottom: { style: r === 13 ? 'medium' : 'thin', color: { argb: r === 13 ? 'FF0284C7' : 'FFE2E8F0' } },
        left: { style: c === 1 ? 'medium' : 'thin', color: { argb: c === 1 ? 'FF0284C7' : 'FFE2E8F0' } },
        right: { style: c === 6 ? 'medium' : 'thin', color: { argb: c === 6 ? 'FF0284C7' : 'FFE2E8F0' } },
      };
    }
  }

  // Embed Teacher Picture in Column A-B (Rows 5 to 13)
  if (teacherPhotoPath) {
    try {
      const imageId = wb.addImage({
        filename: teacherPhotoPath,
        extension: 'jpeg',
      });
      wsIndex.addImage(imageId, {
        tl: { col: 0.15, row: 4.15 },
        ext: { width: 145, height: 180 },
        editAs: 'oneCell'
      });
    } catch (e) {
      console.warn('Could not embed image:', e.message);
    }
  }

  // Teacher details (Columns C to F)
  const teacherRows = [
    { row: 5, label: '👨‍🏫 Lead Instructor & Mentor:', value: 'Sukanta Hui' },
    { row: 6, label: '💼 Professional Designation:', value: 'Senior Technology Educator & Corporate Financial Modeling Trainer' },
    { row: 7, label: '⏳ Experience & Track Record:', value: '28+ Years Industry & Academic Excellence (Mentoring Since 1998)' },
    { row: 8, label: '🏛️ Parent Organization:', value: 'Founder & Director, Coder & AccoTax Centre of Excellence' },
    { row: 9, label: '📍 Campus Location:', value: '25(10/A) Shibtala Road, PO – N. C. Pukur, Barrackpore, Kolkata - 700122' },
    { row: 10, label: '📞 Direct Contact / WhatsApp:', value: '+91 7003756860 / +91 9432456083' },
    { row: 11, label: '✉️ Official Support Email:', value: 'contact@codernaccotax.co.in' },
    { row: 12, label: '🐙 Official GitHub Profile:', value: 'https://github.com/sukantahui' },
    { row: 13, label: '🌐 Institutional Portal:', value: 'https://www.codernaccotax.co.in' },
  ];

  teacherRows.forEach(({ row, label, value }) => {
    const lblCell = wsIndex.getCell(`C${row}`);
    lblCell.value = label;
    lblCell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FF0F172A' } };
    lblCell.alignment = { vertical: 'middle', horizontal: 'left' };

    wsIndex.mergeCells(`D${row}:F${row}`);
    const valCell = wsIndex.getCell(`D${row}`);
    valCell.value = value;
    valCell.font = { name: 'Segoe UI', size: 9.5, color: { argb: 'FF0369A1' }, bold: row === 5 };
    valCell.alignment = { vertical: 'middle', horizontal: 'left' };
  });

  // Space row
  wsIndex.getRow(14).height = 12;

  // =========================================================================
  // HOW TO USE THIS PRACTICE WORKBOOK CARD (ROWS 15 to 21)
  // =========================================================================
  wsIndex.mergeCells('A15:F15');
  const instH = wsIndex.getCell('A15');
  instH.value = '📌 HOW TO USE THIS WORKBOOK FOR HANDS-ON EXCEL MASTERY:';
  instH.font = { name: 'Segoe UI', size: 10.5, bold: true, color: { argb: 'FFFFFFFF' } };
  instH.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } };
  instH.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
  wsIndex.getRow(15).height = 24;

  const instructions = [
    '1. Navigate to any topic worksheet using the interactive hyperlinks in the Table of Contents below.',
    '2. Carefully read the Business Scenario, Input Cell data, and Target Output requirements for each question.',
    '3. Write and test your own live formulas in Column H (highlighted in light yellow with dashed borders).',
    '4. Compare your formula results with the Model Solution Formula (Column I) and verified Evaluated Output (Column J).',
    '5. Review the Step-by-Step Logic and Enterprise Best Practices (Column L) to solidify industrial modeling proficiency.',
    '6. All 12 topics include 10 real-world corporate challenges ranging from basic hygiene to advanced dynamic array architectures.'
  ];

  instructions.forEach((text, i) => {
    const row = 16 + i;
    wsIndex.mergeCells(`A${row}:F${row}`);
    const c = wsIndex.getCell(`A${row}`);
    c.value = text;
    c.font = { name: 'Segoe UI', size: 9.5, color: { argb: 'FF334155' } };
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: i % 2 === 0 ? 'FFF1F5F9' : 'FFFFFFFF' } };
    c.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
    wsIndex.getRow(row).height = 20;
    for (let col = 1; col <= 6; col++) {
      wsIndex.getRow(row).getCell(col).border = {
        top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        right: { style: 'thin', color: { argb: 'FFE2E8F0' } },
      };
    }
  });

  // Space row
  wsIndex.getRow(22).height = 14;

  // =========================================================================
  // TABLE OF CONTENTS (ROWS 23 onwards)
  // =========================================================================
  const tocRow = 23;
  const headers = ['Topic Code', 'Topic Focus & Practical Domain', 'Sheet Navigation Link', 'Scenarios Count', 'Difficulty Tier', 'Status'];
  headers.forEach((h, idx) => {
    const cell = wsIndex.getRow(tocRow).getCell(idx + 1);
    cell.value = h;
    cell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0284C7' } };
    cell.alignment = { vertical: 'middle', horizontal: idx === 1 ? 'left' : 'center' };
    cell.border = {
      top: { style: 'medium', color: { argb: 'FF0369A1' } },
      bottom: { style: 'medium', color: { argb: 'FF0369A1' } },
      left: { style: 'thin', color: { argb: 'FFBAE6FD' } },
      right: { style: 'thin', color: { argb: 'FFBAE6FD' } }
    };
  });
  wsIndex.getRow(tocRow).height = 26;

  topicsConfig.forEach((cfg, idx) => {
    const rNum = 24 + idx;
    const r = wsIndex.getRow(rNum);
    r.height = 22;

    r.getCell(1).value = cfg.code;
    r.getCell(1).alignment = { vertical: 'middle', horizontal: 'center' };
    r.getCell(1).font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FF0F172A' } };

    r.getCell(2).value = cfg.shortTitle;
    r.getCell(2).alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
    r.getCell(2).font = { name: 'Segoe UI', size: 9.5, color: { argb: 'FF1E293B' } };

    const navCell = r.getCell(3);
    navCell.value = { text: `👉 Open ${cfg.sheetName}`, hyperlink: `#'${cfg.sheetName}'!A1` };
    navCell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FF0284C7' }, underline: true };
    navCell.alignment = { vertical: 'middle', horizontal: 'center' };

    r.getCell(4).value = `${cfg.questions.length} Practical Qs`;
    r.getCell(4).alignment = { vertical: 'middle', horizontal: 'center' };
    r.getCell(4).font = { name: 'Segoe UI', size: 9.5, color: { argb: 'FF059669' }, bold: true };

    r.getCell(5).value = 'Basic → Advanced';
    r.getCell(5).alignment = { vertical: 'middle', horizontal: 'center' };
    r.getCell(5).font = { name: 'Segoe UI', size: 9.5, color: { argb: 'FF64748B' } };

    r.getCell(6).value = '✓ Ready to Practice';
    r.getCell(6).alignment = { vertical: 'middle', horizontal: 'center' };
    r.getCell(6).font = { name: 'Segoe UI', size: 9.5, color: { argb: 'FF0D9488' }, bold: true };

    for (let c = 1; c <= 6; c++) {
      const cell = r.getCell(c);
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: idx % 2 === 0 ? 'FFF8FAFC' : 'FFFFFFFF' }
      };
      cell.border = {
        top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        right: { style: 'thin', color: { argb: 'FFE2E8F0' } }
      };
    }
  });

  wsIndex.columns = [
    { width: 14 },
    { width: 34 },
    { width: 30 },
    { width: 18 },
    { width: 20 },
    { width: 22 },
  ];

  // =========================================================================
  // 2. CREATE DEDICATED WORKSHEET FOR EACH TOPIC
  // =========================================================================
  topicsConfig.forEach((cfg) => {
    const ws = wb.addWorksheet(cfg.sheetName, {
      views: [{ showGridLines: true }],
      properties: { tabColor: { argb: 'FF059669' } }
    });

    // Sheet Header Banner
    ws.mergeCells('A1:L1');
    const h1 = ws.getCell('A1');
    h1.value = `⚡ ${cfg.code}: ${cfg.shortTitle} — 10 Strictly Practical Enterprise Questions`;
    h1.font = { name: 'Segoe UI', size: 13, bold: true, color: { argb: 'FFFFFFFF' } };
    h1.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } };
    h1.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
    ws.getRow(1).height = 36;

    // Sub-header with Return Link
    ws.mergeCells('A2:J2');
    const h2 = ws.getCell('A2');
    h2.value = 'Interactive Practice Grid • Type your formula in Column H • Solutions and step-by-step logic in Columns I-L';
    h2.font = { name: 'Segoe UI', size: 9.5, italic: true, color: { argb: 'FF94A3B8' } };
    h2.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E293B' } };
    h2.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };

    ws.mergeCells('K2:L2');
    const backCell = ws.getCell('K2');
    backCell.value = { text: '🔙 Return to Master Index', hyperlink: "#'📋 Master Index & Lab Guide'!A1" };
    backCell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FF38BDF8' }, underline: true };
    backCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E293B' } };
    backCell.alignment = { vertical: 'middle', horizontal: 'center' };
    ws.getRow(2).height = 24;

    // Table Header
    const colHeaders = [
      'Q#',
      'Challenge / Question Title',
      'Function',
      'Category',
      'Difficulty',
      'Business Scenario Description',
      'Input Cell Reference',
      'Target',
      'Your Practice Formula (Enter Here)',
      'Model Solution Formula',
      'Evaluated Output',
      'Step-by-Step Logic & Pro Tip'
    ];

    const thRow = 4;
    colHeaders.forEach((th, idx) => {
      const cell = ws.getRow(thRow).getCell(idx + 1);
      cell.value = th;
      cell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FFFFFFFF' } };
      
      // Highlight Practice Formula Header specially
      if (idx === 8) {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD97706' } }; // Amber highlight
      } else if (idx === 9) {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0284C7' } }; // Sky highlight
      } else {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E293B' } };
      }

      cell.alignment = {
        vertical: 'middle',
        horizontal: (idx === 0 || idx === 4 || idx === 7) ? 'center' : 'left',
        wrapText: true
      };
      cell.border = {
        top: { style: 'medium', color: { argb: 'FF0F172A' } },
        bottom: { style: 'medium', color: { argb: 'FF0F172A' } },
        left: { style: 'thin', color: { argb: 'FF475569' } },
        right: { style: 'thin', color: { argb: 'FF475569' } }
      };
    });
    ws.getRow(thRow).height = 32;

    // Question Rows
    cfg.questions.forEach((q, qIdx) => {
      const rowNum = 5 + qIdx;
      const r = ws.getRow(rowNum);
      r.height = 45;

      r.getCell(1).value = `Q${q.id}`;
      r.getCell(1).alignment = { vertical: 'middle', horizontal: 'center' };
      r.getCell(1).font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FF0F172A' } };

      r.getCell(2).value = q.title;
      r.getCell(2).alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };
      r.getCell(2).font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FF0F172A' } };

      r.getCell(3).value = q.functionUsed;
      r.getCell(3).alignment = { vertical: 'middle', horizontal: 'left' };
      r.getCell(3).font = { name: 'Segoe UI', size: 9, color: { argb: 'FF0369A1' }, bold: true };

      r.getCell(4).value = q.category;
      r.getCell(4).alignment = { vertical: 'middle', horizontal: 'left' };
      r.getCell(4).font = { name: 'Segoe UI', size: 9, color: { argb: 'FF475569' } };

      r.getCell(5).value = q.difficulty;
      r.getCell(5).alignment = { vertical: 'middle', horizontal: 'center' };
      const diffColor = q.difficulty === 'Basic' ? 'FF059669' : q.difficulty === 'Intermediate' ? 'FFD97706' : 'FFE11D48';
      r.getCell(5).font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: diffColor } };

      r.getCell(6).value = q.scenario;
      r.getCell(6).alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };
      r.getCell(6).font = { name: 'Segoe UI', size: 9, color: { argb: 'FF334155' } };

      r.getCell(7).value = q.inputCell;
      r.getCell(7).alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };
      r.getCell(7).font = { name: 'Consolas', size: 9, color: { argb: 'FF7C2D12' } };

      r.getCell(8).value = q.targetCell;
      r.getCell(8).alignment = { vertical: 'middle', horizontal: 'center' };
      r.getCell(8).font = { name: 'Consolas', size: 9.5, bold: true, color: { argb: 'FF0F172A' } };

      // Column 9 (H): Practice Cell
      const practiceCell = r.getCell(9);
      practiceCell.value = ''; // Empty for learner input
      practiceCell.alignment = { vertical: 'middle', horizontal: 'left' };
      practiceCell.font = { name: 'Consolas', size: 9.5, color: { argb: 'FF0F172A' } };
      practiceCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFEF3C7' } }; // Light amber practice fill
      practiceCell.border = {
        top: { style: 'dashed', color: { argb: 'FFD97706' } },
        bottom: { style: 'dashed', color: { argb: 'FFD97706' } },
        left: { style: 'medium', color: { argb: 'FFD97706' } },
        right: { style: 'medium', color: { argb: 'FFD97706' } }
      };

      // Column 10 (I): Model Solution Formula
      const solCell = r.getCell(10);
      solCell.value = q.formula;
      solCell.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };
      solCell.font = { name: 'Consolas', size: 9.5, bold: true, color: { argb: 'FF0369A1' } };
      solCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF0F9FF' } }; // Light sky

      // Column 11 (J): Evaluated Output
      const outCell = r.getCell(11);
      outCell.value = `${q.evaluatedOutput} (${q.outputType})`;
      outCell.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };
      outCell.font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: 'FF0F172A' } };

      // Column 12 (K): Logic & Pro Tip
      const logicText = `Logic: ${q.stepByStepLogic.join(' ')}\n\n💡 Pro-Tip: ${q.proTip || 'N/A'}`;
      const logicCell = r.getCell(12);
      logicCell.value = logicText;
      logicCell.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };
      logicCell.font = { name: 'Segoe UI', size: 8.5, color: { argb: 'FF475569' } };

      // Borders for standard cells
      [1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12].forEach((cIdx) => {
        const cell = r.getCell(cIdx);
        if (cIdx !== 10) {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: qIdx % 2 === 0 ? 'FFF8FAFC' : 'FFFFFFFF' }
          };
        }
        cell.border = {
          top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
          bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
          left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
          right: { style: 'thin', color: { argb: 'FFE2E8F0' } }
        };
      });
    });

    ws.columns = [
      { width: 7 },   // Q#
      { width: 28 },  // Title
      { width: 22 },  // Function
      { width: 20 },  // Category
      { width: 14 },  // Difficulty
      { width: 38 },  // Scenario
      { width: 24 },  // Input
      { width: 10 },  // Target
      { width: 34 },  // Your Practice Formula
      { width: 34 },  // Solution Formula
      { width: 26 },  // Evaluated Output
      { width: 48 },  // Step-by-Step Logic
    ];
  });

  const masterPath = path.join(excelFilesDir, '002_002_text_date_and_time_functions_master.xlsx');
  const practicePath = path.join(excelFilesDir, '002_002_practical_questions_practice.xlsx');
  const legacyPath = path.join(excelFilesDir, 'text_date_and_time_functions_master.xlsx');

  await wb.xlsx.writeFile(practicePath);
  await wb.xlsx.writeFile(masterPath);
  fs.copyFileSync(masterPath, legacyPath);

  console.log('✓ Successfully generated practice workbook with teacher details & embedded photo:');
  console.log(`  -> ${practicePath}`);
  console.log(`  -> ${masterPath}`);
}

createPracticalWorkbook().catch(console.error);
