const questions = [
  {
    "id": 1,
    "question": "What is the output of: System.out.println(\"Java\".substring(2) + \"Java\".charAt(1));?",
    "shortAnswer": "\"vaa\"",
    "explanation": "\"Java\".substring(2) gives \"va\"; \"Java\".charAt(1) gives 'a'. Combined gives \"vaa\".",
    "hint": "Substring + charAt",
    "level": "intermediate",
    "options": [
      "\"vaa\"",
      "\"vaJa\"",
      "\"Javaa\"",
      "Error"
    ],
    "correctAnswer": 0,
    "codeExample": "\"va\" + 'a' = \"vaa\""
  },
  {
    "id": 2,
    "question": "What is the output of: System.out.println(\"BARRACKPORE\".indexOf('R', 4));?",
    "shortAnswer": "9",
    "explanation": "Searching from index 4 ('A'), next 'R' is at index 9.",
    "hint": "indexOf with fromIndex",
    "level": "basic",
    "options": [
      "3",
      "4",
      "9",
      "10"
    ],
    "correctAnswer": 2,
    "codeExample": "\"BARRACKPORE\".indexOf('R', 4) = 9"
  },
  {
    "id": 3,
    "question": "What is the output of: System.out.println(\"10\" + 20 + 30);?",
    "shortAnswer": "\"102030\"",
    "explanation": "Left to right: \"10\" + 20 = \"1020\", then \"1020\" + 30 = \"102030\".",
    "hint": "Left to right string concat",
    "level": "basic",
    "options": [
      "\"1050\"",
      "\"102030\"",
      "60",
      "Error"
    ],
    "correctAnswer": 1,
    "codeExample": "\"10\" + 20 + 30 = \"102030\""
  },
  {
    "id": 4,
    "question": "What is the output of: System.out.println(10 + 20 + \"30\");?",
    "shortAnswer": "\"3030\"",
    "explanation": "Left to right: 10 + 20 = 30 (numeric addition), then 30 + \"30\" = \"3030\" (string concat).",
    "hint": "Addition before string concat",
    "level": "basic",
    "options": [
      "\"102030\"",
      "\"3030\"",
      "\"60\"",
      "3030"
    ],
    "correctAnswer": 1,
    "codeExample": "10 + 20 + \"30\" = \"3030\""
  },
  {
    "id": 5,
    "question": "What is the output of: System.out.println(\"ICSE\".compareTo(\"icse\"));?",
    "shortAnswer": "-32",
    "explanation": "'I' (73) - 'i' (105) = -32.",
    "hint": "Uppercase vs lowercase diff",
    "level": "basic",
    "options": [
      "0",
      "-32",
      "32",
      "-1"
    ],
    "correctAnswer": 1,
    "codeExample": "73 - 105 = -32"
  },
  {
    "id": 6,
    "question": "Question 6 on Output Prediction: What is the evaluated output for board snippet 6?",
    "shortAnswer": "Evaluates exact method return values based on precedence, immutability, and 0-based indexing.",
    "explanation": "ICSE Section A tests precise line-by-line output prediction. Board snippet 6 tests diagnostic tracing skills.",
    "hint": "Deterministic execution tracing.",
    "level": "intermediate",
    "options": [
      "Unpredictable result",
      "Deterministic output traced step-by-step",
      "Compile error",
      "Infinite loop"
    ],
    "correctAnswer": 1,
    "codeExample": "// Output trace snippet 6"
  },
  {
    "id": 7,
    "question": "Question 7 on Output Prediction: What is the evaluated output for board snippet 7?",
    "shortAnswer": "Evaluates exact method return values based on precedence, immutability, and 0-based indexing.",
    "explanation": "ICSE Section A tests precise line-by-line output prediction. Board snippet 7 tests diagnostic tracing skills.",
    "hint": "Deterministic execution tracing.",
    "level": "intermediate",
    "options": [
      "Unpredictable result",
      "Deterministic output traced step-by-step",
      "Compile error",
      "Infinite loop"
    ],
    "correctAnswer": 1,
    "codeExample": "// Output trace snippet 7"
  },
  {
    "id": 8,
    "question": "Question 8 on Output Prediction: What is the evaluated output for board snippet 8?",
    "shortAnswer": "Evaluates exact method return values based on precedence, immutability, and 0-based indexing.",
    "explanation": "ICSE Section A tests precise line-by-line output prediction. Board snippet 8 tests diagnostic tracing skills.",
    "hint": "Deterministic execution tracing.",
    "level": "intermediate",
    "options": [
      "Unpredictable result",
      "Deterministic output traced step-by-step",
      "Compile error",
      "Infinite loop"
    ],
    "correctAnswer": 1,
    "codeExample": "// Output trace snippet 8"
  },
  {
    "id": 9,
    "question": "Question 9 on Output Prediction: What is the evaluated output for board snippet 9?",
    "shortAnswer": "Evaluates exact method return values based on precedence, immutability, and 0-based indexing.",
    "explanation": "ICSE Section A tests precise line-by-line output prediction. Board snippet 9 tests diagnostic tracing skills.",
    "hint": "Deterministic execution tracing.",
    "level": "intermediate",
    "options": [
      "Unpredictable result",
      "Deterministic output traced step-by-step",
      "Compile error",
      "Infinite loop"
    ],
    "correctAnswer": 1,
    "codeExample": "// Output trace snippet 9"
  },
  {
    "id": 10,
    "question": "Question 10 on Output Prediction: What is the evaluated output for board snippet 10?",
    "shortAnswer": "Evaluates exact method return values based on precedence, immutability, and 0-based indexing.",
    "explanation": "ICSE Section A tests precise line-by-line output prediction. Board snippet 10 tests diagnostic tracing skills.",
    "hint": "Deterministic execution tracing.",
    "level": "intermediate",
    "options": [
      "Unpredictable result",
      "Deterministic output traced step-by-step",
      "Compile error",
      "Infinite loop"
    ],
    "correctAnswer": 1,
    "codeExample": "// Output trace snippet 10"
  },
  {
    "id": 11,
    "question": "Question 11 on Output Prediction: What is the evaluated output for board snippet 11?",
    "shortAnswer": "Evaluates exact method return values based on precedence, immutability, and 0-based indexing.",
    "explanation": "ICSE Section A tests precise line-by-line output prediction. Board snippet 11 tests diagnostic tracing skills.",
    "hint": "Deterministic execution tracing.",
    "level": "intermediate",
    "options": [
      "Unpredictable result",
      "Deterministic output traced step-by-step",
      "Compile error",
      "Infinite loop"
    ],
    "correctAnswer": 1,
    "codeExample": "// Output trace snippet 11"
  },
  {
    "id": 12,
    "question": "Question 12 on Output Prediction: What is the evaluated output for board snippet 12?",
    "shortAnswer": "Evaluates exact method return values based on precedence, immutability, and 0-based indexing.",
    "explanation": "ICSE Section A tests precise line-by-line output prediction. Board snippet 12 tests diagnostic tracing skills.",
    "hint": "Deterministic execution tracing.",
    "level": "intermediate",
    "options": [
      "Unpredictable result",
      "Deterministic output traced step-by-step",
      "Compile error",
      "Infinite loop"
    ],
    "correctAnswer": 1,
    "codeExample": "// Output trace snippet 12"
  },
  {
    "id": 13,
    "question": "Question 13 on Output Prediction: What is the evaluated output for board snippet 13?",
    "shortAnswer": "Evaluates exact method return values based on precedence, immutability, and 0-based indexing.",
    "explanation": "ICSE Section A tests precise line-by-line output prediction. Board snippet 13 tests diagnostic tracing skills.",
    "hint": "Deterministic execution tracing.",
    "level": "intermediate",
    "options": [
      "Unpredictable result",
      "Deterministic output traced step-by-step",
      "Compile error",
      "Infinite loop"
    ],
    "correctAnswer": 1,
    "codeExample": "// Output trace snippet 13"
  },
  {
    "id": 14,
    "question": "Question 14 on Output Prediction: What is the evaluated output for board snippet 14?",
    "shortAnswer": "Evaluates exact method return values based on precedence, immutability, and 0-based indexing.",
    "explanation": "ICSE Section A tests precise line-by-line output prediction. Board snippet 14 tests diagnostic tracing skills.",
    "hint": "Deterministic execution tracing.",
    "level": "intermediate",
    "options": [
      "Unpredictable result",
      "Deterministic output traced step-by-step",
      "Compile error",
      "Infinite loop"
    ],
    "correctAnswer": 1,
    "codeExample": "// Output trace snippet 14"
  },
  {
    "id": 15,
    "question": "Question 15 on Output Prediction: What is the evaluated output for board snippet 15?",
    "shortAnswer": "Evaluates exact method return values based on precedence, immutability, and 0-based indexing.",
    "explanation": "ICSE Section A tests precise line-by-line output prediction. Board snippet 15 tests diagnostic tracing skills.",
    "hint": "Deterministic execution tracing.",
    "level": "intermediate",
    "options": [
      "Unpredictable result",
      "Deterministic output traced step-by-step",
      "Compile error",
      "Infinite loop"
    ],
    "correctAnswer": 1,
    "codeExample": "// Output trace snippet 15"
  },
  {
    "id": 16,
    "question": "Question 16 on Output Prediction: What is the evaluated output for board snippet 16?",
    "shortAnswer": "Evaluates exact method return values based on precedence, immutability, and 0-based indexing.",
    "explanation": "ICSE Section A tests precise line-by-line output prediction. Board snippet 16 tests diagnostic tracing skills.",
    "hint": "Deterministic execution tracing.",
    "level": "intermediate",
    "options": [
      "Unpredictable result",
      "Deterministic output traced step-by-step",
      "Compile error",
      "Infinite loop"
    ],
    "correctAnswer": 1,
    "codeExample": "// Output trace snippet 16"
  },
  {
    "id": 17,
    "question": "Question 17 on Output Prediction: What is the evaluated output for board snippet 17?",
    "shortAnswer": "Evaluates exact method return values based on precedence, immutability, and 0-based indexing.",
    "explanation": "ICSE Section A tests precise line-by-line output prediction. Board snippet 17 tests diagnostic tracing skills.",
    "hint": "Deterministic execution tracing.",
    "level": "intermediate",
    "options": [
      "Unpredictable result",
      "Deterministic output traced step-by-step",
      "Compile error",
      "Infinite loop"
    ],
    "correctAnswer": 1,
    "codeExample": "// Output trace snippet 17"
  },
  {
    "id": 18,
    "question": "Question 18 on Output Prediction: What is the evaluated output for board snippet 18?",
    "shortAnswer": "Evaluates exact method return values based on precedence, immutability, and 0-based indexing.",
    "explanation": "ICSE Section A tests precise line-by-line output prediction. Board snippet 18 tests diagnostic tracing skills.",
    "hint": "Deterministic execution tracing.",
    "level": "intermediate",
    "options": [
      "Unpredictable result",
      "Deterministic output traced step-by-step",
      "Compile error",
      "Infinite loop"
    ],
    "correctAnswer": 1,
    "codeExample": "// Output trace snippet 18"
  },
  {
    "id": 19,
    "question": "Question 19 on Output Prediction: What is the evaluated output for board snippet 19?",
    "shortAnswer": "Evaluates exact method return values based on precedence, immutability, and 0-based indexing.",
    "explanation": "ICSE Section A tests precise line-by-line output prediction. Board snippet 19 tests diagnostic tracing skills.",
    "hint": "Deterministic execution tracing.",
    "level": "advanced",
    "options": [
      "Unpredictable result",
      "Deterministic output traced step-by-step",
      "Compile error",
      "Infinite loop"
    ],
    "correctAnswer": 1,
    "codeExample": "// Output trace snippet 19"
  },
  {
    "id": 20,
    "question": "Question 20 on Output Prediction: What is the evaluated output for board snippet 20?",
    "shortAnswer": "Evaluates exact method return values based on precedence, immutability, and 0-based indexing.",
    "explanation": "ICSE Section A tests precise line-by-line output prediction. Board snippet 20 tests diagnostic tracing skills.",
    "hint": "Deterministic execution tracing.",
    "level": "advanced",
    "options": [
      "Unpredictable result",
      "Deterministic output traced step-by-step",
      "Compile error",
      "Infinite loop"
    ],
    "correctAnswer": 1,
    "codeExample": "// Output trace snippet 20"
  },
  {
    "id": 21,
    "question": "Question 21 on Output Prediction: What is the evaluated output for board snippet 21?",
    "shortAnswer": "Evaluates exact method return values based on precedence, immutability, and 0-based indexing.",
    "explanation": "ICSE Section A tests precise line-by-line output prediction. Board snippet 21 tests diagnostic tracing skills.",
    "hint": "Deterministic execution tracing.",
    "level": "advanced",
    "options": [
      "Unpredictable result",
      "Deterministic output traced step-by-step",
      "Compile error",
      "Infinite loop"
    ],
    "correctAnswer": 1,
    "codeExample": "// Output trace snippet 21"
  },
  {
    "id": 22,
    "question": "Question 22 on Output Prediction: What is the evaluated output for board snippet 22?",
    "shortAnswer": "Evaluates exact method return values based on precedence, immutability, and 0-based indexing.",
    "explanation": "ICSE Section A tests precise line-by-line output prediction. Board snippet 22 tests diagnostic tracing skills.",
    "hint": "Deterministic execution tracing.",
    "level": "advanced",
    "options": [
      "Unpredictable result",
      "Deterministic output traced step-by-step",
      "Compile error",
      "Infinite loop"
    ],
    "correctAnswer": 1,
    "codeExample": "// Output trace snippet 22"
  },
  {
    "id": 23,
    "question": "Question 23 on Output Prediction: What is the evaluated output for board snippet 23?",
    "shortAnswer": "Evaluates exact method return values based on precedence, immutability, and 0-based indexing.",
    "explanation": "ICSE Section A tests precise line-by-line output prediction. Board snippet 23 tests diagnostic tracing skills.",
    "hint": "Deterministic execution tracing.",
    "level": "advanced",
    "options": [
      "Unpredictable result",
      "Deterministic output traced step-by-step",
      "Compile error",
      "Infinite loop"
    ],
    "correctAnswer": 1,
    "codeExample": "// Output trace snippet 23"
  },
  {
    "id": 24,
    "question": "Question 24 on Output Prediction: What is the evaluated output for board snippet 24?",
    "shortAnswer": "Evaluates exact method return values based on precedence, immutability, and 0-based indexing.",
    "explanation": "ICSE Section A tests precise line-by-line output prediction. Board snippet 24 tests diagnostic tracing skills.",
    "hint": "Deterministic execution tracing.",
    "level": "advanced",
    "options": [
      "Unpredictable result",
      "Deterministic output traced step-by-step",
      "Compile error",
      "Infinite loop"
    ],
    "correctAnswer": 1,
    "codeExample": "// Output trace snippet 24"
  },
  {
    "id": 25,
    "question": "Question 25 on Output Prediction: What is the evaluated output for board snippet 25?",
    "shortAnswer": "Evaluates exact method return values based on precedence, immutability, and 0-based indexing.",
    "explanation": "ICSE Section A tests precise line-by-line output prediction. Board snippet 25 tests diagnostic tracing skills.",
    "hint": "Deterministic execution tracing.",
    "level": "advanced",
    "options": [
      "Unpredictable result",
      "Deterministic output traced step-by-step",
      "Compile error",
      "Infinite loop"
    ],
    "correctAnswer": 1,
    "codeExample": "// Output trace snippet 25"
  }
];

export default questions;
