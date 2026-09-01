const questions = [
  {
    question: "What is the primary function of the COMBINA function in Excel?",
    options: [
      "It calculates the number of combinations with repetition for a given number of items COMBINA(n, k) = COMBIN(n + k - 1, k)",
      "It calculates permutations without repetition",
      "It combines arrays into a single column",
      "It calculates combinations without repetition"
    ],
    correctAnswer: 0,
    explanation: "COMBINA(number, number_chosen) returns the number of combinations WITH repetition."
  },
  {
    question: "What is the formula equivalence between COMBINA and COMBIN?",
    options: [
      "COMBINA(n, k) = COMBIN(n + k - 1, k)",
      "COMBINA(n, k) = COMBIN(n, k) + k",
      "COMBINA(n, k) = COMBIN(n, k) * k!",
      "COMBINA(n, k) = COMBIN(n * k, k)"
    ],
    correctAnswer: 0,
    explanation: "Combinations with repetition COMBINA(n, k) equals COMBIN(n + k - 1, k)."
  },
  {
    question: "What is the result of =COMBINA(3, 2)?",
    options: [
      "6",
      "3",
      "9",
      "12"
    ],
    correctAnswer: 0,
    explanation: "COMBINA(3, 2) = COMBIN(3 + 2 - 1, 2) = COMBIN(4, 2) = 6."
  },
  {
    question: "What are the 6 combinations with repetition when choosing 2 items from {A, B, C}?",
    options: [
      "{AA, AB, AC, BB, BC, CC}",
      "{AB, AC, BC}",
      "{AA, BB, CC}",
      "{AB, BA, AC, CA, BC, CB}"
    ],
    correctAnswer: 0,
    explanation: "Repetition allows duplicate selections: {AA, AB, AC, BB, BC, CC} = 6 options."
  },
  {
    question: "Unlike COMBIN, can number_chosen (k) be greater than number (n) in COMBINA, e.g. =COMBINA(3, 5)?",
    options: [
      "Yes, COMBINA allows k > n because items can be selected repeatedly, returning COMBIN(3 + 5 - 1, 5) = COMBIN(7, 5) = 21",
      "No, it returns #NUM!",
      "No, it returns #VALUE!",
      "It returns 0"
    ],
    correctAnswer: 0,
    explanation: "Repetition allows choosing more items (k) than available distinct types (n)."
  },
  {
    question: "What is the result of =COMBINA(5, 0)?",
    options: [
      "1",
      "0",
      "5",
      "#NUM!"
    ],
    correctAnswer: 0,
    explanation: "Selecting 0 items returns 1 (the empty set)."
  },
  {
    question: "What is the result of =COMBINA(1, 5)?",
    options: [
      "1",
      "5",
      "0",
      "#NUM!"
    ],
    correctAnswer: 0,
    explanation: "Choosing 5 items from 1 type with repetition has only 1 way (select that 1 type 5 times)."
  },
  {
    question: "How does COMBINA handle non-integer arguments like =COMBINA(3.9, 2.1)?",
    options: [
      "Excel truncates decimal portions before calculating combinations, evaluating COMBINA(3, 2) = 6",
      "Returns #VALUE!",
      "Rounds up to COMBINA(4, 2)",
      "Returns #NUM!"
    ],
    correctAnswer: 0,
    explanation: "COMBINA truncates decimal inputs to integers prior to calculation."
  },
  {
    question: "In ice cream shop product design, if 4 flavor choices exist and customers order a 3-scoop bowl (allowing duplicate scoops), how many unique 3-scoop combinations exist?",
    options: [
      "=COMBINA(4, 3) = 20 combinations",
      "=COMBIN(4, 3) = 4 combinations",
      "=POWER(4, 3) = 64 options",
      "=PERMUT(4, 3) = 24 options"
    ],
    correctAnswer: 0,
    explanation: "Scoop selection is unordered with repetition: COMBINA(4, 3) = COMBIN(4 + 3 - 1, 3) = COMBIN(6, 3) = 20."
  },
  {
    question: "What is the result of =COMBINA(4, 2)?",
    options: [
      "10",
      "6",
      "12",
      "16"
    ],
    correctAnswer: 0,
    explanation: "COMBINA(4, 2) = COMBIN(4 + 2 - 1, 2) = COMBIN(5, 2) = 10."
  },
  {
    question: "What is the output of =COMBINA(10, 1)?",
    options: [
      "10",
      "1",
      "100",
      "45"
    ],
    correctAnswer: 0,
    explanation: "COMBINA(n, 1) = COMBIN(n, 1) = n."
  },
  {
    question: "What is the output of =COMBINA(2, 4)?",
    options: [
      "5",
      "16",
      "8",
      "#NUM!"
    ],
    correctAnswer: 0,
    explanation: "COMBINA(2, 4) = COMBIN(2 + 4 - 1, 4) = COMBIN(5, 4) = 5."
  },
  {
    question: "What happens if a negative number is passed to COMBINA, e.g. =COMBINA(-3, 2)?",
    options: [
      "Returns #NUM! error",
      "Returns 6",
      "Returns -6",
      "Returns 0"
    ],
    correctAnswer: 0,
    explanation: "Arguments must be non-negative integers; negative numbers return #NUM! error."
  },
  {
    question: "What is the output of =COMBINA(5, 3)?",
    options: [
      "35",
      "10",
      "60",
      "125"
    ],
    correctAnswer: 0,
    explanation: "COMBINA(5, 3) = COMBIN(5 + 3 - 1, 3) = COMBIN(7, 3) = 35."
  },
  {
    question: "What is the output of =COMBINA(6, 2)?",
    options: [
      "21",
      "15",
      "36",
      "30"
    ],
    correctAnswer: 0,
    explanation: "COMBINA(6, 2) = COMBIN(6 + 2 - 1, 2) = COMBIN(7, 2) = 21."
  },
  {
    question: "What is the stars and bars theorem representation of COMBINA(n, k)?",
    options: [
      "Stars and bars theorem states choosing k items from n types with repetition requires k stars and (n-1) bars, yielding COMBIN(n + k - 1, k)",
      "It uses grid lines",
      "It counts prime numbers",
      "It requires matrix multiplication"
    ],
    correctAnswer: 0,
    explanation: "Stars and bars combinatorial theory forms the mathematical proof for COMBINA."
  },
  {
    question: "What is the result of =COMBINA(4, 4)?",
    options: [
      "35",
      "1",
      "256",
      "24"
    ],
    correctAnswer: 0,
    explanation: "COMBINA(4, 4) = COMBIN(4 + 4 - 1, 4) = COMBIN(7, 4) = 35."
  },
  {
    question: "What is the output of =COMBINA(3, 3)?",
    options: [
      "10",
      "1",
      "27",
      "6"
    ],
    correctAnswer: 0,
    explanation: "COMBINA(3, 3) = COMBIN(3 + 3 - 1, 3) = COMBIN(5, 3) = 10."
  },
  {
    question: "What is the result of =COMBINA(10, 2)?",
    options: [
      "55",
      "45",
      "100",
      "90"
    ],
    correctAnswer: 0,
    explanation: "COMBINA(10, 2) = COMBIN(10 + 2 - 1, 2) = COMBIN(11, 2) = 55."
  },
  {
    question: "What happens if numeric text string like \"3\" is passed, e.g. =COMBINA(\"3\", \"2\")?",
    options: [
      "Excel coerces text to numbers and returns 6",
      "Returns #VALUE!",
      "Returns #NUM!",
      "Returns 0"
    ],
    correctAnswer: 0,
    explanation: "Excel automatically coerces numeric text strings."
  },
  {
    question: "What happens if non-numeric text like \"ABC\" is passed, e.g. =COMBINA(\"ABC\", 2)?",
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
    question: "What is the output of =COMBINA(5, 5)?",
    options: [
      "126",
      "1",
      "3125",
      "120"
    ],
    correctAnswer: 0,
    explanation: "COMBINA(5, 5) = COMBIN(5 + 5 - 1, 5) = COMBIN(9, 5) = 126."
  },
  {
    question: "What is the output of =COMBINA(8, 2)?",
    options: [
      "36",
      "28",
      "64",
      "56"
    ],
    correctAnswer: 0,
    explanation: "COMBINA(8, 2) = COMBIN(8 + 2 - 1, 2) = COMBIN(9, 2) = 36."
  },
  {
    question: "What is the output of =COMBINA(7, 3)?",
    options: [
      "84",
      "35",
      "343",
      "210"
    ],
    correctAnswer: 0,
    explanation: "COMBINA(7, 3) = COMBIN(7 + 3 - 1, 3) = COMBIN(9, 3) = 84."
  },
  {
    question: "What is the output of =COMBINA(12, 2)?",
    options: [
      "78",
      "66",
      "144",
      "132"
    ],
    correctAnswer: 0,
    explanation: "COMBINA(12, 2) = COMBIN(12 + 2 - 1, 2) = COMBIN(13, 2) = 78."
  },
  {
    question: "What is the result of =COMBINA(3, 4)?",
    options: [
      "15",
      "81",
      "12",
      "#NUM!"
    ],
    correctAnswer: 0,
    explanation: "COMBINA(3, 4) = COMBIN(3 + 4 - 1, 4) = COMBIN(6, 4) = 15."
  },
  {
    question: "What is the output of =COMBINA(2, 5)?",
    options: [
      "6",
      "32",
      "10",
      "#NUM!"
    ],
    correctAnswer: 0,
    explanation: "COMBINA(2, 5) = COMBIN(2 + 5 - 1, 5) = COMBIN(6, 5) = 6."
  },
  {
    question: "In asset allocation modeling, if allocating 5 risk capital points across 3 asset classes, how many distinct allocations exist?",
    options: [
      "=COMBINA(3, 5) = 21 allocations",
      "=COMBIN(3, 5) = #NUM!",
      "=POWER(3, 5) = 243 allocations",
      "=PERMUT(3, 5) = #NUM!"
    ],
    correctAnswer: 0,
    explanation: "Capital allocation with repetition is COMBINA(3, 5) = COMBIN(3 + 5 - 1, 5) = COMBIN(7, 5) = 21."
  },
  {
    question: "What is the difference between COMBINA(n, k) and POWER(n, k)?",
    options: [
      "COMBINA ignores item selection order, whereas POWER(n, k) considers order (ordered selection with repetition)",
      "COMBINA allows repetition, POWER does not",
      "COMBINA returns text",
      "POWER returns integer overflow"
    ],
    correctAnswer: 0,
    explanation: "COMBINA is unordered with repetition; POWER(n, k) is ordered with repetition."
  },
  {
    question: "What is the ultimate takeaway for using COMBINA in financial modeling?",
    options: [
      "Use COMBINA for multiset combinations, product mix customizer options, and capital point allocation across asset buckets where repetition is allowed",
      "Use it to format cell colors",
      "Use it to password protect sheets",
      "Use it to hide rows"
    ],
    correctAnswer: 0,
    explanation: "COMBINA models unordered multiset selections with replacement."
  }
];

export default questions;
