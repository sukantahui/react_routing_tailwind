const questions = [
  {
    "id": 1,
    "question": "What is the return type of Character.isDigit?",
    "shortAnswer": "boolean",
    "explanation": "Character.isDigit returns boolean.",
    "hint": "Returns boolean",
    "level": "basic",
    "options": [
      "int",
      "boolean",
      "char",
      "String"
    ],
    "correctAnswer": 1,
    "codeExample": "boolean res = Character.isDigit(ch);"
  },
  {
    "id": 2,
    "question": "Is Character.isDigit a static method or instance method?",
    "shortAnswer": "Static method",
    "explanation": "It belongs to class Character and is invoked as Character.isDigit(ch).",
    "hint": "Static method in Character",
    "level": "basic",
    "options": [
      "Instance method",
      "Static method",
      "Abstract method",
      "Constructor"
    ],
    "correctAnswer": 1,
    "codeExample": "Character.isDigit(ch)"
  },
  {
    "id": 3,
    "question": "In which Java package is the Character class located?",
    "shortAnswer": "java.lang",
    "explanation": "Character is in java.lang, imported automatically by the compiler.",
    "hint": "java.lang package",
    "level": "basic",
    "options": [
      "java.util",
      "java.lang",
      "java.text",
      "java.io"
    ],
    "correctAnswer": 1,
    "codeExample": "java.lang.Character"
  },
  {
    "id": 4,
    "question": "What is the output of: Character.isDigit('7')?",
    "shortAnswer": "true",
    "explanation": "Applying isDigit on '7' evaluates to true.",
    "hint": "Evaluation check",
    "level": "basic",
    "options": [
      "true",
      "Error",
      "null",
      "0"
    ],
    "correctAnswer": 0,
    "codeExample": "Character.isDigit('7') -> true"
  },
  {
    "id": 5,
    "question": "What happens if a student writes ch.isDigit() on a primitive char?",
    "shortAnswer": "Compile error: char cannot be dereferenced.",
    "explanation": "Primitive types do not have methods; you must write Character.isDigit(ch).",
    "hint": "Primitive dereference error",
    "level": "basic",
    "options": [
      "Executes normally",
      "Compile error: char cannot be dereferenced",
      "Throws NullPointerException",
      "Returns false"
    ],
    "correctAnswer": 1,
    "codeExample": "ch.isDigit(); // COMPILE ERROR"
  },
  {
    "id": 6,
    "question": "Question 6 on Character.isDigit: How does isDigit handle character test case 6?",
    "shortAnswer": "Returns true if ch is a digit between '0' and '9'; false otherwise.",
    "explanation": "Character.isDigit performs fast lookup based on Unicode/ASCII specifications. Test case 6 verifies validation accuracy.",
    "hint": "Testing isDigit.",
    "level": "basic",
    "options": [
      "Throws exception",
      "Returns true if ch is a digit between '0' and '9'; false otherwise.",
      "Returns null",
      "Converts to integer"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 6: Character.isDigit"
  },
  {
    "id": 7,
    "question": "Question 7 on Character.isDigit: How does isDigit handle character test case 7?",
    "shortAnswer": "Returns true if ch is a digit between '0' and '9'; false otherwise.",
    "explanation": "Character.isDigit performs fast lookup based on Unicode/ASCII specifications. Test case 7 verifies validation accuracy.",
    "hint": "Testing isDigit.",
    "level": "basic",
    "options": [
      "Throws exception",
      "Returns true if ch is a digit between '0' and '9'; false otherwise.",
      "Returns null",
      "Converts to integer"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 7: Character.isDigit"
  },
  {
    "id": 8,
    "question": "Question 8 on Character.isDigit: How does isDigit handle character test case 8?",
    "shortAnswer": "Returns true if ch is a digit between '0' and '9'; false otherwise.",
    "explanation": "Character.isDigit performs fast lookup based on Unicode/ASCII specifications. Test case 8 verifies validation accuracy.",
    "hint": "Testing isDigit.",
    "level": "basic",
    "options": [
      "Throws exception",
      "Returns true if ch is a digit between '0' and '9'; false otherwise.",
      "Returns null",
      "Converts to integer"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 8: Character.isDigit"
  },
  {
    "id": 9,
    "question": "Question 9 on Character.isDigit: How does isDigit handle character test case 9?",
    "shortAnswer": "Returns true if ch is a digit between '0' and '9'; false otherwise.",
    "explanation": "Character.isDigit performs fast lookup based on Unicode/ASCII specifications. Test case 9 verifies validation accuracy.",
    "hint": "Testing isDigit.",
    "level": "basic",
    "options": [
      "Throws exception",
      "Returns true if ch is a digit between '0' and '9'; false otherwise.",
      "Returns null",
      "Converts to integer"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 9: Character.isDigit"
  },
  {
    "id": 10,
    "question": "Question 10 on Character.isDigit: How does isDigit handle character test case 10?",
    "shortAnswer": "Returns true if ch is a digit between '0' and '9'; false otherwise.",
    "explanation": "Character.isDigit performs fast lookup based on Unicode/ASCII specifications. Test case 10 verifies validation accuracy.",
    "hint": "Testing isDigit.",
    "level": "basic",
    "options": [
      "Throws exception",
      "Returns true if ch is a digit between '0' and '9'; false otherwise.",
      "Returns null",
      "Converts to integer"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 10: Character.isDigit"
  },
  {
    "id": 11,
    "question": "Question 11 on Character.isDigit: How does isDigit handle character test case 11?",
    "shortAnswer": "Returns true if ch is a digit between '0' and '9'; false otherwise.",
    "explanation": "Character.isDigit performs fast lookup based on Unicode/ASCII specifications. Test case 11 verifies validation accuracy.",
    "hint": "Testing isDigit.",
    "level": "intermediate",
    "options": [
      "Throws exception",
      "Returns true if ch is a digit between '0' and '9'; false otherwise.",
      "Returns null",
      "Converts to integer"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 11: Character.isDigit"
  },
  {
    "id": 12,
    "question": "Question 12 on Character.isDigit: How does isDigit handle character test case 12?",
    "shortAnswer": "Returns true if ch is a digit between '0' and '9'; false otherwise.",
    "explanation": "Character.isDigit performs fast lookup based on Unicode/ASCII specifications. Test case 12 verifies validation accuracy.",
    "hint": "Testing isDigit.",
    "level": "intermediate",
    "options": [
      "Throws exception",
      "Returns true if ch is a digit between '0' and '9'; false otherwise.",
      "Returns null",
      "Converts to integer"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 12: Character.isDigit"
  },
  {
    "id": 13,
    "question": "Question 13 on Character.isDigit: How does isDigit handle character test case 13?",
    "shortAnswer": "Returns true if ch is a digit between '0' and '9'; false otherwise.",
    "explanation": "Character.isDigit performs fast lookup based on Unicode/ASCII specifications. Test case 13 verifies validation accuracy.",
    "hint": "Testing isDigit.",
    "level": "intermediate",
    "options": [
      "Throws exception",
      "Returns true if ch is a digit between '0' and '9'; false otherwise.",
      "Returns null",
      "Converts to integer"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 13: Character.isDigit"
  },
  {
    "id": 14,
    "question": "Question 14 on Character.isDigit: How does isDigit handle character test case 14?",
    "shortAnswer": "Returns true if ch is a digit between '0' and '9'; false otherwise.",
    "explanation": "Character.isDigit performs fast lookup based on Unicode/ASCII specifications. Test case 14 verifies validation accuracy.",
    "hint": "Testing isDigit.",
    "level": "intermediate",
    "options": [
      "Throws exception",
      "Returns true if ch is a digit between '0' and '9'; false otherwise.",
      "Returns null",
      "Converts to integer"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 14: Character.isDigit"
  },
  {
    "id": 15,
    "question": "Question 15 on Character.isDigit: How does isDigit handle character test case 15?",
    "shortAnswer": "Returns true if ch is a digit between '0' and '9'; false otherwise.",
    "explanation": "Character.isDigit performs fast lookup based on Unicode/ASCII specifications. Test case 15 verifies validation accuracy.",
    "hint": "Testing isDigit.",
    "level": "intermediate",
    "options": [
      "Throws exception",
      "Returns true if ch is a digit between '0' and '9'; false otherwise.",
      "Returns null",
      "Converts to integer"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 15: Character.isDigit"
  },
  {
    "id": 16,
    "question": "Question 16 on Character.isDigit: How does isDigit handle character test case 16?",
    "shortAnswer": "Returns true if ch is a digit between '0' and '9'; false otherwise.",
    "explanation": "Character.isDigit performs fast lookup based on Unicode/ASCII specifications. Test case 16 verifies validation accuracy.",
    "hint": "Testing isDigit.",
    "level": "intermediate",
    "options": [
      "Throws exception",
      "Returns true if ch is a digit between '0' and '9'; false otherwise.",
      "Returns null",
      "Converts to integer"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 16: Character.isDigit"
  },
  {
    "id": 17,
    "question": "Question 17 on Character.isDigit: How does isDigit handle character test case 17?",
    "shortAnswer": "Returns true if ch is a digit between '0' and '9'; false otherwise.",
    "explanation": "Character.isDigit performs fast lookup based on Unicode/ASCII specifications. Test case 17 verifies validation accuracy.",
    "hint": "Testing isDigit.",
    "level": "intermediate",
    "options": [
      "Throws exception",
      "Returns true if ch is a digit between '0' and '9'; false otherwise.",
      "Returns null",
      "Converts to integer"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 17: Character.isDigit"
  },
  {
    "id": 18,
    "question": "Question 18 on Character.isDigit: How does isDigit handle character test case 18?",
    "shortAnswer": "Returns true if ch is a digit between '0' and '9'; false otherwise.",
    "explanation": "Character.isDigit performs fast lookup based on Unicode/ASCII specifications. Test case 18 verifies validation accuracy.",
    "hint": "Testing isDigit.",
    "level": "intermediate",
    "options": [
      "Throws exception",
      "Returns true if ch is a digit between '0' and '9'; false otherwise.",
      "Returns null",
      "Converts to integer"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 18: Character.isDigit"
  },
  {
    "id": 19,
    "question": "Question 19 on Character.isDigit: How does isDigit handle character test case 19?",
    "shortAnswer": "Returns true if ch is a digit between '0' and '9'; false otherwise.",
    "explanation": "Character.isDigit performs fast lookup based on Unicode/ASCII specifications. Test case 19 verifies validation accuracy.",
    "hint": "Testing isDigit.",
    "level": "advanced",
    "options": [
      "Throws exception",
      "Returns true if ch is a digit between '0' and '9'; false otherwise.",
      "Returns null",
      "Converts to integer"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 19: Character.isDigit"
  },
  {
    "id": 20,
    "question": "Question 20 on Character.isDigit: How does isDigit handle character test case 20?",
    "shortAnswer": "Returns true if ch is a digit between '0' and '9'; false otherwise.",
    "explanation": "Character.isDigit performs fast lookup based on Unicode/ASCII specifications. Test case 20 verifies validation accuracy.",
    "hint": "Testing isDigit.",
    "level": "advanced",
    "options": [
      "Throws exception",
      "Returns true if ch is a digit between '0' and '9'; false otherwise.",
      "Returns null",
      "Converts to integer"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 20: Character.isDigit"
  },
  {
    "id": 21,
    "question": "Question 21 on Character.isDigit: How does isDigit handle character test case 21?",
    "shortAnswer": "Returns true if ch is a digit between '0' and '9'; false otherwise.",
    "explanation": "Character.isDigit performs fast lookup based on Unicode/ASCII specifications. Test case 21 verifies validation accuracy.",
    "hint": "Testing isDigit.",
    "level": "advanced",
    "options": [
      "Throws exception",
      "Returns true if ch is a digit between '0' and '9'; false otherwise.",
      "Returns null",
      "Converts to integer"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 21: Character.isDigit"
  },
  {
    "id": 22,
    "question": "Question 22 on Character.isDigit: How does isDigit handle character test case 22?",
    "shortAnswer": "Returns true if ch is a digit between '0' and '9'; false otherwise.",
    "explanation": "Character.isDigit performs fast lookup based on Unicode/ASCII specifications. Test case 22 verifies validation accuracy.",
    "hint": "Testing isDigit.",
    "level": "advanced",
    "options": [
      "Throws exception",
      "Returns true if ch is a digit between '0' and '9'; false otherwise.",
      "Returns null",
      "Converts to integer"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 22: Character.isDigit"
  },
  {
    "id": 23,
    "question": "Question 23 on Character.isDigit: How does isDigit handle character test case 23?",
    "shortAnswer": "Returns true if ch is a digit between '0' and '9'; false otherwise.",
    "explanation": "Character.isDigit performs fast lookup based on Unicode/ASCII specifications. Test case 23 verifies validation accuracy.",
    "hint": "Testing isDigit.",
    "level": "advanced",
    "options": [
      "Throws exception",
      "Returns true if ch is a digit between '0' and '9'; false otherwise.",
      "Returns null",
      "Converts to integer"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 23: Character.isDigit"
  },
  {
    "id": 24,
    "question": "Question 24 on Character.isDigit: How does isDigit handle character test case 24?",
    "shortAnswer": "Returns true if ch is a digit between '0' and '9'; false otherwise.",
    "explanation": "Character.isDigit performs fast lookup based on Unicode/ASCII specifications. Test case 24 verifies validation accuracy.",
    "hint": "Testing isDigit.",
    "level": "advanced",
    "options": [
      "Throws exception",
      "Returns true if ch is a digit between '0' and '9'; false otherwise.",
      "Returns null",
      "Converts to integer"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 24: Character.isDigit"
  },
  {
    "id": 25,
    "question": "Question 25 on Character.isDigit: How does isDigit handle character test case 25?",
    "shortAnswer": "Returns true if ch is a digit between '0' and '9'; false otherwise.",
    "explanation": "Character.isDigit performs fast lookup based on Unicode/ASCII specifications. Test case 25 verifies validation accuracy.",
    "hint": "Testing isDigit.",
    "level": "advanced",
    "options": [
      "Throws exception",
      "Returns true if ch is a digit between '0' and '9'; false otherwise.",
      "Returns null",
      "Converts to integer"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 25: Character.isDigit"
  }
];

export default questions;
