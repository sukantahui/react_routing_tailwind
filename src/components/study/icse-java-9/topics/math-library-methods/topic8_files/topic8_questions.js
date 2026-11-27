const questions = [
  {
    "id": 1,
    "question": "What is the return type of Math.min(10, 25) in Java?",
    "shortAnswer": "int",
    "explanation": "Because both arguments are integer literals, Math.min(int, int) executes, returning an int (10).",
    "hint": "Both parameters are integers.",
    "level": "basic",
    "options": [
      "int",
      "double",
      "long",
      "boolean"
    ],
    "correctAnswer": 0,
    "codeExample": "int m = Math.min(10, 25); // 10"
  },
  {
    "id": 2,
    "question": "What is the output of System.out.println(Math.min(-15, -28));?",
    "shortAnswer": "-28",
    "explanation": "On the number line, -28 is smaller than -15 (further left). Output is -28.",
    "hint": "Which negative number is smaller?",
    "level": "basic",
    "options": [
      "-15",
      "-28",
      "15",
      "28"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.min(-15, -28)); // -28"
  },
  {
    "id": 3,
    "question": "What is the output of System.out.println(Math.min(5, 7.5));?",
    "shortAnswer": "5.0 (Mixed types promote to double)",
    "explanation": "Because 7.5 is double, integer 5 is promoted to double 5.0. 5.0 < 7.5, so it returns double 5.0.",
    "hint": "Mixed int and double widens to double.",
    "level": "intermediate",
    "options": [
      "5",
      "5.0",
      "7.5",
      "Error"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.min(5, 7.5)); // 5.0"
  },
  {
    "id": 4,
    "question": "How do you find the minimum of three numbers x, y, and z using Math.min()?",
    "shortAnswer": "Math.min(x, Math.min(y, z))",
    "explanation": "Math.min only accepts two parameters. To find minimum among three, nest them: Math.min(x, Math.min(y, z)).",
    "hint": "Nest the method calls.",
    "level": "basic",
    "options": [
      "Math.min(x, y, z)",
      "Math.min(x, Math.min(y, z))",
      "min(x, y, z)",
      "Math.minimum(x, y, z)"
    ],
    "correctAnswer": 1,
    "codeExample": "int smallest = Math.min(x, Math.min(y, z));"
  },
  {
    "id": 5,
    "question": "Evaluate: int ans = Math.min(Math.min(12, 4), Math.min(9, 15)); What is ans?",
    "shortAnswer": "4",
    "explanation": "Math.min(12, 4) = 4. Math.min(9, 15) = 9. Math.min(4, 9) = 4.",
    "hint": "Min of left pair (4) and right pair (9), then min of both.",
    "level": "basic",
    "options": [
      "12",
      "4",
      "9",
      "15"
    ],
    "correctAnswer": 1,
    "codeExample": "int ans = Math.min(Math.min(12, 4), Math.min(9, 15)); // 4"
  },
  {
    "id": 6,
    "question": "What is the output of System.out.println(Math.min(24, 12));?",
    "shortAnswer": "12",
    "explanation": "12 is smaller than 24, so Math.min returns integer 12.",
    "hint": "Smaller of 24 and 12.",
    "level": "basic",
    "options": [
      "24",
      "12",
      "12.0",
      "24.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.min(24, 12)); // 12"
  },
  {
    "id": 7,
    "question": "What is the output of System.out.println(Math.min(28, 14));?",
    "shortAnswer": "14",
    "explanation": "14 is smaller than 28, so Math.min returns integer 14.",
    "hint": "Smaller of 28 and 14.",
    "level": "basic",
    "options": [
      "28",
      "14",
      "14.0",
      "28.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.min(28, 14)); // 14"
  },
  {
    "id": 8,
    "question": "What is the output of System.out.println(Math.min(32, 16));?",
    "shortAnswer": "16",
    "explanation": "16 is smaller than 32, so Math.min returns integer 16.",
    "hint": "Smaller of 32 and 16.",
    "level": "basic",
    "options": [
      "32",
      "16",
      "16.0",
      "32.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.min(32, 16)); // 16"
  },
  {
    "id": 9,
    "question": "What is the output of System.out.println(Math.min(36, 18));?",
    "shortAnswer": "18",
    "explanation": "18 is smaller than 36, so Math.min returns integer 18.",
    "hint": "Smaller of 36 and 18.",
    "level": "basic",
    "options": [
      "36",
      "18",
      "18.0",
      "36.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.min(36, 18)); // 18"
  },
  {
    "id": 10,
    "question": "What is the output of System.out.println(Math.min(40, 20));?",
    "shortAnswer": "20",
    "explanation": "20 is smaller than 40, so Math.min returns integer 20.",
    "hint": "Smaller of 40 and 20.",
    "level": "basic",
    "options": [
      "40",
      "20",
      "20.0",
      "40.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.min(40, 20)); // 20"
  },
  {
    "id": 11,
    "question": "What is the output of System.out.println(Math.min(44, 22));?",
    "shortAnswer": "22",
    "explanation": "22 is smaller than 44, so Math.min returns integer 22.",
    "hint": "Smaller of 44 and 22.",
    "level": "basic",
    "options": [
      "44",
      "22",
      "22.0",
      "44.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.min(44, 22)); // 22"
  },
  {
    "id": 12,
    "question": "What is the output of System.out.println(Math.min(48, 24));?",
    "shortAnswer": "24",
    "explanation": "24 is smaller than 48, so Math.min returns integer 24.",
    "hint": "Smaller of 48 and 24.",
    "level": "basic",
    "options": [
      "48",
      "24",
      "24.0",
      "48.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.min(48, 24)); // 24"
  },
  {
    "id": 13,
    "question": "What is the output of System.out.println(Math.min(52, 26));?",
    "shortAnswer": "26",
    "explanation": "26 is smaller than 52, so Math.min returns integer 26.",
    "hint": "Smaller of 52 and 26.",
    "level": "basic",
    "options": [
      "52",
      "26",
      "26.0",
      "52.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.min(52, 26)); // 26"
  },
  {
    "id": 14,
    "question": "What is the output of System.out.println(Math.min(56, 28));?",
    "shortAnswer": "28",
    "explanation": "28 is smaller than 56, so Math.min returns integer 28.",
    "hint": "Smaller of 56 and 28.",
    "level": "basic",
    "options": [
      "56",
      "28",
      "28.0",
      "56.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.min(56, 28)); // 28"
  },
  {
    "id": 15,
    "question": "What is the output of System.out.println(Math.min(60, 30));?",
    "shortAnswer": "30",
    "explanation": "30 is smaller than 60, so Math.min returns integer 30.",
    "hint": "Smaller of 60 and 30.",
    "level": "basic",
    "options": [
      "60",
      "30",
      "30.0",
      "60.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.min(60, 30)); // 30"
  },
  {
    "id": 16,
    "question": "What is the output of System.out.println(Math.min(64, 32));?",
    "shortAnswer": "32",
    "explanation": "32 is smaller than 64, so Math.min returns integer 32.",
    "hint": "Smaller of 64 and 32.",
    "level": "basic",
    "options": [
      "64",
      "32",
      "32.0",
      "64.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.min(64, 32)); // 32"
  },
  {
    "id": 17,
    "question": "What is the output of System.out.println(Math.min(68, 34));?",
    "shortAnswer": "34",
    "explanation": "34 is smaller than 68, so Math.min returns integer 34.",
    "hint": "Smaller of 68 and 34.",
    "level": "basic",
    "options": [
      "68",
      "34",
      "34.0",
      "68.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.min(68, 34)); // 34"
  },
  {
    "id": 18,
    "question": "What is the output of System.out.println(Math.min(72, 36));?",
    "shortAnswer": "36",
    "explanation": "36 is smaller than 72, so Math.min returns integer 36.",
    "hint": "Smaller of 72 and 36.",
    "level": "basic",
    "options": [
      "72",
      "36",
      "36.0",
      "72.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.min(72, 36)); // 36"
  },
  {
    "id": 19,
    "question": "What is the output of System.out.println(Math.min(76, 38));?",
    "shortAnswer": "38",
    "explanation": "38 is smaller than 76, so Math.min returns integer 38.",
    "hint": "Smaller of 76 and 38.",
    "level": "basic",
    "options": [
      "76",
      "38",
      "38.0",
      "76.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.min(76, 38)); // 38"
  },
  {
    "id": 20,
    "question": "What is the output of System.out.println(Math.min(80, 40));?",
    "shortAnswer": "40",
    "explanation": "40 is smaller than 80, so Math.min returns integer 40.",
    "hint": "Smaller of 80 and 40.",
    "level": "basic",
    "options": [
      "80",
      "40",
      "40.0",
      "80.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.min(80, 40)); // 40"
  },
  {
    "id": 21,
    "question": "What is the output of System.out.println(Math.min(84, 42));?",
    "shortAnswer": "42",
    "explanation": "42 is smaller than 84, so Math.min returns integer 42.",
    "hint": "Smaller of 84 and 42.",
    "level": "basic",
    "options": [
      "84",
      "42",
      "42.0",
      "84.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.min(84, 42)); // 42"
  },
  {
    "id": 22,
    "question": "What is the output of System.out.println(Math.min(88, 44));?",
    "shortAnswer": "44",
    "explanation": "44 is smaller than 88, so Math.min returns integer 44.",
    "hint": "Smaller of 88 and 44.",
    "level": "basic",
    "options": [
      "88",
      "44",
      "44.0",
      "88.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.min(88, 44)); // 44"
  },
  {
    "id": 23,
    "question": "What is the output of System.out.println(Math.min(92, 46));?",
    "shortAnswer": "46",
    "explanation": "46 is smaller than 92, so Math.min returns integer 46.",
    "hint": "Smaller of 92 and 46.",
    "level": "basic",
    "options": [
      "92",
      "46",
      "46.0",
      "92.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.min(92, 46)); // 46"
  },
  {
    "id": 24,
    "question": "What is the output of System.out.println(Math.min(96, 48));?",
    "shortAnswer": "48",
    "explanation": "48 is smaller than 96, so Math.min returns integer 48.",
    "hint": "Smaller of 96 and 48.",
    "level": "basic",
    "options": [
      "96",
      "48",
      "48.0",
      "96.0"
    ],
    "correctAnswer": 1,
    "codeExample": "System.out.println(Math.min(96, 48)); // 48"
  },
  {
    "id": 25,
    "question": "What is the output of System.out.println(Math.min(-0.0, 0.0));?",
    "shortAnswer": "-0.0 (negative zero is strictly considered smaller than positive zero)",
    "explanation": "Java specification dictates that -0.0 is strictly smaller than 0.0, so Math.min(-0.0, 0.0) returns -0.0.",
    "hint": "Negative zero is smaller than positive zero.",
    "level": "advanced",
    "options": [
      "-0.0",
      "0.0",
      "0",
      "NaN"
    ],
    "correctAnswer": 0,
    "codeExample": "System.out.println(Math.min(-0.0, 0.0)); // -0.0"
  }
];
export default questions;
