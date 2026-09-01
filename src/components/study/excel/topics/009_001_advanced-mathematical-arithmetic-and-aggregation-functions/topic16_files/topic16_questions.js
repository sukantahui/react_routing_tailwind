const questions = [
  {
    question: "What is the primary function of the FACTDOUBLE function in Excel?",
    options: [
      "It calculates the double factorial of a non-negative integer (n!!), stepping down by 2",
      "It calculates 2 × n!",
      "It squares the factorial (n!)²",
      "It calculates double precision float factorials"
    ],
    correctAnswer: 0,
    explanation: "FACTDOUBLE(number) returns the double factorial n!! = n × (n-2) × (n-4) × ... down to 1 or 2."
  },
  {
    question: "What is the result of =FACTDOUBLE(5)?",
    options: [
      "15",
      "120",
      "240",
      "25"
    ],
    correctAnswer: 0,
    explanation: "For odd n = 5, 5!! = 5 × 3 × 1 = 15."
  },
  {
    question: "What is the result of =FACTDOUBLE(6)?",
    options: [
      "48",
      "720",
      "1440",
      "36"
    ],
    correctAnswer: 0,
    explanation: "For even n = 6, 6!! = 6 × 4 × 2 = 48."
  },
  {
    question: "What is the result of =FACTDOUBLE(0)?",
    options: [
      "1",
      "0",
      "#NUM!",
      "#VALUE!"
    ],
    correctAnswer: 0,
    explanation: "By mathematical convention, 0!! = 1."
  },
  {
    question: "What is the result of =FACTDOUBLE(1)?",
    options: [
      "1",
      "0",
      "2",
      "#VALUE!"
    ],
    correctAnswer: 0,
    explanation: "1!! = 1."
  },
  {
    question: "How does FACTDOUBLE handle non-integer arguments like =FACTDOUBLE(5.9)?",
    options: [
      "Excel truncates decimal portions before calculating double factorial, evaluating FACTDOUBLE(5) = 15",
      "Returns #VALUE!",
      "Rounds up to FACTDOUBLE(6)",
      "Returns #NUM!"
    ],
    correctAnswer: 0,
    explanation: "FACTDOUBLE truncates decimal inputs to integers prior to calculation."
  },
  {
    question: "What happens if a negative number is passed to FACTDOUBLE, e.g. =FACTDOUBLE(-5)?",
    options: [
      "Returns #NUM! error",
      "Returns -15",
      "Returns 15",
      "Returns 0"
    ],
    correctAnswer: 0,
    explanation: "Double factorials are defined only for non-negative integers; negative numbers return #NUM! error."
  },
  {
    question: "What is the maximum integer argument supported by FACTDOUBLE in Excel before returning #NUM! overflow?",
    options: [
      "300 (since 301!! exceeds double-precision float limit 1.79E+308)",
      "170",
      "255",
      "1000"
    ],
    correctAnswer: 0,
    explanation: "300!! is ~2.3E+307. 301!! exceeds floating point limits and returns #NUM!."
  },
  {
    question: "What is the result of =FACTDOUBLE(7)?",
    options: [
      "105",
      "5040",
      "210",
      "35"
    ],
    correctAnswer: 0,
    explanation: "For odd n = 7, 7!! = 7 × 5 × 3 × 1 = 105."
  },
  {
    question: "What is the result of =FACTDOUBLE(8)?",
    options: [
      "384",
      "40320",
      "768",
      "64"
    ],
    correctAnswer: 0,
    explanation: "For even n = 8, 8!! = 8 × 6 × 4 × 2 = 384."
  },
  {
    question: "What is the result of =FACTDOUBLE(3)?",
    options: [
      "3",
      "6",
      "9",
      "1"
    ],
    correctAnswer: 0,
    explanation: "3!! = 3 × 1 = 3."
  },
  {
    question: "What is the result of =FACTDOUBLE(4)?",
    options: [
      "8",
      "24",
      "16",
      "12"
    ],
    correctAnswer: 0,
    explanation: "4!! = 4 × 2 = 8."
  },
  {
    question: "What is the mathematical relationship between n! and double factorials n!! and (n-1)!!?",
    options: [
      "n! = n!! × (n - 1)!!",
      "n! = n!! + (n - 1)!!",
      "n! = (n!!)²",
      "n! = 2 × n!!"
    ],
    correctAnswer: 0,
    explanation: "n! is the product of the odd double factorial and even double factorial: n! = n!! × (n-1)!!."
  },
  {
    question: "What is the result of =FACTDOUBLE(2)?",
    options: [
      "2",
      "1",
      "4",
      "0"
    ],
    correctAnswer: 0,
    explanation: "2!! = 2."
  },
  {
    question: "What happens if numeric text string like \"5\" is passed, e.g. =FACTDOUBLE(\"5\")?",
    options: [
      "Excel coerces \"5\" to 5 and returns 15",
      "Returns #VALUE!",
      "Returns #NUM!",
      "Returns 0"
    ],
    correctAnswer: 0,
    explanation: "Excel automatically coerces numeric text strings."
  },
  {
    question: "What happens if non-numeric text like \"ABC\" is passed, e.g. =FACTDOUBLE(\"ABC\")?",
    options: [
      "Returns #VALUE! error",
      "Returns 0",
      "Returns #NUM!",
      "Returns 1"
    ],
    correctAnswer: 0,
    explanation: "Non-numeric text causes a #VALUE! error."
  },
  {
    question: "What is the output of =FACTDOUBLE(9)?",
    options: [
      "945",
      "362880",
      "1890",
      "81"
    ],
    correctAnswer: 0,
    explanation: "9!! = 9 × 7 × 5 × 3 × 1 = 945."
  },
  {
    question: "What is the output of =FACTDOUBLE(10)?",
    options: [
      "3840",
      "3628800",
      "7680",
      "100"
    ],
    correctAnswer: 0,
    explanation: "10!! = 10 × 8 × 6 × 4 × 2 = 3840."
  },
  {
    question: "In statistical physics and quantum mechanics, which function models double factorial normalizations?",
    options: [
      "FACTDOUBLE",
      "FACT",
      "COMBIN",
      "PERMUT"
    ],
    correctAnswer: 0,
    explanation: "FACTDOUBLE computes double factorial normalizations in physics and statistics."
  },
  {
    question: "What is the result of =FACTDOUBLE(5) * FACTDOUBLE(4)?",
    options: [
      "120",
      "24",
      "60",
      "240"
    ],
    correctAnswer: 0,
    explanation: "5!! × 4!! = 15 × 8 = 120 (which equals 5!)."
  },
  {
    question: "What is the result of =FACTDOUBLE(7) * FACTDOUBLE(6)?",
    options: [
      "5040",
      "720",
      "1050",
      "2520"
    ],
    correctAnswer: 0,
    explanation: "7!! × 6!! = 105 × 48 = 5040 (which equals 7!)."
  },
  {
    question: "What is the result of =FACTDOUBLE(0) + FACTDOUBLE(1)?",
    options: [
      "2",
      "1",
      "0",
      "#VALUE!"
    ],
    correctAnswer: 0,
    explanation: "0!! + 1!! = 1 + 1 = 2."
  },
  {
    question: "What is the output of =FACTDOUBLE(11)?",
    options: [
      "10395",
      "39916800",
      "20790",
      "121"
    ],
    correctAnswer: 0,
    explanation: "11!! = 11 × 9 × 7 × 5 × 3 × 1 = 10,395."
  },
  {
    question: "What is the output of =FACTDOUBLE(12)?",
    options: [
      "46080",
      "479001600",
      "92160",
      "144"
    ],
    correctAnswer: 0,
    explanation: "12!! = 12 × 10 × 8 × 6 × 4 × 2 = 46,080."
  },
  {
    question: "What is the result of =FACTDOUBLE(1.99)?",
    options: [
      "1",
      "2",
      "1.99",
      "#NUM!"
    ],
    correctAnswer: 0,
    explanation: "1.99 is truncated to 1. FACTDOUBLE(1) = 1."
  },
  {
    question: "What is the output of =FACTDOUBLE(13)?",
    options: [
      "135135",
      "6227020800",
      "270270",
      "169"
    ],
    correctAnswer: 0,
    explanation: "13!! = 13 × 11 × 9 × 7 × 5 × 3 × 1 = 135,135."
  },
  {
    question: "What is the output of =FACTDOUBLE(14)?",
    options: [
      "645120",
      "87178291200",
      "1290240",
      "196"
    ],
    correctAnswer: 0,
    explanation: "14!! = 14 × 12 × 10 × 8 × 6 × 4 × 2 = 645,120."
  },
  {
    question: "What is the result of =FACTDOUBLE(15)?",
    options: [
      "2027025",
      "1307674368000",
      "4054050",
      "225"
    ],
    correctAnswer: 0,
    explanation: "15!! = 15 × 135135 = 2,027,025."
  },
  {
    question: "What is the output of =FACTDOUBLE(16)?",
    options: [
      "10321920",
      "20922789888000",
      "20643840",
      "256"
    ],
    correctAnswer: 0,
    explanation: "16!! = 16 × 645120 = 10,321,920."
  },
  {
    question: "What is the ultimate takeaway for using FACTDOUBLE in quantitative models?",
    options: [
      "Use FACTDOUBLE for double factorial step-2 product calculations in statistical integration, physics normalizations, and combinatorial odd/even sub-sequences",
      "Use it to format fonts",
      "Use it to protect worksheets",
      "Use it to delete formulas"
    ],
    correctAnswer: 0,
    explanation: "FACTDOUBLE computes step-2 product sequences efficiently without full factorial calculations."
  }
];

export default questions;
