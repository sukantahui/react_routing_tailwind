const questions = [
  {
    question: "What is the primary purpose of a lookup function?",
    shortAnswer: "To search for a value in a reference table and return a corresponding result from another column.",
    explanation: "Lookup functions automate data retrieval by matching a key (lookup value) against a reference table's first column and returning a related value. This avoids manual searching and reduces errors.",
    hint: "Think of a dictionary: you look up a word (key) to get its definition (result).",
    level: "basic",
    codeExample: "=VLOOKUP(\"STU-101\", A2:B10, 2, FALSE)"
  },
  {
    question: "What defines a 'reference table' in the context of lookup functions?",
    shortAnswer: "A structured range where rows represent unique records and the first column contains the lookup keys.",
    explanation: "A reference table must have a clear key column (usually the first column) with unique or searchable identifiers. Other columns hold attributes related to that key. Example: Student ID → Name, Grade.",
    hint: "Observe how a school attendance sheet is organized: Roll number is the key, then student name, then present/absent.",
    level: "basic",
    codeExample: "Range A2:C100 where column A = Product ID, B = Product Name, C = Price"
  },
  {
    question: "Why should the lookup column ideally contain unique values?",
    shortAnswer: "Most lookup functions return only the first match; duplicate keys can lead to ambiguous or incorrect results.",
    explanation: "If duplicate keys exist, the function stops at the first occurrence and ignores others. This can cause wrong data association (e.g., two students with same ID but different names). Uniqueness guarantees deterministic output.",
    hint: "Imagine searching for 'John' in a class list with two Johns – which one gets the grade?",
    level: "intermediate",
    codeExample: "VLOOKUP(\"Manager\", A2:B100, 2, FALSE) – if 'Manager' appears multiple times, only first department is returned."
  },
  {
    question: "What happens when a lookup value is not found in the reference table?",
    shortAnswer: "The function returns #N/A error (or a custom message if wrapped with IFERROR).",
    explanation: "#N/A indicates 'Not Available' – the lookup value doesn't exist in the first column. This often happens due to typos, extra spaces, or mismatched data types.",
    hint: "Try changing 'STU-101' to 'STU-999' in a well-formed table – you'll see #N/A.",
    level: "basic",
    codeExample: "=IFERROR(VLOOKUP(E2, A2:B100, 2, FALSE), \"Not Found\")"
  },
  {
    question: "What is the difference between exact match and approximate match?",
    shortAnswer: "Exact match requires an identical value; approximate match finds the closest smaller value (requires sorted lookup column).",
    explanation: "Exact match (4th argument FALSE/0) is used for IDs, codes, texts. Approximate match (TRUE/1) is for ranges like tax brackets, grades, or commission tiers – the lookup column must be sorted ascending.",
    hint: "Think of a grading scale: 90+ = A, 80-89 = B. Approximate match finds the right bracket without listing every possible score.",
    level: "intermediate",
    codeExample: "=VLOOKUP(85, $D$2:$E$6, 2, TRUE) where D2:D6 = {0,60,70,80,90} and E2:E6 = {F,D,C,B,A}"
  },
  {
    question: "Why should you use absolute references ($) with lookup table arrays?",
    shortAnswer: "To prevent the table range from shifting when copying the formula to other cells.",
    explanation: "Without $, dragging a formula changes relative references, causing the lookup range to move or shrink. Using $A$2:$D$100 locks the range, ensuring consistent results across rows.",
    hint: "Try copying =VLOOKUP(A2, B2:C100, 2, FALSE) down – the second argument becomes B3:C101, breaking the lookup.",
    level: "basic",
    codeExample: "=VLOOKUP(A2, $B$2:$C$100, 2, FALSE) – now safe to drag."
  },
  {
    question: "How can data type mismatches cause lookup failures?",
    shortAnswer: "Numbers stored as text or vice versa prevent matches because '123' ≠ 123.",
    explanation: "If lookup column contains numbers but the lookup value is text (or vice versa), no match is found. Use VALUE() or TEXT() to coerce types, or ensure consistency at source.",
    hint: "Check cell alignment: numbers default right, text left. Use ISTEXT() or ISNUMBER() to diagnose.",
    level: "intermediate",
    codeExample: "=VLOOKUP(TEXT(A2,\"0\"), $B$2:$C$100, 2, FALSE) to convert number to text."
  },
  {
    question: "What are the limitations of VLOOKUP that beginners often overlook?",
    shortAnswer: "VLOOKUP can only look to the right, returns first match only, and breaks if columns are inserted/deleted.",
    explanation: "VLOOKUP's return column is a fixed index number; inserting a column shifts all indexes. Also, it cannot look up values to the left of the key column. INDEX-MATCH or XLOOKUP solve these.",
    hint: "Think: What if you need to find an employee's ID based on their name? Name is to the left of ID – VLOOKUP can't do it directly.",
    level: "advanced",
    codeExample: "VLOOKUP can't handle =VLOOKUP(\"Swadeep\", B2:C10, 1, FALSE) because return column 1 is the same as lookup column – but it's actually to the left? No, VLOOKUP only goes right."
  },
  {
    question: "How do you handle extra spaces that cause #N/A errors?",
    shortAnswer: "Use TRIM() on both lookup value and table column, or clean data with Find & Replace.",
    explanation: "Spaces like 'STU-101 ' (trailing space) won't match 'STU-101'. TRIM removes extra spaces. For large datasets, use Power Query or Data > Text to Columns to clean.",
    hint: "Try =VLOOKUP(TRIM(A2), TRIM($B$2:$C$100), 2, FALSE) – but TRIM on array requires array formula in older Excel.",
    level: "intermediate",
    codeExample: "=VLOOKUP(TRIM(A2), $B$2:$C$100, 2, FALSE) – works if you ensure table data is clean beforehand."
  },
  {
    question: "What is a common mistake when using approximate match?",
    shortAnswer: "Forgetting to sort the lookup column ascending, leading to incorrect or #N/A results.",
    explanation: "Approximate match assumes the first column is sorted ascending; if not, it may return a wrong value or #N/A. This is the #1 source of errors in tax bracket calculations.",
    hint: "Always sort your rate table by the lower bound column from smallest to largest.",
    level: "intermediate",
    codeExample: "For commission rates: threshold column must be 0, 5000, 10000, 20000 sorted ascending."
  },
  {
    question: "How can you name a table range to improve readability?",
    shortAnswer: "Use Excel's 'Create Table' (Ctrl+T) or Name Manager to assign a meaningful name like 'tblStudents'.",
    explanation: "Named ranges make formulas self-documenting: =VLOOKUP(A2, tblStudents, 2, FALSE) is clearer than =VLOOKUP(A2, $B$2:$D$100, 2, FALSE). Tables also auto-expand when new rows added.",
    hint: "Select the range, press Ctrl+T, then go to Table Design tab and rename from 'Table1' to 'StudentData'.",
    level: "basic",
    codeExample: "=VLOOKUP(A2, StudentData, 2, FALSE) where StudentData is a named table."
  },
  {
    question: "What does the 'range_lookup' argument (4th argument) actually do?",
    shortAnswer: "It controls whether the function requires an exact match (FALSE/0) or allows an approximate match (TRUE/1).",
    explanation: "When TRUE (or omitted) and the first column is sorted, VLOOKUP finds the largest value <= lookup value. When FALSE, it finds an exact match and returns #N/A if none exists.",
    hint: "Most real-world lookups (like student IDs) need FALSE. Only use TRUE for banded lookups like discount tiers.",
    level: "basic",
    codeExample: "Exact: =VLOOKUP(\"A2\", grades, 2, FALSE). Approx: =VLOOKUP(86, gradeBracket, 2, TRUE)."
  },
  {
    question: "What is the difference between a dynamic array and a static range in lookups?",
    shortAnswer: "Dynamic arrays (like Excel Tables) auto-adjust size; static ranges must be manually updated when data changes.",
    explanation: "If you add a new row to a static range $A$2:$D$100, your lookup won't see it. Using a Table or named dynamic range (via OFFSET/INDEX) ensures the lookup always covers all data.",
    hint: "Try converting your range to a Table (Ctrl+T) and watch your VLOOKUP automatically include new records.",
    level: "advanced",
    codeExample: "=VLOOKUP(E2, tblSales, 3, FALSE) – tblSales expands as rows are added."
  },
  {
    question: "How can you debug a #N/A error step by step?",
    shortAnswer: "Check: 1) existence of value, 2) extra spaces, 3) data type mismatch, 4) column index correctness, 5) sorted order for approximate match.",
    explanation: "Use Evaluate Formula (Formulas tab) to step through. Also try =ISNUMBER(MATCH(lookup_value, lookup_column, 0)) to test existence independently.",
    hint: "Observe carefully: Does the lookup value actually appear in the first column? Use conditional formatting to highlight duplicates or missing items.",
    level: "intermediate",
    codeExample: "=MATCH(A2, B2:B100, 0) returns position or #N/A – helps isolate the problem."
  },
  {
    question: "What is a 'two-way lookup' and why is VLOOKUP insufficient?",
    shortAnswer: "Two-way lookup uses both row and column criteria (like student name and subject). VLOOKUP alone can't handle variable columns; INDEX-MATCH or XLOOKUP are needed.",
    explanation: "VLOOKUP returns a fixed column number. For dynamic column matching (e.g., 'Math' vs 'Science'), combine MATCH with VLOOKUP or use INDEX-MATCH-MATCH.",
    hint: "Think of a grade matrix: rows = students, columns = subjects. To find Susmita's Physics score, you need to find the row for Susmita and column for Physics.",
    level: "advanced",
    codeExample: "=INDEX(grade_matrix, MATCH(\"Susmita\", student_col, 0), MATCH(\"Physics\", subject_row, 0))"
  },
  {
    question: "Why does VLOOKUP sometimes return the wrong value even with no error?",
    shortAnswer: "Usually because of unsorted data with approximate match (TRUE/1) or duplicate keys returning the first match, not the intended one.",
    explanation: "If you accidentally omit the 4th argument or set it to TRUE, VLOOKUP will perform an approximate match on unsorted data – leading to seemingly correct but actually wrong results. Always use FALSE for exact lookups unless you fully understand approximate.",
    hint: "Try this: lookup 'Shyamnagar' in an unsorted list with TRUE – it might return 'Ichapur' because the algorithm stops at a lower value.",
    level: "advanced",
    codeExample: "=VLOOKUP(\"Naihati\", A2:B10, 2, TRUE) on unsorted A column can return data from a different city."
  },
  {
    question: "What is the difference between VLOOKUP and HLOOKUP?",
    shortAnswer: "VLOOKUP searches vertically (down rows) in the first column; HLOOKUP searches horizontally (across columns) in the first row.",
    explanation: "Use VLOOKUP when your reference table is organized by rows (typical). Use HLOOKUP when data is transposed (e.g., months as columns, products as rows).",
    hint: "Observe the shape: VLOOKUP for tall tables, HLOOKUP for wide tables.",
    level: "basic",
    codeExample: "=HLOOKUP(\"Feb\", $B$1:$M$3, 2, FALSE) where row1 = months, row2 = sales."
  },
  {
    question: "How can you use VLOOKUP across multiple sheets?",
    shortAnswer: "Prefix the table range with the sheet name, e.g., 'Sheet2'!$A$2:$B$100.",
    explanation: "VLOOKUP can reference any sheet in the same workbook. For cross-workbook, include the file path, but it's fragile – better to use Power Query or consolidate data.",
    hint: "Try =VLOOKUP(A2, 'Reference Data'!$A$2:$B$100, 2, FALSE) – note the single quotes if sheet name has spaces.",
    level: "intermediate",
    codeExample: "=VLOOKUP(A2, 'Student Master'!$A$2:$D$500, 3, FALSE)"
  },
  {
    question: "What is the column index number in VLOOKUP and what happens if it exceeds the table width?",
    shortAnswer: "It specifies which column (from leftmost of the table) to return. If greater than the number of columns, VLOOKUP returns #REF!.",
    explanation: "The first column of the table_array is column 1, the second is column 2, etc. Asking for column 5 when table has only 4 columns yields #REF!.",
    hint: "Always count columns starting from the lookup column as 1. To avoid errors, use COLUMNS() to verify.",
    level: "basic",
    codeExample: "If table is A2:C100, valid index numbers are 1,2,3. =VLOOKUP(E2, A2:C100, 4, FALSE) → #REF!."
  },
  {
    question: "How does VLOOKUP behave with merged cells in the lookup column?",
    shortAnswer: "It treats the merged cell as containing only the top-left cell's value; other positions appear as empty, causing #N/A.",
    explanation: "Merged cells are evil for lookups. Unmerge and fill down values, or use Center Across Selection instead of merging.",
    hint: "If you must keep visual merging, create a helper column with the repeated value and use that as lookup column.",
    level: "intermediate",
    codeExample: "Instead of merging A2:A5, put the same value in each cell and use 'Center Across Selection' from Format Cells > Alignment."
  },
  {
    question: "What is the advantage of using INDEX-MATCH over VLOOKUP for leftward lookups?",
    shortAnswer: "INDEX-MATCH can return a value from any column, left or right of the lookup column, because MATCH finds the row and INDEX retrieves from any column.",
    explanation: "VLOOKUP is limited to columns to the right. INDEX-MATCH decouples the lookup column and return column completely.",
    hint: "Think: You have employee name in column B, ID in column A. To find ID based on name, VLOOKUP can't; INDEX-MATCH does easily.",
    level: "intermediate",
    codeExample: "=INDEX(A:A, MATCH(\"Swadeep\", B:B, 0)) – finds Swadeep's ID from column A."
  },
  {
    question: "How does Excel treat the lookup value if it is a blank cell?",
    shortAnswer: "If lookup value is blank, VLOOKUP will try to match an empty string in the first column – only works if there are truly blank cells.",
    explanation: "Blank is considered as a value (empty text). If your first column contains blanks, it may return the corresponding row. Usually, this is not intended and leads to confusion.",
    hint: "Avoid blank lookup values by using IF(A2=\"\", \"No Key\", VLOOKUP(...)).",
    level: "intermediate",
    codeExample: "=IF(A2=\"\", \"Missing\", VLOOKUP(A2, $B$2:$C$100, 2, FALSE))"
  },
  {
    question: "What is the maximum number of rows VLOOKUP can handle efficiently?",
    shortAnswer: "Excel can handle millions of rows, but VLOOKUP performance degrades significantly beyond 100,000 rows, especially with approximate match.",
    explanation: "VLOOKUP scans the first column linearly for exact match (O(n)). For large data, consider using binary search (approximate match on sorted data) or XLOOKUP, which is optimized. Better yet, use Power Pivot or database queries.",
    hint: "If your data exceeds 50k rows, sort it and use approximate match with a helper column for exact logic – or upgrade to INDEX-MATCH with binary search.",
    level: "advanced",
    codeExample: "For exact match on 500k rows, =XLOOKUP(A2, lookup_col, return_col) is much faster."
  },
  {
    question: "Can VLOOKUP work with wildcards (*, ?)?",
    shortAnswer: "Yes, but only with exact match (FALSE/0). Use * for any sequence, ? for single character.",
    explanation: "Wildcards allow partial matches. For example, VLOOKUP(\"*Swadeep*\", ...) finds any cell containing 'Swadeep'. Note: This works only if the 4th argument is FALSE.",
    hint: "Try =VLOOKUP(\"Deb*\", $A$2:$B$100, 2, FALSE) to find first name starting with 'Deb'.",
    level: "intermediate",
    codeExample: "=VLOOKUP(\"*Naihati\", A2:B100, 2, FALSE) matches 'Uttar Naihati'."
  },
  {
    question: "Why does VLOOKUP sometimes return the wrong column when columns are inserted?",
    shortAnswer: "Because the column index is a hardcoded number; inserting a column shifts positions but the index doesn't auto-adjust.",
    explanation: "If your formula is =VLOOKUP(A2, B2:E100, 4, FALSE) and you insert a new column between B and C, the return column index 4 now points to the original column 5, causing wrong data. Use MATCH or Excel Tables with structured references to avoid.",
    hint: "Observe carefully: Insert a column and see the formula update? Only if you used a Table and referenced by header name.",
    level: "advanced",
    codeExample: "In a Table, use =VLOOKUP([@ID], Table2, MATCH(\"Price\", Table2[#Headers], 0), FALSE) – dynamic column position."
  },
  {
    question: "What is the difference between VLOOKUP with FALSE and using the MATCH function?",
    shortAnswer: "VLOOKUP returns a value; MATCH returns the relative position (row number) of the lookup value within a range.",
    explanation: "MATCH is often used to feed a row number to INDEX. VLOOKUP combines both search and retrieval but is less flexible.",
    hint: "Try =MATCH(\"Abhronila\", A:A, 0) – it tells you which row Abhronila is in.",
    level: "basic",
    codeExample: "INDEX(B:B, MATCH(\"Abhronila\", A:A, 0)) is equivalent to VLOOKUP but can go left."
  },
  {
    question: "How do you perform a case-sensitive lookup in Excel?",
    shortAnswer: "VLOOKUP is not case-sensitive. Use EXACT with INDEX-MATCH in an array formula (or XLOOKUP with EXACT).",
    explanation: "For case-sensitive matching, combine INDEX, MATCH, and EXACT: =INDEX(return_range, MATCH(TRUE, EXACT(lookup_value, lookup_range), 0)). In newer Excel, XLOOKUP supports exact match with case-sensitive option.",
    hint: "Try changing 'Swadeep' to 'swadeep' – VLOOKUP still finds it. For case matters, use array formula with Ctrl+Shift+Enter (legacy).",
    level: "advanced",
    codeExample: "=INDEX(C:C, MATCH(TRUE, EXACT(\"Swadeep\", A:A), 0)) – press Ctrl+Shift+Enter."
  },
  {
    question: "What is the helper column technique to enable VLOOKUP with two criteria?",
    shortAnswer: "Create a new column that concatenates the two criteria (e.g., =A2&B2) and use that as lookup column.",
    explanation: "VLOOKUP cannot natively handle multiple criteria. By joining key fields into a unique identifier (like studentID&subject), you can then perform a simple VLOOKUP on the helper column.",
    hint: "Think of combining 'RollNo' and 'Subject' to get a unique key for each grade row.",
    level: "intermediate",
    codeExample: "Add column D: =A2&\"|\"&B2, then =VLOOKUP(E2&\"|\"&F2, D:C, 2, FALSE)."
  },
  {
    question: "How can you avoid #N/A errors in a column of VLOOKUPs when some lookups fail?",
    shortAnswer: "Wrap the VLOOKUP with IFERROR to return a default value like 0 or 'Not found'.",
    explanation: "IFERROR catches any error (#N/A, #REF, #VALUE) and returns a friendly message. This makes reports cleaner.",
    hint: "Try =IFERROR(VLOOKUP(A2, Table, 2, FALSE), \"Missing\") – no ugly errors.",
    level: "basic",
    codeExample: "=IFERROR(VLOOKUP(A2, students, 3, FALSE), \"Not enrolled\")"
  },
  {
    question: "What is the difference between using VLOOKUP on a Table vs a normal range regarding column references?",
    shortAnswer: "With a Table, you can refer to column headers, and the range auto-expands; with a normal range, you need absolute references.",
    explanation: "When you use =VLOOKUP([@ID], tblSales, 2, FALSE), the column index is fixed but if you insert a column inside the table, the index still points to the same relative column? Actually, VLOOKUP inside a table still uses column index number. Better to use XLOOKUP or INDEX-MATCH with structured references for dynamic columns.",
    hint: "Try using =VLOOKUP([@ID], tblSales, MATCH(\"Price\", tblSales[#Headers], 0), FALSE) – the MATCH makes the column index dynamic.",
    level: "advanced",
    codeExample: "=VLOOKUP([@Product], Products[#All], COLUMNS(Products[#All]), FALSE) – returns last column."
  },
  {
    question: "How does VLOOKUP behave when the table_array includes hidden rows or filtered data?",
    shortAnswer: "VLOOKUP ignores hidden rows and filtered out rows – it sees the entire range as if no filtering applied.",
    explanation: "VLOOKUP always looks at the underlying data, not the visible filtered subset. If you need to look only at visible rows, you need SUBTOTAL or AGGREGATE with helper columns.",
    hint: "Observe carefully: Filter your table and run VLOOKUP – it still finds values from hidden rows.",
    level: "advanced",
    codeExample: "No direct workaround; consider using =INDEX(visible_range, MATCH(...)) after creating a helper column of visible flags."
  }
];

export default questions;