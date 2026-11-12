const questions = [
  {
    "id": 1,
    "question": "What does compareTo() return?",
    "shortAnswer": "An integer value: 0 if equal, negative if this precedes argument, positive if this succeeds argument.",
    "explanation": "Lexicographical ASCII character difference.",
    "hint": "Returns int",
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
    "question": "What is the output of: \"A\".compareTo(\"B\")?",
    "shortAnswer": "-1",
    "explanation": "'A' (65) - 'B' (66) = -1.",
    "hint": "ASCII difference",
    "level": "basic",
    "options": [
      "-1",
      "0",
      "1",
      "-32"
    ],
    "correctAnswer": 0,
    "codeExample": "65 - 66 = -1"
  },
  {
    "id": 3,
    "question": "What is the output of: \"A\".compareTo(\"a\")?",
    "shortAnswer": "-32",
    "explanation": "'A' (65) - 'a' (97) = -32.",
    "hint": "Uppercase vs lowercase ASCII",
    "level": "basic",
    "options": [
      "32",
      "-32",
      "0",
      "-1"
    ],
    "correctAnswer": 1,
    "codeExample": "65 - 97 = -32"
  },
  {
    "id": 4,
    "question": "What is the output of: \"Apple\".compareTo(\"Apple\")?",
    "shortAnswer": "0",
    "explanation": "Exact character match returns 0.",
    "hint": "Identical strings return 0",
    "level": "basic",
    "options": [
      "0",
      "1",
      "-1",
      "true"
    ],
    "correctAnswer": 0,
    "codeExample": "Identical content -> 0"
  },
  {
    "id": 5,
    "question": "What does compareToIgnoreCase() return for \"apple\" and \"APPLE\"?",
    "shortAnswer": "0",
    "explanation": "Case is ignored, so all characters match, returning 0.",
    "hint": "Case ignored returns 0",
    "level": "basic",
    "options": [
      "0",
      "-32",
      "32",
      "-1"
    ],
    "correctAnswer": 0,
    "codeExample": "\"apple\".compareToIgnoreCase(\"APPLE\") = 0"
  },
  {
    "id": 6,
    "question": "Question 6 on Lexicographical Order: What integer result is calculated in compareTo scenario 6?",
    "shortAnswer": "Calculates (char1 - char2) at first mismatch, or (len1 - len2) if one is prefix of another.",
    "explanation": "compareTo() performs dictionary sorting by ASCII character subtraction. Question 6 reviews comparison math.",
    "hint": "Mismatch difference or length difference.",
    "level": "intermediate",
    "options": [
      "Random integer",
      "Difference of mismatch chars or lengths",
      "Always 1 or -1",
      "Boolean true or false"
    ],
    "correctAnswer": 1,
    "codeExample": "// compareTo evaluation 6"
  },
  {
    "id": 7,
    "question": "Question 7 on Lexicographical Order: What integer result is calculated in compareTo scenario 7?",
    "shortAnswer": "Calculates (char1 - char2) at first mismatch, or (len1 - len2) if one is prefix of another.",
    "explanation": "compareTo() performs dictionary sorting by ASCII character subtraction. Question 7 reviews comparison math.",
    "hint": "Mismatch difference or length difference.",
    "level": "intermediate",
    "options": [
      "Random integer",
      "Difference of mismatch chars or lengths",
      "Always 1 or -1",
      "Boolean true or false"
    ],
    "correctAnswer": 1,
    "codeExample": "// compareTo evaluation 7"
  },
  {
    "id": 8,
    "question": "Question 8 on Lexicographical Order: What integer result is calculated in compareTo scenario 8?",
    "shortAnswer": "Calculates (char1 - char2) at first mismatch, or (len1 - len2) if one is prefix of another.",
    "explanation": "compareTo() performs dictionary sorting by ASCII character subtraction. Question 8 reviews comparison math.",
    "hint": "Mismatch difference or length difference.",
    "level": "intermediate",
    "options": [
      "Random integer",
      "Difference of mismatch chars or lengths",
      "Always 1 or -1",
      "Boolean true or false"
    ],
    "correctAnswer": 1,
    "codeExample": "// compareTo evaluation 8"
  },
  {
    "id": 9,
    "question": "Question 9 on Lexicographical Order: What integer result is calculated in compareTo scenario 9?",
    "shortAnswer": "Calculates (char1 - char2) at first mismatch, or (len1 - len2) if one is prefix of another.",
    "explanation": "compareTo() performs dictionary sorting by ASCII character subtraction. Question 9 reviews comparison math.",
    "hint": "Mismatch difference or length difference.",
    "level": "intermediate",
    "options": [
      "Random integer",
      "Difference of mismatch chars or lengths",
      "Always 1 or -1",
      "Boolean true or false"
    ],
    "correctAnswer": 1,
    "codeExample": "// compareTo evaluation 9"
  },
  {
    "id": 10,
    "question": "Question 10 on Lexicographical Order: What integer result is calculated in compareTo scenario 10?",
    "shortAnswer": "Calculates (char1 - char2) at first mismatch, or (len1 - len2) if one is prefix of another.",
    "explanation": "compareTo() performs dictionary sorting by ASCII character subtraction. Question 10 reviews comparison math.",
    "hint": "Mismatch difference or length difference.",
    "level": "intermediate",
    "options": [
      "Random integer",
      "Difference of mismatch chars or lengths",
      "Always 1 or -1",
      "Boolean true or false"
    ],
    "correctAnswer": 1,
    "codeExample": "// compareTo evaluation 10"
  },
  {
    "id": 11,
    "question": "Question 11 on Lexicographical Order: What integer result is calculated in compareTo scenario 11?",
    "shortAnswer": "Calculates (char1 - char2) at first mismatch, or (len1 - len2) if one is prefix of another.",
    "explanation": "compareTo() performs dictionary sorting by ASCII character subtraction. Question 11 reviews comparison math.",
    "hint": "Mismatch difference or length difference.",
    "level": "intermediate",
    "options": [
      "Random integer",
      "Difference of mismatch chars or lengths",
      "Always 1 or -1",
      "Boolean true or false"
    ],
    "correctAnswer": 1,
    "codeExample": "// compareTo evaluation 11"
  },
  {
    "id": 12,
    "question": "Question 12 on Lexicographical Order: What integer result is calculated in compareTo scenario 12?",
    "shortAnswer": "Calculates (char1 - char2) at first mismatch, or (len1 - len2) if one is prefix of another.",
    "explanation": "compareTo() performs dictionary sorting by ASCII character subtraction. Question 12 reviews comparison math.",
    "hint": "Mismatch difference or length difference.",
    "level": "intermediate",
    "options": [
      "Random integer",
      "Difference of mismatch chars or lengths",
      "Always 1 or -1",
      "Boolean true or false"
    ],
    "correctAnswer": 1,
    "codeExample": "// compareTo evaluation 12"
  },
  {
    "id": 13,
    "question": "Question 13 on Lexicographical Order: What integer result is calculated in compareTo scenario 13?",
    "shortAnswer": "Calculates (char1 - char2) at first mismatch, or (len1 - len2) if one is prefix of another.",
    "explanation": "compareTo() performs dictionary sorting by ASCII character subtraction. Question 13 reviews comparison math.",
    "hint": "Mismatch difference or length difference.",
    "level": "intermediate",
    "options": [
      "Random integer",
      "Difference of mismatch chars or lengths",
      "Always 1 or -1",
      "Boolean true or false"
    ],
    "correctAnswer": 1,
    "codeExample": "// compareTo evaluation 13"
  },
  {
    "id": 14,
    "question": "Question 14 on Lexicographical Order: What integer result is calculated in compareTo scenario 14?",
    "shortAnswer": "Calculates (char1 - char2) at first mismatch, or (len1 - len2) if one is prefix of another.",
    "explanation": "compareTo() performs dictionary sorting by ASCII character subtraction. Question 14 reviews comparison math.",
    "hint": "Mismatch difference or length difference.",
    "level": "intermediate",
    "options": [
      "Random integer",
      "Difference of mismatch chars or lengths",
      "Always 1 or -1",
      "Boolean true or false"
    ],
    "correctAnswer": 1,
    "codeExample": "// compareTo evaluation 14"
  },
  {
    "id": 15,
    "question": "Question 15 on Lexicographical Order: What integer result is calculated in compareTo scenario 15?",
    "shortAnswer": "Calculates (char1 - char2) at first mismatch, or (len1 - len2) if one is prefix of another.",
    "explanation": "compareTo() performs dictionary sorting by ASCII character subtraction. Question 15 reviews comparison math.",
    "hint": "Mismatch difference or length difference.",
    "level": "intermediate",
    "options": [
      "Random integer",
      "Difference of mismatch chars or lengths",
      "Always 1 or -1",
      "Boolean true or false"
    ],
    "correctAnswer": 1,
    "codeExample": "// compareTo evaluation 15"
  },
  {
    "id": 16,
    "question": "Question 16 on Lexicographical Order: What integer result is calculated in compareTo scenario 16?",
    "shortAnswer": "Calculates (char1 - char2) at first mismatch, or (len1 - len2) if one is prefix of another.",
    "explanation": "compareTo() performs dictionary sorting by ASCII character subtraction. Question 16 reviews comparison math.",
    "hint": "Mismatch difference or length difference.",
    "level": "intermediate",
    "options": [
      "Random integer",
      "Difference of mismatch chars or lengths",
      "Always 1 or -1",
      "Boolean true or false"
    ],
    "correctAnswer": 1,
    "codeExample": "// compareTo evaluation 16"
  },
  {
    "id": 17,
    "question": "Question 17 on Lexicographical Order: What integer result is calculated in compareTo scenario 17?",
    "shortAnswer": "Calculates (char1 - char2) at first mismatch, or (len1 - len2) if one is prefix of another.",
    "explanation": "compareTo() performs dictionary sorting by ASCII character subtraction. Question 17 reviews comparison math.",
    "hint": "Mismatch difference or length difference.",
    "level": "intermediate",
    "options": [
      "Random integer",
      "Difference of mismatch chars or lengths",
      "Always 1 or -1",
      "Boolean true or false"
    ],
    "correctAnswer": 1,
    "codeExample": "// compareTo evaluation 17"
  },
  {
    "id": 18,
    "question": "Question 18 on Lexicographical Order: What integer result is calculated in compareTo scenario 18?",
    "shortAnswer": "Calculates (char1 - char2) at first mismatch, or (len1 - len2) if one is prefix of another.",
    "explanation": "compareTo() performs dictionary sorting by ASCII character subtraction. Question 18 reviews comparison math.",
    "hint": "Mismatch difference or length difference.",
    "level": "intermediate",
    "options": [
      "Random integer",
      "Difference of mismatch chars or lengths",
      "Always 1 or -1",
      "Boolean true or false"
    ],
    "correctAnswer": 1,
    "codeExample": "// compareTo evaluation 18"
  },
  {
    "id": 19,
    "question": "Question 19 on Lexicographical Order: What integer result is calculated in compareTo scenario 19?",
    "shortAnswer": "Calculates (char1 - char2) at first mismatch, or (len1 - len2) if one is prefix of another.",
    "explanation": "compareTo() performs dictionary sorting by ASCII character subtraction. Question 19 reviews comparison math.",
    "hint": "Mismatch difference or length difference.",
    "level": "advanced",
    "options": [
      "Random integer",
      "Difference of mismatch chars or lengths",
      "Always 1 or -1",
      "Boolean true or false"
    ],
    "correctAnswer": 1,
    "codeExample": "// compareTo evaluation 19"
  },
  {
    "id": 20,
    "question": "Question 20 on Lexicographical Order: What integer result is calculated in compareTo scenario 20?",
    "shortAnswer": "Calculates (char1 - char2) at first mismatch, or (len1 - len2) if one is prefix of another.",
    "explanation": "compareTo() performs dictionary sorting by ASCII character subtraction. Question 20 reviews comparison math.",
    "hint": "Mismatch difference or length difference.",
    "level": "advanced",
    "options": [
      "Random integer",
      "Difference of mismatch chars or lengths",
      "Always 1 or -1",
      "Boolean true or false"
    ],
    "correctAnswer": 1,
    "codeExample": "// compareTo evaluation 20"
  },
  {
    "id": 21,
    "question": "Question 21 on Lexicographical Order: What integer result is calculated in compareTo scenario 21?",
    "shortAnswer": "Calculates (char1 - char2) at first mismatch, or (len1 - len2) if one is prefix of another.",
    "explanation": "compareTo() performs dictionary sorting by ASCII character subtraction. Question 21 reviews comparison math.",
    "hint": "Mismatch difference or length difference.",
    "level": "advanced",
    "options": [
      "Random integer",
      "Difference of mismatch chars or lengths",
      "Always 1 or -1",
      "Boolean true or false"
    ],
    "correctAnswer": 1,
    "codeExample": "// compareTo evaluation 21"
  },
  {
    "id": 22,
    "question": "Question 22 on Lexicographical Order: What integer result is calculated in compareTo scenario 22?",
    "shortAnswer": "Calculates (char1 - char2) at first mismatch, or (len1 - len2) if one is prefix of another.",
    "explanation": "compareTo() performs dictionary sorting by ASCII character subtraction. Question 22 reviews comparison math.",
    "hint": "Mismatch difference or length difference.",
    "level": "advanced",
    "options": [
      "Random integer",
      "Difference of mismatch chars or lengths",
      "Always 1 or -1",
      "Boolean true or false"
    ],
    "correctAnswer": 1,
    "codeExample": "// compareTo evaluation 22"
  },
  {
    "id": 23,
    "question": "Question 23 on Lexicographical Order: What integer result is calculated in compareTo scenario 23?",
    "shortAnswer": "Calculates (char1 - char2) at first mismatch, or (len1 - len2) if one is prefix of another.",
    "explanation": "compareTo() performs dictionary sorting by ASCII character subtraction. Question 23 reviews comparison math.",
    "hint": "Mismatch difference or length difference.",
    "level": "advanced",
    "options": [
      "Random integer",
      "Difference of mismatch chars or lengths",
      "Always 1 or -1",
      "Boolean true or false"
    ],
    "correctAnswer": 1,
    "codeExample": "// compareTo evaluation 23"
  },
  {
    "id": 24,
    "question": "Question 24 on Lexicographical Order: What integer result is calculated in compareTo scenario 24?",
    "shortAnswer": "Calculates (char1 - char2) at first mismatch, or (len1 - len2) if one is prefix of another.",
    "explanation": "compareTo() performs dictionary sorting by ASCII character subtraction. Question 24 reviews comparison math.",
    "hint": "Mismatch difference or length difference.",
    "level": "advanced",
    "options": [
      "Random integer",
      "Difference of mismatch chars or lengths",
      "Always 1 or -1",
      "Boolean true or false"
    ],
    "correctAnswer": 1,
    "codeExample": "// compareTo evaluation 24"
  },
  {
    "id": 25,
    "question": "Question 25 on Lexicographical Order: What integer result is calculated in compareTo scenario 25?",
    "shortAnswer": "Calculates (char1 - char2) at first mismatch, or (len1 - len2) if one is prefix of another.",
    "explanation": "compareTo() performs dictionary sorting by ASCII character subtraction. Question 25 reviews comparison math.",
    "hint": "Mismatch difference or length difference.",
    "level": "advanced",
    "options": [
      "Random integer",
      "Difference of mismatch chars or lengths",
      "Always 1 or -1",
      "Boolean true or false"
    ],
    "correctAnswer": 1,
    "codeExample": "// compareTo evaluation 25"
  }
];

export default questions;
