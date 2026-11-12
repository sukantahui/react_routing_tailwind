const questions = [
  {
    "id": 1,
    "question": "Which method is used to remove all leading and trailing whitespace from a String in ICSE Java?",
    "shortAnswer": "trim()",
    "explanation": "public String trim() strips leading and trailing spaces.",
    "hint": "trim method",
    "level": "basic",
    "options": [
      "clean()",
      "trim()",
      "stripSpaces()",
      "delete()"
    ],
    "correctAnswer": 1,
    "codeExample": "s.trim()"
  },
  {
    "id": 2,
    "question": "What is the result of \"Computer\".substring(0, 4)?",
    "shortAnswer": "\"Comp\"",
    "explanation": "Indices 0, 1, 2, 3 give \"Comp\".",
    "hint": "Indices 0 to 3",
    "level": "basic",
    "options": [
      "\"Comp\"",
      "\"Compu\"",
      "\"ompu\"",
      "\"Comput\""
    ],
    "correctAnswer": 0,
    "codeExample": "\"Computer\".substring(0, 4) = \"Comp\""
  },
  {
    "id": 3,
    "question": "What does \"BLUEJ\".indexOf('Z') evaluate to?",
    "shortAnswer": "-1",
    "explanation": "Absent characters return -1.",
    "hint": "Absent returns -1",
    "level": "basic",
    "options": [
      "0",
      "-1",
      "null",
      "5"
    ],
    "correctAnswer": 1,
    "codeExample": "\"BLUEJ\".indexOf('Z') = -1"
  },
  {
    "id": 4,
    "question": "What does \"HELLO\".toLowerCase().equals(\"hello\") return?",
    "shortAnswer": "true",
    "explanation": "\"HELLO\".toLowerCase() is \"hello\", matching \"hello\".",
    "hint": "Convert then equals",
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
    "id": 5,
    "question": "Which keyword ensures a variable points to a compile-time string constant?",
    "shortAnswer": "final",
    "explanation": "final variables with constant initializers are inlined and pooled by javac.",
    "hint": "final keyword",
    "level": "basic",
    "options": [
      "static",
      "final",
      "abstract",
      "transient"
    ],
    "correctAnswer": 1,
    "codeExample": "final String S = \"CONSTANT\";"
  },
  {
    "id": 6,
    "question": "Question 6 on Board Practice: What is the correct option for syllabus question 6?",
    "shortAnswer": "Synthesizes String methods, array conversions, loop traversal, and character validation.",
    "explanation": "Comprehensive preparation for ICSE Class X Computer Applications examination. Practice question 6 solidifies board exam readiness.",
    "hint": "ICSE Board mastery question.",
    "level": "basic",
    "options": [
      "Invalid syntax",
      "Correct board solution applying standard library methods",
      "Deprecated pattern",
      "Requires third party library"
    ],
    "correctAnswer": 1,
    "codeExample": "// Board practice question 6"
  },
  {
    "id": 7,
    "question": "Question 7 on Board Practice: What is the correct option for syllabus question 7?",
    "shortAnswer": "Synthesizes String methods, array conversions, loop traversal, and character validation.",
    "explanation": "Comprehensive preparation for ICSE Class X Computer Applications examination. Practice question 7 solidifies board exam readiness.",
    "hint": "ICSE Board mastery question.",
    "level": "basic",
    "options": [
      "Invalid syntax",
      "Correct board solution applying standard library methods",
      "Deprecated pattern",
      "Requires third party library"
    ],
    "correctAnswer": 1,
    "codeExample": "// Board practice question 7"
  },
  {
    "id": 8,
    "question": "Question 8 on Board Practice: What is the correct option for syllabus question 8?",
    "shortAnswer": "Synthesizes String methods, array conversions, loop traversal, and character validation.",
    "explanation": "Comprehensive preparation for ICSE Class X Computer Applications examination. Practice question 8 solidifies board exam readiness.",
    "hint": "ICSE Board mastery question.",
    "level": "basic",
    "options": [
      "Invalid syntax",
      "Correct board solution applying standard library methods",
      "Deprecated pattern",
      "Requires third party library"
    ],
    "correctAnswer": 1,
    "codeExample": "// Board practice question 8"
  },
  {
    "id": 9,
    "question": "Question 9 on Board Practice: What is the correct option for syllabus question 9?",
    "shortAnswer": "Synthesizes String methods, array conversions, loop traversal, and character validation.",
    "explanation": "Comprehensive preparation for ICSE Class X Computer Applications examination. Practice question 9 solidifies board exam readiness.",
    "hint": "ICSE Board mastery question.",
    "level": "basic",
    "options": [
      "Invalid syntax",
      "Correct board solution applying standard library methods",
      "Deprecated pattern",
      "Requires third party library"
    ],
    "correctAnswer": 1,
    "codeExample": "// Board practice question 9"
  },
  {
    "id": 10,
    "question": "Question 10 on Board Practice: What is the correct option for syllabus question 10?",
    "shortAnswer": "Synthesizes String methods, array conversions, loop traversal, and character validation.",
    "explanation": "Comprehensive preparation for ICSE Class X Computer Applications examination. Practice question 10 solidifies board exam readiness.",
    "hint": "ICSE Board mastery question.",
    "level": "basic",
    "options": [
      "Invalid syntax",
      "Correct board solution applying standard library methods",
      "Deprecated pattern",
      "Requires third party library"
    ],
    "correctAnswer": 1,
    "codeExample": "// Board practice question 10"
  },
  {
    "id": 11,
    "question": "Question 11 on Board Practice: What is the correct option for syllabus question 11?",
    "shortAnswer": "Synthesizes String methods, array conversions, loop traversal, and character validation.",
    "explanation": "Comprehensive preparation for ICSE Class X Computer Applications examination. Practice question 11 solidifies board exam readiness.",
    "hint": "ICSE Board mastery question.",
    "level": "basic",
    "options": [
      "Invalid syntax",
      "Correct board solution applying standard library methods",
      "Deprecated pattern",
      "Requires third party library"
    ],
    "correctAnswer": 1,
    "codeExample": "// Board practice question 11"
  },
  {
    "id": 12,
    "question": "Question 12 on Board Practice: What is the correct option for syllabus question 12?",
    "shortAnswer": "Synthesizes String methods, array conversions, loop traversal, and character validation.",
    "explanation": "Comprehensive preparation for ICSE Class X Computer Applications examination. Practice question 12 solidifies board exam readiness.",
    "hint": "ICSE Board mastery question.",
    "level": "basic",
    "options": [
      "Invalid syntax",
      "Correct board solution applying standard library methods",
      "Deprecated pattern",
      "Requires third party library"
    ],
    "correctAnswer": 1,
    "codeExample": "// Board practice question 12"
  },
  {
    "id": 13,
    "question": "Question 13 on Board Practice: What is the correct option for syllabus question 13?",
    "shortAnswer": "Synthesizes String methods, array conversions, loop traversal, and character validation.",
    "explanation": "Comprehensive preparation for ICSE Class X Computer Applications examination. Practice question 13 solidifies board exam readiness.",
    "hint": "ICSE Board mastery question.",
    "level": "basic",
    "options": [
      "Invalid syntax",
      "Correct board solution applying standard library methods",
      "Deprecated pattern",
      "Requires third party library"
    ],
    "correctAnswer": 1,
    "codeExample": "// Board practice question 13"
  },
  {
    "id": 14,
    "question": "Question 14 on Board Practice: What is the correct option for syllabus question 14?",
    "shortAnswer": "Synthesizes String methods, array conversions, loop traversal, and character validation.",
    "explanation": "Comprehensive preparation for ICSE Class X Computer Applications examination. Practice question 14 solidifies board exam readiness.",
    "hint": "ICSE Board mastery question.",
    "level": "basic",
    "options": [
      "Invalid syntax",
      "Correct board solution applying standard library methods",
      "Deprecated pattern",
      "Requires third party library"
    ],
    "correctAnswer": 1,
    "codeExample": "// Board practice question 14"
  },
  {
    "id": 15,
    "question": "Question 15 on Board Practice: What is the correct option for syllabus question 15?",
    "shortAnswer": "Synthesizes String methods, array conversions, loop traversal, and character validation.",
    "explanation": "Comprehensive preparation for ICSE Class X Computer Applications examination. Practice question 15 solidifies board exam readiness.",
    "hint": "ICSE Board mastery question.",
    "level": "basic",
    "options": [
      "Invalid syntax",
      "Correct board solution applying standard library methods",
      "Deprecated pattern",
      "Requires third party library"
    ],
    "correctAnswer": 1,
    "codeExample": "// Board practice question 15"
  },
  {
    "id": 16,
    "question": "Question 16 on Board Practice: What is the correct option for syllabus question 16?",
    "shortAnswer": "Synthesizes String methods, array conversions, loop traversal, and character validation.",
    "explanation": "Comprehensive preparation for ICSE Class X Computer Applications examination. Practice question 16 solidifies board exam readiness.",
    "hint": "ICSE Board mastery question.",
    "level": "basic",
    "options": [
      "Invalid syntax",
      "Correct board solution applying standard library methods",
      "Deprecated pattern",
      "Requires third party library"
    ],
    "correctAnswer": 1,
    "codeExample": "// Board practice question 16"
  },
  {
    "id": 17,
    "question": "Question 17 on Board Practice: What is the correct option for syllabus question 17?",
    "shortAnswer": "Synthesizes String methods, array conversions, loop traversal, and character validation.",
    "explanation": "Comprehensive preparation for ICSE Class X Computer Applications examination. Practice question 17 solidifies board exam readiness.",
    "hint": "ICSE Board mastery question.",
    "level": "basic",
    "options": [
      "Invalid syntax",
      "Correct board solution applying standard library methods",
      "Deprecated pattern",
      "Requires third party library"
    ],
    "correctAnswer": 1,
    "codeExample": "// Board practice question 17"
  },
  {
    "id": 18,
    "question": "Question 18 on Board Practice: What is the correct option for syllabus question 18?",
    "shortAnswer": "Synthesizes String methods, array conversions, loop traversal, and character validation.",
    "explanation": "Comprehensive preparation for ICSE Class X Computer Applications examination. Practice question 18 solidifies board exam readiness.",
    "hint": "ICSE Board mastery question.",
    "level": "basic",
    "options": [
      "Invalid syntax",
      "Correct board solution applying standard library methods",
      "Deprecated pattern",
      "Requires third party library"
    ],
    "correctAnswer": 1,
    "codeExample": "// Board practice question 18"
  },
  {
    "id": 19,
    "question": "Question 19 on Board Practice: What is the correct option for syllabus question 19?",
    "shortAnswer": "Synthesizes String methods, array conversions, loop traversal, and character validation.",
    "explanation": "Comprehensive preparation for ICSE Class X Computer Applications examination. Practice question 19 solidifies board exam readiness.",
    "hint": "ICSE Board mastery question.",
    "level": "advanced",
    "options": [
      "Invalid syntax",
      "Correct board solution applying standard library methods",
      "Deprecated pattern",
      "Requires third party library"
    ],
    "correctAnswer": 1,
    "codeExample": "// Board practice question 19"
  },
  {
    "id": 20,
    "question": "Question 20 on Board Practice: What is the correct option for syllabus question 20?",
    "shortAnswer": "Synthesizes String methods, array conversions, loop traversal, and character validation.",
    "explanation": "Comprehensive preparation for ICSE Class X Computer Applications examination. Practice question 20 solidifies board exam readiness.",
    "hint": "ICSE Board mastery question.",
    "level": "advanced",
    "options": [
      "Invalid syntax",
      "Correct board solution applying standard library methods",
      "Deprecated pattern",
      "Requires third party library"
    ],
    "correctAnswer": 1,
    "codeExample": "// Board practice question 20"
  },
  {
    "id": 21,
    "question": "Question 21 on Board Practice: What is the correct option for syllabus question 21?",
    "shortAnswer": "Synthesizes String methods, array conversions, loop traversal, and character validation.",
    "explanation": "Comprehensive preparation for ICSE Class X Computer Applications examination. Practice question 21 solidifies board exam readiness.",
    "hint": "ICSE Board mastery question.",
    "level": "advanced",
    "options": [
      "Invalid syntax",
      "Correct board solution applying standard library methods",
      "Deprecated pattern",
      "Requires third party library"
    ],
    "correctAnswer": 1,
    "codeExample": "// Board practice question 21"
  },
  {
    "id": 22,
    "question": "Question 22 on Board Practice: What is the correct option for syllabus question 22?",
    "shortAnswer": "Synthesizes String methods, array conversions, loop traversal, and character validation.",
    "explanation": "Comprehensive preparation for ICSE Class X Computer Applications examination. Practice question 22 solidifies board exam readiness.",
    "hint": "ICSE Board mastery question.",
    "level": "advanced",
    "options": [
      "Invalid syntax",
      "Correct board solution applying standard library methods",
      "Deprecated pattern",
      "Requires third party library"
    ],
    "correctAnswer": 1,
    "codeExample": "// Board practice question 22"
  },
  {
    "id": 23,
    "question": "Question 23 on Board Practice: What is the correct option for syllabus question 23?",
    "shortAnswer": "Synthesizes String methods, array conversions, loop traversal, and character validation.",
    "explanation": "Comprehensive preparation for ICSE Class X Computer Applications examination. Practice question 23 solidifies board exam readiness.",
    "hint": "ICSE Board mastery question.",
    "level": "advanced",
    "options": [
      "Invalid syntax",
      "Correct board solution applying standard library methods",
      "Deprecated pattern",
      "Requires third party library"
    ],
    "correctAnswer": 1,
    "codeExample": "// Board practice question 23"
  },
  {
    "id": 24,
    "question": "Question 24 on Board Practice: What is the correct option for syllabus question 24?",
    "shortAnswer": "Synthesizes String methods, array conversions, loop traversal, and character validation.",
    "explanation": "Comprehensive preparation for ICSE Class X Computer Applications examination. Practice question 24 solidifies board exam readiness.",
    "hint": "ICSE Board mastery question.",
    "level": "advanced",
    "options": [
      "Invalid syntax",
      "Correct board solution applying standard library methods",
      "Deprecated pattern",
      "Requires third party library"
    ],
    "correctAnswer": 1,
    "codeExample": "// Board practice question 24"
  },
  {
    "id": 25,
    "question": "Question 25 on Board Practice: What is the correct option for syllabus question 25?",
    "shortAnswer": "Synthesizes String methods, array conversions, loop traversal, and character validation.",
    "explanation": "Comprehensive preparation for ICSE Class X Computer Applications examination. Practice question 25 solidifies board exam readiness.",
    "hint": "ICSE Board mastery question.",
    "level": "advanced",
    "options": [
      "Invalid syntax",
      "Correct board solution applying standard library methods",
      "Deprecated pattern",
      "Requires third party library"
    ],
    "correctAnswer": 1,
    "codeExample": "// Board practice question 25"
  }
];

export default questions;
