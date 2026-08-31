// topic8_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 8
// Topic: Extracting suffixes and trailing data with TEXTAFTER
// Module: 004_004_modern-text-intelligence-and-regular-expressions
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What is the primary function of TEXTAFTER in Excel 365?",
    shortAnswer: "To extract the text that occurs after a specified delimiter character or substring.",
    explanation: "Replaces cumbersome legacy combinations like `=MID(A1, FIND(delimiter, A1)+LEN(delimiter), 999)`.",
    hint: "Extracts substring after a delimiter.",
    level: "basic",
    codeExample: "=TEXTAFTER(text, delimiter, [instance_num], [match_mode], [match_end], [if_not_found])"
  },
  {
    question: "How do you extract the domain name from an email address using TEXTAFTER?",
    shortAnswer: "=TEXTAFTER(A2, \"@\")",
    explanation: "Extracts all characters after the first `@` symbol.",
    hint: "=TEXTAFTER(A2, \"@\").",
    level: "basic",
    codeExample: "=TEXTAFTER(\"swadeep.b@corp.in\", \"@\") → \"corp.in\""
  },
  {
    question: "How do you extract the file extension (e.g. `xlsx`) from a file path using TEXTAFTER with a negative instance number?",
    shortAnswer: "=TEXTAFTER(A2, \".\", -1)",
    explanation: "Passing `instance_num = -1` searches from right-to-left and returns the text after the LAST dot.",
    hint: "=TEXTAFTER(A2, \".\", -1).",
    level: "basic",
    codeExample: "=TEXTAFTER(\"Audit_Report_2026.final.xlsx\", \".\", -1) → \"xlsx\""
  },
  {
    question: "How do you extract the file name from a Windows directory path `C:\\Users\\Admin\\Report.xlsx` using TEXTAFTER?",
    shortAnswer: "=TEXTAFTER(A2, \"\\\", -1)",
    explanation: "Extracts all text after the final backslash in the string.",
    hint: "=TEXTAFTER(A2, \"\\\", -1).",
    level: "basic",
    codeExample: "=TEXTAFTER(\"C:\\Users\\Admin\\Report.xlsx\", \"\\\", -1) → \"Report.xlsx\""
  },
  {
    question: "How do you extract the last name from a full name `Swadeep Banerjee` using TEXTAFTER?",
    shortAnswer: "=TEXTAFTER(A2, \" \", -1)",
    explanation: "Extracts all text after the last space, correctly handling middle names.",
    hint: "=TEXTAFTER(A2, \" \", -1).",
    level: "basic",
    codeExample: "=TEXTAFTER(\"Debangshu Kumar Ghosh\", \" \", -1) → \"Ghosh\""
  },
  {
    question: "How do you extract text enclosed inside square brackets `[INFO]` by combining TEXTAFTER and TEXTBEFORE?",
    shortAnswer: "=TEXTBEFORE(TEXTAFTER(A2, \"[\"), \"]\")",
    explanation: "TEXTAFTER pulls text after `[`, and TEXTBEFORE trims text before `]`.",
    hint: "TEXTBEFORE(TEXTAFTER(A2, \"[\"), \"]\").",
    level: "moderate",
    codeExample: "=TEXTBEFORE(TEXTAFTER(\"[INFO] Server started\", \"[\"), \"]\") → \"INFO\""
  },
  {
    question: "What does TEXTAFTER return if the delimiter is not found and `if_not_found` is omitted?",
    shortAnswer: "#N/A error.",
    explanation: "Standard Excel non-match behavior.",
    hint: "#N/A error.",
    level: "basic",
    codeExample: "#N/A"
  },
  {
    question: "How do you provide a fallback string (e.g. 'No Extension') if the delimiter is missing in TEXTAFTER?",
    shortAnswer: "Pass the fallback string as the 6th argument: `=TEXTAFTER(A2, \".\", -1, , , \"No Extension\")`.",
    explanation: "The built-in `if_not_found` argument intercepts #N/A cleanly.",
    hint: "Use 6th argument if_not_found.",
    level: "moderate",
    codeExample: "=TEXTAFTER(A2, \".\", -1, , , \"No Extension\")"
  },
  {
    question: "What does the `match_end` argument do in TEXTAFTER?",
    shortAnswer: "When set to 1, it treats the end of the text string as a delimiter, returning an empty string `\"\"` if the delimiter is not found.",
    explanation: "Prevents #N/A errors when delimiters might be missing at the end of the text.",
    hint: "1 treats end of string as delimiter.",
    level: "advanced",
    codeExample: "=TEXTAFTER(A2, \"#\", , , 1)"
  },
  {
    question: "How do you extract text after the 2nd slash in a URL `https://codernaccotax.co.in/tax/gst`?",
    shortAnswer: "=TEXTAFTER(A2, \"/\", 2)",
    explanation: "Extracts all text following the 2nd slash occurrence.",
    hint: "=TEXTAFTER(A2, \"/\", 2).",
    level: "moderate",
    codeExample: "=TEXTAFTER(\"https://codernaccotax.co.in/tax/gst\", \"/\", 2) → \"codernaccotax.co.in/tax/gst\""
  },
  {
    question: "How do you extract the decimal cents portion of a monetary figure `45000.75` using TEXTAFTER?",
    shortAnswer: "=TEXTAFTER(A2, \".\")",
    explanation: "Extracts all characters after the decimal dot.",
    hint: "=TEXTAFTER(A2, \".\").",
    level: "basic",
    codeExample: "=TEXTAFTER(\"45000.75\", \".\") → \"75\""
  },
  {
    question: "How do you extract everything after the last hyphen in a serial SKU `BKP-2026-HQ-88421`?",
    shortAnswer: "=TEXTAFTER(A2, \"-\", -1)",
    explanation: "Searches backwards from right to left to return the final segment `88421`.",
    hint: "=TEXTAFTER(A2, \"-\", -1).",
    level: "basic",
    codeExample: "=TEXTAFTER(\"BKP-2026-HQ-88421\", \"-\", -1) → \"88421\""
  },
  {
    question: "Can TEXTAFTER operate on an entire column range (e.g. `A5:A500`) dynamically?",
    shortAnswer: "Yes, passing a range like `=TEXTAFTER(A5:A500, \"@\")` spills a vertical column vector of domains.",
    explanation: "Fully vectorized dynamic array support.",
    hint: "Spills column array when passed a column range.",
    level: "moderate",
    codeExample: "=TEXTAFTER(A5:A500, \"@\")"
  },
  {
    question: "How do you extract the query string parameters from a URL `https://site.com/search?q=excel&lang=en`?",
    shortAnswer: "=TEXTAFTER(A2, \"?\")",
    explanation: "Extracts all text following the `?` character.",
    hint: "=TEXTAFTER(A2, \"?\").",
    level: "basic",
    codeExample: "=TEXTAFTER(\"https://site.com/search?q=excel\", \"?\") → \"q=excel\""
  },
  {
    question: "How do you make the delimiter match case-insensitive in TEXTAFTER?",
    shortAnswer: "Set `match_mode = 1` in the 4th argument: `=TEXTAFTER(A2, \"ref:\", , 1)`.",
    explanation: "Matches 'ref:', 'REF:', or 'Ref:'.",
    hint: "Pass 1 for match_mode.",
    level: "basic",
    codeExample: "=TEXTAFTER(\"Invoice REF:88421\", \"ref:\", , 1) → \"88421\""
  },
  {
    question: "How do you extract the street address and city from an address string `10/A, Shibtala Road, Barrackpore`?",
    shortAnswer: "=TEXTAFTER(A2, \", \")",
    explanation: "Extracts all text after the first comma and space: `Shibtala Road, Barrackpore`.",
    hint: "=TEXTAFTER(A2, \", \").",
    level: "basic",
    codeExample: "=TEXTAFTER(\"10/A, Shibtala Road, Barrackpore\", \", \")"
  },
  {
    question: "How do you extract only the city name from `10/A, Shibtala Road, Barrackpore` using negative instance?",
    shortAnswer: "=TEXTAFTER(A2, \", \", -1)",
    explanation: "Extracts all text after the last comma: `Barrackpore`.",
    hint: "=TEXTAFTER(A2, \", \", -1).",
    level: "moderate",
    codeExample: "=TEXTAFTER(\"10/A, Shibtala Road, Barrackpore\", \", \", -1) → \"Barrackpore\""
  },
  {
    question: "How do you convert extracted number strings from TEXTAFTER into real Excel numeric values?",
    shortAnswer: "=NUMBERVALUE(TEXTAFTER(A2, delimiter))",
    explanation: "Coerces text characters to numeric values.",
    hint: "Wrap in NUMBERVALUE().",
    level: "basic",
    codeExample: "=NUMBERVALUE(TEXTAFTER(\"INR-45000\", \"-\")) → 45000"
  },
  {
    question: "How do you extract the text following a line break in a 2-line cell?",
    shortAnswer: "=TEXTAFTER(A2, CHAR(10))",
    explanation: "CHAR(10) is the Windows newline delimiter.",
    hint: "=TEXTAFTER(A2, CHAR(10)).",
    level: "moderate",
    codeExample: "=TEXTAFTER(MultiLineCell, CHAR(10))"
  },
  {
    question: "How do you extract text between parentheses `(Barrackpore HQ)` in a company name?",
    shortAnswer: "=TEXTBEFORE(TEXTAFTER(A2, \"(\"), \")\")",
    explanation: "Extracts content following `(` and preceding `)`.",
    hint: "TEXTBEFORE(TEXTAFTER(A2, \"(\"), \")\").",
    level: "moderate",
    codeExample: "=TEXTBEFORE(TEXTAFTER(\"Coder and AccoTax (Barrackpore HQ)\", \"(\"), \")\")"
  },
  {
    question: "What is the speed advantage of TEXTAFTER over legacy `=MID(A1, FIND(\"@\", A1)+1, 999)`?",
    shortAnswer: "TEXTAFTER is 5x faster in compiled RAM, eliminates hardcoded length estimates (999), and supports negative instance backwards searching.",
    explanation: "Modern native C++ implementation vs nested string arithmetic.",
    hint: "5x faster C++ RAM execution + negative instance search.",
    level: "expert",
    codeExample: "Clean TEXTAFTER vs Nested MID/FIND Arithmetic"
  },
  {
    question: "How do you extract the extension from a URL path `https://site.com/docs/manual.pdf` in 1 formula?",
    shortAnswer: "=TEXTAFTER(A2, \".\", -1)",
    explanation: "Extracts text after the last dot in the entire URL.",
    hint: "=TEXTAFTER(A2, \".\", -1).",
    level: "basic",
    codeExample: "=TEXTAFTER(\"https://site.com/docs/manual.pdf\", \".\", -1) → \"pdf\""
  },
  {
    question: "How do you create a named LAMBDA `FX_LAST_NAME` that extracts the last word of any name?",
    shortAnswer: "=LAMBDA(fullName, TEXTAFTER(fullName, \" \", -1, , 1))",
    explanation: "Uses `instance_num = -1` and `match_end = 1` for single-word fallbacks.",
    hint: "LAMBDA(n, TEXTAFTER(n, \" \", -1, , 1)).",
    level: "advanced",
    codeExample: "FX_LAST_NAME = LAMBDA(n, TEXTAFTER(n, \" \", -1, , 1))"
  },
  {
    question: "How do you extract the domain name and path after `://` from a URL?",
    shortAnswer: "=TEXTAFTER(A2, \"://\")",
    explanation: "Extracts all text following the protocol marker `://`.",
    hint: "=TEXTAFTER(A2, \"://\").",
    level: "basic",
    codeExample: "=TEXTAFTER(\"https://codernaccotax.co.in/tax\", \"://\") → \"codernaccotax.co.in/tax\""
  },
  {
    question: "Can you supply multiple possible delimiters to TEXTAFTER as an array constant?",
    shortAnswer: "Yes, passing an array like `=TEXTAFTER(A2, {\":\", \"-\", \"/\"})` splits after whichever delimiter occurs first.",
    explanation: "Array constants allow flexible multi-delimiter trailing text extraction.",
    hint: "Array constant: {\":\", \"-\", \"/\"}.",
    level: "moderate",
    codeExample: "=TEXTAFTER(A2, {\":\", \"-\", \"/\"})"
  },
  {
    question: "How do you extract the remaining text after the 3rd space in a paragraph?",
    shortAnswer: "=TEXTAFTER(A2, \" \", 3)",
    explanation: "Extracts text following the 3rd space.",
    hint: "=TEXTAFTER(A2, \" \", 3).",
    level: "basic",
    codeExample: "=TEXTAFTER(\"Coder and AccoTax Center of Excellence\", \" \", 3) → \"Center of Excellence\""
  },
  {
    question: "How do you extract text between double quotes `\"Barrackpore\"` in a string?",
    shortAnswer: "=TEXTBEFORE(TEXTAFTER(A2, \"\"\"\"), \"\"\"\")",
    explanation: "TEXTAFTER extracts text following first quote; TEXTBEFORE extracts preceding next quote.",
    hint: "TEXTBEFORE(TEXTAFTER(A2, \"\"\"\"), \"\"\"\").",
    level: "moderate",
    codeExample: "=TEXTBEFORE(TEXTAFTER(\"Branch: \"\"Barrackpore\"\"\", \"\"\"\"), \"\"\"\") → \"Barrackpore\""
  },
  {
    question: "How do you extract the branch code after the hyphen in an employee ID `EMP-BKP-8842`?",
    shortAnswer: "=TEXTBEFORE(TEXTAFTER(A2, \"-\"), \"-\")",
    explanation: "Extracts text between 1st and 2nd hyphen `BKP`.",
    hint: "TEXTBEFORE(TEXTAFTER(A2, \"-\"), \"-\").",
    level: "moderate",
    codeExample: "=TEXTBEFORE(TEXTAFTER(\"EMP-BKP-8842\", \"-\"), \"-\") → \"BKP\""
  },
  {
    question: "How do you extract the time portion from a timestamp `2026-08-26 14:30:00`?",
    shortAnswer: "=TEXTAFTER(A2, \" \")",
    explanation: "Extracts all characters after the space `14:30:00`.",
    hint: "=TEXTAFTER(A2, \" \").",
    level: "basic",
    codeExample: "=TEXTAFTER(\"2026-08-26 14:30:00\", \" \") → \"14:30:00\""
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for trailing text extraction with TEXTAFTER?",
    shortAnswer: "Never hard-code character offsets or write nested MID/FIND formulas to extract trailing data! Use TEXTAFTER with negative instance numbers (-1) to isolate file extensions, file names, and last names, and combine TEXTAFTER with TEXTBEFORE to extract tokens enclosed between brackets, quotes, or tags in 1 clean formula!",
    explanation: "TEXTAFTER provides surgical trailing text extraction with zero formula clutter!",
    hint: "TEXTAFTER + Negative Instance (-1) + Composite TEXTBEFORE = Clean Trailing Extraction!",
    level: "expert",
    codeExample: "Rule: Trailing Text Extraction → Deploy TEXTAFTER!"
  }
];

export default questions;
