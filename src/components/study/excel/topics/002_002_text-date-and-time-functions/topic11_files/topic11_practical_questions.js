// topic11_files/topic11_practical_questions.js
// 10 Strictly Practical Enterprise Questions for Topic 11: Real-World ETL Case Study

export const practicalQuestions = [
  {
    id: 1,
    title: "Sanitizing Whitespace & Case-Normalizing Mixed Case Customer Names",
    functionUsed: "PROPER + TRIM + CLEAN",
    category: "Name Standardization",
    difficulty: "Basic",
    difficultyColor: "emerald",
    scenario: "Customer registration names in cell A2 are entered erratically with uppercase bursts, non-printable characters, and erratic spacing: '  sUbhAshRee   CHATTOPADHYAY  '. Normalize this into professional Title Case.",
    inputCell: 'A2 = "  sUbhAshRee   CHATTOPADHYAY  "',
    targetCell: "B2",
    formula: '=PROPER(TRIM(CLEAN(A2)))',
    evaluatedOutput: '"Subhashree Chattopadhyay"',
    outputType: "Cleaned Text",
    stepByStepLogic: [
      "CLEAN(A2) removes ASCII non-printable control codes (0 to 31).",
      "TRIM collapses all multi-space gaps into single spaces and removes leading/trailing spaces.",
      "PROPER capitalizes the first letter of each word and converts all other characters to lowercase."
    ],
    proTip: "This 3-function pipeline (PROPER + TRIM + CLEAN) is the foundational text-cleaning standard across CRM systems."
  },
  {
    id: 2,
    title: "Parsing 6-Digit Indian PIN Code / Postal Code from End of Address",
    functionUsed: "RIGHT with VALUE",
    category: "Address Parsing",
    difficulty: "Basic",
    difficultyColor: "emerald",
    scenario: "Full address string in cell A3 is 'Flat 4B, Greenfield Heights, Kolkata - 700156'. Extract the 6-digit postal PIN code from the end of the text string as a calculable number.",
    inputCell: 'A3 = "Flat 4B, Greenfield Heights, Kolkata - 700156"',
    targetCell: "B3",
    formula: '=VALUE(RIGHT(TRIM(A3), 6))',
    evaluatedOutput: "700156",
    outputType: "Numeric Integer",
    stepByStepLogic: [
      "TRIM(A3) ensures trailing spaces don't shift character positions.",
      "RIGHT(..., 6) extracts the last 6 characters: '700156'.",
      "VALUE() coerces the extracted text into the numeric integer 700156 for zip code zone mapping."
    ],
    proTip: "If postal codes have leading zeros (e.g. US ZIP 01234), omit VALUE() to preserve the leading zero."
  },
  {
    id: 3,
    title: "Extracting City Name Located Between Two Commas",
    functionUsed: "TRIM + MID + FIND",
    category: "Address Parsing",
    difficulty: "Advanced",
    difficultyColor: "rose",
    scenario: "Cell A4 contains '124 Park Street, Kolkata, West Bengal 700016'. Extract the city name ('Kolkata') situated between the 1st and 2nd commas.",
    inputCell: 'A4 = "124 Park Street, Kolkata, West Bengal 700016"',
    targetCell: "B4",
    formula: '=TRIM(MID(A4, FIND(",", A4) + 1, FIND(",", A4, FIND(",", A4) + 1) - FIND(",", A4) - 1))',
    alternativeFormula: '=TRIM(TEXTBEFORE(TEXTAFTER(A4, ","), ","))',
    evaluatedOutput: '"Kolkata"',
    outputType: "Text String",
    stepByStepLogic: [
      "FIND(',', A4) locates the 1st comma at position 16.",
      "FIND(',', A4, 17) locates the 2nd comma at position 25.",
      "MID extracts substring from position 17 for length (25 - 16 - 1) = 8 (' Kolkata').",
      "TRIM strips the leading space yielding 'Kolkata'."
    ],
    proTip: "In modern Excel 365, =TRIM(TEXTBEFORE(TEXTAFTER(A4, \",\"), \",\")) replaces this complex formula."
  },
  {
    id: 4,
    title: "Normalizing Phone Numbers to International E.164 Standard (+91)",
    functionUsed: "RIGHT + SUBSTITUTE Nested",
    category: "Phone Standardization",
    difficulty: "Intermediate",
    difficultyColor: "amber",
    scenario: "Raw mobile numbers in cell A5 appear in messy formats: '098301-23456', '+91 9830123456', or '(0) 9830123456'. Extract the 10 core subscriber digits and prefix with '+91-'.",
    inputCell: 'A5 = "098301-23456"',
    targetCell: "B5",
    formula: '="+91-" & RIGHT(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(A5, "-", ""), " ", ""), "(0)", ""), 10)',
    evaluatedOutput: '"+91-9830123456"',
    outputType: "Formatted E.164 String",
    stepByStepLogic: [
      "Nested SUBSTITUTE strips hyphens, spaces, and leading '(0)' tags.",
      "RIGHT(..., 10) extracts precisely the last 10 subscriber digits.",
      "Concatenates with '+91-' for CRM SMS gateway formatting."
    ],
    proTip: "Using RIGHT(..., 10) safely ignores whether the original input had a leading 0 or +91 country prefix."
  },
  {
    id: 5,
    title: "Parsing Non-Standard US Date Strings ('MM/DD/YYYY') into Real Serial Dates",
    functionUsed: "DATE + MID + LEFT + RIGHT",
    category: "Timestamp ETL",
    difficulty: "Intermediate",
    difficultyColor: "amber",
    scenario: "A US CRM exports dates as text in cell A6: '04/15/2026' (April 15, 2026). When opened on UK/India regional PCs, Excel treats this as invalid text. Parse into a true universal Excel serial date.",
    inputCell: 'A6 = "04/15/2026"',
    targetCell: "B6",
    formula: '=DATE(RIGHT(A6, 4), LEFT(A6, 2), MID(A6, 4, 2))',
    evaluatedOutput: "46127 (15-Apr-2026)",
    outputType: "Excel Serial Date",
    stepByStepLogic: [
      "RIGHT(A6, 4) isolates the year '2026'.",
      "LEFT(A6, 2) isolates the month '04'.",
      "MID(A6, 4, 2) isolates the day '15'.",
      "DATE(2026, 4, 15) generates integer serial 46127, completely bypassing OS regional date ambiguities."
    ],
    proTip: "Never use DATEVALUE() on foreign date formats because it depends on the host PC's Windows regional settings."
  },
  {
    id: 6,
    title: "Isolating Domain Name from Dirty Customer Email Addresses",
    functionUsed: "LOWER + TRIM + MID + FIND",
    category: "Email Parsing",
    difficulty: "Intermediate",
    difficultyColor: "amber",
    scenario: "Customer email in cell A7 is '  Contact_Admin@ACME-CORP.CO.IN  '. Extract the clean, lowercase corporate email domain ('acme-corp.co.in') for B2B company domain classification.",
    inputCell: 'A7 = "  Contact_Admin@ACME-CORP.CO.IN  "',
    targetCell: "B7",
    formula: '=LOWER(TRIM(MID(A7, FIND("@", A7) + 1, LEN(A7))))',
    alternativeFormula: '=LOWER(TRIM(TEXTAFTER(A7, "@")))',
    evaluatedOutput: '"acme-corp.co.in"',
    outputType: "Clean Domain Text",
    stepByStepLogic: [
      "FIND('@', A7) finds character index of '@'.",
      "MID(A7, FIND(...) + 1, LEN(A7)) extracts everything following the '@'.",
      "TRIM removes surrounding spaces; LOWER converts 'ACME-CORP.CO.IN' to 'acme-corp.co.in'."
    ],
    proTip: "Corporate email domains can be matched against a master CRM account table to group multi-contact leads by company."
  },
  {
    id: 7,
    title: "Extracting Customer Salutation / Honorific (Mr., Mrs., Dr.)",
    functionUsed: "IF + ISNUMBER + FIND",
    category: "Name Standardization",
    difficulty: "Intermediate",
    difficultyColor: "amber",
    scenario: "Cell A8 contains 'Dr. Rajesh Khanna' or 'Smt. Ananya Sen'. Extract the salutation prefix if present; otherwise return 'Individual'.",
    inputCell: 'A8 = "Dr. Rajesh Khanna"',
    targetCell: "B8",
    formula: '=IF(ISNUMBER(FIND(".", A8)), LEFT(A8, FIND(".", A8)), "Individual")',
    evaluatedOutput: '"Dr."',
    outputType: "Text String",
    stepByStepLogic: [
      "FIND('.', A8) tests if a period follows a formal prefix (Mr., Mrs., Dr., Prof.).",
      "If found, LEFT(A8, FIND('.'...)) extracts 'Dr.'.",
      "If no period is present (e.g. 'Subhashree Bose'), returns default 'Individual'."
    ],
    proTip: "Standardizing honorifics helps marketing teams generate dynamic personalized email greetings ('Dear Dr. Khanna')."
  },
  {
    id: 8,
    title: "Parsing Combined Address into Spilled 3-Column Array (Street, City, State-Zip)",
    functionUsed: "TEXTSPLIT with TRIM",
    category: "Dynamic Array ETL",
    difficulty: "Advanced",
    difficultyColor: "rose",
    scenario: "A comma-delimited single-cell address in A9 is 'Suite 500, Kolkata, WB 700091'. Split this into 3 horizontal columns simultaneously with all extra whitespace removed.",
    inputCell: 'A9 = "Suite 500, Kolkata, WB 700091"',
    targetCell: "B9#",
    formula: '=TRIM(TEXTSPLIT(A9, ","))',
    evaluatedOutput: '["Suite 500", "Kolkata", "WB 700091"]',
    outputType: "Spilled Array (1x3)",
    stepByStepLogic: [
      "TEXTSPLIT(A9, ',') splits the text horizontally into 3 cells.",
      "TRIM wraps the resulting array and cleans leading spaces from each split token.",
      "Spills across cells B9, C9, and D9 in one calculation."
    ],
    proTip: "Wrapping TEXTSPLIT in TRIM eliminates manual TRIM formulas across every extracted column."
  },
  {
    id: 9,
    title: "Extracting Unix Epoch Timestamp (Seconds) and Converting to Real DateTime",
    functionUsed: "Epoch Math + DATE",
    category: "Timestamp ETL",
    difficulty: "Advanced",
    difficultyColor: "rose",
    scenario: "A server access log in cell A10 records Unix epoch timestamps in seconds: 1776263400. Convert this raw integer into an Excel human-readable Date & Time.",
    inputCell: 'A10 = 1776263400 (Unix timestamp)',
    targetCell: "B10",
    formula: '=DATE(1970, 1, 1) + (A10 / 86400)',
    evaluatedOutput: "46127.625 (15-Apr-2026 15:00:00)",
    outputType: "DateTime Serial Number",
    stepByStepLogic: [
      "Unix epoch starts at 01-Jan-1970 00:00:00 UTC.",
      "There are 86,400 seconds in a day (24 * 60 * 60).",
      "Dividing epoch seconds by 86400 yields elapsed Excel days.",
      "Adding DATE(1970,1,1) establishes the true Excel serial DateTime."
    ],
    proTip: "If Unix timestamp is in milliseconds (13 digits), divide by 86,400,000 instead: =DATE(1970,1,1)+(A10/86400000)."
  },
  {
    id: 10,
    title: "End-to-End Master Lead Cleansing Pipeline (Name, Domain, & Date)",
    functionUsed: "Master Pipeline Formula",
    category: "Pipeline Synthesis",
    difficulty: "Advanced",
    difficultyColor: "rose",
    scenario: "Cell A11 contains dirty raw lead text: 'lead:subhashree.c@corp.com|2026-04-15|approved'. Extract the clean email address, capitalize the domain name, and convert the ISO date string to DD-MMM-YYYY format in cell B11.",
    inputCell: 'A11 = "lead:subhashree.c@corp.com|2026-04-15|approved"',
    targetCell: "B11",
    formula: '=TEXTBEFORE(TEXTAFTER(A11, "lead:"), "|") & " (" & TEXT(DATEVALUE(MID(A11, FIND("|", A11)+1, 10)), "dd-mmm-yyyy") & ")"',
    evaluatedOutput: '"subhashree.c@corp.com (15-Apr-2026)"',
    outputType: "Synthesized Text",
    stepByStepLogic: [
      "TEXTAFTER(A11, 'lead:') strips the prefix 'lead:'.",
      "TEXTBEFORE(..., '|') extracts clean email address 'subhashree.c@corp.com'.",
      "MID extracts the 10-character ISO date '2026-04-15', which DATEVALUE and TEXT format as '15-Apr-2026'.",
      "Concatenates with '&' into professional summary string."
    ],
    proTip: "Building modular ETL formulas prevents bulky data migration scripts in Python or SQL."
  }
];

export default practicalQuestions;
