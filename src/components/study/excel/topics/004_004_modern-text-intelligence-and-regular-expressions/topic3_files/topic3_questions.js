// topic3_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 3
// Topic: Extracting substrings matching regex patterns with REGEXEXTRACT (extracting invoice numbers, dates, amounts)
// Module: 004_004_modern-text-intelligence-and-regular-expressions
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What is the primary function of REGEXEXTRACT in Microsoft Excel 365?",
    shortAnswer: "To extract substrings from a text string that match a defined regular expression pattern or capturing group.",
    explanation: "Eliminates complex nested MID, FIND, and SEARCH formulas for text parsing.",
    hint: "Extracts matched substring(s) based on regex pattern.",
    level: "basic",
    codeExample: "=REGEXEXTRACT(text, pattern, [return_mode], [case_sensitivity])"
  },
  {
    question: "What error does REGEXEXTRACT return if no matching pattern is found in the target string?",
    shortAnswer: "#N/A error.",
    explanation: "Excel indicates no match by returning #N/A, which can be handled using IFNA or IFERROR.",
    hint: "#N/A error on no match.",
    level: "basic",
    codeExample: "#N/A"
  },
  {
    question: "How do you extract an Invoice ID formatted like `INV-88421` from an unstructured banking narration string?",
    shortAnswer: "=REGEXEXTRACT(A2, \"INV-\\d+\")",
    explanation: "Matches literal 'INV-' followed by one or more consecutive digits.",
    hint: "INV-\\d+.",
    level: "basic",
    codeExample: "=REGEXEXTRACT(\"NEFT/INV-88421/Paid\", \"INV-\\d+\")"
  },
  {
    question: "How do you extract a date in `DD-MM-YYYY` or `DD/MM/YYYY` format using REGEXEXTRACT?",
    shortAnswer: "=REGEXEXTRACT(A2, \"\\b\\d{2}[/-]\\d{2}[/-]\\d{4}\\b\")",
    explanation: "Matches 2 digits, `/` or `-`, 2 digits, `/` or `-`, and 4 digits bounded by word boundaries.",
    hint: "\\b\\d{2}[/-]\\d{2}[/-]\\d{4}\\b.",
    level: "moderate",
    codeExample: "=REGEXEXTRACT(\"Txn dated 12-04-2026 ref 99\", \"\\b\\d{2}[/-]\\d{2}[/-]\\d{4}\\b\")"
  },
  {
    question: "How do you extract monetary currency amounts following 'INR ' (e.g. 'INR 45000.00') using REGEXEXTRACT?",
    shortAnswer: "=REGEXEXTRACT(A2, \"(?<=INR\\s)\\d+(\\.\\d{2})?\")",
    explanation: "Uses a positive lookbehind `(?<=INR\\s)` to match digits following the 'INR ' prefix without capturing 'INR ' itself.",
    hint: "Positive lookbehind (?<=INR\\s)\\d+(\\.\\d{2})?.",
    level: "advanced",
    codeExample: "=REGEXEXTRACT(A2, \"(?<=INR\\s)\\d+(\\.\\d{2})?\")"
  },
  {
    question: "What does `return_mode = 0` (the default) do in REGEXEXTRACT?",
    shortAnswer: "Returns the first matching substring found in the text as a single text value.",
    explanation: "Default single-match behavior.",
    hint: "Returns first match only (scalar).",
    level: "basic",
    codeExample: "=REGEXEXTRACT(text, pattern, 0)"
  },
  {
    question: "What does `return_mode = 1` do in REGEXEXTRACT?",
    shortAnswer: "Returns all matching occurrences found across the text string as a dynamic spilled horizontal array.",
    explanation: "Spills every match in the text into adjacent cells.",
    hint: "Returns all matches as a spilled array.",
    level: "moderate",
    codeExample: "=REGEXEXTRACT(\"Item 101, Item 204, Item 309\", \"\\d+\", 1)"
  },
  {
    question: "How do you safely wrap REGEXEXTRACT to return an empty string or 'Not Found' instead of #N/A?",
    shortAnswer: "=IFNA(REGEXEXTRACT(A2, pattern), \"\")",
    explanation: "IFNA intercepts #N/A errors cleanly while permitting valid matches to display.",
    hint: "IFNA(REGEXEXTRACT(...), \"\").",
    level: "basic",
    codeExample: "=IFNA(REGEXEXTRACT(B5, \"INV-\\d+\"), \"No Invoice\")"
  },
  {
    question: "How do you extract the username part before the `@` symbol from an email address?",
    shortAnswer: "=REGEXEXTRACT(A2, \"^([^@]+)\")",
    explanation: "Matches all characters from start of string up to the `@` character.",
    hint: "^([^@]+).",
    level: "moderate",
    codeExample: "=REGEXEXTRACT(\"swadeep.b@corp.in\", \"^([^@]+)\") &rarr; \"swadeep.b\""
  },
  {
    question: "How do you extract the domain name after the `@` symbol from an email address?",
    shortAnswer: "=REGEXEXTRACT(A2, \"(?<=@)[a-zA-Z0-9.-]+\")",
    explanation: "Positive lookbehind `(?<=@)` extracts domain characters following the `@` sign.",
    hint: "(?<=@)[a-zA-Z0-9.-]+.",
    level: "moderate",
    codeExample: "=REGEXEXTRACT(\"tuhina@shyamnagar.org\", \"(?<=@)[a-zA-Z0-9.-]+\")"
  },
  {
    question: "How do you extract all numbers from an unstructured comment and sum them in 1 formula?",
    shortAnswer: "=SUM(NUMBERVALUE(REGEXEXTRACT(A2, \"\\d+\", 1)))",
    explanation: "REGEXEXTRACT with return_mode = 1 extracts all numbers, NUMBERVALUE converts text to numeric, and SUM totals them.",
    hint: "SUM(NUMBERVALUE(REGEXEXTRACT(..., 1))).",
    level: "advanced",
    codeExample: "=SUM(NUMBERVALUE(REGEXEXTRACT(\"Paid 500 advance and 1200 balance\", \"\\d+\", 1)))"
  },
  {
    question: "How do you extract 6-digit transaction authorization codes bounded by word boundaries?",
    shortAnswer: "=REGEXEXTRACT(A2, \"\\b\\d{6}\\b\")",
    explanation: "`\\b` ensures the 6 digits are not part of a longer 10-digit phone number or PAN code.",
    hint: "\\b\\d{6}\\b.",
    level: "basic",
    codeExample: "=REGEXEXTRACT(Narration, \"\\b\\d{6}\\b\")"
  },
  {
    question: "How do you extract invoice numbers that may have prefixes 'INV-', 'BILL-', or 'REC-' followed by digits?",
    shortAnswer: "=REGEXEXTRACT(A2, \"\\b(INV|BILL|REC)-\\d+\\b\")",
    explanation: "Alternation `(INV|BILL|REC)` matches any of the three prefixes.",
    hint: "\\b(INV|BILL|REC)-\\d+\\b.",
    level: "moderate",
    codeExample: "=REGEXEXTRACT(Text, \"\\b(INV|BILL|REC)-\\d+\\b\")"
  },
  {
    question: "How do you extract text enclosed inside double quotation marks (e.g. \"Barrackpore Branch\")?",
    shortAnswer: "=REGEXEXTRACT(A2, \"\"\"([^\"]+)\"\"\")",
    explanation: "Matches quotes and captures the inner non-quote characters.",
    hint: "Inner characters enclosed in quotes.",
    level: "moderate",
    codeExample: "=REGEXEXTRACT(A2, \"\"\"([^\"]+)\"\"\")"
  },
  {
    question: "Can REGEXEXTRACT be applied across an entire column of data dynamically?",
    shortAnswer: "Yes, passing a range like `=REGEXEXTRACT(B5:B20, \"INV-\\d+\")` spills a column vector of extracted invoice IDs.",
    explanation: "Fully dynamic array vectorized across row ranges.",
    hint: "Spills vertical column array when passed a column range.",
    level: "moderate",
    codeExample: "=REGEXEXTRACT(B5:B20, \"INV-\\d+\")"
  },
  {
    question: "How do you extract the file extension from a file path string (e.g. `C:\\Reports\\Audit.xlsx`)?",
    shortAnswer: "=REGEXEXTRACT(A2, \"(?<=\\.)[a-zA-Z0-9]+$\")",
    explanation: "Matches alphanumeric characters after the final dot at the end of the string.",
    hint: "(?<=\\.)[a-zA-Z0-9]+$.",
    level: "moderate",
    codeExample: "=REGEXEXTRACT(Path, \"(?<=\\.)[a-zA-Z0-9]+$\") &rarr; \"xlsx\""
  },
  {
    question: "How do you extract Indian GSTINs (15 alphanumeric characters) from free-form invoice notes?",
    shortAnswer: "=REGEXEXTRACT(A2, \"\\b\\d{2}[A-Z]{5}\\d{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}\\b\")",
    explanation: "Extracts full 15-character GSTIN string bounded by word boundaries.",
    hint: "\\b\\d{2}[A-Z]{5}\\d{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}\\b.",
    level: "advanced",
    codeExample: "=REGEXEXTRACT(Note, \"\\b\\d{2}[A-Z]{5}\\d{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}\\b\")"
  },
  {
    question: "How do you convert extracted number strings into actual Excel numbers for mathematical calculations?",
    shortAnswer: "Wrap in `NUMBERVALUE(REGEXEXTRACT(...))` or apply double unary `--REGEXEXTRACT(...)`.",
    explanation: "REGEXEXTRACT returns text data types; numeric coercion is required for math.",
    hint: "Wrap in NUMBERVALUE() or apply double unary --.",
    level: "basic",
    codeExample: "=NUMBERVALUE(REGEXEXTRACT(A2, \"\\d+(\\.\\d{2})?\"))"
  },
  {
    question: "How do you extract the street name from an address formatted as `10/A Shibtala Road, Barrackpore`?",
    shortAnswer: "=REGEXEXTRACT(A2, \"(?<=,\\s*)[^,]+(?=,\\s*)|(?<=^\\d+[/\\w]*\\s+)[^,]+\")",
    explanation: "Extracts text following house numbers up to the next comma.",
    hint: "Pattern between house number and city comma.",
    level: "expert",
    codeExample: "Address Parsing Pattern"
  },
  {
    question: "How do you extract all hashtag keywords (e.g. `#tax`, `#excel`) from social media comments?",
    shortAnswer: "=REGEXEXTRACT(A2, \"#[a-zA-Z0-9_]+\", 1)",
    explanation: "Matches `#` followed by word characters, returning all matches with return_mode = 1.",
    hint: "#[a-zA-Z0-9_]+ with return_mode = 1.",
    level: "basic",
    codeExample: "=REGEXEXTRACT(\"Great #excel #tax webinar\", \"#[\\w]+\", 1)"
  },
  {
    question: "How do you extract the HTTP status code (e.g. 200, 404, 500) from server log strings?",
    shortAnswer: "=REGEXEXTRACT(A2, \"\\b[1-5]\\d{2}\\b$\")",
    explanation: "Matches a 3-digit number starting with 1-5 at the end of the log line.",
    hint: "\\b[1-5]\\d{2}\\b$.",
    level: "moderate",
    codeExample: "=REGEXEXTRACT(\"GET /api/gst 200\", \"\\b[1-5]\\d{2}\\b$\")"
  },
  {
    question: "How do you extract text between square brackets (e.g. `[INFO]` from `[INFO] User logged in`)?",
    shortAnswer: "=REGEXEXTRACT(A2, \"(?<=\\[)[^\\]]+(?=\\])\")",
    explanation: "Lookbehind `(?<=\\[)` and lookahead `(?=\\])` extract content inside brackets without including the brackets.",
    hint: "(?<=\\[)[^\\]]+(?=\\]).",
    level: "moderate",
    codeExample: "=REGEXEXTRACT(\"[2026-08-26] [INFO]\", \"(?<=\\[)[^\\]]+(?=\\])\")"
  },
  {
    question: "Can REGEXEXTRACT extract multiple different fields (Invoice ID, Date, Amount) simultaneously?",
    shortAnswer: "Yes, by combining capturing groups with `return_mode = 2` or using `HSTACK` with 3 targeted REGEXEXTRACT calls.",
    explanation: "HSTACK joins multiple specific field extractions into clean horizontal records.",
    hint: "HSTACK(REGEXEXTRACT(id), REGEXEXTRACT(date), REGEXEXTRACT(amt)).",
    level: "advanced",
    codeExample: "=HSTACK(REGEXEXTRACT(A2, \"INV-\\d+\"), REGEXEXTRACT(A2, \"\\d{2}-\\d{2}-\\d{4}\"))"
  },
  {
    question: "How do you extract the first word of a string using REGEXEXTRACT?",
    shortAnswer: "=REGEXEXTRACT(A2, \"^\\w+\")",
    explanation: "Matches the first word from the beginning of the string.",
    hint: "^\\w+.",
    level: "basic",
    codeExample: "=REGEXEXTRACT(\"Swadeep Banerjee\", \"^\\w+\") &rarr; \"Swadeep\""
  },
  {
    question: "How do you extract the last word of a string using REGEXEXTRACT?",
    shortAnswer: "=REGEXEXTRACT(A2, \"\\w+$\")",
    explanation: "Matches the word immediately preceding the end of string anchor `$()`.",
    hint: "\\w+$.",
    level: "basic",
    codeExample: "=REGEXEXTRACT(\"Swadeep Banerjee\", \"\\w+$\") &rarr; \"Banerjee\""
  },
  {
    question: "How do you extract IP addresses (e.g. `192.168.1.45`) from system event logs?",
    shortAnswer: "=REGEXEXTRACT(A2, \"\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b\")",
    explanation: "Matches 3 octets with dots followed by the 4th octet.",
    hint: "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b.",
    level: "moderate",
    codeExample: "=REGEXEXTRACT(LogLine, \"\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b\")"
  },
  {
    question: "What is the speed difference between REGEXEXTRACT and legacy formula combinations like `=MID(A1, FIND(\"INV-\", A1), 9)`?",
    shortAnswer: "REGEXEXTRACT handles variable length IDs, ignores leading noise, executes 10x faster in compiled RAM, and never returns formula errors on slight text variations.",
    explanation: "Robust pattern extraction vs fragile character position index offsets.",
    hint: "Robust pattern extraction vs fragile index math.",
    level: "expert",
    codeExample: "Robust Regex vs Fragile MID/FIND Offset Arithmetic"
  },
  {
    question: "How do you extract only the numeric digits from a phone string like `+91 (98301) 22334` as a contiguous string?",
    shortAnswer: "=REDUCE(\"\", REGEXEXTRACT(A2, \"\\d+\", 1), LAMBDA(acc, val, acc & val))",
    explanation: "REGEXEXTRACT with return_mode = 1 pulls all digit chunks, and REDUCE concatenates them into 1 contiguous phone string.",
    hint: "REDUCE(\"\", REGEXEXTRACT(..., 1), LAMBDA(a, v, a & v)).",
    level: "expert",
    codeExample: "=REDUCE(\"\", REGEXEXTRACT(\"+91 (98301) 22334\", \"\\d+\", 1), LAMBDA(a,v, a&v))"
  },
  {
    question: "How do you extract transaction reference codes following the keyword 'Ref:' or 'Reference:'?",
    shortAnswer: "=REGEXEXTRACT(A2, \"(?<=Ref(?:erence)?:\\s*)[A-Z0-9-]+\", 0, 1)",
    explanation: "Case-insensitive lookbehind matching 'Ref:' or 'Reference:' followed by alphanumeric codes.",
    hint: "(?<=Ref(?:erence)?:\\s*)[A-Z0-9-]+.",
    level: "advanced",
    codeExample: "=REGEXEXTRACT(A2, \"(?<=Ref:\\s*)[A-Z0-9-]+\", 0, 1)"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for data extraction with REGEXEXTRACT?",
    shortAnswer: "Never hard-code character positions or nest fragile MID/SEARCH formulas when parsing financial text! Deploy REGEXEXTRACT with lookaround assertions and word boundaries (\\b), and always wrap in IFNA to parse invoice numbers, transaction dates, and currency figures with 100% mathematical reliability!",
    explanation: "REGEXEXTRACT turns chaotic banking narrations, ERP dumps, and customer emails into clean, structured database fields with zero manual effort!",
    hint: "Lookarounds + Word Boundaries (\\b) + IFNA Wrapper = Clean Data Extraction!",
    level: "expert",
    codeExample: "Rule: Unstructured Text Parsing &rarr; Deploy REGEXEXTRACT + IFNA!"
  }
];

export default questions;
