const questions = [
  {
    question: "What does MODE.SNGL return?",
    shortAnswer: "The most frequently occurring number in a dataset.",
    explanation: "If no number repeats, or if the set has multiple modes (all same frequency), it returns the smallest mode. If no repetition, returns #N/A.",
    level: "basic",
    codeExample: "=MODE.SNGL(1,2,2,3) → 2"
  },
  {
    question: "What is the difference between MODE.SNGL and MODE.MULT?",
    shortAnswer: "MODE.SNGL returns one value (the smallest mode); MODE.MULT returns an array of all modes.",
    explanation: "Use MODE.MULT when you want to see all values that appear most frequently.",
    level: "intermediate",
    codeExample: "Dataset {1,1,2,2,3} → MODE.SNGL=1, MODE.MULT={1,2}"
  },
  {
    question: "What does MODE.SNGL return if all numbers are unique?",
    shortAnswer: "#N/A (no mode exists).",
    explanation: "Because no value appears more than once, there is no mode.",
    level: "basic",
    codeExample: "=MODE.SNGL(1,2,3,4) → #N/A"
  },
  {
    question: "Does MODE.SNGL ignore text and blanks?",
    shortAnswer: "Yes, it only considers numeric values.",
    explanation: "Text and blank cells are completely ignored; they do not affect the frequency count.",
    level: "basic",
    codeExample: "Range with {5, \"a\", blank, 5} → MODE.SNGL = 5"
  },
  {
    question: "If a dataset has two modes (bimodal), which value does MODE.SNGL return?",
    shortAnswer: "The smaller mode (lower numeric value) among the ties.",
    explanation: "Example: {1,1,1,2,2,2,3} → both 1 and 2 appear three times; MODE.SNGL returns 1 (the smaller).",
    level: "intermediate",
    codeExample: "=MODE.SNGL(1,1,1,2,2,2) → 1"
  },
  {
    question: "Can MODE.SNGL be used with dates?",
    shortAnswer: "Yes, because dates are stored as numbers. The result will be a serial number; format as date to see the date itself.",
    explanation: "Useful for finding the most common order or event date.",
    level: "intermediate",
    codeExample: "=MODE.SNGL(A2:A100) where A contains dates → most frequent date as number."
  },
  {
    question: "What error does MODE.SNGL return if no numbers are provided?",
    shortAnswer: "#N/A (no mode).",
    explanation: "With an empty range or all non‑numeric, there is no mode.",
    level: "basic",
    codeExample: "=MODE.SNGL(A1:A10) all blank → #N/A"
  },
  {
    question: "How to get the most common text value (e.g., product name) using MODE.SNGL?",
    shortAnswer: "You cannot directly; MODE.SNGL works only on numbers. Use an array formula: =INDEX(range, MATCH(MAX(COUNTIF(range, range)), COUNTIF(range, range), 0)).",
    explanation: "This is an advanced technique; in Excel 365, use MODE.MULT on numeric codes assigned to text.",
    level: "expert",
    codeExample: "See online resources for mode of text."
  },
  {
    question: "Can MODE.SNGL be used for conditional mode (mode under a condition)?",
    shortAnswer: "Yes, with array formula: =MODE.SNGL(IF(criteria_range=criteria, mode_range)).",
    explanation: "Enter with Ctrl+Shift+Enter in older Excel; in 365 works normally.",
    level: "advanced",
    codeExample: "{=MODE.SNGL(IF(A1:A100=\"Sales\", B1:B100))}"
  },
  {
    question: "What is the difference between MODE.SNGL and MODE (the old function)?",
    shortAnswer: "The old MODE function is identical to MODE.SNGL; MODE.SNGL was introduced for compatibility with MODE.MULT and to clarify that it returns a single value.",
    explanation: "In modern Excel, both work the same; MODE.SNGL is recommended for clarity.",
    level: "basic",
    codeExample: "=MODE(1,2,2,3) = MODE.SNGL(1,2,2,3) = 2"
  },
  {
    question: "How to count the frequency of the mode?",
    shortAnswer: "Use COUNTIF(range, MODE.SNGL(range)).",
    explanation: "This tells you how many times the most frequent number appears.",
    level: "intermediate",
    codeExample: "=COUNTIF(A1:A100, MODE.SNGL(A1:A100))"
  },
  {
    question: "Does MODE.SNGL consider negative numbers?",
    shortAnswer: "Yes, negative numbers are included and sorted by their numeric value.",
    explanation: "Example: {-5,-5,-5,0,0} → mode = -5",
    level: "basic",
    codeExample: "=MODE.SNGL(-5,-5,0,1) → -5"
  },
  {
    question: "Can MODE.SNGL be used across multiple ranges?",
    shortAnswer: "Yes, separate ranges with commas: =MODE.SNGL(A1:A10, C1:C10, E1:E10).",
    explanation: "All numeric cells from all ranges are considered together.",
    level: "intermediate",
    codeExample: "=MODE.SNGL(Sales_Jan, Sales_Feb, Sales_Mar)"
  },
  {
    question: "What is the result of =MODE.SNGL(5,5,5,5)?",
    shortAnswer: "5 (all values same, so the mode is that value).",
    explanation: "Even with all duplicates, the most frequent number is 5.",
    level: "basic",
    codeExample: "All identical → mode = that value."
  },
  {
    question: "Why does MODE.SNGL sometimes return a smaller mode when there are ties?",
    shortAnswer: "By design, MODE.SNGL returns the first mode encountered when sorting values ascending.",
    explanation: "If you need all modes, use MODE.MULT.",
    level: "intermediate",
    codeExample: "Dataset {3,3,2,2} → MODE.SNGL returns 2 (smaller)."
  },
  {
    question: "How to handle #N/A errors from MODE.SNGL gracefully?",
    shortAnswer: "Wrap with IFERROR: =IFERROR(MODE.SNGL(range), \"No mode\") or =IFERROR(MODE.SNGL(range), 0).",
    explanation: "Prevents ugly error display in reports.",
    level: "basic",
    codeExample: "=IFERROR(MODE.SNGL(A2:A100), \"No repetition\")"
  },
  {
    question: "Is MODE.SNGL sensitive to hidden rows or filtering?",
    shortAnswer: "No, it always looks at all rows in the range, even hidden ones. Use AGGREGATE(12,5,range) for visible rows? AGGREGATE does not have mode. For filtered mode, you'd need SUBTOTAL with helper column.",
    explanation: "Standard MODE.SNGL ignores filters.",
    level: "advanced",
    codeExample: "Use advanced filtering with array formulas."
  },
  {
    question: "Can MODE.SNGL work with decimal numbers?",
    shortAnswer: "Yes, any numeric value, including decimals, works.",
    explanation: "Frequencies are based on exact equality (floating point comparison).",
    level: "basic",
    codeExample: "=MODE.SNGL(1.5, 2.5, 1.5, 3.0) → 1.5"
  },
  {
    question: "What is the maximum number of arguments MODE.SNGL accepts?",
    shortAnswer: "255 arguments, like other statistical functions.",
    explanation: "Each argument can be a cell, range, or constant.",
    level: "expert",
    codeExample: "=MODE.SNGL(A1:A1000000, B1:B1000000) works, though slow."
  },
  {
    question: "How to find the mode while ignoring zeros?",
    shortAnswer: "Use array formula: =MODE.SNGL(IF(range<>0, range)).",
    explanation: "Excludes zeros from consideration. Must be array‑entered.",
    level: "advanced",
    codeExample: "{=MODE.SNGL(IF(A1:A100<>0, A1:A100))}"
  },
  {
    question: "Does MODE.SNGL treat numbers stored as text as numbers?",
    shortAnswer: "No, they are ignored because they are text strings, not numbers.",
    explanation: "You can convert with VALUE() first.",
    level: "intermediate",
    codeExample: "If A1=\"5\" (text), =MODE.SNGL(A1,5) → 5 (only the numeric 5 is considered)."
  },
  {
    question: "What is the output of =MODE.SNGL(TRUE, FALSE, TRUE, 5) when TRUE and FALSE are direct arguments?",
    shortAnswer: "TRUE (because TRUE=1, appears twice; FALSE=0 once; 5 once). TRUE is the mode.",
    explanation: "Direct logical arguments are coerced to numbers (TRUE=1, FALSE=0).",
    level: "advanced",
    codeExample: "=MODE.SNGL(TRUE, TRUE, FALSE) → 1 (display as TRUE if formatted?)"
  },
  {
    question: "Can MODE.SNGL be used with array constants like {1,2,2,3}?",
    shortAnswer: "Yes, =MODE.SNGL({1,2,2,3}) returns 2.",
    explanation: "Array constants are treated as direct numeric arguments.",
    level: "advanced",
    codeExample: "=MODE.SNGL({1,2,2,3,4,4,4}) → 4"
  },
  {
    question: "How to find the mode of a frequency distribution from a pivot table?",
    shortAnswer: "You cannot directly; copy the value field and use MODE.SNGL on the counts. Or use the original data.",
    explanation: "Pivot tables summarise counts; mode of the count column is not the same as the mode of original values.",
    level: "expert",
    codeExample: "Use source data."
  },
  {
    question: "Why might MODE.SNGL return #N/A when I expect a mode?",
    shortAnswer: "Possible reasons: all numbers are unique, range contains only text/errors, or numbers stored as text.",
    explanation: "Check data types and consider converting text numbers.",
    level: "intermediate",
    codeExample: "Use =ISTEXT(A1) to detect text numbers."
  },
  {
    question: "Can MODE.SNGL be used in conditional formatting to highlight the most frequent value?",
    shortAnswer: "Yes, use a formula rule: =A1=MODE.SNGL($A$1:$A$100)",
    explanation: "Highlights the most common number in the range.",
    level: "advanced",
    codeExample: "Works well for quick visual identification."
  },
  {
    question: "What is the difference between mode and median?",
    shortAnswer: "Mode is the most frequent value; median is the middle value after sorting.",
    explanation: "They measure different aspects of central tendency.",
    level: "basic",
    codeExample: "Dataset {1,1,2,3,4}: mode=1, median=2."
  },
  {
    question: "How to find the mode for a grouped dataset (e.g., age groups)?",
    shortAnswer: "First bin the data into categories, then use MODE.SNGL on the category labels (numbers).",
    explanation: "Mode is most meaningful for discrete categories.",
    level: "advanced",
    codeExample: "Create bins using FLOOR or INT, then mode."
  },
  {
    question: "What is the result of =MODE.SNGL({1,1,2,2,3,3})?",
    shortAnswer: "1 (the smallest among ties: 1,2,3 each appear twice, returns 1).",
    explanation: "Tie-breaking: smallest numeric value wins.",
    level: "intermediate",
    codeExample: "Even with equal frequencies, returns 1."
  },
  {
    question: "Does MODE.SNGL work with Excel Tables and structured references?",
    shortAnswer: "Yes: =MODE.SNGL(Table1[Score])",
    explanation: "Structured references auto‑adjust and are easier to read.",
    level: "basic",
    codeExample: "=MODE.SNGL(Table1[Sales])"
  }
];

export default questions;