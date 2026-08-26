// topic11_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 11
// Topic: Parsing semi-structured log files, invoice text blocks, and ERP export strings
// Module: 004_004_modern-text-intelligence-and-regular-expressions
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What defines semi-structured text in corporate ERP and server environments?",
    shortAnswer: "Text that lacks a rigid tabular schema but contains discernible patterns, key-value markers, or composite delimiters (e.g. log lines, invoice blocks, EDI messages).",
    explanation: "Requires dynamic text intelligence tools to extract relational fields.",
    hint: "Text with repeating patterns but no strict table schema.",
    level: "basic",
    codeExample: "\"[2026-08-26 14:30:00] [WARN] [User: swadeep.b] [IP: 192.168.1.50] DB Connection Latency > 500ms\""
  },
  {
    question: "How do you parse a server log line `[Timestamp] [Level] [User] [IP] [Message]` into 5 adjacent columns in 1 formula using REGEXEXTRACT?",
    shortAnswer: "=REGEXEXTRACT(A2, \"^\\[([^\\]]+)\\]\\s+\\[([^\\]]+)\\]\\s+\\[User:\\s*([^\\]]+)\\]\\s+\\[IP:\\s*([^\\]]+)\\]\\s+(.+)$\", 2)",
    explanation: "Mode 2 spills all 5 capturing groups across adjacent columns.",
    hint: "REGEXEXTRACT with 5 bracketed capturing groups and return_mode = 2.",
    level: "advanced",
    codeExample: "=REGEXEXTRACT(A2, \"^\\[([^\\]]+)\\]\\s+\\[([^\\]]+)\\]\\s+\\[User:\\s*([^\\]]+)\\]\\s+\\[IP:\\s*([^\\]]+)\\]\\s+(.+)$\", 2)"
  },
  {
    question: "How do you extract the IP address from a raw server error line `Error from 192.168.1.100 port 8080`?",
    shortAnswer: "=REGEXEXTRACT(A2, \"\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b\")",
    explanation: "Matches standard 4-octet IPv4 address structure.",
    hint: "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b.",
    level: "basic",
    codeExample: "=REGEXEXTRACT(A2, \"\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b\") &rarr; \"192.168.1.100\""
  },
  {
    question: "How do you parse an invoice block `INV: BKP-88421 | AMT: 45000 | GST: 18%` into a structured 2-column key-value matrix?",
    shortAnswer: "=TEXTSPLIT(A2, \": \", \" | \")",
    explanation: "TEXTSPLIT uses `: ` as column delimiter and ` | ` as row delimiter.",
    hint: "TEXTSPLIT(A2, \": \", \" | \").",
    level: "moderate",
    codeExample: "=TEXTSPLIT(A2, \": \", \" | \")"
  },
  {
    question: "How do you extract the invoice number from a key-value formatted ERP string `...; INV_NO=BKP-9942; ...` using positive lookbehind?",
    shortAnswer: "=REGEXEXTRACT(A2, \"(?<=INV_NO=)[A-Z0-9-]+\")",
    explanation: "Lookbehind `(?<=INV_NO=)` matches the code immediately following the key.",
    hint: "(?<=INV_NO=)[A-Z0-9-]+.",
    level: "moderate",
    codeExample: "=REGEXEXTRACT(A2, \"(?<=INV_NO=)[A-Z0-9-]+\")"
  },
  {
    question: "How do you extract and convert the monetary amount from a transaction string `Transfer of INR 45,000.50 processed` into a real number?",
    shortAnswer: "=NUMBERVALUE(REGEXEXTRACT(A2, \"(?<=INR\\s)[0-9,]+(\\.[0-9]{2})?\"))",
    explanation: "REGEXEXTRACT pulls the currency digits and NUMBERVALUE coerces to numeric float.",
    hint: "NUMBERVALUE(REGEXEXTRACT(A2, \"(?<=INR\\s)[0-9,.]+\")).",
    level: "basic",
    codeExample: "=NUMBERVALUE(REGEXEXTRACT(A2, \"(?<=INR\\s)[0-9,.]+\"))"
  },
  {
    question: "How do you parse a multi-line invoice text block where items are separated by line breaks (CHAR(10)) and fields by tabs (CHAR(9))?",
    shortAnswer: "=TEXTSPLIT(A2, CHAR(9), CHAR(10))",
    explanation: "Spills items across rows (CHAR 10) and fields across columns (CHAR 9).",
    hint: "TEXTSPLIT(A2, CHAR(9), CHAR(10)).",
    level: "moderate",
    codeExample: "=TEXTSPLIT(RawBlock, CHAR(9), CHAR(10))"
  },
  {
    question: "How do you extract all error codes starting with `ERR_` followed by 4 digits from an entire log sheet into a single unique list?",
    shortAnswer: "=SORT(UNIQUE(TOCOL(REGEXEXTRACT(A5:A500, \"\\bERR_\\d{4}\\b\", 1), 3)))",
    explanation: "REGEXEXTRACT pulls all error codes, TOCOL flattens to 1D, UNIQUE deduplicates, and SORT alphabetizes.",
    hint: "SORT(UNIQUE(TOCOL(REGEXEXTRACT(..., 1), 3))).",
    level: "advanced",
    codeExample: "=SORT(UNIQUE(TOCOL(REGEXEXTRACT(A5:A500, \"ERR_\\d{4}\", 1), 3)))"
  },
  {
    question: "How do you extract the HTTP status code (e.g. `200`, `404`, `500`) from an Apache web access log entry?",
    shortAnswer: "=REGEXEXTRACT(A2, \"(?<=\\\"\\s)[1-5]\\d{2}(?=\\s)\")",
    explanation: "Matches 3-digit HTTP code between the closing quote of the request and following space.",
    hint: "Lookbehind for quote + 3 digits.",
    level: "advanced",
    codeExample: "=REGEXEXTRACT(LogLine, \"(?<=\\\"\\s)[1-5]\\d{2}(?=\\s)\")"
  },
  {
    question: "How do you extract the authenticated user ID from an ERP log `Auth success for UID:[swadeep_88] from terminal 4`?",
    shortAnswer: "=TEXTBEFORE(TEXTAFTER(A2, \"UID:[\"), \"]\")",
    explanation: "Composite TEXTAFTER and TEXTBEFORE extracts text between `UID:[` and `]`.",
    hint: "TEXTBEFORE(TEXTAFTER(A2, \"UID:[\"), \"]\").",
    level: "basic",
    codeExample: "=TEXTBEFORE(TEXTAFTER(A2, \"UID:[\"), \"]\") &rarr; \"swadeep_88\""
  },
  {
    question: "How do you parse a legacy EDI transaction string with custom tilde `~` line separators and asterisk `*` element delimiters?",
    shortAnswer: "=TEXTSPLIT(A2, \"*\", \"~\")",
    explanation: "Splits elements across columns with `*` and segments across rows with `~`.",
    hint: "TEXTSPLIT(A2, \"*\", \"~\").",
    level: "moderate",
    codeExample: "=TEXTSPLIT(\"BIG*20260826*INV01~ITM*1*LAPTOP*50000~TDS*10%\", \"*\", \"~\")"
  },
  {
    question: "How do you parse an entire 500-row column of log entries into a 4-column structured table in a single formula?",
    shortAnswer: "=DROP(REDUCE(\"\", A5:A500, LAMBDA(acc, line, VSTACK(acc, REGEXEXTRACT(line, \"^\\[([^\\]]+)\\]\\s+\\[([^\\]]+)\\]\\s+\\[([^\\]]+)\\]\\s+(.+)$\", 2)))), 1)",
    explanation: "REDUCE stacks the extracted 4-column vectors for each row in pure formula RAM.",
    hint: "REDUCE + VSTACK + REGEXEXTRACT mode 2.",
    level: "expert",
    codeExample: "Vectorized Multi-Row Parsing Pipeline"
  },
  {
    question: "How do you extract the timestamp `YYYY-MM-DD HH:MM:SS` from a free-text narrative note?",
    shortAnswer: "=REGEXEXTRACT(A2, \"\\b\\d{4}-\\d{2}-\\d{2}\\s+\\d{2}:\\d{2}:\\d{2}\\b\")",
    explanation: "Matches standard ISO timestamp pattern.",
    hint: "\\b\\d{4}-\\d{2}-\\d{2}\\s+\\d{2}:\\d{2}:\\d{2}\\b.",
    level: "basic",
    codeExample: "=REGEXEXTRACT(A2, \"\\b\\d{4}-\\d{2}-\\d{2}\\s+\\d{2}:\\d{2}:\\d{2}\\b\")"
  },
  {
    question: "How do you extract the response latency number in milliseconds from a log `Completed in 342ms with status OK`?",
    shortAnswer: "=NUMBERVALUE(REGEXEXTRACT(A2, \"\\d+(?=ms)\"))",
    explanation: "Positive lookahead `(?=ms)` matches digits immediately preceding 'ms'.",
    hint: "NUMBERVALUE(REGEXEXTRACT(A2, \"\\d+(?=ms)\")).",
    level: "moderate",
    codeExample: "=NUMBERVALUE(REGEXEXTRACT(A2, \"\\d+(?=ms)\")) &rarr; 342"
  },
  {
    question: "How do you parse a semi-structured customer note containing PAN, GSTIN, and Mobile numbers in random order into separate dedicated columns?",
    shortAnswer: "=HSTACK(IFNA(REGEXEXTRACT(A2, \"[A-Z]{5}\\d{4}[A-Z]\"), \"N/A\"), IFNA(REGEXEXTRACT(A2, \"\\d{2}[A-Z]{5}\\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]\"), \"N/A\"), IFNA(REGEXEXTRACT(A2, \"\\b[6-9]\\d{9}\\b\"), \"N/A\"))",
    explanation: "Independent REGEXEXTRACT formulas isolate each token regardless of order and HSTACK joins them horizontally.",
    hint: "HSTACK(ExtractPAN, ExtractGST, ExtractPhone).",
    level: "advanced",
    codeExample: "Multi-Field Random Order Entity Extraction"
  },
  {
    question: "How do you extract the SQL query table name from a database log `Executed SELECT * FROM tbl_CustomerMaster WHERE...`?",
    shortAnswer: "=REGEXEXTRACT(A2, \"(?<=FROM\\s)\\w+\", 1)",
    explanation: "Lookbehind `(?<=FROM\\s)` extracts the table name case-insensitively.",
    hint: "(?<=FROM\\s)\\w+.",
    level: "moderate",
    codeExample: "=REGEXEXTRACT(A2, \"(?<=FROM\\s)\\w+\", 1) &rarr; \"tbl_CustomerMaster\""
  },
  {
    question: "How do you extract all email addresses found within a multi-paragraph email thread into a vertical list?",
    shortAnswer: "=UNIQUE(TOCOL(REGEXEXTRACT(A2, \"[\\w.%+-]+@[\\w.-]+\\.[a-zA-Z]{2,}\", 1)))",
    explanation: "Mode 1 pulls all email occurrences, TOCOL converts to vertical column, and UNIQUE deduplicates.",
    hint: "UNIQUE(TOCOL(REGEXEXTRACT(..., 1))).",
    level: "basic",
    codeExample: "=UNIQUE(TOCOL(REGEXEXTRACT(ThreadText, \"[\\w.%+-]+@[\\w.-]+\\.[a-zA-Z]{2,}\", 1)))"
  },
  {
    question: "How do you parse a pipe-delimited ERP dump line `1001|Swadeep Banerjee|Barrackpore|45000.00|Active`?",
    shortAnswer: "=TEXTSPLIT(A2, \"|\")",
    explanation: "Splits the record across 5 columns.",
    hint: "TEXTSPLIT(A2, \"|\").",
    level: "basic",
    codeExample: "=TEXTSPLIT(A2, \"|\")"
  },
  {
    question: "How do you extract the JSON value of `\"status\": \"SUCCESS\"` from an API response string?",
    shortAnswer: "=REGEXEXTRACT(A2, \"(?<=\\\"status\\\":\\s*\\\")[^\\\"]+\")",
    explanation: "Lookbehind finds `\"status\": \"` and captures characters up to closing quote.",
    hint: "(?<=\\\"status\\\":\\s*\\\")[^\\\" ]+.",
    level: "advanced",
    codeExample: "=REGEXEXTRACT(A2, \"(?<=\\\"status\\\":\\s*\\\")[^\\\"]+\") &rarr; \"SUCCESS\""
  },
  {
    question: "How do you count the frequency of each error level (`INFO`, `WARN`, `ERROR`, `FATAL`) across 10,000 log lines?",
    shortAnswer: "=LET(levels, REGEXEXTRACT(A5:A10000, \"(?<=\\[)(INFO|WARN|ERROR|FATAL)(?=\\])\"), PIVOTBY(levels, , levels, COUNTA))",
    explanation: "REGEXEXTRACT pulls the level tags, and PIVOTBY counts occurrences dynamically.",
    hint: "LET + REGEXEXTRACT + PIVOTBY / GROUPBY.",
    level: "expert",
    codeExample: "Log Frequency Aggregation Pipeline"
  },
  {
    question: "How do you convert an extracted date string `26/08/2026` into a genuine Excel serial date value?",
    shortAnswer: "=DATEVALUE(REGEXEXTRACT(A2, \"\\b\\d{2}/\\d{2}/\\d{4}\\b\"))",
    explanation: "DATEVALUE converts the extracted text string to an Excel numeric serial date.",
    hint: "DATEVALUE(REGEXEXTRACT(...)).",
    level: "basic",
    codeExample: "=DATEVALUE(REGEXEXTRACT(A2, \"\\b\\d{2}/\\d{2}/\\d{4}\\b\"))"
  },
  {
    question: "How do you parse a semi-structured bank statement narration `UPI/623488219/P2A/Swadeep/HDFC/45000.00` into individual fields?",
    shortAnswer: "=TEXTSPLIT(A2, \"/\")",
    explanation: "Splits all slash-separated transaction components across adjacent columns.",
    hint: "TEXTSPLIT(A2, \"/\").",
    level: "basic",
    codeExample: "=TEXTSPLIT(A2, \"/\")"
  },
  {
    question: "How do you extract the transaction reference number from `UPI/623488219/P2A/...` using TEXTAFTER and TEXTBEFORE?",
    shortAnswer: "=TEXTBEFORE(TEXTAFTER(A2, \"UPI/\"), \"/\")",
    explanation: "Isolates the reference code between `UPI/` and the next slash.",
    hint: "TEXTBEFORE(TEXTAFTER(A2, \"UPI/\"), \"/\").",
    level: "basic",
    codeExample: "=TEXTBEFORE(TEXTAFTER(A2, \"UPI/\"), \"/\") &rarr; \"623488219\""
  },
  {
    question: "How do you extract the GST rate percentage from `Item Total: 50000 (GST @ 18% Applicable)`?",
    shortAnswer: "=REGEXEXTRACT(A2, \"\\d+%(?=\\sApplicable)\")",
    explanation: "Matches digits followed by `%` preceding 'Applicable'.",
    hint: "\\d+%(?=\\sApplicable).",
    level: "basic",
    codeExample: "=REGEXEXTRACT(A2, \"\\d+%(?=\\sApplicable)\") &rarr; \"18%\""
  },
  {
    question: "How do you parse an XML tag attribute like `<customer id='CUST-8842' region='Barrackpore'>`?",
    shortAnswer: "=REGEXEXTRACT(A2, \"(?<=id=')[^']+\")",
    explanation: "Lookbehind for `id='` captures characters up to closing single quote.",
    hint: "(?<=id=')[^']+",
    level: "advanced",
    codeExample: "=REGEXEXTRACT(A2, \"(?<=id=')[^']+\") &rarr; \"CUST-8842\""
  },
  {
    question: "How do you extract the domain name from server access log referrers `http://example.com/page.html`?",
    shortAnswer: "=REGEXEXTRACT(A2, \"(?<=https?://)[^/\\s]+\")",
    explanation: "Lookbehind for protocol matches domain characters up to next slash.",
    hint: "(?<=https?://)[^/\\s]+.",
    level: "moderate",
    codeExample: "=REGEXEXTRACT(Referrer, \"(?<=https?://)[^/\\s]+\")"
  },
  {
    question: "How do you parse a composite SKU `ELEC-LAP-DELL-88421` into Category, Subcategory, Brand, and Model Number columns?",
    shortAnswer: "=TEXTSPLIT(A2, \"-\")",
    explanation: "Spills the 4 segments across 4 adjacent columns.",
    hint: "TEXTSPLIT(A2, \"-\").",
    level: "basic",
    codeExample: "=TEXTSPLIT(\"ELEC-LAP-DELL-88421\", \"-\")"
  },
  {
    question: "How do you filter a 10,000-line server log to view only FATAL errors or database timeouts in 1 formula?",
    shortAnswer: "=FILTER(LogRange, REGEXTEST(LogRange, \"\\[(FATAL|TIMEOUT)\\]|Connection Refused\", 1))",
    explanation: "FILTER with alternation inside REGEXTEST extracts critical error records instantly.",
    hint: "FILTER(Logs, REGEXTEST(Logs, \"\\[(FATAL|TIMEOUT)\\]\", 1)).",
    level: "moderate",
    codeExample: "=FILTER(A5:A10000, REGEXTEST(A5:A10000, \"\\[(FATAL|TIMEOUT)\\]\", 1))"
  },
  {
    question: "How do you clean and parse raw credit card transaction swipe text into CardType, Last4, and Amount columns?",
    shortAnswer: "=REGEXEXTRACT(A2, \"^(VISA|MC|AMEX|RUPAY)\\s+XXXX-\\d{4}\\s+INR\\s+([0-9.]+)\", 2)",
    explanation: "Capturing groups isolate the card brand and amount float into 2 spilled columns.",
    hint: "REGEXEXTRACT with capturing groups and mode 2.",
    level: "advanced",
    codeExample: "=REGEXEXTRACT(\"VISA XXXX-8842 INR 4500.00\", \"^(VISA|MC|AMEX|RUPAY)\\s+XXXX-(\\d{4})\\s+INR\\s+([0-9.]+)\", 2)"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for parsing semi-structured text in Excel 365?",
    shortAnswer: "Never waste hours manually splitting text with Text-to-Columns or writing brittle VBA parsers! Combine TEXTSPLIT for 2D delimiter matrices, REGEXEXTRACT mode 2 with capturing groups for bracketed multi-token log rows, and dynamic array pipelines (REDUCE, TOCOL) to transform millions of semi-structured text lines into pristine relational tables in sub-millisecond compiled RAM!",
    explanation: "Mastering semi-structured text parsing bridges the gap between raw unstructured data and enterprise relational reporting!",
    hint: "TEXTSPLIT Matrix + REGEXEXTRACT Mode 2 Capturing Groups + Vector Pipelines = Ultimate Parsing Engine!",
    level: "expert",
    codeExample: "Rule: Semi-Structured Text Parsing &rarr; Deploy Dynamic Regex & Matrix Engines!"
  }
];

export default questions;
