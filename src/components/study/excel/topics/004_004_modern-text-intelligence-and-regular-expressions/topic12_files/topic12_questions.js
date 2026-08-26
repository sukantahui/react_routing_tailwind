// topic12_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 12
// Topic: Real-world project: Building an automated enterprise customer master data validator and parser
// Module: 004_004_modern-text-intelligence-and-regular-expressions
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What is the primary objective of an Enterprise Customer Master Validator in modern Excel?",
    shortAnswer: "To automatically validate, sanitize, parse, and score incoming customer records (names, PAN, GSTIN, emails, phones) across enterprise compliance standards without manual intervention.",
    explanation: "Eliminates bad data entry at ingestion and guarantees 100% tax and audit compliance.",
    hint: "Automated ingestion, validation, and sanitization of master records.",
    level: "basic",
    codeExample: "Master Customer Data Governance Pipeline"
  },
  {
    question: "How do you calculate an overall Customer Record Quality Score (0% to 100%) across 5 compliance checks in 1 formula?",
    shortAnswer: "=(REGEXTEST(PAN, \"^[A-Z]{5}\\d{4}[A-Z]$\") + REGEXTEST(GST, \"^\\d{2}[A-Z]{5}\\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$\") + REGEXTEST(Email, \"^[\\w.%+-]+@[\\w.-]+\\.[a-zA-Z]{2,}$\") + REGEXTEST(Phone, \"^[6-9]\\d{9}$\") + REGEXTEST(PIN, \"^\\d{6}$\")) / 5",
    explanation: "Summing 5 boolean tests coerces TRUE to 1 and divides by 5 for a precise compliance score percentage.",
    hint: "Sum of 5 boolean REGEXTEST results / 5.",
    level: "advanced",
    codeExample: "=(ValidPAN + ValidGST + ValidEmail + ValidPhone + ValidPIN) / 5"
  },
  {
    question: "How do you generate an Exception Flag string detailing which specific fields failed (e.g. 'PAN Invalid; Email Invalid')?",
    shortAnswer: "=TEXTJOIN(\"; \", TRUE, IF(NOT(REGEXTEST(PAN, \"^[A-Z]{5}\\d{4}[A-Z]$\")), \"PAN Invalid\", \"\"), IF(NOT(REGEXTEST(Email, \"^[\\w.%+-]+@[\\w.-]+\\.[a-zA-Z]{2,}$\")), \"Email Invalid\", \"\"))",
    explanation: "TEXTJOIN joins only non-empty failure messages dynamically.",
    hint: "TEXTJOIN with IF(NOT(REGEXTEST(...)), 'Error Tag', '').",
    level: "expert",
    codeExample: "Dynamic Exception Flag Generator"
  },
  {
    question: "How do you sanitize the Customer Name column to remove HTML tags, collapse spaces, and capitalize words?",
    shortAnswer: "=PROPER(TRIM(REGEXREPLACE(REGEXREPLACE(A2, \"<[^>]+>\", \"\"), \"\\s+\", \" \")))",
    explanation: "Cleans tags, collapses multi-spaces, and title-cases.",
    hint: "PROPER(TRIM(REGEXREPLACE(REGEXREPLACE(A2, '<[^>]+>', ''), '\\s+', ' '))).",
    level: "basic",
    codeExample: "=PROPER(TRIM(REGEXREPLACE(REGEXREPLACE(A2, \"<[^>]+>\", \"\"), \"\\s+\", \" \")))"
  },
  {
    question: "How do you sanitize a raw phone string from international formats like `+91 (033) 2592-1144` down to 10 standard digits?",
    shortAnswer: "=RIGHT(REGEXREPLACE(A2, \"\\D\", \"\"), 10)",
    explanation: "`\\D` strips non-digits and RIGHT takes the trailing 10-digit number.",
    hint: "RIGHT(REGEXREPLACE(A2, \"\\D\", \"\"), 10).",
    level: "basic",
    codeExample: "=RIGHT(REGEXREPLACE(A2, \"\\D\", \"\"), 10)"
  },
  {
    question: "How do you verify whether the PAN embedded inside a GSTIN matches the customer's standalone PAN card number?",
    shortAnswer: "=EXACT(PAN_Cell, REGEXEXTRACT(GSTIN_Cell, \"[A-Z]{5}\\d{4}[A-Z]\"))",
    explanation: "Extracts characters 3-12 of GSTIN and tests exact case equality with standalone PAN.",
    hint: "EXACT(PAN, REGEXEXTRACT(GSTIN, \"[A-Z]{5}\\d{4}[A-Z]\")).",
    level: "moderate",
    codeExample: "=EXACT(C5, REGEXEXTRACT(D5, \"[A-Z]{5}\\d{4}[A-Z]\"))"
  },
  {
    question: "How do you extract the State Name from a GSTIN's leading 2-digit state code (e.g. `19` &rarr; `West Bengal`) in 1 formula?",
    shortAnswer: "=VLOOKUP(LEFT(GSTIN, 2), StateCodeTable, 2, FALSE)",
    explanation: "LEFT extracts the 2-digit state identifier and VLOOKUP returns state name.",
    hint: "VLOOKUP(LEFT(GSTIN, 2), StateTable, 2, FALSE).",
    level: "basic",
    codeExample: "=VLOOKUP(LEFT(D5, 2), tbl_StateCodes, 2, FALSE)"
  },
  {
    question: "How do you filter the entire customer master table to isolate 100% compliant records into a clean master view in RAM?",
    shortAnswer: "=FILTER(CustomerMaster, REGEXTEST(PAN_Col, \"^[A-Z]{5}\\d{4}[A-Z]$\") * REGEXTEST(GST_Col, \"^\\d{2}[A-Z]{5}\\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$\") * REGEXTEST(Email_Col, \"^[\\w.%+-]+@[\\w.-]+\\.[a-zA-Z]{2,}$\"))",
    explanation: "Multiplies boolean vectors to extract only rows passing all compliance checks.",
    hint: "FILTER(MasterTable, ValidPAN * ValidGST * ValidEmail).",
    level: "advanced",
    codeExample: "Master Approved Customer View Pipeline"
  },
  {
    question: "How do you filter the customer master to display only flagged exception records requiring remediation by the operations team?",
    shortAnswer: "=FILTER(CustomerMaster, NOT(REGEXTEST(PAN_Col, \"^[A-Z]{5}\\d{4}[A-Z]$\") * REGEXTEST(Email_Col, \"^[\\w.%+-]+@[\\w.-]+\\.[a-zA-Z]{2,}$\")))",
    explanation: "Wrapping the combined boolean vector in NOT extracts all rows with at least one defect.",
    hint: "FILTER(MasterTable, NOT(CombinedValidation)).",
    level: "advanced",
    codeExample: "Exceptions Audit View Pipeline"
  },
  {
    question: "How do you calculate the overall Enterprise Data Hygiene Rate % KPI in 1 LET formula?",
    shortAnswer: "=LET(total, ROWS(CustomerMaster), compliant, ROWS(FILTER(CustomerMaster, ValidPAN * ValidEmail * ValidGST)), compliant / total)",
    explanation: "LET computes compliant row count over total row count for instant executive dashboard KPI.",
    hint: "LET(total, ROWS(T), compliant, ROWS(FILTER(...)), compliant/total).",
    level: "expert",
    codeExample: "Executive Compliance KPI Formula"
  },
  {
    question: "How do you separate an unstructured address string `10/A, Shibtala Road, Barrackpore, 700120` into House No, Street, City, and PIN code columns?",
    shortAnswer: "=TEXTSPLIT(A2, \", \")",
    explanation: "Spills the 4 address components horizontally across 4 adjacent columns.",
    hint: "TEXTSPLIT(A2, \", \").",
    level: "basic",
    codeExample: "=TEXTSPLIT(A2, \", \")"
  },
  {
    question: "How do you mask the Customer Mobile Number for GDPR / DPDP compliance (e.g. `9876543210` &rarr; `XXXXXX3210`)?",
    shortAnswer: "=REGEXREPLACE(Phone, \"^\\d{6}(\\d{4})$\", \"XXXXXX$1\")",
    explanation: "Masks the first 6 digits and retains the last 4 digits with capturing group $1.",
    hint: "REGEXREPLACE(Phone, \"^\\d{6}(\\d{4})$\", \"XXXXXX$1\").",
    level: "basic",
    codeExample: "=REGEXREPLACE(A2, \"^\\d{6}(\\d{4})$\", \"XXXXXX$1\")"
  },
  {
    question: "How do you extract the company domain name from corporate emails across 5,000 customer records?",
    shortAnswer: "=TEXTAFTER(Email, \"@\")",
    explanation: "Extracts domain string after `@`.",
    hint: "TEXTAFTER(Email, \"@\").",
    level: "basic",
    codeExample: "=TEXTAFTER(E5:E5000, \"@\")"
  },
  {
    question: "How do you identify duplicate customer records based on normalized PAN card numbers in pure RAM?",
    shortAnswer: "=LET(pans, UPPER(TRIM(C5:C100)), MAP(pans, LAMBDA(p, IF(COUNTIF(pans, p)>1, \"DUPLICATE\", \"UNIQUE\"))))",
    explanation: "LET normalizes PANs and MAP flags records where occurrence count exceeds 1.",
    hint: "LET + COUNTIF > 1.",
    level: "advanced",
    codeExample: "In-Memory Duplicate PAN Detector"
  },
  {
    question: "How do you extract the date of customer registration from a mixed alphanumeric code `REG-20260826-BKP-001`?",
    shortAnswer: "=DATEVALUE(TEXTBEFORE(TEXTAFTER(A2, \"REG-\"), \"-\"))",
    explanation: "TEXTBEFORE and TEXTAFTER isolate `20260826` and DATEVALUE parses the date.",
    hint: "TEXTBEFORE(TEXTAFTER(A2, \"REG-\"), \"-\").",
    level: "moderate",
    codeExample: "=DATEVALUE(TEXTBEFORE(TEXTAFTER(A2, \"REG-\"), \"-\"))"
  },
  {
    question: "How do you extract the legal entity status (e.g. Individual vs Company) from the 4th character of the customer's PAN?",
    shortAnswer: "=SWITCH(MID(PAN, 4, 1), \"P\", \"Individual\", \"C\", \"Company\", \"H\", \"HUF\", \"F\", \"Partnership Firm\", \"T\", \"Trust\", \"Other\")",
    explanation: "The 4th letter of an Indian PAN defines the taxpayer legal category.",
    hint: "SWITCH(MID(PAN, 4, 1), 'P', 'Individual', 'C', 'Company', ...).",
    level: "moderate",
    codeExample: "=SWITCH(MID(C5, 4, 1), \"P\", \"Individual\", \"C\", \"Company\", \"F\", \"Firm\", \"Other\")"
  },
  {
    question: "How do you create an automated Customer ID code combining Region Code, Year, and Sequential Number (e.g. `BKP-2026-0001`)?",
    shortAnswer: "=\"BKP-\" & YEAR(TODAY()) & \"-\" & TEXT(ROW()-4, \"0000\")",
    explanation: "Dynamic string concatenation with zero-padded number formatting.",
    hint: "Concatenation + TEXT(..., '0000').",
    level: "basic",
    codeExample: "=\"BKP-\" & YEAR(TODAY()) & \"-\" & TEXT(SEQUENCE(ROWS(Data)), \"0000\")"
  },
  {
    question: "How do you build a dynamic Customer Master LAMBDA `FX_VALIDATE_CUSTOMER` that takes 1 row and returns `APPROVED` or `FLAGGED`?",
    shortAnswer: "=LAMBDA(row, IF(REGEXTEST(INDEX(row,3), \"^[A-Z]{5}\\d{4}[A-Z]$\") * REGEXTEST(INDEX(row,4), \"^[\\w.%+-]+@[\\w.-]+\\.[a-zA-Z]{2,}$\"), \"APPROVED\", \"FLAGGED\"))",
    explanation: "Encapsulates multi-column row validation into a reusable enterprise function.",
    hint: "LAMBDA(row, IF(ValidPAN * ValidEmail, 'APPROVED', 'FLAGGED')).",
    level: "expert",
    codeExample: "FX_VALIDATE_CUSTOMER Named LAMBDA"
  },
  {
    question: "How do you build a multi-column summary report of Master Data Health showing total records by City and Status?",
    shortAnswer: "=PIVOTBY(CityCol, StatusCol, CustomerIDCol, COUNTA, 0, 0)",
    explanation: "PIVOTBY cross-tabulates counts of approved vs flagged records by geographic hub.",
    hint: "PIVOTBY(City, Status, ID, COUNTA).",
    level: "advanced",
    codeExample: "=PIVOTBY(B5:B100, F5:F100, A5:A100, COUNTA)"
  },
  {
    question: "How do you convert all lowercase letters in PAN and GSTIN fields to uppercase automatically during ingestion?",
    shortAnswer: "=UPPER(TRIM(A2))",
    explanation: "UPPER standardizes all tax ID strings to uppercase characters.",
    hint: "UPPER(TRIM(A2)).",
    level: "basic",
    codeExample: "=UPPER(TRIM(C5))"
  },
  {
    question: "How do you validate that a customer's postal PIN code corresponds to the state specified in their GSTIN?",
    shortAnswer: "Cross-reference the first 2 digits of the PIN code with the GSTIN state code lookup table.",
    explanation: "Validates geographic coherence between postal and tax records.",
    hint: "GST state code vs PIN code region cross-check.",
    level: "advanced",
    codeExample: "Geographic Coherence Cross-Check"
  },
  {
    question: "How do you extract the first name of a customer while handling honorific titles (`Mr.`, `Ms.`, `Dr.`, `Prof.`)?",
    shortAnswer: "=TEXTBEFORE(REGEXREPLACE(FullName, \"^(Mr\\.|Ms\\.|Mrs\\.|Dr\\.|Prof\\.)\\s+\", \"\", 0, 1), \" \", , , 1)",
    explanation: "Strips honorific prefix first, then pulls the first name before the space.",
    hint: "Strip honorific prefix with REGEXREPLACE, then TEXTBEFORE.",
    level: "advanced",
    codeExample: "=TEXTBEFORE(REGEXREPLACE(A2, \"^(Mr\\.|Dr\\.)\\s+\", \"\", 0, 1), \" \", , , 1)"
  },
  {
    question: "How do you sort the customer master table so that Flagged exception records appear at the top for immediate review?",
    shortAnswer: "=SORTBY(CustomerMaster, ComplianceScoreCol, 1)",
    explanation: "Ascending sort (1) places low compliance scores (0% and 20%) at the top.",
    hint: "SORTBY(MasterTable, ScoreCol, 1).",
    level: "moderate",
    codeExample: "=SORTBY(A5:G50, G5:G50, 1)"
  },
  {
    question: "How do you remove non-printable control characters and invisible line breaks from imported customer remarks in 1 step?",
    shortAnswer: "=CLEAN(TRIM(REGEXREPLACE(A2, \"[\\x00-\\x1F]\", \"\")))",
    explanation: "CLEAN and REGEXREPLACE remove all ASCII 0-31 control characters.",
    hint: "CLEAN(TRIM(REGEXREPLACE(A2, \"[\\x00-\\x1F]\", \"\"))).",
    level: "basic",
    codeExample: "=CLEAN(TRIM(REGEXREPLACE(A2, \"[\\x00-\\x1F]\", \"\")))"
  },
  {
    question: "How do you sanitize customer web URLs to ensure they all start with `https://`?",
    shortAnswer: "=IF(REGEXTEST(A2, \"^https?://\"), A2, \"https://\" & A2)",
    explanation: "Tests for protocol prefix and prepends `https://` if missing.",
    hint: "IF(REGEXTEST(URL, '^https?://'), URL, 'https://' & URL).",
    level: "basic",
    codeExample: "=IF(REGEXTEST(A2, \"^https?://\"), A2, \"https://\" & A2)"
  },
  {
    question: "How do you extract all numerical digits from an unstructured payment reference string and sum them?",
    shortAnswer: "=SUM(NUMBERVALUE(TOCOL(REGEXEXTRACT(A2, \"\\d+\", 1), 3)))",
    explanation: "Extracts all number segments, flattens with TOCOL, converts with NUMBERVALUE, and sums.",
    hint: "SUM(NUMBERVALUE(TOCOL(REGEXEXTRACT(A2, '\\d+', 1), 3))).",
    level: "moderate",
    codeExample: "=SUM(NUMBERVALUE(TOCOL(REGEXEXTRACT(A2, \"\\d+\", 1), 3)))"
  },
  {
    question: "How do you calculate the percentage of customer records with missing or invalid GSTINs across 10,000 rows?",
    shortAnswer: "=COUNTIF(GST_Valid_Col, FALSE) / ROWS(CustomerMaster)",
    explanation: "Counts invalid flags and divides by total rows.",
    hint: "COUNTIF(ValidCol, FALSE) / TotalRows.",
    level: "basic",
    codeExample: "=COUNTIF(D5:D10000, FALSE) / ROWS(A5:A10000)"
  },
  {
    question: "How do you build a dynamic audit summary dashboard in 1 LET formula showing Total Records, Valid PAN %, Valid Email %, Valid GST %, and Clean Rate %?",
    shortAnswer: "=LET(n, ROWS(A5:A100), p, SUM(--REGEXTEST(C5:C100, \"^[A-Z]{5}\\d{4}[A-Z]$\"))/n, e, SUM(--REGEXTEST(D5:D100, \"^[\\w.%+-]+@[\\w.-]+\\.[a-zA-Z]{2,}$\"))/n, g, SUM(--REGEXTEST(E5:E100, \"^\\d{2}[A-Z]{5}\\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$\"))/n, HSTACK(n, p, e, g, (p+e+g)/3))",
    explanation: "LET computes all compliance KPI ratios dynamically in pure RAM.",
    hint: "LET dashboard formula calculating all compliance metrics.",
    level: "expert",
    codeExample: "Complete In-Memory Master Health Dashboard"
  },
  {
    question: "Why is building an automated customer master validator in formula RAM superior to manual spreadsheet auditing?",
    shortAnswer: "It provides instantaneous, 100% deterministic validation, eliminates human fatigue errors, recalculates automatically upon new data entry, and requires zero external Python or VBA scripts.",
    explanation: "Transforms Excel into an institutional-grade data governance platform.",
    hint: "Instant deterministic validation + zero human error + live recalculation.",
    level: "expert",
    codeExample: "Institutional Data Governance in Excel 365"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for the Enterprise Customer Master Data Project?",
    shortAnswer: "Data integrity is non-negotiable in enterprise financial systems! Build end-to-end automated pipelines combining PROPER/TRIM sanitization, anchored REGEXTEST pattern validation (PAN, GSTIN, Email, Phone), dynamic exception flagging (TEXTJOIN), and SIMD dynamic array filtering (FILTER, SORTBY) to achieve 100% data governance in pure formula RAM with zero VBA macros!",
    explanation: "Clean master data guarantees that enterprise billing, tax filings, reconciliations, and CRM pipelines operate with zero audit defects!",
    hint: "Sanitization + Multi-Field Regex Validation + Dynamic Exception Flags + FILTER RAM Segregation = 100% Data Governance!",
    level: "expert",
    codeExample: "Rule: Enterprise Customer Master &rarr; Build Live Formulaic Governance Pipelines!"
  }
];

export default questions;
