const questions = [
  {
    "id": 1,
    "question": "What does toUpperCase() return?",
    "shortAnswer": "A new String with all lowercase letters converted to uppercase.",
    "explanation": "Returns new uppercase String.",
    "hint": "Returns String",
    "level": "basic",
    "options": [
      "void",
      "String",
      "char",
      "char[]"
    ],
    "correctAnswer": 1,
    "codeExample": "String u = s.toUpperCase();"
  },
  {
    "id": 2,
    "question": "What does toLowerCase() return?",
    "shortAnswer": "A new String with all uppercase letters converted to lowercase.",
    "explanation": "Returns new lowercase String.",
    "hint": "Returns String",
    "level": "basic",
    "options": [
      "void",
      "String",
      "char",
      "int"
    ],
    "correctAnswer": 1,
    "codeExample": "String l = s.toLowerCase();"
  },
  {
    "id": 3,
    "question": "What is the mathematical ASCII shift for uppercase to lowercase?",
    "shortAnswer": "Add 32 (ASCII 'A' 65 + 32 = 97 'a').",
    "explanation": "Adding 32 shifts uppercase to lowercase in ASCII.",
    "hint": "Add 32",
    "level": "basic",
    "options": [
      "Subtract 32",
      "Add 32",
      "Multiply 2",
      "Subtract 64"
    ],
    "correctAnswer": 1,
    "codeExample": "'A' + 32 = 'a'"
  },
  {
    "id": 4,
    "question": "What happens to digits and punctuation in toLowerCase()?",
    "shortAnswer": "They remain completely unchanged.",
    "explanation": "Only alphabetical letters 'A'-'Z' are transformed.",
    "hint": "Non-letters unaffected",
    "level": "basic",
    "options": [
      "Deleted",
      "Unchanged",
      "Replaced with space",
      "Error"
    ],
    "correctAnswer": 1,
    "codeExample": "\"123!\".toLowerCase() -> \"123!\""
  },
  {
    "id": 5,
    "question": "Does toLowerCase() modify the original String?",
    "shortAnswer": "No, String is immutable; a new String object is returned.",
    "explanation": "Original string remains intact.",
    "hint": "Immutability principle",
    "level": "basic",
    "options": [
      "Yes",
      "No, Strings are immutable",
      "Only in heap",
      "Only in Java 17"
    ],
    "correctAnswer": 1,
    "codeExample": "s is unchanged"
  },
  {
    "id": 6,
    "question": "Question 6 on Case Conversion: What is the resulting String for input transformation 6?",
    "shortAnswer": "Case conversion preserves length, numbers, and symbols while transforming alphabetic characters.",
    "explanation": "In ICSE examinations, case standardization is essential for palindrome, frequency, and Pig Latin programs. Problem 6 highlights case transformation.",
    "hint": "Alphabetical transformation with preserved symbols.",
    "level": "basic",
    "options": [
      "Symbols are converted to numbers",
      "Letters change case; symbols and length remain invariant",
      "String is reversed",
      "Spaces are stripped"
    ],
    "correctAnswer": 1,
    "codeExample": "// Case conversion scenario 6"
  },
  {
    "id": 7,
    "question": "Question 7 on Case Conversion: What is the resulting String for input transformation 7?",
    "shortAnswer": "Case conversion preserves length, numbers, and symbols while transforming alphabetic characters.",
    "explanation": "In ICSE examinations, case standardization is essential for palindrome, frequency, and Pig Latin programs. Problem 7 highlights case transformation.",
    "hint": "Alphabetical transformation with preserved symbols.",
    "level": "basic",
    "options": [
      "Symbols are converted to numbers",
      "Letters change case; symbols and length remain invariant",
      "String is reversed",
      "Spaces are stripped"
    ],
    "correctAnswer": 1,
    "codeExample": "// Case conversion scenario 7"
  },
  {
    "id": 8,
    "question": "Question 8 on Case Conversion: What is the resulting String for input transformation 8?",
    "shortAnswer": "Case conversion preserves length, numbers, and symbols while transforming alphabetic characters.",
    "explanation": "In ICSE examinations, case standardization is essential for palindrome, frequency, and Pig Latin programs. Problem 8 highlights case transformation.",
    "hint": "Alphabetical transformation with preserved symbols.",
    "level": "basic",
    "options": [
      "Symbols are converted to numbers",
      "Letters change case; symbols and length remain invariant",
      "String is reversed",
      "Spaces are stripped"
    ],
    "correctAnswer": 1,
    "codeExample": "// Case conversion scenario 8"
  },
  {
    "id": 9,
    "question": "Question 9 on Case Conversion: What is the resulting String for input transformation 9?",
    "shortAnswer": "Case conversion preserves length, numbers, and symbols while transforming alphabetic characters.",
    "explanation": "In ICSE examinations, case standardization is essential for palindrome, frequency, and Pig Latin programs. Problem 9 highlights case transformation.",
    "hint": "Alphabetical transformation with preserved symbols.",
    "level": "basic",
    "options": [
      "Symbols are converted to numbers",
      "Letters change case; symbols and length remain invariant",
      "String is reversed",
      "Spaces are stripped"
    ],
    "correctAnswer": 1,
    "codeExample": "// Case conversion scenario 9"
  },
  {
    "id": 10,
    "question": "Question 10 on Case Conversion: What is the resulting String for input transformation 10?",
    "shortAnswer": "Case conversion preserves length, numbers, and symbols while transforming alphabetic characters.",
    "explanation": "In ICSE examinations, case standardization is essential for palindrome, frequency, and Pig Latin programs. Problem 10 highlights case transformation.",
    "hint": "Alphabetical transformation with preserved symbols.",
    "level": "basic",
    "options": [
      "Symbols are converted to numbers",
      "Letters change case; symbols and length remain invariant",
      "String is reversed",
      "Spaces are stripped"
    ],
    "correctAnswer": 1,
    "codeExample": "// Case conversion scenario 10"
  },
  {
    "id": 11,
    "question": "Question 11 on Case Conversion: What is the resulting String for input transformation 11?",
    "shortAnswer": "Case conversion preserves length, numbers, and symbols while transforming alphabetic characters.",
    "explanation": "In ICSE examinations, case standardization is essential for palindrome, frequency, and Pig Latin programs. Problem 11 highlights case transformation.",
    "hint": "Alphabetical transformation with preserved symbols.",
    "level": "basic",
    "options": [
      "Symbols are converted to numbers",
      "Letters change case; symbols and length remain invariant",
      "String is reversed",
      "Spaces are stripped"
    ],
    "correctAnswer": 1,
    "codeExample": "// Case conversion scenario 11"
  },
  {
    "id": 12,
    "question": "Question 12 on Case Conversion: What is the resulting String for input transformation 12?",
    "shortAnswer": "Case conversion preserves length, numbers, and symbols while transforming alphabetic characters.",
    "explanation": "In ICSE examinations, case standardization is essential for palindrome, frequency, and Pig Latin programs. Problem 12 highlights case transformation.",
    "hint": "Alphabetical transformation with preserved symbols.",
    "level": "basic",
    "options": [
      "Symbols are converted to numbers",
      "Letters change case; symbols and length remain invariant",
      "String is reversed",
      "Spaces are stripped"
    ],
    "correctAnswer": 1,
    "codeExample": "// Case conversion scenario 12"
  },
  {
    "id": 13,
    "question": "Question 13 on Case Conversion: What is the resulting String for input transformation 13?",
    "shortAnswer": "Case conversion preserves length, numbers, and symbols while transforming alphabetic characters.",
    "explanation": "In ICSE examinations, case standardization is essential for palindrome, frequency, and Pig Latin programs. Problem 13 highlights case transformation.",
    "hint": "Alphabetical transformation with preserved symbols.",
    "level": "basic",
    "options": [
      "Symbols are converted to numbers",
      "Letters change case; symbols and length remain invariant",
      "String is reversed",
      "Spaces are stripped"
    ],
    "correctAnswer": 1,
    "codeExample": "// Case conversion scenario 13"
  },
  {
    "id": 14,
    "question": "Question 14 on Case Conversion: What is the resulting String for input transformation 14?",
    "shortAnswer": "Case conversion preserves length, numbers, and symbols while transforming alphabetic characters.",
    "explanation": "In ICSE examinations, case standardization is essential for palindrome, frequency, and Pig Latin programs. Problem 14 highlights case transformation.",
    "hint": "Alphabetical transformation with preserved symbols.",
    "level": "basic",
    "options": [
      "Symbols are converted to numbers",
      "Letters change case; symbols and length remain invariant",
      "String is reversed",
      "Spaces are stripped"
    ],
    "correctAnswer": 1,
    "codeExample": "// Case conversion scenario 14"
  },
  {
    "id": 15,
    "question": "Question 15 on Case Conversion: What is the resulting String for input transformation 15?",
    "shortAnswer": "Case conversion preserves length, numbers, and symbols while transforming alphabetic characters.",
    "explanation": "In ICSE examinations, case standardization is essential for palindrome, frequency, and Pig Latin programs. Problem 15 highlights case transformation.",
    "hint": "Alphabetical transformation with preserved symbols.",
    "level": "basic",
    "options": [
      "Symbols are converted to numbers",
      "Letters change case; symbols and length remain invariant",
      "String is reversed",
      "Spaces are stripped"
    ],
    "correctAnswer": 1,
    "codeExample": "// Case conversion scenario 15"
  },
  {
    "id": 16,
    "question": "Question 16 on Case Conversion: What is the resulting String for input transformation 16?",
    "shortAnswer": "Case conversion preserves length, numbers, and symbols while transforming alphabetic characters.",
    "explanation": "In ICSE examinations, case standardization is essential for palindrome, frequency, and Pig Latin programs. Problem 16 highlights case transformation.",
    "hint": "Alphabetical transformation with preserved symbols.",
    "level": "basic",
    "options": [
      "Symbols are converted to numbers",
      "Letters change case; symbols and length remain invariant",
      "String is reversed",
      "Spaces are stripped"
    ],
    "correctAnswer": 1,
    "codeExample": "// Case conversion scenario 16"
  },
  {
    "id": 17,
    "question": "Question 17 on Case Conversion: What is the resulting String for input transformation 17?",
    "shortAnswer": "Case conversion preserves length, numbers, and symbols while transforming alphabetic characters.",
    "explanation": "In ICSE examinations, case standardization is essential for palindrome, frequency, and Pig Latin programs. Problem 17 highlights case transformation.",
    "hint": "Alphabetical transformation with preserved symbols.",
    "level": "basic",
    "options": [
      "Symbols are converted to numbers",
      "Letters change case; symbols and length remain invariant",
      "String is reversed",
      "Spaces are stripped"
    ],
    "correctAnswer": 1,
    "codeExample": "// Case conversion scenario 17"
  },
  {
    "id": 18,
    "question": "Question 18 on Case Conversion: What is the resulting String for input transformation 18?",
    "shortAnswer": "Case conversion preserves length, numbers, and symbols while transforming alphabetic characters.",
    "explanation": "In ICSE examinations, case standardization is essential for palindrome, frequency, and Pig Latin programs. Problem 18 highlights case transformation.",
    "hint": "Alphabetical transformation with preserved symbols.",
    "level": "basic",
    "options": [
      "Symbols are converted to numbers",
      "Letters change case; symbols and length remain invariant",
      "String is reversed",
      "Spaces are stripped"
    ],
    "correctAnswer": 1,
    "codeExample": "// Case conversion scenario 18"
  },
  {
    "id": 19,
    "question": "Question 19 on Case Conversion: What is the resulting String for input transformation 19?",
    "shortAnswer": "Case conversion preserves length, numbers, and symbols while transforming alphabetic characters.",
    "explanation": "In ICSE examinations, case standardization is essential for palindrome, frequency, and Pig Latin programs. Problem 19 highlights case transformation.",
    "hint": "Alphabetical transformation with preserved symbols.",
    "level": "advanced",
    "options": [
      "Symbols are converted to numbers",
      "Letters change case; symbols and length remain invariant",
      "String is reversed",
      "Spaces are stripped"
    ],
    "correctAnswer": 1,
    "codeExample": "// Case conversion scenario 19"
  },
  {
    "id": 20,
    "question": "Question 20 on Case Conversion: What is the resulting String for input transformation 20?",
    "shortAnswer": "Case conversion preserves length, numbers, and symbols while transforming alphabetic characters.",
    "explanation": "In ICSE examinations, case standardization is essential for palindrome, frequency, and Pig Latin programs. Problem 20 highlights case transformation.",
    "hint": "Alphabetical transformation with preserved symbols.",
    "level": "advanced",
    "options": [
      "Symbols are converted to numbers",
      "Letters change case; symbols and length remain invariant",
      "String is reversed",
      "Spaces are stripped"
    ],
    "correctAnswer": 1,
    "codeExample": "// Case conversion scenario 20"
  },
  {
    "id": 21,
    "question": "Question 21 on Case Conversion: What is the resulting String for input transformation 21?",
    "shortAnswer": "Case conversion preserves length, numbers, and symbols while transforming alphabetic characters.",
    "explanation": "In ICSE examinations, case standardization is essential for palindrome, frequency, and Pig Latin programs. Problem 21 highlights case transformation.",
    "hint": "Alphabetical transformation with preserved symbols.",
    "level": "advanced",
    "options": [
      "Symbols are converted to numbers",
      "Letters change case; symbols and length remain invariant",
      "String is reversed",
      "Spaces are stripped"
    ],
    "correctAnswer": 1,
    "codeExample": "// Case conversion scenario 21"
  },
  {
    "id": 22,
    "question": "Question 22 on Case Conversion: What is the resulting String for input transformation 22?",
    "shortAnswer": "Case conversion preserves length, numbers, and symbols while transforming alphabetic characters.",
    "explanation": "In ICSE examinations, case standardization is essential for palindrome, frequency, and Pig Latin programs. Problem 22 highlights case transformation.",
    "hint": "Alphabetical transformation with preserved symbols.",
    "level": "advanced",
    "options": [
      "Symbols are converted to numbers",
      "Letters change case; symbols and length remain invariant",
      "String is reversed",
      "Spaces are stripped"
    ],
    "correctAnswer": 1,
    "codeExample": "// Case conversion scenario 22"
  },
  {
    "id": 23,
    "question": "Question 23 on Case Conversion: What is the resulting String for input transformation 23?",
    "shortAnswer": "Case conversion preserves length, numbers, and symbols while transforming alphabetic characters.",
    "explanation": "In ICSE examinations, case standardization is essential for palindrome, frequency, and Pig Latin programs. Problem 23 highlights case transformation.",
    "hint": "Alphabetical transformation with preserved symbols.",
    "level": "advanced",
    "options": [
      "Symbols are converted to numbers",
      "Letters change case; symbols and length remain invariant",
      "String is reversed",
      "Spaces are stripped"
    ],
    "correctAnswer": 1,
    "codeExample": "// Case conversion scenario 23"
  },
  {
    "id": 24,
    "question": "Question 24 on Case Conversion: What is the resulting String for input transformation 24?",
    "shortAnswer": "Case conversion preserves length, numbers, and symbols while transforming alphabetic characters.",
    "explanation": "In ICSE examinations, case standardization is essential for palindrome, frequency, and Pig Latin programs. Problem 24 highlights case transformation.",
    "hint": "Alphabetical transformation with preserved symbols.",
    "level": "advanced",
    "options": [
      "Symbols are converted to numbers",
      "Letters change case; symbols and length remain invariant",
      "String is reversed",
      "Spaces are stripped"
    ],
    "correctAnswer": 1,
    "codeExample": "// Case conversion scenario 24"
  },
  {
    "id": 25,
    "question": "Question 25 on Case Conversion: What is the resulting String for input transformation 25?",
    "shortAnswer": "Case conversion preserves length, numbers, and symbols while transforming alphabetic characters.",
    "explanation": "In ICSE examinations, case standardization is essential for palindrome, frequency, and Pig Latin programs. Problem 25 highlights case transformation.",
    "hint": "Alphabetical transformation with preserved symbols.",
    "level": "advanced",
    "options": [
      "Symbols are converted to numbers",
      "Letters change case; symbols and length remain invariant",
      "String is reversed",
      "Spaces are stripped"
    ],
    "correctAnswer": 1,
    "codeExample": "// Case conversion scenario 25"
  }
];

export default questions;
