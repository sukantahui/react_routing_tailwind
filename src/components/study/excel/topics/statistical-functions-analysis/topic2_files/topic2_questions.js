const questions = [
  {
    question: "What does the MIN function return?",
    shortAnswer: "The smallest numeric value in its arguments.",
    explanation: "MIN returns the minimum numeric value. It ignores text, blanks, and logical values in cell references.",
    hint: "Think 'lowest number'.",
    level: "basic",
    codeExample: "=MIN(10, 5, 8) → 5"
  },
  {
    question: "What is the result of =MIN(A1:A3) if A1=5, A2=text, A3=2?",
    shortAnswer: "2",
    explanation: "Text in A2 is ignored, so MIN considers 5 and 2, returns 2.",
    hint: "Text cells are skipped.",
    level: "basic",
    codeExample: "MIN(5, \"hello\", 2) in cells → 2."
  },
  {
    question: "How does MIN treat a blank cell?",
    shortAnswer: "Ignores it (blank cell is skipped).",
    explanation: "Blank cells do not affect the minimum calculation, unlike zeros which are considered.",
    hint: "Blank is not zero.",
    level: "basic",
    codeExample: "=MIN(10, , 5) → 5 (blank ignored)."
  },
  {
    question: "What does MIN return if no numbers are found in the range?",
    shortAnswer: "0",
    explanation: "Unlike AVERAGE which returns #DIV/0!, MIN returns 0 when there are no numeric values.",
    hint: "Test with =MIN(A1:A10) where all cells are text or blank.",
    level: "intermediate",
    codeExample: "=MIN(A1:A10) with all text → 0."
  },
  {
    question: "Can MIN be used with dates?",
    shortAnswer: "Yes, returns the earliest date (since dates are stored as serial numbers).",
    explanation: "Excel stores dates as numbers, so MIN gives the smallest (oldest) date.",
    hint: "Use MIN to find the earliest event date.",
    level: "intermediate",
    codeExample: "=MIN(A1:A10) where A1:A10 are dates → earliest date."
  },
  {
    question: "What is the difference between MIN and MINA?",
    shortAnswer: "MINA treats text as 0, TRUE as 1, FALSE as 0; MIN ignores them.",
    explanation: "MINA evaluates all cells, converting non‑numeric to numbers. Rarely used.",
    hint: "A stands for 'all values', similar to AVERAGEA.",
    level: "advanced",
    codeExample: "=MINA(\"hello\", 5) → 0 (text becomes 0)."
  },
  {
    question: "If a range contains a zero, MIN returns 0 even if there are blanks. Is that correct?",
    shortAnswer: "Yes, zero is the smallest number, so it is returned.",
    explanation: "Zero is a valid numeric value. If you want the minimum positive number, use array formula =MIN(IF(range>0, range)).",
    hint: "Consider if zero should be excluded.",
    level: "intermediate",
    codeExample: "=MIN(IF(A1:A10>0, A1:A10)) array formula."
  },
  {
    question: "How to find the minimum value that is greater than zero?",
    shortAnswer: "Use MINIFS(range, range, \">0\") or array formula =MIN(IF(range>0, range)).",
    explanation: "MINIFS is simpler in newer Excel versions.",
    hint: "Criteria \">0\" excludes zeros and negatives.",
    level: "advanced",
    codeExample: "=MINIFS(A1:A10, A1:A10, \">0\")"
  },
  {
    question: "What is the keyboard shortcut to insert MIN?",
    shortAnswer: "No direct shortcut. Use AutoSum dropdown and select Min, or type manually.",
    explanation: "The AutoSum button (Σ) has a dropdown with Min option.",
    hint: "Click the arrow next to Σ to see other functions.",
    level: "basic",
    codeExample: null
  },
  {
    question: "Does MIN treat TRUE as 1 when directly typed?",
    shortAnswer: "Yes, =MIN(TRUE, 5) returns 1 because TRUE converts to 1.",
    explanation: "Direct logical arguments are coerced to numbers; cell references are ignored.",
    hint: "Be careful: TRUE as direct argument vs cell reference behave differently.",
    level: "advanced",
    codeExample: "=MIN(TRUE, 10) → 1; =MIN(A1,10) where A1=TRUE → 10 (ignored)."
  },
  {
    question: "What happens if you use MIN on an entire column (e.g., =MIN(A:A))?",
    shortAnswer: "It returns the minimum number in that column, ignoring text and blanks.",
    explanation: "Works, but may be slow on very large datasets. Useful for quick checks.",
    hint: "Avoid whole column references in heavy workbooks.",
    level: "intermediate",
    codeExample: "=MIN(A:A) finds the smallest number anywhere in column A."
  },
  {
    question: "How to find the smallest value in alternating rows?",
    shortAnswer: "Use array formula like =MIN(IF(MOD(ROW(range)-ROW(first),2)=0, range)).",
    explanation: "Combines MIN with MOD to filter rows.",
    hint: "This is an expert technique; usually helper column is simpler.",
    level: "expert",
    codeExample: "{=MIN(IF(MOD(ROW(A1:A100)-ROW(A1),2)=0, A1:A100))}"
  },
  {
    question: "What is the result of =MIN(0, \"\", 5)?",
    shortAnswer: "0",
    explanation: "Blank is ignored; numbers are 0 and 5, minimum is 0.",
    hint: "Zero is smaller than positive numbers.",
    level: "basic",
    codeExample: "MIN(0, ,5) → 0."
  },
  {
    question: "Can MIN be combined with IF to get conditional minimum?",
    shortAnswer: "Yes, e.g., =MIN(IF(A1:A10=\"Yes\", B1:B10)).",
    explanation: "This array formula returns the minimum in B where A = \"Yes\".",
    hint: "Remember to enter as array (Ctrl+Shift+Enter) in older Excel.",
    level: "advanced",
    codeExample: "{=MIN(IF(A1:A10=\"Yes\", B1:B10))}"
  },
  {
    question: "What is the difference between MIN and SMALL(range,1)?",
    shortAnswer: "SMALL(range, 1) also returns the smallest value, but SMALL can return the 2nd smallest, 3rd, etc.",
    explanation: "MIN is simpler for the single smallest; SMALL is more general.",
    hint: "SMALL(range, k) where k=1 gives same as MIN.",
    level: "intermediate",
    codeExample: "=SMALL(A1:A10, 1) equals =MIN(A1:A10)."
  },
  {
    question: "How to find the minimum value excluding zeros without using MINIFS?",
    shortAnswer: "Array formula: =MIN(IF(range<>0, range)).",
    explanation: "IF filter excludes zeros, then MIN works on the filtered array.",
    hint: "This is the classic pre-MINIFS method.",
    level: "advanced",
    codeExample: "{=MIN(IF(A1:A10<>0, A1:A10))}"
  },
  {
    question: "What does MIN return for an empty range?",
    shortAnswer: "0",
    explanation: "If a range has no numeric values, MIN returns 0 (not an error).",
    hint: "Different from AVERAGE which gives #DIV/0!.",
    level: "intermediate",
    codeExample: "=MIN(A1:A10) where A1:A10 all blank → 0."
  },
  {
    question: "Can MIN be used with 3D references across sheets?",
    shortAnswer: "Yes, =MIN(Sheet1:Sheet3!A1) finds minimum of cell A1 across all sheets.",
    explanation: "Works like SUM with 3D references: all sheets between Sheet1 and Sheet3 inclusive.",
    hint: "Sheet names must be contiguous in the workbook.",
    level: "advanced",
    codeExample: "=MIN(Jan:Dec!B5) minimum B5 across all sheets."
  },
  {
    question: "What is the maximum number of arguments MIN can accept?",
    shortAnswer: "255 arguments, like SUM and AVERAGE.",
    explanation: "Each argument can be a cell, range, or constant.",
    hint: "Ranges can contain many cells.",
    level: "expert",
    codeExample: "=MIN(A1:A1000000, B1:B1000000) works."
  },
  {
    question: "How to find the minimum value among non-adjacent cells?",
    shortAnswer: "=MIN(A1, C5, G10, ...) list them as separate arguments.",
    explanation: "Separate cells with commas inside MIN.",
    hint: "Up to 255 arguments allowed.",
    level: "basic",
    codeExample: "=MIN(B2, D5, F8, H10)"
  },
  {
    question: "Does MIN treat error values in the range as errors?",
    shortAnswer: "Yes, any error (#N/A, #VALUE!, etc.) causes MIN to return that error.",
    explanation: "Like SUM and AVERAGE, errors propagate.",
    hint: "Clean your data before using MIN.",
    level: "intermediate",
    codeExample: "If A1 = #N/A, =MIN(A1:A10) returns #N/A."
  },
  {
    question: "What is the result of =MIN(10, FALSE) when FALSE is a direct argument?",
    shortAnswer: "0 (FALSE converts to 0).",
    explanation: "Direct logicals are coerced to numbers: FALSE=0, TRUE=1.",
    hint: "Be careful: typing FALSE directly is not the same as referencing a cell with FALSE.",
    level: "advanced",
    codeExample: "=MIN(10, FALSE) → 0."
  },
  {
    question: "How to find the minimum value in a range that is above a certain threshold?",
    shortAnswer: "Use MINIFS: =MINIFS(range, range, \">=threshold\")",
    explanation: "Example: =MINIFS(B2:B100, B2:B100, \">=60\") finds the lowest mark that is still a pass (>=60).",
    hint: "Threshold can be a cell reference too.",
    level: "intermediate",
    codeExample: "=MINIFS(C2:C20, C2:C20, \">=50\")"
  },
  {
    question: "Why does MIN return 0 when I expect the lowest positive number?",
    shortAnswer: "Because there is a zero in the range, or all values are text/blank (MIN returns 0).",
    explanation: "Zero is a number and smaller than any positive number. Exclude zeros using MINIFS with \">0\".",
    hint: "Check if zeros exist unintendedly.",
    level: "basic",
    codeExample: "=MINIFS(A1:A10, A1:A10, \">0\")"
  },
  {
    question: "Can MIN be used inside other functions like IF?",
    shortAnswer: "Yes, e.g., =IF(MIN(B2:B10)>80, \"Good\", \"Needs improvement\")",
    explanation: "Any function returning a number can be nested.",
    hint: "Useful for pass/fail thresholds based on minimum.",
    level: "intermediate",
    codeExample: "=IF(MIN(marks)>=40, \"All passed\", \"Some failed\")"
  },
  {
    question: "What is the difference between MIN and SUBTOTAL(5, range)?",
    shortAnswer: "SUBTOTAL(5) returns the minimum of visible rows after filtering; MIN includes hidden rows.",
    explanation: "Use SUBTOTAL when you need to respect manual filters.",
    hint: "SUBTOTAL uses function number 5 for MIN.",
    level: "advanced",
    codeExample: "=SUBTOTAL(5, A1:A100) ignores filtered‑out rows."
  },
  {
    question: "How to find the minimum value in a column but only for rows where another column equals specific text?",
    shortAnswer: "Use MINIFS: =MINIFS(min_range, criteria_range, criteria).",
    explanation: "Example: =MINIFS(B2:B100, A2:A100, \"North\")",
    hint: "Available in Excel 2016+.",
    level: "intermediate",
    codeExample: "=MINIFS(D2:D50, C2:C50, \"Passed\")"
  },
  {
    question: "What is the output of =MIN(10, \"20\", 30) if \"20\" is typed directly?",
    shortAnswer: "10 (text string \"20\" is not convertible, causes #VALUE! error).",
    explanation: "Wait, correction: =MIN(10, \"20\", 30) returns #VALUE! because \"20\" as a direct literal is not a number and cannot be coerced. But =MIN(10, 20, 30) works. So the answer is #VALUE!.",
    hint: "Never use text literals inside MIN.",
    level: "advanced",
    codeExample: "=MIN(10, \"20\", 30) → #VALUE!"
  },
  {
    question: "How can you find the earliest date using MIN?",
    shortAnswer: "=MIN(date_range) returns the smallest serial number = earliest date.",
    explanation: "Because dates are numbers, MIN works directly.",
    hint: "Format the result cell as Date.",
    level: "basic",
    codeExample: "=MIN(A1:A10) where A1:A10 contain dates."
  },
  {
    question: "Does MIN ignore cells formatted as text that contain numbers?",
    shortAnswer: "Yes, it ignores them because they are text, not numbers.",
    explanation: "Even if the cell appears to be a number, if it's stored as text, MIN skips it.",
    hint: "Use =VALUE() or multiply by 1 to convert.",
    level: "intermediate",
    codeExample: "If A1=\"5\" as text, =MIN(A1, 10) → 10."
  },
  {
    question: "What is an efficient way to find the minimum of two separate ranges?",
    shortAnswer: "=MIN(MAX(range1), MAX(range2))? No. =MIN(MIN(range1), MIN(range2)) or simply =MIN(range1, range2).",
    explanation: "You can pass two ranges directly: =MIN(A1:A10, C1:C10).",
    hint: "No need to calculate intermediate mins.",
    level: "basic",
    codeExample: "=MIN(B2:B20, D2:D20)"
  }
];

export default questions;