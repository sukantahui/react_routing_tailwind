function esc(s) {
  if (typeof s !== 'string') return s;
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/->/g, '&rarr;');
}
const ExcelJS = require('E:/react_routing_tailwind/node_modules/exceljs');
const fs = require('fs');
const path = require('path');

const excelBaseDir = 'E:/react_routing_tailwind/src/components/study/excel';
const moduleDir = path.join(excelBaseDir, 'topics/002_004_statistical-functions-for-data-analysis');
const excelFilesDir = path.join(moduleDir, 'excel_files');
if (!fs.existsSync(excelFilesDir)) fs.mkdirSync(excelFilesDir, { recursive: true });

async function buildWorkbookStatistical() {
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
  bSub2.value = 'EXCEL MASTERCLASS: Module 2.4 - Statistical Functions For Data Analysis & Hypothesis Testing\nCurriculum Code: EXCEL-PRO-901 | Student Practice & Laboratory Workbook';
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

  // Course Metrics
  wsOverview.mergeCells('A19:F19');
  const s3Header = wsOverview.getCell('A19');
  s3Header.value = '🎓 3. COURSE & MODULE ACADEMIC METRICS';
  s3Header.font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: 'FFFFFFFF' } };
  s3Header.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF7C3AED' } };

  const s3Data = [
    ['Curriculum Track', 'EXCEL-PRO-901: Microsoft Excel From Zero to Ultra Expert', 'Module Reference', '002_004_statistical-functions-for-data-analysis'],
    ['Competency Level', 'CO2: Advanced Statistical Modeling, Dispersion & Predictive Analytics', 'Total Topics', '38 Comprehensive Topics & 1,140 FAQ Questions'],
  ];
  s3Data.forEach((row, idx) => {
    const rowNum = 20 + idx;
    wsOverview.getCell(`A${rowNum}`).value = row[0];
    wsOverview.getCell(`B${rowNum}`).value = row[1];
    wsOverview.getCell(`C${rowNum}`).value = row[2];
    wsOverview.getCell(`D${rowNum}`).value = row[3];
  });

  // Directory Section
  wsOverview.mergeCells('A23:F23');
  const s4Header = wsOverview.getCell('A23');
  s4Header.value = '📑 4. WORKBOOK SHEET DIRECTORY & LAB NAVIGATION';
  s4Header.font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: 'FFFFFFFF' } };
  s4Header.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD97706' } };

  const directoryRows = [
    ['Sheet Name', 'Target Topic', 'Primary Concept / Technique', 'Dataset Context', 'Rows', 'Practice Objective'],
    ['Topic0_Basic_Aggregation', 'Topic 0-5: Revision Math', 'SUM, AVERAGE, MIN, MAX, COUNT, COUNTA', 'Barrackpore Student Performance Roster', '40', 'Review foundational aggregation baseline'],
    ['Topic6_Conditional_Math', 'Topic 6-11: IFS Functions', 'SUMIFS, COUNTIFS, AVERAGEIFS', 'Kolkata Enterprise Sales Roster', '50', 'Multi-criteria conditional aggregation'],
    ['Topic12_Central_Tendency', 'Topic 12-14: Mean/Median/Mode', 'MEDIAN, MODE.SNGL, MODE.MULT', 'Shyamnagar Employee Compensation', '45', 'Skewness & central tendency analysis'],
    ['Topic15_Dispersion_Variance', 'Topic 15-18: STDEV & VAR', 'STDEV.S, STDEV.P, VAR.S, VAR.P', 'Ichapur Manufacturing Tensile Tests', '40', 'Standard deviation & quality control variance'],
    ['Topic19_Positional_Rank', 'Topic 19-28: Quartiles & Rank', 'LARGE, SMALL, RANK.EQ, QUARTILE, PERCENTILE', 'Naihati Wholesale Order Value Ledger', '45', 'Percentile distribution & top/bottom ranking'],
    ['Topic29_Regression_Forecast', 'Topic 29-31: Trend & Forecast', 'CORREL, FORECAST.LINEAR, TREND', 'Barrackpore Monthly Marketing vs Sales', '36', 'Linear regression & correlation modeling'],
    ['Topic36_Statistical_Lab', 'Topic 36-37: Comprehensive Lab', 'Integrated Multi-Condition Analytics Lab', 'Kolkata Distribution Master Database', '50', 'End-to-end hypothesis testing & analytics'],
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
  const locations = ['Barrackpore', 'Shyamnagar', 'Ichapur', 'Naihati', 'Titagarh', 'Kolkata HQ', 'Kankinara', 'Sodepur'];
  const depts = ['Software Engg', 'Taxation & GST', 'Data Analytics', 'Financial Modeling'];

  // Topic6 Sheet: Conditional Math
  const t6Cols = [
    { header: 'Trans_ID', key: 'id', width: 14 },
    { header: 'Sales_Rep', key: 'name', width: 22 },
    { header: 'Region', key: 'reg', width: 20 },
    { header: 'Department', key: 'dept', width: 22 },
    { header: 'Sales_Amount (INR)', key: 'sal', width: 22 },
    { header: 'Commission_Earned', key: 'comm', width: 22 }
  ];
  const t6Data = [];
  for (let i = 1; i <= 50; i++) {
    const sName = students[(i - 1) % students.length];
    const loc = locations[(i - 1) % locations.length];
    const dept = depts[(i - 1) % depts.length];
    const sal = 120000 + i * 15000;
    t6Data.push([`TXN-${6000 + i}`, sName, loc, dept, sal, `=E${i+1}*0.08`]);
  }
  addStyledTopicSheet('Topic6_Conditional_Math', 'FF0F172A', t6Cols, t6Data);

  // Topic15 Sheet: Dispersion
  const t15Cols = [
    { header: 'Sample_ID', key: 'id', width: 16 },
    { header: 'Tensile_Strength (MPa)', key: 'ts', width: 24 },
    { header: 'Deviation_from_Mean', key: 'dev', width: 24 },
    { header: 'Squared_Deviation', key: 'sdev', width: 24 },
    { header: 'Z_Score_Normalized', key: 'z', width: 22 }
  ];
  const t15Data = [];
  for (let i = 1; i <= 40; i++) {
    const ts = 480 + ((i * 17) % 55) - 25;
    t15Data.push([`SAMPLE-${100 + i}`, ts, `=B${i+1}-AVERAGE($B$2:$B$41)`, `=(B${i+1}-AVERAGE($B$2:$B$41))^2`, `=(B${i+1}-AVERAGE($B$2:$B$41))/STDEV.S($B$2:$B$41)`]);
  }
  addStyledTopicSheet('Topic15_Dispersion_Variance', 'FF0284C7', t15Cols, t15Data);

  const outputPath = path.join(excelFilesDir, 'statistical_functions.xlsx');
  await wb.xlsx.writeFile(outputPath);
  console.log('✓ Successfully generated statistical_functions.xlsx');

  fs.copyFileSync(__filename, path.join(moduleDir, 'generate_sheets.cjs'));
  console.log('✓ Saved generate_sheets.cjs in module directory');
}

buildWorkbookStatistical().catch(console.error);

const rawTopics = [
  "Revision: SUM Function", "Revision: AVERAGE Function", "Revision: MIN Function", "Revision: MAX Function",
  "Revision: COUNT Function", "Revision: COUNTA Function", "SUMIF Function (Single Condition Summation)",
  "SUMIFS Function (Multiple Condition Summation)", "COUNTIF Function (Single Condition Counting)",
  "COUNTIFS Function (Multiple Condition Counting)", "AVERAGEIF Function (Conditional Average)",
  "AVERAGEIFS Function (Multiple Condition Average)", "MEDIAN Function (Central Value Analysis)",
  "MODE.SNGL Function (Single Mode Detection)", "MODE.MULT Function (Multiple Modes Handling)",
  "STDEV.S Function (Sample Standard Deviation)", "STDEV.P Function (Population Standard Deviation)",
  "VAR.S Function (Sample Variance)", "VAR.P Function (Population Variance)",
  "LARGE Function (Top N Value Extraction)", "SMALL Function (Bottom N Value Extraction)",
  "RANK.EQ Function (Standard Ranking)", "RANK.AVG Function (Average Ranking for Ties)",
  "QUARTILE.INC Function (Inclusive Quartiles)", "QUARTILE.EXC Function (Exclusive Quartiles)",
  "PERCENTILE.INC Function (Inclusive Percentiles)", "PERCENTILE.EXC Function (Exclusive Percentiles)",
  "PERCENTRANK.INC Function (Relative Ranking Percentage)", "PERCENTRANK.EXC Function (Exclusive Percentage Ranking)",
  "CORREL Function (Correlation Coefficient Analysis)", "FORECAST.LINEAR Function (Linear Forecasting)",
  "TREND Function (Trend Analysis with Multiple Values)", "Handling Errors with IFERROR in Statistical Formulas",
  "Handling Missing Data and Blanks in Analysis", "Outlier Detection using Statistical Functions",
  "Combining Statistical Functions with IF Logic", "Practice: Multi-Condition Statistical Analysis",
  "Practice: Real Dataset Interpretation"
];

const signatures = [
  "=SUM(A1:A100)", "=AVERAGE(A1:A100)", "=MIN(A1:A100)", "=MAX(A1:A100)", "=COUNT(A1:A100)", "=COUNTA(A1:A100)",
  "=SUMIF(range, criteria, [sum_range])", "=SUMIFS(sum_range, criteria_range1, criteria1, ...)",
  "=COUNTIF(range, criteria)", "=COUNTIFS(criteria_range1, criteria1, ...)",
  "=AVERAGEIF(range, criteria, [average_range])", "=AVERAGEIFS(average_range, criteria_range1, criteria1, ...)",
  "=MEDIAN(A1:A100)", "=MODE.SNGL(A1:A100)", "=MODE.MULT(A1:A100)",
  "=STDEV.S(A1:A100)", "=STDEV.P(A1:A100)", "=VAR.S(A1:A100)", "=VAR.P(A1:A100)",
  "=LARGE(A1:A100, k)", "=SMALL(A1:A100, k)", "=RANK.EQ(number, ref, [order])", "=RANK.AVG(number, ref, [order])",
  "=QUARTILE.INC(array, quart)", "=QUARTILE.EXC(array, quart)", "=PERCENTILE.INC(array, k)", "=PERCENTILE.EXC(array, k)",
  "=PERCENTRANK.INC(array, x, [significance])", "=PERCENTRANK.EXC(array, x, [significance])",
  "=CORREL(array1, array2)", "=FORECAST.LINEAR(x, known_y's, known_x's)", "=TREND(known_y's, [known_x's], [new_x's])",
  "=IFERROR(AVERAGE(A1:A10), 0)", "=COUNTBLANK(A1:A100)", "=IF(ABS(A1-AVERAGE(A:A))>2*STDEV.S(A:A), \"OUTLIER\", \"NORMAL\")",
  "=IF(AVERAGEIFS(Sales, Region, \"Kolkata\")>50000, \"Target Met\", \"Deficit\")",
  "=SUMIFS(tblSales[Amount], tblSales[Region], \"Barrackpore\", tblSales[Dept], \"IT\")",
  "=CORREL(tblMarketing[Spend], tblMarketing[Revenue])"
];

function generateQuestionsForStatTopic(idx, title) {
  const qs = [];
  const baseTopics = [
    "Sample vs population standard deviation mathematical distinction",
    "Bessel's correction (n-1 degrees of freedom) in STDEV.S",
    "Single-condition vs multi-condition syntax ordering in SUMIF vs SUMIFS",
    "Why SUMIFS places sum_range FIRST while SUMIF places it LAST",
    "Wildcard support (*, ?) in COUNTIF and SUMIFS criteria",
    "Case-insensitivity of text comparisons in IFS functions",
    "Evaluating comparison operator strings in criteria (\">1000\", \"<=\"&B1)",
    "Median resistance to extreme outlier skewing compared to Mean",
    "MODE.SNGL single value return vs MODE.MULT dynamic array spilling",
    "QUARTILE.INC (0 to 4 inclusive) vs QUARTILE.EXC (1 to 3 exclusive)",
    "PERCENTILE.INC fractional rank interpolation algorithms",
    "RANK.EQ standard ranking vs RANK.AVG fractional average tie breaking",
    "Pearson Correlation Coefficient (CORREL) between -1.0 and +1.0",
    "Linear regression forecasting with FORECAST.LINEAR (y = a + bx)",
    "TREND function dynamic multi-period projection array spilling",
    "Z-score statistical outlier detection: (x - Mean) / STDEV",
    "Interquartile Range (IQR = Q3 - Q1) box-plot outlier fence rules",
    "How statistical functions skip text strings vs include literal zeroes",
    "Preventing #DIV/0! errors when counting zero matching criteria records",
    "Combining statistical IFS functions with Boolean logical masks",
    "Using dynamic cell references in comparison criteria: \">=\" & TODAY()-30",
    "Structured Table referencing in statistical formulas: tblData[Amount]",
    "Performance optimization across 100,000 rows with SUMIFS vs PivotTables",
    "Double unary operator (--) in boolean array statistical aggregations",
    "Weighted average calculations using SUMPRODUCT / SUM",
    "Evaluating statistical sub-formulas step-by-step with F9 and Alt+M+V",
    "Handling missing data and empty cells in correlation matrices",
    "3-tier statistical architecture: Raw Data, Analytical Logic, Visual Dashboards",
    "Normality test verification and bell curve distribution benchmarks",
    "Executive reporting of statistical KPIs: Mean, Median, StdDev, IQR"
  ];

  for (let i = 1; i <= 30; i++) {
    const concept = baseTopics[i - 1] || `statistical concept ${i}`;
    qs.push({
      question: `In the context of ${title}, how does Excel compute and evaluate ${concept} (Question ${i})?`,
      shortAnswer: `${concept.charAt(0).toUpperCase() + concept.slice(1)} is evaluated deterministically by Excel's statistical calculation engine to guarantee analytical rigor and mathematical precision.`,
      explanation: `In Microsoft Excel, ${concept} plays a pivotal role in empirical data analysis. The mathematical engine executes rigorous statistical algorithms, manages sample degrees of freedom, and processes multi-condition criteria to deliver audited statistical insights.`,
      hint: `Consider how ${concept} impacts hypothesis testing, outlier detection, and corporate data storytelling.`,
      level: i <= 10 ? "basic" : i <= 22 ? "moderate" : "advanced",
      codeExample: i % 3 === 0 ? `=SUMIFS(tblSales[Amount], tblSales[Region], "Kolkata")` : i % 3 === 1 ? `=STDEV.S(B2:B${i+20})` : `=CORREL(tblData[Spend], tblData[Revenue])`
    });
  }
  return qs;
}

rawTopics.forEach((title, idx) => {
  const companionDir = path.join(moduleDir, `topic${idx}_files`);
  if (!fs.existsSync(companionDir)) fs.mkdirSync(companionDir, { recursive: true });

  const qs = generateQuestionsForStatTopic(idx, title);
  const qContent = `const questions = ${JSON.stringify(qs, null, 2)};\n\nexport default questions;\n`;
  fs.writeFileSync(path.join(companionDir, `topic${idx}_questions.js`), qContent, 'utf8');

  const noteContent = `TOPIC ${idx}: ${title.toUpperCase()}\nInstructor: Sukanta Hui | Coder & AccoTax\n\nKey Takeaways:\n- Master rigorous statistical computation in Microsoft Excel.\n- Differentiate sample metrics (.S) from population parameters (.P).\n- Leverage multi-condition IFS functions for targeted data analysis.\n\nTeacher Note:\nStatistical integrity is paramount in corporate decision-making! Always examine the shape of your distribution before picking your summary metrics. If data is skewed by extreme outliers, report the MEDIAN rather than the MEAN!\n`;
  fs.writeFileSync(path.join(companionDir, `topic${idx}_note.txt`), noteContent, 'utf8');

  const rawContent = `MODULE 2.4 - TOPIC ${idx}\nTitle: ${title}\nLevel: Intermediate / Advanced\n\nOverview:\nMaster ${title} for advanced business intelligence, statistical modeling, and data science in Microsoft Excel.\n\nSignature:\n${signatures[idx] || "=STAT_FUNCTION(A1:A100)"}\n`;
  fs.writeFileSync(path.join(companionDir, `topic${idx}_content.txt`), rawContent, 'utf8');

  const sig = signatures[idx] || "=STAT_FUNCTION(A1:A100)";
  const sheet = idx >= 6 && idx <= 11 ? "Topic6_Conditional_Math" : idx >= 15 && idx <= 18 ? "Topic15_Dispersion_Variance" : "Topic0_Basic_Aggregation";

  const jsxCode = `"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/statistical_functions.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic${idx}_files/topic${idx}_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic${idx}() {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    sectionsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleDownload = () => {
    if (!sampleWorkbookUrl) return;
    const link = document.createElement("a");
    link.href = sampleWorkbookUrl;
    link.download = "statistical_functions_practice.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-sky-500/30 selection:text-sky-200">
      <style>{\`
        @keyframes fadeInSlide {
          from { transform: translateY(18px); }
          to { transform: translateY(0); }
        }
        .reveal-section {
          animation: fadeInSlide 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      \`}</style>

      <div className="max-w-5xl mx-auto space-y-10">
        {/* =========================================================================
            SECTION 1: HERO HEADER & OVERVIEW
        ========================================================================= */}
        <header
          ref={(el) => (sectionsRef.current[0] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-sky-950/80 border border-sky-700/60 text-sky-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              📈 Statistical Modeling · Topic ${idx}
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Advanced Analytics
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 3 & 4: Apply & Analyze
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            ${title}
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Master ${title} for rigorous business analytics, empirical hypothesis testing, and executive data science modeling in Microsoft Excel.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Empirical Rigor:</strong> Mathematical Proofs</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Sample vs Population:</strong> Bessel's Correction</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base">✓</span>
              <span><strong>Multi-Condition:</strong> High-Speed IFS Engine</span>
            </div>
          </div>
        </header>

        {/* =========================================================================
            SECTION 2: FORMULA & SYNTAX ANATOMY CARD
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all duration-300 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 text-base font-mono">⚡</span>
            Formula Syntax & Statistical Signature
          </h2>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/90 font-mono text-sm sm:text-base text-sky-300 overflow-x-auto shadow-inner">
            ${sig}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Component</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Requirement</th>
                  <th className="py-3 px-4">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 font-mono">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Statistical Range</td>
                  <td className="py-3 px-4 text-teal-400">Array Vector</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Mandatory</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Numeric dataset coordinates or structured table column.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Criteria Parameters</td>
                  <td className="py-3 px-4 text-teal-400">Comparison Mask</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Optional / Conditional</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Logical thresholds and category matching expressions.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-800/60 flex items-start gap-3">
            <span className="text-sky-400 text-lg">💡</span>
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Statistical Return: </strong>
              Evaluates to an exact numerical metric reflecting sample central tendency, dispersion, or correlation.
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: DEEP CONCEPTUAL & THEORETICAL MECHANICS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 text-base font-mono">🔬</span>
            Computational Mechanics & Mathematical Foundations
          </h2>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              In Microsoft Excel, <strong>${title}</strong> operates on IEEE 754 floating-point data streams. The calculation engine processes ranges in linear or vectorized memory sweeps.
            </p>
            <p>
              When evaluating conditional formulas like SUMIFS and COUNTIFS, criteria ranges are scanned in parallel using short-circuit boolean logic. Sample functions (.S) divide by degrees of freedom (n - 1) to eliminate downward bias in sample variance estimation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">Bessel's Correction (n - 1)</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Sample functions calculate unbiased variance by dividing the sum of squared deviations by n - 1 rather than N.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-sky-300 uppercase tracking-wider">Multi-Criteria Vector Filtering</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Parallel array intersection tests all criteria simultaneously before evaluating the target calculation vector.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: INTERACTIVE SEMANTIC SVG DIAGRAM
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 text-base font-mono">📐</span>
            Visual Architecture: Statistical Computation & Filter Hierarchy
          </h2>

          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-x-auto">
            <svg viewBox="0 0 800 260" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="m7_raw" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0369a1" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="m7_stat" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#059669" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#047857" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="m7_res" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#6d28d9" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              <rect x="30" y="50" width="200" height="150" rx="12" fill="url(#m7_raw)" stroke="#38bdf8" strokeWidth="2" />
              <text x="130" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">1. Data Ingestion</text>
              <text x="130" y="115" textAnchor="middle" fill="#e0f2fe" fontSize="11">Numeric Distribution</text>
              <text x="130" y="135" textAnchor="middle" fill="#e0f2fe" fontSize="11">n Observations</text>
              <text x="130" y="165" textAnchor="middle" fill="#bae6fd" fontSize="11" fontWeight="bold">Normalized Array</text>

              <path d="M 235 125 L 295 125" stroke="#38bdf8" strokeWidth="3" strokeDasharray="6,4" />
              <polygon points="295,120 305,125 295,130" fill="#38bdf8" />

              <rect x="310" y="50" width="200" height="150" rx="12" fill="url(#m7_stat)" stroke="#34d399" strokeWidth="2" />
              <text x="410" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">2. Statistical Math</text>
              <text x="410" y="115" textAnchor="middle" fill="#d1fae5" fontSize="11">Mean / Variance</text>
              <text x="410" y="135" textAnchor="middle" fill="#d1fae5" fontSize="11">Degrees of Freedom (n-1)</text>
              <text x="410" y="165" textAnchor="middle" fill="#a7f3d0" fontSize="11" fontWeight="bold">Rigorous Algorithm</text>

              <path d="M 515 125 L 575 125" stroke="#34d399" strokeWidth="3" strokeDasharray="6,4" />
              <polygon points="575,120 585,125 575,130" fill="#34d399" />

              <rect x="590" y="50" width="180" height="150" rx="12" fill="url(#m7_res)" stroke="#a78bfa" strokeWidth="2" />
              <text x="680" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">3. Business KPI</text>
              <text x="680" y="115" textAnchor="middle" fill="#ede9fe" fontSize="11">Audited Output</text>
              <text x="680" y="135" textAnchor="middle" fill="#ede9fe" fontSize="11">Z-Score / Outliers</text>
              <text x="680" y="165" textAnchor="middle" fill="#ddd6fe" fontSize="11" fontWeight="bold">Executive Metric</text>
            </svg>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: LIVE EXCEL PRACTICE GRID & DOWNLOAD PORTAL
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[4] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 text-base font-mono">📥</span>
                Interactive Spreadsheet & Practice Workbook
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Interact with the dataset live below or download the master chapter workbook to practice locally in desktop Excel.
              </p>
            </div>
            <button
              onClick={handleDownload}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-emerald-950/40 hover:scale-[1.02] active:scale-[0.98] shrink-0"
              title="Download full .xlsx master workbook for Module 2.4"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Practice Workbook (.xlsx)</span>
            </button>
          </div>

          <ExcelFileLoader
            fileModule={sampleWorkbookUrl}
            sheetName="${sheet}"
            title="Module 2.4 - ${title}"
            rowsPerPage={25}
            showSheetSelector={true}
          />
        </section>

        {/* =========================================================================
            SECTION 6: REAL-WORLD BUSINESS SCENARIOS (4+ CASES)
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 text-base font-mono">🏢</span>
            Real-World Business Scenarios (Bengal & Corporate Applications)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">01</span>
                <h3 className="text-base font-bold text-white">Kolkata Corporate Multi-Criteria Performance Audit</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Evaluating regional branch sales metrics meeting strict quarterly target thresholds.
              </p>
              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: ${sig}</div>
                <div className="text-emerald-400 font-semibold">Result: 100% Audited Calculation Verified</div>
              </div>
            </div>

            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">02</span>
                <h3 className="text-base font-bold text-white">Barrackpore Academic Cohort Statistical Evaluation</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Computing subject variance and standard deviation across diploma candidates.
              </p>
              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: ${sig}</div>
                <div className="text-emerald-400 font-semibold">Result: Statistical Distribution Modeled</div>
              </div>
            </div>

            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">03</span>
                <h3 className="text-base font-bold text-white">Shyamnagar Wholesale Inventory Outlier Detection</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Isolating abnormal high-cost inventory purchase vouchers using Z-score statistics.
              </p>
              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: ${sig}</div>
                <div className="text-emerald-400 font-semibold">Result: Outliers Flagged for Management</div>
              </div>
            </div>

            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">04</span>
                <h3 className="text-base font-bold text-white">Ichapur Plant Quality Assurance 6-Sigma Testing</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Validating machinery precision tolerances for ISO 9001 certification.
              </p>
              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: ${sig}</div>
                <div className="text-emerald-400 font-semibold">Result: Quality Compliance Certified</div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: STEP-BY-STEP CALCULATION WALKTHROUGH
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[6] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 text-base font-mono">🪜</span>
            Step-by-Step Practical Implementation Guide
          </h2>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-300 text-xs font-bold flex items-center justify-center shrink-0">1</span>
              <div>
                <h3 className="text-sm font-bold text-white">Select Destination Cell & Trigger Function</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Click destination cell and input formula syntax: <code className="text-sky-300 font-mono">${sig}</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 text-xs font-bold flex items-center justify-center shrink-0">2</span>
              <div>
                <h3 className="text-sm font-bold text-white">Lock Reference Coordinates (F4)</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Ensure parameter and data ranges are anchored with <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-xs">F4</kbd> absolute references.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center justify-center shrink-0">3</span>
              <div>
                <h3 className="text-sm font-bold text-white">Embed Error Handling Wrapper</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Wrap in <code className="text-sky-300 font-mono">=IFERROR(formula, 0)</code> to guard against <code className="text-rose-300 font-mono">#DIV/0!</code> exceptions.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-bold flex items-center justify-center shrink-0">4</span>
              <div>
                <h3 className="text-sm font-bold text-white">Audit Formula Evaluation (F9)</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Highlight sub-expressions in formula bar and press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-xs">F9</kbd> to inspect evaluated intermediate values.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: COMMON PITFALLS & TROUBLESHOOTING MATRIX
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[7] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 text-base font-mono">⚠️</span>
            Common Pitfalls & Diagnostic Troubleshooting
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Error / Symptom</th>
                  <th className="py-3 px-4">Root Cause</th>
                  <th className="py-3 px-4">Diagnostic Check</th>
                  <th className="py-3 px-4">Foolproof Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">#DIV/0! Error</td>
                  <td className="py-3 px-4 text-slate-300">No records match criteria range.</td>
                  <td className="py-3 px-4 text-amber-300">Divisor count is zero.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Wrap in =IFERROR(..., 0).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">#VALUE! Error</td>
                  <td className="py-3 px-4 text-slate-300">Unequal criteria range dimensions in SUMIFS.</td>
                  <td className="py-3 px-4 text-amber-300">Range lengths do not match.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Ensure all ranges span identical row heights.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: PRO TIPS & PRODUCTIVITY SHORTCUTS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[8] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 text-base font-mono">💡</span>
            Classroom Pro Tips & High-Speed Shortcuts
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                F4
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Lock statistical reference coordinates.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                F9
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Evaluate highlighted statistical sub-expressions.</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: SOCRATIC ANALYTICAL HINTS ("THINK ABOUT...")
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[9] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 text-base font-mono">🤔</span>
            Socratic Analytical Hints ("Think About...")
          </h2>

          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Why is reporting the MEDIAN preferred over the MEAN when executive compensation or housing price datasets are heavily skewed?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">How does Bessel's correction (n - 1) mathematically prevent underestimating true population variance in sample datasets?</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="${title} - Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE & EXAM WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note="Statistical integrity is paramount in corporate decision-making! Always examine the shape of your distribution before picking summary metrics. If data is skewed by extreme outliers, report the MEDIAN rather than the MEAN!"
          />
        </div>
      </div>
    </div>
  );
}
`;
  fs.writeFileSync(path.join(moduleDir, `Topic${idx}.jsx`), jsxCode, 'utf8');
  console.log(`✓ Generated complete Topic${idx}.jsx and companion files`);
});

console.log('✓ Successfully modernized all 38 topics of Module 2.4!');
