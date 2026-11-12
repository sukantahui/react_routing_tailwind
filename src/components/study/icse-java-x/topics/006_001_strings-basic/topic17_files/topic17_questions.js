const questions = [
  {
    "id": 1,
    "question": "What is the time complexity of String.length()?",
    "shortAnswer": "O(1) constant time.",
    "explanation": "Length is stored as a field in the String object.",
    "hint": "Constant time",
    "level": "basic",
    "options": [
      "O(n)",
      "O(1)",
      "O(log n)",
      "O(n^2)"
    ],
    "correctAnswer": 1,
    "codeExample": "O(1) time complexity"
  },
  {
    "id": 2,
    "question": "What is the time complexity of String.charAt(int index)?",
    "shortAnswer": "O(1) constant time.",
    "explanation": "Direct index offset into internal byte array.",
    "hint": "Constant time array access",
    "level": "basic",
    "options": [
      "O(n)",
      "O(1)",
      "O(log n)",
      "O(n^2)"
    ],
    "correctAnswer": 1,
    "codeExample": "O(1) direct access"
  },
  {
    "id": 3,
    "question": "What is the time complexity of String.indexOf(char ch)?",
    "shortAnswer": "O(n) linear time.",
    "explanation": "Must scan the character array from start to match.",
    "hint": "Linear scan",
    "level": "intermediate",
    "options": [
      "O(1)",
      "O(n)",
      "O(n^2)",
      "O(log n)"
    ],
    "correctAnswer": 1,
    "codeExample": "O(n) linear scan"
  },
  {
    "id": 4,
    "question": "What feature was introduced in Java 9 to reduce String memory footprint?",
    "shortAnswer": "Compact Strings (LATIN-1 vs UTF-16 byte encoding).",
    "explanation": "Stores 1 byte per char for ISO-8859-1 strings, reducing heap footprint by 50%.",
    "hint": "Compact strings in Java 9",
    "level": "advanced",
    "options": [
      "PermGen removal",
      "Compact Strings (byte[] instead of char[])",
      "String Compression API",
      "Virtual Threads"
    ],
    "correctAnswer": 1,
    "codeExample": "byte[] with coder flag"
  },
  {
    "id": 5,
    "question": "Why is String pooling beneficial for performance?",
    "shortAnswer": "Reduces memory consumption and allows fast object sharing.",
    "explanation": "Eliminates duplicate allocations of frequent literals.",
    "hint": "Memory and allocation efficiency",
    "level": "basic",
    "options": [
      "Slows execution",
      "Conserves memory by reusing existing identical literal instances",
      "Disables garbage collection",
      "Makes strings mutable"
    ],
    "correctAnswer": 1,
    "codeExample": "Instance reuse"
  },
  {
    "id": 6,
    "question": "Question 6 on Performance: What is the algorithmic efficiency of operation 6?",
    "shortAnswer": "Operations scanning strings are O(n); index/length operations are O(1).",
    "explanation": "Algorithmic complexity awareness ensures performant ICSE program construction. Operation 6 reviews computational cost.",
    "hint": "Time complexity classification.",
    "level": "intermediate",
    "options": [
      "Always O(n^2)",
      "O(1) for direct index; O(n) for searching/copying",
      "Always O(1)",
      "O(2^n)"
    ],
    "correctAnswer": 1,
    "codeExample": "// Complexity analysis 6"
  },
  {
    "id": 7,
    "question": "Question 7 on Performance: What is the algorithmic efficiency of operation 7?",
    "shortAnswer": "Operations scanning strings are O(n); index/length operations are O(1).",
    "explanation": "Algorithmic complexity awareness ensures performant ICSE program construction. Operation 7 reviews computational cost.",
    "hint": "Time complexity classification.",
    "level": "intermediate",
    "options": [
      "Always O(n^2)",
      "O(1) for direct index; O(n) for searching/copying",
      "Always O(1)",
      "O(2^n)"
    ],
    "correctAnswer": 1,
    "codeExample": "// Complexity analysis 7"
  },
  {
    "id": 8,
    "question": "Question 8 on Performance: What is the algorithmic efficiency of operation 8?",
    "shortAnswer": "Operations scanning strings are O(n); index/length operations are O(1).",
    "explanation": "Algorithmic complexity awareness ensures performant ICSE program construction. Operation 8 reviews computational cost.",
    "hint": "Time complexity classification.",
    "level": "intermediate",
    "options": [
      "Always O(n^2)",
      "O(1) for direct index; O(n) for searching/copying",
      "Always O(1)",
      "O(2^n)"
    ],
    "correctAnswer": 1,
    "codeExample": "// Complexity analysis 8"
  },
  {
    "id": 9,
    "question": "Question 9 on Performance: What is the algorithmic efficiency of operation 9?",
    "shortAnswer": "Operations scanning strings are O(n); index/length operations are O(1).",
    "explanation": "Algorithmic complexity awareness ensures performant ICSE program construction. Operation 9 reviews computational cost.",
    "hint": "Time complexity classification.",
    "level": "intermediate",
    "options": [
      "Always O(n^2)",
      "O(1) for direct index; O(n) for searching/copying",
      "Always O(1)",
      "O(2^n)"
    ],
    "correctAnswer": 1,
    "codeExample": "// Complexity analysis 9"
  },
  {
    "id": 10,
    "question": "Question 10 on Performance: What is the algorithmic efficiency of operation 10?",
    "shortAnswer": "Operations scanning strings are O(n); index/length operations are O(1).",
    "explanation": "Algorithmic complexity awareness ensures performant ICSE program construction. Operation 10 reviews computational cost.",
    "hint": "Time complexity classification.",
    "level": "intermediate",
    "options": [
      "Always O(n^2)",
      "O(1) for direct index; O(n) for searching/copying",
      "Always O(1)",
      "O(2^n)"
    ],
    "correctAnswer": 1,
    "codeExample": "// Complexity analysis 10"
  },
  {
    "id": 11,
    "question": "Question 11 on Performance: What is the algorithmic efficiency of operation 11?",
    "shortAnswer": "Operations scanning strings are O(n); index/length operations are O(1).",
    "explanation": "Algorithmic complexity awareness ensures performant ICSE program construction. Operation 11 reviews computational cost.",
    "hint": "Time complexity classification.",
    "level": "intermediate",
    "options": [
      "Always O(n^2)",
      "O(1) for direct index; O(n) for searching/copying",
      "Always O(1)",
      "O(2^n)"
    ],
    "correctAnswer": 1,
    "codeExample": "// Complexity analysis 11"
  },
  {
    "id": 12,
    "question": "Question 12 on Performance: What is the algorithmic efficiency of operation 12?",
    "shortAnswer": "Operations scanning strings are O(n); index/length operations are O(1).",
    "explanation": "Algorithmic complexity awareness ensures performant ICSE program construction. Operation 12 reviews computational cost.",
    "hint": "Time complexity classification.",
    "level": "intermediate",
    "options": [
      "Always O(n^2)",
      "O(1) for direct index; O(n) for searching/copying",
      "Always O(1)",
      "O(2^n)"
    ],
    "correctAnswer": 1,
    "codeExample": "// Complexity analysis 12"
  },
  {
    "id": 13,
    "question": "Question 13 on Performance: What is the algorithmic efficiency of operation 13?",
    "shortAnswer": "Operations scanning strings are O(n); index/length operations are O(1).",
    "explanation": "Algorithmic complexity awareness ensures performant ICSE program construction. Operation 13 reviews computational cost.",
    "hint": "Time complexity classification.",
    "level": "intermediate",
    "options": [
      "Always O(n^2)",
      "O(1) for direct index; O(n) for searching/copying",
      "Always O(1)",
      "O(2^n)"
    ],
    "correctAnswer": 1,
    "codeExample": "// Complexity analysis 13"
  },
  {
    "id": 14,
    "question": "Question 14 on Performance: What is the algorithmic efficiency of operation 14?",
    "shortAnswer": "Operations scanning strings are O(n); index/length operations are O(1).",
    "explanation": "Algorithmic complexity awareness ensures performant ICSE program construction. Operation 14 reviews computational cost.",
    "hint": "Time complexity classification.",
    "level": "intermediate",
    "options": [
      "Always O(n^2)",
      "O(1) for direct index; O(n) for searching/copying",
      "Always O(1)",
      "O(2^n)"
    ],
    "correctAnswer": 1,
    "codeExample": "// Complexity analysis 14"
  },
  {
    "id": 15,
    "question": "Question 15 on Performance: What is the algorithmic efficiency of operation 15?",
    "shortAnswer": "Operations scanning strings are O(n); index/length operations are O(1).",
    "explanation": "Algorithmic complexity awareness ensures performant ICSE program construction. Operation 15 reviews computational cost.",
    "hint": "Time complexity classification.",
    "level": "intermediate",
    "options": [
      "Always O(n^2)",
      "O(1) for direct index; O(n) for searching/copying",
      "Always O(1)",
      "O(2^n)"
    ],
    "correctAnswer": 1,
    "codeExample": "// Complexity analysis 15"
  },
  {
    "id": 16,
    "question": "Question 16 on Performance: What is the algorithmic efficiency of operation 16?",
    "shortAnswer": "Operations scanning strings are O(n); index/length operations are O(1).",
    "explanation": "Algorithmic complexity awareness ensures performant ICSE program construction. Operation 16 reviews computational cost.",
    "hint": "Time complexity classification.",
    "level": "intermediate",
    "options": [
      "Always O(n^2)",
      "O(1) for direct index; O(n) for searching/copying",
      "Always O(1)",
      "O(2^n)"
    ],
    "correctAnswer": 1,
    "codeExample": "// Complexity analysis 16"
  },
  {
    "id": 17,
    "question": "Question 17 on Performance: What is the algorithmic efficiency of operation 17?",
    "shortAnswer": "Operations scanning strings are O(n); index/length operations are O(1).",
    "explanation": "Algorithmic complexity awareness ensures performant ICSE program construction. Operation 17 reviews computational cost.",
    "hint": "Time complexity classification.",
    "level": "intermediate",
    "options": [
      "Always O(n^2)",
      "O(1) for direct index; O(n) for searching/copying",
      "Always O(1)",
      "O(2^n)"
    ],
    "correctAnswer": 1,
    "codeExample": "// Complexity analysis 17"
  },
  {
    "id": 18,
    "question": "Question 18 on Performance: What is the algorithmic efficiency of operation 18?",
    "shortAnswer": "Operations scanning strings are O(n); index/length operations are O(1).",
    "explanation": "Algorithmic complexity awareness ensures performant ICSE program construction. Operation 18 reviews computational cost.",
    "hint": "Time complexity classification.",
    "level": "intermediate",
    "options": [
      "Always O(n^2)",
      "O(1) for direct index; O(n) for searching/copying",
      "Always O(1)",
      "O(2^n)"
    ],
    "correctAnswer": 1,
    "codeExample": "// Complexity analysis 18"
  },
  {
    "id": 19,
    "question": "Question 19 on Performance: What is the algorithmic efficiency of operation 19?",
    "shortAnswer": "Operations scanning strings are O(n); index/length operations are O(1).",
    "explanation": "Algorithmic complexity awareness ensures performant ICSE program construction. Operation 19 reviews computational cost.",
    "hint": "Time complexity classification.",
    "level": "advanced",
    "options": [
      "Always O(n^2)",
      "O(1) for direct index; O(n) for searching/copying",
      "Always O(1)",
      "O(2^n)"
    ],
    "correctAnswer": 1,
    "codeExample": "// Complexity analysis 19"
  },
  {
    "id": 20,
    "question": "Question 20 on Performance: What is the algorithmic efficiency of operation 20?",
    "shortAnswer": "Operations scanning strings are O(n); index/length operations are O(1).",
    "explanation": "Algorithmic complexity awareness ensures performant ICSE program construction. Operation 20 reviews computational cost.",
    "hint": "Time complexity classification.",
    "level": "advanced",
    "options": [
      "Always O(n^2)",
      "O(1) for direct index; O(n) for searching/copying",
      "Always O(1)",
      "O(2^n)"
    ],
    "correctAnswer": 1,
    "codeExample": "// Complexity analysis 20"
  },
  {
    "id": 21,
    "question": "Question 21 on Performance: What is the algorithmic efficiency of operation 21?",
    "shortAnswer": "Operations scanning strings are O(n); index/length operations are O(1).",
    "explanation": "Algorithmic complexity awareness ensures performant ICSE program construction. Operation 21 reviews computational cost.",
    "hint": "Time complexity classification.",
    "level": "advanced",
    "options": [
      "Always O(n^2)",
      "O(1) for direct index; O(n) for searching/copying",
      "Always O(1)",
      "O(2^n)"
    ],
    "correctAnswer": 1,
    "codeExample": "// Complexity analysis 21"
  },
  {
    "id": 22,
    "question": "Question 22 on Performance: What is the algorithmic efficiency of operation 22?",
    "shortAnswer": "Operations scanning strings are O(n); index/length operations are O(1).",
    "explanation": "Algorithmic complexity awareness ensures performant ICSE program construction. Operation 22 reviews computational cost.",
    "hint": "Time complexity classification.",
    "level": "advanced",
    "options": [
      "Always O(n^2)",
      "O(1) for direct index; O(n) for searching/copying",
      "Always O(1)",
      "O(2^n)"
    ],
    "correctAnswer": 1,
    "codeExample": "// Complexity analysis 22"
  },
  {
    "id": 23,
    "question": "Question 23 on Performance: What is the algorithmic efficiency of operation 23?",
    "shortAnswer": "Operations scanning strings are O(n); index/length operations are O(1).",
    "explanation": "Algorithmic complexity awareness ensures performant ICSE program construction. Operation 23 reviews computational cost.",
    "hint": "Time complexity classification.",
    "level": "advanced",
    "options": [
      "Always O(n^2)",
      "O(1) for direct index; O(n) for searching/copying",
      "Always O(1)",
      "O(2^n)"
    ],
    "correctAnswer": 1,
    "codeExample": "// Complexity analysis 23"
  },
  {
    "id": 24,
    "question": "Question 24 on Performance: What is the algorithmic efficiency of operation 24?",
    "shortAnswer": "Operations scanning strings are O(n); index/length operations are O(1).",
    "explanation": "Algorithmic complexity awareness ensures performant ICSE program construction. Operation 24 reviews computational cost.",
    "hint": "Time complexity classification.",
    "level": "advanced",
    "options": [
      "Always O(n^2)",
      "O(1) for direct index; O(n) for searching/copying",
      "Always O(1)",
      "O(2^n)"
    ],
    "correctAnswer": 1,
    "codeExample": "// Complexity analysis 24"
  },
  {
    "id": 25,
    "question": "Question 25 on Performance: What is the algorithmic efficiency of operation 25?",
    "shortAnswer": "Operations scanning strings are O(n); index/length operations are O(1).",
    "explanation": "Algorithmic complexity awareness ensures performant ICSE program construction. Operation 25 reviews computational cost.",
    "hint": "Time complexity classification.",
    "level": "advanced",
    "options": [
      "Always O(n^2)",
      "O(1) for direct index; O(n) for searching/copying",
      "Always O(1)",
      "O(2^n)"
    ],
    "correctAnswer": 1,
    "codeExample": "// Complexity analysis 25"
  }
];

export default questions;
