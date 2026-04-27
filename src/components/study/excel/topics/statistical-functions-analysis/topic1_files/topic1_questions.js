const questions = [
  {
    question: "What does the AVERAGE function do in Excel?",
    shortAnswer: "Returns the arithmetic mean of its arguments.",
    explanation: "AVERAGE sums all numeric arguments and divides by the count of numeric arguments. Ignores text and blanks in cell references.",
    hint: "Think of 'add all and divide by how many'.",
    level: "basic",
    codeExample: "=AVERAGE(10,20,30) → 20"
  },
  {
    question: "What is the result of =AVERAGE(A1:A3) if A1=5, A2=text, A3=15?",
    shortAnswer: "10",
    explanation: "AVERAGE ignores text in cell references, so only 5 and 15 are counted. (5+15)/2 = 10.",
    hint: "Text cells are ignored, not treated as zero.",
    level: "basic",
    codeExample: "AVERAGE(5, \"hello\", 15) in cells → 10."
  },
  {
    question: "How does AVERAGE treat a blank cell?",
    shortAnswer: "Ignores it (does not count it in denominator).",
    explanation: "Blank cells are completely ignored, unlike zeros which pull the average down.",
    hint: "Blank vs zero matters a lot in averages.",
    level: "basic",
    codeExample: "AVERAGE(10, , 20) → 15 (ignores blank)."
  },
  {
    question: "What is the difference between AVERAGE and AVERAGEA?",
    shortAnswer: "AVERAGEA treats text as 0 and TRUE as 1, FALSE as 0; AVERAGE ignores text and logicals.",
    explanation: "AVERAGEA counts every cell, converting non‑numeric to numbers. Rarely used, but helpful when text 0 is intended as zero.",
    hint: "A in AVERAGEA stands for 'all values'.",
    level: "intermediate",
    codeExample: "=AVERAGEA(\"5\", 10) → (5+10)/2 = 7.5 (text \"5\" becomes number)."
  },
  {
    question: "What does =AVERAGE(A:A) do?",
    shortAnswer: "Averages all numbers in the entire column A.",
    explanation: "It ignores text, blanks, and errors. May be slow on very large datasets.",
    hint: "Be careful if column has header text – it's ignored.",
    level: "basic",
    codeExample: "Useful for quick average of all values in a column."
  },
  {
    question: "Why does =AVERAGE(0, 10, 20) return 10 but =AVERAGE( , 10, 20) also 10?",
    shortAnswer: "0 is counted as a number; blank is ignored. Both give same result but denominator differs.",
    explanation: "(0+10+20)/3 = 10; (10+20)/2 = 15? Wait correction: Actually =AVERAGE( ,10,20) yields 15 because denominator is 2. Let me correct: blank is ignored, so average = (10+20)/2 = 15. So they are different! Important point.",
    hint: "Test it – a blank cell does not contribute to denominator; zero does.",
    level: "advanced",
    codeExample: "0,10,20 → 10; (blank),10,20 → 15."
  },
  {
    question: "What error does AVERAGE return if the range has no numeric values?",
    shortAnswer: "#DIV/0!",
    explanation: "Division by zero occurs when there are no numbers to average.",
    hint: "Check for all‑blank or all‑text ranges.",
    level: "basic",
    codeExample: "=AVERAGE(A1:A10) where all cells are text or blank → #DIV/0!"
  },
  {
    question: "How to exclude zeros from average?",
    shortAnswer: "Use AVERAGEIF(range, \"<>0\") or array formula AVERAGE(IF(range<>0, range)).",
    explanation: "AVERAGEIF conditionally includes only numbers not equal to zero.",
    hint: "Use \"<>0\" as criteria.",
    level: "intermediate",
    codeExample: "=AVERAGEIF(A1:A10, \"<>0\")"
  },
  {
    question: "What is the keyboard shortcut to insert AVERAGE?",
    shortAnswer: "No direct shortcut; use AutoSum dropdown or Alt + M + U + A (older Excel).",
    explanation: "Most users click the AutoSum (Σ) button and select Average from dropdown.",
    hint: "The Σ button has a small arrow for other functions.",
    level: "basic",
    codeExample: null
  },
  {
    question: "If A1=5, B1=10, C1 empty, what is =AVERAGE(A1:C1)?",
    shortAnswer: "7.5",
    explanation: "Only A1 and B1 are numeric → (5+10)/2 = 7.5.",
    hint: "Empty cell ignored.",
    level: "basic",
    codeExample: "Result 7.5."
  },
  {
    question: "What is the difference between AVERAGE and MEDIAN?",
    shortAnswer: "AVERAGE is sensitive to outliers; MEDIAN is the middle value and robust.",
    explanation: "For skewed data (e.g., income), median often better represents typical value.",
    hint: "Think of class marks: one very low score pulls average down, but median stays stable.",
    level: "intermediate",
    codeExample: "Data {1,2,100}: AVERAGE=34.33, MEDIAN=2."
  },
  {
    question: "How to calculate weighted average in Excel?",
    shortAnswer: "=SUMPRODUCT(values, weights)/SUM(weights)",
    explanation: "Weighted average accounts for different importance of each number.",
    hint: "Common in grade calculation where assignments have different weights.",
    level: "advanced",
    codeExample: "=SUMPRODUCT(B2:B10, C2:C10)/SUM(C2:C10)"
  },
  {
    question: "What does AVERAGEIF(range, \">=50\", average_range) do?",
    shortAnswer: "Averages values in average_range where corresponding cells in range are >=50.",
    explanation: "Useful for averaging only passing marks, etc.",
    hint: "If average_range omitted, range itself is averaged.",
    level: "intermediate",
    codeExample: "=AVERAGEIF(A1:A10, \">=50\", B1:B10)"
  },
  {
    question: "Can AVERAGE be nested inside IF?",
    shortAnswer: "Yes, e.g., =IF(AVERAGE(B2:B10)>80, \"Good\", \"Needs improvement\").",
    explanation: "Any function that returns a number can be used inside IF conditions.",
    hint: "Great for dynamic feedback.",
    level: "basic",
    codeExample: "=IF(AVERAGE(C2:C11)>=75, \"Class Average Pass\", \"Low Average\")"
  },
  {
    question: "How does AVERAGE treat #DIV/0! error inside the range?",
    shortAnswer: "It propagates the error – the whole AVERAGE returns #DIV/0!.",
    explanation: "Any error in any referenced cell causes AVERAGE to return that error. Use IFERROR to clean.",
    hint: "Always clean data before averaging.",
    level: "intermediate",
    codeExample: "If A1 = #DIV/0!, =AVERAGE(A1:A5) returns #DIV/0!"
  },
  {
    question: "What is the difference between =AVERAGE(TRUE, FALSE) and =AVERAGE(A1:A2) where A1=TRUE, A2=FALSE?",
    shortAnswer: "First returns 0.5 (TRUE=1, FALSE=0), second returns 0 (ignores logicals in references).",
    explanation: "Direct arguments coerce logicals to numbers; cell references do not.",
    hint: "Important nuance for formula design.",
    level: "advanced",
    codeExample: "=AVERAGE(TRUE, FALSE) → 0.5; =AVERAGE(A1:A2) with TRUE,FALSE → 0."
  },
  {
    question: "What is the maximum number of arguments AVERAGE can accept?",
    shortAnswer: "255 arguments, similar to SUM.",
    explanation: "Each argument can be a single cell or a range containing many cells.",
    hint: "Ranges can be huge, but total cell count is limited by memory.",
    level: "expert",
    codeExample: "=AVERAGE(A1:A1000000, B1:B1000000) works."
  },
  {
    question: "How to average only the top 3 values in a range?",
    shortAnswer: "=AVERAGE(LARGE(range, {1,2,3})) as array formula.",
    explanation: "LARGE with array constant returns the top values, then AVERAGE computes mean.",
    hint: "In newer Excel (365) works normally; older needs Ctrl+Shift+Enter.",
    level: "advanced",
    codeExample: "=AVERAGE(LARGE(A1:A10, {1,2,3}))"
  },
  {
    question: "What is the result of =AVERAGE(10, \"20\", 30) when \"20\" is typed directly?",
    shortAnswer: "20",
    explanation: "Text numbers as direct arguments are converted to numbers. (10+20+30)/3 = 20.",
    hint: "Direct arguments vs cell references behave differently.",
    level: "intermediate",
    codeExample: "=AVERAGE(10, \"20\", 30) → 20."
  },
  {
    question: "How to average values that meet multiple criteria?",
    shortAnswer: "Use AVERAGEIFS function.",
    explanation: "AVERAGEIFS(average_range, criteria_range1, criteria1, criteria_range2, criteria2, ...).",
    hint: "Available from Excel 2007 onward.",
    level: "advanced",
    codeExample: "=AVERAGEIFS(C2:C100, A2:A100, \"North\", B2:B100, \">100\")"
  },
  {
    question: "Why might AVERAGE return a decimal with more than 2 places?",
    shortAnswer: "Because the division may not result in an integer; use rounding functions if needed.",
    explanation: "Excel stores numbers with high precision. Format cells to show desired decimals.",
    hint: "=ROUND(AVERAGE(range), 2) for two decimals.",
    level: "basic",
    codeExample: "=ROUND(AVERAGE(B2:B20), 2)"
  },
  {
    question: "What is the difference between AVERAGE and AVERAGEIF when no cells meet criteria?",
    shortAnswer: "AVERAGE returns #DIV/0!; AVERAGEIF returns 0.",
    explanation: "AVERAGEIF returns 0 if no cells satisfy the condition, avoiding division by zero.",
    hint: "Use AVERAGEIF for safer conditional averages.",
    level: "advanced",
    codeExample: "=AVERAGEIF(A1:A10, \">100\") → 0 if none >100."
  },
  {
    question: "How can you average every nth row (e.g., every 3rd row)?",
    shortAnswer: "Use array formula: =AVERAGE(IF(MOD(ROW(range)-ROW(first_cell), n)=0, range)).",
    explanation: "MOD and ROW help filter row positions.",
    hint: "Complex, but doable. Often easier with helper column.",
    level: "expert",
    codeExample: "{=AVERAGE(IF(MOD(ROW(A1:A100)-ROW(A1),3)=0, A1:A100))}"
  },
  {
    question: "What is the purpose of the TRIMMEAN function?",
    shortAnswer: "Returns the mean of the interior of a data set, excluding a percentage of outliers.",
    explanation: "TRIMMEAN(array, percent) removes the smallest and largest values before averaging.",
    hint: "Useful for judging competitions (remove highest/lowest score).",
    level: "expert",
    codeExample: "=TRIMMEAN(A1:A100, 0.1) excludes top 5% and bottom 5%."
  },
  {
    question: "Can AVERAGE be used with 3D references across sheets?",
    shortAnswer: "Yes, =AVERAGE(Sheet1:Sheet3!A1) averages cell A1 from all sheets in between.",
    explanation: "Works like SUM with 3D references.",
    hint: "All sheets must have same structure.",
    level: "advanced",
    codeExample: "=AVERAGE(Jan:Dec!B5) averages B5 across all months."
  },
  {
    question: "What is the output of =AVERAGE(5, \"apple\", 10) if \"apple\" is in a cell?",
    shortAnswer: "7.5 (if \"apple\" is a direct argument) or 0? Wait confusion. Let me clarify: If typed directly =AVERAGE(5, \"apple\", 10) returns #VALUE! because text literal not convertible. If \"apple\" is in cell A2 and A2 contains text, it's ignored → average 7.5.",
    explanation: "Direct text literal causes error; cell text ignored.",
    hint: "Never type non‑numeric literals inside AVERAGE.",
    level: "intermediate",
    codeExample: "=AVERAGE(5, A2, 10) where A2=\"apple\" → (5+10)/2 = 7.5"
  },
  {
    question: "How to average only positive numbers?",
    shortAnswer: "=AVERAGEIF(range, \">0\")",
    explanation: "Simple conditional average excludes zeros and negatives.",
    hint: ">0 criteria works for positives only.",
    level: "basic",
    codeExample: "=AVERAGEIF(A1:A100, \">0\")"
  },
  {
    question: "What does =AVERAGE(IF(range1=criteria, range2)) do?",
    shortAnswer: "Array formula that averages range2 where range1 meets criteria.",
    explanation: "Classic way before AVERAGEIF existed. Must be entered with Ctrl+Shift+Enter.",
    hint: "Modern Excel uses AVERAGEIF instead.",
    level: "advanced",
    codeExample: "{=AVERAGE(IF(A1:A10=\"Yes\", B1:B10))}"
  },
  {
    question: "Why does =AVERAGE(0/0) return #DIV/0!?",
    shortAnswer: "Because 0/0 is an error, and AVERAGE propagates errors.",
    explanation: "Any argument that is an error causes the whole function to error.",
    hint: "Avoid feeding errors into AVERAGE.",
    level: "basic",
    codeExample: "=AVERAGE(5, 0/0) → #DIV/0!"
  },
  {
    question: "What is the result of =AVERAGE(AVERAGE(B2:B10), AVERAGE(C2:C10))?",
    shortAnswer: "Average of the two averages – not the same as overall average unless groups have equal size.",
    explanation: "Be cautious: averaging averages is statistically correct only when group sizes are equal.",
    hint: "Weighted average is safer if group sizes differ.",
    level: "expert",
    codeExample: "If B2:B10 has 9 values and C2:C10 has 9, it's fine; if sizes differ, use SUMPRODUCT."
  }
];

export default questions;