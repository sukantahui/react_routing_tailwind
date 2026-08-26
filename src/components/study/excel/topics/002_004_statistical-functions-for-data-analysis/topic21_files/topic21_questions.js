const questions = [
  {
    question: "What does RANK.EQ do?",
    shortAnswer: "Returns the rank of a number in a list, with equal numbers receiving the same rank.",
    explanation: "It assigns the same rank to ties, and the next rank numbers are skipped (e.g., 1,2,2,4).",
    level: "basic",
    codeExample: "=RANK.EQ(A1, $A$1:$A$100)"
  },
  {
    question: "What is the default order of RANK.EQ?",
    shortAnswer: "Descending (0) – largest value gets rank 1.",
    explanation: "If order is omitted or set to 0, the largest number is the best rank.",
    level: "basic",
    codeExample: "Same as =RANK.EQ(A1, ref, 0)"
  },
  {
    question: "How to get ascending ranking (smallest = rank 1)?",
    shortAnswer: "Set order argument to 1: =RANK.EQ(number, ref, 1).",
    explanation: "Useful for ranking times (smallest time is best).",
    level: "basic",
    codeExample: "=RANK.EQ(A1, ref, 1)"
  },
  {
    question: "What error does RANK.EQ return if the number is not in ref?",
    shortAnswer: "#N/A",
    explanation: "Because the value cannot be ranked against a list that doesn't contain it.",
    level: "basic",
    codeExample: "=RANK.EQ(999, A1:A10) → #N/A if 999 not present."
  },
  {
    question: "Why should you use absolute references for the ref range?",
    shortAnswer: "So that when you copy the formula down, the reference does not shift.",
    explanation: "Otherwise ranks would be calculated against a moving subset of data.",
    level: "intermediate",
    codeExample: "Use $A$2:$A$100 instead of A2:A100."
  },
  {
    question: "How does RANK.EQ treat duplicate values?",
    shortAnswer: "They receive the same rank, and the next rank is skipped.",
    explanation: "Examples: {95,95,92} → ranks: 1,1,3.",
    level: "basic",
    codeExample: "Standard competition ranking."
  },
  {
    question: "What is the difference between RANK.EQ and RANK.AVG?",
    shortAnswer: "RANK.EQ gives the same rank to ties and skips; RANK.AVG averages the ranks that ties would occupy.",
    explanation: "Example: {95,95,92} → RANK.EQ: 1,1,3; RANK.AVG: 1.5,1.5,3.",
    level: "intermediate",
    codeExample: "RANK.AVG for gentler tie handling."
  },
  {
    question: "Can RANK.EQ be used with text?",
    shortAnswer: "No, it only works with numbers. Text values cause #VALUE! error.",
    explanation: "Text cannot be ordered numerically.",
    level: "basic",
    codeExample: "Only numeric data."
  },
  {
    question: "How to get a unique rank for ties (e.g., break ties by occurrence order)?",
    shortAnswer: "Use =RANK.EQ(A1, range) + COUNTIF($A$1:A1, A1) - 1.",
    explanation: "This adds a small increment to break ties based on position.",
    level: "advanced",
    codeExample: "Unique ranking formula."
  },
  {
    question: "What is the result of =RANK.EQ(5, {1,2,3,4,5}, 0)?",
    shortAnswer: "1 (largest value in the array is 5).",
    explanation: "In descending order, 5 is the largest.",
    level: "basic",
    codeExample: "Array constant works."
  },
  {
    question: "Can RANK.EQ be used with a filtered list?",
    shortAnswer: "It ranks based on the entire range, ignoring filters. For visible‑only ranking, use AGGREGATE or helper column.",
    explanation: "RANK.EQ does not respect hidden rows.",
    level: "advanced",
    codeExample: "Use AGGREGATE(14,5,range, k) for ranking visible rows?"
  },
  {
    question: "What is the maximum number of arguments RANK.EQ accepts?",
    shortAnswer: "Three arguments: number, ref, order (optional).",
    explanation: "Only three.",
    level: "basic",
    codeExample: "Exactly 2 or 3 arguments."
  },
  {
    question: "How to rank values in ascending order for race times (lower time is better)?",
    shortAnswer: "Use order = 1: =RANK.EQ(time, time_range, 1).",
    explanation: "Smallest time gets rank 1.",
    level: "intermediate",
    codeExample: "=RANK.EQ(C2, $C$2:$C$100, 1)"
  },
  {
    question: "Does RANK.EQ ignore text and blanks in the ref range?",
    shortAnswer: "Yes, they are ignored (they are not considered in ranking).",
    explanation: "Only numeric cells are included in the ranking list.",
    level: "basic",
    codeExample: "Safe to leave headers in the ref range."
  },
  {
    question: "What rank does a number get that is smaller than all others in descending order?",
    shortAnswer: "The rank equals the count of numbers plus any ties? Actually if descending, smallest value gets the highest number rank (e.g., last position).",
    explanation: "Example: {10,9,8}. 8 gets rank 3.",
    level: "basic",
    codeExample: "If only one smallest, rank = number of numeric values."
  },
  {
    question: "How to calculate percentile rank from RANK.EQ?",
    shortAnswer: "Percentile = (RANK.EQ(value, range, 0) - 1) / (COUNT(range) - 1).",
    explanation: "This gives the fraction of values less than or equal to value (excluding value? standard).",
    level: "advanced",
    codeExample: "Use with caution."
  },
  {
    question: "Can RANK.EQ be used with dates?",
    shortAnswer: "Yes, dates are serial numbers, so ranking works (earlier date = smaller number). With order=0, more recent date gets higher rank.",
    explanation: "Useful for ordering events chronologically.",
    level: "intermediate",
    codeExample: "=RANK.EQ(TODAY(), date_range, 0)"
  },
  {
    question: "What is the result of =RANK.EQ(5, {5,5,3}) in descending order?",
    shortAnswer: "1 (both 5s share rank 1).",
    explanation: "Ties get same rank 1, then next distinct value (3) gets rank 3.",
    level: "basic",
    codeExample: "Standard tie behaviour."
  },
  {
    question: "Why does RANK.EQ sometimes return decimal ranks?",
    shortAnswer: "It should never return decimal; it returns integers. If you see decimal, check if you used RANK.AVG by mistake.",
    explanation: "RANK.EQ always returns whole numbers.",
    level: "basic",
    codeExample: "If you see 1.5, you used the wrong function."
  },
  {
    question: "How to create a ranking that restarts per group (e.g., rank sales per region)?",
    shortAnswer: "Use SUMPRODUCT formula: =SUMPRODUCT((region=this_region)*(sales>this_sales))+1.",
    explanation: "Classic array formula for conditional ranking.",
    level: "advanced",
    codeExample: "{=SUMPRODUCT(($B$2:$B$100=B2)*($C$2:$C$100>C2))+1}"
  },
  {
    question: "Is RANK.EQ a volatile function?",
    shortAnswer: "No, it is non‑volatile; it recalculates only when the data changes.",
    explanation: "Safe for large workbooks.",
    level: "intermediate",
    codeExample: "No performance penalty."
  },
  {
    question: "Can RANK.EQ be used with Excel Tables structured references?",
    shortAnswer: "Yes: =RANK.EQ([@Score], Table1[Score]) gives rank within the column.",
    explanation: "Structured references are absolute by nature.",
    level: "basic",
    codeExample: "Works nicely."
  },
  {
    question: "What order should you use for ranking highest sales first?",
    shortAnswer: "Order = 0 (or omitted).",
    explanation: "Largest sales get rank 1.",
    level: "basic",
    codeExample: "=RANK.EQ(F2, SalesRange)"
  },
  {
    question: "How to get rank in reverse (smallest first) without changing order?",
    shortAnswer: "Use order = 1 or use =COUNT(ref) - RANK.EQ(number, ref, 0) + 1.",
    explanation: "Useful when you need ascending rank but cannot change order argument (e.g., in array formula).",
    level: "advanced",
    codeExample: "Alternative method."
  },
  {
    question: "Does RANK.EQ work with negative numbers?",
    shortAnswer: "Yes, negative numbers are ordered normally (more negative is smaller).",
    explanation: "-10 is smaller than -5, so with descending order, -10 gets lower rank (worse).",
    level: "basic",
    codeExample: "Works correctly."
  },
  {
    question: "How to rank values ignoring zeros?",
    shortAnswer: "Use array formula: =RANK.EQ(value, IF(range<>0, range), order).",
    explanation: "This filters out zeros from the reference range.",
    level: "advanced",
    codeExample: "{=RANK.EQ(A2, IF($A$2:$A$100<>0, $A$2:$A$100), 0)}"
  },
  {
    question: "What is the result of =RANK.EQ(10, {10,10,10}, 0)?",
    shortAnswer: "1 (all three share rank 1).",
    explanation: "All valuesidentical → all rank 1.",
    level: "basic",
    codeExample: "No variation."
  },
  {
    question: "Can RANK.EQ be used in conditional formatting to highlight top 5?",
    shortAnswer: "Yes, formula rule =RANK.EQ(A1, $A$1:$A$100)<=5.",
    explanation: "Highlights the 5 highest values.",
    level: "intermediate",
    codeExample: "Applies to range."
  },
  {
    question: "Why might RANK.EQ return #N/A for a number that does exist?",
    shortAnswer: "Because the number might be stored as text, not numeric. Use VALUE() to convert.",
    explanation: "Text numbers are treated as text, which RANK.EQ ignores.",
    level: "intermediate",
    codeExample: "Check with ISTEXT()."
  },
  {
    question: "What is the difference between RANK.EQ and the old RANK function?",
    shortAnswer: "They are identical; RANK.EQ was introduced to contrast with RANK.AVG.",
    explanation: "RANK still works, but RANK.EQ is preferred for clarity.",
    level: "basic",
    codeExample: "=RANK() and =RANK.EQ() give same result."
  }
];

export default questions;