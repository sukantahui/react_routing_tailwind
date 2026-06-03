const questions = [
  {
    question: "What does MODE.MULT return?",
    shortAnswer: "A vertical array of all numbers that occur most frequently in a dataset.",
    explanation: "It returns every mode (value with highest frequency). If no number repeats, returns #N/A.",
    level: "basic",
    codeExample: "=MODE.MULT(1,1,2,2,3) → {1;2}"
  },
  {
    question: "How is MODE.MULT different from MODE.SNGL?",
    shortAnswer: "MODE.SNGL returns only the smallest mode; MODE.MULT returns all modes.",
    explanation: "In bimodal data, MODE.SNGL hides the second peak; MODE.MULT reveals both.",
    level: "basic",
    codeExample: "Data {1,1,2,2} → MODE.SNGL=1, MODE.MULT={1;2}"
  },
  {
    question: "What does MODE.MULT return if there are three modes with equal frequency?",
    shortAnswer: "An array containing all three numbers (sorted ascending).",
    explanation: "Example: {5,5,10,10,8,8} returns {5;8;10} (assuming they appear twice each).",
    level: "intermediate",
    codeExample: "=MODE.MULT({5,5,10,10,8,8}) → {5;8;10}"
  },
  {
    question: "How to use MODE.MULT in Excel 2019 (non‑dynamic arrays)?",
    shortAnswer: "Select a vertical range (e.g., D1:D10), type formula, and press Ctrl+Shift+Enter.",
    explanation: "You must pre‑select enough cells to accommodate all modes; if you select too few, some modes are truncated.",
    level: "advanced",
    codeExample: "Select D1:D3, enter =MODE.MULT(A1:A100), press Ctrl+Shift+Enter."
  },
  {
    question: "What error does MODE.MULT return when all numbers are unique?",
    shortAnswer: "#N/A (no mode).",
    explanation: "Same as MODE.SNGL, no repeated numbers → no mode.",
    level: "basic",
    codeExample: "=MODE.MULT(1,2,3,4) → #N/A"
  },
  {
    question: "Does MODE.MULT ignore text and blanks?",
    shortAnswer: "Yes, it only considers numeric values.",
    explanation: "Text and blank cells are completely ignored; they don't affect frequency.",
    level: "basic",
    codeExample: "Range with {5, \"a\", blank, 5} → mode = 5, only one mode."
  },
  {
    question: "Can MODE.MULT be used with dates?",
    shortAnswer: "Yes, dates are stored as numbers, so it returns most frequent date as serial number (format as date).",
    explanation: "Useful for finding most common order or event date.",
    level: "intermediate",
    codeExample: "=MODE.MULT(DateRange) → array of most common dates."
  },
  {
    question: "How to get the count of modes returned by MODE.MULT?",
    shortAnswer: "=COUNT(MODE.MULT(range)).",
    explanation: "This tells you how many distinct modes exist (1 for unimodal, 2 for bimodal, etc.).",
    level: "intermediate",
    codeExample: "=COUNT(MODE.MULT(A1:A100))"
  },
  {
    question: "What is the result of =MODE.MULT(5,5,5,5)?",
    shortAnswer: "{5} (only one mode, because all values are the same).",
    explanation: "Even though the frequency is 4, there is only one distinct mode.",
    level: "basic",
    codeExample: "All identical → array with that single number."
  },
  {
    question: "Can MODE.MULT be used to find the mode of a filtered list?",
    shortAnswer: "Not directly; it always examines all rows. Use AGGREGATE (no mode) or helper column with SUBTOTAL, then array formula.",
    explanation: "MODE.MULT does not respect filters; you'd need to create a visible‑only array.",
    level: "expert",
    codeExample: "=MODE.MULT(IF(SUBTOTAL(3,OFFSET(range,ROW(range)-MIN(ROW(range)),0,1)), range)) array formula."
  },
  {
    question: "How does MODE.MULT handle decimal numbers?",
    shortAnswer: "It treats them as exact numeric values; equality is determined by floating point precision.",
    explanation: "Values like 1.5 and 1.5000000001 may be considered different; use ROUND if needed.",
    level: "intermediate",
    codeExample: "=MODE.MULT(1.5,1.5,2.5,2.5) → {1.5;2.5}"
  },
  {
    question: "What is the maximum number of arguments MODE.MULT accepts?",
    shortAnswer: "255 arguments, same as MODE.SNGL.",
    explanation: "Each argument can be a range or constant.",
    level: "expert",
    codeExample: "=MODE.MULT(A1:A1000000, B1:B1000000) works."
  },
  {
    question: "Can MODE.MULT be used with array constants?",
    shortAnswer: "Yes, e.g., =MODE.MULT({1,1,2,2,3}) returns {1;2}.",
    explanation: "Array constants are treated as direct arguments.",
    level: "advanced",
    codeExample: "=MODE.MULT({5,5,5,10,10}) → {5}"
  },
  {
    question: "Why might MODE.MULT spill into more cells than expected?",
    shortAnswer: "Because more than one value shares the highest frequency.",
    explanation: "If 10 numbers have the same frequency (e.g., each appears 3 times), all 10 are modes.",
    level: "intermediate",
    codeExample: "Dataset with all values appearing equally often → MODE.MULT returns all distinct values."
  },
  {
    question: "How to capture MODE.MULT results in a single cell (e.g., comma separated)?",
    shortAnswer: "Use TEXTJOIN: =TEXTJOIN(\", \", TRUE, MODE.MULT(range)).",
    explanation: "This works in Excel 365; in older versions, you need to use an array formula with TEXTJOIN.",
    level: "advanced",
    codeExample: "=TEXTJOIN(\", \", TRUE, MODE.MULT(A2:A100))"
  },
  {
    question: "Is MODE.MULT case‑sensitive?",
    shortAnswer: "It works only with numbers, so case sensitivity is irrelevant. For text modes, MODE.MULT does not apply.",
    explanation: "Use a helper column with numeric codes for text analysis.",
    level: "basic",
    codeExample: "N/A – MODE.MULT is for numbers only."
  },
  {
    question: "What is the behaviour of MODE.MULT when the dataset has no mode?",
    shortAnswer: "Returns #N/A.",
    explanation: "Identical to MODE.SNGL in that case.",
    level: "basic",
    codeExample: "=MODE.MULT(1,2,3,4,5) → #N/A"
  },
  {
    question: "How to find the modes that satisfy a condition (conditional mode)?",
    shortAnswer: "Use array formula: =MODE.MULT(IF(criteria_range=criteria, value_range)).",
    explanation: "This returns all modes within the subset that meets the condition.",
    level: "advanced",
    codeExample: "{=MODE.MULT(IF(A1:A100=\"North\", B1:B100))}"
  },
  {
    question: "Can MODE.MULT be used with multiple ranges separated by commas?",
    shortAnswer: "Yes, e.g., =MODE.MULT(A1:A10, C1:C10, E1:E10).",
    explanation: "All numeric cells across all ranges are considered together.",
    level: "intermediate",
    codeExample: "Combine multiple non‑adjacent ranges."
  },
  {
    question: "What is the difference between MODE.MULT and FREQUENCY for finding common values?",
    shortAnswer: "FREQUENCY returns bin counts; MODE.MULT directly returns the values themselves that are modes.",
    explanation: "MODE.MULT is simpler for finding modes; FREQUENCY gives a full distribution.",
    level: "advanced",
    codeExample: "Use MODE.MULT for quick answers, FREQUENCY for detailed histograms."
  },
  {
    question: "How to handle #N/A when there is no mode?",
    shortAnswer: "Wrap with IFERROR: =IFERROR(MODE.MULT(range), \"No mode\") – but IFERROR converts the entire array to text. Better to test with COUNT before.",
    explanation: "Because MODE.MULT returns an array, IFERROR may not work as expected; use =IF(COUNT(MODE.MULT(range))>0, MODE.MULT(range), \"No mode\").",
    level: "expert",
    codeExample: "Complex but robust."
  },
  {
    question: "Does MODE.MULT consider zero as a valid number?",
    shortAnswer: "Yes, zero is a number. If zero appears most frequently, it will be returned as a mode.",
    explanation: "Zero is counted like any other number.",
    level: "basic",
    codeExample: "{0,0,5,5,5} → mode is 5 (not zero)."
  },
  {
    question: "What is the output of =MODE.MULT({1,2,2,3,3,3,4,4,4})?",
    shortAnswer: "{3;4} (both appear three times).",
    explanation: "3 appears three times, 4 appears three times, 2 appears twice, 1 once – modes are 3 and 4.",
    level: "intermediate",
    codeExample: "Returns {3;4}"
  },
  {
    question: "Can MODE.MULT be used with the LET function for cleaner formulas?",
    shortAnswer: "Yes: =LET(modes, MODE.MULT(data), INDEX(modes, 1)) to get first mode, etc.",
    explanation: "LET stores the array result, then you can manipulate it without recalculation.",
    level: "expert",
    codeExample: "=LET(m, MODE.MULT(A:A), TEXTJOIN(\", \", TRUE, m))"
  },
  {
    question: "Why would a professional use MODE.MULT over MODE.SNGL?",
    shortAnswer: "To avoid missing important secondary peaks when the data is multimodal.",
    explanation: "In business, ignoring a second popular product size can lead to lost sales.",
    level: "intermediate",
    codeExample: "Inventory planning requires all modes."
  },
  {
    question: "Is there a performance difference between MODE.SNGL and MODE.MULT?",
    shortAnswer: "MODE.MULT may be slightly slower because it has to collect all modes, but difference is negligible for normal datasets.",
    explanation: "Both are well optimised.",
    level: "advanced",
    codeExample: "Use MODE.MULT when you need all modes; otherwise MODE.SNGL is fine."
  },
  {
    question: "How to get only the first (smallest) mode from MODE.MULT?",
    shortAnswer: "=MIN(MODE.MULT(range)) or =INDEX(MODE.MULT(range), 1).",
    explanation: "Use MIN if you want the smallest numeric mode; INDEX returns the first in the spill order (ascending).",
    level: "intermediate",
    codeExample: "=MIN(MODE.MULT(A2:A100))"
  },
  {
    question: "Can MODE.MULT be used with Excel Tables structured references?",
    shortAnswer: "Yes: =MODE.MULT(Table1[Score])",
    explanation: "Structured references auto‑adjust and are easier to maintain.",
    level: "basic",
    codeExample: "=MODE.MULT(Table1[Sales])"
  },
  {
    question: "What is the output of =MODE.MULT({1,1,2,2,2,3,3})?",
    shortAnswer: "{2} (only 2 appears three times; 1 and 3 appear twice).",
    explanation: "Unimodal data returns a single value array.",
    level: "basic",
    codeExample: "Only one distinct mode."
  },
  {
    question: "How to convert MODE.MULT result from vertical to horizontal?",
    shortAnswer: "Use TRANSPOSE: =TRANSPOSE(MODE.MULT(range)).",
    explanation: "Transpose turns the vertical array into a horizontal row.",
    level: "intermediate",
    codeExample: "Useful for placing modes in a row."
  }
];

export default questions;