// Topic 0 Questions
const topic0Questions = [
  {
    "id": "t0_q1",
    "question": "What is the primary function of the TRIM function in Excel, and how does its behavior differ from string trimming in programming languages like Python or JavaScript?",
    "shortAnswer": "Excel's TRIM removes all leading and trailing spaces and collapses multiple consecutive internal spaces into a single space, unlike standard trim() which only strips edges.",
    "explanation": "In Excel, =TRIM(text) is specifically engineered for human text cleaning. It strips leading ASCII 32 spaces, trailing spaces, and reduces any internal cluster of spaces down to exactly one space. In contrast, standard programming functions (like JavaScript String.prototype.trim()) only remove leading and trailing whitespace while leaving internal double spaces untouched.",
    "hint": "Remember: Excel TRIM cleans internal extra spaces too!",
    "level": "Beginner",
    "codeExample": "=TRIM(\"   Swadeep    Banerjee   \")  ' Returns \"Swadeep Banerjee\""
  },
  {
    "id": "t0_q2",
    "question": "Why does the TRIM function often fail to remove spaces copied or imported from web pages, HTML tables, or ERP systems?",
    "shortAnswer": "Web and HTML text frequently uses non-breaking spaces (CHAR(160) / &nbsp;), which TRIM ignores because it only targets standard space (CHAR(32)).",
    "explanation": "ASCII 160 (Unicode U+00A0) is the non-breaking space used in HTML. Because TRIM only looks for standard space characters with ASCII code 32, CHAR(160) remains untouched, causing lookup mismatches and unwanted spacing. To fix this, you must substitute CHAR(160) with CHAR(32) before trimming.",
    "hint": "Use SUBSTITUTE with CHAR(160) before TRIM.",
    "level": "Intermediate",
    "codeExample": "=TRIM(CLEAN(SUBSTITUTE(A2, CHAR(160), \" \")))"
  },
  {
    "id": "t0_q3",
    "question": "What is the purpose of the CLEAN function in Excel, and what character range does it remove?",
    "shortAnswer": "CLEAN removes the first 32 non-printable ASCII characters (ASCII codes 0 through 31) from text.",
    "explanation": "When importing data from legacy mainframes, serial logs, or raw text files, text often contains invisible control characters like null bytes (0), line feeds (10), carriage returns (13), tabs (9), and bells (7). =CLEAN(text) strips ASCII codes 0 to 31, cleaning raw text streams so they render cleanly in single-line cells.",
    "hint": "CLEAN targets ASCII 0 to 31.",
    "level": "Beginner",
    "codeExample": "=CLEAN(A2)"
  },
  {
    "id": "t0_q4",
    "question": "How does the PROPER function handle casing in hyphenated names, apostrophes, and abbreviations (e.g., \"O'CONNOR\", \"NASA\", \"jean-paul\")?",
    "shortAnswer": "PROPER capitalizes the first letter after any non-alphanumeric character (spaces, hyphens, apostrophes) and forces all other letters to lowercase.",
    "explanation": "PROPER treats any non-letter (such as an apostrophe or hyphen) as a word boundary. Consequently: 'O'CONNOR' becomes 'O'Connor' (O and C capitalized), 'jean-paul' becomes 'Jean-Paul', but acronyms like 'NASA' or 'USA' are unfortunately converted to 'Nasa' and 'Usa'. Custom formulas or Power Query are required to preserve acronyms.",
    "hint": "Apostrophes and hyphens create word boundaries in PROPER.",
    "level": "Intermediate",
    "codeExample": "=PROPER(\"o'connor-smith\")  ' Returns \"O'Connor-Smith\""
  },
  {
    "id": "t0_q5",
    "question": "How do UPPER and LOWER handle numeric values, dates, punctuation, and accented characters?",
    "shortAnswer": "They convert alphabetic characters to upper/lower case, leave numbers and punctuation unchanged, and correctly handle accented Latin characters.",
    "explanation": "=UPPER(text) and =LOWER(text) process alphabetic characters across standard and accented Unicode ranges (e.g., '\u00e9' becomes '\u00c9'). Numeric characters, symbols, and dates stored as serial numbers are passed through unchanged if supplied as text, but dates passed directly without formatting may be converted to their raw serial string representation.",
    "hint": "Numbers and punctuation are unaffected by UPPER/LOWER.",
    "level": "Beginner",
    "codeExample": "=UPPER(\"r\u00e9sum\u00e9-2024\")  ' Returns \"R\u00c9SUM\u00c9-2024\""
  },
  {
    "id": "t0_q6",
    "question": "How can you build a bulletproof formula that cleans all leading/trailing spaces, non-breaking web spaces, and non-printable control characters simultaneously?",
    "shortAnswer": "Combine TRIM, CLEAN, and SUBSTITUTE for CHAR(160) into a nested formula.",
    "explanation": "The industry gold-standard data-cleansing formula nestles SUBSTITUTE inside CLEAN inside TRIM: =TRIM(CLEAN(SUBSTITUTE(A2, CHAR(160), \" \"))). This first replaces all non-breaking spaces with standard spaces, removes ASCII 0-31 control characters, and finally collapses and trims all standard whitespace.",
    "hint": "TRIM(CLEAN(SUBSTITUTE(...))) is the universal text sanitizer.",
    "level": "Intermediate",
    "codeExample": "=TRIM(CLEAN(SUBSTITUTE(A2, CHAR(160), \" \")))"
  },
  {
    "id": "t0_q7",
    "question": "What is the difference between applying uppercase formatting via cell formatting vs. using the UPPER function?",
    "shortAnswer": "Cell formatting only alters visual display while underlying data remains unchanged; UPPER actually transforms the underlying string stored in memory.",
    "explanation": "If you apply a custom number format or VBA style to display uppercase, downstream formulas like EXACT or database exports will still see the original mixed-case text. The =UPPER() function modifies the actual string value in calculation memory, ensuring consistent results in case-sensitive lookups and exports.",
    "hint": "Formatting is cosmetic; UPPER alters calculation memory.",
    "level": "Intermediate",
    "codeExample": "=EXACT(A2, UPPER(A2))"
  },
  {
    "id": "t0_q8",
    "question": "Why does VLOOKUP or XLOOKUP return #N/A even when two text values look visually identical in Excel?",
    "shortAnswer": "Invisible leading/trailing spaces, non-breaking spaces (CHAR(160)), or hidden line breaks prevent exact character matching.",
    "explanation": "Excel performs exact binary character comparisons in lookup functions. A cell containing 'Kolkata ' (length 8) will never match 'Kolkata' (length 7). Applying =LEN(cell) immediately reveals the difference. Wrapping lookup keys or table arrays in TRIM solves this issue.",
    "hint": "Use =LEN(cell) to diagnose hidden whitespace causing #N/A.",
    "level": "Beginner",
    "codeExample": "=XLOOKUP(TRIM(A2), TRIM(tblStaff[ID]), tblStaff[Name])"
  },
  {
    "id": "t0_q9",
    "question": "How can you capitalize only the very first letter of a sentence without changing the casing of the rest of the sentence?",
    "shortAnswer": "Combine UPPER with LEFT for the first character, and concatenate with MID or RIGHT in LOWER or original case.",
    "explanation": "=UPPER(LEFT(A2, 1)) & MID(A2, 2, LEN(A2)) capitalizes strictly the first character while preserving whatever casing exists in the rest of the text. If you want sentence case where everything after the first letter is lowercased, use =UPPER(LEFT(A2, 1)) & LOWER(MID(A2, 2, LEN(A2))).",
    "hint": "Use UPPER(LEFT(1)) concatenated with MID(2, LEN).",
    "level": "Intermediate",
    "codeExample": "=UPPER(LEFT(A2, 1)) & LOWER(MID(A2, 2, LEN(A2)))"
  },
  {
    "id": "t0_q10",
    "question": "How does CLEAN behave on Unicode non-printable characters with character codes above ASCII 127 (e.g., CHAR(8203) zero-width spaces)?",
    "shortAnswer": "CLEAN does not remove Unicode control characters above ASCII 31; you must use SUBSTITUTE with UNICHAR codes.",
    "explanation": "CLEAN only removes ASCII 0\u201331. Modern web exports often contain Unicode zero-width spaces (UNICHAR(8203)), zero-width non-joiners (UNICHAR(8204)), or left-to-right marks. To remove these, you must explicitly use =SUBSTITUTE(A2, UNICHAR(8203), \"\").",
    "hint": "Use SUBSTITUTE(text, UNICHAR(8203), \"\") for zero-width spaces.",
    "level": "Advanced",
    "codeExample": "=SUBSTITUTE(SUBSTITUTE(A2, UNICHAR(8203), \"\"), CHAR(160), \" \")"
  },
  {
    "id": "t0_q11",
    "question": "Can TRIM and PROPER be used directly over a dynamic array range (e.g., A2#) in modern Excel 365?",
    "shortAnswer": "Yes, all text manipulation functions in Excel 365 natively support dynamic array broadcasting and will spill the cleaned array.",
    "explanation": "In modern Excel (calculation engine 2019+), writing =PROPER(TRIM(A2#)) passes the entire spilled array into TRIM and PROPER, returning a spilled column of capitalized, trimmed text without requiring Ctrl+Shift+Enter or helper columns.",
    "hint": "Pass the spill range (A2#) directly into TRIM.",
    "level": "Beginner",
    "codeExample": "=PROPER(TRIM(tblRaw[CustomerName]))"
  },
  {
    "id": "t0_q12",
    "question": "How does PROPER format numbers embedded inside strings, such as \"p2p network\" or \"room 4b\"?",
    "shortAnswer": "Any letter immediately following a digit or symbol is capitalized, so \"p2p\" becomes \"P2P\" and \"room 4b\" becomes \"Room 4B\".",
    "explanation": "Because PROPER treats digits as non-alpha boundary markers, letters directly following numbers are capitalized. For example, 'iphone14pro' becomes 'Iphone14Pro', and '3rd floor' becomes '3Rd Floor'.",
    "hint": "Digits act as word boundaries in PROPER.",
    "level": "Intermediate",
    "codeExample": "=PROPER(\"3rd quarter p2p report\")  ' Returns \"3Rd Quarter P2P Report\""
  },
  {
    "id": "t0_q13",
    "question": "How can you test whether a cell contains leading, trailing, or double internal spaces using a boolean formula?",
    "shortAnswer": "Compare the original cell with its trimmed version: =A2<>TRIM(A2).",
    "explanation": "If cell A2 has any excess leading, trailing, or multiple consecutive spaces, TRIM(A2) will produce a different string. Therefore, =A2<>TRIM(A2) evaluates to TRUE whenever uncleaned whitespace exists, making it ideal for Data Validation and Conditional Formatting rules.",
    "hint": "=A2<>TRIM(A2) detects dirty spacing.",
    "level": "Beginner",
    "codeExample": "=IF(A2<>TRIM(A2), \"Whitespace Error\", \"Clean\")"
  },
  {
    "id": "t0_q14",
    "question": "What is the difference between CHAR(10) and CHAR(13) in text cleaning across Windows and Mac Excel?",
    "shortAnswer": "CHAR(10) represents Line Feed (LF, standard in Excel for in-cell Alt+Enter line breaks), while CHAR(13) is Carriage Return (CR).",
    "explanation": "In Windows Excel, an in-cell line break (created with Alt+Enter) is CHAR(10). Data imported from Unix/Linux uses CHAR(10), while old Mac/Windows text files may have CHAR(13) or CHAR(13)&CHAR(10). CLEAN removes both, but to replace in-cell line breaks with commas while keeping text on one line, use =SUBSTITUTE(A2, CHAR(10), \", \").",
    "hint": "Alt+Enter in Windows Excel creates CHAR(10).",
    "level": "Intermediate",
    "codeExample": "=TRIM(SUBSTITUTE(A2, CHAR(10), \", \"))"
  },
  {
    "id": "t0_q15",
    "question": "How does the EXACT function interact with UPPER and LOWER for case-sensitive validation?",
    "shortAnswer": "EXACT performs strict case-sensitive comparisons, whereas the standard equality operator (=) is case-insensitive in Excel.",
    "explanation": "The formula =\"EXCEL\"=\"excel\" returns TRUE in Excel. However, =EXACT(\"EXCEL\", \"excel\") returns FALSE. To verify if a user entered text in pure uppercase, you can write =EXACT(A2, UPPER(A2)).",
    "hint": "Use EXACT for case-sensitive checks.",
    "level": "Beginner",
    "codeExample": "=IF(EXACT(A2, UPPER(A2)), \"Valid Upper\", \"Must be all CAPS\")"
  },
  {
    "id": "t0_q16",
    "question": "What happens when you pass a null/blank cell into UPPER, LOWER, PROPER, TRIM, or CLEAN?",
    "shortAnswer": "They all return an empty text string (\"\") without throwing an error.",
    "explanation": "Passing an empty cell (e.g. B2 which has no value) into =TRIM(B2) or =UPPER(B2) returns an empty text string (\"\") of length 0. It does not return 0 or throw #VALUE!.",
    "hint": "Blank cells evaluate to \"\" in text functions.",
    "level": "Beginner",
    "codeExample": "=LEN(TRIM(A1))  ' Returns 0 if A1 is empty"
  },
  {
    "id": "t0_q17",
    "question": "How can you count the total number of words in a cell using TRIM, LEN, and SUBSTITUTE?",
    "shortAnswer": "Subtract the length of the string without spaces from the trimmed string length, then add 1.",
    "explanation": "The classic formula is =IF(LEN(TRIM(A2))=0, 0, LEN(TRIM(A2)) - LEN(SUBSTITUTE(TRIM(A2), \" \", \"\")) + 1). TRIM collapses all spaces into single spaces. Removing those single spaces and measuring the length difference gives the space count, and word count is space count + 1.",
    "hint": "Word count = Total spaces in trimmed text + 1.",
    "level": "Intermediate",
    "codeExample": "=IF(A2=\"\", 0, LEN(TRIM(A2)) - LEN(SUBSTITUTE(A2, \" \", \"\")) + 1)"
  },
  {
    "id": "t0_q18",
    "question": "How can you convert a column of all-caps text like \"MOHANDAS KARAMCHAND GANDHI\" to Proper Case while ensuring prepositions like \"von\", \"de\", or \"and\" remain lowercase?",
    "shortAnswer": "Use PROPER first, then nest multiple SUBSTITUTE calls or a LET/REDUCE formula to lowercase specific prepositions.",
    "explanation": "Applying =PROPER(A2) capitalizes all words. In advanced models, you wrap the result in a LET block that substitutes common particles: =LET(p, PROPER(A2), SUBSTITUTE(SUBSTITUTE(p, \" Of \", \" of \"), \" And \", \" and \")).",
    "hint": "Apply PROPER first, then substitute specific lowercase conjunctions.",
    "level": "Advanced",
    "codeExample": "=LET(t, PROPER(A2), SUBSTITUTE(SUBSTITUTE(t, \" And \", \" and \"), \" Of \", \" of \"))"
  },
  {
    "id": "t0_q19",
    "question": "Why does using TRIM on numbers formatted as text sometimes cause unexpected behavior in downstream calculations?",
    "shortAnswer": "TRIM always outputs a text (string) data type, even if the input was numeric or formatted as currency.",
    "explanation": "If cell A2 contains the number 5000 and you execute =TRIM(A2), the result is the string \"5000\" (left-aligned). Functions like SUM will ignore string numbers unless coerced back to numeric format using double unary (--TRIM(A2)) or VALUE().",
    "hint": "Use --TRIM(A2) to convert cleaned text back to numbers.",
    "level": "Intermediate",
    "codeExample": "=--TRIM(A2)  ' Coerces cleaned text back to numeric float"
  },
  {
    "id": "t0_q20",
    "question": "How does Excel handle text functions inside array helper functions like BYROW or MAP?",
    "shortAnswer": "You can pass text manipulation lambda functions to process rows individually without memory overhead.",
    "explanation": "=MAP(tblData[RawAddress], LAMBDA(x, TRIM(CLEAN(SUBSTITUTE(x, CHAR(160), \" \"))))) dynamically iterates through the entire column, applying the multi-step sanitization algorithm item by item and spilling the clean vector.",
    "hint": "Combine MAP with a cleaning LAMBDA.",
    "level": "Advanced",
    "codeExample": "=MAP(A2:A100, LAMBDA(r, TRIM(CLEAN(r))))"
  },
  {
    "id": "t0_q21",
    "question": "How can you remove all spaces entirely (both single and multiple) from a cell (e.g. credit card or phone numbers)?",
    "shortAnswer": "Use SUBSTITUTE to replace all spaces with an empty string: =SUBSTITUTE(A2, \" \", \"\").",
    "explanation": "Unlike TRIM (which preserves single spaces between words), =SUBSTITUTE(A2, \" \", \"\") strips every space character across the entire string, ideal for sanitizing credit card numbers, IBANs, and serial numbers.",
    "hint": "SUBSTITUTE with \"\" deletes all spaces.",
    "level": "Beginner",
    "codeExample": "=SUBSTITUTE(SUBSTITUTE(A2, \" \", \"\"), \"-\", \"\")"
  },
  {
    "id": "t0_q22",
    "question": "What is the impact of excessive text function nesting (e.g. 50,000 rows of TRIM/CLEAN/PROPER) on Excel workbook performance?",
    "shortAnswer": "Text functions create new dynamic string allocations in calculation memory, which can slow down workbook recalculations if not converted to static values.",
    "explanation": "String operations are computationally more expensive than integer math. Running 50,000 rows of complex nested TRIM/CLEAN/SUBSTITUTE forces Excel's calculation engine to allocate memory buffers for each cell. Once raw data is cleaned, copy-pasting as values (Ctrl+Alt+V > V) frees calculation cycles.",
    "hint": "Paste cleaned ETL text as values for large enterprise workbooks.",
    "level": "Intermediate",
    "codeExample": "' Copy -> Paste Special -> Values (Alt + E + S + V)"
  },
  {
    "id": "t0_q23",
    "question": "How does PROPER format Roman numerals like \"HENRY VIII\" or \"PART III\"?",
    "shortAnswer": "PROPER converts them to \"Henry Viii\" and \"Part Iii\", which is grammatically incorrect for Roman numerals.",
    "explanation": "Because Excel treats 'VIII' as standard letters rather than Roman numerals, PROPER capitalizes only the first 'V' and lowercases the 'iii'. In corporate reporting, a custom substitute table is used to restore Roman numerals.",
    "hint": "PROPER does not recognize Roman numerals as special cases.",
    "level": "Intermediate",
    "codeExample": "=SUBSTITUTE(PROPER(A2), \"Iii\", \"III\")"
  },
  {
    "id": "t0_q24",
    "question": "How do you strip tabs (ASCII 9) from imported tabular data while preserving words?",
    "shortAnswer": "CLEAN automatically removes ASCII 9 (tabs), or SUBSTITUTE can convert tabs to spaces.",
    "explanation": "Since ASCII 9 falls within the 0\u201331 non-printable range, =CLEAN(A2) deletes tab characters. Alternatively, =SUBSTITUTE(A2, CHAR(9), \" \") replaces tabs with single spaces before running TRIM.",
    "hint": "CHAR(9) is the horizontal tab character.",
    "level": "Intermediate",
    "codeExample": "=TRIM(SUBSTITUTE(A2, CHAR(9), \" \"))"
  },
  {
    "id": "t0_q25",
    "question": "How can you ensure that an ID code like \"abc-123-xyz\" is always strictly entered in lowercase in Data Validation?",
    "shortAnswer": "Use the custom Data Validation formula =EXACT(A2, LOWER(A2)).",
    "explanation": "In Data Validation > Allow: Custom, entering =EXACT(A2, LOWER(A2)) forces Excel to reject any input containing uppercase letters, enforcing consistent database formatting at the point of entry.",
    "hint": "Use EXACT(A2, LOWER(A2)) in Data Validation.",
    "level": "Intermediate",
    "codeExample": "=EXACT(A2, LOWER(A2))"
  },
  {
    "id": "t0_q26",
    "question": "What is the result of applying =LOWER(TRUE) or =UPPER(FALSE) in Excel?",
    "shortAnswer": "It converts the boolean value to its text string equivalent \"true\" or \"FALSE\".",
    "explanation": "Excel automatically coerces boolean TRUE/FALSE into the string 'TRUE'/'FALSE' before applying the text function. The output is a string data type, not a boolean literal.",
    "hint": "Boolean literals become string types when passed into LOWER/UPPER.",
    "level": "Intermediate",
    "codeExample": "=LOWER(A2=B2)  ' Returns \"true\" or \"false\" as text"
  },
  {
    "id": "t0_q27",
    "question": "How do you extract initials from a 3-word name using PROPER and string functions?",
    "shortAnswer": "Extract the first letter and characters following spaces, or combine TEXTSPLIT with LEFT in Excel 365.",
    "explanation": "In modern Excel: =CONCAT(LEFT(TEXTSPLIT(TRIM(A2), \" \"), 1)) splits the cleaned name into words, takes the first letter of each, and concatenates them into initials (e.g. 'SH' for 'Sukanta Hui').",
    "hint": "Use CONCAT(LEFT(TEXTSPLIT(A2, \" \"), 1)).",
    "level": "Advanced",
    "codeExample": "=CONCAT(LEFT(TEXTSPLIT(TRIM(A2), \" \"), 1))"
  },
  {
    "id": "t0_q28",
    "question": "How does Excel's Flash Fill (Ctrl + E) compare with formulas like PROPER and TRIM for data cleaning?",
    "shortAnswer": "Flash Fill is a one-time static pattern recognition tool, whereas PROPER and TRIM formulas are dynamic and auto-update when source data changes.",
    "explanation": "Flash Fill is quick for ad-hoc one-off cleaning, but it does not maintain live dependencies. If a user corrects a spelling mistake in source data, Flash Fill outputs will NOT update. Formulas like =PROPER(TRIM(A2)) remain live and dynamic.",
    "hint": "Formulas auto-update; Flash Fill is static.",
    "level": "Beginner",
    "codeExample": "' Press Ctrl + E for one-time Flash Fill pattern fill"
  },
  {
    "id": "t0_q29",
    "question": "Why does CLEAN not remove line breaks on some Mac OS Excel files?",
    "shortAnswer": "Historical Mac text files sometimes used Carriage Return (ASCII 13) or different line endings that require explicit substitution.",
    "explanation": "While CLEAN strips ASCII 0\u201331 including ASCII 13 and ASCII 10, certain Unicode line/paragraph separators (like U+2028 or U+2029) are unaffected. Explicitly substituting UNICHAR(8232) or CHAR(10) ensures cross-platform compatibility.",
    "hint": "Substitute CHAR(10) and CHAR(13) for cross-platform resilience.",
    "level": "Advanced",
    "codeExample": "=SUBSTITUTE(SUBSTITUTE(A2, CHAR(13), \" \"), CHAR(10), \" \")"
  },
  {
    "id": "t0_q30",
    "question": "What is the recommended architectural order when sanitizing user-submitted text from external web forms?",
    "shortAnswer": "1. Replace non-breaking spaces (CHAR(160)); 2. Remove control codes (CLEAN); 3. Normalize whitespace (TRIM); 4. Apply business casing (PROPER/UPPER/LOWER).",
    "explanation": "The optimal pipeline processes text from the most corrupting invisible characters to high-level formatting: =PROPER(TRIM(CLEAN(SUBSTITUTE(A2, CHAR(160), \" \")))). This ensures that non-breaking spaces become regular spaces before TRIM collapses them, and CLEAN strips hidden noise before PROPER formats the word tokens.",
    "hint": "Order: SUBSTITUTE(160) -> CLEAN -> TRIM -> Business Casing.",
    "level": "Intermediate",
    "codeExample": "=PROPER(TRIM(CLEAN(SUBSTITUTE(A2, CHAR(160), \" \"))))"
  }
];

export default topic0Questions;
