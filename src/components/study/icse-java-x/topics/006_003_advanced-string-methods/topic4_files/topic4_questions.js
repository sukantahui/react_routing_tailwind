const questions = [
  {
    "id": 1,
    "question": "What is the return type of substring(int beginIndex, int endIndex)?",
    "shortAnswer": "String",
    "explanation": "substring() returns a String object representing the sub-sequence.",
    "hint": "Returns a String.",
    "level": "basic",
    "options": [
      "char",
      "String",
      "char[]",
      "int"
    ],
    "correctAnswer": 1,
    "codeExample": "String part = s.substring(0, 3);"
  },
  {
    "id": 2,
    "question": "What does this print in ICSE: \"KOLKATA\".substring(3, 6)?",
    "shortAnswer": "\"KAT\"",
    "explanation": "Indices: 3 ('K'), 4 ('A'), 5 ('T'). Index 6 is excluded. Characters extracted = 6 - 3 = 3.",
    "hint": "From index 3 to 5 (6 is excluded).",
    "level": "basic",
    "options": [
      "\"KAT\"",
      "\"KATA\"",
      "\"LKAT\"",
      "\"OLK\""
    ],
    "correctAnswer": 0,
    "codeExample": "\"KOLKATA\".substring(3, 6); // \"KAT\""
  },
  {
    "id": 3,
    "question": "What does \"INDIA\".substring(2) return?",
    "shortAnswer": "\"DIA\"",
    "explanation": "Single argument substring extracts from index 2 ('D') all the way to the end: \"DIA\".",
    "hint": "From index 2 to end.",
    "level": "basic",
    "options": [
      "\"NDIA\"",
      "\"DIA\"",
      "\"IA\"",
      "\"IND\""
    ],
    "correctAnswer": 1,
    "codeExample": "\"INDIA\".substring(2); // \"DIA\""
  },
  {
    "id": 4,
    "question": "What is the output of: \"SCIENCE\".substring(3, 3)?",
    "shortAnswer": "\"\" (empty string)",
    "explanation": "When beginIndex == endIndex, the number of characters extracted is 3 - 3 = 0, returning \"\".",
    "hint": "Zero characters extracted.",
    "level": "intermediate",
    "options": [
      "\"I\"",
      "\"E\"",
      "\"\" (empty string)",
      "Throws StringIndexOutOfBoundsException"
    ],
    "correctAnswer": 2,
    "codeExample": "\"SCIENCE\".substring(3, 3); // \"\""
  },
  {
    "id": 5,
    "question": "What happens when executing: \"BlueJ\".substring(2, 8)?",
    "shortAnswer": "java.lang.StringIndexOutOfBoundsException is thrown.",
    "explanation": "\"BlueJ\".length() is 5. Since endIndex (8) exceeds the string length, an exception is thrown.",
    "hint": "End index is beyond string length.",
    "level": "intermediate",
    "options": [
      "Returns \"ueJ\"",
      "Throws StringIndexOutOfBoundsException",
      "Returns \"ueJ   \"",
      "Compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "\"BlueJ\".substring(2, 8); // StringIndexOutOfBoundsException"
  },
  {
    "id": 6,
    "question": "What is the formula to calculate the number of characters extracted by substring(b, e)?",
    "shortAnswer": "e - b (endIndex minus beginIndex)",
    "explanation": "Length of resulting substring is always endIndex - beginIndex.",
    "hint": "Length formula",
    "level": "basic",
    "options": [
      "e - b + 1",
      "e - b",
      "e - b - 1",
      "e + b"
    ],
    "correctAnswer": 1,
    "codeExample": "length = e - b"
  },
  {
    "id": 7,
    "question": "Is beginIndex inclusive or exclusive in substring(beginIndex, endIndex)?",
    "shortAnswer": "beginIndex is INCLUSIVE (included in result).",
    "explanation": "Character at beginIndex is part of output.",
    "hint": "Inclusive begin",
    "level": "basic",
    "options": [
      "Inclusive",
      "Exclusive",
      "Optional",
      "Depends on length"
    ],
    "correctAnswer": 0,
    "codeExample": "beginIndex is inclusive"
  },
  {
    "id": 8,
    "question": "Is endIndex inclusive or exclusive in substring(beginIndex, endIndex)?",
    "shortAnswer": "endIndex is EXCLUSIVE (excluded from result).",
    "explanation": "Extraction stops at index (endIndex - 1).",
    "hint": "Exclusive end",
    "level": "basic",
    "options": [
      "Inclusive",
      "Exclusive",
      "Included if odd",
      "None"
    ],
    "correctAnswer": 1,
    "codeExample": "endIndex is exclusive"
  },
  {
    "id": 9,
    "question": "What is the output of: \"BARRACKPORE\".substring(0, 7)?",
    "shortAnswer": "\"BARRACK\"",
    "explanation": "Indices 0 through 6 give \"BARRACK\". Length is 7 - 0 = 7.",
    "hint": "Extract first 7 chars",
    "level": "basic",
    "options": [
      "\"BARRACK\"",
      "\"BARRACKP\"",
      "\"BARRAC\"",
      "\"PORE\""
    ],
    "correctAnswer": 0,
    "codeExample": "\"BARRACK\""
  },
  {
    "id": 10,
    "question": "What is the output of: \"BARRACKPORE\".substring(7)?",
    "shortAnswer": "\"PORE\"",
    "explanation": "Extracts from index 7 ('P') to the end of string.",
    "hint": "From index 7 to end",
    "level": "basic",
    "options": [
      "\"PORE\"",
      "\"KPORE\"",
      "\"CKPORE\"",
      "\"BARRACK\""
    ],
    "correctAnswer": 0,
    "codeExample": "\"PORE\""
  },
  {
    "id": 11,
    "question": "What does \"Computer\".substring(0, 1) return?",
    "shortAnswer": "\"C\"",
    "explanation": "Extracts character at index 0 as a String of length 1.",
    "hint": "First char as String",
    "level": "basic",
    "options": [
      "'C'",
      "\"C\"",
      "\"Co\"",
      "\"\""
    ],
    "correctAnswer": 1,
    "codeExample": "\"Computer\".substring(0, 1) = \"C\""
  },
  {
    "id": 12,
    "question": "What happens if beginIndex > endIndex: \"Java\".substring(3, 1)?",
    "shortAnswer": "Throws java.lang.StringIndexOutOfBoundsException.",
    "explanation": "beginIndex cannot be greater than endIndex.",
    "hint": "beginIndex exceeds endIndex",
    "level": "intermediate",
    "options": [
      "Reverses the string",
      "Throws StringIndexOutOfBoundsException",
      "Returns empty string",
      "Returns null"
    ],
    "correctAnswer": 1,
    "codeExample": "StringIndexOutOfBoundsException"
  },
  {
    "id": 13,
    "question": "What happens if beginIndex < 0 in substring(beginIndex)?",
    "shortAnswer": "Throws java.lang.StringIndexOutOfBoundsException.",
    "explanation": "Negative index is illegal in Java strings.",
    "hint": "Negative begin index",
    "level": "basic",
    "options": [
      "Counts from end",
      "Throws StringIndexOutOfBoundsException",
      "Returns whole string",
      "Returns empty string"
    ],
    "correctAnswer": 1,
    "codeExample": "Negative index throws exception"
  },
  {
    "id": 14,
    "question": "What does \"Kolkata\".substring(0, \"Kolkata\".length()) return?",
    "shortAnswer": "\"Kolkata\" (entire string)",
    "explanation": "From index 0 to length() extracts all characters.",
    "hint": "Full string substring",
    "level": "basic",
    "options": [
      "\"Kolkata\"",
      "\"Kolkata \"",
      "\"Kolkat\"",
      "Exception"
    ],
    "correctAnswer": 0,
    "codeExample": "\"Kolkata\""
  },
  {
    "id": 15,
    "question": "In Pig Latin logic, how do you rearrange \"LONDON\" to \"ONDONLAY\"?",
    "shortAnswer": "word.substring(1) + word.substring(0, 1) + \"AY\"",
    "explanation": "substring(1) gives \"ONDON\"; substring(0, 1) gives \"L\"; + \"AY\" = \"ONDONLAY\".",
    "hint": "Pig Latin standard formula",
    "level": "intermediate",
    "options": [
      "word.substring(0) + \"AY\"",
      "word.substring(1) + word.substring(0, 1) + \"AY\"",
      "word.reverse() + \"AY\"",
      "word.replace('L', ' ') + \"AY\""
    ],
    "correctAnswer": 1,
    "codeExample": "Pig Latin formula"
  },
  {
    "id": 16,
    "question": "What is the output of: String s = \"Understanding\"; System.out.println(s.substring(5, 10));?",
    "shortAnswer": "\"rstan\"",
    "explanation": "Indices 5,6,7,8,9: 'r', 's', 't', 'a', 'n'.",
    "hint": "Extracting indices 5 to 9",
    "level": "intermediate",
    "options": [
      "\"stand\"",
      "\"rstan\"",
      "\"derst\"",
      "\"standi\""
    ],
    "correctAnswer": 1,
    "codeExample": "\"rstan\""
  },
  {
    "id": 17,
    "question": "What does \"ICSE 2026\".substring(5) return?",
    "shortAnswer": "\"2026\"",
    "explanation": "Indices 0-4 are 'I','C','S','E',' '; index 5 begins \"2026\".",
    "hint": "Extract suffix",
    "level": "basic",
    "options": [
      "\"2026\"",
      "\" 2026\"",
      "\"ICSE\"",
      "\"6\""
    ],
    "correctAnswer": 0,
    "codeExample": "\"2026\""
  },
  {
    "id": 18,
    "question": "How can you extract the initials from a name like \"Mohandas Karamchand Gandhi\"?",
    "shortAnswer": "Take charAt(0) or substring(0,1), and after every space take character at space + 1.",
    "explanation": "Using space index + 1 for each initial.",
    "hint": "Initials extraction pattern",
    "level": "intermediate",
    "options": [
      "Split by comma",
      "Take first char and chars immediately following spaces",
      "Take last 3 chars",
      "Use toUpperCase() only"
    ],
    "correctAnswer": 1,
    "codeExample": "Initials extraction"
  },
  {
    "id": 19,
    "question": "What is the output of: \"BlueJ\".substring(1, 4)?",
    "shortAnswer": "\"lue\"",
    "explanation": "Indices: 1 ('l'), 2 ('u'), 3 ('e'). Length = 4 - 1 = 3.",
    "hint": "Indices 1, 2, 3",
    "level": "basic",
    "options": [
      "\"Blue\"",
      "\"lue\"",
      "\"lueJ\"",
      "\"BlueJ\""
    ],
    "correctAnswer": 1,
    "codeExample": "\"lue\""
  },
  {
    "id": 20,
    "question": "What does \"\".substring(0, 0) return?",
    "shortAnswer": "\"\" (empty string)",
    "explanation": "Valid because 0 <= beginIndex <= endIndex <= length (0 <= 0 <= 0 <= 0).",
    "hint": "Empty string valid substring",
    "level": "intermediate",
    "options": [
      "\"\"",
      "null",
      "Exception",
      "Error"
    ],
    "correctAnswer": 0,
    "codeExample": "\"\""
  },
  {
    "id": 21,
    "question": "Does substring() modify the original String?",
    "shortAnswer": "No, String is immutable; a new String object is returned.",
    "explanation": "Original string is never modified.",
    "hint": "Immutability principle",
    "level": "basic",
    "options": [
      "Yes",
      "No, Strings are immutable",
      "Only if stored in pool",
      "Only in Java 11"
    ],
    "correctAnswer": 1,
    "codeExample": "Strings are immutable"
  },
  {
    "id": 22,
    "question": "What is the output of: String s = \"JAVA\"; s.substring(1); System.out.println(s);?",
    "shortAnswer": "\"JAVA\"",
    "explanation": "s was not reassigned, so s remains \"JAVA\".",
    "hint": "Immutability check",
    "level": "basic",
    "options": [
      "\"AVA\"",
      "\"JAVA\"",
      "\"A\"",
      "Error"
    ],
    "correctAnswer": 1,
    "codeExample": "s is still \"JAVA\""
  },
  {
    "id": 23,
    "question": "What is the output of: \"apple\".substring(2, 3)?",
    "shortAnswer": "\"p\"",
    "explanation": "Length is 3 - 2 = 1. Character at index 2 is 'p'.",
    "hint": "Single character substring",
    "level": "basic",
    "options": [
      "\"pp\"",
      "\"p\"",
      "\"l\"",
      "\"a\""
    ],
    "correctAnswer": 1,
    "codeExample": "\"p\""
  },
  {
    "id": 24,
    "question": "What does \"012345\".substring(2, 5) evaluate to?",
    "shortAnswer": "\"234\"",
    "explanation": "Indices 2, 3, 4.",
    "hint": "Numeric digit indices",
    "level": "basic",
    "options": [
      "\"2345\"",
      "\"234\"",
      "\"1234\"",
      "\"345\""
    ],
    "correctAnswer": 1,
    "codeExample": "\"234\""
  },
  {
    "id": 25,
    "question": "Why is substring() tested in almost EVERY ICSE Class X board paper?",
    "shortAnswer": "Because it tests index boundary awareness, 0-based indexing, and algorithmic slicing skills.",
    "explanation": "Fundamental string manipulation tool in ICSE syllabus.",
    "hint": "Core board syllabus concept",
    "level": "basic",
    "options": [
      "It is easy to grade",
      "Tests index boundaries, inclusive/exclusive rules, and text parsing",
      "Only method in String",
      "BlueJ requirement"
    ],
    "correctAnswer": 1,
    "codeExample": "Core syllabus testing"
  }
];

export default questions;
