// topic7_questions.js
// 30 Structured Questions covering the RANDARRAY Function in Microsoft Excel 365

const questions = [
  {
    question: "What is the primary purpose of the RANDARRAY function in Excel 365?",
    shortAnswer: "To generate a dynamic spilled array of uniform random numbers (integers or decimals) within specified bounds.",
    explanation: "The `RANDARRAY` function replaces manual cell formulas like `RAND()` and `RANDBETWEEN()`, producing an entire multi-row, multi-column random matrix in a single cell.",
    hint: "Think of an automated random matrix and Monte Carlo generator.",
    level: "basic",
    codeExample: "=RANDARRAY(10, 1, 1, 100, TRUE)"
  },
  {
    question: "What is the complete syntax of the RANDARRAY function?",
    shortAnswer: "=RANDARRAY([rows], [columns], [min], [max], [whole_number])",
    explanation: "All arguments are optional: `[rows]` defaults to 1; `[columns]` defaults to 1; `[min]` defaults to 0; `[max]` defaults to 1; `[whole_number]` defaults to FALSE (floating point decimals).",
    hint: "Rows, columns, minimum, maximum, and whole_number boolean.",
    level: "basic",
    codeExample: "=RANDARRAY(5, 3, 10, 50, TRUE)"
  },
  {
    question: "What does `=RANDARRAY()` return if called with no arguments?",
    shortAnswer: "A single random decimal number between 0 and 1 (identical to =RAND()).",
    explanation: "With no arguments, default values apply: 1 row, 1 column, min 0, max 1, whole_number FALSE.",
    hint: "Defaults to 1 random decimal between 0 and 1.",
    level: "basic",
    codeExample: "=RANDARRAY() // Returns e.g. 0.74829"
  },
  {
    question: "How do you generate a column of 20 random integers between 100 and 500?",
    shortAnswer: "Use =RANDARRAY(20, 1, 100, 500, TRUE).",
    explanation: "Setting `whole_number` to `TRUE` restricts the generated values to discrete whole numbers between 100 and 500 inclusive.",
    hint: "Pass TRUE as the 5th argument for integers.",
    level: "basic",
    codeExample: "=RANDARRAY(20, 1, 100, 500, TRUE)"
  },
  {
    question: "How do you generate random interest rates between 7.5% and 12.0% (decimals)?",
    shortAnswer: "Use =RANDARRAY(30, 1, 0.075, 0.12, FALSE).",
    explanation: "Setting `whole_number` to `FALSE` (or omitting it) produces random floating-point decimals within the specified percentage range.",
    hint: "Use decimal bounds with whole_number = FALSE.",
    level: "moderate",
    codeExample: "=RANDARRAY(30, 1, 0.075, 0.120, FALSE)"
  },
  {
    question: "Is the RANDARRAY function volatile in Excel?",
    shortAnswer: "Yes, RANDARRAY recalculates every time the worksheet recalculates or when F9 is pressed.",
    explanation: "Because it is a volatile function, modifying any cell in the workbook triggers a new set of random numbers. To preserve a generated dataset, copy and Paste Special as Values.",
    hint: "Volatile functions recalculate on every workbook event.",
    level: "moderate",
    codeExample: "// Press F9 to refresh all random values in real time"
  },
  {
    question: "How do you freeze or lock generated random values so they stop recalculating?",
    shortAnswer: "Select the spilled range, press Ctrl+C, then Paste Special as Values (Alt + E + S + V or Ctrl+Shift+V).",
    explanation: "Pasting as values converts the dynamic formula array into static constants, permanently locking the synthetic dataset.",
    hint: "Copy and Paste Special > Values.",
    level: "basic",
    codeExample: "// Paste Values replaces dynamic formulas with fixed numbers"
  },
  {
    question: "How do you randomly shuffle a list of candidate names without duplicate assignments?",
    shortAnswer: "Use =SORTBY(A2:A20, RANDARRAY(ROWS(A2:A20))).",
    explanation: "`RANDARRAY(ROWS(A2:A20))` produces a unique random float for each row, and `SORTBY` orders the names by those floats, creating a fair random permutation.",
    hint: "Use RANDARRAY inside SORTBY as the by_array.",
    level: "advanced",
    codeExample: "=SORTBY(CandidateNames, RANDARRAY(ROWS(CandidateNames)))"
  },
  {
    question: "How do you pick 3 random winners from a list of 50 students without replacement?",
    shortAnswer: "Use =TAKE(SORTBY(A2:A50, RANDARRAY(ROWS(A2:A50))), 3).",
    explanation: "`SORTBY` shuffles the student list randomly, and `TAKE(..., 3)` extracts strictly the top 3 lucky winners.",
    hint: "Combine TAKE with a random SORTBY shuffle.",
    level: "advanced",
    codeExample: "=TAKE(SORTBY(StudentNames, RANDARRAY(ROWS(StudentNames))), 3)"
  },
  {
    question: "What happens if `min` is greater than `max` in the RANDARRAY function?",
    shortAnswer: "Excel returns a #VALUE! error.",
    explanation: "The minimum bound must be strictly less than or equal to the maximum bound; otherwise, Excel raises `#VALUE!`.",
    hint: "Min must be <= Max.",
    level: "basic",
    codeExample: "=RANDARRAY(10, 1, 500, 100) // Returns #VALUE!"
  },
  {
    question: "How do you generate a 5-row by 5-column grid of random percentages between 0% and 100%?",
    shortAnswer: "Use =RANDARRAY(5, 5, 0, 1, FALSE) and apply Percentage formatting.",
    explanation: "Generates a 5×5 matrix of floats between 0 and 1, which display as 0% to 100% when formatted.",
    hint: "Set rows=5, columns=5, min=0, max=1.",
    level: "moderate",
    codeExample: "=RANDARRAY(5, 5, 0, 1, FALSE)"
  },
  {
    question: "How do you simulate 1,000 rolls of a standard 6-sided die?",
    shortAnswer: "Use =RANDARRAY(1000, 1, 1, 6, TRUE).",
    explanation: "Generates 1,000 rows containing random integers from 1 to 6.",
    hint: "Set min=1, max=6, whole_number=TRUE.",
    level: "basic",
    codeExample: "=RANDARRAY(1000, 1, 1, 6, TRUE)"
  },
  {
    question: "How do you generate random dates within the first quarter of 2026?",
    shortAnswer: "Use =RANDARRAY(25, 1, DATE(2026, 1, 1), DATE(2026, 3, 31), TRUE).",
    explanation: "Because Excel dates are integers, passing date functions with `whole_number = TRUE` generates valid calendar dates within the Q1 range.",
    hint: "Pass DATE() values to min and max with whole_number = TRUE.",
    level: "moderate",
    codeExample: "=RANDARRAY(25, 1, DATE(2026, 1, 1), DATE(2026, 3, 31), TRUE)"
  },
  {
    question: "What is Monte Carlo simulation in financial modeling, and why is RANDARRAY essential for it?",
    shortAnswer: "A computational technique using repeated random sampling to model probability distributions of financial risks.",
    explanation: "By generating thousands of random parameter variations (inflation, demand, exchange rates) simultaneously with `RANDARRAY`, analysts calculate risk distributions like Value at Risk (VaR).",
    hint: "Generates thousands of stochastic trials simultaneously.",
    level: "expert",
    codeExample: "=Revenue_Base * (1 + RANDARRAY(1000, 1, -0.10, 0.25, FALSE))"
  },
  {
    question: "How do you generate random sample text categories (e.g. 'Confirmed', 'Pending', 'Cancelled')?",
    shortAnswer: "Combine INDEX with RANDARRAY: =INDEX({\"Confirmed\",\"Pending\",\"Cancelled\"}, RANDARRAY(20, 1, 1, 3, TRUE)).",
    explanation: "`RANDARRAY(20, 1, 1, 3, TRUE)` produces random integers 1, 2, or 3. `INDEX` maps those numbers to the corresponding status string.",
    hint: "Use INDEX against a constant text array with a random integer index.",
    level: "advanced",
    codeExample: "=INDEX({\"Confirmed\",\"Pending\",\"Cancelled\"}, RANDARRAY(20, 1, 1, 3, TRUE))"
  },
  {
    question: "What happens if a cell in the destination area is occupied when RANDARRAY spills?",
    shortAnswer: "Excel displays a #SPILL! error.",
    explanation: "All dynamic arrays require a clear rectangular spill perimeter. Clearing the blocking cell resolves the error.",
    hint: "Clear any data in the spill perimeter.",
    level: "basic",
    codeExample: "// Delete values in the projected spill path to resolve #SPILL!"
  },
  {
    question: "Can RANDARRAY generate negative numbers (e.g. from -50 to +50)?",
    shortAnswer: "Yes, set `min` to a negative number: =RANDARRAY(10, 1, -50, 50, TRUE).",
    explanation: "Negative values are fully supported for modeling temperature, profit/loss variances, and negative growth rates.",
    hint: "Negative minimum bounds are valid.",
    level: "basic",
    codeExample: "=RANDARRAY(10, 1, -50, 50, TRUE)"
  },
  {
    question: "How do you calculate the simulated average of 5,000 Monte Carlo revenue trials in a single cell?",
    shortAnswer: "Wrap RANDARRAY inside AVERAGE: =AVERAGE(RANDARRAY(5000, 1, 50000, 150000, FALSE)).",
    explanation: "Excel generates the 5,000 trials in memory and calculates their arithmetic mean directly without spilling rows onto the worksheet.",
    hint: "Pass RANDARRAY directly into AVERAGE().",
    level: "moderate",
    codeExample: "=AVERAGE(RANDARRAY(5000, 1, 50000, 150000, FALSE))"
  },
  {
    question: "How do you generate random 6-digit OTP verification codes using RANDARRAY?",
    shortAnswer: "Use =TEXT(RANDARRAY(10, 1, 100000, 999999, TRUE), \"000000\").",
    explanation: "Generates random integers strictly between 100000 and 999999, formatted as 6-digit text strings.",
    hint: "Set bounds from 100000 to 999999.",
    level: "moderate",
    codeExample: "=TEXT(RANDARRAY(10, 1, 100000, 999999, TRUE), \"000000\")"
  },
  {
    question: "How does the performance of RANDARRAY compare to legacy RAND() formulas on 50,000 cells?",
    shortAnswer: "RANDARRAY calculates in under 10ms with minimal memory, whereas 50,000 individual RAND() cells can freeze Excel.",
    explanation: "Generating a single dynamic matrix bypasses individual cell overhead, updating fast via vectorized memory allocation.",
    hint: "Single vectorized formula vs 50,000 individual cell formulas.",
    level: "expert",
    codeExample: "=RANDARRAY(50000, 1) // Computes in < 10ms"
  },
  {
    question: "How do you reference a generated random spilled matrix downstream using the '#' operator?",
    shortAnswer: "Append '#' to the origin cell of the RANDARRAY formula (e.g. M2#).",
    explanation: "Downstream formulas like `=STDEV.S(M2#)` or `=PERCENTILE.INC(M2#, 0.95)` bind dynamically to the entire simulation matrix.",
    hint: "Use OriginCell#.",
    level: "basic",
    codeExample: "=PERCENTILE.INC(M2#, 0.95) // Computes 95% Value at Risk"
  },
  {
    question: "Can RANDARRAY generate non-uniform distributions (e.g. Normal Gaussian distribution)?",
    shortAnswer: "Yes, by passing RANDARRAY into NORM.INV: =NORM.INV(RANDARRAY(1000, 1), Mean, StandardDev).",
    explanation: "`RANDARRAY(1000, 1)` generates uniform probabilities (0 to 1), and `NORM.INV` converts them into a normal bell curve distribution.",
    hint: "Use NORM.INV(RANDARRAY(...), Mean, StDev) for Gaussian distributions.",
    level: "expert",
    codeExample: "=NORM.INV(RANDARRAY(1000, 1), 100000, 15000)"
  },
  {
    question: "How do you simulate daily branch footfall for a 30-day month between 50 and 200 visitors?",
    shortAnswer: "Use =RANDARRAY(30, 1, 50, 200, TRUE).",
    explanation: "Produces 30 discrete integer counts representing simulated daily footfall.",
    hint: "Rows=30, min=50, max=200, whole_number=TRUE.",
    level: "basic",
    codeExample: "=RANDARRAY(30, 1, 50, 200, TRUE)"
  },
  {
    question: "How do you create a synthetic customer database with random names and purchase amounts for staff training?",
    shortAnswer: "Combine INDEX with RANDARRAY for names and RANDARRAY for amounts in adjacent spilled columns.",
    explanation: "Generates realistic synthetic datasets for testing formulas and training staff without exposing real client confidential data.",
    hint: "Use RANDARRAY to construct synthetic test datasets.",
    level: "advanced",
    codeExample: "=HSTACK(INDEX(NamePool, RANDARRAY(50, 1, 1, 10, TRUE)), RANDARRAY(50, 1, 1000, 15000, TRUE))"
  },
  {
    question: "What happens if `[rows]` or `[columns]` is passed as zero in RANDARRAY?",
    shortAnswer: "Excel returns a #CALC! or #VALUE! error because matrix dimensions must be >= 1.",
    explanation: "You cannot generate an array with zero dimensions.",
    hint: "Dimensions must be >= 1.",
    level: "basic",
    codeExample: "=RANDARRAY(0, 5) // Error"
  },
  {
    question: "How do you simulate currency exchange rate volatility (e.g. USD/INR between 83.20 and 84.80)?",
    shortAnswer: "Use =RANDARRAY(30, 1, 83.20, 84.80, FALSE).",
    explanation: "Generates 30 days of simulated continuous float exchange rates for foreign trade risk modeling.",
    hint: "Use decimal bounds: min=83.20, max=84.80.",
    level: "moderate",
    codeExample: "=RANDARRAY(30, 1, 83.20, 84.80, FALSE)"
  },
  {
    question: "Can RANDARRAY be passed inside the LET function for local variable encapsulation?",
    shortAnswer: "Yes, assigning a random trial matrix to a local variable inside LET allows multiple statistical KPIs to be computed in one formula.",
    explanation: "`=LET(sim, RANDARRAY(1000, 1, 100, 500, TRUE), HSTACK(AVERAGE(sim), STDEV.S(sim)))` computes mean and standard deviation from the same simulated trial batch.",
    hint: "Store simulation in a LET variable to compute multiple statistics on the same draw.",
    level: "expert",
    codeExample: "=LET(sim, RANDARRAY(1000, 1, 100, 500, TRUE), HSTACK(AVERAGE(sim), STDEV.S(sim)))"
  },
  {
    question: "How do you generate a random TRUE/FALSE boolean array (e.g. coin tosses)?",
    shortAnswer: "Use =RANDARRAY(20, 1, 0, 1, TRUE) = 1.",
    explanation: "`RANDARRAY(20, 1, 0, 1, TRUE)` produces 0s and 1s, and `= 1` converts them to boolean TRUE/FALSE values.",
    hint: "Compare integer 0/1 array to 1.",
    level: "moderate",
    codeExample: "=(RANDARRAY(20, 1, 0, 1, TRUE) = 1)"
  },
  {
    question: "Why does pressing Enter on another cell cause RANDARRAY to generate new numbers?",
    shortAnswer: "Because RANDARRAY is a volatile calculation engine function marked for re-execution on every dependency graph pass.",
    explanation: "Excel recalculates all volatile formula cells whenever any worksheet change occurs.",
    hint: "Volatile functions recalculate on every worksheet edit.",
    level: "basic",
    codeExample: "// Edit any cell → RANDARRAY generates fresh random numbers"
  },
  {
    question: "Why is RANDARRAY an indispensable tool for corporate financial modeling and risk analysis?",
    shortAnswer: "It allows rapid stress testing, sensitivity analysis, and Monte Carlo risk simulations without external Python/R programming.",
    explanation: "Financial risk managers across Barrackpore and Kolkata use `RANDARRAY` to model thousand-scenario stress tests directly inside Excel workbooks, providing executive decision-makers with robust probability forecasts.",
    hint: "Brings powerful Monte Carlo risk modeling natively into Excel.",
    level: "expert",
    codeExample: "// Risk Pipeline: Baseline → RANDARRAY Perturbation → Scenario Matrix → VaR Percentiles"
  }
];

export default questions;
