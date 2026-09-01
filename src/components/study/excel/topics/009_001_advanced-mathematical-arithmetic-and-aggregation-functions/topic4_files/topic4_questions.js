const questions = [
  {
    question: "What is the primary function of the MOD function in Excel?",
    options: [
      "It calculates the modulus or remainder after a number is divided by a divisor",
      "It returns the integer quotient of two numbers",
      "It calculates the mode (most frequent value) in a dataset",
      "It converts positive numbers to negative numbers"
    ],
    correctAnswer: 0,
    explanation: "MOD(number, divisor) returns the remainder after division. Mathematically, MOD(n, d) = n - d * INT(n / d)."
  },
  {
    question: "What is the result of =MOD(17, 5)?",
    options: [
      "2",
      "3",
      "3.4",
      "0.4"
    ],
    correctAnswer: 0,
    explanation: "17 divided by 5 is 3 with a remainder of 2. =MOD(17, 5) returns 2."
  },
  {
    question: "What happens when the divisor in MOD is zero, e.g. =MOD(10, 0)?",
    options: [
      "Returns #DIV/0! error",
      "Returns 0",
      "Returns 10",
      "Returns #NUM!"
    ],
    correctAnswer: 0,
    explanation: "Division by zero is undefined in mathematics, so Excel returns a #DIV/0! error."
  },
  {
    question: "How does MOD handle negative numbers in Excel, e.g. =MOD(-17, 5)?",
    options: [
      "3",
      "-2",
      "-3",
      "2"
    ],
    correctAnswer: 0,
    explanation: "In Excel, MOD(n, d) = n - d * INT(n/d). For INT(-17/5) = INT(-3.4) = -4. Thus -17 - 5*(-4) = -17 + 20 = 3. In Excel, the sign of MOD result always matches the sign of the divisor d."
  },
  {
    question: "What is the result of =MOD(17, -5)?",
    options: [
      "-3",
      "-2",
      "2",
      "3"
    ],
    correctAnswer: 0,
    explanation: "For MOD(17, -5), INT(17/-5) = INT(-3.4) = -4. Thus 17 - (-5)*(-4) = 17 - 20 = -3. The sign of the result matches the divisor (-5)."
  },
  {
    question: "How can MOD be used to highlight alternating zebra rows in conditional formatting?",
    options: [
      "=MOD(ROW(), 2) = 0",
      "=MOD(COLUMN(), 5) = 1",
      "=QUOTIENT(ROW(), 2) = 1",
      "=SIGN(ROW()) = 1"
    ],
    correctAnswer: 0,
    explanation: "=MOD(ROW(), 2) = 0 evaluates to TRUE for even row numbers (2, 4, 6...), allowing conditional formatting to style every second row."
  },
  {
    question: "Which formula extracts remaining minutes from 145 total minutes?",
    options: [
      "=MOD(145, 60)",
      "=QUOTIENT(145, 60)",
      "=145 / 60",
      "=INT(145)"
    ],
    correctAnswer: 0,
    explanation: "MOD(145, 60) calculates the leftover minutes (25)."
  },
  {
    question: "What is the output of =MOD(12.5, 2.5)?",
    options: [
      "0",
      "0.5",
      "2.5",
      "5"
    ],
    correctAnswer: 0,
    explanation: "12.5 is an exact multiple of 2.5 (2.5 × 5 = 12.5), so remainder is 0."
  },
  {
    question: "What is the output of =MOD(10.5, 3)?",
    options: [
      "1.5",
      "0.5",
      "3",
      "3.5"
    ],
    correctAnswer: 0,
    explanation: "10.5 - 3 × INT(10.5/3) = 10.5 - 3 × 3 = 1.5."
  },
  {
    question: "What is the output of =MOD(0, 5)?",
    options: [
      "0",
      "5",
      "#DIV/0!",
      "#VALUE!"
    ],
    correctAnswer: 0,
    explanation: "0 divided by 5 has a remainder of 0."
  },
  {
    question: "How can MOD trigger an automated action every 5th row in an Excel loop?",
    options: [
      "IF(MOD(ROW(), 5) = 0, Action, Skip)",
      "IF(QUOTIENT(ROW(), 5) = 1, Action, Skip)",
      "IF(SIGN(ROW()) = 5, Action, Skip)",
      "IF(MOD(5, ROW()) = 0, Action, Skip)"
    ],
    correctAnswer: 0,
    explanation: "MOD(ROW(), 5) = 0 evaluates to TRUE for rows 5, 10, 15, 20..."
  },
  {
    question: "In inventory packaging, if you have 250 items and each carton holds 24 items, how many leftover items remain using MOD?",
    options: [
      "=MOD(250, 24) = 10 leftover items",
      "=QUOTIENT(250, 24) = 10 items",
      "=MOD(24, 250) = 24 items",
      "=CEILING(250, 24) = 264 items"
    ],
    correctAnswer: 0,
    explanation: "MOD(250, 24) = 10 leftover loose items."
  },
  {
    question: "What happens if a numeric text string like \"50\" is passed to MOD, e.g. =MOD(\"50\", 6)?",
    options: [
      "Excel coerces \"50\" to 50 and returns 2",
      "Returns #VALUE!",
      "Returns 0",
      "Returns \"2\""
    ],
    correctAnswer: 0,
    explanation: "Excel automatically coerces numeric text strings into numeric floats."
  },
  {
    question: "What is the value of =MOD(100, 30)?",
    options: [
      "10",
      "3",
      "3.333",
      "0"
    ],
    correctAnswer: 0,
    explanation: "100 = 30 × 3 + 10; MOD returns remainder 10."
  },
  {
    question: "Which formula checks if a number x is an exact multiple of y?",
    options: [
      "=MOD(x, y) = 0",
      "=QUOTIENT(x, y) = 0",
      "=SIGN(x) = y",
      "=PRODUCT(x, y) = 0"
    ],
    correctAnswer: 0,
    explanation: "If MOD(x, y) = 0, x is perfectly divisible by y without remainder."
  },
  {
    question: "What does =MOD(3.75, 1) extract from a decimal number?",
    options: [
      "The fractional decimal part (0.75)",
      "The integer part (3)",
      "The sign of the number (+1)",
      "The nearest multiple of 1"
    ],
    correctAnswer: 0,
    explanation: "=MOD(number, 1) strips away the integer component and returns only the fractional decimal part (0.75)."
  },
  {
    question: "What is the output of =MOD(-10, -3)?",
    options: [
      "-1",
      "1",
      "-2",
      "2"
    ],
    correctAnswer: 0,
    explanation: "INT(-10/-3) = INT(3.33) = 3. -10 - (-3)*3 = -10 + 9 = -1."
  },
  {
    question: "In shift scheduling, how do you map employee IDs into 3 repeating shift cohorts (0, 1, 2)?",
    options: [
      "=MOD(EmployeeID, 3)",
      "=QUOTIENT(EmployeeID, 3)",
      "=SIGN(EmployeeID)",
      "=PRODUCT(EmployeeID, 3)"
    ],
    correctAnswer: 0,
    explanation: "=MOD(EmployeeID, 3) cycles through 0, 1, 2 for any sequence of numbers."
  },
  {
    question: "What is the result of =MOD(25, 5)?",
    options: [
      "0",
      "5",
      "1",
      "25"
    ],
    correctAnswer: 0,
    explanation: "25 is an exact multiple of 5, so remainder is 0."
  },
  {
    question: "What is the output of =MOD(5, 25)?",
    options: [
      "5",
      "0",
      "0.2",
      "20"
    ],
    correctAnswer: 0,
    explanation: "When dividend < divisor, MOD returns the dividend itself (5)."
  },
  {
    question: "How can MOD determine if an integer is odd or even?",
    options: [
      "If MOD(n, 2) = 0 it is EVEN; if MOD(n, 2) = 1 it is ODD",
      "If MOD(n, 2) = 2 it is EVEN",
      "If MOD(n, 10) = 0 it is ODD",
      "If MOD(n, 3) = 0 it is EVEN"
    ],
    correctAnswer: 0,
    explanation: "MOD(n, 2) returns 0 for even numbers and 1 for odd numbers."
  },
  {
    question: "What is the result of =MOD(7, 3)?",
    options: [
      "1",
      "2",
      "2.33",
      "0"
    ],
    correctAnswer: 0,
    explanation: "7 = 3 × 2 + 1; MOD returns 1."
  },
  {
    question: "What is the result of =MOD(-7, 3)?",
    options: [
      "2",
      "-1",
      "1",
      "-2"
    ],
    correctAnswer: 0,
    explanation: "INT(-7/3) = INT(-2.33) = -3. -7 - 3*(-3) = -7 + 9 = 2."
  },
  {
    question: "What is the result of =MOD(7, -3)?",
    options: [
      "-2",
      "1",
      "-1",
      "2"
    ],
    correctAnswer: 0,
    explanation: "INT(7/-3) = INT(-2.33) = -4. 7 - (-3)*(-4) = 7 - 12 = -5... wait! 7 - (-3)*(-3) = 7 - 9 = -2. The result sign matches divisor -3."
  },
  {
    question: "In batch manufacturing, if order size is 1,000 units and pallet capacity is 150 units, how many units remain loose?",
    options: [
      "=MOD(1000, 150) = 100 loose units",
      "=QUOTIENT(1000, 150) = 6 units",
      "=MOD(150, 1000) = 150 units",
      "=CEILING(1000, 150) = 1050 units"
    ],
    correctAnswer: 0,
    explanation: "MOD(1000, 150) = 100 leftover loose units."
  },
  {
    question: "What is the result of =MOD(1, 1)?",
    options: [
      "0",
      "1",
      "#DIV/0!",
      "0.1"
    ],
    correctAnswer: 0,
    explanation: "1 divided by 1 has no remainder."
  },
  {
    question: "How do you calculate time difference in hours when cross-midnight shifts occur (e.g. Start=22:00, End=06:00)?",
    options: [
      "=MOD(End - Start, 1)",
      "=End - Start",
      "=QUOTIENT(End, Start)",
      "=SIGN(End - Start)"
    ],
    correctAnswer: 0,
    explanation: "MOD(End - Start, 1) handles negative time differences for cross-midnight shift calculations seamlessly."
  },
  {
    question: "What is the output of =MOD(99, 100)?",
    options: [
      "99",
      "1",
      "0.99",
      "0"
    ],
    correctAnswer: 0,
    explanation: "Since 99 < 100, the remainder is 99."
  },
  {
    question: "What is the output of =MOD(100, 100)?",
    options: [
      "0",
      "100",
      "1",
      "#DIV/0!"
    ],
    correctAnswer: 0,
    explanation: "100 divided by 100 leaves remainder 0."
  },
  {
    question: "Why does the sign of MOD always match the sign of the divisor d in Excel?",
    options: [
      "Because Excel defines MOD(n, d) = n - d * INT(n / d), and INT rounds down to the lower integer",
      "Because Excel ignores negative signs",
      "Because Microsoft created a custom rule for financial compliance",
      "Because of 32-bit floating point hardware limits"
    ],
    correctAnswer: 0,
    explanation: "The formula `n - d * INT(n / d)` mathematically forces the remainder to share the sign of the divisor `d`."
  }
];

export default questions;
