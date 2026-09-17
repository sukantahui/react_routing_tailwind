// Topic 2 Questions
const topic2Questions = [
  {
    "id": "t2_q1",
    "question": "What is the key advantage of TEXTJOIN over CONCAT and the ampersand (&) operator?",
    "shortAnswer": "TEXTJOIN automatically inserts a custom delimiter between elements and can optionally ignore empty/blank cells.",
    "explanation": "TEXTJOIN syntax: =TEXTJOIN(delimiter, ignore_empty, text1, [text2], ...). While CONCAT and '&' require manual delimiter concatenation (e.g. A1 & \", \" & B1 & \", \" & C1), TEXTJOIN applies the delimiter across entire ranges (A1:C1) in one argument and cleanly skips blank cells without leaving double commas.",
    "hint": "TEXTJOIN handles delimiters and empty cells automatically across ranges.",
    "level": "Beginner",
    "codeExample": "=TEXTJOIN(\", \", TRUE, A2:A10)"
  },
  {
    "id": "t2_q2",
    "question": "What is the difference between CONCATENATE and CONCAT in Excel?",
    "shortAnswer": "CONCAT is the modern replacement for legacy CONCATENATE; CONCAT supports full range selections (A1:A10), whereas CONCATENATE required individual cell references.",
    "explanation": "CONCATENATE(A1:A10) threw errors or required single-cell listings: CONCATENATE(A1, A2, A3...). Modern =CONCAT(A1:A10) accepts entire ranges, dynamic array spills, and arrays, merging them into a single continuous text string.",
    "hint": "CONCAT supports range arguments (A1:A10); CONCATENATE does not.",
    "level": "Beginner",
    "codeExample": "=CONCAT(A2:A10)"
  },
  {
    "id": "t2_q3",
    "question": "Why does concatenating a date cell with text (e.g. \"Report Date: \" & A2) display a 5-digit serial number instead of a formatted date?",
    "shortAnswer": "The & operator coerces raw underlying cell values; Excel stores dates as numeric serial integers (e.g. 45519 for Aug 15, 2024).",
    "explanation": "Cell formatting only alters visual display on the grid. When referenced in a concatenation string, Excel accesses the raw value (45519). To maintain formatted date appearance, wrap the date in the TEXT function: =\"Report Date: \" & TEXT(A2, \"dd-mmm-yyyy\").",
    "hint": "Always wrap dates in TEXT(cell, \"dd-mmm-yyyy\") when concatenating.",
    "level": "Beginner",
    "codeExample": "=\"Report Date: \" & TEXT(A2, \"dd-mmm-yyyy\")"
  },
  {
    "id": "t2_q4",
    "question": "How do you combine Address Line 1, Address Line 2, City, State, and PIN into a multi-line mailing label in a single cell?",
    "shortAnswer": "Use TEXTJOIN with CHAR(10) as delimiter, ignore_empty = TRUE, and enable Wrap Text on the cell.",
    "explanation": "=TEXTJOIN(CHAR(10), TRUE, A2:E2). CHAR(10) inserts in-cell line breaks between each non-empty address component. If Address Line 2 is blank, ignore_empty skips it, preventing blank lines in the mailing label. Wrap Text must be toggled on.",
    "hint": "Use TEXTJOIN(CHAR(10), TRUE, range) + Wrap Text.",
    "level": "Intermediate",
    "codeExample": "=TEXTJOIN(CHAR(10), TRUE, tblCustomers[@[Street1]:[PIN]])"
  },
  {
    "id": "t2_q5",
    "question": "How can you generate a comma-separated list of all employees in a specific department using TEXTJOIN and FILTER in Excel 365?",
    "shortAnswer": "Nest the FILTER function inside TEXTJOIN: =TEXTJOIN(\", \", TRUE, FILTER(tblStaff[Name], tblStaff[Dept]=\"Finance\")).",
    "explanation": "FILTER dynamically extracts an array of names belonging to Finance. TEXTJOIN immediately stitches the returned vector into a clean, comma-separated single-cell summary without helper columns.",
    "hint": "=TEXTJOIN(\", \", TRUE, FILTER(...)) creates dynamic CSV summaries.",
    "level": "Intermediate",
    "codeExample": "=TEXTJOIN(\", \", TRUE, FILTER(tblStaff[Name], tblStaff[Dept]=\"Finance\", \"None\"))"
  },
  {
    "id": "t2_q6",
    "question": "What is the maximum character limit for a single string produced by TEXTJOIN or CONCAT in an Excel cell?",
    "shortAnswer": "32,767 characters (Excel's maximum cell string capacity).",
    "explanation": "If a TEXTJOIN formula concatenates ranges whose total character length exceeds 32,767 characters, Excel throws a #VALUE! error. In extreme enterprise datasets, filter or partition ranges to stay within limits.",
    "hint": "Cell text limit is 32,767 characters.",
    "level": "Advanced",
    "codeExample": "=IF(LEN(TEXTJOIN(\", \", TRUE, A:A)) > 32700, \"Exceeds Limit\", \"OK\")"
  },
  {
    "id": "t2_q7",
    "question": "How do you concatenate double quotation marks (\") inside a text formula string using the & operator?",
    "shortAnswer": "Escape each quotation mark by typing four consecutive quotes (\"\"\"\") or using CHAR(34).",
    "explanation": "In Excel formulas, a double quote begins and ends a string. To insert a literal quote character, write \"\"\"\" (4 quotes) or concatenate CHAR(34): =\"He said \" & CHAR(34) & \"Welcome\" & CHAR(34).",
    "hint": "CHAR(34) is the clean ASCII code for double quotation marks.",
    "level": "Intermediate",
    "codeExample": "=\"<div class=\" & CHAR(34) & \"header\" & CHAR(34) & \">\""
  },
  {
    "id": "t2_q8",
    "question": "What is the performance difference between the ampersand (&) operator and CONCAT when joining 10 individual cells?",
    "shortAnswer": "The & operator is slightly faster for small numbers of static cells, but CONCAT is vastly cleaner and more maintainable for ranges.",
    "explanation": "Writing =A1&B1&C1&D1 executes direct string concatenation. For 10 adjacent cells, =CONCAT(A1:J1) is much less error-prone, handles range insertions dynamically, and prevents formula bloat.",
    "hint": "Use & for 2-3 tokens; use CONCAT or TEXTJOIN for ranges.",
    "level": "Beginner",
    "codeExample": "=CONCAT(A1:J1)"
  },
  {
    "id": "t2_q9",
    "question": "How can you format currency values properly when concatenating with text (e.g. \"Total Balance: \u20b9 45,200.00\")?",
    "shortAnswer": "Wrap the numeric amount in TEXT with custom currency format mask.",
    "explanation": "=\"Total Balance: \" & TEXT(B2, \"\u20b9 #,##,##0.00\"). This guarantees proper Indian numbering format or International currency symbols with 2 decimal places in the concatenated output.",
    "hint": "Use TEXT(num, \"\u20b9 #,##,##0.00\") inside concatenation.",
    "level": "Beginner",
    "codeExample": "=\"Total Balance: \" & TEXT(B2, \"\u20b9 #,##,##0.00\")"
  },
  {
    "id": "t2_q10",
    "question": "What happens if ignore_empty is set to FALSE in TEXTJOIN?",
    "shortAnswer": "TEXTJOIN includes consecutive delimiters for every empty cell in the range (e.g. \"A,,B\").",
    "explanation": "Setting ignore_empty = FALSE preserves blank cell positions, producing consecutive delimiters (e.g. 'Item1, , Item3'). Setting it to TRUE collapses blanks so no trailing or double delimiters appear.",
    "hint": "Use TRUE to skip blanks cleanly; FALSE to preserve structural position.",
    "level": "Beginner",
    "codeExample": "=TEXTJOIN(\",\", FALSE, A1:C1)  ' Returns \"A,,C\" if B1 is empty"
  },
  {
    "id": "t2_q11",
    "question": "Can TEXTJOIN accept an array of different delimiters for different columns or rows?",
    "shortAnswer": "Yes, TEXTJOIN can accept an array constant of delimiters like {\", \", \"; \"} to alternate delimiters.",
    "explanation": "If you supply an array of delimiters: =TEXTJOIN({\": \", \" | \"}, TRUE, A1, B1, C1), Excel applies the first delimiter between A1 and B1, and the second delimiter between B1 and C1, enabling custom record formatting.",
    "hint": "Supply array constants like {\": \", \", \"} as delimiters.",
    "level": "Advanced",
    "codeExample": "=TEXTJOIN({\": \", \" - \"}, TRUE, \"Dept\", \"Finance\", \"Active\")"
  },
  {
    "id": "t2_q12",
    "question": "How do you build a dynamic SQL query string (e.g. \"SELECT * FROM tbl WHERE ID IN ('101', '102', '103')\") in Excel?",
    "shortAnswer": "Combine string literals with TEXTJOIN using \"', '\" as delimiter.",
    "explanation": "=\"SELECT * FROM tbl WHERE ID IN ('\" & TEXTJOIN(\"', '\", TRUE, A2:A10) & \"');\". This automatically quotes every ID, joins them with commas, and wraps the SQL clause perfectly.",
    "hint": "Use TEXTJOIN with delimiter \"', '\" for SQL IN clauses.",
    "level": "Advanced",
    "codeExample": "=\"SELECT * FROM Sales WHERE RepID IN ('\" & TEXTJOIN(\"', '\", TRUE, A2:A10) & \"');\""
  },
  {
    "id": "t2_q13",
    "question": "How do you concatenate headers and dynamic spilled data into a single spilled array in Excel 365?",
    "shortAnswer": "Use VSTACK to stack the header row array on top of the calculated data array.",
    "explanation": "=VSTACK({\"ID\", \"Name\", \"Salary\"}, HSTACK(tblEmp[ID], tblEmp[Name], tblEmp[Salary])). VSTACK merges arrays vertically, creating a self-contained complete reporting matrix with headers.",
    "hint": "Use VSTACK for vertical array concatenation.",
    "level": "Advanced",
    "codeExample": "=VSTACK({\"Rep\", \"Sales\"}, HSTACK(A2:A10, B2:B10))"
  },
  {
    "id": "t2_q14",
    "question": "What happens when you concatenate two spilled array ranges with the & operator (e.g. =A2# & \" - \" & B2#)?",
    "shortAnswer": "Excel performs element-by-element vectorized concatenation and spills the resulting matrix.",
    "explanation": "If A2# is a 10-row vector and B2# is a 10-row vector, =A2# & \" - \" & B2# pairs row 1 with row 1, row 2 with row 2, spilling a 10-row concatenated array dynamically.",
    "hint": "The & operator natively broadcasts over dynamic arrays.",
    "level": "Intermediate",
    "codeExample": "=A2# & \" - \" & B2#"
  },
  {
    "id": "t2_q15",
    "question": "How do you concatenate percentage values with descriptive text without losing the percent sign (e.g. \"Growth: 15.4%\")?",
    "shortAnswer": "Use the TEXT function with \"0.0%\" mask: =\"Growth: \" & TEXT(C2, \"0.0%\").",
    "explanation": "Percentages in Excel are stored as decimal fractions (0.154). Concatenating directly produces 'Growth: 0.154'. Wrapping in =TEXT(C2, \"0.0%\") multiplies by 100, formats to 1 decimal place, and adds the '%' symbol.",
    "hint": "Format decimals with TEXT(cell, \"0.0%\").",
    "level": "Beginner",
    "codeExample": "=\"Achievement: \" & TEXT(B2/C2, \"0.0%\")"
  },
  {
    "id": "t2_q16",
    "question": "How can you combine multiple conditions into a single summary string (e.g. \"Approved: 14 | Pending: 3 | Rejected: 1\")?",
    "shortAnswer": "Concatenate COUNTIF calculations with descriptive text headers.",
    "explanation": "=\"Approved: \" & COUNTIF(C2:C50, \"Approved\") & \" | Pending: \" & COUNTIF(C2:C50, \"Pending\") & \" | Rejected: \" & COUNTIF(C2:C50, \"Rejected\"). This creates an instant executive KPI scoreboard in one cell.",
    "hint": "Concatenate COUNTIF results with pipe (' | ') separators.",
    "level": "Intermediate",
    "codeExample": "=\"Approved: \" & COUNTIF(C:C, \"Approved\") & \" | Pending: \" & COUNTIF(C:C, \"Pending\")"
  },
  {
    "id": "t2_q17",
    "question": "How does CONCAT handle boolean TRUE and FALSE values in a range?",
    "shortAnswer": "It converts them to their uppercase text equivalents \"TRUE\" and \"FALSE\" and joins them.",
    "explanation": "If range A1:A3 contains TRUE, FALSE, TRUE, =CONCAT(A1:A3) outputs the string \"TRUEFALSETRUE\".",
    "hint": "Booleans are coerced to text strings in CONCAT.",
    "level": "Beginner",
    "codeExample": "=CONCAT(A1:A3)"
  },
  {
    "id": "t2_q18",
    "question": "How do you concatenate distinct unique values from a column using UNIQUE and TEXTJOIN?",
    "shortAnswer": "Nest UNIQUE inside TEXTJOIN: =TEXTJOIN(\", \", TRUE, UNIQUE(tblSales[Region])).",
    "explanation": "=UNIQUE(tblSales[Region]) extracts distinct regions (e.g. East, West, North), and TEXTJOIN merges them into a clean string \"East, West, North\" without repetition.",
    "hint": "Combine TEXTJOIN with UNIQUE for deduplicated lists.",
    "level": "Intermediate",
    "codeExample": "=TEXTJOIN(\", \", TRUE, UNIQUE(tblSales[Region]))"
  },
  {
    "id": "t2_q19",
    "question": "Why does CONCATENATE throw a #NAME? error in some legacy workbooks opened in modern Excel?",
    "shortAnswer": "CONCATENATE is fully supported for backward compatibility; a #NAME? error indicates a typo in formula spelling or localized function translation issues.",
    "explanation": "Microsoft maintains CONCATENATE for legacy workbooks. A #NAME? error typically means a spelling mistake (e.g. 'CONCATENAT') or using English formula names in localized Excel without automatic translation.",
    "hint": "Check spelling and migrate legacy CONCATENATE to CONCAT or TEXTJOIN.",
    "level": "Beginner",
    "codeExample": "=CONCAT(A1, B1)"
  },
  {
    "id": "t2_q20",
    "question": "How do you construct a clean JSON payload string for an API payload directly inside an Excel cell?",
    "shortAnswer": "Concatenate escaped quotes, key names, and cell values in JSON syntax.",
    "explanation": "=\"{\" & CHAR(34) & \"id\" & CHAR(34) & \":\" & A2 & \",\" & CHAR(34) & \"name\" & CHAR(34) & \":\" & CHAR(34) & B2 & CHAR(34) & \"}\". This constructs valid JSON objects like {\"id\":101,\"name\":\"Swadeep\"} for REST API imports.",
    "hint": "Use CHAR(34) for clean JSON key/value double quotation formatting.",
    "level": "Advanced",
    "codeExample": "=\"{\" & CHAR(34) & \"id\" & CHAR(34) & \":\" & A2 & \"}\""
  },
  {
    "id": "t2_q21",
    "question": "What is the result of concatenating a formula error like #N/A with text using & (e.g. =\"Status: \" & A2 where A2 is #N/A)?",
    "shortAnswer": "The entire concatenation formula returns the #N/A error.",
    "explanation": "Errors in Excel propagate through concatenation. If any referenced cell evaluates to #N/A, #VALUE!, or #REF!, the entire concatenated expression yields that error. Wrap risky cells in IFERROR() or IFNA().",
    "hint": "Wrap error-prone cells in IFERROR(cell, \"N/A\") before concatenating.",
    "level": "Beginner",
    "codeExample": "=\"Status: \" & IFERROR(A2, \"Pending\")"
  },
  {
    "id": "t2_q22",
    "question": "How do you create an automated narrative summary sentence for a financial report?",
    "shortAnswer": "Concatenate text descriptions with dynamic SUM, MAX, and TEXT-formatted numbers.",
    "explanation": "=\"In \" & TEXT(TODAY(), \"mmmm yyyy\") & \", total revenue reached \" & TEXT(SUM(tblSales[Amount]), \"\u20b9 #,##,##0\") & \" across \" & COUNT(tblSales[Amount]) & \" transactions.\"",
    "hint": "Combine narrative text with TEXT-formatted sums and dates.",
    "level": "Intermediate",
    "codeExample": "=\"Net Profit for Q1 was \" & TEXT(B2, \"\u20b9 #,##,##0\") & \" (\" & TEXT(C2, \"0.0%\") & \" margin).\""
  },
  {
    "id": "t2_q23",
    "question": "How can you concatenate a range horizontally vs vertically with TEXTJOIN?",
    "shortAnswer": "TEXTJOIN reads 2D ranges row-by-row (left-to-right, then top-to-bottom) by default.",
    "explanation": "If you supply a 2D range A1:B2 (A1='A', B1='B', A2='C', B2='D'), =TEXTJOIN(\"-\", TRUE, A1:B2) outputs \"A-B-C-D\". To read column-by-column first, wrap in TOCOL(A1:B2, , TRUE).",
    "hint": "Use TOCOL with scan_by_column = TRUE for vertical priority.",
    "level": "Advanced",
    "codeExample": "=TEXTJOIN(\"-\", TRUE, TOCOL(A1:B2, 0, TRUE))"
  },
  {
    "id": "t2_q24",
    "question": "How do you join first and last names with proper handling of missing middle names?",
    "shortAnswer": "Use TEXTJOIN(\" \", TRUE, A2, B2, C2) where B2 is middle name.",
    "explanation": "If middle name (B2) is empty, TEXTJOIN automatically skips it and outputs 'First Last' with exactly one space. If you used A2 & \" \" & B2 & \" \" & C2, you would end up with double spaces ('First  Last').",
    "hint": "TEXTJOIN(\" \", TRUE, First, Middle, Last) prevents double spaces.",
    "level": "Beginner",
    "codeExample": "=TEXTJOIN(\" \", TRUE, A2, B2, C2)"
  },
  {
    "id": "t2_q25",
    "question": "What is the maximum number of text arguments allowed in TEXTJOIN and CONCAT?",
    "shortAnswer": "252 text arguments.",
    "explanation": "Both functions accept up to 252 individual text arguments, but each argument can be an entire range of thousands of cells.",
    "hint": "Up to 252 range/text arguments supported.",
    "level": "Intermediate",
    "codeExample": "=TEXTJOIN(\", \", TRUE, A1:A50, C1:C50, E1:E50)"
  },
  {
    "id": "t2_q26",
    "question": "How do you construct a dynamic hyperlink URL string in Excel?",
    "shortAnswer": "Concatenate the base URL with query parameters and wrap in HYPERLINK().",
    "explanation": "=HYPERLINK(\"https://portal.company.com/orders?id=\" & A2, \"View Order #\" & A2). Clicking the cell opens the browser to the dynamically constructed query URL.",
    "hint": "Use HYPERLINK(url & id, friendly_name).",
    "level": "Intermediate",
    "codeExample": "=HYPERLINK(\"https://erp.com/view?id=\" & A2, \"Open Record \" & A2)"
  },
  {
    "id": "t2_q27",
    "question": "How can you sort items alphabetically before joining them with TEXTJOIN?",
    "shortAnswer": "Nest the SORT function inside TEXTJOIN: =TEXTJOIN(\", \", TRUE, SORT(A2:A10)).",
    "explanation": "=SORT(A2:A10) alphabetizes the range in memory, and TEXTJOIN stitches the sorted array into an alphabetical comma-separated string.",
    "hint": "=TEXTJOIN(\", \", TRUE, SORT(range))",
    "level": "Intermediate",
    "codeExample": "=TEXTJOIN(\", \", TRUE, SORT(UNIQUE(tblStaff[Department])))"
  },
  {
    "id": "t2_q28",
    "question": "How do you concatenate text across 3D worksheet ranges (e.g. Sheet1:Sheet5!A1)?",
    "shortAnswer": "Legacy CONCATENATE failed on 3D ranges; in modern Excel, combine VSTACK across sheets inside TEXTJOIN.",
    "explanation": "=TEXTJOIN(\", \", TRUE, VSTACK(Sheet1!A1, Sheet2!A1, Sheet3!A1)). In Excel 365, VSTACK consolidates values across worksheets for seamless string joining.",
    "hint": "Use VSTACK to feed multiple sheet references into TEXTJOIN.",
    "level": "Advanced",
    "codeExample": "=TEXTJOIN(\", \", TRUE, VSTACK(Q1!A2, Q2!A2, Q3!A2, Q4!A2))"
  },
  {
    "id": "t2_q29",
    "question": "What is the best way to handle null or empty cells when creating key codes like \"DEPT-2024-001\"?",
    "shortAnswer": "Use IF or IFERROR checks to provide fallback placeholder strings.",
    "explanation": "=IF(A2=\"\", \"GEN\", A2) & \"-\" & IF(B2=\"\", \"2024\", B2) & \"-\" & TEXT(C2, \"000\"). This prevents broken keys like '--001' when data is missing.",
    "hint": "Provide fallback defaults with IF(cell=\"\", \"DEFAULT\", cell).",
    "level": "Intermediate",
    "codeExample": "=IF(A2=\"\", \"NA\", A2) & \"-\" & TEXT(B2, \"0000\")"
  },
  {
    "id": "t2_q30",
    "question": "How do you combine TEXTJOIN with LAMBDA/BYROW for multi-row automated concatenated reporting?",
    "shortAnswer": "Use BYROW with LAMBDA to evaluate TEXTJOIN row by row across a table.",
    "explanation": "=BYROW(A2:E50, LAMBDA(row, TEXTJOIN(\", \", TRUE, row))). This spills a single-column concatenated summary for every individual row across 50 records in one formula.",
    "hint": "Use BYROW(table, LAMBDA(r, TEXTJOIN(\", \", TRUE, r)))",
    "level": "Expert",
    "codeExample": "=BYROW(tblSales[[Q1]:[Q4]], LAMBDA(r, TEXTJOIN(\" / \", TRUE, r)))"
  }
];

export default topic2Questions;
