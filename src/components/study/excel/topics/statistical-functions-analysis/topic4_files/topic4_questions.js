const questions = [
  {
    question: "What does the COUNT function count?",
    shortAnswer: "Cells containing numbers, dates, or numeric expressions.",
    explanation: "COUNT counts only numeric values. Text, blanks, logical values, and errors are ignored.",
    hint: "If it's a number (or looks like a number but stored as text), COUNT ignores it.",
    level: "basic",
    codeExample: "=COUNT(A1:A10) counts numeric cells in that range."
  },
  {
    question: "How many numbers does =COUNT(5, \"5\", TRUE) count?",
    shortAnswer: "2 (5 and TRUE, because TRUE is numeric 1 when used as direct argument).",
    explanation: "Direct arguments: 5 is number; \"5\" is text literal (not convertible) → ignored; TRUE is coerced to 1. So total 2.",
    hint: "Be careful: text \"5\" in a cell is ignored, but as direct argument it's also text and ignored. TRUE as direct argument becomes 1.",
    level: "advanced",
    codeExample: "=COUNT(5, \"5\", TRUE) → 2."
  },
  {
    question: "If A1=5, A2=\"hello\", A3=TRUE, A4=blank, what does =COUNT(A1:A4) return?",
    shortAnswer: "2 (5 and TRUE? Wait, TRUE as cell reference is ignored). Actually COUNT ignores logicals in cell references. So only 5 is counted → returns 1.",
    explanation: "Explanation: Cell references: A1=5 (counted), A2 text (ignored), A3 logical (ignored), A4 blank (ignored). So COUNT = 1.",
    hint: "Logicals in cells are ignored; only direct logical arguments are coerced.",
    level: "intermediate",
    codeExample: "Result is 1."
  },
  {
    question: "Does COUNT count cells with error values like #N/A?",
    shortAnswer: "No, errors are ignored.",
    explanation: "COUNT only counts numbers; error values are not numbers, so they are ignored.",
    hint: "However, if the entire range has only errors, COUNT returns 0, not an error.",
    level: "basic",
    codeExample: "=COUNT(A1:A5) where A1=#N/A, others numbers → counts the numbers."
  },
  {
    question: "What is the difference between COUNT and COUNTA?",
    shortAnswer: "COUNT counts only numbers; COUNTA counts any non‑empty cell (numbers, text, logicals, errors).",
    explanation: "COUNTA includes everything except completely blank cells.",
    hint: "A stands for 'all'.",
    level: "basic",
    codeExample: "=COUNTA(A1:A10) vs =COUNT(A1:A10) – COUNTA will be larger if there is text."
  },
  {
    question: "Does COUNT count cells formatted as text that contain numbers?",
    shortAnswer: "No, because the underlying value is text, not a number.",
    explanation: "Even if the cell shows '123', if it's formatted as text or entered with an apostrophe, COUNT ignores it.",
    hint: "Use =VALUE() or multiply by 1 to convert.",
    level: "intermediate",
    codeExample: "If A1 = \"123\" (text), =COUNT(A1) → 0."
  },
  {
    question: "What does =COUNT(A:A) do?",
    shortAnswer: "Counts all numeric cells in the entire column A.",
    explanation: "It scans the whole column (over 1 million rows) but only counts numbers. May be slow on large data.",
    hint: "Avoid whole column references in heavy workbooks.",
    level: "basic",
    codeExample: "Useful for quick numeric count in a column."
  },
  {
    question: "Can COUNT be used with 3D references across sheets?",
    shortAnswer: "Yes, e.g., =COUNT(Sheet1:Sheet3!A1) counts numeric cells in cell A1 across all sheets in the range.",
    explanation: "Works like SUM with 3D references. All sheets must have the same structure.",
    hint: "Sheet names must be contiguous.",
    level: "advanced",
    codeExample: "=COUNT(Jan:Dec!B5) counts numbers in B5 across all month sheets."
  },
  {
    question: "What is the maximum number of arguments COUNT can accept?",
    shortAnswer: "255 arguments, similar to other aggregation functions.",
    explanation: "Each argument can be a cell, range, or constant.",
    hint: "Ranges can be huge, but total cell count limited by memory.",
    level: "expert",
    codeExample: "=COUNT(A1:A1000000, B1:B1000000) works."
  },
  {
    question: "If you have a filtered list, how do you count only visible numeric cells?",
    shortAnswer: "Use SUBTOTAL(2, range) or SUBTOTAL(102, range) for visible rows.",
    explanation: "SUBTOTAL with function number 2 (or 102 for ignoring hidden rows) counts only visible numbers after filtering.",
    hint: "SUBTOTAL(2, range) ignores manually hidden rows too.",
    level: "intermediate",
    codeExample: "=SUBTOTAL(2, A1:A100) counts only visible numeric cells."
  },
  {
    question: "What is the result of =COUNT(5, , 10) (two commas)?",
    shortAnswer: "2",
    explanation: "The empty argument is ignored; only 5 and 10 are counted. Blank arguments are skipped.",
    hint: "Extra commas do not create blank cells; they just skip.",
    level: "basic",
    codeExample: "=COUNT(5, , 10) → 2."
  },
  {
    question: "How can you count numbers greater than 50?",
    shortAnswer: "Use COUNTIF: =COUNTIF(range, \">50\")",
    explanation: "COUNTIF allows conditions. For multiple conditions, use COUNTIFS.",
    hint: "COUNTIF is updated version of COUNT with IF.",
    level: "intermediate",
    codeExample: "=COUNTIF(B2:B100, \">50\")"
  },
  {
    question: "Does COUNT treat empty cells as zero?",
    shortAnswer: "No, empty cells are ignored, not counted as zero.",
    explanation: "Zeros are numbers and are counted; blanks are not.",
    hint: "Important difference for data validation.",
    level: "basic",
    codeExample: "=COUNT(A1:A10) with A1 blank, A2=0 → counts 1 (the zero)."
  },
  {
    question: "What is the result of =COUNT(TRUE, FALSE) when TRUE and FALSE are direct arguments?",
    shortAnswer: "2 (both are coerced to numbers 1 and 0).",
    explanation: "Direct logical arguments are treated as numbers: TRUE=1, FALSE=0. So COUNT sees two numbers.",
    hint: "But if TRUE is in a cell, COUNT ignores it.",
    level: "advanced",
    codeExample: "=COUNT(TRUE, FALSE) → 2."
  },
  {
    question: "Can COUNT be nested inside IF?",
    shortAnswer: "Yes, e.g., =IF(COUNT(A1:A10)>5, \"Enough data\", \"Insufficient\").",
    explanation: "Any function returning a number can be used in IF conditions.",
    hint: "Common for data validation checks.",
    level: "basic",
    codeExample: "=IF(COUNT(B2:B20)=0, \"No numeric entries\", \"Data present\")"
  },
  {
    question: "How to count numbers that are not zero?",
    shortAnswer: "=COUNTIF(range, \"<>0\")",
    explanation: "The condition \"<>0\" excludes zeros but includes all other numbers (positive and negative).",
    hint: "Useful when zero means 'absent' and should not be counted.",
    level: "intermediate",
    codeExample: "=COUNTIF(A1:A10, \"<>0\")"
  },
  {
    question: "What does COUNT return if there are no numbers in the range?",
    shortAnswer: "0",
    explanation: "Unlike AVERAGE, COUNT does not return an error; it returns zero.",
    hint: "COUNT never returns #DIV/0!.",
    level: "basic",
    codeExample: "=COUNT(A1:A10) all text → 0."
  },
  {
    question: "How to count numbers in a range that also contains errors?",
    shortAnswer: "=COUNT(range) still works; errors are ignored.",
    explanation: "Errors are not numbers, so they are not counted. COUNT does not propagate errors.",
    hint: "COUNT is safe to use even with messy data.",
    level: "basic",
    codeExample: "=COUNT(A1:A10) where some cells are #N/A → counts only numbers."
  },
  {
    question: "What is the difference between COUNT and COUNTBLANK?",
    shortAnswer: "COUNTBLANK counts empty cells; COUNT counts numbers (not blanks).",
    explanation: "COUNTBLANK includes cells that appear empty, including cells with formula that returns \"\".",
    hint: "COUNTBLANK is useful for finding missing entries.",
    level: "basic",
    codeExample: "=COUNTBLANK(A1:A10) returns number of blanks."
  },
  {
    question: "Can COUNT be used to count how many times a specific number appears?",
    shortAnswer: "Yes, with COUNTIF: =COUNTIF(range, number).",
    explanation: "COUNT alone cannot filter; COUNTIF is the conditional version.",
    hint: "=COUNTIF(A1:A100, 5) counts occurrences of the number 5.",
    level: "intermediate",
    codeExample: "=COUNTIF(B2:B50, 0) counts zeros."
  },
  {
    question: "How to count numbers in a range that are between 10 and 20 inclusive?",
    shortAnswer: "=COUNTIFS(range, \">=10\", range, \"<=20\")",
    explanation: "COUNTIFS allows multiple criteria. The same range is used with two conditions.",
    hint: "You can also use =COUNTIF(range,\">=10\") - COUNTIF(range,\">20\").",
    level: "advanced",
    codeExample: "=COUNTIFS(A1:A100, \">=10\", A1:A100, \"<=20\")"
  },
  {
    question: "What is the keyboard shortcut to insert COUNT?",
    shortAnswer: "No direct shortcut; use AutoSum dropdown and select Count Numbers, or type manually.",
    explanation: "The AutoSum (Σ) dropdown includes Count Numbers option.",
    hint: "Click the arrow next to Σ to see it.",
    level: "basic",
    codeExample: null
  },
  {
    question: "Does COUNT count dates?",
    shortAnswer: "Yes, because dates are stored as serial numbers.",
    explanation: "Excel stores dates as numbers (e.g., Jan 1, 1900 = 1). So COUNT includes date cells.",
    hint: "Useful for counting how many dates are in a list.",
    level: "basic",
    codeExample: "=COUNT(A1:A10) where A1:A10 contain dates → counts them."
  },
  {
    question: "How can you count only whole numbers (integers) in a range?",
    shortAnswer: "Array formula: =SUM(IF(MOD(range,1)=0,1,0)) or =SUMPRODUCT(--(MOD(range,1)=0)).",
    explanation: "MOD checks remainder; if remainder = 0, it's an integer.",
    hint: "Very advanced; alternative is helper column with =INT(cell)=cell.",
    level: "expert",
    codeExample: "{=SUM(IF(MOD(A1:A100,1)=0,1,0))}"
  },
  {
    question: "What is the result of =COUNT(5, \"5\")?",
    shortAnswer: "1 (only the first 5 is counted; \"5\" as literal text is ignored).",
    explanation: "Literal text strings are not convertible to numbers, so ignored.",
    hint: "If \"5\" were in a cell, same result – ignored.",
    level: "intermediate",
    codeExample: "=COUNT(5, \"5\") → 1."
  },
  {
    question: "How to count numbers that are not empty but could be errors?",
    shortAnswer: "Use =COUNT(range) – errors are not counted, but numbers are. That satisfies 'non‑empty numbers'.",
    explanation: "If you want to count all non‑blank cells (including text), use COUNTA. COUNT already ignores errors.",
    hint: "Depends on definition of 'non‑empty'.",
    level: "basic",
    codeExample: "COUNT gives count of numbers, ignoring text and errors."
  },
  {
    question: "What will =COUNT(A1:A5, B1:B5) return if both ranges have 3 numbers each?",
    shortAnswer: "6",
    explanation: "COUNT combines both ranges and counts all numeric cells across them.",
    hint: "You can pass multiple ranges separated by commas.",
    level: "basic",
    codeExample: "=COUNT(A1:A10, C1:C10, E1:E10) counts numbers in all three ranges."
  },
  {
    question: "How does COUNT behave with array constants like {1,2,\"x\",4}?",
    shortAnswer: "It counts numbers in the array: =COUNT({1,2,\"x\",4}) → 3.",
    explanation: "Array constants are treated as direct arguments; text entries are ignored.",
    hint: "Useful for quick counts in formulas.",
    level: "advanced",
    codeExample: "=COUNT({1,2,3,0,\"a\"}) → 4 (zero is counted)."
  },
  {
    question: "What is the difference between COUNT and COUNTIF with no criteria?",
    shortAnswer: "COUNTIF always needs a criteria; COUNT does not. So COUNT is simpler for unconditional counts.",
    explanation: "COUNTIF(range, \">0\") can be used conditionally; COUNT is for all numbers.",
    hint: "Use COUNT for simple numeric counts.",
    level: "basic",
    codeExample: "COUNT is faster than COUNTIF(range, \"<>*\") for all numbers."
  },
  {
    question: "Can COUNT be used to count numbers in a merged cell?",
    shortAnswer: "Yes, if the merged cell contains a number, it counts once (the merged area still one cell).",
    explanation: "Merged cells are treated as a single cell; COUNT looks at its value.",
    hint: "But merged cells are generally avoided in good spreadsheet design.",
    level: "basic",
    codeExample: "=COUNT(A1) where A1 is merged across A1:B1; if it contains a number, counted."
  },
  {
    question: "How to count numbers in a range excluding hidden rows?",
    shortAnswer: "Use SUBTOTAL(102, range) or AGGREGATE(2,5,range).",
    explanation: "SUBTOTAL with 2 counts numbers, with 102 also ignores hidden rows (manually hidden). AGGREGATE more flexible.",
    hint: "Useful for filtered lists.",
    level: "advanced",
    codeExample: "=SUBTOTAL(102, A2:A100) counts visible numbers only."
  }
];

export default questions;