const questions = [
  {
    question: "What does RANK.AVG do?",
    shortAnswer: "Returns the rank of a number, averaging the ranks for ties.",
    explanation: "For duplicate values, it assigns the average of the ranks that the duplicates would occupy.",
    level: "basic",
    codeExample: "=RANK.AVG(A1, $A$1:$A$100)"
  },
  {
    question: "How does RANK.AVG differ from RANK.EQ?",
    shortAnswer: "RANK.EQ gives the same rank to ties and skips the next rank; RANK.AVG gives the average rank (can be decimal) and does not skip the next rank.",
    explanation: "Example: {95,95,92} → RANK.EQ: 1,1,3; RANK.AVG: 1.5,1.5,3.",
    level: "basic",
    codeExample: "Both give same result when no ties."
  },
  {
    question: "What is the default order of RANK.AVG?",
    shortAnswer: "Descending (0) – largest value gets rank 1.",
    explanation: "Same as RANK.EQ and the older RANK function.",
    level: "basic",
    codeExample: "=RANK.AVG(100, ref) gives rank 1 if 100 is largest."
  },
  {
    question: "What error does RANK.AVG return if number is not in ref?",
    shortAnswer: "#N/A",
    explanation: "Because it cannot rank a value that isn’t present.",
    level: "basic",
    codeExample: "=RANK.AVG(999, A1:A10) → #N/A"
  },
  {
    question: "Why might RANK.AVG return a decimal rank?",
    shortAnswer: "Because ties cause the average of consecutive integers, which may be fractional (e.g., (2+3)/2 = 2.5).",
    explanation: "Only happens when there are ties.",
    level: "intermediate",
    codeExample: "Decimals are normal."
  },
  {
    question: "What is the result of =RANK.AVG(95, {95,95,92})?",
    shortAnswer: "1.5 (average of ranks 1 and 2).",
    explanation: "Both 95s occupy ranks 1 and 2, average = 1.5.",
    level: "basic",
    codeExample: "Then 92 gets rank 3."
  },
  {
    question: "How does RANK.AVG treat three identical numbers?",
    shortAnswer: "They each receive the average of ranks 1,2,3 → 2.",
    explanation: "If three values tie, each gets rank 2.",
    level: "intermediate",
    codeExample: "After ties, next distinct value gets rank 4."
  },
  {
    question: "Can RANK.AVG be used with descending order for race times?",
    shortAnswer: "Yes, but descending order (default) would give larger times higher rank, which is not typical for races. Use order=1 for ascending (smaller time = better rank).",
    explanation: "order=1 gives rank 1 to smallest time.",
    level: "intermediate",
    codeExample: "=RANK.AVG(time, times, 1)"
  },
  {
    question: "What is the relationship between RANK.AVG and PERCENTRANK?",
    shortAnswer: "PERCENTRANK gives the relative standing (0 to 1), while RANK.AVG gives the ordinal rank.",
    explanation: "Different purposes.",
    level: "advanced",
    codeExample: "RANK.AVG can be converted to percentile: (RANK.AVG -1)/(COUNT-1)."
  },
  {
    question: "Does RANK.AVG ignore text and blanks in ref?",
    shortAnswer: "Yes, it only ranks numeric values.",
    explanation: "Text and blanks are ignored, so range can include headers safely.",
    level: "basic",
    codeExample: "Safe."
  },
  {
    question: "How to break ties in RANK.AVG – can you get unique ranks?",
    shortAnswer: "RANK.AVG intentionally gives same rank to ties. To break ties, use a helper column: =RANK.AVG(value, ref) + COUNTIF($A$1:A1, value)/1000.",
    explanation: "Adding a small tie‑breaker based on position.",
    level: "advanced",
    codeExample: "Custom tie‑break."
  },
  {
    question: "What is the maximum number of arguments RANK.AVG accepts?",
    shortAnswer: "Three: number, ref, order.",
    explanation: "Exactly like RANK.EQ.",
    level: "basic",
    codeExample: "2 or 3 arguments."
  },
  {
    question: "Can RANK.AVG be used with dates?",
    shortAnswer: "Yes, dates are serial numbers; order=0 ranks later dates higher.",
    explanation: "Earliest date gets rank count (lowest) unless order=1.",
    level: "intermediate",
    codeExample: "=RANK.AVG(TODAY(), date_range)"
  },
  {
    question: "What happens if you use RANK.AVG on an empty ref?",
    shortAnswer: "Returns #N/A because no numbers to rank against.",
    explanation: "Ref must contain at least one number.",
    level: "basic",
    codeExample: "=RANK.AVG(5, A1:A10) with all blanks → #N/A"
  },
  {
    question: "How does RANK.AVG behave with negative numbers?",
    shortAnswer: "Normally – negative numbers are smaller, so in descending order they get lower rank.",
    explanation: "Works as expected.",
    level: "basic",
    codeExample: "{ -10, -5, 0 } descending: 0 rank1, -5 rank2, -10 rank3."
  },
  {
    question: "Why would a statistician prefer RANK.AVG over RANK.EQ?",
    shortAnswer: "For non‑parametric tests (e.g., Mann‑Whitney), ties need to receive the average rank to avoid bias.",
    explanation: "Standard practice in rank‑based statistical tests.",
    level: "expert",
    codeExample: "Used in R function `rank(ties.method=\"average\")`."
  },
  {
    question: "Can RANK.AVG be used with a 3D reference across sheets?",
    shortAnswer: "Not directly; you need to combine ranges using VSTACK or multiple arguments.",
    explanation: "In Excel 365, =RANK.AVG(number, VSTACK(Sheet1!A:A, Sheet2!A:A)).",
    level: "advanced",
    codeExample: "Works with dynamic arrays."
  },
  {
    question: "What is the difference between RANK.AVG and SUMPRODUCT method for average ranking?",
    shortAnswer: "RANK.AVG is built‑in and easier; the SUMPRODUCT method is more flexible but complex.",
    explanation: "For basic use, RANK.AVG is recommended.",
    level: "advanced",
    codeExample: "RANK.AVG is simpler."
  },
  {
    question: "What order gives rank 1 to the smallest value?",
    shortAnswer: "order = 1 (ascending).",
    explanation: "Useful for ranking race times, error rates, etc.",
    level: "basic",
    codeExample: "=RANK.AVG(A1, ref, 1)"
  },
  {
    question: "Is RANK.AVG a volatile function?",
    shortAnswer: "No, it recalculates only when data changes.",
    explanation: "Safe for large workbooks.",
    level: "intermediate",
    codeExample: "Non‑volatile."
  },
  {
    question: "Can RANK.AVG be used with array constants?",
    shortAnswer: "Yes, e.g., =RANK.AVG(5, {1,2,3,4,5}).",
    explanation: "Array constants work as ref.",
    level: "intermediate",
    codeExample: "=RANK.AVG(3, {1,2,3,3,4}) → 3.5? Actually positions: 3 ranks 3 and 4, average 3.5. Correct."
  },
  {
    question: "How to get integer ranks after averaging?",
    shortAnswer: "Wrap with ROUND or ROUNDUP: =ROUND(RANK.AVG(value, ref, 0), 0).",
    explanation: "But this loses the tie‑handling property.",
    level: "advanced",
    codeExample: "Only if you must have integers."
  },
  {
    question: "What is the output of =RANK.AVG(5, {5,5,5})?",
    shortAnswer: "2 (average of ranks 1,2,3 = 2).",
    explanation: "All identical → all get rank 2.",
    level: "basic",
    codeExample: "Symmetrical."
  },
  {
    question: "Can RANK.AVG be used with Excel Tables?",
    shortAnswer: "Yes: =RANK.AVG([@Score], Table1[Score])",
    explanation: "Structured references work and are absolute.",
    level: "basic",
    codeExample: "Convenient."
  },
  {
    question: "What does RANK.AVG return if there are no numbers in ref?",
    shortAnswer: "#N/A",
    explanation: "At least one number is required.",
    level: "basic",
    codeExample: "Empty range → #N/A."
  },
  {
    question: "How to rank only visible cells with RANK.AVG?",
    shortAnswer: "Use AGGREGATE with function 14? Actually AGGREGATE has no direct RANK.AVG. You'd need a helper column for visible rows.",
    explanation: "RANK.AVG does not respect filters.",
    level: "advanced",
    codeExample: "Complex workaround."
  },
  {
    question: "What is the difference between RANK.AVG and PERCENTILE?",
    shortAnswer: "PERCENTILE is a quantile value; RANK.AVG is an ordinal rank. They are different concepts.",
    explanation: "Percentile rank is RANK.AVG normalised.",
    level: "advanced",
    codeExample: "Related but not same."
  },
  {
    question: "Why might RANK.AVG return the same integer as RANK.EQ?",
    shortAnswer: "When there are no ties, both functions give the same integer result.",
    explanation: "Ties cause the difference.",
    level: "basic",
    codeExample: "Identical when no duplicates."
  },
  {
    question: "Can RANK.AVG be used in conditional formatting to highlight top 3?",
    shortAnswer: "Yes, but careful with ties: =RANK.AVG(A1, $A$1:$A$100) <= 3 will highlight values with average rank ≤3, which may highlight more than 3 rows if ties exist.",
    explanation: "That might be intended.",
    level: "intermediate",
    codeExample: "Use with understanding."
  },
  {
    question: "What is an alternative to RANK.AVG in older Excel (pre‑2010)?",
    shortAnswer: "The RANK function (without modifier) works like RANK.EQ, not RANK.AVG. For average ranking, you'd need a complex array formula.",
    explanation: "RANK.AVG was introduced in Excel 2010.",
    level: "expert",
    codeExample: "Update Excel for the function."
  }
];

export default questions;