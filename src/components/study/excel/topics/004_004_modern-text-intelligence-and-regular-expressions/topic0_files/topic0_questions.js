// topic0_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 0
// Topic: Introduction to Excel's Native Regular Expression Functions (Excel 365)
// Module: 004_004_modern-text-intelligence-and-regular-expressions
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What are the three native Regular Expression functions introduced in Microsoft Excel 365?",
    shortAnswer: "REGEXTEST, REGEXEXTRACT, and REGEXREPLACE.",
    explanation: "Excel 365 natively supports Perl-Compatible Regular Expressions (PCRE) directly in formula syntax without VBA, add-ins, or external scripts.",
    hint: "REGEXTEST, REGEXEXTRACT, REGEXREPLACE.",
    level: "basic",
    codeExample: "=REGEXTEST(text, pattern, [case_sensitivity])"
  },
  {
    question: "What is the primary role of the REGEXTEST function in Excel 365?",
    shortAnswer: "To test whether a given text string matches a specified regular expression pattern, returning TRUE if matched and FALSE otherwise.",
    explanation: "Ideal for input validation, compliance checks, and conditional formatting rules.",
    hint: "Returns boolean TRUE/FALSE pattern match test.",
    level: "basic",
    codeExample: "=REGEXTEST(A2, \"^[A-Z]{5}[0-9]{4}[A-Z]$\")"
  },
  {
    question: "What is the primary role of the REGEXEXTRACT function?",
    shortAnswer: "To extract substrings from a text string that match a regular expression pattern or specific capturing groups.",
    explanation: "Enables single-step extraction of emails, invoice IDs, dates, and currency figures from unstructured narrations.",
    hint: "Extracts matched substring(s) or capturing groups.",
    level: "basic",
    codeExample: "=REGEXEXTRACT(A2, \"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}\")"
  },
  {
    question: "What is the primary role of the REGEXREPLACE function?",
    shortAnswer: "To search a text string for matches to a regular expression pattern and replace them with a replacement string.",
    explanation: "Useful for data masking (e.g. masking card numbers), stripping unwanted noise, or normalizing delimiters.",
    hint: "Replaces regex pattern matches with replacement text.",
    level: "basic",
    codeExample: "=REGEXREPLACE(A2, \"\\d{4}-\\d{4}-\\d{4}-(\\d{4})\", \"XXXX-XXXX-XXXX-$1\")"
  },
  {
    question: "Are Excel's native Regex functions case-sensitive by default?",
    shortAnswer: "By default, Excel's regex functions are case-sensitive (case_sensitivity = 0), but passing 1 makes them case-insensitive.",
    explanation: "Parameter: 0 = Case-Sensitive (Default), 1 = Case-Insensitive.",
    hint: "Default is 0 (Case-sensitive); pass 1 for case-insensitive.",
    level: "basic",
    codeExample: "=REGEXTEST(A2, \"inv-\\d+\", 1)  // Case-Insensitive"
  },
  {
    question: "How did spreadsheet analysts perform regex pattern matching before Excel 365 introduced native REGEX functions?",
    shortAnswer: "Analysts had to write custom VBA macros using `VBScript.RegExp` objects or use complex formulas with nested MID/FIND/SEARCH.",
    explanation: "VBA regex was slow, single-threaded, and blocked by corporate macro security policies.",
    hint: "VBA VBScript.RegExp COM objects.",
    level: "moderate",
    codeExample: "Set regEx = CreateObject(\"VBScript.RegExp\")"
  },
  {
    question: "What regex engine standard does Microsoft Excel 365 implement internally?",
    shortAnswer: "Standard ECMAScript / PCRE-compliant regular expression engine running in multi-threaded C++ RAM.",
    explanation: "Supports lookaheads, word boundaries, capturing groups, and standard character classes.",
    hint: "ECMAScript / PCRE standard regular expression engine.",
    level: "moderate",
    codeExample: "PCRE / ECMAScript Regex Syntax"
  },
  {
    question: "What error occurs if you provide a syntactically invalid regex pattern (e.g. unclosed parenthesis `([0-9]+`)?",
    shortAnswer: "#VALUE! error.",
    explanation: "Excel's regex compiler returns #VALUE! when the pattern contains invalid syntax.",
    hint: "Invalid pattern syntax triggers #VALUE!.",
    level: "basic",
    codeExample: "#VALUE!"
  },
  {
    question: "What error occurs if REGEXEXTRACT finds zero matches in the target text string?",
    shortAnswer: "#N/A error.",
    explanation: "When no pattern match exists, REGEXEXTRACT returns #N/A, which can be caught cleanly with IFERROR or IFNA.",
    hint: "No match found returns #N/A.",
    level: "basic",
    codeExample: "=IFNA(REGEXEXTRACT(A2, \"\\d+\"), \"No Number Found\")"
  },
  {
    question: "How do you validate an Indian Permanent Account Number (PAN) format using REGEXTEST?",
    shortAnswer: "=REGEXTEST(A2, \"^[A-Z]{5}[0-9]{4}[A-Z]$\")",
    explanation: "Checks that the text starts (^) with 5 uppercase letters, followed by 4 digits, 1 uppercase letter, and ends ($).",
    hint: "^[A-Z]{5}[0-9]{4}[A-Z]$.",
    level: "basic",
    codeExample: "=REGEXTEST(C5, \"^[A-Z]{5}[0-9]{4}[A-Z]$\")"
  },
  {
    question: "Can REGEXTEST be used directly inside Excel's Conditional Formatting rules?",
    shortAnswer: "Yes, you can create a rule with `=NOT(REGEXTEST(A2, pattern))` to automatically highlight invalid customer entries in red.",
    explanation: "Live conditional validation alerts data entry operators immediately without VBA.",
    hint: "Use inside Conditional Formatting formulas.",
    level: "moderate",
    codeExample: "Formula: =NOT(REGEXTEST(D5, \"^\\+91 \\d{10}$\"))"
  },
  {
    question: "How do you extract all digits from an alphanumeric SKU string using REGEXEXTRACT?",
    shortAnswer: "=REGEXEXTRACT(A2, \"\\d+\")",
    explanation: "The quantifier `+` matches one or more consecutive digit characters.",
    hint: "\\d+ extracts consecutive digits.",
    level: "basic",
    codeExample: "=REGEXEXTRACT(\"SKU-88421-BKP\", \"\\d+\") → Returns \"88421\""
  },
  {
    question: "How do you strip all HTML tags from a scraped text block using REGEXREPLACE?",
    shortAnswer: "=REGEXREPLACE(A2, \"<[^>]+>\", \"\")",
    explanation: "Matches `<` followed by one or more non-`>` characters and `>`, replacing with empty string `\"\"`.",
    hint: "<[^>]+> matches all HTML tags.",
    level: "moderate",
    codeExample: "=REGEXREPLACE(\"<b>Swadeep</b>\", \"<[^>]+>\", \"\") → \"Swadeep\""
  },
  {
    question: "What is the return_mode parameter in REGEXEXTRACT?",
    shortAnswer: "0 = First matching substring (default), 1 = All matching occurrences (spilled array), 2 = Capturing groups as an array.",
    explanation: "Allows returning single values, all matches across text, or individual regex groups `(group1)(group2)`.",
    hint: "0: First match, 1: All matches, 2: Capturing groups.",
    level: "advanced",
    codeExample: "=REGEXEXTRACT(text, pattern, return_mode, [case_sensitivity])"
  },
  {
    question: "How does REGEXTEST handle empty or blank cells passed as input?",
    shortAnswer: "It tests an empty string `\"\"` against the pattern; if the pattern requires characters (e.g. `^\\d+$`), it returns FALSE.",
    explanation: "Blank cells evaluate to empty strings during regex evaluation.",
    hint: "Blank cell evaluated as \"\".",
    level: "basic",
    codeExample: "Blank Cell → Tested as \"\""
  },
  {
    question: "Can REGEX functions be combined with Dynamic Array functions like FILTER and BYROW?",
    shortAnswer: "Yes, you can write `=FILTER(Data, BYROW(Data[TaxID], LAMBDA(id, REGEXTEST(id, \"^[A-Z]{5}\\d{4}[A-Z]$\"))))` for dynamic data filtering.",
    explanation: "Enables instant separation of valid vs corrupted records into dynamic spilled tables.",
    hint: "Combine with FILTER, BYROW, TOCOL, and MAP.",
    level: "advanced",
    codeExample: "=FILTER(A5:D20, REGEXTEST(CHOOSECOLS(A5:D20, 3), \"^[A-Z]{5}\\d{4}[A-Z]$\"))"
  },
  {
    question: "How do you extract the domain name from an email address using REGEXEXTRACT and capturing groups?",
    shortAnswer: "=REGEXEXTRACT(A2, \"@([a-zA-Z0-9.-]+)\", 2)",
    explanation: "Capturing group `([a-zA-Z0-9.-]+)` captures the domain part after `@`.",
    hint: "@([a-zA-Z0-9.-]+) with return_mode = 2.",
    level: "moderate",
    codeExample: "=REGEXEXTRACT(\"tuhina@shyamnagar.org\", \"@([a-zA-Z0-9.-]+)\", 2)"
  },
  {
    question: "What is the difference between TEXTSPLIT and REGEXEXTRACT for string tokenization?",
    shortAnswer: "TEXTSPLIT splits by fixed delimiter characters; REGEXEXTRACT extracts tokens matching complex variable patterns.",
    explanation: "Use TEXTSPLIT for predictable delimiters (like commas); use REGEXEXTRACT for arbitrary pattern matching.",
    hint: "TEXTSPLIT for delimiters; REGEXEXTRACT for pattern matching.",
    level: "moderate",
    codeExample: "TEXTSPLIT (Delimiters) vs REGEXEXTRACT (Pattern Recognition)"
  },
  {
    question: "How do you normalize multiple consecutive spaces into a single space using REGEXREPLACE?",
    shortAnswer: "=REGEXREPLACE(A2, \"\\s+\", \" \")",
    explanation: "Matches one or more whitespace characters `\\s+` and replaces them with a single space `\" \"`.",
    hint: "\\s+ replaced with \" \".",
    level: "basic",
    codeExample: "=REGEXREPLACE(\"Swadeep   Banerjee\", \"\\s+\", \" \")"
  },
  {
    question: "Can REGEX functions be nested inside custom LAMBDA functions registered in Name Manager?",
    shortAnswer: "Yes, you can register reusable functions like `FX_IS_VALID_PAN = LAMBDA(pan, REGEXTEST(pan, \"^[A-Z]{5}\\d{4}[A-Z]$\"))`.",
    explanation: "Encapsulates complex regex patterns into intuitive, user-friendly corporate functions.",
    hint: "Nest regex patterns inside named corporate LAMBDAs.",
    level: "advanced",
    codeExample: "FX_VALID_GST = LAMBDA(gst, REGEXTEST(gst, \"^\\d{2}[A-Z]{5}\\d{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$\"))"
  },
  {
    question: "How do you validate an Indian GSTIN format (15 alphanumeric characters) using REGEXTEST?",
    shortAnswer: "=REGEXTEST(A2, \"^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$\")",
    explanation: "Matches 2-digit state code, 10-character PAN, entity code, default 'Z', and check digit.",
    hint: "^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$.",
    level: "advanced",
    codeExample: "=REGEXTEST(C5, \"^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$\")"
  },
  {
    question: "What is the meaning of the `^` and `$` metacharacters in regular expressions?",
    shortAnswer: "`^` anchors matching to the start of the string; `$` anchors matching to the end of the string.",
    explanation: "Without anchors, regex matches substrings anywhere inside the text rather than enforcing the complete string format.",
    hint: "^ = Start anchor, $ = End anchor.",
    level: "basic",
    codeExample: "^ = Start of String, $ = End of String"
  },
  {
    question: "How do you extract all numbers from a comma-delimited string as a spilled vertical column using REGEXEXTRACT?",
    shortAnswer: "=TOCOL(REGEXEXTRACT(A2, \"\\d+\", 1))",
    explanation: "Passing return_mode = 1 extracts all matching occurrences horizontally, and TOCOL transposes to vertical.",
    hint: "return_mode = 1 with TOCOL.",
    level: "advanced",
    codeExample: "=TOCOL(REGEXEXTRACT(A2, \"\\d+\", 1))"
  },
  {
    question: "What is the computational speed of native Excel 365 Regex functions compared to legacy VBA RegExp?",
    shortAnswer: "Native Excel Regex functions execute in compiled C++ RAM with SIMD vectorization, running up to 50x faster than legacy VBA COM objects.",
    explanation: "Processes tens of thousands of text strings in milliseconds without freezing the UI.",
    hint: "50x faster SIMD C++ RAM execution.",
    level: "expert",
    codeExample: "10,000 Rows: 8ms (Native) vs 450ms (VBA RegExp)"
  },
  {
    question: "How do you mask customer phone numbers showing only the last 4 digits using REGEXREPLACE?",
    shortAnswer: "=REGEXREPLACE(A2, \"\\+91 (\\d{5}) (\\d{5})\", \"+91 XXXXX $2\")",
    explanation: "Captures the last 5 digits as `$2` and masks the middle 5 digits with `XXXXX`.",
    hint: "Backreference $2 in replacement string.",
    level: "moderate",
    codeExample: "=REGEXREPLACE(\"+91 98301 22334\", \"(\\d{5}) (\\d{5})\", \"XXXXX $2\")"
  },
  {
    question: "How do you extract a date in DD/MM/YYYY or DD-MM-YYYY format from unstructured banking text?",
    shortAnswer: "=REGEXEXTRACT(A2, \"\\b\\d{2}[/-]\\d{2}[/-]\\d{4}\\b\")",
    explanation: "Matches 2 digits, `/` or `-`, 2 digits, `/` or `-`, and 4 digits bounded by word boundaries `\\b`.",
    hint: "\\b\\d{2}[/-]\\d{2}[/-]\\d{4}\\b.",
    level: "moderate",
    codeExample: "=REGEXEXTRACT(Narration, \"\\b\\d{2}[/-]\\d{2}[/-]\\d{4}\\b\")"
  },
  {
    question: "What happens if a non-text value (like an integer or date serial) is passed into a REGEX function?",
    shortAnswer: "Excel automatically converts the number into its string representation and performs regex matching.",
    explanation: "Coerces numeric values to string tokens before pattern evaluation.",
    hint: "Automatically coerced to string representation.",
    level: "basic",
    codeExample: "Number 2026 → Evaluated as \"2026\""
  },
  {
    question: "How do you match a literal period `.` or literal plus `+` in a regex pattern?",
    shortAnswer: "Escape the character with a backslash: `\\.` for literal dot, and `\\+` for literal plus sign.",
    explanation: "Because `.` and `+` are regex metacharacters, backslashes escape them into literal character matches.",
    hint: "Escape with backslash: \\. and \\+.",
    level: "basic",
    codeExample: "\\. matches dot; \\+ matches plus"
  },
  {
    question: "How do you extract all invoice codes formatted as `INV-` followed by 5 digits using REGEXEXTRACT?",
    shortAnswer: "=REGEXEXTRACT(A2, \"INV-\\d{5}\")",
    explanation: "Matches the literal prefix `INV-` followed by exactly 5 digit characters.",
    hint: "INV-\\d{5}.",
    level: "basic",
    codeExample: "=REGEXEXTRACT(\"Paid for INV-88421 ref\", \"INV-\\d{5}\")"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for Excel 365 Regular Expressions?",
    shortAnswer: "Never rely on brittle nested FIND/MID formulas or slow legacy VBA macros for string extraction and validation! Deploy native Excel 365 Regex functions (REGEXTEST, REGEXEXTRACT, REGEXREPLACE) with precise character classes and anchors for sub-millisecond, audit-proof text intelligence!",
    explanation: "Excel 365 native regular expressions modernize spreadsheet data engineering, turning chaotic unstructured text into pristine structured corporate records in pure formula memory!",
    hint: "Always replace fragile legacy string formulas with native Excel Regex!",
    level: "expert",
    codeExample: "Rule: Text Validation & Extraction → Use Native Excel 365 REGEX!"
  }
];

export default questions;
