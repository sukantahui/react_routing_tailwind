const questions = [
  {
    question: "What does COUNTA count?",
    shortAnswer: "All non‑empty cells (numbers, text, logicals, errors, formulas).",
    explanation: "COUNTA counts any cell that is not completely empty. It does not require the cell to contain a number.",
    hint: "A stands for 'all'.",
    level: "basic",
    codeExample: "=COUNTA(A1:A10) counts all filled cells in that range."
  },
  {
    question: "What is the result of =COUNTA(5, \"\", TRUE, A1) if A1 is blank?",
    shortAnswer: "3 (5, \"\" is empty string? Wait: \"\" is an empty string literal, which is text, so it's counted. Actually =COUNTA(5, \"\", TRUE, A1) → 3? Let's break: 5 (number) → counted, \"\" (empty string literal) → counted because it's a text value, TRUE → counted, A1 blank → not counted. Total = 3.",
    explanation: "Empty string literals are counted because they are text values, not truly empty.",
    hint: "Literal empty string \"\" is different from a blank cell.",
    level: "advanced",
    codeExample: "=COUNTA(5, \"\", TRUE) → 3."
  },
  {
    question: "If A1=5, A2=\"\", A3=TRUE, A4=blank, what does =COUNTA(A1:A4) return?",
    shortAnswer: "3 (A1, A2, A3 are non‑empty; A4 blank excluded).",
    explanation: "A2 contains an empty string (if formula ='') or a space, which COUNTA counts. If truly blank, it would be 2.",
    hint: "Empty string from formula is counted.",
    level: "intermediate",
    codeExample: "=COUNTA(A1:A4) with A2 containing =\'\' → counts A2."
  },
  {
    question: "Does COUNTA count cells with error values like #N/A?",
    shortAnswer: "Yes, errors are considered non‑empty and are counted.",
    explanation: "COUNTA counts any cell that is not blank, regardless of content type, including errors.",
    hint: "Use =ISERROR() if you want to filter out errors.",
    level: "basic",
    codeExample: "=COUNTA(A1:A10) where some cells are #N/A, those are counted."
  },
  {
    question: "What is the difference between COUNTA and COUNT?",
    shortAnswer: "COUNT counts only numbers; COUNTA counts all non‑blank cells of any type.",
    explanation: "COUNTA includes text, errors, logicals; COUNT ignores them.",
    hint: "Use COUNT for numeric data, COUNTA for general completeness.",
    level: "basic",
    codeExample: "A: 5, text, blank → COUNT=1, COUNTA=2."
  },
  {
    question: "If a cell contains a space character (spacebar), will COUNTA count it?",
    shortAnswer: "Yes, because the cell is not empty (it contains a character).",
    explanation: "A space is a text character. COUNTA treats it as content. Use TRIM to clean.",
    hint: "Spaces are invisible but count.",
    level: "intermediate",
    codeExample: "=COUNTA(A1) with A1 = \" \" (space) → 1."
  },
  {
    question: "What does =COUNTA(A:A) do?",
    shortAnswer: "Counts all non‑blank cells in the entire column A.",
    explanation: "It counts every cell that contains any data, including headers, numbers, text, etc.",
    hint: "Be careful – may be a very large number on a whole column.",
    level: "basic",
    codeExample: "=COUNTA(A:A) counts all filled rows in column A."
  },
  {
    question: "How does COUNTA treat a cell containing a formula that returns an empty string (\"\")?",
    shortAnswer: "Counts it as non‑empty (because the formula result is a text string, even if zero length).",
    explanation: "The cell is not blank; it contains a formula. COUNTA evaluates the result, which is an empty string, but that's still a value.",
    hint: "Use COUNTBLANK to count truly blank cells only.",
    level: "advanced",
    codeExample: "If A1 = IF(TRUE,\"\",\"\") → =COUNTA(A1) returns 1."
  },
  {
    question: "Can COUNTA be used with 3D references across sheets?",
    shortAnswer: "Yes, e.g., =COUNTA(Sheet1:Sheet3!A1) counts non‑empty cells in cell A1 across all sheets in the range.",
    explanation: "Works like SUM; each sheet provides one cell value.",
    hint: "Sheet names must be contiguous.",
    level: "advanced",
    codeExample: "=COUNTA(Jan:Dec!B5) counts non‑blank B5 across month sheets."
  },
  {
    question: "What is the maximum number of arguments COUNTA can accept?",
    shortAnswer: "255 arguments, similar to other count functions.",
    explanation: "Each argument can be a cell, range, or constant.",
    hint: "You can pass many separate ranges.",
    level: "expert",
    codeExample: "=COUNTA(A1:A100, C1:C100, E1:E100) works."
  },
  {
    question: "If you have a filtered list, how do you count only visible non‑empty cells?",
    shortAnswer: "Use SUBTOTAL(3, range) or SUBTOTAL(103, range).",
    explanation: "SUBTOTAL with function number 3 (or 103 for ignoring hidden rows) counts non‑blank visible cells.",
    hint: "SUBTOTAL(103, range) is safer for manually hidden rows.",
    level: "intermediate",
    codeExample: "=SUBTOTAL(103, A2:A100) counts visible non‑blank cells."
  },
  {
    question: "What is the result of =COUNTA(5, , 10) (two commas)?",
    shortAnswer: "2 (the empty argument is ignored).",
    explanation: "Arguments that are completely missing (just commas) are not counted. Only explicit values.",
    hint: "Extra commas do not create blank values.",
    level: "basic",
    codeExample: "=COUNTA(1, , 2) → 2."
  },
  {
    question: "How can you count cells that contain any text (including numbers stored as text)?",
    shortAnswer: "Use =COUNTIF(range, \"*\") or =SUMPRODUCT(--ISTEXT(range)).",
    explanation: "COUNTA counts numbers too; to count only text, use ISTEXT.",
    hint: "* wildcard matches any text.",
    level: "advanced",
    codeExample: "=COUNTIF(A1:A10, \"*\") counts text cells (including numbers stored as text)."
  },
  {
    question: "Does COUNTA count cells with logical values (TRUE/FALSE)?",
    shortAnswer: "Yes, they are considered non‑empty.",
    explanation: "Logical values are valid data and are counted.",
    hint: "COUNTA counts everything except truly empty cells.",
    level: "basic",
    codeExample: "=COUNTA(TRUE, FALSE) → 2."
  },
  {
    question: "What is the difference between COUNTA and COUNTBLANK?",
    shortAnswer: "COUNTA counts non‑blank cells; COUNTBLANK counts empty cells.",
    explanation: "Together, COUNTA(range) + COUNTBLANK(range) = total number of cells in range (if no errors).",
    hint: "Use both to audit data completeness.",
    level: "basic",
    codeExample: "=COUNTA(A1:A10) returns number of filled cells; =COUNTBLANK(A1:A10) returns blanks."
  },
  {
    question: "If a range has no non‑blank cells, what does COUNTA return?",
    shortAnswer: "0",
    explanation: "COUNTA returns 0 when all cells in the range are completely empty.",
    hint: "Not an error.",
    level: "basic",
    codeExample: "=COUNTA(A1:A10) with all blanks → 0."
  },
  {
    question: "Can COUNTA be nested inside IF?",
    shortAnswer: "Yes, e.g., =IF(COUNTA(B2:B20)>10, \"Enough data\", \"Need more\").",
    explanation: "Any function returning a number can be used in IF conditions.",
    hint: "Useful for data validation.",
    level: "basic",
    codeExample: "=IF(COUNTA(D:D)=0, \"No entries\", \"Data present\")"
  },
  {
    question: "How to count cells that are not empty and also not spaces?",
    shortAnswer: "Use array formula =SUMPRODUCT(--(TRIM(range)<>\"\"))",
    explanation: "TRIM removes spaces; then check if result is not empty string.",
    hint: "Advanced but necessary for cleaned counts.",
    level: "expert",
    codeExample: "=SUMPRODUCT(--(TRIM(A1:A100)<>\"\"))"
  },
  {
    question: "What does COUNTA return when referencing a single cell that contains a formula returning \"\"?",
    shortAnswer: "1",
    explanation: "The cell is not blank; it holds a formula result (even if zero-length text).",
    hint: "COUNTA sees the formula, not just the result.",
    level: "intermediate",
    codeExample: "=COUNTA(A1) where A1 = IF(1=1,\"\",\"\") → 1."
  },
  {
    question: "What is the keyboard shortcut to insert COUNTA?",
    shortAnswer: "No direct shortcut; type manually or use AutoSum dropdown (not directly available).",
    explanation: "AutoSum dropdown includes Count Numbers (COUNT), not COUNTA.",
    hint: "You may need to add it to Quick Access Toolbar.",
    level: "basic",
    codeExample: null
  },
  {
    question: "How to count only visible non‑blank cells after filtering?",
    shortAnswer: "Use =SUBTOTAL(3, range) or AGGREGATE(3,5,range).",
    explanation: "SUBTOTAL with 3 counts non‑blank visible cells; 103 ignores hidden rows.",
    hint: "Useful for interactive dashboards.",
    level: "intermediate",
    codeExample: "=SUBTOTAL(103, A2:A100)"
  },
  {
    question: "Does COUNTA count cells with the number 0?",
    shortAnswer: "Yes, zero is a number, so it is non‑empty and counted.",
    explanation: "COUNTA does not differentiate between zero and other numbers.",
    hint: "If you want to exclude zeros, use COUNTIF(range, \"<>0\").",
    level: "basic",
    codeExample: "=COUNTA(A1:A10) where A1=0 → counted."
  },
  {
    question: "How to count cells that contain only numbers (no text) using COUNTA?",
    shortAnswer: "You cannot; COUNTA counts all non‑blank. Use COUNT for numbers only.",
    explanation: "COUNTA is not selective. For numbers only, COUNT is appropriate.",
    hint: "Use COUNT for numeric count.",
    level: "basic",
    codeExample: "=COUNT(A1:A10) counts numbers; =COUNTA(A1:A10) counts all non‑blank."
  },
  {
    question: "What is the result of =COUNTA({1,2,\"\",4})?",
    shortAnswer: "4 (the array includes an empty string element, which is a text literal).",
    explanation: "Empty string in an array constant is a valid text element, so it's counted.",
    hint: "Array constants behave like direct arguments.",
    level: "advanced",
    codeExample: "=COUNTA({1,2,\"\",4}) → 4."
  },
  {
    question: "How to count cells that are not blank in a range that may contain errors?",
    shortAnswer: "=COUNTA(range) works fine; errors are counted as non‑blank.",
    explanation: "If you want to exclude errors, use =COUNTIF(range, \"<>\")? No, that includes errors. Use =SUMPRODUCT(--(ISNUMBER(range)+ISTEXT(range)+ISLOGICAL(range))) etc.",
    hint: "Complex; usually COUNTA is sufficient for completeness.",
    level: "expert",
    codeExample: "=COUNTA(A1:A100) includes errors."
  },
  {
    question: "What is the difference between COUNTA and LEN(TRIM())>0?",
    shortAnswer: "COUNTA counts any non‑blank including spaces; LEN(TRIM())>0 excludes cells with only spaces.",
    explanation: "COUNTA counts cells with spaces; TRIM removes spaces first, then checks length.",
    hint: "Use TRIM to clean before counting if spaces are not real data.",
    level: "advanced",
    codeExample: "=SUMPRODUCT(--(TRIM(A1:A100)<>\"\"))"
  },
  {
    question: "Can COUNTA be used to count rows in a table (including header)?",
    shortAnswer: "Yes, =COUNTA(Table1[#All]) counts all non‑blank cells in the entire table.",
    explanation: "Structured references make it easy to count rows and columns.",
    hint: "Use Table1[Column1] to count entries in a column.",
    level: "intermediate",
    codeExample: "=COUNTA(Table1[Student]) counts non‑blank student names."
  },
  {
    question: "If a cell contains a logical value from a formula (e.g., =A1>5), will COUNTA count it?",
    shortAnswer: "Yes, because the result is either TRUE or FALSE, which are values.",
    explanation: "COUNTA counts the logical result, regardless of whether it came from a formula.",
    hint: "All formula results are counted unless they are truly blank.",
    level: "basic",
    codeExample: "=COUNTA(A1) with A1 = (1=1) → TRUE → counted."
  },
  {
    question: "What is the output of =COUNTA(\"\") when the argument is an empty string literal?",
    shortAnswer: "1 (the empty string is a text constant).",
    explanation: "As a direct argument, \"\" is a text string of length 0, but it exists, so COUNTA counts it.",
    hint: "This shows the difference between literal empty string and a blank cell.",
    level: "intermediate",
    codeExample: "=COUNTA(\"\") → 1."
  },
  {
    question: "How to count cells that contain any data except errors?",
    shortAnswer: "Use =SUMPRODUCT(--(NOT(ISERROR(range)))) or =COUNTIF(range, \"<>\")? No, that includes errors. Better: =COUNTA(range) - COUNTIF(range, ISERROR(range)).",
    explanation: "Count all non‑blank, then subtract errors. Simpler: =COUNTIFS(range, \"<>\", range, \"<>\",...). Actually easiest: =SUMPRODUCT(--(NOT(ISERROR(range)))*(range<>\"\"))",
    hint: "Complex but doable.",
    level: "expert",
    codeExample: "{=SUM(IF(NOT(ISERROR(A1:A10)),1,0))} array."
  },
  {
    question: "What is the typical use of COUNTA in dynamic named ranges?",
    shortAnswer: "To create a range that expands with data: =OFFSET(A1,0,0,COUNTA(A:A),1).",
    explanation: "COUNTA counts how many rows have data in column A; OFFSET uses that as height.",
    hint: "Very common in old Excel before Tables.",
    level: "advanced",
    codeExample: "=OFFSET(Sheet1!$A$1,0,0,COUNTA(Sheet1!$A:$A),1)"
  }
];

export default questions;