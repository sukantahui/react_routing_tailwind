const questions = [
  {
    "id": 1,
    "question": "What is the return type of toLowerCase() in class String?",
    "shortAnswer": "String",
    "explanation": "Returns a new String with all uppercase characters converted to lowercase.",
    "hint": "Returns new String",
    "level": "basic",
    "options": [
      "void",
      "String",
      "char",
      "char[]"
    ],
    "correctAnswer": 1,
    "codeExample": "String lower = s.toLowerCase();"
  },
  {
    "id": 2,
    "question": "What is the mathematical ASCII shift applied when converting uppercase letter to lowercase?",
    "shortAnswer": "Add 32 to the ASCII value.",
    "explanation": "'A' is 65; 65 + 32 = 97 ('a'). 'Z' is 90; 90 + 32 = 122 ('z').",
    "hint": "ASCII shift +32",
    "level": "basic",
    "options": [
      "Subtract 32",
      "Add 32",
      "Multiply by 2",
      "Add 64"
    ],
    "correctAnswer": 1,
    "codeExample": "'A' (65) + 32 = 'a' (97)"
  },
  {
    "id": 3,
    "question": "What happens to digits and special symbols when toLowerCase() is called: \"ICSE-2026!\".toLowerCase()?",
    "shortAnswer": "Digits and special characters remain completely unchanged: \"icse-2026!\".",
    "explanation": "Only characters in range 'A'-'Z' are affected; digits and symbols are untouched.",
    "hint": "Non-alphabet characters unchanged",
    "level": "basic",
    "options": [
      "They are deleted",
      "They remain unchanged",
      "Throws Exception",
      "Replaced with spaces"
    ],
    "correctAnswer": 1,
    "codeExample": "\"icse-2026!\""
  },
  {
    "id": 4,
    "question": "What is the output of: \"BARRACKPORE\".toLowerCase()?",
    "shortAnswer": "\"barrackpore\"",
    "explanation": "All 11 letters converted to lowercase.",
    "hint": "All lowercase",
    "level": "basic",
    "options": [
      "\"barrackpore\"",
      "\"Barrackpore\"",
      "\"BARRACKPORE\"",
      "\"barrack pore\""
    ],
    "correctAnswer": 0,
    "codeExample": "\"barrackpore\""
  },
  {
    "id": 5,
    "question": "Does toLowerCase() modify the original String object?",
    "shortAnswer": "No, String objects are immutable; it returns a newly created String.",
    "explanation": "Original string remains intact.",
    "hint": "Immutability principle",
    "level": "basic",
    "options": [
      "Yes, modifies in place",
      "No, Strings are immutable",
      "Only in heap",
      "Only if assigned"
    ],
    "correctAnswer": 1,
    "codeExample": "Immutability"
  },
  {
    "id": 6,
    "question": "What is the output of: String s = \"JAVA\"; s.toLowerCase(); System.out.println(s);?",
    "shortAnswer": "\"JAVA\"",
    "explanation": "Since s was not reassigned (s = s.toLowerCase()), s still points to \"JAVA\".",
    "hint": "Immutability without reassignment",
    "level": "intermediate",
    "options": [
      "\"java\"",
      "\"JAVA\"",
      "\"Java\"",
      "Error"
    ],
    "correctAnswer": 1,
    "codeExample": "s is still \"JAVA\""
  },
  {
    "id": 7,
    "question": "What happens if a string is ALREADY all lowercase: \"kolkata\".toLowerCase()?",
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
    "codeExample": "s.toLowerCase() == s is true"
  },
  {
    "id": 8,
    "question": "What does \"\".toLowerCase() return?",
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
    "codeExample": "\"\".toLowerCase(); // \"\""
  },
  {
    "id": 9,
    "question": "What is the output of: \"Java Programming\".toLowerCase()?",
    "shortAnswer": "\"java programming\"",
    "explanation": "Uppercase 'J' and 'P' become 'j' and 'p'; spaces and existing lowercase stay unchanged.",
    "hint": "Mixed case to lowercase",
    "level": "basic",
    "options": [
      "\"java programming\"",
      "\"javaprogramming\"",
      "\"Java programming\"",
      "\"JAVA PROGRAMMING\""
    ],
    "correctAnswer": 0,
    "codeExample": "\"java programming\""
  },
  {
    "id": 10,
    "question": "How can you perform a case-insensitive search using indexOf() and toLowerCase()?",
    "shortAnswer": "haystack.toLowerCase().indexOf(needle.toLowerCase())",
    "explanation": "Normalizing both strings to lowercase allows case-insensitive index searching.",
    "hint": "Case normalization search pattern",
    "level": "intermediate",
    "options": [
      "haystack.indexOf(needle)",
      "haystack.toLowerCase().indexOf(needle.toLowerCase())",
      "haystack.search(needle)",
      "haystack.indexOfIgnoreCase(needle)"
    ],
    "correctAnswer": 1,
    "codeExample": "Normalizing both to lowercase"
  },
  {
    "id": 11,
    "question": "What happens if toLowerCase() is invoked on null?",
    "shortAnswer": "Throws java.lang.NullPointerException.",
    "explanation": "Null reference cannot execute methods.",
    "hint": "Null dereference",
    "level": "basic",
    "options": [
      "Returns null",
      "Throws NullPointerException",
      "\"null\"",
      "Compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "null.toLowerCase(); // NullPointerException"
  },
  {
    "id": 12,
    "question": "What is the overloaded version of toLowerCase() that accepts Locale?",
    "shortAnswer": "toLowerCase(Locale locale)",
    "explanation": "Handles language-specific case rules (e.g. Turkish dotted and dotless 'i').",
    "hint": "Locale specific overload",
    "level": "advanced",
    "options": [
      "toLowerCase(String lang)",
      "toLowerCase(Locale locale)",
      "toLowerCase(int code)",
      "toLowerCase(boolean flag)"
    ],
    "correctAnswer": 1,
    "codeExample": "s.toLowerCase(Locale.US)"
  },
  {
    "id": 13,
    "question": "What does (char)(\"G\".charAt(0) + 32) produce?",
    "shortAnswer": "'g'",
    "explanation": "'G' is ASCII 71; 71 + 32 = 103, which is ASCII for 'g'.",
    "hint": "ASCII arithmetic",
    "level": "basic",
    "options": [
      "'G'",
      "'g'",
      "103",
      "'h'"
    ],
    "correctAnswer": 1,
    "codeExample": "(char)(71 + 32) = 'g'"
  },
  {
    "id": 14,
    "question": "What is the output of: \"100%\".toLowerCase()?",
    "shortAnswer": "\"100%\"",
    "explanation": "No letters present, so string is unchanged.",
    "hint": "No alphabetic characters",
    "level": "basic",
    "options": [
      "\"100%\"",
      "\"0%\"",
      "\"100\"",
      "Error"
    ],
    "correctAnswer": 0,
    "codeExample": "\"100%\""
  },
  {
    "id": 15,
    "question": "In ICSE palindrome checks ignoring case, how should input be normalized?",
    "shortAnswer": "s = s.toLowerCase(); or s = s.toUpperCase();",
    "explanation": "Normalizing to single case ensures 'M' matches 'm' in \"Madam\".",
    "hint": "Case insensitive palindrome",
    "level": "basic",
    "options": [
      "s = s.trim(); only",
      "s = s.toLowerCase();",
      "s = s.replace(\" \", \"\");",
      "s.reverse();"
    ],
    "correctAnswer": 1,
    "codeExample": "s = s.toLowerCase();"
  },
  {
    "id": 16,
    "question": "What does \"SWADEEP\".toLowerCase().charAt(0) return?",
    "shortAnswer": "'s'",
    "explanation": "Converted string is \"swadeep\"; index 0 is 's'.",
    "hint": "Convert then charAt",
    "level": "basic",
    "options": [
      "'S'",
      "'s'",
      "\"s\"",
      "Error"
    ],
    "correctAnswer": 1,
    "codeExample": "'s'"
  },
  {
    "id": 17,
    "question": "What is the output of: \"AbCdEf\".toLowerCase()?",
    "shortAnswer": "\"abcdef\"",
    "explanation": "All letters become lowercase.",
    "hint": "Mixed case",
    "level": "basic",
    "options": [
      "\"abcdef\"",
      "\"ABCDEF\"",
      "\"Abcdef\"",
      "\"aBcDeF\""
    ],
    "correctAnswer": 0,
    "codeExample": "\"abcdef\""
  },
  {
    "id": 18,
    "question": "How does Character.toLowerCase(char ch) differ from String.toLowerCase()?",
    "shortAnswer": "Character method works on a single primitive char; String method works on an entire String object.",
    "explanation": "Primitive char vs String object.",
    "hint": "Character wrapper vs String",
    "level": "intermediate",
    "options": [
      "No difference",
      "Character works on primitive char; String works on whole String",
      "Character is deprecated",
      "String is static"
    ],
    "correctAnswer": 1,
    "codeExample": "char c = Character.toLowerCase('A');"
  },
  {
    "id": 19,
    "question": "What is the output of: \"SPACE \".toLowerCase().length()?",
    "shortAnswer": "6",
    "explanation": "Case conversion preserves the exact length of the string.",
    "hint": "Length preserved",
    "level": "basic",
    "options": [
      "5",
      "6",
      "7",
      "4"
    ],
    "correctAnswer": 1,
    "codeExample": "Length is 6"
  },
  {
    "id": 20,
    "question": "What does \"null\".toLowerCase() return?",
    "shortAnswer": "\"null\"",
    "explanation": "\"null\" is already lowercase string literal.",
    "hint": "Literal null text",
    "level": "basic",
    "options": [
      "null",
      "\"null\"",
      "\"NULL\"",
      "Throws Exception"
    ],
    "correctAnswer": 1,
    "codeExample": "\"null\""
  },
  {
    "id": 21,
    "question": "What does \"TRUE\".toLowerCase().equals(\"true\") evaluate to?",
    "shortAnswer": "true",
    "explanation": "\"TRUE\".toLowerCase() produces \"true\", matching \"true\".",
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
    "id": 22,
    "question": "What is the output of: \"aBc\".toLowerCase().toUpperCase()?",
    "shortAnswer": "\"ABC\"",
    "explanation": "First becomes \"abc\", then becomes \"ABC\".",
    "hint": "Chained case methods",
    "level": "intermediate",
    "options": [
      "\"abc\"",
      "\"ABC\"",
      "\"aBc\"",
      "Error"
    ],
    "correctAnswer": 1,
    "codeExample": "\"ABC\""
  },
  {
    "id": 23,
    "question": "Can toLowerCase() ever increase or decrease the length of a string in English?",
    "shortAnswer": "No, in English ASCII it always preserves 1-to-1 character length.",
    "explanation": "Each ASCII character maps to exactly one lowercase counterpart.",
    "hint": "1-to-1 ASCII mapping",
    "level": "intermediate",
    "options": [
      "Yes, always",
      "No, length remains identical for ASCII",
      "Only for vowels",
      "Only if string has spaces"
    ],
    "correctAnswer": 1,
    "codeExample": "Length invariant in ASCII"
  },
  {
    "id": 24,
    "question": "What is the output of: \"Java\".toLowerCase().startsWith(\"ja\")?",
    "shortAnswer": "true",
    "explanation": "\"java\" starts with \"ja\".",
    "hint": "toLowerCase with startsWith",
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
    "id": 25,
    "question": "In an ICSE frequency count program, why should the input be converted to toLowerCase() first?",
    "shortAnswer": "So that uppercase and lowercase occurrences of the same letter (e.g. 'A' and 'a') are counted together.",
    "explanation": "Combines both case frequencies into a single bucket.",
    "hint": "Frequency counting case normalization",
    "level": "intermediate",
    "options": [
      "Required by Scanner",
      "To count uppercase and lowercase as the same letter",
      "To sort letters",
      "To remove vowels"
    ],
    "correctAnswer": 1,
    "codeExample": "Unifies letter casing"
  }
];

export default questions;
