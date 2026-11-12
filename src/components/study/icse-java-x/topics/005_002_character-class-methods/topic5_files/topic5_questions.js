const questions = [
  {
    "id": 1,
    "question": "What is the return type of Character.toLowerCase?",
    "shortAnswer": "char",
    "explanation": "Character.toLowerCase returns char.",
    "hint": "Returns char",
    "level": "basic",
    "options": [
      "int",
      "boolean",
      "char",
      "String"
    ],
    "correctAnswer": 2,
    "codeExample": "char res = Character.toLowerCase(ch);"
  },
  {
    "id": 2,
    "question": "Is Character.toLowerCase a static method or instance method?",
    "shortAnswer": "Static method",
    "explanation": "It belongs to class Character and is invoked as Character.toLowerCase(ch).",
    "hint": "Static method in Character",
    "level": "basic",
    "options": [
      "Instance method",
      "Static method",
      "Abstract method",
      "Constructor"
    ],
    "correctAnswer": 1,
    "codeExample": "Character.toLowerCase(ch)"
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
    "question": "What is the output of: Character.toLowerCase('M')?",
    "shortAnswer": "m",
    "explanation": "Applying toLowerCase on 'M' evaluates to m.",
    "hint": "Evaluation check",
    "level": "basic",
    "options": [
      "m",
      "Error",
      "null",
      "0"
    ],
    "correctAnswer": 0,
    "codeExample": "Character.toLowerCase('M') -> m"
  },
  {
    "id": 5,
    "question": "What happens if a student writes ch.toLowerCase() on a primitive char?",
    "shortAnswer": "Compile error: char cannot be dereferenced.",
    "explanation": "Primitive types do not have methods; you must write Character.toLowerCase(ch).",
    "hint": "Primitive dereference error",
    "level": "basic",
    "options": [
      "Executes normally",
      "Compile error: char cannot be dereferenced",
      "Throws NullPointerException",
      "Returns false"
    ],
    "correctAnswer": 1,
    "codeExample": "ch.toLowerCase(); // COMPILE ERROR"
  },
  {
    "id": 6,
    "question": "Question 6 on Character.toLowerCase: How does toLowerCase handle character test case 6?",
    "shortAnswer": "Converts uppercase letter to lowercase char; non-letters remain unchanged.",
    "explanation": "Character.toLowerCase performs fast lookup based on Unicode/ASCII specifications. Test case 6 verifies validation accuracy.",
    "hint": "Testing toLowerCase.",
    "level": "basic",
    "options": [
      "Throws exception",
      "Converts uppercase letter to lowercase char; non-letters remain unchanged.",
      "Returns null",
      "Converts to integer"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 6: Character.toLowerCase"
  },
  {
    "id": 7,
    "question": "Question 7 on Character.toLowerCase: How does toLowerCase handle character test case 7?",
    "shortAnswer": "Converts uppercase letter to lowercase char; non-letters remain unchanged.",
    "explanation": "Character.toLowerCase performs fast lookup based on Unicode/ASCII specifications. Test case 7 verifies validation accuracy.",
    "hint": "Testing toLowerCase.",
    "level": "basic",
    "options": [
      "Throws exception",
      "Converts uppercase letter to lowercase char; non-letters remain unchanged.",
      "Returns null",
      "Converts to integer"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 7: Character.toLowerCase"
  },
  {
    "id": 8,
    "question": "Question 8 on Character.toLowerCase: How does toLowerCase handle character test case 8?",
    "shortAnswer": "Converts uppercase letter to lowercase char; non-letters remain unchanged.",
    "explanation": "Character.toLowerCase performs fast lookup based on Unicode/ASCII specifications. Test case 8 verifies validation accuracy.",
    "hint": "Testing toLowerCase.",
    "level": "basic",
    "options": [
      "Throws exception",
      "Converts uppercase letter to lowercase char; non-letters remain unchanged.",
      "Returns null",
      "Converts to integer"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 8: Character.toLowerCase"
  },
  {
    "id": 9,
    "question": "Question 9 on Character.toLowerCase: How does toLowerCase handle character test case 9?",
    "shortAnswer": "Converts uppercase letter to lowercase char; non-letters remain unchanged.",
    "explanation": "Character.toLowerCase performs fast lookup based on Unicode/ASCII specifications. Test case 9 verifies validation accuracy.",
    "hint": "Testing toLowerCase.",
    "level": "basic",
    "options": [
      "Throws exception",
      "Converts uppercase letter to lowercase char; non-letters remain unchanged.",
      "Returns null",
      "Converts to integer"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 9: Character.toLowerCase"
  },
  {
    "id": 10,
    "question": "Question 10 on Character.toLowerCase: How does toLowerCase handle character test case 10?",
    "shortAnswer": "Converts uppercase letter to lowercase char; non-letters remain unchanged.",
    "explanation": "Character.toLowerCase performs fast lookup based on Unicode/ASCII specifications. Test case 10 verifies validation accuracy.",
    "hint": "Testing toLowerCase.",
    "level": "basic",
    "options": [
      "Throws exception",
      "Converts uppercase letter to lowercase char; non-letters remain unchanged.",
      "Returns null",
      "Converts to integer"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 10: Character.toLowerCase"
  },
  {
    "id": 11,
    "question": "Question 11 on Character.toLowerCase: How does toLowerCase handle character test case 11?",
    "shortAnswer": "Converts uppercase letter to lowercase char; non-letters remain unchanged.",
    "explanation": "Character.toLowerCase performs fast lookup based on Unicode/ASCII specifications. Test case 11 verifies validation accuracy.",
    "hint": "Testing toLowerCase.",
    "level": "intermediate",
    "options": [
      "Throws exception",
      "Converts uppercase letter to lowercase char; non-letters remain unchanged.",
      "Returns null",
      "Converts to integer"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 11: Character.toLowerCase"
  },
  {
    "id": 12,
    "question": "Question 12 on Character.toLowerCase: How does toLowerCase handle character test case 12?",
    "shortAnswer": "Converts uppercase letter to lowercase char; non-letters remain unchanged.",
    "explanation": "Character.toLowerCase performs fast lookup based on Unicode/ASCII specifications. Test case 12 verifies validation accuracy.",
    "hint": "Testing toLowerCase.",
    "level": "intermediate",
    "options": [
      "Throws exception",
      "Converts uppercase letter to lowercase char; non-letters remain unchanged.",
      "Returns null",
      "Converts to integer"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 12: Character.toLowerCase"
  },
  {
    "id": 13,
    "question": "Question 13 on Character.toLowerCase: How does toLowerCase handle character test case 13?",
    "shortAnswer": "Converts uppercase letter to lowercase char; non-letters remain unchanged.",
    "explanation": "Character.toLowerCase performs fast lookup based on Unicode/ASCII specifications. Test case 13 verifies validation accuracy.",
    "hint": "Testing toLowerCase.",
    "level": "intermediate",
    "options": [
      "Throws exception",
      "Converts uppercase letter to lowercase char; non-letters remain unchanged.",
      "Returns null",
      "Converts to integer"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 13: Character.toLowerCase"
  },
  {
    "id": 14,
    "question": "Question 14 on Character.toLowerCase: How does toLowerCase handle character test case 14?",
    "shortAnswer": "Converts uppercase letter to lowercase char; non-letters remain unchanged.",
    "explanation": "Character.toLowerCase performs fast lookup based on Unicode/ASCII specifications. Test case 14 verifies validation accuracy.",
    "hint": "Testing toLowerCase.",
    "level": "intermediate",
    "options": [
      "Throws exception",
      "Converts uppercase letter to lowercase char; non-letters remain unchanged.",
      "Returns null",
      "Converts to integer"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 14: Character.toLowerCase"
  },
  {
    "id": 15,
    "question": "Question 15 on Character.toLowerCase: How does toLowerCase handle character test case 15?",
    "shortAnswer": "Converts uppercase letter to lowercase char; non-letters remain unchanged.",
    "explanation": "Character.toLowerCase performs fast lookup based on Unicode/ASCII specifications. Test case 15 verifies validation accuracy.",
    "hint": "Testing toLowerCase.",
    "level": "intermediate",
    "options": [
      "Throws exception",
      "Converts uppercase letter to lowercase char; non-letters remain unchanged.",
      "Returns null",
      "Converts to integer"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 15: Character.toLowerCase"
  },
  {
    "id": 16,
    "question": "Question 16 on Character.toLowerCase: How does toLowerCase handle character test case 16?",
    "shortAnswer": "Converts uppercase letter to lowercase char; non-letters remain unchanged.",
    "explanation": "Character.toLowerCase performs fast lookup based on Unicode/ASCII specifications. Test case 16 verifies validation accuracy.",
    "hint": "Testing toLowerCase.",
    "level": "intermediate",
    "options": [
      "Throws exception",
      "Converts uppercase letter to lowercase char; non-letters remain unchanged.",
      "Returns null",
      "Converts to integer"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 16: Character.toLowerCase"
  },
  {
    "id": 17,
    "question": "Question 17 on Character.toLowerCase: How does toLowerCase handle character test case 17?",
    "shortAnswer": "Converts uppercase letter to lowercase char; non-letters remain unchanged.",
    "explanation": "Character.toLowerCase performs fast lookup based on Unicode/ASCII specifications. Test case 17 verifies validation accuracy.",
    "hint": "Testing toLowerCase.",
    "level": "intermediate",
    "options": [
      "Throws exception",
      "Converts uppercase letter to lowercase char; non-letters remain unchanged.",
      "Returns null",
      "Converts to integer"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 17: Character.toLowerCase"
  },
  {
    "id": 18,
    "question": "Question 18 on Character.toLowerCase: How does toLowerCase handle character test case 18?",
    "shortAnswer": "Converts uppercase letter to lowercase char; non-letters remain unchanged.",
    "explanation": "Character.toLowerCase performs fast lookup based on Unicode/ASCII specifications. Test case 18 verifies validation accuracy.",
    "hint": "Testing toLowerCase.",
    "level": "intermediate",
    "options": [
      "Throws exception",
      "Converts uppercase letter to lowercase char; non-letters remain unchanged.",
      "Returns null",
      "Converts to integer"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 18: Character.toLowerCase"
  },
  {
    "id": 19,
    "question": "Question 19 on Character.toLowerCase: How does toLowerCase handle character test case 19?",
    "shortAnswer": "Converts uppercase letter to lowercase char; non-letters remain unchanged.",
    "explanation": "Character.toLowerCase performs fast lookup based on Unicode/ASCII specifications. Test case 19 verifies validation accuracy.",
    "hint": "Testing toLowerCase.",
    "level": "advanced",
    "options": [
      "Throws exception",
      "Converts uppercase letter to lowercase char; non-letters remain unchanged.",
      "Returns null",
      "Converts to integer"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 19: Character.toLowerCase"
  },
  {
    "id": 20,
    "question": "Question 20 on Character.toLowerCase: How does toLowerCase handle character test case 20?",
    "shortAnswer": "Converts uppercase letter to lowercase char; non-letters remain unchanged.",
    "explanation": "Character.toLowerCase performs fast lookup based on Unicode/ASCII specifications. Test case 20 verifies validation accuracy.",
    "hint": "Testing toLowerCase.",
    "level": "advanced",
    "options": [
      "Throws exception",
      "Converts uppercase letter to lowercase char; non-letters remain unchanged.",
      "Returns null",
      "Converts to integer"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 20: Character.toLowerCase"
  },
  {
    "id": 21,
    "question": "Question 21 on Character.toLowerCase: How does toLowerCase handle character test case 21?",
    "shortAnswer": "Converts uppercase letter to lowercase char; non-letters remain unchanged.",
    "explanation": "Character.toLowerCase performs fast lookup based on Unicode/ASCII specifications. Test case 21 verifies validation accuracy.",
    "hint": "Testing toLowerCase.",
    "level": "advanced",
    "options": [
      "Throws exception",
      "Converts uppercase letter to lowercase char; non-letters remain unchanged.",
      "Returns null",
      "Converts to integer"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 21: Character.toLowerCase"
  },
  {
    "id": 22,
    "question": "Question 22 on Character.toLowerCase: How does toLowerCase handle character test case 22?",
    "shortAnswer": "Converts uppercase letter to lowercase char; non-letters remain unchanged.",
    "explanation": "Character.toLowerCase performs fast lookup based on Unicode/ASCII specifications. Test case 22 verifies validation accuracy.",
    "hint": "Testing toLowerCase.",
    "level": "advanced",
    "options": [
      "Throws exception",
      "Converts uppercase letter to lowercase char; non-letters remain unchanged.",
      "Returns null",
      "Converts to integer"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 22: Character.toLowerCase"
  },
  {
    "id": 23,
    "question": "Question 23 on Character.toLowerCase: How does toLowerCase handle character test case 23?",
    "shortAnswer": "Converts uppercase letter to lowercase char; non-letters remain unchanged.",
    "explanation": "Character.toLowerCase performs fast lookup based on Unicode/ASCII specifications. Test case 23 verifies validation accuracy.",
    "hint": "Testing toLowerCase.",
    "level": "advanced",
    "options": [
      "Throws exception",
      "Converts uppercase letter to lowercase char; non-letters remain unchanged.",
      "Returns null",
      "Converts to integer"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 23: Character.toLowerCase"
  },
  {
    "id": 24,
    "question": "Question 24 on Character.toLowerCase: How does toLowerCase handle character test case 24?",
    "shortAnswer": "Converts uppercase letter to lowercase char; non-letters remain unchanged.",
    "explanation": "Character.toLowerCase performs fast lookup based on Unicode/ASCII specifications. Test case 24 verifies validation accuracy.",
    "hint": "Testing toLowerCase.",
    "level": "advanced",
    "options": [
      "Throws exception",
      "Converts uppercase letter to lowercase char; non-letters remain unchanged.",
      "Returns null",
      "Converts to integer"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 24: Character.toLowerCase"
  },
  {
    "id": 25,
    "question": "Question 25 on Character.toLowerCase: How does toLowerCase handle character test case 25?",
    "shortAnswer": "Converts uppercase letter to lowercase char; non-letters remain unchanged.",
    "explanation": "Character.toLowerCase performs fast lookup based on Unicode/ASCII specifications. Test case 25 verifies validation accuracy.",
    "hint": "Testing toLowerCase.",
    "level": "advanced",
    "options": [
      "Throws exception",
      "Converts uppercase letter to lowercase char; non-letters remain unchanged.",
      "Returns null",
      "Converts to integer"
    ],
    "correctAnswer": 1,
    "codeExample": "// Test case 25: Character.toLowerCase"
  }
];

export default questions;
