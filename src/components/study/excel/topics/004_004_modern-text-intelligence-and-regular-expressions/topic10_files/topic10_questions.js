// topic10_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 10
// Topic: Automated data sanitization: Stripping HTML tags, non-alphanumeric noise, and excess whitespace
// Module: 004_004_modern-text-intelligence-and-regular-expressions
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What is Automated Data Sanitization in modern spreadsheet engineering?",
    shortAnswer: "The programmatic cleansing of raw, noisy text (stripping HTML tags, removing illegal symbols, collapsing irregular whitespace) into structured, uniform database strings using regular expressions.",
    explanation: "Ensures data hygiene before downstream analysis, machine learning ingestion, or statutory reporting.",
    hint: "Cleansing raw text into clean, structured data.",
    level: "basic",
    codeExample: "=TRIM(REGEXREPLACE(REGEXREPLACE(A2, \"<[^>]+>\", \"\"), \"[^a-zA-Z0-9\\s]\", \"\"))"
  },
  {
    question: "What regex pattern is used to strip all HTML and XML markup tags (e.g. `<div class='content'>`, `<br/>`) from text?",
    shortAnswer: "<[^>]+>",
    explanation: "Matches `<` followed by any characters except `>` up to the closing `>`.",
    hint: "<[^>]+>.",
    level: "basic",
    codeExample: "=REGEXREPLACE(A2, \"<[^>]+>\", \"\")"
  },
  {
    question: "How do you collapse multiple consecutive spaces, tabs, and line breaks into a single clean space in 1 formula?",
    shortAnswer: "=TRIM(REGEXREPLACE(A2, \"\\s+\", \" \"))",
    explanation: "`\\s+` matches one or more whitespace characters and replaces them with a single space, while TRIM cleans boundary spaces.",
    hint: "TRIM(REGEXREPLACE(A2, \"\\s+\", \" \")).",
    level: "basic",
    codeExample: "=TRIM(REGEXREPLACE(\"Swadeep      Banerjee\", \"\\s+\", \" \"))"
  },
  {
    question: "How do you remove all punctuation and special characters except alphanumeric letters and spaces from a comment?",
    shortAnswer: "=REGEXREPLACE(A2, \"[^a-zA-Z0-9\\s]\", \"\")",
    explanation: "Negated character class matches any character that is not a letter, digit, or space.",
    hint: "[^a-zA-Z0-9\\s] replaced with \"\".",
    level: "basic",
    codeExample: "=REGEXREPLACE(\"Invoice #88421 -- Paid (100%)!\", \"[^a-zA-Z0-9\\s]\", \"\")"
  },
  {
    question: "How do you clean an entire 1,000-row column of scraped customer feedback strings in a single dynamic array formula?",
    shortAnswer: "=MAP(A5:A1000, LAMBDA(c, TRIM(REGEXREPLACE(REGEXREPLACE(c, \"<[^>]+>\", \"\"), \"\\s+\", \" \"))))",
    explanation: "MAP applies HTML tag stripping and whitespace normalization to every cell in the column array.",
    hint: "MAP(Range, LAMBDA(c, SanitizationPipeline)).",
    level: "advanced",
    codeExample: "Vectorized 1,000-Row Sanitization Pipeline"
  },
  {
    question: "How do you strip non-printable ASCII control characters (ASCII 0 to 31) from legacy mainframe ERP dumps?",
    shortAnswer: "=REGEXREPLACE(A2, \"[\\x00-\\x1F]\", \"\")",
    explanation: "Hexadecimal range `[\\x00-\\x1F]` matches all ASCII control codes.",
    hint: "[\\x00-\\x1F] replaced with \"\".",
    level: "moderate",
    codeExample: "=REGEXREPLACE(RawMainframeString, \"[\\x00-\\x1F]\", \"\")"
  },
  {
    question: "How do you convert unformatted messy names like `  swadeep   banerjee  ` into standard Proper Case `Swadeep Banerjee`?",
    shortAnswer: "=PROPER(TRIM(REGEXREPLACE(A2, \"\\s+\", \" \")))",
    explanation: "Collapses internal spaces, trims leading/trailing gaps, and capitalizes each word with PROPER.",
    hint: "PROPER(TRIM(REGEXREPLACE(A2, \"\\s+\", \" \"))).",
    level: "basic",
    codeExample: "=PROPER(TRIM(REGEXREPLACE(\"  swadeep   banerjee  \", \"\\s+\", \" \")))"
  },
  {
    question: "How do you build a multi-stage sequential sanitization pipeline using REDUCE and an array of regex rules?",
    shortAnswer: "=REDUCE(A2, {\"<[^>]+>\", \"[^a-zA-Z0-9\\s]\", \"\\s+\"}, LAMBDA(acc, pat, IF(pat=\"\\s+\", TRIM(REGEXREPLACE(acc, pat, \" \")), REGEXREPLACE(acc, pat, \"\"))))",
    explanation: "REDUCE passes text through each sanitization rule sequentially in pure RAM.",
    hint: "REDUCE(rawText, patternRulesArray, LAMBDA(acc, pat, ...)).",
    level: "expert",
    codeExample: "REDUCE Multi-Stage Regex Pipeline"
  },
  {
    question: "How do you strip emojis and non-standard Unicode symbols from social media feedback strings?",
    shortAnswer: "=REGEXREPLACE(A2, \"[^\\x00-\\x7F]\", \"\")",
    explanation: "Removes all characters outside the standard 7-bit ASCII range (0-127), deleting emojis and exotic symbols.",
    hint: "[^\\x00-\\x7F] replaced with \"\".",
    level: "moderate",
    codeExample: "=REGEXREPLACE(\"Great service! 😊👍\", \"[^\\x00-\\x7F]\", \"\") &rarr; \"Great service! \""
  },
  {
    question: "How do you create a named LAMBDA `FX_SANITIZE_TEXT` in Name Manager for company-wide deployment?",
    shortAnswer: "=LAMBDA(rawStr, PROPER(TRIM(REGEXREPLACE(REGEXREPLACE(rawStr, \"<[^>]+>\", \"\"), \"\\s+\", \" \"))))",
    explanation: "Encapsulates HTML stripping, whitespace normalization, and proper casing into a 1-parameter function.",
    hint: "LAMBDA(s, PROPER(TRIM(REGEXREPLACE(...)))).",
    level: "advanced",
    codeExample: "FX_SANITIZE_TEXT = LAMBDA(s, PROPER(TRIM(REGEXREPLACE(REGEXREPLACE(s, \"<[^>]+>\", \"\"), \"\\s+\", \" \"))))"
  },
  {
    question: "How do you strip leading and trailing punctuation while preserving internal commas and periods?",
    shortAnswer: "=REGEXREPLACE(REGEXREPLACE(A2, \"^[^a-zA-Z0-9]+\", \"\"), \"[^a-zA-Z0-9]+$\", \"\")",
    explanation: "Two-step regex strips leading symbols (`^...`) and trailing symbols (`...$`) independently.",
    hint: "Strip ^[^a-zA-Z0-9]+ and [^a-zA-Z0-9]+$.",
    level: "moderate",
    codeExample: "=REGEXREPLACE(REGEXREPLACE(\"...Hello World!!!\", \"^\\W+\", \"\"), \"\\W+$\", \"\")"
  },
  {
    question: "How do you remove HTML entities like `&amp;`, `&lt;`, `&gt;`, `&quot;` from web text?",
    shortAnswer: "=REGEXREPLACE(A2, \"&[a-zA-Z0-9#]+;\", \"\")",
    explanation: "Matches `&` followed by entity name and semicolon `;`.",
    hint: "&[a-zA-Z0-9#]+; replaced with \"\".",
    level: "moderate",
    codeExample: "=REGEXREPLACE(\"Coder &amp; AccoTax\", \"&amp;\", \"&\")"
  },
  {
    question: "How do you sanitize telephone numbers down to 10 pure digits from formats like `+91 (033) 2592-1144`?",
    shortAnswer: "=RIGHT(REGEXREPLACE(A2, \"\\D\", \"\"), 10)",
    explanation: "`\\D` strips all non-digits, and RIGHT(..., 10) takes the core 10-digit mobile number.",
    hint: "RIGHT(REGEXREPLACE(A2, \"\\D\", \"\"), 10).",
    level: "basic",
    codeExample: "=RIGHT(REGEXREPLACE(\"+91 (033) 2592-1144\", \"\\D\", \"\"), 10)"
  },
  {
    question: "How do you remove repetitive duplicate words (e.g. 'the the') from narrative text using regex backreferences?",
    shortAnswer: "=REGEXREPLACE(A2, \"\\b(\\w+)\\s+\\1\\b\", \"$1\", 0, 1)",
    explanation: "Backreference `\\1` matches identical consecutive words bounded by word boundaries.",
    hint: "\\b(\\w+)\\s+\\1\\b replaced with \"$1\".",
    level: "expert",
    codeExample: "=REGEXREPLACE(\"Payment for the the invoice\", \"\\b(\\w+)\\s+\\1\\b\", \"$1\", 0, 1)"
  },
  {
    question: "How do you sanitize a column of product SKUs to ensure all letters are uppercase and symbols are replaced with hyphens?",
    shortAnswer: "=UPPER(REGEXREPLACE(A2, \"[^a-zA-Z0-9]+\", \"-\"))",
    explanation: "Replaces any group of non-alphanumerics with a hyphen and converts all letters to uppercase.",
    hint: "UPPER(REGEXREPLACE(A2, \"[^a-zA-Z0-9]+\", \"-\")).",
    level: "moderate",
    codeExample: "=UPPER(REGEXREPLACE(\"elec / dell _ 88421\", \"[^a-zA-Z0-9]+\", \"-\")) &rarr; \"ELEC-DELL-88421\""
  },
  {
    question: "How do you sanitize financial notes by removing currency prefixes like `Rs. `, `INR `, `₹ ` to leave pure numeric amounts?",
    shortAnswer: "=NUMBERVALUE(REGEXREPLACE(A2, \"[^0-9.]\", \"\"))",
    explanation: "Strips everything except digits and decimal dots, then NUMBERVALUE converts to numeric type.",
    hint: "NUMBERVALUE(REGEXREPLACE(A2, \"[^0-9.]\", \"\")).",
    level: "basic",
    codeExample: "=NUMBERVALUE(REGEXREPLACE(\"Paid Rs. 45,000.50 only\", \"[^0-9.]\", \"\"))"
  },
  {
    question: "What is the speed advantage of an in-memory regex sanitization pipeline over VBA macros?",
    shortAnswer: "Native C++ SIMD execution runs 50x faster, works seamlessly on Excel for Web and Mac, and avoids security macro blocking warnings.",
    explanation: "Zero-macro security compliance and multi-threaded calculations.",
    hint: "50x faster + Web/Mac compatible + Zero Macro warnings.",
    level: "expert",
    codeExample: "Native SIMD RAM Pipeline vs Legacy VBA Macro"
  },
  {
    question: "How do you strip email signatures and disclaimer footers beginning with 'Disclaimer:' or 'Confidentiality Notice:'?",
    shortAnswer: "=TEXTBEFORE(A2, {\"Disclaimer:\", \"Confidentiality Notice:\"}, , 1, 1)",
    explanation: "TEXTBEFORE with match_end = 1 isolates the message body before the legal disclaimer footer.",
    hint: "TEXTBEFORE(A2, {\"Disclaimer:\", \"Confidentiality:\"}, , 1, 1).",
    level: "advanced",
    codeExample: "=TEXTBEFORE(EmailBody, \"Disclaimer:\", , 1, 1)"
  },
  {
    question: "How do you remove HTML `<script>...</script>` and `<style>...</style>` blocks along with their inner code?",
    shortAnswer: "=REGEXREPLACE(A2, \"<(script|style)[^>]*>.*?</\\1>\", \"\", 0, 1)",
    explanation: "Matches the opening tag, lazy wildcard content `.*?`, and closing tag case-insensitively.",
    hint: "<(script|style)[^>]*>.*?</\\1>.",
    level: "expert",
    codeExample: "Embedded Script & Style Stripping Pattern"
  },
  {
    question: "How do you clean an address string by converting multiple commas `,,,` into a single comma and space `, `?",
    shortAnswer: "=REGEXREPLACE(A2, \",+\", \", \")",
    explanation: "Matches one or more consecutive commas and replaces with `, `.",
    hint: ",+ replaced with \", \".",
    level: "basic",
    codeExample: "=REGEXREPLACE(\"10/A,,,Shibtala Road,,Barrackpore\", \",+\", \", \")"
  },
  {
    question: "How do you strip square bracket citation references like `[1]`, `[24]` from Wikipedia or research text?",
    shortAnswer: "=REGEXREPLACE(A2, \"\\[\\d+\\]\", \"\")",
    explanation: "`\\[\\d+\\]` matches escaped brackets enclosing digits and deletes them.",
    hint: "\\[\\d+\\] replaced with \"\".",
    level: "basic",
    codeExample: "=REGEXREPLACE(\"Kolkata is a major financial hub[1][2].\", \"\\[\\d+\\]\", \"\")"
  },
  {
    question: "How do you sanitize customer feedback to mask vulgar or sensitive words with asterisks `****`?",
    shortAnswer: "=REGEXREPLACE(A2, \"\\b(badword1|badword2|badword3)\\b\", \"****\", 0, 1)",
    explanation: "Alternation matches sensitive keywords and replaces with asterisks case-insensitively.",
    hint: "\\b(word1|word2)\\b replaced with \"****\".",
    level: "moderate",
    codeExample: "=REGEXREPLACE(Comment, \"\\b(spam|scam|fraud)\\b\", \"****\", 0, 1)"
  },
  {
    question: "How do you remove trailing file extensions from document titles across an entire column?",
    shortAnswer: "=MAP(A5:A100, LAMBDA(f, REGEXREPLACE(f, \"\\.[a-zA-Z0-9]+$\", \"\")))",
    explanation: "MAP executes regex extension removal across all rows.",
    hint: "MAP(Range, LAMBDA(f, REGEXREPLACE(f, \"\\.[a-zA-Z0-9]+$\", \"\"))).",
    level: "moderate",
    codeExample: "=MAP(A5:A100, LAMBDA(f, REGEXREPLACE(f, \"\\.[a-zA-Z0-9]+$\", \"\")))"
  },
  {
    question: "How do you sanitize a list of URLs by removing `www.` prefixes?",
    shortAnswer: "=REGEXREPLACE(A2, \"^(https?://)?www\\.\", \"$1\")",
    explanation: "Matches `www.` with optional protocol and replaces without the `www.` part.",
    hint: "^(https?://)?www\\. replaced with \"$1\".",
    level: "advanced",
    codeExample: "=REGEXREPLACE(\"https://www.codernaccotax.co.in\", \"^(https?://)?www\\.\", \"$1\")"
  },
  {
    question: "How do you strip Markdown URL syntax `[Anchor Text](http://url)` leaving only the anchor text `Anchor Text`?",
    shortAnswer: "=REGEXREPLACE(A2, \"\\[([^\\]]+)\\]\\([^)]+\\)\", \"$1\")",
    explanation: "Captures anchor text in group 1 and discards the markdown brackets and URL.",
    hint: "\\[([^\\]]+)\\]\\([^)]+\\) replaced with \"$1\".",
    level: "advanced",
    codeExample: "=REGEXREPLACE(\"Visit [Coder & AccoTax](https://codernaccotax.co.in)\", \"\\[([^\\]]+)\\]\\([^)]+\\)\", \"$1\")"
  },
  {
    question: "How do you sanitize postal addresses to ensure standard abbreviations (e.g. `Rd` &rarr; `Road`, `St` &rarr; `Street`)?",
    shortAnswer: "=REDUCE(A2, {\"\\bRd\\b\", \"\\bSt\\b\", \"\\bAve\\b\"}, LAMBDA(acc, pat, REGEXREPLACE(acc, pat, SWITCH(pat, \"\\bRd\\b\", \"Road\", \"\\bSt\\b\", \"Street\", \"Avenue\"), 0, 1)))",
    explanation: "Sequential regex word replacement across address components.",
    hint: "REDUCE with word boundaries and SWITCH replacements.",
    level: "expert",
    codeExample: "Address Standardizer Pipeline"
  },
  {
    question: "How do you clean an array of dates containing mixed `/`, `-`, and `.` separators into uniform `YYYY-MM-DD` format?",
    shortAnswer: "=MAP(DateCol, LAMBDA(d, REGEXREPLACE(d, \"^(\\d{2})[/.-](\\d{2})[/.-](\\d{4})$\", \"$3-$2-$1\")))",
    explanation: "Character class `[/.-]` handles all 3 delimiter variations and reorders with backreferences.",
    hint: "MAP(Dates, LAMBDA(d, REGEXREPLACE(d, \"^(\\d{2})[/.-](\\d{2})[/.-](\\d{4})$\", \"$3-$2-$1\"))).",
    level: "advanced",
    codeExample: "Unified Date Standardization Pipeline"
  },
  {
    question: "How do you verify whether a text string has been fully sanitized with zero remaining HTML tags?",
    shortAnswer: "=NOT(REGEXTEST(A2, \"<[^>]+>\"))",
    explanation: "REGEXTEST confirms zero presence of `<...>` tags, returning TRUE for sanitized text.",
    hint: "=NOT(REGEXTEST(A2, \"<[^>]+>\")).",
    level: "basic",
    codeExample: "=NOT(REGEXTEST(SanitizedText, \"<[^>]+>\"))"
  },
  {
    question: "How do you sanitize text by removing duplicate punctuation like `!!` or `??` and replacing with a single symbol?",
    shortAnswer: "=REGEXREPLACE(A2, \"([!?.])\\1+\", \"$1\")",
    explanation: "Captures punctuation in group 1 and replaces consecutive duplicates with a single instance.",
    hint: "([!?.])\\1+ replaced with \"$1\".",
    level: "advanced",
    codeExample: "=REGEXREPLACE(\"Urgent Notice!!!! Please verify???\", \"([!?.])\\1+\", \"$1\")"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for Automated Data Sanitization pipelines?",
    shortAnswer: "Data sanitization is the prerequisite for flawless business intelligence! Build multi-stage in-memory pipelines using REGEXREPLACE, TRIM, and PROPER inside named LAMBDAs (FX_SANITIZE_TEXT) to strip HTML markup, eliminate non-alphanumeric noise, and collapse irregular whitespace in sub-millisecond compiled SIMD memory with zero VBA macros!",
    explanation: "Pristine data ingestion guarantees that downstream financial calculations, reconciliations, and tax audits run without error!",
    hint: "Multi-Stage Regex Pipeline + Named LAMBDA + Zero Macros = 100% Pristine Data Hygiene!",
    level: "expert",
    codeExample: "Rule: Automated Data Sanitization &rarr; Deploy Multi-Stage Regex Pipelines!"
  }
];

export default questions;
