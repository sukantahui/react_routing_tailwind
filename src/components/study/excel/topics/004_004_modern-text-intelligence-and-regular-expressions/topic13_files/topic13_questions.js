// topic13_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 13
// Topic: Assessment: Advanced Regex and String Intelligence Lab
// Module: 004_004_modern-text-intelligence-and-regular-expressions
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What is the primary evaluation goal of the Advanced Regex and String Intelligence Assessment Lab?",
    shortAnswer: "To rigorously assess the student's mastery in designing, debugging, optimizing, and deploying native regular expressions and dynamic array string functions in real-world enterprise architectures.",
    explanation: "Tests theoretical comprehension and hands-on speed across all 14 module topics.",
    hint: "Comprehensive mastery evaluation across regex and text functions.",
    level: "basic",
    codeExample: "Advanced String Intelligence Capstone Evaluation"
  },
  {
    question: "What are the 3 native regular expression functions introduced in Microsoft Excel 365?",
    shortAnswer: "REGEXTEST, REGEXEXTRACT, and REGEXREPLACE.",
    explanation: "Native C++ functions operating in compiled SIMD memory with zero VBA dependencies.",
    hint: "REGEXTEST, REGEXEXTRACT, REGEXREPLACE.",
    level: "basic",
    codeExample: "REGEXTEST, REGEXEXTRACT, REGEXREPLACE"
  },
  {
    question: "How do you distinguish between REGEXTEST and REGEXEXTRACT?",
    shortAnswer: "REGEXTEST returns a boolean (TRUE/FALSE) confirming pattern presence; REGEXEXTRACT extracts the matching substring or spilled token array.",
    explanation: "Validation vs Extraction.",
    hint: "REGEXTEST: Boolean; REGEXEXTRACT: Substring/Array.",
    level: "basic",
    codeExample: "REGEXTEST(text, pat) vs REGEXEXTRACT(text, pat, [mode])"
  },
  {
    question: "What are the 3 return modes of REGEXEXTRACT?",
    shortAnswer: "0 (First Match, Default), 1 (All Matches Spilled), and 2 (Capturing Groups Only).",
    explanation: "Mode 0 returns scalar string; Mode 1 returns 1D vector of all matches; Mode 2 returns horizontal vector of capturing groups.",
    hint: "0: First Match; 1: All Matches; 2: Capturing Groups.",
    level: "moderate",
    codeExample: "Mode 0, Mode 1, Mode 2"
  },
  {
    question: "How do you strip all HTML tags from a text cell using REGEXREPLACE?",
    shortAnswer: "=REGEXREPLACE(A2, \"<[^>]+>\", \"\")",
    explanation: "Replaces `<...>` markup tags with empty string.",
    hint: "<[^>]+> replaced with \"\".",
    level: "basic",
    codeExample: "=REGEXREPLACE(A2, \"<[^>]+>\", \"\")"
  },
  {
    question: "How does passing a negative instance number (e.g. -1) to TEXTBEFORE or TEXTAFTER alter the search direction?",
    shortAnswer: "It searches from right-to-left, targeting the LAST occurrence of the delimiter in the text string.",
    explanation: "Crucial for isolating file extensions and parent folder directories.",
    hint: "Searches backwards from right-to-left.",
    level: "basic",
    codeExample: "=TEXTAFTER(\"Report.final.xlsx\", \".\", -1) &rarr; \"xlsx\""
  },
  {
    question: "How do you construct a 2D matrix from a delimited text blob using TEXTSPLIT?",
    shortAnswer: "Specify both column_delimiter and row_delimiter: `=TEXTSPLIT(A2, col_delim, row_delim)`.",
    explanation: "Spills rows and columns simultaneously in pure RAM.",
    hint: "TEXTSPLIT(text, col_delimiter, row_delimiter).",
    level: "moderate",
    codeExample: "=TEXTSPLIT(\"A:1|B:2|C:3\", \":\", \"|\")"
  },
  {
    question: "How do you combine FILTER with REGEXTEST to isolate only rows with valid 10-digit mobile numbers starting with 6-9?",
    shortAnswer: "=FILTER(DataTable, REGEXTEST(PhoneCol, \"^[6-9]\\d{9}$\"))",
    explanation: "Anchored pattern `^[6-9]\\d{9}$` ensures exact 10-digit compliance.",
    hint: "FILTER(Table, REGEXTEST(Col, '^[6-9]\\d{9}$')).",
    level: "basic",
    codeExample: "=FILTER(A5:E20, REGEXTEST(D5:D20, \"^[6-9]\\d{9}$\"))"
  },
  {
    question: "How do you extract all invoice codes across a column into a unique vertical list using TOCOL?",
    shortAnswer: "=SORT(UNIQUE(TOCOL(REGEXEXTRACT(InvoiceCol, \"INV-\\d+\", 1), 3)))",
    explanation: "REGEXEXTRACT mode 1 pulls all codes, TOCOL flattens to 1D ignoring errors, UNIQUE deduplicates, and SORT alphabetizes.",
    hint: "SORT(UNIQUE(TOCOL(REGEXEXTRACT(..., 1), 3))).",
    level: "advanced",
    codeExample: "=SORT(UNIQUE(TOCOL(REGEXEXTRACT(B5:B100, \"INV-\\d+\", 1), 3)))"
  },
  {
    question: "What is the role of positive lookbehind `(?<=prefix)` in corporate log parsing?",
    shortAnswer: "It asserts that the matched substring is preceded by the prefix without including the prefix itself in the extracted return value.",
    explanation: "Extracts values from key-value pairs cleanly without helper formulas.",
    hint: "Zero-width assertion matching text preceded by prefix.",
    level: "advanced",
    codeExample: "=REGEXEXTRACT(A2, \"(?<=UID=)\\w+\")"
  },
  {
    question: "How do you decompose employee full names into First and Last Name columns across 1,000 rows using BYROW?",
    shortAnswer: "=BYROW(A5:A1000, LAMBDA(r, REGEXEXTRACT(r, \"^(\\w+)\\s+(.+)$\", 2)))",
    explanation: "BYROW evaluates each row vector and spills the 2 capturing groups across 2 adjacent columns.",
    hint: "BYROW + LAMBDA + REGEXEXTRACT mode 2.",
    level: "advanced",
    codeExample: "=BYROW(A5:A1000, LAMBDA(r, REGEXEXTRACT(r, \"^(\\w+)\\s+(.+)$\", 2)))"
  },
  {
    question: "How do you mask the first 12 digits of a 16-digit credit card number using REGEXREPLACE and backreferences?",
    shortAnswer: "=REGEXREPLACE(A2, \"^\\d{4}-\\d{4}-\\d{4}-(\\d{4})$\", \"XXXX-XXXX-XXXX-$1\")",
    explanation: "Captures the last 4 digits in group $1 and replaces preceding numbers with static Xs.",
    hint: "Replace with \"XXXX-XXXX-XXXX-$1\".",
    level: "basic",
    codeExample: "=REGEXREPLACE(A2, \"^\\d{4}-\\d{4}-\\d{4}-(\\d{4})$\", \"XXXX-XXXX-XXXX-$1\")"
  },
  {
    question: "How do you extract text enclosed inside double quotes `\"Barrackpore\"` without using regex?",
    shortAnswer: "=TEXTBEFORE(TEXTAFTER(A2, \"\"\"\"), \"\"\"\")",
    explanation: "TEXTAFTER extracts text following first quote; TEXTBEFORE trims preceding next quote.",
    hint: "TEXTBEFORE(TEXTAFTER(A2, '\"'), '\"').",
    level: "moderate",
    codeExample: "=TEXTBEFORE(TEXTAFTER(A2, \"\"\"\"), \"\"\"\")"
  },
  {
    question: "How do you sanitize text by collapsing multiple internal spaces and converting to Proper Case in 1 formula?",
    shortAnswer: "=PROPER(TRIM(REGEXREPLACE(A2, \"\\s+\", \" \")))",
    explanation: "Collapses multi-space runs with `\\s+`, trims boundary spaces, and capitalizes words with PROPER.",
    hint: "PROPER(TRIM(REGEXREPLACE(A2, '\\s+', ' '))).",
    level: "basic",
    codeExample: "=PROPER(TRIM(REGEXREPLACE(A2, \"\\s+\", \" \")))"
  },
  {
    question: "How do you prevent #N/A errors in TEXTBEFORE when a name contains only 1 word and lacks spaces?",
    shortAnswer: "Set the `match_end` argument to 1: `=TEXTBEFORE(A2, \" \", , , 1)`.",
    explanation: "Treats the end of text as a delimiter, returning the full single-word name safely.",
    hint: "Set match_end = 1.",
    level: "moderate",
    codeExample: "=TEXTBEFORE(A2, \" \", , , 1)"
  },
  {
    question: "How do you parse a multi-token server log line `[Timestamp] [Level] [User] Event` into 4 columns in 1 formula?",
    shortAnswer: "=REGEXEXTRACT(A2, \"^\\[([^\\]]+)\\]\\s+\\[([^\\]]+)\\]\\s+\\[([^\\]]+)\\]\\s+(.+)$\", 2)",
    explanation: "Mode 2 spills the 4 bracketed capturing groups across adjacent columns.",
    hint: "REGEXEXTRACT with 4 capturing groups and mode 2.",
    level: "advanced",
    codeExample: "=REGEXEXTRACT(A2, \"^\\[([^\\]]+)\\]\\s+\\[([^\\]]+)\\]\\s+\\[([^\\]]+)\\]\\s+(.+)$\", 2)"
  },
  {
    question: "How do you calculate a composite customer compliance score (0% to 100%) across PAN, GSTIN, and Email validation checks?",
    shortAnswer: "=(--REGEXTEST(PAN, \"^[A-Z]{5}\\d{4}[A-Z]$\") + --REGEXTEST(GST, \"^\\d{2}[A-Z]{5}\\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$\") + --REGEXTEST(Email, \"^[\\w.%+-]+@[\\w.-]+\\.[a-zA-Z]{2,}$\")) / 3",
    explanation: "Double unaries coerce booleans to 1/0 and average over total tests.",
    hint: "Sum of --REGEXTEST results / 3.",
    level: "advanced",
    codeExample: "=(--ValidPAN + --ValidGST + --ValidEmail) / 3"
  },
  {
    question: "How do you build a dynamic defect remarks string using TEXTJOIN for failed fields only?",
    shortAnswer: "=TEXTJOIN(\"; \", TRUE, IF(NOT(ValidPAN), \"PAN Invalid\", \"\"), IF(NOT(ValidEmail), \"Email Invalid\", \"\"))",
    explanation: "TEXTJOIN skips empty strings and joins active error flags dynamically.",
    hint: "TEXTJOIN('; ', TRUE, IF(NOT(Test), 'Error', '')).",
    level: "expert",
    codeExample: "=TEXTJOIN(\"; \", TRUE, IF(NOT(ValidPAN), \"PAN Invalid\", \"\"), IF(NOT(ValidEmail), \"Email Invalid\", \"\"))"
  },
  {
    question: "How do you extract the integer value from a string `Total: 450 items` and convert it to a real Excel number?",
    shortAnswer: "=NUMBERVALUE(REGEXEXTRACT(A2, \"\\d+\"))",
    explanation: "REGEXEXTRACT pulls the digits and NUMBERVALUE coerces to numeric type.",
    hint: "NUMBERVALUE(REGEXEXTRACT(A2, '\\d+')).",
    level: "basic",
    codeExample: "=NUMBERVALUE(REGEXEXTRACT(\"Total: 450 items\", \"\\d+\"))"
  },
  {
    question: "Why should you always anchor regex validation patterns with `^` (Start) and `$` (End)?",
    shortAnswer: "Without anchors, the regex performs a partial substring search, allowing invalid strings with embedded conforming tokens (e.g. 15-char invalid PAN) to erroneously pass.",
    explanation: "Anchors enforce complete whole-string validation.",
    hint: "Enforces complete string validation and prevents substring false positives.",
    level: "basic",
    codeExample: "Pattern: ^[A-Z]{5}\\d{4}[A-Z]$"
  },
  {
    question: "How do you remove ASCII control characters (0-31) from legacy mainframe database exports?",
    shortAnswer: "=REGEXREPLACE(A2, \"[\\x00-\\x1F]\", \"\")",
    explanation: "Matches hexadecimal ASCII control characters and deletes them.",
    hint: "[\\x00-\\x1F] replaced with \"\".",
    level: "moderate",
    codeExample: "=REGEXREPLACE(A2, \"[\\x00-\\x1F]\", \"\")"
  },
  {
    question: "How do you extract the directory folder path from `C:\\Users\\Admin\\Reports\\Audit.xlsx` in 1 step?",
    shortAnswer: "=TEXTBEFORE(A2, \"\\\", -1)",
    explanation: "Extracts all characters preceding the last backslash.",
    hint: "=TEXTBEFORE(A2, '\\', -1).",
    level: "basic",
    codeExample: "=TEXTBEFORE(\"C:\\Users\\Admin\\Reports\\Audit.xlsx\", \"\\\", -1) &rarr; \"C:\\Users\\Admin\\Reports\""
  },
  {
    question: "How do you extract the file extension from `Audit.final.2026.xlsx` in 1 step?",
    shortAnswer: "=TEXTAFTER(A2, \".\", -1)",
    explanation: "Extracts text following the last period.",
    hint: "=TEXTAFTER(A2, '.', -1).",
    level: "basic",
    codeExample: "=TEXTAFTER(\"Audit.final.2026.xlsx\", \".\", -1) &rarr; \"xlsx\""
  },
  {
    question: "How do you extract all URLs starting with http:// or https:// from a long narrative text block into a deduplicated column?",
    shortAnswer: "=SORT(UNIQUE(TOCOL(REGEXEXTRACT(A2, \"https?://[\\w.-]+(?:/[\\w.-]*)*\", 1))))",
    explanation: "Mode 1 pulls all URLs, TOCOL flattens to 1D, UNIQUE deduplicates, and SORT orders alphabetically.",
    hint: "SORT(UNIQUE(TOCOL(REGEXEXTRACT(..., 1)))).",
    level: "advanced",
    codeExample: "URL Master Extraction Pipeline"
  },
  {
    question: "How do you clean an entire 2D table range `B5:D20` of non-alphanumeric noise in a single dynamic array formula?",
    shortAnswer: "=MAP(B5:D20, LAMBDA(cell, TRIM(REGEXREPLACE(cell, \"[^a-zA-Z0-9\\s]\", \"\"))))",
    explanation: "MAP executes regex cleansing across all cells in the 2D grid in pure RAM.",
    hint: "MAP(2D_Range, LAMBDA(c, REGEXREPLACE(c, '[^a-zA-Z0-9\\s]', ''))).",
    level: "advanced",
    codeExample: "=MAP(B5:D20, LAMBDA(c, TRIM(REGEXREPLACE(c, \"[^a-zA-Z0-9\\s]\", \"\"))))"
  },
  {
    question: "How do you build a live Executive Data Hygiene KPI Dashboard in 1 LET formula?",
    shortAnswer: "=LET(tot, ROWS(MasterTable), valid, SUM(--(ScoreCol=1)), HSTACK(tot, valid, tot-valid, valid/tot))",
    explanation: "LET computes total records, approved counts, flagged counts, and compliance % KPI in pure RAM.",
    hint: "LET formula computing live board-level metrics.",
    level: "expert",
    codeExample: "Board-Level Governance KPI Formula"
  },
  {
    question: "What is the speed benefit of native C++ SIMD regex execution over legacy VBA macro loops in Excel 365?",
    shortAnswer: "Native regex operates 50x to 100x faster in compiled multi-threaded RAM, runs natively on Excel for Web and Mac, and eliminates all macro security warnings.",
    explanation: "Institutional grade performance and security compliance.",
    hint: "50x-100x faster + Cross-Platform + Zero Macro Warnings.",
    level: "expert",
    codeExample: "SIMD Compiled RAM vs Legacy VBA Macro"
  },
  {
    question: "How do you create a named LAMBDA `FX_VALIDATE_EMAIL` in Name Manager for company-wide deployment?",
    shortAnswer: "=LAMBDA(emailStr, REGEXTEST(emailStr, \"^[\\w.%+-]+@[\\w.-]+\\.[a-zA-Z]{2,}$\"))",
    explanation: "Encapsulates email RFC-standard regex validation into a reusable enterprise function.",
    hint: "LAMBDA(s, REGEXTEST(s, EmailPattern)).",
    level: "moderate",
    codeExample: "FX_VALIDATE_EMAIL = LAMBDA(s, REGEXTEST(s, \"^[\\w.%+-]+@[\\w.-]+\\.[a-zA-Z]{2,}$\"))"
  },
  {
    question: "How do you isolate the middle 3-digit exchange code from a formatted phone number `(033) 259-2114`?",
    shortAnswer: "=TEXTBEFORE(TEXTAFTER(A2, \") \"), \"-\")",
    explanation: "Pulls text between `) ` and `-`.",
    hint: "TEXTBEFORE(TEXTAFTER(A2, ') '), '-').",
    level: "basic",
    codeExample: "=TEXTBEFORE(TEXTAFTER(\"(033) 259-2114\", \") \"), \"-\") &rarr; \"259\""
  },
  {
    question: "What is Instructor Sukanta Hui's ultimate capstone principle for Modern Text Intelligence & Regular Expressions?",
    shortAnswer: "Text intelligence is the bridge between chaotic real-world data and deterministic institutional analytics! By mastering the triumvirate of Native Regex Functions (REGEXTEST, REGEXEXTRACT, REGEXREPLACE) combined with 2D Dynamic Arrays (TEXTSPLIT, TEXTBEFORE, TEXTAFTER, FILTER, BYROW, TOCOL), you possess the power to ingest, sanitize, parse, and govern millions of enterprise records in pure RAM with zero macros and zero human error!",
    explanation: "You have graduated to the elite rank of Modern Excel Text Intelligence Architects!",
    hint: "Native Regex + Dynamic Array Pipelines + In-Memory Governance = Elite Text Engineering Mastery!",
    level: "expert",
    codeExample: "Capstone Graduation: Master of Modern Text Intelligence!"
  }
];

export default questions;
