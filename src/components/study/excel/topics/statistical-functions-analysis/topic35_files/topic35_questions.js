const questions = [
  {
    question: "What is an array formula?",
    shortAnswer: "A formula that performs multiple calculations on one or more items in an array, often returning multiple results.",
    explanation: "In older Excel, you press Ctrl+Shift+Enter to enter an array formula. In 365, many work automatically.",
    level: "basic",
    codeExample: "{=AVERAGE(IF(A1:A10>0, A1:A10))}"
  },
  {
    question: "How can you calculate the average of values greater than the median without array formulas?",
    shortAnswer: "Use =AVERAGEIF(range, \">\"&MEDIAN(range)).",
    explanation: "The & operator builds the criteria string dynamically, and AVERAGEIF handles it without array entry.",
    level: "intermediate",
    codeExample: "=AVERAGEIF(A2:A100, \">\"&MEDIAN(A2:A100))"
  },
  {
    question: "What is the difference between =SUMIF(range, \">\"&AVERAGE(range)) and {=SUM(IF(range>AVERAGE(range), range))}?",
    shortAnswer: "The SUMIF version is a normal formula (no array entry) and is generally faster. The array version works but is more complex.",
    explanation: "SUMIF and its siblings were introduced to avoid array formulas for simple conditional sums.",
    level: "intermediate",
    codeExample: "Prefer SUMIF when possible."
  },
  {
    question: "How can you sum values that are above the median but only for rows where another column equals 'North'?",
    shortAnswer: "Use SUMIFS with two criteria: =SUMIFS(sales_range, region_range, \"North\", sales_range, \">\"&MEDIAN(sales_range)).",
    explanation: "SUMIFS can combine a dynamic criterion with a static one.",
    level: "advanced",
    codeExample: "=SUMIFS(C2:C100, B2:B100, \"North\", C2:C100, \">\"&MEDIAN(C2:C100))"
  },
  {
    question: "Why would you use IF inside a statistical function in Excel 365 instead of FILTER?",
    shortAnswer: "FILTER is clearer and more powerful, but IF still works and is familiar to users of older Excel.",
    explanation: "IF inside AVERAGE is a legacy pattern; modern Excel encourages FILTER.",
    level: "advanced",
    codeExample: "=AVERAGE(FILTER(range, range>MEDIAN(range)))"
  },
  {
    question: "What does the formula =AVERAGE(IF(ISNUMBER(A1:A100), A1:A100)) do?",
    shortAnswer: "It computes the average of only numeric values, ignoring text and errors.",
    explanation: "ISNUMBER checks each cell; the IF returns the value if numeric, otherwise FALSE (ignored by AVERAGE).",
    level: "intermediate",
    codeExample: "Useful for cleaning data."
  },
  {
    question: "How can you count the number of values that are above the 90th percentile using COUNTIF?",
    shortAnswer: "=COUNTIF(range, \">\"&PERCENTILE.INC(range, 0.9))",
    explanation: "Dynamic percentile threshold inside COUNTIF works without array formulas.",
    level: "basic",
    codeExample: "=COUNTIF(A2:A100, \">\"&PERCENTILE.INC(A2:A100, 0.9))"
  },
  {
    question: "What is the result of =SUM(IF({TRUE,FALSE}, {1,2})) entered as an array formula?",
    shortAnswer: "1 (only the first element is summed because the second condition is FALSE, so IF returns FALSE (treated as 0) for that position).",
    explanation: "IF returns the value for TRUE positions and FALSE for the others; SUM adds the numeric results.",
    level: "advanced",
    codeExample: "{=SUM(IF(A1:A10>0, A1:A10))}"
  },
  {
    question: "Why might {=AVERAGE(IF(range>0, range))} return a different number than =AVERAGEIF(range, \">0\")?",
    shortAnswer: "They return the same number if both ignore blanks and text. However, if range contains text, AVERAGEIF ignores it, while the array formula's IF returns FALSE for text (treated as 0 by AVERAGE), which would lower the average.",
    explanation: "Array IF with FALSE leads to 0, not ignoring. Use IF(..., ..., \"\") to ignore.",
    level: "expert",
    codeExample: "Be careful with FALSE values."
  },
  {
    question: "How do you compute the standard deviation of values above the mean using an array formula?",
    shortAnswer: "{=STDEV.S(IF(range > AVERAGE(range), range))}",
    explanation: "This filters the range and then computes the sample standard deviation.",
    level: "advanced",
    codeExample: "Enter with Ctrl+Shift+Enter."
  },
  {
    question: "Can you use IF with CORREL to compute correlation only for positive values?",
    shortAnswer: "Yes: {=CORREL(IF(x>0, x), IF(y>0, y))} but both arrays must have the same length after filtering; this could cause misalignment. Better to use FILTER in 365.",
    explanation: "Manual alignment of filtered arrays is tricky; use helper columns.",
    level: "expert",
    codeExample: "=CORREL(FILTER(x, x>0), FILTER(y, x>0))"
  },
  {
    question: "What is the advantage of using SUMIFS over array formulas with multiple conditions?",
    shortAnswer: "SUMIFS is faster, easier to read, and does not require Ctrl+Shift+Enter.",
    explanation: "SUMIFS is optimised for multi‑condition aggregation.",
    level: "basic",
    codeExample: "=SUMIFS(sales, region, \"North\", product, \"Rice\")"
  },
  {
    question: "How would you sum every second row (odd row numbers) using IF and array formulas?",
    shortAnswer: "{=SUM(IF(MOD(ROW(A1:A100),2)=1, A1:A100, 0))}",
    explanation: "MOD checks row parity; IF returns the value for odd rows, 0 for even rows.",
    level: "expert",
    codeExample: "Use SUMPRODUCT for better performance."
  },
  {
    question: "What does the & operator do in criteria like \">\"&MEDIAN(range)?",
    shortAnswer: "It concatenates the string \">\" with the numeric value of the median, producing a dynamic criteria text, e.g., \">85.5\".",
    explanation: "This is required because criteria must be a string when using operators.",
    level: "intermediate",
    codeExample: "=COUNTIF(A:A, \">\"&B1)"
  },
  {
    question: "Why does =AVERAGE(IF(range>0, range)) sometimes return a different result than =AVERAGEIF(range, \">0\")?",
    shortAnswer: "Because the array formula's IF returns FALSE for non‑positive cells, which AVERAGE treats as 0, while AVERAGEIF ignores them completely. To make them identical, use IF(range>0, range, \"\") in the array version.",
    explanation: "FALSE is a numeric 0; empty string is ignored.",
    level: "advanced",
    codeExample: "{=AVERAGE(IF(A1:A10>0, A1:A10, \"\"))}"
  },
  {
    question: "How can you compute the median of values that belong to a specific category without using a helper column?",
    shortAnswer: "Use array formula: {=MEDIAN(IF(category_range=\"North\", value_range))}",
    explanation: "IF filters the values; MEDIAN then computes the median of the filtered set.",
    level: "advanced",
    codeExample: "Press Ctrl+Shift+Enter."
  },
  {
    question: "What is the purpose of the double unary (--) in SUMPRODUCT formulas used for conditional sums?",
    shortAnswer: "It converts TRUE/FALSE to 1/0, allowing arithmetic operations.",
    explanation: "Example: =SUMPRODUCT(--(range>0), range) sums only positive numbers without array entry.",
    level: "intermediate",
    codeExample: "=SUMPRODUCT(--(A1:A10>0), A1:A10)"
  },
  {
    question: "In Excel 365, how can you compute the average of the top 5 scores without using array formulas?",
    shortAnswer: "=AVERAGE(LARGE(scores, {1,2,3,4,5}))",
    explanation: "LARGE returns an array of the top 5 scores; AVERAGE sums them and divides by 5.",
    level: "basic",
    codeExample: "Works as a normal formula in 365."
  },
  {
    question: "What is the difference between using IF inside SUM and using SUMIF?",
    shortAnswer: "SUMIF is simpler for a single condition; IF+SUM is more flexible (e.g., can use AND/OR conditions more easily, but requires array entry).",
    explanation: "For most use cases, SUMIF/S is preferable.",
    level: "intermediate",
    codeExample: "SUMIF(range, \">0\") vs {=SUM(IF(range>0, range))}"
  },
  {
    question: "How can you sum values that are above the average using an IFS function?",
    shortAnswer: "=SUMIFS(sales, sales, \">\"&AVERAGE(sales))",
    explanation: "SUMIFS with a single condition is identical to SUMIF but allows extension to multiple criteria.",
    level: "basic",
    codeExample: "=SUMIFS(B2:B100, B2:B100, \">\"&AVERAGE(B2:B100))"
  },
  {
    question: "What is a common performance issue with array formulas that use IF?",
    shortAnswer: "They recalculate the entire array for each change, which can be slow for huge ranges (over 10,000 rows).",
    explanation: "Use helper columns or Power Query for large datasets.",
    level: "advanced",
    codeExample: "Limit array formulas to smaller ranges."
  },
  {
    question: "How can you use IFERROR together with statistical IF formulas to avoid errors?",
    shortAnswer: "Wrap the entire statistical call: =IFERROR(AVERAGEIF(…), 0).",
    explanation: "This handles cases where no data meets the criteria (#DIV/0!) or when an error occurs.",
    level: "basic",
    codeExample: "=IFERROR(AVERAGEIF(A2:A100, \">0\"), \"No positive numbers\")"
  },
  {
    question: "Can you nest IF inside COUNTIF?",
    shortAnswer: "No, COUNTIF expects a range and a criteria string, not a logical array. Instead, use an array formula: {=COUNT(IF(condition, range))} or SUMPRODUCT.",
    explanation: "COUNTIF's criteria cannot be an array of Booleans.",
    level: "advanced",
    codeExample: "{=SUM(IF(condition, 1, 0))}"
  },
  {
    question: "What is the difference between =AVERAGE(IF({TRUE,FALSE},{10,20})) and =AVERAGE(IF({TRUE,FALSE},{10,20},\"\"))?",
    shortAnswer: "First formula returns 10 because FALSE becomes 0; second returns 10 because the empty string is ignored (but AVERAGE ignores non‑numeric, so same? Actually AVERAGE of {10,\"\"} is 10. They are the same in this case. The real difference is when you have multiple conditions).",
    explanation: "Better: avoid FALSE and use \"\" to be safe.",
    level: "expert",
    codeExample: "Use IF(condition, value, \"\")"
  },
  {
    question: "How can you compute the sum of values whose rank is above a certain percentile?",
    shortAnswer: "Use PERCENTILE.INC to get the threshold, then SUMIF: =SUMIF(range, \">\"&PERCENTILE.INC(range, 0.9)).",
    explanation: "This avoids array formulas entirely.",
    level: "intermediate",
    codeExample: "Sums values above the 90th percentile."
  },
  {
    question: "What is a common mistake when using & to build dynamic criteria?",
    shortAnswer: "Forgetting that the operator and the cell reference must be concatenated: \">\"&A1. Writing \">A1\" treats it as the literal string \">A1\".",
    explanation: "Always use & to combine text and numbers.",
    level: "basic",
    codeExample: "=COUNTIF(range, \">\"&B2)"
  },
  {
    question: "How can you calculate the standard deviation of values that are above 0 without using array formulas?",
    shortAnswer: "Use =STDEV.S(IF(range>0, range)) as array, or use a helper column. There is no STDEVIF function.",
    explanation: "Because no dedicated function exists, an array formula is the only direct way.",
    level: "advanced",
    codeExample: "{=STDEV.S(IF(range>0, range))}"
  },
  {
    question: "What is the advantage of using the button 'Convert to Range' for array formulas?",
    shortAnswer: "It's not relevant. 'Convert to Range' is for tables. For array formulas, you must keep the array format to have them work correctly.",
    explanation: "Breaking the array formula by editing only part of it can corrupt it.",
    level: "intermediate",
    codeExample: "Never edit part of an array formula; edit the whole cell."
  },
  {
    question: "How can you count how many values are above the average of only the positive numbers?",
    shortAnswer: "First compute average of positives: AVG_P = AVERAGEIF(range, \">0\"). Then count values above AVG_P: =COUNTIF(range, \">\"&AVG_P).",
    explanation: "Two steps, but avoids array formulas.",
    level: "advanced",
    codeExample: "Use helper cells."
  },
  {
    question: "What does the formula =AVERAGE(IF(ISBLANK(A1:A10), 0, A1:A10)) do?",
    shortAnswer: "It replaces blanks with zero before averaging, effectively treating missing data as zero.",
    explanation: "Useful when blanks should be counted as zero.",
    level: "intermediate",
    codeExample: "Array formula needed."
  }
];

export default questions;