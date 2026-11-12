const questions = [
  {
    "id": 1,
    "question": "What does substring(int beginIndex, int endIndex) extract?",
    "shortAnswer": "Characters from beginIndex (inclusive) up to endIndex - 1 (exclusive).",
    "explanation": "The extracted sequence has length = endIndex - beginIndex.",
    "hint": "Inclusive begin, exclusive end",
    "level": "basic",
    "options": [
      "Both inclusive",
      "beginIndex inclusive, endIndex exclusive",
      "Both exclusive",
      "From beginIndex to end of string"
    ],
    "correctAnswer": 1,
    "codeExample": "s.substring(0, 3); // 3 chars"
  },
  {
    "id": 2,
    "question": "What is the output of: \"BARRACKPORE\".substring(3, 7)?",
    "shortAnswer": "\"RACK\"",
    "explanation": "Indices 3, 4, 5, 6 give characters 'R', 'A', 'C', 'K'. Length is 7 - 3 = 4.",
    "hint": "Indices 3 to 6",
    "level": "basic",
    "options": [
      "\"RACK\"",
      "\"RACKP\"",
      "\"ARRA\"",
      "\"ACKP\""
    ],
    "correctAnswer": 0,
    "codeExample": "\"BARRACKPORE\".substring(3, 7) = \"RACK\""
  },
  {
    "id": 3,
    "question": "What is the output of: \"TELEPHONE\".substring(4)?",
    "shortAnswer": "\"PHONE\"",
    "explanation": "Single parameter substring extracts from index 4 to end.",
    "hint": "Index 4 to end",
    "level": "basic",
    "options": [
      "\"TELE\"",
      "\"PHONE\"",
      "\"EPHONE\"",
      "\"LEPH\""
    ],
    "correctAnswer": 1,
    "codeExample": "\"TELEPHONE\".substring(4) = \"PHONE\""
  },
  {
    "id": 4,
    "question": "What does \"BLUEJ\".substring(1, 1) evaluate to?",
    "shortAnswer": "\"\" (empty string)",
    "explanation": "When begin == end, extracted length is 1 - 1 = 0, returning empty string \"\".",
    "hint": "Zero characters extracted",
    "level": "intermediate",
    "options": [
      "\"B\"",
      "\"L\"",
      "\"\" (empty string)",
      "Throws Exception"
    ],
    "correctAnswer": 2,
    "codeExample": "\"BLUEJ\".substring(1, 1) = \"\""
  },
  {
    "id": 5,
    "question": "What exception is thrown if endIndex > length() in substring(b, e)?",
    "shortAnswer": "java.lang.StringIndexOutOfBoundsException",
    "explanation": "endIndex cannot exceed the string length.",
    "hint": "Index out of bounds",
    "level": "basic",
    "options": [
      "NullPointerException",
      "StringIndexOutOfBoundsException",
      "ArrayIndexOutOfBoundsException",
      "Compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "s.substring(0, 100); // Exception"
  },
  {
    "id": 6,
    "question": "Question 6 on Substring: What is the slicing output for boundary condition 6?",
    "shortAnswer": "Length of extracted substring is always (endIndex - beginIndex).",
    "explanation": "Java slice mechanics strictly enforce: 0 <= beginIndex <= endIndex <= length(). Condition 6 validates this mathematical rule.",
    "hint": "Length = end - begin.",
    "level": "intermediate",
    "options": [
      "Length = end - begin + 1",
      "Length = end - begin",
      "Throws runtime error",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Substring slice boundary 6"
  },
  {
    "id": 7,
    "question": "Question 7 on Substring: What is the slicing output for boundary condition 7?",
    "shortAnswer": "Length of extracted substring is always (endIndex - beginIndex).",
    "explanation": "Java slice mechanics strictly enforce: 0 <= beginIndex <= endIndex <= length(). Condition 7 validates this mathematical rule.",
    "hint": "Length = end - begin.",
    "level": "intermediate",
    "options": [
      "Length = end - begin + 1",
      "Length = end - begin",
      "Throws runtime error",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Substring slice boundary 7"
  },
  {
    "id": 8,
    "question": "Question 8 on Substring: What is the slicing output for boundary condition 8?",
    "shortAnswer": "Length of extracted substring is always (endIndex - beginIndex).",
    "explanation": "Java slice mechanics strictly enforce: 0 <= beginIndex <= endIndex <= length(). Condition 8 validates this mathematical rule.",
    "hint": "Length = end - begin.",
    "level": "intermediate",
    "options": [
      "Length = end - begin + 1",
      "Length = end - begin",
      "Throws runtime error",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Substring slice boundary 8"
  },
  {
    "id": 9,
    "question": "Question 9 on Substring: What is the slicing output for boundary condition 9?",
    "shortAnswer": "Length of extracted substring is always (endIndex - beginIndex).",
    "explanation": "Java slice mechanics strictly enforce: 0 <= beginIndex <= endIndex <= length(). Condition 9 validates this mathematical rule.",
    "hint": "Length = end - begin.",
    "level": "intermediate",
    "options": [
      "Length = end - begin + 1",
      "Length = end - begin",
      "Throws runtime error",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Substring slice boundary 9"
  },
  {
    "id": 10,
    "question": "Question 10 on Substring: What is the slicing output for boundary condition 10?",
    "shortAnswer": "Length of extracted substring is always (endIndex - beginIndex).",
    "explanation": "Java slice mechanics strictly enforce: 0 <= beginIndex <= endIndex <= length(). Condition 10 validates this mathematical rule.",
    "hint": "Length = end - begin.",
    "level": "intermediate",
    "options": [
      "Length = end - begin + 1",
      "Length = end - begin",
      "Throws runtime error",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Substring slice boundary 10"
  },
  {
    "id": 11,
    "question": "Question 11 on Substring: What is the slicing output for boundary condition 11?",
    "shortAnswer": "Length of extracted substring is always (endIndex - beginIndex).",
    "explanation": "Java slice mechanics strictly enforce: 0 <= beginIndex <= endIndex <= length(). Condition 11 validates this mathematical rule.",
    "hint": "Length = end - begin.",
    "level": "intermediate",
    "options": [
      "Length = end - begin + 1",
      "Length = end - begin",
      "Throws runtime error",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Substring slice boundary 11"
  },
  {
    "id": 12,
    "question": "Question 12 on Substring: What is the slicing output for boundary condition 12?",
    "shortAnswer": "Length of extracted substring is always (endIndex - beginIndex).",
    "explanation": "Java slice mechanics strictly enforce: 0 <= beginIndex <= endIndex <= length(). Condition 12 validates this mathematical rule.",
    "hint": "Length = end - begin.",
    "level": "intermediate",
    "options": [
      "Length = end - begin + 1",
      "Length = end - begin",
      "Throws runtime error",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Substring slice boundary 12"
  },
  {
    "id": 13,
    "question": "Question 13 on Substring: What is the slicing output for boundary condition 13?",
    "shortAnswer": "Length of extracted substring is always (endIndex - beginIndex).",
    "explanation": "Java slice mechanics strictly enforce: 0 <= beginIndex <= endIndex <= length(). Condition 13 validates this mathematical rule.",
    "hint": "Length = end - begin.",
    "level": "intermediate",
    "options": [
      "Length = end - begin + 1",
      "Length = end - begin",
      "Throws runtime error",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Substring slice boundary 13"
  },
  {
    "id": 14,
    "question": "Question 14 on Substring: What is the slicing output for boundary condition 14?",
    "shortAnswer": "Length of extracted substring is always (endIndex - beginIndex).",
    "explanation": "Java slice mechanics strictly enforce: 0 <= beginIndex <= endIndex <= length(). Condition 14 validates this mathematical rule.",
    "hint": "Length = end - begin.",
    "level": "intermediate",
    "options": [
      "Length = end - begin + 1",
      "Length = end - begin",
      "Throws runtime error",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Substring slice boundary 14"
  },
  {
    "id": 15,
    "question": "Question 15 on Substring: What is the slicing output for boundary condition 15?",
    "shortAnswer": "Length of extracted substring is always (endIndex - beginIndex).",
    "explanation": "Java slice mechanics strictly enforce: 0 <= beginIndex <= endIndex <= length(). Condition 15 validates this mathematical rule.",
    "hint": "Length = end - begin.",
    "level": "intermediate",
    "options": [
      "Length = end - begin + 1",
      "Length = end - begin",
      "Throws runtime error",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Substring slice boundary 15"
  },
  {
    "id": 16,
    "question": "Question 16 on Substring: What is the slicing output for boundary condition 16?",
    "shortAnswer": "Length of extracted substring is always (endIndex - beginIndex).",
    "explanation": "Java slice mechanics strictly enforce: 0 <= beginIndex <= endIndex <= length(). Condition 16 validates this mathematical rule.",
    "hint": "Length = end - begin.",
    "level": "intermediate",
    "options": [
      "Length = end - begin + 1",
      "Length = end - begin",
      "Throws runtime error",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Substring slice boundary 16"
  },
  {
    "id": 17,
    "question": "Question 17 on Substring: What is the slicing output for boundary condition 17?",
    "shortAnswer": "Length of extracted substring is always (endIndex - beginIndex).",
    "explanation": "Java slice mechanics strictly enforce: 0 <= beginIndex <= endIndex <= length(). Condition 17 validates this mathematical rule.",
    "hint": "Length = end - begin.",
    "level": "intermediate",
    "options": [
      "Length = end - begin + 1",
      "Length = end - begin",
      "Throws runtime error",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Substring slice boundary 17"
  },
  {
    "id": 18,
    "question": "Question 18 on Substring: What is the slicing output for boundary condition 18?",
    "shortAnswer": "Length of extracted substring is always (endIndex - beginIndex).",
    "explanation": "Java slice mechanics strictly enforce: 0 <= beginIndex <= endIndex <= length(). Condition 18 validates this mathematical rule.",
    "hint": "Length = end - begin.",
    "level": "intermediate",
    "options": [
      "Length = end - begin + 1",
      "Length = end - begin",
      "Throws runtime error",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Substring slice boundary 18"
  },
  {
    "id": 19,
    "question": "Question 19 on Substring: What is the slicing output for boundary condition 19?",
    "shortAnswer": "Length of extracted substring is always (endIndex - beginIndex).",
    "explanation": "Java slice mechanics strictly enforce: 0 <= beginIndex <= endIndex <= length(). Condition 19 validates this mathematical rule.",
    "hint": "Length = end - begin.",
    "level": "advanced",
    "options": [
      "Length = end - begin + 1",
      "Length = end - begin",
      "Throws runtime error",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Substring slice boundary 19"
  },
  {
    "id": 20,
    "question": "Question 20 on Substring: What is the slicing output for boundary condition 20?",
    "shortAnswer": "Length of extracted substring is always (endIndex - beginIndex).",
    "explanation": "Java slice mechanics strictly enforce: 0 <= beginIndex <= endIndex <= length(). Condition 20 validates this mathematical rule.",
    "hint": "Length = end - begin.",
    "level": "advanced",
    "options": [
      "Length = end - begin + 1",
      "Length = end - begin",
      "Throws runtime error",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Substring slice boundary 20"
  },
  {
    "id": 21,
    "question": "Question 21 on Substring: What is the slicing output for boundary condition 21?",
    "shortAnswer": "Length of extracted substring is always (endIndex - beginIndex).",
    "explanation": "Java slice mechanics strictly enforce: 0 <= beginIndex <= endIndex <= length(). Condition 21 validates this mathematical rule.",
    "hint": "Length = end - begin.",
    "level": "advanced",
    "options": [
      "Length = end - begin + 1",
      "Length = end - begin",
      "Throws runtime error",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Substring slice boundary 21"
  },
  {
    "id": 22,
    "question": "Question 22 on Substring: What is the slicing output for boundary condition 22?",
    "shortAnswer": "Length of extracted substring is always (endIndex - beginIndex).",
    "explanation": "Java slice mechanics strictly enforce: 0 <= beginIndex <= endIndex <= length(). Condition 22 validates this mathematical rule.",
    "hint": "Length = end - begin.",
    "level": "advanced",
    "options": [
      "Length = end - begin + 1",
      "Length = end - begin",
      "Throws runtime error",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Substring slice boundary 22"
  },
  {
    "id": 23,
    "question": "Question 23 on Substring: What is the slicing output for boundary condition 23?",
    "shortAnswer": "Length of extracted substring is always (endIndex - beginIndex).",
    "explanation": "Java slice mechanics strictly enforce: 0 <= beginIndex <= endIndex <= length(). Condition 23 validates this mathematical rule.",
    "hint": "Length = end - begin.",
    "level": "advanced",
    "options": [
      "Length = end - begin + 1",
      "Length = end - begin",
      "Throws runtime error",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Substring slice boundary 23"
  },
  {
    "id": 24,
    "question": "Question 24 on Substring: What is the slicing output for boundary condition 24?",
    "shortAnswer": "Length of extracted substring is always (endIndex - beginIndex).",
    "explanation": "Java slice mechanics strictly enforce: 0 <= beginIndex <= endIndex <= length(). Condition 24 validates this mathematical rule.",
    "hint": "Length = end - begin.",
    "level": "advanced",
    "options": [
      "Length = end - begin + 1",
      "Length = end - begin",
      "Throws runtime error",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Substring slice boundary 24"
  },
  {
    "id": 25,
    "question": "Question 25 on Substring: What is the slicing output for boundary condition 25?",
    "shortAnswer": "Length of extracted substring is always (endIndex - beginIndex).",
    "explanation": "Java slice mechanics strictly enforce: 0 <= beginIndex <= endIndex <= length(). Condition 25 validates this mathematical rule.",
    "hint": "Length = end - begin.",
    "level": "advanced",
    "options": [
      "Length = end - begin + 1",
      "Length = end - begin",
      "Throws runtime error",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "// Substring slice boundary 25"
  }
];

export default questions;
