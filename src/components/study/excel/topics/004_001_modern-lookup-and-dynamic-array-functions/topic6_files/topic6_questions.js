// topic6_questions.js
// 30 Structured Questions covering the SEQUENCE Function in Microsoft Excel 365

const questions = [
  {
    question: "What is the primary function of the SEQUENCE function in modern Excel?",
    shortAnswer: "To generate a contiguous array of sequential numbers, dates, or intervals in memory and spill them across rows and columns.",
    explanation: "The `SEQUENCE` function eliminates manual dragging of serial numbers, generating customizable 1D vectors or 2D numerical/date grids automatically in a single cell formula.",
    hint: "Think of an automated serial number and calendar generator.",
    level: "basic",
    codeExample: "=SEQUENCE(10, 1, 1, 1)"
  },
  {
    question: "What is the full syntax and argument structure of the SEQUENCE function?",
    shortAnswer: "=SEQUENCE(rows, [columns], [start], [step])",
    explanation: "`rows` is required and specifies vertical length; `[columns]` specifies horizontal width (default: 1); `[start]` specifies the initial starting number (default: 1); `[step]` specifies the increment per value (default: 1).",
    hint: "Rows, columns, start value, and step increment.",
    level: "basic",
    codeExample: "=SEQUENCE(12, 1, 100, 10)"
  },
  {
    question: "How do you generate an auto-expanding serial number column (1, 2, 3...) that matches the row count of another table?",
    shortAnswer: "Combine SEQUENCE with COUNTA or ROWS: =SEQUENCE(COUNTA(B2:B100)).",
    explanation: "`COUNTA(B2:B100)` counts the non-empty records, and `SEQUENCE` outputs exactly that many sequential integers. As new rows are added, the serial numbers expand automatically.",
    hint: "Use SEQUENCE(COUNTA(DataColumn)).",
    level: "basic",
    codeExample: "=SEQUENCE(COUNTA(StudentNames#))"
  },
  {
    question: "How do you generate a dynamic daily date calendar for the entire year 2026?",
    shortAnswer: "Use =SEQUENCE(365, 1, DATE(2026, 1, 1), 1).",
    explanation: "Because Excel dates are integers, setting `start = DATE(2026,1,1)` and `step = 1` spills all 365 days of the year consecutively.",
    hint: "Pass DATE(2026,1,1) as the start parameter.",
    level: "moderate",
    codeExample: "=SEQUENCE(365, 1, DATE(2026, 1, 1), 1)"
  },
  {
    question: "How do you generate a sequence of weekly dates (every Monday for 52 weeks)?",
    shortAnswer: "Use a step value of 7: =SEQUENCE(52, 1, DATE(2026, 1, 5), 7).",
    explanation: "Setting `step = 7` increments by 7 days per row, generating a weekly schedule for 52 weeks.",
    hint: "Use a step of 7 for weekly intervals.",
    level: "moderate",
    codeExample: "=SEQUENCE(52, 1, StartDate, 7)"
  },
  {
    question: "How do you generate a 2-dimensional grid (e.g. 5 rows by 4 columns) starting at 101?",
    shortAnswer: "Use =SEQUENCE(5, 4, 101, 1).",
    explanation: "Excel fills row 1 across all 4 columns (101, 102, 103, 104), then row 2 (105, 106, 107, 108), up to row 5 (120).",
    hint: "Specify both rows and columns arguments.",
    level: "moderate",
    codeExample: "=SEQUENCE(5, 4, 101, 1)"
  },
  {
    question: "How do you create a countdown sequence from 10 down to 1?",
    shortAnswer: "Use a negative step: =SEQUENCE(10, 1, 10, -1).",
    explanation: "Setting `start = 10` and `step = -1` generates numbers decrementing from 10 to 1.",
    hint: "Use a negative step (-1) to count down.",
    level: "basic",
    codeExample: "=SEQUENCE(10, 1, 10, -1)"
  },
  {
    question: "How do you create formatted custom voucher codes like 'VCH-001', 'VCH-002' using SEQUENCE?",
    shortAnswer: "Combine TEXT with SEQUENCE: =\"VCH-\" & TEXT(SEQUENCE(50), \"000\").",
    explanation: "`SEQUENCE(50)` generates numbers 1 to 50, `TEXT(..., \"000\")` formats them as '001', '002', and string concatenation adds the 'VCH-' prefix.",
    hint: "Use TEXT(SEQUENCE(N), \"000\") with prefix concatenation.",
    level: "moderate",
    codeExample: "=\"VCH-\" & TEXT(SEQUENCE(50), \"000\")"
  },
  {
    question: "What happens if you pass a negative number to the `rows` or `columns` argument in SEQUENCE?",
    shortAnswer: "Excel returns a #VALUE! error because matrix dimensions cannot be negative.",
    explanation: "Row and column dimension arguments must be positive integers >= 1.",
    hint: "Dimensions must be positive; step can be negative.",
    level: "basic",
    codeExample: "=SEQUENCE(-5, 1) // Returns #VALUE!"
  },
  {
    question: "How do you generate a sequence of Roman numerals (I, II, III...)?",
    shortAnswer: "Wrap SEQUENCE inside ROMAN: =ROMAN(SEQUENCE(20)).",
    explanation: "`ROMAN()` converts Arabic numerals to Roman numerals across the entire spilled sequence vector.",
    hint: "Combine ROMAN with SEQUENCE.",
    level: "moderate",
    codeExample: "=ROMAN(SEQUENCE(20))"
  },
  {
    question: "How do you generate a dynamic list of month start dates for the entire year 2026?",
    shortAnswer: "Use EDATE with SEQUENCE: =EDATE(DATE(2026, 1, 1), SEQUENCE(12, 1, 0, 1)).",
    explanation: "`SEQUENCE(12, 1, 0, 1)` produces 0 to 11, and `EDATE(..., 0..11)` shifts the date by 0 to 11 calendar months, returning the 1st of every month.",
    hint: "Use EDATE(StartDate, SEQUENCE(12, 1, 0, 1)).",
    level: "advanced",
    codeExample: "=EDATE(DATE(2026, 1, 1), SEQUENCE(12, 1, 0, 1))"
  },
  {
    question: "How do you extract every N-th row (e.g. every 5th row) from a master table using SEQUENCE and INDEX?",
    shortAnswer: "Use =INDEX(A2:A100, SEQUENCE(20, 1, 5, 5)).",
    explanation: "`SEQUENCE(20, 1, 5, 5)` generates indices `5, 10, 15, 20...`, and `INDEX` extracts those corresponding rows dynamically.",
    hint: "Use SEQUENCE with a step of N inside INDEX.",
    level: "advanced",
    codeExample: "=INDEX(MasterLog, SEQUENCE(20, 1, 5, 5))"
  },
  {
    question: "How do you generate an auto-expanding table of loan repayment installment numbers?",
    shortAnswer: "Use =SEQUENCE(Tenure_Months, 1, 1, 1).",
    explanation: "Setting `rows = LoanMonths` (e.g. 60) generates all installment month numbers (1 to 60) in one formula.",
    hint: "Use SEQUENCE(Tenure_Months).",
    level: "moderate",
    codeExample: "=SEQUENCE(Total_Months, 1, 1, 1)"
  },
  {
    question: "How do you create a sequence of decimal numbers (e.g. 0.0, 0.1, 0.2... up to 1.0)?",
    shortAnswer: "Use a fractional step: =SEQUENCE(11, 1, 0, 0.1).",
    explanation: "Setting `start = 0` and `step = 0.1` produces an array of float increments from 0.0 to 1.0.",
    hint: "Fractional steps like 0.1 are fully supported.",
    level: "basic",
    codeExample: "=SEQUENCE(11, 1, 0, 0.1)"
  },
  {
    question: "What happens if a SEQUENCE formula cannot spill because a destination cell contains data?",
    shortAnswer: "Excel displays a #SPILL! error at the origin cell.",
    explanation: "Clearing the occupied cell resolves the obstruction and allows the sequence array to spill.",
    hint: "Clear any data in the spill perimeter.",
    level: "basic",
    codeExample: "// Delete values in the projected spill path to resolve #SPILL!"
  },
  {
    question: "How do you generate a multiplication table grid (10x10) in a single formula using SEQUENCE?",
    shortAnswer: "Multiply a vertical sequence by a horizontal sequence: =SEQUENCE(10, 1) * SEQUENCE(1, 10).",
    explanation: "Multiplying a 10×1 vertical vector by a 1×10 horizontal vector utilizes array broadcasting to construct a 10×10 multiplication table matrix in one step.",
    hint: "Multiply a vertical sequence by a horizontal sequence.",
    level: "expert",
    codeExample: "=SEQUENCE(10, 1) * SEQUENCE(1, 10)"
  },
  {
    question: "How do you generate all 26 uppercase English alphabet letters (A to Z) using SEQUENCE?",
    shortAnswer: "Combine CHAR with SEQUENCE starting at 65: =CHAR(SEQUENCE(26, 1, 65, 1)).",
    explanation: "ASCII code 65 is 'A' and 90 is 'Z'. `SEQUENCE(26, 1, 65, 1)` generates 65 to 90, and `CHAR` converts them to letters.",
    hint: "Use CHAR(SEQUENCE(26, 1, 65, 1)).",
    level: "moderate",
    codeExample: "=CHAR(SEQUENCE(26, 1, 65, 1))"
  },
  {
    question: "How do you reverse the order of an existing spilled array `A2#` using SEQUENCE and INDEX?",
    shortAnswer: "Use =INDEX(A2#, SEQUENCE(ROWS(A2#), 1, ROWS(A2#), -1)).",
    explanation: "The `SEQUENCE` generates row numbers in reverse (e.g. 10 down to 1), and `INDEX` reorders the array upside down.",
    hint: "Use a reverse countdown sequence inside INDEX.",
    level: "advanced",
    codeExample: "=INDEX(A2#, SEQUENCE(ROWS(A2#), 1, ROWS(A2#), -1))"
  },
  {
    question: "Can SEQUENCE generate date sequences that exclude weekends?",
    shortAnswer: "Combine SEQUENCE with WORKDAY.INTL (e.g., =WORKDAY.INTL(StartDate, SEQUENCE(N), 1)).",
    explanation: "`WORKDAY.INTL` advances by the sequential workdays generated by `SEQUENCE`, skipping Saturdays and Sundays.",
    hint: "Use WORKDAY.INTL(StartDate, SEQUENCE(N)).",
    level: "advanced",
    codeExample: "=WORKDAY.INTL(DATE(2026,1,1), SEQUENCE(250), 1)"
  },
  {
    question: "How do you reference a generated sequence downstream using the '#' operator?",
    shortAnswer: "Append '#' to the origin cell of the SEQUENCE formula (e.g., A2#).",
    explanation: "Downstream formulas like `=SUM(A2#)` or `=VLOOKUP(A2#, ...)` dynamically track all generated numbers.",
    hint: "Use OriginCell#.",
    level: "basic",
    codeExample: "=SUM(A2#)"
  },
  {
    question: "How do you create a sequence of time intervals (e.g. 30-minute intervals throughout a 24-hour day)?",
    shortAnswer: "Use TIME with SEQUENCE: =TIME(0, SEQUENCE(48, 1, 0, 30), 0).",
    explanation: "`SEQUENCE(48, 1, 0, 30)` generates minute values (0, 30, 60, 90... 1410), and `TIME` formats them into 48 half-hour slots.",
    hint: "Use TIME(0, SEQUENCE(48, 1, 0, 30), 0).",
    level: "moderate",
    codeExample: "=TIME(0, SEQUENCE(48, 1, 0, 30), 0)"
  },
  {
    question: "How do you generate a sequence of even numbers only (2, 4, 6, 8... 100)?",
    shortAnswer: "Use =SEQUENCE(50, 1, 2, 2).",
    explanation: "Setting `start = 2` and `step = 2` produces 50 consecutive even integers.",
    hint: "Start at 2 with a step of 2.",
    level: "basic",
    codeExample: "=SEQUENCE(50, 1, 2, 2)"
  },
  {
    question: "How do you generate a sequence of odd numbers only (1, 3, 5, 7... 99)?",
    shortAnswer: "Use =SEQUENCE(50, 1, 1, 2).",
    explanation: "Setting `start = 1` and `step = 2` produces 50 consecutive odd integers.",
    hint: "Start at 1 with a step of 2.",
    level: "basic",
    codeExample: "=SEQUENCE(50, 1, 1, 2)"
  },
  {
    question: "What is the memory footprint of generating a 100,000-element SEQUENCE in Excel 365?",
    shortAnswer: "Less than 1 MB of RAM, calculated in under 5 milliseconds.",
    explanation: "Because `SEQUENCE` generates numbers via arithmetic algorithms rather than reading cell grids, its performance is near-instantaneous.",
    hint: "Extremely lightweight and fast.",
    level: "expert",
    codeExample: "=SEQUENCE(100000, 1) // Computes in < 5ms"
  },
  {
    question: "How do you create dynamic quarterly labels ('Q1 2026', 'Q2 2026', 'Q3 2026', 'Q4 2026')?",
    shortAnswer: "Use =\"Q\" & SEQUENCE(4, 1, 1, 1) & \" 2026\".",
    explanation: "Concatenates the sequence of numbers 1 to 4 with prefix 'Q' and suffix ' 2026'.",
    hint: "Concatenate text strings around SEQUENCE(4).",
    level: "basic",
    codeExample: "=\"Q\" & SEQUENCE(4, 1, 1, 1) & \" 2026\""
  },
  {
    question: "Can you pass a cell reference into the `rows` argument to create dynamic-length arrays?",
    shortAnswer: "Yes, passing cell reference J1 (e.g. =SEQUENCE(J1)) allows users to type any count and resize the sequence live.",
    explanation: "When cell `J1` changes from 10 to 50, `SEQUENCE(J1)` resizes its output instantly.",
    hint: "Pass a cell reference into the rows parameter.",
    level: "basic",
    codeExample: "=SEQUENCE(J1)"
  },
  {
    question: "How do you create a sequence of month-end dates (e.g. Jan 31, Feb 28, Mar 31...)?",
    shortAnswer: "Combine EOMONTH with SEQUENCE: =EOMONTH(DATE(2026, 1, 1), SEQUENCE(12, 1, 0, 1)).",
    explanation: "`EOMONTH` calculates the last day of each month for all 12 generated month offsets.",
    hint: "Use EOMONTH(StartDate, SEQUENCE(12, 1, 0, 1)).",
    level: "advanced",
    codeExample: "=EOMONTH(DATE(2026, 1, 1), SEQUENCE(12, 1, 0, 1))"
  },
  {
    question: "How do you calculate the sum of the first N natural numbers using SEQUENCE?",
    shortAnswer: "Use =SUM(SEQUENCE(N)).",
    explanation: "`SEQUENCE(N)` generates numbers 1 to N, and `SUM` computes the arithmetic series sum in memory.",
    hint: "Wrap SEQUENCE(N) in SUM.",
    level: "basic",
    codeExample: "=SUM(SEQUENCE(100)) // Returns 5050"
  },
  {
    question: "How do you pair SEQUENCE with LAMBDA functions for iterative recursive algorithms?",
    shortAnswer: "Pass SEQUENCE to MAP or REDUCE to execute operations across N iterations.",
    explanation: "`MAP(SEQUENCE(10), LAMBDA(i, ...))` executes custom logic for iteration step indices 1 through 10.",
    hint: "Use SEQUENCE as the index array for MAP/REDUCE.",
    level: "expert",
    codeExample: "=MAP(SEQUENCE(10), LAMBDA(i, i * i)) // Generates squares 1 to 100"
  },
  {
    question: "Why is the SEQUENCE function considered a fundamental building block of modern Excel financial modeling?",
    shortAnswer: "It replaces manual dragging and static cell series with elastic, formula-driven period timelines, amortization grids, and index matrices.",
    explanation: "In enterprise financial modeling across Barrackpore and Kolkata, `SEQUENCE` creates automated cashflow periods, loan schedules, and matrix coordinate systems that adjust dynamically with zero maintenance.",
    hint: "SEQUENCE enables fully elastic timeline and index modeling.",
    level: "expert",
    codeExample: "// Elastic Schedule: Loan Tenure -> SEQUENCE(Months) -> Dynamic Amortization Table"
  }
];

export default questions;
