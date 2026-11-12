const questions = [
  {
    "id": 1,
    "question": "Which of the following classes is IMMUTABLE in Java?",
    "shortAnswer": "java.lang.String",
    "explanation": "String is immutable; StringBuffer and StringBuilder are mutable.",
    "hint": "Immutable class check",
    "level": "basic",
    "options": [
      "StringBuilder",
      "StringBuffer",
      "String",
      "char[]"
    ],
    "correctAnswer": 2,
    "codeExample": "String is immutable"
  },
  {
    "id": 2,
    "question": "Why does String concatenation inside a large loop cause performance degradation?",
    "shortAnswer": "It creates unnecessary intermediate String objects on the Heap on every iteration.",
    "explanation": "Each concatenation creates a new String, causing memory churn and O(N^2) complexity.",
    "hint": "Intermediate object creation",
    "level": "intermediate",
    "options": [
      "String concatenation is illegal in loops",
      "Creates numerous intermediate heap objects causing high memory churn",
      "Loops freeze the JVM",
      "It requires multithreading"
    ],
    "correctAnswer": 1,
    "codeExample": "High memory allocation in loops"
  },
  {
    "id": 3,
    "question": "When should you prefer String over StringBuilder?",
    "shortAnswer": "When strings are constant, shared, passed as method arguments, or used as Map keys.",
    "explanation": "Immutability provides thread safety and caching.",
    "hint": "When immutability is advantageous",
    "level": "basic",
    "options": [
      "Never",
      "When immutability, thread safety, and pool sharing are desired",
      "Only for single letters",
      "Only for passwords"
    ],
    "correctAnswer": 1,
    "codeExample": "Constant / shared values"
  },
  {
    "id": 4,
    "question": "How can you convert a StringBuilder 'sb' back to an immutable String?",
    "shortAnswer": "sb.toString()",
    "explanation": "toString() constructs and returns an immutable String from the buffer.",
    "hint": "toString conversion",
    "level": "basic",
    "options": [
      "(String)sb",
      "sb.toString()",
      "String.parse(sb)",
      "sb.toImmutable()"
    ],
    "correctAnswer": 1,
    "codeExample": "String s = sb.toString();"
  },
  {
    "id": 5,
    "question": "Can you use '==' to compare contents of two StringBuffer objects?",
    "shortAnswer": "No, StringBuffer does not override equals(), so both == and .equals() check references!",
    "explanation": "To compare StringBuffer contents, convert them to String via .toString().equals().",
    "hint": "StringBuffer equals pitfall",
    "level": "advanced",
    "options": [
      "Yes, compares content",
      "No, StringBuffer inherits reference-equality Object.equals()",
      "Throws Compile Error",
      "Only in Java 17"
    ],
    "correctAnswer": 1,
    "codeExample": "sb1.toString().equals(sb2.toString())"
  },
  {
    "id": 6,
    "question": "Question 6 on Mutable vs Immutable Handling: What is the design tradeoff in use case 6?",
    "shortAnswer": "String offers immutability and pool safety; StringBuilder offers mutable high-speed appending.",
    "explanation": "ICSE Class X conceptual theory questions compare String with StringBuffer. Use case 6 examines this architectural choice.",
    "hint": "Tradeoff between safety and performance.",
    "level": "basic",
    "options": [
      "Both are identical in performance",
      "String ensures safety/caching; StringBuilder optimizes mutable assembly",
      "StringBuilder is immutable",
      "String is deprecated"
    ],
    "correctAnswer": 1,
    "codeExample": "// Design tradeoff case 6"
  },
  {
    "id": 7,
    "question": "Question 7 on Mutable vs Immutable Handling: What is the design tradeoff in use case 7?",
    "shortAnswer": "String offers immutability and pool safety; StringBuilder offers mutable high-speed appending.",
    "explanation": "ICSE Class X conceptual theory questions compare String with StringBuffer. Use case 7 examines this architectural choice.",
    "hint": "Tradeoff between safety and performance.",
    "level": "basic",
    "options": [
      "Both are identical in performance",
      "String ensures safety/caching; StringBuilder optimizes mutable assembly",
      "StringBuilder is immutable",
      "String is deprecated"
    ],
    "correctAnswer": 1,
    "codeExample": "// Design tradeoff case 7"
  },
  {
    "id": 8,
    "question": "Question 8 on Mutable vs Immutable Handling: What is the design tradeoff in use case 8?",
    "shortAnswer": "String offers immutability and pool safety; StringBuilder offers mutable high-speed appending.",
    "explanation": "ICSE Class X conceptual theory questions compare String with StringBuffer. Use case 8 examines this architectural choice.",
    "hint": "Tradeoff between safety and performance.",
    "level": "basic",
    "options": [
      "Both are identical in performance",
      "String ensures safety/caching; StringBuilder optimizes mutable assembly",
      "StringBuilder is immutable",
      "String is deprecated"
    ],
    "correctAnswer": 1,
    "codeExample": "// Design tradeoff case 8"
  },
  {
    "id": 9,
    "question": "Question 9 on Mutable vs Immutable Handling: What is the design tradeoff in use case 9?",
    "shortAnswer": "String offers immutability and pool safety; StringBuilder offers mutable high-speed appending.",
    "explanation": "ICSE Class X conceptual theory questions compare String with StringBuffer. Use case 9 examines this architectural choice.",
    "hint": "Tradeoff between safety and performance.",
    "level": "basic",
    "options": [
      "Both are identical in performance",
      "String ensures safety/caching; StringBuilder optimizes mutable assembly",
      "StringBuilder is immutable",
      "String is deprecated"
    ],
    "correctAnswer": 1,
    "codeExample": "// Design tradeoff case 9"
  },
  {
    "id": 10,
    "question": "Question 10 on Mutable vs Immutable Handling: What is the design tradeoff in use case 10?",
    "shortAnswer": "String offers immutability and pool safety; StringBuilder offers mutable high-speed appending.",
    "explanation": "ICSE Class X conceptual theory questions compare String with StringBuffer. Use case 10 examines this architectural choice.",
    "hint": "Tradeoff between safety and performance.",
    "level": "basic",
    "options": [
      "Both are identical in performance",
      "String ensures safety/caching; StringBuilder optimizes mutable assembly",
      "StringBuilder is immutable",
      "String is deprecated"
    ],
    "correctAnswer": 1,
    "codeExample": "// Design tradeoff case 10"
  },
  {
    "id": 11,
    "question": "Question 11 on Mutable vs Immutable Handling: What is the design tradeoff in use case 11?",
    "shortAnswer": "String offers immutability and pool safety; StringBuilder offers mutable high-speed appending.",
    "explanation": "ICSE Class X conceptual theory questions compare String with StringBuffer. Use case 11 examines this architectural choice.",
    "hint": "Tradeoff between safety and performance.",
    "level": "basic",
    "options": [
      "Both are identical in performance",
      "String ensures safety/caching; StringBuilder optimizes mutable assembly",
      "StringBuilder is immutable",
      "String is deprecated"
    ],
    "correctAnswer": 1,
    "codeExample": "// Design tradeoff case 11"
  },
  {
    "id": 12,
    "question": "Question 12 on Mutable vs Immutable Handling: What is the design tradeoff in use case 12?",
    "shortAnswer": "String offers immutability and pool safety; StringBuilder offers mutable high-speed appending.",
    "explanation": "ICSE Class X conceptual theory questions compare String with StringBuffer. Use case 12 examines this architectural choice.",
    "hint": "Tradeoff between safety and performance.",
    "level": "basic",
    "options": [
      "Both are identical in performance",
      "String ensures safety/caching; StringBuilder optimizes mutable assembly",
      "StringBuilder is immutable",
      "String is deprecated"
    ],
    "correctAnswer": 1,
    "codeExample": "// Design tradeoff case 12"
  },
  {
    "id": 13,
    "question": "Question 13 on Mutable vs Immutable Handling: What is the design tradeoff in use case 13?",
    "shortAnswer": "String offers immutability and pool safety; StringBuilder offers mutable high-speed appending.",
    "explanation": "ICSE Class X conceptual theory questions compare String with StringBuffer. Use case 13 examines this architectural choice.",
    "hint": "Tradeoff between safety and performance.",
    "level": "basic",
    "options": [
      "Both are identical in performance",
      "String ensures safety/caching; StringBuilder optimizes mutable assembly",
      "StringBuilder is immutable",
      "String is deprecated"
    ],
    "correctAnswer": 1,
    "codeExample": "// Design tradeoff case 13"
  },
  {
    "id": 14,
    "question": "Question 14 on Mutable vs Immutable Handling: What is the design tradeoff in use case 14?",
    "shortAnswer": "String offers immutability and pool safety; StringBuilder offers mutable high-speed appending.",
    "explanation": "ICSE Class X conceptual theory questions compare String with StringBuffer. Use case 14 examines this architectural choice.",
    "hint": "Tradeoff between safety and performance.",
    "level": "basic",
    "options": [
      "Both are identical in performance",
      "String ensures safety/caching; StringBuilder optimizes mutable assembly",
      "StringBuilder is immutable",
      "String is deprecated"
    ],
    "correctAnswer": 1,
    "codeExample": "// Design tradeoff case 14"
  },
  {
    "id": 15,
    "question": "Question 15 on Mutable vs Immutable Handling: What is the design tradeoff in use case 15?",
    "shortAnswer": "String offers immutability and pool safety; StringBuilder offers mutable high-speed appending.",
    "explanation": "ICSE Class X conceptual theory questions compare String with StringBuffer. Use case 15 examines this architectural choice.",
    "hint": "Tradeoff between safety and performance.",
    "level": "basic",
    "options": [
      "Both are identical in performance",
      "String ensures safety/caching; StringBuilder optimizes mutable assembly",
      "StringBuilder is immutable",
      "String is deprecated"
    ],
    "correctAnswer": 1,
    "codeExample": "// Design tradeoff case 15"
  },
  {
    "id": 16,
    "question": "Question 16 on Mutable vs Immutable Handling: What is the design tradeoff in use case 16?",
    "shortAnswer": "String offers immutability and pool safety; StringBuilder offers mutable high-speed appending.",
    "explanation": "ICSE Class X conceptual theory questions compare String with StringBuffer. Use case 16 examines this architectural choice.",
    "hint": "Tradeoff between safety and performance.",
    "level": "basic",
    "options": [
      "Both are identical in performance",
      "String ensures safety/caching; StringBuilder optimizes mutable assembly",
      "StringBuilder is immutable",
      "String is deprecated"
    ],
    "correctAnswer": 1,
    "codeExample": "// Design tradeoff case 16"
  },
  {
    "id": 17,
    "question": "Question 17 on Mutable vs Immutable Handling: What is the design tradeoff in use case 17?",
    "shortAnswer": "String offers immutability and pool safety; StringBuilder offers mutable high-speed appending.",
    "explanation": "ICSE Class X conceptual theory questions compare String with StringBuffer. Use case 17 examines this architectural choice.",
    "hint": "Tradeoff between safety and performance.",
    "level": "basic",
    "options": [
      "Both are identical in performance",
      "String ensures safety/caching; StringBuilder optimizes mutable assembly",
      "StringBuilder is immutable",
      "String is deprecated"
    ],
    "correctAnswer": 1,
    "codeExample": "// Design tradeoff case 17"
  },
  {
    "id": 18,
    "question": "Question 18 on Mutable vs Immutable Handling: What is the design tradeoff in use case 18?",
    "shortAnswer": "String offers immutability and pool safety; StringBuilder offers mutable high-speed appending.",
    "explanation": "ICSE Class X conceptual theory questions compare String with StringBuffer. Use case 18 examines this architectural choice.",
    "hint": "Tradeoff between safety and performance.",
    "level": "basic",
    "options": [
      "Both are identical in performance",
      "String ensures safety/caching; StringBuilder optimizes mutable assembly",
      "StringBuilder is immutable",
      "String is deprecated"
    ],
    "correctAnswer": 1,
    "codeExample": "// Design tradeoff case 18"
  },
  {
    "id": 19,
    "question": "Question 19 on Mutable vs Immutable Handling: What is the design tradeoff in use case 19?",
    "shortAnswer": "String offers immutability and pool safety; StringBuilder offers mutable high-speed appending.",
    "explanation": "ICSE Class X conceptual theory questions compare String with StringBuffer. Use case 19 examines this architectural choice.",
    "hint": "Tradeoff between safety and performance.",
    "level": "advanced",
    "options": [
      "Both are identical in performance",
      "String ensures safety/caching; StringBuilder optimizes mutable assembly",
      "StringBuilder is immutable",
      "String is deprecated"
    ],
    "correctAnswer": 1,
    "codeExample": "// Design tradeoff case 19"
  },
  {
    "id": 20,
    "question": "Question 20 on Mutable vs Immutable Handling: What is the design tradeoff in use case 20?",
    "shortAnswer": "String offers immutability and pool safety; StringBuilder offers mutable high-speed appending.",
    "explanation": "ICSE Class X conceptual theory questions compare String with StringBuffer. Use case 20 examines this architectural choice.",
    "hint": "Tradeoff between safety and performance.",
    "level": "advanced",
    "options": [
      "Both are identical in performance",
      "String ensures safety/caching; StringBuilder optimizes mutable assembly",
      "StringBuilder is immutable",
      "String is deprecated"
    ],
    "correctAnswer": 1,
    "codeExample": "// Design tradeoff case 20"
  },
  {
    "id": 21,
    "question": "Question 21 on Mutable vs Immutable Handling: What is the design tradeoff in use case 21?",
    "shortAnswer": "String offers immutability and pool safety; StringBuilder offers mutable high-speed appending.",
    "explanation": "ICSE Class X conceptual theory questions compare String with StringBuffer. Use case 21 examines this architectural choice.",
    "hint": "Tradeoff between safety and performance.",
    "level": "advanced",
    "options": [
      "Both are identical in performance",
      "String ensures safety/caching; StringBuilder optimizes mutable assembly",
      "StringBuilder is immutable",
      "String is deprecated"
    ],
    "correctAnswer": 1,
    "codeExample": "// Design tradeoff case 21"
  },
  {
    "id": 22,
    "question": "Question 22 on Mutable vs Immutable Handling: What is the design tradeoff in use case 22?",
    "shortAnswer": "String offers immutability and pool safety; StringBuilder offers mutable high-speed appending.",
    "explanation": "ICSE Class X conceptual theory questions compare String with StringBuffer. Use case 22 examines this architectural choice.",
    "hint": "Tradeoff between safety and performance.",
    "level": "advanced",
    "options": [
      "Both are identical in performance",
      "String ensures safety/caching; StringBuilder optimizes mutable assembly",
      "StringBuilder is immutable",
      "String is deprecated"
    ],
    "correctAnswer": 1,
    "codeExample": "// Design tradeoff case 22"
  },
  {
    "id": 23,
    "question": "Question 23 on Mutable vs Immutable Handling: What is the design tradeoff in use case 23?",
    "shortAnswer": "String offers immutability and pool safety; StringBuilder offers mutable high-speed appending.",
    "explanation": "ICSE Class X conceptual theory questions compare String with StringBuffer. Use case 23 examines this architectural choice.",
    "hint": "Tradeoff between safety and performance.",
    "level": "advanced",
    "options": [
      "Both are identical in performance",
      "String ensures safety/caching; StringBuilder optimizes mutable assembly",
      "StringBuilder is immutable",
      "String is deprecated"
    ],
    "correctAnswer": 1,
    "codeExample": "// Design tradeoff case 23"
  },
  {
    "id": 24,
    "question": "Question 24 on Mutable vs Immutable Handling: What is the design tradeoff in use case 24?",
    "shortAnswer": "String offers immutability and pool safety; StringBuilder offers mutable high-speed appending.",
    "explanation": "ICSE Class X conceptual theory questions compare String with StringBuffer. Use case 24 examines this architectural choice.",
    "hint": "Tradeoff between safety and performance.",
    "level": "advanced",
    "options": [
      "Both are identical in performance",
      "String ensures safety/caching; StringBuilder optimizes mutable assembly",
      "StringBuilder is immutable",
      "String is deprecated"
    ],
    "correctAnswer": 1,
    "codeExample": "// Design tradeoff case 24"
  },
  {
    "id": 25,
    "question": "Question 25 on Mutable vs Immutable Handling: What is the design tradeoff in use case 25?",
    "shortAnswer": "String offers immutability and pool safety; StringBuilder offers mutable high-speed appending.",
    "explanation": "ICSE Class X conceptual theory questions compare String with StringBuffer. Use case 25 examines this architectural choice.",
    "hint": "Tradeoff between safety and performance.",
    "level": "advanced",
    "options": [
      "Both are identical in performance",
      "String ensures safety/caching; StringBuilder optimizes mutable assembly",
      "StringBuilder is immutable",
      "String is deprecated"
    ],
    "correctAnswer": 1,
    "codeExample": "// Design tradeoff case 25"
  }
];

export default questions;
