const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

const moduleDir = __dirname;
const excelFilesDir = path.join(moduleDir, 'excel_files');
if (!fs.existsSync(excelFilesDir)) fs.mkdirSync(excelFilesDir, { recursive: true });

const samplePeople = [
  { name: 'Swadeep Hui', city: 'Barrackpore', dept: 'Software Eng' },
  { name: 'Tuhina Das', city: 'Shyamnagar', dept: 'Financial Modeling' },
  { name: 'Susmita Sen', city: 'Naihati', dept: 'HR & Operations' },
  { name: 'Debangshu Roy', city: 'Ichapur', dept: 'Data Science' },
  { name: 'Susmita Roy', city: 'Titagarh', dept: 'Taxation & Audit' },
  { name: 'Abhronila Ray', city: 'Barrackpore', dept: 'Payroll & Compliance' },
  { name: 'Rahul Kumar', city: 'Kolkata', dept: 'Cyber Security' },
  { name: 'Priya Sharma', city: 'Howrah', dept: 'Accounts & ERP' },
  { name: 'Aniket Verma', city: 'Hooghly', dept: 'Database Systems' },
  { name: 'Sneha Ghosh', city: 'Sodepur', dept: 'Quality Assurance' },
  { name: 'Arpan Dey', city: 'Kanchrapara', dept: 'Cloud Architecture' },
  { name: 'Subhajit Pal', city: 'Naihati', dept: 'Enterprise Systems' }
];

const colLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'];

async function buildMasterWorkbook() {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Coder & AccoTax';
  wb.lastModifiedBy = 'Sukanta Hui';
  wb.created = new Date();
  wb.modified = new Date();

  // ---------------------------------------------------------------------------
  // 1. SHEET 1: OVERVIEW DIRECTORY
  // ---------------------------------------------------------------------------
  const wsOverview = wb.addWorksheet('Overview', { views: [{ showGridLines: true }] });
  wsOverview.columns = [
    { width: 14 }, // A
    { width: 28 }, // B
    { width: 44 }, // C
    { width: 32 }, // D
    { width: 24 }  // E
  ];

  wsOverview.mergeCells('A1:E2');
  const banner = wsOverview.getCell('A1');
  banner.value = 'CODER & ACCOTAX — CENTRE OF EXCELLENCE';
  banner.font = { name: 'Segoe UI', size: 16, bold: true, color: { argb: 'FFFFFFFF' } };
  banner.alignment = { vertical: 'middle', horizontal: 'center' };
  banner.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } };

  wsOverview.mergeCells('A3:E3');
  const subBanner = wsOverview.getCell('A3');
  subBanner.value = 'Module 009_006: Complete Date, Time & Calendar Engineering Functions — Sukanta Hui';
  subBanner.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FF38BDF8' } };
  subBanner.alignment = { vertical: 'middle', horizontal: 'center' };
  subBanner.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E293B' } };

  wsOverview.getRow(5).values = ['Topic #', 'Topic Title', 'Key Formula Pattern', 'Core Domain', 'Practice Sheet Link'];
  wsOverview.getRow(5).height = 24;
  wsOverview.getRow(5).eachCell(c => {
    c.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 10 };
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4338CA' } };
    c.alignment = { vertical: 'middle', horizontal: 'center' };
  });

  function addTopicSheet(sheetName, titleText, columns, rowsData) {
    const ws = wb.addWorksheet(sheetName, { views: [{ showGridLines: true }] });
    ws.columns = columns;

    // Row 1: Back link
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
    ws.getRow(1).height = 22;

    // Row 2: Title Banner
    ws.mergeCells(`A2:${colLetters[columns.length - 1]}2`);
    const titleCell = ws.getCell('A2');
    titleCell.value = titleText;
    titleCell.font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FFFFFFFF' } };
    titleCell.alignment = { vertical: 'middle', indent: 1 };
    titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E1B4B' } };
    ws.getRow(2).height = 26;

    // Row 3: Table Headers
    const hRow = ws.getRow(3);
    hRow.height = 24;
    columns.forEach((col, idx) => {
      const cell = ws.getCell(`${colLetters[idx]}3`);
      cell.value = col.header;
      cell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFFFF' } };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4338CA' } };
      cell.alignment = { vertical: 'middle', horizontal: col.align || 'left', indent: col.align === 'center' ? 0 : 1 };
    });

    // Row 4+: Data Rows
    rowsData.forEach((rowObj, rIdx) => {
      const rowNum = rIdx + 4;
      const row = ws.getRow(rowNum);
      row.height = 20;
      const isEven = rIdx % 2 === 0;
      const bg = isEven ? 'FFFFFFFF' : 'FFF8FAFC';

      columns.forEach((col, cIdx) => {
        const cell = ws.getCell(`${colLetters[cIdx]}${rowNum}`);
        const cellVal = rowObj[col.key];

        if (cellVal && typeof cellVal === 'object' && cellVal.formula) {
          cell.value = {
            formula: cellVal.formula,
            result: cellVal.result
          };
          cell.font = { name: 'Consolas', size: 9.5, color: { argb: 'FF1E293B' }, bold: true };
        } else {
          cell.value = cellVal !== undefined ? cellVal : '';
          cell.font = { name: col.font || 'Segoe UI', size: 9.5, color: { argb: 'FF1E293B' } };
        }

        cell.alignment = { vertical: 'middle', horizontal: col.align || 'left', indent: col.align === 'center' ? 0 : 1 };
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

  // ---------------------------------------------------------------------------
  // GENERATE ALL 28 TOPIC WORKSHEETS
  // ---------------------------------------------------------------------------

  // Topic 0: NOW
  addTopicSheet('Topic0', 'TOPIC 0: NOW FUNCTION — LIVE SYSTEM TIMESTAMP & SLA DRIFT BENCH', [
    { header: 'Event ID', key: 'id', width: 14, align: 'center' },
    { header: 'Operator', key: 'name', width: 20 },
    { header: 'Server Node', key: 'city', width: 16 },
    { header: 'Logged Event', key: 'event', width: 22 },
    { header: 'Base Timestamp', key: 'baseTime', width: 20, align: 'center' },
    { header: 'Live Formula', key: 'formulaCell', width: 22, align: 'center' },
    { header: 'Evaluated Time String', key: 'valStr', width: 22, align: 'center' }
  ], samplePeople.map((p, i) => ({
    id: `EVT-${2000 + i}`,
    name: p.name,
    city: p.city,
    event: i % 2 === 0 ? 'Batch Processing' : 'API Heartbeat',
    baseTime: '2026-11-12 09:00:00',
    formulaCell: { formula: 'NOW()', result: '2026-11-12 17:30:00' },
    valStr: '12-Nov-2026 05:30 PM'
  })));

  // Topic 1: DATE
  addTopicSheet('Topic1', 'TOPIC 1: DATE FUNCTION — LOCALE-SAFE COMPONENT ASSEMBLY', [
    { header: 'Emp ID', key: 'id', width: 14, align: 'center' },
    { header: 'Employee Name', key: 'name', width: 20 },
    { header: 'Birth Year', key: 'y', width: 14, align: 'center' },
    { header: 'Birth Month', key: 'm', width: 14, align: 'center' },
    { header: 'Birth Day', key: 'd', width: 14, align: 'center' },
    { header: 'Constructed Date Formula', key: 'f', width: 26, align: 'center' },
    { header: 'Computed Date String', key: 'res', width: 22, align: 'center' }
  ], samplePeople.map((p, i) => {
    const r = i + 4;
    const y = 1990 + (i % 12);
    const m = (i % 12) + 1;
    const d = 10 + (i % 18);
    return {
      id: `CNAT-${100 + i}`,
      name: p.name,
      y, m, d,
      f: { formula: `DATE(C${r}, D${r}, E${r})`, result: `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}` },
      res: `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    };
  }));

  // Topic 2: DATEVALUE
  addTopicSheet('Topic2', 'TOPIC 2: DATEVALUE FUNCTION — TEXT-TO-DATE CONVERSION SANITIZATION', [
    { header: 'Batch ID', key: 'id', width: 14, align: 'center' },
    { header: 'Vendor Name', key: 'name', width: 20 },
    { header: 'Raw Text Date', key: 'raw', width: 22, align: 'center' },
    { header: 'DATEVALUE Formula', key: 'f', width: 26, align: 'center' },
    { header: 'Clean Serial Number', key: 'serial', width: 20, align: 'center' },
    { header: 'Formatted Date', key: 'fmt', width: 20, align: 'center' }
  ], samplePeople.map((p, i) => {
    const r = i + 4;
    const dates = ['2026-01-15', '2026-03-22', '2026-05-18', '2026-07-04', '2026-09-12', '2026-11-28', '2026-02-14', '2026-04-30', '2026-06-25', '2026-08-19', '2026-10-10', '2026-12-05'];
    const dt = dates[i % dates.length];
    return {
      id: `TXT-${400 + i}`,
      name: p.name,
      raw: dt,
      f: { formula: `DATEVALUE(C${r})`, result: 46000 + i * 30 },
      serial: 46000 + i * 30,
      fmt: dt
    };
  }));

  // Topic 3: TIME
  addTopicSheet('Topic3', 'TOPIC 3: TIME FUNCTION — 24-HOUR FRACTIONAL TIME ASSEMBLY', [
    { header: 'Shift ID', key: 'id', width: 14, align: 'center' },
    { header: 'Operator', key: 'name', width: 20 },
    { header: 'Hour', key: 'h', width: 12, align: 'center' },
    { header: 'Minute', key: 'm', width: 12, align: 'center' },
    { header: 'Second', key: 's', width: 12, align: 'center' },
    { header: 'TIME Formula', key: 'f', width: 24, align: 'center' },
    { header: 'Formatted Time', key: 'res', width: 20, align: 'center' }
  ], samplePeople.map((p, i) => {
    const r = i + 4;
    const h = 8 + (i % 12);
    const m = (i * 5) % 60;
    const s = 0;
    return {
      id: `SHF-${300 + i}`,
      name: p.name,
      h, m, s,
      f: { formula: `TIME(C${r}, D${r}, E${r})`, result: (h/24 + m/1440).toFixed(4) },
      res: `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:00`
    };
  }));

  // Topic 4: TIMEVALUE
  addTopicSheet('Topic4', 'TOPIC 4: TIMEVALUE FUNCTION — TEXT-TO-TIME SERIAL CONVERSION', [
    { header: 'Punch ID', key: 'id', width: 14, align: 'center' },
    { header: 'Staff Name', key: 'name', width: 20 },
    { header: 'Raw Clock Text', key: 'raw', width: 20, align: 'center' },
    { header: 'TIMEVALUE Formula', key: 'f', width: 26, align: 'center' },
    { header: 'Decimal Day Fraction', key: 'dec', width: 22, align: 'center' },
    { header: 'Compliance Gate', key: 'status', width: 20, align: 'center' }
  ], samplePeople.map((p, i) => {
    const r = i + 4;
    const rawTimes = ['08:45 AM', '09:02 AM', '09:14 AM', '09:28 AM', '08:50 AM', '09:05 AM', '08:30 AM', '09:35 AM', '08:55 AM', '09:10 AM', '09:18 AM', '08:40 AM'];
    const tStr = rawTimes[i % rawTimes.length];
    const isLate = tStr.includes('09:18') || tStr.includes('09:28') || tStr.includes('09:35');
    return {
      id: `BIO-${500 + i}`,
      name: p.name,
      raw: tStr,
      f: { formula: `TIMEVALUE(C${r})`, result: 0.36 + i * 0.01 },
      dec: (0.36 + i * 0.01).toFixed(4),
      status: isLate ? 'Late Arrival' : 'On Time'
    };
  }));

  // Topic 5: DAY, MONTH, YEAR
  addTopicSheet('Topic5', 'TOPIC 5: DAY, MONTH & YEAR FUNCTIONS — DATE DECOMPOSITION', [
    { header: 'Policy ID', key: 'id', width: 14, align: 'center' },
    { header: 'Client Name', key: 'name', width: 20 },
    { header: 'Policy Date', key: 'dt', width: 18, align: 'center' },
    { header: '=DAY(C#)', key: 'fDay', width: 14, align: 'center' },
    { header: '=MONTH(C#)', key: 'fMo', width: 14, align: 'center' },
    { header: '=YEAR(C#)', key: 'fYr', width: 16, align: 'center' },
    { header: 'Fiscal Qtr', key: 'qtr', width: 14, align: 'center' }
  ], samplePeople.map((p, i) => {
    const r = i + 4;
    const yr = 2020 + (i % 6);
    const mo = (i % 12) + 1;
    const dy = 5 + (i * 2);
    const dtStr = `${yr}-${String(mo).padStart(2, '0')}-${String(dy).padStart(2, '0')}`;
    return {
      id: `POL-${700 + i}`,
      name: p.name,
      dt: dtStr,
      fDay: { formula: `DAY(C${r})`, result: dy },
      fMo: { formula: `MONTH(C${r})`, result: mo },
      fYr: { formula: `YEAR(C${r})`, result: yr },
      qtr: `Q${Math.ceil(mo / 3)}`
    };
  }));

  // Topic 6: HOUR, MINUTE, SECOND
  addTopicSheet('Topic6', 'TOPIC 6: HOUR, MINUTE & SECOND FUNCTIONS — TIME BINNING', [
    { header: 'Call ID', key: 'id', width: 14, align: 'center' },
    { header: 'Customer Agent', key: 'name', width: 20 },
    { header: 'Call Timestamp', key: 'ts', width: 20, align: 'center' },
    { header: '=HOUR(C#)', key: 'fH', width: 14, align: 'center' },
    { header: '=MINUTE(C#)', key: 'fM', width: 14, align: 'center' },
    { header: '=SECOND(C#)', key: 'fS', width: 14, align: 'center' },
    { header: 'Shift Block', key: 'blk', width: 16, align: 'center' }
  ], samplePeople.map((p, i) => {
    const r = i + 4;
    const h = 9 + (i % 10);
    const m = (i * 7) % 60;
    const s = (i * 13) % 60;
    return {
      id: `CALL-${800 + i}`,
      name: p.name,
      ts: `2026-11-12 ${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`,
      fH: { formula: `HOUR(C${r})`, result: h },
      fM: { formula: `MINUTE(C${r})`, result: m },
      fS: { formula: `SECOND(C${r})`, result: s },
      blk: h < 13 ? 'Morning Shift' : 'Afternoon Shift'
    };
  }));

  // Topic 7: DAYS
  addTopicSheet('Topic7', 'TOPIC 7: DAYS FUNCTION — SIGNED DATE DIFFERENCE ANALYSIS', [
    { header: 'Invoice #', key: 'id', width: 14, align: 'center' },
    { header: 'Debtor Name', key: 'name', width: 20 },
    { header: 'Billing Date (Start)', key: 'sDt', width: 18, align: 'center' },
    { header: 'Payment Date (End)', key: 'eDt', width: 18, align: 'center' },
    { header: '=DAYS(End, Start)', key: 'fDays', width: 22, align: 'center' },
    { header: 'Payment Term Category', key: 'cat', width: 22, align: 'center' }
  ], samplePeople.map((p, i) => {
    const r = i + 4;
    const s = '2026-10-01';
    const dayDelta = 15 + i * 5;
    const e = `2026-10-${String(Math.min(dayDelta, 31)).padStart(2, '0')}`;
    return {
      id: `INV-${900 + i}`,
      name: p.name,
      sDt: s,
      eDt: e,
      fDays: { formula: `DAYS(D${r}, C${r})`, result: dayDelta },
      cat: dayDelta <= 30 ? 'Within 30-Day Term' : 'Overdue Aging'
    };
  }));

  // Topic 8: DAYS360
  addTopicSheet('Topic8', 'TOPIC 8: DAYS360 FUNCTION — COMMERCIAL 360-DAY BOND CONVENTION', [
    { header: 'Bond ID', key: 'id', width: 14, align: 'center' },
    { header: 'Issuing Bank', key: 'name', width: 20 },
    { header: 'Settlement Date', key: 'sDt', width: 18, align: 'center' },
    { header: 'Next Coupon Date', key: 'eDt', width: 18, align: 'center' },
    { header: '=DAYS360(Start, End)', key: 'f360', width: 24, align: 'center' },
    { header: 'Actual Calendar Days', key: 'act', width: 20, align: 'center' }
  ], samplePeople.map((p, i) => {
    const r = i + 4;
    const s = '2026-01-01';
    const e = '2026-03-31';
    return {
      id: `BND-${1000 + i}`,
      name: p.name,
      sDt: s,
      eDt: e,
      f360: { formula: `DAYS360(C${r}, D${r})`, result: 90 },
      act: 89
    };
  }));

  // Topic 9: EDATE
  addTopicSheet('Topic9', 'TOPIC 9: EDATE FUNCTION — ACCURATE MONTH-OFFSET CALCULATIONS', [
    { header: 'Account #', key: 'id', width: 14, align: 'center' },
    { header: 'Account Holder', key: 'name', width: 20 },
    { header: 'Deposit Start Date', key: 'sDt', width: 18, align: 'center' },
    { header: 'Term (Months)', key: 'term', width: 14, align: 'center' },
    { header: '=EDATE(Start, Months)', key: 'fEdate', width: 24, align: 'center' },
    { header: 'Maturity Milestone', key: 'res', width: 20, align: 'center' }
  ], samplePeople.map((p, i) => {
    const r = i + 4;
    const term = (i + 1) * 6;
    return {
      id: `FD-${1100 + i}`,
      name: p.name,
      sDt: '2026-04-15',
      term,
      fEdate: { formula: `EDATE(C${r}, D${r})`, result: `202${6 + Math.floor(term/12)}-10-15` },
      res: `202${6 + Math.floor(term/12)}-10-15`
    };
  }));

  // Topic 10: EOMONTH
  addTopicSheet('Topic10', 'TOPIC 10: EOMONTH FUNCTION — MONTH-END FINANCIAL CUTOFFS', [
    { header: 'Batch #', key: 'id', width: 14, align: 'center' },
    { header: 'Ledger Entity', key: 'name', width: 20 },
    { header: 'Posting Date', key: 'pDt', width: 18, align: 'center' },
    { header: 'Offset Mo', key: 'offset', width: 12, align: 'center' },
    { header: '=EOMONTH(Date, 0)', key: 'fEo', width: 22, align: 'center' },
    { header: 'Next Month 1st', key: 'fNext', width: 22, align: 'center' }
  ], samplePeople.map((p, i) => {
    const r = i + 4;
    const ends = ['2026-01-31', '2026-02-28', '2026-03-31', '2026-04-30', '2026-05-31', '2026-06-30', '2026-07-31', '2026-08-31', '2026-09-30', '2026-10-31', '2026-11-30', '2026-12-31'];
    return {
      id: `ACC-${1200 + i}`,
      name: p.name,
      pDt: `2026-${String((i % 12)+1).padStart(2, '0')}-14`,
      offset: 0,
      fEo: { formula: `EOMONTH(C${r}, 0)`, result: ends[i % 12] },
      fNext: { formula: `EOMONTH(C${r}, 0) + 1`, result: `2026-${String(((i % 12)+2)).padStart(2, '0')}-01` }
    };
  }));

  // Topic 11: WEEKDAY
  addTopicSheet('Topic11', 'TOPIC 11: WEEKDAY FUNCTION — DAY OF WEEK & WEEKEND DETECTION', [
    { header: 'Roster ID', key: 'id', width: 14, align: 'center' },
    { header: 'Staff Member', key: 'name', width: 20 },
    { header: 'Shift Date', key: 'dt', width: 18, align: 'center' },
    { header: '=WEEKDAY(C#, 2)', key: 'fWk', width: 18, align: 'center' },
    { header: 'Day Name Text', key: 'dayName', width: 16, align: 'center' },
    { header: 'Weekend Flag', key: 'isWknd', width: 18, align: 'center' }
  ], samplePeople.map((p, i) => {
    const r = i + 4;
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const dIdx = (i % 7) + 1;
    return {
      id: `RST-${1300 + i}`,
      name: p.name,
      dt: `2026-11-${String(9 + i).padStart(2, '0')}`,
      fWk: { formula: `WEEKDAY(C${r}, 2)`, result: dIdx },
      dayName: days[dIdx - 1],
      isWknd: dIdx >= 6 ? 'Weekend (Off)' : 'Working Day'
    };
  }));

  // Topic 12: WEEKNUM
  addTopicSheet('Topic12', 'TOPIC 12: WEEKNUM FUNCTION — ANNUAL CALENDAR CYCLE TRACKING', [
    { header: 'Dispatch #', key: 'id', width: 14, align: 'center' },
    { header: 'Carrier Partner', key: 'name', width: 20 },
    { header: 'Shipping Date', key: 'dt', width: 18, align: 'center' },
    { header: '=WEEKNUM(C#)', key: 'fWkNum', width: 18, align: 'center' },
    { header: 'Fiscal Quarter', key: 'qtr', width: 16, align: 'center' },
    { header: 'Supply Batch Tag', key: 'tag', width: 20, align: 'center' }
  ], samplePeople.map((p, i) => {
    const r = i + 4;
    const wk = 10 + i * 3;
    return {
      id: `DSP-${1400 + i}`,
      name: p.name,
      dt: `2026-0${Math.floor(wk/4)+1}-15`,
      fWkNum: { formula: `WEEKNUM(C${r})`, result: wk },
      qtr: `Q${Math.ceil((wk/52)*4)}`,
      tag: `BATCH-WK${wk}`
    };
  }));

  // Topic 13: ISOWEEKNUM
  addTopicSheet('Topic13', 'TOPIC 13: ISOWEEKNUM FUNCTION — ISO 8601 GLOBAL WEEK NUMBERING', [
    { header: 'Container ID', key: 'id', width: 16, align: 'center' },
    { header: 'Global Port', key: 'city', width: 18 },
    { header: 'Departure Date', key: 'dt', width: 18, align: 'center' },
    { header: '=ISOWEEKNUM(C#)', key: 'fIso', width: 20, align: 'center' },
    { header: 'Standard Weeknum', key: 'stdWk', width: 18, align: 'center' },
    { header: 'ISO Compliance', key: 'comp', width: 20, align: 'center' }
  ], samplePeople.map((p, i) => {
    const r = i + 4;
    return {
      id: `CNT-2026-${i + 1}`,
      city: p.city,
      dt: `2026-01-0${(i % 7) + 1}`,
      fIso: { formula: `ISOWEEKNUM(C${r})`, result: 1 },
      stdWk: 1,
      comp: 'ISO 8601 Certified'
    };
  }));

  // Topic 14: WORKDAY
  addTopicSheet('Topic14', 'TOPIC 14: WORKDAY FUNCTION — SPRINT & PROJECT DEADLINE MODELING', [
    { header: 'Task Code', key: 'id', width: 14, align: 'center' },
    { header: 'Lead Engineer', key: 'name', width: 20 },
    { header: 'Sprint Start', key: 'sDt', width: 18, align: 'center' },
    { header: 'Workdays', key: 'days', width: 12, align: 'center' },
    { header: '=WORKDAY(Start, Days)', key: 'fWd', width: 24, align: 'center' },
    { header: 'Delivery Milestone', key: 'res', width: 20, align: 'center' }
  ], samplePeople.map((p, i) => {
    const r = i + 4;
    const d = 10 + (i % 15);
    return {
      id: `TSK-${1500 + i}`,
      name: p.name,
      sDt: '2026-11-02',
      days: d,
      fWd: { formula: `WORKDAY(C${r}, D${r})`, result: `2026-11-${String(2 + d + 4).padStart(2, '0')}` },
      res: `2026-11-${String(2 + d + 4).padStart(2, '0')}`
    };
  }));

  // Topic 15: WORKDAY.INTL
  addTopicSheet('Topic15', 'TOPIC 15: WORKDAY.INTL — CROSS-BORDER WORKWEEK PROJECT SCHEDULING', [
    { header: 'Contract ID', key: 'id', width: 14, align: 'center' },
    { header: 'Global Site', key: 'city', width: 18 },
    { header: 'Start Date', key: 'sDt', width: 18, align: 'center' },
    { header: 'Workdays', key: 'days', width: 12, align: 'center' },
    { header: 'Weekend Code', key: 'wkCode', width: 16, align: 'center' },
    { header: '=WORKDAY.INTL(...)', key: 'fIntl', width: 26, align: 'center' }
  ], samplePeople.map((p, i) => {
    const r = i + 4;
    return {
      id: `GLB-${1600 + i}`,
      city: p.city,
      sDt: '2026-10-01',
      days: 20,
      wkCode: i % 2 === 0 ? '7 (Fri/Sat)' : '11 (Sun Only)',
      fIntl: { formula: `WORKDAY.INTL(C${r}, D${r}, 7)`, result: '2026-10-28' }
    };
  }));

  // Topic 16: NETWORKDAYS
  addTopicSheet('Topic16', 'TOPIC 16: NETWORKDAYS FUNCTION — BILLABLE CAPACITY & WORKING DAYS', [
    { header: 'Audit #', key: 'id', width: 14, align: 'center' },
    { header: 'Client Engagement', key: 'name', width: 20 },
    { header: 'Period Start', key: 'sDt', width: 18, align: 'center' },
    { header: 'Period End', key: 'eDt', width: 18, align: 'center' },
    { header: '=NETWORKDAYS(Start, End)', key: 'fNet', width: 26, align: 'center' },
    { header: 'Billable Hours (8h/day)', key: 'hrs', width: 22, align: 'center' }
  ], samplePeople.map((p, i) => {
    const r = i + 4;
    return {
      id: `AUD-${1700 + i}`,
      name: p.name,
      sDt: '2026-11-01',
      eDt: '2026-11-30',
      fNet: { formula: `NETWORKDAYS(C${r}, D${r})`, result: 21 },
      hrs: 168
    };
  }));

  // Topic 17: NETWORKDAYS.INTL
  addTopicSheet('Topic17', 'TOPIC 17: NETWORKDAYS.INTL — REGIONAL HOLIDAY & CUSTOM WEEKEND ENGINE', [
    { header: 'Logistics ID', key: 'id', width: 14, align: 'center' },
    { header: 'Regional Hub', key: 'city', width: 18 },
    { header: 'Start Date', key: 'sDt', width: 18, align: 'center' },
    { header: 'End Date', key: 'eDt', width: 18, align: 'center' },
    { header: 'Weekend Mask', key: 'mask', width: 18, align: 'center' },
    { header: '=NETWORKDAYS.INTL(...)', key: 'fNetIntl', width: 26, align: 'center' }
  ], samplePeople.map((p, i) => {
    const r = i + 4;
    return {
      id: `LOG-${1800 + i}`,
      city: p.city,
      sDt: '2026-11-01',
      eDt: '2026-11-30',
      mask: '"0000110"',
      fNetIntl: { formula: `NETWORKDAYS.INTL(C${r}, D${r}, "0000110")`, result: 22 }
    };
  }));

  // Topic 18: YEARFRAC
  addTopicSheet('Topic18', 'TOPIC 18: YEARFRAC FUNCTION — FINANCIAL DAY-COUNT CONVENTIONS', [
    { header: 'Security #', key: 'id', width: 14, align: 'center' },
    { header: 'Borrower Name', key: 'name', width: 20 },
    { header: 'Issue Date', key: 'sDt', width: 18, align: 'center' },
    { header: 'Settlement Date', key: 'eDt', width: 18, align: 'center' },
    { header: 'Basis (1=Act/Act)', key: 'basis', width: 18, align: 'center' },
    { header: '=YEARFRAC(Start, End, 1)', key: 'fYf', width: 26, align: 'center' }
  ], samplePeople.map((p, i) => {
    const r = i + 4;
    return {
      id: `SEC-${1900 + i}`,
      name: p.name,
      sDt: '2024-01-01',
      eDt: '2026-07-01',
      basis: 1,
      fYf: { formula: `YEARFRAC(C${r}, D${r}, 1)`, result: 2.4973 }
    };
  }));

  // Topic 19: DATEDIF
  addTopicSheet('Topic19', 'TOPIC 19: DATEDIF DATE DIFFERENCE, HR TENURE & GRATUITY ELIGIBILITY BENCH', [
    { header: 'Emp ID', key: 'id', width: 14, align: 'center' },
    { header: 'Employee Name', key: 'name', width: 20 },
    { header: 'Department', key: 'dept', width: 18 },
    { header: 'Location', key: 'city', width: 16 },
    { header: 'Joining Date', key: 'start', width: 16, align: 'center' },
    { header: 'Assessment Date', key: 'end', width: 16, align: 'center' },
    { header: 'Years ("Y")', key: 'years', width: 14, align: 'center' },
    { header: 'Months ("YM")', key: 'ym', width: 14, align: 'center' },
    { header: 'Days ("MD")', key: 'md', width: 14, align: 'center' },
    { header: 'Formatted Tenure String', key: 'tenure', width: 28, align: 'center' },
    { header: 'Gratuity Status (5+ Yrs)', key: 'gratuity', width: 24, align: 'center' }
  ], samplePeople.map((p, i) => {
    const r = i + 4;
    const startYr = 2015 + (i % 8);
    const yrs = 2026 - startYr;
    return {
      id: `CNAT-${1001 + i}`,
      name: p.name,
      dept: p.dept,
      city: p.city,
      start: `${startYr}-04-15`,
      end: '2026-11-12',
      years: { formula: `DATEDIF(E${r}, F${r}, "Y")`, result: yrs },
      ym: { formula: `DATEDIF(E${r}, F${r}, "YM")`, result: 6 },
      md: { formula: `DATEDIF(E${r}, F${r}, "MD")`, result: 28 },
      tenure: { formula: `DATEDIF(E${r}, F${r}, "Y") & " Y, " & DATEDIF(E${r}, F${r}, "YM") & " M, " & DATEDIF(E${r}, F${r}, "MD") & " D"`, result: `${yrs} Y, 6 M, 28 D` },
      gratuity: { formula: `IF(DATEDIF(E${r}, F${r}, "Y")>=5, "Eligible", "Not Eligible")`, result: yrs >= 5 ? 'Eligible' : 'Not Eligible' }
    };
  }));

  // Topic 20: Serial Date Architecture
  addTopicSheet('Topic20', 'TOPIC 20: SERIAL DATE ARCHITECTURE — EXCEL TIME SYSTEM MECHANICS', [
    { header: 'Sample ID', key: 'id', width: 14, align: 'center' },
    { header: 'Calendar Event', key: 'event', width: 22 },
    { header: 'Raw Numeric Serial', key: 'serial', width: 20, align: 'center' },
    { header: 'Calendar Date Format', key: 'dt', width: 20, align: 'center' },
    { header: 'Time Portion Fraction', key: 'frac', width: 20, align: 'center' },
    { header: 'Complete Display String', key: 'full', width: 26, align: 'center' }
  ], samplePeople.map((p, i) => ({
    id: `SER-${2100 + i}`,
    event: i % 2 === 0 ? 'Fiscal Closing' : 'Quarterly Audit',
    serial: 46338 + i * 15,
    dt: '2026-11-12',
    frac: 0.5,
    full: '12-Nov-2026 12:00 PM'
  })));

  // Topic 21: 1900 vs 1904 Date Systems
  addTopicSheet('Topic21', 'TOPIC 21: 1900 VS 1904 DATE SYSTEMS — CROSS-PLATFORM DRIFT AUDIT', [
    { header: 'Audit Record', key: 'id', width: 14, align: 'center' },
    { header: 'Operating System', key: 'os', width: 20 },
    { header: 'Base Serial Number', key: 'ser', width: 18, align: 'center' },
    { header: '1900 System Interpretation', key: 'd1900', width: 24, align: 'center' },
    { header: '1904 System Interpretation', key: 'd1904', width: 24, align: 'center' },
    { header: 'Drift Variance (Days)', key: 'drift', width: 20, align: 'center' }
  ], samplePeople.map((p, i) => ({
    id: `SYS-${2200 + i}`,
    os: i % 2 === 0 ? 'Windows (1900 Default)' : 'Macintosh (1904 Legacy)',
    ser: 40000,
    d1900: '2009-07-06',
    d1904: '2013-07-07',
    drift: 1462
  })));

  // Topic 22: Business Calendar Engineering
  addTopicSheet('Topic22', 'TOPIC 22: BUSINESS CALENDAR ENGINEERING — WORKING DAY CAPACITY', [
    { header: 'Date Entry', key: 'dt', width: 16, align: 'center' },
    { header: 'Day of Week', key: 'day', width: 16, align: 'center' },
    { header: 'Is Weekend?', key: 'wknd', width: 16, align: 'center' },
    { header: 'Is Public Holiday?', key: 'hol', width: 18, align: 'center' },
    { header: 'Is Active Workday?', key: 'work', width: 18, align: 'center' },
    { header: 'Available Production Hours', key: 'hrs', width: 26, align: 'center' }
  ], Array.from({ length: 14 }, (_, i) => {
    const isWk = i % 7 >= 5;
    return {
      dt: `2026-11-${String(i + 1).padStart(2, '0')}`,
      day: ['Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu'][i % 7],
      wknd: isWk ? 'YES' : 'NO',
      hol: i === 13 ? 'YES' : 'NO',
      work: isWk || i === 13 ? 'NO' : 'YES',
      hrs: isWk || i === 13 ? 0 : 8
    };
  }));

  // Topic 23: International Weekend Definitions
  addTopicSheet('Topic23', 'TOPIC 23: INTERNATIONAL WEEKEND DEFINITIONS — GLOBAL BINARY MASKS', [
    { header: 'Region ID', key: 'id', width: 14, align: 'center' },
    { header: 'Territory / Country', key: 'reg', width: 24 },
    { header: 'Weekend Days', key: 'wknd', width: 22, align: 'center' },
    { header: 'INTL Numeric Code', key: 'code', width: 18, align: 'center' },
    { header: '7-Character Binary String Mask', key: 'mask', width: 28, align: 'center' }
  ], [
    { id: 'REG-US', reg: 'United States & Europe', wknd: 'Saturday & Sunday', code: 1, mask: '"0000011"' },
    { id: 'REG-ME', reg: 'United Arab Emirates & Egypt', wknd: 'Friday & Saturday', code: 7, mask: '"0000110"' },
    { id: 'REG-IL', reg: 'Israel', wknd: 'Friday & Saturday', code: 7, mask: '"0000110"' },
    { id: 'REG-IN', reg: 'India 6-Day Manufacturing', wknd: 'Sunday Only', code: 11, mask: '"0000001"' },
    { id: 'REG-SG', reg: 'Singapore Shift 5.5 Days', wknd: 'Sunday + Sat Afternoon', code: 11, mask: '"0000001"' },
    { id: 'REG-BD', reg: 'Bangladesh', wknd: 'Friday Only', code: 16, mask: '"0000100"' }
  ]);

  // Topic 24: Holiday Calendar Architecture
  addTopicSheet('Topic24', 'TOPIC 24: HOLIDAY CALENDAR ARCHITECTURE — DYNAMIC REPOSITORIES', [
    { header: 'Holiday Code', key: 'id', width: 16, align: 'center' },
    { header: 'Gazetted Holiday Name', key: 'name', width: 26 },
    { header: 'Calendar Year', key: 'yr', width: 14, align: 'center' },
    { header: 'Official Date', key: 'dt', width: 18, align: 'center' },
    { header: 'Day of Week', key: 'day', width: 16, align: 'center' },
    { header: 'Holiday Type', key: 'type', width: 22, align: 'center' }
  ], [
    { id: 'HOL-01', name: 'Republic Day', yr: 2026, dt: '2026-01-26', day: 'Monday', type: 'National Fixed' },
    { id: 'HOL-02', name: 'Holi Festival', yr: 2026, dt: '2026-03-04', day: 'Wednesday', type: 'Astronomical / Floating' },
    { id: 'HOL-03', name: 'Good Friday', yr: 2026, dt: '2026-04-03', day: 'Friday', type: 'Religious Floating' },
    { id: 'HOL-04', name: 'Independence Day', yr: 2026, dt: '2026-08-15', day: 'Saturday', type: 'National Fixed' },
    { id: 'HOL-05', name: 'Mahatma Gandhi Jayanti', yr: 2026, dt: '2026-10-02', day: 'Friday', type: 'National Fixed' },
    { id: 'HOL-06', name: 'Durga Puja (Vijaya Dashami)', yr: 2026, dt: '2026-10-20', day: 'Tuesday', type: 'Regional State' },
    { id: 'HOL-07', name: 'Diwali (Deepavali)', yr: 2026, dt: '2026-11-08', day: 'Sunday', type: 'Religious Floating' },
    { id: 'HOL-08', name: 'Christmas Day', yr: 2026, dt: '2026-12-25', day: 'Friday', type: 'National Fixed' }
  ]);

  // Topic 25: SLA and Working-Hour Calculations
  addTopicSheet('Topic25', 'TOPIC 25: SLA & WORKING-HOUR CALCULATIONS — SHIFT-ADJUSTED RESOLUTION', [
    { header: 'Ticket #', key: 'id', width: 14, align: 'center' },
    { header: 'Priority', key: 'pri', width: 14, align: 'center' },
    { header: 'Logged Timestamp', key: 'open', width: 20, align: 'center' },
    { header: 'Resolved Timestamp', key: 'close', width: 20, align: 'center' },
    { header: 'Total Elapsed Hours', key: 'totH', width: 20, align: 'center' },
    { header: 'Business SLA Hours (9am-6pm)', key: 'slaH', width: 26, align: 'center' },
    { header: 'SLA Status', key: 'status', width: 18, align: 'center' }
  ], samplePeople.map((p, i) => ({
    id: `INC-${3000 + i}`,
    pri: i % 3 === 0 ? 'P1 Critical' : (i % 3 === 1 ? 'P2 High' : 'P3 Medium'),
    open: '2026-11-06 16:30',
    close: '2026-11-09 11:15',
    totH: 66.75,
    slaH: 3.75,
    status: 'Met SLA'
  })));

  // Topic 26: Fiscal Calendar Engineering
  addTopicSheet('Topic26', 'TOPIC 26: FISCAL CALENDAR ENGINEERING — INDIAN FY & US FEDERAL CYCLES', [
    { header: 'Voucher #', key: 'id', width: 14, align: 'center' },
    { header: 'Accounting Period', key: 'name', width: 20 },
    { header: 'Posting Date', key: 'dt', width: 18, align: 'center' },
    { header: 'Calendar Quarter', key: 'cq', width: 16, align: 'center' },
    { header: 'Indian Fiscal Year', key: 'ify', width: 18, align: 'center' },
    { header: 'Indian FY Quarter', key: 'ifq', width: 18, align: 'center' },
    { header: 'US Federal FY', key: 'usfy', width: 16, align: 'center' }
  ], samplePeople.map((p, i) => {
    const mo = (i % 12) + 1;
    const isQ1 = mo >= 4 && mo <= 6;
    const isQ2 = mo >= 7 && mo <= 9;
    const isQ3 = mo >= 10 && mo <= 12;
    const ifq = isQ1 ? 'Q1' : (isQ2 ? 'Q2' : (isQ3 ? 'Q3' : 'Q4'));
    return {
      id: `VCH-${4000 + i}`,
      name: p.name,
      dt: `2026-${String(mo).padStart(2, '0')}-15`,
      cq: `Q${Math.ceil(mo/3)}`,
      ify: mo >= 4 ? 'FY 2026-27' : 'FY 2025-26',
      ifq,
      usfy: mo >= 10 ? 'FY 2027' : 'FY 2026'
    };
  }));

  // Topic 27: Date-Time Automation Project
  addTopicSheet('Topic27', 'TOPIC 27: DATE-TIME AUTOMATION CAPSTONE PROJECT — OPERATIONS DASHBOARD', [
    { header: 'Workstream ID', key: 'id', width: 16, align: 'center' },
    { header: 'Workstream Lead', key: 'name', width: 20 },
    { header: 'Planned Start', key: 'sDt', width: 18, align: 'center' },
    { header: 'Target Finish Date', key: 'tDt', width: 18, align: 'center' },
    { header: 'Actual Completed Date', key: 'aDt', width: 20, align: 'center' },
    { header: 'Schedule Variance (Days)', key: 'varDays', width: 24, align: 'center' },
    { header: 'Project Health Index', key: 'health', width: 22, align: 'center' }
  ], samplePeople.map((p, i) => {
    const variance = (i % 5) - 2;
    return {
      id: `CAP-${5000 + i}`,
      name: p.name,
      sDt: '2026-10-01',
      tDt: '2026-11-15',
      aDt: `2026-11-${String(15 + variance).padStart(2, '0')}`,
      varDays: variance,
      health: variance <= 0 ? 'On Schedule' : 'Delayed Risk'
    };
  }));

  // Write Overview Table of Contents rows
  for (let idx = 0; idx <= 27; idx++) {
    const rowNum = idx + 6;
    const wsName = `Topic${idx}`;
    const wsTarget = wb.getWorksheet(wsName);
    const titleVal = wsTarget ? wsTarget.getCell('A2').value : `Topic ${idx}`;

    wsOverview.getCell(`A${rowNum}`).value = `Topic ${idx}`;
    wsOverview.getCell(`A${rowNum}`).alignment = { horizontal: 'center' };
    wsOverview.getCell(`B${rowNum}`).value = titleVal ? String(titleVal).replace(/TOPIC \d+: /, '') : `Topic ${idx}`;
    wsOverview.getCell(`C${rowNum}`).value = `Formula Pattern ${idx}`;
    wsOverview.getCell(`D${rowNum}`).value = 'Date & Time Engineering';
    wsOverview.getCell(`E${rowNum}`).value = {
      text: `👉 Open Worksheet Topic${idx}`,
      hyperlink: `#'${wsName}'!A1`,
      tooltip: `Go to ${wsName}`
    };
    wsOverview.getCell(`E${rowNum}`).font = { color: { argb: 'FF0284C7' }, underline: true, bold: true };

    const bg = idx % 2 === 0 ? 'FFFFFFFF' : 'FFF8FAFC';
    ['A', 'B', 'C', 'D', 'E'].forEach(col => {
      wsOverview.getCell(`${col}${rowNum}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: bg } };
      wsOverview.getCell(`${col}${rowNum}`).border = {
        top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        right: { style: 'thin', color: { argb: 'FFE2E8F0' } }
      };
    });
  }

  const targetPath = path.join(excelFilesDir, 'complete_date_time_calendar_engineering_master.xlsx');
  await wb.xlsx.writeFile(targetPath);
  console.log(`Successfully generated master workbook with 29 worksheets: ${targetPath}`);
}

buildMasterWorkbook().catch((err) => {
  console.error("Workbook build error:", err);
  process.exit(1);
});
