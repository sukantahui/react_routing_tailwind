const questions = [
  {
    "id": 1,
    "question": "What is the return type of indexOf() in class String?",
    "shortAnswer": "int",
    "explanation": "Returns 0-based index of first occurrence, or -1 if not found.",
    "hint": "Returns integer index",
    "level": "basic",
    "options": [
      "int",
      "char",
      "boolean",
      "void"
    ],
    "correctAnswer": 0,
    "codeExample": "int idx = str.indexOf('A');"
  },
  {
    "id": 2,
    "question": "What does indexOf() return when the target character or substring is NOT found?",
    "shortAnswer": "-1",
    "explanation": "-1 is the universal sentinel value indicating absence in Java string search methods.",
    "hint": "Negative one for not found",
    "level": "basic",
    "options": [
      "0",
      "-1",
      "null",
      "Throws Exception"
    ],
    "correctAnswer": 1,
    "codeExample": "\"Java\".indexOf('Z'); // -1"
  },
  {
    "id": 3,
    "question": "What is the output of: \"BARRACKPORE\".indexOf('R')?",
    "shortAnswer": "2",
    "explanation": "First occurrence of 'R' is at index 2 (B=0, A=1, R=2).",
    "hint": "First occurrence index",
    "level": "basic",
    "options": [
      "2",
      "3",
      "4",
      "-1"
    ],
    "correctAnswer": 0,
    "codeExample": "\"BARRACKPORE\".indexOf('R'); // 2"
  },
  {
    "id": 4,
    "question": "What does indexOf(char ch, int fromIndex) do?",
    "shortAnswer": "Starts searching for ch from fromIndex forward towards the end of the string.",
    "explanation": "Forward search starting at fromIndex.",
    "hint": "Search with starting offset",
    "level": "basic",
    "options": [
      "Searches backwards",
      "Searches forward from fromIndex",
      "Replaces char at fromIndex",
      "Deletes fromIndex"
    ],
    "correctAnswer": 1,
    "codeExample": "str.indexOf('A', 3);"
  },
  {
    "id": 5,
    "question": "What is the output of: \"BARRACKPORE\".indexOf('R', 3)?",
    "shortAnswer": "3",
    "explanation": "Starting from index 3 ('R'), it immediately matches at index 3.",
    "hint": "Starts searching from index 3",
    "level": "intermediate",
    "options": [
      "2",
      "3",
      "4",
      "-1"
    ],
    "correctAnswer": 1,
    "codeExample": "\"BARRACKPORE\".indexOf('R', 3); // 3"
  },
  {
    "id": 6,
    "question": "What is the output of: \"BARRACKPORE\".indexOf('R', 4)?",
    "shortAnswer": "9",
    "explanation": "Starting from index 4 ('A'), next 'R' is at index 9 (\"...PORE\").",
    "hint": "Next occurrence after index 4",
    "level": "intermediate",
    "options": [
      "3",
      "4",
      "9",
      "10"
    ],
    "correctAnswer": 2,
    "codeExample": "\"BARRACKPORE\".indexOf('R', 4); // 9"
  },
  {
    "id": 7,
    "question": "Is indexOf() case-sensitive?",
    "shortAnswer": "Yes, 'a' will not match 'A'.",
    "explanation": "Java character comparison checks exact ASCII codes ('A'=65, 'a'=97).",
    "hint": "Case sensitive check",
    "level": "basic",
    "options": [
      "No, case-insensitive",
      "Yes, strictly case-sensitive",
      "Only for vowels",
      "Configurable via JVM"
    ],
    "correctAnswer": 1,
    "codeExample": "\"Java\".indexOf('j'); // -1"
  },
  {
    "id": 8,
    "question": "What is the output of: \"Shyamnagar\".indexOf(\"nagar\")?",
    "shortAnswer": "5",
    "explanation": "Substring \"nagar\" begins at index 5.",
    "hint": "Substring match starting index",
    "level": "intermediate",
    "options": [
      "4",
      "5",
      "6",
      "-1"
    ],
    "correctAnswer": 1,
    "codeExample": "\"Shyamnagar\".indexOf(\"nagar\"); // 5"
  },
  {
    "id": 9,
    "question": "What does \"Kolkata\".indexOf(\"\") (empty string) return?",
    "shortAnswer": "0",
    "explanation": "An empty string is considered present at the beginning of every string (index 0).",
    "hint": "Empty string match",
    "level": "advanced",
    "options": [
      "0",
      "-1",
      "7",
      "Throws Exception"
    ],
    "correctAnswer": 0,
    "codeExample": "\"Kolkata\".indexOf(\"\"); // 0"
  },
  {
    "id": 10,
    "question": "What does \"Kolkata\".indexOf(\"\", 3) return?",
    "shortAnswer": "3",
    "explanation": "Empty string search with fromIndex returns fromIndex (capped at length).",
    "hint": "Empty string at offset",
    "level": "advanced",
    "options": [
      "0",
      "3",
      "-1",
      "7"
    ],
    "correctAnswer": 1,
    "codeExample": "\"Kolkata\".indexOf(\"\", 3); // 3"
  },
  {
    "id": 11,
    "question": "What happens if fromIndex is negative in indexOf(ch, fromIndex)?",
    "shortAnswer": "Treated as 0 (searches the entire string).",
    "explanation": "Java treats fromIndex < 0 as 0.",
    "hint": "Negative fromIndex is treated as 0",
    "level": "intermediate",
    "options": [
      "Throws StringIndexOutOfBoundsException",
      "Treated as 0",
      "Searches backwards",
      "Returns -1"
    ],
    "correctAnswer": 1,
    "codeExample": "\"Java\".indexOf('J', -5); // returns 0"
  },
  {
    "id": 12,
    "question": "What happens if fromIndex >= string.length() in indexOf('a', fromIndex)?",
    "shortAnswer": "Returns -1 (unless searching for empty string \"\").",
    "explanation": "If fromIndex exceeds length, character cannot be found.",
    "hint": "fromIndex beyond length",
    "level": "intermediate",
    "options": [
      "Returns -1",
      "Throws Exception",
      "Returns length",
      "Wraps around to 0"
    ],
    "correctAnswer": 0,
    "codeExample": "\"Java\".indexOf('a', 10); // -1"
  },
  {
    "id": 13,
    "question": "How can you check if a String contains character 'X' without using contains()?",
    "shortAnswer": "str.indexOf('X') != -1",
    "explanation": "If indexOf returns >= 0, the character is present; if -1, it is absent.",
    "hint": "Presence check idiom",
    "level": "basic",
    "options": [
      "str.indexOf('X') == 0",
      "str.indexOf('X') != -1",
      "str.indexOf('X') > 0",
      "str.charAt('X')"
    ],
    "correctAnswer": 1,
    "codeExample": "if (s.indexOf('X') != -1)"
  },
  {
    "id": 14,
    "question": "What is the output of: \"SUCCESS\".indexOf('S')?",
    "shortAnswer": "0",
    "explanation": "First 'S' is at index 0.",
    "hint": "First match",
    "level": "basic",
    "options": [
      "0",
      "5",
      "6",
      "-1"
    ],
    "correctAnswer": 0,
    "codeExample": "\"SUCCESS\".indexOf('S'); // 0"
  },
  {
    "id": 15,
    "question": "What is the output of: \"banana\".indexOf(\"na\")?",
    "shortAnswer": "2",
    "explanation": "First occurrence of substring \"na\" starts at index 2 (b=0, a=1, n=2).",
    "hint": "First occurrence of substring",
    "level": "intermediate",
    "options": [
      "1",
      "2",
      "4",
      "-1"
    ],
    "correctAnswer": 1,
    "codeExample": "\"banana\".indexOf(\"na\"); // 2"
  },
  {
    "id": 16,
    "question": "What is the output of: \"banana\".indexOf(\"na\", 3)?",
    "shortAnswer": "4",
    "explanation": "Starting from index 3 ('a'), next \"na\" begins at index 4.",
    "hint": "Search substring from offset 3",
    "level": "intermediate",
    "options": [
      "2",
      "3",
      "4",
      "-1"
    ],
    "correctAnswer": 2,
    "codeExample": "\"banana\".indexOf(\"na\", 3); // 4"
  },
  {
    "id": 17,
    "question": "What does \"computer\".indexOf('e') evaluate to?",
    "shortAnswer": "6",
    "explanation": "c(0) o(1) m(2) p(3) u(4) t(5) e(6) r(7) -> 6.",
    "hint": "Position of 'e'",
    "level": "basic",
    "options": [
      "5",
      "6",
      "7",
      "4"
    ],
    "correctAnswer": 1,
    "codeExample": "\"computer\".indexOf('e'); // 6"
  },
  {
    "id": 18,
    "question": "How many overloaded versions of indexOf() exist in class String?",
    "shortAnswer": "4 versions",
    "explanation": "indexOf(int ch), indexOf(int ch, int fromIndex), indexOf(String str), indexOf(String str, int fromIndex).",
    "hint": "Four overloaded methods",
    "level": "intermediate",
    "options": [
      "1",
      "2",
      "4",
      "6"
    ],
    "correctAnswer": 2,
    "codeExample": "4 overloads in String"
  },
  {
    "id": 19,
    "question": "Why does indexOf() accept 'int ch' rather than 'char ch'?",
    "shortAnswer": "To support Unicode supplementary characters outside the 16-bit BMP range.",
    "explanation": "Integer codepoints support full 32-bit Unicode range.",
    "hint": "Unicode 32-bit codepoints",
    "level": "advanced",
    "options": [
      "Typo in Java 1.0",
      "To support 32-bit Unicode supplementary characters",
      "Integer uses less memory",
      "Required by BlueJ"
    ],
    "correctAnswer": 1,
    "codeExample": "indexOf(int ch)"
  },
  {
    "id": 20,
    "question": "What is the output of: \"hello world\".indexOf(' ')?",
    "shortAnswer": "5",
    "explanation": "The space character is at index 5.",
    "hint": "Space index",
    "level": "basic",
    "options": [
      "4",
      "5",
      "6",
      "-1"
    ],
    "correctAnswer": 1,
    "codeExample": "\"hello world\".indexOf(' '); // 5"
  },
  {
    "id": 21,
    "question": "What happens if target string is null: str.indexOf(null)?",
    "shortAnswer": "Throws java.lang.NullPointerException.",
    "explanation": "Passing null string argument throws NullPointerException.",
    "hint": "Null target",
    "level": "intermediate",
    "options": [
      "Returns -1",
      "Returns 0",
      "Throws NullPointerException",
      "Compile error"
    ],
    "correctAnswer": 2,
    "codeExample": "s.indexOf((String)null); // NullPointerException"
  },
  {
    "id": 22,
    "question": "How do you count occurrences of a word in a sentence using indexOf()?",
    "shortAnswer": "Loop while (idx = str.indexOf(word, idx)) != -1 { count++; idx += word.length(); }",
    "explanation": "Repeatedly calling indexOf with advancing fromIndex.",
    "hint": "Counting word occurrences algorithm",
    "level": "advanced",
    "options": [
      "Call word.count()",
      "Loop advancing fromIndex past each match",
      "Use replace()",
      "Use charAt() only"
    ],
    "correctAnswer": 1,
    "codeExample": "Advancing fromIndex in loop"
  },
  {
    "id": 23,
    "question": "What is the output of: \"ICSE\".indexOf('i')?",
    "shortAnswer": "-1",
    "explanation": "Case-sensitive: 'i' (lowercase) is not found in uppercase \"ICSE\".",
    "hint": "Case sensitivity test",
    "level": "basic",
    "options": [
      "0",
      "-1",
      "1",
      "null"
    ],
    "correctAnswer": 1,
    "codeExample": "\"ICSE\".indexOf('i'); // -1"
  },
  {
    "id": 24,
    "question": "What does \"Naihati\".indexOf(\"hai\") return?",
    "shortAnswer": "-1",
    "explanation": "\"Naihati\" has \"iha\", not \"hai\". Substring match fails, returning -1.",
    "hint": "Exact substring match",
    "level": "intermediate",
    "options": [
      "2",
      "3",
      "-1",
      "0"
    ],
    "correctAnswer": 2,
    "codeExample": "\"Naihati\".indexOf(\"hai\"); // -1"
  },
  {
    "id": 25,
    "question": "How can you find the first vowel in a word using indexOf() in ICSE?",
    "shortAnswer": "Check if \"AEIOUaeiou\".indexOf(word.charAt(i)) != -1 for each character.",
    "explanation": "Lookup table check against vowel string.",
    "hint": "Vowel lookup pattern",
    "level": "intermediate",
    "options": [
      "word.indexOf(\"vowel\")",
      "Check each char against vowel string using indexOf != -1",
      "word.charAt(0)",
      "word.indexOf('A')"
    ],
    "correctAnswer": 1,
    "codeExample": "\"AEIOUaeiou\".indexOf(ch) != -1"
  }
];

export default questions;
