const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

async function buildMasterWorkbook() {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Coder & AccoTax';
  wb.lastModifiedBy = 'Sukanta Hui';
  wb.created = new Date();
  wb.modified = new Date();

  // 1. Overview Sheet (Protected)
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
  bSub2.value = 'EXCEL MASTERCLASS: Advanced Power Query: M Code Scripting & Custom Functions\nCurriculum Code: EXCEL-PRO-502 | Student Master Practice Workbook';
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

  // Topic Practice Sheets Specification
  const topicSheets = [
    {
      name: 'Topic0_M_Syntax_Overview',
      cols: [
        { header: 'Step_ID', key: 'id', width: 14 },
        { header: 'Transform_Step', key: 'step', width: 28 },
        { header: 'M_Expression', key: 'expr', width: 38 },
        { header: 'Output_Type', key: 'type', width: 18 },
        { header: 'Execution_Status', key: 'status', width: 20 }
      ],
      rows: [
        ['STP-101', 'Source Connection', 'Csv.Document(File.Contents("C:\\Data.csv"))', 'Table', 'COMPLETED'],
        ['STP-102', 'Promote Headers', 'Table.PromoteHeaders(Source, [PromoteAllScalars=true])', 'Table', 'COMPLETED'],
        ['STP-103', 'Changed Types', 'Table.TransformColumnTypes(Source,{{"Amount", type number}})', 'Table', 'COMPLETED'],
        ['STP-104', 'Filtered Rows', 'Table.SelectRows(#"Changed Types", each [Amount] > 5000)', 'Table', 'COMPLETED'],
        ['STP-105', 'Added Custom Col', 'Table.AddColumn(#"Filtered Rows", "GST", each [Amount]*0.18)', 'Table', 'COMPLETED']
      ]
    },
    {
      name: 'Topic1_M_Data_Types',
      cols: [
        { header: 'Type_ID', key: 'id', width: 14 },
        { header: 'M_Type_Category', key: 'cat', width: 22 },
        { header: 'Syntax_Construct', key: 'syn', width: 32 },
        { header: 'Example_Literal', key: 'ex', width: 32 },
        { header: 'Engine_Behavior', key: 'beh', width: 30 }
      ],
      rows: [
        ['TYP-01', 'Primitive Number', 'type number', '45200.75', 'Double-precision 64-bit float'],
        ['TYP-02', 'Primitive Text', 'type text', '"Barrackpore Campus"', 'Unicode string literal'],
        ['TYP-03', 'List Structure', '{ item1, item2 }', '{ 10, 20, 30, 40 }', '0-based sequential ordered list'],
        ['TYP-04', 'Record Structure', '[ Field1 = Val1 ]', '[ Name="Swadeep", Role="Analyst" ]', 'Key-value associative mapping'],
        ['TYP-05', 'Table Structure', '#table(headers, rows)', '#table({"ID","Score"}, {{1,95}})', 'Two-dimensional columnar dataset']
      ]
    },
    {
      name: 'Topic2_M_Standard_Library',
      cols: [
        { header: 'Func_ID', key: 'id', width: 14 },
        { header: 'Library_Namespace', key: 'ns', width: 22 },
        { header: 'Standard_Function', key: 'fn', width: 28 },
        { header: 'Primary_Parameters', key: 'param', width: 32 },
        { header: 'Transformation_Use', key: 'use', width: 30 }
      ],
      rows: [
        ['LIB-01', 'Table.*', 'Table.SelectRows', 'table, condition', 'Row filtering with predicate'],
        ['LIB-02', 'Table.*', 'Table.AddColumn', 'table, newColumnName, columnGenerator', 'Calculated column synthesis'],
        ['LIB-03', 'List.*', 'List.Distinct', 'list, [equationCriteria]', 'Deduplication of array entries'],
        ['LIB-04', 'Record.*', 'Record.Field', 'record, field', 'Extract dynamic property value'],
        ['LIB-05', 'Text.*', 'Text.Clean', 'text', 'Strip unprintable control ASCII']
      ]
    },
    {
      name: 'Topic3_Custom_M_Functions',
      cols: [
        { header: 'Func_ID', key: 'id', width: 14 },
        { header: 'Custom_Function_Name', key: 'name', width: 26 },
        { header: 'Input_Signature', key: 'sig', width: 30 },
        { header: 'Return_Type', key: 'ret', width: 18 },
        { header: 'Business_Application', key: 'app', width: 32 }
      ],
      rows: [
        ['CFN-01', 'fxComputeGST', '(amt as number, rate as number) as number', 'number', 'Dynamic GST tax ledger generator'],
        ['CFN-02', 'fxCleanCleanseText', '(rawText as text) as text', 'text', 'Strip whitespace & standardize casing'],
        ['CFN-03', 'fxParseFiscalQuarter', '(trxDate as date) as text', 'text', 'Convert date into Indian Q1..Q4'],
        ['CFN-04', 'fxExchangeRateConvert', '(amt as number, curr as text) as number', 'number', 'Convert foreign currency to INR']
      ]
    },
    {
      name: 'Topic4_Parameters',
      cols: [
        { header: 'Param_ID', key: 'id', width: 14 },
        { header: 'Parameter_Name', key: 'name', width: 24 },
        { header: 'Data_Type', key: 'type', width: 16 },
        { header: 'Current_Value', key: 'val', width: 36 },
        { header: 'Target_Query_Consumer', key: 'consumer', width: 26 }
      ],
      rows: [
        ['PRM-01', 'pFolderPath', 'Text', 'C:\\DataHub\\Barrackpore_Branch\\', 'ConsolidateFolderQuery'],
        ['PRM-02', 'pFiscalYear', 'Number', '2026', 'AnnualFinancialFilterQuery'],
        ['PRM-03', 'pExchangeRateUSD', 'Number', '86.45', 'MultiCurrencyLedger'],
        ['PRM-04', 'pMinThresholdAmount', 'Number', '50000', 'HighValueAuditingQuery']
      ]
    },
    {
      name: 'Topic5_Folder_Consolidation',
      cols: [
        { header: 'File_Name', key: 'fn', width: 26 },
        { header: 'Branch_Location', key: 'loc', width: 20 },
        { header: 'File_Extension', key: 'ext', width: 16 },
        { header: 'Date_Modified', key: 'dt', width: 22 },
        { header: 'Row_Count', key: 'rc', width: 16 },
        { header: 'ETL_Load_Status', key: 'st', width: 20 }
      ],
      rows: [
        ['Sales_Barrackpore_2026.csv', 'Barrackpore', '.csv', '2026-08-01 10:15:00', 1450, 'INGESTED'],
        ['Sales_Shyamnagar_2026.csv', 'Shyamnagar', '.csv', '2026-08-01 10:18:00', 980, 'INGESTED'],
        ['Sales_Ichapur_2026.csv', 'Ichapur', '.csv', '2026-08-01 10:20:00', 1120, 'INGESTED'],
        ['Sales_Naihati_2026.csv', 'Naihati', '.csv', '2026-08-01 10:22:00', 890, 'INGESTED'],
        ['Sales_Titagarh_2026.csv', 'Titagarh', '.csv', '2026-08-01 10:25:00', 1340, 'INGESTED']
      ]
    },
    {
      name: 'Topic6_Web_API_Ingestion',
      cols: [
        { header: 'Target_Currency', key: 'cur', width: 18 },
        { header: 'Currency_Name', key: 'name', width: 24 },
        { header: 'Base_USD_Rate', key: 'rate', width: 18 },
        { header: 'INR_Equivalent', key: 'inr', width: 18 },
        { header: 'Last_Updated', key: 'upd', width: 22 },
        { header: 'Pipeline_Type', key: 'pipe', width: 24 }
      ],
      rows: [
        ['USD', 'US Dollar', 1.0000, 86.4500, '2026-08-27 12:00:00', 'REST API (Web.Contents)'],
        ['EUR', 'Euro', 1.0825, 93.5821, '2026-08-27 12:00:00', 'REST API (Web.Contents)'],
        ['GBP', 'British Pound', 1.2950, 111.9527, '2026-08-27 12:00:00', 'REST API (Web.Contents)'],
        ['JPY', 'Japanese Yen', 0.0068, 0.5878, '2026-08-27 12:00:00', 'REST API (Web.Contents)'],
        ['SGD', 'Singapore Dollar', 0.7580, 65.5291, '2026-08-27 12:00:00', 'REST API (Web.Contents)']
      ]
    },
    {
      name: 'Topic7_API_Pagination_Tokens',
      cols: [
        { header: 'Request_ID', key: 'id', width: 16 },
        { header: 'Page_Number', key: 'page', width: 16 },
        { header: 'Cursor_Token', key: 'cursor', width: 24 },
        { header: 'Bearer_Token_Status', key: 'token', width: 22 },
        { header: 'Records_Retrieved', key: 'recs', width: 20 },
        { header: 'Rate_Limit_Remaining', key: 'rate', width: 24 },
        { header: 'Batch_Status', key: 'status', width: 18 }
      ],
      rows: [
        ['REQ-8001', 1, 'csr_init_001', 'OAUTH_ACTIVE', 100, '99/100', 'PROCESSED'],
        ['REQ-8002', 2, 'csr_pg2_9941', 'OAUTH_ACTIVE', 100, '98/100', 'PROCESSED'],
        ['REQ-8003', 3, 'csr_pg3_8823', 'OAUTH_ACTIVE', 100, '97/100', 'PROCESSED'],
        ['REQ-8004', 4, 'csr_pg4_1245', 'OAUTH_ACTIVE', 85, '96/100', 'PROCESSED'],
        ['REQ-8005', 5, 'null', 'OAUTH_ACTIVE', 0, '95/100', 'TERMINATED_EOF']
      ]
    },
    {
      name: 'Topic8_Error_Handling',
      cols: [
        { header: 'Trx_ID', key: 'id', width: 16 },
        { header: 'Customer_Name', key: 'name', width: 22 },
        { header: 'Raw_Amount', key: 'amt', width: 18 },
        { header: 'Validation_Rule', key: 'rule', width: 24 },
        { header: 'Try_Otherwise_Result', key: 'res', width: 24 },
        { header: 'Audit_Flag', key: 'flag', width: 18 }
      ],
      rows: [
        ['TRX-901', 'Swadeep Banerjee', '45000', 'Numeric Check', 45000.00, 'VALID'],
        ['TRX-902', 'Tuhina Mukherjee', 'N/A', 'Numeric Check', 0.00, 'HANDLED_NULL'],
        ['TRX-903', 'Abhronila Das', '38500', 'Numeric Check', 38500.00, 'VALID'],
        ['TRX-904', 'Debangshu Roy', '#VALUE!', 'Numeric Check', 0.00, 'ERROR_INTERCEPTED'],
        ['TRX-905', 'Susmita Sen', '62000', 'Numeric Check', 62000.00, 'VALID']
      ]
    },
    {
      name: 'Topic9_Query_Folding_SQL',
      cols: [
        { header: 'Step_Name', key: 'step', width: 26 },
        { header: 'Power_Query_M_Step', key: 'm', width: 34 },
        { header: 'Folded_SQL_Clause', key: 'sql', width: 36 },
        { header: 'Folding_Engine_Status', key: 'status', width: 22 }
      ],
      rows: [
        ['1. Source', 'Sql.Database("SRV-HQ", "SalesDB")', 'SELECT * FROM dbo.FactSales', 'FOLDED (Server Execution)'],
        ['2. Filter Rows', 'Table.SelectRows(Source, each [Region]="East")', 'WHERE Region = \'East\'', 'FOLDED (Server Execution)'],
        ['3. Select Columns', 'Table.SelectColumns(..., {"ID","Amt"})', 'SELECT ID, Amount FROM ...', 'FOLDED (Server Execution)'],
        ['4. Text Transform', 'Table.TransformColumns(..., {{"Name", Text.Proper}})', 'N/A (Client Memory)', 'FOLDING_BROKEN (M Engine)']
      ]
    },
    {
      name: 'Topic10_Performance_Optimize',
      cols: [
        { header: 'Query_Name', key: 'q', width: 24 },
        { header: 'Unbuffered_Runtime_s', key: 'unbuf', width: 22 },
        { header: 'Buffered_Table_Buffer_s', key: 'buf', width: 24 },
        { header: 'Speedup_Multiplier', key: 'spd', width: 20 },
        { header: 'Memory_Footprint_MB', key: 'mem', width: 22 }
      ],
      rows: [
        ['FactSales_LookupJoin', 48.6, 2.3, '21.1x Faster', '64 MB'],
        ['MultiFileFolderMerge', 72.4, 6.1, '11.8x Faster', '128 MB'],
        ['RecursiveHierarchyScan', 115.0, 8.4, '13.6x Faster', '92 MB'],
        ['WebAPIPaginationBatch', 34.2, 4.0, '8.5x Faster', '45 MB']
      ]
    },
    {
      name: 'Topic11_Query_Organize_Docs',
      cols: [
        { header: 'Query_Group', key: 'grp', width: 24 },
        { header: 'Query_Name', key: 'name', width: 28 },
        { header: 'Load_To_DataModel', key: 'load', width: 20 },
        { header: 'Description_Documentation', key: 'desc', width: 36 }
      ],
      rows: [
        ['01_Parameters', 'pBarrackporeDataPath', 'Do Not Load (Staging)', 'Master directory path parameter for raw files'],
        ['02_Functions', 'fxNormalizeBranchSales', 'Do Not Load (Function)', 'Cleanses and standardizes raw branch CSVs'],
        ['03_Staging_Queries', 'stg_Branch_Barrackpore', 'Do Not Load (Staging)', 'Ingests and parses Barrackpore branch log'],
        ['04_Data_Model_Facts', 'Fact_ConsolidatedSales', 'Load to Power Pivot Model', 'Final unified sales fact table for DAX reporting']
      ]
    },
    {
      name: 'Topic12_Sales_Pipeline',
      cols: [
        { header: 'Transaction_ID', key: 'id', width: 18 },
        { header: 'Branch_Code', key: 'br', width: 18 },
        { header: 'Sales_Executive', key: 'exec', width: 22 },
        { header: 'Product_Category', key: 'cat', width: 22 },
        { header: 'Net_Sales_INR', key: 'amt', width: 18 },
        { header: 'GST_18Pct', key: 'gst', width: 18 },
        { header: 'Total_Invoice_INR', key: 'tot', width: 20 }
      ],
      rows: [
        ['TX-2026-001', 'BRK-01', 'Swadeep Banerjee', 'Electronics', 65000, 11700, 76700],
        ['TX-2026-002', 'SHY-02', 'Tuhina Mukherjee', 'Office Supplies', 42000, 7560, 49560],
        ['TX-2026-003', 'ICH-03', 'Abhronila Das', 'Hardware', 89000, 16020, 105020],
        ['TX-2026-004', 'NAI-04', 'Debangshu Roy', 'Electronics', 54000, 9720, 63720],
        ['TX-2026-005', 'TIT-05', 'Susmita Sen', 'Furniture', 71000, 12780, 83780]
      ]
    },
    {
      name: 'Topic13_ETL_Assessment',
      cols: [
        { header: 'Candidate_ID', key: 'id', width: 16 },
        { header: 'Candidate_Name', key: 'name', width: 22 },
        { header: 'Center_Location', key: 'loc', width: 20 },
        { header: 'M_Script_Score_100', key: 'score', width: 22 },
        { header: 'Query_Folding_Score', key: 'qf', width: 22 },
        { header: 'Certification_Status', key: 'cert', width: 22 }
      ],
      rows: [
        ['CNAT-2026-01', 'Swadeep Banerjee', 'Barrackpore', 98, 95, 'EXCELLENCE_HONOURS'],
        ['CNAT-2026-02', 'Tuhina Mukherjee', 'Shyamnagar', 96, 92, 'EXCELLENCE_HONOURS'],
        ['CNAT-2026-03', 'Abhronila Das', 'Ichapur', 94, 90, 'DISTINCTION'],
        ['CNAT-2026-04', 'Debangshu Roy', 'Naihati', 92, 88, 'DISTINCTION'],
        ['CNAT-2026-05', 'Susmita Sen', 'Titagarh', 95, 94, 'EXCELLENCE_HONOURS']
      ]
    }
  ];

  const students = ['Swadeep', 'Tuhina', 'Abhronila', 'Susmita', 'Debangshu', 'Rahul', 'Priya', 'Aniket', 'Sourav', 'Sneha'];
  const locations = ['Barrackpore', 'Shyamnagar', 'Ichapur', 'Naihati', 'Titagarh', 'Kolkata'];

  for (const sheetDef of topicSheets) {
    const ws = wb.addWorksheet(sheetDef.name, { views: [{ showGridLines: true }] });
    ws.columns = sheetDef.cols;
    
    // Format Header Row
    const headerRow = ws.getRow(1);
    headerRow.height = 26;
    headerRow.font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FFFFFFFF' } };
    headerRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center' };

    // Add predefined rows first
    sheetDef.rows.forEach(r => ws.addRow(r));

    // Pad with realistic synthetic rows up to 35 rows
    const currentRows = sheetDef.rows.length;
    for (let i = currentRows + 1; i <= 35; i++) {
      const student = students[(i - 1) % students.length];
      const loc = locations[(i - 1) % locations.length];
      
      const newRow = sheetDef.cols.map((col, cIdx) => {
        if (cIdx === 0) return `REC-${1000 + i}`;
        if (col.key.includes('name') || col.key.includes('exec') || col.key.includes('Candidate')) return student;
        if (col.key.includes('loc') || col.key.includes('br')) return loc;
        if (col.key.includes('amt') || col.key.includes('rate') || col.key.includes('score') || col.key.includes('rc')) return 40000 + i * 850;
        if (col.key.includes('gst')) return Math.round((40000 + i * 850) * 0.18);
        if (col.key.includes('tot')) return Math.round((40000 + i * 850) * 1.18);
        if (col.key.includes('status') || col.key.includes('st') || col.key.includes('cert')) return 'VERIFIED_ACTIVE';
        return `Value_${col.key}_${i}`;
      });
      ws.addRow(newRow);
    }

    // Apply alternate zebra striping & borders
    for (let rIdx = 2; rIdx <= ws.rowCount; rIdx++) {
      const row = ws.getRow(rIdx);
      row.height = 20;
      row.alignment = { vertical: 'middle' };
      if (rIdx % 2 === 0) {
        row.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF8FAFC' } };
      }
      row.eachCell({ includeEmpty: true }, cell => {
        cell.border = {
          top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
          bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
          left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
          right: { style: 'thin', color: { argb: 'FFE2E8F0' } }
        };
      });
    }
  }

  const outputDir = path.join(__dirname, 'excel_files');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  const out = path.join(outputDir, 'm_code_master.xlsx');
  await wb.xlsx.writeFile(out);
  console.log('✓ Successfully generated master m_code_master.xlsx with 14 topic sheets & protected Overview');
}

buildMasterWorkbook().catch(console.error);
