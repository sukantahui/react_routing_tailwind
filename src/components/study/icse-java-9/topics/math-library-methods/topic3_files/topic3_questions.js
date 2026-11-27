const questions = [
  {
    "id": 1,
    "question": "What is the return type of the method Math.ceil(x) in Java?",
    "shortAnswer": "double",
    "explanation": "Math.ceil(double a) always returns a primitive double value.",
    "hint": "Does ceil return a floating-point number or an integer?",
    "level": "basic",
    "options": [
      "int",
      "double",
      "float",
      "long"
    ],
    "correctAnswer": 1,
    "codeExample": "double res = Math.ceil(4.2); // 5.0"
  },
  {
    "id": 2,
    "question": "What is the output of System.out.println(Math.ceil(4.2));?",
    "shortAnswer": "5.0",
    "explanation": "Math.ceil rounds up to the next mathematical integer. 4.2 rounds up to 5.0 (double).",
    "hint": "Next integer greater than 4.2 with a decimal point.",
    "level": "basic",
    "options": [
      "4",
      "4.0",
      "5",
      "5.0"
    ],
    "correctAnswer": 3,
    "codeExample": "System.out.println(Math.ceil(4.2)); // 5.0"
  },
  {
    "id": 3,
    "question": "What is the output of System.out.println(Math.ceil(-4.8));?",
    "shortAnswer": "-4.0 (Trap: ceil rounds towards +Infinity)",
    "explanation": "Ceil rounds towards positive infinity. On the number line, -4.0 is greater than -4.8. Therefore, Math.ceil(-4.8) returns -4.0.",
    "hint": "On the number line, which integer is directly to the right of -4.8?",
    "level": "intermediate",
    "options": [
      "-5.0",
      "-4.0",
      "-5",
      "-4"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.ceil(-4.8)); // -4.0"
  },
  {
    "id": 4,
    "question": "What will Math.ceil(9.0) evaluate to?",
    "shortAnswer": "9.0",
    "explanation": "If the argument is already equal to a mathematical integer, Math.ceil returns the argument itself (as double 9.0).",
    "hint": "An integer with .0 does not need rounding.",
    "level": "basic",
    "options": [
      "9",
      "9.0",
      "10.0",
      "10"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.ceil(9.0)); // 9.0"
  },
  {
    "id": 5,
    "question": "What is the output of System.out.println(Math.ceil(-7.1));?",
    "shortAnswer": "-7.0",
    "explanation": "The smallest integer greater than or equal to -7.1 is -7.0.",
    "hint": "Which number is larger: -7 or -7.1?",
    "level": "intermediate",
    "options": [
      "-8.0",
      "-7.0",
      "-8",
      "-7"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.ceil(-7.1)); // -7.0"
  },
  {
    "id": 6,
    "question": "What is the output of System.out.println(Math.ceil(0.01));?",
    "shortAnswer": "1.0",
    "explanation": "Any positive fraction between 0 and 1 rounds up to 1.0.",
    "hint": "Any fraction greater than 0 rounds up to 1.",
    "level": "basic",
    "options": [
      "0.0",
      "1.0",
      "0",
      "1"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.ceil(0.01)); // 1.0"
  },
  {
    "id": 7,
    "question": "What is the output of System.out.println(Math.ceil(-0.9));?",
    "shortAnswer": "-0.0",
    "explanation": "Rounding up towards positive infinity from -0.9 reaches 0. In Java IEEE floating point, this preserves the negative sign as -0.0.",
    "hint": "Next integer greater than -0.9 is 0.",
    "level": "advanced",
    "options": [
      "-1.0",
      "-0.0",
      "0.0",
      "1.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.ceil(-0.9)); // -0.0"
  },
  {
    "id": 8,
    "question": "Evaluate: double d = Math.ceil(12.0001); What is d?",
    "shortAnswer": "13.0",
    "explanation": "Even the slightest fractional part causes Math.ceil to round up to the next integer 13.0.",
    "hint": "Any fraction beyond 12 pushes ceil to 13.",
    "level": "basic",
    "options": [
      "12.0",
      "13.0",
      "12",
      "13"
    ],
    "correctAnswer": 1,
    "codeExample": "double d = Math.ceil(12.0001); // 13.0"
  },
  {
    "id": 9,
    "question": "Which of the following describes the direction in which Math.ceil() moves on a number line?",
    "shortAnswer": "Always moves right (towards positive infinity)",
    "explanation": "Math.ceil moves in the positive direction (to the right on a standard horizontal number line).",
    "hint": "Does ceil make numbers larger or smaller?",
    "level": "basic",
    "options": [
      "Always moves left (towards negative infinity)",
      "Always moves right (towards positive infinity)",
      "Moves towards zero",
      "Moves away from zero"
    ],
    "correctAnswer": 1,
    "codeExample": "// Math.ceil: rounds UP towards +Infinity"
  },
  {
    "id": 10,
    "question": "What is the output of System.out.println(Math.ceil(15.999));?",
    "shortAnswer": "16.0",
    "explanation": "15.999 rounds up to 16.0.",
    "hint": "Next integer above 15.999.",
    "level": "basic",
    "options": [
      "15.0",
      "16.0",
      "15",
      "16"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.ceil(15.999)); // 16.0"
  },
  {
    "id": 11,
    "question": "What is the output of System.out.println((int) Math.ceil(6.1));?",
    "shortAnswer": "7",
    "explanation": "Math.ceil(6.1) = 7.0. Casting (int) 7.0 produces integer 7.",
    "hint": "Casting removes the decimal point.",
    "level": "basic",
    "options": [
      "6",
      "7",
      "7.0",
      "6.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println((int) Math.ceil(6.1)); // 7"
  },
  {
    "id": 12,
    "question": "Evaluate: Math.ceil(3.5) + Math.ceil(-3.5). What is the result?",
    "shortAnswer": "1.0",
    "explanation": "Math.ceil(3.5) = 4.0. Math.ceil(-3.5) = -3.0. 4.0 + (-3.0) = 1.0.",
    "hint": "4.0 + (-3.0) = 1.0.",
    "level": "intermediate",
    "options": [
      "0.0",
      "1.0",
      "-1.0",
      "7.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.ceil(3.5) + Math.ceil(-3.5)); // 1.0"
  },
  {
    "id": 13,
    "question": "What is the output of System.out.println(Math.ceil(-10.0));?",
    "shortAnswer": "-10.0",
    "explanation": "-10.0 is already an exact mathematical integer, so it returns -10.0 unchanged.",
    "hint": "Exact integers are unchanged.",
    "level": "basic",
    "options": [
      "-10.0",
      "-9.0",
      "-11.0",
      "-10"
    ],
    "correctAnswer": 0,
    "codeExample": "System.out.println(Math.ceil(-10.0)); // -10.0"
  },
  {
    "id": 14,
    "question": "What is the output of Math.ceil(25 / 4)?",
    "shortAnswer": "6.0 (Trap: 25 / 4 is integer division)",
    "explanation": "25 / 4 performs integer division resulting in 6. Then Math.ceil(6) is evaluated, which returns 6.0! To get 7.0, write 25.0 / 4.",
    "hint": "Integer division 25 / 4 evaluates first.",
    "level": "advanced",
    "options": [
      "7.0",
      "6.0",
      "6.25",
      "7"
    ],
    "correctAnswer": 1,
    "codeExample": "// ICSE Trap:\nMath.ceil(25 / 4);   // 6.0\nMath.ceil(25.0 / 4); // 7.0"
  },
  {
    "id": 15,
    "question": "What does Math.ceil(Double.NaN) return?",
    "shortAnswer": "NaN",
    "explanation": "If the argument is NaN, Math.ceil returns NaN.",
    "hint": "Any Math operation on NaN returns NaN.",
    "level": "basic",
    "options": [
      "0.0",
      "NaN",
      "null",
      "Error"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.ceil(Double.NaN)); // NaN"
  },
  {
    "id": 16,
    "question": "What is the output of System.out.println(Math.ceil(1.000));?",
    "shortAnswer": "1.0",
    "explanation": "1.000 is an exact integer, returning 1.0.",
    "hint": "Exact integer remains unchanged.",
    "level": "basic",
    "options": [
      "1",
      "1.0",
      "2.0",
      "0.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.ceil(1.000)); // 1.0"
  },
  {
    "id": 17,
    "question": "Evaluate: double r = Math.ceil(Math.sqrt(50)); What is r?",
    "shortAnswer": "8.0",
    "explanation": "Math.sqrt(50) is approximately 7.071. Math.ceil(7.071) rounds up to 8.0.",
    "hint": "Sqrt of 50 is between 7 and 8; ceil rounds up.",
    "level": "intermediate",
    "options": [
      "7.0",
      "8.0",
      "7",
      "8"
    ],
    "correctAnswer": 1,
    "codeExample": "double r = Math.ceil(Math.sqrt(50)); // 8.0"
  },
  {
    "id": 18,
    "question": "What is the output of System.out.println(Math.ceil(-0.1));?",
    "shortAnswer": "-0.0",
    "explanation": "Rounding up from -0.1 towards positive infinity reaches 0, producing -0.0.",
    "hint": "Negative zero.",
    "level": "intermediate",
    "options": [
      "-1.0",
      "-0.0",
      "0.0",
      "1.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.ceil(-0.1)); // -0.0"
  },
  {
    "id": 19,
    "question": "What is the output of System.out.println(Math.ceil(99.001));?",
    "shortAnswer": "100.0",
    "explanation": "99.001 rounds up to 100.0.",
    "hint": "Next integer above 99.001.",
    "level": "basic",
    "options": [
      "99.0",
      "100.0",
      "99",
      "100"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.ceil(99.001)); // 100.0"
  },
  {
    "id": 20,
    "question": "Which of the following methods ALWAYS returns a value greater than or equal to its argument?",
    "shortAnswer": "Math.ceil()",
    "explanation": "By definition, Math.ceil(x) >= x for all values of x.",
    "hint": "Ceiling is above or equal.",
    "level": "basic",
    "options": [
      "Math.floor()",
      "Math.ceil()",
      "Math.round()",
      "Math.abs()"
    ],
    "correctAnswer": 1,
    "codeExample": "// Property: Math.ceil(x) >= x"
  },
  {
    "id": 21,
    "question": "What is the output of System.out.println(Math.ceil(-20.5));?",
    "shortAnswer": "-20.0",
    "explanation": "-20.0 is greater than -20.5, so Math.ceil(-20.5) returns -20.0.",
    "hint": "Ceil moves right towards larger number -20.0.",
    "level": "basic",
    "options": [
      "-21.0",
      "-20.0",
      "-21",
      "-20"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.ceil(-20.5)); // -20.0"
  },
  {
    "id": 22,
    "question": "What is the output of System.out.println(Math.ceil(5.5) - Math.ceil(4.5));?",
    "shortAnswer": "1.0",
    "explanation": "Math.ceil(5.5) = 6.0. Math.ceil(4.5) = 5.0. 6.0 - 5.0 = 1.0.",
    "hint": "6.0 minus 5.0.",
    "level": "basic",
    "options": [
      "1.0",
      "0.0",
      "1",
      "2.0"
    ],
    "correctAnswer": 0,
    "codeExample": "System.out.println(Math.ceil(5.5) - Math.ceil(4.5)); // 1.0"
  },
  {
    "id": 23,
    "question": "What is the result of Math.ceil(Double.POSITIVE_INFINITY)?",
    "shortAnswer": "Infinity",
    "explanation": "If the argument is positive infinity, Math.ceil returns positive infinity.",
    "hint": "Ceiling of infinity is infinity.",
    "level": "advanced",
    "options": [
      "Infinity",
      "NaN",
      "Double.MAX_VALUE",
      "0.0"
    ],
    "correctAnswer": 0,
    "codeExample": "System.out.println(Math.ceil(Double.POSITIVE_INFINITY)); // Infinity"
  },
  {
    "id": 24,
    "question": "Evaluate: double res = Math.ceil(Math.pow(2.1, 2)); What is res?",
    "shortAnswer": "5.0",
    "explanation": "2.1^2 = 4.41. Math.ceil(4.41) rounds up to 5.0.",
    "hint": "Calculate 2.1 squared, then take ceil.",
    "level": "intermediate",
    "options": [
      "4.0",
      "5.0",
      "4",
      "5"
    ],
    "correctAnswer": 1,
    "codeExample": "double res = Math.ceil(Math.pow(2.1, 2)); // 5.0"
  },
  {
    "id": 25,
    "question": "True or False: Math.ceil(-0.0) returns -0.0.",
    "shortAnswer": "True (sign of negative zero is preserved)",
    "explanation": "In Java floating-point arithmetic, -0.0 is an integer value, and Math.ceil(-0.0) yields -0.0.",
    "hint": "Negative zero is preserved.",
    "level": "advanced",
    "options": [
      "True, sign of negative zero is preserved",
      "False, it always returns 0.0 without sign",
      "False, negative zero causes compile error",
      "True, but only in 64-bit systems"
    ],
    "correctAnswer": 0,
    "codeExample": "System.out.println(Math.ceil(-0.0)); // -0.0"
  }
];
export default questions;
