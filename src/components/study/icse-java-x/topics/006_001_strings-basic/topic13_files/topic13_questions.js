const questions = [
  {
    "id": 1,
    "question": "What does indexOf(char ch) return when the character is absent?",
    "shortAnswer": "-1",
    "explanation": "Sentinel value -1 indicates character was not found.",
    "hint": "Returns -1",
    "level": "basic",
    "options": [
      "0",
      "-1",
      "null",
      "Throws Exception"
    ],
    "correctAnswer": 1,
    "codeExample": "s.indexOf('Z') -> -1"
  },
  {
    "id": 2,
    "question": "What does lastIndexOf(char ch) return?",
    "shortAnswer": "Index of the LAST occurrence of ch, or -1 if absent.",
    "explanation": "Right-to-left scan.",
    "hint": "Last occurrence index",
    "level": "basic",
    "options": [
      "First occurrence",
      "Index of last occurrence (or -1)",
      "Total occurrences",
      "Boolean flag"
    ],
    "correctAnswer": 1,
    "codeExample": "s.lastIndexOf('a')"
  },
  {
    "id": 3,
    "question": "What is the return type of contains(CharSequence s)?",
    "shortAnswer": "boolean",
    "explanation": "Returns true if sequence is present anywhere in string; false otherwise.",
    "hint": "Returns boolean",
    "level": "basic",
    "options": [
      "int",
      "boolean",
      "String",
      "char"
    ],
    "correctAnswer": 1,
    "codeExample": "boolean has = s.contains(\"test\");"
  },
  {
    "id": 4,
    "question": "What does startsWith(String prefix) return for \"Barrackpore\".startsWith(\"Bar\")?",
    "shortAnswer": "true",
    "explanation": "Prefix matches beginning of string.",
    "hint": "Prefix match",
    "level": "basic",
    "options": [
      "true",
      "false",
      "0",
      "-1"
    ],
    "correctAnswer": 0,
    "codeExample": "true"
  },
  {
    "id": 5,
    "question": "What does endsWith(String suffix) return for \"photo.jpg\".endsWith(\".jpg\")?",
    "shortAnswer": "true",
    "explanation": "Suffix matches end of string.",
    "hint": "Suffix match",
    "level": "basic",
    "options": [
      "true",
      "false",
      "0",
      "null"
    ],
    "correctAnswer": 0,
    "codeExample": "true"
  },
  {
    "id": 6,
    "question": "Question 6 on String Searching: What value is returned when searching under condition 6?",
    "shortAnswer": "indexOf/lastIndexOf return integer indices (or -1); contains/startsWith/endsWith return booleans.",
    "explanation": "String searching methods form the backbone of ICSE Section B text processing programs. Condition 6 reviews search return semantics.",
    "hint": "Index search vs boolean predicate.",
    "level": "basic",
    "options": [
      "Always returns boolean",
      "Integer index or boolean match indicator",
      "Always returns char",
      "Throws exception on failure"
    ],
    "correctAnswer": 1,
    "codeExample": "// String search condition 6"
  },
  {
    "id": 7,
    "question": "Question 7 on String Searching: What value is returned when searching under condition 7?",
    "shortAnswer": "indexOf/lastIndexOf return integer indices (or -1); contains/startsWith/endsWith return booleans.",
    "explanation": "String searching methods form the backbone of ICSE Section B text processing programs. Condition 7 reviews search return semantics.",
    "hint": "Index search vs boolean predicate.",
    "level": "basic",
    "options": [
      "Always returns boolean",
      "Integer index or boolean match indicator",
      "Always returns char",
      "Throws exception on failure"
    ],
    "correctAnswer": 1,
    "codeExample": "// String search condition 7"
  },
  {
    "id": 8,
    "question": "Question 8 on String Searching: What value is returned when searching under condition 8?",
    "shortAnswer": "indexOf/lastIndexOf return integer indices (or -1); contains/startsWith/endsWith return booleans.",
    "explanation": "String searching methods form the backbone of ICSE Section B text processing programs. Condition 8 reviews search return semantics.",
    "hint": "Index search vs boolean predicate.",
    "level": "basic",
    "options": [
      "Always returns boolean",
      "Integer index or boolean match indicator",
      "Always returns char",
      "Throws exception on failure"
    ],
    "correctAnswer": 1,
    "codeExample": "// String search condition 8"
  },
  {
    "id": 9,
    "question": "Question 9 on String Searching: What value is returned when searching under condition 9?",
    "shortAnswer": "indexOf/lastIndexOf return integer indices (or -1); contains/startsWith/endsWith return booleans.",
    "explanation": "String searching methods form the backbone of ICSE Section B text processing programs. Condition 9 reviews search return semantics.",
    "hint": "Index search vs boolean predicate.",
    "level": "basic",
    "options": [
      "Always returns boolean",
      "Integer index or boolean match indicator",
      "Always returns char",
      "Throws exception on failure"
    ],
    "correctAnswer": 1,
    "codeExample": "// String search condition 9"
  },
  {
    "id": 10,
    "question": "Question 10 on String Searching: What value is returned when searching under condition 10?",
    "shortAnswer": "indexOf/lastIndexOf return integer indices (or -1); contains/startsWith/endsWith return booleans.",
    "explanation": "String searching methods form the backbone of ICSE Section B text processing programs. Condition 10 reviews search return semantics.",
    "hint": "Index search vs boolean predicate.",
    "level": "basic",
    "options": [
      "Always returns boolean",
      "Integer index or boolean match indicator",
      "Always returns char",
      "Throws exception on failure"
    ],
    "correctAnswer": 1,
    "codeExample": "// String search condition 10"
  },
  {
    "id": 11,
    "question": "Question 11 on String Searching: What value is returned when searching under condition 11?",
    "shortAnswer": "indexOf/lastIndexOf return integer indices (or -1); contains/startsWith/endsWith return booleans.",
    "explanation": "String searching methods form the backbone of ICSE Section B text processing programs. Condition 11 reviews search return semantics.",
    "hint": "Index search vs boolean predicate.",
    "level": "basic",
    "options": [
      "Always returns boolean",
      "Integer index or boolean match indicator",
      "Always returns char",
      "Throws exception on failure"
    ],
    "correctAnswer": 1,
    "codeExample": "// String search condition 11"
  },
  {
    "id": 12,
    "question": "Question 12 on String Searching: What value is returned when searching under condition 12?",
    "shortAnswer": "indexOf/lastIndexOf return integer indices (or -1); contains/startsWith/endsWith return booleans.",
    "explanation": "String searching methods form the backbone of ICSE Section B text processing programs. Condition 12 reviews search return semantics.",
    "hint": "Index search vs boolean predicate.",
    "level": "basic",
    "options": [
      "Always returns boolean",
      "Integer index or boolean match indicator",
      "Always returns char",
      "Throws exception on failure"
    ],
    "correctAnswer": 1,
    "codeExample": "// String search condition 12"
  },
  {
    "id": 13,
    "question": "Question 13 on String Searching: What value is returned when searching under condition 13?",
    "shortAnswer": "indexOf/lastIndexOf return integer indices (or -1); contains/startsWith/endsWith return booleans.",
    "explanation": "String searching methods form the backbone of ICSE Section B text processing programs. Condition 13 reviews search return semantics.",
    "hint": "Index search vs boolean predicate.",
    "level": "basic",
    "options": [
      "Always returns boolean",
      "Integer index or boolean match indicator",
      "Always returns char",
      "Throws exception on failure"
    ],
    "correctAnswer": 1,
    "codeExample": "// String search condition 13"
  },
  {
    "id": 14,
    "question": "Question 14 on String Searching: What value is returned when searching under condition 14?",
    "shortAnswer": "indexOf/lastIndexOf return integer indices (or -1); contains/startsWith/endsWith return booleans.",
    "explanation": "String searching methods form the backbone of ICSE Section B text processing programs. Condition 14 reviews search return semantics.",
    "hint": "Index search vs boolean predicate.",
    "level": "basic",
    "options": [
      "Always returns boolean",
      "Integer index or boolean match indicator",
      "Always returns char",
      "Throws exception on failure"
    ],
    "correctAnswer": 1,
    "codeExample": "// String search condition 14"
  },
  {
    "id": 15,
    "question": "Question 15 on String Searching: What value is returned when searching under condition 15?",
    "shortAnswer": "indexOf/lastIndexOf return integer indices (or -1); contains/startsWith/endsWith return booleans.",
    "explanation": "String searching methods form the backbone of ICSE Section B text processing programs. Condition 15 reviews search return semantics.",
    "hint": "Index search vs boolean predicate.",
    "level": "basic",
    "options": [
      "Always returns boolean",
      "Integer index or boolean match indicator",
      "Always returns char",
      "Throws exception on failure"
    ],
    "correctAnswer": 1,
    "codeExample": "// String search condition 15"
  },
  {
    "id": 16,
    "question": "Question 16 on String Searching: What value is returned when searching under condition 16?",
    "shortAnswer": "indexOf/lastIndexOf return integer indices (or -1); contains/startsWith/endsWith return booleans.",
    "explanation": "String searching methods form the backbone of ICSE Section B text processing programs. Condition 16 reviews search return semantics.",
    "hint": "Index search vs boolean predicate.",
    "level": "basic",
    "options": [
      "Always returns boolean",
      "Integer index or boolean match indicator",
      "Always returns char",
      "Throws exception on failure"
    ],
    "correctAnswer": 1,
    "codeExample": "// String search condition 16"
  },
  {
    "id": 17,
    "question": "Question 17 on String Searching: What value is returned when searching under condition 17?",
    "shortAnswer": "indexOf/lastIndexOf return integer indices (or -1); contains/startsWith/endsWith return booleans.",
    "explanation": "String searching methods form the backbone of ICSE Section B text processing programs. Condition 17 reviews search return semantics.",
    "hint": "Index search vs boolean predicate.",
    "level": "basic",
    "options": [
      "Always returns boolean",
      "Integer index or boolean match indicator",
      "Always returns char",
      "Throws exception on failure"
    ],
    "correctAnswer": 1,
    "codeExample": "// String search condition 17"
  },
  {
    "id": 18,
    "question": "Question 18 on String Searching: What value is returned when searching under condition 18?",
    "shortAnswer": "indexOf/lastIndexOf return integer indices (or -1); contains/startsWith/endsWith return booleans.",
    "explanation": "String searching methods form the backbone of ICSE Section B text processing programs. Condition 18 reviews search return semantics.",
    "hint": "Index search vs boolean predicate.",
    "level": "basic",
    "options": [
      "Always returns boolean",
      "Integer index or boolean match indicator",
      "Always returns char",
      "Throws exception on failure"
    ],
    "correctAnswer": 1,
    "codeExample": "// String search condition 18"
  },
  {
    "id": 19,
    "question": "Question 19 on String Searching: What value is returned when searching under condition 19?",
    "shortAnswer": "indexOf/lastIndexOf return integer indices (or -1); contains/startsWith/endsWith return booleans.",
    "explanation": "String searching methods form the backbone of ICSE Section B text processing programs. Condition 19 reviews search return semantics.",
    "hint": "Index search vs boolean predicate.",
    "level": "advanced",
    "options": [
      "Always returns boolean",
      "Integer index or boolean match indicator",
      "Always returns char",
      "Throws exception on failure"
    ],
    "correctAnswer": 1,
    "codeExample": "// String search condition 19"
  },
  {
    "id": 20,
    "question": "Question 20 on String Searching: What value is returned when searching under condition 20?",
    "shortAnswer": "indexOf/lastIndexOf return integer indices (or -1); contains/startsWith/endsWith return booleans.",
    "explanation": "String searching methods form the backbone of ICSE Section B text processing programs. Condition 20 reviews search return semantics.",
    "hint": "Index search vs boolean predicate.",
    "level": "advanced",
    "options": [
      "Always returns boolean",
      "Integer index or boolean match indicator",
      "Always returns char",
      "Throws exception on failure"
    ],
    "correctAnswer": 1,
    "codeExample": "// String search condition 20"
  },
  {
    "id": 21,
    "question": "Question 21 on String Searching: What value is returned when searching under condition 21?",
    "shortAnswer": "indexOf/lastIndexOf return integer indices (or -1); contains/startsWith/endsWith return booleans.",
    "explanation": "String searching methods form the backbone of ICSE Section B text processing programs. Condition 21 reviews search return semantics.",
    "hint": "Index search vs boolean predicate.",
    "level": "advanced",
    "options": [
      "Always returns boolean",
      "Integer index or boolean match indicator",
      "Always returns char",
      "Throws exception on failure"
    ],
    "correctAnswer": 1,
    "codeExample": "// String search condition 21"
  },
  {
    "id": 22,
    "question": "Question 22 on String Searching: What value is returned when searching under condition 22?",
    "shortAnswer": "indexOf/lastIndexOf return integer indices (or -1); contains/startsWith/endsWith return booleans.",
    "explanation": "String searching methods form the backbone of ICSE Section B text processing programs. Condition 22 reviews search return semantics.",
    "hint": "Index search vs boolean predicate.",
    "level": "advanced",
    "options": [
      "Always returns boolean",
      "Integer index or boolean match indicator",
      "Always returns char",
      "Throws exception on failure"
    ],
    "correctAnswer": 1,
    "codeExample": "// String search condition 22"
  },
  {
    "id": 23,
    "question": "Question 23 on String Searching: What value is returned when searching under condition 23?",
    "shortAnswer": "indexOf/lastIndexOf return integer indices (or -1); contains/startsWith/endsWith return booleans.",
    "explanation": "String searching methods form the backbone of ICSE Section B text processing programs. Condition 23 reviews search return semantics.",
    "hint": "Index search vs boolean predicate.",
    "level": "advanced",
    "options": [
      "Always returns boolean",
      "Integer index or boolean match indicator",
      "Always returns char",
      "Throws exception on failure"
    ],
    "correctAnswer": 1,
    "codeExample": "// String search condition 23"
  },
  {
    "id": 24,
    "question": "Question 24 on String Searching: What value is returned when searching under condition 24?",
    "shortAnswer": "indexOf/lastIndexOf return integer indices (or -1); contains/startsWith/endsWith return booleans.",
    "explanation": "String searching methods form the backbone of ICSE Section B text processing programs. Condition 24 reviews search return semantics.",
    "hint": "Index search vs boolean predicate.",
    "level": "advanced",
    "options": [
      "Always returns boolean",
      "Integer index or boolean match indicator",
      "Always returns char",
      "Throws exception on failure"
    ],
    "correctAnswer": 1,
    "codeExample": "// String search condition 24"
  },
  {
    "id": 25,
    "question": "Question 25 on String Searching: What value is returned when searching under condition 25?",
    "shortAnswer": "indexOf/lastIndexOf return integer indices (or -1); contains/startsWith/endsWith return booleans.",
    "explanation": "String searching methods form the backbone of ICSE Section B text processing programs. Condition 25 reviews search return semantics.",
    "hint": "Index search vs boolean predicate.",
    "level": "advanced",
    "options": [
      "Always returns boolean",
      "Integer index or boolean match indicator",
      "Always returns char",
      "Throws exception on failure"
    ],
    "correctAnswer": 1,
    "codeExample": "// String search condition 25"
  }
];

export default questions;
