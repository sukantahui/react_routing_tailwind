// Topic 8 Questions
const topic8Questions = [
  {
    "id": "t8_q1",
    "question": "What are the advantages of TEXTBEFORE and TEXTAFTER over legacy LEFT, RIGHT, MID, and FIND formulas?",
    "shortAnswer": "They eliminate the need to calculate string lengths and delimiter indices manually, and support negative instance numbers to search backwards from the end.",
    "explanation": "Legacy parsing required =LEFT(A2, FIND(\"-\", A2) - 1). Modern Excel 365: =TEXTBEFORE(A2, \"-\"). To find the text after the LAST hyphen, legacy required complex REPT/SUBSTITUTE nesting; modern Excel simply uses =TEXTAFTER(A2, \"-\", -1).",
    "hint": "Use -1 for instance_num to search from right to left.",
    "level": "Beginner",
    "codeExample": "=TEXTBEFORE(A2, \"-\")\n=TEXTAFTER(A2, \"-\", -1)"
  },
  {
    "id": "t8_q2",
    "question": "What is the syntax and argument structure of TEXTSPLIT in Excel 365?",
    "shortAnswer": "Syntax: =TEXTSPLIT(text, col_delimiter, [row_delimiter], [ignore_empty], [match_mode], [pad_with]).",
    "explanation": "TEXTSPLIT can split a text string across columns (using col_delimiter) and down rows (using row_delimiter) simultaneously, creating a 2D spilled array matrix from delimited text payloads.",
    "hint": "TEXTSPLIT splits across columns and down rows in 2D.",
    "level": "Intermediate",
    "codeExample": "=TEXTSPLIT(A2, \",\", \";\")  ' Cols by comma, Rows by semicolon"
  },
  {
    "id": "t8_q3",
    "question": "How do you extract text after the LAST slash or backslash in a file path using TEXTAFTER?",
    "shortAnswer": "Set instance_num to -1: =TEXTAFTER(A2, \"\\\", -1).",
    "explanation": "Supplying instance_num = -1 instructs TEXTAFTER to search backwards from the end of the text string, immediately returning the filename (e.g. \"Report.xlsx\" from \"C:\\Folder\\Subfolder\\Report.xlsx\").",
    "hint": "instance_num = -1 targets the last occurrence.",
    "level": "Beginner",
    "codeExample": "=TEXTAFTER(A2, \"\\\", -1)"
  },
  {
    "id": "t8_q4",
    "question": "How do you extract text between two delimiters using modern text functions (e.g. text between \"[\" and \"]\")?",
    "shortAnswer": "Nest TEXTBEFORE inside TEXTAFTER: =TEXTBEFORE(TEXTAFTER(A2, \"[\"), \"]\").",
    "explanation": "TEXTAFTER(A2, \"[\") strips everything before and including the opening bracket '['. TEXTBEFORE(..., \"]\") takes that result and returns everything before the closing bracket ']'.",
    "hint": "=TEXTBEFORE(TEXTAFTER(A2, \"[\"), \"]\")",
    "level": "Beginner",
    "codeExample": "=TEXTBEFORE(TEXTAFTER(A2, \"[\"), \"]\")"
  },
  {
    "id": "t8_q5",
    "question": "How does the [match_mode] argument in TEXTBEFORE and TEXTAFTER control case sensitivity?",
    "shortAnswer": "0 (default) = Case-sensitive match; 1 = Case-insensitive match.",
    "explanation": "=TEXTAFTER(A2, \"dept\", , 1) matches \"DEPT\", \"Dept\", or \"dept\" because match_mode is set to 1.",
    "hint": "match_mode: 0 = Case-Sensitive, 1 = Case-Insensitive.",
    "level": "Intermediate",
    "codeExample": "=TEXTAFTER(A2, \"tax\", , 1)  ' Case-insensitive match"
  },
  {
    "id": "t8_q6",
    "question": "What does the [match_end] argument in TEXTBEFORE and TEXTAFTER do?",
    "shortAnswer": "0 (default) = Do not treat end of string as delimiter (throws #N/A if delimiter absent); 1 = Treat end of string as delimiter.",
    "explanation": "If searching for a delimiter that might not be present, setting match_end = 1 returns the entire string instead of throwing an error.",
    "hint": "match_end = 1 safely returns whole text if delimiter is missing.",
    "level": "Advanced",
    "codeExample": "=TEXTBEFORE(A2, \"-\", , , , 1)"
  },
  {
    "id": "t8_q7",
    "question": "How can you split a comma-separated list of values directly into vertical rows instead of horizontal columns?",
    "shortAnswer": "Pass the delimiter as the 3rd argument (row_delimiter) in TEXTSPLIT: =TEXTSPLIT(A2, , \", \").",
    "explanation": "Leaving the 2nd argument (col_delimiter) empty and supplying \", \" as the 3rd argument (row_delimiter) instructs TEXTSPLIT to spill the parsed tokens down a single vertical column.",
    "hint": "Supply delimiter in argument 3 (row_delimiter) to spill vertically.",
    "level": "Intermediate",
    "codeExample": "=TEXTSPLIT(A2, , \", \")  ' Spills down rows"
  },
  {
    "id": "t8_q8",
    "question": "How do you split text by multiple different delimiters (e.g. split by commas, semicolons, and spaces) using TEXTSPLIT?",
    "shortAnswer": "Supply an array constant of delimiters: =TEXTSPLIT(A2, {\",\", \";\", \" \"}, , TRUE).",
    "explanation": "TEXTSPLIT natively accepts arrays of delimiters. Setting ignore_empty = TRUE prevents empty cells from being spilled when multiple consecutive delimiters appear.",
    "hint": "Supply delimiters as an array: {\",\", \";\", \"|\"}.",
    "level": "Intermediate",
    "codeExample": "=TEXTSPLIT(A2, {\",\", \";\", \"|\"}, , TRUE)"
  },
  {
    "id": "t8_q9",
    "question": "What happens when TEXTSPLIT creates an uneven 2D grid where rows have different numbers of items?",
    "shortAnswer": "Excel fills missing matrix cells with #N/A by default, or with the custom value provided in [pad_with].",
    "explanation": "If row 1 has 3 items and row 2 has 2 items, =TEXTSPLIT(A2, \",\", \";\", TRUE, 0, \"-\") pads the empty cell in row 2 with \"-\" instead of #N/A.",
    "hint": "Use [pad_with] parameter to replace #N/A padding.",
    "level": "Advanced",
    "codeExample": "=TEXTSPLIT(A2, \",\", \";\", TRUE, 0, \"N/A\")"
  },
  {
    "id": "t8_q10",
    "question": "How do you extract the 2nd word from a string using TEXTBEFORE and TEXTAFTER?",
    "shortAnswer": "Use =TEXTBEFORE(TEXTAFTER(A2, \" \", 1), \" \").",
    "explanation": "TEXTAFTER(A2, \" \", 1) returns everything after the 1st space. TEXTBEFORE(..., \" \") grabs everything before the next space, isolating the 2nd word.",
    "hint": "Nest TEXTBEFORE and TEXTAFTER with instance 1.",
    "level": "Intermediate",
    "codeExample": "=TEXTBEFORE(TEXTAFTER(A2, \" \", 1), \" \")"
  },
  {
    "id": "t8_q11",
    "question": "How do you extract the second-to-last word from a sentence in Excel 365?",
    "shortAnswer": "Use =TEXTBEFORE(TEXTAFTER(A2, \" \", -2), \" \").",
    "explanation": "TEXTAFTER(A2, \" \", -2) isolates the last two words. TEXTBEFORE(..., \" \") takes the first of those two words, yielding the second-to-last word.",
    "hint": "Use instance -2 with TEXTAFTER, then TEXTBEFORE.",
    "level": "Advanced",
    "codeExample": "=TEXTBEFORE(TEXTAFTER(A2, \" \", -2), \" \")"
  },
  {
    "id": "t8_q12",
    "question": "How do you count how many items exist in a comma-separated text string using TEXTSPLIT and COUNTA/COLUMNS?",
    "shortAnswer": "Use =COUNTA(TEXTSPLIT(A2, \",\")) or =COLUMNS(TEXTSPLIT(A2, \",\")).",
    "explanation": "TEXTSPLIT breaks the string into an array of items. COLUMNS() counts the width of the spilled vector, immediately returning the item count.",
    "hint": "=COLUMNS(TEXTSPLIT(A2, \",\"))",
    "level": "Beginner",
    "codeExample": "=COLUMNS(TEXTSPLIT(A2, \",\"))"
  },
  {
    "id": "t8_q13",
    "question": "What error is returned when TEXTBEFORE or TEXTAFTER cannot find the specified delimiter?",
    "shortAnswer": "They return the #N/A error (unlike FIND which returns #VALUE!).",
    "explanation": "To handle missing delimiters cleanly, wrap in =IFERROR(TEXTBEFORE(A2, \"-\"), A2) or set match_end = 1.",
    "hint": "Returns #N/A if delimiter not found; use IFERROR or match_end=1.",
    "level": "Beginner",
    "codeExample": "=IFERROR(TEXTBEFORE(A2, \"-\"), A2)"
  },
  {
    "id": "t8_q14",
    "question": "How do you parse a full name \"Dr. Swadeep K. Banerjee, PhD\" into Title, First, Middle, Last, and Suffix using modern functions?",
    "shortAnswer": "Combine TEXTBEFORE, TEXTAFTER, and TEXTSPLIT with delimiters \" \" and \",\".",
    "explanation": "=LET(clean, TRIM(A2), noSuffix, TEXTBEFORE(clean & \",\", \",\"), suffix, IFERROR(TEXTAFTER(clean, \", \"), \"\"), parts, TEXTSPLIT(noSuffix, \" \"), parts).",
    "hint": "Use LET with TEXTBEFORE and TEXTSPLIT for multi-part names.",
    "level": "Advanced",
    "codeExample": "=TEXTSPLIT(A2, \" \")"
  },
  {
    "id": "t8_q15",
    "question": "Can TEXTBEFORE and TEXTAFTER accept an array of delimiters to return text before the FIRST matching delimiter?",
    "shortAnswer": "Yes, supplying {\"/\", \"-\", \".\"} will match whichever delimiter appears first in the string.",
    "explanation": "=TEXTBEFORE(A2, {\"/\", \"-\", \".\"}) searches for all three delimiters and returns text preceding the one that occurs earliest in the text.",
    "hint": "Pass an array of delimiters: {\"/\", \"-\", \".\"}.",
    "level": "Intermediate",
    "codeExample": "=TEXTBEFORE(A2, {\"/\", \"-\", \".\"})"
  },
  {
    "id": "t8_q16",
    "question": "How do you split a key-value payload string like \"Name=Swadeep;Dept=Finance;City=Kolkata\" into a 2-column table?",
    "shortAnswer": "Use TEXTSPLIT with \"=\" as col_delimiter and \";\" as row_delimiter.",
    "explanation": "=TEXTSPLIT(A2, \"=\", \";\"). This splits keys and values across 2 columns and down 3 rows in a single spilled matrix.",
    "hint": "=TEXTSPLIT(A2, \"=\", \";\") creates a 2-column key-value matrix.",
    "level": "Intermediate",
    "codeExample": "=TEXTSPLIT(A2, \"=\", \";\")"
  },
  {
    "id": "t8_q17",
    "question": "How do you extract only the numeric numbers from a text string using TEXTSPLIT and TOCOL in Excel 365?",
    "shortAnswer": "Split by non-numeric characters, convert to numbers, and filter with IFERROR and TOCOL.",
    "explanation": "=LET(tokens, TEXTSPLIT(A2, {\" \", \"-\", \",\", \":\"}), nums, IFERROR(--tokens, \"\"), FILTER(nums, nums<>\")).",
    "hint": "Split by delimiters, coerce with --, and FILTER.",
    "level": "Advanced",
    "codeExample": "=FILTER(IFERROR(--TEXTSPLIT(A2, \" \"), \"\"), IFERROR(--TEXTSPLIT(A2, \" \"), \"\")<>\"\")"
  },
  {
    "id": "t8_q18",
    "question": "How does TEXTSPLIT handle multiple consecutive delimiters when ignore_empty is set to FALSE vs TRUE?",
    "shortAnswer": "ignore_empty = TRUE collapses consecutive delimiters; FALSE creates empty (\"\") spilled cells between them.",
    "explanation": "If text is \"A,,,B\", setting ignore_empty = TRUE returns a 2-element array {\"A\", \"B\"}. Setting it to FALSE returns {\"A\", \"\", \"\", \"B\"}.",
    "hint": "Set ignore_empty = TRUE to skip empty matrix cells.",
    "level": "Beginner",
    "codeExample": "=TEXTSPLIT(A2, \",\", , TRUE)"
  },
  {
    "id": "t8_q19",
    "question": "How do you trim all whitespace from every item resulting from TEXTSPLIT?",
    "shortAnswer": "Wrap TEXTSPLIT in the TRIM function: =TRIM(TEXTSPLIT(A2, \",\")).",
    "explanation": "TRIM natively accepts array inputs and trims every single spilled cell element in memory.",
    "hint": "=TRIM(TEXTSPLIT(A2, \",\")) trims all array tokens.",
    "level": "Beginner",
    "codeExample": "=TRIM(TEXTSPLIT(A2, \",\"))"
  },
  {
    "id": "t8_q20",
    "question": "How do you extract domain extensions (e.g. \".com\", \".org\", \".co.in\") from URLs using TEXTAFTER?",
    "shortAnswer": "Use =TEXTAFTER(A2, \".\", -1) or =TEXTAFTER(TEXTBEFORE(A2, \"/\", 3), \".\").",
    "explanation": "=TEXTAFTER(A2, \".\", -1) grabs everything after the final dot in simple domains.",
    "hint": "=TEXTAFTER(A2, \".\", -1)",
    "level": "Beginner",
    "codeExample": "=TEXTAFTER(A2, \".\", -1)"
  },
  {
    "id": "t8_q21",
    "question": "How do you sum all numbers in a single comma-separated cell (e.g. \"10, 25, 40, 15\")?",
    "shortAnswer": "Use =SUM(--TEXTSPLIT(A2, \",\")).",
    "explanation": "TEXTSPLIT separates the string into {\"10\", \"25\", \"40\", \"15\"}. Double unary (--) coerces strings into numbers {10, 25, 40, 15}, and SUM totals them to 90.",
    "hint": "=SUM(--TEXTSPLIT(A2, \",\"))",
    "level": "Intermediate",
    "codeExample": "=SUM(--TEXTSPLIT(A2, \",\"))"
  },
  {
    "id": "t8_q22",
    "question": "How do you extract the protocol (http/https) from a URL using TEXTBEFORE?",
    "shortAnswer": "Use =TEXTBEFORE(A2, \"://\").",
    "explanation": "TEXTBEFORE(A2, \"://\") cleanly isolates \"http\" or \"https\".",
    "hint": "=TEXTBEFORE(A2, \"://\")",
    "level": "Beginner",
    "codeExample": "=TEXTBEFORE(A2, \"://\")"
  },
  {
    "id": "t8_q23",
    "question": "How do you reverse the order of words in a sentence using TEXTSPLIT, INDEX, and SEQUENCE?",
    "shortAnswer": "Split into an array, reverse the index sequence, and concatenate with TEXTJOIN.",
    "explanation": "=LET(w, TEXTSPLIT(A2, \" \"), TEXTJOIN(\" \", TRUE, INDEX(w, SEQUENCE(1, COLUMNS(w), COLUMNS(w), -1)))).",
    "hint": "Use INDEX with descending SEQUENCE on TEXTSPLIT.",
    "level": "Expert",
    "codeExample": "=LET(w, TEXTSPLIT(A2, \" \"), TEXTJOIN(\" \", TRUE, INDEX(w, SEQUENCE(1, COLUMNS(w), COLUMNS(w), -1))))"
  },
  {
    "id": "t8_q24",
    "question": "How do you find the first letter of every word in a title using TEXTSPLIT and LEFT?",
    "shortAnswer": "Use =CONCAT(LEFT(TEXTSPLIT(A2, \" \"), 1)).",
    "explanation": "TEXTSPLIT creates an array of words; LEFT(..., 1) extracts the first character of each word; CONCAT merges them into an acronym.",
    "hint": "=CONCAT(LEFT(TEXTSPLIT(A2, \" \"), 1))",
    "level": "Intermediate",
    "codeExample": "=CONCAT(LEFT(TEXTSPLIT(A2, \" \"), 1))"
  },
  {
    "id": "t8_q25",
    "question": "Can TEXTBEFORE and TEXTAFTER be used inside BYROW or MAP over structured table columns?",
    "shortAnswer": "Yes, wrapping them in LAMBDA enables bulk row-by-row parsing.",
    "explanation": "=BYROW(tblLogs[URL], LAMBDA(u, TEXTBEFORE(TEXTAFTER(u, \"://\"), \"/\"))). Spills domain names across all rows.",
    "hint": "Use BYROW(column, LAMBDA(x, TEXTBEFORE(...))).",
    "level": "Advanced",
    "codeExample": "=BYROW(tblUsers[Email], LAMBDA(e, TEXTBEFORE(e, \"@\")))"
  },
  {
    "id": "t8_q26",
    "question": "How do you extract the area code from telephone numbers with variable delimiters like \"(033) 2592-1234\" or \"033-25921234\"?",
    "shortAnswer": "Combine TEXTBEFORE and TEXTAFTER with array delimiters.",
    "explanation": "=IFERROR(TEXTBEFORE(TEXTAFTER(A2, \"(\"), \")\"), TEXTBEFORE(A2, \"-\")).",
    "hint": "Use IFERROR to handle multiple format styles.",
    "level": "Intermediate",
    "codeExample": "=IFERROR(TEXTBEFORE(TEXTAFTER(A2, \"(\"), \")\"), TEXTBEFORE(A2, \"-\"))"
  },
  {
    "id": "t8_q27",
    "question": "How do you extract all hashtag keywords (#finance, #excel) from a tweet or text string?",
    "shortAnswer": "Split by spaces, filter for strings beginning with '#'.",
    "explanation": "=LET(words, TEXTSPLIT(A2, \" \"), FILTER(words, LEFT(words, 1)=\"#\", \"No Hashtags\")).",
    "hint": "Filter TEXTSPLIT array where LEFT(word, 1) = \"#\".",
    "level": "Intermediate",
    "codeExample": "=FILTER(TEXTSPLIT(A2, \" \"), LEFT(TEXTSPLIT(A2, \" \"), 1)=\"#\", \"None\")"
  },
  {
    "id": "t8_q28",
    "question": "What is the memory and performance advantage of TEXTBEFORE/TEXTAFTER over complex legacy FIND/MID chains?",
    "shortAnswer": "Modern functions are implemented in native C++ in the core Excel calculation engine with zero auxiliary string allocation buffers.",
    "explanation": "Legacy chains required multiple intermediate integer allocations for FIND and LEN. TEXTBEFORE and TEXTAFTER execute in a single compiled pass.",
    "hint": "Modern functions execute faster with less memory overhead.",
    "level": "Advanced",
    "codeExample": "=TEXTBEFORE(A2, \"-\")"
  },
  {
    "id": "t8_q29",
    "question": "How do you extract the street number from an address string where the number is always the first token before a space?",
    "shortAnswer": "Use =TEXTBEFORE(A2, \" \").",
    "explanation": "TEXTBEFORE(A2, \" \") grabs all digits up to the first space (e.g. \"120\" from \"120 Park Street\").",
    "hint": "=TEXTBEFORE(A2, \" \")",
    "level": "Beginner",
    "codeExample": "=TEXTBEFORE(A2, \" \")"
  },
  {
    "id": "t8_q30",
    "question": "How do you extract the city and postal code from an address like \"Barrackpore, Kolkata - 700122\"?",
    "shortAnswer": "Use =TEXTAFTER(A2, \"-\") for PIN code and =TEXTBEFORE(TEXTAFTER(A2, \",\"), \"-\") for City.",
    "explanation": "Combining TEXTBEFORE and TEXTAFTER creates a modular, readable data parsing pipeline without hardcoded character indices.",
    "hint": "Combine TEXTAFTER and TEXTBEFORE for structured parsing.",
    "level": "Intermediate",
    "codeExample": "=TRIM(TEXTAFTER(A2, \"-\"))"
  }
];

export default topic8Questions;
