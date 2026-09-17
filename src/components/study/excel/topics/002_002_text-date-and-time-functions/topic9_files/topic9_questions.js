// Topic 9 Questions
const topic9Questions = [
  {
    "id": "t9_q1",
    "question": "What is the fundamental difference between REPLACE and SUBSTITUTE in Excel?",
    "shortAnswer": "REPLACE operates based on character position and length, whereas SUBSTITUTE operates based on matching specific text content.",
    "explanation": "REPLACE modifies a string at a known starting position for a specific character length. SUBSTITUTE searches for specific substring occurrences and replaces them with new text regardless of their exact numerical position.",
    "hint": "Think positional vs. textual matching.",
    "level": "Basic",
    "codeExample": "=REPLACE(\"A1234\", 2, 4, \"9999\")   // -> A9999 (positional)\n=SUBSTITUTE(\"apple pie\", \"apple\", \"pecan\") // -> pecan pie (textual)"
  },
  {
    "id": "t9_q2",
    "question": "What are the required and optional arguments of the SUBSTITUTE function?",
    "shortAnswer": "SUBSTITUTE(text, old_text, new_text, [instance_num]) where instance_num is optional.",
    "explanation": "If instance_num is omitted, SUBSTITUTE replaces every occurrence of old_text. If instance_num is specified as an integer n, only the n-th occurrence of old_text is replaced.",
    "hint": "Check the 4th argument behavior.",
    "level": "Basic",
    "codeExample": "=SUBSTITUTE(\"2026-05-12\", \"-\", \"/\")     // -> 2026/05/12 (all)\n=SUBSTITUTE(\"2026-05-12\", \"-\", \"/\", 1)  // -> 2026/05-12 (1st only)"
  },
  {
    "id": "t9_q3",
    "question": "What are the syntax arguments for the REPLACE function?",
    "shortAnswer": "REPLACE(old_text, start_num, num_chars, new_text).",
    "explanation": "All four arguments are required. start_num is the 1-based character position where replacement starts, num_chars is how many characters to remove, and new_text is the string to insert.",
    "hint": "Four mandatory arguments: text, start, count, replacement.",
    "level": "Basic",
    "codeExample": "=REPLACE(\"SKU-1029-US\", 5, 4, \"8842\") // Result: \"SKU-8842-US\""
  },
  {
    "id": "t9_q4",
    "question": "Is the SUBSTITUTE function case-sensitive?",
    "shortAnswer": "Yes, SUBSTITUTE is strictly case-sensitive.",
    "explanation": "SUBSTITUTE will only match exact uppercase and lowercase characters. Searching for \"excel\" will not match \"Excel\" or \"EXCEL\".",
    "hint": "Does it distinguish capital letters?",
    "level": "Basic",
    "codeExample": "=SUBSTITUTE(\"Excel Training\", \"excel\", \"Word\") // Unchanged: \"Excel Training\"\n=SUBSTITUTE(\"Excel Training\", \"Excel\", \"Word\") // Result: \"Word Training\""
  },
  {
    "id": "t9_q5",
    "question": "How can you perform a case-insensitive substitution in Excel using standard formulas?",
    "shortAnswer": "Combine REPLACE with SEARCH to locate the case-insensitive starting position and replace by length.",
    "explanation": "Because SEARCH is case-insensitive, SEARCH(\"text\", A1) returns the start position regardless of casing. Passing this start position and LEN(\"text\") into REPLACE executes a case-insensitive replacement.",
    "hint": "Use SEARCH inside REPLACE.",
    "level": "Intermediate",
    "codeExample": "=REPLACE(A1, SEARCH(\"target\", A1), LEN(\"target\"), \"replacement\")"
  },
  {
    "id": "t9_q6",
    "question": "How do you delete or remove all occurrences of a specific character (e.g., hyphens) using SUBSTITUTE?",
    "shortAnswer": "Set new_text to an empty string \"\".",
    "explanation": "Supplying \"\" as new_text instructs Excel to delete matched old_text instances without inserting any characters.",
    "hint": "Use empty quotes \"\" as new_text.",
    "level": "Basic",
    "codeExample": "=SUBSTITUTE(\"987-654-3210\", \"-\", \"\") // Result: \"9876543210\""
  },
  {
    "id": "t9_q7",
    "question": "How can you insert new text at a specific position without removing any existing characters using REPLACE?",
    "shortAnswer": "Set num_chars to 0 in the REPLACE function.",
    "explanation": "When num_chars is 0, REPLACE does not delete any characters; it simply inserts new_text immediately before start_num.",
    "hint": "Specify 0 characters to remove.",
    "level": "Intermediate",
    "codeExample": "=REPLACE(\"12345678\", 5, 0, \"-\") // Result: \"1234-5678\""
  },
  {
    "id": "t9_q8",
    "question": "How do you replace only the second instance of a comma in a text string?",
    "shortAnswer": "Provide 2 as the 4th argument (instance_num) of SUBSTITUTE.",
    "explanation": "Setting instance_num to 2 targets only the second comma, leaving the first, third, and any subsequent commas intact.",
    "hint": "Use instance_num = 2.",
    "level": "Intermediate",
    "codeExample": "=SUBSTITUTE(\"apples, oranges, bananas, grapes\", \",\", \";\", 2)\n// Result: \"apples, oranges; bananas, grapes\""
  },
  {
    "id": "t9_q9",
    "question": "How can you replace the LAST occurrence of a character when the total count of occurrences varies?",
    "shortAnswer": "Compute total occurrences using LEN(A1)-LEN(SUBSTITUTE(A1,delim,\"\")) and use that count as instance_num.",
    "explanation": "By calculating the exact frequency of the delimiter in the string, you feed that count dynamically into the 4th argument of SUBSTITUTE to alter only the final delimiter.",
    "hint": "Count character occurrences using LEN differences.",
    "level": "Advanced",
    "codeExample": "=SUBSTITUTE(A1, \"/\", \"-\", LEN(A1) - LEN(SUBSTITUTE(A1, \"/\", \"\")))"
  },
  {
    "id": "t9_q10",
    "question": "How can multiple nested SUBSTITUTE functions be written to clean multiple dirty characters?",
    "shortAnswer": "Nest SUBSTITUTE calls where each outer SUBSTITUTE wraps the result of the previous one.",
    "explanation": "To strip characters like parentheses, spaces, and hyphens from phone numbers, chaining nested SUBSTITUTE functions cleans them step-by-step.",
    "hint": "Wrap SUBSTITUTE inside SUBSTITUTE.",
    "level": "Intermediate",
    "codeExample": "=SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(A1, \"(\", \"\"), \")\", \"\"), \"-\", \"\")"
  },
  {
    "id": "t9_q11",
    "question": "How does Excel 365's REDUCE with LAMBDA simplify multi-character substitutions?",
    "shortAnswer": "REDUCE iterates over an array of unwanted characters, replacing each one sequentially without ugly nesting.",
    "explanation": "REDUCE takes an initial string and an array of characters like {\"(\",\")\",\"-\",\" \"}, applying SUBSTITUTE in a clean loop.",
    "hint": "Modern Excel lambda helper function REDUCE.",
    "level": "Advanced",
    "codeExample": "=REDUCE(A1, {\"(\", \")\", \"-\", \" \"}, LAMBDA(text, char, SUBSTITUTE(text, char, \"\")))"
  },
  {
    "id": "t9_q12",
    "question": "What is the difference between REPLACE and REPLACEB in Excel?",
    "shortAnswer": "REPLACE counts each character as 1, while REPLACEB counts double-byte DBCS characters (like Japanese/Chinese) as 2 bytes.",
    "explanation": "REPLACE operates on character positions (1 char = 1 unit), while REPLACEB counts bytes based on DBCS encoding.",
    "hint": "Byte-based vs character-based counting for Asian fonts.",
    "level": "Advanced",
    "codeExample": "=REPLACEB(A1, start_byte, num_bytes, new_text)"
  },
  {
    "id": "t9_q13",
    "question": "How can you mask a credit card or SSN showing only the last 4 digits using REPLACE?",
    "shortAnswer": "Use REPLACE to overwrite characters 1 through LEN(A1)-4 with repeating asterisks.",
    "explanation": "REPLACE(A1, 1, LEN(A1)-4, REPT(\"*\", LEN(A1)-4)) masks all characters except the last four regardless of length.",
    "hint": "Combine REPLACE with REPT.",
    "level": "Intermediate",
    "codeExample": "=REPLACE(A1, 1, LEN(A1)-4, REPT(\"*\", LEN(A1)-4))\n// \"1234567890123456\" -> \"************3456\""
  },
  {
    "id": "t9_q14",
    "question": "What happens if start_num in REPLACE exceeds the total length of old_text?",
    "shortAnswer": "REPLACE appends new_text to the end of old_text without generating an error.",
    "explanation": "If start_num is greater than LEN(old_text), Excel places new_text directly at the end of old_text.",
    "hint": "Does it error or append?",
    "level": "Intermediate",
    "codeExample": "=REPLACE(\"Test\", 10, 2, \"End\") // Result: \"TestEnd\""
  },
  {
    "id": "t9_q15",
    "question": "What error occurs if start_num or num_chars in REPLACE is negative or zero?",
    "shortAnswer": "A #VALUE! error is returned if start_num <= 0 or num_chars < 0.",
    "explanation": "start_num must be >= 1 (1-based index). num_chars can be 0 (for pure insertion), but cannot be negative.",
    "hint": "Positions must be positive integers.",
    "level": "Basic",
    "codeExample": "=REPLACE(\"Data\", 0, 2, \"X\") // Result: #VALUE!"
  },
  {
    "id": "t9_q16",
    "question": "How can you extract the file path directory by stripping the filename using SUBSTITUTE and FIND?",
    "shortAnswer": "Replace the last path separator with a unique token, find its position, and use LEFT.",
    "explanation": "Identify the last \"/\" or \"\\\" by replacing it with CHAR(1) via instance_num, find CHAR(1)'s index, and slice with LEFT.",
    "hint": "Classic last-delimiter extraction technique.",
    "level": "Advanced",
    "codeExample": "=LEFT(A1, FIND(CHAR(1), SUBSTITUTE(A1, \"\\\", CHAR(1), LEN(A1)-LEN(SUBSTITUTE(A1, \"\\\", \"\"))))-1)"
  },
  {
    "id": "t9_q17",
    "question": "How do you replace non-breaking spaces CHAR(160) using SUBSTITUTE?",
    "shortAnswer": "=SUBSTITUTE(A1, CHAR(160), \" \") or =SUBSTITUTE(A1, CHAR(160), \"\").",
    "explanation": "Web scrapes often contain non-breaking spaces (ASCII 160). Passing CHAR(160) into SUBSTITUTE converts them to regular spaces or deletes them.",
    "hint": "Use CHAR(160) in old_text.",
    "level": "Intermediate",
    "codeExample": "=TRIM(SUBSTITUTE(A1, CHAR(160), \" \"))"
  },
  {
    "id": "t9_q18",
    "question": "What is the result of =SUBSTITUTE(\"Banana\", \"a\", \"o\", 0)?",
    "shortAnswer": "#VALUE! error because instance_num must be an integer greater than or equal to 1.",
    "explanation": "instance_num must be 1 or higher. Setting it to 0 or negative values causes Excel to return a #VALUE! error.",
    "hint": "instance_num must be >= 1.",
    "level": "Intermediate",
    "codeExample": "=SUBSTITUTE(\"Banana\", \"a\", \"o\", 0) // -> #VALUE!"
  },
  {
    "id": "t9_q19",
    "question": "How can you replace all line breaks in cell A1 with commas?",
    "shortAnswer": "=SUBSTITUTE(A1, CHAR(10), \", \").",
    "explanation": "In Windows Excel, in-cell Alt+Enter line breaks are represented by ASCII code 10 (CHAR(10)). On Mac Excel, CHAR(13) may be used.",
    "hint": "Line break is CHAR(10).",
    "level": "Basic",
    "codeExample": "=SUBSTITUTE(A1, CHAR(10), \", \")"
  },
  {
    "id": "t9_q20",
    "question": "How do you swap first and last names formatted as 'Last, First' into 'First Last' using REPLACE/FIND or SUBSTITUTE?",
    "shortAnswer": "Use MID/FIND or TEXTAFTER/TEXTBEFORE in Excel 365.",
    "explanation": "=MID(A1, FIND(\", \", A1)+2, LEN(A1)) & \" \" & LEFT(A1, FIND(\", \", A1)-1) swaps them cleanly.",
    "hint": "Locate comma and concatenate reversed parts.",
    "level": "Intermediate",
    "codeExample": "=MID(A1, FIND(\", \", A1)+2, LEN(A1)) & \" \" & LEFT(A1, FIND(\", \", A1)-1)"
  },
  {
    "id": "t9_q21",
    "question": "Can REPLACE be used to truncate a string from a given position to the end?",
    "shortAnswer": "Yes, by passing a large number (like LEN(A1) or 999) as num_chars and \"\" as new_text.",
    "explanation": "=REPLACE(A1, 10, LEN(A1), \"\") removes all characters from position 10 onwards.",
    "hint": "Replace starting at index with count = LEN.",
    "level": "Intermediate",
    "codeExample": "=REPLACE(\"Order_2026_Final_v2\", 11, LEN(\"Order_2026_Final_v2\"), \"\")\n// Result: \"Order_2026\""
  },
  {
    "id": "t9_q22",
    "question": "How do you change date separators from periods to hyphens using SUBSTITUTE?",
    "shortAnswer": "=SUBSTITUTE(A1, \".\", \"-\").",
    "explanation": "SUBSTITUTE replaces all period characters with hyphens throughout the text.",
    "hint": "Direct replacement of \".\" with \"-\".",
    "level": "Basic",
    "codeExample": "=SUBSTITUTE(\"15.08.2026\", \".\", \"-\") // -> \"15-08-2026\""
  },
  {
    "id": "t9_q23",
    "question": "Why does =SUBSTITUTE(A1, 1, 2) work even if numbers are passed unquoted?",
    "shortAnswer": "Excel automatically coerces numeric arguments into text strings within text functions.",
    "explanation": "Excel implicitly converts numeric 1 and 2 to \"1\" and \"2\", though best practice is to pass explicit string literals.",
    "hint": "Implicit type coercion occurs in text functions.",
    "level": "Intermediate",
    "codeExample": "=SUBSTITUTE(10101, 0, 9) // -> \"19191\""
  },
  {
    "id": "t9_q24",
    "question": "How can you count how many times a word appears in a paragraph using SUBSTITUTE?",
    "shortAnswer": "=(LEN(A1) - LEN(SUBSTITUTE(UPPER(A1), UPPER(word), \"\"))) / LEN(word).",
    "explanation": "Subtract the length of the text without the target word from the original length, then divide by the length of the word.",
    "hint": "Divide character delta by word length.",
    "level": "Advanced",
    "codeExample": "=(LEN(A1) - LEN(SUBSTITUTE(UPPER(A1), \"EXCEL\", \"\"))) / LEN(\"EXCEL\")"
  },
  {
    "id": "t9_q25",
    "question": "How can you standardize multiple consecutive spaces into a single space using TRIM and SUBSTITUTE?",
    "shortAnswer": "TRIM automatically reduces multiple consecutive spaces into single spaces.",
    "explanation": "TRIM(A1) collapses any run of 2 or more standard spaces (CHAR 32) into a single space while removing leading and trailing spaces.",
    "hint": "TRIM collapses interior whitespace runs.",
    "level": "Basic",
    "codeExample": "=TRIM(A1) // \"John   Doe\" -> \"John Doe\""
  },
  {
    "id": "t9_q26",
    "question": "How does Excel's REPLACE function behave when new_text is longer than num_chars?",
    "shortAnswer": "Excel deletes num_chars and inserts the full new_text, expanding the total string length.",
    "explanation": "The output string expands by (LEN(new_text) - num_chars) characters. REPLACE does not require matching replacement length.",
    "hint": "String length dynamically expands.",
    "level": "Basic",
    "codeExample": "=REPLACE(\"Item A\", 6, 1, \"Alpha Premium\") // Result: \"Item Alpha Premium\""
  },
  {
    "id": "t9_q27",
    "question": "How can you replace quotes (\") inside a text string using SUBSTITUTE?",
    "shortAnswer": "Use four quotation marks \"\"\"\" or CHAR(34).",
    "explanation": "In formula syntax, an escaped quote inside a string literal is written as \"\"\"\", or referenced cleanly as CHAR(34).",
    "hint": "Quotation mark ASCII is CHAR(34).",
    "level": "Intermediate",
    "codeExample": "=SUBSTITUTE(A1, CHAR(34), \"\")  // Removes all quotation marks"
  },
  {
    "id": "t9_q28",
    "question": "How can you replace domain names in email addresses (e.g., '@oldcorp.com' to '@newcorp.com')?",
    "shortAnswer": "Use SUBSTITUTE with old domain text or REPLACE with FIND(\"@\", A1).",
    "explanation": "=REPLACE(A1, FIND(\"@\", A1), LEN(A1), \"@newcorp.com\") updates the domain regardless of the original domain name.",
    "hint": "Locate '@' and replace remaining characters.",
    "level": "Intermediate",
    "codeExample": "=REPLACE(A1, FIND(\"@\", A1), LEN(A1), \"@newcorp.com\")"
  },
  {
    "id": "t9_q29",
    "question": "Can SUBSTITUTE take an array of old_text values in Dynamic Array Excel?",
    "shortAnswer": "Yes, passing an array of strings creates a spilled array of individual substituted results.",
    "explanation": "Passing {\"A\",\"B\"} as old_text produces separate array outputs for each replacement unless collapsed with REDUCE.",
    "hint": "Formula spills per array item.",
    "level": "Advanced",
    "codeExample": "=SUBSTITUTE(A1, {\"USD\", \"EUR\"}, \"GBP\") // Spills two results"
  },
  {
    "id": "t9_q30",
    "question": "What is the best practice for deciding between REPLACE and SUBSTITUTE?",
    "shortAnswer": "Use REPLACE when string structure/index is fixed (e.g. fixed-width codes); use SUBSTITUTE when content/delimiter varies in position.",
    "explanation": "Fixed-position patterns (barcodes, card numbers, standard IDs) favor REPLACE. Variable-position terms (names, delimiters, phrases) favor SUBSTITUTE.",
    "hint": "Structure/position -> REPLACE. Content/delimiters -> SUBSTITUTE.",
    "level": "Basic",
    "codeExample": "// Fixed index SKU:\n=REPLACE(A1, 1, 3, \"PRD\")\n// Variable delimiter:\n=SUBSTITUTE(A1, \",\", \"|\")"
  }
];

export default topic9Questions;
