const questions = [
  {
    "id": 1,
    "question": "What is the return type of compareTo(String str)?",
    "shortAnswer": "int",
    "explanation": "compareTo() returns an integer representing the difference between character values or lengths.",
    "hint": "Returns an integer difference.",
    "level": "basic",
    "options": [
      "boolean",
      "int",
      "char",
      "String"
    ],
    "correctAnswer": 1,
    "codeExample": "int diff = s1.compareTo(s2);"
  },
  {
    "id": 2,
    "question": "What is the output of: \"CAT\".compareTo(\"CAR\") in Java?",
    "shortAnswer": "2",
    "explanation": "First mismatch is at index 2: 'T' (ASCII 84) minus 'R' (ASCII 82) = 84 - 82 = +2.",
    "hint": "'T' ASCII minus 'R' ASCII.",
    "level": "basic",
    "options": [
      "-2",
      "0",
      "2",
      "1"
    ],
    "correctAnswer": 2,
    "codeExample": "\"CAT\".compareTo(\"CAR\"); // 84 - 82 = 2"
  },
  {
    "id": 3,
    "question": "What is the output of: \"A\".compareTo(\"a\")?",
    "shortAnswer": "-32",
    "explanation": "'A' has ASCII value 65 and 'a' has ASCII value 97. 65 - 97 = -32.",
    "hint": "ASCII 65 minus 97.",
    "level": "basic",
    "options": [
      "0",
      "-32",
      "32",
      "-1"
    ],
    "correctAnswer": 1,
    "codeExample": "'A' (65) - 'a' (97) = -32"
  },
  {
    "id": 4,
    "question": "What is the output when one string is a prefix of another: \"Auto\".compareTo(\"Automatic\")?",
    "shortAnswer": "-5",
    "explanation": "When one string is an exact prefix, compareTo returns: length(s1) - length(s2) = 4 - 9 = -5.",
    "hint": "Difference in lengths: 4 - 9.",
    "level": "intermediate",
    "options": [
      "0",
      "-5",
      "5",
      "-1"
    ],
    "correctAnswer": 1,
    "codeExample": "\"Auto\".length() - \"Automatic\".length() = 4 - 9 = -5"
  },
  {
    "id": 5,
    "question": "How do you test if string 'a' should precede string 'b' in alphabetical order?",
    "shortAnswer": "a.compareTo(b) < 0",
    "explanation": "A negative integer indicates that 'a' is lexicographically smaller and precedes 'b'.",
    "hint": "Negative means smaller.",
    "level": "intermediate",
    "options": [
      "a.compareTo(b) > 0",
      "a.compareTo(b) < 0",
      "a.compareTo(b) == 1",
      "a.equals(b) < 0"
    ],
    "correctAnswer": 1,
    "codeExample": "if (a.compareTo(b) < 0) { /* 'a' precedes 'b' */ }"
  },
  {
    "id": 6,
    "question": "What does compareTo() return if both strings have identical characters and length?",
    "shortAnswer": "0",
    "explanation": "Zero indicates exact content equality.",
    "hint": "Identical strings return 0",
    "level": "basic",
    "options": [
      "0",
      "1",
      "-1",
      "true"
    ],
    "correctAnswer": 0,
    "codeExample": "\"Java\".compareTo(\"Java\"); // 0"
  },
  {
    "id": 7,
    "question": "What is the output of: \"Apple\".compareTo(\"Banana\")?",
    "shortAnswer": "-1",
    "explanation": "'A' (65) - 'B' (66) = -1.",
    "hint": "First character mismatch",
    "level": "basic",
    "options": [
      "-1",
      "1",
      "0",
      "-32"
    ],
    "correctAnswer": 0,
    "codeExample": "65 - 66 = -1"
  },
  {
    "id": 8,
    "question": "What does \"Apple\".compareToIgnoreCase(\"apple\") return?",
    "shortAnswer": "0",
    "explanation": "compareToIgnoreCase ignores case differences; all letters match.",
    "hint": "Case ignored gives 0",
    "level": "basic",
    "options": [
      "0",
      "-32",
      "32",
      "-1"
    ],
    "correctAnswer": 0,
    "codeExample": "\"Apple\".compareToIgnoreCase(\"apple\") = 0"
  },
  {
    "id": 9,
    "question": "What is the output of: \"Booklet\".compareTo(\"Book\")?",
    "shortAnswer": "3",
    "explanation": "Prefix match: length(\"Booklet\") - length(\"Book\") = 7 - 4 = +3.",
    "hint": "Length difference when prefix",
    "level": "intermediate",
    "options": [
      "-3",
      "3",
      "0",
      "4"
    ],
    "correctAnswer": 1,
    "codeExample": "7 - 4 = 3"
  },
  {
    "id": 10,
    "question": "What is the output of: \"B\".compareTo(\"A\")?",
    "shortAnswer": "1",
    "explanation": "'B' (66) - 'A' (65) = +1.",
    "hint": "66 - 65",
    "level": "basic",
    "options": [
      "-1",
      "0",
      "1",
      "32"
    ],
    "correctAnswer": 2,
    "codeExample": "66 - 65 = 1"
  },
  {
    "id": 11,
    "question": "What happens if compareTo(null) is invoked?",
    "shortAnswer": "Throws java.lang.NullPointerException.",
    "explanation": "Cannot compare against a null reference.",
    "hint": "Null parameter exception",
    "level": "basic",
    "options": [
      "Returns -1",
      "Returns 0",
      "Throws NullPointerException",
      "Compile error"
    ],
    "correctAnswer": 2,
    "codeExample": "s.compareTo(null); // NullPointerException"
  },
  {
    "id": 12,
    "question": "What does \"abc\".compareTo(\"abd\") evaluate to?",
    "shortAnswer": "-1",
    "explanation": "'c' (99) - 'd' (100) = -1.",
    "hint": "Third character mismatch",
    "level": "basic",
    "options": [
      "-1",
      "1",
      "0",
      "-2"
    ],
    "correctAnswer": 0,
    "codeExample": "99 - 100 = -1"
  },
  {
    "id": 13,
    "question": "What does \"10\".compareTo(\"2\") evaluate to?",
    "shortAnswer": "-1",
    "explanation": "'1' has ASCII 49, '2' has ASCII 50. 49 - 50 = -1 (lexicographical comparison, NOT numeric!).",
    "hint": "Lexicographical vs numeric comparison",
    "level": "intermediate",
    "options": [
      "8",
      "-1",
      "1",
      "0"
    ],
    "correctAnswer": 1,
    "codeExample": "'1' (49) - '2' (50) = -1"
  },
  {
    "id": 14,
    "question": "In Bubble Sort on a String array, what condition triggers a swap for ASCENDING order?",
    "shortAnswer": "arr[j].compareTo(arr[j + 1]) > 0",
    "explanation": "If earlier element is greater than later element, swap is required.",
    "hint": "Ascending sort swap condition",
    "level": "intermediate",
    "options": [
      "arr[j].compareTo(arr[j+1]) < 0",
      "arr[j].compareTo(arr[j+1]) > 0",
      "arr[j].equals(arr[j+1])",
      "arr[j].length() > arr[j+1].length()"
    ],
    "correctAnswer": 1,
    "codeExample": "arr[j].compareTo(arr[j+1]) > 0"
  },
  {
    "id": 15,
    "question": "What is the output of: \"KOLKATA\".compareTo(\"kolkata\")?",
    "shortAnswer": "-32",
    "explanation": "'K' (75) - 'k' (107) = -32.",
    "hint": "Uppercase vs lowercase mismatch",
    "level": "basic",
    "options": [
      "0",
      "-32",
      "32",
      "-1"
    ],
    "correctAnswer": 1,
    "codeExample": "75 - 107 = -32"
  },
  {
    "id": 16,
    "question": "What is the output of: \"INDIA\".compareTo(\"INDONESIA\")?",
    "shortAnswer": "-6",
    "explanation": "First mismatch at index 3: 'I' (73) vs 'O' (79). 73 - 79 = -6.",
    "hint": "First mismatch calculation",
    "level": "intermediate",
    "options": [
      "-6",
      "6",
      "-4",
      "0"
    ],
    "correctAnswer": 0,
    "codeExample": "'I' (73) - 'O' (79) = -6"
  },
  {
    "id": 17,
    "question": "What does \"\".compareTo(\"\") evaluate to?",
    "shortAnswer": "0",
    "explanation": "Both empty strings have length 0, returning 0.",
    "hint": "Empty string comparison",
    "level": "basic",
    "options": [
      "0",
      "-1",
      "1",
      "null"
    ],
    "correctAnswer": 0,
    "codeExample": "0"
  },
  {
    "id": 18,
    "question": "What does \"Barrackpore\".compareTo(\"\") evaluate to?",
    "shortAnswer": "11",
    "explanation": "length(\"Barrackpore\") - 0 = 11.",
    "hint": "String compared with empty string",
    "level": "intermediate",
    "options": [
      "0",
      "11",
      "-11",
      "-1"
    ],
    "correctAnswer": 1,
    "codeExample": "Length difference = 11"
  },
  {
    "id": 19,
    "question": "What does \"\".compareTo(\"Shyamnagar\") evaluate to?",
    "shortAnswer": "-10",
    "explanation": "0 - length(\"Shyamnagar\") = 0 - 10 = -10.",
    "hint": "Empty compared with string",
    "level": "intermediate",
    "options": [
      "0",
      "10",
      "-10",
      "-1"
    ],
    "correctAnswer": 2,
    "codeExample": "0 - 10 = -10"
  },
  {
    "id": 20,
    "question": "What is the output of: \"Zoo\".compareTo(\"apple\")?",
    "shortAnswer": "-65",
    "explanation": "'Z' is ASCII 90, 'a' is ASCII 97. 90 - 97 = -7 (uppercase letters precede lowercase in ASCII!).",
    "hint": "Uppercase precedes lowercase",
    "level": "intermediate",
    "options": [
      "25",
      "-7",
      "7",
      "-32"
    ],
    "correctAnswer": 1,
    "codeExample": "90 - 97 = -7"
  },
  {
    "id": 21,
    "question": "Why does \"Zoo\" come BEFORE \"apple\" in standard compareTo()?",
    "shortAnswer": "Because in ASCII, all uppercase letters (65-90) have smaller values than lowercase letters (97-122).",
    "explanation": "ASCII table design.",
    "hint": "Uppercase smaller ASCII values",
    "level": "basic",
    "options": [
      "Because Z comes after A",
      "Uppercase letters have smaller ASCII codes than lowercase letters",
      "Java bug",
      "BlueJ setting"
    ],
    "correctAnswer": 1,
    "codeExample": "ASCII 65-90 < 97-122"
  },
  {
    "id": 22,
    "question": "How do you achieve true alphabetical dictionary sorting regardless of letter case?",
    "shortAnswer": "Use compareToIgnoreCase()",
    "explanation": "Normalizes letter cases before comparing ASCII values.",
    "hint": "Case-insensitive dictionary sorting",
    "level": "basic",
    "options": [
      "compareTo()",
      "compareToIgnoreCase()",
      "equals()",
      "trim()"
    ],
    "correctAnswer": 1,
    "codeExample": "arr[j].compareToIgnoreCase(arr[j+1]) > 0"
  },
  {
    "id": 23,
    "question": "What is the output of: \"5\".compareTo(\"5\")?",
    "shortAnswer": "0",
    "explanation": "Identical character codes return 0.",
    "hint": "Identical numbers as strings",
    "level": "basic",
    "options": [
      "0",
      "5",
      "1",
      "-1"
    ],
    "correctAnswer": 0,
    "codeExample": "0"
  },
  {
    "id": 24,
    "question": "What is the output of: \"a\".compareTo(\"c\")?",
    "shortAnswer": "-2",
    "explanation": "'a' (97) - 'c' (99) = -2.",
    "hint": "97 - 99",
    "level": "basic",
    "options": [
      "-2",
      "2",
      "0",
      "-1"
    ],
    "correctAnswer": 0,
    "codeExample": "97 - 99 = -2"
  },
  {
    "id": 25,
    "question": "In ICSE Section A Board exams, what does (s1.compareTo(s2) == 0) imply about s1.equals(s2)?",
    "shortAnswer": "It guarantees that s1.equals(s2) is also true.",
    "explanation": "In class String, compareTo returning 0 is completely consistent with equals() returning true.",
    "hint": "Consistency between compareTo and equals",
    "level": "advanced",
    "options": [
      "s1.equals(s2) must be false",
      "s1.equals(s2) must be true",
      "No relation",
      "Throws ClassCastException"
    ],
    "correctAnswer": 1,
    "codeExample": "compareTo == 0 implies equals == true"
  }
];

export default questions;
