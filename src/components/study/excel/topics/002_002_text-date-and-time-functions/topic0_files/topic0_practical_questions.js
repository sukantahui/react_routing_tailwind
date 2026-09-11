// topic0_files/topic0_practical_questions.js
// 10 Strictly Practical Enterprise Questions for Topic 0: Text manipulation essentials (UPPER, LOWER, PROPER, TRIM, CLEAN)

export const practicalQuestions = [
  {
    id: 1,
    title: "Standardizing Mixed-Case Customer Names for CRM Import",
    functionUsed: "PROPER & TRIM",
    category: "Case Normalization",
    difficulty: "Basic",
    difficultyColor: "emerald",
    scenario: "Customer registration forms allow free-text input resulting in erratic casing and excess spacing (e.g., cell A2 contains '  sWADEEP   bANERJEE '). Normalize the name into standard Title Case with uniform single spaces for official CRM record creation.",
    inputCell: 'A2 = "  sWADEEP   bANERJEE "',
    targetCell: "B2",
    formula: '=PROPER(TRIM(A2))',
    evaluatedOutput: '"Swadeep Banerjee"',
    outputType: "Text String",
    stepByStepLogic: [
      "TRIM(A2) executes first, stripping leading/trailing whitespace and compressing multiple internal spaces down to a single space ('sWADEEP bANERJEE').",
      "PROPER(...) capitalizes the first character of each word and converts all subsequent letters to lowercase ('Swadeep Banerjee').",
      "The result is a sanitized, database-ready customer name."
    ],
    proTip: "Always nest TRIM() inside PROPER() so that trailing spaces don't interfere with downstream VLOOKUP or XLOOKUP joins."
  },
  {
    id: 2,
    title: "Vendor Tax ID Capitalization for Exact Matching",
    functionUsed: "UPPER & TRIM",
    category: "Data Standardization",
    difficulty: "Basic",
    difficultyColor: "emerald",
    scenario: "Vendors submit GSTIN / PAN tax numbers with random lowercase letters and stray spaces (e.g., cell A3 contains '  19abcde1234f1z5  '). Convert the tax ID to all uppercase with all surrounding whitespace removed to guarantee exact VLOOKUP matching against the master tax register.",
    inputCell: 'A3 = "  19abcde1234f1z5  "',
    targetCell: "B3",
    formula: '=UPPER(TRIM(A3))',
    evaluatedOutput: '"19ABCDE1234F1Z5"',
    outputType: "Tax Identifier",
    stepByStepLogic: [
      "TRIM(A3) strips the leading and trailing space characters.",
      "UPPER(...) converts all alphabetic characters into standard uppercase.",
      "Guarantees that downstream audit lookups do not fail due to case mismatches or invisible spaces."
    ],
    proTip: "Standardizing all alphanumeric IDs to uppercase at ETL ingestion prevents join anomalies across SQL databases and Excel pivot caches."
  },
  {
    id: 3,
    title: "Normalizing User Login Usernames to Lowercase",
    functionUsed: "LOWER & TRIM",
    category: "System Identity",
    difficulty: "Basic",
    difficultyColor: "emerald",
    scenario: "Active Directory SSO (Single Sign-On) requires all corporate email usernames in cell A4 ('  Tuhina.Mukherjee@AccoTax.IN  ') to be stored in pure lowercase with no whitespace.",
    inputCell: 'A4 = "  Tuhina.Mukherjee@AccoTax.IN  "',
    targetCell: "B4",
    formula: '=LOWER(TRIM(A4))',
    evaluatedOutput: '"tuhina.mukherjee@accotax.in"',
    outputType: "Email Address",
    stepByStepLogic: [
      "TRIM(A4) removes surrounding spaces.",
      "LOWER(...) converts all letters ('T', 'M', 'A', 'T', 'I', 'N') into lowercase.",
      "Yields a canonical email identifier suitable for directory synchronization."
    ],
    proTip: "Most authentication APIs enforce case-insensitive or strictly lowercase credentials; standardizing with LOWER() prevents SSO login failures."
  },
  {
    id: 4,
    title: "Stripping Web-Scraped Non-Breaking Spaces (ASCII 160)",
    functionUsed: "TRIM, SUBSTITUTE & CHAR(160)",
    category: "Advanced Hygiene",
    difficulty: "Intermediate",
    difficultyColor: "sky",
    scenario: "Data copied from an HTML web portal into cell A5 appears to have trailing spaces, but =TRIM(A5) fails to remove them because they are non-breaking spaces (ASCII 160 / &nbsp;). Strip the non-breaking spaces completely.",
    inputCell: 'A5 = "Kolkata Plant" & CHAR(160) & CHAR(160)',
    targetCell: "B5",
    formula: '=TRIM(SUBSTITUTE(A5, CHAR(160), " "))',
    evaluatedOutput: '"Kolkata Plant"',
    outputType: "Sanitized Text",
    stepByStepLogic: [
      "CHAR(160) generates the non-breaking space character used in HTML.",
      "SUBSTITUTE(A5, CHAR(160), \" \") replaces every ASCII 160 character with a standard space (ASCII 32).",
      "TRIM(...) then safely strips all the newly created standard spaces.",
      "The string length reduces from 15 bytes to exactly 13 bytes."
    ],
    proTip: "Excel's native TRIM() only detects ASCII 32. For any web, SAP, or Salesforce export, always apply SUBSTITUTE(..., CHAR(160), \" \") first."
  },
  {
    id: 5,
    title: "Purging Line Breaks & Control Characters from SQL Dump",
    functionUsed: "CLEAN & TRIM",
    category: "ETL Cleansing",
    difficulty: "Basic",
    difficultyColor: "emerald",
    scenario: "A legacy Oracle SQL dump exports delivery addresses with embedded carriage returns (ASCII 13) and line feeds (ASCII 10) in cell A6 ('Barasat Road' & CHAR(10) & 'Barrackpore  '). Strip all non-printable control characters into a single flat line.",
    inputCell: 'A6 = "Barasat Road" & CHAR(10) & "Barrackpore  "',
    targetCell: "B6",
    formula: '=TRIM(CLEAN(A6))',
    evaluatedOutput: '"Barasat RoadBarrackpore"',
    alternativeFormula: '=TRIM(CLEAN(SUBSTITUTE(A6, CHAR(10), " ")))',
    outputType: "Single-Line Address",
    stepByStepLogic: [
      "CLEAN(A6) removes the first 32 non-printable ASCII characters (0 through 31), including carriage returns and line feeds.",
      "TRIM(...) collapses and cleans any leftover standard whitespace.",
      "Produces a sanitized string that will not disrupt single-row CSV exports."
    ],
    proTip: "To preserve word separation when removing line breaks, substitute CHAR(10) with a space before wrapping in CLEAN and TRIM."
  },
  {
    id: 6,
    title: "Industrial Triple Clean Compound Formula",
    functionUsed: "TRIM, CLEAN, SUBSTITUTE & PROPER",
    category: "Advanced Hygiene",
    difficulty: "Advanced",
    difficultyColor: "rose",
    scenario: "An incoming raw vendor record in cell A7 contains web spaces, line breaks, inconsistent lower/upper casing, and erratic spacing: ('   debangshu' & CHAR(10) & CHAR(160) & '   roy  '). Apply the complete industrial gold-standard cleaning pipeline.",
    inputCell: 'A7 = "   debangshu" & CHAR(10) & CHAR(160) & "   roy  "',
    targetCell: "B7",
    formula: '=TRIM(CLEAN(PROPER(SUBSTITUTE(A7, CHAR(160), " "))))',
    evaluatedOutput: '"Debangshu Roy"',
    outputType: "Standardized Name",
    stepByStepLogic: [
      "SUBSTITUTE(A7, CHAR(160), \" \") converts non-breaking web spaces into standard ASCII 32 spaces.",
      "PROPER(...) capitalizes each word name ('Debangshu', 'Roy').",
      "CLEAN(...) strips the hidden CHAR(10) newline character.",
      "TRIM(...) collapses multiple spaces into a single pristine space, returning 'Debangshu Roy'."
    ],
    proTip: "This 4-tier combination is the single most resilient formula for cleaning raw vendor and customer feeds from untrusted external sources."
  },
  {
    id: 7,
    title: "Fixing PROPER() Formatting Anomalies with Irish Surnames",
    functionUsed: "SUBSTITUTE & PROPER",
    category: "Case Normalization",
    difficulty: "Intermediate",
    difficultyColor: "sky",
    scenario: "Applying =PROPER(\"o'connor\") produces 'O'connor' with a lowercase 'c' or improper casing in certain regional datasets. Ensure customer name in cell A8 ('o\\'connor') formats properly as 'O\\'Connor'.",
    inputCell: 'A8 = "o\'connor"',
    targetCell: "B8",
    formula: '=SUBSTITUTE(PROPER(SUBSTITUTE(A8, "\'", "\' ")), "\' ", "\'")',
    evaluatedOutput: '"O\'Connor"',
    outputType: "Proper Name",
    stepByStepLogic: [
      "PROPER treats apostrophes as word boundaries in modern Excel, but adding a temporary space after apostrophe ('o' connor') forces PROPER to capitalize 'Connor' -> 'O' Connor'.",
      "The outer SUBSTITUTE removes the temporary space, yielding 'O'Connor'.",
      "Eliminates manual corrections on Anglo/Celtic client registers."
    ],
    proTip: "Special surname prefixes (Mac, Mc, O', Von) require targeted post-processing after applying generic PROPER() rules."
  },
  {
    id: 8,
    title: "Batch Cleansing of Trailing Carriage Returns in Sensor Logs",
    functionUsed: "CLEAN & LEN Audit",
    category: "ETL Cleansing",
    difficulty: "Intermediate",
    difficultyColor: "sky",
    scenario: "IoT barcode scanner output in cell A9 imports machine part numbers with hidden trailing CHAR(13) carriage returns ('BATCH-8901' & CHAR(13)). Verify character count reduction before and after cleaning.",
    inputCell: 'A9 = "BATCH-8901" & CHAR(13)',
    targetCell: "B9",
    formula: '=CLEAN(A9)',
    evaluatedOutput: '"BATCH-8901"',
    outputType: "Clean Serial Code",
    stepByStepLogic: [
      "LEN(A9) before cleaning returns 11 characters due to the invisible trailing ASCII 13 byte.",
      "CLEAN(A9) deletes the ASCII 13 control code completely.",
      "LEN(CLEAN(A9)) evaluates to exactly 10 characters, matching the official part specification."
    ],
    proTip: "Invisible control characters in part numbers cause barcode scanners and automated warehouse robots to fail read verification."
  },
  {
    id: 9,
    title: "Standardizing Mixed State/City Codes for Pivot Table Grouping",
    functionUsed: "UPPER, TRIM & CLEAN",
    category: "Data Standardization",
    difficulty: "Basic",
    difficultyColor: "emerald",
    scenario: "Sales representatives entered regional zone codes with mixed cases and accidental spaces (e.g., cell A10 contains '  wb-kol-01  '). Standardize all zone codes for PivotTable report consolidation.",
    inputCell: 'A10 = "  wb-kol-01  "',
    targetCell: "B10",
    formula: '=UPPER(TRIM(CLEAN(A10)))',
    evaluatedOutput: '"WB-KOL-01"',
    outputType: "Region Code",
    stepByStepLogic: [
      "CLEAN(A10) removes any invisible control characters.",
      "TRIM(...) removes leading and trailing spaces.",
      "UPPER(...) converts 'wb-kol-01' to 'WB-KOL-01'.",
      "Ensures PivotTables group all Kolkata branch sales into a single consolidated row."
    ],
    proTip: "Without UPPER(TRIM()), PivotTables may create separate rows for 'WB-KOL-01', 'wb-kol-01', and ' WB-KOL-01 '."
  },
  {
    id: 10,
    title: "Sanitizing Hyphenated Product Category Identifiers",
    functionUsed: "UPPER, TRIM & SUBSTITUTE",
    category: "Data Standardization",
    difficulty: "Intermediate",
    difficultyColor: "sky",
    scenario: "Product classifications imported in cell A11 use irregular spacing around hyphens ('  hardware  -  screws  '). Standardize to uppercase with clean single-space hyphen separation.",
    inputCell: 'A11 = "  hardware  -  screws  "',
    targetCell: "B11",
    formula: '=UPPER(TRIM(SUBSTITUTE(A11, "  ", " ")))',
    evaluatedOutput: '"HARDWARE - SCREWS"',
    outputType: "Category Label",
    stepByStepLogic: [
      "SUBSTITUTE(A11, \"  \", \" \") collapses double spaces around delimiters.",
      "TRIM(...) strips outer whitespace and condenses internal gaps.",
      "UPPER(...) standardizes casing to 'HARDWARE - SCREWS'.",
      "Prepares product categories for automated ERP cataloging."
    ],
    proTip: "When sanitizing compound delimited text, combining SUBSTITUTE with TRIM ensures uniform spacing on both sides of hyphens and slashes."
  }
];

export default practicalQuestions;
