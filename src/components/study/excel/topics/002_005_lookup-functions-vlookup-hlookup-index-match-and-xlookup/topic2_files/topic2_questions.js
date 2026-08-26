const questions = [
  {
    question: "What are the four arguments of VLOOKUP in order?",
    shortAnswer: "lookup_value, table_array, col_index_num, range_lookup",
    explanation: "The lookup_value is what you search for (must be in first column of table_array). table_array is the range containing the data. col_index_num is the column number (starting at 1) from which to return a value. range_lookup (optional) is TRUE for approximate match, FALSE for exact.",
    hint: "Remember: 'Lookup Table Column' – LTC.",
    level: "basic",
    codeExample: "=VLOOKUP(A2, $B$2:$D$100, 3, FALSE)"
  },
  {
    question: "What happens if col_index_num is less than 1?",
    shortAnswer: "VLOOKUP returns #VALUE! error.",
    explanation: "Column index must be at least 1. col_index_num = 1 refers to the first column of the table_array (the lookup column itself). Values less than 1 are invalid.",
    hint: "Try =VLOOKUP(A2, B2:D10, 0, FALSE) – you'll get #VALUE!.",
    level: "basic",
    codeExample: "=VLOOKUP(A2, B2:D10, 0, FALSE) → #VALUE!"
  },
  {
    question: "Why does VLOOKUP sometimes return #REF! error?",
    shortAnswer: "col_index_num is greater than the number of columns in table_array.",
    explanation: "If your table_array has 3 columns (e.g., A, B, C) and you ask for col_index_num = 4, Excel cannot return a value because there is no 4th column.",
    hint: "Count the columns in your table_array before setting col_index_num.",
    level: "intermediate",
    codeExample: "=VLOOKUP(A2, A2:C10, 4, FALSE) → #REF! because table_array has only 3 columns."
  },
  {
    question: "What is the difference between using FALSE and TRUE for range_lookup?",
    shortAnswer: "FALSE requires an exact match; TRUE (or omitted) finds the closest match (requires first column sorted ascending).",
    explanation: "FALSE is for exact lookups like IDs or codes. TRUE is for approximate matches like tax brackets, grade boundaries, or commission rates where the lookup column is numeric and sorted.",
    hint: "Always use FALSE unless you are 100% sure you need approximate.",
    level: "intermediate",
    codeExample: "Exact: =VLOOKUP(A2, B2:C100, 2, FALSE). Approx: =VLOOKUP(85, D2:E10, 2, TRUE) where D2:D10 = {0,60,70,80,90}."
  },
  {
    question: "Can VLOOKUP look up a value from a column to the left of the lookup column?",
    shortAnswer: "No, VLOOKUP can only return values from columns to the right of the lookup column.",
    explanation: "The lookup column must be the first (leftmost) column of table_array. It cannot return values from columns to its left. Use INDEX-MATCH or XLOOKUP for leftward lookups.",
    hint: "If you need to get an employee ID from a name, and ID is left of name, VLOOKUP cannot do it directly.",
    level: "basic",
    codeExample: "VLOOKUP cannot handle =VLOOKUP(\"Swadeep\", B2:C10, 1, FALSE) because column B has names, column A has IDs – can't get ID."
  },
  {
    question: "How does VLOOKUP treat merged cells in the lookup column?",
    shortAnswer: "It treats the merged cell as having the value only in the top-left cell; other positions are empty, causing #N/A.",
    explanation: "Merged cells are problematic for lookups. Unmerge and fill down, or use 'Center Across Selection' instead.",
    hint: "If you must merge, create a helper column with the repeated value and use that as lookup column.",
    level: "advanced",
    codeExample: "Avoid merging; instead use =A2 in helper column and fill down."
  },
  {
    question: "What is the maximum number of rows VLOOKUP can handle efficiently?",
    shortAnswer: "Excel can handle millions, but performance degrades beyond 100,000 rows, especially with approximate match.",
    explanation: "Exact match VLOOKUP scans linearly (O(n)). For large data, sort and use approximate match with binary search, or use XLOOKUP/INDEX-MATCH.",
    hint: "If your data >50k rows, consider Power Query or database connections.",
    level: "expert",
    codeExample: "For large exact lookups, XLOOKUP or INDEX-MATCH is faster."
  },
  {
    question: "Why do I get #N/A when the value clearly exists in the lookup column?",
    shortAnswer: "Possible causes: extra spaces, data type mismatch (text vs number), or the lookup column is not the first column of table_array.",
    explanation: "Check for leading/trailing spaces using TRIM(). Ensure numbers are not stored as text. Verify that your table_array starts with the column containing the lookup values.",
    hint: "Use =MATCH(lookup_value, lookup_column, 0) to see if it finds the position.",
    level: "intermediate",
    codeExample: "=VLOOKUP(TRIM(A2), TRIM($B$2:$C$100), 2, FALSE) – but TRIM on array requires array formula in older Excel."
  },
  {
    question: "What is the advantage of using an Excel Table as table_array?",
    shortAnswer: "Table ranges auto-expand when rows are added, and you can use structured references (e.g., Table1[Price]).",
    explanation: "When you add a new row to a Table, any VLOOKUP referencing the Table name automatically includes it. Also, formulas become more readable.",
    hint: "Press Ctrl+T to convert a range to a Table, then refer to it as =VLOOKUP(A2, Table1, 3, FALSE).",
    level: "intermediate",
    codeExample: "=VLOOKUP(A2, tblProducts, MATCH(\"Price\", tblProducts[#Headers], 0), FALSE)"
  },
  {
    question: "How can you use VLOOKUP with wildcards?",
    shortAnswer: "Use * (any sequence) or ? (single character) inside the lookup_value when range_lookup is FALSE.",
    explanation: "Wildcards allow partial matches. For example, =VLOOKUP(\"*phone*\", A:B, 2, FALSE) finds any product containing 'phone'.",
    hint: "Wildcards do not work with approximate match (TRUE).",
    level: "advanced",
    codeExample: "=VLOOKUP(\"P10*\", $A$2:$B$100, 2, FALSE) returns first product starting with 'P10'."
  },
  {
    question: "What is the difference between VLOOKUP and HLOOKUP?",
    shortAnswer: "VLOOKUP searches vertically down the first column; HLOOKUP searches horizontally across the first row.",
    explanation: "Use VLOOKUP for data in rows (most common). Use HLOOKUP for data in columns (e.g., months as column headers).",
    hint: "Look at the shape of your data – tall tables → VLOOKUP, wide tables → HLOOKUP.",
    level: "basic",
    codeExample: "=HLOOKUP(\"Feb\", $B$1:$M$3, 2, FALSE) where row1 = months, row2 = sales."
  },
  // Add more to reach 30. Below are additional to complete 30 questions.
  {
    question: "How can you avoid #N/A when a lookup value is missing?",
    shortAnswer: "Wrap VLOOKUP in IFERROR to return a custom message or 0.",
    explanation: "IFERROR catches any error and returns the value you specify, making your sheet cleaner.",
    hint: "=IFERROR(VLOOKUP(...), \"Not Found\")",
    level: "basic",
    codeExample: "=IFERROR(VLOOKUP(E2, A:B, 2, FALSE), \"Missing\")"
  },
  {
    question: "What is the difference between using FALSE and 0 for range_lookup?",
    shortAnswer: "They are identical – both indicate exact match.",
    explanation: "Excel accepts 0 or FALSE for exact match, and 1 or TRUE for approximate match.",
    hint: "Use FALSE for clarity, but 0 works too.",
    level: "basic",
    codeExample: "=VLOOKUP(A2, B:C, 2, 0) is the same as =VLOOKUP(A2, B:C, 2, FALSE)"
  },
  {
    question: "Does VLOOKUP work with dates?",
    shortAnswer: "Yes, because dates are stored as serial numbers.",
    explanation: "You can look up a date just like a number. Ensure the lookup column contains dates formatted consistently.",
    hint: "=VLOOKUP(DATE(2025,1,15), A:B, 2, FALSE)",
    level: "intermediate",
    codeExample: "=VLOOKUP(TODAY(), A:B, 2, TRUE) – finds the latest date up to today."
  },
  {
    question: "Why does VLOOKUP sometimes return 0 when the cell is blank?",
    shortAnswer: "VLOOKUP returns 0 if the referenced cell in the return column is empty.",
    explanation: "Blank cells in the return column are treated as 0. To show blank instead, use IF(VLOOKUP(...)=\"\", \"\", VLOOKUP(...)).",
    hint: "Wrap with IF to preserve blank display.",
    level: "advanced",
    codeExample: "=IF(VLOOKUP(A2, B:C, 2, FALSE)=\"\", \"\", VLOOKUP(A2, B:C, 2, FALSE))"
  },
  {
    question: "Can VLOOKUP be used across multiple sheets?",
    shortAnswer: "Yes, by including the sheet name in table_array.",
    explanation: "Example: =VLOOKUP(A2, 'Sheet2'!$A$2:$B$100, 2, FALSE). The sheet name is followed by an exclamation mark.",
    hint: "Single quotes needed if sheet name has spaces.",
    level: "intermediate",
    codeExample: "=VLOOKUP(A2, 'Product Data'!$A$2:$C$500, 3, FALSE)"
  },
  {
    question: "What is the main limitation of VLOOKUP that INDEX-MATCH solves?",
    shortAnswer: "VLOOKUP cannot look to the left; INDEX-MATCH can retrieve from any column.",
    explanation: "INDEX-MATCH separates the lookup column and return column, allowing you to return values from columns to the left of the lookup column.",
    hint: "INDEX-MATCH is also faster for large datasets.",
    level: "advanced",
    codeExample: "=INDEX(A:A, MATCH(\"Swadeep\", B:B, 0)) – gets ID from column A based on name in B."
  },
  // Continue to 30... (abbreviated for brevity, but you can copy and extend the pattern)
  {
    question: "How to debug a VLOOKUP that returns #N/A?",
    shortAnswer: "Use Evaluate Formula, check data types, spaces, and table_array alignment.",
    explanation: "Step through with Formulas > Evaluate Formula. Also test with =COUNTIF(lookup_column, lookup_value) to see if the value exists.",
    hint: "Try =ISNUMBER(MATCH(...)) to verify existence.",
    level: "intermediate",
    codeExample: "=MATCH(A2, B:B, 0) returns position or #N/A."
  },
  {
    question: "What is the difference between VLOOKUP and XLOOKUP?",
    shortAnswer: "XLOOKUP is more flexible: it can look left or right, has default exact match, and allows custom not‑found messages.",
    explanation: "XLOOKUP (Excel 365) replaces VLOOKUP and HLOOKUP. It does not require column index numbers and works with vertical or horizontal arrays.",
    hint: "XLOOKUP is the modern replacement.",
    level: "advanced",
    codeExample: "=XLOOKUP(A2, B:B, C:C, \"Not found\")"
  },
  {
    question: "Why should you avoid using whole column references (e.g., A:A) in VLOOKUP?",
    shortAnswer: "It slows down calculation because Excel examines over a million cells.",
    explanation: "Use a specific range or Excel Table. Whole column references are convenient but inefficient.",
    hint: "Use $A$2:$A$1000 instead of A:A.",
    level: "advanced",
    codeExample: "=VLOOKUP(A2, $B$2:$D$10000, 3, FALSE) is much faster than B:D."
  },
  {
    question: "Can VLOOKUP return multiple columns at once?",
    shortAnswer: "No, a single VLOOKUP returns only one column. Use multiple VLOOKUP calls or an array formula (Ctrl+Shift+Enter) in older Excel.",
    explanation: "In Excel 365, you can use =VLOOKUP(...) and spill, but it still returns one column per formula.",
    hint: "For multiple columns, use XLOOKUP with a range for return_array.",
    level: "advanced",
    codeExample: "In Excel 365: =XLOOKUP(A2, B:B, C:E) returns three columns."
  },
  {
    question: "What is the default behavior if range_lookup is omitted?",
    shortAnswer: "It defaults to TRUE (approximate match).",
    explanation: "This is a common source of errors because users often forget to specify FALSE. Always include FALSE for exact matches.",
    hint: "Never omit the fourth argument unless you really want approximate match.",
    level: "basic",
    codeExample: "=VLOOKUP(A2, B:C, 2) is the same as =VLOOKUP(A2, B:C, 2, TRUE)"
  },
  {
    question: "How does VLOOKUP treat duplicate lookup values?",
    shortAnswer: "It returns the first matching row and ignores subsequent duplicates.",
    explanation: "If two rows have the same lookup value, only the first is considered. This can lead to incorrect data if duplicates exist.",
    hint: "Ensure your lookup column has unique values.",
    level: "intermediate",
    codeExample: "VLOOKUP(101, A:B, 2, FALSE) returns the value from the first row with 101."
  },
  {
    question: "Can VLOOKUP be used with a named range that is dynamic (e.g., using OFFSET)?",
    shortAnswer: "Yes, but complex dynamic ranges can slow performance. Excel Tables are a better solution.",
    explanation: "You can define a named range with OFFSET and COUNTA, but it's volatile and recalculates often. Use Tables for automatic expansion.",
    hint: "Press Ctrl+T to create a Table, then refer to its name.",
    level: "expert",
    codeExample: "=VLOOKUP(A2, DynamicRange, 2, FALSE) where DynamicRange = OFFSET(Sheet1!$A$1,0,0,COUNTA(Sheet1!$A:$A),4)"
  },
  {
    question: "Why might VLOOKUP return a wrong value when using approximate match on unsorted data?",
    shortAnswer: "Approximate match assumes the first column is sorted ascending; if not, the result is unpredictable and can be wrong without error.",
    explanation: "Excel uses binary search for approximate match. If the column is not sorted, it may stop early and return an incorrect value.",
    hint: "Always sort the lookup column ascending when using TRUE.",
    level: "advanced",
    codeExample: "Sort your tax bracket table by lower bound before using =VLOOKUP(income, brackets, 2, TRUE)."
  },
  {
    question: "How to perform a case‑sensitive VLOOKUP?",
    shortAnswer: "Use an array formula with EXACT and MATCH, or XLOOKUP with a case‑sensitive option.",
    explanation: "VLOOKUP itself is not case‑sensitive. In legacy Excel, use =INDEX(return_range, MATCH(TRUE, EXACT(lookup_value, lookup_range), 0)).",
    hint: "Press Ctrl+Shift+Enter for array formula.",
    level: "expert",
    codeExample: "=INDEX(C:C, MATCH(TRUE, EXACT(\"Swadeep\", A:A), 0))"
  },
  {
    question: "Can VLOOKUP handle errors inside the lookup column?",
    shortAnswer: "If any cell in the lookup column contains an error (e.g., #DIV/0!), VLOOKUP may also return an error.",
    explanation: "Errors propagate. Clean your data using IFERROR before performing lookups.",
    hint: "Use IFERROR on the lookup column to replace errors with blank or a default.",
    level: "advanced",
    codeExample: "Create a helper column =IFERROR(original_column, \"\") and use that as lookup column."
  },
  {
    question: "What is the difference between VLOOKUP and LOOKUP?",
    shortAnswer: "LOOKUP is an older function that always uses approximate match; VLOOKUP offers exact match and is more flexible.",
    explanation: "LOOKUP has a different syntax (vector or array) and is rarely used today. VLOOKUP is preferred for exact lookups.",
    hint: "Avoid LOOKUP – use VLOOKUP, XLOOKUP, or INDEX-MATCH.",
    level: "advanced",
    codeExample: "=LOOKUP(A2, B:B, C:C) – approximate only."
  },
  {
    question: "How to use VLOOKUP to find the last occurrence of a value?",
    shortAnswer: "VLOOKUP cannot directly find the last occurrence; it returns the first. Use XLOOKUP with search mode -1 or use an array formula with MAX.",
    explanation: "In Excel 365, =XLOOKUP(value, lookup_column, return_column, , , -1) finds from last to first.",
    hint: "For older Excel, use =LOOKUP(2,1/(lookup_column=value), return_column).",
    level: "expert",
    codeExample: "=LOOKUP(2,1/(A2:A100=\"Swadeep\"), B2:B100) returns last match."
  },
  {
    question: "Why is VLOOKUP considered a volatile function?",
    shortAnswer: "It is not volatile (unlike OFFSET, INDIRECT). But it recalculates when any cell in its referenced range changes.",
    explanation: "VLOOKUP recalculates when the source data changes, but it does not force unnecessary recalculations like truly volatile functions.",
    hint: "Use VLOOKUP with ranges, not entire columns, to improve performance.",
    level: "advanced",
    codeExample: "No special note – VLOOKUP is non‑volatile but still processor‑intensive on huge data."
  },
  {
    question: "How to use VLOOKUP with data validation dropdown?",
    shortAnswer: "Create a dropdown using Data Validation with a list of lookup values. Then write a VLOOKUP that references the dropdown cell.",
    explanation: "This creates an interactive report where selecting an item from the dropdown automatically shows related data.",
    hint: "Set Data Validation > List with source = $A$2:$A$100. Then =VLOOKUP(D2, A:B, 2, FALSE).",
    level: "intermediate",
    codeExample: "Dropdown in D2, VLOOKUP in E2: =VLOOKUP(D2, $A$2:$B$100, 2, FALSE)"
  },
  {
    question: "What is the difference between VLOOKUP and HLOOKUP in terms of performance?",
    shortAnswer: "They are similar in performance; the choice depends on data orientation (vertical vs horizontal).",
    explanation: "Both use linear search for exact match. HLOOKUP is less common because data is usually stored in rows, not columns.",
    hint: "Use VLOOKUP for 99% of cases.",
    level: "basic",
    codeExample: "HLOOKUP is used for data like months across columns."
  },
  {
    question: "How can you use VLOOKUP to return a value from a dynamic column based on a header?",
    shortAnswer: "Combine VLOOKUP with MATCH to find the column index number dynamically.",
    explanation: "=VLOOKUP(A2, table_range, MATCH(\"Price\", header_row, 0), FALSE). This survives column insertions.",
    hint: "This is a pro technique for robust dashboards.",
    level: "advanced",
    codeExample: "=VLOOKUP(A2, $A$2:$E$100, MATCH(F1, $A$1:$E$1, 0), FALSE) where F1 contains the header name."
  }
];

export default questions;