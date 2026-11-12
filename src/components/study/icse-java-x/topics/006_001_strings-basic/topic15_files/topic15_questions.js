const questions = [
  {
    "id": 1,
    "question": "Are StringBuilder and StringBuffer mutable in Java?",
    "shortAnswer": "Yes, both are mutable; their internal character sequence can be modified in-place.",
    "explanation": "Unlike String, they allow in-place appending and modifications without allocating new objects.",
    "hint": "Mutable string buffers",
    "level": "basic",
    "options": [
      "No, both are immutable",
      "Yes, both are mutable",
      "Only StringBuffer is mutable",
      "Only String is mutable"
    ],
    "correctAnswer": 1,
    "codeExample": "StringBuilder sb = new StringBuilder(\"Hi\"); sb.append(\"!\");"
  },
  {
    "id": 2,
    "question": "What is the primary difference between StringBuilder and StringBuffer?",
    "shortAnswer": "StringBuffer is thread-safe (synchronized); StringBuilder is not thread-safe (faster).",
    "explanation": "StringBuilder has lower overhead in single-threaded environments.",
    "hint": "Thread safety / synchronization",
    "level": "intermediate",
    "options": [
      "No difference",
      "StringBuffer is synchronized; StringBuilder is unsynchronized and faster",
      "StringBuilder is in java.util",
      "StringBuffer is immutable"
    ],
    "correctAnswer": 1,
    "codeExample": "StringBuffer: synchronized; StringBuilder: not synchronized"
  },
  {
    "id": 3,
    "question": "In which package do StringBuilder and StringBuffer reside?",
    "shortAnswer": "java.lang",
    "explanation": "Both reside in java.lang and are automatically imported.",
    "hint": "java.lang package",
    "level": "basic",
    "options": [
      "java.util",
      "java.lang",
      "java.text",
      "java.io"
    ],
    "correctAnswer": 1,
    "codeExample": "java.lang.StringBuilder"
  },
  {
    "id": 4,
    "question": "How do you reverse a string easily using StringBuilder in Java?",
    "shortAnswer": "new StringBuilder(str).reverse().toString()",
    "explanation": "StringBuilder provides a built-in reverse() method that reverses the character sequence in-place.",
    "hint": "Built-in reverse method",
    "level": "basic",
    "options": [
      "str.reverse()",
      "new StringBuilder(str).reverse().toString()",
      "str.invert()",
      "Collections.reverse(str)"
    ],
    "correctAnswer": 1,
    "codeExample": "sb.reverse().toString()"
  },
  {
    "id": 5,
    "question": "What is the default initial capacity of an empty StringBuilder()?",
    "shortAnswer": "16 characters.",
    "explanation": "Default buffer size is 16 characters before automatic expansion.",
    "hint": "Initial capacity 16",
    "level": "advanced",
    "options": [
      "0",
      "10",
      "16",
      "32"
    ],
    "correctAnswer": 2,
    "codeExample": "new StringBuilder().capacity() == 16"
  },
  {
    "id": 6,
    "question": "Question 6 on StringBuilder & StringBuffer: How does mutable buffer management work in scenario 6?",
    "shortAnswer": "Mutable buffers dynamically expand internal arrays (capacity * 2 + 2) without throwing OutOfMemory in ordinary operations.",
    "explanation": "StringBuilder and StringBuffer provide efficient buffer manipulation for high-volume string appending. Question 6 reinforces mutable string concepts.",
    "hint": "Mutable buffer expansion.",
    "level": "intermediate",
    "options": [
      "Creates new objects on every append",
      "Mutates internal array in-place, expanding capacity dynamically",
      "Does not allow deletion",
      "Only stores numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Mutable buffer scenario 6"
  },
  {
    "id": 7,
    "question": "Question 7 on StringBuilder & StringBuffer: How does mutable buffer management work in scenario 7?",
    "shortAnswer": "Mutable buffers dynamically expand internal arrays (capacity * 2 + 2) without throwing OutOfMemory in ordinary operations.",
    "explanation": "StringBuilder and StringBuffer provide efficient buffer manipulation for high-volume string appending. Question 7 reinforces mutable string concepts.",
    "hint": "Mutable buffer expansion.",
    "level": "intermediate",
    "options": [
      "Creates new objects on every append",
      "Mutates internal array in-place, expanding capacity dynamically",
      "Does not allow deletion",
      "Only stores numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Mutable buffer scenario 7"
  },
  {
    "id": 8,
    "question": "Question 8 on StringBuilder & StringBuffer: How does mutable buffer management work in scenario 8?",
    "shortAnswer": "Mutable buffers dynamically expand internal arrays (capacity * 2 + 2) without throwing OutOfMemory in ordinary operations.",
    "explanation": "StringBuilder and StringBuffer provide efficient buffer manipulation for high-volume string appending. Question 8 reinforces mutable string concepts.",
    "hint": "Mutable buffer expansion.",
    "level": "intermediate",
    "options": [
      "Creates new objects on every append",
      "Mutates internal array in-place, expanding capacity dynamically",
      "Does not allow deletion",
      "Only stores numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Mutable buffer scenario 8"
  },
  {
    "id": 9,
    "question": "Question 9 on StringBuilder & StringBuffer: How does mutable buffer management work in scenario 9?",
    "shortAnswer": "Mutable buffers dynamically expand internal arrays (capacity * 2 + 2) without throwing OutOfMemory in ordinary operations.",
    "explanation": "StringBuilder and StringBuffer provide efficient buffer manipulation for high-volume string appending. Question 9 reinforces mutable string concepts.",
    "hint": "Mutable buffer expansion.",
    "level": "intermediate",
    "options": [
      "Creates new objects on every append",
      "Mutates internal array in-place, expanding capacity dynamically",
      "Does not allow deletion",
      "Only stores numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Mutable buffer scenario 9"
  },
  {
    "id": 10,
    "question": "Question 10 on StringBuilder & StringBuffer: How does mutable buffer management work in scenario 10?",
    "shortAnswer": "Mutable buffers dynamically expand internal arrays (capacity * 2 + 2) without throwing OutOfMemory in ordinary operations.",
    "explanation": "StringBuilder and StringBuffer provide efficient buffer manipulation for high-volume string appending. Question 10 reinforces mutable string concepts.",
    "hint": "Mutable buffer expansion.",
    "level": "intermediate",
    "options": [
      "Creates new objects on every append",
      "Mutates internal array in-place, expanding capacity dynamically",
      "Does not allow deletion",
      "Only stores numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Mutable buffer scenario 10"
  },
  {
    "id": 11,
    "question": "Question 11 on StringBuilder & StringBuffer: How does mutable buffer management work in scenario 11?",
    "shortAnswer": "Mutable buffers dynamically expand internal arrays (capacity * 2 + 2) without throwing OutOfMemory in ordinary operations.",
    "explanation": "StringBuilder and StringBuffer provide efficient buffer manipulation for high-volume string appending. Question 11 reinforces mutable string concepts.",
    "hint": "Mutable buffer expansion.",
    "level": "intermediate",
    "options": [
      "Creates new objects on every append",
      "Mutates internal array in-place, expanding capacity dynamically",
      "Does not allow deletion",
      "Only stores numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Mutable buffer scenario 11"
  },
  {
    "id": 12,
    "question": "Question 12 on StringBuilder & StringBuffer: How does mutable buffer management work in scenario 12?",
    "shortAnswer": "Mutable buffers dynamically expand internal arrays (capacity * 2 + 2) without throwing OutOfMemory in ordinary operations.",
    "explanation": "StringBuilder and StringBuffer provide efficient buffer manipulation for high-volume string appending. Question 12 reinforces mutable string concepts.",
    "hint": "Mutable buffer expansion.",
    "level": "intermediate",
    "options": [
      "Creates new objects on every append",
      "Mutates internal array in-place, expanding capacity dynamically",
      "Does not allow deletion",
      "Only stores numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Mutable buffer scenario 12"
  },
  {
    "id": 13,
    "question": "Question 13 on StringBuilder & StringBuffer: How does mutable buffer management work in scenario 13?",
    "shortAnswer": "Mutable buffers dynamically expand internal arrays (capacity * 2 + 2) without throwing OutOfMemory in ordinary operations.",
    "explanation": "StringBuilder and StringBuffer provide efficient buffer manipulation for high-volume string appending. Question 13 reinforces mutable string concepts.",
    "hint": "Mutable buffer expansion.",
    "level": "intermediate",
    "options": [
      "Creates new objects on every append",
      "Mutates internal array in-place, expanding capacity dynamically",
      "Does not allow deletion",
      "Only stores numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Mutable buffer scenario 13"
  },
  {
    "id": 14,
    "question": "Question 14 on StringBuilder & StringBuffer: How does mutable buffer management work in scenario 14?",
    "shortAnswer": "Mutable buffers dynamically expand internal arrays (capacity * 2 + 2) without throwing OutOfMemory in ordinary operations.",
    "explanation": "StringBuilder and StringBuffer provide efficient buffer manipulation for high-volume string appending. Question 14 reinforces mutable string concepts.",
    "hint": "Mutable buffer expansion.",
    "level": "intermediate",
    "options": [
      "Creates new objects on every append",
      "Mutates internal array in-place, expanding capacity dynamically",
      "Does not allow deletion",
      "Only stores numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Mutable buffer scenario 14"
  },
  {
    "id": 15,
    "question": "Question 15 on StringBuilder & StringBuffer: How does mutable buffer management work in scenario 15?",
    "shortAnswer": "Mutable buffers dynamically expand internal arrays (capacity * 2 + 2) without throwing OutOfMemory in ordinary operations.",
    "explanation": "StringBuilder and StringBuffer provide efficient buffer manipulation for high-volume string appending. Question 15 reinforces mutable string concepts.",
    "hint": "Mutable buffer expansion.",
    "level": "intermediate",
    "options": [
      "Creates new objects on every append",
      "Mutates internal array in-place, expanding capacity dynamically",
      "Does not allow deletion",
      "Only stores numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Mutable buffer scenario 15"
  },
  {
    "id": 16,
    "question": "Question 16 on StringBuilder & StringBuffer: How does mutable buffer management work in scenario 16?",
    "shortAnswer": "Mutable buffers dynamically expand internal arrays (capacity * 2 + 2) without throwing OutOfMemory in ordinary operations.",
    "explanation": "StringBuilder and StringBuffer provide efficient buffer manipulation for high-volume string appending. Question 16 reinforces mutable string concepts.",
    "hint": "Mutable buffer expansion.",
    "level": "intermediate",
    "options": [
      "Creates new objects on every append",
      "Mutates internal array in-place, expanding capacity dynamically",
      "Does not allow deletion",
      "Only stores numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Mutable buffer scenario 16"
  },
  {
    "id": 17,
    "question": "Question 17 on StringBuilder & StringBuffer: How does mutable buffer management work in scenario 17?",
    "shortAnswer": "Mutable buffers dynamically expand internal arrays (capacity * 2 + 2) without throwing OutOfMemory in ordinary operations.",
    "explanation": "StringBuilder and StringBuffer provide efficient buffer manipulation for high-volume string appending. Question 17 reinforces mutable string concepts.",
    "hint": "Mutable buffer expansion.",
    "level": "intermediate",
    "options": [
      "Creates new objects on every append",
      "Mutates internal array in-place, expanding capacity dynamically",
      "Does not allow deletion",
      "Only stores numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Mutable buffer scenario 17"
  },
  {
    "id": 18,
    "question": "Question 18 on StringBuilder & StringBuffer: How does mutable buffer management work in scenario 18?",
    "shortAnswer": "Mutable buffers dynamically expand internal arrays (capacity * 2 + 2) without throwing OutOfMemory in ordinary operations.",
    "explanation": "StringBuilder and StringBuffer provide efficient buffer manipulation for high-volume string appending. Question 18 reinforces mutable string concepts.",
    "hint": "Mutable buffer expansion.",
    "level": "intermediate",
    "options": [
      "Creates new objects on every append",
      "Mutates internal array in-place, expanding capacity dynamically",
      "Does not allow deletion",
      "Only stores numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Mutable buffer scenario 18"
  },
  {
    "id": 19,
    "question": "Question 19 on StringBuilder & StringBuffer: How does mutable buffer management work in scenario 19?",
    "shortAnswer": "Mutable buffers dynamically expand internal arrays (capacity * 2 + 2) without throwing OutOfMemory in ordinary operations.",
    "explanation": "StringBuilder and StringBuffer provide efficient buffer manipulation for high-volume string appending. Question 19 reinforces mutable string concepts.",
    "hint": "Mutable buffer expansion.",
    "level": "advanced",
    "options": [
      "Creates new objects on every append",
      "Mutates internal array in-place, expanding capacity dynamically",
      "Does not allow deletion",
      "Only stores numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Mutable buffer scenario 19"
  },
  {
    "id": 20,
    "question": "Question 20 on StringBuilder & StringBuffer: How does mutable buffer management work in scenario 20?",
    "shortAnswer": "Mutable buffers dynamically expand internal arrays (capacity * 2 + 2) without throwing OutOfMemory in ordinary operations.",
    "explanation": "StringBuilder and StringBuffer provide efficient buffer manipulation for high-volume string appending. Question 20 reinforces mutable string concepts.",
    "hint": "Mutable buffer expansion.",
    "level": "advanced",
    "options": [
      "Creates new objects on every append",
      "Mutates internal array in-place, expanding capacity dynamically",
      "Does not allow deletion",
      "Only stores numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Mutable buffer scenario 20"
  },
  {
    "id": 21,
    "question": "Question 21 on StringBuilder & StringBuffer: How does mutable buffer management work in scenario 21?",
    "shortAnswer": "Mutable buffers dynamically expand internal arrays (capacity * 2 + 2) without throwing OutOfMemory in ordinary operations.",
    "explanation": "StringBuilder and StringBuffer provide efficient buffer manipulation for high-volume string appending. Question 21 reinforces mutable string concepts.",
    "hint": "Mutable buffer expansion.",
    "level": "advanced",
    "options": [
      "Creates new objects on every append",
      "Mutates internal array in-place, expanding capacity dynamically",
      "Does not allow deletion",
      "Only stores numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Mutable buffer scenario 21"
  },
  {
    "id": 22,
    "question": "Question 22 on StringBuilder & StringBuffer: How does mutable buffer management work in scenario 22?",
    "shortAnswer": "Mutable buffers dynamically expand internal arrays (capacity * 2 + 2) without throwing OutOfMemory in ordinary operations.",
    "explanation": "StringBuilder and StringBuffer provide efficient buffer manipulation for high-volume string appending. Question 22 reinforces mutable string concepts.",
    "hint": "Mutable buffer expansion.",
    "level": "advanced",
    "options": [
      "Creates new objects on every append",
      "Mutates internal array in-place, expanding capacity dynamically",
      "Does not allow deletion",
      "Only stores numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Mutable buffer scenario 22"
  },
  {
    "id": 23,
    "question": "Question 23 on StringBuilder & StringBuffer: How does mutable buffer management work in scenario 23?",
    "shortAnswer": "Mutable buffers dynamically expand internal arrays (capacity * 2 + 2) without throwing OutOfMemory in ordinary operations.",
    "explanation": "StringBuilder and StringBuffer provide efficient buffer manipulation for high-volume string appending. Question 23 reinforces mutable string concepts.",
    "hint": "Mutable buffer expansion.",
    "level": "advanced",
    "options": [
      "Creates new objects on every append",
      "Mutates internal array in-place, expanding capacity dynamically",
      "Does not allow deletion",
      "Only stores numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Mutable buffer scenario 23"
  },
  {
    "id": 24,
    "question": "Question 24 on StringBuilder & StringBuffer: How does mutable buffer management work in scenario 24?",
    "shortAnswer": "Mutable buffers dynamically expand internal arrays (capacity * 2 + 2) without throwing OutOfMemory in ordinary operations.",
    "explanation": "StringBuilder and StringBuffer provide efficient buffer manipulation for high-volume string appending. Question 24 reinforces mutable string concepts.",
    "hint": "Mutable buffer expansion.",
    "level": "advanced",
    "options": [
      "Creates new objects on every append",
      "Mutates internal array in-place, expanding capacity dynamically",
      "Does not allow deletion",
      "Only stores numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Mutable buffer scenario 24"
  },
  {
    "id": 25,
    "question": "Question 25 on StringBuilder & StringBuffer: How does mutable buffer management work in scenario 25?",
    "shortAnswer": "Mutable buffers dynamically expand internal arrays (capacity * 2 + 2) without throwing OutOfMemory in ordinary operations.",
    "explanation": "StringBuilder and StringBuffer provide efficient buffer manipulation for high-volume string appending. Question 25 reinforces mutable string concepts.",
    "hint": "Mutable buffer expansion.",
    "level": "advanced",
    "options": [
      "Creates new objects on every append",
      "Mutates internal array in-place, expanding capacity dynamically",
      "Does not allow deletion",
      "Only stores numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Mutable buffer scenario 25"
  }
];

export default questions;
