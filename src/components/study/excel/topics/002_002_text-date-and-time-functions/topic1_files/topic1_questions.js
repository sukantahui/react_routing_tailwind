// Topic 1 Questions
const topic1Questions = [
  {
    "id": "t1_q1",
    "question": "What is the core difference between the FIND and SEARCH functions in Excel?",
    "shortAnswer": "FIND is case-sensitive and does not support wildcards; SEARCH is case-insensitive and supports wildcard characters (* and ?).",
    "explanation": "=FIND(\"a\", \"Apple\") returns #VALUE! because 'a' does not match 'A'. =SEARCH(\"a\", \"Apple\") returns 1 because SEARCH ignores case. Additionally, SEARCH allows wildcards (e.g. SEARCH(\"c*t\", \"cat\")), whereas FIND searches for literal asterisk characters.",
    "hint": "FIND = Case-Sensitive (Fast/Exact); SEARCH = Case-Insensitive (Flexible/Wildcards).",
    "level": "Beginner",
    "codeExample": "=FIND(\"E\", \"Excel\")  ' Returns 1\n=FIND(\"e\", \"Excel\")  ' Returns 4"
  },
  {
    "id": "t1_q2",
    "question": "How does the MID function work, and what happens if start_num exceeds the total length of the text?",
    "shortAnswer": "MID extracts a specific number of characters starting at a designated position; if start_num > LEN(text), it returns an empty string (\"\").",
    "explanation": "Syntax: =MID(text, start_num, num_chars). It reads num_chars starting at 1-based index start_num. If start_num is greater than the total string length, Excel returns \"\" without throwing an error. If start_num + num_chars exceeds length, MID simply returns all characters to the end of the text.",
    "hint": "MID safely returns \"\" when start_num exceeds string length.",
    "level": "Beginner",
    "codeExample": "=MID(\"INV-2024-99\", 5, 4)  ' Returns \"2024\""
  },
  {
    "id": "t1_q3",
    "question": "How do you extract a username from an email address (e.g. \"sukanta.hui@codernaccotax.co.in\") before the '@' symbol?",
    "shortAnswer": "Combine LEFT with FIND to extract characters up to the position of '@' minus 1.",
    "explanation": "=LEFT(A2, FIND(\"@\", A2) - 1). FIND(\"@\", A2) locates the 1-based character index of the '@' delimiter. Subtracting 1 gives the exact length of the username substring preceding the '@'.",
    "hint": "=LEFT(A2, FIND(\"@\", A2) - 1)",
    "level": "Beginner",
    "codeExample": "=LEFT(A2, FIND(\"@\", A2) - 1)"
  },
  {
    "id": "t1_q4",
    "question": "How do you extract the domain name from an email address after the '@' symbol using dynamic formulas?",
    "shortAnswer": "Use MID starting at FIND(\"@\", A2) + 1 for length LEN(A2), or combine RIGHT with LEN and FIND.",
    "explanation": "=MID(A2, FIND(\"@\", A2) + 1, LEN(A2)). Starting at the character immediately after the '@' symbol, MID retrieves all remaining characters up to the full length of the string, ensuring variable-length domains are completely captured.",
    "hint": "=MID(A2, FIND(\"@\", A2) + 1, LEN(A2)) captures all characters after delimiter.",
    "level": "Intermediate",
    "codeExample": "=MID(A2, FIND(\"@\", A2) + 1, LEN(A2))"
  },
  {
    "id": "t1_q5",
    "question": "What happens when FIND or SEARCH cannot find the target substring in a text cell?",
    "shortAnswer": "They both return the #VALUE! error.",
    "explanation": "If the sought character is absent, Excel throws #VALUE!. To prevent downstream formula breakdown, wrap the lookup in IFERROR or ISNUMBER: =ISNUMBER(SEARCH(\"tax\", A2)) returns TRUE or FALSE instead of throwing an error.",
    "hint": "Use ISNUMBER(SEARCH(...)) to return clean TRUE/FALSE flags.",
    "level": "Beginner",
    "codeExample": "=IF(ISNUMBER(SEARCH(\"urgent\", A2)), \"High Priority\", \"Normal\")"
  },
  {
    "id": "t1_q6",
    "question": "How can you extract the last word from a multi-word cell containing a variable number of words?",
    "shortAnswer": "Use TRIM, RIGHT, and SUBSTITUTE with REPT to isolate the final space boundary.",
    "explanation": "The formula =TRIM(RIGHT(SUBSTITUTE(A2, \" \", REPT(\" \", LEN(A2))), LEN(A2))) replaces every single space with a block of spaces equal to the string length. RIGHT then grabs the last block, and TRIM strips all padding spaces to leave only the last word.",
    "hint": "REPT space padding + RIGHT + TRIM extracts the last token.",
    "level": "Advanced",
    "codeExample": "=TRIM(RIGHT(SUBSTITUTE(A2, \" \", REPT(\" \", LEN(A2))), LEN(A2)))"
  },
  {
    "id": "t1_q7",
    "question": "How does the start_num argument in FIND/SEARCH allow you to locate the second or third occurrence of a character?",
    "shortAnswer": "By supplying the position of the first occurrence + 1 as the start_num parameter of the second FIND.",
    "explanation": "To find the second occurrence of a space: =FIND(\" \", A2, FIND(\" \", A2) + 1). The inner FIND locates the first space index (e.g. 5). The outer FIND starts searching from index 6, returning the position of the second space.",
    "hint": "Nest FIND: FIND(delim, text, FIND(delim, text) + 1)",
    "level": "Intermediate",
    "codeExample": "=FIND(\"/\", A2, FIND(\"/\", A2) + 1)  ' Finds 2nd slash in date"
  },
  {
    "id": "t1_q8",
    "question": "What is the return type of LEFT, RIGHT, and MID when extracting numeric digits from a code (e.g. extracting \"2024\" from \"EMP2024\")?",
    "shortAnswer": "They always return a text (string) data type, not a numeric number.",
    "explanation": "All text extraction functions return strings. Even if you extract =RIGHT(\"EMP2024\", 4) returning \"2024\", it is stored as text. To use it in mathematical calculations, coerce it with double negative (--), +0, *1, or VALUE().",
    "hint": "Prefix with -- to convert extracted text digits into numbers.",
    "level": "Beginner",
    "codeExample": "=--RIGHT(A2, 4)  ' Returns numeric year 2024"
  },
  {
    "id": "t1_q9",
    "question": "How do you extract text between two specific delimiters (e.g. extracting the state code between parentheses in \"Kolkata (WB) India\")?",
    "shortAnswer": "Use MID with FIND for the opening delimiter and subtract the start position from the closing delimiter position.",
    "explanation": "=MID(A2, FIND(\"(\", A2) + 1, FIND(\")\", A2) - FIND(\"(\", A2) - 1). The start position is immediately after '('; the character length is the difference between the indices of ')' and '(' minus 1.",
    "hint": "Length = FIND(\")\") - FIND(\"(\") - 1",
    "level": "Intermediate",
    "codeExample": "=MID(A2, FIND(\"(\", A2) + 1, FIND(\")\", A2) - FIND(\"(\", A2) - 1)"
  },
  {
    "id": "t1_q10",
    "question": "How does the LEN function handle spaces, numbers, punctuation, and dates?",
    "shortAnswer": "LEN counts every character including visible letters, spaces, and punctuation; for dates, it counts the length of the underlying serial number string.",
    "explanation": "=LEN(text) measures raw string length. 'A B' has length 3. If cell A2 contains a formatted date like 15-Aug-2024, its underlying serial number is 45519, so =LEN(A2) returns 5 (the number of digits in 45519) unless formatted as text with TEXT().",
    "hint": "LEN on unformatted dates counts serial number digits.",
    "level": "Intermediate",
    "codeExample": "=LEN(\"Hello World!\")  ' Returns 12"
  },
  {
    "id": "t1_q11",
    "question": "What is the wildcard character syntax supported by SEARCH, and how do you search for literal '?' or '*'?",
    "shortAnswer": "'?' matches any single character; '*' matches any sequence of characters; prefix with tilde (~) to search for literal '?' or '*'.",
    "explanation": "=SEARCH(\"A?B\", text) matches 'A1B', 'AxB', etc. =SEARCH(\"A*B\", text) matches 'AB', 'A123B'. To find a literal question mark or asterisk, escape it with a tilde: =SEARCH(\"~?\", text) or =SEARCH(\"~*\", text).",
    "hint": "Escape wildcards with a tilde (~* and ~?).",
    "level": "Advanced",
    "codeExample": "=SEARCH(\"~?\", A2)  ' Finds literal question mark"
  },
  {
    "id": "t1_q12",
    "question": "How do you extract the first name from a full name cell with variable middle and last names?",
    "shortAnswer": "Use =LEFT(A2, FIND(\" \", A2 & \" \") - 1).",
    "explanation": "Appending a dummy space (A2 & \" \") prevents #VALUE! errors for single-word names (e.g. \"Madonna\"). FIND locates the first space, and LEFT extracts all letters before it.",
    "hint": "Append & \" \" inside FIND to safely handle single-word names.",
    "level": "Intermediate",
    "codeExample": "=LEFT(A2, FIND(\" \", A2 & \" \") - 1)"
  },
  {
    "id": "t1_q13",
    "question": "How can you extract the middle name from a 3-part name like \"Subhash Chandra Bose\"?",
    "shortAnswer": "Use MID starting after the first space for a length equal to the distance to the second space.",
    "explanation": "=LET(firstSpace, FIND(\" \", A2), secondSpace, FIND(\" \", A2, firstSpace + 1), MID(A2, firstSpace + 1, secondSpace - firstSpace - 1)). This cleanly isolates the middle name token.",
    "hint": "Calculate the offset between first and second space.",
    "level": "Advanced",
    "codeExample": "=LET(s1, FIND(\" \", A2), s2, FIND(\" \", A2, s1 + 1), MID(A2, s1 + 1, s2 - s1 - 1))"
  },
  {
    "id": "t1_q14",
    "question": "What is the default value of num_chars if omitted in LEFT and RIGHT functions?",
    "shortAnswer": "The default value is 1.",
    "explanation": "If num_chars is omitted in =LEFT(text) or =RIGHT(text), Excel defaults to 1 and returns the single first or last character.",
    "hint": "=LEFT(A2) is identical to =LEFT(A2, 1).",
    "level": "Beginner",
    "codeExample": "=LEFT(\"Kolkata\")  ' Returns \"K\"\n=RIGHT(\"Kolkata\")  ' Returns \"a\""
  },
  {
    "id": "t1_q15",
    "question": "How can you count how many times a specific letter (e.g. 'e') appears in a cell using LEN and SUBSTITUTE?",
    "shortAnswer": "Subtract the length of the string without the letter from the original string length: =LEN(A2) - LEN(SUBSTITUTE(A2, \"e\", \"\")).",
    "explanation": "SUBSTITUTE removes all instances of 'e'. The reduction in string length equals the exact frequency count of that character. To make it case-insensitive, wrap in UPPER or LOWER: =LEN(A2) - LEN(SUBSTITUTE(UPPER(A2), \"E\", \"\")).",
    "hint": "Character frequency = LEN(original) - LEN(substituted).",
    "level": "Intermediate",
    "codeExample": "=LEN(A2) - LEN(SUBSTITUTE(UPPER(A2), \"E\", \"\"))"
  },
  {
    "id": "t1_q16",
    "question": "How do you extract the file extension from a full file name (e.g. \"quarterly_report_v2.final.xlsx\")?",
    "shortAnswer": "Extract characters after the final period using TRIM, RIGHT, and SUBSTITUTE with REPT.",
    "explanation": "=TRIM(RIGHT(SUBSTITUTE(A2, \".\", REPT(\" \", LEN(A2))), LEN(A2))). This guarantees that even if the filename contains multiple periods, only the true file extension after the last period is extracted.",
    "hint": "Pad periods with spaces, grab RIGHT, and TRIM.",
    "level": "Advanced",
    "codeExample": "=TRIM(RIGHT(SUBSTITUTE(A2, \".\", REPT(\" \", LEN(A2))), LEN(A2)))"
  },
  {
    "id": "t1_q17",
    "question": "What is the behavior of =LEFT(text, -2) or =RIGHT(text, -1)?",
    "shortAnswer": "Excel throws a #VALUE! error because num_chars cannot be negative.",
    "explanation": "Unlike Python slicing (where -2 counts backwards from the end), Excel's classic LEFT, RIGHT, and MID functions require non-negative integers for num_chars. Passing a negative number throws #VALUE!.",
    "hint": "num_chars in LEFT/RIGHT/MID must be >= 0.",
    "level": "Beginner",
    "codeExample": "=LEFT(A2, MAX(0, LEN(A2) - 2))  ' Safe alternative to drop last 2 chars"
  },
  {
    "id": "t1_q18",
    "question": "How can you remove the last 3 characters from any string regardless of its length?",
    "shortAnswer": "Use =LEFT(A2, LEN(A2) - 3).",
    "explanation": "LEN(A2) calculates the full length. Subtracting 3 instructs LEFT to return everything up to 3 characters before the end. For safety against short strings, wrap in MAX: =LEFT(A2, MAX(0, LEN(A2) - 3)).",
    "hint": "=LEFT(A2, LEN(A2) - N) strips the trailing N characters.",
    "level": "Intermediate",
    "codeExample": "=LEFT(A2, MAX(0, LEN(A2) - 3))"
  },
  {
    "id": "t1_q19",
    "question": "How does FIND behave when searching for an empty string \"\"?",
    "shortAnswer": "It returns 1 (or the value of start_num if provided).",
    "explanation": "=FIND(\"\", \"Excel\") evaluates to 1 because an empty string matches immediately at position 1. =FIND(\"\", \"Excel\", 3) returns 3.",
    "hint": "Searching for \"\" returns the starting index.",
    "level": "Intermediate",
    "codeExample": "=FIND(\"\", A2)  ' Returns 1"
  },
  {
    "id": "t1_q20",
    "question": "How do you extract only the numeric digits from an alphanumeric string like \"INV-84920-WB\" using modern dynamic arrays?",
    "shortAnswer": "Use TEXTJOIN, MID, SEQUENCE, and ISNUMBER inside FILTER or REDUCE in Excel 365.",
    "explanation": "=CONCAT(IFERROR(MID(A2, SEQUENCE(LEN(A2)), 1) * 1, \"\")). SEQUENCE breaks the string into single characters; multiplying by 1 keeps numbers and converts letters to #VALUE!, which IFERROR replaces with \"\", and CONCAT merges the digits.",
    "hint": "Use CONCAT with MID(SEQUENCE(LEN)) to parse digits.",
    "level": "Expert",
    "codeExample": "=CONCAT(IFERROR(MID(A2, SEQUENCE(LEN(A2)), 1) * 1, \"\"))"
  },
  {
    "id": "t1_q21",
    "question": "How can you check if a cell starts with a specific prefix like \"EXP-\" (case-insensitive)?",
    "shortAnswer": "Use =LEFT(A2, 4) = \"EXP-\" or =EXACT(LEFT(A2, 4), \"EXP-\") for case-sensitive validation.",
    "explanation": "=LEFT(A2, 4)=\"EXP-\" checks if the first 4 characters equal \"EXP-\" without case sensitivity. For exact case matching, use =EXACT(LEFT(A2, 4), \"EXP-\").",
    "hint": "=LEFT(A2, 4)=\"EXP-\" is simple and fast.",
    "level": "Beginner",
    "codeExample": "=IF(LEFT(A2, 4)=\"EXP-\", \"Expense\", \"Other\")"
  },
  {
    "id": "t1_q22",
    "question": "How do you extract the directory path from a full file path string like \"C:\\Reports\\2024\\Sales.xlsx\"?",
    "shortAnswer": "Locate the last backslash position and extract all characters up to it with LEFT.",
    "explanation": "=LEFT(A2, LOOKUP(2, 1/(MID(A2, SEQUENCE(LEN(A2)), 1)=\"\\\"), SEQUENCE(LEN(A2)))). Alternatively in Excel 365: =TEXTBEFORE(A2, \"\\\", -1).",
    "hint": "In Excel 365: =TEXTBEFORE(A2, \"\\\", -1)",
    "level": "Advanced",
    "codeExample": "=TEXTBEFORE(A2, \"\\\", -1)"
  },
  {
    "id": "t1_q23",
    "question": "What is the difference in execution speed between FIND and SEARCH across 100,000 rows?",
    "shortAnswer": "FIND is faster than SEARCH because it executes direct binary character comparisons without regex/wildcard evaluation overhead.",
    "explanation": "Because SEARCH must evaluate wildcard patterns and handle case conversion tables in RAM, FIND executes significantly faster on large datasets when case sensitivity is acceptable.",
    "hint": "Use FIND over SEARCH when case is uniform for faster calculation.",
    "level": "Advanced",
    "codeExample": "=FIND(\"-\", A2)"
  },
  {
    "id": "t1_q24",
    "question": "How do you safely extract telephone area codes formatted as \"(033) 2592-1234\"?",
    "shortAnswer": "Use MID starting at index 2 for 3 characters, or use dynamic delimiter extraction with FIND.",
    "explanation": "If fixed: =MID(A2, 2, 3). If variable length: =MID(A2, FIND(\"(\", A2) + 1, FIND(\")\", A2) - FIND(\"(\", A2) - 1).",
    "hint": "Use fixed MID if formatting is strictly standard.",
    "level": "Beginner",
    "codeExample": "=MID(A2, 2, 3)"
  },
  {
    "id": "t1_q25",
    "question": "How can you test if a string contains any numeric digits anywhere in its text?",
    "shortAnswer": "Use =COUNT(FIND({0,1,2,3,4,5,6,7,8,9}, A2)) > 0.",
    "explanation": "Passing an array constant of all 10 digits {0,1,2,3,4,5,6,7,8,9} into FIND returns an array of positions and #VALUE! errors. COUNT counts how many numbers succeeded. If > 0, at least one digit exists.",
    "hint": "=COUNT(FIND({0,1,2,3,4,5,6,7,8,9}, A2)) > 0",
    "level": "Advanced",
    "codeExample": "=COUNT(FIND({0,1,2,3,4,5,6,7,8,9}, A2)) > 0"
  },
  {
    "id": "t1_q26",
    "question": "How do you reverse a text string in Excel (e.g. \"EXCEL\" to \"LECXE\")?",
    "shortAnswer": "In Excel 365, combine CONCAT with MID and SEQUENCE in descending order.",
    "explanation": "=CONCAT(MID(A2, SEQUENCE(LEN(A2), 1, LEN(A2), -1), 1)). SEQUENCE generates numbers counting down from length to 1 (e.g. 5, 4, 3, 2, 1), extracting characters from right to left, and CONCAT stitches them together.",
    "hint": "Use SEQUENCE with step -1 inside MID.",
    "level": "Expert",
    "codeExample": "=CONCAT(MID(A2, SEQUENCE(LEN(A2), 1, LEN(A2), -1), 1))"
  },
  {
    "id": "t1_q27",
    "question": "Why does =MID(\"12345\", 2, 0) return an empty string (\"\")?",
    "shortAnswer": "Requesting 0 characters (num_chars = 0) instructs MID to return zero length string.",
    "explanation": "When num_chars is 0, MID, LEFT, and RIGHT return \"\" without throwing an error.",
    "hint": "num_chars = 0 safely returns \"\".",
    "level": "Beginner",
    "codeExample": "=MID(A2, 1, 0)  ' Returns \"\""
  },
  {
    "id": "t1_q28",
    "question": "How can you extract the Nth word from a text string using legacy Excel formulas?",
    "shortAnswer": "Replace spaces with length-sized space buffers, extract MID at (N-1)*LEN, and TRIM.",
    "explanation": "=TRIM(MID(SUBSTITUTE(\" \" & A2, \" \", REPT(\" \", LEN(A2))), N * LEN(A2), LEN(A2))). By replacing spaces with huge space blocks, each word is isolated at predictable offsets.",
    "hint": "In Excel 365, =INDEX(TEXTSPLIT(A2, \" \"), N) is much simpler.",
    "level": "Advanced",
    "codeExample": "=INDEX(TEXTSPLIT(A2, \" \"), 2)  ' Returns 2nd word"
  },
  {
    "id": "t1_q29",
    "question": "How does Excel handle double-byte characters (Japanese, Chinese, Korean) with LEFT/RIGHT/MID vs LEFTB/RIGHTB/MIDB?",
    "shortAnswer": "Standard LEFT/MID/RIGHT count characters; byte-specific LEFTB/MIDB/RIGHTB count bytes (where double-byte characters count as 2 bytes).",
    "explanation": "When working with DBCS (Double-Byte Character Set) languages, characters like kanji take 2 bytes. Regular =LEN(kanji) returns 1 character, while =LENB(kanji) returns 2 bytes.",
    "hint": "Use B-suffixed functions (LENB, MIDB) for byte-level DBCS string extraction.",
    "level": "Expert",
    "codeExample": "=LENB(\"Excel\")  ' 5 bytes vs DBCS characters"
  },
  {
    "id": "t1_q30",
    "question": "What is the best formula pattern to extract text after the last hyphen in a code like \"DEP-FIN-KOL-2024\"?",
    "shortAnswer": "Use TRIM, RIGHT, and SUBSTITUTE with REPT based on hyphen delimiter.",
    "explanation": "=TRIM(RIGHT(SUBSTITUTE(A2, \"-\", REPT(\" \", LEN(A2))), LEN(A2))). This dynamically grabs whatever characters appear after the final hyphen regardless of how many segments precede it.",
    "hint": "Use REPT(\" \", LEN(A2)) with SUBSTITUTE and RIGHT.",
    "level": "Intermediate",
    "codeExample": "=TRIM(RIGHT(SUBSTITUTE(A2, \"-\", REPT(\" \", LEN(A2))), LEN(A2)))"
  }
];

export default topic1Questions;
