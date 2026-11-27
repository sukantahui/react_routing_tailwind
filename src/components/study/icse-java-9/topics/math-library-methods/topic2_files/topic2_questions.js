const questions = [
  {
    "id": 1,
    "question": "What is the return type of the method Math.cbrt(x) in Java?",
    "shortAnswer": "double",
    "explanation": "Math.cbrt(double a) returns the cube root of a double value as a primitive double.",
    "hint": "Recall the return type of all root methods in Math class.",
    "level": "basic",
    "options": [
      "int",
      "double",
      "float",
      "long"
    ],
    "correctAnswer": 1,
    "codeExample": "double root = Math.cbrt(27); // 3.0"
  },
  {
    "id": 2,
    "question": "What is the output of System.out.println(Math.cbrt(27));?",
    "shortAnswer": "3.0",
    "explanation": "The cube root of 27 is 3. Since Math.cbrt returns a double, it prints 3.0.",
    "hint": "3 cubed is 27. Include decimal point for double.",
    "level": "basic",
    "options": [
      "3",
      "3.0",
      "9.0",
      "27.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.cbrt(27)); // 3.0"
  },
  {
    "id": 3,
    "question": "What is the output of System.out.println(Math.cbrt(-8));?",
    "shortAnswer": "-2.0 (Unlike sqrt, cbrt accepts negative numbers)",
    "explanation": "Because (-2) * (-2) * (-2) = -8, the cube root of -8 is a valid real number: -2.0. Unlike Math.sqrt, Math.cbrt does NOT return NaN for negative values.",
    "hint": "Cube root of a negative number is a valid negative real number.",
    "level": "intermediate",
    "options": [
      "NaN",
      "-2.0",
      "2.0",
      "ArithmeticException"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.cbrt(-8)); // -2.0"
  },
  {
    "id": 4,
    "question": "What is the fundamental difference between Math.sqrt(-64) and Math.cbrt(-64)?",
    "shortAnswer": "Math.sqrt(-64) returns NaN, whereas Math.cbrt(-64) returns -4.0",
    "explanation": "Square root of a negative number has no real solution (returns NaN). Cube root of a negative number has a valid real negative solution (returns -4.0).",
    "hint": "One returns NaN, the other returns a valid negative real number.",
    "level": "intermediate",
    "options": [
      "Both return NaN",
      "Both throw ArithmeticException",
      "Math.sqrt(-64) returns NaN, while Math.cbrt(-64) returns -4.0",
      "Math.sqrt(-64) returns -8.0, while Math.cbrt(-64) returns NaN"
    ],
    "correctAnswer": 2,
    "codeExample": "System.out.println(Math.sqrt(-64)); // NaN\nSystem.out.println(Math.cbrt(-64)); // -4.0"
  },
  {
    "id": 5,
    "question": "What is the output of System.out.println(Math.cbrt(125));?",
    "shortAnswer": "5.0",
    "explanation": "5 * 5 * 5 = 125. The method returns 5.0 as a double.",
    "hint": "5 cubed is 125.",
    "level": "basic",
    "options": [
      "5",
      "5.0",
      "25.0",
      "125.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.cbrt(125)); // 5.0"
  },
  {
    "id": 6,
    "question": "What is the value of Math.cbrt(0)?",
    "shortAnswer": "0.0",
    "explanation": "The cube root of 0 is 0.0.",
    "hint": "Cube root of zero.",
    "level": "basic",
    "options": [
      "0",
      "0.0",
      "1.0",
      "NaN"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.cbrt(0)); // 0.0"
  },
  {
    "id": 7,
    "question": "What will Math.cbrt(-1) evaluate to?",
    "shortAnswer": "-1.0",
    "explanation": "(-1) * (-1) * (-1) = -1. Therefore, Math.cbrt(-1) evaluates to -1.0.",
    "hint": "Cube root of negative one.",
    "level": "basic",
    "options": [
      "-1",
      "-1.0",
      "1.0",
      "NaN"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.cbrt(-1)); // -1.0"
  },
  {
    "id": 8,
    "question": "Which of the following is equivalent to Math.cbrt(x)?",
    "shortAnswer": "Math.pow(x, 1.0 / 3.0)",
    "explanation": "Raising x to the power (1.0 / 3.0) gives the cube root. Note: 1/3 with integers would evaluate to 0, which is incorrect.",
    "hint": "Remember to use floating-point division 1.0 / 3.0 in Math.pow.",
    "level": "intermediate",
    "options": [
      "Math.pow(x, 1 / 3)",
      "Math.pow(x, 1.0 / 3.0)",
      "Math.pow(x, 3)",
      "Math.sqrt(Math.sqrt(x))"
    ],
    "correctAnswer": 1,
    "codeExample": "double r = Math.pow(x, 1.0 / 3.0); // Equivalent to Math.cbrt(x)"
  },
  {
    "id": 9,
    "question": "What is the output of System.out.println(Math.cbrt(1000));?",
    "shortAnswer": "10.0",
    "explanation": "10 * 10 * 10 = 1000. Math.cbrt returns 10.0.",
    "hint": "10 cubed is 1000.",
    "level": "basic",
    "options": [
      "10",
      "10.0",
      "100.0",
      "100"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.cbrt(1000)); // 10.0"
  },
  {
    "id": 10,
    "question": "Evaluate: int ans = (int) Math.cbrt(64); What is ans?",
    "shortAnswer": "4",
    "explanation": "Math.cbrt(64) = 4.0. Explicit cast (int) converts 4.0 to integer 4.",
    "hint": "4 cubed is 64. Cast removes decimal.",
    "level": "basic",
    "options": [
      "4",
      "4.0",
      "8",
      "8.0"
    ],
    "correctAnswer": 0,
    "codeExample": "int ans = (int) Math.cbrt(64); // 4"
  },
  {
    "id": 11,
    "question": "What will Math.cbrt(-27) + Math.sqrt(9) output?",
    "shortAnswer": "0.0",
    "explanation": "Math.cbrt(-27) = -3.0. Math.sqrt(9) = 3.0. -3.0 + 3.0 = 0.0.",
    "hint": "Add -3.0 and +3.0.",
    "level": "intermediate",
    "options": [
      "0.0",
      "0",
      "-6.0",
      "NaN"
    ],
    "correctAnswer": 0,
    "codeExample": "System.out.println(Math.cbrt(-27) + Math.sqrt(9)); // 0.0"
  },
  {
    "id": 12,
    "question": "Convert the formula for side of a cube s = ∛v into valid Java code.",
    "shortAnswer": "double s = Math.cbrt(v);",
    "explanation": "Math.cbrt(v) calculates ∛v.",
    "hint": "Use Math.cbrt.",
    "level": "basic",
    "options": [
      "double s = cbrt(v);",
      "double s = Math.cbrt(v);",
      "double s = Math.cubeRoot(v);",
      "double s = Math.pow(v, 3);"
    ],
    "correctAnswer": 1,
    "codeExample": "double s = Math.cbrt(v);"
  },
  {
    "id": 13,
    "question": "What is the output of System.out.println(Math.cbrt(0.001));?",
    "shortAnswer": "0.1",
    "explanation": "0.1 * 0.1 * 0.1 = 0.001. Therefore, Math.cbrt(0.001) evaluates to 0.1.",
    "hint": "What decimal multiplied by itself 3 times gives 0.001?",
    "level": "intermediate",
    "options": [
      "0.01",
      "0.1",
      "0.001",
      "1.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.cbrt(0.001)); // 0.1"
  },
  {
    "id": 14,
    "question": "What is the output of System.out.println(Math.cbrt(1));?",
    "shortAnswer": "1.0",
    "explanation": "Cube root of 1 is 1.0 (double).",
    "hint": "Cube root of unity.",
    "level": "basic",
    "options": [
      "1",
      "1.0",
      "0.0",
      "3.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.cbrt(1)); // 1.0"
  },
  {
    "id": 15,
    "question": "What is the output of System.out.println(Math.cbrt(-216));?",
    "shortAnswer": "-6.0",
    "explanation": "(-6) * (-6) * (-6) = -216. Output is -6.0.",
    "hint": "6 cubed is 216.",
    "level": "basic",
    "options": [
      "-6.0",
      "6.0",
      "NaN",
      "-6"
    ],
    "correctAnswer": 0,
    "codeExample": "System.out.println(Math.cbrt(-216)); // -6.0"
  },
  {
    "id": 16,
    "question": "Which expression calculates the cube root of the sum of three numbers x, y, and z?",
    "shortAnswer": "Math.cbrt(x + y + z)",
    "explanation": "Math.cbrt(x + y + z) calculates ∛(x + y + z).",
    "hint": "Pass the sum as a single parameter to Math.cbrt.",
    "level": "basic",
    "options": [
      "Math.cbrt(x) + Math.cbrt(y) + Math.cbrt(z)",
      "Math.cbrt(x + y + z)",
      "cbrt(x, y, z)",
      "Math.pow(x + y + z, 3)"
    ],
    "correctAnswer": 1,
    "codeExample": "double root = Math.cbrt(x + y + z);"
  },
  {
    "id": 17,
    "question": "What is the output of Math.cbrt(Math.pow(2, 3));?",
    "shortAnswer": "2.0",
    "explanation": "Math.pow(2, 3) = 8.0. Math.cbrt(8.0) = 2.0.",
    "hint": "Cube root of 2 cubed is 2.0.",
    "level": "intermediate",
    "options": [
      "2",
      "2.0",
      "8.0",
      "4.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.cbrt(Math.pow(2, 3))); // 2.0"
  },
  {
    "id": 18,
    "question": "True or False: Math.cbrt() can throw an ArithmeticException when given a negative argument.",
    "shortAnswer": "False (Math.cbrt smoothly handles negative arguments and returns a negative double)",
    "explanation": "In Java, mathematical library methods in Math do not throw ArithmeticExceptions for negative roots; cbrt returns the correct real negative root.",
    "hint": "Does Java throw an exception on Math.cbrt(-8)?",
    "level": "basic",
    "options": [
      "True, all roots of negative numbers throw exceptions",
      "False, Math.cbrt calculates negative real cube roots accurately",
      "True, but only in BlueJ",
      "False, it returns NaN"
    ],
    "correctAnswer": 1,
    "codeExample": "double r = Math.cbrt(-8); // No exception, returns -2.0"
  },
  {
    "id": 19,
    "question": "What is the output of System.out.println(Math.cbrt(343));?",
    "shortAnswer": "7.0",
    "explanation": "7 * 7 * 7 = 343. Returns 7.0.",
    "hint": "7 cubed is 343.",
    "level": "basic",
    "options": [
      "7",
      "7.0",
      "49.0",
      "21.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.cbrt(343)); // 7.0"
  },
  {
    "id": 20,
    "question": "What is the output of System.out.println(Math.cbrt(-1000));?",
    "shortAnswer": "-10.0",
    "explanation": "Cube root of -1000 is -10.0.",
    "hint": "-10 cubed is -1000.",
    "level": "basic",
    "options": [
      "10.0",
      "-10.0",
      "NaN",
      "-100.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.cbrt(-1000)); // -10.0"
  },
  {
    "id": 21,
    "question": "What is the output of System.out.println(Math.cbrt(512));?",
    "shortAnswer": "8.0",
    "explanation": "8 * 8 * 8 = 512. Returns 8.0.",
    "hint": "8 cubed is 512.",
    "level": "basic",
    "options": [
      "8",
      "8.0",
      "16.0",
      "64.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.cbrt(512)); // 8.0"
  },
  {
    "id": 22,
    "question": "What is the result of Math.cbrt(Double.NEGATIVE_INFINITY)?",
    "shortAnswer": "-Infinity",
    "explanation": "According to Java language specifications, if the argument is negative infinity, the result is negative infinity.",
    "hint": "Cube root of -Infinity.",
    "level": "advanced",
    "options": [
      "-Infinity",
      "Infinity",
      "NaN",
      "-0.0"
    ],
    "correctAnswer": 0,
    "codeExample": "System.out.println(Math.cbrt(Double.NEGATIVE_INFINITY)); // -Infinity"
  },
  {
    "id": 23,
    "question": "What is the output of System.out.println(Math.cbrt(8) * Math.sqrt(4));?",
    "shortAnswer": "4.0",
    "explanation": "Math.cbrt(8) = 2.0. Math.sqrt(4) = 2.0. 2.0 * 2.0 = 4.0.",
    "hint": "2.0 times 2.0.",
    "level": "basic",
    "options": [
      "4",
      "4.0",
      "16.0",
      "2.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.cbrt(8) * Math.sqrt(4)); // 4.0"
  },
  {
    "id": 24,
    "question": "Evaluate: double r = Math.cbrt(729); What is r?",
    "shortAnswer": "9.0",
    "explanation": "9 * 9 * 9 = 729. Therefore, Math.cbrt(729) returns 9.0.",
    "hint": "9 cubed is 729.",
    "level": "basic",
    "options": [
      "9",
      "9.0",
      "27.0",
      "81.0"
    ],
    "correctAnswer": 1,
    "codeExample": "double r = Math.cbrt(729); // 9.0"
  },
  {
    "id": 25,
    "question": "Which statement best describes why Math.cbrt(-8) returns -2.0 while Math.sqrt(-8) returns NaN?",
    "shortAnswer": "Odd roots of negative numbers are real, while even roots of negative numbers are imaginary.",
    "explanation": "In mathematics, (-2)^3 = -8, so -2 is a real cube root. But no real number multiplied by itself gives a negative result, so even roots of negative numbers yield NaN in Java.",
    "hint": "Recall the difference between odd and even powers of negative numbers.",
    "level": "intermediate",
    "options": [
      "Odd roots of negative numbers are real, while even roots are imaginary",
      "Math.sqrt is deprecated in modern Java",
      "Math.cbrt automatically casts negative arguments to positive",
      "Math.sqrt is only for integer values"
    ],
    "correctAnswer": 0,
    "codeExample": "// Mathematical fact:\n// (-2)^3 = -8 -> real root exists\n// x^2 = -8 -> no real root"
  }
];
export default questions;
