const questions = [
  {
    "id": 1,
    "question": "What does equalsIgnoreCase() return when comparing \"Java\" and \"java\"?",
    "shortAnswer": "true",
    "explanation": "Case differences are ignored; matching characters produce true.",
    "hint": "Ignores case differences",
    "level": "basic",
    "options": [
      "false",
      "true",
      "0",
      "-1"
    ],
    "correctAnswer": 1,
    "codeExample": "\"Java\".equalsIgnoreCase(\"java\") // true"
  },
  {
    "id": 2,
    "question": "What does equals() return when comparing \"Java\" and \"java\"?",
    "shortAnswer": "false",
    "explanation": "equals() is strictly case-sensitive: 'J' (74) != 'j' (106).",
    "hint": "Case sensitive check",
    "level": "basic",
    "options": [
      "false",
      "true",
      "0",
      "-1"
    ],
    "correctAnswer": 0,
    "codeExample": "\"Java\".equals(\"java\") // false"
  },
  {
    "id": 3,
    "question": "What is the return type of equalsIgnoreCase()?",
    "shortAnswer": "boolean",
    "explanation": "Returns primitive boolean: true or false.",
    "hint": "Returns boolean",
    "level": "basic",
    "options": [
      "int",
      "boolean",
      "String",
      "char"
    ],
    "correctAnswer": 1,
    "codeExample": "boolean b = s1.equalsIgnoreCase(s2);"
  },
  {
    "id": 4,
    "question": "What happens if target string is null: \"Yes\".equalsIgnoreCase(null)?",
    "shortAnswer": "Safely returns false without throwing an exception.",
    "explanation": "equalsIgnoreCase checks for null and returns false.",
    "hint": "Null safe check",
    "level": "intermediate",
    "options": [
      "true",
      "false",
      "NullPointerException",
      "Error"
    ],
    "correctAnswer": 1,
    "codeExample": "\"Yes\".equalsIgnoreCase(null) -> false"
  },
  {
    "id": 5,
    "question": "What happens if variable is null: String s = null; s.equalsIgnoreCase(\"Yes\")?",
    "shortAnswer": "Throws java.lang.NullPointerException.",
    "explanation": "Calling method on null variable throws NullPointerException.",
    "hint": "Null caller exception",
    "level": "basic",
    "options": [
      "Returns false",
      "Throws NullPointerException",
      "Returns true",
      "Compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "null.equalsIgnoreCase(...) -> Exception"
  },
  {
    "id": 6,
    "question": "Question 6 on Case Comparison: How does case sensitivity affect text comparison in scenario 6?",
    "shortAnswer": "equals() requires exact ASCII match; equalsIgnoreCase() normalizes case before checking.",
    "explanation": "In ICSE examinations, case handling determines algorithm correctness. Scenario 6 demonstrates case-insensitive equality verification.",
    "hint": "Case normalization comparison.",
    "level": "basic",
    "options": [
      "Both methods are identical",
      "equals is case-strict; equalsIgnoreCase ignores case",
      "Neither works on strings",
      "Only for single chars"
    ],
    "correctAnswer": 1,
    "codeExample": "// Case comparison scenario 6"
  },
  {
    "id": 7,
    "question": "Question 7 on Case Comparison: How does case sensitivity affect text comparison in scenario 7?",
    "shortAnswer": "equals() requires exact ASCII match; equalsIgnoreCase() normalizes case before checking.",
    "explanation": "In ICSE examinations, case handling determines algorithm correctness. Scenario 7 demonstrates case-insensitive equality verification.",
    "hint": "Case normalization comparison.",
    "level": "basic",
    "options": [
      "Both methods are identical",
      "equals is case-strict; equalsIgnoreCase ignores case",
      "Neither works on strings",
      "Only for single chars"
    ],
    "correctAnswer": 1,
    "codeExample": "// Case comparison scenario 7"
  },
  {
    "id": 8,
    "question": "Question 8 on Case Comparison: How does case sensitivity affect text comparison in scenario 8?",
    "shortAnswer": "equals() requires exact ASCII match; equalsIgnoreCase() normalizes case before checking.",
    "explanation": "In ICSE examinations, case handling determines algorithm correctness. Scenario 8 demonstrates case-insensitive equality verification.",
    "hint": "Case normalization comparison.",
    "level": "basic",
    "options": [
      "Both methods are identical",
      "equals is case-strict; equalsIgnoreCase ignores case",
      "Neither works on strings",
      "Only for single chars"
    ],
    "correctAnswer": 1,
    "codeExample": "// Case comparison scenario 8"
  },
  {
    "id": 9,
    "question": "Question 9 on Case Comparison: How does case sensitivity affect text comparison in scenario 9?",
    "shortAnswer": "equals() requires exact ASCII match; equalsIgnoreCase() normalizes case before checking.",
    "explanation": "In ICSE examinations, case handling determines algorithm correctness. Scenario 9 demonstrates case-insensitive equality verification.",
    "hint": "Case normalization comparison.",
    "level": "basic",
    "options": [
      "Both methods are identical",
      "equals is case-strict; equalsIgnoreCase ignores case",
      "Neither works on strings",
      "Only for single chars"
    ],
    "correctAnswer": 1,
    "codeExample": "// Case comparison scenario 9"
  },
  {
    "id": 10,
    "question": "Question 10 on Case Comparison: How does case sensitivity affect text comparison in scenario 10?",
    "shortAnswer": "equals() requires exact ASCII match; equalsIgnoreCase() normalizes case before checking.",
    "explanation": "In ICSE examinations, case handling determines algorithm correctness. Scenario 10 demonstrates case-insensitive equality verification.",
    "hint": "Case normalization comparison.",
    "level": "basic",
    "options": [
      "Both methods are identical",
      "equals is case-strict; equalsIgnoreCase ignores case",
      "Neither works on strings",
      "Only for single chars"
    ],
    "correctAnswer": 1,
    "codeExample": "// Case comparison scenario 10"
  },
  {
    "id": 11,
    "question": "Question 11 on Case Comparison: How does case sensitivity affect text comparison in scenario 11?",
    "shortAnswer": "equals() requires exact ASCII match; equalsIgnoreCase() normalizes case before checking.",
    "explanation": "In ICSE examinations, case handling determines algorithm correctness. Scenario 11 demonstrates case-insensitive equality verification.",
    "hint": "Case normalization comparison.",
    "level": "basic",
    "options": [
      "Both methods are identical",
      "equals is case-strict; equalsIgnoreCase ignores case",
      "Neither works on strings",
      "Only for single chars"
    ],
    "correctAnswer": 1,
    "codeExample": "// Case comparison scenario 11"
  },
  {
    "id": 12,
    "question": "Question 12 on Case Comparison: How does case sensitivity affect text comparison in scenario 12?",
    "shortAnswer": "equals() requires exact ASCII match; equalsIgnoreCase() normalizes case before checking.",
    "explanation": "In ICSE examinations, case handling determines algorithm correctness. Scenario 12 demonstrates case-insensitive equality verification.",
    "hint": "Case normalization comparison.",
    "level": "basic",
    "options": [
      "Both methods are identical",
      "equals is case-strict; equalsIgnoreCase ignores case",
      "Neither works on strings",
      "Only for single chars"
    ],
    "correctAnswer": 1,
    "codeExample": "// Case comparison scenario 12"
  },
  {
    "id": 13,
    "question": "Question 13 on Case Comparison: How does case sensitivity affect text comparison in scenario 13?",
    "shortAnswer": "equals() requires exact ASCII match; equalsIgnoreCase() normalizes case before checking.",
    "explanation": "In ICSE examinations, case handling determines algorithm correctness. Scenario 13 demonstrates case-insensitive equality verification.",
    "hint": "Case normalization comparison.",
    "level": "basic",
    "options": [
      "Both methods are identical",
      "equals is case-strict; equalsIgnoreCase ignores case",
      "Neither works on strings",
      "Only for single chars"
    ],
    "correctAnswer": 1,
    "codeExample": "// Case comparison scenario 13"
  },
  {
    "id": 14,
    "question": "Question 14 on Case Comparison: How does case sensitivity affect text comparison in scenario 14?",
    "shortAnswer": "equals() requires exact ASCII match; equalsIgnoreCase() normalizes case before checking.",
    "explanation": "In ICSE examinations, case handling determines algorithm correctness. Scenario 14 demonstrates case-insensitive equality verification.",
    "hint": "Case normalization comparison.",
    "level": "basic",
    "options": [
      "Both methods are identical",
      "equals is case-strict; equalsIgnoreCase ignores case",
      "Neither works on strings",
      "Only for single chars"
    ],
    "correctAnswer": 1,
    "codeExample": "// Case comparison scenario 14"
  },
  {
    "id": 15,
    "question": "Question 15 on Case Comparison: How does case sensitivity affect text comparison in scenario 15?",
    "shortAnswer": "equals() requires exact ASCII match; equalsIgnoreCase() normalizes case before checking.",
    "explanation": "In ICSE examinations, case handling determines algorithm correctness. Scenario 15 demonstrates case-insensitive equality verification.",
    "hint": "Case normalization comparison.",
    "level": "basic",
    "options": [
      "Both methods are identical",
      "equals is case-strict; equalsIgnoreCase ignores case",
      "Neither works on strings",
      "Only for single chars"
    ],
    "correctAnswer": 1,
    "codeExample": "// Case comparison scenario 15"
  },
  {
    "id": 16,
    "question": "Question 16 on Case Comparison: How does case sensitivity affect text comparison in scenario 16?",
    "shortAnswer": "equals() requires exact ASCII match; equalsIgnoreCase() normalizes case before checking.",
    "explanation": "In ICSE examinations, case handling determines algorithm correctness. Scenario 16 demonstrates case-insensitive equality verification.",
    "hint": "Case normalization comparison.",
    "level": "basic",
    "options": [
      "Both methods are identical",
      "equals is case-strict; equalsIgnoreCase ignores case",
      "Neither works on strings",
      "Only for single chars"
    ],
    "correctAnswer": 1,
    "codeExample": "// Case comparison scenario 16"
  },
  {
    "id": 17,
    "question": "Question 17 on Case Comparison: How does case sensitivity affect text comparison in scenario 17?",
    "shortAnswer": "equals() requires exact ASCII match; equalsIgnoreCase() normalizes case before checking.",
    "explanation": "In ICSE examinations, case handling determines algorithm correctness. Scenario 17 demonstrates case-insensitive equality verification.",
    "hint": "Case normalization comparison.",
    "level": "basic",
    "options": [
      "Both methods are identical",
      "equals is case-strict; equalsIgnoreCase ignores case",
      "Neither works on strings",
      "Only for single chars"
    ],
    "correctAnswer": 1,
    "codeExample": "// Case comparison scenario 17"
  },
  {
    "id": 18,
    "question": "Question 18 on Case Comparison: How does case sensitivity affect text comparison in scenario 18?",
    "shortAnswer": "equals() requires exact ASCII match; equalsIgnoreCase() normalizes case before checking.",
    "explanation": "In ICSE examinations, case handling determines algorithm correctness. Scenario 18 demonstrates case-insensitive equality verification.",
    "hint": "Case normalization comparison.",
    "level": "basic",
    "options": [
      "Both methods are identical",
      "equals is case-strict; equalsIgnoreCase ignores case",
      "Neither works on strings",
      "Only for single chars"
    ],
    "correctAnswer": 1,
    "codeExample": "// Case comparison scenario 18"
  },
  {
    "id": 19,
    "question": "Question 19 on Case Comparison: How does case sensitivity affect text comparison in scenario 19?",
    "shortAnswer": "equals() requires exact ASCII match; equalsIgnoreCase() normalizes case before checking.",
    "explanation": "In ICSE examinations, case handling determines algorithm correctness. Scenario 19 demonstrates case-insensitive equality verification.",
    "hint": "Case normalization comparison.",
    "level": "advanced",
    "options": [
      "Both methods are identical",
      "equals is case-strict; equalsIgnoreCase ignores case",
      "Neither works on strings",
      "Only for single chars"
    ],
    "correctAnswer": 1,
    "codeExample": "// Case comparison scenario 19"
  },
  {
    "id": 20,
    "question": "Question 20 on Case Comparison: How does case sensitivity affect text comparison in scenario 20?",
    "shortAnswer": "equals() requires exact ASCII match; equalsIgnoreCase() normalizes case before checking.",
    "explanation": "In ICSE examinations, case handling determines algorithm correctness. Scenario 20 demonstrates case-insensitive equality verification.",
    "hint": "Case normalization comparison.",
    "level": "advanced",
    "options": [
      "Both methods are identical",
      "equals is case-strict; equalsIgnoreCase ignores case",
      "Neither works on strings",
      "Only for single chars"
    ],
    "correctAnswer": 1,
    "codeExample": "// Case comparison scenario 20"
  },
  {
    "id": 21,
    "question": "Question 21 on Case Comparison: How does case sensitivity affect text comparison in scenario 21?",
    "shortAnswer": "equals() requires exact ASCII match; equalsIgnoreCase() normalizes case before checking.",
    "explanation": "In ICSE examinations, case handling determines algorithm correctness. Scenario 21 demonstrates case-insensitive equality verification.",
    "hint": "Case normalization comparison.",
    "level": "advanced",
    "options": [
      "Both methods are identical",
      "equals is case-strict; equalsIgnoreCase ignores case",
      "Neither works on strings",
      "Only for single chars"
    ],
    "correctAnswer": 1,
    "codeExample": "// Case comparison scenario 21"
  },
  {
    "id": 22,
    "question": "Question 22 on Case Comparison: How does case sensitivity affect text comparison in scenario 22?",
    "shortAnswer": "equals() requires exact ASCII match; equalsIgnoreCase() normalizes case before checking.",
    "explanation": "In ICSE examinations, case handling determines algorithm correctness. Scenario 22 demonstrates case-insensitive equality verification.",
    "hint": "Case normalization comparison.",
    "level": "advanced",
    "options": [
      "Both methods are identical",
      "equals is case-strict; equalsIgnoreCase ignores case",
      "Neither works on strings",
      "Only for single chars"
    ],
    "correctAnswer": 1,
    "codeExample": "// Case comparison scenario 22"
  },
  {
    "id": 23,
    "question": "Question 23 on Case Comparison: How does case sensitivity affect text comparison in scenario 23?",
    "shortAnswer": "equals() requires exact ASCII match; equalsIgnoreCase() normalizes case before checking.",
    "explanation": "In ICSE examinations, case handling determines algorithm correctness. Scenario 23 demonstrates case-insensitive equality verification.",
    "hint": "Case normalization comparison.",
    "level": "advanced",
    "options": [
      "Both methods are identical",
      "equals is case-strict; equalsIgnoreCase ignores case",
      "Neither works on strings",
      "Only for single chars"
    ],
    "correctAnswer": 1,
    "codeExample": "// Case comparison scenario 23"
  },
  {
    "id": 24,
    "question": "Question 24 on Case Comparison: How does case sensitivity affect text comparison in scenario 24?",
    "shortAnswer": "equals() requires exact ASCII match; equalsIgnoreCase() normalizes case before checking.",
    "explanation": "In ICSE examinations, case handling determines algorithm correctness. Scenario 24 demonstrates case-insensitive equality verification.",
    "hint": "Case normalization comparison.",
    "level": "advanced",
    "options": [
      "Both methods are identical",
      "equals is case-strict; equalsIgnoreCase ignores case",
      "Neither works on strings",
      "Only for single chars"
    ],
    "correctAnswer": 1,
    "codeExample": "// Case comparison scenario 24"
  },
  {
    "id": 25,
    "question": "Question 25 on Case Comparison: How does case sensitivity affect text comparison in scenario 25?",
    "shortAnswer": "equals() requires exact ASCII match; equalsIgnoreCase() normalizes case before checking.",
    "explanation": "In ICSE examinations, case handling determines algorithm correctness. Scenario 25 demonstrates case-insensitive equality verification.",
    "hint": "Case normalization comparison.",
    "level": "advanced",
    "options": [
      "Both methods are identical",
      "equals is case-strict; equalsIgnoreCase ignores case",
      "Neither works on strings",
      "Only for single chars"
    ],
    "correctAnswer": 1,
    "codeExample": "// Case comparison scenario 25"
  }
];

export default questions;
