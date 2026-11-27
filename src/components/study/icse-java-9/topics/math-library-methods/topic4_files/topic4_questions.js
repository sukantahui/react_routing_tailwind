const questions = [
  {
    "id": 1,
    "question": "What is the return type of the method Math.floor(x) in Java?",
    "shortAnswer": "double",
    "explanation": "Math.floor(double a) always returns a primitive double.",
    "hint": "Recall return type of all rounding methods returning double.",
    "level": "basic",
    "options": [
      "int",
      "double",
      "float",
      "long"
    ],
    "correctAnswer": 1,
    "codeExample": "double res = Math.floor(5.8); // 5.0"
  },
  {
    "id": 2,
    "question": "What is the output of System.out.println(Math.floor(5.8));?",
    "shortAnswer": "5.0",
    "explanation": "Math.floor rounds down to the largest integer less than or equal to 5.8, which is 5.0 (double).",
    "hint": "Rounds down to lower integer with decimal point.",
    "level": "basic",
    "options": [
      "5",
      "5.0",
      "6",
      "6.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.floor(5.8)); // 5.0"
  },
  {
    "id": 3,
    "question": "What is the output of System.out.println(Math.floor(-5.2));?",
    "shortAnswer": "-6.0 (Trap: floor rounds down towards -Infinity)",
    "explanation": "Floor always moves towards negative infinity (to the left). The integer directly smaller than -5.2 is -6.0.",
    "hint": "Which integer is directly to the left of -5.2 on a number line?",
    "level": "intermediate",
    "options": [
      "-5.0",
      "-6.0",
      "-5",
      "-6"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.floor(-5.2)); // -6.0"
  },
  {
    "id": 4,
    "question": "What is the output of System.out.println(Math.floor(8.0));?",
    "shortAnswer": "8.0",
    "explanation": "An exact mathematical integer is returned unchanged as 8.0.",
    "hint": "Exact integer returns itself as double.",
    "level": "basic",
    "options": [
      "8",
      "8.0",
      "7.0",
      "9.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.floor(8.0)); // 8.0"
  },
  {
    "id": 5,
    "question": "What is the output of System.out.println(Math.floor(-8.8));?",
    "shortAnswer": "-9.0",
    "explanation": "The integer less than -8.8 is -9.0.",
    "hint": "Rounds to next lower integer.",
    "level": "basic",
    "options": [
      "-8.0",
      "-9.0",
      "-8",
      "-9"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.floor(-8.8)); // -9.0"
  },
  {
    "id": 6,
    "question": "Which of the following expressions ALWAYS holds true for any real number x?",
    "shortAnswer": "Math.floor(x) <= x",
    "explanation": "By mathematical definition, floor(x) returns the largest integer that is less than or equal to x.",
    "hint": "Floor means bottom/lower boundary.",
    "level": "basic",
    "options": [
      "Math.floor(x) > x",
      "Math.floor(x) <= x",
      "Math.floor(x) == x",
      "Math.floor(x) >= x"
    ],
    "correctAnswer": 1,
    "codeExample": "// Property: Math.floor(x) <= x"
  },
  {
    "id": 7,
    "question": "What is the output of System.out.println(Math.floor(0.99));?",
    "shortAnswer": "0.0",
    "explanation": "The largest integer less than or equal to 0.99 is 0.0.",
    "hint": "Rounds down to 0.",
    "level": "basic",
    "options": [
      "0",
      "0.0",
      "1.0",
      "1"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.floor(0.99)); // 0.0"
  },
  {
    "id": 8,
    "question": "What is the output of System.out.println(Math.floor(-0.01));?",
    "shortAnswer": "-1.0",
    "explanation": "The largest integer less than -0.01 is -1.0.",
    "hint": "Below 0 drops down to -1.",
    "level": "intermediate",
    "options": [
      "-0.0",
      "0.0",
      "-1.0",
      "-1"
    ],
    "correctAnswer": 2,
    "codeExample": "System.out.println(Math.floor(-0.01)); // -1.0"
  },
  {
    "id": 9,
    "question": "Evaluate: Math.floor(7.6) + Math.floor(-7.6). What is the output?",
    "shortAnswer": "-1.0",
    "explanation": "Math.floor(7.6) = 7.0. Math.floor(-7.6) = -8.0. 7.0 + (-8.0) = -1.0.",
    "hint": "7.0 + (-8.0) = -1.0.",
    "level": "intermediate",
    "options": [
      "0.0",
      "-1.0",
      "1.0",
      "14.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.floor(7.6) + Math.floor(-7.6)); // -1.0"
  },
  {
    "id": 10,
    "question": "What is the output of System.out.println(Math.floor(Math.ceil(-3.2)));?",
    "shortAnswer": "-3.0",
    "explanation": "Math.ceil(-3.2) = -3.0. Then Math.floor(-3.0) = -3.0.",
    "hint": "Ceil on -3.2 gives -3.0; floor on -3.0 gives -3.0.",
    "level": "intermediate",
    "options": [
      "-3.0",
      "-4.0",
      "-3",
      "-4"
    ],
    "correctAnswer": 0,
    "codeExample": "System.out.println(Math.floor(Math.ceil(-3.2))); // -3.0"
  },
  {
    "id": 11,
    "question": "What is the output of System.out.println((int) Math.floor(19.9));?",
    "shortAnswer": "19",
    "explanation": "Math.floor(19.9) = 19.0. (int) 19.0 truncates to 19.",
    "hint": "Explicit cast gives integer 19.",
    "level": "basic",
    "options": [
      "19",
      "19.0",
      "20",
      "20.0"
    ],
    "correctAnswer": 0,
    "codeExample": "System.out.println((int) Math.floor(19.9)); // 19"
  },
  {
    "id": 12,
    "question": "What is the output of System.out.println(Math.floor(-15.0));?",
    "shortAnswer": "-15.0",
    "explanation": "Exact integer returns itself as double -15.0.",
    "hint": "Exact integer unchanged.",
    "level": "basic",
    "options": [
      "-15.0",
      "-16.0",
      "-15",
      "-14.0"
    ],
    "correctAnswer": 0,
    "codeExample": "System.out.println(Math.floor(-15.0)); // -15.0"
  },
  {
    "id": 13,
    "question": "What will Math.floor(10.5) - Math.floor(-10.5) produce?",
    "shortAnswer": "21.0",
    "explanation": "Math.floor(10.5) = 10.0. Math.floor(-10.5) = -11.0. 10.0 - (-11.0) = 21.0.",
    "hint": "10.0 - (-11.0) = 21.0.",
    "level": "intermediate",
    "options": [
      "20.0",
      "21.0",
      "0.0",
      "-1.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.floor(10.5) - Math.floor(-10.5)); // 21.0"
  },
  {
    "id": 14,
    "question": "What is the output of System.out.println(Math.floor(0.0));?",
    "shortAnswer": "0.0",
    "explanation": "Floor of 0.0 is 0.0.",
    "hint": "Floor of zero.",
    "level": "basic",
    "options": [
      "0",
      "0.0",
      "-0.0",
      "null"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.floor(0.0)); // 0.0"
  },
  {
    "id": 15,
    "question": "Which of the following describes the difference between floor and ceil on positive fractional values?",
    "shortAnswer": "Math.ceil(x) - Math.floor(x) == 1.0 (for non-integer positive x)",
    "explanation": "For any non-integer x, ceil(x) is one unit greater than floor(x) (e.g., ceil(4.3) = 5.0, floor(4.3) = 4.0, difference is 1.0).",
    "hint": "Ceil is 1 higher than floor for fractions.",
    "level": "intermediate",
    "options": [
      "They return the same value",
      "Math.ceil(x) - Math.floor(x) == 1.0",
      "Math.floor(x) is greater than Math.ceil(x)",
      "Math.ceil returns an int while floor returns a double"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.ceil(4.3) - Math.floor(4.3)); // 1.0"
  },
  {
    "id": 16,
    "question": "What is the output of System.out.println(Math.floor(100.1));?",
    "shortAnswer": "100.0",
    "explanation": "100.1 rounds down to 100.0.",
    "hint": "Rounds down to 100.0.",
    "level": "basic",
    "options": [
      "100.0",
      "101.0",
      "100",
      "101"
    ],
    "correctAnswer": 0,
    "codeExample": "System.out.println(Math.floor(100.1)); // 100.0"
  },
  {
    "id": 17,
    "question": "What is the output of System.out.println(Math.floor(-100.1));?",
    "shortAnswer": "-101.0",
    "explanation": "-100.1 rounds down towards -Infinity to -101.0.",
    "hint": "More negative integer.",
    "level": "basic",
    "options": [
      "-100.0",
      "-101.0",
      "-100",
      "-101"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.floor(-100.1)); // -101.0"
  },
  {
    "id": 18,
    "question": "Evaluate the expression: Math.floor(18.7) in Java. What is the output?",
    "shortAnswer": "18.0",
    "explanation": "Math.floor(18.7) rounds down to 18.0 as a double value.",
    "hint": "Rounds down to 18.0.",
    "level": "basic",
    "options": [
      "18",
      "18.0",
      "19",
      "19.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.floor(18.7)); // 18.0"
  },
  {
    "id": 19,
    "question": "Evaluate the expression: Math.floor(19.7) in Java. What is the output?",
    "shortAnswer": "19.0",
    "explanation": "Math.floor(19.7) rounds down to 19.0 as a double value.",
    "hint": "Rounds down to 19.0.",
    "level": "basic",
    "options": [
      "19",
      "19.0",
      "20",
      "20.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.floor(19.7)); // 19.0"
  },
  {
    "id": 20,
    "question": "Evaluate the expression: Math.floor(20.7) in Java. What is the output?",
    "shortAnswer": "20.0",
    "explanation": "Math.floor(20.7) rounds down to 20.0 as a double value.",
    "hint": "Rounds down to 20.0.",
    "level": "basic",
    "options": [
      "20",
      "20.0",
      "21",
      "21.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.floor(20.7)); // 20.0"
  },
  {
    "id": 21,
    "question": "Evaluate the expression: Math.floor(21.7) in Java. What is the output?",
    "shortAnswer": "21.0",
    "explanation": "Math.floor(21.7) rounds down to 21.0 as a double value.",
    "hint": "Rounds down to 21.0.",
    "level": "basic",
    "options": [
      "21",
      "21.0",
      "22",
      "22.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.floor(21.7)); // 21.0"
  },
  {
    "id": 22,
    "question": "Evaluate the expression: Math.floor(22.7) in Java. What is the output?",
    "shortAnswer": "22.0",
    "explanation": "Math.floor(22.7) rounds down to 22.0 as a double value.",
    "hint": "Rounds down to 22.0.",
    "level": "basic",
    "options": [
      "22",
      "22.0",
      "23",
      "23.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.floor(22.7)); // 22.0"
  },
  {
    "id": 23,
    "question": "Evaluate the expression: Math.floor(23.7) in Java. What is the output?",
    "shortAnswer": "23.0",
    "explanation": "Math.floor(23.7) rounds down to 23.0 as a double value.",
    "hint": "Rounds down to 23.0.",
    "level": "basic",
    "options": [
      "23",
      "23.0",
      "24",
      "24.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.floor(23.7)); // 23.0"
  },
  {
    "id": 24,
    "question": "Evaluate the expression: Math.floor(24.7) in Java. What is the output?",
    "shortAnswer": "24.0",
    "explanation": "Math.floor(24.7) rounds down to 24.0 as a double value.",
    "hint": "Rounds down to 24.0.",
    "level": "basic",
    "options": [
      "24",
      "24.0",
      "25",
      "25.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.floor(24.7)); // 24.0"
  },
  {
    "id": 25,
    "question": "True or False: Both Math.ceil() and Math.floor() return double primitive type in Java.",
    "shortAnswer": "True (Both always return double)",
    "explanation": "Both Math.ceil(double a) and Math.floor(double a) are defined to return double values in java.lang.Math.",
    "hint": "Check return types in the API.",
    "level": "basic",
    "options": [
      "True, both return double",
      "False, ceil returns double but floor returns int",
      "False, both return int",
      "False, both return long"
    ],
    "correctAnswer": 0,
    "codeExample": "// Both return double:\ndouble c = Math.ceil(3.2);  // 4.0\ndouble f = Math.floor(3.2); // 3.0"
  }
];
export default questions;
