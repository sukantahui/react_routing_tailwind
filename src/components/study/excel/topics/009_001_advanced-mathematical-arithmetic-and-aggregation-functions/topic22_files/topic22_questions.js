const questions = [
  {
    question: "What is the primary function of the SERIESSUM function in Excel?",
    options: [
      "It evaluates a power series approximation sum = c1*x^n + c2*x^(n+m) + c3*x^(n+2m) + ... + ck*x^(n+(k-1)m)",
      "It sums sequential integer ranges",
      "It calculates simple moving averages",
      "It sums geometric series without coefficients"
    ],
    correctAnswer: 0,
    explanation: "SERIESSUM(x, n, m, coefficients) calculates the sum of a power-series expansion based on base x, starting power n, power step m, and array of coefficients."
  },
  {
    question: "What are the four arguments of SERIESSUM?",
    options: [
      "SERIESSUM(x, n, m, coefficients) where x=base input, n=initial power, m=power increment step, coefficients=array of multiplier values",
      "SERIESSUM(range, criteria, sum_range, step)",
      "SERIESSUM(rate, nper, pmt, pv)",
      "SERIESSUM(start, end, step, factor)"
    ],
    correctAnswer: 0,
    explanation: "SERIESSUM requires x (base), n (starting exponent), m (exponent step increment), and coefficients (array of multipliers)."
  },
  {
    question: "What is the result of =SERIESSUM(2, 1, 1, {1, 1, 1})?",
    options: [
      "14",
      "7",
      "8",
      "12"
    ],
    correctAnswer: 0,
    explanation: "x=2, n=1, m=1, coeffs={1,1,1}: 1*2^1 + 1*2^2 + 1*2^3 = 2 + 4 + 8 = 14."
  },
  {
    question: "What is the result of =SERIESSUM(3, 0, 1, {1, 2, 1})?",
    options: [
      "16",
      "15",
      "27",
      "12"
    ],
    correctAnswer: 0,
    explanation: "x=3, n=0, m=1, coeffs={1,2,1}: 1*3^0 + 2*3^1 + 1*3^2 = 1*1 + 2*3 + 1*9 = 1 + 6 + 9 = 16."
  },
  {
    question: "How is SERIESSUM used in financial mathematics for net present value discounting over polynomial periods?",
    options: [
      "Passing discount factor x = 1/(1+r) and cash flows as coefficients calculates polynomial polynomial present value sums",
      "It formats cash flow cells",
      "It calculates depreciation steps",
      "It calculates tax brackets"
    ],
    correctAnswer: 0,
    explanation: "SERIESSUM evaluates polynomial cash flow discount sums efficiently."
  },
  {
    question: "How can SERIESSUM approximate the exponential function e^x using Taylor series e^x = 1 + x^1/1! + x^2/2! + x^3/3! + ...?",
    options: [
      "=SERIESSUM(x, 0, 1, {1, 1/FACT(1), 1/FACT(2), 1/FACT(3), ...})",
      "=SERIESSUM(x, 1, 1, {1, 2, 3})",
      "=SERIESSUM(x, 0, 2, {1, 1, 1})",
      "=EXP(x) * SERIESSUM(x, 1, 1, {1})"
    ],
    correctAnswer: 0,
    explanation: "Taylor series for e^x is calculated using SERIESSUM with reciprocal factorials as coefficients."
  },
  {
    question: "What is the result of =SERIESSUM(5, 1, 1, {0, 0, 0})?",
    options: [
      "0",
      "5",
      "25",
      "#VALUE!"
    ],
    correctAnswer: 0,
    explanation: "If all coefficients are 0, the sum is 0."
  },
  {
    question: "What happens if any coefficient element in the array is non-numeric text, e.g. =SERIESSUM(2, 1, 1, {1, \"ABC\", 3})?",
    options: [
      "Returns #VALUE! error",
      "Returns 14",
      "Ignores text element",
      "Returns 0"
    ],
    correctAnswer: 0,
    explanation: "Non-numeric scalar values inside coefficient array cause a #VALUE! error."
  },
  {
    question: "What is the result of =SERIESSUM(2, 2, 2, {1, 3})?",
    options: [
      "52",
      "16",
      "20",
      "40"
    ],
    correctAnswer: 0,
    explanation: "x=2, n=2, m=2, coeffs={1,3}: 1*2^2 + 3*2^4 = 1*4 + 3*16 = 4 + 48 = 52."
  },
  {
    question: "What is the output of =SERIESSUM(1, 0, 1, {5, 10, 15})?",
    options: [
      "30",
      "1",
      "5",
      "15"
    ],
    correctAnswer: 0,
    explanation: "x=1, n=0, m=1: 5*1^0 + 10*1^1 + 15*1^2 = 5 + 10 + 15 = 30."
  },
  {
    question: "What is the result of =SERIESSUM(1, 5, 2, {10, 20, 30})?",
    options: [
      "60",
      "10",
      "30",
      "100"
    ],
    correctAnswer: 0,
    explanation: "For x=1, any power 1^p = 1. The sum is simply the sum of coefficients: 10 + 20 + 30 = 60."
  },
  {
    question: "What is the result of =SERIESSUM(0, 1, 1, {1, 2, 3})?",
    options: [
      "0",
      "1",
      "6",
      "#NUM!"
    ],
    correctAnswer: 0,
    explanation: "For x=0 and n=1, all terms 0^1, 0^2, 0^3 are 0."
  },
  {
    question: "What is the result of =SERIESSUM(0, 0, 1, {5, 2, 3})?",
    options: [
      "5",
      "0",
      "10",
      "#VALUE!"
    ],
    correctAnswer: 0,
    explanation: "First term: 5 * 0^0 = 5 * 1 = 5. Remaining terms 0^1, 0^2 are 0. Total = 5."
  },
  {
    question: "In physics and engineering, how is SERIESSUM used to approximate trigonometric cosine cos(x) = 1 - x^2/2! + x^4/4! - x^6/6!?",
    options: [
      "=SERIESSUM(x, 0, 2, {1, -1/FACT(2), 1/FACT(4), -1/FACT(6)})",
      "=SERIESSUM(x, 1, 1, {1, -1, 1})",
      "=COS(x) * SERIESSUM(x, 0, 1, {1})",
      "=SERIESSUM(x, 2, 2, {1, 2, 3})"
    ],
    correctAnswer: 0,
    explanation: "Starting power n=0, step m=2, with alternating signs and reciprocal even factorials."
  },
  {
    question: "What is the result of =SERIESSUM(2, 1, 2, {3, 4})?",
    options: [
      "38",
      "14",
      "26",
      "50"
    ],
    correctAnswer: 0,
    explanation: "x=2, n=1, m=2, coeffs={3,4}: 3*2^1 + 4*2^3 = 3*2 + 4*8 = 6 + 32 = 38."
  },
  {
    question: "What is the result of =SERIESSUM(4, 0, 1, {2})?",
    options: [
      "2",
      "8",
      "4",
      "0"
    ],
    correctAnswer: 0,
    explanation: "Single term: 2 * 4^0 = 2 * 1 = 2."
  },
  {
    question: "What is the output of =SERIESSUM(4, 1, 1, {2})?",
    options: [
      "8",
      "2",
      "4",
      "16"
    ],
    correctAnswer: 0,
    explanation: "Single term: 2 * 4^1 = 8."
  },
  {
    question: "Can coefficients be supplied as a cell range reference, e.g. =SERIESSUM(2, 1, 1, C1:C5)?",
    options: [
      "Yes, coefficients can be passed as an array literal or cell range reference",
      "No, only inline arrays are accepted",
      "No, only single cells are accepted",
      "It requires CTRL+SHIFT+ENTER"
    ],
    correctAnswer: 0,
    explanation: "Cell ranges like C1:C5 are standard input for coefficients."
  },
  {
    question: "What is the result of =SERIESSUM(10, 1, 1, {1, -1})?",
    options: [
      "-90",
      "0",
      "90",
      "10"
    ],
    correctAnswer: 0,
    explanation: "x=10, n=1, m=1, coeffs={1, -1}: 1*10^1 + (-1)*10^2 = 10 - 100 = -90."
  },
  {
    question: "What is the result of =SERIESSUM(3, 1, 1, {1, 0, 1})?",
    options: [
      "30",
      "27",
      "12",
      "3"
    ],
    correctAnswer: 0,
    explanation: "x=3, n=1, m=1, coeffs={1,0,1}: 1*3^1 + 0*3^2 + 1*3^3 = 3 + 0 + 27 = 30."
  },
  {
    question: "What is the result of =SERIESSUM(2, 3, 1, {1, 2})?",
    options: [
      "40",
      "24",
      "16",
      "32"
    ],
    correctAnswer: 0,
    explanation: "x=2, n=3, m=1, coeffs={1,2}: 1*2^3 + 2*2^4 = 8 + 32 = 40."
  },
  {
    question: "What is the output of =SERIESSUM(2, 0, 3, {1, 1})?",
    options: [
      "9",
      "5",
      "17",
      "8"
    ],
    correctAnswer: 0,
    explanation: "x=2, n=0, m=3, coeffs={1,1}: 1*2^0 + 1*2^3 = 1 + 8 = 9."
  },
  {
    question: "What is the output of =SERIESSUM(5, 0, 2, {1, 1})?",
    options: [
      "26",
      "6",
      "25",
      "30"
    ],
    correctAnswer: 0,
    explanation: "x=5, n=0, m=2, coeffs={1,1}: 1*5^0 + 1*5^2 = 1 + 25 = 26."
  },
  {
    question: "What is the output of =SERIESSUM(3, 2, 2, {1, 1})?",
    options: [
      "90",
      "81",
      "18",
      "27"
    ],
    correctAnswer: 0,
    explanation: "x=3, n=2, m=2, coeffs={1,1}: 1*3^2 + 1*3^4 = 9 + 81 = 90."
  },
  {
    question: "What is the output of =SERIESSUM(2, 1, 1, {5})?",
    options: [
      "10",
      "5",
      "2",
      "25"
    ],
    correctAnswer: 0,
    explanation: "5 * 2^1 = 10."
  },
  {
    question: "What is the output of =SERIESSUM(10, 0, 1, {1, 2, 3})?",
    options: [
      "321",
      "60",
      "300",
      "123"
    ],
    correctAnswer: 0,
    explanation: "x=10, n=0, m=1: 1*10^0 + 2*10^1 + 3*10^2 = 1 + 20 + 300 = 321."
  },
  {
    question: "What is the output of =SERIESSUM(10, 1, 1, {3, 2, 1})?",
    options: [
      "1230",
      "3210",
      "60",
      "3000"
    ],
    correctAnswer: 0,
    explanation: "x=10, n=1, m=1: 3*10^1 + 2*10^2 + 1*10^3 = 30 + 200 + 1000 = 1230."
  },
  {
    question: "What is the result of =SERIESSUM(-2, 1, 1, {1, 1})?",
    options: [
      "2",
      "-2",
      "6",
      "-6"
    ],
    correctAnswer: 0,
    explanation: "x=-2, n=1, m=1, coeffs={1,1}: 1*(-2)^1 + 1*(-2)^2 = -2 + 4 = 2."
  },
  {
    question: "What is the result of =SERIESSUM(-2, 1, 1, {1, -1})?",
    options: [
      "-6",
      "-2",
      "6",
      "2"
    ],
    correctAnswer: 0,
    explanation: "x=-2, n=1, m=1, coeffs={1,-1}: 1*(-2)^1 + (-1)*(-2)^2 = -2 - 4 = -6."
  },
  {
    question: "What is the ultimate takeaway for using SERIESSUM in engineering and financial models?",
    options: [
      "Use SERIESSUM to evaluate Taylor series function approximations, polynomial discounting expansions, and power series models with custom coefficient arrays",
      "Use it to format cell colors",
      "Use it to protect sheets",
      "Use it to hide rows"
    ],
    correctAnswer: 0,
    explanation: "SERIESSUM evaluates polynomial power-series expansions efficiently."
  }
];

export default questions;
