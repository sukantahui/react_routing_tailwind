const questions = [
  {
    "id": 1,
    "question": "What is the return type of toUpperCase() in class String?",
    "shortAnswer": "String",
    "explanation": "Returns a new String with all lowercase characters converted to uppercase.",
    "hint": "Returns new String",
    "level": "basic",
    "options": [
      "void",
      "String",
      "char",
      "char[]"
    ],
    "correctAnswer": 1,
    "codeExample": "String upper = s.toUpperCase();"
  },
  {
    "id": 2,
    "question": "What is the mathematical ASCII shift applied when converting lowercase letter to uppercase?",
    "shortAnswer": "Subtract 32 from the ASCII value.",
    "explanation": "'a' is 97; 97 - 32 = 65 ('A'). 'z' is 122; 122 - 32 = 90 ('Z').",
    "hint": "ASCII shift -32",
    "level": "basic",
    "options": [
      "Add 32",
      "Subtract 32",
      "Divide by 2",
      "Subtract 64"
    ],
    "correctAnswer": 1,
    "codeExample": "'a' (97) - 32 = 'A' (65)"
  },
  {
    "id": 3,
    "question": "What happens to digits and special symbols in toUpperCase(): \"grade 10!\".toUpperCase()?",
    "shortAnswer": "Digits and special characters remain completely unchanged: \"GRADE 10!\".",
    "explanation": "Only lowercase letters 'a'-'z' are converted; others are untouched.",
    "hint": "Non-alphabet characters unchanged",
    "level": "basic",
    "options": [
      "They are removed",
      "They remain unchanged",
      "Replaced with symbols",
      "Throws Exception"
    ],
    "correctAnswer": 1,
    "codeExample": "\"GRADE 10!\""
  },
  {
    "id": 4,
    "question": "What is the output of: \"barrackpore\".toUpperCase()?",
    "shortAnswer": "\"BARRACKPORE\"",
    "explanation": "All 11 characters converted to uppercase.",
    "hint": "All uppercase",
    "level": "basic",
    "options": [
      "\"BARRACKPORE\"",
      "\"barrackpore\"",
      "\"Barrackpore\"",
      "\"BARRACK PORE\""
    ],
    "correctAnswer": 0,
    "codeExample": "\"BARRACKPORE\""
  },
  {
    "id": 5,
    "question": "Does toUpperCase() modify the original String object?",
    "shortAnswer": "No, String objects are immutable; it returns a new String object.",
    "explanation": "Original string remains untouched.",
    "hint": "Immutability principle",
    "level": "basic",
    "options": [
      "Yes, modifies original",
      "No, Strings are immutable",
      "Only in stack",
      "Only in Java 8"
    ],
    "correctAnswer": 1,
    "codeExample": "Strings are immutable"
  },
  {
    "id": 6,
    "question": "What is the output of: String s = \"bluej\"; s.toUpperCase(); System.out.println(s);?",
    "shortAnswer": "\"bluej\"",
    "explanation": "Because s was not reassigned (s = s.toUpperCase()), s remains \"bluej\".",
    "hint": "Immutability check",
    "level": "intermediate",
    "options": [
      "\"BLUEJ\"",
      "\"bluej\"",
      "\"BlueJ\"",
      "Error"
    ],
    "correctAnswer": 1,
    "codeExample": "s remains unchanged without assignment"
  },
  {
    "id": 7,
    "question": "What happens if a string is ALREADY all uppercase: \"ICSE\".toUpperCase()?",
    "shortAnswer": "Java optimizes and returns the original String reference (this).",
    "explanation": "If no characters change case, the calling instance is returned.",
    "hint": "Optimized return of this",
    "level": "intermediate",
    "options": [
      "Allocates new object",
      "Returns original reference (this)",
      "Throws error",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "s.toUpperCase() == s is true"
  },
  {
    "id": 8,
    "question": "What does \"\".toUpperCase() return?",
    "shortAnswer": "\"\" (empty string)",
    "explanation": "Empty string remains empty string.",
    "hint": "Empty string",
    "level": "basic",
    "options": [
      "\"\"",
      "null",
      "Error",
      "-1"
    ],
    "correctAnswer": 0,
    "codeExample": "\"\".toUpperCase(); // \"\""
  },
  {
    "id": 9,
    "question": "What is the output of: \"Sukanta Hui\".toUpperCase()?",
    "shortAnswer": "\"SUKANTA HUI\"",
    "explanation": "All letters become uppercase, space remains space.",
    "hint": "Mixed case to uppercase",
    "level": "basic",
    "options": [
      "\"SUKANTA HUI\"",
      "\"SUKANTAHUI\"",
      "\"sukanta hui\"",
      "\"Sukanta Hui\""
    ],
    "correctAnswer": 0,
    "codeExample": "\"SUKANTA HUI\""
  },
  {
    "id": 10,
    "question": "What happens if toUpperCase() is invoked on null?",
    "shortAnswer": "Throws java.lang.NullPointerException.",
    "explanation": "Calling any method on null causes NullPointerException.",
    "hint": "Null dereference",
    "level": "basic",
    "options": [
      "Returns null",
      "Throws NullPointerException",
      "\"NULL\"",
      "Compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "null.toUpperCase(); // NullPointerException"
  },
  {
    "id": 11,
    "question": "What does (char)(\"b\".charAt(0) - 32) produce?",
    "shortAnswer": "'B'",
    "explanation": "'b' is ASCII 98; 98 - 32 = 66, which is ASCII for 'B'.",
    "hint": "ASCII subtraction",
    "level": "basic",
    "options": [
      "'b'",
      "'B'",
      "66",
      "'A'"
    ],
    "correctAnswer": 1,
    "codeExample": "(char)(98 - 32) = 'B'"
  },
  {
    "id": 12,
    "question": "What is the output of: \"rs. 500/-\".toUpperCase()?",
    "shortAnswer": "\"RS. 500/-\"",
    "explanation": "'r' and 's' become 'R' and 'S'; dots, spaces, digits, and slashes remain unchanged.",
    "hint": "Letters change, symbols preserved",
    "level": "intermediate",
    "options": [
      "\"RS. 500/-\"",
      "\"rs. 500/-\"",
      "\"RS. 500\"",
      "Error"
    ],
    "correctAnswer": 0,
    "codeExample": "\"RS. 500/-\""
  },
  {
    "id": 13,
    "question": "What does \"swadeep\".toUpperCase().charAt(0) return?",
    "shortAnswer": "'S'",
    "explanation": "\"swadeep\" to uppercase is \"SWADEEP\"; index 0 is 'S'.",
    "hint": "Convert then charAt",
    "level": "basic",
    "options": [
      "'s'",
      "'S'",
      "\"S\"",
      "Error"
    ],
    "correctAnswer": 1,
    "codeExample": "'S'"
  },
  {
    "id": 14,
    "question": "What is the output of: \"AbCdEf\".toUpperCase()?",
    "shortAnswer": "\"ABCDEF\"",
    "explanation": "All characters converted to uppercase.",
    "hint": "All uppercase",
    "level": "basic",
    "options": [
      "\"abcdef\"",
      "\"ABCDEF\"",
      "\"Abcdef\"",
      "\"aBcDeF\""
    ],
    "correctAnswer": 1,
    "codeExample": "\"ABCDEF\""
  },
  {
    "id": 15,
    "question": "How does Character.toUpperCase(char ch) differ from String.toUpperCase()?",
    "shortAnswer": "Character method converts a single primitive char; String method converts an entire String object.",
    "explanation": "Primitive char vs String object.",
    "hint": "Character wrapper vs String",
    "level": "intermediate",
    "options": [
      "No difference",
      "Character converts primitive char; String converts whole String",
      "Character is deprecated",
      "String is static"
    ],
    "correctAnswer": 1,
    "codeExample": "char c = Character.toUpperCase('a');"
  },
  {
    "id": 16,
    "question": "What is the output of: \"icse \".toUpperCase().length()?",
    "shortAnswer": "5",
    "explanation": "Case conversion preserves string length.",
    "hint": "Length unchanged",
    "level": "basic",
    "options": [
      "4",
      "5",
      "6",
      "3"
    ],
    "correctAnswer": 1,
    "codeExample": "Length is 5"
  },
  {
    "id": 17,
    "question": "What does \"false\".toUpperCase().equals(\"FALSE\") evaluate to?",
    "shortAnswer": "true",
    "explanation": "\"false\".toUpperCase() produces \"FALSE\", matching \"FALSE\".",
    "hint": "Normalized equality",
    "level": "basic",
    "options": [
      "true",
      "false",
      "Compile error",
      "Runtime exception"
    ],
    "correctAnswer": 0,
    "codeExample": "true"
  },
  {
    "id": 18,
    "question": "What is the German lowercase letter 'ß' (sharp S) converted to in toUpperCase()?",
    "shortAnswer": "\"SS\" (length increases from 1 to 2!)",
    "explanation": "In Unicode, German lowercase 'ß' becomes uppercase 'SS'.",
    "hint": "Unicode case expansion",
    "level": "advanced",
    "options": [
      "\"B\"",
      "\"SS\"",
      "\"S\"",
      "\"ß\""
    ],
    "correctAnswer": 1,
    "codeExample": "\"ß\".toUpperCase() = \"SS\""
  },
  {
    "id": 19,
    "question": "What is the output of: \"java\".toUpperCase().endsWith(\"VA\")?",
    "shortAnswer": "true",
    "explanation": "\"JAVA\" ends with \"VA\".",
    "hint": "toUpperCase with endsWith",
    "level": "basic",
    "options": [
      "true",
      "false",
      "Error",
      "-1"
    ],
    "correctAnswer": 0,
    "codeExample": "true"
  },
  {
    "id": 20,
    "question": "What does \"123abc\".toUpperCase() evaluate to?",
    "shortAnswer": "\"123ABC\"",
    "explanation": "Digits are unchanged; letters 'abc' become 'ABC'.",
    "hint": "Digits and letters",
    "level": "basic",
    "options": [
      "\"123abc\"",
      "\"123ABC\"",
      "\"ABC123\"",
      "Error"
    ],
    "correctAnswer": 1,
    "codeExample": "\"123ABC\""
  },
  {
    "id": 21,
    "question": "In ICSE Pig Latin programs, why is word.toUpperCase() often applied at the start?",
    "shortAnswer": "To standardize all vowel checks against uppercase 'A', 'E', 'I', 'O', 'U'.",
    "explanation": "Simplifies conditional checks to 5 uppercase vowels instead of 10.",
    "hint": "Pig Latin standardization",
    "level": "intermediate",
    "options": [
      "Required by Java",
      "Simplifies vowel checks to uppercase only",
      "Sorts the word",
      "Removes spaces"
    ],
    "correctAnswer": 1,
    "codeExample": "Standardizes vowel checks"
  },
  {
    "id": 22,
    "question": "What is the output of: System.out.println(\"ok\".toUpperCase() + 200);?",
    "shortAnswer": "\"OK200\"",
    "explanation": "\"ok\".toUpperCase() produces \"OK\", concatenated with 200 yields \"OK200\".",
    "hint": "Uppercase then string concatenation",
    "level": "basic",
    "options": [
      "\"OK200\"",
      "200",
      "\"ok200\"",
      "Error"
    ],
    "correctAnswer": 0,
    "codeExample": "\"OK200\""
  },
  {
    "id": 23,
    "question": "What does \" \".toUpperCase() evaluate to?",
    "shortAnswer": "\" \" (single space)",
    "explanation": "Spaces have no uppercase variant, returning identical space.",
    "hint": "Space unchanged",
    "level": "basic",
    "options": [
      "\"\"",
      "\" \"",
      "null",
      "Error"
    ],
    "correctAnswer": 1,
    "codeExample": "\" \""
  },
  {
    "id": 24,
    "question": "What is the output of: \"Java\".toUpperCase().substring(0, 2)?",
    "shortAnswer": "\"JA\"",
    "explanation": "\"Java\".toUpperCase() gives \"JAVA\"; substring(0, 2) gives \"JA\".",
    "hint": "Uppercase then substring",
    "level": "basic",
    "options": [
      "\"JA\"",
      "\"ja\"",
      "\"JAV\"",
      "\"AV\""
    ],
    "correctAnswer": 0,
    "codeExample": "\"JA\""
  },
  {
    "id": 25,
    "question": "Why is s.toUpperCase().equals(s2.toUpperCase()) slower than s.equalsIgnoreCase(s2)?",
    "shortAnswer": "toUpperCase() allocates new String objects on Heap; equalsIgnoreCase() compares characters in-place without memory allocation.",
    "explanation": "equalsIgnoreCase avoids heap object allocations.",
    "hint": "Performance comparison",
    "level": "advanced",
    "options": [
      "toUpperCase is faster",
      "equalsIgnoreCase compares in-place without allocating new Heap objects",
      "No performance difference",
      "toUpperCase uses more CPU cycles only"
    ],
    "correctAnswer": 1,
    "codeExample": "equalsIgnoreCase avoids heap allocation"
  }
];

export default questions;
