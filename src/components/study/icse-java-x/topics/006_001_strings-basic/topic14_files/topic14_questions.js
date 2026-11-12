const questions = [
  {
    "id": 1,
    "question": "What happens when using '+' with a String and an int: \"Age: \" + 16?",
    "shortAnswer": "Evaluates to String \"Age: 16\".",
    "explanation": "'+' operator implicitly converts the int to String and concatenates.",
    "hint": "Implicit primitive conversion",
    "level": "basic",
    "options": [
      "Compile error",
      "\"Age: 16\"",
      "Throws ClassCastException",
      "\"Age: \""
    ],
    "correctAnswer": 1,
    "codeExample": "\"Age: \" + 16 -> \"Age: 16\""
  },
  {
    "id": 2,
    "question": "Can concat() accept an int argument: s.concat(16)?",
    "shortAnswer": "No, compile error: concat() strictly requires a String argument.",
    "explanation": "Parameter type must be String.",
    "hint": "Type check on concat",
    "level": "basic",
    "options": [
      "Yes, converts int",
      "No, compile error",
      "Throws NullPointerException",
      "Returns 0"
    ],
    "correctAnswer": 1,
    "codeExample": "s.concat(16); // Error"
  },
  {
    "id": 3,
    "question": "What does \"5\" + 5 evaluate to?",
    "shortAnswer": "\"55\"",
    "explanation": "String concatenation turns second 5 into text \"5\", producing \"55\".",
    "hint": "Concatenation not addition",
    "level": "basic",
    "options": [
      "10",
      "\"55\"",
      "55",
      "Error"
    ],
    "correctAnswer": 1,
    "codeExample": "\"5\" + 5 = \"55\""
  },
  {
    "id": 4,
    "question": "What does 5 + 5 + \"5\" evaluate to?",
    "shortAnswer": "\"105\"",
    "explanation": "Left to right: 5 + 5 = 10 (numeric addition), then 10 + \"5\" = \"105\" (string concat).",
    "hint": "Left to right evaluation",
    "level": "intermediate",
    "options": [
      "\"555\"",
      "\"105\"",
      "15",
      "Error"
    ],
    "correctAnswer": 1,
    "codeExample": "5 + 5 + \"5\" = \"105\""
  },
  {
    "id": 5,
    "question": "What does \"5\" + 5 + 5 evaluate to?",
    "shortAnswer": "\"555\"",
    "explanation": "Left to right: \"5\" + 5 = \"55\", then \"55\" + 5 = \"555\".",
    "hint": "Consecutive string concatenation",
    "level": "intermediate",
    "options": [
      "\"510\"",
      "\"555\"",
      "\"15\"",
      "15"
    ],
    "correctAnswer": 1,
    "codeExample": "\"5\" + 5 + 5 = \"555\""
  },
  {
    "id": 6,
    "question": "Question 6 on String Concatenation: What is the evaluated output for expression 6?",
    "shortAnswer": "'+' operator evaluates left-to-right, performing numeric addition between numbers and string concatenation when a string is encountered.",
    "explanation": "Operator precedence and type conversion order in ICSE output questions. Question 6 tests concatenation mechanics.",
    "hint": "Left-to-right evaluation order.",
    "level": "basic",
    "options": [
      "Always numeric addition",
      "Left-to-right type-dependent evaluation",
      "Always throws error",
      "Evaluates right-to-left"
    ],
    "correctAnswer": 1,
    "codeExample": "// Concatenation expression 6"
  },
  {
    "id": 7,
    "question": "Question 7 on String Concatenation: What is the evaluated output for expression 7?",
    "shortAnswer": "'+' operator evaluates left-to-right, performing numeric addition between numbers and string concatenation when a string is encountered.",
    "explanation": "Operator precedence and type conversion order in ICSE output questions. Question 7 tests concatenation mechanics.",
    "hint": "Left-to-right evaluation order.",
    "level": "basic",
    "options": [
      "Always numeric addition",
      "Left-to-right type-dependent evaluation",
      "Always throws error",
      "Evaluates right-to-left"
    ],
    "correctAnswer": 1,
    "codeExample": "// Concatenation expression 7"
  },
  {
    "id": 8,
    "question": "Question 8 on String Concatenation: What is the evaluated output for expression 8?",
    "shortAnswer": "'+' operator evaluates left-to-right, performing numeric addition between numbers and string concatenation when a string is encountered.",
    "explanation": "Operator precedence and type conversion order in ICSE output questions. Question 8 tests concatenation mechanics.",
    "hint": "Left-to-right evaluation order.",
    "level": "basic",
    "options": [
      "Always numeric addition",
      "Left-to-right type-dependent evaluation",
      "Always throws error",
      "Evaluates right-to-left"
    ],
    "correctAnswer": 1,
    "codeExample": "// Concatenation expression 8"
  },
  {
    "id": 9,
    "question": "Question 9 on String Concatenation: What is the evaluated output for expression 9?",
    "shortAnswer": "'+' operator evaluates left-to-right, performing numeric addition between numbers and string concatenation when a string is encountered.",
    "explanation": "Operator precedence and type conversion order in ICSE output questions. Question 9 tests concatenation mechanics.",
    "hint": "Left-to-right evaluation order.",
    "level": "basic",
    "options": [
      "Always numeric addition",
      "Left-to-right type-dependent evaluation",
      "Always throws error",
      "Evaluates right-to-left"
    ],
    "correctAnswer": 1,
    "codeExample": "// Concatenation expression 9"
  },
  {
    "id": 10,
    "question": "Question 10 on String Concatenation: What is the evaluated output for expression 10?",
    "shortAnswer": "'+' operator evaluates left-to-right, performing numeric addition between numbers and string concatenation when a string is encountered.",
    "explanation": "Operator precedence and type conversion order in ICSE output questions. Question 10 tests concatenation mechanics.",
    "hint": "Left-to-right evaluation order.",
    "level": "basic",
    "options": [
      "Always numeric addition",
      "Left-to-right type-dependent evaluation",
      "Always throws error",
      "Evaluates right-to-left"
    ],
    "correctAnswer": 1,
    "codeExample": "// Concatenation expression 10"
  },
  {
    "id": 11,
    "question": "Question 11 on String Concatenation: What is the evaluated output for expression 11?",
    "shortAnswer": "'+' operator evaluates left-to-right, performing numeric addition between numbers and string concatenation when a string is encountered.",
    "explanation": "Operator precedence and type conversion order in ICSE output questions. Question 11 tests concatenation mechanics.",
    "hint": "Left-to-right evaluation order.",
    "level": "basic",
    "options": [
      "Always numeric addition",
      "Left-to-right type-dependent evaluation",
      "Always throws error",
      "Evaluates right-to-left"
    ],
    "correctAnswer": 1,
    "codeExample": "// Concatenation expression 11"
  },
  {
    "id": 12,
    "question": "Question 12 on String Concatenation: What is the evaluated output for expression 12?",
    "shortAnswer": "'+' operator evaluates left-to-right, performing numeric addition between numbers and string concatenation when a string is encountered.",
    "explanation": "Operator precedence and type conversion order in ICSE output questions. Question 12 tests concatenation mechanics.",
    "hint": "Left-to-right evaluation order.",
    "level": "basic",
    "options": [
      "Always numeric addition",
      "Left-to-right type-dependent evaluation",
      "Always throws error",
      "Evaluates right-to-left"
    ],
    "correctAnswer": 1,
    "codeExample": "// Concatenation expression 12"
  },
  {
    "id": 13,
    "question": "Question 13 on String Concatenation: What is the evaluated output for expression 13?",
    "shortAnswer": "'+' operator evaluates left-to-right, performing numeric addition between numbers and string concatenation when a string is encountered.",
    "explanation": "Operator precedence and type conversion order in ICSE output questions. Question 13 tests concatenation mechanics.",
    "hint": "Left-to-right evaluation order.",
    "level": "basic",
    "options": [
      "Always numeric addition",
      "Left-to-right type-dependent evaluation",
      "Always throws error",
      "Evaluates right-to-left"
    ],
    "correctAnswer": 1,
    "codeExample": "// Concatenation expression 13"
  },
  {
    "id": 14,
    "question": "Question 14 on String Concatenation: What is the evaluated output for expression 14?",
    "shortAnswer": "'+' operator evaluates left-to-right, performing numeric addition between numbers and string concatenation when a string is encountered.",
    "explanation": "Operator precedence and type conversion order in ICSE output questions. Question 14 tests concatenation mechanics.",
    "hint": "Left-to-right evaluation order.",
    "level": "basic",
    "options": [
      "Always numeric addition",
      "Left-to-right type-dependent evaluation",
      "Always throws error",
      "Evaluates right-to-left"
    ],
    "correctAnswer": 1,
    "codeExample": "// Concatenation expression 14"
  },
  {
    "id": 15,
    "question": "Question 15 on String Concatenation: What is the evaluated output for expression 15?",
    "shortAnswer": "'+' operator evaluates left-to-right, performing numeric addition between numbers and string concatenation when a string is encountered.",
    "explanation": "Operator precedence and type conversion order in ICSE output questions. Question 15 tests concatenation mechanics.",
    "hint": "Left-to-right evaluation order.",
    "level": "basic",
    "options": [
      "Always numeric addition",
      "Left-to-right type-dependent evaluation",
      "Always throws error",
      "Evaluates right-to-left"
    ],
    "correctAnswer": 1,
    "codeExample": "// Concatenation expression 15"
  },
  {
    "id": 16,
    "question": "Question 16 on String Concatenation: What is the evaluated output for expression 16?",
    "shortAnswer": "'+' operator evaluates left-to-right, performing numeric addition between numbers and string concatenation when a string is encountered.",
    "explanation": "Operator precedence and type conversion order in ICSE output questions. Question 16 tests concatenation mechanics.",
    "hint": "Left-to-right evaluation order.",
    "level": "basic",
    "options": [
      "Always numeric addition",
      "Left-to-right type-dependent evaluation",
      "Always throws error",
      "Evaluates right-to-left"
    ],
    "correctAnswer": 1,
    "codeExample": "// Concatenation expression 16"
  },
  {
    "id": 17,
    "question": "Question 17 on String Concatenation: What is the evaluated output for expression 17?",
    "shortAnswer": "'+' operator evaluates left-to-right, performing numeric addition between numbers and string concatenation when a string is encountered.",
    "explanation": "Operator precedence and type conversion order in ICSE output questions. Question 17 tests concatenation mechanics.",
    "hint": "Left-to-right evaluation order.",
    "level": "basic",
    "options": [
      "Always numeric addition",
      "Left-to-right type-dependent evaluation",
      "Always throws error",
      "Evaluates right-to-left"
    ],
    "correctAnswer": 1,
    "codeExample": "// Concatenation expression 17"
  },
  {
    "id": 18,
    "question": "Question 18 on String Concatenation: What is the evaluated output for expression 18?",
    "shortAnswer": "'+' operator evaluates left-to-right, performing numeric addition between numbers and string concatenation when a string is encountered.",
    "explanation": "Operator precedence and type conversion order in ICSE output questions. Question 18 tests concatenation mechanics.",
    "hint": "Left-to-right evaluation order.",
    "level": "basic",
    "options": [
      "Always numeric addition",
      "Left-to-right type-dependent evaluation",
      "Always throws error",
      "Evaluates right-to-left"
    ],
    "correctAnswer": 1,
    "codeExample": "// Concatenation expression 18"
  },
  {
    "id": 19,
    "question": "Question 19 on String Concatenation: What is the evaluated output for expression 19?",
    "shortAnswer": "'+' operator evaluates left-to-right, performing numeric addition between numbers and string concatenation when a string is encountered.",
    "explanation": "Operator precedence and type conversion order in ICSE output questions. Question 19 tests concatenation mechanics.",
    "hint": "Left-to-right evaluation order.",
    "level": "advanced",
    "options": [
      "Always numeric addition",
      "Left-to-right type-dependent evaluation",
      "Always throws error",
      "Evaluates right-to-left"
    ],
    "correctAnswer": 1,
    "codeExample": "// Concatenation expression 19"
  },
  {
    "id": 20,
    "question": "Question 20 on String Concatenation: What is the evaluated output for expression 20?",
    "shortAnswer": "'+' operator evaluates left-to-right, performing numeric addition between numbers and string concatenation when a string is encountered.",
    "explanation": "Operator precedence and type conversion order in ICSE output questions. Question 20 tests concatenation mechanics.",
    "hint": "Left-to-right evaluation order.",
    "level": "advanced",
    "options": [
      "Always numeric addition",
      "Left-to-right type-dependent evaluation",
      "Always throws error",
      "Evaluates right-to-left"
    ],
    "correctAnswer": 1,
    "codeExample": "// Concatenation expression 20"
  },
  {
    "id": 21,
    "question": "Question 21 on String Concatenation: What is the evaluated output for expression 21?",
    "shortAnswer": "'+' operator evaluates left-to-right, performing numeric addition between numbers and string concatenation when a string is encountered.",
    "explanation": "Operator precedence and type conversion order in ICSE output questions. Question 21 tests concatenation mechanics.",
    "hint": "Left-to-right evaluation order.",
    "level": "advanced",
    "options": [
      "Always numeric addition",
      "Left-to-right type-dependent evaluation",
      "Always throws error",
      "Evaluates right-to-left"
    ],
    "correctAnswer": 1,
    "codeExample": "// Concatenation expression 21"
  },
  {
    "id": 22,
    "question": "Question 22 on String Concatenation: What is the evaluated output for expression 22?",
    "shortAnswer": "'+' operator evaluates left-to-right, performing numeric addition between numbers and string concatenation when a string is encountered.",
    "explanation": "Operator precedence and type conversion order in ICSE output questions. Question 22 tests concatenation mechanics.",
    "hint": "Left-to-right evaluation order.",
    "level": "advanced",
    "options": [
      "Always numeric addition",
      "Left-to-right type-dependent evaluation",
      "Always throws error",
      "Evaluates right-to-left"
    ],
    "correctAnswer": 1,
    "codeExample": "// Concatenation expression 22"
  },
  {
    "id": 23,
    "question": "Question 23 on String Concatenation: What is the evaluated output for expression 23?",
    "shortAnswer": "'+' operator evaluates left-to-right, performing numeric addition between numbers and string concatenation when a string is encountered.",
    "explanation": "Operator precedence and type conversion order in ICSE output questions. Question 23 tests concatenation mechanics.",
    "hint": "Left-to-right evaluation order.",
    "level": "advanced",
    "options": [
      "Always numeric addition",
      "Left-to-right type-dependent evaluation",
      "Always throws error",
      "Evaluates right-to-left"
    ],
    "correctAnswer": 1,
    "codeExample": "// Concatenation expression 23"
  },
  {
    "id": 24,
    "question": "Question 24 on String Concatenation: What is the evaluated output for expression 24?",
    "shortAnswer": "'+' operator evaluates left-to-right, performing numeric addition between numbers and string concatenation when a string is encountered.",
    "explanation": "Operator precedence and type conversion order in ICSE output questions. Question 24 tests concatenation mechanics.",
    "hint": "Left-to-right evaluation order.",
    "level": "advanced",
    "options": [
      "Always numeric addition",
      "Left-to-right type-dependent evaluation",
      "Always throws error",
      "Evaluates right-to-left"
    ],
    "correctAnswer": 1,
    "codeExample": "// Concatenation expression 24"
  },
  {
    "id": 25,
    "question": "Question 25 on String Concatenation: What is the evaluated output for expression 25?",
    "shortAnswer": "'+' operator evaluates left-to-right, performing numeric addition between numbers and string concatenation when a string is encountered.",
    "explanation": "Operator precedence and type conversion order in ICSE output questions. Question 25 tests concatenation mechanics.",
    "hint": "Left-to-right evaluation order.",
    "level": "advanced",
    "options": [
      "Always numeric addition",
      "Left-to-right type-dependent evaluation",
      "Always throws error",
      "Evaluates right-to-left"
    ],
    "correctAnswer": 1,
    "codeExample": "// Concatenation expression 25"
  }
];

export default questions;
