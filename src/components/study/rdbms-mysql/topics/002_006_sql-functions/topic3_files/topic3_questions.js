// topic3_files/topic3_questions.js

const questions = [
  {
    question: "What is the difference between `ROUND(125.768, 2)` and `TRUNCATE(125.768, 2)`?",
    shortAnswer: "`ROUND()` rounds to the nearest decimal (returning `125.77`), while `TRUNCATE()` chops off digits past 2 decimal places without rounding (returning `125.76`).",
    explanation: "Core distinction between rounding and truncation.",
    hint: "ROUND returns 125.77; TRUNCATE returns 125.76.",
    level: "basic"
  },
  {
    question: "What does `CEIL(4.1)` return versus `FLOOR(4.9)`?",
    shortAnswer: "`CEIL(4.1)` returns `5`; `FLOOR(4.9)` returns `4`.",
    explanation: "Basic CEIL and FLOOR behavior.",
    hint: "CEIL = 5; FLOOR = 4.",
    level: "basic"
  },
  {
    question: "What does `CEIL(-4.9)` return in MySQL?",
    shortAnswer: "`-4` (because -4 is the smallest integer greater than or equal to -4.9).",
    explanation: "CEIL with negative numbers.",
    hint: "-4.",
    level: "moderate"
  },
  {
    question: "How do you calculate the total number of pages needed for pagination in a web app?",
    shortAnswer: "`CEIL(total_records / page_size)` (e.g. `CEIL(105 / 10)` = `11` pages).",
    explanation: "Pagination formula with CEIL.",
    hint: "CEIL(total_records / page_size).",
    level: "basic"
  },
  {
    question: "What does `ROUND(1560, -2)` return?",
    shortAnswer: "`1600` (rounds to the nearest hundred).",
    explanation: "Negative decimal places in ROUND.",
    hint: "1600 (rounds to nearest hundred).",
    level: "moderate"
  },
  {
    question: "What does `TRUNCATE(1580, -2)` return?",
    shortAnswer: "`1500` (truncates past hundreds position).",
    explanation: "Negative decimal places in TRUNCATE.",
    hint: "1500.",
    level: "moderate"
  },
  {
    question: "What does `ABS(-250.50)` return?",
    shortAnswer: "`250.50` (returns positive magnitude).",
    explanation: "Absolute value function.",
    hint: "250.50.",
    level: "basic"
  },
  {
    question: "How do you filter only odd student IDs using the `MOD` function?",
    shortAnswer: "`WHERE MOD(student_id, 2) = 1` (or `WHERE student_id % 2 != 0`).",
    explanation: "Odd number filtering with MOD.",
    hint: "MOD(student_id, 2) = 1.",
    level: "basic"
  },
  {
    question: "What are the synonyms for `POWER()` and `CEIL()` in MySQL?",
    shortAnswer: "`POW()` and `CEILING()`.",
    explanation: "Synonyms for math functions.",
    hint: "POW() and CEILING().",
    level: "basic"
  },
  {
    question: "What does `SQRT(64)` return?",
    shortAnswer: "`8` (square root of 64).",
    explanation: "SQRT function evaluation.",
    hint: "8.",
    level: "basic"
  },
  {
    question: "What does `SQRT(-25)` return in MySQL?",
    shortAnswer: "`NULL` (square root of negative numbers is undefined in real numbers).",
    explanation: "Square root of negative numbers.",
    hint: "Returns NULL.",
    level: "moderate"
  },
  {
    question: "In banking, how do you calculate Compound Interest amount: $A = P(1 + r)^t$?",
    shortAnswer: "`SELECT principal * POWER(1 + (rate / 100), years) AS maturity_amount;`",
    explanation: "Compound interest formula with POWER.",
    hint: "principal * POWER(1 + (rate/100), years).",
    level: "moderate"
  },
  {
    question: "In logistics, calculate 2D Euclidean Distance between $(x_1, y_1)$ and $(x_2, y_2)$.",
    shortAnswer: "`SQRT(POWER(x2 - x1, 2) + POWER(y2 - y1, 2))`.",
    explanation: "Euclidean distance formula in SQL.",
    hint: "SQRT(POWER(x2-x1, 2) + POWER(y2-y1, 2)).",
    level: "moderate"
  },
  {
    question: "What is `SIGN(x)` in MySQL?",
    shortAnswer: "Returns `-1` if $x < 0$, `0` if $x = 0$, and `1` if $x > 0$.",
    explanation: "SIGN mathematical function.",
    hint: "Returns -1, 0, or 1 based on number sign.",
    level: "basic"
  },
  {
    question: "What does `RAND()` return in MySQL?",
    shortAnswer: "A random floating-point number $v$ in the range $0.0 \\le v < 1.0$.",
    explanation: "RAND random number generator.",
    hint: "A random float between 0.0 and 1.0.",
    level: "basic"
  },
  {
    question: "How do you generate a random integer between 1 and 100 in MySQL?",
    shortAnswer: "`FLOOR(1 + RAND() * 100)`.",
    explanation: "Random integer generation formula.",
    hint: "FLOOR(1 + RAND() * 100).",
    level: "basic"
  },
  {
    question: "In academy batch assignment, how do you assign students into 3 lab rooms (1, 2, 3) in round-robin fashion?",
    shortAnswer: "`SELECT student_id, (MOD(student_id, 3) + 1) AS assigned_lab FROM students;`",
    explanation: "Round-robin assignment with MOD.",
    hint: "MOD(student_id, 3) + 1.",
    level: "basic"
  },
  {
    question: "What does `EXP(x)` return in MySQL?",
    shortAnswer: "Returns $e^x$ (base of natural logarithms $e$ raised to power $x$).",
    explanation: "Exponential function EXP.",
    hint: "e raised to power x.",
    level: "expert"
  },
  {
    question: "What does `LN(x)` and `LOG10(x)` return?",
    shortAnswer: "`LN(x)` returns natural logarithm ($\ln x$); `LOG10(x)` returns base-10 logarithm ($\log_{10} x$).",
    explanation: "Logarithm functions in MySQL.",
    hint: "Natural log and base-10 log.",
    level: "expert"
  },
  {
    question: "What does `DEGREES(PI())` return?",
    shortAnswer: "`180` (converts radians to degrees).",
    explanation: "Trigonometric conversion functions.",
    hint: "180.",
    level: "expert"
  },
  {
    question: "In GST billing, calculate 18% GST rounded to 2 decimal places on course fees in Indian Rupee (₹).",
    shortAnswer: "`SELECT course_id, ROUND(course_fee * 0.18, 2) AS gst_amount, ROUND(course_fee * 1.18, 2) AS total_fee_inr FROM courses;`",
    explanation: "GST calculation with ROUND.",
    hint: "ROUND(fee * 0.18, 2) and ROUND(fee * 1.18, 2).",
    level: "basic"
  },
  {
    question: "What happens if `TRUNCATE(x, d)` is called without the second argument `d`?",
    shortAnswer: "MySQL throws an error; unlike `ROUND()`, `TRUNCATE()` requires two arguments.",
    explanation: "Mandatory arguments in TRUNCATE.",
    hint: "Throws syntax error; TRUNCATE requires 2 arguments.",
    level: "moderate"
  },
  {
    question: "What is the output of `ROUND(125.768)` without a second argument?",
    shortAnswer: "`126` (defaults to rounding to 0 decimal places).",
    explanation: "Default 0 decimal places in ROUND.",
    hint: "126.",
    level: "basic"
  },
  {
    question: "What does `MOD(10, 0)` return in MySQL?",
    shortAnswer: "`NULL` (division/modulus by zero returns NULL in standard SQL).",
    explanation: "Modulus by zero evaluation.",
    hint: "Returns NULL.",
    level: "basic"
  },
  {
    question: "How do you calculate variance between budgeted cost and actual spend without negative numbers?",
    shortAnswer: "`SELECT ABS(budget_amount - actual_spend) AS variance_inr FROM budget_ledger;`",
    explanation: "Budget variance using ABS.",
    hint: "ABS(budget - actual).",
    level: "basic"
  },
  {
    question: "What does `CONV(15, 10, 2)` do in MySQL?",
    shortAnswer: "Converts decimal number 15 to binary base 2 (returns `'1111'`).",
    explanation: "Base conversion function CONV.",
    hint: "Converts number from base 10 to base 2 ('1111').",
    level: "expert"
  },
  {
    question: "What does `HEX(255)` return in MySQL?",
    shortAnswer: "`'FF'` (hexadecimal representation).",
    explanation: "HEX function.",
    hint: "'FF'.",
    level: "moderate"
  },
  {
    question: "What does `BIN(10)` return in MySQL?",
    shortAnswer: "`'1010'` (binary representation).",
    explanation: "BIN function.",
    hint: "'1010'.",
    level: "basic"
  },
  {
    question: "Why should `DECIMAL` data type be used with `ROUND()` in financial calculations instead of `FLOAT`?",
    shortAnswer: "Because `FLOAT` uses approximate binary floating-point representation, causing precision and rounding errors on fractional currency.",
    explanation: "DECIMAL vs FLOAT financial precision.",
    hint: "DECIMAL uses exact fixed-point arithmetic, avoiding float rounding errors.",
    level: "basic"
  },
  {
    question: "What is the ultimate takeaway for database engineers regarding Numeric & Math Functions?",
    shortAnswer: "`ROUND` and `TRUNCATE` handle precision (use `DECIMAL` for financial accuracy), `CEIL` powers pagination, `ABS` computes variances, and `MOD` enables round-robin partitioning.",
    explanation: "Final summary conclusion for Topic 3 in Module 6.",
    hint: "Use ROUND/TRUNCATE for precision, CEIL for pagination, ABS for variances, and MOD for partitioning.",
    level: "basic"
  }
];

export default questions;
