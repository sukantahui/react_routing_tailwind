// generate_practical_workbook.js
import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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

// =========================================================================
// DATA CONFIGURATION FOR ALL 12 PRACTICAL TOPICS
// =========================================================================
const topicsData = [
  // -----------------------------------------------------------------------
  // TOPIC 0: Text Clean & Case Normalization
  // -----------------------------------------------------------------------
  {
    code: 'Topic 00',
    shortTitle: 'Text Clean & Case',
    sheetName: 'T00 - Text Clean & Case',
    headers: ['Input A (Raw Text)', 'Input B (Secondary)', 'Input C', 'Input D', 'Your Practice Formula', 'Model Solution (Live)', 'Evaluated Output', 'Q# & Title', 'Function Used', 'Difficulty', 'Business Scenario', 'Logic & Pro Tip'],
    rows: [
      {
        row: 2,
        a: '  sWADEEP   bANERJEE ',
        b: '',
        c: '',
        d: '',
        formula: 'PROPER(TRIM(A2))',
        evaluated: '"Swadeep Banerjee"',
        title: 'Q1: Standardizing Mixed-Case Customer Names',
        func: 'PROPER & TRIM',
        diff: 'Basic',
        scenario: 'Customer registration forms contain erratic casing and extra spaces. Standardize into Title Case.',
        logic: 'TRIM strips extra outer and inner spaces; PROPER capitalizes the first letter of each word. Pro-Tip: Always nest TRIM inside PROPER.'
      },
      {
        row: 3,
        a: '  19abcde1234f1z5  ',
        b: '',
        c: '',
        d: '',
        formula: 'UPPER(TRIM(A3))',
        evaluated: '"19ABCDE1234F1Z5"',
        title: 'Q2: Vendor Tax ID Capitalization',
        func: 'UPPER & TRIM',
        diff: 'Basic',
        scenario: 'Vendors submit GSTIN/PAN tax numbers with random lowercase letters and spaces. Convert to uppercase for exact VLOOKUP matching.',
        logic: 'TRIM strips surrounding spaces; UPPER converts all alpha characters to uppercase.'
      },
      {
        row: 4,
        a: '  Tuhina.Mukherjee@AccoTax.IN  ',
        b: '',
        c: '',
        d: '',
        formula: 'LOWER(TRIM(A4))',
        evaluated: '"tuhina.mukherjee@accotax.in"',
        title: 'Q3: Normalizing User Login Usernames to Lowercase',
        func: 'LOWER & TRIM',
        diff: 'Basic',
        scenario: 'Active Directory SSO requires all corporate email usernames to be stored in pure lowercase with no whitespace.',
        logic: 'TRIM removes whitespace; LOWER converts all characters to lowercase.'
      },
      {
        row: 5,
        a: '   KOLKATA   WEST BENGAL   ',
        b: '',
        c: '',
        d: '',
        formula: 'PROPER(TRIM(A5))',
        evaluated: '"Kolkata West Bengal"',
        title: 'Q4: Multi-Space Elimination in Address Fields',
        func: 'TRIM & PROPER',
        diff: 'Basic',
        scenario: 'Warehouse dispatch addresses contain multiple consecutive space characters between words.',
        logic: 'TRIM collapses multiple internal spaces down to a single space; PROPER standardizes casing.'
      },
      {
        row: 6,
        a: 'swadeep@codernaccotax.co.in',
        b: 'SWADEEP@CODERNACCOTAX.CO.IN',
        c: '',
        d: '',
        formula: 'EXACT(A6, B6)',
        evaluated: 'FALSE',
        title: 'Q5: Case-Sensitive Password & Token Verification',
        func: 'EXACT',
        diff: 'Intermediate',
        scenario: 'Audit security logs require checking if the entered token in A6 exactly matches the server secret in B6 (case-sensitive).',
        logic: 'EXACT performs a strict case-sensitive binary string comparison. Standard =A6=B6 would return TRUE.'
      },
      {
        row: 7,
        a: 'Item\t101\nDelivered',
        b: '',
        c: '',
        d: '',
        formula: 'CLEAN(A7)',
        evaluated: '"Item101Delivered"',
        title: 'Q6: Stripping Non-Printable ASCII 0-31 Control Characters',
        func: 'CLEAN',
        diff: 'Intermediate',
        scenario: 'Legacy ERP database exports insert invisible ASCII 0-31 control characters, tab stops, and line feeds.',
        logic: 'CLEAN strips unprintable characters (ASCII 0 to 31) from the text.'
      },
      {
        row: 8,
        a: '  ACCOUNTS   PAYABLE  \n  AUDIT  ',
        b: '',
        c: '',
        d: '',
        formula: 'TRIM(CLEAN(PROPER(A8)))',
        evaluated: '"Accounts Payable Audit"',
        title: 'Q7: Chained 3-Stage Data Cleansing Pipeline',
        func: 'TRIM, CLEAN & PROPER',
        diff: 'Advanced',
        scenario: 'Execute a full ETL cleansing pipeline on a single dirty string containing line feeds, outer spaces, and mixed case.',
        logic: 'PROPER capitalizes words -> CLEAN strips line feeds -> TRIM condenses remaining spaces.'
      },
      {
        row: 9,
        a: 'TOTAL_EXPENSES',
        b: '',
        c: '',
        d: '',
        formula: 'LOWER(A9)',
        evaluated: '"total_expenses"',
        title: 'Q8: Database Schema Column Name Normalization',
        func: 'LOWER',
        diff: 'Basic',
        scenario: 'Normalize uppercase SQL database column names into snake_case compliant field identifiers.',
        logic: 'LOWER converts all alphabetic characters to lowercase while preserving underscores.'
      },
      {
        row: 10,
        a: 'mcdonald',
        b: '',
        c: '',
        d: '',
        formula: 'PROPER(A10)',
        evaluated: '"Mcdonald"',
        title: 'Q9: Surnames with Internal Capitalization Edge Cases',
        func: 'PROPER (Edge-Case Study)',
        diff: 'Intermediate',
        scenario: 'Examine PROPER behavior on Scottish surnames (e.g. McDonald).',
        logic: 'PROPER capitalizes the first character only. Compound internal capitals require custom formula slicing.'
      },
      {
        row: 11,
        a: '₹' + String.fromCharCode(160) + '50,000',
        b: '',
        c: '',
        d: '',
        formula: 'TRIM(SUBSTITUTE(A11, CHAR(160), " "))',
        evaluated: '"₹ 50,000"',
        title: 'Q10: Web Non-Breaking Space (CHAR 160) Cleansing',
        func: 'TRIM, SUBSTITUTE & CHAR',
        diff: 'Advanced',
        scenario: 'Data scraped from HTML web tables contains non-breaking spaces (ASCII 160) which standard TRIM cannot remove.',
        logic: 'SUBSTITUTE replaces CHAR(160) with standard space CHAR(32); TRIM then eliminates surrounding whitespace.'
      }
    ]
  },

  // -----------------------------------------------------------------------
  // TOPIC 1: Substrings & Search
  // -----------------------------------------------------------------------
  {
    code: 'Topic 01',
    shortTitle: 'Substrings & Search',
    sheetName: 'T01 - Substrings & Search',
    headers: ['Input A (Source String)', 'Input B (Param)', 'Input C', 'Input D', 'Your Practice Formula', 'Model Solution (Live)', 'Evaluated Output', 'Q# & Title', 'Function Used', 'Difficulty', 'Business Scenario', 'Logic & Pro Tip'],
    rows: [
      {
        row: 2,
        a: 'MKT-23-8491',
        b: '',
        c: '',
        d: '',
        formula: 'LEFT(A2, 3)',
        evaluated: '"MKT"',
        title: 'Q1: Department Prefix Extraction',
        func: 'LEFT',
        diff: 'Basic',
        scenario: 'Staff badges are structured as DEP-YY-SERIAL. Extract the 3-character departmental prefix.',
        logic: 'LEFT(A2, 3) takes the first 3 characters starting from index 1.'
      },
      {
        row: 3,
        a: 'WB-HYD-50284',
        b: '',
        c: '',
        d: '',
        formula: '--RIGHT(A3, 5)',
        evaluated: '50284',
        title: 'Q2: Numeric Serial Suffix Extraction & Coercion',
        func: 'RIGHT & Double Unary (--)',
        diff: 'Basic',
        scenario: 'Extract the trailing 5-digit serial number from barcode labels and convert it to a real calculable integer.',
        logic: 'RIGHT(A3, 5) extracts "50284"; double unary (--) coerces the text string into a numeric integer.'
      },
      {
        row: 4,
        a: 'KOL-2025-BATCH09',
        b: '',
        c: '',
        d: '',
        formula: 'MID(A4, 5, 4)',
        evaluated: '"2025"',
        title: 'Q3: Fixed Middle Token Extraction',
        func: 'MID',
        diff: 'Intermediate',
        scenario: 'Extract the 4-digit calendar year token starting at character position 5 from component lot codes.',
        logic: 'MID(A4, 5, 4) starts at index 5 and extracts exactly 4 characters.'
      },
      {
        row: 5,
        a: 'tuhina.das@codernaccotax.co.in',
        b: '',
        c: '',
        d: '',
        formula: 'LEFT(A5, FIND("@", A5) - 1)',
        evaluated: '"tuhina.das"',
        title: 'Q4: Dynamic Username Parsing Before Delimiter',
        func: 'LEFT & FIND',
        diff: 'Intermediate',
        scenario: 'Extract variable-length username prefix appearing prior to the "@" sign.',
        logic: 'FIND("@", A5) locates the delimiter index; LEFT extracts characters up to index - 1.'
      },
      {
        row: 6,
        a: 'debangshu.roy@codernaccotax.co.in',
        b: '',
        c: '',
        d: '',
        formula: 'MID(A6, FIND("@", A6) + 1, LEN(A6))',
        evaluated: '"codernaccotax.co.in"',
        title: 'Q5: Dynamic Domain Name Parsing After Delimiter',
        func: 'MID, FIND & LEN',
        diff: 'Intermediate',
        scenario: 'Extract domain hostnames following the "@" symbol across variable length strings.',
        logic: 'MID starts at FIND("@", A6)+1 and uses LEN(A6) as a safe upper bound.'
      },
      {
        row: 7,
        a: '19ABCDE1234F1Z5',
        b: '',
        c: '',
        d: '',
        formula: 'IF(LEN(A7) = 15, "Valid Length", "Invalid Length")',
        evaluated: '"Valid Length"',
        title: 'Q6: Character Length Audit for Tax ID Compliance',
        func: 'LEN & IF',
        diff: 'Basic',
        scenario: 'Verify if Indian GSTIN registration numbers have exactly 15 alphanumeric characters.',
        logic: 'LEN(A7) counts total characters; IF validates whether the count equals 15.'
      },
      {
        row: 8,
        a: 'INV-2026-CONFIDENTIAL-PAID',
        b: '',
        c: '',
        d: '',
        formula: 'ISNUMBER(SEARCH("confidential", A8))',
        evaluated: 'TRUE',
        title: 'Q7: Case-Insensitive Substring Search',
        func: 'SEARCH & ISNUMBER',
        diff: 'Intermediate',
        scenario: 'Check if memo strings contain the keyword "confidential" regardless of upper/lower casing.',
        logic: 'SEARCH is case-insensitive and returns the character index; ISNUMBER returns TRUE if found.'
      },
      {
        row: 9,
        a: 'Error 404: Page Not Found in Server 404',
        b: '',
        c: '',
        d: '',
        formula: 'FIND("404", A9, 12)',
        evaluated: '37',
        title: 'Q8: Starting Offset Position Search (2nd Occurrence)',
        func: 'FIND with start_num',
        diff: 'Advanced',
        scenario: 'Find the starting character position of the second occurrence of "404" in system logs.',
        logic: 'Supplying start_num = 12 skips the first instance at index 7 and locates the second instance at index 37.'
      },
      {
        row: 10,
        a: 'Subhashree Chattopadhyay',
        b: '',
        c: '',
        d: '',
        formula: 'RIGHT(A10, LEN(A10) - FIND(" ", A10))',
        evaluated: '"Chattopadhyay"',
        title: 'Q9: Dynamic Last Name Extraction',
        func: 'RIGHT, LEN & FIND',
        diff: 'Intermediate',
        scenario: 'Extract variable-length surnames appearing after the single space delimiter.',
        logic: 'LEN(A10) - FIND(" ", A10) calculates the exact length of the surname, which RIGHT slices cleanly.'
      },
      {
        row: 11,
        a: 'REF#98421:Approved',
        b: '',
        c: '',
        d: '',
        formula: 'MID(A11, FIND("#", A11) + 1, FIND(":", A11) - FIND("#", A11) - 1)',
        evaluated: '"98421"',
        title: 'Q10: Substring Extraction Between Two Distinct Delimiters',
        func: 'MID & Dual FIND',
        diff: 'Advanced',
        scenario: 'Extract the numerical tracking reference located between "#" and ":".',
        logic: 'Find the start after "#" and calculate the character length between ":" and "#".'
      }
    ]
  },

  // -----------------------------------------------------------------------
  // TOPIC 2: Concatenation & Join
  // -----------------------------------------------------------------------
  {
    code: 'Topic 02',
    shortTitle: 'Concatenation & Join',
    sheetName: 'T02 - Concatenation & Join',
    headers: ['Input A', 'Input B', 'Input C', 'Input D', 'Your Practice Formula', 'Model Solution (Live)', 'Evaluated Output', 'Q# & Title', 'Function Used', 'Difficulty', 'Business Scenario', 'Logic & Pro Tip'],
    rows: [
      {
        row: 2,
        a: 'Swadeep',
        b: 'Banerjee',
        c: '',
        d: '',
        formula: 'A2 & " " & B2',
        evaluated: '"Swadeep Banerjee"',
        title: 'Q1: Basic Full Name Assembly via Ampersand (&)',
        func: '& Operator',
        diff: 'Basic',
        scenario: 'Combine First Name in A2 and Last Name in B2 into a standard Full Name string.',
        logic: 'The & operator concatenates strings with an explicit space separator " ".'
      },
      {
        row: 3,
        a: 'Excel',
        b: 'VBA',
        c: '',
        d: 'SQL',
        formula: 'TEXTJOIN(", ", TRUE, A3:D3)',
        evaluated: '"Excel, VBA, SQL"',
        title: 'Q2: Skill Tags Combination with Blank Suppression',
        func: 'TEXTJOIN',
        diff: 'Intermediate',
        scenario: 'Join candidate technical skills across columns while automatically skipping empty blank cells.',
        logic: 'TEXTJOIN with ignore_empty = TRUE skips empty cells without creating double delimiters (", ,").'
      },
      {
        row: 4,
        a: '14 Riverside Road',
        b: 'Barrackpore',
        c: 'West Bengal',
        d: '700120',
        formula: 'TEXTJOIN(CHAR(10), TRUE, A4, B4, C4 & " - " & D4)',
        evaluated: '"14 Riverside Road\\nBarrackpore\\nWest Bengal - 700120"',
        title: 'Q3: Multi-Line Mailing Label Generation',
        func: 'TEXTJOIN & CHAR(10)',
        diff: 'Intermediate',
        scenario: 'Assemble a multi-line postal shipping label in a single cell using in-cell line feeds.',
        logic: 'CHAR(10) creates line feeds; combine State and PIN before joining with Address and City.'
      },
      {
        row: 5,
        a: 'Q1',
        b: 'Q2',
        c: 'Q3',
        d: 'Q4',
        formula: 'CONCAT(A5:D5)',
        evaluated: '"Q1Q2Q3Q4"',
        title: 'Q4: Contiguous Range Concatenation',
        func: 'CONCAT',
        diff: 'Basic',
        scenario: 'Join an array of 4 quarter codes into a continuous string without individual arguments.',
        logic: 'CONCAT accepts range arguments (A5:D5) natively unlike legacy CONCATENATE.'
      },
      {
        row: 6,
        a: 'Aniket Verma',
        b: 1250000,
        c: '',
        d: '',
        formula: '"Employee: " & A6 & " | Total CTC: " & TEXT(B6, "₹#,##,##0.00")',
        evaluated: '"Employee: Aniket Verma | Total CTC: ₹12,50,000.00"',
        title: 'Q5: Embedding Formatted Numbers Inside Text Strings',
        func: '& and TEXT',
        diff: 'Intermediate',
        scenario: 'Build executive summary cards embedding formatted Indian currency numbers into text sentences.',
        logic: 'Wrap numeric values in TEXT(val, "mask") so currency symbols and thousand commas are preserved.'
      },
      {
        row: 7,
        a: '1001',
        b: '1002',
        c: '1003',
        d: '1004',
        formula: '"\'" & TEXTJOIN("\', \'", TRUE, A7:D7) & "\'"',
        evaluated: '"\'1001\', \'1002\', \'1003\', \'1004\'"',
        title: 'Q6: SQL IN Clause Query String Generation',
        func: 'TEXTJOIN & Quotes',
        diff: 'Advanced',
        scenario: 'Generate SQL WHERE ID IN (\'1001\', \'1002\', ...) parameter arrays from Excel rows.',
        logic: 'Use delimiter "\', \'" and wrap exterior with single quote literals "\'".'
      },
      {
        row: 8,
        a: 'Invoice',
        b: 452,
        c: '',
        d: '',
        formula: 'A8 & "-" & TEXT(B8, "00000")',
        evaluated: '"Invoice-00452"',
        title: 'Q7: Fixed-Width Zero-Padded Document Identifiers',
        func: '& and TEXT',
        diff: 'Basic',
        scenario: 'Create standardized 5-digit zero-padded invoice numbers (e.g. Invoice-00452).',
        logic: 'TEXT(B8, "00000") pads integer 452 with leading zeros to 5 digits.'
      },
      {
        row: 9,
        a: 'FIN',
        b: 'AUDIT',
        c: '2026',
        d: '001',
        formula: 'TEXTJOIN("-", TRUE, A9:D9)',
        evaluated: '"FIN-AUDIT-2026-001"',
        title: 'Q8: Standardized Multi-Token Asset SKU Creation',
        func: 'TEXTJOIN',
        diff: 'Basic',
        scenario: 'Assemble standardized hyphenated asset barcodes from 4 discrete parameter cells.',
        logic: 'TEXTJOIN("-", TRUE, A9:D9) joins all 4 tokens separated by hyphens.'
      },
      {
        row: 10,
        a: 'Subhajit',
        b: 'Pal',
        c: 'subhajit.pal@codernaccotax.co.in',
        d: '',
        formula: 'A10 & " " & B10 & " <" & C10 & ">"',
        evaluated: '"Subhajit Pal <subhajit.pal@codernaccotax.co.in>"',
        title: 'Q9: RFC 2822 Email Header Assembly',
        func: '& Operator',
        diff: 'Basic',
        scenario: 'Format email recipients as "First Last <email@domain.com>" for bulk mail merge.',
        logic: 'Concatenate name parts with angle bracket delimiters enclosing email.'
      },
      {
        row: 11,
        a: 'Kolkata',
        b: 'Delhi',
        c: 'Mumbai',
        d: 'Bengaluru',
        formula: 'TEXTJOIN(" → ", TRUE, A11:D11)',
        evaluated: '"Kolkata → Delhi → Mumbai → Bengaluru"',
        title: 'Q10: Flight Route & Supply Chain Path Sequencing',
        func: 'TEXTJOIN with Unicode Arrow',
        diff: 'Intermediate',
        scenario: 'Create visual multi-city flight and logistics itineraries connected by arrow symbols.',
        logic: 'TEXTJOIN with Unicode arrow " → " connects all route waypoint cells.'
      }
    ]
  },

  // -----------------------------------------------------------------------
  // TOPIC 3: Replace & Substitution
  // -----------------------------------------------------------------------
  {
    code: 'Topic 03',
    shortTitle: 'Replace & Substitution',
    sheetName: 'T03 - Replace & Substitution',
    headers: ['Input A (Target Text)', 'Input B (Param)', 'Input C', 'Input D', 'Your Practice Formula', 'Model Solution (Live)', 'Evaluated Output', 'Q# & Title', 'Function Used', 'Difficulty', 'Business Scenario', 'Logic & Pro Tip'],
    rows: [
      {
        row: 2,
        a: 'PROMO2025',
        b: 'Promo2025',
        c: '',
        d: '',
        formula: 'EXACT(A2, B2)',
        evaluated: 'FALSE',
        title: 'Q1: Case-Sensitive Promo Code Validation',
        func: 'EXACT',
        diff: 'Basic',
        scenario: 'Verify whether promo coupon entries match master uppercase tokens exactly.',
        logic: 'EXACT verifies strict character case matching.'
      },
      {
        row: 3,
        a: '4532890123456789',
        b: '',
        c: '',
        d: '',
        formula: 'REPLACE(A3, 1, 12, "XXXXXXXXXXXX")',
        evaluated: '"XXXXXXXXXXXX6789"',
        title: 'Q2: Credit Card Masking (PCI-DSS Compliance)',
        func: 'REPLACE',
        diff: 'Intermediate',
        scenario: 'Mask the first 12 digits of a 16-digit payment card number with "X" characters.',
        logic: 'REPLACE(A3, 1, 12, "XXXXXXXXXXXX") overwrites characters 1 to 12 with 12 Xs.'
      },
      {
        row: 4,
        a: 'KOL-FIN-2025-001',
        b: '',
        c: '',
        d: '',
        formula: 'SUBSTITUTE(A4, "-", "/", 2)',
        evaluated: '"KOL-FIN/2025-001"',
        title: 'Q3: Specific N-th Delimiter Replacement',
        func: 'SUBSTITUTE (instance_num)',
        diff: 'Intermediate',
        scenario: 'Replace only the second hyphen with a slash while preserving all other hyphens.',
        logic: 'Supplying instance_num = 2 targets only the 2nd occurrence of "-".'
      },
      {
        row: 5,
        a: 'URGENT,RECONCILED,FLAGGED,PENDING,AUDIT',
        b: '',
        c: '',
        d: '',
        formula: 'LEN(A5)-LEN(SUBSTITUTE(A5, ",", ""))+1',
        evaluated: '5',
        title: 'Q4: Counting Comma-Separated Items in a Cell',
        func: 'LEN & SUBSTITUTE',
        diff: 'Intermediate',
        scenario: 'Count total items in a comma-delimited audit status list.',
        logic: 'Total items = (Original Length - Length without commas) + 1.'
      },
      {
        row: 6,
        a: '₹' + String.fromCharCode(160) + '95,000',
        b: '',
        c: '',
        d: '',
        formula: 'TRIM(SUBSTITUTE(A6, CHAR(160), " "))',
        evaluated: '"₹ 95,000"',
        title: 'Q5: Non-Breaking Space (CHAR 160) Substitution',
        func: 'TRIM, SUBSTITUTE & CHAR',
        diff: 'Intermediate',
        scenario: 'Sanitize web-scraped financial figures containing ASCII 160 non-breaking spaces.',
        logic: 'Convert CHAR(160) to standard space CHAR(32) before trimming.'
      },
      {
        row: 7,
        a: '(033) 2456-7890',
        b: '',
        c: '',
        d: '',
        formula: 'SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(A7, "(", ""), ")", ""), " ", ""), "-", "")',
        evaluated: '"03324567890"',
        title: 'Q6: Multi-Character Nested Phone Stripping',
        func: 'Nested SUBSTITUTE',
        diff: 'Advanced',
        scenario: 'Strip parentheses, spaces, and hyphens from landline phone numbers in one formula.',
        logic: 'Chain 4 nested SUBSTITUTE functions to remove each punctuation mark sequentially.'
      },
      {
        row: 8,
        a: 'annual_report_2026.png',
        b: '',
        c: '',
        d: '',
        formula: 'REPLACE(A8, FIND(".", A8) + 1, LEN(A8) - FIND(".", A8), "webp")',
        evaluated: '"annual_report_2026.webp"',
        title: 'Q7: Dynamic File Extension Swapping',
        func: 'REPLACE & FIND',
        diff: 'Intermediate',
        scenario: 'Change file extensions from .png to modern .webp regardless of filename length.',
        logic: 'Locate period position via FIND and replace remaining characters with "webp".'
      },
      {
        row: 9,
        a: 'Batch-v1-prod-V1-final',
        b: '',
        c: '',
        d: '',
        formula: 'SUBSTITUTE(A9, "V1", "V2")',
        evaluated: '"Batch-v1-prod-V2-final"',
        title: 'Q8: Case-Sensitive Substitution Match',
        func: 'SUBSTITUTE',
        diff: 'Basic',
        scenario: 'Replace uppercase "V1" with "V2" without altering lowercase "v1".',
        logic: 'SUBSTITUTE is strictly case-sensitive, replacing only exact uppercase "V1".'
      },
      {
        row: 10,
        a: 'C:/Reports/Financials/2026/Q4_Audit.xlsx',
        b: '',
        c: '',
        d: '',
        formula: 'SUBSTITUTE(A10, "/", "|", LEN(A10)-LEN(SUBSTITUTE(A10, "/", "")))',
        evaluated: '"C:/Reports/Financials/2026|Q4_Audit.xlsx"',
        title: 'Q9: Replacing Only the Last Delimiter in a Path',
        func: 'SUBSTITUTE & Dynamic Instance',
        diff: 'Advanced',
        scenario: 'Replace the final slash before the filename with a pipe character.',
        logic: 'Calculate total slash count using LEN difference and feed it into instance_num.'
      },
      {
        row: 11,
        a: 'EMP1008',
        b: '',
        c: '',
        d: '',
        formula: 'REPLACE(A11, 4, 0, "-")',
        evaluated: '"EMP-1008"',
        title: 'Q10: Zero-Character Insertion via REPLACE',
        func: 'REPLACE (0 chars)',
        diff: 'Basic',
        scenario: 'Insert a hyphen between letters and numbers without overwriting existing characters.',
        logic: 'Setting num_chars = 0 inserts text at start_num without deleting characters.'
      }
    ]
  },

  // -----------------------------------------------------------------------
  // TOPIC 4: Number & Text Format
  // -----------------------------------------------------------------------
  {
    code: 'Topic 04',
    shortTitle: 'Number & Text Format',
    sheetName: 'T04 - Number & Text Format',
    headers: ['Input A (Raw Value)', 'Input B (Param)', 'Input C', 'Input D', 'Your Practice Formula', 'Model Solution (Live)', 'Evaluated Output', 'Q# & Title', 'Function Used', 'Difficulty', 'Business Scenario', 'Logic & Pro Tip'],
    rows: [
      {
        row: 2,
        a: 1849200.75,
        b: '',
        c: '',
        d: '',
        formula: 'TEXT(A2, "₹#,##,##0.00")',
        evaluated: '"₹18,49,200.75"',
        title: 'Q1: Indian Lakh/Crore Currency Formatting',
        func: 'TEXT',
        diff: 'Basic',
        scenario: 'Format numeric revenue in Indian Lakh/Crore comma grouping system with rupee symbol.',
        logic: 'Format mask "₹#,##,##0.00" groups thousands and lakhs correctly.'
      },
      {
        row: 3,
        a: '1.250.450,85 €',
        b: '',
        c: '',
        d: '',
        formula: 'NUMBERVALUE(TRIM(SUBSTITUTE(A3, "€", "")), ",", ".")',
        evaluated: '1250450.85',
        title: 'Q2: European Decimal/Period Number Parsing',
        func: 'NUMBERVALUE & SUBSTITUTE',
        diff: 'Intermediate',
        scenario: 'Parse German/European invoice numbers where commas are decimals and periods are thousand separators.',
        logic: 'NUMBERVALUE(text, ",", ".") specifies comma decimal and period thousand separator.'
      },
      {
        row: 4,
        a: ' 42.50 ',
        b: '',
        c: '',
        d: '',
        formula: 'VALUE(A4)',
        evaluated: '42.5',
        title: 'Q3: Standard Text Number Coercion',
        func: 'VALUE',
        diff: 'Basic',
        scenario: 'Convert left-aligned text strings into real calculable floating-point numbers.',
        logic: 'VALUE parses text representations of numbers into true numeric values.'
      },
      {
        row: 5,
        a: 45884, // 15-Aug-2025
        b: '',
        c: '',
        d: '',
        formula: 'TEXT(A5, "dddd, dd mmmm yyyy")',
        evaluated: '"Friday, 15 August 2025"',
        title: 'Q4: Full Formal Date String Formatting',
        func: 'TEXT (Date Mask)',
        diff: 'Basic',
        scenario: 'Format serial date numbers into formal board-level report dates with full weekday and month names.',
        logic: 'Mask "dddd, dd mmmm yyyy" produces "Friday, 15 August 2025".'
      },
      {
        row: 6,
        a: 0.1875,
        b: '',
        c: '',
        d: '',
        formula: 'TEXT(A6, "0.0%")',
        evaluated: '"18.8%"',
        title: 'Q5: Percentage Formatting with Rounding',
        func: 'TEXT (Percent Mask)',
        diff: 'Basic',
        scenario: 'Convert decimal multipliers to rounded percentage strings for executive dashboards.',
        logic: 'Mask "0.0%" multiplies by 100 and formats to 1 decimal place with "%".'
      },
      {
        row: 7,
        a: 1.5, // 36 hours
        b: '',
        c: '',
        d: '',
        formula: 'TEXT(A7, "[h]:mm:ss")',
        evaluated: '"36:00:00"',
        title: 'Q6: Elapsed Time Exceeding 24 Hours',
        func: 'TEXT ([h] Mask)',
        diff: 'Intermediate',
        scenario: 'Format cumulative machine run hours exceeding 24 hours without resetting to 0.',
        logic: 'Enclosing hours in square brackets [h] instructs Excel to display total elapsed hours.'
      },
      {
        row: 8,
        a: 9830123456,
        b: '',
        c: '',
        d: '',
        formula: 'TEXT(A8, "+91 00000-00000")',
        evaluated: '"+91 98301-23456"',
        title: 'Q7: Telephone Number Formatting Mask',
        func: 'TEXT',
        diff: 'Basic',
        scenario: 'Format 10-digit mobile integers into standard national telephone display syntax.',
        logic: 'Mask "+91 00000-00000" formats raw integer digits into grouped phone format.'
      },
      {
        row: 9,
        a: 12450000,
        b: '',
        c: '',
        d: '',
        formula: 'TEXT(A9, "$#,##0.00,,\\M")',
        evaluated: '"$12.45M"',
        title: 'Q8: Financial Millions Scaling Mask',
        func: 'TEXT (Double Comma Scaling)',
        diff: 'Advanced',
        scenario: 'Format large eight-figure financial revenues scaled down to Millions ($M).',
        logic: 'Two trailing commas (,,) divide the number by 1,000,000 for compact reporting.'
      },
      {
        row: 10,
        a: -4500.5,
        b: '',
        c: '',
        d: '',
        formula: 'TEXT(A10, "$#,##0.00;($#,##0.00);\"-\"")',
        evaluated: '"($4,500.50)"',
        title: 'Q9: 4-Section Accounting Format Specification',
        func: 'TEXT (Accounting Mask)',
        diff: 'Advanced',
        scenario: 'Apply standard 4-section accounting format (Positive; Negative; Zero; Text).',
        logic: 'Enclose negative numbers in accounting parentheses and display zero as hyphen.'
      },
      {
        row: 11,
        a: 45884, // 15-Aug-2025
        b: 485000,
        c: '',
        d: '',
        formula: '"Report Date: " & TEXT(A11, "dd-mmm-yyyy") & " | Revenue: " & TEXT(B11, "$#,##0")',
        evaluated: '"Report Date: 15-Aug-2025 | Revenue: $485,000"',
        title: 'Q10: Composite Headline KPI String Generation',
        func: '& and Dual TEXT',
        diff: 'Intermediate',
        scenario: 'Assemble formatted dates and revenue figures into a single headline card.',
        logic: 'Format date with "dd-mmm-yyyy" and revenue with "$#,##0" before string concatenation.'
      }
    ]
  },

  // -----------------------------------------------------------------------
  // TOPIC 5: Core Date Operations
  // -----------------------------------------------------------------------
  {
    code: 'Topic 05',
    shortTitle: 'Core Date Operations',
    sheetName: 'T05 - Core Date Operations',
    headers: ['Input A (Year / Date)', 'Input B (Month / Offset)', 'Input C (Day)', 'Input D', 'Your Practice Formula', 'Model Solution (Live)', 'Evaluated Output', 'Q# & Title', 'Function Used', 'Difficulty', 'Business Scenario', 'Logic & Pro Tip'],
    rows: [
      {
        row: 2,
        a: 2025,
        b: 8,
        c: 15,
        d: '',
        formula: 'DATE(A2, B2, C2)',
        evaluated: '45884 (15-Aug-2025)',
        title: 'Q1: Safe Date Construction from Integer Tokens',
        func: 'DATE',
        diff: 'Basic',
        scenario: 'Build valid serial dates from distinct year, month, and day integer columns.',
        logic: 'DATE(year, month, day) constructs an unambiguous serial date number.'
      },
      {
        row: 3,
        a: 23941, // 18-Jul-1965
        b: '',
        c: '',
        d: '',
        formula: 'YEAR(A3)',
        evaluated: '1965',
        title: 'Q2: Year Component Extraction for Cohort Analysis',
        func: 'YEAR',
        diff: 'Basic',
        scenario: 'Extract the 4-digit birth year from employee date serial numbers.',
        logic: 'YEAR(A3) isolates the 4-digit year component.'
      },
      {
        row: 4,
        a: '15-Aug-2025',
        b: '',
        c: '',
        d: '',
        formula: 'DATEVALUE(A4)',
        evaluated: '45884 (15-08-2025)',
        title: 'Q3: Text Date String to Serial Number Conversion',
        func: 'DATEVALUE',
        diff: 'Basic',
        scenario: 'Convert imported text dates into real Excel date serial numbers.',
        logic: 'DATEVALUE converts recognizable date strings into integer serial dates.'
      },
      {
        row: 5,
        a: 45884, // 15-Aug-2025 (Friday)
        b: '',
        c: '',
        d: '',
        formula: 'WEEKDAY(A5, 2)',
        evaluated: '5 (Friday)',
        title: 'Q4: Weekday Number Extraction (Monday = 1)',
        func: 'WEEKDAY (return_type 2)',
        diff: 'Basic',
        scenario: 'Determine weekday indices where Monday=1 through Sunday=7 for shift scheduling.',
        logic: 'WEEKDAY with return_type 2 maps Monday=1 and Friday=5.'
      },
      {
        row: 6,
        a: 45884, // 15-Aug-2025
        b: 90,
        c: '',
        d: '',
        formula: 'A6 + B6',
        evaluated: '45974 (13-Nov-2025)',
        title: 'Q5: Simple Calendar Day Addition',
        func: '+ Operator',
        diff: 'Basic',
        scenario: 'Calculate warranty expiration date exactly 90 calendar days post purchase.',
        logic: 'Because dates are integer day counters, adding 90 advances the date by 90 days.'
      },
      {
        row: 7,
        a: 45884, // 15-Aug-2025
        b: '',
        c: '',
        d: '',
        formula: 'IF(WEEKDAY(A7, 2) >= 6, "Weekend", "Weekday")',
        evaluated: '"Weekday"',
        title: 'Q6: Business vs Weekend Classification Rule',
        func: 'IF & WEEKDAY',
        diff: 'Basic',
        scenario: 'Flag whether invoice settlement dates fall on a weekend (Saturday/Sunday).',
        logic: 'WEEKDAY(date, 2) >= 6 identifies Saturday (6) and Sunday (7).'
      },
      {
        row: 8,
        a: 45884, // 15-Aug-2025
        b: '',
        c: '',
        d: '',
        formula: 'DATE(YEAR(A8), MONTH(A8) + 1, 0)',
        evaluated: '45900 (31-Aug-2025)',
        title: 'Q7: Month-End Date Calculation via DATE Day 0',
        func: 'DATE (Day 0 Trick)',
        diff: 'Intermediate',
        scenario: 'Find the last calendar day of the month without using EOMONTH.',
        logic: 'Supplying day 0 of month + 1 automatically rolls back to the last day of the current month.'
      },
      {
        row: 9,
        a: 45884, // 15-Aug-2025
        b: '',
        c: '',
        d: '',
        formula: '"Q" & ROUNDUP(MONTH(A9) / 3, 0)',
        evaluated: '"Q3"',
        title: 'Q8: Calendar Quarter Derivation from Date',
        func: 'ROUNDUP & MONTH',
        diff: 'Intermediate',
        scenario: 'Derive calendar quarter (Q1-Q4) dynamically from transaction dates.',
        logic: 'Dividing month (1-12) by 3 and rounding up computes the quarter number.'
      },
      {
        row: 10,
        a: 45658, // 01-Jan-2025
        b: 45884, // 15-Aug-2025
        c: '',
        d: '',
        formula: 'B10 - A10 + 1',
        evaluated: '227',
        title: 'Q9: Inclusive Days Count Between Two Dates',
        func: '- Operator (+1)',
        diff: 'Basic',
        scenario: 'Calculate total inclusive days in a project sprint window.',
        logic: 'Subtracting start date from end date and adding 1 gives inclusive calendar days.'
      },
      {
        row: 11,
        a: 45884, // 15-Aug-2025
        b: '',
        c: '',
        d: '',
        formula: 'DATE(YEAR(A11), 1, 1)',
        evaluated: '45658 (01-Jan-2025)',
        title: 'Q10: First Day of Year (YTD Base) Date',
        func: 'DATE & YEAR',
        diff: 'Basic',
        scenario: 'Determine January 1 of the current transaction year for YTD aggregations.',
        logic: 'DATE(YEAR(A11), 1, 1) returns January 1 of that year.'
      }
    ]
  },

  // -----------------------------------------------------------------------
  // TOPIC 6: Temporal Shifts & EOM
  // -----------------------------------------------------------------------
  {
    code: 'Topic 06',
    shortTitle: 'Temporal Shifts & EOM',
    sheetName: 'T06 - Temporal Shifts & EOM',
    headers: ['Input A (Start Date)', 'Input B (End Date / Months)', 'Input C', 'Input D', 'Your Practice Formula', 'Model Solution (Live)', 'Evaluated Output', 'Q# & Title', 'Function Used', 'Difficulty', 'Business Scenario', 'Logic & Pro Tip'],
    rows: [
      {
        row: 2,
        a: 45823, // 15-Jun-2025
        b: '',
        c: '',
        d: '',
        formula: 'IFS(TODAY()-A2<=30, "0-30 Days", TODAY()-A2<=60, "31-60 Days", TODAY()-A2<=90, "61-90 Days", TRUE, "90+ Days Overdue")',
        evaluated: '"Dynamic Category"',
        title: 'Q1: Accounts Receivable Overdue Aging Buckets',
        func: 'IFS & TODAY',
        diff: 'Intermediate',
        scenario: 'Categorize overdue invoices into 30-day aging buckets based on days elapsed.',
        logic: 'TODAY() - A2 computes elapsed days; IFS evaluates aging tier thresholds.'
      },
      {
        row: 3,
        a: 45884, // 15-Aug-2025
        b: 18,
        c: '',
        d: '',
        formula: 'EDATE(A3, B3)',
        evaluated: '46433 (15-Feb-2027)',
        title: 'Q2: Future Date Shift by N Calendar Months',
        func: 'EDATE',
        diff: 'Basic',
        scenario: 'Calculate maturity date for an 18-month commercial deposit.',
        logic: 'EDATE(date, 18) shifts exactly 18 calendar months forward.'
      },
      {
        row: 4,
        a: 45700, // 12-Feb-2025
        b: '',
        c: '',
        d: '',
        formula: 'EOMONTH(A4, 0)',
        evaluated: '45716 (28-Feb-2025)',
        title: 'Q3: Month-End Date Calculation (EOMONTH)',
        func: 'EOMONTH',
        diff: 'Basic',
        scenario: 'Calculate invoice month-end cutoff date for accounting accruals.',
        logic: 'EOMONTH(date, 0) returns the last day of the current month.'
      },
      {
        row: 5,
        a: 36526, // 01-Jan-2000
        b: 45884, // 15-Aug-2025
        c: '',
        d: '',
        formula: 'DATEDIF(A5, B5, "Y")',
        evaluated: '25',
        title: 'Q4: Completed Years of Service (DATEDIF)',
        func: 'DATEDIF ("Y")',
        diff: 'Basic',
        scenario: 'Calculate completed years of employee tenure between Hire Date and Evaluation Date.',
        logic: 'DATEDIF with code "Y" returns full completed years.'
      },
      {
        row: 6,
        a: 36526, // 01-Jan-2000
        b: 45884, // 15-Aug-2025
        c: '',
        d: '',
        formula: 'DATEDIF(A6, B6, "YM")',
        evaluated: '7',
        title: 'Q5: Residual Months Calculation Excluding Years',
        func: 'DATEDIF ("YM")',
        diff: 'Intermediate',
        scenario: 'Extract remaining months of tenure excluding completed full years.',
        logic: 'DATEDIF with code "YM" returns residual months modulo 12.'
      },
      {
        row: 7,
        a: 45658, // 01-Jan-2025
        b: 45884, // 15-Aug-2025
        c: '',
        d: '',
        formula: 'YEARFRAC(A7, B7, 1)',
        evaluated: '0.6202',
        title: 'Q6: Actual/Actual Fractional Year Calculation',
        func: 'YEARFRAC (Basis 1)',
        diff: 'Intermediate',
        scenario: 'Compute exact year fraction for bond interest accruals under Actual/Actual day counts.',
        logic: 'YEARFRAC with basis=1 computes exact elapsed year fraction.'
      },
      {
        row: 8,
        a: 45884, // 15-Aug-2025 (Friday)
        b: 10,
        c: '',
        d: '',
        formula: 'WORKDAY(A8, B8)',
        evaluated: '45898 (29-Aug-2025)',
        title: 'Q7: Business Delivery Deadline Calculation (WORKDAY)',
        func: 'WORKDAY',
        diff: 'Intermediate',
        scenario: 'Calculate delivery date 10 business days forward excluding weekends.',
        logic: 'WORKDAY advances by 10 business days, automatically skipping Saturdays and Sundays.'
      },
      {
        row: 9,
        a: 45870, // 01-Aug-2025
        b: 45900, // 31-Aug-2025
        c: '',
        d: '',
        formula: 'NETWORKDAYS(A9, B9)',
        evaluated: '21',
        title: 'Q8: Monthly Working Days Count (NETWORKDAYS)',
        func: 'NETWORKDAYS',
        diff: 'Basic',
        scenario: 'Calculate total working days in August 2025 for payroll proration.',
        logic: 'NETWORKDAYS counts Monday-Friday business days between dates.'
      },
      {
        row: 10,
        a: 45870, // 01-Aug-2025
        b: 45900, // 31-Aug-2025
        c: '',
        d: '',
        formula: 'NETWORKDAYS.INTL(A10, B10, 11)',
        evaluated: '26',
        title: 'Q9: 6-Day Workweek Business Days Calculation',
        func: 'NETWORKDAYS.INTL (Sunday only weekend)',
        diff: 'Advanced',
        scenario: 'Calculate working days for retail factory operations working Monday through Saturday.',
        logic: 'Weekend code 11 defines Sunday as the sole non-working weekend day.'
      },
      {
        row: 11,
        a: 45884, // 15-Aug-2025
        b: '',
        c: '',
        d: '',
        formula: 'WORKDAY(EOMONTH(A11, 0) + 1, -1)',
        evaluated: '45898 (29-Aug-2025)',
        title: 'Q10: Last Business Day of the Month',
        func: 'WORKDAY & EOMONTH',
        diff: 'Advanced',
        scenario: 'Determine the final banking business day of the current month.',
        logic: 'EOMONTH(A11, 0) + 1 gets the 1st of next month; WORKDAY(..., -1) finds the prior business day.'
      }
    ]
  },

  // -----------------------------------------------------------------------
  // TOPIC 8: Modern Dynamic Text
  // -----------------------------------------------------------------------
  {
    code: 'Topic 08',
    shortTitle: 'Modern Dynamic Text',
    sheetName: 'T08 - Modern Dynamic Text',
    headers: ['Input A (Raw Text)', 'Input B (Param)', 'Input C', 'Input D', 'Your Practice Formula', 'Model Solution (Live)', 'Evaluated Output', 'Q# & Title', 'Function Used', 'Difficulty', 'Business Scenario', 'Logic & Pro Tip'],
    rows: [
      {
        row: 2,
        a: 'Subhashree Chattopadhyay',
        b: '',
        c: '',
        d: '',
        formula: 'TEXTBEFORE(A2, " ")',
        evaluated: '"Subhashree"',
        title: 'Q1: First Name Extraction via TEXTBEFORE',
        func: 'TEXTBEFORE',
        diff: 'Basic',
        scenario: 'Extract first names occurring prior to the first space delimiter in modern Excel 365.',
        logic: 'TEXTBEFORE(A2, " ") extracts all text before the delimiter without needing FIND or LEFT.'
      },
      {
        row: 3,
        a: 'Dr. Anirban Kumar Mukherjee',
        b: '',
        c: '',
        d: '',
        formula: 'TEXTAFTER(A3, " ", -1)',
        evaluated: '"Mukherjee"',
        title: 'Q2: Last Name Extraction via Reverse Instance TEXTAFTER',
        func: 'TEXTAFTER (-1 instance)',
        diff: 'Basic',
        scenario: 'Extract surnames from multi-token names by searching backwards from the end of the string.',
        logic: 'Supplying instance_num = -1 extracts text after the final delimiter.'
      },
      {
        row: 4,
        a: 'Laptops, Monitors, Keyboards, Mice',
        b: '',
        c: '',
        d: '',
        formula: 'TEXTSPLIT(A4, ", ")',
        evaluated: 'Spilled Array: ["Laptops", "Monitors", "Keyboards", "Mice"]',
        title: 'Q3: Dynamic Column-Spilled Text Splitting',
        func: 'TEXTSPLIT (Column Delimiter)',
        diff: 'Basic',
        scenario: 'Split comma-separated inventory items across adjacent columns in a single spilled formula.',
        logic: 'TEXTSPLIT(A4, ", ") breaks strings into a dynamic horizontal array.'
      },
      {
        row: 5,
        a: 'Finance; Accounts; Engineering; HR',
        b: '',
        c: '',
        d: '',
        formula: 'TEXTSPLIT(A5, , "; ")',
        evaluated: 'Spilled Row Array: ["Finance", "Accounts", ...]',
        title: 'Q4: Dynamic Vertical Row-Spilled Text Splitting',
        func: 'TEXTSPLIT (Row Delimiter)',
        diff: 'Intermediate',
        scenario: 'Split semicolon-delimited departmental codes downwards across vertical rows.',
        logic: 'Leaving column delimiter blank and passing row delimiter "; " spills data vertically.'
      },
      {
        row: 6,
        a: '1001:John;1002:Sarah;1003:Vikram',
        b: '',
        c: '',
        d: '',
        formula: 'TEXTSPLIT(A6, ":", ";")',
        evaluated: '2D Matrix: [[1001, "John"], [1002, "Sarah"], ...]',
        title: 'Q5: 2D Matrix Table Generation from Key-Value Strings',
        func: '2D TEXTSPLIT',
        diff: 'Advanced',
        scenario: 'Parse serialized key-value pairs into a structured 2-column by 3-row grid in one formula.',
        logic: 'Supplying ":" as column delimiter and ";" as row delimiter generates a 2D table.'
      },
      {
        row: 7,
        a: 'Customer Ref: [CR-98421] - Verified',
        b: '',
        c: '',
        d: '',
        formula: 'TEXTBEFORE(TEXTAFTER(A7, "["), "]")',
        evaluated: '"CR-98421"',
        title: 'Q6: Token Extraction Inside Bracket Enclosures',
        func: 'TEXTBEFORE & TEXTAFTER',
        diff: 'Intermediate',
        scenario: 'Extract tracking codes enclosed within square brackets.',
        logic: 'TEXTAFTER isolates text following "["; TEXTBEFORE trims off everything following "]".'
      },
      {
        row: 8,
        a: 'Annual-Report-2026-Final-v3.pdf',
        b: '',
        c: '',
        d: '',
        formula: 'TEXTAFTER(A8, "-", -1)',
        evaluated: '"v3.pdf"',
        title: 'Q7: Extracting Final Segment of Hyphenated Filenames',
        func: 'TEXTAFTER (-1)',
        diff: 'Basic',
        scenario: 'Extract release version suffix appearing after the last hyphen.',
        logic: 'Negative instance -1 matches the last hyphen in the string.'
      },
      {
        row: 9,
        a: '  Alpha ,  Beta ,  Gamma  ',
        b: '',
        c: '',
        d: '',
        formula: 'TRIM(TEXTSPLIT(A9, ","))',
        evaluated: 'Spilled Clean Array: ["Alpha", "Beta", "Gamma"]',
        title: 'Q8: Dynamic Array Whitespace Trimming',
        func: 'TRIM & TEXTSPLIT',
        diff: 'Intermediate',
        scenario: 'Split messy delimited strings and sanitize whitespace across all spilled elements.',
        logic: 'TRIM operates directly on dynamic array results generated by TEXTSPLIT.'
      },
      {
        row: 10,
        a: 'EMP#1042',
        b: '',
        c: '',
        d: '',
        formula: 'TEXTAFTER(A10, "@", , , , "General-Staff")',
        evaluated: '"General-Staff"',
        title: 'Q9: Error-Safe Substring Extraction with Fallback',
        func: 'TEXTAFTER (match_not_found)',
        diff: 'Advanced',
        scenario: 'Extract department suffix after "@" or return fallback default "General-Staff" if not found.',
        logic: 'The 6th parameter match_not_found handles missing delimiters without throwing #N/A.'
      },
      {
        row: 11,
        a: 'North, South, East, West',
        b: '',
        c: '',
        d: '',
        formula: 'TEXTJOIN(" | ", TRUE, TEXTSPLIT(A11, ", "))',
        evaluated: '"North | South | East | West"',
        title: 'Q10: Dynamic Delimiter Replacement Pipeline',
        func: 'TEXTJOIN & TEXTSPLIT',
        diff: 'Intermediate',
        scenario: 'Re-delimit comma lists into pipe-separated strings in modern Excel.',
        logic: 'Split by comma and rejoin with pipe delimiter in one dynamic expression.'
      }
    ]
  },

  // -----------------------------------------------------------------------
  // TOPIC 9: String Masking & Subs
  // -----------------------------------------------------------------------
  {
    code: 'Topic 09',
    shortTitle: 'String Masking & Subs',
    sheetName: 'T09 - String Masking & Subs',
    headers: ['Input A (Target Text)', 'Input B (Param)', 'Input C', 'Input D', 'Your Practice Formula', 'Model Solution (Live)', 'Evaluated Output', 'Q# & Title', 'Function Used', 'Difficulty', 'Business Scenario', 'Logic & Pro Tip'],
    rows: [
      {
        row: 2,
        a: 'ELEC 2026 PRO BLK',
        b: '',
        c: '',
        d: '',
        formula: 'SUBSTITUTE(A2, " ", "-")',
        evaluated: '"ELEC-2026-PRO-BLK"',
        title: 'Q1: Global Delimiter Normalization',
        func: 'SUBSTITUTE',
        diff: 'Basic',
        scenario: 'Replace all space separators with hyphens across SKU strings.',
        logic: 'Omitting instance_num replaces every occurrence of space.'
      },
      {
        row: 3,
        a: '4532-8921-3456-9812',
        b: '',
        c: '',
        d: '',
        formula: 'REPLACE(A3, 6, 6, "******")',
        evaluated: '"4532-******456-9812"',
        title: 'Q2: Security Masking of Middle Account Digits',
        func: 'REPLACE',
        diff: 'Intermediate',
        scenario: 'Mask middle digits (positions 6 through 11) with asterisks for security compliance.',
        logic: 'REPLACE starts at index 6 and replaces 6 characters with 6 asterisks.'
      },
      {
        row: 4,
        a: 'Electronics/Audio/Wireless/Headphones',
        b: '',
        c: '',
        d: '',
        formula: 'SUBSTITUTE(A4, "/", " -> ", 2)',
        evaluated: '"Electronics/Audio -> Wireless/Headphones"',
        title: 'Q3: Breadcrumb Navigation Delimiter Replacement',
        func: 'SUBSTITUTE (instance 2)',
        diff: 'Intermediate',
        scenario: 'Replace only the 2nd category slash with an arrow indicator.',
        logic: 'Instance parameter 2 targets only the second slash occurrence.'
      },
      {
        row: 5,
        a: 'URGENT,RECONCILED,FLAGGED,PENDING,AUDIT',
        b: '',
        c: '',
        d: '',
        formula: 'LEN(A5)-LEN(SUBSTITUTE(A5, ",", ""))+1',
        evaluated: '5',
        title: 'Q4: Counting Delimited Items via String Subtraction',
        func: 'LEN & SUBSTITUTE',
        diff: 'Intermediate',
        scenario: 'Count total items in a comma-delimited status string.',
        logic: 'Subtract length without commas from total length and add 1.'
      },
      {
        row: 6,
        a: '₹' + String.fromCharCode(160) + '95,000',
        b: '',
        c: '',
        d: '',
        formula: 'TRIM(SUBSTITUTE(A6, CHAR(160), " "))',
        evaluated: '"₹ 95,000"',
        title: 'Q5: Non-Breaking Space Sanitization',
        func: 'TRIM, SUBSTITUTE & CHAR',
        diff: 'Intermediate',
        scenario: 'Clean web non-breaking spaces (ASCII 160) before downstream processing.',
        logic: 'Replace CHAR(160) with standard space CHAR(32) before trimming.'
      },
      {
        row: 7,
        a: '(033) 2456-7890',
        b: '',
        c: '',
        d: '',
        formula: 'SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(A7, "(", ""), ")", ""), " ", ""), "-", "")',
        evaluated: '"03324567890"',
        title: 'Q6: Chained 4-Stage Punctuation Stripping',
        func: 'Nested SUBSTITUTE',
        diff: 'Advanced',
        scenario: 'Strip parentheses, spaces, and hyphens from landline phone numbers.',
        logic: 'Nest 4 SUBSTITUTE calls to remove each character sequentially.'
      },
      {
        row: 8,
        a: 'annual_report_2026.png',
        b: '',
        c: '',
        d: '',
        formula: 'REPLACE(A8, FIND(".", A8) + 1, LEN(A8) - FIND(".", A8), "webp")',
        evaluated: '"annual_report_2026.webp"',
        title: 'Q7: Dynamic Extension Modification',
        func: 'REPLACE & FIND',
        diff: 'Intermediate',
        scenario: 'Update image extension from png to webp dynamically.',
        logic: 'Locate period position and replace remaining characters with "webp".'
      },
      {
        row: 9,
        a: 'Batch-v1-prod-V1-final',
        b: '',
        c: '',
        d: '',
        formula: 'SUBSTITUTE(A9, "V1", "V2")',
        evaluated: '"Batch-v1-prod-V2-final"',
        title: 'Q8: Case-Sensitive Substitution Match',
        func: 'SUBSTITUTE',
        diff: 'Basic',
        scenario: 'Replace uppercase "V1" with "V2" while preserving lowercase "v1".',
        logic: 'SUBSTITUTE is strictly case-sensitive.'
      },
      {
        row: 10,
        a: 'C:/Reports/Financials/2026/Q4_Audit.xlsx',
        b: '',
        c: '',
        d: '',
        formula: 'SUBSTITUTE(A10, "/", "|", LEN(A10)-LEN(SUBSTITUTE(A10, "/", "")))',
        evaluated: '"C:/Reports/Financials/2026|Q4_Audit.xlsx"',
        title: 'Q9: Dynamic Last Delimiter Replacement',
        func: 'SUBSTITUTE & LEN Math',
        diff: 'Advanced',
        scenario: 'Replace only the final slash before the filename with a pipe character.',
        logic: 'Count total slashes and use that integer as instance_num in SUBSTITUTE.'
      },
      {
        row: 11,
        a: 'EMP1008',
        b: '',
        c: '',
        d: '',
        formula: 'REPLACE(A11, 4, 0, "-")',
        evaluated: '"EMP-1008"',
        title: 'Q10: Character Insertion without Deletion',
        func: 'REPLACE (num_chars = 0)',
        diff: 'Basic',
        scenario: 'Insert a hyphen at position 4 without removing any characters.',
        logic: 'Setting num_chars = 0 inserts new text cleanly.'
      }
    ]
  },

  // -----------------------------------------------------------------------
  // TOPIC 10: Text-to-Number Coercion
  // -----------------------------------------------------------------------
  {
    code: 'Topic 10',
    shortTitle: 'Text-to-Number Coercion',
    sheetName: 'T10 - Text-to-Number Coercion',
    headers: ['Input A (Text Payload)', 'Input B (Param)', 'Input C', 'Input D', 'Your Practice Formula', 'Model Solution (Live)', 'Evaluated Output', 'Q# & Title', 'Function Used', 'Difficulty', 'Business Scenario', 'Logic & Pro Tip'],
    rows: [
      {
        row: 2,
        a: '$4,500.50',
        b: '',
        c: '',
        d: '',
        formula: 'VALUE(A2)',
        evaluated: '4500.50',
        title: 'Q1: Left-Aligned Currency Text to Calculable Float',
        func: 'VALUE',
        diff: 'Basic',
        scenario: 'Convert currency formatted strings into true calculable floating point numbers.',
        logic: 'VALUE parses standard currency symbols and commas into true numbers.'
      },
      {
        row: 3,
        a: '1.250.500,75 €',
        b: '',
        c: '',
        d: '',
        formula: 'NUMBERVALUE(A3, ",", ".")',
        evaluated: '1250500.75',
        title: 'Q2: European Decimal/Period Number Parsing',
        func: 'NUMBERVALUE',
        diff: 'Intermediate',
        scenario: 'Parse European numbers where comma is decimal and period is thousand separator.',
        logic: 'NUMBERVALUE(A3, ",", ".") specifies comma decimal and period thousand separator.'
      },
      {
        row: 4,
        a: '20260415',
        b: '',
        c: '',
        d: '',
        formula: 'DATE(LEFT(A4, 4), MID(A4, 5, 2), RIGHT(A4, 2))',
        evaluated: '46127 (15-Apr-2026)',
        title: 'Q3: YYYYMMDD Text Date to Real Serial Date',
        func: 'DATE, LEFT, MID & RIGHT',
        diff: 'Intermediate',
        scenario: 'Parse unseparated YYYYMMDD date strings from mainframe logs into real dates.',
        logic: 'Slice year, month, and day components into DATE(year, month, day).'
      },
      {
        row: 5,
        a: '08:45:30 PM',
        b: '',
        c: '',
        d: '',
        formula: 'TIMEVALUE(A5)',
        evaluated: '0.864930556 (20:45:30)',
        title: 'Q4: 12-Hour Text Timestamp to Time Serial',
        func: 'TIMEVALUE',
        diff: 'Basic',
        scenario: 'Convert 12-hour AM/PM time strings into true Excel time decimals.',
        logic: 'TIMEVALUE parses time strings into fractional day decimals.'
      },
      {
        row: 6,
        a: '1,200.00 LTRS',
        b: '',
        c: '',
        d: '',
        formula: 'VALUE(TEXTBEFORE(A6, " "))',
        evaluated: '1200.00',
        title: 'Q5: Quantity Extraction from Unit Strings',
        func: 'VALUE & TEXTBEFORE',
        diff: 'Intermediate',
        scenario: 'Extract and convert numerical quantities embedded with unit labels.',
        logic: 'TEXTBEFORE extracts the number string before unit label; VALUE converts to number.'
      },
      {
        row: 7,
        a: '18.00 %',
        b: '',
        c: '',
        d: '',
        formula: 'NUMBERVALUE(A7, ".", ",")',
        evaluated: '0.18',
        title: 'Q6: Percentage Strings with Trailing % to Multiplier',
        func: 'NUMBERVALUE',
        diff: 'Basic',
        scenario: 'Convert tax percentage text strings into decimal multipliers.',
        logic: 'NUMBERVALUE recognizes percent signs and converts 18.00% to decimal 0.18.'
      },
      {
        row: 8,
        a: '2026-04-15T14:30:00Z',
        b: '',
        c: '',
        d: '',
        formula: 'DATEVALUE(LEFT(A8, 10)) + TIMEVALUE(MID(A8, 12, 8))',
        evaluated: '46127.604167 (15-Apr-2026 14:30:00)',
        title: 'Q7: ISO 8601 UTC Timestamp Parsing',
        func: 'DATEVALUE & TIMEVALUE',
        diff: 'Advanced',
        scenario: 'Convert ISO 8601 UTC timestamps into full date+time serial numbers.',
        logic: 'DATEVALUE parses YYYY-MM-DD; TIMEVALUE parses HH:MM:SS; add them together.'
      },
      {
        row: 9,
        a: '(1,500.00)',
        b: '',
        c: '',
        d: '',
        formula: 'NUMBERVALUE(A9)',
        evaluated: '-1500.00',
        title: 'Q8: Accounting Parenthesis Negative Number Parsing',
        func: 'NUMBERVALUE',
        diff: 'Basic',
        scenario: 'Parse financial negative numbers stored in parentheses into negative floats.',
        logic: 'NUMBERVALUE parses parentheses as negative indicators, returning -1500.00.'
      },
      {
        row: 10,
        a: 'N/A',
        b: '',
        c: '',
        d: '',
        formula: 'IFERROR(VALUE(A10), 0)',
        evaluated: '0',
        title: 'Q9: Safe Coercion with IFERROR Default Fallback',
        func: 'IFERROR & VALUE',
        diff: 'Basic',
        scenario: 'Coerce dirty numeric columns containing invalid strings ("N/A", "-") safely without errors.',
        logic: 'IFERROR intercepts conversion errors and substitutes default 0.'
      },
      {
        row: 11,
        a: '249.99',
        b: '',
        c: '',
        d: '',
        formula: '--A11',
        evaluated: '249.99',
        title: 'Q10: High-Performance Double Unary (--) Coercion',
        func: 'Double Unary (--)',
        diff: 'Basic',
        scenario: 'Convert text numbers into real floats using high-performance double negation.',
        logic: 'Double unary (--) forces numeric type coercion without function call overhead.'
      }
    ]
  },

  // -----------------------------------------------------------------------
  // TOPIC 11: Industrial ETL Pipeline
  // -----------------------------------------------------------------------
  {
    code: 'Topic 11',
    shortTitle: 'Industrial ETL Pipeline',
    sheetName: 'T11 - Industrial ETL Pipeline',
    headers: ['Input A (Dirty Record)', 'Input B (Param)', 'Input C', 'Input D', 'Your Practice Formula', 'Model Solution (Live)', 'Evaluated Output', 'Q# & Title', 'Function Used', 'Difficulty', 'Business Scenario', 'Logic & Pro Tip'],
    rows: [
      {
        row: 2,
        a: '  sUbhAshRee   CHATTOPADHYAY  ',
        b: '',
        c: '',
        d: '',
        formula: 'PROPER(TRIM(CLEAN(A2)))',
        evaluated: '"Subhashree Chattopadhyay"',
        title: 'Q1: Customer Name Hygiene & Case Normalization',
        func: 'PROPER, TRIM & CLEAN',
        diff: 'Basic',
        scenario: 'Sanitize customer names with erratic mixed case, tabs, and multiple spaces.',
        logic: 'CLEAN removes unprintable chars, TRIM collapses spaces, PROPER fixes casing.'
      },
      {
        row: 3,
        a: 'Flat 4B, Greenfield Heights, Kolkata - 700156',
        b: '',
        c: '',
        d: '',
        formula: 'VALUE(RIGHT(TRIM(A3), 6))',
        evaluated: '700156',
        title: 'Q2: Postal PIN Code Extraction from Address',
        func: 'VALUE, RIGHT & TRIM',
        diff: 'Basic',
        scenario: 'Extract 6-digit Indian PIN codes from the end of address strings.',
        logic: 'TRIM removes trailing space; RIGHT extracts 6 digits; VALUE converts to number.'
      },
      {
        row: 4,
        a: '124 Park Street, Kolkata, West Bengal 700016',
        b: '',
        c: '',
        d: '',
        formula: 'TRIM(MID(A4, FIND(",", A4) + 1, FIND(",", A4, FIND(",", A4) + 1) - FIND(",", A4) - 1))',
        evaluated: '"Kolkata"',
        title: 'Q3: Dynamic City Extraction Between Commas',
        func: 'TRIM, MID & Dual FIND',
        diff: 'Intermediate',
        scenario: 'Extract the city name located between the first and second commas in address strings.',
        logic: 'Find the first comma and second comma positions to extract the middle city token.'
      },
      {
        row: 5,
        a: '098301-23456',
        b: '',
        c: '',
        d: '',
        formula: '"+91-" & RIGHT(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(A5, "-", ""), " ", ""), "(0)", ""), 10)',
        evaluated: '"+91-9830123456"',
        title: 'Q4: Phone Number Standardization to +91 E.164',
        func: 'SUBSTITUTE & RIGHT',
        diff: 'Intermediate',
        scenario: 'Standardize irregular local mobile numbers into international +91-XXXXXXXXXX format.',
        logic: 'Strip hyphens and spaces, extract the rightmost 10 digits, and prepend "+91-".'
      },
      {
        row: 6,
        a: '04/15/2026',
        b: '',
        c: '',
        d: '',
        formula: 'DATE(RIGHT(A6, 4), LEFT(A6, 2), MID(A6, 4, 2))',
        evaluated: '46127 (15-Apr-2026)',
        title: 'Q5: Non-Standard US Date String (MM/DD/YYYY) Parsing',
        func: 'DATE, RIGHT, LEFT & MID',
        diff: 'Intermediate',
        scenario: 'Convert US format date strings into universal Excel serial dates regardless of system locale.',
        logic: 'Extract 4-digit year, 2-digit month, and 2-digit day into DATE(year, month, day).'
      },
      {
        row: 7,
        a: '  Contact_Admin@ACME-CORP.CO.IN  ',
        b: '',
        c: '',
        d: '',
        formula: 'LOWER(TRIM(MID(A7, FIND("@", A7) + 1, LEN(A7))))',
        evaluated: '"acme-corp.co.in"',
        title: 'Q6: Corporate Domain Extraction from Email',
        func: 'LOWER, TRIM & MID',
        diff: 'Basic',
        scenario: 'Isolate and lowercase corporate domain hostnames from dirty email addresses.',
        logic: 'MID extracts everything after "@"; LOWER normalizes casing; TRIM strips whitespace.'
      },
      {
        row: 8,
        a: 'Dr. Rajesh Khanna',
        b: '',
        c: '',
        d: '',
        formula: 'IF(ISNUMBER(FIND(".", A8)), LEFT(A8, FIND(".", A8)), "Individual")',
        evaluated: '"Dr."',
        title: 'Q7: Customer Salutation & Honorific Detection',
        func: 'IF, ISNUMBER, FIND & LEFT',
        diff: 'Intermediate',
        scenario: 'Extract professional titles (Dr., Mr., Ms.) or return "Individual" if none exists.',
        logic: 'FIND checks for period in honorific; LEFT slices title token.'
      },
      {
        row: 9,
        a: 'Suite 500, Kolkata, WB 700091',
        b: '',
        c: '',
        d: '',
        formula: 'TRIM(TEXTSPLIT(A9, ","))',
        evaluated: 'Spilled 3-Column Array: ["Suite 500", "Kolkata", "WB 700091"]',
        title: 'Q8: Spilled Address Tokenization Across Columns',
        func: 'TEXTSPLIT & TRIM',
        diff: 'Intermediate',
        scenario: 'Split full addresses into Street, City, and State-Zip columns using a single spilled formula.',
        logic: 'TEXTSPLIT breaks on comma and TRIM removes leading/trailing spaces.'
      },
      {
        row: 10,
        a: 1776263400, // Unix timestamp for 15-Apr-2026 15:00:00
        b: '',
        c: '',
        d: '',
        formula: 'DATE(1970, 1, 1) + (A10 / 86400)',
        evaluated: '46127.625 (15-Apr-2026 15:00:00)',
        title: 'Q9: Unix Epoch Timestamp (Seconds) to DateTime',
        func: 'DATE & Epoch Math',
        diff: 'Advanced',
        scenario: 'Convert Unix epoch timestamp integers into readable Excel date and time serials.',
        logic: 'Divide epoch seconds by 86,400 (seconds/day) and add to Jan 1, 1970 base date.'
      },
      {
        row: 11,
        a: 'lead:subhashree.c@corp.com|2026-04-15|approved',
        b: '',
        c: '',
        d: '',
        formula: 'TEXTBEFORE(TEXTAFTER(A11, "lead:"), "|") & " (" & TEXT(DATEVALUE(MID(A11, FIND("|", A11)+1, 10)), "dd-mmm-yyyy") & ")"',
        evaluated: '"subhashree.c@corp.com (15-Apr-2026)"',
        title: 'Q10: Complex Log String Parsing Pipeline',
        func: 'Composite ETL Formula',
        diff: 'Advanced',
        scenario: 'Extract customer email and formatted transaction date from structured log records.',
        logic: 'Combine TEXTBEFORE/TEXTAFTER for email and DATEVALUE/TEXT for formatted date.'
      }
    ]
  },

  // -----------------------------------------------------------------------
  // TOPIC 12: Shift Overtime Engine
  // -----------------------------------------------------------------------
  {
    code: 'Topic 12',
    shortTitle: 'Shift Overtime Engine',
    sheetName: 'T12 - Shift Overtime Engine',
    headers: ['Input A (In Time / Hrs)', 'Input B (Out Time / Rate)', 'Input C (Break Time)', 'Input D', 'Your Practice Formula', 'Model Solution (Live)', 'Evaluated Output', 'Q# & Title', 'Function Used', 'Difficulty', 'Business Scenario', 'Logic & Pro Tip'],
    rows: [
      {
        row: 2,
        a: 0.375, // 09:00 AM
        b: 0.729166667, // 05:30 PM
        c: '',
        d: '',
        formula: '(B2 - A2) * 24',
        evaluated: '8.50',
        title: 'Q1: Standard Daytime Shift Duration in Decimal Hours',
        func: '- Operator (* 24)',
        diff: 'Basic',
        scenario: 'Calculate total worked decimal hours for daytime shift (09:00 AM to 05:30 PM).',
        logic: 'Subtract start time from end time and multiply by 24 to convert day fraction to decimal hours.'
      },
      {
        row: 3,
        a: 0.916666667, // 10:00 PM
        b: 0.270833333, // 06:30 AM
        c: '',
        d: '',
        formula: 'MOD(B3 - A3, 1) * 24',
        evaluated: '8.50',
        title: 'Q2: Overnight Graveyard Shift Crossing Midnight (MOD)',
        func: 'MOD (* 24)',
        diff: 'Intermediate',
        scenario: 'Calculate shift duration when employee works across midnight (10:00 PM to 06:30 AM).',
        logic: 'MOD(End - Start, 1) wraps around midnight, avoiding negative time errors.'
      },
      {
        row: 4,
        a: 0.354166667, // 08:30 AM
        b: 0.75, // 06:00 PM
        c: 0.03125, // 00:45 (45 mins)
        d: '',
        formula: 'MAX(0, (MOD(B4 - A4, 1) - C4) * 24)',
        evaluated: '8.75',
        title: 'Q3: Net Shift Duration Deducting Lunch Break',
        func: 'MOD & MAX',
        diff: 'Intermediate',
        scenario: 'Deduct unpaid 45-minute lunch break from shift duration (08:30 AM to 06:00 PM).',
        logic: 'Subtract lunch break time fraction from gross shift time and multiply by 24.'
      },
      {
        row: 5,
        a: 10.50, // Worked hours
        b: '',
        c: '',
        d: '',
        formula: 'MAX(0, A5 - 8)',
        evaluated: '2.50',
        title: 'Q4: Daily Statutory Overtime (Hours > 8)',
        func: 'MAX',
        diff: 'Basic',
        scenario: 'Calculate overtime hours exceeding standard 8-hour statutory threshold.',
        logic: 'MAX(0, Worked - 8) returns excess hours over 8 without negative numbers.'
      },
      {
        row: 6,
        a: 13.00, // Worked hours
        b: '',
        c: '',
        d: '',
        formula: 'MEDIAN(0, 4, A6 - 8)',
        evaluated: 'Tier 1 OT: 4.00 hrs',
        title: 'Q5: Tiered Overtime (1.5x Standard OT vs 2.0x Double Time)',
        func: 'MEDIAN (Tier 1 OT)',
        diff: 'Advanced',
        scenario: 'Calculate Tier 1 Overtime (hours 8 to 12) for a 13-hour shift.',
        logic: 'MEDIAN(0, 4, Hours - 8) neatly bounds Tier 1 overtime between 0 and 4 hours.'
      },
      {
        row: 7,
        a: 0.338194444, // 08:07 AM
        b: '',
        c: '',
        d: '',
        formula: 'MROUND(A7, TIME(0, 15, 0))',
        evaluated: '08:00 AM (0.333333)',
        title: 'Q6: Clock-In Time Rounding to Nearest 15-Minute Interval',
        func: 'MROUND & TIME',
        diff: 'Intermediate',
        scenario: 'Round employee clock-in punches to the nearest 15-minute payroll increment.',
        logic: 'MROUND(A7, TIME(0, 15, 0)) rounds to the nearest multiple of 15 minutes.'
      },
      {
        row: 8,
        a: 0.354166667, // 8.5 hrs
        b: 0.375, // 9.0 hrs
        c: 0.416666667, // 10.0 hrs
        d: 0.458333333, // 11.0 hrs
        formula: 'SUM(A8:D8)',
        evaluated: '38:30 (with [h]:mm format)',
        title: 'Q7: Cumulative Weekly Hours Display Exceeding 24 Hours',
        func: 'SUM with [h]:mm mask',
        diff: 'Basic',
        scenario: 'Sum weekly timesheet hours and format as total cumulative elapsed hours.',
        logic: 'Apply custom number format [h]:mm so total elapsed hours do not reset every 24h.'
      },
      {
        row: 9,
        a: 46130, // 18-Apr-2026 (Saturday)
        b: 8.00, // Worked hours
        c: '',
        d: '',
        formula: 'IF(WEEKDAY(A9, 2) >= 6, B9 * 1.5, B9 * 1.0)',
        evaluated: '12.00',
        title: 'Q8: Weekend Premium Pay Multiplier (1.5x on Sat/Sun)',
        func: 'IF & WEEKDAY',
        diff: 'Intermediate',
        scenario: 'Apply a 1.5x pay multiplier to shifts worked on Saturday or Sunday.',
        logic: 'WEEKDAY(A9, 2) >= 6 checks for weekend days and applies the 1.5x factor.'
      },
      {
        row: 10,
        a: 0.416666667, // 10:00 AM
        b: 0.604166667, // 02:30 PM (Shift 1)
        c: 0.75, // 06:00 PM
        d: 0.979166667, // 11:30 PM (Shift 2)
        formula: '(MOD(B10 - A10, 1) + MOD(D10 - C10, 1)) * 24',
        evaluated: '10.00',
        title: 'Q9: Split Shift Combined Duration Calculation',
        func: 'Dual MOD (* 24)',
        diff: 'Intermediate',
        scenario: 'Calculate combined worked hours for morning and evening split shift segments.',
        logic: 'Calculate each shift segment duration using MOD and sum the total hours.'
      },
      {
        row: 11,
        a: 10.50, // Worked hours
        b: 500.00, // Base hourly rate
        c: '',
        d: '',
        formula: '(MIN(8, A11) * B11) + (MAX(0, A11 - 8) * B11 * 1.5)',
        evaluated: '₹5,875.00',
        title: 'Q10: End-to-End Gross Payroll Calculation Formula',
        func: 'MIN, MAX & Rate Multipliers',
        diff: 'Advanced',
        scenario: 'Calculate total gross earnings for 10.5 hours worked at ₹500/hr base rate with 1.5x overtime.',
        logic: 'Regular pay = MIN(8, 10.5)*500 = ₹4,000; OT pay = MAX(0, 10.5-8)*500*1.5 = ₹1,875. Total = ₹5,875.'
      }
    ]
  }
];

async function createPracticalWorkbook() {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Coder & AccoTax Centre of Excellence';
  wb.lastModifiedBy = 'Sukanta Hui';
  wb.created = new Date();
  wb.modified = new Date();

  // =========================================================================
  // 1. MASTER INDEX & LAB GUIDE LANDING SHEET (SHEET 0)
  // =========================================================================
  const wsIndex = wb.addWorksheet('📋 Master Index & Lab Guide', {
    views: [{ showGridLines: true }],
    properties: { tabColor: { argb: 'FF0284C7' } }
  });

  // Banner row
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
  moduleBanner.value = '📊 Module 2.2: Text, Date & Time Functions — 120 Strictly Practical Hands-On Questions';
  moduleBanner.font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FFF59E0B' } };
  moduleBanner.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } };
  moduleBanner.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
  wsIndex.getRow(3).height = 24;

  wsIndex.getRow(4).height = 10;

  // Teacher Profile Card (Rows 5 to 13)
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

  wsIndex.getRow(14).height = 12;

  // Instructions Card (Rows 15 to 21)
  wsIndex.mergeCells('A15:F15');
  const instH = wsIndex.getCell('A15');
  instH.value = '📌 HOW TO USE THIS WORKBOOK FOR HANDS-ON EXCEL MASTERY:';
  instH.font = { name: 'Segoe UI', size: 10.5, bold: true, color: { argb: 'FFFFFFFF' } };
  instH.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } };
  instH.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
  wsIndex.getRow(15).height = 24;

  const instructions = [
    '1. Navigate to any topic worksheet using the interactive hyperlinks in the Table of Contents below.',
    '2. Each worksheet starts at Row 1 (Header Row) with authentic raw input data in Row 2 (A2), Row 3 (A3)... Row 11 (A11).',
    '3. Write and test your own live formulas in Column E ("Your Practice Formula" highlighted in light yellow).',
    '4. Column F contains the live Model Solution formula which Excel automatically calculates to verify your result.',
    '5. Review Columns G-L for the Verified Output description, Scenario context, and Step-by-Step Logic.',
    '6. Use the top return hyperlink ("🔙 Master Index") on any topic sheet to jump back to this landing guide instantly.'
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

  wsIndex.getRow(22).height = 14;

  // Table of Contents (Rows 23 onwards)
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

  topicsData.forEach((cfg, idx) => {
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

    r.getCell(4).value = `${cfg.rows.length} Practical Qs`;
    r.getCell(4).alignment = { vertical: 'middle', horizontal: 'center' };
    r.getCell(4).font = { name: 'Segoe UI', size: 9.5, color: { argb: 'FF059669' }, bold: true };

    r.getCell(5).value = 'Basic → Advanced';
    r.getCell(5).alignment = { vertical: 'middle', horizontal: 'center' };
    r.getCell(5).font = { name: 'Segoe UI', size: 9.5, color: { argb: 'FF64748B' } };

    r.getCell(6).value = '✓ 100% Practicable';
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
    { width: 32 },
    { width: 18 },
    { width: 20 },
    { width: 22 },
  ];

  // =========================================================================
  // 2. DEDICATED WORKSHEET FOR EACH OF THE 12 TOPICS
  // =========================================================================
  topicsData.forEach((cfg) => {
    const ws = wb.addWorksheet(cfg.sheetName, {
      views: [{ showGridLines: true }],
      properties: { tabColor: { argb: 'FF059669' } }
    });

    // -----------------------------------------------------------------------
    // ROW 1: TABLE HEADER ROW (No dummy header banners!)
    // -----------------------------------------------------------------------
    const colHeaders = [
      'Input Cell A (Raw Data)',
      'Input Cell B (Param / Data)',
      'Input Cell C (Param / Data)',
      'Input Cell D (Param / Data)',
      'Your Practice Formula (Try Here)',
      'Model Solution Formula (Live Evaluated)',
      'Verified Output Description',
      'Challenge / Question Title',
      'Function(s) Used',
      'Difficulty Tier',
      'Business Scenario & Context',
      'Step-by-Step Logic & Pro Tip',
      'Navigation'
    ];

    ws.getRow(1).height = 30;
    colHeaders.forEach((h, cIdx) => {
      const cell = ws.getRow(1).getCell(cIdx + 1);
      cell.value = h;
      cell.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FFFFFFFF' } };

      if (cIdx === 4) {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD97706' } }; // Amber for practice
      } else if (cIdx === 5) {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0284C7' } }; // Sky for solution
      } else if (cIdx === 12) {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF059669' } }; // Emerald for nav
      } else {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } };
      }

      cell.alignment = {
        vertical: 'middle',
        horizontal: (cIdx <= 3 || cIdx === 9 || cIdx === 12) ? 'center' : 'left',
        wrapText: true
      };
      cell.border = {
        top: { style: 'medium', color: { argb: 'FF0F172A' } },
        bottom: { style: 'medium', color: { argb: 'FF0F172A' } },
        left: { style: 'thin', color: { argb: 'FF475569' } },
        right: { style: 'thin', color: { argb: 'FF475569' } }
      };
    });

    // -----------------------------------------------------------------------
    // ROWS 2 TO 11: EXACT DATA ROWS (1-to-1 matching row index!)
    // -----------------------------------------------------------------------
    cfg.rows.forEach((rData, rIdx) => {
      const rowNum = rData.row; // 2, 3, 4 ... 11
      const r = ws.getRow(rowNum);
      r.height = 38;

      // Col 1 (A): Input A
      const cellA = r.getCell(1);
      cellA.value = rData.a;
      cellA.font = { name: 'Consolas', size: 9.5, color: { argb: 'FF0F172A' } };
      cellA.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };

      // Col 2 (B): Input B
      const cellB = r.getCell(2);
      cellB.value = rData.b;
      cellB.font = { name: 'Consolas', size: 9.5, color: { argb: 'FF0F172A' } };
      cellB.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };

      // Col 3 (C): Input C
      const cellC = r.getCell(3);
      cellC.value = rData.c;
      cellC.font = { name: 'Consolas', size: 9.5, color: { argb: 'FF0F172A' } };
      cellC.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };

      // Col 4 (D): Input D
      const cellD = r.getCell(4);
      cellD.value = rData.d;
      cellD.font = { name: 'Consolas', size: 9.5, color: { argb: 'FF0F172A' } };
      cellD.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };

      // Col 5 (E): Practice Cell (Empty with soft amber highlight)
      const cellE = r.getCell(5);
      cellE.value = '';
      cellE.font = { name: 'Consolas', size: 9.5, color: { argb: 'FF0F172A' } };
      cellE.alignment = { vertical: 'middle', horizontal: 'left' };
      cellE.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFEF3C7' } };
      cellE.border = {
        top: { style: 'dashed', color: { argb: 'FFD97706' } },
        bottom: { style: 'dashed', color: { argb: 'FFD97706' } },
        left: { style: 'medium', color: { argb: 'FFD97706' } },
        right: { style: 'medium', color: { argb: 'FFD97706' } }
      };

      // Col 6 (F): Live Model Solution Formula (Formula object so Excel computes it!)
      const cellF = r.getCell(6);
      cellF.value = { formula: rData.formula };
      cellF.font = { name: 'Consolas', size: 9.5, bold: true, color: { argb: 'FF0369A1' } };
      cellF.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF0F9FF' } };
      cellF.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };

      // Col 7 (G): Evaluated Output description
      const cellG = r.getCell(7);
      cellG.value = rData.evaluated;
      cellG.font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: 'FF0F172A' } };
      cellG.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };

      // Col 8 (H): Title
      const cellH = r.getCell(8);
      cellH.value = rData.title;
      cellH.font = { name: 'Segoe UI', size: 9.5, bold: true, color: { argb: 'FF0F172A' } };
      cellH.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };

      // Col 9 (I): Function
      const cellI = r.getCell(9);
      cellI.value = rData.func;
      cellI.font = { name: 'Segoe UI', size: 9, color: { argb: 'FF0369A1' }, bold: true };
      cellI.alignment = { vertical: 'middle', horizontal: 'left' };

      // Col 10 (J): Difficulty
      const cellJ = r.getCell(10);
      cellJ.value = rData.diff;
      const diffColor = rData.diff === 'Basic' ? 'FF059669' : rData.diff === 'Intermediate' ? 'FFD97706' : 'FFE11D48';
      cellJ.font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: diffColor } };
      cellJ.alignment = { vertical: 'middle', horizontal: 'center' };

      // Col 11 (K): Scenario
      const cellK = r.getCell(11);
      cellK.value = rData.scenario;
      cellK.font = { name: 'Segoe UI', size: 9, color: { argb: 'FF334155' } };
      cellK.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };

      // Col 12 (L): Logic & Pro Tip
      const cellL = r.getCell(12);
      cellL.value = rData.logic;
      cellL.font = { name: 'Segoe UI', size: 8.5, color: { argb: 'FF475569' } };
      cellL.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };

      // Col 13 (M): Return Link
      const cellM = r.getCell(13);
      cellM.value = { text: '🔙 Index', hyperlink: "#'📋 Master Index & Lab Guide'!A1" };
      cellM.font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: 'FF0284C7' }, underline: true };
      cellM.alignment = { vertical: 'middle', horizontal: 'center' };

      // Borders and alternating fill for non-practice cells
      [1, 2, 3, 4, 7, 8, 9, 10, 11, 12, 13].forEach((cIdx) => {
        const cell = r.getCell(cIdx);
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: rIdx % 2 === 0 ? 'FFF8FAFC' : 'FFFFFFFF' }
        };
        cell.border = {
          top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
          bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
          left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
          right: { style: 'thin', color: { argb: 'FFE2E8F0' } }
        };
      });

      // Border for cell F
      cellF.border = {
        top: { style: 'thin', color: { argb: 'FFBAE6FD' } },
        bottom: { style: 'thin', color: { argb: 'FFBAE6FD' } },
        left: { style: 'thin', color: { argb: 'FFBAE6FD' } },
        right: { style: 'thin', color: { argb: 'FFBAE6FD' } }
      };
    });

    ws.columns = [
      { width: 28 }, // Input A
      { width: 24 }, // Input B
      { width: 20 }, // Input C
      { width: 20 }, // Input D
      { width: 34 }, // Practice
      { width: 34 }, // Model Solution (Live)
      { width: 26 }, // Evaluated Output
      { width: 32 }, // Title
      { width: 22 }, // Function
      { width: 15 }, // Difficulty
      { width: 44 }, // Scenario
      { width: 48 }, // Logic & Pro Tip
      { width: 14 }, // Navigation
    ];
  });

  const masterPath = path.join(excelFilesDir, '002_002_text_date_and_time_functions_master.xlsx');
  const practicePath = path.join(excelFilesDir, '002_002_practical_questions_practice.xlsx');
  const legacyPath = path.join(excelFilesDir, 'text_date_and_time_functions_master.xlsx');

  await wb.xlsx.writeFile(practicePath);
  await wb.xlsx.writeFile(masterPath);
  fs.copyFileSync(masterPath, legacyPath);

  console.log('✓ Successfully generated 100% Practicable Master Workbook:');
  console.log(`  -> ${practicePath}`);
  console.log(`  -> ${masterPath}`);
}

createPracticalWorkbook().catch(console.error);
