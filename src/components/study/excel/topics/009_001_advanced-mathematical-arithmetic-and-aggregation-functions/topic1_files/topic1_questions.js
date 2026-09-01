const questions = [
  {
    question: "What makes the AGGREGATE function vastly superior to standard SUM or AVERAGE functions in complex data models?",
    options: [
      "It recalculates faster using GPU hardware acceleration",
      "It can apply 19 aggregate functions while optionally ignoring hidden rows, error values, and nested SUBTOTAL/AGGREGATE results",
      "It automatically exports data to Power BI",
      "It formats currency cells automatically"
    ],
    correctAnswer: 1,
    explanation: "AGGREGATE provides 19 build-in calculation routines and 8 option codes to bypass error cells (#DIV/0!, #N/A), hidden filtered rows, and nested subtotals without breaking formulas."
  },
  {
    question: "Which option code in AGGREGATE ignores both hidden rows AND error values?",
    options: [
      "0",
      "4",
      "6",
      "7"
    ],
    correctAnswer: 3,
    explanation: "Option code 7 ignores hidden rows, nested SUBTOTAL and AGGREGATE functions, AND error values."
  },
  {
    question: "What is the function number for LARGE in AGGREGATE?",
    options: [
      "1",
      "9",
      "14",
      "15"
    ],
    correctAnswer: 2,
    explanation: "Function number 14 corresponds to LARGE. For example, AGGREGATE(14, 6, range, 1) returns the maximum non-error value."
  },
  {
    question: "What is the function number for SMALL in AGGREGATE?",
    options: [
      "15",
      "14",
      "9",
      "5"
    ],
    correctAnswer: 0,
    explanation: "Function number 15 corresponds to SMALL in AGGREGATE."
  },
  {
    question: "Which syntactic form does AGGREGATE require when using functions like LARGE (14) or SMALL (15)?",
    options: [
      "Reference form: AGGREGATE(function_num, options, ref1, [ref2])",
      "Array form: AGGREGATE(function_num, options, array, k)",
      "Database form: AGGREGATE(database, field, criteria)",
      "Text form: AGGREGATE(text_string, format_mask)"
    ],
    correctAnswer: 1,
    explanation: "Functions 14 to 19 (LARGE, SMALL, PERCENTILE, QUARTILE) require the Array syntax signature AGGREGATE(function_num, options, array, k) where k is the rank/k-th position."
  },
  {
    question: "What is the function number for SUM in AGGREGATE?",
    options: [
      "1",
      "4",
      "9",
      "11"
    ],
    correctAnswer: 2,
    explanation: "Function number 9 represents SUM in AGGREGATE."
  },
  {
    question: "What option code is used to ignore ONLY error values while retaining hidden rows?",
    options: [
      "6",
      "5",
      "2",
      "0"
    ],
    correctAnswer: 0,
    explanation: "Option code 6 ignores error values only, leaving hidden rows included in the calculation."
  },
  {
    question: "What option code is used to ignore ONLY hidden rows while still propagating errors if present?",
    options: [
      "5",
      "6",
      "4",
      "1"
    ],
    correctAnswer: 0,
    explanation: "Option code 5 ignores hidden rows only."
  },
  {
    question: "How does AGGREGATE behave when option code 4 ('Ignore nothing') is selected and an error cell exists in the range?",
    options: [
      "It skips the error cell automatically",
      "It evaluates the error cell as zero",
      "It returns that exact error value",
      "It displays a warning dialog"
    ],
    correctAnswer: 2,
    explanation: "Option code 4 instructs AGGREGATE to ignore nothing. If any cell in the range contains an error, AGGREGATE returns that error."
  },
  {
    question: "Can AGGREGATE evaluate array expressions (e.g., AGGREGATE(14, 6, (A2:A10='Naihati')*(B2:B10), 1)) in Excel without CSE?",
    options: [
      "Yes, for function numbers 14 through 19, AGGREGATE natively evaluates array expressions",
      "No, AGGREGATE only accepts standard range references",
      "Yes, but only for function number 9 (SUM)",
      "Only when paired with INDEX"
    ],
    correctAnswer: 0,
    explanation: "For functions 14–19, AGGREGATE natively processes array expressions without requiring legacy Ctrl+Shift+Enter."
  },
  {
    question: "What is the result of =AGGREGATE(9, 6, A1:A5) if A1:A5 contains {10, #DIV/0!, 30, 40, #N/A}?",
    options: [
      "#DIV/0!",
      "#N/A",
      "80",
      "0"
    ],
    correctAnswer: 2,
    explanation: "Function 9 is SUM and option 6 ignores error values. AGGREGATE sums 10 + 30 + 40 = 80, bypassing both errors cleanly."
  },
  {
    question: "What function number corresponds to AVERAGE in AGGREGATE?",
    options: [
      "1",
      "2",
      "3",
      "4"
    ],
    correctAnswer: 0,
    explanation: "Function number 1 corresponds to AVERAGE."
  },
  {
    question: "What function number corresponds to COUNT in AGGREGATE?",
    options: [
      "1",
      "2",
      "3",
      "4"
    ],
    correctAnswer: 1,
    explanation: "Function number 2 corresponds to COUNT (counts numeric cells)."
  },
  {
    question: "What function number corresponds to COUNTA in AGGREGATE?",
    options: [
      "2",
      "3",
      "4",
      "5"
    ],
    correctAnswer: 1,
    explanation: "Function number 3 corresponds to COUNTA (counts non-empty cells)."
  },
  {
    question: "What function number corresponds to MAX in AGGREGATE?",
    options: [
      "4",
      "5",
      "6",
      "7"
    ],
    correctAnswer: 0,
    explanation: "Function number 4 corresponds to MAX."
  },
  {
    question: "What function number corresponds to MIN in AGGREGATE?",
    options: [
      "4",
      "5",
      "6",
      "7"
    ],
    correctAnswer: 1,
    explanation: "Function number 5 corresponds to MIN."
  },
  {
    question: "What happens if function numbers 1-13 are passed an array expression instead of a range reference in AGGREGATE?",
    options: [
      "It evaluates the array expression normally",
      "It returns a #VALUE! error because functions 1-13 only accept range references",
      "It converts array elements to strings",
      "It prompts for macro permission"
    ],
    correctAnswer: 1,
    explanation: "Function numbers 1 to 13 (AVERAGE, SUM, MAX, MIN, etc.) only accept 3D or 2D range references. Passing dynamic array calculations to functions 1-13 returns #VALUE!."
  },
  {
    question: "How does AGGREGATE handle nested SUBTOTAL and AGGREGATE functions in a range?",
    options: [
      "It sums them twice",
      "Option codes 0, 1, 2, 3, 7 automatically ignore nested SUBTOTAL and AGGREGATE results to prevent double-counting",
      "It returns #REF!",
      "It requires a custom macro fix"
    ],
    correctAnswer: 1,
    explanation: "AGGREGATE is designed to prevent double counting of summary rows by ignoring nested SUBTOTAL and AGGREGATE formulas."
  },
  {
    question: "What option code in AGGREGATE ignores nested SUBTOTAL and AGGREGATE functions, but does NOT ignore hidden rows or error values?",
    options: [
      "0",
      "1",
      "2",
      "3"
    ],
    correctAnswer: 0,
    explanation: "Option code 0 ignores nested SUBTOTAL and AGGREGATE functions only."
  },
  {
    question: "What is the function number for MEDIAN in AGGREGATE?",
    options: [
      "10",
      "12",
      "13",
      "16"
    ],
    correctAnswer: 1,
    explanation: "Function number 12 corresponds to MEDIAN."
  },
  {
    question: "What is the function number for MODE.SNGL in AGGREGATE?",
    options: [
      "13",
      "14",
      "11",
      "8"
    ],
    correctAnswer: 0,
    explanation: "Function number 13 corresponds to MODE.SNGL."
  },
  {
    question: "In corporate audit models, why is =AGGREGATE(14, 6, Range, 1) preferred over =MAX(Range)?",
    options: [
      "=MAX(Range) fails completely if a single #DIV/0! or #N/A exists in the range, whereas AGGREGATE ignores errors and returns the true maximum",
      "MAX is restricted to 10 cells",
      "AGGREGATE formats numbers automatically",
      "MAX does not support negative numbers"
    ],
    correctAnswer: 0,
    explanation: "Standard MAX fails if any cell in the range contains an error. AGGREGATE with option 6 ignores error cells and successfully finds the maximum value."
  },
  {
    question: "What does option code 1 in AGGREGATE ignore?",
    options: [
      "Ignores hidden rows and nested SUBTOTAL/AGGREGATE",
      "Ignores error values only",
      "Ignores nothing",
      "Ignores blank cells"
    ],
    correctAnswer: 0,
    explanation: "Option code 1 ignores hidden rows and nested SUBTOTAL/AGGREGATE functions."
  },
  {
    question: "What does option code 2 in AGGREGATE ignore?",
    options: [
      "Ignores error values and nested SUBTOTAL/AGGREGATE",
      "Ignores hidden rows only",
      "Ignores all zeroes",
      "Ignores negative numbers"
    ],
    correctAnswer: 0,
    explanation: "Option code 2 ignores error values and nested SUBTOTAL/AGGREGATE functions."
  },
  {
    question: "What does option code 3 in AGGREGATE ignore?",
    options: [
      "Ignores hidden rows, error values, AND nested SUBTOTAL/AGGREGATE functions",
      "Ignores only hidden rows",
      "Ignores only error values",
      "Ignores nothing"
    ],
    correctAnswer: 0,
    explanation: "Option code 3 ignores hidden rows, error values, and nested SUBTOTAL/AGGREGATE functions (same behavior as option code 7)."
  },
  {
    question: "Which of the following function numbers supports percentile calculation in AGGREGATE?",
    options: [
      "16 (PERCENTILE.EXC) and 17 (PERCENTILE.INC)",
      "14 and 15",
      "8 and 9",
      "1 and 2"
    ],
    correctAnswer: 0,
    explanation: "Function number 16 is PERCENTILE.EXC and 17 is PERCENTILE.INC."
  },
  {
    question: "Which function number in AGGREGATE calculates standard deviation of a sample?",
    options: [
      "7 (STDEV.S)",
      "8 (STDEV.P)",
      "9 (SUM)",
      "10 (VAR.S)"
    ],
    correctAnswer: 0,
    explanation: "Function number 7 represents STDEV.S (Sample Standard Deviation)."
  },
  {
    question: "What is returned if =AGGREGATE(15, 6, A1:A10, 2) is evaluated on A1:A10 containing {10, 5, #VALUE!, 20, 15}?",
    options: [
      "5",
      "#VALUE!",
      "10",
      "15"
    ],
    correctAnswer: 2,
    explanation: "Function 15 is SMALL, option 6 ignores errors, and k=2 asks for 2nd smallest non-error value. Non-error values sorted: {5, 10, 15, 20}. The 2nd smallest is 10."
  },
  {
    question: "Why does AGGREGATE return #VALUE! if k argument is omitted for function 14 (LARGE)?",
    options: [
      "Because function 14 requires array syntax where k is a mandatory 4th argument",
      "Because LARGE only works on text",
      "Because AGGREGATE requires k to be 0",
      "Because Excel requires macro execution"
    ],
    correctAnswer: 0,
    explanation: "Functions 14–19 require the 4th argument (k or percent value). Omitting k results in a #VALUE! syntax error."
  },
  {
    question: "Can AGGREGATE ignore manually hidden rows when option code 5 or 7 is selected?",
    options: [
      "Yes, both manually hidden rows and rows hidden by AutoFilter are ignored",
      "No, only rows hidden by AutoFilter are ignored",
      "No, only manually hidden rows are ignored",
      "Only when worksheet protection is turned off"
    ],
    correctAnswer: 0,
    explanation: "Option codes 1, 3, 5, 7 ignore rows hidden by AutoFilter AND rows manually hidden by right-clicking Hide Row."
  }
];

export default questions;
