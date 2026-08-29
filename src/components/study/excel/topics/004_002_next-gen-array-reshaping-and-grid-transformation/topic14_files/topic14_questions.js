const questions = [
  {
    "question": "What is the primary purpose of the TRIMRANGE function in Excel 365?",
    "options": [
      "To strip blank rows and columns from the outer edges of a range or dynamic array",
      "To remove spaces inside text",
      "To delete cell formatting",
      "To crop charts"
    ],
    "correctAnswer": 0,
    "explanation": "TRIMRANGE removes blank boundary rows and columns from ranges."
  },
  {
    "question": "How does TRIMRANGE differ from the classic TRIM function?",
    "options": [
      "TRIM removes extra space characters inside text strings; TRIMRANGE removes empty rows and columns from grid arrays",
      "They are identical",
      "TRIM is for numbers",
      "TRIMRANGE only works on Mac"
    ],
    "correctAnswer": 0,
    "explanation": "TRIM cleans text spaces; TRIMRANGE trims range boundaries."
  },
  {
    "question": "What new range operator in Excel 365 works as a concise shorthand for TRIMRANGE?",
    "options": [
      "A1:.B10 (The trimmed range operator)",
      "A1..B10",
      "A1->B10",
      "A1#B10"
    ],
    "correctAnswer": 0,
    "explanation": "The dot operator (. :) trims blank boundary rows/columns."
  },
  {
    "question": "What does trim_row_mode = 1 specify in TRIMRANGE?",
    "options": [
      "Trim leading blank rows (from the top)",
      "Trim trailing blank rows",
      "Trim both leading and trailing blank rows",
      "Trim all blank rows"
    ],
    "correctAnswer": 0,
    "explanation": "Mode 1 trims leading blank rows."
  },
  {
    "question": "What does trim_row_mode = 2 specify in TRIMRANGE?",
    "options": [
      "Trim trailing blank rows (from the bottom)",
      "Trim leading",
      "Trim none",
      "Trim all"
    ],
    "correctAnswer": 0,
    "explanation": "Mode 2 trims trailing blank rows."
  },
  {
    "question": "What does trim_row_mode = 3 (default) specify in TRIMRANGE?",
    "options": [
      "Trim both leading and trailing blank rows",
      "Trim leading only",
      "Trim trailing only",
      "No trim"
    ],
    "correctAnswer": 0,
    "explanation": "Mode 3 trims both leading and trailing boundary blanks."
  },
  {
    "question": "What does trim_col_mode = 3 specify in TRIMRANGE?",
    "options": [
      "Trim both leading and trailing blank columns",
      "Trim left only",
      "Trim right only",
      "No trim"
    ],
    "correctAnswer": 0,
    "explanation": "Trims empty columns from left and right boundaries."
  },
  {
    "question": "Does TRIMRANGE remove blank rows that exist in the middle of a dataset?",
    "options": [
      "No, it strictly trims boundary edges; internal blank rows are preserved",
      "Yes, deletes all blanks",
      "Replaces with 0",
      "Throws error"
    ],
    "correctAnswer": 0,
    "explanation": "TRIMRANGE preserves interior blank rows, cleaning only boundary edges."
  },
  {
    "question": "Why is TRIMRANGE essential when creating dynamic spilled charts?",
    "options": [
      "It prevents trailing empty rows in whole-column references (e.g. A2:A1000) from polluting chart category axes",
      "Charts cannot read numbers",
      "It makes charts 3D",
      "It speeds up graphics"
    ],
    "correctAnswer": 0,
    "explanation": "Prevents trailing blank rows from stretching chart category scales."
  },
  {
    "question": "What formula trims trailing blank rows from column A (A2:A1000)?",
    "options": [
      "=TRIMRANGE(A2:A1000, 2)",
      "=TRIM(A2:A1000)",
      "=CLEAN(A2:A1000)",
      "=DROP(A2:A1000)"
    ],
    "correctAnswer": 0,
    "explanation": "Mode 2 removes trailing blank rows."
  },
  {
    "question": "How does TRIMRANGE handle zero vs empty blank cells?",
    "options": [
      "Zero (0) is treated as valid data and NOT trimmed; only truly blank / empty string \"\" cells are trimmed",
      "Trims zeros",
      "Converts zeros to blanks",
      "Errors on zero"
    ],
    "correctAnswer": 0,
    "explanation": "Numeric 0 is retained; only blank cells are trimmed."
  },
  {
    "question": "Can TRIMRANGE be chained directly with other array functions like TOCOL and CHOOSEROWS?",
    "options": [
      "Yes (e.g. =TOCOL(TRIMRANGE(A1:F50)))",
      "No",
      "Only with VBA",
      "Only in CSV"
    ],
    "correctAnswer": 0,
    "explanation": "TRIMRANGE outputs dynamic arrays compatible with all array functions."
  },
  {
    "question": "What happens if an entire range passed to TRIMRANGE is completely blank?",
    "options": [
      "Returns a single empty cell or empty array without crashing",
      "Throws #VALUE!",
      "Throws #SPILL!",
      "Closes workbook"
    ],
    "correctAnswer": 0,
    "explanation": "Gracefully returns an empty range."
  },
  {
    "question": "How does TRIMRANGE simplify dynamic template creation?",
    "options": [
      "Allows users to allocate generous 10,000-row ranges while dynamically contracting to active data bounds",
      "Requires typing data",
      "Disables formulas",
      "Locks sheets"
    ],
    "correctAnswer": 0,
    "explanation": "Templates can reference large buffer ranges without wasting memory on blanks."
  },
  {
    "question": "What is the return type of TRIMRANGE?",
    "options": [
      "A cropped dynamic range or spilled 2D array",
      "Single string",
      "Boolean",
      "Number"
    ],
    "correctAnswer": 0,
    "explanation": "Returns a trimmed range or dynamic array."
  },
  {
    "question": "What does trim_row_mode = 0 specify?",
    "options": [
      "Do not trim row boundaries",
      "Trim all",
      "Trim top",
      "Trim bottom"
    ],
    "correctAnswer": 0,
    "explanation": "Mode 0 disables row trimming."
  },
  {
    "question": "In Barrackpore student rosters, how does TRIMRANGE clean imported batch CSVs with blank header lines?",
    "options": [
      "=TRIMRANGE(A1:E100, 1, 0) trims leading blank rows automatically",
      "=DELETE()",
      "=DROP()",
      "=CLEAR()"
    ],
    "correctAnswer": 0,
    "explanation": "Mode 1 strips leading empty rows from messy imports."
  },
  {
    "question": "What is the memory benefit of TRIMRANGE over nested FILTER formulas?",
    "options": [
      "Significantly faster evaluation and simpler formula syntax without evaluating complex boolean criteria arrays",
      "Saves disk space",
      "Uses no RAM",
      "Encrypts data"
    ],
    "correctAnswer": 0,
    "explanation": "Evaluates boundary edges in single-pass without criteria allocations."
  },
  {
    "question": "Can TRIMRANGE be used inside LAMBDA helper functions?",
    "options": [
      "Yes, fully supported inside MAP, REDUCE, SCAN, BYROW, BYCOL",
      "No",
      "Only MAP",
      "Only SCAN"
    ],
    "correctAnswer": 0,
    "explanation": "Fully compatible with all modern lambda helpers."
  },
  {
    "question": "How does TRIMRANGE interact with structured Table references?",
    "options": [
      "Trims empty boundary rows if extra blank rows exist within the structured range",
      "Tables cannot use formulas",
      "Errors",
      "Deletes table"
    ],
    "correctAnswer": 0,
    "explanation": "Works seamlessly on Table column slices."
  },
  {
    "question": "What does =A1:.B20 evaluate to using the dot operator syntax?",
    "options": [
      "A trimmed range from A1 to B20 with empty boundary cells removed",
      "A text string",
      "Multiplication",
      "A hyperlink"
    ],
    "correctAnswer": 0,
    "explanation": "The dot operator trims blank boundary cells from the range."
  },
  {
    "question": "Does TRIMRANGE modify source cells on the worksheet?",
    "options": [
      "No, it is a non-destructive formula that returns a trimmed output array in memory",
      "Yes, deletes cells",
      "Clears source",
      "Overwrites disk"
    ],
    "correctAnswer": 0,
    "explanation": "Non-destructive; source worksheet cells remain untouched."
  },
  {
    "question": "What happens if a cell contains a space string \" \" instead of true blank?",
    "options": [
      "Space is treated as text content and is NOT trimmed unless wrapped with TRIM/CLEAN",
      "Auto trimmed",
      "Converts to 0",
      "Errors"
    ],
    "correctAnswer": 0,
    "explanation": "Space characters have length > 0 and must be sanitized."
  },
  {
    "question": "How to combine TRIMRANGE with SORT to sort only populated rows?",
    "options": [
      "=SORT(TRIMRANGE(A2:D500, 3, 3))",
      "=SORT(A2:D500)",
      "=TRIM(SORT())",
      "=FILTER(SORT())"
    ],
    "correctAnswer": 0,
    "explanation": "Trimming before sorting prevents blank rows from floating to top/bottom."
  },
  {
    "question": "What is the primary advantage of TRIMRANGE over traditional OFFSET/COUNTA dynamic named ranges?",
    "options": [
      "It is non-volatile, spills dynamically, and does not trigger recalculation on every sheet click",
      "It uses macros",
      "It is older",
      "It is slower"
    ],
    "correctAnswer": 0,
    "explanation": "Non-volatile calculation prevents workbook calculation lag."
  },
  {
    "question": "Can TRIMRANGE be used with XLOOKUP return ranges?",
    "options": [
      "Yes (e.g. =XLOOKUP(key, lookup_col, TRIMRANGE(return_matrix)))",
      "No",
      "Only VLOOKUP",
      "Only INDEX"
    ],
    "correctAnswer": 0,
    "explanation": "Can wrap return matrices for dynamic multi-column lookups."
  },
  {
    "question": "What does trim_col_mode = 1 specify?",
    "options": [
      "Trim leading blank columns (from the left)",
      "Trim right",
      "Trim both",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "Mode 1 trims leftmost empty columns."
  },
  {
    "question": "What does trim_col_mode = 2 specify?",
    "options": [
      "Trim trailing blank columns (from the right)",
      "Trim left",
      "Trim both",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "Mode 2 trims rightmost empty columns."
  },
  {
    "question": "How to eliminate ragged edges from multi-column web scrapes?",
    "options": [
      "=TRIMRANGE(scrape_range, 3, 3)",
      "=CLEAN()",
      "=DELETE()",
      "=DROP()"
    ],
    "correctAnswer": 0,
    "explanation": "Mode 3 on rows and columns crops messy scraped tables cleanly."
  },
  {
    "question": "Why is TRIMRANGE a cornerstone of modern zero-maintenance spreadsheet engineering?",
    "options": [
      "It guarantees formulas and charts always fit actual active data without manual range adjustments",
      "It replaces Excel",
      "It removes numbers",
      "It is free"
    ],
    "correctAnswer": 0,
    "explanation": "Ensures responsive, self-adjusting grid bounds."
  }
];

export default questions;
