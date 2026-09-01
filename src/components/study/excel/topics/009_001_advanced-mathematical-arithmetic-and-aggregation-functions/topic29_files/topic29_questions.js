const questions = [
  {
    question: "What is the primary objective of the Advanced Mathematical Functions Capstone Project (Topic 29)?",
    options: [
      "Integrating all 29 advanced mathematical, arithmetic, and aggregation functions into a unified, fault-tolerant enterprise model workbook",
      "Creating simple bar charts",
      "Formatting font styles in Word",
      "Deleting empty rows"
    ],
    correctAnswer: 0,
    explanation: "Topic 29 serves as the comprehensive capstone project synthesizing all mathematical arithmetic and aggregation functions."
  },
  {
    question: "In the master capstone financial model, how are SUMPRODUCT, AGGREGATE, and MOD integrated?",
    options: [
      "SUMPRODUCT handles multi-condition matrix products, AGGREGATE provides error-immune summaries, and MOD processes cyclical shift schedules",
      "They cannot be used together",
      "They require 50 helper columns",
      "They only work on single cells"
    ],
    correctAnswer: 0,
    explanation: "Combining SUMPRODUCT, AGGREGATE, and MOD forms a complete multi-tier enterprise modeling engine."
  },
  {
    question: "What is the role of COMBIN, COMBINA, PERMUT, and PERMUTATIONA in corporate capital allocation modeling?",
    options: [
      "Evaluating permutation and combination state spaces for portfolio risk scenarios, sequence orderings, and security lock combinations",
      "Formatting cell borders",
      "Sorting alphabetical names",
      "Printing worksheets"
    ],
    correctAnswer: 0,
    explanation: "Combinatorial functions model probability distributions, arrangement counts, and state space complexity."
  },
  {
    question: "How do CEILING.MATH and FLOOR.MATH ensure container packaging compliance in logistics capstone models?",
    options: [
      "CEILING.MATH rounds up to whole container thresholds, while FLOOR.MATH calculates fully filled pallets",
      "They convert text to uppercase",
      "They calculate average speed",
      "They format dates"
    ],
    correctAnswer: 0,
    explanation: "CEILING.MATH and FLOOR.MATH handle container capacity thresholds and pallet constraints."
  },
  {
    question: "Why is SUMXMY2 integrated into the capstone model for quality control forecasting?",
    options: [
      "It calculates total squared error SUM((x - y)²) to evaluate regression Mean Squared Error (MSE) metrics",
      "It multiplies matrix rows",
      "It calculates font sizes",
      "It formats currency"
    ],
    correctAnswer: 0,
    explanation: "SUMXMY2 provides the squared error total required for regression accuracy auditing."
  },
  {
    question: "How does the capstone model ensure sub-second recalculation performance across 30 sheets?",
    options: [
      "By using non-volatile INDEX lookups, caching sub-expressions with LET, avoiding full-column references, and utilizing AGGREGATE Option 6",
      "By using OFFSET everywhere",
      "By disabling automatic calculation permanently",
      "By writing 100 nested IFs"
    ],
    correctAnswer: 0,
    explanation: "Combining non-volatile architecture, LET variable caching, and AGGREGATE ensures peak recalculation speed."
  },
  {
    question: "What is the result of =AGGREGATE(9, 6, A1:A5) in the capstone dashboard if A1:A5 contains {100, 200, #N/A, 300, 400}?",
    options: [
      "1000",
      "#N/A",
      "600",
      "0"
    ],
    correctAnswer: 0,
    explanation: "100 + 200 + 300 + 400 = 1000."
  },
  {
    question: "What is the result of =SUMPRODUCT((Region=\"North\") * (Units * Price)) in the capstone summary table?",
    options: [
      "Calculates total revenue for all North region sales transactions",
      "Returns total sales count",
      "Returns average unit price",
      "Causes a #VALUE! error"
    ],
    correctAnswer: 0,
    explanation: "SUMPRODUCT multiplies matching boolean region masks by row revenue."
  },
  {
    question: "How are GCD and LCM utilized in engineering capstone scheduling models?",
    options: [
      "GCD calculates uniform synchronized maintenance interval steps, while LCM calculates total cycle repeat periods",
      "They format table headers",
      "They hide gridlines",
      "They calculate standard deviation"
    ],
    correctAnswer: 0,
    explanation: "GCD finds common step divisors and LCM finds global cycle synchronization periods."
  },
  {
    question: "How is SERIESSUM applied in the capstone financial model for discounted cash flows?",
    options: [
      "It evaluates multi-period polynomial present value sums = c1*x^1 + c2*x^2 + ... + ck*x^k",
      "It formats currency symbols",
      "It sorts columns",
      "It deletes blank rows"
    ],
    correctAnswer: 0,
    explanation: "SERIESSUM evaluates polynomial cash flow discount sums."
  },
  {
    question: "What is the output of =MULTINOMIAL(2, 3, 4) in the resource allocation capstone module?",
    options: [
      "1260",
      "288",
      "24",
      "9"
    ],
    correctAnswer: 0,
    explanation: "9! / (2! × 3! × 4!) = 1260 partition combinations."
  },
  {
    question: "What is the output of =PERMUTATIONA(10, 4) in the capstone IT security module?",
    options: [
      "10000",
      "5040",
      "210",
      "40"
    ],
    correctAnswer: 0,
    explanation: "10^4 = 10,000 distinct PIN combinations."
  },
  {
    question: "What is the output of =PERMUT(10, 4) in the capstone ranked competition module?",
    options: [
      "5040",
      "10000",
      "210",
      "720"
    ],
    correctAnswer: 0,
    explanation: "10 × 9 × 8 × 7 = 5,040 ordered arrangements."
  },
  {
    question: "What is the output of =COMBIN(10, 4) in the capstone committee selection module?",
    options: [
      "210",
      "5040",
      "10000",
      "120"
    ],
    correctAnswer: 0,
    explanation: "10! / (4! × 6!) = 210 unordered groups."
  },
  {
    question: "What is the output of =COMBINA(10, 4) in the capstone inventory selection module?",
    options: [
      "715",
      "210",
      "5040",
      "1000"
    ],
    correctAnswer: 0,
    explanation: "COMBIN(10 + 4 - 1, 4) = COMBIN(13, 4) = 715."
  },
  {
    question: "What is the result of =MROUND(143.75, 0.05) in the capstone currency pricing sheet?",
    options: [
      "143.75",
      "143.80",
      "144.00",
      "143.70"
    ],
    correctAnswer: 0,
    explanation: "143.75 is an exact multiple of 0.05."
  },
  {
    question: "What is the result of =CEILING.PRECISE(-4.2, 1) in the capstone compliance sheet?",
    options: [
      "-4",
      "-5",
      "4",
      "5"
    ],
    correctAnswer: 0,
    explanation: "CEILING.PRECISE rounds toward positive infinity: -4."
  },
  {
    question: "What is the result of =FLOOR.PRECISE(-4.2, 1) in the capstone compliance sheet?",
    options: [
      "-5",
      "-4",
      "5",
      "4"
    ],
    correctAnswer: 0,
    explanation: "FLOOR.PRECISE rounds toward negative infinity: -5."
  },
  {
    question: "What is the result of =MOD(17, 5) in the capstone shift scheduling module?",
    options: [
      "2",
      "3",
      "3.4",
      "0"
    ],
    correctAnswer: 0,
    explanation: "17 = (3 × 5) + 2."
  },
  {
    question: "What is the result of =QUOTIENT(17, 5) in the capstone shift scheduling module?",
    options: [
      "3",
      "2",
      "3.4",
      "5"
    ],
    correctAnswer: 0,
    explanation: "QUOTIENT returns the integer portion: 3."
  },
  {
    question: "What is the result of =PRODUCT(10, 2, 5) in the capstone volume calculation sheet?",
    options: [
      "100",
      "17",
      "50",
      "20"
    ],
    correctAnswer: 0,
    explanation: "10 × 2 × 5 = 100."
  },
  {
    question: "What is the result of =SUMSQ(3, 4, 12) in the capstone 3D vector length sheet?",
    options: [
      "169",
      "13",
      "19",
      "144"
    ],
    correctAnswer: 0,
    explanation: "3² + 4² + 12² = 9 + 16 + 144 = 169."
  },
  {
    question: "What is the result of =SQRT(SUMSQ(3, 4, 12)) in the capstone 3D distance sheet?",
    options: [
      "13",
      "169",
      "19",
      "12"
    ],
    correctAnswer: 0,
    explanation: "SQRT(169) = 13."
  },
  {
    question: "What is the result of =EVEN(3.1) + ODD(2.1)?",
    options: [
      "7",
      "6",
      "8",
      "5"
    ],
    correctAnswer: 0,
    explanation: "EVEN(3.1) = 4, ODD(2.1) = 3. 4 + 3 = 7."
  },
  {
    question: "What is the result of =SIGN(-50) * SIGN(25)?",
    options: [
      "-1",
      "1",
      "0",
      "-1250"
    ],
    correctAnswer: 0,
    explanation: "(-1) × (+1) = -1."
  },
  {
    question: "What is the result of =FACT(5) / FACTDOUBLE(5)?",
    options: [
      "8",
      "15",
      "24",
      "1"
    ],
    correctAnswer: 0,
    explanation: "FACT(5) = 120, FACTDOUBLE(5) = 5 × 3 × 1 = 15. 120 / 15 = 8."
  },
  {
    question: "What is the result of =SUMX2MY2({5}, {4})?",
    options: [
      "9",
      "1",
      "41",
      "20"
    ],
    correctAnswer: 0,
    explanation: "5² - 4² = 25 - 16 = 9."
  },
  {
    question: "What is the result of =SUMX2PY2({5}, {4})?",
    options: [
      "41",
      "9",
      "1",
      "20"
    ],
    correctAnswer: 0,
    explanation: "5² + 4² = 25 + 16 = 41."
  },
  {
    question: "What is the result of =SUMXMY2({5}, {4})?",
    options: [
      "1",
      "9",
      "41",
      "20"
    ],
    correctAnswer: 0,
    explanation: "(5 - 4)² = 1² = 1."
  },
  {
    question: "What is the ultimate takeaway for completing Module 009_001 Advanced Mathematical Arithmetic and Aggregation Functions?",
    options: [
      "Mastering all 30 topics empowers you to architect enterprise-grade, fault-tolerant, high-performance financial and engineering models in Excel",
      "Never use formulas",
      "Only use SUM and AVERAGE",
      "Use manual calculators for complex tasks"
    ],
    correctAnswer: 0,
    explanation: "Mastery of advanced math functions transforms raw data into powerful enterprise analytics."
  }
];

export default questions;
