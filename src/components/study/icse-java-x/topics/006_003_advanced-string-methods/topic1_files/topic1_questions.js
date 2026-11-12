const questions = [
  {
    "id": 1,
    "question": "What is the return type of equals(Object obj) in Java?",
    "shortAnswer": "boolean",
    "explanation": "Returns true if the contents are identical; false otherwise.",
    "hint": "Returns boolean",
    "level": "basic",
    "options": [
      "int",
      "boolean",
      "String",
      "char"
    ],
    "correctAnswer": 1,
    "codeExample": "boolean eq = s1.equals(s2);"
  },
  {
    "id": 2,
    "question": "What is the return type of equalsIgnoreCase(String str)?",
    "shortAnswer": "boolean",
    "explanation": "Returns true if the contents match ignoring uppercase/lowercase differences.",
    "hint": "Returns boolean",
    "level": "basic",
    "options": [
      "int",
      "boolean",
      "String",
      "void"
    ],
    "correctAnswer": 1,
    "codeExample": "boolean match = s1.equalsIgnoreCase(s2);"
  },
  {
    "id": 3,
    "question": "What is the result of: \"BlueJ\".equals(\"bluej\")?",
    "shortAnswer": "false",
    "explanation": "equals() is strictly case-sensitive. 'B' (ASCII 66) != 'b' (ASCII 98).",
    "hint": "Case sensitive check",
    "level": "basic",
    "options": [
      "true",
      "false",
      "-1",
      "Compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "\"BlueJ\".equals(\"bluej\"); // false"
  },
  {
    "id": 4,
    "question": "What is the result of: \"BlueJ\".equalsIgnoreCase(\"bluej\")?",
    "shortAnswer": "true",
    "explanation": "equalsIgnoreCase() ignores case differences and sees identical letters.",
    "hint": "Case insensitive check",
    "level": "basic",
    "options": [
      "true",
      "false",
      "0",
      "NullPointerException"
    ],
    "correctAnswer": 0,
    "codeExample": "\"BlueJ\".equalsIgnoreCase(\"bluej\"); // true"
  },
  {
    "id": 5,
    "question": "What is the difference between '==' and '.equals()' when comparing Strings?",
    "shortAnswer": "'==' compares memory addresses (object references); '.equals()' compares character contents.",
    "explanation": "Reference vs content equality.",
    "hint": "Address vs content",
    "level": "basic",
    "options": [
      "They are identical",
      "'==' compares references; equals() compares contents",
      "'==' compares contents; equals() compares references",
      "Both check heap size"
    ],
    "correctAnswer": 1,
    "codeExample": "s1 == s2 vs s1.equals(s2)"
  },
  {
    "id": 6,
    "question": "What is the result of: String s1 = new String(\"ICSE\"); String s2 = new String(\"ICSE\"); s1 == s2?",
    "shortAnswer": "false",
    "explanation": "Two 'new' keywords allocate two distinct objects with different memory addresses on the Heap.",
    "hint": "Distinct heap references",
    "level": "basic",
    "options": [
      "true",
      "false",
      "Compile error",
      "NullPointerException"
    ],
    "correctAnswer": 1,
    "codeExample": "new String creates distinct addresses"
  },
  {
    "id": 7,
    "question": "What is the result of: String s1 = new String(\"ICSE\"); String s2 = new String(\"ICSE\"); s1.equals(s2)?",
    "shortAnswer": "true",
    "explanation": "Both objects contain the exact same character sequence 'I', 'C', 'S', 'E'.",
    "hint": "Identical character sequence",
    "level": "basic",
    "options": [
      "true",
      "false",
      "Compile error",
      "-1"
    ],
    "correctAnswer": 0,
    "codeExample": "Content matches -> true"
  },
  {
    "id": 8,
    "question": "Why should we avoid 'if (str == \"PASS\")' when validating user input from Scanner?",
    "shortAnswer": "Because Scanner produces new String objects on the Heap whose addresses differ from string literals.",
    "explanation": "Scanner input references never match pool literals with '=='.",
    "hint": "Scanner produces new heap instances",
    "level": "intermediate",
    "options": [
      "It will not compile",
      "It compares references, failing for Scanner input even when text matches",
      "It throws NullPointerException every time",
      "Strings cannot be compared in Java"
    ],
    "correctAnswer": 1,
    "codeExample": "Must use equals() for user input"
  },
  {
    "id": 9,
    "question": "What does \"Y\".equalsIgnoreCase(null) evaluate to?",
    "shortAnswer": "false",
    "explanation": "equalsIgnoreCase() safely returns false when passed null, without throwing an exception.",
    "hint": "Null argument is safe",
    "level": "advanced",
    "options": [
      "true",
      "false",
      "NullPointerException",
      "Compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "\"Y\".equalsIgnoreCase(null); // false"
  },
  {
    "id": 10,
    "question": "What happens if you invoke equals() on a null reference: String s = null; s.equals(\"Exit\");?",
    "shortAnswer": "Throws java.lang.NullPointerException.",
    "explanation": "Calling an instance method on a null variable causes NullPointerException.",
    "hint": "Null caller exception",
    "level": "intermediate",
    "options": [
      "Returns false",
      "Returns true",
      "Throws NullPointerException",
      "Compile error"
    ],
    "correctAnswer": 2,
    "codeExample": "null.equals(...) -> Exception"
  },
  {
    "id": 11,
    "question": "What is the recommended null-safe pattern for string comparison?",
    "shortAnswer": "\"Exit\".equalsIgnoreCase(userInput)",
    "explanation": "Calling the method on a known non-null literal prevents NullPointerException even if userInput is null.",
    "hint": "Yoda condition / literal caller",
    "level": "intermediate",
    "options": [
      "userInput.equalsIgnoreCase(\"Exit\")",
      "\"Exit\".equalsIgnoreCase(userInput)",
      "userInput == \"Exit\"",
      "userInput != null ? false : true"
    ],
    "correctAnswer": 1,
    "codeExample": "\"Exit\".equalsIgnoreCase(userInput)"
  },
  {
    "id": 12,
    "question": "What is the result of: \"JAVA\".equalsIgnoreCase(\"java \") (with trailing space)?",
    "shortAnswer": "false",
    "explanation": "Whitespace is significant: length 4 does not match length 5.",
    "hint": "Space makes lengths unequal",
    "level": "basic",
    "options": [
      "true",
      "false",
      "Compile error",
      "0"
    ],
    "correctAnswer": 1,
    "codeExample": "Different lengths -> false"
  },
  {
    "id": 13,
    "question": "What does \"123\".equals(\"123\") evaluate to?",
    "shortAnswer": "true",
    "explanation": "Both are string literals containing identical digits in the pool.",
    "hint": "Identical digit strings",
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
    "id": 14,
    "question": "What does \"123\".equals(123) (comparing String with int) evaluate to?",
    "shortAnswer": "false",
    "explanation": "equals(Object) checks if argument is an instance of String; since 123 is Integer, it returns false.",
    "hint": "Type mismatch check",
    "level": "intermediate",
    "options": [
      "true",
      "false",
      "Compile error",
      "ClassCastException"
    ],
    "correctAnswer": 1,
    "codeExample": "String.equals(Integer) is false"
  },
  {
    "id": 15,
    "question": "What is the result of: \"\".equals(\"\") (two empty strings)?",
    "shortAnswer": "true",
    "explanation": "Both are empty strings with 0 characters, completely identical.",
    "hint": "Empty string equality",
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
    "id": 16,
    "question": "What is the output of: String s1 = \"Barrackpore\"; String s2 = \"barrackpore\"; System.out.println(s1.toLowerCase().equals(s2));?",
    "shortAnswer": "true",
    "explanation": "s1 converted to lowercase matches s2 exactly.",
    "hint": "Convert then compare",
    "level": "basic",
    "options": [
      "true",
      "false",
      "Error",
      "Null"
    ],
    "correctAnswer": 0,
    "codeExample": "true"
  },
  {
    "id": 17,
    "question": "Why is s1.equalsIgnoreCase(s2) faster than s1.toLowerCase().equals(s2.toLowerCase())?",
    "shortAnswer": "equalsIgnoreCase() does not allocate any new String objects on Heap; toLowerCase() creates 2 new objects.",
    "explanation": "Zero memory allocation in equalsIgnoreCase.",
    "hint": "Memory performance",
    "level": "advanced",
    "options": [
      "toLowerCase is deprecated",
      "equalsIgnoreCase compares in-place without memory allocation",
      "No difference",
      "toLowerCase is synchronized"
    ],
    "correctAnswer": 1,
    "codeExample": "Zero heap allocations"
  },
  {
    "id": 18,
    "question": "Does equals() take into account locale-specific rules?",
    "shortAnswer": "No, it checks 16-bit char values; Collator is used for locale-sensitive comparison.",
    "explanation": "equals() checks binary Unicode code units.",
    "hint": "Binary char matching",
    "level": "advanced",
    "options": [
      "Yes, always",
      "No, it checks raw 16-bit char values",
      "Only in Java 17",
      "Only for English"
    ],
    "correctAnswer": 1,
    "codeExample": "Checks binary char values"
  },
  {
    "id": 19,
    "question": "What is the output of: \"A\".equals('A')?",
    "shortAnswer": "false",
    "explanation": "'A' is autoboxed to Character, which is not a String; equals returns false.",
    "hint": "Character object vs String object",
    "level": "intermediate",
    "options": [
      "true",
      "false",
      "Compile error",
      "ClassCastException"
    ],
    "correctAnswer": 1,
    "codeExample": "\"A\".equals('A') is false"
  },
  {
    "id": 20,
    "question": "What is the output of: \"true\".equalsIgnoreCase(\"TRUE\")?",
    "shortAnswer": "true",
    "explanation": "Case ignored, text matches.",
    "hint": "Boolean string comparison",
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
    "id": 21,
    "question": "What does Boolean.parseBoolean(\"True\") return?",
    "shortAnswer": "true",
    "explanation": "parseBoolean internally uses equalsIgnoreCase(\"true\").",
    "hint": "Boolean parsing",
    "level": "intermediate",
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
    "id": 22,
    "question": "What is the output of: \"OK\".equals(new StringBuilder(\"OK\"))?",
    "shortAnswer": "false",
    "explanation": "StringBuilder is not an instance of String, so String.equals() returns false.",
    "hint": "Type check inside equals",
    "level": "intermediate",
    "options": [
      "true",
      "false",
      "Compile error",
      "Throws Exception"
    ],
    "correctAnswer": 1,
    "codeExample": "false (different types)"
  },
  {
    "id": 23,
    "question": "What does \"\\t\".equals(\" \") evaluate to?",
    "shortAnswer": "false",
    "explanation": "Tab (ASCII 9) does not equal space (ASCII 32).",
    "hint": "Different whitespace characters",
    "level": "basic",
    "options": [
      "true",
      "false",
      "Error",
      "null"
    ],
    "correctAnswer": 1,
    "codeExample": "ASCII 9 != ASCII 32"
  },
  {
    "id": 24,
    "question": "What is the output of: String s = \"abc\"; System.out.println(s.equals(s));?",
    "shortAnswer": "true",
    "explanation": "Comparing an object to itself (reflexive property) always returns true.",
    "hint": "Reflexive property",
    "level": "basic",
    "options": [
      "true",
      "false",
      "Error",
      "NullPointerException"
    ],
    "correctAnswer": 0,
    "codeExample": "Reflexive -> true"
  },
  {
    "id": 25,
    "question": "In an ICSE Section B program verifying user choice (like 'YES' or 'NO'), which method should be used?",
    "shortAnswer": "choice.equalsIgnoreCase(\"YES\")",
    "explanation": "Accepts 'yes', 'Yes', 'YES', preventing student answers from being rejected due to letter casing.",
    "hint": "User input best practice",
    "level": "basic",
    "options": [
      "choice == \"YES\"",
      "choice.equals(\"YES\")",
      "choice.equalsIgnoreCase(\"YES\")",
      "choice.indexOf(\"YES\")"
    ],
    "correctAnswer": 2,
    "codeExample": "choice.equalsIgnoreCase(\"YES\")"
  }
];

export default questions;
