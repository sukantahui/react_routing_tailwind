const questions = [
  {
    "id": 1,
    "question": "What is the return type of Math.abs(int a) in Java?",
    "shortAnswer": "int",
    "explanation": "Math.abs is overloaded. When an int argument is provided, it returns an int. Return type matches the argument type.",
    "hint": "Does passing an int return an int or double?",
    "level": "basic",
    "options": [
      "int",
      "double",
      "long",
      "void"
    ],
    "correctAnswer": 0,
    "codeExample": "int a = Math.abs(-10); // 10"
  },
  {
    "id": 2,
    "question": "What is the output of System.out.println(Math.abs(-25));?",
    "shortAnswer": "25",
    "explanation": "Math.abs(-25) returns integer 25 without any decimal point.",
    "hint": "Notice the argument is integer -25.",
    "level": "basic",
    "options": [
      "25",
      "25.0",
      "-25",
      "Error"
    ],
    "correctAnswer": 0,
    "codeExample": "System.out.println(Math.abs(-25)); // 25"
  },
  {
    "id": 3,
    "question": "What is the output of System.out.println(Math.abs(-25.0));?",
    "shortAnswer": "25.0",
    "explanation": "Because the argument is double -25.0, the overloaded Math.abs(double) method executes, returning double 25.0.",
    "hint": "Notice the argument has .0.",
    "level": "basic",
    "options": [
      "25",
      "25.0",
      "-25.0",
      "Error"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.abs(-25.0)); // 25.0"
  },
  {
    "id": 4,
    "question": "How many overloaded versions of Math.abs() exist in java.lang.Math?",
    "shortAnswer": "4 (for int, long, float, double)",
    "explanation": "Java defines four overloaded variants of Math.abs for int, long, float, and double.",
    "hint": "Count primitive numeric types supported.",
    "level": "basic",
    "options": [
      "1",
      "2",
      "4",
      "8"
    ],
    "correctAnswer": 2,
    "codeExample": "// Overloaded for: int, long, float, double"
  },
  {
    "id": 5,
    "question": "What is the output of System.out.println(Math.abs(0));?",
    "shortAnswer": "0",
    "explanation": "The absolute value of 0 is 0 (as an int).",
    "hint": "Absolute value of zero.",
    "level": "basic",
    "options": [
      "0",
      "0.0",
      "null",
      "1"
    ],
    "correctAnswer": 0,
    "codeExample": "System.out.println(Math.abs(0)); // 0"
  },
  {
    "id": 6,
    "question": "What is the output of System.out.println(Math.abs(-0.0));?",
    "shortAnswer": "0.0",
    "explanation": "Math.abs on floating-point negative zero strips the sign and returns positive 0.0.",
    "hint": "Removes negative sign from -0.0.",
    "level": "intermediate",
    "options": [
      "-0.0",
      "0.0",
      "0",
      "NaN"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.abs(-0.0)); // 0.0"
  },
  {
    "id": 7,
    "question": "Evaluate: int d = Math.abs(15 - 40); What is the value of d?",
    "shortAnswer": "25",
    "explanation": "15 - 40 = -25. Math.abs(-25) = 25.",
    "hint": "Subtract inside first: 15 - 40 = -25.",
    "level": "basic",
    "options": [
      "25",
      "-25",
      "25.0",
      "-25.0"
    ],
    "correctAnswer": 0,
    "codeExample": "int d = Math.abs(15 - 40); // 25"
  },
  {
    "id": 8,
    "question": "What will Math.abs(Integer.MIN_VALUE) return in Java?",
    "shortAnswer": "-2147483648 (Integer overflow trap)",
    "explanation": "In 32-bit signed integers, Integer.MIN_VALUE is -2147483648, but Integer.MAX_VALUE is only 2147483647. The positive value cannot fit in 32 bits, so it wraps around to -2147483648.",
    "hint": "Two's complement asymmetry overflow.",
    "level": "advanced",
    "options": [
      "2147483648",
      "-2147483648",
      "ArithmeticException",
      "0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.abs(Integer.MIN_VALUE)); // -2147483648"
  },
  {
    "id": 9,
    "question": "What is the output of System.out.println(Math.abs(-9.99f));?",
    "shortAnswer": "9.99",
    "explanation": "Float argument returns float 9.99.",
    "hint": "Returns positive float value.",
    "level": "basic",
    "options": [
      "9.99",
      "10",
      "9.99f",
      "10.0"
    ],
    "correctAnswer": 0,
    "codeExample": "System.out.println(Math.abs(-9.99f)); // 9.99"
  },
  {
    "id": 10,
    "question": "Evaluate: double val = Math.abs(-4.5) * 2; What is val?",
    "shortAnswer": "9.0",
    "explanation": "Math.abs(-4.5) = 4.5. 4.5 * 2 = 9.0.",
    "hint": "4.5 times 2 as double.",
    "level": "basic",
    "options": [
      "9",
      "9.0",
      "-9.0",
      "8.0"
    ],
    "correctAnswer": 1,
    "codeExample": "double val = Math.abs(-4.5) * 2; // 9.0"
  },
  {
    "id": 11,
    "question": "What is the output of System.out.println(Math.abs(-11));?",
    "shortAnswer": "11",
    "explanation": "Math.abs(-11) strips the negative sign and returns integer 11.",
    "hint": "Positive magnitude of -11.",
    "level": "basic",
    "options": [
      "11",
      "-11",
      "11.0",
      "-11.0"
    ],
    "correctAnswer": 0,
    "codeExample": "System.out.println(Math.abs(-11)); // 11"
  },
  {
    "id": 12,
    "question": "What is the output of System.out.println(Math.abs(-12));?",
    "shortAnswer": "12",
    "explanation": "Math.abs(-12) strips the negative sign and returns integer 12.",
    "hint": "Positive magnitude of -12.",
    "level": "basic",
    "options": [
      "12",
      "-12",
      "12.0",
      "-12.0"
    ],
    "correctAnswer": 0,
    "codeExample": "System.out.println(Math.abs(-12)); // 12"
  },
  {
    "id": 13,
    "question": "What is the output of System.out.println(Math.abs(-13));?",
    "shortAnswer": "13",
    "explanation": "Math.abs(-13) strips the negative sign and returns integer 13.",
    "hint": "Positive magnitude of -13.",
    "level": "basic",
    "options": [
      "13",
      "-13",
      "13.0",
      "-13.0"
    ],
    "correctAnswer": 0,
    "codeExample": "System.out.println(Math.abs(-13)); // 13"
  },
  {
    "id": 14,
    "question": "What is the output of System.out.println(Math.abs(-14));?",
    "shortAnswer": "14",
    "explanation": "Math.abs(-14) strips the negative sign and returns integer 14.",
    "hint": "Positive magnitude of -14.",
    "level": "basic",
    "options": [
      "14",
      "-14",
      "14.0",
      "-14.0"
    ],
    "correctAnswer": 0,
    "codeExample": "System.out.println(Math.abs(-14)); // 14"
  },
  {
    "id": 15,
    "question": "What is the output of System.out.println(Math.abs(-15));?",
    "shortAnswer": "15",
    "explanation": "Math.abs(-15) strips the negative sign and returns integer 15.",
    "hint": "Positive magnitude of -15.",
    "level": "basic",
    "options": [
      "15",
      "-15",
      "15.0",
      "-15.0"
    ],
    "correctAnswer": 0,
    "codeExample": "System.out.println(Math.abs(-15)); // 15"
  },
  {
    "id": 16,
    "question": "What is the output of System.out.println(Math.abs(-16));?",
    "shortAnswer": "16",
    "explanation": "Math.abs(-16) strips the negative sign and returns integer 16.",
    "hint": "Positive magnitude of -16.",
    "level": "basic",
    "options": [
      "16",
      "-16",
      "16.0",
      "-16.0"
    ],
    "correctAnswer": 0,
    "codeExample": "System.out.println(Math.abs(-16)); // 16"
  },
  {
    "id": 17,
    "question": "What is the output of System.out.println(Math.abs(-17));?",
    "shortAnswer": "17",
    "explanation": "Math.abs(-17) strips the negative sign and returns integer 17.",
    "hint": "Positive magnitude of -17.",
    "level": "basic",
    "options": [
      "17",
      "-17",
      "17.0",
      "-17.0"
    ],
    "correctAnswer": 0,
    "codeExample": "System.out.println(Math.abs(-17)); // 17"
  },
  {
    "id": 18,
    "question": "What is the output of System.out.println(Math.abs(-18));?",
    "shortAnswer": "18",
    "explanation": "Math.abs(-18) strips the negative sign and returns integer 18.",
    "hint": "Positive magnitude of -18.",
    "level": "basic",
    "options": [
      "18",
      "-18",
      "18.0",
      "-18.0"
    ],
    "correctAnswer": 0,
    "codeExample": "System.out.println(Math.abs(-18)); // 18"
  },
  {
    "id": 19,
    "question": "What is the output of System.out.println(Math.abs(-19));?",
    "shortAnswer": "19",
    "explanation": "Math.abs(-19) strips the negative sign and returns integer 19.",
    "hint": "Positive magnitude of -19.",
    "level": "basic",
    "options": [
      "19",
      "-19",
      "19.0",
      "-19.0"
    ],
    "correctAnswer": 0,
    "codeExample": "System.out.println(Math.abs(-19)); // 19"
  },
  {
    "id": 20,
    "question": "What is the output of System.out.println(Math.abs(-20));?",
    "shortAnswer": "20",
    "explanation": "Math.abs(-20) strips the negative sign and returns integer 20.",
    "hint": "Positive magnitude of -20.",
    "level": "basic",
    "options": [
      "20",
      "-20",
      "20.0",
      "-20.0"
    ],
    "correctAnswer": 0,
    "codeExample": "System.out.println(Math.abs(-20)); // 20"
  },
  {
    "id": 21,
    "question": "What is the output of System.out.println(Math.abs(-21));?",
    "shortAnswer": "21",
    "explanation": "Math.abs(-21) strips the negative sign and returns integer 21.",
    "hint": "Positive magnitude of -21.",
    "level": "basic",
    "options": [
      "21",
      "-21",
      "21.0",
      "-21.0"
    ],
    "correctAnswer": 0,
    "codeExample": "System.out.println(Math.abs(-21)); // 21"
  },
  {
    "id": 22,
    "question": "What is the output of System.out.println(Math.abs(-22));?",
    "shortAnswer": "22",
    "explanation": "Math.abs(-22) strips the negative sign and returns integer 22.",
    "hint": "Positive magnitude of -22.",
    "level": "basic",
    "options": [
      "22",
      "-22",
      "22.0",
      "-22.0"
    ],
    "correctAnswer": 0,
    "codeExample": "System.out.println(Math.abs(-22)); // 22"
  },
  {
    "id": 23,
    "question": "What is the output of System.out.println(Math.abs(-23));?",
    "shortAnswer": "23",
    "explanation": "Math.abs(-23) strips the negative sign and returns integer 23.",
    "hint": "Positive magnitude of -23.",
    "level": "basic",
    "options": [
      "23",
      "-23",
      "23.0",
      "-23.0"
    ],
    "correctAnswer": 0,
    "codeExample": "System.out.println(Math.abs(-23)); // 23"
  },
  {
    "id": 24,
    "question": "What is the output of System.out.println(Math.abs(-24));?",
    "shortAnswer": "24",
    "explanation": "Math.abs(-24) strips the negative sign and returns integer 24.",
    "hint": "Positive magnitude of -24.",
    "level": "basic",
    "options": [
      "24",
      "-24",
      "24.0",
      "-24.0"
    ],
    "correctAnswer": 0,
    "codeExample": "System.out.println(Math.abs(-24)); // 24"
  },
  {
    "id": 25,
    "question": "True or False: Math.abs(x) is guaranteed to always return a positive number or zero for all inputs except Integer.MIN_VALUE and Long.MIN_VALUE.",
    "shortAnswer": "True (Only MIN_VALUE overflows in two's complement arithmetic)",
    "explanation": "Due to two's complement representation, only MIN_VALUE has no positive counterpart and overflows.",
    "hint": "Standard mathematical absolute value property holds for all other numbers.",
    "level": "intermediate",
    "options": [
      "True, only MIN_VALUE overflows",
      "False, negative floats also overflow",
      "False, negative double can return negative",
      "True for all numbers without any exceptions"
    ],
    "correctAnswer": 0,
    "codeExample": "// True: only Integer.MIN_VALUE and Long.MIN_VALUE overflow"
  }
];
export default questions;
