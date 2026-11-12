const questions = [
  {
    "id": 1,
    "question": "What is the return type of startsWith(String prefix)?",
    "shortAnswer": "boolean",
    "explanation": "startsWith() returns a boolean indicating whether the string begins with the prefix.",
    "hint": "Returns boolean.",
    "level": "basic",
    "options": [
      "boolean",
      "int",
      "String",
      "char"
    ],
    "correctAnswer": 0,
    "codeExample": "boolean ok = url.startsWith(\"https\");"
  },
  {
    "id": 2,
    "question": "What is the result of: \"Barrackpore\".startsWith(\"bar\")?",
    "shortAnswer": "false",
    "explanation": "startsWith() is case-sensitive. 'B' does not match lowercase 'b'.",
    "hint": "Case sensitive check.",
    "level": "basic",
    "options": [
      "true",
      "false",
      "-1",
      "Compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "\"Barrackpore\".startsWith(\"bar\"); // false"
  },
  {
    "id": 3,
    "question": "What does \"Student.java\".endsWith(\".java\") evaluate to?",
    "shortAnswer": "true",
    "explanation": "The suffix matches the final 5 characters \".java\" exactly.",
    "hint": "Matches end of string.",
    "level": "basic",
    "options": [
      "true",
      "false",
      "0",
      "null"
    ],
    "correctAnswer": 0,
    "codeExample": "\"Student.java\".endsWith(\".java\"); // true"
  },
  {
    "id": 4,
    "question": "What is the return value of \"ICSE\".endsWith(\"\")?",
    "shortAnswer": "true",
    "explanation": "Every string starts with and ends with an empty string \"\".",
    "hint": "Empty string is always a valid suffix.",
    "level": "intermediate",
    "options": [
      "false",
      "true",
      "NullPointerException",
      "Compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "\"ICSE\".endsWith(\"\"); // true"
  },
  {
    "id": 5,
    "question": "What does \"Kolkata\".startsWith(\"kat\", 3) evaluate to?",
    "shortAnswer": "true",
    "explanation": "At offset index 3, the characters are K(0) o(1) l(2) k(3) a(4) t(5) a(6). At index 3, substring is \"kat\"! So it returns true!",
    "hint": "Check characters starting at index 3.",
    "level": "advanced",
    "options": [
      "true",
      "false",
      "StringIndexOutOfBoundsException",
      "-1"
    ],
    "correctAnswer": 0,
    "codeExample": "\"Kolkata\".startsWith(\"kat\", 3); // true"
  },
  {
    "id": 6,
    "question": "What is the return type of endsWith(String suffix)?",
    "shortAnswer": "boolean",
    "explanation": "Returns true if the character sequence represented by suffix is a suffix of this sequence.",
    "hint": "Returns boolean",
    "level": "basic",
    "options": [
      "boolean",
      "int",
      "String",
      "void"
    ],
    "correctAnswer": 0,
    "codeExample": "boolean b = file.endsWith(\".pdf\");"
  },
  {
    "id": 7,
    "question": "Is endsWith() case-sensitive?",
    "shortAnswer": "Yes, \".PDF\" will NOT match \".pdf\".",
    "explanation": "Matches exact Unicode characters.",
    "hint": "Case sensitivity check",
    "level": "basic",
    "options": [
      "No, case-insensitive",
      "Yes, strictly case-sensitive",
      "Configurable",
      "Only for extensions"
    ],
    "correctAnswer": 1,
    "codeExample": "Case-sensitive"
  },
  {
    "id": 8,
    "question": "What is the output of: \"Mr. Swadeep Roy\".startsWith(\"Mr.\")?",
    "shortAnswer": "true",
    "explanation": "First 3 characters are \"Mr.\".",
    "hint": "Salutation prefix check",
    "level": "basic",
    "options": [
      "true",
      "false",
      "1",
      "Error"
    ],
    "correctAnswer": 0,
    "codeExample": "true"
  },
  {
    "id": 9,
    "question": "What happens if prefix is longer than the string: \"Java\".startsWith(\"Java Programming\")?",
    "shortAnswer": "Returns false without throwing an exception.",
    "explanation": "A string cannot start with a prefix longer than itself.",
    "hint": "Long prefix check",
    "level": "intermediate",
    "options": [
      "Throws StringIndexOutOfBoundsException",
      "Returns false",
      "Returns true",
      "Compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "Returns false"
  },
  {
    "id": 10,
    "question": "What happens if suffix is null in endsWith(null)?",
    "shortAnswer": "Throws java.lang.NullPointerException.",
    "explanation": "Passing null argument throws NullPointerException.",
    "hint": "Null argument exception",
    "level": "intermediate",
    "options": [
      "Returns false",
      "Throws NullPointerException",
      "Returns true",
      "Compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "NullPointerException"
  },
  {
    "id": 11,
    "question": "What does \"+91-7003756860\".startsWith(\"+91\") evaluate to?",
    "shortAnswer": "true",
    "explanation": "Country code prefix matches.",
    "hint": "Phone prefix validation",
    "level": "basic",
    "options": [
      "true",
      "false",
      "1",
      "null"
    ],
    "correctAnswer": 0,
    "codeExample": "true"
  },
  {
    "id": 12,
    "question": "What does \"https://www.google.com\".startsWith(\"https://\") return?",
    "shortAnswer": "true",
    "explanation": "URL protocol prefix matches.",
    "hint": "Protocol check",
    "level": "basic",
    "options": [
      "true",
      "false",
      "Error",
      "0"
    ],
    "correctAnswer": 0,
    "codeExample": "true"
  },
  {
    "id": 13,
    "question": "What is the output of: \"photo.png\".endsWith(\".jpg\") || \"photo.png\".endsWith(\".png\")?",
    "shortAnswer": "true",
    "explanation": "Second condition matches, logical OR evaluates to true.",
    "hint": "Compound file extension check",
    "level": "basic",
    "options": [
      "true",
      "false",
      "Compile error",
      "Error"
    ],
    "correctAnswer": 0,
    "codeExample": "true"
  },
  {
    "id": 14,
    "question": "What is the overloaded version of startsWith()?",
    "shortAnswer": "startsWith(String prefix, int toffset)",
    "explanation": "Tests if substring starting at toffset starts with the prefix.",
    "hint": "Offset overload",
    "level": "intermediate",
    "options": [
      "startsWith(String prefix, boolean ignoreCase)",
      "startsWith(String prefix, int toffset)",
      "startsWith(char prefix)",
      "startsWith(String prefix, int length)"
    ],
    "correctAnswer": 1,
    "codeExample": "s.startsWith(prefix, toffset)"
  },
  {
    "id": 15,
    "question": "What happens if toffset is negative in startsWith(prefix, toffset)?",
    "shortAnswer": "Returns false without throwing an exception.",
    "explanation": "Negative offset cannot match.",
    "hint": "Negative offset safety",
    "level": "advanced",
    "options": [
      "Throws StringIndexOutOfBoundsException",
      "Returns false",
      "Treats as 0",
      "Compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "Returns false"
  },
  {
    "id": 16,
    "question": "What happens if toffset > string.length() in startsWith(prefix, toffset)?",
    "shortAnswer": "Returns false without throwing an exception.",
    "explanation": "Offset beyond length cannot match.",
    "hint": "Offset beyond length",
    "level": "advanced",
    "options": [
      "Throws StringIndexOutOfBoundsException",
      "Returns false",
      "Returns true",
      "Compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "Returns false"
  },
  {
    "id": 17,
    "question": "What does \"ICSE\".startsWith(\"I\") return?",
    "shortAnswer": "true",
    "explanation": "First character is 'I'.",
    "hint": "Single character prefix",
    "level": "basic",
    "options": [
      "true",
      "false",
      "1",
      "0"
    ],
    "correctAnswer": 0,
    "codeExample": "true"
  },
  {
    "id": 18,
    "question": "What does \"ICSE\".endsWith(\"E\") return?",
    "shortAnswer": "true",
    "explanation": "Last character is 'E'.",
    "hint": "Single character suffix",
    "level": "basic",
    "options": [
      "true",
      "false",
      "1",
      "0"
    ],
    "correctAnswer": 0,
    "codeExample": "true"
  },
  {
    "id": 19,
    "question": "How do you check if a sentence ends with a question mark in ICSE?",
    "shortAnswer": "sentence.trim().endsWith(\"?\")",
    "explanation": "Trim trailing spaces first, then check if last character is '?'.",
    "hint": "Question sentence check",
    "level": "intermediate",
    "options": [
      "sentence.contains(\"?\")",
      "sentence.trim().endsWith(\"?\")",
      "sentence.indexOf('?') == 0",
      "sentence.charAt(0) == '?'"
    ],
    "correctAnswer": 1,
    "codeExample": "sentence.trim().endsWith(\"?\")"
  },
  {
    "id": 20,
    "question": "What is the output of: \"Madam\".toLowerCase().startsWith(\"m\")?",
    "shortAnswer": "true",
    "explanation": "Normalized to \"madam\", which starts with 'm'.",
    "hint": "Normalize then startsWith",
    "level": "basic",
    "options": [
      "true",
      "false",
      "Error",
      "null"
    ],
    "correctAnswer": 0,
    "codeExample": "true"
  },
  {
    "id": 21,
    "question": "What does \"\".startsWith(\"\") return?",
    "shortAnswer": "true",
    "explanation": "Empty string starts with empty string.",
    "hint": "Both empty",
    "level": "basic",
    "options": [
      "true",
      "false",
      "null",
      "Error"
    ],
    "correctAnswer": 0,
    "codeExample": "true"
  },
  {
    "id": 22,
    "question": "What does \"\".endsWith(\"a\") return?",
    "shortAnswer": "false",
    "explanation": "Empty string cannot end with non-empty suffix.",
    "hint": "Empty string suffix check",
    "level": "basic",
    "options": [
      "true",
      "false",
      "Error",
      "null"
    ],
    "correctAnswer": 1,
    "codeExample": "false"
  },
  {
    "id": 23,
    "question": "Can startsWith() take a char argument like s.startsWith('A')?",
    "shortAnswer": "No, compile error: char cannot be converted to String.",
    "explanation": "Method requires a String parameter; write s.startsWith(\"A\").",
    "hint": "Parameter type check",
    "level": "basic",
    "options": [
      "Yes, valid in Java",
      "No, compile error: requires String",
      "Only in BlueJ",
      "Throws runtime error"
    ],
    "correctAnswer": 1,
    "codeExample": "Requires String argument"
  },
  {
    "id": 24,
    "question": "What is the output of: \"www.codernaccotax.co.in\".endsWith(\".in\")?",
    "shortAnswer": "true",
    "explanation": "Domain suffix matches \".in\".",
    "hint": "Domain suffix check",
    "level": "basic",
    "options": [
      "true",
      "false",
      "Error",
      "1"
    ],
    "correctAnswer": 0,
    "codeExample": "true"
  },
  {
    "id": 25,
    "question": "In an ICSE Board program, how can you filter an array of student names starting with 'S'?",
    "shortAnswer": "if (names[i].toUpperCase().startsWith(\"S\"))",
    "explanation": "Normalizing to uppercase ensures both 'S' and 's' are matched.",
    "hint": "Filtering names pattern",
    "level": "intermediate",
    "options": [
      "if (names[i].indexOf('S') != -1)",
      "if (names[i].toUpperCase().startsWith(\"S\"))",
      "if (names[i].charAt(1) == 'S')",
      "if (names[i].equals(\"S\"))"
    ],
    "correctAnswer": 1,
    "codeExample": "names[i].toUpperCase().startsWith(\"S\")"
  }
];

export default questions;
