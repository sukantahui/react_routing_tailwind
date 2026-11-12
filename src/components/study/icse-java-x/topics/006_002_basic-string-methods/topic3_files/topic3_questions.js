const questions = [
  {
    "id": 1,
    "question": "What does lastIndexOf() return?",
    "shortAnswer": "The index of the LAST occurrence of the character or substring, or -1 if not found.",
    "explanation": "Searches backward from right to left.",
    "hint": "Last occurrence index",
    "level": "basic",
    "options": [
      "First occurrence",
      "Last occurrence (or -1)",
      "Total count",
      "Boolean flag"
    ],
    "correctAnswer": 1,
    "codeExample": "int last = str.lastIndexOf('A');"
  },
  {
    "id": 2,
    "question": "What is the return type of lastIndexOf()?",
    "shortAnswer": "int",
    "explanation": "Returns 32-bit signed integer index.",
    "hint": "Returns int",
    "level": "basic",
    "options": [
      "int",
      "char",
      "String",
      "void"
    ],
    "correctAnswer": 0,
    "codeExample": "int idx = s.lastIndexOf('x');"
  },
  {
    "id": 3,
    "question": "What is the output of: \"BARRACKPORE\".lastIndexOf('R')?",
    "shortAnswer": "9",
    "explanation": "Indices of 'R' are 2, 3, 9. The last occurrence is at index 9.",
    "hint": "Rightmost 'R' index",
    "level": "basic",
    "options": [
      "2",
      "3",
      "9",
      "10"
    ],
    "correctAnswer": 2,
    "codeExample": "\"BARRACKPORE\".lastIndexOf('R'); // 9"
  },
  {
    "id": 4,
    "question": "In which direction does lastIndexOf() search?",
    "shortAnswer": "Right-to-left (backward towards the beginning of the string).",
    "explanation": "Scans backward starting from the specified index or the end of string.",
    "hint": "Right to left search",
    "level": "basic",
    "options": [
      "Left to right",
      "Right to left (backward)",
      "Middle outwards",
      "Random order"
    ],
    "correctAnswer": 1,
    "codeExample": "Scans backward"
  },
  {
    "id": 5,
    "question": "What is the output of: \"banana\".lastIndexOf('a')?",
    "shortAnswer": "5",
    "explanation": "Indices of 'a' are 1, 3, 5. Last is 5.",
    "hint": "Last 'a' in banana",
    "level": "basic",
    "options": [
      "1",
      "3",
      "5",
      "-1"
    ],
    "correctAnswer": 2,
    "codeExample": "\"banana\".lastIndexOf('a'); // 5"
  },
  {
    "id": 6,
    "question": "What is the output of: \"banana\".lastIndexOf(\"an\")?",
    "shortAnswer": "3",
    "explanation": "Occurrences of \"an\" start at index 1 and index 3. Last starts at 3.",
    "hint": "Last substring occurrence",
    "level": "intermediate",
    "options": [
      "1",
      "2",
      "3",
      "4"
    ],
    "correctAnswer": 2,
    "codeExample": "\"banana\".lastIndexOf(\"an\"); // 3"
  },
  {
    "id": 7,
    "question": "What does lastIndexOf('a', fromIndex) do?",
    "shortAnswer": "Searches backward starting AT fromIndex towards index 0.",
    "explanation": "Starts at fromIndex and moves left.",
    "hint": "Backward search from fromIndex",
    "level": "intermediate",
    "options": [
      "Searches forward from fromIndex",
      "Searches backward from fromIndex towards 0",
      "Deletes fromIndex",
      "Returns fromIndex"
    ],
    "correctAnswer": 1,
    "codeExample": "str.lastIndexOf('a', 3);"
  },
  {
    "id": 8,
    "question": "What is the output of: \"banana\".lastIndexOf('a', 4)?",
    "shortAnswer": "3",
    "explanation": "Searching backward from index 4: misses index 5, finds 'a' at index 3.",
    "hint": "Backward search starting at index 4",
    "level": "intermediate",
    "options": [
      "5",
      "4",
      "3",
      "1"
    ],
    "correctAnswer": 2,
    "codeExample": "\"banana\".lastIndexOf('a', 4); // 3"
  },
  {
    "id": 9,
    "question": "What happens if a character appears only ONCE in a string?",
    "shortAnswer": "indexOf() and lastIndexOf() return the EXACT same index value.",
    "explanation": "When unique, first index equals last index.",
    "hint": "Single occurrence equality",
    "level": "basic",
    "options": [
      "They return different values",
      "indexOf() == lastIndexOf()",
      "lastIndexOf() returns -1",
      "Error"
    ],
    "correctAnswer": 1,
    "codeExample": "s.indexOf(c) == s.lastIndexOf(c)"
  },
  {
    "id": 10,
    "question": "How do you test if a character 'c' is UNIQUE in a string 's'?",
    "shortAnswer": "s.indexOf(c) != -1 && s.indexOf(c) == s.lastIndexOf(c)",
    "explanation": "If first occurrence equals last occurrence, it appears exactly once.",
    "hint": "Unique character test idiom",
    "level": "intermediate",
    "options": [
      "s.indexOf(c) == 1",
      "s.indexOf(c) == s.lastIndexOf(c) && s.indexOf(c) != -1",
      "s.lastIndexOf(c) == 0",
      "s.count(c) == 1"
    ],
    "correctAnswer": 1,
    "codeExample": "Unique check"
  },
  {
    "id": 11,
    "question": "What does \"Kolkata\".lastIndexOf('Z') return?",
    "shortAnswer": "-1",
    "explanation": "When character is not found, lastIndexOf returns -1.",
    "hint": "Not found returns -1",
    "level": "basic",
    "options": [
      "0",
      "-1",
      "7",
      "Throws Exception"
    ],
    "correctAnswer": 1,
    "codeExample": "\"Kolkata\".lastIndexOf('Z'); // -1"
  },
  {
    "id": 12,
    "question": "What is the output of: \"apple\".lastIndexOf('p')?",
    "shortAnswer": "2",
    "explanation": "Indices of 'p' are 1 and 2. Last is 2.",
    "hint": "Last 'p' in apple",
    "level": "basic",
    "options": [
      "1",
      "2",
      "3",
      "0"
    ],
    "correctAnswer": 1,
    "codeExample": "\"apple\".lastIndexOf('p'); // 2"
  },
  {
    "id": 13,
    "question": "What happens if fromIndex >= string.length() in lastIndexOf('a', fromIndex)?",
    "shortAnswer": "Treated as if fromIndex was (length - 1), searching entire string backward.",
    "explanation": "Caps fromIndex at length - 1.",
    "hint": "Large fromIndex is capped",
    "level": "advanced",
    "options": [
      "Throws StringIndexOutOfBoundsException",
      "Searches entire string backward",
      "Returns -1",
      "Returns 0"
    ],
    "correctAnswer": 1,
    "codeExample": "Caps fromIndex at length - 1"
  },
  {
    "id": 14,
    "question": "What happens if fromIndex < 0 in lastIndexOf('a', fromIndex)?",
    "shortAnswer": "Returns -1 immediately without searching.",
    "explanation": "Cannot search backward before index 0.",
    "hint": "Negative fromIndex returns -1",
    "level": "intermediate",
    "options": [
      "Throws Exception",
      "Returns -1",
      "Treats as 0",
      "Searches forward"
    ],
    "correctAnswer": 1,
    "codeExample": "s.lastIndexOf('a', -1); // -1"
  },
  {
    "id": 15,
    "question": "What is the output of: \"West Bengal\".lastIndexOf(' ')?",
    "shortAnswer": "4",
    "explanation": "Single space at index 4.",
    "hint": "Space index",
    "level": "basic",
    "options": [
      "3",
      "4",
      "5",
      "-1"
    ],
    "correctAnswer": 1,
    "codeExample": "\"West Bengal\".lastIndexOf(' '); // 4"
  },
  {
    "id": 16,
    "question": "What is the output of: \"A B C D\".lastIndexOf(' ')?",
    "shortAnswer": "5",
    "explanation": "Spaces at indices 1, 3, 5. Last space is at 5.",
    "hint": "Last space index",
    "level": "intermediate",
    "options": [
      "1",
      "3",
      "5",
      "7"
    ],
    "correctAnswer": 2,
    "codeExample": "\"A B C D\".lastIndexOf(' '); // 5"
  },
  {
    "id": 17,
    "question": "How can you extract the last word of a sentence in ICSE Java?",
    "shortAnswer": "sentence.substring(sentence.lastIndexOf(' ') + 1)",
    "explanation": "Substring from index after the last space to the end.",
    "hint": "Extract last word idiom",
    "level": "intermediate",
    "options": [
      "sentence.substring(0, lastIndexOf(' '))",
      "sentence.substring(sentence.lastIndexOf(' ') + 1)",
      "sentence.lastWord()",
      "sentence.split(' ')[0]"
    ],
    "correctAnswer": 1,
    "codeExample": "s.substring(s.lastIndexOf(' ') + 1)"
  },
  {
    "id": 18,
    "question": "How can you extract the file extension from \"photo.final.jpg\"?",
    "shortAnswer": "filename.substring(filename.lastIndexOf('.') + 1)",
    "explanation": "Finds last dot '.' at index 11, substring from 12 gives \"jpg\".",
    "hint": "File extension extraction",
    "level": "intermediate",
    "options": [
      "filename.substring(filename.indexOf('.'))",
      "filename.substring(filename.lastIndexOf('.') + 1)",
      "filename.getExtension()",
      "filename.charAt(last)"
    ],
    "correctAnswer": 1,
    "codeExample": "f.substring(f.lastIndexOf('.') + 1)"
  },
  {
    "id": 19,
    "question": "What is the output of: \"ICSE\".lastIndexOf('e')?",
    "shortAnswer": "-1",
    "explanation": "Case-sensitive: 'e' is not found in uppercase \"ICSE\".",
    "hint": "Case sensitivity",
    "level": "basic",
    "options": [
      "3",
      "-1",
      "0",
      "4"
    ],
    "correctAnswer": 1,
    "codeExample": "\"ICSE\".lastIndexOf('e'); // -1"
  },
  {
    "id": 20,
    "question": "What does \"Hello World\".lastIndexOf(\"World\") return?",
    "shortAnswer": "6",
    "explanation": "Substring \"World\" starts at index 6.",
    "hint": "Last substring position",
    "level": "basic",
    "options": [
      "5",
      "6",
      "7",
      "-1"
    ],
    "correctAnswer": 1,
    "codeExample": "\"Hello World\".lastIndexOf(\"World\"); // 6"
  },
  {
    "id": 21,
    "question": "What does \"\".lastIndexOf('a') return?",
    "shortAnswer": "-1",
    "explanation": "Empty string has no characters, returns -1.",
    "hint": "Empty string check",
    "level": "basic",
    "options": [
      "0",
      "-1",
      "null",
      "Throws Exception"
    ],
    "correctAnswer": 1,
    "codeExample": "\"\".lastIndexOf('a'); // -1"
  },
  {
    "id": 22,
    "question": "What does \"Kolkata\".lastIndexOf(\"\") return?",
    "shortAnswer": "7 (string length)",
    "explanation": "Empty string is considered present at the end of the string (index = length).",
    "hint": "Empty string at end",
    "level": "advanced",
    "options": [
      "0",
      "7",
      "-1",
      "6"
    ],
    "correctAnswer": 1,
    "codeExample": "\"Kolkata\".lastIndexOf(\"\"); // 7"
  },
  {
    "id": 23,
    "question": "In an ICSE program to find the second last space, how do you use lastIndexOf()?",
    "shortAnswer": "int p1 = s.lastIndexOf(' '); int p2 = s.lastIndexOf(' ', p1 - 1);",
    "explanation": "Pass p1 - 1 as fromIndex to search backward past the first found space.",
    "hint": "Second last space pattern",
    "level": "advanced",
    "options": [
      "s.lastIndexOf(' ', 2)",
      "s.lastIndexOf(' ', s.lastIndexOf(' ') - 1)",
      "s.indexOf(' ') - 1",
      "s.lastIndexOf(' ') + 1"
    ],
    "correctAnswer": 1,
    "codeExample": "s.lastIndexOf(' ', p1 - 1)"
  },
  {
    "id": 24,
    "question": "What is the output of: String s = \"MISSISSIPPI\"; System.out.println(s.lastIndexOf('I'));?",
    "shortAnswer": "10",
    "explanation": "Last 'I' is at the very last index (10).",
    "hint": "Last 'I' in Mississippi",
    "level": "intermediate",
    "options": [
      "1",
      "4",
      "7",
      "10"
    ],
    "correctAnswer": 3,
    "codeExample": "\"MISSISSIPPI\".lastIndexOf('I'); // 10"
  },
  {
    "id": 25,
    "question": "What is the output of: String s = \"MISSISSIPPI\"; System.out.println(s.lastIndexOf(\"ISS\"));?",
    "shortAnswer": "4",
    "explanation": "\"ISS\" occurs at index 1 (\"MISS...\") and index 4 (\"...ISS...\"). Last is 4.",
    "hint": "Last substring occurrence",
    "level": "intermediate",
    "options": [
      "1",
      "4",
      "7",
      "10"
    ],
    "correctAnswer": 1,
    "codeExample": "\"MISSISSIPPI\".lastIndexOf(\"ISS\"); // 4"
  }
];

export default questions;
