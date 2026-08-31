// topic2_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 2
// Topic: Pattern matching and validation with REGEXTEST (email, phone, PAN, GSTIN, postal codes)
// Module: 004_004_modern-text-intelligence-and-regular-expressions
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What is the primary function of REGEXTEST in Excel 365?",
    shortAnswer: "To test whether a given text string matches a regular expression pattern, returning TRUE if a match is found and FALSE otherwise.",
    explanation: "Provides boolean validation for data entry control, compliance auditing, and conditional formatting.",
    hint: "Returns boolean TRUE/FALSE pattern match.",
    level: "basic",
    codeExample: "=REGEXTEST(text, pattern, [case_sensitivity])"
  },
  {
    question: "What is the return type of the REGEXTEST function?",
    shortAnswer: "A single boolean value: TRUE or FALSE.",
    explanation: "Ideal for logical branching with IF, FILTER conditions, and Conditional Formatting formulas.",
    hint: "Boolean TRUE or FALSE.",
    level: "basic",
    codeExample: "=IF(REGEXTEST(A2, pattern), \"Valid\", \"Invalid\")"
  },
  {
    question: "What is the regex pattern to validate a standard Indian PAN (Permanent Account Number) with REGEXTEST?",
    shortAnswer: "^[A-Z]{5}[0-9]{4}[A-Z]$",
    explanation: "Enforces 5 uppercase letters, followed by 4 digits, and 1 trailing check letter.",
    hint: "^[A-Z]{5}[0-9]{4}[A-Z]$.",
    level: "basic",
    codeExample: "=REGEXTEST(A2, \"^[A-Z]{5}[0-9]{4}[A-Z]$\")"
  },
  {
    question: "What is the regex pattern to validate a standard 15-character Indian GSTIN with REGEXTEST?",
    shortAnswer: "^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$",
    explanation: "Validates 2-digit state code, 10-character PAN, entity code, literal 'Z', and check digit.",
    hint: "^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$.",
    level: "advanced",
    codeExample: "=REGEXTEST(C5, \"^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$\")"
  },
  {
    question: "How do you validate corporate email addresses using REGEXTEST?",
    shortAnswer: "=REGEXTEST(A2, \"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$\")",
    explanation: "Checks for valid username characters, `@`, domain name, dot, and top-level domain of at least 2 letters.",
    hint: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$.",
    level: "moderate",
    codeExample: "=REGEXTEST(D5, \"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$\")"
  },
  {
    question: "How do you validate a 10-digit Indian mobile number with optional `+91 ` country code prefix?",
    shortAnswer: "=REGEXTEST(A2, \"^(\\+91[\\s-]?)?[6-9]\\d{9}$\")",
    explanation: "Optional group `(\\+91[\\s-]?)?` allows `+91`, `+91-`, or no prefix, followed by 10 digits starting with 6-9.",
    hint: "^(\\+91[\\s-]?)?[6-9]\\d{9}$.",
    level: "moderate",
    codeExample: "=REGEXTEST(E5, \"^(\\+91[\\s-]?)?[6-9]\\d{9}$\")"
  },
  {
    question: "How do you validate a 6-digit Indian Postal PIN code (cannot start with 0)?",
    shortAnswer: "=REGEXTEST(A2, \"^[1-9][0-9]{5}$\")",
    explanation: "Ensures the first digit is 1-9 followed by exactly 5 numeric digits.",
    hint: "^[1-9][0-9]{5}$.",
    level: "basic",
    codeExample: "=REGEXTEST(F5, \"^[1-9][0-9]{5}$\")"
  },
  {
    question: "How do you use REGEXTEST directly inside an Excel Conditional Formatting rule to highlight invalid emails in red?",
    shortAnswer: "Set the formula rule to `=NOT(REGEXTEST(D5, \"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$\"))` and format fill as Red.",
    explanation: "Highlights any non-conforming email cell automatically upon data entry.",
    hint: "Formula: =NOT(REGEXTEST(cell, pattern)).",
    level: "moderate",
    codeExample: "=NOT(REGEXTEST(D5, \"^[\\w.%+-]+@[\\w.-]+\\.[a-zA-Z]{2,}$\"))"
  },
  {
    question: "How do you make REGEXTEST case-insensitive when validating tax codes?",
    shortAnswer: "Pass `1` as the third argument: `=REGEXTEST(A2, \"^[a-z]{5}\\d{4}[a-z]$\", 1)`.",
    explanation: "Setting case_sensitivity to 1 enables case-insensitive pattern matching.",
    hint: "Pass 1 as the third parameter.",
    level: "basic",
    codeExample: "=REGEXTEST(A2, \"^[A-Z]{5}\\d{4}[A-Z]$\", 1)"
  },
  {
    question: "How do you combine REGEXTEST with the FILTER function to dynamically extract only clients with valid PAN cards?",
    shortAnswer: "=FILTER(CustomerTable, REGEXTEST(CHOOSECOLS(CustomerTable, 3), \"^[A-Z]{5}[0-9]{4}[A-Z]$\"))",
    explanation: "REGEXTEST evaluates the column vector and returns a boolean array for FILTER to include only valid records.",
    hint: "FILTER(Table, REGEXTEST(Col, Pattern)).",
    level: "advanced",
    codeExample: "=FILTER(A5:D20, REGEXTEST(C5:C20, \"^[A-Z]{5}\\d{4}[A-Z]$\"))"
  },
  {
    question: "What happens if you omit the `^` and `$` anchors in a REGEXTEST validation formula?",
    shortAnswer: "REGEXTEST will return TRUE if the pattern exists as an internal substring, leading to false positives on invalid data like 'ABCDE1234F999'.",
    explanation: "Anchors enforce full-string conformity.",
    hint: "Causes false positives by matching partial substrings.",
    level: "basic",
    codeExample: "Without anchors: 'XYZABCDE1234F999' → TRUE (False Positive!)"
  },
  {
    question: "How do you validate an International IBAN bank account number format?",
    shortAnswer: "=REGEXTEST(A2, \"^[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}([A-Z0-9]?){0,16}$\")",
    explanation: "Validates 2 country letters, 2 check digits, 4 bank code chars, and up to 23 account characters.",
    hint: "2 country letters + 2 check digits + alphanumeric account chars.",
    level: "advanced",
    codeExample: "=REGEXTEST(A2, \"^[A-Z]{2}\\d{2}[A-Z0-9]{12,30}$\")"
  },
  {
    question: "How do you validate strong corporate passwords (at least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special symbol) with REGEXTEST?",
    shortAnswer: "=REGEXTEST(A2, \"^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$\")",
    explanation: "Uses lookahead assertions `(?=...)` to check all 4 security conditions across the string.",
    hint: "Positive lookahead assertions (?=...).",
    level: "expert",
    codeExample: "=REGEXTEST(Pass, \"^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$\")"
  },
  {
    question: "How do you count how many records in a 1,000-row column contain valid phone numbers?",
    shortAnswer: "=SUM(--REGEXTEST(PhoneColumn, \"^(\\+91[\\s-]?)?[6-9]\\d{9}$\"))",
    explanation: "Double unary `--` converts boolean TRUE/FALSE into 1/0, and SUM counts total valid records.",
    hint: "SUM(--REGEXTEST(Column, Pattern)).",
    level: "moderate",
    codeExample: "=SUM(--REGEXTEST(E5:E1000, \"^(\\+91[\\s-]?)?[6-9]\\d{9}$\"))"
  },
  {
    question: "How do you validate standard Indian Vehicle Registration numbers (e.g. `WB-24-AB-1234` or `WB24AB1234`)?",
    shortAnswer: "=REGEXTEST(A2, \"^[A-Z]{2}[-\\s]?[0-9]{2}[-\\s]?[A-Z]{1,2}[-\\s]?[0-9]{4}$\")",
    explanation: "Validates 2 state letters, optional hyphen/space, 2 RTO digits, 1-2 series letters, and 4 registration digits.",
    hint: "^[A-Z]{2}[-\\s]?[0-9]{2}[-\\s]?[A-Z]{1,2}[-\\s]?[0-9]{4}$.",
    level: "moderate",
    codeExample: "=REGEXTEST(A2, \"^[A-Z]{2}[-\\s]?\\d{2}[-\\s]?[A-Z]{1,2}[-\\s]?\\d{4}$\")"
  },
  {
    question: "How do you validate a website URL starting with http:// or https:// using REGEXTEST?",
    shortAnswer: "=REGEXTEST(A2, \"^https?:\\/\\/[\\w.-]+\\.[a-zA-Z]{2,}(\\/.*)?$\")",
    explanation: "`https?` matches http or https, followed by `://`, domain name, and optional trailing path.",
    hint: "^https?:\\/\\/[\\w.-]+\\.[a-zA-Z]{2,}(\\/.*)?$.",
    level: "moderate",
    codeExample: "=REGEXTEST(URL, \"^https?:\\/\\/[\\w.-]+\\.[a-zA-Z]{2,}\")"
  },
  {
    question: "How do you create a named LAMBDA function `FX_IS_VALID_EMAIL` in Name Manager for company-wide email validation?",
    shortAnswer: "=LAMBDA(email, REGEXTEST(email, \"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$\"))",
    explanation: "Encapsulates the complex email pattern into a reusable, named 1-parameter corporate function.",
    hint: "LAMBDA(email, REGEXTEST(email, pattern)).",
    level: "advanced",
    codeExample: "FX_IS_VALID_EMAIL = LAMBDA(e, REGEXTEST(e, \"^[\\w.%+-]+@[\\w.-]+\\.[a-zA-Z]{2,}$\"))"
  },
  {
    question: "What happens if a cell passed to REGEXTEST is blank or empty?",
    shortAnswer: "It tests against an empty string `\"\"` and returns FALSE (unless the regex pattern explicitly permits empty strings e.g. `^.*$`).",
    explanation: "Blank cells evaluate to empty strings.",
    hint: "Returns FALSE for non-empty patterns.",
    level: "basic",
    codeExample: "Empty Cell → Returns FALSE"
  },
  {
    question: "How do you validate an IPv4 address (e.g. 192.168.1.1) using REGEXTEST?",
    shortAnswer: "=REGEXTEST(A2, \"^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$\")",
    explanation: "Validates 4 octets each bounded between 0 and 255 separated by dots.",
    hint: "4 octets 0-255 separated by dots.",
    level: "expert",
    codeExample: "IPv4 Octet Range Pattern"
  },
  {
    question: "How do you validate that an input contains only alphabetical letters and spaces (e.g. Employee Full Name)?",
    shortAnswer: "=REGEXTEST(A2, \"^[a-zA-Z\\s]+$\")",
    explanation: "Matches one or more lowercase/uppercase letters or spaces with zero digits or symbols allowed.",
    hint: "^[a-zA-Z\\s]+$.",
    level: "basic",
    codeExample: "=REGEXTEST(Name, \"^[a-zA-Z\\s]+$\")"
  },
  {
    question: "How do you validate a 12-digit Indian Aadhaar number formatted as 4-4-4 (e.g. 5482-9921-3344)?",
    shortAnswer: "=REGEXTEST(A2, \"^[2-9][0-9]{3}[-\\s]?[0-9]{4}[-\\s]?[0-9]{4}$\")",
    explanation: "Aadhaar numbers do not start with 0 or 1, followed by 3 blocks of 4 digits.",
    hint: "^[2-9][0-9]{3}[-\\s]?[0-9]{4}[-\\s]?[0-9]{4}$.",
    level: "moderate",
    codeExample: "=REGEXTEST(A2, \"^[2-9]\\d{3}[-\\s]?\\d{4}[-\\s]?\\d{4}$\")"
  },
  {
    question: "How do you check if a transaction code matches one of four valid corporate prefixes (BKP-, SHY-, ICH-, NAI-)?",
    shortAnswer: "=REGEXTEST(A2, \"^(BKP|SHY|ICH|NAI)-\\d+$\")",
    explanation: "Uses alternation `(BKP|SHY|ICH|NAI)` followed by hyphen and digits.",
    hint: "^(BKP|SHY|ICH|NAI)-\\d+$.",
    level: "basic",
    codeExample: "=REGEXTEST(A2, \"^(BKP|SHY|ICH|NAI)-\\d+$\")"
  },
  {
    question: "How do you validate a 10-digit US telephone number format `(123) 456-7890` or `123-456-7890`?",
    shortAnswer: "=REGEXTEST(A2, \"^(\\(\\d{3}\\)|\\d{3})[-\\s]?\\d{3}[-\\s]?\\d{4}$\")",
    explanation: "Matches 3-digit area code (with or without parentheses), hyphen/space, 3 exchange digits, and 4 line digits.",
    hint: "^(\\(\\d{3}\\)|\\d{3})[-\\s]?\\d{3}[-\\s]?\\d{4}$.",
    level: "moderate",
    codeExample: "=REGEXTEST(Phone, \"^(\\(\\d{3}\\)|\\d{3})[-\\s]?\\d{3}[-\\s]?\\d{4}$\")"
  },
  {
    question: "Can REGEXTEST evaluate an entire array of cells dynamically in a single spilled formula?",
    shortAnswer: "Yes, passing a range (e.g. `=REGEXTEST(C5:C20, pattern)`) returns a dynamic spilled column array of TRUE/FALSE values.",
    explanation: "Fully dynamic array vectorized across row ranges.",
    hint: "Passes array range and returns spilled boolean vector.",
    level: "moderate",
    codeExample: "=REGEXTEST(C5:C20, \"^[A-Z]{5}\\d{4}[A-Z]$\")"
  },
  {
    question: "How do you validate an ISO 8601 Date format `YYYY-MM-DD` with REGEXTEST?",
    shortAnswer: "=REGEXTEST(A2, \"^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$\")",
    explanation: "Ensures 4-digit year, valid 2-digit month (01-12), and valid 2-digit day (01-31).",
    hint: "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$.",
    level: "moderate",
    codeExample: "=REGEXTEST(DateStr, \"^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$\")"
  },
  {
    question: "What is the speed advantage of REGEXTEST over writing complex nested OR/AND/LEN/ISNUMBER formulas?",
    shortAnswer: "A single REGEXTEST pattern replaces 15 nested formula checks, executes in sub-millisecond C++ memory, and is far easier to audit and maintain.",
    explanation: "Eliminates formula sprawl and ensures centralized validation standards.",
    hint: "Replaces 15 nested formulas with 1 clean pattern.",
    level: "expert",
    codeExample: "1 Clean REGEX vs 15 Nested IF/OR/MID Functions"
  },
  {
    question: "How do you validate that a string is purely numeric with no decimal points or negative signs?",
    shortAnswer: "=REGEXTEST(A2, \"^\\d+$\")",
    explanation: "`^\\d+$` requires one or more digit characters from start to end with zero letters or symbols.",
    hint: "^\\d+$.",
    level: "basic",
    codeExample: "=REGEXTEST(A2, \"^\\d+$\")"
  },
  {
    question: "How do you validate a Canadian Postal Code (e.g. `K1A 0B1`)?",
    shortAnswer: "=REGEXTEST(A2, \"^[A-CEGHJ-NPR-TVXY]\\d[A-CEGHJ-NPR-TVXY][\\s]?\\d[A-CEGHJ-NPR-TVXY]\\d$\", 1)",
    explanation: "Follows Canadian letter-number-letter-number-letter-number standard.",
    hint: "Alternating letter-number postal standard.",
    level: "expert",
    codeExample: "=REGEXTEST(Zip, \"^[A-Z]\\d[A-Z][\\s]?\\d[A-Z]\\d$\", 1)"
  },
  {
    question: "How do you validate an Indian IFSC bank routing code (e.g. `HDFC0001234` or `SBIN0000456`)?",
    shortAnswer: "=REGEXTEST(A2, \"^[A-Z]{4}0[A-Z0-9]{6}$\")",
    explanation: "Matches 4 alphabetic bank characters, literal zero '0', and 6 alphanumeric branch characters.",
    hint: "^[A-Z]{4}0[A-Z0-9]{6}$.",
    level: "moderate",
    codeExample: "=REGEXTEST(IFSC, \"^[A-Z]{4}0[A-Z0-9]{6}$\")"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for data validation with REGEXTEST?",
    shortAnswer: "Never allow unvalidated master data into your enterprise financial models! Always deploy REGEXTEST with strict anchors (^ and $) directly inside your data ingestion templates and Conditional Formatting rules to catch corrupt PANs, GSTINs, emails, and phone numbers at the point of entry!",
    explanation: "Catching bad data at the door prevents compliance fines, broken downstream lookups, and audit rejections!",
    hint: "Validate at entry with REGEXTEST + Conditional Formatting + Anchors (^$)!",
    level: "expert",
    codeExample: "Rule: Quality at the Door → Deploy REGEXTEST Validation!"
  }
];

export default questions;
