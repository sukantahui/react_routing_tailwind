// topic4_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 4
// Topic: Global vs first-match extractions and capturing groups in REGEXEXTRACT
// Module: 004_004_modern-text-intelligence-and-regular-expressions
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What are the three possible values for the `return_mode` argument in REGEXEXTRACT?",
    shortAnswer: "0 = First match only (default scalar), 1 = All matching occurrences (spilled array), 2 = Capturing groups (spilled array of captured parenthetical groups).",
    explanation: "Controls how REGEXEXTRACT returns data into worksheet cells.",
    hint: "0: First match, 1: All matches, 2: Capturing groups.",
    level: "basic",
    codeExample: "=REGEXEXTRACT(text, pattern, return_mode, [case_sensitivity])"
  },
  {
    question: "How do you extract individual capturing groups (e.g. Country Code, Area Code, Local Number) using REGEXEXTRACT?",
    shortAnswer: "Define parentheses `(...)` around each desired group in the regex pattern and set `return_mode = 2`.",
    explanation: "REGEXEXTRACT spills each group into separate horizontal columns.",
    hint: "Round parentheses (...) with return_mode = 2.",
    level: "basic",
    codeExample: "=REGEXEXTRACT(A2, \"^\\+(\\d+)-(\\d+)-(\\d+)\", 2)"
  },
  {
    question: "What is the difference between `return_mode = 1` and `return_mode = 2` in REGEXEXTRACT?",
    shortAnswer: "`return_mode = 1` extracts multiple separate occurrences of the full pattern; `return_mode = 2` extracts the inner capturing groups of a single pattern match.",
    explanation: "Mode 1 is global iteration; Mode 2 is structural decomposition.",
    hint: "Mode 1: Global occurrences; Mode 2: Capturing groups.",
    level: "moderate",
    codeExample: "Mode 1 (All Matches) vs Mode 2 (Captured Sub-Units)"
  },
  {
    question: "How do you decompose an email address into Username, Mail Domain, and Top-Level Domain (TLD) in 1 formula?",
    shortAnswer: "=REGEXEXTRACT(A2, \"^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+)\\.([a-zA-Z]{2,})$\", 2)",
    explanation: "Group 1 captures username, Group 2 captures domain name, and Group 3 captures TLD into 3 spilled columns.",
    hint: "3 capturing groups with return_mode = 2.",
    level: "moderate",
    codeExample: "=REGEXEXTRACT(\"swadeep.b@corp.co.in\", \"^([^@]+)@([^.]+)\\.(.+)$\", 2)"
  },
  {
    question: "How do you decompose an ISO date `2026-08-26` into Year, Month, and Day columns?",
    shortAnswer: "=REGEXEXTRACT(A2, \"^(\\d{4})-(\\d{2})-(\\d{2})$\", 2)",
    explanation: "Capturing groups `(\\d{4})`, `(\\d{2})`, and `(\\d{2})` spill into 3 separate cells.",
    hint: "^(\\d{4})-(\\d{2})-(\\d{2})$ with return_mode = 2.",
    level: "basic",
    codeExample: "=REGEXEXTRACT(\"2026-08-26\", \"^(\\d{4})-(\\d{2})-(\\d{2})$\", 2)"
  },
  {
    question: "What is a Non-Capturing Group in regex, and how is it declared?",
    shortAnswer: "A group defined with `(?:...)` that groups tokens together for quantifiers or alternations without creating an extraction column in return_mode = 2.",
    explanation: "Allows logical grouping without polluting the spilled output columns.",
    hint: "(?:...) groups without capturing.",
    level: "advanced",
    codeExample: "(?:https?://)?(www\\.[\\w.-]+)"
  },
  {
    question: "What happens if a regex pattern has 3 capturing groups and `return_mode = 2` is used, but group 2 is optional and not present in the text?",
    shortAnswer: "The formula spills an empty string `\"\"` for group 2 and populates groups 1 and 3 in their respective columns.",
    explanation: "Maintains column alignment across records with optional components.",
    hint: "Spills empty string \"\" for unmatched optional group.",
    level: "moderate",
    codeExample: "Optional Unmatched Group &rarr; Spills \"\""
  },
  {
    question: "How do you transpose horizontally spilled global matches (`return_mode = 1`) into a vertical column?",
    shortAnswer: "=TOCOL(REGEXEXTRACT(A2, pattern, 1))",
    explanation: "TOCOL transforms the horizontal spilled vector into a standard vertical column.",
    hint: "Wrap in TOCOL().",
    level: "moderate",
    codeExample: "=TOCOL(REGEXEXTRACT(A2, \"\\d+\", 1))"
  },
  {
    question: "How do you extract all invoice codes across a large narrative block into a vertical spilled column?",
    shortAnswer: "=TOCOL(REGEXEXTRACT(A2, \"\\bINV-\\d+\\b\", 1))",
    explanation: "Pulls every invoice ID in the text and stacks them vertically.",
    hint: "TOCOL(REGEXEXTRACT(..., 1)).",
    level: "moderate",
    codeExample: "=TOCOL(REGEXEXTRACT(LongNarration, \"INV-\\d+\", 1))"
  },
  {
    question: "How do you extract only the 2nd capturing group from a pattern without spilling all groups?",
    shortAnswer: "=CHOOSECOLS(REGEXEXTRACT(A2, pattern, 2), 2)",
    explanation: "CHOOSECOLS isolates the 2nd column of the array returned by return_mode = 2.",
    hint: "CHOOSECOLS(REGEXEXTRACT(..., 2), 2).",
    level: "advanced",
    codeExample: "=CHOOSECOLS(REGEXEXTRACT(A2, \"^(\\w+)\\s+(\\w+)\", 2), 2)"
  },
  {
    question: "How do you decompose a contact phone string `+91-(033)-2592-1144 Ext: 204` into Country, Area, Number, and Extension?",
    shortAnswer: "=REGEXEXTRACT(A2, \"^\\+(\\d{1,3})-\\((\\d{3})\\)-(\\d{4}-\\d{4})\\s*Ext:\\s*(\\d+)$\", 2)",
    explanation: "Spills 4 columns: `+91`, `033`, `2592-1144`, `204`.",
    hint: "4 capturing groups with return_mode = 2.",
    level: "advanced",
    codeExample: "4-Group Phone Decomposition"
  },
  {
    question: "What error occurs if `return_mode = 2` is used with a regex pattern that contains zero capturing groups `(...)`?",
    shortAnswer: "#VALUE! error (or returns the entire match as group 0).",
    explanation: "return_mode = 2 requires at least one parenthetical capturing group in the pattern.",
    hint: "Pattern must contain capturing groups (...).",
    level: "moderate",
    codeExample: "Missing Parentheses in Mode 2 &rarr; #VALUE!"
  },
  {
    question: "How do you extract all 4-digit years mentioned in a text block as a unique, sorted list in 1 formula?",
    shortAnswer: "=SORT(UNIQUE(TOCOL(REGEXEXTRACT(A2, \"\\b(19|20)\\d{2}\\b\", 1))))",
    explanation: "Combines REGEXEXTRACT (mode 1), TOCOL, UNIQUE, and SORT into a single dynamic array pipeline.",
    hint: "SORT(UNIQUE(TOCOL(REGEXEXTRACT(..., 1)))).",
    level: "expert",
    codeExample: "=SORT(UNIQUE(TOCOL(REGEXEXTRACT(Text, \"\\b20\\d{2}\\b\", 1))))"
  },
  {
    question: "How do you decompose a full customer name into First Name and Last Name columns?",
    shortAnswer: "=REGEXEXTRACT(A2, \"^(\\w+)\\s+(.+)$\", 2)",
    explanation: "Group 1 captures the first word; Group 2 captures all remaining words as the last name.",
    hint: "^(\\w+)\\s+(.+)$ with return_mode = 2.",
    level: "basic",
    codeExample: "=REGEXEXTRACT(\"Swadeep Banerjee\", \"^(\\w+)\\s+(.+)$\", 2)"
  },
  {
    question: "How do you count how many times a specific pattern occurs in a text string using REGEXEXTRACT?",
    shortAnswer: "=COLUMNS(REGEXEXTRACT(A2, pattern, 1))",
    explanation: "Because return_mode = 1 returns a horizontal array of matches, COLUMNS counts the total occurrences.",
    hint: "COLUMNS(REGEXEXTRACT(..., 1)).",
    level: "moderate",
    codeExample: "=COLUMNS(REGEXEXTRACT(\"INV-1, INV-2, INV-3\", \"INV-\\d+\", 1)) &rarr; 3"
  },
  {
    question: "What happens if you use `return_mode = 1` and no match is found in the text?",
    shortAnswer: "Returns #N/A error.",
    explanation: "Just like mode 0, no match results in #N/A, which can be caught with IFNA.",
    hint: "Returns #N/A on zero matches.",
    level: "basic",
    codeExample: "=IFNA(REGEXEXTRACT(A2, \"\\d+\", 1), \"No Matches\")"
  },
  {
    question: "How do you decompose a URL into Protocol, Domain, and Path in 1 formula?",
    shortAnswer: "=REGEXEXTRACT(A2, \"^(https?):\\/\\/([\\w.-]+)(?:\\/(.*))?$\", 2)",
    explanation: "Group 1: http/https, Group 2: domain name, Group 3: trailing URL path.",
    hint: "^(https?):\\/\\/([\\w.-]+)(?:\\/(.*))?$ with return_mode = 2.",
    level: "expert",
    codeExample: "=REGEXEXTRACT(\"https://codernaccotax.co.in/tax/gst\", \"^(https?):\\/\\/([^/]+)(.*)$\", 2)"
  },
  {
    question: "Can REGEXEXTRACT with `return_mode = 2` be applied to an entire column range (e.g. `A5:A20`)?",
    shortAnswer: "Yes, by wrapping in `BYROW(A5:A20, LAMBDA(row, REGEXEXTRACT(row, pattern, 2)))` to produce a 2D matrix of decomposed fields.",
    explanation: "BYROW applies the multi-group extraction across each row vector.",
    hint: "BYROW(Range, LAMBDA(r, REGEXEXTRACT(r, pattern, 2))).",
    level: "advanced",
    codeExample: "=BYROW(A5:A20, LAMBDA(r, REGEXEXTRACT(r, \"^(\\w+)\\s+(\\w+)$\", 2)))"
  },
  {
    question: "How do you extract only numbers that have 4 or more digits from a comma-delimited text string?",
    shortAnswer: "=REGEXEXTRACT(A2, \"\\b\\d{4,}\\b\", 1)",
    explanation: "Mode 1 extracts all numbers with length &ge; 4 into a horizontal array.",
    hint: "\\b\\d{4,}\\b with return_mode = 1.",
    level: "moderate",
    codeExample: "=REGEXEXTRACT(\"SKUs: 12, 4500, 99, 88421\", \"\\b\\d{4,}\\b\", 1)"
  },
  {
    question: "How do you extract key-value pairs (e.g. `Key=Value`) into two distinct columns using capturing groups?",
    shortAnswer: "=REGEXEXTRACT(A2, \"^([a-zA-Z_]+)=(.+)$\", 2)",
    explanation: "Group 1 extracts the key name; Group 2 extracts the assigned value.",
    hint: "^([a-zA-Z_]+)=(.+)$ with return_mode = 2.",
    level: "moderate",
    codeExample: "=REGEXEXTRACT(\"Branch=Barrackpore\", \"^([^=]+)=(.+)$\", 2)"
  },
  {
    question: "What is the memory and calculation speed performance of `return_mode = 1` vs `return_mode = 2` in Excel 365?",
    shortAnswer: "Both execute in compiled C++ RAM in under 1 millisecond per 1,000 records, leveraging native SIMD array vectorization.",
    explanation: "High performance across both global scans and group decompositions.",
    hint: "Sub-millisecond compiled C++ execution.",
    level: "expert",
    codeExample: "Sub-Millisecond Multi-Group Extraction"
  },
  {
    question: "How do you extract all email addresses mentioned across a paragraph of text as a clean vertical array?",
    shortAnswer: "=TOCOL(REGEXEXTRACT(A2, \"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}\", 1))",
    explanation: "Mode 1 pulls all email strings, and TOCOL stacks them vertically.",
    hint: "TOCOL(REGEXEXTRACT(..., 1)).",
    level: "moderate",
    codeExample: "=TOCOL(REGEXEXTRACT(Paragraph, \"[\\w.%+-]+@[\\w.-]+\\.[a-zA-Z]{2,}\", 1))"
  },
  {
    question: "How do you decompose a bank narration string into Transaction Type, Invoice ID, Date, and Amount using 4 capturing groups in 1 formula?",
    shortAnswer: "=REGEXEXTRACT(A2, \"^([A-Z]+)\\/(INV-\\d+)\\/(\\d{2}-\\d{2}-\\d{4})\\/.*\\/INR\\s*(\\d+(?:\\.\\d{2})?)$\", 2)",
    explanation: "Spills 4 columns simultaneously: Txn Type (NEFT/UPI), Invoice ID, Date, and Amount.",
    hint: "4 parenthetical capturing groups with return_mode = 2.",
    level: "expert",
    codeExample: "4-Group Banking Narration Decomposition Pipeline"
  },
  {
    question: "How do you handle nested capturing groups like `((A)(B))` in REGEXEXTRACT `return_mode = 2`?",
    shortAnswer: "Excel numbers groups by their opening parenthesis from left to right: Group 1 = Full `AB`, Group 2 = `A`, Group 3 = `B`.",
    explanation: "Standard left-to-right parenthesis counting rule.",
    hint: "Group numbers follow opening parentheses left-to-right.",
    level: "advanced",
    codeExample: "Group 1: ((A)(B)), Group 2: (A), Group 3: (B)"
  },
  {
    question: "How do you filter an extracted array of numbers to keep only those greater than 10,000?",
    shortAnswer: "=LET(nums, NUMBERVALUE(TOCOL(REGEXEXTRACT(A2, \"\\d+\", 1))), FILTER(nums, nums > 10000))",
    explanation: "Extracts all numbers, converts to numeric, and filters values > 10,000.",
    hint: "LET(nums, TOCOL(REGEXEXTRACT(..., 1)), FILTER(nums, nums > 10000)).",
    level: "expert",
    codeExample: "REGEXEXTRACT + TOCOL + FILTER Pipeline"
  },
  {
    question: "How do you extract the file directory path and filename into separate columns from a full file path?",
    shortAnswer: "=REGEXEXTRACT(A2, \"^(.*\\\\)([^\\\\]+)$\", 2)",
    explanation: "Group 1 captures directory path up to last backslash; Group 2 captures filename.",
    hint: "^(.*\\\\)([^\\\\]+)$ with return_mode = 2.",
    level: "advanced",
    codeExample: "=REGEXEXTRACT(\"C:\\Reports\\Audit.xlsx\", \"^(.*\\\\)([^\\\\]+)$\", 2)"
  },
  {
    question: "What happens if a cell to the right of a formula using `return_mode = 2` contains existing text data?",
    shortAnswer: "#SPILL! error.",
    explanation: "REGEXEXTRACT requires unobstructed adjacent horizontal cells to spill capturing groups.",
    hint: "Blocked output footprint triggers #SPILL!.",
    level: "basic",
    codeExample: "#SPILL!"
  },
  {
    question: "How do you extract words that start with a capital letter followed by lowercase letters (e.g. Proper Names)?",
    shortAnswer: "=REGEXEXTRACT(A2, \"\\b[A-Z][a-z]+\\b\", 1)",
    explanation: "Matches proper capitalized words and spills all occurrences horizontally.",
    hint: "\\b[A-Z][a-z]+\\b with return_mode = 1.",
    level: "moderate",
    codeExample: "=REGEXEXTRACT(\"Swadeep and Tuhina visited Barrackpore\", \"\\b[A-Z][a-z]+\\b\", 1)"
  },
  {
    question: "How do you create a named corporate LAMBDA `FX_PARSE_NAME` that splits full names into First and Last Name columns?",
    shortAnswer: "=LAMBDA(fullName, REGEXEXTRACT(fullName, \"^(\\w+)\\s+(.+)$\", 2))",
    explanation: "Registers the 2-group name decomposition formula as a reusable custom corporate function.",
    hint: "LAMBDA(name, REGEXEXTRACT(name, \"^(\\w+)\\s+(.+)$\", 2)).",
    level: "advanced",
    codeExample: "FX_PARSE_NAME = LAMBDA(n, REGEXEXTRACT(n, \"^(\\w+)\\s+(.+)$\", 2))"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for Capturing Groups and Return Modes?",
    shortAnswer: "Whenever you need to decompose multi-part strings (like emails, phone numbers, dates, or banking logs) into separate database columns, always define parenthetical capturing groups (...) and set return_mode = 2! It delivers pristine multi-column structural decomposition in a single formula with zero helper columns!",
    explanation: "Capturing groups elevate spreadsheet data engineering into high-speed relational ETL pipelines!",
    hint: "Parentheses (...) + return_mode = 2 &rarr; Single-Formula Multi-Column Decomposition!",
    level: "expert",
    codeExample: "Rule: Multi-Part String Decomposition &rarr; Use Capturing Groups + Mode 2!"
  }
];

export default questions;
