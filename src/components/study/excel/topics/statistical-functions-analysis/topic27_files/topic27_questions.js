const questions = [
  {
    question: "What does PERCENTRANK.INC do?",
    shortAnswer: "Returns the percentile rank (0 to 1 inclusive) of a value in a dataset.",
    explanation: "It tells you what percentage of data points are less than or equal to the given value, with the min = 0 and max = 1.",
    level: "basic",
    codeExample: "=PERCENTRANK.INC(A1:A100, 85)"
  },
  {
    question: "What range of values does PERCENTRANK.INC return?",
    shortAnswer: "Between 0 and 1 inclusive.",
    explanation: "The minimum value in the array gets 0, the maximum gets 1.",
    level: "basic",
    codeExample: "0 represents the lowest rank, 1 the highest."
  },
  {
    question: "How is the percentile rank calculated for a value that lies between data points?",
    shortAnswer: "PERCENTRANK.INC interpolates between the two adjacent data points.",
    explanation: "It uses linear interpolation to estimate the percentile rank even if the exact value is not in the dataset.",
    level: "intermediate",
    codeExample: "If 85 is between 80 and 90, the rank is interpolated."
  },
  {
    question: "What is the difference between PERCENTRANK.INC and PERCENTRANK.EXC?",
    shortAnswer: "PERCENTRANK.INC includes the min and max in the rank (0 and 1); PERCENTRANK.EXC excludes them, so its range is strictly between 0 and 1.",
    explanation: "PERCENTRANK.EXC is often used in statistical contexts where extreme ranks are not desired.",
    level: "intermediate",
    codeExample: "For the same dataset, PERCENTRANK.EXC of the min is #N/A, while .INC returns 0."
  },
  {
    question: "What does the optional `significance` argument do?",
    shortAnswer: "It controls the number of significant digits in the returned rank.",
    explanation: "Default is 3 significant digits. If you need more precision, increase significance.",
    level: "basic",
    codeExample: "=PERCENTRANK.INC(A1:A10, 85, 5)"
  },
  {
    question: "What does PERCENTRANK.INC return if x is less than the minimum value in the array?",
    shortAnswer: "0.",
    explanation: "Any value smaller than the smallest data point gets a rank of 0.",
    level: "basic",
    codeExample: "=PERCENTRANK.INC({10,20,30}, 5) → 0"
  },
  {
    question: "What does PERCENTRANK.INC return if x is greater than the maximum value?",
    shortAnswer: "1.",
    explanation: "Values above the max get the highest possible rank (100%).",
    level: "basic",
    codeExample: "=PERCENTRANK.INC({10,20,30}, 40) → 1"
  },
  {
    question: "Does PERCENTRANK.INC ignore text and blanks?",
    shortAnswer: "Yes, only numeric values are considered.",
    explanation: "Text and blanks are ignored, allowing headers in the range.",
    level: "basic",
    codeExample: "Safe to use with column headers."
  },
  {
    question: "Can PERCENTRANK.INC be used with dates?",
    shortAnswer: "Yes, dates are serial numbers, so you can find the percentile rank of a date within a list.",
    explanation: "Format the result as a percentage for clarity.",
    level: "intermediate",
    codeExample: "=PERCENTRANK.INC(date_range, TODAY())"
  },
  {
    question: "What is the output of =PERCENTRANK.INC({1,2,3,4,5}, 3)?",
    shortAnswer: "0.5 (50%).",
    explanation: "3 is the middle value; there are 2 smaller and 2 larger, exactly 50% ≤3.",
    level: "basic",
    codeExample: "For odd size, median gives 0.5."
  },
  {
    question: "How to convert the result of PERCENTRANK.INC to a percentage?",
    shortAnswer: "Multiply by 100 and format as percent: =PERCENTRANK.INC(range, x)*100 & \"%\".",
    explanation: "Or just change cell formatting to Percentage.",
    level: "basic",
    codeExample: "=PERCENTRANK.INC(A2:A100, B2)*100"
  },
  {
    question: "Is PERCENTRANK.INC the inverse of PERCENTILE.INC?",
    shortAnswer: "Yes, approximately. If p = PERCENTRANK.INC(data, x), then PERCENTILE.INC(data, p) ≈ x.",
    explanation: "They are inverse functions, but due to interpolation the relationship may not be exact for all x.",
    level: "advanced",
    codeExample: "Use both for verification."
  },
  {
    question: "What is the maximum number of arguments PERCENTRANK.INC accepts?",
    shortAnswer: "Three: array, x, significance (optional).",
    explanation: "Only three arguments.",
    level: "basic",
    codeExample: "Simple."
  },
  {
    question: "Can PERCENTRANK.INC be used with array constants?",
    shortAnswer: "Yes, e.g., =PERCENTRANK.INC({1,2,3,4,5}, 3).",
    explanation: "Array constants work as the dataset.",
    level: "intermediate",
    codeExample: "=PERCENTRANK.INC({1,2,3,4,5}, 2.5) → 0.375 (interpolated)."
  },
  {
    question: "What does the function return when x equals a value that appears multiple times?",
    shortAnswer: "It still returns the rank based on ≤ count, so duplicates do not create special behaviour.",
    explanation: "For example, {1,2,2,3} for x=2 gives rank 0.5? Count ≤2 = 3, n=4, (3-1)/(4-1)=2/3≈0.6667.",
    level: "intermediate",
    codeExample: "Ties increase the percentile rank."
  },
  {
    question: "Why does PERCENTRANK.INC sometimes return the same rank for different x values?",
    shortAnswer: "If the dataset has gaps or duplicates, multiple x values may fall into the same interpolation interval.",
    explanation: "This is normal; not all x values produce unique ranks.",
    level: "intermediate",
    codeExample: "Use significance to see subtle differences."
  },
  {
    question: "Is PERCENTRANK.INC a volatile function?",
    shortAnswer: "No, it recalculates only when data changes.",
    explanation: "Non‑volatile, safe for large workbooks.",
    level: "basic",
    codeExample: "Safe."
  },
  {
    question: "How to compute the percentile rank for a filtered list (visible rows only)?",
    shortAnswer: "PERCENTRANK.INC does not respect filters; use helper column with SUBTOTAL(103, range) to mark visible rows, then array formula with PERCENTRANK.INC.",
    explanation: "Complex but possible.",
    level: "expert",
    codeExample: "Workaround needed."
  },
  {
    question: "Can PERCENTRANK.INC be used with negative numbers?",
    shortAnswer: "Yes, negative numbers are handled correctly; the smallest (most negative) gets rank 0.",
    explanation: "Ordering is numerical.",
    level: "basic",
    codeExample: "Works fine."
  },
  {
    question: "What is the significance of the significance argument?",
    shortAnswer: "It controls rounding of the result to the given number of significant digits.",
    explanation: "For example, a result 0.33333 with significance=2 becomes 0.33 (3.3e-1? Actually 2 significant digits: 0.33).",
    level: "advanced",
    codeExample: "Use to avoid tiny floating errors."
  },
  {
    question: "How does PERCENTRANK.INC behave when the array has only one number?",
    shortAnswer: "If array has one number, n-1=0, so function returns #DIV/0!.",
    explanation: "Need at least two distinct numbers for a meaningful percentile rank.",
    level: "basic",
    codeExample: "=PERCENTRANK.INC({5},5) → #DIV/0!"
  },
  {
    question: "What is the difference between PERCENTRANK.INC and RANK.EQ scaled to percentage?",
    shortAnswer: "RANK.EQ gives ordinal rank; (RANK.EQ-1)/(COUNT-1) gives a value similar to PERCENTRANK.INC, but not exactly because PERCENTRANK interpolates for intermediate values.",
    explanation: "PERCENTRANK is more accurate for values not present in the data.",
    level: "advanced",
    codeExample: "Use PERCENTRANK for continuous estimation."
  },
  {
    question: "Can PERCENTRANK.INC be used with Excel Tables structured references?",
    shortAnswer: "Yes: =PERCENTRANK.INC(Table1[Score], [@Score])",
    explanation: "Structured references work well.",
    level: "basic",
    codeExample: "=PERCENTRANK.INC(Table1[Score], 85)"
  },
  {
    question: "What is the result of =PERCENTRANK.INC({10,20,30}, 10)?",
    shortAnswer: "0 (the smallest value).",
    explanation: "10 is the minimum, rank = (1-1)/(3-1)=0.",
    level: "basic",
    codeExample: "Min gets 0."
  },
  {
    question: "How to get the percentile rank for each row in a table?",
    shortAnswer: "Add a calculated column: =PERCENTRANK.INC([Score], [@Score])",
    explanation: "This will compute the rank for each row relative to the entire column.",
    level: "intermediate",
    codeExample: "Auto‑updates when data changes."
  },
  {
    question: "What happens if the array contains error values?",
    shortAnswer: "PERCENTRANK.INC returns that error.",
    explanation: "Errors propagate; clean data before using.",
    level: "intermediate",
    codeExample: "Use IFERROR in helper column."
  },
  {
    question: "Is there a way to compute the exclusive equivalent (0<rank<1) using .INC?",
    shortAnswer: "No, .INC always includes 0 and 1. For exclusive, use PERCENTRANK.EXC.",
    explanation: "Choose the right function for your need.",
    level: "basic",
    codeExample: "PERCENTRANK.EXC excludes extremes."
  },
  {
    question: "Can PERCENTRANK.INC be used to compare scores from different tests?",
    shortAnswer: "Yes, by converting each score to its percentile rank within its own test, you can compare across tests fairly.",
    explanation: "Common practice in educational assessment.",
    level: "intermediate",
    codeExample: "Standardised comparison."
  },
  {
    question: "What is the output of =PERCENTRANK.INC({1,2,3,4,5}, 2.2)?",
    shortAnswer: "Approximately 0.3 (interpolated between ranks of 2 and 3).",
    explanation: "Since 2.2 lies between 2 and 3, its rank is interpolated.",
    level: "advanced",
    codeExample: "Manual interpolation: 2 is 0.25, 3 is 0.5, so 2.2 → 0.25 + (0.5-0.25)*(0.2/1) = 0.30."
  },
  {
    question: "Does PERCENTRANK.INC treat zeros as valid numbers?",
    shortAnswer: "Yes, zero is a number and will be ranked accordingly (could be min, median, or max depending on data).",
    explanation: "If zero is the smallest, it gets rank 0.",
    level: "basic",
    codeExample: "Works as expected."
  },
  {
    question: "What is a typical use of PERCENTRANK.INC in business dashboards?",
    shortAnswer: "To colour‑code sales representatives: those above the 90th percentile = top performers, those below 10th = bottom.",
    explanation: "Often used with conditional formatting.",
    level: "excel",
    codeExample: "=PERCENTRANK.INC(sales, [@Sales]) > 0.9"
  }
];

export default questions;