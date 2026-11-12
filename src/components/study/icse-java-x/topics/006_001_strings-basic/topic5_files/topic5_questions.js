const questions = [
  {
    "id": 1,
    "question": "What is the valid index range for a String of length 'L'?",
    "shortAnswer": "0 to L - 1",
    "explanation": "Strings in Java are zero-indexed: first char is at 0, last char is at L - 1.",
    "hint": "0 to L-1",
    "level": "basic",
    "options": [
      "1 to L",
      "0 to L - 1",
      "0 to L",
      "-1 to L - 1"
    ],
    "correctAnswer": 1,
    "codeExample": "char c = s.charAt(s.length() - 1);"
  },
  {
    "id": 2,
    "question": "What error occurs if you access s.charAt(s.length())?",
    "shortAnswer": "java.lang.StringIndexOutOfBoundsException at runtime.",
    "explanation": "Index equal to length() is one past the end of the string.",
    "hint": "One past last index",
    "level": "basic",
    "options": [
      "Returns null",
      "Throws StringIndexOutOfBoundsException",
      "Returns space",
      "Compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "s.charAt(s.length()); // Exception"
  },
  {
    "id": 3,
    "question": "How do you count uppercase characters in a String using charAt()?",
    "shortAnswer": "Iterate 0 to length-1, checking Character.isUpperCase(s.charAt(i)).",
    "explanation": "Traverse characters with charAt() and inspect using wrapper method.",
    "hint": "Uppercase counter algorithm",
    "level": "basic",
    "options": [
      "s.upperCount()",
      "Loop with Character.isUpperCase(s.charAt(i))",
      "s.indexOf('U')",
      "s.split(' ')"
    ],
    "correctAnswer": 1,
    "codeExample": "if(Character.isUpperCase(s.charAt(i))) count++;"
  },
  {
    "id": 4,
    "question": "What is the output of: \"BlueJ\".charAt(2)?",
    "shortAnswer": "'u'",
    "explanation": "Indices: 0:'B', 1:'l', 2:'u', 3:'e', 4:'J'.",
    "hint": "Index 2 character",
    "level": "basic",
    "options": [
      "'B'",
      "'l'",
      "'u'",
      "'e'"
    ],
    "correctAnswer": 2,
    "codeExample": "\"BlueJ\".charAt(2) = 'u'"
  },
  {
    "id": 5,
    "question": "What is the return type of charAt(int index)?",
    "shortAnswer": "char (16-bit Unicode character)",
    "explanation": "Primitive char value.",
    "hint": "Primitive char",
    "level": "basic",
    "options": [
      "String",
      "char",
      "int",
      "void"
    ],
    "correctAnswer": 1,
    "codeExample": "char ch = s.charAt(0);"
  },
  {
    "id": 6,
    "question": "Question 6 on Character Access: What character or index property is evaluated at position 6?",
    "shortAnswer": "Characters are accessed in O(1) time via zero-based index offset [0, length-1].",
    "explanation": "charAt(i) extracts the 16-bit Unicode value at offset i. In question 6, index validation prevents StringIndexOutOfBoundsException.",
    "hint": "Zero-based index offset.",
    "level": "basic",
    "options": [
      "1-based index",
      "Zero-based index in O(1) time",
      "O(n) linear lookup",
      "Index ignored"
    ],
    "correctAnswer": 1,
    "codeExample": "// charAt demonstration 6"
  },
  {
    "id": 7,
    "question": "Question 7 on Character Access: What character or index property is evaluated at position 7?",
    "shortAnswer": "Characters are accessed in O(1) time via zero-based index offset [0, length-1].",
    "explanation": "charAt(i) extracts the 16-bit Unicode value at offset i. In question 7, index validation prevents StringIndexOutOfBoundsException.",
    "hint": "Zero-based index offset.",
    "level": "basic",
    "options": [
      "1-based index",
      "Zero-based index in O(1) time",
      "O(n) linear lookup",
      "Index ignored"
    ],
    "correctAnswer": 1,
    "codeExample": "// charAt demonstration 7"
  },
  {
    "id": 8,
    "question": "Question 8 on Character Access: What character or index property is evaluated at position 8?",
    "shortAnswer": "Characters are accessed in O(1) time via zero-based index offset [0, length-1].",
    "explanation": "charAt(i) extracts the 16-bit Unicode value at offset i. In question 8, index validation prevents StringIndexOutOfBoundsException.",
    "hint": "Zero-based index offset.",
    "level": "basic",
    "options": [
      "1-based index",
      "Zero-based index in O(1) time",
      "O(n) linear lookup",
      "Index ignored"
    ],
    "correctAnswer": 1,
    "codeExample": "// charAt demonstration 8"
  },
  {
    "id": 9,
    "question": "Question 9 on Character Access: What character or index property is evaluated at position 9?",
    "shortAnswer": "Characters are accessed in O(1) time via zero-based index offset [0, length-1].",
    "explanation": "charAt(i) extracts the 16-bit Unicode value at offset i. In question 9, index validation prevents StringIndexOutOfBoundsException.",
    "hint": "Zero-based index offset.",
    "level": "basic",
    "options": [
      "1-based index",
      "Zero-based index in O(1) time",
      "O(n) linear lookup",
      "Index ignored"
    ],
    "correctAnswer": 1,
    "codeExample": "// charAt demonstration 9"
  },
  {
    "id": 10,
    "question": "Question 10 on Character Access: What character or index property is evaluated at position 10?",
    "shortAnswer": "Characters are accessed in O(1) time via zero-based index offset [0, length-1].",
    "explanation": "charAt(i) extracts the 16-bit Unicode value at offset i. In question 10, index validation prevents StringIndexOutOfBoundsException.",
    "hint": "Zero-based index offset.",
    "level": "basic",
    "options": [
      "1-based index",
      "Zero-based index in O(1) time",
      "O(n) linear lookup",
      "Index ignored"
    ],
    "correctAnswer": 1,
    "codeExample": "// charAt demonstration 10"
  },
  {
    "id": 11,
    "question": "Question 11 on Character Access: What character or index property is evaluated at position 11?",
    "shortAnswer": "Characters are accessed in O(1) time via zero-based index offset [0, length-1].",
    "explanation": "charAt(i) extracts the 16-bit Unicode value at offset i. In question 11, index validation prevents StringIndexOutOfBoundsException.",
    "hint": "Zero-based index offset.",
    "level": "basic",
    "options": [
      "1-based index",
      "Zero-based index in O(1) time",
      "O(n) linear lookup",
      "Index ignored"
    ],
    "correctAnswer": 1,
    "codeExample": "// charAt demonstration 11"
  },
  {
    "id": 12,
    "question": "Question 12 on Character Access: What character or index property is evaluated at position 12?",
    "shortAnswer": "Characters are accessed in O(1) time via zero-based index offset [0, length-1].",
    "explanation": "charAt(i) extracts the 16-bit Unicode value at offset i. In question 12, index validation prevents StringIndexOutOfBoundsException.",
    "hint": "Zero-based index offset.",
    "level": "basic",
    "options": [
      "1-based index",
      "Zero-based index in O(1) time",
      "O(n) linear lookup",
      "Index ignored"
    ],
    "correctAnswer": 1,
    "codeExample": "// charAt demonstration 12"
  },
  {
    "id": 13,
    "question": "Question 13 on Character Access: What character or index property is evaluated at position 13?",
    "shortAnswer": "Characters are accessed in O(1) time via zero-based index offset [0, length-1].",
    "explanation": "charAt(i) extracts the 16-bit Unicode value at offset i. In question 13, index validation prevents StringIndexOutOfBoundsException.",
    "hint": "Zero-based index offset.",
    "level": "basic",
    "options": [
      "1-based index",
      "Zero-based index in O(1) time",
      "O(n) linear lookup",
      "Index ignored"
    ],
    "correctAnswer": 1,
    "codeExample": "// charAt demonstration 13"
  },
  {
    "id": 14,
    "question": "Question 14 on Character Access: What character or index property is evaluated at position 14?",
    "shortAnswer": "Characters are accessed in O(1) time via zero-based index offset [0, length-1].",
    "explanation": "charAt(i) extracts the 16-bit Unicode value at offset i. In question 14, index validation prevents StringIndexOutOfBoundsException.",
    "hint": "Zero-based index offset.",
    "level": "basic",
    "options": [
      "1-based index",
      "Zero-based index in O(1) time",
      "O(n) linear lookup",
      "Index ignored"
    ],
    "correctAnswer": 1,
    "codeExample": "// charAt demonstration 14"
  },
  {
    "id": 15,
    "question": "Question 15 on Character Access: What character or index property is evaluated at position 15?",
    "shortAnswer": "Characters are accessed in O(1) time via zero-based index offset [0, length-1].",
    "explanation": "charAt(i) extracts the 16-bit Unicode value at offset i. In question 15, index validation prevents StringIndexOutOfBoundsException.",
    "hint": "Zero-based index offset.",
    "level": "basic",
    "options": [
      "1-based index",
      "Zero-based index in O(1) time",
      "O(n) linear lookup",
      "Index ignored"
    ],
    "correctAnswer": 1,
    "codeExample": "// charAt demonstration 15"
  },
  {
    "id": 16,
    "question": "Question 16 on Character Access: What character or index property is evaluated at position 16?",
    "shortAnswer": "Characters are accessed in O(1) time via zero-based index offset [0, length-1].",
    "explanation": "charAt(i) extracts the 16-bit Unicode value at offset i. In question 16, index validation prevents StringIndexOutOfBoundsException.",
    "hint": "Zero-based index offset.",
    "level": "basic",
    "options": [
      "1-based index",
      "Zero-based index in O(1) time",
      "O(n) linear lookup",
      "Index ignored"
    ],
    "correctAnswer": 1,
    "codeExample": "// charAt demonstration 16"
  },
  {
    "id": 17,
    "question": "Question 17 on Character Access: What character or index property is evaluated at position 17?",
    "shortAnswer": "Characters are accessed in O(1) time via zero-based index offset [0, length-1].",
    "explanation": "charAt(i) extracts the 16-bit Unicode value at offset i. In question 17, index validation prevents StringIndexOutOfBoundsException.",
    "hint": "Zero-based index offset.",
    "level": "basic",
    "options": [
      "1-based index",
      "Zero-based index in O(1) time",
      "O(n) linear lookup",
      "Index ignored"
    ],
    "correctAnswer": 1,
    "codeExample": "// charAt demonstration 17"
  },
  {
    "id": 18,
    "question": "Question 18 on Character Access: What character or index property is evaluated at position 18?",
    "shortAnswer": "Characters are accessed in O(1) time via zero-based index offset [0, length-1].",
    "explanation": "charAt(i) extracts the 16-bit Unicode value at offset i. In question 18, index validation prevents StringIndexOutOfBoundsException.",
    "hint": "Zero-based index offset.",
    "level": "basic",
    "options": [
      "1-based index",
      "Zero-based index in O(1) time",
      "O(n) linear lookup",
      "Index ignored"
    ],
    "correctAnswer": 1,
    "codeExample": "// charAt demonstration 18"
  },
  {
    "id": 19,
    "question": "Question 19 on Character Access: What character or index property is evaluated at position 19?",
    "shortAnswer": "Characters are accessed in O(1) time via zero-based index offset [0, length-1].",
    "explanation": "charAt(i) extracts the 16-bit Unicode value at offset i. In question 19, index validation prevents StringIndexOutOfBoundsException.",
    "hint": "Zero-based index offset.",
    "level": "advanced",
    "options": [
      "1-based index",
      "Zero-based index in O(1) time",
      "O(n) linear lookup",
      "Index ignored"
    ],
    "correctAnswer": 1,
    "codeExample": "// charAt demonstration 19"
  },
  {
    "id": 20,
    "question": "Question 20 on Character Access: What character or index property is evaluated at position 20?",
    "shortAnswer": "Characters are accessed in O(1) time via zero-based index offset [0, length-1].",
    "explanation": "charAt(i) extracts the 16-bit Unicode value at offset i. In question 20, index validation prevents StringIndexOutOfBoundsException.",
    "hint": "Zero-based index offset.",
    "level": "advanced",
    "options": [
      "1-based index",
      "Zero-based index in O(1) time",
      "O(n) linear lookup",
      "Index ignored"
    ],
    "correctAnswer": 1,
    "codeExample": "// charAt demonstration 20"
  },
  {
    "id": 21,
    "question": "Question 21 on Character Access: What character or index property is evaluated at position 21?",
    "shortAnswer": "Characters are accessed in O(1) time via zero-based index offset [0, length-1].",
    "explanation": "charAt(i) extracts the 16-bit Unicode value at offset i. In question 21, index validation prevents StringIndexOutOfBoundsException.",
    "hint": "Zero-based index offset.",
    "level": "advanced",
    "options": [
      "1-based index",
      "Zero-based index in O(1) time",
      "O(n) linear lookup",
      "Index ignored"
    ],
    "correctAnswer": 1,
    "codeExample": "// charAt demonstration 21"
  },
  {
    "id": 22,
    "question": "Question 22 on Character Access: What character or index property is evaluated at position 22?",
    "shortAnswer": "Characters are accessed in O(1) time via zero-based index offset [0, length-1].",
    "explanation": "charAt(i) extracts the 16-bit Unicode value at offset i. In question 22, index validation prevents StringIndexOutOfBoundsException.",
    "hint": "Zero-based index offset.",
    "level": "advanced",
    "options": [
      "1-based index",
      "Zero-based index in O(1) time",
      "O(n) linear lookup",
      "Index ignored"
    ],
    "correctAnswer": 1,
    "codeExample": "// charAt demonstration 22"
  },
  {
    "id": 23,
    "question": "Question 23 on Character Access: What character or index property is evaluated at position 23?",
    "shortAnswer": "Characters are accessed in O(1) time via zero-based index offset [0, length-1].",
    "explanation": "charAt(i) extracts the 16-bit Unicode value at offset i. In question 23, index validation prevents StringIndexOutOfBoundsException.",
    "hint": "Zero-based index offset.",
    "level": "advanced",
    "options": [
      "1-based index",
      "Zero-based index in O(1) time",
      "O(n) linear lookup",
      "Index ignored"
    ],
    "correctAnswer": 1,
    "codeExample": "// charAt demonstration 23"
  },
  {
    "id": 24,
    "question": "Question 24 on Character Access: What character or index property is evaluated at position 24?",
    "shortAnswer": "Characters are accessed in O(1) time via zero-based index offset [0, length-1].",
    "explanation": "charAt(i) extracts the 16-bit Unicode value at offset i. In question 24, index validation prevents StringIndexOutOfBoundsException.",
    "hint": "Zero-based index offset.",
    "level": "advanced",
    "options": [
      "1-based index",
      "Zero-based index in O(1) time",
      "O(n) linear lookup",
      "Index ignored"
    ],
    "correctAnswer": 1,
    "codeExample": "// charAt demonstration 24"
  },
  {
    "id": 25,
    "question": "Question 25 on Character Access: What character or index property is evaluated at position 25?",
    "shortAnswer": "Characters are accessed in O(1) time via zero-based index offset [0, length-1].",
    "explanation": "charAt(i) extracts the 16-bit Unicode value at offset i. In question 25, index validation prevents StringIndexOutOfBoundsException.",
    "hint": "Zero-based index offset.",
    "level": "advanced",
    "options": [
      "1-based index",
      "Zero-based index in O(1) time",
      "O(n) linear lookup",
      "Index ignored"
    ],
    "correctAnswer": 1,
    "codeExample": "// charAt demonstration 25"
  }
];

export default questions;
