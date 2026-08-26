// topic7_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 7
// Topic: Extracting prefixes and leading data with TEXTBEFORE (instance numbers, match modes)
// Module: 004_004_modern-text-intelligence-and-regular-expressions
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What is the primary function of TEXTBEFORE in Excel 365?",
    shortAnswer: "To extract the text that occurs before a specified delimiter character or substring.",
    explanation: "Replaces cumbersome legacy combinations like `=LEFT(A1, FIND(delimiter, A1)-1)`.",
    hint: "Extracts substring before a delimiter.",
    level: "basic",
    codeExample: "=TEXTBEFORE(text, delimiter, [instance_num], [match_mode], [match_end], [if_not_found])"
  },
  {
    question: "How do you extract the username portion of an email address before the `@` symbol using TEXTBEFORE?",
    shortAnswer: "=TEXTBEFORE(A2, \"@\")",
    explanation: "Returns all characters from start of text up to the first `@` symbol.",
    hint: "=TEXTBEFORE(A2, \"@\").",
    level: "basic",
    codeExample: "=TEXTBEFORE(\"swadeep.b@corp.in\", \"@\") &rarr; \"swadeep.b\""
  },
  {
    question: "What happens when you pass a negative `instance_num` (e.g. `instance_num = -1`) to TEXTBEFORE?",
    shortAnswer: "It searches from right-to-left and returns the text before the LAST occurrence of the delimiter.",
    explanation: "Negative instance numbers count backwards from the end of the string.",
    hint: "Searches from right-to-left (before last occurrence).",
    level: "moderate",
    codeExample: "=TEXTBEFORE(\"C:\\Reports\\2026\\Audit.xlsx\", \"\\\", -1) &rarr; \"C:\\Reports\\2026\""
  },
  {
    question: "How do you extract everything before the 2nd comma in a list of cities?",
    shortAnswer: "=TEXTBEFORE(A2, \",\", 2)",
    explanation: "Passing `2` as instance_num extracts text preceding the 2nd comma occurrence.",
    hint: "=TEXTBEFORE(A2, \",\", 2).",
    level: "basic",
    codeExample: "=TEXTBEFORE(\"Barrackpore,Shyamnagar,Ichapur,Naihati\", \",\", 2) &rarr; \"Barrackpore,Shyamnagar\""
  },
  {
    question: "How do you extract the protocol (e.g. `https`) from a URL using TEXTBEFORE?",
    shortAnswer: "=TEXTBEFORE(A2, \"://\")",
    explanation: "Extracts all characters before the `://` delimiter.",
    hint: "=TEXTBEFORE(A2, \"://\").",
    level: "basic",
    codeExample: "=TEXTBEFORE(\"https://codernaccotax.co.in\", \"://\") &rarr; \"https\""
  },
  {
    question: "What does TEXTBEFORE return if the specified delimiter is not found and `if_not_found` is not provided?",
    shortAnswer: "#N/A error.",
    explanation: "Standard Excel non-match error.",
    hint: "#N/A error on missing delimiter.",
    level: "basic",
    codeExample: "#N/A"
  },
  {
    question: "How do you provide a custom fallback string (e.g. 'No Delimiter') if the delimiter is missing?",
    shortAnswer: "Pass the fallback string as the 6th argument: `=TEXTBEFORE(A2, \"-\", , , , \"No Delimiter\")`.",
    explanation: "The `if_not_found` parameter intercepts #N/A cleanly without needing IFNA.",
    hint: "Use the 6th argument if_not_found.",
    level: "moderate",
    codeExample: "=TEXTBEFORE(A2, \"-\", , , , \"No Delimiter\")"
  },
  {
    question: "What does the `match_end` argument do in TEXTBEFORE?",
    shortAnswer: "When set to 1 (TRUE), it treats the end of the text string as a delimiter, returning the entire string if the delimiter is not found.",
    explanation: "Prevents #N/A errors by treating string termination as a match point.",
    hint: "1 treats end of string as delimiter.",
    level: "advanced",
    codeExample: "=TEXTBEFORE(A2, \"-\", , , 1)"
  },
  {
    question: "How do you make the delimiter search case-insensitive in TEXTBEFORE?",
    shortAnswer: "Set `match_mode = 1` in the 4th argument: `=TEXTBEFORE(A2, \"inv-\", , 1)`.",
    explanation: "Case-insensitive delimiter matching.",
    hint: "Pass 1 for match_mode.",
    level: "basic",
    codeExample: "=TEXTBEFORE(\"INV-88421\", \"88421\", , 1)"
  },
  {
    question: "How do you extract the directory folder path from a full file path string `C:\\Users\\Admin\\Report.xlsx`?",
    shortAnswer: "=TEXTBEFORE(A2, \"\\\", -1)",
    explanation: "Extracts all text before the last backslash in the file path.",
    hint: "=TEXTBEFORE(A2, \"\\\", -1).",
    level: "moderate",
    codeExample: "=TEXTBEFORE(\"C:\\Users\\Admin\\Report.xlsx\", \"\\\", -1) &rarr; \"C:\\Users\\Admin\""
  },
  {
    question: "Can you pass multiple possible delimiters to TEXTBEFORE as an array constant?",
    shortAnswer: "Yes, passing an array like `=TEXTBEFORE(A2, {\"-\", \":\", \"/\"})` matches whichever delimiter appears first.",
    explanation: "Array constants allow flexible multi-delimiter matching.",
    hint: "Array constant: {\"-\", \":\", \"/\"}.",
    level: "moderate",
    codeExample: "=TEXTBEFORE(A2, {\"-\", \":\", \"/\"})"
  },
  {
    question: "How do you extract the first name from a full name `Swadeep Banerjee` using TEXTBEFORE?",
    shortAnswer: "=TEXTBEFORE(A2, \" \")",
    explanation: "Extracts all characters before the first space.",
    hint: "=TEXTBEFORE(A2, \" \").",
    level: "basic",
    codeExample: "=TEXTBEFORE(\"Swadeep Banerjee\", \" \") &rarr; \"Swadeep\""
  },
  {
    question: "How do you extract the first two words from a 5-word sentence?",
    shortAnswer: "=TEXTBEFORE(A2, \" \", 2)",
    explanation: "Extracts all text preceding the 2nd space character.",
    hint: "=TEXTBEFORE(A2, \" \", 2).",
    level: "basic",
    codeExample: "=TEXTBEFORE(\"Welcome to Coder and AccoTax\", \" \", 2) &rarr; \"Welcome to\""
  },
  {
    question: "Can TEXTBEFORE operate dynamically on an entire column range (e.g. `A5:A100`)?",
    shortAnswer: "Yes, passing a range like `=TEXTBEFORE(A5:A100, \"@\")` spills a vertical column vector of usernames.",
    explanation: "Fully vectorized dynamic array support.",
    hint: "Spills column array when passed a column range.",
    level: "moderate",
    codeExample: "=TEXTBEFORE(A5:A100, \"@\")"
  },
  {
    question: "How do you extract text before a parenthetical remark (e.g. `Laptop (16GB RAM)` &rarr; `Laptop`)?",
    shortAnswer: "=TRIM(TEXTBEFORE(A2, \"(\"))",
    explanation: "Extracts text before `(` and trims trailing whitespace.",
    hint: "TRIM(TEXTBEFORE(A2, \"(\")).",
    level: "basic",
    codeExample: "=TRIM(TEXTBEFORE(\"Laptop (16GB RAM)\", \"(\")) &rarr; \"Laptop\""
  },
  {
    question: "What is the speed advantage of TEXTBEFORE over legacy `=LEFT(A1, FIND(\"@\", A1)-1)`?",
    shortAnswer: "TEXTBEFORE is 5x faster in compiled RAM, avoids nested formula syntax, handles missing delimiters gracefully with built-in parameters, and supports dynamic array spilling.",
    explanation: "Modern native C++ implementation vs nested formula arithmetic.",
    hint: "Modern clean syntax + 5x faster C++ RAM execution.",
    level: "expert",
    codeExample: "Clean TEXTBEFORE vs Nested LEFT/FIND"
  },
  {
    question: "How do you extract everything before the last hyphen in a complex serial number `BKP-2026-HQ-88421`?",
    shortAnswer: "=TEXTBEFORE(A2, \"-\", -1)",
    explanation: "Using negative instance `-1` extracts everything before the final hyphen.",
    hint: "=TEXTBEFORE(A2, \"-\", -1).",
    level: "moderate",
    codeExample: "=TEXTBEFORE(\"BKP-2026-HQ-88421\", \"-\", -1) &rarr; \"BKP-2026-HQ\""
  },
  {
    question: "How do you extract the integer dollar amount before the decimal point in a currency string `45000.50`?",
    shortAnswer: "=TEXTBEFORE(A2, \".\")",
    explanation: "Extracts all characters before the decimal dot.",
    hint: "=TEXTBEFORE(A2, \".\").",
    level: "basic",
    codeExample: "=TEXTBEFORE(\"45000.50\", \".\") &rarr; \"45000\""
  },
  {
    question: "How do you extract the text before a line break (Alt+Enter) in a multi-line cell?",
    shortAnswer: "=TEXTBEFORE(A2, CHAR(10))",
    explanation: "CHAR(10) is the Windows newline character.",
    hint: "=TEXTBEFORE(A2, CHAR(10)).",
    level: "moderate",
    codeExample: "=TEXTBEFORE(MultiLineCell, CHAR(10))"
  },
  {
    question: "How do you create a named LAMBDA `FX_FIRST_NAME` using TEXTBEFORE with automatic fallback for single-word names?",
    shortAnswer: "=LAMBDA(fullName, TEXTBEFORE(fullName, \" \", , , 1))",
    explanation: "Using `match_end = 1` returns the full name if no space is found (single-word name).",
    hint: "LAMBDA(n, TEXTBEFORE(n, \" \", , , 1)).",
    level: "advanced",
    codeExample: "FX_FIRST_NAME = LAMBDA(n, TEXTBEFORE(n, \" \", , , 1))"
  },
  {
    question: "What is the difference between `instance_num = 1` and `instance_num = -1` in TEXTBEFORE?",
    shortAnswer: "`instance_num = 1` extracts text before the FIRST occurrence; `instance_num = -1` extracts text before the LAST occurrence.",
    explanation: "Positive counts left-to-right; negative counts right-to-left.",
    hint: "1: before first; -1: before last.",
    level: "basic",
    codeExample: "1 (First Instance) vs -1 (Last Instance)"
  },
  {
    question: "How do you extract the product category from an SKU code `ELEC/LAP/DELL-88421`?",
    shortAnswer: "=TEXTBEFORE(A2, \"/\")",
    explanation: "Extracts characters before the first slash `ELEC`.",
    hint: "=TEXTBEFORE(A2, \"/\").",
    level: "basic",
    codeExample: "=TEXTBEFORE(\"ELEC/LAP/DELL-88421\", \"/\") &rarr; \"ELEC\""
  },
  {
    question: "How do you extract the category and subcategory together from `ELEC/LAP/DELL-88421`?",
    shortAnswer: "=TEXTBEFORE(A2, \"/\", 2)",
    explanation: "Extracts all characters before the 2nd slash `ELEC/LAP`.",
    hint: "=TEXTBEFORE(A2, \"/\", 2).",
    level: "moderate",
    codeExample: "=TEXTBEFORE(\"ELEC/LAP/DELL-88421\", \"/\", 2) &rarr; \"ELEC/LAP\""
  },
  {
    question: "How do you extract text before a date tag in a transaction narration `Payment Received on 12-04-2026 ref 99`?",
    shortAnswer: "=TEXTBEFORE(A2, \" on \")",
    explanation: "Extracts all text before the word ' on '.",
    hint: "=TEXTBEFORE(A2, \" on \").",
    level: "basic",
    codeExample: "=TEXTBEFORE(\"Payment Received on 12-04-2026\", \" on \") &rarr; \"Payment Received\""
  },
  {
    question: "How do you safely convert extracted numeric text strings from TEXTBEFORE into real numbers?",
    shortAnswer: "=NUMBERVALUE(TEXTBEFORE(A2, delimiter))",
    explanation: "NUMBERVALUE coerces text digits into Excel numeric floating-point values.",
    hint: "Wrap in NUMBERVALUE().",
    level: "basic",
    codeExample: "=NUMBERVALUE(TEXTBEFORE(\"15000-INR\", \"-\"))"
  },
  {
    question: "How do you extract everything before the query string `?` in a URL `https://site.com/search?q=excel`?",
    shortAnswer: "=TEXTBEFORE(A2, \"?\", , , 1)",
    explanation: "Setting match_end = 1 ensures that URLs without query strings return the full URL without error.",
    hint: "=TEXTBEFORE(A2, \"?\", , , 1).",
    level: "moderate",
    codeExample: "=TEXTBEFORE(\"https://site.com/page?id=1\", \"?\", , , 1)"
  },
  {
    question: "How do you extract text before either a comma or a semicolon, whichever occurs first?",
    shortAnswer: "=TEXTBEFORE(A2, {\",\", \";\"})",
    explanation: "Array constant tests both delimiters and splits at the earliest occurrence.",
    hint: "=TEXTBEFORE(A2, {\",\", \";\"}).",
    level: "moderate",
    codeExample: "=TEXTBEFORE(A2, {\",\", \";\"})"
  },
  {
    question: "How do you extract the house number from an address `10/A, Shibtala Road, Barrackpore`?",
    shortAnswer: "=TEXTBEFORE(A2, \",\")",
    explanation: "Extracts text before the first comma `10/A`.",
    hint: "=TEXTBEFORE(A2, \",\").",
    level: "basic",
    codeExample: "=TEXTBEFORE(\"10/A, Shibtala Road, Barrackpore\", \",\") &rarr; \"10/A\""
  },
  {
    question: "How do you extract the company name before the legal suffix `(P) Ltd` or `Private Limited`?",
    shortAnswer: "=TRIM(TEXTBEFORE(A2, {\"(P) Ltd\", \"Private Limited\", \"Ltd\"}, , 1))",
    explanation: "Array constant matches common corporate entity suffixes case-insensitively.",
    hint: "Array constant of suffixes + TRIM.",
    level: "advanced",
    codeExample: "=TRIM(TEXTBEFORE(\"Coder and AccoTax (P) Ltd\", \"(P) Ltd\"))"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for prefix text extraction with TEXTBEFORE?",
    shortAnswer: "Discard legacy LEFT/FIND formula nesting! Use TEXTBEFORE with negative instance numbers (-1) to extract directory paths before the last backslash, leverage match_end = 1 to handle missing delimiters gracefully, and pass array constants ({...}) for robust multi-delimiter prefix parsing across enterprise models!",
    explanation: "TEXTBEFORE provides surgical leading text extraction with zero formula clutter!",
    hint: "TEXTBEFORE + Negative Instance (-1) + match_end = 1 + Array Delimiters = Clean Extraction!",
    level: "expert",
    codeExample: "Rule: Leading Text Extraction &rarr; Deploy TEXTBEFORE!"
  }
];

export default questions;
