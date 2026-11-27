const questions = [
  {
    "id": 1,
    "question": "What is the return type of Math.max(15, 20) in Java?",
    "shortAnswer": "int",
    "explanation": "Because both arguments are integer literals, Math.max(int, int) is called, returning an int (20).",
    "hint": "Both parameters are integers.",
    "level": "basic",
    "options": [
      "int",
      "double",
      "long",
      "boolean"
    ],
    "correctAnswer": 0,
    "codeExample": "int m = Math.max(15, 20); // 20"
  },
  {
    "id": 2,
    "question": "What is the output of System.out.println(Math.max(-12, -20));?",
    "shortAnswer": "-12",
    "explanation": "On the number line, -12 is greater than -20 (closer to 0). Output is -12.",
    "hint": "Which negative number is larger?",
    "level": "basic",
    "options": [
      "-12",
      "-20",
      "12",
      "20"
    ],
    "correctAnswer": 0,
    "codeExample": "System.out.println(Math.max(-12, -20)); // -12"
  },
  {
    "id": 3,
    "question": "What is the output of System.out.println(Math.max(10, 8.5));?",
    "shortAnswer": "10.0 (Trap: mixed types promote to double)",
    "explanation": "Because one argument is double (8.5), the integer 10 is widened to double 10.0. The method returns double 10.0.",
    "hint": "Mixed int and double promotes to double.",
    "level": "intermediate",
    "options": [
      "10",
      "10.0",
      "8.5",
      "Compilation Error"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.max(10, 8.5)); // 10.0"
  },
  {
    "id": 4,
    "question": "How do you find the maximum of three numbers a, b, and c using Math.max()?",
    "shortAnswer": "Math.max(a, Math.max(b, c))",
    "explanation": "Math.max only accepts two arguments. To compare three numbers, nest the calls: Math.max(a, Math.max(b, c)).",
    "hint": "Math.max only takes 2 parameters, so nest them.",
    "level": "basic",
    "options": [
      "Math.max(a, b, c)",
      "Math.max(a, Math.max(b, c))",
      "max(a, b, c)",
      "Math.maximum(a, b, c)"
    ],
    "correctAnswer": 1,
    "codeExample": "int largest = Math.max(a, Math.max(b, c));"
  },
  {
    "id": 5,
    "question": "Evaluate: int ans = Math.max(Math.max(5, 12), Math.max(18, 9)); What is ans?",
    "shortAnswer": "18",
    "explanation": "Math.max(5, 12) = 12. Math.max(18, 9) = 18. Math.max(12, 18) = 18.",
    "hint": "Find max of left pair (12) and right pair (18), then max of both.",
    "level": "intermediate",
    "options": [
      "12",
      "18",
      "9",
      "5"
    ],
    "correctAnswer": 1,
    "codeExample": "int ans = Math.max(Math.max(5, 12), Math.max(18, 9)); // 18"
  },
  {
    "id": 6,
    "question": "What is the output of System.out.println(Math.max(12, 18));?",
    "shortAnswer": "18",
    "explanation": "18 is greater than 12, so Math.max returns integer 18.",
    "hint": "Larger of 12 and 18.",
    "level": "basic",
    "options": [
      "12",
      "18",
      "18.0",
      "12.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.max(12, 18)); // 18"
  },
  {
    "id": 7,
    "question": "What is the output of System.out.println(Math.max(14, 21));?",
    "shortAnswer": "21",
    "explanation": "21 is greater than 14, so Math.max returns integer 21.",
    "hint": "Larger of 14 and 21.",
    "level": "basic",
    "options": [
      "14",
      "21",
      "21.0",
      "14.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.max(14, 21)); // 21"
  },
  {
    "id": 8,
    "question": "What is the output of System.out.println(Math.max(16, 24));?",
    "shortAnswer": "24",
    "explanation": "24 is greater than 16, so Math.max returns integer 24.",
    "hint": "Larger of 16 and 24.",
    "level": "basic",
    "options": [
      "16",
      "24",
      "24.0",
      "16.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.max(16, 24)); // 24"
  },
  {
    "id": 9,
    "question": "What is the output of System.out.println(Math.max(18, 27));?",
    "shortAnswer": "27",
    "explanation": "27 is greater than 18, so Math.max returns integer 27.",
    "hint": "Larger of 18 and 27.",
    "level": "basic",
    "options": [
      "18",
      "27",
      "27.0",
      "18.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.max(18, 27)); // 27"
  },
  {
    "id": 10,
    "question": "What is the output of System.out.println(Math.max(20, 30));?",
    "shortAnswer": "30",
    "explanation": "30 is greater than 20, so Math.max returns integer 30.",
    "hint": "Larger of 20 and 30.",
    "level": "basic",
    "options": [
      "20",
      "30",
      "30.0",
      "20.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.max(20, 30)); // 30"
  },
  {
    "id": 11,
    "question": "What is the output of System.out.println(Math.max(22, 33));?",
    "shortAnswer": "33",
    "explanation": "33 is greater than 22, so Math.max returns integer 33.",
    "hint": "Larger of 22 and 33.",
    "level": "basic",
    "options": [
      "22",
      "33",
      "33.0",
      "22.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.max(22, 33)); // 33"
  },
  {
    "id": 12,
    "question": "What is the output of System.out.println(Math.max(24, 36));?",
    "shortAnswer": "36",
    "explanation": "36 is greater than 24, so Math.max returns integer 36.",
    "hint": "Larger of 24 and 36.",
    "level": "basic",
    "options": [
      "24",
      "36",
      "36.0",
      "24.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.max(24, 36)); // 36"
  },
  {
    "id": 13,
    "question": "What is the output of System.out.println(Math.max(26, 39));?",
    "shortAnswer": "39",
    "explanation": "39 is greater than 26, so Math.max returns integer 39.",
    "hint": "Larger of 26 and 39.",
    "level": "basic",
    "options": [
      "26",
      "39",
      "39.0",
      "26.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.max(26, 39)); // 39"
  },
  {
    "id": 14,
    "question": "What is the output of System.out.println(Math.max(28, 42));?",
    "shortAnswer": "42",
    "explanation": "42 is greater than 28, so Math.max returns integer 42.",
    "hint": "Larger of 28 and 42.",
    "level": "basic",
    "options": [
      "28",
      "42",
      "42.0",
      "28.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.max(28, 42)); // 42"
  },
  {
    "id": 15,
    "question": "What is the output of System.out.println(Math.max(30, 45));?",
    "shortAnswer": "45",
    "explanation": "45 is greater than 30, so Math.max returns integer 45.",
    "hint": "Larger of 30 and 45.",
    "level": "basic",
    "options": [
      "30",
      "45",
      "45.0",
      "30.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.max(30, 45)); // 45"
  },
  {
    "id": 16,
    "question": "What is the output of System.out.println(Math.max(32, 48));?",
    "shortAnswer": "48",
    "explanation": "48 is greater than 32, so Math.max returns integer 48.",
    "hint": "Larger of 32 and 48.",
    "level": "basic",
    "options": [
      "32",
      "48",
      "48.0",
      "32.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.max(32, 48)); // 48"
  },
  {
    "id": 17,
    "question": "What is the output of System.out.println(Math.max(34, 51));?",
    "shortAnswer": "51",
    "explanation": "51 is greater than 34, so Math.max returns integer 51.",
    "hint": "Larger of 34 and 51.",
    "level": "basic",
    "options": [
      "34",
      "51",
      "51.0",
      "34.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.max(34, 51)); // 51"
  },
  {
    "id": 18,
    "question": "What is the output of System.out.println(Math.max(36, 54));?",
    "shortAnswer": "54",
    "explanation": "54 is greater than 36, so Math.max returns integer 54.",
    "hint": "Larger of 36 and 54.",
    "level": "basic",
    "options": [
      "36",
      "54",
      "54.0",
      "36.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.max(36, 54)); // 54"
  },
  {
    "id": 19,
    "question": "What is the output of System.out.println(Math.max(38, 57));?",
    "shortAnswer": "57",
    "explanation": "57 is greater than 38, so Math.max returns integer 57.",
    "hint": "Larger of 38 and 57.",
    "level": "basic",
    "options": [
      "38",
      "57",
      "57.0",
      "38.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.max(38, 57)); // 57"
  },
  {
    "id": 20,
    "question": "What is the output of System.out.println(Math.max(40, 60));?",
    "shortAnswer": "60",
    "explanation": "60 is greater than 40, so Math.max returns integer 60.",
    "hint": "Larger of 40 and 60.",
    "level": "basic",
    "options": [
      "40",
      "60",
      "60.0",
      "40.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.max(40, 60)); // 60"
  },
  {
    "id": 21,
    "question": "What is the output of System.out.println(Math.max(42, 63));?",
    "shortAnswer": "63",
    "explanation": "63 is greater than 42, so Math.max returns integer 63.",
    "hint": "Larger of 42 and 63.",
    "level": "basic",
    "options": [
      "42",
      "63",
      "63.0",
      "42.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.max(42, 63)); // 63"
  },
  {
    "id": 22,
    "question": "What is the output of System.out.println(Math.max(44, 66));?",
    "shortAnswer": "66",
    "explanation": "66 is greater than 44, so Math.max returns integer 66.",
    "hint": "Larger of 44 and 66.",
    "level": "basic",
    "options": [
      "44",
      "66",
      "66.0",
      "44.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.max(44, 66)); // 66"
  },
  {
    "id": 23,
    "question": "What is the output of System.out.println(Math.max(46, 69));?",
    "shortAnswer": "69",
    "explanation": "69 is greater than 46, so Math.max returns integer 69.",
    "hint": "Larger of 46 and 69.",
    "level": "basic",
    "options": [
      "46",
      "69",
      "69.0",
      "46.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.max(46, 69)); // 69"
  },
  {
    "id": 24,
    "question": "What is the output of System.out.println(Math.max(48, 72));?",
    "shortAnswer": "72",
    "explanation": "72 is greater than 48, so Math.max returns integer 72.",
    "hint": "Larger of 48 and 72.",
    "level": "basic",
    "options": [
      "48",
      "72",
      "72.0",
      "48.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.max(48, 72)); // 72"
  },
  {
    "id": 25,
    "question": "True or False: If one argument is NaN in Math.max(x, y), Java specifies that the result is NaN.",
    "shortAnswer": "True (NaN propagates in floating-point Math.max comparisons)",
    "explanation": "According to Java documentation, if either argument is NaN, the result of Math.max is NaN.",
    "hint": "NaN compared with any value in Math.max produces NaN.",
    "level": "advanced",
    "options": [
      "True, NaN propagates to the result",
      "False, the other non-NaN number is returned",
      "False, an exception is thrown",
      "True, but only if both arguments are NaN"
    ],
    "correctAnswer": 0,
    "codeExample": "System.out.println(Math.max(5.0, Double.NaN)); // NaN"
  }
];
export default questions;
