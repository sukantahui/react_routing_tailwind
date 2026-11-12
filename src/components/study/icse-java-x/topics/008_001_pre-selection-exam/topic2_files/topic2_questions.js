const questions = [
  {
    "id": 1,
    "question": "What is the output of: Math.floor(-4.7)?",
    "shortAnswer": "-5.0",
    "explanation": "Math.floor returns the largest double value less than or equal to the argument; -5.0 is less than -4.7.",
    "hint": "Floor of negative number",
    "level": "basic",
    "options": [
      "-4.0",
      "-5.0",
      "-4.7",
      "5.0"
    ],
    "correctAnswer": 1,
    "codeExample": "Math.floor(-4.7) = -5.0"
  },
  {
    "id": 2,
    "question": "What is the output of: Math.ceil(-4.7)?",
    "shortAnswer": "-4.0",
    "explanation": "Math.ceil returns the smallest double greater than or equal to the argument; -4.0 is greater than -4.7.",
    "hint": "Ceil of negative number",
    "level": "basic",
    "options": [
      "-4.0",
      "-5.0",
      "-4.7",
      "4.0"
    ],
    "correctAnswer": 0,
    "codeExample": "Math.ceil(-4.7) = -4.0"
  },
  {
    "id": 3,
    "question": "What does \"BLUEJ\".substring(1, 4) evaluate to in Section A snippet questions?",
    "shortAnswer": "\"lue\"",
    "explanation": "Indices: 1 ('l'), 2 ('u'), 3 ('e'). Length = 4 - 1 = 3.",
    "hint": "Substring index 1 to 3",
    "level": "basic",
    "options": [
      "\"Blue\"",
      "\"lue\"",
      "\"lueJ\"",
      "\"BlueJ\""
    ],
    "correctAnswer": 1,
    "codeExample": "\"BLUEJ\".substring(1, 4) = \"lue\""
  },
  {
    "id": 4,
    "question": "What is the output of: int a = 5; System.out.println(++a * 2 + a--);?",
    "shortAnswer": "18",
    "explanation": "++a makes a=6. 6 * 2 = 12. Then + a-- adds 6 (now a=5). 12 + 6 = 18.",
    "hint": "Prefix and postfix evaluation",
    "level": "intermediate",
    "options": [
      "17",
      "18",
      "19",
      "20"
    ],
    "correctAnswer": 1,
    "codeExample": "++a(6) * 2 + a--(6) = 12 + 6 = 18"
  },
  {
    "id": 5,
    "question": "What is the output of: System.out.println(\"Java\".indexOf('a', 2));?",
    "shortAnswer": "3",
    "explanation": "\"Java\" has 'a' at index 1 and index 3. Searching from index 2 finds 'a' at index 3.",
    "hint": "indexOf with offset",
    "level": "basic",
    "options": [
      "1",
      "2",
      "3",
      "-1"
    ],
    "correctAnswer": 2,
    "codeExample": "\"Java\".indexOf('a', 2) = 3"
  },
  {
    "id": 6,
    "question": "Question 6 on Output Prediction: What is the exact evaluated output for snippet 6?",
    "shortAnswer": "Traces step-by-step variable states, operator precedence, and string method returns.",
    "explanation": "Section A Questions 1 & 2 demand rigorous dry-run evaluation. Snippet 6 provides board-grade output tracing practice.",
    "hint": "Dry run trace table.",
    "level": "intermediate",
    "options": [
      "Unpredictable output",
      "Exact traced return value based on Java language specification",
      "Compile error",
      "Throws runtime error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Output trace snippet 6"
  },
  {
    "id": 7,
    "question": "Question 7 on Output Prediction: What is the exact evaluated output for snippet 7?",
    "shortAnswer": "Traces step-by-step variable states, operator precedence, and string method returns.",
    "explanation": "Section A Questions 1 & 2 demand rigorous dry-run evaluation. Snippet 7 provides board-grade output tracing practice.",
    "hint": "Dry run trace table.",
    "level": "intermediate",
    "options": [
      "Unpredictable output",
      "Exact traced return value based on Java language specification",
      "Compile error",
      "Throws runtime error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Output trace snippet 7"
  },
  {
    "id": 8,
    "question": "Question 8 on Output Prediction: What is the exact evaluated output for snippet 8?",
    "shortAnswer": "Traces step-by-step variable states, operator precedence, and string method returns.",
    "explanation": "Section A Questions 1 & 2 demand rigorous dry-run evaluation. Snippet 8 provides board-grade output tracing practice.",
    "hint": "Dry run trace table.",
    "level": "intermediate",
    "options": [
      "Unpredictable output",
      "Exact traced return value based on Java language specification",
      "Compile error",
      "Throws runtime error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Output trace snippet 8"
  },
  {
    "id": 9,
    "question": "Question 9 on Output Prediction: What is the exact evaluated output for snippet 9?",
    "shortAnswer": "Traces step-by-step variable states, operator precedence, and string method returns.",
    "explanation": "Section A Questions 1 & 2 demand rigorous dry-run evaluation. Snippet 9 provides board-grade output tracing practice.",
    "hint": "Dry run trace table.",
    "level": "intermediate",
    "options": [
      "Unpredictable output",
      "Exact traced return value based on Java language specification",
      "Compile error",
      "Throws runtime error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Output trace snippet 9"
  },
  {
    "id": 10,
    "question": "Question 10 on Output Prediction: What is the exact evaluated output for snippet 10?",
    "shortAnswer": "Traces step-by-step variable states, operator precedence, and string method returns.",
    "explanation": "Section A Questions 1 & 2 demand rigorous dry-run evaluation. Snippet 10 provides board-grade output tracing practice.",
    "hint": "Dry run trace table.",
    "level": "intermediate",
    "options": [
      "Unpredictable output",
      "Exact traced return value based on Java language specification",
      "Compile error",
      "Throws runtime error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Output trace snippet 10"
  },
  {
    "id": 11,
    "question": "Question 11 on Output Prediction: What is the exact evaluated output for snippet 11?",
    "shortAnswer": "Traces step-by-step variable states, operator precedence, and string method returns.",
    "explanation": "Section A Questions 1 & 2 demand rigorous dry-run evaluation. Snippet 11 provides board-grade output tracing practice.",
    "hint": "Dry run trace table.",
    "level": "intermediate",
    "options": [
      "Unpredictable output",
      "Exact traced return value based on Java language specification",
      "Compile error",
      "Throws runtime error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Output trace snippet 11"
  },
  {
    "id": 12,
    "question": "Question 12 on Output Prediction: What is the exact evaluated output for snippet 12?",
    "shortAnswer": "Traces step-by-step variable states, operator precedence, and string method returns.",
    "explanation": "Section A Questions 1 & 2 demand rigorous dry-run evaluation. Snippet 12 provides board-grade output tracing practice.",
    "hint": "Dry run trace table.",
    "level": "intermediate",
    "options": [
      "Unpredictable output",
      "Exact traced return value based on Java language specification",
      "Compile error",
      "Throws runtime error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Output trace snippet 12"
  },
  {
    "id": 13,
    "question": "Question 13 on Output Prediction: What is the exact evaluated output for snippet 13?",
    "shortAnswer": "Traces step-by-step variable states, operator precedence, and string method returns.",
    "explanation": "Section A Questions 1 & 2 demand rigorous dry-run evaluation. Snippet 13 provides board-grade output tracing practice.",
    "hint": "Dry run trace table.",
    "level": "intermediate",
    "options": [
      "Unpredictable output",
      "Exact traced return value based on Java language specification",
      "Compile error",
      "Throws runtime error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Output trace snippet 13"
  },
  {
    "id": 14,
    "question": "Question 14 on Output Prediction: What is the exact evaluated output for snippet 14?",
    "shortAnswer": "Traces step-by-step variable states, operator precedence, and string method returns.",
    "explanation": "Section A Questions 1 & 2 demand rigorous dry-run evaluation. Snippet 14 provides board-grade output tracing practice.",
    "hint": "Dry run trace table.",
    "level": "intermediate",
    "options": [
      "Unpredictable output",
      "Exact traced return value based on Java language specification",
      "Compile error",
      "Throws runtime error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Output trace snippet 14"
  },
  {
    "id": 15,
    "question": "Question 15 on Output Prediction: What is the exact evaluated output for snippet 15?",
    "shortAnswer": "Traces step-by-step variable states, operator precedence, and string method returns.",
    "explanation": "Section A Questions 1 & 2 demand rigorous dry-run evaluation. Snippet 15 provides board-grade output tracing practice.",
    "hint": "Dry run trace table.",
    "level": "intermediate",
    "options": [
      "Unpredictable output",
      "Exact traced return value based on Java language specification",
      "Compile error",
      "Throws runtime error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Output trace snippet 15"
  },
  {
    "id": 16,
    "question": "Question 16 on Output Prediction: What is the exact evaluated output for snippet 16?",
    "shortAnswer": "Traces step-by-step variable states, operator precedence, and string method returns.",
    "explanation": "Section A Questions 1 & 2 demand rigorous dry-run evaluation. Snippet 16 provides board-grade output tracing practice.",
    "hint": "Dry run trace table.",
    "level": "intermediate",
    "options": [
      "Unpredictable output",
      "Exact traced return value based on Java language specification",
      "Compile error",
      "Throws runtime error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Output trace snippet 16"
  },
  {
    "id": 17,
    "question": "Question 17 on Output Prediction: What is the exact evaluated output for snippet 17?",
    "shortAnswer": "Traces step-by-step variable states, operator precedence, and string method returns.",
    "explanation": "Section A Questions 1 & 2 demand rigorous dry-run evaluation. Snippet 17 provides board-grade output tracing practice.",
    "hint": "Dry run trace table.",
    "level": "intermediate",
    "options": [
      "Unpredictable output",
      "Exact traced return value based on Java language specification",
      "Compile error",
      "Throws runtime error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Output trace snippet 17"
  },
  {
    "id": 18,
    "question": "Question 18 on Output Prediction: What is the exact evaluated output for snippet 18?",
    "shortAnswer": "Traces step-by-step variable states, operator precedence, and string method returns.",
    "explanation": "Section A Questions 1 & 2 demand rigorous dry-run evaluation. Snippet 18 provides board-grade output tracing practice.",
    "hint": "Dry run trace table.",
    "level": "intermediate",
    "options": [
      "Unpredictable output",
      "Exact traced return value based on Java language specification",
      "Compile error",
      "Throws runtime error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Output trace snippet 18"
  },
  {
    "id": 19,
    "question": "Question 19 on Output Prediction: What is the exact evaluated output for snippet 19?",
    "shortAnswer": "Traces step-by-step variable states, operator precedence, and string method returns.",
    "explanation": "Section A Questions 1 & 2 demand rigorous dry-run evaluation. Snippet 19 provides board-grade output tracing practice.",
    "hint": "Dry run trace table.",
    "level": "advanced",
    "options": [
      "Unpredictable output",
      "Exact traced return value based on Java language specification",
      "Compile error",
      "Throws runtime error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Output trace snippet 19"
  },
  {
    "id": 20,
    "question": "Question 20 on Output Prediction: What is the exact evaluated output for snippet 20?",
    "shortAnswer": "Traces step-by-step variable states, operator precedence, and string method returns.",
    "explanation": "Section A Questions 1 & 2 demand rigorous dry-run evaluation. Snippet 20 provides board-grade output tracing practice.",
    "hint": "Dry run trace table.",
    "level": "advanced",
    "options": [
      "Unpredictable output",
      "Exact traced return value based on Java language specification",
      "Compile error",
      "Throws runtime error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Output trace snippet 20"
  },
  {
    "id": 21,
    "question": "Question 21 on Output Prediction: What is the exact evaluated output for snippet 21?",
    "shortAnswer": "Traces step-by-step variable states, operator precedence, and string method returns.",
    "explanation": "Section A Questions 1 & 2 demand rigorous dry-run evaluation. Snippet 21 provides board-grade output tracing practice.",
    "hint": "Dry run trace table.",
    "level": "advanced",
    "options": [
      "Unpredictable output",
      "Exact traced return value based on Java language specification",
      "Compile error",
      "Throws runtime error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Output trace snippet 21"
  },
  {
    "id": 22,
    "question": "Question 22 on Output Prediction: What is the exact evaluated output for snippet 22?",
    "shortAnswer": "Traces step-by-step variable states, operator precedence, and string method returns.",
    "explanation": "Section A Questions 1 & 2 demand rigorous dry-run evaluation. Snippet 22 provides board-grade output tracing practice.",
    "hint": "Dry run trace table.",
    "level": "advanced",
    "options": [
      "Unpredictable output",
      "Exact traced return value based on Java language specification",
      "Compile error",
      "Throws runtime error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Output trace snippet 22"
  },
  {
    "id": 23,
    "question": "Question 23 on Output Prediction: What is the exact evaluated output for snippet 23?",
    "shortAnswer": "Traces step-by-step variable states, operator precedence, and string method returns.",
    "explanation": "Section A Questions 1 & 2 demand rigorous dry-run evaluation. Snippet 23 provides board-grade output tracing practice.",
    "hint": "Dry run trace table.",
    "level": "advanced",
    "options": [
      "Unpredictable output",
      "Exact traced return value based on Java language specification",
      "Compile error",
      "Throws runtime error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Output trace snippet 23"
  },
  {
    "id": 24,
    "question": "Question 24 on Output Prediction: What is the exact evaluated output for snippet 24?",
    "shortAnswer": "Traces step-by-step variable states, operator precedence, and string method returns.",
    "explanation": "Section A Questions 1 & 2 demand rigorous dry-run evaluation. Snippet 24 provides board-grade output tracing practice.",
    "hint": "Dry run trace table.",
    "level": "advanced",
    "options": [
      "Unpredictable output",
      "Exact traced return value based on Java language specification",
      "Compile error",
      "Throws runtime error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Output trace snippet 24"
  },
  {
    "id": 25,
    "question": "Question 25 on Output Prediction: What is the exact evaluated output for snippet 25?",
    "shortAnswer": "Traces step-by-step variable states, operator precedence, and string method returns.",
    "explanation": "Section A Questions 1 & 2 demand rigorous dry-run evaluation. Snippet 25 provides board-grade output tracing practice.",
    "hint": "Dry run trace table.",
    "level": "advanced",
    "options": [
      "Unpredictable output",
      "Exact traced return value based on Java language specification",
      "Compile error",
      "Throws runtime error"
    ],
    "correctAnswer": 1,
    "codeExample": "// Output trace snippet 25"
  }
];

export default questions;
