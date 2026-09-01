const questions = [
  {
    question: "What is the primary function of the MULTINOMIAL function in Excel?",
    options: [
      "It calculates the ratio of the factorial of a sum of numbers to the product of their individual factorials (SUM(a,b,c)! / (a! × b! × c!))",
      "It multiplies multiple polynomial expressions",
      "It calculates multiple linear regression coefficients",
      "It sums factorials of array elements"
    ],
    correctAnswer: 0,
    explanation: "MULTINOMIAL(number1, [number2], ...) returns (SUM(a,b,c...)!) / (a! × b! × c!...)."
  },
  {
    question: "What is the result of =MULTINOMIAL(2, 3, 4)?",
    options: [
      "1260",
      "288",
      "24",
      "362880"
    ],
    correctAnswer: 0,
    explanation: "Sum = 2+3+4 = 9. 9! / (2! × 3! × 4!) = 362880 / (2 × 6 × 24) = 362880 / 288 = 1260."
  },
  {
    question: "What is the result of =MULTINOMIAL(3, 2)?",
    options: [
      "10",
      "6",
      "20",
      "120"
    ],
    correctAnswer: 0,
    explanation: "Sum = 3+2 = 5. 5! / (3! × 2!) = 120 / (6 × 2) = 10 (which equals COMBIN(5, 3))."
  },
  {
    question: "What is the relationship between MULTINOMIAL(a, b) and COMBIN(a+b, a)?",
    options: [
      "For two numbers, MULTINOMIAL(a, b) equals COMBIN(a + b, a)",
      "MULTINOMIAL(a, b) = COMBIN(a, b)",
      "MULTINOMIAL(a, b) = COMBIN(a + b, a) * 2",
      "They have no relationship"
    ],
    correctAnswer: 0,
    explanation: "For two arguments, MULTINOMIAL(a, b) = (a+b)! / (a! × b!) = COMBIN(a+b, a)."
  },
  {
    question: "What is the result of =MULTINOMIAL(1, 1, 1)?",
    options: [
      "6",
      "1",
      "3",
      "12"
    ],
    correctAnswer: 0,
    explanation: "Sum = 3. 3! / (1! × 1! × 1!) = 6 / 1 = 6."
  },
  {
    question: "How does MULTINOMIAL handle non-integer arguments like =MULTINOMIAL(2.9, 3.1)?",
    options: [
      "Excel truncates decimal portions before calculating, evaluating MULTINOMIAL(2, 3) = 10",
      "Returns #VALUE!",
      "Rounds up to MULTINOMIAL(3, 4)",
      "Returns #NUM!"
    ],
    correctAnswer: 0,
    explanation: "MULTINOMIAL truncates decimal inputs to integers prior to calculation."
  },
  {
    question: "What happens if a negative number is passed to MULTINOMIAL, e.g. =MULTINOMIAL(-2, 3)?",
    options: [
      "Returns #NUM! error",
      "Returns 10",
      "Returns -10",
      "Returns 0"
    ],
    correctAnswer: 0,
    explanation: "Arguments must be non-negative integers; negative numbers return #NUM! error."
  },
  {
    question: "What is the maximum number of arguments MULTINOMIAL can accept in Excel?",
    options: [
      "255 arguments",
      "30 arguments",
      "10 arguments",
      "Unlimited"
    ],
    correctAnswer: 0,
    explanation: "MULTINOMIAL accepts up to 255 individual arguments or range references."
  },
  {
    question: "In inventory allocation, if distributing 9 distinct tasks into 3 teams with sizes 2, 3, and 4, how many distinct team task partitions exist?",
    options: [
      "=MULTINOMIAL(2, 3, 4) = 1,260 partitions",
      "=COMBIN(9, 3) = 84 partitions",
      "=PERMUT(9, 3) = 504 partitions",
      "=FACT(9) = 362,880 partitions"
    ],
    correctAnswer: 0,
    explanation: "Multinomial partition coefficient: 9! / (2! × 3! × 4!) = 1,260."
  },
  {
    question: "What is the result of =MULTINOMIAL(0, 5)?",
    options: [
      "1",
      "0",
      "5",
      "#NUM!"
    ],
    correctAnswer: 0,
    explanation: "(0+5)! / (0! × 5!) = 5! / (1 × 120) = 1."
  },
  {
    question: "What is the output of =MULTINOMIAL(2, 2)?",
    options: [
      "6",
      "4",
      "24",
      "12"
    ],
    correctAnswer: 0,
    explanation: "4! / (2! × 2!) = 24 / 4 = 6."
  },
  {
    question: "What is the output of =MULTINOMIAL(1, 2, 3)?",
    options: [
      "60",
      "12",
      "720",
      "36"
    ],
    correctAnswer: 0,
    explanation: "Sum = 6. 6! / (1! × 2! × 3!) = 720 / (1 × 2 × 6) = 720 / 12 = 60."
  },
  {
    question: "What is the output of =MULTINOMIAL(5)?",
    options: [
      "1",
      "5",
      "120",
      "#VALUE!"
    ],
    correctAnswer: 0,
    explanation: "For a single argument n, MULTINOMIAL(n) = n! / n! = 1."
  },
  {
    question: "What happens if numeric text string like \"2\" is passed, e.g. =MULTINOMIAL(\"2\", \"3\")?",
    options: [
      "Excel coerces text to numbers and returns 10",
      "Returns #VALUE!",
      "Returns #NUM!",
      "Returns 0"
    ],
    correctAnswer: 0,
    explanation: "Excel automatically coerces numeric text strings."
  },
  {
    question: "What happens if non-numeric text like \"ABC\" is passed, e.g. =MULTINOMIAL(\"ABC\", 2)?",
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
    question: "What is the result of =MULTINOMIAL(2, 2, 2)?",
    options: [
      "90",
      "18",
      "720",
      "36"
    ],
    correctAnswer: 0,
    explanation: "Sum = 6. 6! / (2! × 2! × 2!) = 720 / 8 = 90."
  },
  {
    question: "What is the result of =MULTINOMIAL(4, 1)?",
    options: [
      "5",
      "4",
      "20",
      "120"
    ],
    correctAnswer: 0,
    explanation: "5! / (4! × 1!) = 120 / 24 = 5."
  },
  {
    question: "What is the result of =MULTINOMIAL(3, 3)?",
    options: [
      "20",
      "6",
      "720",
      "36"
    ],
    correctAnswer: 0,
    explanation: "6! / (3! × 3!) = 720 / 36 = 20."
  },
  {
    question: "What is the output of =MULTINOMIAL(1, 4)?",
    options: [
      "5",
      "4",
      "20",
      "24"
    ],
    correctAnswer: 0,
    explanation: "5! / (1! × 4!) = 120 / 24 = 5."
  },
  {
    question: "What is the output of =MULTINOMIAL(2, 4)?",
    options: [
      "15",
      "8",
      "720",
      "30"
    ],
    correctAnswer: 0,
    explanation: "6! / (2! × 4!) = 720 / (2 × 24) = 720 / 48 = 15."
  },
  {
    question: "What is the output of =MULTINOMIAL(3, 4)?",
    options: [
      "35",
      "12",
      "5040",
      "140"
    ],
    correctAnswer: 0,
    explanation: "7! / (3! × 4!) = 5040 / (6 × 24) = 5040 / 144 = 35."
  },
  {
    question: "In DNA genetics or text anagram analysis, how many distinct anagram rearrangements exist for the word \"MISSISSIPPI\" (1 M, 4 I, 4 S, 2 P)?",
    options: [
      "=MULTINOMIAL(1, 4, 4, 2) = 34,650 anagrams",
      "=FACT(11) = 39,916,800 anagrams",
      "=COMBIN(11, 4) = 330 anagrams",
      "=PERMUT(11, 4) = 7,920 anagrams"
    ],
    correctAnswer: 0,
    explanation: "Distinct anagram count = 11! / (1! × 4! × 4! × 2!) = MULTINOMIAL(1, 4, 4, 2) = 34,650."
  },
  {
    question: "What is the result of =MULTINOMIAL(A1:A3) if A1=2, A2=3, A3=4?",
    options: [
      "1260",
      "288",
      "24",
      "362880"
    ],
    correctAnswer: 0,
    explanation: "MULTINOMIAL accepts range references cleanly."
  },
  {
    question: "What is the output of =MULTINOMIAL(1, 1, 1, 1)?",
    options: [
      "24",
      "4",
      "12",
      "16"
    ],
    correctAnswer: 0,
    explanation: "Sum = 4. 4! / (1! × 1! × 1! × 1!) = 24 / 1 = 24."
  },
  {
    question: "What is the output of =MULTINOMIAL(2, 1, 1)?",
    options: [
      "12",
      "4",
      "24",
      "6"
    ],
    correctAnswer: 0,
    explanation: "Sum = 4. 4! / (2! × 1! × 1!) = 24 / 2 = 12."
  },
  {
    question: "What is the output of =MULTINOMIAL(3, 1, 1)?",
    options: [
      "20",
      "5",
      "120",
      "30"
    ],
    correctAnswer: 0,
    explanation: "Sum = 5. 5! / (3! × 1! × 1!) = 120 / 6 = 20."
  },
  {
    question: "What is the output of =MULTINOMIAL(5, 1)?",
    options: [
      "6",
      "5",
      "30",
      "720"
    ],
    correctAnswer: 0,
    explanation: "6! / (5! × 1!) = 720 / 120 = 6."
  },
  {
    question: "Why does MULTINOMIAL return #NUM! if the total sum of numbers exceeds 170?",
    options: [
      "Because SUM(numbers)! in the numerator exceeds the double precision float limit of 1.79E+308",
      "Because multinomials can only have 3 terms",
      "Because negative numbers are produced",
      "Because numbers are odd"
    ],
    correctAnswer: 0,
    explanation: "Sum factorial (SUM!) overflows double precision floats for sum > 170."
  },
  {
    question: "What is the ultimate takeaway for using MULTINOMIAL in financial and statistical models?",
    options: [
      "Use MULTINOMIAL for multi-group partitioning, portfolio asset bucket partitioning, and multinomial probability distribution coefficients",
      "Use it to format cell colors",
      "Use it to lock worksheets",
      "Use it to hide rows"
    ],
    correctAnswer: 0,
    explanation: "MULTINOMIAL calculates multi-set group partition coefficients."
  }
];

export default questions;
