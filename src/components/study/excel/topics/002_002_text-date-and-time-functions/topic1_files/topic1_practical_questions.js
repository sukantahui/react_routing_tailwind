// topic1_files/topic1_practical_questions.js
// 10 Strictly Practical Enterprise Questions for Topic 1: Substring extraction (LEFT, RIGHT, MID, LEN, FIND vs SEARCH)

export const practicalQuestions = [
  {
    id: 1,
    title: "Department Prefix Extraction from Employee Badges",
    functionUsed: "LEFT",
    category: "Positional Extraction",
    difficulty: "Basic",
    difficultyColor: "emerald",
    scenario: "The HR Management System exports staff badges in the structured format 'DEP-YY-SERIAL' (e.g., cell A2 contains 'MKT-23-8491'). The payroll team needs to extract only the 3-character departmental prefix code for cost-center allocation.",
    inputCell: 'A2 = "MKT-23-8491"',
    targetCell: "B2",
    formula: '=LEFT(A2, 3)',
    evaluatedOutput: '"MKT"',
    outputType: "Text String",
    stepByStepLogic: [
      "The LEFT(text, [num_chars]) function begins parsing from the leftmost character (index 1).",
      "Specifying num_chars = 3 instructs Excel to extract the first 3 consecutive characters ('M', 'K', 'T').",
      "Returns the isolated text token 'MKT' with zero trailing characters."
    ],
    proTip: "If num_chars is omitted in =LEFT(A2), Excel defaults to 1 character. Always explicitly supply the exact token length in standardized schemas."
  },
  {
    id: 2,
    title: "Numeric Serial Suffix Extraction & Type Coercion",
    functionUsed: "RIGHT & Double Unary (--)",
    category: "Positional Extraction",
    difficulty: "Basic",
    difficultyColor: "emerald",
    scenario: "Warehouse logistics scanners output pallet barcode labels as 'REGION-PLANT-SERIAL' (e.g., cell A3 contains 'WB-HYD-50284'). Extract the trailing 5-digit serial number and convert it into a true numeric value so it can be summed and aggregated in inventory reconciliation.",
    inputCell: 'A3 = "WB-HYD-50284"',
    targetCell: "B3",
    formula: '=--RIGHT(A3, 5)',
    alternativeFormula: '=VALUE(RIGHT(A3, 5))',
    evaluatedOutput: "50284",
    outputType: "True Number (Integer)",
    stepByStepLogic: [
      "=RIGHT(A3, 5) extracts the 5 rightmost characters, returning the text string \"50284\".",
      "By default, Excel string functions always return text values. Text numbers cause SUM() and AVERAGE() to treat them as 0.",
      "The double unary operator (--) performs a mathematical negation twice, coercing the string into a genuine numeric value 50284 without altering its magnitude."
    ],
    proTip: "Always use double unary (--) or VALUE() when extracting numeric IDs that need to participate in mathematical models or numeric VLOOKUP/XLOOKUP tables."
  },
  {
    id: 3,
    title: "Fixed Middle Token Extraction (SKU Manufacturing Year)",
    functionUsed: "MID",
    category: "Positional Extraction",
    difficulty: "Intermediate",
    difficultyColor: "sky",
    scenario: "A quality assurance database logs component codes formatted as 'PLANT-YYYY-LOT' (e.g., cell A4 contains 'KOL-2025-BATCH09'). Extract the 4-digit calendar year token starting at character position 5.",
    inputCell: 'A4 = "KOL-2025-BATCH09"',
    targetCell: "B4",
    formula: '=MID(A4, 5, 4)',
    evaluatedOutput: '"2025"',
    outputType: "Text String",
    stepByStepLogic: [
      "The MID(text, start_num, num_chars) function extracts a specific slice from inside a string.",
      "start_num = 5 skips the 4 prefix characters ('K', 'O', 'L', '-') and positions the extraction pointer at character 5 ('2').",
      "num_chars = 4 pulls exactly 4 characters ('2', '0', '2', '5') starting from that pointer."
    ],
    proTip: "Excel text positions are 1-based (index 1 is the 1st character), unlike Python or JavaScript which are 0-based."
  },
  {
    id: 4,
    title: "Regulatory Tax ID (PAN) Length Audit & Validation",
    functionUsed: "LEN & TRIM",
    category: "Validation & Length",
    difficulty: "Basic",
    difficultyColor: "emerald",
    scenario: "A statutory compliance officer must audit imported vendor Permanent Account Numbers (PAN) in cell A5 ('ABCDE1234F'). Verify whether the cleaned string strictly adheres to the mandatory 10-character statutory format and flag any irregular lengths.",
    inputCell: 'A5 = "ABCDE1234F"',
    targetCell: "B5",
    formula: '=IF(LEN(TRIM(A5))=10, "Valid PAN (10 chars)", "Invalid Length: " & LEN(TRIM(A5)))',
    evaluatedOutput: '"Valid PAN (10 chars)"',
    outputType: "Validation Status",
    stepByStepLogic: [
      "TRIM(A5) removes accidental leading or trailing whitespace that could skew the count.",
      "LEN(...) calculates the total character count of the trimmed string.",
      "The IF statement verifies whether LEN equals 10; if true, it confirms 'Valid PAN (10 chars)', otherwise it displays the invalid count."
    ],
    proTip: "LEN() counts every single byte including spaces and non-printable control characters. Always wrap with TRIM() and CLEAN() before performing character length audits."
  },
  {
    id: 5,
    title: "Dynamic Variable-Length First Name Extraction",
    functionUsed: "LEFT & FIND",
    category: "Dynamic Delimiters",
    difficulty: "Intermediate",
    difficultyColor: "sky",
    scenario: "A customer CRM table stores full names of varying lengths (e.g., cell A6 contains 'Subhashree Chattopadhyay'). Dynamically extract the first name without knowing the name length in advance.",
    inputCell: 'A6 = "Subhashree Chattopadhyay"',
    targetCell: "B6",
    formula: '=LEFT(A6, FIND(" ", A6 & " ") - 1)',
    evaluatedOutput: '"Subhashree"',
    outputType: "Text String",
    stepByStepLogic: [
      "A6 & \" \" appends a trailing space guardrail to guarantee that a space always exists (preventing #VALUE! if a single name is provided).",
      "FIND(\" \", A6 & \" \") locates the 1-based index of the first space (character position 11).",
      "Subtracting 1 (11 - 1 = 10) calculates the exact character length of the first name.",
      "LEFT(A6, 10) extracts the leftmost 10 characters ('Subhashree') cleanly without the space."
    ],
    proTip: "Appending & \" \" inside FIND(\" \", A6 & \" \") is an enterprise-grade defensive formula pattern that prevents #VALUE! errors on single-word entries."
  },
  {
    id: 6,
    title: "Dynamic Variable-Length Last Name Extraction",
    functionUsed: "RIGHT, LEN & FIND",
    category: "Dynamic Delimiters",
    difficulty: "Intermediate",
    difficultyColor: "sky",
    scenario: "In the same customer table with cell A7 containing 'Anirban Mukherjee', extract the variable-length surname/last name dynamically regardless of how long the first name is.",
    inputCell: 'A7 = "Anirban Mukherjee"',
    targetCell: "B7",
    formula: '=RIGHT(A7, LEN(A7) - FIND(" ", A7))',
    evaluatedOutput: '"Mukherjee"',
    outputType: "Text String",
    stepByStepLogic: [
      "LEN(A7) calculates the total length of the entire string (17 characters).",
      "FIND(\" \", A7) identifies the character position of the space delimiter (position 8).",
      "Subtracting the space position from total length (17 - 8 = 9) gives the exact length of the surname.",
      "RIGHT(A7, 9) extracts the 9 characters from the right end, yielding 'Mukherjee'."
    ],
    proTip: "If strings might have leading or trailing spaces, sanitize first with =RIGHT(TRIM(A7), LEN(TRIM(A7)) - FIND(\" \", TRIM(A7)))."
  },
  {
    id: 7,
    title: "Corporate Email Domain Name Extraction",
    functionUsed: "MID, FIND & LEN",
    category: "Dynamic Delimiters",
    difficulty: "Intermediate",
    difficultyColor: "sky",
    scenario: "The cybersecurity team requires isolating the corporate domain from employee email addresses (e.g., cell A8 contains 'arnab.sen@barrackpore-finance.org') to audit authorized organization domains.",
    inputCell: 'A8 = "arnab.sen@barrackpore-finance.org"',
    targetCell: "B8",
    formula: '=MID(A8, FIND("@", A8) + 1, LEN(A8))',
    evaluatedOutput: '"barrackpore-finance.org"',
    outputType: "Text String (Domain)",
    stepByStepLogic: [
      "FIND(\"@\", A8) locates the position of the '@' delimiter (index 10).",
      "Adding 1 (+ 1) shifts the starting extraction point to index 11 (the first letter of the domain).",
      "Using LEN(A8) as the num_chars argument guarantees that all characters from index 11 to the end of the text are extracted without truncation."
    ],
    proTip: "MID is forgiving: if num_chars exceeds the remaining string length, Excel simply returns all characters up to the end without throwing an error."
  },
  {
    id: 8,
    title: "Case-Sensitive Sub-Ledger Locator vs Case-Insensitive Search",
    functionUsed: "FIND vs SEARCH",
    category: "FIND vs SEARCH",
    difficulty: "Intermediate",
    difficultyColor: "amber",
    scenario: "An accounting narration string in cell A9 contains mixed-case transaction codes: 'Voucher INV-892 tagged to inv-small'. Compare locating the lowercase sub-ledger tag 'inv' using case-sensitive FIND() versus case-insensitive SEARCH().",
    inputCell: 'A9 = "Voucher INV-892 tagged to inv-small"',
    targetCell: "B9 (FIND) & C9 (SEARCH)",
    formula: '=FIND("inv", A9)   [vs]   =SEARCH("inv", A9)',
    evaluatedOutput: "FIND = 27  |  SEARCH = 9",
    outputType: "Character Index (Integer)",
    stepByStepLogic: [
      "FIND(\"inv\", A9) is strictly case-sensitive. It ignores uppercase 'INV' at position 9 and finds the exact lowercase match 'inv' at character position 27.",
      "SEARCH(\"inv\", A9) is case-insensitive. It checks from left to right and matches 'INV' at character position 9, returning 9 immediately.",
      "This distinction is crucial when parsing case-sensitive audit keys or hash tokens."
    ],
    proTip: "Use FIND() when exact uppercase/lowercase distinction is required (e.g., password codes, checksums). Use SEARCH() for general user text searches where casing is inconsistent."
  },
  {
    id: 9,
    title: "Extracting Middle Token Between Two Hyphen Delimiters",
    functionUsed: "MID & Nested FIND",
    category: "Advanced Nested Logic",
    difficulty: "Advanced",
    difficultyColor: "rose",
    scenario: "General ledger transaction references follow a 3-tier compound format 'SYS-SUBGL-REF' (e.g., cell A10 contains 'TXN-50142-CC902'). Extract the variable-length middle Sub-GL code '50142' located between the 1st and 2nd hyphen delimiters.",
    inputCell: 'A10 = "TXN-50142-CC902"',
    targetCell: "B10",
    formula: '=MID(A10, FIND("-", A10) + 1, FIND("-", A10, FIND("-", A10) + 1) - FIND("-", A10) - 1)',
    evaluatedOutput: '"50142"',
    outputType: "Text String",
    stepByStepLogic: [
      "Find 1st hyphen position: FIND(\"-\", A10) returns 4.",
      "Start extraction at: 4 + 1 = 5 (the first character of the middle token).",
      "Find 2nd hyphen position using start_num: FIND(\"-\", A10, 5) searches starting at position 5 and returns 10.",
      "Calculate middle token length: (2nd Hyphen pos) - (1st Hyphen pos) - 1 = 10 - 4 - 1 = 5.",
      "MID(A10, 5, 5) extracts exactly 5 characters starting at index 5, returning '50142'."
    ],
    proTip: "The 3rd argument of FIND(find_text, within_text, [start_num]) specifies where to start searching. Setting start_num to (1st delimiter position + 1) enables locating the 2nd delimiter cleanly."
  },
  {
    id: 10,
    title: "Unstructured Log Extraction Using Wildcard Pattern Matching",
    functionUsed: "SEARCH with Wildcards (?) & MID",
    category: "Advanced Nested Logic",
    difficulty: "Advanced",
    difficultyColor: "rose",
    scenario: "Customer support service notes contain unstructured narrative text with embedded hardware model codes formatted as 'M-###' (e.g., cell A11 contains 'Customer reported failure in M-842 during peak hours'). Locate and extract the exact 5-character model ID using pattern matching.",
    inputCell: 'A11 = "Customer reported failure in M-842 during peak hours"',
    targetCell: "B11",
    formula: '=MID(A11, SEARCH("M-???", A11), 5)',
    evaluatedOutput: '"M-842"',
    outputType: "Text String",
    stepByStepLogic: [
      "SEARCH(\"M-???\", A11) uses the '?' single-character wildcard to search for the pattern 'M-' followed by any 3 characters.",
      "It locates the starting index of the pattern at character position 31.",
      "MID(A11, 31, 5) extracts the 5 characters starting at position 31 ('M', '-', '8', '4', '2').",
      "Returns 'M-842' dynamically regardless of where the model appears in the sentence."
    ],
    proTip: "SEARCH supports wildcards: '?' represents any single character, and '*' represents any sequence of characters. FIND does NOT support wildcards (it treats '?' literally)."
  }
];

export default practicalQuestions;
