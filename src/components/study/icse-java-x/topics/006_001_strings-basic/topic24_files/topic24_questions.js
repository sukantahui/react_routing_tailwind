const questions = [
  {
    "id": 1,
    "question": "What error occurs if you write: String s = null; System.out.println(s.length());?",
    "shortAnswer": "java.lang.NullPointerException at runtime.",
    "explanation": "Invoking any instance method on a null reference throws NullPointerException.",
    "hint": "NullPointerException",
    "level": "basic",
    "options": [
      "Returns 0",
      "NullPointerException",
      "Compile error",
      "Returns -1"
    ],
    "correctAnswer": 1,
    "codeExample": "null.length() -> NullPointerException"
  },
  {
    "id": 2,
    "question": "What error occurs if you write: \"Java\".charAt(4)?",
    "shortAnswer": "java.lang.StringIndexOutOfBoundsException at runtime.",
    "explanation": "\"Java\".length() is 4; valid indices are 0 to 3. Index 4 is out of bounds.",
    "hint": "Index out of bounds",
    "level": "basic",
    "options": [
      "Returns '\\0'",
      "StringIndexOutOfBoundsException",
      "Compile error",
      "Returns 'a'"
    ],
    "correctAnswer": 1,
    "codeExample": "\"Java\".charAt(4) -> Exception"
  },
  {
    "id": 3,
    "question": "Why does 'if (name == \"Barrackpore\")' frequently fail when reading input with Scanner?",
    "shortAnswer": "'==' compares memory references; Scanner creates a new heap object distinct from the pool literal.",
    "explanation": "Must use .equals() or .equalsIgnoreCase() for string content comparison.",
    "hint": "Reference comparison with Scanner",
    "level": "basic",
    "options": [
      "Scanner cannot read strings",
      "==' compares memory addresses, not string contents",
      "Compiler error",
      "Scanner inputs are integers"
    ],
    "correctAnswer": 1,
    "codeExample": "Use equals() instead of =="
  },
  {
    "id": 4,
    "question": "What happens if a student writes 's.length' without () on a String?",
    "shortAnswer": "Compile-time error: cannot find symbol variable length.",
    "explanation": "length is a method in String requiring (), unlike arrays where it is a field.",
    "hint": "Missing parentheses compile error",
    "level": "basic",
    "options": [
      "Executes normally",
      "Compile-time error",
      "Runtime exception",
      "Returns 0"
    ],
    "correctAnswer": 1,
    "codeExample": "s.length -> compile error"
  },
  {
    "id": 5,
    "question": "What error occurs if beginIndex > endIndex in substring(b, e)?",
    "shortAnswer": "java.lang.StringIndexOutOfBoundsException",
    "explanation": "beginIndex cannot be greater than endIndex.",
    "hint": "Invalid substring range",
    "level": "basic",
    "options": [
      "Reverses the string",
      "StringIndexOutOfBoundsException",
      "Returns \"\"",
      "Compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "s.substring(3, 1) -> Exception"
  },
  {
    "id": 6,
    "question": "Question 6 on Common Errors: What mistake and diagnostic fix applies to error pattern 6?",
    "shortAnswer": "Fixes boundary checks, replaces == with equals(), and guards against null dereferencing.",
    "explanation": "ICSE examiner reports highlight recurring student pitfalls. Error pattern 6 analyzes root causes and fixes.",
    "hint": "Defensive programming and boundary validation.",
    "level": "basic",
    "options": [
      "Ignores the error",
      "Validates index bounds, checks nulls, and uses .equals()",
      "Restarts the JVM",
      "Converts to float"
    ],
    "correctAnswer": 1,
    "codeExample": "// Error pattern fix 6"
  },
  {
    "id": 7,
    "question": "Question 7 on Common Errors: What mistake and diagnostic fix applies to error pattern 7?",
    "shortAnswer": "Fixes boundary checks, replaces == with equals(), and guards against null dereferencing.",
    "explanation": "ICSE examiner reports highlight recurring student pitfalls. Error pattern 7 analyzes root causes and fixes.",
    "hint": "Defensive programming and boundary validation.",
    "level": "basic",
    "options": [
      "Ignores the error",
      "Validates index bounds, checks nulls, and uses .equals()",
      "Restarts the JVM",
      "Converts to float"
    ],
    "correctAnswer": 1,
    "codeExample": "// Error pattern fix 7"
  },
  {
    "id": 8,
    "question": "Question 8 on Common Errors: What mistake and diagnostic fix applies to error pattern 8?",
    "shortAnswer": "Fixes boundary checks, replaces == with equals(), and guards against null dereferencing.",
    "explanation": "ICSE examiner reports highlight recurring student pitfalls. Error pattern 8 analyzes root causes and fixes.",
    "hint": "Defensive programming and boundary validation.",
    "level": "basic",
    "options": [
      "Ignores the error",
      "Validates index bounds, checks nulls, and uses .equals()",
      "Restarts the JVM",
      "Converts to float"
    ],
    "correctAnswer": 1,
    "codeExample": "// Error pattern fix 8"
  },
  {
    "id": 9,
    "question": "Question 9 on Common Errors: What mistake and diagnostic fix applies to error pattern 9?",
    "shortAnswer": "Fixes boundary checks, replaces == with equals(), and guards against null dereferencing.",
    "explanation": "ICSE examiner reports highlight recurring student pitfalls. Error pattern 9 analyzes root causes and fixes.",
    "hint": "Defensive programming and boundary validation.",
    "level": "basic",
    "options": [
      "Ignores the error",
      "Validates index bounds, checks nulls, and uses .equals()",
      "Restarts the JVM",
      "Converts to float"
    ],
    "correctAnswer": 1,
    "codeExample": "// Error pattern fix 9"
  },
  {
    "id": 10,
    "question": "Question 10 on Common Errors: What mistake and diagnostic fix applies to error pattern 10?",
    "shortAnswer": "Fixes boundary checks, replaces == with equals(), and guards against null dereferencing.",
    "explanation": "ICSE examiner reports highlight recurring student pitfalls. Error pattern 10 analyzes root causes and fixes.",
    "hint": "Defensive programming and boundary validation.",
    "level": "basic",
    "options": [
      "Ignores the error",
      "Validates index bounds, checks nulls, and uses .equals()",
      "Restarts the JVM",
      "Converts to float"
    ],
    "correctAnswer": 1,
    "codeExample": "// Error pattern fix 10"
  },
  {
    "id": 11,
    "question": "Question 11 on Common Errors: What mistake and diagnostic fix applies to error pattern 11?",
    "shortAnswer": "Fixes boundary checks, replaces == with equals(), and guards against null dereferencing.",
    "explanation": "ICSE examiner reports highlight recurring student pitfalls. Error pattern 11 analyzes root causes and fixes.",
    "hint": "Defensive programming and boundary validation.",
    "level": "basic",
    "options": [
      "Ignores the error",
      "Validates index bounds, checks nulls, and uses .equals()",
      "Restarts the JVM",
      "Converts to float"
    ],
    "correctAnswer": 1,
    "codeExample": "// Error pattern fix 11"
  },
  {
    "id": 12,
    "question": "Question 12 on Common Errors: What mistake and diagnostic fix applies to error pattern 12?",
    "shortAnswer": "Fixes boundary checks, replaces == with equals(), and guards against null dereferencing.",
    "explanation": "ICSE examiner reports highlight recurring student pitfalls. Error pattern 12 analyzes root causes and fixes.",
    "hint": "Defensive programming and boundary validation.",
    "level": "basic",
    "options": [
      "Ignores the error",
      "Validates index bounds, checks nulls, and uses .equals()",
      "Restarts the JVM",
      "Converts to float"
    ],
    "correctAnswer": 1,
    "codeExample": "// Error pattern fix 12"
  },
  {
    "id": 13,
    "question": "Question 13 on Common Errors: What mistake and diagnostic fix applies to error pattern 13?",
    "shortAnswer": "Fixes boundary checks, replaces == with equals(), and guards against null dereferencing.",
    "explanation": "ICSE examiner reports highlight recurring student pitfalls. Error pattern 13 analyzes root causes and fixes.",
    "hint": "Defensive programming and boundary validation.",
    "level": "basic",
    "options": [
      "Ignores the error",
      "Validates index bounds, checks nulls, and uses .equals()",
      "Restarts the JVM",
      "Converts to float"
    ],
    "correctAnswer": 1,
    "codeExample": "// Error pattern fix 13"
  },
  {
    "id": 14,
    "question": "Question 14 on Common Errors: What mistake and diagnostic fix applies to error pattern 14?",
    "shortAnswer": "Fixes boundary checks, replaces == with equals(), and guards against null dereferencing.",
    "explanation": "ICSE examiner reports highlight recurring student pitfalls. Error pattern 14 analyzes root causes and fixes.",
    "hint": "Defensive programming and boundary validation.",
    "level": "basic",
    "options": [
      "Ignores the error",
      "Validates index bounds, checks nulls, and uses .equals()",
      "Restarts the JVM",
      "Converts to float"
    ],
    "correctAnswer": 1,
    "codeExample": "// Error pattern fix 14"
  },
  {
    "id": 15,
    "question": "Question 15 on Common Errors: What mistake and diagnostic fix applies to error pattern 15?",
    "shortAnswer": "Fixes boundary checks, replaces == with equals(), and guards against null dereferencing.",
    "explanation": "ICSE examiner reports highlight recurring student pitfalls. Error pattern 15 analyzes root causes and fixes.",
    "hint": "Defensive programming and boundary validation.",
    "level": "basic",
    "options": [
      "Ignores the error",
      "Validates index bounds, checks nulls, and uses .equals()",
      "Restarts the JVM",
      "Converts to float"
    ],
    "correctAnswer": 1,
    "codeExample": "// Error pattern fix 15"
  },
  {
    "id": 16,
    "question": "Question 16 on Common Errors: What mistake and diagnostic fix applies to error pattern 16?",
    "shortAnswer": "Fixes boundary checks, replaces == with equals(), and guards against null dereferencing.",
    "explanation": "ICSE examiner reports highlight recurring student pitfalls. Error pattern 16 analyzes root causes and fixes.",
    "hint": "Defensive programming and boundary validation.",
    "level": "basic",
    "options": [
      "Ignores the error",
      "Validates index bounds, checks nulls, and uses .equals()",
      "Restarts the JVM",
      "Converts to float"
    ],
    "correctAnswer": 1,
    "codeExample": "// Error pattern fix 16"
  },
  {
    "id": 17,
    "question": "Question 17 on Common Errors: What mistake and diagnostic fix applies to error pattern 17?",
    "shortAnswer": "Fixes boundary checks, replaces == with equals(), and guards against null dereferencing.",
    "explanation": "ICSE examiner reports highlight recurring student pitfalls. Error pattern 17 analyzes root causes and fixes.",
    "hint": "Defensive programming and boundary validation.",
    "level": "basic",
    "options": [
      "Ignores the error",
      "Validates index bounds, checks nulls, and uses .equals()",
      "Restarts the JVM",
      "Converts to float"
    ],
    "correctAnswer": 1,
    "codeExample": "// Error pattern fix 17"
  },
  {
    "id": 18,
    "question": "Question 18 on Common Errors: What mistake and diagnostic fix applies to error pattern 18?",
    "shortAnswer": "Fixes boundary checks, replaces == with equals(), and guards against null dereferencing.",
    "explanation": "ICSE examiner reports highlight recurring student pitfalls. Error pattern 18 analyzes root causes and fixes.",
    "hint": "Defensive programming and boundary validation.",
    "level": "basic",
    "options": [
      "Ignores the error",
      "Validates index bounds, checks nulls, and uses .equals()",
      "Restarts the JVM",
      "Converts to float"
    ],
    "correctAnswer": 1,
    "codeExample": "// Error pattern fix 18"
  },
  {
    "id": 19,
    "question": "Question 19 on Common Errors: What mistake and diagnostic fix applies to error pattern 19?",
    "shortAnswer": "Fixes boundary checks, replaces == with equals(), and guards against null dereferencing.",
    "explanation": "ICSE examiner reports highlight recurring student pitfalls. Error pattern 19 analyzes root causes and fixes.",
    "hint": "Defensive programming and boundary validation.",
    "level": "advanced",
    "options": [
      "Ignores the error",
      "Validates index bounds, checks nulls, and uses .equals()",
      "Restarts the JVM",
      "Converts to float"
    ],
    "correctAnswer": 1,
    "codeExample": "// Error pattern fix 19"
  },
  {
    "id": 20,
    "question": "Question 20 on Common Errors: What mistake and diagnostic fix applies to error pattern 20?",
    "shortAnswer": "Fixes boundary checks, replaces == with equals(), and guards against null dereferencing.",
    "explanation": "ICSE examiner reports highlight recurring student pitfalls. Error pattern 20 analyzes root causes and fixes.",
    "hint": "Defensive programming and boundary validation.",
    "level": "advanced",
    "options": [
      "Ignores the error",
      "Validates index bounds, checks nulls, and uses .equals()",
      "Restarts the JVM",
      "Converts to float"
    ],
    "correctAnswer": 1,
    "codeExample": "// Error pattern fix 20"
  },
  {
    "id": 21,
    "question": "Question 21 on Common Errors: What mistake and diagnostic fix applies to error pattern 21?",
    "shortAnswer": "Fixes boundary checks, replaces == with equals(), and guards against null dereferencing.",
    "explanation": "ICSE examiner reports highlight recurring student pitfalls. Error pattern 21 analyzes root causes and fixes.",
    "hint": "Defensive programming and boundary validation.",
    "level": "advanced",
    "options": [
      "Ignores the error",
      "Validates index bounds, checks nulls, and uses .equals()",
      "Restarts the JVM",
      "Converts to float"
    ],
    "correctAnswer": 1,
    "codeExample": "// Error pattern fix 21"
  },
  {
    "id": 22,
    "question": "Question 22 on Common Errors: What mistake and diagnostic fix applies to error pattern 22?",
    "shortAnswer": "Fixes boundary checks, replaces == with equals(), and guards against null dereferencing.",
    "explanation": "ICSE examiner reports highlight recurring student pitfalls. Error pattern 22 analyzes root causes and fixes.",
    "hint": "Defensive programming and boundary validation.",
    "level": "advanced",
    "options": [
      "Ignores the error",
      "Validates index bounds, checks nulls, and uses .equals()",
      "Restarts the JVM",
      "Converts to float"
    ],
    "correctAnswer": 1,
    "codeExample": "// Error pattern fix 22"
  },
  {
    "id": 23,
    "question": "Question 23 on Common Errors: What mistake and diagnostic fix applies to error pattern 23?",
    "shortAnswer": "Fixes boundary checks, replaces == with equals(), and guards against null dereferencing.",
    "explanation": "ICSE examiner reports highlight recurring student pitfalls. Error pattern 23 analyzes root causes and fixes.",
    "hint": "Defensive programming and boundary validation.",
    "level": "advanced",
    "options": [
      "Ignores the error",
      "Validates index bounds, checks nulls, and uses .equals()",
      "Restarts the JVM",
      "Converts to float"
    ],
    "correctAnswer": 1,
    "codeExample": "// Error pattern fix 23"
  },
  {
    "id": 24,
    "question": "Question 24 on Common Errors: What mistake and diagnostic fix applies to error pattern 24?",
    "shortAnswer": "Fixes boundary checks, replaces == with equals(), and guards against null dereferencing.",
    "explanation": "ICSE examiner reports highlight recurring student pitfalls. Error pattern 24 analyzes root causes and fixes.",
    "hint": "Defensive programming and boundary validation.",
    "level": "advanced",
    "options": [
      "Ignores the error",
      "Validates index bounds, checks nulls, and uses .equals()",
      "Restarts the JVM",
      "Converts to float"
    ],
    "correctAnswer": 1,
    "codeExample": "// Error pattern fix 24"
  },
  {
    "id": 25,
    "question": "Question 25 on Common Errors: What mistake and diagnostic fix applies to error pattern 25?",
    "shortAnswer": "Fixes boundary checks, replaces == with equals(), and guards against null dereferencing.",
    "explanation": "ICSE examiner reports highlight recurring student pitfalls. Error pattern 25 analyzes root causes and fixes.",
    "hint": "Defensive programming and boundary validation.",
    "level": "advanced",
    "options": [
      "Ignores the error",
      "Validates index bounds, checks nulls, and uses .equals()",
      "Restarts the JVM",
      "Converts to float"
    ],
    "correctAnswer": 1,
    "codeExample": "// Error pattern fix 25"
  }
];

export default questions;
