// topic9_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 9
// Topic: Combining Regex functions with dynamic array functions (FILTER, BYROW, TOCOL)
// Module: 004_004_modern-text-intelligence-and-regular-expressions
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "How do you combine FILTER with REGEXTEST to extract only records with valid PAN cards?",
    shortAnswer: "=FILTER(DataTable, REGEXTEST(CHOOSECOLS(DataTable, 3), \"^[A-Z]{5}[0-9]{4}[A-Z]$\"))",
    explanation: "REGEXTEST returns a boolean vector that FILTER uses to include only conforming rows.",
    hint: "FILTER(Table, REGEXTEST(Col, Pattern)).",
    level: "basic",
    codeExample: "=FILTER(A5:E20, REGEXTEST(C5:C20, \"^[A-Z]{5}\\d{4}[A-Z]$\"))"
  },
  {
    question: "Why does passing a range into REGEXTEST (e.g. `REGEXTEST(C5:C100, pattern)`) work seamlessly with dynamic array functions?",
    shortAnswer: "Because Excel 365 native regex functions are natively vectorized, returning spilled arrays of booleans across the range.",
    explanation: "SIMD vectorization allows single-formula array operations in compiled memory.",
    hint: "Native array vectorization.",
    level: "basic",
    codeExample: "=REGEXTEST(C5:C100, \"^[A-Z]{5}\\d{4}[A-Z]$\")"
  },
  {
    question: "How do you extract all invoice codes across 100 cells into a single, vertical deduplicated list?",
    shortAnswer: "=SORT(UNIQUE(TOCOL(REGEXEXTRACT(A5:A100, \"\\bINV-\\d+\\b\", 1), 3)))",
    explanation: "REGEXEXTRACT pulls all invoice IDs, TOCOL flattens the 2D array into a 1D column (ignoring errors with 3), UNIQUE deduplicates, and SORT alphabetizes.",
    hint: "SORT(UNIQUE(TOCOL(REGEXEXTRACT(..., 1), 3))).",
    level: "advanced",
    codeExample: "=SORT(UNIQUE(TOCOL(REGEXEXTRACT(A5:A100, \"INV-\\d+\", 1), 3)))"
  },
  {
    question: "How do you use BYROW to decompose full names across `A5:A20` into First and Last Name columns using REGEXEXTRACT mode 2?",
    shortAnswer: "=BYROW(A5:A20, LAMBDA(row, REGEXEXTRACT(row, \"^(\\w+)\\s+(.+)$\", 2)))",
    explanation: "BYROW evaluates each row vector and spills the 2 capturing groups across 2 adjacent columns.",
    hint: "BYROW(Range, LAMBDA(r, REGEXEXTRACT(r, pattern, 2))).",
    level: "advanced",
    codeExample: "=BYROW(A5:A20, LAMBDA(r, REGEXEXTRACT(r, \"^(\\w+)\\s+(.+)$\", 2)))"
  },
  {
    question: "How do you filter a database to show only rows where the customer's email is a corporate email (not gmail.com or yahoo.com)?",
    shortAnswer: "=FILTER(CustomerTable, NOT(REGEXTEST(CHOOSECOLS(CustomerTable, 4), \"@(gmail|yahoo|hotmail)\\.com$\", 1)))",
    explanation: "Tests for public webmail domains and filters them out using NOT.",
    hint: "FILTER(Table, NOT(REGEXTEST(Col, \"@(gmail|yahoo)\"))).",
    level: "moderate",
    codeExample: "=FILTER(A5:D20, NOT(REGEXTEST(D5:D20, \"@(gmail|yahoo)\\.com$\", 1)))"
  },
  {
    question: "How do you clean an entire 500-row column of text comments by removing HTML tags using MAP and REGEXREPLACE?",
    shortAnswer: "=MAP(A5:A500, LAMBDA(cell, TRIM(REGEXREPLACE(cell, \"<[^>]+>\", \"\"))))",
    explanation: "MAP iterates across each cell, replacing HTML tags and trimming extra whitespace.",
    hint: "MAP(Range, LAMBDA(c, REGEXREPLACE(c, \"<[^>]+>\", \"\"))).",
    level: "moderate",
    codeExample: "=MAP(A5:A500, LAMBDA(c, TRIM(REGEXREPLACE(c, \"<[^>]+>\", \"\"))))"
  },
  {
    question: "How do you filter records where EITHER the phone number OR the email address is invalid?",
    shortAnswer: "=FILTER(DataTable, NOT(REGEXTEST(PhoneCol, \"^[6-9]\\d{9}$\") * REGEXTEST(EmailCol, \"^[\\w.%+-]+@[\\w.-]+\\.[a-zA-Z]{2,}$\")))",
    explanation: "Boolean multiplication `*` simulates AND; wrapping in NOT identifies records with any compliance failure.",
    hint: "FILTER(Table, NOT(ValidPhone * ValidEmail)).",
    level: "advanced",
    codeExample: "=FILTER(A5:E20, NOT(REGEXTEST(D5:D20, \"^[6-9]\\d{9}$\") * REGEXTEST(E5:E20, \"^[\\w.%+-]+@[\\w.-]+\\.[a-zA-Z]{2,}$\")))"
  },
  {
    question: "How do you count the total number of distinct invoice numbers mentioned across an entire column of bank statements?",
    shortAnswer: "=COUNTA(UNIQUE(TOCOL(REGEXEXTRACT(B5:B100, \"INV-\\d+\", 1), 3)))",
    explanation: "Extracts all invoice tokens into a 1D column, deduplicates with UNIQUE, and counts with COUNTA.",
    hint: "COUNTA(UNIQUE(TOCOL(REGEXEXTRACT(..., 1), 3))).",
    level: "advanced",
    codeExample: "=COUNTA(UNIQUE(TOCOL(REGEXEXTRACT(B5:B100, \"INV-\\d+\", 1), 3)))"
  },
  {
    question: "How do you apply a sequential chain of 3 regex replacements across text using the REDUCE function?",
    shortAnswer: "=REDUCE(rawText, {\"<[^>]+>\", \"[^a-zA-Z0-9\\s]\", \"\\s+\"}, LAMBDA(acc, pat, REGEXREPLACE(acc, pat, \" \")))",
    explanation: "REDUCE passes the accumulator text through each regex pattern iteratively.",
    hint: "REDUCE(text, patternArray, LAMBDA(acc, pat, REGEXREPLACE(acc, pat, replacement))).",
    level: "expert",
    codeExample: "REDUCE Pattern Transformation Chain"
  },
  {
    question: "How do you use CHOOSECOLS and REGEXTEST to sort customers by whether their tax ID is valid first?",
    shortAnswer: "=SORTBY(CustomerTable, REGEXTEST(CHOOSECOLS(CustomerTable, 3), \"^[A-Z]{5}\\d{4}[A-Z]$\"), -1)",
    explanation: "SORTBY uses the boolean vector (-1 descending) to place valid records at the top.",
    hint: "SORTBY(Table, REGEXTEST(Col, Pattern), -1).",
    level: "moderate",
    codeExample: "=SORTBY(A5:D20, REGEXTEST(C5:C20, \"^[A-Z]{5}\\d{4}[A-Z]$\"), -1)"
  },
  {
    question: "How do you extract the maximum invoice amount mentioned in a column of narrative notes?",
    shortAnswer: "=MAX(NUMBERVALUE(TOCOL(REGEXEXTRACT(B5:B100, \"(?<=INR\\s)\\d+(\\.\\d{2})?\", 1), 3)))",
    explanation: "Extracts all INR currency amounts, converts to numeric, and computes MAX.",
    hint: "MAX(NUMBERVALUE(TOCOL(REGEXEXTRACT(..., 1), 3))).",
    level: "advanced",
    codeExample: "=MAX(NUMBERVALUE(TOCOL(REGEXEXTRACT(B5:B100, \"(?<=INR\\s)\\d+\", 1), 3)))"
  },
  {
    question: "How do you combine TEXTSPLIT and TOCOL to extract all individual words from a paragraph into a vertical sorted vocabulary list?",
    shortAnswer: "=SORT(UNIQUE(TOCOL(TEXTSPLIT(A2, {\" \", \",\", \".\", \";\", \"!\", \"?\"}, , TRUE))))",
    explanation: "TEXTSPLIT separates words by punctuation, TOCOL flattens to a column, UNIQUE deduplicates, and SORT alphabetizes.",
    hint: "SORT(UNIQUE(TOCOL(TEXTSPLIT(...)))).",
    level: "moderate",
    codeExample: "=SORT(UNIQUE(TOCOL(TEXTSPLIT(A2, {\" \", \",\", \".\"}, , TRUE))))"
  },
  {
    question: "How do you filter a dataset for rows where a description mentions ANY of 4 specific transaction types (`NEFT`, `RTGS`, `UPI`, `IMPS`)?",
    shortAnswer: "=FILTER(DataTable, REGEXTEST(NarrationCol, \"\\b(NEFT|RTGS|UPI|IMPS)\\b\"))",
    explanation: "Alternation inside REGEXTEST tests for any of the 4 transaction methods.",
    hint: "FILTER(Table, REGEXTEST(Col, \"\\b(NEFT|RTGS|UPI|IMPS)\\b\")).",
    level: "basic",
    codeExample: "=FILTER(A5:E20, REGEXTEST(B5:B20, \"\\b(NEFT|RTGS|UPI|IMPS)\\b\"))"
  },
  {
    question: "How do you extract only the numeric IDs from a column of mixed text strings and sum them?",
    shortAnswer: "=SUM(NUMBERVALUE(IFNA(REGEXEXTRACT(A5:A100, \"\\d+\"), 0)))",
    explanation: "REGEXEXTRACT pulls the first number from each row, IFNA provides 0 fallback, NUMBERVALUE converts, and SUM totals.",
    hint: "SUM(NUMBERVALUE(IFNA(REGEXEXTRACT(...), 0))).",
    level: "moderate",
    codeExample: "=SUM(NUMBERVALUE(IFNA(REGEXEXTRACT(A5:A100, \"\\d+\"), 0)))"
  },
  {
    question: "How do you construct a dynamic customer master validation dashboard that displays total records, total valid PANs, total valid Emails, and Compliance % in 1 LET formula?",
    shortAnswer: "=LET(total, ROWS(A5:A100), validP, SUM(--REGEXTEST(C5:C100, \"^[A-Z]{5}\\d{4}[A-Z]$\")), validE, SUM(--REGEXTEST(D5:D100, \"^[\\w.%+-]+@[\\w.-]+\\.[a-zA-Z]{2,}$\")), HSTACK(total, validP, validE, validP/total))",
    explanation: "LET orchestrates count metrics and computes instant compliance percentage KPI.",
    hint: "LET formula computing totals and compliance % KPI.",
    level: "expert",
    codeExample: "LET Validation Dashboard Pipeline"
  },
  {
    question: "How do you use REGEXREPLACE inside MAP to mask the middle digits of credit cards across an entire column?",
    shortAnswer: "=MAP(CardCol, LAMBDA(c, REGEXREPLACE(c, \"^\\d{4}-\\d{4}-\\d{4}-(\\d{4})$\", \"XXXX-XXXX-XXXX-$1\")))",
    explanation: "MAP applies the masking pattern to every cell in the card column.",
    hint: "MAP(Cards, LAMBDA(c, REGEXREPLACE(c, pattern, \"XXXX-XXXX-XXXX-$1\"))).",
    level: "moderate",
    codeExample: "=MAP(C5:C50, LAMBDA(c, REGEXREPLACE(c, \"^\\d{4}-\\d{4}-\\d{4}-(\\d{4})$\", \"XXXX-XXXX-XXXX-$1\")))"
  },
  {
    question: "How do you filter customer records to include only those whose PIN code starts with '700' (Kolkata region)?",
    shortAnswer: "=FILTER(CustomerTable, REGEXTEST(CHOOSECOLS(CustomerTable, 5), \"^700\\d{3}$\"))",
    explanation: "Pattern `^700\\d{3}$` validates 6-digit PIN codes beginning with 700.",
    hint: "FILTER(Table, REGEXTEST(Col, \"^700\\d{3}$\")).",
    level: "basic",
    codeExample: "=FILTER(A5:E20, REGEXTEST(E5:E20, \"^700\\d{3}$\"))"
  },
  {
    question: "How do you extract a list of unique domain names from a 1,000-row email column in 1 formula?",
    shortAnswer: "=SORT(UNIQUE(TEXTAFTER(EmailColumn, \"@\")))",
    explanation: "TEXTAFTER pulls domain names from the entire email vector, UNIQUE deduplicates, and SORT alphabetizes.",
    hint: "SORT(UNIQUE(TEXTAFTER(EmailCol, \"@\"))).",
    level: "basic",
    codeExample: "=SORT(UNIQUE(TEXTAFTER(D5:D1000, \"@\")))"
  },
  {
    question: "How do you extract all phone numbers mentioned in a narrative column and format them as standard `(XXX) XXX-XXXX`?",
    shortAnswer: "=LET(rawNums, REGEXEXTRACT(B5:B100, \"\\b[6-9]\\d{9}\\b\"), MAP(rawNums, LAMBDA(n, IFNA(REGEXREPLACE(n, \"^(\\d{3})(\\d{3})(\\d{4})$\", \"($1) $2-$3\"), \"No Phone\"))))",
    explanation: "Extracts 10-digit phones and applies regex formatting across the spilled array.",
    hint: "LET + REGEXEXTRACT + MAP + REGEXREPLACE.",
    level: "expert",
    codeExample: "End-to-End Extraction & Masking Pipeline"
  },
  {
    question: "How do you combine REGEXTEST with DROP and REDUCE to audit a multi-column dataset where all columns must conform to specific regex patterns?",
    shortAnswer: "Map each column to its respective REGEXTEST pattern, multiply the boolean vectors together, and pass to FILTER.",
    explanation: "Multi-field boolean vector intersection.",
    hint: "Multiply boolean vectors from each column test.",
    level: "expert",
    codeExample: "Multi-Field Regex Audit Pipeline"
  },
  {
    question: "What is the primary advantage of combining native Regex functions with dynamic array functions (FILTER, BYROW, TOCOL)?",
    shortAnswer: "It creates 100% automated, formulaic ETL data pipelines in pure RAM that update instantly when new records are entered, requiring zero VBA macros or Python scripts.",
    explanation: "Replaces external data cleaning scripts with live spreadsheet formulas.",
    hint: "Live, automated RAM pipelines with zero macros or external scripts.",
    level: "expert",
    codeExample: "Formulaic ETL in Pure RAM"
  },
  {
    question: "How do you filter a ledger table for transactions where the narration contains the word 'Audit' or 'Tax' case-insensitively?",
    shortAnswer: "=FILTER(LedgerTable, REGEXTEST(CHOOSECOLS(LedgerTable, 2), \"\\b(Audit|Tax)\\b\", 1))",
    explanation: "case_sensitivity = 1 matches audit, Audit, AUDIT, tax, Tax, TAX.",
    hint: "REGEXTEST(Col, \"\\b(Audit|Tax)\\b\", 1).",
    level: "basic",
    codeExample: "=FILTER(A5:D20, REGEXTEST(B5:B20, \"\\b(Audit|Tax)\\b\", 1))"
  },
  {
    question: "How do you extract all numbers from a column of mixed strings and calculate their standard deviation?",
    shortAnswer: "=STDEV.S(NUMBERVALUE(TOCOL(REGEXEXTRACT(A5:A100, \"\\d+\", 1), 3)))",
    explanation: "Extracts all numbers into a 1D column, converts to numeric, and computes STDEV.S.",
    hint: "STDEV.S(NUMBERVALUE(TOCOL(REGEXEXTRACT(..., 1), 3))).",
    level: "advanced",
    codeExample: "=STDEV.S(NUMBERVALUE(TOCOL(REGEXEXTRACT(A5:A100, \"\\d+\", 1), 3)))"
  },
  {
    question: "How do you split and transpose a comma-separated list in cell A2 into a clean 2-column table with Row Index numbers?",
    shortAnswer: "=LET(items, TOCOL(TEXTSPLIT(A2, \",\", , TRUE)), HSTACK(SEQUENCE(ROWS(items)), items))",
    explanation: "TEXTSPLIT splits items, TOCOL creates vertical vector, SEQUENCE generates index numbers, and HSTACK joins them.",
    hint: "LET(items, TOCOL(TEXTSPLIT(...)), HSTACK(SEQUENCE(ROWS(items)), items)).",
    level: "advanced",
    codeExample: "Indexed Vertical Table from Delimited String"
  },
  {
    question: "How do you extract all URLs starting with http:// or https:// from a long narrative text block as a unique vertical list?",
    shortAnswer: "=UNIQUE(TOCOL(REGEXEXTRACT(A2, \"https?://[\\w.-]+(?:/[\\w.-]*)*\", 1)))",
    explanation: "Mode 1 pulls all URL strings, TOCOL flattens to a column, and UNIQUE deduplicates.",
    hint: "UNIQUE(TOCOL(REGEXEXTRACT(..., 1))).",
    level: "moderate",
    codeExample: "=UNIQUE(TOCOL(REGEXEXTRACT(Text, \"https?://[\\w.-]+\", 1)))"
  },
  {
    question: "How do you group and sum transaction amounts by their extracted transaction prefix (`BKP`, `SHY`, `ICH`) in 1 formula?",
    shortAnswer: "=LET(prefixes, REGEXEXTRACT(NarrationCol, \"^(BKP|SHY|ICH)\"), amounts, AmountCol, PIVOTBY(prefixes, , amounts, SUM))",
    explanation: "REGEXEXTRACT creates grouping categories, and PIVOTBY sums amounts by prefix.",
    hint: "LET + REGEXEXTRACT + PIVOTBY / GROUPBY.",
    level: "expert",
    codeExample: "REGEX Grouping with PIVOTBY Engine"
  },
  {
    question: "How do you replace all non-digit characters across 3 columns simultaneously using MAP?",
    shortAnswer: "=MAP(B5:D20, LAMBDA(cell, REGEXREPLACE(cell, \"\\D\", \"\")))",
    explanation: "MAP can accept a 2D range and applies REGEXREPLACE across all cells.",
    hint: "MAP(2D_Range, LAMBDA(c, REGEXREPLACE(c, \"\\D\", \"\"))).",
    level: "moderate",
    codeExample: "=MAP(B5:D20, LAMBDA(c, REGEXREPLACE(c, \"\\D\", \"\")))"
  },
  {
    question: "How do you filter a customer table to exclude records that have trailing or leading whitespace in their customer name?",
    shortAnswer: "=FILTER(CustomerTable, NOT(REGEXTEST(CHOOSECOLS(CustomerTable, 2), \"^\\s|\\s$\")))",
    explanation: "Pattern `^\\s|\\s$` detects leading or trailing whitespace; NOT filters them out.",
    hint: "NOT(REGEXTEST(NameCol, \"^\\s|\\s$\")).",
    level: "moderate",
    codeExample: "=FILTER(A5:D20, NOT(REGEXTEST(B5:B20, \"^\\s|\\s$\")))"
  },
  {
    question: "How do you extract only the date portion from timestamps across a column and sort them chronologically?",
    shortAnswer: "=SORT(UNIQUE(TEXTBEFORE(TimestampCol, \" \")))",
    explanation: "TEXTBEFORE extracts text before the space (the date), UNIQUE deduplicates, and SORT orders chronologically.",
    hint: "SORT(UNIQUE(TEXTBEFORE(Timestamps, \" \"))).",
    level: "basic",
    codeExample: "=SORT(UNIQUE(TEXTBEFORE(A5:A100, \" \")))"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for combining Regex with Dynamic Array functions?",
    shortAnswer: "Harness the power of native vectorization! By combining REGEXTEST, REGEXEXTRACT, and REGEXREPLACE with FILTER, BYROW, TOCOL, and MAP, you transform Microsoft Excel into an ultra-fast, multi-threaded relational data engineering engine that validates, parses, and cleans tens of thousands of corporate records in pure RAM with zero macros!",
    explanation: "Vectorized regex pipelines represent the apex of modern spreadsheet architecture!",
    hint: "Regex Functions + Dynamic Array Pipelines (FILTER, BYROW, TOCOL) = Ultra-Fast RAM ETL!",
    level: "expert",
    codeExample: "Rule: Vectorized Regex Pipelines → Combine Regex with Dynamic Arrays!"
  }
];

export default questions;
