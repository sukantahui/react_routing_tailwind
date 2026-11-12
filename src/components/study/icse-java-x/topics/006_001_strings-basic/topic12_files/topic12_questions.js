const questions = [
  {
    "id": 1,
    "question": "What does replace(char oldChar, char newChar) do?",
    "shortAnswer": "Replaces ALL occurrences of oldChar with newChar.",
    "explanation": "Replaces every matching character in the string.",
    "hint": "Replaces all matches",
    "level": "basic",
    "options": [
      "Replaces only first",
      "Replaces ALL occurrences",
      "Replaces only last",
      "Deletes oldChar"
    ],
    "correctAnswer": 1,
    "codeExample": "\"banana\".replace('a', 'o') -> \"bonono\""
  },
  {
    "id": 2,
    "question": "What is the return type of replace() in class String?",
    "shortAnswer": "String",
    "explanation": "Returns a new String containing the substitutions.",
    "hint": "Returns String",
    "level": "basic",
    "options": [
      "void",
      "String",
      "char",
      "char[]"
    ],
    "correctAnswer": 1,
    "codeExample": "String s2 = s.replace('x', 'y');"
  },
  {
    "id": 3,
    "question": "What does \"Kolkata\".replace('z', 'a') return?",
    "shortAnswer": "\"Kolkata\" (original string reference)",
    "explanation": "If target character is not present, Java returns the original reference (this).",
    "hint": "Unchanged reference return",
    "level": "intermediate",
    "options": [
      "\"Kolkata\"",
      "\"\"",
      "null",
      "Error"
    ],
    "correctAnswer": 0,
    "codeExample": "s.replace('z', 'a') == s"
  },
  {
    "id": 4,
    "question": "How do you remove all spaces from a String in a single line?",
    "shortAnswer": "s = s.replace(\" \", \"\");",
    "explanation": "Replaces space with empty string.",
    "hint": "Remove spaces idiom",
    "level": "basic",
    "options": [
      "s.trim()",
      "s = s.replace(\" \", \"\");",
      "s.delete(' ')",
      "s.clean()"
    ],
    "correctAnswer": 1,
    "codeExample": "s.replace(\" \", \"\")"
  },
  {
    "id": 5,
    "question": "Is replace() case-sensitive?",
    "shortAnswer": "Yes, replace('a', 'x') will not touch uppercase 'A'.",
    "explanation": "Exact character code matching.",
    "hint": "Case sensitive",
    "level": "basic",
    "options": [
      "No",
      "Yes, strictly case-sensitive",
      "Configurable",
      "Only for digits"
    ],
    "correctAnswer": 1,
    "codeExample": "Case sensitive replacement"
  },
  {
    "id": 6,
    "question": "Question 6 on String Replacement: What is the resulting text after substitution rule 6?",
    "shortAnswer": "replace() creates a new String with specified character or sequence substitutions applied.",
    "explanation": "In ICSE encryption, vowel removal, and character masking problems, replace() offers a clean, immutable solution. Rule 6 tests this behavior.",
    "hint": "Immutable character substitution.",
    "level": "basic",
    "options": [
      "Modifies original in-place",
      "Returns new String with all target matches replaced",
      "Throws StringIndexOutOfBoundsException",
      "Converts to array"
    ],
    "correctAnswer": 1,
    "codeExample": "// replace demonstration 6"
  },
  {
    "id": 7,
    "question": "Question 7 on String Replacement: What is the resulting text after substitution rule 7?",
    "shortAnswer": "replace() creates a new String with specified character or sequence substitutions applied.",
    "explanation": "In ICSE encryption, vowel removal, and character masking problems, replace() offers a clean, immutable solution. Rule 7 tests this behavior.",
    "hint": "Immutable character substitution.",
    "level": "basic",
    "options": [
      "Modifies original in-place",
      "Returns new String with all target matches replaced",
      "Throws StringIndexOutOfBoundsException",
      "Converts to array"
    ],
    "correctAnswer": 1,
    "codeExample": "// replace demonstration 7"
  },
  {
    "id": 8,
    "question": "Question 8 on String Replacement: What is the resulting text after substitution rule 8?",
    "shortAnswer": "replace() creates a new String with specified character or sequence substitutions applied.",
    "explanation": "In ICSE encryption, vowel removal, and character masking problems, replace() offers a clean, immutable solution. Rule 8 tests this behavior.",
    "hint": "Immutable character substitution.",
    "level": "basic",
    "options": [
      "Modifies original in-place",
      "Returns new String with all target matches replaced",
      "Throws StringIndexOutOfBoundsException",
      "Converts to array"
    ],
    "correctAnswer": 1,
    "codeExample": "// replace demonstration 8"
  },
  {
    "id": 9,
    "question": "Question 9 on String Replacement: What is the resulting text after substitution rule 9?",
    "shortAnswer": "replace() creates a new String with specified character or sequence substitutions applied.",
    "explanation": "In ICSE encryption, vowel removal, and character masking problems, replace() offers a clean, immutable solution. Rule 9 tests this behavior.",
    "hint": "Immutable character substitution.",
    "level": "basic",
    "options": [
      "Modifies original in-place",
      "Returns new String with all target matches replaced",
      "Throws StringIndexOutOfBoundsException",
      "Converts to array"
    ],
    "correctAnswer": 1,
    "codeExample": "// replace demonstration 9"
  },
  {
    "id": 10,
    "question": "Question 10 on String Replacement: What is the resulting text after substitution rule 10?",
    "shortAnswer": "replace() creates a new String with specified character or sequence substitutions applied.",
    "explanation": "In ICSE encryption, vowel removal, and character masking problems, replace() offers a clean, immutable solution. Rule 10 tests this behavior.",
    "hint": "Immutable character substitution.",
    "level": "basic",
    "options": [
      "Modifies original in-place",
      "Returns new String with all target matches replaced",
      "Throws StringIndexOutOfBoundsException",
      "Converts to array"
    ],
    "correctAnswer": 1,
    "codeExample": "// replace demonstration 10"
  },
  {
    "id": 11,
    "question": "Question 11 on String Replacement: What is the resulting text after substitution rule 11?",
    "shortAnswer": "replace() creates a new String with specified character or sequence substitutions applied.",
    "explanation": "In ICSE encryption, vowel removal, and character masking problems, replace() offers a clean, immutable solution. Rule 11 tests this behavior.",
    "hint": "Immutable character substitution.",
    "level": "basic",
    "options": [
      "Modifies original in-place",
      "Returns new String with all target matches replaced",
      "Throws StringIndexOutOfBoundsException",
      "Converts to array"
    ],
    "correctAnswer": 1,
    "codeExample": "// replace demonstration 11"
  },
  {
    "id": 12,
    "question": "Question 12 on String Replacement: What is the resulting text after substitution rule 12?",
    "shortAnswer": "replace() creates a new String with specified character or sequence substitutions applied.",
    "explanation": "In ICSE encryption, vowel removal, and character masking problems, replace() offers a clean, immutable solution. Rule 12 tests this behavior.",
    "hint": "Immutable character substitution.",
    "level": "basic",
    "options": [
      "Modifies original in-place",
      "Returns new String with all target matches replaced",
      "Throws StringIndexOutOfBoundsException",
      "Converts to array"
    ],
    "correctAnswer": 1,
    "codeExample": "// replace demonstration 12"
  },
  {
    "id": 13,
    "question": "Question 13 on String Replacement: What is the resulting text after substitution rule 13?",
    "shortAnswer": "replace() creates a new String with specified character or sequence substitutions applied.",
    "explanation": "In ICSE encryption, vowel removal, and character masking problems, replace() offers a clean, immutable solution. Rule 13 tests this behavior.",
    "hint": "Immutable character substitution.",
    "level": "basic",
    "options": [
      "Modifies original in-place",
      "Returns new String with all target matches replaced",
      "Throws StringIndexOutOfBoundsException",
      "Converts to array"
    ],
    "correctAnswer": 1,
    "codeExample": "// replace demonstration 13"
  },
  {
    "id": 14,
    "question": "Question 14 on String Replacement: What is the resulting text after substitution rule 14?",
    "shortAnswer": "replace() creates a new String with specified character or sequence substitutions applied.",
    "explanation": "In ICSE encryption, vowel removal, and character masking problems, replace() offers a clean, immutable solution. Rule 14 tests this behavior.",
    "hint": "Immutable character substitution.",
    "level": "basic",
    "options": [
      "Modifies original in-place",
      "Returns new String with all target matches replaced",
      "Throws StringIndexOutOfBoundsException",
      "Converts to array"
    ],
    "correctAnswer": 1,
    "codeExample": "// replace demonstration 14"
  },
  {
    "id": 15,
    "question": "Question 15 on String Replacement: What is the resulting text after substitution rule 15?",
    "shortAnswer": "replace() creates a new String with specified character or sequence substitutions applied.",
    "explanation": "In ICSE encryption, vowel removal, and character masking problems, replace() offers a clean, immutable solution. Rule 15 tests this behavior.",
    "hint": "Immutable character substitution.",
    "level": "basic",
    "options": [
      "Modifies original in-place",
      "Returns new String with all target matches replaced",
      "Throws StringIndexOutOfBoundsException",
      "Converts to array"
    ],
    "correctAnswer": 1,
    "codeExample": "// replace demonstration 15"
  },
  {
    "id": 16,
    "question": "Question 16 on String Replacement: What is the resulting text after substitution rule 16?",
    "shortAnswer": "replace() creates a new String with specified character or sequence substitutions applied.",
    "explanation": "In ICSE encryption, vowel removal, and character masking problems, replace() offers a clean, immutable solution. Rule 16 tests this behavior.",
    "hint": "Immutable character substitution.",
    "level": "basic",
    "options": [
      "Modifies original in-place",
      "Returns new String with all target matches replaced",
      "Throws StringIndexOutOfBoundsException",
      "Converts to array"
    ],
    "correctAnswer": 1,
    "codeExample": "// replace demonstration 16"
  },
  {
    "id": 17,
    "question": "Question 17 on String Replacement: What is the resulting text after substitution rule 17?",
    "shortAnswer": "replace() creates a new String with specified character or sequence substitutions applied.",
    "explanation": "In ICSE encryption, vowel removal, and character masking problems, replace() offers a clean, immutable solution. Rule 17 tests this behavior.",
    "hint": "Immutable character substitution.",
    "level": "basic",
    "options": [
      "Modifies original in-place",
      "Returns new String with all target matches replaced",
      "Throws StringIndexOutOfBoundsException",
      "Converts to array"
    ],
    "correctAnswer": 1,
    "codeExample": "// replace demonstration 17"
  },
  {
    "id": 18,
    "question": "Question 18 on String Replacement: What is the resulting text after substitution rule 18?",
    "shortAnswer": "replace() creates a new String with specified character or sequence substitutions applied.",
    "explanation": "In ICSE encryption, vowel removal, and character masking problems, replace() offers a clean, immutable solution. Rule 18 tests this behavior.",
    "hint": "Immutable character substitution.",
    "level": "basic",
    "options": [
      "Modifies original in-place",
      "Returns new String with all target matches replaced",
      "Throws StringIndexOutOfBoundsException",
      "Converts to array"
    ],
    "correctAnswer": 1,
    "codeExample": "// replace demonstration 18"
  },
  {
    "id": 19,
    "question": "Question 19 on String Replacement: What is the resulting text after substitution rule 19?",
    "shortAnswer": "replace() creates a new String with specified character or sequence substitutions applied.",
    "explanation": "In ICSE encryption, vowel removal, and character masking problems, replace() offers a clean, immutable solution. Rule 19 tests this behavior.",
    "hint": "Immutable character substitution.",
    "level": "advanced",
    "options": [
      "Modifies original in-place",
      "Returns new String with all target matches replaced",
      "Throws StringIndexOutOfBoundsException",
      "Converts to array"
    ],
    "correctAnswer": 1,
    "codeExample": "// replace demonstration 19"
  },
  {
    "id": 20,
    "question": "Question 20 on String Replacement: What is the resulting text after substitution rule 20?",
    "shortAnswer": "replace() creates a new String with specified character or sequence substitutions applied.",
    "explanation": "In ICSE encryption, vowel removal, and character masking problems, replace() offers a clean, immutable solution. Rule 20 tests this behavior.",
    "hint": "Immutable character substitution.",
    "level": "advanced",
    "options": [
      "Modifies original in-place",
      "Returns new String with all target matches replaced",
      "Throws StringIndexOutOfBoundsException",
      "Converts to array"
    ],
    "correctAnswer": 1,
    "codeExample": "// replace demonstration 20"
  },
  {
    "id": 21,
    "question": "Question 21 on String Replacement: What is the resulting text after substitution rule 21?",
    "shortAnswer": "replace() creates a new String with specified character or sequence substitutions applied.",
    "explanation": "In ICSE encryption, vowel removal, and character masking problems, replace() offers a clean, immutable solution. Rule 21 tests this behavior.",
    "hint": "Immutable character substitution.",
    "level": "advanced",
    "options": [
      "Modifies original in-place",
      "Returns new String with all target matches replaced",
      "Throws StringIndexOutOfBoundsException",
      "Converts to array"
    ],
    "correctAnswer": 1,
    "codeExample": "// replace demonstration 21"
  },
  {
    "id": 22,
    "question": "Question 22 on String Replacement: What is the resulting text after substitution rule 22?",
    "shortAnswer": "replace() creates a new String with specified character or sequence substitutions applied.",
    "explanation": "In ICSE encryption, vowel removal, and character masking problems, replace() offers a clean, immutable solution. Rule 22 tests this behavior.",
    "hint": "Immutable character substitution.",
    "level": "advanced",
    "options": [
      "Modifies original in-place",
      "Returns new String with all target matches replaced",
      "Throws StringIndexOutOfBoundsException",
      "Converts to array"
    ],
    "correctAnswer": 1,
    "codeExample": "// replace demonstration 22"
  },
  {
    "id": 23,
    "question": "Question 23 on String Replacement: What is the resulting text after substitution rule 23?",
    "shortAnswer": "replace() creates a new String with specified character or sequence substitutions applied.",
    "explanation": "In ICSE encryption, vowel removal, and character masking problems, replace() offers a clean, immutable solution. Rule 23 tests this behavior.",
    "hint": "Immutable character substitution.",
    "level": "advanced",
    "options": [
      "Modifies original in-place",
      "Returns new String with all target matches replaced",
      "Throws StringIndexOutOfBoundsException",
      "Converts to array"
    ],
    "correctAnswer": 1,
    "codeExample": "// replace demonstration 23"
  },
  {
    "id": 24,
    "question": "Question 24 on String Replacement: What is the resulting text after substitution rule 24?",
    "shortAnswer": "replace() creates a new String with specified character or sequence substitutions applied.",
    "explanation": "In ICSE encryption, vowel removal, and character masking problems, replace() offers a clean, immutable solution. Rule 24 tests this behavior.",
    "hint": "Immutable character substitution.",
    "level": "advanced",
    "options": [
      "Modifies original in-place",
      "Returns new String with all target matches replaced",
      "Throws StringIndexOutOfBoundsException",
      "Converts to array"
    ],
    "correctAnswer": 1,
    "codeExample": "// replace demonstration 24"
  },
  {
    "id": 25,
    "question": "Question 25 on String Replacement: What is the resulting text after substitution rule 25?",
    "shortAnswer": "replace() creates a new String with specified character or sequence substitutions applied.",
    "explanation": "In ICSE encryption, vowel removal, and character masking problems, replace() offers a clean, immutable solution. Rule 25 tests this behavior.",
    "hint": "Immutable character substitution.",
    "level": "advanced",
    "options": [
      "Modifies original in-place",
      "Returns new String with all target matches replaced",
      "Throws StringIndexOutOfBoundsException",
      "Converts to array"
    ],
    "correctAnswer": 1,
    "codeExample": "// replace demonstration 25"
  }
];

export default questions;
