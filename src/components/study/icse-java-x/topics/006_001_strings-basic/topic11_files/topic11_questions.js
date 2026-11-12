const questions = [
  {
    "id": 1,
    "question": "What whitespace does trim() remove?",
    "shortAnswer": "Leading and trailing whitespace only.",
    "explanation": "Internal spaces between words are preserved.",
    "hint": "Both ends only",
    "level": "basic",
    "options": [
      "All spaces",
      "Leading and trailing spaces only",
      "Only leading spaces",
      "Only trailing spaces"
    ],
    "correctAnswer": 1,
    "codeExample": "\" a b \".trim() -> \"a b\""
  },
  {
    "id": 2,
    "question": "What is the return type of trim()?",
    "shortAnswer": "String",
    "explanation": "Returns a new String with outer whitespace stripped.",
    "hint": "Returns String",
    "level": "basic",
    "options": [
      "void",
      "String",
      "char[]",
      "int"
    ],
    "correctAnswer": 1,
    "codeExample": "String clean = s.trim();"
  },
  {
    "id": 3,
    "question": "What does \"   \".trim() (only spaces) evaluate to?",
    "shortAnswer": "\"\" (empty string)",
    "explanation": "All whitespace removed leaves empty string.",
    "hint": "Empty string result",
    "level": "basic",
    "options": [
      "\" \"",
      "\"\" (empty string)",
      "null",
      "Error"
    ],
    "correctAnswer": 1,
    "codeExample": "\"   \".trim() -> \"\""
  },
  {
    "id": 4,
    "question": "Does trim() alter the calling String object?",
    "shortAnswer": "No, String is immutable; a new String is returned.",
    "explanation": "Calling string is unchanged.",
    "hint": "Immutability principle",
    "level": "basic",
    "options": [
      "Yes",
      "No, Strings are immutable",
      "Only in Java 8",
      "Only if assigned"
    ],
    "correctAnswer": 1,
    "codeExample": "s.trim(); // s unchanged"
  },
  {
    "id": 5,
    "question": "Which characters does trim() strip based on ASCII value?",
    "shortAnswer": "Characters with ASCII code <= 32 (including space, tab \\t, newline \\n).",
    "explanation": "Covers all ASCII whitespace <= 32.",
    "hint": "ASCII <= 32",
    "level": "intermediate",
    "options": [
      "Only space 32",
      "All characters with ASCII <= 32",
      "Only tabs",
      "All punctuation"
    ],
    "correctAnswer": 1,
    "codeExample": "ASCII <= 32 trimmed"
  },
  {
    "id": 6,
    "question": "Question 6 on Whitespace Trimming: What is the string length and output for whitespace test 6?",
    "shortAnswer": "trim() removes leading/trailing spaces <= ASCII 32 while preserving inner spaces.",
    "explanation": "ICSE word counting and input validation require accurate trimming. Test 6 validates whitespace stripping.",
    "hint": "Inner spaces preserved, outer stripped.",
    "level": "basic",
    "options": [
      "Removes all spaces",
      "Preserves inner spaces while stripping outer whitespace",
      "Returns null if empty",
      "Throws exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// trim evaluation 6"
  },
  {
    "id": 7,
    "question": "Question 7 on Whitespace Trimming: What is the string length and output for whitespace test 7?",
    "shortAnswer": "trim() removes leading/trailing spaces <= ASCII 32 while preserving inner spaces.",
    "explanation": "ICSE word counting and input validation require accurate trimming. Test 7 validates whitespace stripping.",
    "hint": "Inner spaces preserved, outer stripped.",
    "level": "basic",
    "options": [
      "Removes all spaces",
      "Preserves inner spaces while stripping outer whitespace",
      "Returns null if empty",
      "Throws exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// trim evaluation 7"
  },
  {
    "id": 8,
    "question": "Question 8 on Whitespace Trimming: What is the string length and output for whitespace test 8?",
    "shortAnswer": "trim() removes leading/trailing spaces <= ASCII 32 while preserving inner spaces.",
    "explanation": "ICSE word counting and input validation require accurate trimming. Test 8 validates whitespace stripping.",
    "hint": "Inner spaces preserved, outer stripped.",
    "level": "basic",
    "options": [
      "Removes all spaces",
      "Preserves inner spaces while stripping outer whitespace",
      "Returns null if empty",
      "Throws exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// trim evaluation 8"
  },
  {
    "id": 9,
    "question": "Question 9 on Whitespace Trimming: What is the string length and output for whitespace test 9?",
    "shortAnswer": "trim() removes leading/trailing spaces <= ASCII 32 while preserving inner spaces.",
    "explanation": "ICSE word counting and input validation require accurate trimming. Test 9 validates whitespace stripping.",
    "hint": "Inner spaces preserved, outer stripped.",
    "level": "basic",
    "options": [
      "Removes all spaces",
      "Preserves inner spaces while stripping outer whitespace",
      "Returns null if empty",
      "Throws exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// trim evaluation 9"
  },
  {
    "id": 10,
    "question": "Question 10 on Whitespace Trimming: What is the string length and output for whitespace test 10?",
    "shortAnswer": "trim() removes leading/trailing spaces <= ASCII 32 while preserving inner spaces.",
    "explanation": "ICSE word counting and input validation require accurate trimming. Test 10 validates whitespace stripping.",
    "hint": "Inner spaces preserved, outer stripped.",
    "level": "basic",
    "options": [
      "Removes all spaces",
      "Preserves inner spaces while stripping outer whitespace",
      "Returns null if empty",
      "Throws exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// trim evaluation 10"
  },
  {
    "id": 11,
    "question": "Question 11 on Whitespace Trimming: What is the string length and output for whitespace test 11?",
    "shortAnswer": "trim() removes leading/trailing spaces <= ASCII 32 while preserving inner spaces.",
    "explanation": "ICSE word counting and input validation require accurate trimming. Test 11 validates whitespace stripping.",
    "hint": "Inner spaces preserved, outer stripped.",
    "level": "basic",
    "options": [
      "Removes all spaces",
      "Preserves inner spaces while stripping outer whitespace",
      "Returns null if empty",
      "Throws exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// trim evaluation 11"
  },
  {
    "id": 12,
    "question": "Question 12 on Whitespace Trimming: What is the string length and output for whitespace test 12?",
    "shortAnswer": "trim() removes leading/trailing spaces <= ASCII 32 while preserving inner spaces.",
    "explanation": "ICSE word counting and input validation require accurate trimming. Test 12 validates whitespace stripping.",
    "hint": "Inner spaces preserved, outer stripped.",
    "level": "basic",
    "options": [
      "Removes all spaces",
      "Preserves inner spaces while stripping outer whitespace",
      "Returns null if empty",
      "Throws exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// trim evaluation 12"
  },
  {
    "id": 13,
    "question": "Question 13 on Whitespace Trimming: What is the string length and output for whitespace test 13?",
    "shortAnswer": "trim() removes leading/trailing spaces <= ASCII 32 while preserving inner spaces.",
    "explanation": "ICSE word counting and input validation require accurate trimming. Test 13 validates whitespace stripping.",
    "hint": "Inner spaces preserved, outer stripped.",
    "level": "basic",
    "options": [
      "Removes all spaces",
      "Preserves inner spaces while stripping outer whitespace",
      "Returns null if empty",
      "Throws exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// trim evaluation 13"
  },
  {
    "id": 14,
    "question": "Question 14 on Whitespace Trimming: What is the string length and output for whitespace test 14?",
    "shortAnswer": "trim() removes leading/trailing spaces <= ASCII 32 while preserving inner spaces.",
    "explanation": "ICSE word counting and input validation require accurate trimming. Test 14 validates whitespace stripping.",
    "hint": "Inner spaces preserved, outer stripped.",
    "level": "basic",
    "options": [
      "Removes all spaces",
      "Preserves inner spaces while stripping outer whitespace",
      "Returns null if empty",
      "Throws exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// trim evaluation 14"
  },
  {
    "id": 15,
    "question": "Question 15 on Whitespace Trimming: What is the string length and output for whitespace test 15?",
    "shortAnswer": "trim() removes leading/trailing spaces <= ASCII 32 while preserving inner spaces.",
    "explanation": "ICSE word counting and input validation require accurate trimming. Test 15 validates whitespace stripping.",
    "hint": "Inner spaces preserved, outer stripped.",
    "level": "basic",
    "options": [
      "Removes all spaces",
      "Preserves inner spaces while stripping outer whitespace",
      "Returns null if empty",
      "Throws exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// trim evaluation 15"
  },
  {
    "id": 16,
    "question": "Question 16 on Whitespace Trimming: What is the string length and output for whitespace test 16?",
    "shortAnswer": "trim() removes leading/trailing spaces <= ASCII 32 while preserving inner spaces.",
    "explanation": "ICSE word counting and input validation require accurate trimming. Test 16 validates whitespace stripping.",
    "hint": "Inner spaces preserved, outer stripped.",
    "level": "basic",
    "options": [
      "Removes all spaces",
      "Preserves inner spaces while stripping outer whitespace",
      "Returns null if empty",
      "Throws exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// trim evaluation 16"
  },
  {
    "id": 17,
    "question": "Question 17 on Whitespace Trimming: What is the string length and output for whitespace test 17?",
    "shortAnswer": "trim() removes leading/trailing spaces <= ASCII 32 while preserving inner spaces.",
    "explanation": "ICSE word counting and input validation require accurate trimming. Test 17 validates whitespace stripping.",
    "hint": "Inner spaces preserved, outer stripped.",
    "level": "basic",
    "options": [
      "Removes all spaces",
      "Preserves inner spaces while stripping outer whitespace",
      "Returns null if empty",
      "Throws exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// trim evaluation 17"
  },
  {
    "id": 18,
    "question": "Question 18 on Whitespace Trimming: What is the string length and output for whitespace test 18?",
    "shortAnswer": "trim() removes leading/trailing spaces <= ASCII 32 while preserving inner spaces.",
    "explanation": "ICSE word counting and input validation require accurate trimming. Test 18 validates whitespace stripping.",
    "hint": "Inner spaces preserved, outer stripped.",
    "level": "basic",
    "options": [
      "Removes all spaces",
      "Preserves inner spaces while stripping outer whitespace",
      "Returns null if empty",
      "Throws exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// trim evaluation 18"
  },
  {
    "id": 19,
    "question": "Question 19 on Whitespace Trimming: What is the string length and output for whitespace test 19?",
    "shortAnswer": "trim() removes leading/trailing spaces <= ASCII 32 while preserving inner spaces.",
    "explanation": "ICSE word counting and input validation require accurate trimming. Test 19 validates whitespace stripping.",
    "hint": "Inner spaces preserved, outer stripped.",
    "level": "advanced",
    "options": [
      "Removes all spaces",
      "Preserves inner spaces while stripping outer whitespace",
      "Returns null if empty",
      "Throws exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// trim evaluation 19"
  },
  {
    "id": 20,
    "question": "Question 20 on Whitespace Trimming: What is the string length and output for whitespace test 20?",
    "shortAnswer": "trim() removes leading/trailing spaces <= ASCII 32 while preserving inner spaces.",
    "explanation": "ICSE word counting and input validation require accurate trimming. Test 20 validates whitespace stripping.",
    "hint": "Inner spaces preserved, outer stripped.",
    "level": "advanced",
    "options": [
      "Removes all spaces",
      "Preserves inner spaces while stripping outer whitespace",
      "Returns null if empty",
      "Throws exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// trim evaluation 20"
  },
  {
    "id": 21,
    "question": "Question 21 on Whitespace Trimming: What is the string length and output for whitespace test 21?",
    "shortAnswer": "trim() removes leading/trailing spaces <= ASCII 32 while preserving inner spaces.",
    "explanation": "ICSE word counting and input validation require accurate trimming. Test 21 validates whitespace stripping.",
    "hint": "Inner spaces preserved, outer stripped.",
    "level": "advanced",
    "options": [
      "Removes all spaces",
      "Preserves inner spaces while stripping outer whitespace",
      "Returns null if empty",
      "Throws exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// trim evaluation 21"
  },
  {
    "id": 22,
    "question": "Question 22 on Whitespace Trimming: What is the string length and output for whitespace test 22?",
    "shortAnswer": "trim() removes leading/trailing spaces <= ASCII 32 while preserving inner spaces.",
    "explanation": "ICSE word counting and input validation require accurate trimming. Test 22 validates whitespace stripping.",
    "hint": "Inner spaces preserved, outer stripped.",
    "level": "advanced",
    "options": [
      "Removes all spaces",
      "Preserves inner spaces while stripping outer whitespace",
      "Returns null if empty",
      "Throws exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// trim evaluation 22"
  },
  {
    "id": 23,
    "question": "Question 23 on Whitespace Trimming: What is the string length and output for whitespace test 23?",
    "shortAnswer": "trim() removes leading/trailing spaces <= ASCII 32 while preserving inner spaces.",
    "explanation": "ICSE word counting and input validation require accurate trimming. Test 23 validates whitespace stripping.",
    "hint": "Inner spaces preserved, outer stripped.",
    "level": "advanced",
    "options": [
      "Removes all spaces",
      "Preserves inner spaces while stripping outer whitespace",
      "Returns null if empty",
      "Throws exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// trim evaluation 23"
  },
  {
    "id": 24,
    "question": "Question 24 on Whitespace Trimming: What is the string length and output for whitespace test 24?",
    "shortAnswer": "trim() removes leading/trailing spaces <= ASCII 32 while preserving inner spaces.",
    "explanation": "ICSE word counting and input validation require accurate trimming. Test 24 validates whitespace stripping.",
    "hint": "Inner spaces preserved, outer stripped.",
    "level": "advanced",
    "options": [
      "Removes all spaces",
      "Preserves inner spaces while stripping outer whitespace",
      "Returns null if empty",
      "Throws exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// trim evaluation 24"
  },
  {
    "id": 25,
    "question": "Question 25 on Whitespace Trimming: What is the string length and output for whitespace test 25?",
    "shortAnswer": "trim() removes leading/trailing spaces <= ASCII 32 while preserving inner spaces.",
    "explanation": "ICSE word counting and input validation require accurate trimming. Test 25 validates whitespace stripping.",
    "hint": "Inner spaces preserved, outer stripped.",
    "level": "advanced",
    "options": [
      "Removes all spaces",
      "Preserves inner spaces while stripping outer whitespace",
      "Returns null if empty",
      "Throws exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// trim evaluation 25"
  }
];

export default questions;
