// topic10_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 10
// Topic: Accumulator algorithms: Running balances and progressive totals with SCAN
// Module: 004_003_custom-functions-with-lambda-and-helper-engines
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What is the primary function of SCAN in Excel 365's Helper Engine?",
    shortAnswer: "To scan an array element-by-element and apply a custom 2-parameter accumulator LAMBDA(accumulator, value), returning an array of intermediate progressive results at every step.",
    explanation: "SCAN tracks progressive accumulator states, making it ideal for running balances and cumulative totals.",
    hint: "Progressive running accumulator across an array.",
    level: "basic",
    codeExample: "=SCAN(0, Transactions, LAMBDA(acc, val, acc + val))"
  },
  {
    question: "What is the syntax signature of the SCAN function?",
    shortAnswer: "=SCAN([initial_value], array, lambda)",
    explanation: "SCAN accepts an optional initial value (defaults to 0), an input array, and terminates with a 2-parameter LAMBDA(a, v).",
    hint: "Initial value, array, and 2-parameter LAMBDA.",
    level: "basic",
    codeExample: "=SCAN(0, D5:D10, LAMBDA(acc, val, acc + val))"
  },
  {
    question: "How many parameters must the LAMBDA passed to SCAN declare?",
    shortAnswer: "Strictly 2 parameters: the first represents the running accumulator (intermediate state), and the second represents the current array element.",
    explanation: "Excel passes the accumulated result from the previous iteration as `acc` and current item as `val`.",
    hint: "Exactly 2 parameters: accumulator and current element.",
    level: "basic",
    codeExample: "LAMBDA(accumulator, value, ...)"
  },
  {
    question: "How does SCAN differ from REDUCE?",
    shortAnswer: "SCAN returns an array of all intermediate progressive values (dimensions match input array); REDUCE returns only the final single collapsed scalar value.",
    explanation: "SCAN produces running totals; REDUCE produces a single grand reduction.",
    hint: "SCAN returns intermediate array; REDUCE returns 1 final scalar.",
    level: "basic",
    codeExample: "SCAN (Spilled Array) vs REDUCE (Single Scalar)"
  },
  {
    question: "How do you calculate a bank ledger running balance starting from an initial deposit of ₹50,000 using SCAN?",
    shortAnswer: "=SCAN(50000, TransactionAmounts, LAMBDA(balance, txn, balance + txn))",
    explanation: "Appends each transaction credit (+) or debit (-) to the running balance dynamically.",
    hint: "SCAN(50000, Txns, LAMBDA(b, t, b + t)).",
    level: "basic",
    codeExample: "=SCAN(50000, D5:D10, LAMBDA(bal, txn, bal + txn))"
  },
  {
    question: "What are the output dimensions of a formula using SCAN on an (M x 1) column vector?",
    shortAnswer: "An (M x 1) vertical column vector with the same row height as the input array.",
    explanation: "SCAN preserves the shape of the input array exactly.",
    hint: "Same dimensions as the input array.",
    level: "basic",
    codeExample: "(M x 1) Vector &rarr; (M x 1) Spilled Vector"
  },
  {
    question: "How do you compute a running maximum (peak high-water mark) across a sales column using SCAN?",
    shortAnswer: "=SCAN(0, SalesRange, LAMBDA(maxSoFar, val, MAX(maxSoFar, val)))",
    explanation: "Keeps track of the highest value encountered up to each row.",
    hint: "MAX(acc, val) inside SCAN.",
    level: "moderate",
    codeExample: "=SCAN(0, B2:B20, LAMBDA(m, v, MAX(m, v)))"
  },
  {
    question: "What happens if you omit the initial_value argument in SCAN (e.g. `=SCAN(, Array, LAMBDA(a, v, a + v))`)?",
    shortAnswer: "The initial value defaults to empty/0, and the first element is processed with accumulator = 0.",
    explanation: "Explicitly passing 0 is recommended for clarity and deterministic behavior.",
    hint: "Defaults to 0/empty.",
    level: "moderate",
    codeExample: "=SCAN(0, Arr, LAMBDA(a, v, a + v))"
  },
  {
    question: "How do you calculate a cumulative progressive product (compounding multiplier) with SCAN?",
    shortAnswer: "=SCAN(1, MonthlyReturns, LAMBDA(acc, ret, acc * (1 + ret)))",
    explanation: "Multiplies initial wealth (1) by each period's growth factor (1 + return).",
    hint: "SCAN(1, Returns, LAMBDA(a, r, a * (1 + r))).",
    level: "moderate",
    codeExample: "=SCAN(1, E5:E10, LAMBDA(a, r, a * (1 + r)))"
  },
  {
    question: "How does SCAN eliminate the legacy volatile SUM($D$5:D5) formula drag?",
    shortAnswer: "A single top-cell formula calculates running totals across all 50,000 rows in pure C++ RAM, eliminating millions of redundant cell range lookups.",
    explanation: "Legacy SUM($D$5:D5) has O(N^2) complexity; SCAN calculates in O(N) linear time.",
    hint: "O(N) linear time vs legacy O(N^2) range expansion.",
    level: "expert",
    codeExample: "O(N) Linear Scan in Volatile Memory"
  },
  {
    question: "How can you build a consecutive attendance streak counter using SCAN and IF?",
    shortAnswer: "=SCAN(0, AttendanceColumn, LAMBDA(streak, status, IF(status=\"Present\", streak + 1, 0)))",
    explanation: "Increments streak by 1 for consecutive 'Present' entries and resets to 0 upon an absence.",
    hint: "IF(status=\"Present\", streak+1, 0) inside SCAN.",
    level: "moderate",
    codeExample: "=SCAN(0, C5:C20, LAMBDA(s, x, IF(x=\"P\", s+1, 0)))"
  },
  {
    question: "What error occurs if the LAMBDA inside SCAN returns an array instead of a single scalar value?",
    shortAnswer: "#CALC! error.",
    explanation: "SCAN requires the accumulator to resolve to a single scalar value at each step.",
    hint: "Nested array returns trigger #CALC!.",
    level: "moderate",
    codeExample: "#CALC!"
  },
  {
    question: "How do you create a cumulative string concatenation (sentence building) across text words using SCAN?",
    shortAnswer: "=SCAN(\"\", WordsRange, LAMBDA(acc, w, IF(acc=\"\", w, acc & \" \" & w)))",
    explanation: "Progressively appends each word with a space separator down the column.",
    hint: "IF(acc=\"\", w, acc & \" \" & w) inside SCAN.",
    level: "moderate",
    codeExample: "=SCAN(\"\", A2:A10, LAMBDA(a, w, TRIM(a & \" \" & w)))"
  },
  {
    question: "What happens if destination cells in the spill path of SCAN contain existing values?",
    shortAnswer: "#SPILL! error.",
    explanation: "Like all dynamic array functions, SCAN requires an unobstructed spill zone.",
    hint: "Blocked output footprint triggers #SPILL!.",
    level: "basic",
    codeExample: "#SPILL!"
  },
  {
    question: "Can an existing named LAMBDA in Name Manager be passed into SCAN directly?",
    shortAnswer: "Yes, you can write =SCAN(0, Range, FX_RUNNING_BAL) if FX_RUNNING_BAL accepts 2 parameters.",
    explanation: "Named 2-parameter LAMBDAs act as first-class function pointers in SCAN.",
    hint: "Pass named 2-parameter LAMBDA identifier directly.",
    level: "advanced",
    codeExample: "=SCAN(10000, TxnList, FX_LEDGER_ACCUM)"
  },
  {
    question: "How do you calculate a reset-at-month-end cumulative sales total using SCAN, Dates, and Sales?",
    shortAnswer: "=LET(months, MONTH(Dates), SCAN(0, SEQUENCE(ROWS(Sales)), LAMBDA(acc, i, IF(i=1, INDEX(Sales, 1), IF(INDEX(months, i)<>INDEX(months, i-1), INDEX(Sales, i), acc + INDEX(Sales, i))))))",
    explanation: "Resets the accumulator to the current row's sales whenever the month changes.",
    hint: "Check month transition to reset accumulator.",
    level: "expert",
    codeExample: "Periodic Accumulator Reset Pattern"
  },
  {
    question: "How do you compute progressive compound interest with monthly additions using SCAN?",
    shortAnswer: "=SCAN(0, MonthlyContributions, LAMBDA(bal, cont, (bal * (1 + 0.08/12)) + cont))",
    explanation: "Applies monthly compounding interest to the prior balance and adds the new deposit.",
    hint: "(bal * (1 + r/12)) + cont inside SCAN.",
    level: "advanced",
    codeExample: "=SCAN(0, D5:D20, LAMBDA(b, c, b*1.00667 + c))"
  },
  {
    question: "Can LET be used inside the LAMBDA of a SCAN function?",
    shortAnswer: "Yes, nesting LET inside SCAN allows multi-variable logic per iteration before updating the accumulator.",
    explanation: "Enables intermediate caching, fee deduction, and tax clipping during the scan.",
    hint: "Nest LET inside SCAN's LAMBDA.",
    level: "advanced",
    codeExample: "=SCAN(0, Data, LAMBDA(a, v, LET(net, v*0.9, a + net)))"
  },
  {
    question: "How do you test a SCAN formula in memory using the F9 key?",
    shortAnswer: "Highlight =SCAN(...) in the formula bar and press F9 to inspect the resulting progressive array in RAM.",
    explanation: "F9 renders the intermediate array in the formula bar for instant verification.",
    hint: "Highlight and press F9 in formula bar.",
    level: "basic",
    codeExample: "F9 Memory Array Evaluation"
  },
  {
    question: "How do you calculate running percentage of total budget spent using SCAN, SUM, and LET?",
    shortAnswer: "=LET(tot, SUM(Expenses), SCAN(0, Expenses, LAMBDA(acc, val, (acc + val))) / tot)",
    explanation: "Divides the cumulative running expense array by the scalar grand total.",
    hint: "SCAN(0, Exp, LAMBDA(a,v, a+v)) / SUM(Exp).",
    level: "moderate",
    codeExample: "=LET(t, SUM(D5:D10), SCAN(0, D5:D10, LAMBDA(a,v, a+v))/t)"
  },
  {
    question: "What happens if the array passed to SCAN contains a blank cell?",
    shortAnswer: "The blank cell is evaluated as 0 in arithmetic operations, preserving the running total without interruption.",
    explanation: "Accumulator carries forward the previous balance unaffected.",
    hint: "Blank evaluated as 0 in arithmetic scan.",
    level: "basic",
    codeExample: "Blank Cell &rarr; Val = 0"
  },
  {
    question: "How can you combine SCAN running balance with the original transaction table using HSTACK?",
    shortAnswer: "=HSTACK(TransactionTable, SCAN(0, CHOOSECOLS(TransactionTable, 4), LAMBDA(a, v, a + v)))",
    explanation: "Joins the master data grid horizontally with the newly calculated running balance column.",
    hint: "HSTACK(Table, SCAN(...)).",
    level: "advanced",
    codeExample: "=HSTACK(A5:D10, SCAN(0, D5:D10, LAMBDA(a, v, a+v)))"
  },
  {
    question: "How do you calculate running drawdown (peak minus current balance) using SCAN and LET?",
    shortAnswer: "=LET(bal, SCAN(100000, Returns, LAMBDA(a, r, a + r)), peak, SCAN(100000, bal, LAMBDA(m, v, MAX(m, v))), peak - bal)",
    explanation: "Uses two successive SCAN passes: first to compute running balance, second to compute running peak, and subtracts them.",
    hint: "Two SCAN passes: balance and peak.",
    level: "expert",
    codeExample: "Two-Stage SCAN Drawdown Architecture"
  },
  {
    question: "Can SCAN iterate across a 2D matrix rather than a 1D column vector?",
    shortAnswer: "Yes, SCAN iterates in row-major order (left-to-right, top-to-bottom) across 2D grids, returning a 2D matrix of progressive states.",
    explanation: "Row-major scanning preserves the exact 2D shape of the input matrix.",
    hint: "Iterates row-major across 2D matrices.",
    level: "advanced",
    codeExample: "=SCAN(0, A1:D10, LAMBDA(a, v, a + v))"
  },
  {
    question: "What is the execution complexity of SCAN compared to traditional Excel cumulative formulas?",
    shortAnswer: "SCAN runs in O(N) linear time; traditional dragged formulas like =SUM($A$1:A1) run in O(N^2) quadratic time.",
    explanation: "In a 100,000-row table, O(N^2) takes minutes or freezes Excel, while SCAN executes in ~15 milliseconds.",
    hint: "O(N) linear time vs O(N^2) quadratic time.",
    level: "expert",
    codeExample: "100k Rows: 15ms (SCAN) vs 45s (SUM($A$1:A1))"
  },
  {
    question: "How do you calculate a progressive inventory stock-on-hand ledger (Receipts minus Issues) with SCAN?",
    shortAnswer: "=SCAN(InitialStock, NetMovements, LAMBDA(stock, move, stock + move))",
    explanation: "Adds incoming receipts (+) and subtracts outgoing dispatches (-) row by row.",
    hint: "SCAN(InitialStock, Movements, LAMBDA(s, m, s + m)).",
    level: "basic",
    codeExample: "=SCAN(500, D5:D20, LAMBDA(s, m, s + m))"
  },
  {
    question: "What happens if an error (#VALUE! or #N/A) occurs at row 5 during a SCAN execution?",
    shortAnswer: "The error appears at row 5 and propagates down all subsequent rows of the scan because the accumulator is contaminated.",
    explanation: "Since later steps depend on prior accumulator state, errors cascade down the array.",
    hint: "Error contaminates all downstream iterations.",
    level: "moderate",
    codeExample: "Downstream Error Cascading"
  },
  {
    question: "How do you sanitize inputs inside SCAN to prevent error cascades?",
    shortAnswer: "=SCAN(0, Data, LAMBDA(a, v, a + IFERROR(v, 0)))",
    explanation: "Wrapping input elements in IFERROR ensures corrupt rows are treated as 0 without breaking the accumulator.",
    hint: "Wrap element in IFERROR(v, 0).",
    level: "moderate",
    codeExample: "=SCAN(0, Range, LAMBDA(a, v, a + IFERROR(v, 0)))"
  },
  {
    question: "How do you calculate progressive weighted cumulative grade points with SCAN?",
    shortAnswer: "=SCAN(0, CreditsEarned, LAMBDA(cumCredits, cred, cumCredits + cred))",
    explanation: "Accumulates total academic credits earned student-by-student.",
    hint: "SCAN(0, Credits, LAMBDA(a, c, a + c)).",
    level: "basic",
    codeExample: "=SCAN(0, C5:C15, LAMBDA(a, c, a + c))"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for the SCAN helper function?",
    shortAnswer: "Never use dragged formulas like =SUM($D$5:D5) for running balances in large datasets! Always deploy SCAN with an initial balance and LAMBDA(acc, val, acc + val) for sub-millisecond, O(N) linear execution and zero broken formula ranges!",
    explanation: "SCAN is the definitive high-speed accumulator engine in modern Excel, transforming financial ledgers, inventory trackers, and cumulative models into pristine, single-formula spilled pipelines!",
    hint: "Always replace legacy dragged running totals with SCAN!",
    level: "expert",
    codeExample: "Rule: Running Balances & Progressive Totals &rarr; Use SCAN!"
  }
];

export default questions;
