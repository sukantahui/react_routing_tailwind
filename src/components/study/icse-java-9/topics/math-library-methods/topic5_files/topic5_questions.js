const questions = [
  {
    "id": 1,
    "question": "What is the return type of Math.round(double a) in Java?",
    "shortAnswer": "long",
    "explanation": "When passed a double argument, Math.round returns a value of primitive type long. When passed a float argument, it returns an int.",
    "hint": "Does Math.round return a double or an integer type?",
    "level": "basic",
    "options": [
      "double",
      "long",
      "int",
      "float"
    ],
    "correctAnswer": 1,
    "codeExample": "long res = Math.round(6.4); // 6"
  },
  {
    "id": 2,
    "question": "What is the return type of Math.round(float a) in Java?",
    "shortAnswer": "int",
    "explanation": "Math.round is overloaded: Math.round(float) returns int, and Math.round(double) returns long.",
    "hint": "Smaller float rounds to smaller integer type.",
    "level": "basic",
    "options": [
      "int",
      "long",
      "float",
      "double"
    ],
    "correctAnswer": 0,
    "codeExample": "int res = Math.round(6.4f); // 6"
  },
  {
    "id": 3,
    "question": "What is the output of System.out.println(Math.round(5.5));?",
    "shortAnswer": "6",
    "explanation": "At 0.5, Math.round rounds up to the next higher integer 6. Because return type is long, it prints 6 without any decimal point.",
    "hint": "5.5 rounds up to 6. Does it have a decimal point?",
    "level": "basic",
    "options": [
      "5",
      "6",
      "6.0",
      "5.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.round(5.5)); // 6"
  },
  {
    "id": 4,
    "question": "What is the output of System.out.println(Math.round(5.4));?",
    "shortAnswer": "5",
    "explanation": "Fractional part 0.4 < 0.5 rounds down to 5.",
    "hint": "Less than 0.5 rounds down.",
    "level": "basic",
    "options": [
      "5",
      "5.0",
      "6",
      "6.0"
    ],
    "correctAnswer": 0,
    "codeExample": "System.out.println(Math.round(5.4)); // 5"
  },
  {
    "id": 5,
    "question": "What is the output of System.out.println(Math.round(-5.5));?",
    "shortAnswer": "-5 (CRITICAL ICSE TRAP: formula floor(x + 0.5))",
    "explanation": "Math.round uses the formula floor(x + 0.5). For -5.5: floor(-5.5 + 0.5) = floor(-5.0) = -5. It is NOT -6!",
    "hint": "Apply the formula floor(x + 0.5): -5.5 + 0.5 = -5.0.",
    "level": "intermediate",
    "options": [
      "-6",
      "-5",
      "-6.0",
      "-5.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.round(-5.5)); // -5"
  },
  {
    "id": 6,
    "question": "What is the output of System.out.println(Math.round(-5.6));?",
    "shortAnswer": "-6",
    "explanation": "floor(-5.6 + 0.5) = floor(-5.1) = -6.",
    "hint": "More negative than -5.5 rounds down to -6.",
    "level": "basic",
    "options": [
      "-5",
      "-6",
      "-5.0",
      "-6.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.round(-5.6)); // -6"
  },
  {
    "id": 7,
    "question": "What will be the output of: System.out.println(Math.round(-4.5) + Math.ceil(-4.5));?",
    "shortAnswer": "-8.0",
    "explanation": "Math.round(-4.5) = -4. Math.ceil(-4.5) = -4.0. -4 + (-4.0) = -8.0.",
    "hint": "Both give -4, but ceil gives -4.0 so the sum is double -8.0.",
    "level": "intermediate",
    "options": [
      "-9.0",
      "-8.0",
      "-8",
      "-9"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.round(-4.5) + Math.ceil(-4.5)); // -8.0"
  },
  {
    "id": 8,
    "question": "Which of the following lines causes a compilation error in Java?",
    "shortAnswer": "int ans = Math.round(9.8);",
    "explanation": "9.8 is a double literal. Math.round(double) returns long. Assigning long to int without an explicit (int) cast causes a possible loss of precision compile error.",
    "hint": "Math.round on a double returns long, which cannot be stored in an int without casting.",
    "level": "intermediate",
    "options": [
      "long ans = Math.round(9.8);",
      "int ans = Math.round(9.8f);",
      "int ans = (int) Math.round(9.8);",
      "int ans = Math.round(9.8);"
    ],
    "correctAnswer": 3,
    "codeExample": "int ans = (int) Math.round(9.8); // Explicit cast required"
  },
  {
    "id": 9,
    "question": "What is the output of System.out.println(Math.round(0.49));?",
    "shortAnswer": "0",
    "explanation": "0.49 is less than 0.5, so it rounds down to 0.",
    "hint": "Rounds to closest integer 0.",
    "level": "basic",
    "options": [
      "0",
      "0.0",
      "1",
      "1.0"
    ],
    "correctAnswer": 0,
    "codeExample": "System.out.println(Math.round(0.49)); // 0"
  },
  {
    "id": 10,
    "question": "What is the output of System.out.println(Math.round(0.50));?",
    "shortAnswer": "1",
    "explanation": "0.50 rounds up to 1.",
    "hint": "Halfway point rounds up.",
    "level": "basic",
    "options": [
      "0",
      "1",
      "1.0",
      "0.5"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.round(0.50)); // 1"
  },
  {
    "id": 11,
    "question": "What is the output of System.out.println(Math.round(-0.5));?",
    "shortAnswer": "0",
    "explanation": "floor(-0.5 + 0.5) = floor(0.0) = 0.",
    "hint": "-0.5 + 0.5 = 0.",
    "level": "intermediate",
    "options": [
      "0",
      "-1",
      "-0.0",
      "0.0"
    ],
    "correctAnswer": 0,
    "codeExample": "System.out.println(Math.round(-0.5)); // 0"
  },
  {
    "id": 12,
    "question": "What is the output of System.out.println(Math.round(-0.51));?",
    "shortAnswer": "-1",
    "explanation": "floor(-0.51 + 0.5) = floor(-0.01) = -1.",
    "hint": "Just past -0.5 drops to -1.",
    "level": "intermediate",
    "options": [
      "0",
      "-1",
      "-1.0",
      "-0.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.round(-0.51)); // -1"
  },
  {
    "id": 13,
    "question": "What is the result of Math.round(15.5) - Math.floor(15.5)?",
    "shortAnswer": "1.0",
    "explanation": "Math.round(15.5) = 16 (long). Math.floor(15.5) = 15.0 (double). 16 - 15.0 = 1.0 (double).",
    "hint": "16 - 15.0 = 1.0.",
    "level": "intermediate",
    "options": [
      "1",
      "1.0",
      "0.5",
      "0.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.round(15.5) - Math.floor(15.5)); // 1.0"
  },
  {
    "id": 14,
    "question": "True or False: Math.round() returns a floating-point number.",
    "shortAnswer": "False (it returns int or long)",
    "explanation": "Math.round returns an integer primitive type: either int (for float argument) or long (for double argument).",
    "hint": "Does Math.round output have a decimal point?",
    "level": "basic",
    "options": [
      "True, it returns double",
      "False, it returns either int or long",
      "True, but only for float values",
      "False, it returns short"
    ],
    "correctAnswer": 1,
    "codeExample": "// Math.round returns int or long"
  },
  {
    "id": 15,
    "question": "What is the output of System.out.println(Math.round(99.499));?",
    "shortAnswer": "99",
    "explanation": "0.499 is strictly less than 0.5, so it rounds down to 99.",
    "hint": "Rounds down to 99.",
    "level": "basic",
    "options": [
      "99",
      "100",
      "99.0",
      "100.0"
    ],
    "correctAnswer": 0,
    "codeExample": "System.out.println(Math.round(99.499)); // 99"
  },
  {
    "id": 16,
    "question": "What is the output of System.out.println(Math.round(16.6));?",
    "shortAnswer": "17",
    "explanation": "Fractional part 0.6 is >= 0.5, so it rounds up to integer 17.",
    "hint": "Rounds up to 17.",
    "level": "basic",
    "options": [
      "16",
      "17",
      "17.0",
      "16.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.round(16.6)); // 17"
  },
  {
    "id": 17,
    "question": "What is the output of System.out.println(Math.round(17.6));?",
    "shortAnswer": "18",
    "explanation": "Fractional part 0.6 is >= 0.5, so it rounds up to integer 18.",
    "hint": "Rounds up to 18.",
    "level": "basic",
    "options": [
      "17",
      "18",
      "18.0",
      "17.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.round(17.6)); // 18"
  },
  {
    "id": 18,
    "question": "What is the output of System.out.println(Math.round(18.6));?",
    "shortAnswer": "19",
    "explanation": "Fractional part 0.6 is >= 0.5, so it rounds up to integer 19.",
    "hint": "Rounds up to 19.",
    "level": "basic",
    "options": [
      "18",
      "19",
      "19.0",
      "18.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.round(18.6)); // 19"
  },
  {
    "id": 19,
    "question": "What is the output of System.out.println(Math.round(19.6));?",
    "shortAnswer": "20",
    "explanation": "Fractional part 0.6 is >= 0.5, so it rounds up to integer 20.",
    "hint": "Rounds up to 20.",
    "level": "basic",
    "options": [
      "19",
      "20",
      "20.0",
      "19.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.round(19.6)); // 20"
  },
  {
    "id": 20,
    "question": "What is the output of System.out.println(Math.round(20.6));?",
    "shortAnswer": "21",
    "explanation": "Fractional part 0.6 is >= 0.5, so it rounds up to integer 21.",
    "hint": "Rounds up to 21.",
    "level": "basic",
    "options": [
      "20",
      "21",
      "21.0",
      "20.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.round(20.6)); // 21"
  },
  {
    "id": 21,
    "question": "What is the output of System.out.println(Math.round(21.6));?",
    "shortAnswer": "22",
    "explanation": "Fractional part 0.6 is >= 0.5, so it rounds up to integer 22.",
    "hint": "Rounds up to 22.",
    "level": "basic",
    "options": [
      "21",
      "22",
      "22.0",
      "21.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.round(21.6)); // 22"
  },
  {
    "id": 22,
    "question": "What is the output of System.out.println(Math.round(22.6));?",
    "shortAnswer": "23",
    "explanation": "Fractional part 0.6 is >= 0.5, so it rounds up to integer 23.",
    "hint": "Rounds up to 23.",
    "level": "basic",
    "options": [
      "22",
      "23",
      "23.0",
      "22.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.round(22.6)); // 23"
  },
  {
    "id": 23,
    "question": "What is the output of System.out.println(Math.round(23.6));?",
    "shortAnswer": "24",
    "explanation": "Fractional part 0.6 is >= 0.5, so it rounds up to integer 24.",
    "hint": "Rounds up to 24.",
    "level": "basic",
    "options": [
      "23",
      "24",
      "24.0",
      "23.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.round(23.6)); // 24"
  },
  {
    "id": 24,
    "question": "What is the output of System.out.println(Math.round(24.6));?",
    "shortAnswer": "25",
    "explanation": "Fractional part 0.6 is >= 0.5, so it rounds up to integer 25.",
    "hint": "Rounds up to 25.",
    "level": "basic",
    "options": [
      "24",
      "25",
      "25.0",
      "24.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.round(24.6)); // 25"
  },
  {
    "id": 25,
    "question": "Which of the following methods in Math class does NOT return double?",
    "shortAnswer": "Math.round()",
    "explanation": "Math.round returns int or long, whereas Math.pow, Math.sqrt, Math.cbrt, Math.ceil, and Math.floor always return double.",
    "hint": "Which method returns an integer type?",
    "level": "basic",
    "options": [
      "Math.ceil()",
      "Math.floor()",
      "Math.round()",
      "Math.sqrt()"
    ],
    "correctAnswer": 2,
    "codeExample": "// Math.round returns int/long; others return double"
  }
];
export default questions;
