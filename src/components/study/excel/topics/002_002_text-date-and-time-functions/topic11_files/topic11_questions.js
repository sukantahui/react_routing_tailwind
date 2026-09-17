// Topic 11 Questions
const topic11Questions = [
  {
    "id": "t11_q1",
    "question": "What is the standard formula pattern for splitting 'Last, First Middle' into separate First and Last Name columns in legacy Excel?",
    "shortAnswer": "Last Name: =LEFT(A1, FIND(\",\", A1)-1); First & Middle: =TRIM(MID(A1, FIND(\",\", A1)+1, LEN(A1))).",
    "explanation": "FIND locates the comma separator. LEFT extracts everything prior to the comma, while MID with TRIM retrieves the remaining names without leading spaces.",
    "hint": "Find the comma, slice left and right.",
    "level": "Intermediate",
    "codeExample": "// Last Name:\n=LEFT(A1, FIND(\",\", A1)-1)\n// First & Middle:\n=TRIM(MID(A1, FIND(\",\", A1)+1, LEN(A1)))"
  },
  {
    "id": "t11_q2",
    "question": "How do you split 'Last, First Middle' into three columns in modern Excel 365 in a single formula?",
    "shortAnswer": "Use TEXTSPLIT with comma and space delimiters: =TEXTSPLIT(A1, {\", \", \" \"}).",
    "explanation": "TEXTSPLIT accepts an array of delimiters, allowing you to split by comma-space for the last name and space for middle names across columns.",
    "hint": "Use TEXTSPLIT with an array of delimiters.",
    "level": "Advanced",
    "codeExample": "=TEXTSPLIT(A1, {\", \", \" \"})"
  },
  {
    "id": "t11_q3",
    "question": "How do you extract a 5-digit US ZIP code from the end of an address string like '123 Main St, Austin, TX 78701'?",
    "shortAnswer": "=RIGHT(TRIM(A1), 5).",
    "explanation": "TRIM removes any trailing whitespace, and RIGHT extracts the final 5 characters representing the ZIP code.",
    "hint": "Extract 5 characters from the right of trimmed text.",
    "level": "Basic",
    "codeExample": "=RIGHT(TRIM(A1), 5) // Returns: \"78701\""
  },
  {
    "id": "t11_q4",
    "question": "How do you extract the 2-letter state code from 'City, ST ZIP' format (e.g. 'Austin, TX 78701')?",
    "shortAnswer": "Use MID and FIND or TEXTBEFORE(TEXTAFTER(A1, \", \"), \" \").",
    "explanation": "TEXTAFTER isolates 'TX 78701' and TEXTBEFORE extracts 'TX'. In legacy Excel, use MID relative to the comma position.",
    "hint": "Get text between the comma and the last space.",
    "level": "Intermediate",
    "codeExample": "=TEXTBEFORE(TEXTAFTER(A1, \", \"), \" \") // Returns: \"TX\""
  },
  {
    "id": "t11_q5",
    "question": "How do you clean web-scraped text containing non-breaking spaces, line breaks, and mixed casing in one pipeline?",
    "shortAnswer": "=PROPER(TRIM(CLEAN(SUBSTITUTE(A1, CHAR(160), \" \")))).",
    "explanation": "1. SUBSTITUTE replaces CHAR(160) with standard space. 2. CLEAN strips unprintable ASCII 0-31. 3. TRIM collapses whitespace. 4. PROPER normalizes casing.",
    "hint": "Nest SUBSTITUTE(CHAR(160)), CLEAN, TRIM, and PROPER.",
    "level": "Intermediate",
    "codeExample": "=PROPER(TRIM(CLEAN(SUBSTITUTE(A1, CHAR(160), \" \"))))"
  },
  {
    "id": "t11_q6",
    "question": "How do you extract an email address enclosed in angle brackets (e.g., 'John Doe <john.doe@company.com>')?",
    "shortAnswer": "Use MID and FIND between '<' and '>' or modern TEXTBETWEEN / TEXTAFTER.",
    "explanation": "=TEXTBEFORE(TEXTAFTER(A1, \"<\"), \">\") isolates the exact email string inside the angle brackets.",
    "hint": "Extract text between '<' and '>'.",
    "level": "Basic",
    "codeExample": "=TEXTBEFORE(TEXTAFTER(A1, \"<\"), \">\")\n// Legacy:\n=MID(A1, FIND(\"<\", A1)+1, FIND(\">\", A1)-FIND(\"<\", A1)-1)"
  },
  {
    "id": "t11_q7",
    "question": "How do you standardize inconsistent phone formats like '(555) 123-4567', '555.123.4567', and '5551234567' into '(###) ###-####'?",
    "shortAnswer": "Strip all non-digits with SUBSTITUTE/REDUCE, convert to number, and format with TEXT.",
    "explanation": "Clean out '(', ')', '-', '.', and ' ' to obtain '5551234567', coerce with VALUE, and apply =TEXT(VALUE(clean_str), \"(000) 000-0000\").",
    "hint": "Strip symbols to 10 digits and apply TEXT masking.",
    "level": "Advanced",
    "codeExample": "=LET(\n  digits, REDUCE(A1, {\"(\", \")\", \"-\", \".\", \" \"}, LAMBDA(t,c, SUBSTITUTE(t,c,\"\"))),\n  TEXT(--digits, \"(000) 000-0000\")\n)"
  },
  {
    "id": "t11_q8",
    "question": "How do you parse ISO 8601 timestamps like '2026-05-15T14:30:00Z' into separate Excel Date and Time columns?",
    "shortAnswer": "Date: =DATEVALUE(LEFT(A1, 10)); Time: =TIMEVALUE(MID(A1, 12, 8)).",
    "explanation": "The first 10 characters contain 'YYYY-MM-DD' (date). Characters 12-19 contain 'HH:MM:SS' (time).",
    "hint": "Slice at index 10 and index 12.",
    "level": "Intermediate",
    "codeExample": "// Date:\n=DATEVALUE(LEFT(A1, 10))\n// Time:\n=TIMEVALUE(MID(A1, 12, 8))"
  },
  {
    "id": "t11_q9",
    "question": "How do you parse timestamps with millisecond offsets like '2026-05-15 14:30:00.450' into a real Excel datetime?",
    "shortAnswer": "=DATEVALUE(LEFT(A1,10)) + TIMEVALUE(MID(A1,12,8)) + (RIGHT(A1,3)/86400000).",
    "explanation": "Excel handles milliseconds when formatted as 'yyyy-mm-dd hh:mm:ss.000'. Slicing and dividing milliseconds by 86,400,000 gives exact precision.",
    "hint": "Divide milliseconds by 86,400,000.",
    "level": "Advanced",
    "codeExample": "=(DATEVALUE(LEFT(A1,10)) + TIMEVALUE(MID(A1,12,8)) + RIGHT(A1,3)/86400000)"
  },
  {
    "id": "t11_q10",
    "question": "How do you extract the domain name from a website URL like 'https://www.analytics.store.co.uk/checkout'?",
    "shortAnswer": "Use TEXTAFTER and TEXTBEFORE or FIND to extract between '://' and the first following '/'.",
    "explanation": "=TEXTBEFORE(TEXTAFTER(A1, \"://\"), \"/\") extracts the exact hostname without protocol or query parameters.",
    "hint": "Extract between '://' and the next '/'.",
    "level": "Intermediate",
    "codeExample": "=TEXTBEFORE(TEXTAFTER(A1, \"://\"), \"/\") // Returns: \"www.analytics.store.co.uk\""
  },
  {
    "id": "t11_q11",
    "question": "How do you extract the street address from '742 Evergreen Terrace, Apt 4B, Springfield, OR 97477'?",
    "shortAnswer": "Use TEXTBEFORE with instance 2 or nested TEXTSPLIT.",
    "explanation": "=TEXTBEFORE(A1, \",\", 2) extracts everything before the second comma ('742 Evergreen Terrace, Apt 4B').",
    "hint": "Use TEXTBEFORE with instance parameter.",
    "level": "Intermediate",
    "codeExample": "=TEXTBEFORE(A1, \",\", 2)"
  },
  {
    "id": "t11_q12",
    "question": "How do you convert European text dates '25/12/2026' to US date serials without changing system regional settings?",
    "shortAnswer": "=DATE(RIGHT(A1,4), MID(A1,4,2), LEFT(A1,2)).",
    "explanation": "Constructing the date with DATE(year, month, day) explicitly assigns Day=LEFT, Month=MID, Year=RIGHT, making it immune to computer locale.",
    "hint": "Use DATE(RIGHT, MID, LEFT).",
    "level": "Basic",
    "codeExample": "=DATE(RIGHT(A1,4), MID(A1,4,2), LEFT(A1,2)) // Produces Dec 25, 2026 everywhere"
  },
  {
    "id": "t11_q13",
    "question": "How do you handle multi-line address blocks inside a single cell separated by Alt+Enter?",
    "shortAnswer": "Use TEXTSPLIT with CHAR(10) to split each line across columns or rows.",
    "explanation": "CHAR(10) represents the in-cell line feed. =TEXTSPLIT(A1, CHAR(10)) spills line 1 (Name), line 2 (Street), and line 3 (City/State/Zip) into separate cells.",
    "hint": "Split by CHAR(10) line break.",
    "level": "Intermediate",
    "codeExample": "=TEXTSPLIT(A1, CHAR(10)) // Spills across columns\n=TEXTSPLIT(A1, , CHAR(10)) // Spills down rows"
  },
  {
    "id": "t11_q14",
    "question": "How do you extract a product code inside brackets like 'Premium Widget [SKU-9942-X] - In Stock'?",
    "shortAnswer": "=TEXTBEFORE(TEXTAFTER(A1, \"[\"), \"]\").",
    "explanation": "TEXTAFTER isolates everything after '[', and TEXTBEFORE clips everything before ']' to return 'SKU-9942-X'.",
    "hint": "Extract between '[' and ']'.",
    "level": "Basic",
    "codeExample": "=TEXTBEFORE(TEXTAFTER(A1, \"[\"), \"]\") // Returns: \"SKU-9942-X\""
  },
  {
    "id": "t11_q15",
    "question": "How do you handle name prefixes/suffixes (e.g. 'Dr. John Doe Jr.') when parsing first and last names?",
    "shortAnswer": "Use LET with SUBSTITUTE to strip known titles ({\"Dr. \",\"Mr. \",\"Ms. \",\" Jr.\",\" III\"}) before splitting.",
    "explanation": "Cleaning out known honorifics and suffixes leaves a normalized 'John Doe' string that can be reliably split into First and Last names.",
    "hint": "Strip prefixes/suffixes before name splitting.",
    "level": "Advanced",
    "codeExample": "=LET(\n  clean, REDUCE(A1, {\"Dr. \", \"Mr. \", \"Ms. \", \" Jr.\", \" Sr.\"}, LAMBDA(t, p, SUBSTITUTE(t, p, \"\"))),\n  TEXTSPLIT(TRIM(clean), \" \")\n)"
  },
  {
    "id": "t11_q16",
    "question": "How do you parse combined customer records like 'ID:1049|NAME:Sarah Connor|DEPT:Operations' into a table?",
    "shortAnswer": "Use TEXTSPLIT with row delimiter '|' and column delimiter ':'.",
    "explanation": "=TEXTSPLIT(A1, \":\", \"|\") creates a structured 2-column key-value matrix from delimited string records.",
    "hint": "2D TEXTSPLIT with column and row delimiters.",
    "level": "Advanced",
    "codeExample": "=TEXTSPLIT(A1, \":\", \"|\")"
  },
  {
    "id": "t11_q17",
    "question": "How do you convert 12-hour AM/PM text timestamps without seconds ('5/15/2026 2:30 PM') into numeric serials?",
    "shortAnswer": "=DATEVALUE(TEXTBEFORE(A1, \" \")) + TIMEVALUE(TEXTAFTER(A1, \" \")).",
    "explanation": "TEXTBEFORE extracts the date portion, TEXTAFTER extracts the time portion with AM/PM indicator, and TIMEVALUE parses 12-hour format automatically.",
    "hint": "Split date and time text and add DATEVALUE + TIMEVALUE.",
    "level": "Intermediate",
    "codeExample": "=DATEVALUE(TEXTBEFORE(A1, \" \")) + TIMEVALUE(TEXTAFTER(A1, \" \"))"
  },
  {
    "id": "t11_q18",
    "question": "How do you remove HTML tags like '<p>Hello <b>World</b></p>' in Excel?",
    "shortAnswer": "In Excel 365 use REGEXREPLACE(A1, \"<[^>]+>\", \"\") or nested text formulas.",
    "explanation": "REGEXREPLACE matches any string starting with '<' and ending with '>' and replaces it with an empty string.",
    "hint": "Use REGEXREPLACE with tag pattern.",
    "level": "Advanced",
    "codeExample": "=REGEXREPLACE(A1, \"<[^>]+>\", \"\") // Returns: \"Hello World\""
  },
  {
    "id": "t11_q19",
    "question": "How do you fix broken dates where month and day were entered without leading zeros ('2/5/2026')?",
    "shortAnswer": "=DATEVALUE(A1) or =DATE(TEXTAFTER(A1,\"/\",2), TEXTBEFORE(A1,\"/\"), TEXTBETWEEN(A1,\"/\",\"/\")).",
    "explanation": "Excel's DATE function parses variable-length integer month, day, and year parts without requiring leading zeros.",
    "hint": "DATE handles unpadded integers natively.",
    "level": "Intermediate",
    "codeExample": "=DATE(TEXTAFTER(A1,\"/\",2), TEXTBEFORE(A1,\"/\"), TEXTBETWEEN(A1,\"/\",\"/\"))"
  },
  {
    "id": "t11_q20",
    "question": "How do you extract the numerical transaction amount from messy banking strings like 'POS DEBIT CHASE CA CARD1234 $1,429.50 FEE $2.50'?",
    "shortAnswer": "Find the '$' symbol, extract until space, and coerce with NUMBERVALUE.",
    "explanation": "Isolating the substring after the first '$' and before the subsequent space allows clean conversion to a number.",
    "hint": "Extract text between '$' and the next space.",
    "level": "Advanced",
    "codeExample": "=NUMBERVALUE(TEXTBEFORE(TEXTAFTER(A1, \"$\"), \" \"))"
  },
  {
    "id": "t11_q21",
    "question": "How do you combine multiple address lines while ignoring blank lines into a single comma-separated address?",
    "shortAnswer": "=TEXTJOIN(\", \", TRUE, A1:A5).",
    "explanation": "TEXTJOIN's 2nd argument (ignore_empty=TRUE) skips any empty address lines (e.g. Apt 2) without adding extra commas.",
    "hint": "Use TEXTJOIN with ignore_empty = TRUE.",
    "level": "Basic",
    "codeExample": "=TEXTJOIN(\", \", TRUE, A1:A5)"
  },
  {
    "id": "t11_q22",
    "question": "How do you pad invoice numbers to 8 digits with leading zeros (e.g., 'INV-452' -> 'INV-00000452')?",
    "shortAnswer": "=\"INV-\" & TEXT(TEXTAFTER(A1, \"-\"), \"00000000\").",
    "explanation": "TEXTAFTER extracts the numeric portion '452', and TEXT(452, '00000000') formats it to 8 digits with leading zeros.",
    "hint": "Use TEXT with '00000000' format mask.",
    "level": "Intermediate",
    "codeExample": "=\"INV-\" & TEXT(TEXTAFTER(A1, \"-\"), \"00000000\")"
  },
  {
    "id": "t11_q23",
    "question": "How do you extract file extension from full file paths like 'C:\\Reports\\2026\\Q1_Sales_Report.xlsx'?",
    "shortAnswer": "=TEXTAFTER(A1, \".\", -1).",
    "explanation": "Specifying -1 as instance_num in TEXTAFTER extracts all text following the final period in the string.",
    "hint": "TEXTAFTER with instance_num = -1.",
    "level": "Basic",
    "codeExample": "=TEXTAFTER(A1, \".\", -1) // Returns: \"xlsx\""
  },
  {
    "id": "t11_q24",
    "question": "How do you split hyphenated compound last names without breaking regular last names?",
    "shortAnswer": "Split by comma/space first to isolate the last name token, keeping hyphens intact within that token.",
    "explanation": "Treat the hyphen as part of the surname entity (e.g. 'Smith-Jones') rather than a splitting delimiter.",
    "hint": "Do not split on hyphens if compound surnames exist.",
    "level": "Intermediate",
    "codeExample": "=TEXTBEFORE(A1, \",\") // Preserves \"Smith-Jones\""
  },
  {
    "id": "t11_q25",
    "question": "How do you extract coordinates '(37.7749, -122.4194)' into separate numeric Latitude and Longitude columns?",
    "shortAnswer": "Lat: =--TEXTBETWEEN(A1, \"(\", \", \"); Long: =--TEXTBETWEEN(A1, \", \", \")\").",
    "explanation": "TEXTBETWEEN extracts the substrings inside the parentheses, and double unary (--) coerces them to signed floating-point numbers.",
    "hint": "Extract before/after comma inside parentheses.",
    "level": "Intermediate",
    "codeExample": "// Latitude:\n=--TEXTBETWEEN(A1, \"(\", \", \")\n// Longitude:\n=--TEXTBETWEEN(A1, \", \", \")\")"
  },
  {
    "id": "t11_q26",
    "question": "How do you validate whether a column of extracted emails contains valid syntax ('user@domain.ext')?",
    "shortAnswer": "=AND(ISNUMBER(FIND(\"@\", A1)), ISNUMBER(FIND(\".\", A1, FIND(\"@\", A1)+2)), NOT(ISNUMBER(FIND(\" \", A1)))).",
    "explanation": "Checks that '@' exists, a period follows at least 2 characters after '@', and no spaces are present.",
    "hint": "Verify '@', following period, and absence of spaces.",
    "level": "Advanced",
    "codeExample": "=AND(ISNUMBER(FIND(\"@\", A1)), ISNUMBER(FIND(\".\", A1, FIND(\"@\", A1)+2)), NOT(ISNUMBER(FIND(\" \", A1))))"
  },
  {
    "id": "t11_q27",
    "question": "How do you extract only the date portion from a mixed date-time cell without formatting?",
    "shortAnswer": "=INT(A1).",
    "explanation": "Because Excel dates are stored as integer serial numbers and times are stored as fractional decimals, INT(A1) truncates the time fraction.",
    "hint": "INT strips the fractional time decimal.",
    "level": "Basic",
    "codeExample": "=INT(A1) // 46157.75 -> 46157"
  },
  {
    "id": "t11_q28",
    "question": "How do you extract only the time fraction from a datetime cell without the date?",
    "shortAnswer": "=MOD(A1, 1).",
    "explanation": "MOD(A1, 1) returns the fractional remainder after dividing by 1, isolating the time of day.",
    "hint": "MOD(serial, 1) returns the time fraction.",
    "level": "Basic",
    "codeExample": "=MOD(A1, 1) // 46157.75 -> 0.75 (6:00 PM)"
  },
  {
    "id": "t11_q29",
    "question": "How do you extract the initials of a 3-word name (e.g. 'John Fitzgerald Kennedy' -> 'JFK')?",
    "shortAnswer": "=CONCAT(LEFT(TEXTSPLIT(A1, \" \"), 1)).",
    "explanation": "TEXTSPLIT separates words into an array, LEFT(..., 1) grabs the first letter of each word, and CONCAT joins them into 'JFK'.",
    "hint": "Combine CONCAT, LEFT, and TEXTSPLIT.",
    "level": "Intermediate",
    "codeExample": "=CONCAT(LEFT(TEXTSPLIT(A1, \" \"), 1)) // Returns: \"JFK\""
  },
  {
    "id": "t11_q30",
    "question": "Why is Power Query often recommended for large-scale messy data transformations instead of complex nested formulas?",
    "shortAnswer": "Power Query handles ETL with a visual UI, reusable refreshable queries, robust type coercion, and superior performance on large datasets.",
    "explanation": "While Excel formulas work well for dynamic in-sheet calculations, Power Query provides a robust audit trail, handles schema shifts, and cleans millions of rows without slowing down workbook calculation engines.",
    "hint": "Power Query provides dedicated, performant ETL pipelines.",
    "level": "Intermediate",
    "codeExample": "Data tab -> Get Data -> From File / From Table/Range"
  }
];

export default topic11Questions;
