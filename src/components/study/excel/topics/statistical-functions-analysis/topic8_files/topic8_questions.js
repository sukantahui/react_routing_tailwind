const questions = [
  {
    question: "What is the syntax of COUNTIF?",
    shortAnswer: "=COUNTIF(range, criteria)",
    explanation: "range is the group of cells to check; criteria is the condition (text, number, expression).",
    level: "basic",
    codeExample: "=COUNTIF(A1:A10, \">50\")"
  },
  {
    question: "How do you count cells that contain the word \"Apple\"?",
    shortAnswer: "=COUNTIF(A1:A100, \"Apple\")",
    explanation: "It counts exact matches (case-insensitive). For partial match, use wildcards: \"*Apple*\".",
    level: "basic",
    codeExample: "=COUNTIF(Products, \"Apple\")"
  },
  {
    question: "Can COUNTIF count numbers greater than a value in another cell?",
    shortAnswer: "Yes, use =COUNTIF(range, \">\"&amp;E1)",
    explanation: "Concatenate the operator with the cell reference. Do not put quotes around the cell reference.",
    level: "intermediate",
    codeExample: "=COUNTIF(A:A, \">\"&B1)"
  },
  {
    question: "What does COUNTIF return if no cells match the criteria?",
    shortAnswer: "0",
    explanation: "It does not return an error; just 0 (zero).",
    level: "basic",
    codeExample: "=COUNTIF(A:A, \"Zebra\") → 0 if no \"Zebra\"."
  },
  {
    question: "Is COUNTIF case-sensitive?",
    shortAnswer: "No, it treats \"apple\", \"Apple\", \"APPLE\" as the same.",
    explanation: "For case‑sensitive count, use SUMPRODUCT with EXACT.",
    level: "intermediate",
    codeExample: "=SUMPRODUCT(--EXACT(A1:A10, \"Apple\"))"
  },
  {
    question: "How to count cells that are not blank using COUNTIF?",
    shortAnswer: "=COUNTIF(range, \"<>\") or =COUNTIF(range, \"*\") for text.",
    explanation: "\"<>\" means not empty. For numbers only, use COUNT instead.",
    level: "basic",
    codeExample: "=COUNTIF(A2:A100, \"<>\") counts all non‑blank cells."
  },
  {
    question: "What wildcards can be used in COUNTIF?",
    shortAnswer: "* (any sequence) and ? (single character).",
    explanation: "* matches zero or more characters; ? matches exactly one character.",
    level: "intermediate",
    codeExample: "=COUNTIF(A:A, \"*North*\") contains \"North\"; =COUNTIF(A:A, \"???\") exactly 3 characters."
  },
  {
    question: "Can COUNTIF count cells that start with a specific letter?",
    shortAnswer: "Yes, use wildcard: =COUNTIF(range, \"A*\")",
    explanation: "That counts all cells starting with the letter A (not case‑sensitive).",
    level: "basic",
    codeExample: "=COUNTIF(Names, \"S*\") counts names starting with S."
  },
  {
    question: "How to count cells that contain any text (no numbers)?",
    shortAnswer: "=COUNTIF(range, \"*\") counts any text, but also counts numbers stored as text.",
    explanation: "For pure text, use =SUMPRODUCT(--ISTEXT(range)).",
    level: "advanced",
    codeExample: "=COUNTIF(A:A, \"*\") - COUNTIF(A:A, \"?*\")? Not straightforward."
  },
  {
    question: "What is the output of =COUNTIF(A1:A5, \">\"&AVERAGE(A1:A5))?",
    shortAnswer: "Counts how many numbers are greater than the average of the same range.",
    explanation: "The criteria is evaluated dynamically.",
    level: "advanced",
    codeExample: "Works, but may be confusing; test small ranges."
  },
  {
    question: "Does COUNTIF count a cell that contains a formula returning empty string?",
    shortAnswer: "No, because the cell is not empty; it contains a formula. However, COUNTIF sees the result \"\" as equal to \"\" (blank). So =COUNTIF(range, \"\") would count it.",
    explanation: "If you want to skip cell with formula results that look blank, use =COUNTIF(range, \"?\") or check for specific condition.",
    level: "expert",
    codeExample: "=COUNTIF(A:A, \"\") counts both truly blank and formula-blank."
  },
  {
    question: "Can COUNTIF be used with dates?",
    shortAnswer: "Yes, dates are numbers; use operators: =COUNTIF(DateRange, \">\"&DATE(2025,1,1))",
    explanation: "Or use TODAY(): =COUNTIF(DateRange, \">=\"&TODAY())",
    level: "intermediate",
    codeExample: "Count orders after Jan 1, 2025."
  },
  {
    question: "How to count cells that contain errors (e.g., #N/A)?",
    shortAnswer: "Use =COUNTIF(range, \"#N/A\") for that specific error, or =SUMPRODUCT(--ISERROR(range)) for any error.",
    explanation: "COUNTIF cannot directly count any error, only a specific text pattern.",
    level: "advanced",
    codeExample: "=COUNTIF(A:A, \"#N/A\")"
  },
  {
    question: "What is the maximum number of cells COUNTIF can count?",
    shortAnswer: "No hard limit besides Excel's row limit (1,048,576 rows).",
    explanation: "Performance may degrade with huge ranges, but it works.",
    level: "basic",
    codeExample: "=COUNTIF(A:A, \">0\") works on entire column."
  },
  {
    question: "Can COUNTIF be used on a filtered range?",
    shortAnswer: "It counts based on criteria, not filter. Use SUBTOTAL(3, range) for visible cells only.",
    explanation: "COUNTIF ignores filtering; it always looks at all rows in the range.",
    level: "intermediate",
    codeExample: "For visible counts, use SUBTOTAL(3, range)."
  },
  {
    question: "What is the difference between COUNTIF and COUNTIFS?",
    shortAnswer: "COUNTIF handles one condition; COUNTIFS handles multiple (AND logic).",
    explanation: "COUNTIFS: =COUNTIFS(range1, criteria1, range2, criteria2, ...).",
    level: "basic",
    codeExample: "Use COUNTIFS when you need two or more conditions."
  },
  {
    question: "How to count cells that are NOT equal to a specific value?",
    shortAnswer: "=COUNTIF(range, \"<>Value\")",
    explanation: "For numeric: =COUNTIF(range, \"<>5\"). For text: =COUNTIF(range, \"<>Apple\").",
    level: "basic",
    codeExample: "=COUNTIF(A:A, \"<>0\") counts non‑zero numbers."
  },
  {
    question: "What happens when criteria is a text string with leading/trailing spaces?",
    shortAnswer: "COUNTIF treats spaces literally, so \"Apple \" is different from \"Apple\". Use TRIM to clean.",
    explanation: "Spaces matter. Use =COUNTIF(range, TRIM(cell)) or clean data first.",
    level: "intermediate",
    codeExample: "=COUNTIF(A:A, \"Apple \") will not match \"Apple\"."
  },
  {
    question: "Can I use COUNTIF across multiple sheets?",
    shortAnswer: "Not directly; you must add separate COUNTIFs: =COUNTIF(Sheet1!A:A,\"x\")+COUNTIF(Sheet2!A:A,\"x\")",
    explanation: "Works but becomes verbose.",
    level: "advanced",
    codeExample: "Sum of counts across sheets."
  },
  {
    question: "Why does =COUNTIF(A:A, \"*abc*\") count cells containing \"abc\" anywhere?",
    shortAnswer: "Because the asterisk wildcard matches zero or more characters before and after \"abc\".",
    explanation: "This is the standard wildcard behaviour in Excel.",
    level: "basic",
    codeExample: "Matches \"abc\", \"123abc\", \"abcxyz\"."
  },
  {
    question: "What is the result of =COUNTIF(A1:A10, \"?\") if cells contain \"A\", \"AB\", \"\"?",
    shortAnswer: "Counts cells with exactly one character (\"A\" only). \"AB\" has two characters, \"\" has zero, so result is 1.",
    explanation: "The question mark matches a single character, not zero.",
    level: "intermediate",
    codeExample: "Useful for checking data length."
  },
  {
    question: "Can COUNTIF count based on cell colour or formatting?",
    shortAnswer: "No, COUNTIF only works with cell values, not formatting.",
    explanation: "For conditional counting based on colour, you need VBA or special add‑ins.",
    level: "advanced",
    codeExample: "Cannot be done with built‑in functions."
  },
  {
    question: "How to count cells that are between two numbers (e.g., 10 and 20)?",
    shortAnswer: "Use two COUNTIFs: =COUNTIF(range, \">=10\") - COUNTIF(range, \">20\")",
    explanation: "Or use COUNTIFS with multiple criteria on the same range.",
    level: "intermediate",
    codeExample: "=COUNTIFS(range, \">=10\", range, \"<=20\")"
  },
  {
    question: "What is the quickest way to count unique values in a column using COUNTIF?",
    shortAnswer: "Use =SUMPRODUCT(1/COUNTIF(range, range)).",
    explanation: "This is an array formula; in older Excel requires Ctrl+Shift+Enter.",
    level: "expert",
    codeExample: "=SUMPRODUCT(1/COUNTIF(A2:A100, A2:A100))"
  },
  {
    question: "Does COUNTIF treat leading zeroes in numbers?",
    shortAnswer: "Yes, if the number is stored as text, the leading zeroes are part of the string. If stored as number, leading zeroes are not displayed.",
    explanation: "For IDs, they are often text; COUNTIF will match exactly including zeroes.",
    level: "advanced",
    codeExample: "COUNTIF(A:A, \"00123\") matches only text \"00123\"."
  },
  {
    question: "How to count cells that contain a question mark as literal?",
    shortAnswer: "Use tilde ~ before the question mark: =COUNTIF(range, \"~?\")",
    explanation: "The tilde escapes wildcard characters (*, ?, ~).",
    level: "expert",
    codeExample: "=COUNTIF(A:A, \"~?\") counts cells that contain only a question mark."
  },
  {
    question: "What is the difference between COUNTIF(range, \"\") and COUNTBLANK(range)?",
    shortAnswer: "COUNTIF(range, \"\") counts cells that are empty (including formula results that return \"\"). COUNTBLANK counts only truly blank cells.",
    explanation: "COUNTBLANK treats formula that returns \"\" as not blank? Actually COUNTBLANK counts cells that appear blank, including those with empty string. Behaviour is subtle; test.",
    level: "expert",
    codeExample: "Usually COUNTIF(range, \"\") and COUNTBLANK(range) return same for truly blank, but may differ with formula results."
  },
  {
    question: "Can COUNTIF be used in conditional formatting?",
    shortAnswer: "Yes, as a formula rule: =COUNTIF($A$1:$A$10, $A1)>1 highlights duplicates.",
    explanation: "COUNTIF inside conditional formatting is powerful.",
    level: "advanced",
    codeExample: "Highlights duplicate entries."
  },
  {
    question: "What is the output of =COUNTIF(A:A, \"*\") if column A contains numbers?",
    shortAnswer: "It counts numbers stored as text, but not pure numbers (unless they are stored as text).",
    explanation: "The * wildcard matches text; numbers without text formatting are ignored.",
    level: "intermediate",
    codeExample: "Use COUNT for numbers."
  },
  {
    question: "How to count cells that contain a specific substring ignoring case?",
    shortAnswer: "COUNTIF is already case-insensitive, so =COUNTIF(range, \"*substring*\") works.",
    explanation: "No special function needed.",
    level: "basic",
    codeExample: "=COUNTIF(Description, \"*urgent*\") counts cells containing \"urgent\" in any case."
  }
];

export default questions;