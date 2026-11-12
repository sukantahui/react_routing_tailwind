const questions = [
  {
    "id": 1,
    "question": "What is the result of removing duplicate characters from \"BANANA\"?",
    "shortAnswer": "\"BAN\"",
    "explanation": "First occurrences: 'B', 'A', 'N'. Subsequent 'A's and 'N's are skipped.",
    "hint": "Keep first occurrences only",
    "level": "basic",
    "options": [
      "\"BN\"",
      "\"BAN\"",
      "\"BA\"",
      "\"BANANA\""
    ],
    "correctAnswer": 1,
    "codeExample": "\"BANANA\" -> \"BAN\""
  },
  {
    "id": 2,
    "question": "How do you check if character 'ch' is already in accumulator 'res'?",
    "shortAnswer": "res.indexOf(ch) == -1",
    "explanation": "If indexOf returns -1, character is not yet in accumulator; append it.",
    "hint": "Check absence with indexOf == -1",
    "level": "basic",
    "options": [
      "res.contains(ch)",
      "res.indexOf(ch) == -1",
      "res.has(ch)",
      "res.charAt(0) == ch"
    ],
    "correctAnswer": 1,
    "codeExample": "if (res.indexOf(ch) == -1) res += ch;"
  },
  {
    "id": 3,
    "question": "What is the time complexity of duplicate removal using nested loops?",
    "shortAnswer": "O(n^2)",
    "explanation": "For each of n characters, scanning accumulator of length up to n takes O(n) checks.",
    "hint": "Quadratic time complexity",
    "level": "intermediate",
    "options": [
      "O(1)",
      "O(n)",
      "O(n^2)",
      "O(log n)"
    ],
    "correctAnswer": 2,
    "codeExample": "O(n^2) nested loop checks"
  },
  {
    "id": 4,
    "question": "What data structure removes duplicates automatically with unique elements in Java?",
    "shortAnswer": "Set (such as LinkedHashSet for preserving insertion order).",
    "explanation": "Sets cannot contain duplicate elements.",
    "hint": "Set collection",
    "level": "intermediate",
    "options": [
      "List",
      "Queue",
      "Set (LinkedHashSet)",
      "Stack"
    ],
    "correctAnswer": 2,
    "codeExample": "Set<Character>"
  },
  {
    "id": 5,
    "question": "What is the result of removing duplicates from \"MISSISSIPPI\"?",
    "shortAnswer": "\"MISP\"",
    "explanation": "Unique characters in order of appearance: M, I, S, P.",
    "hint": "Unique characters in Mississippi",
    "level": "basic",
    "options": [
      "\"MISP\"",
      "\"MISIP\"",
      "\"MISS\"",
      "\"MS\""
    ],
    "correctAnswer": 0,
    "codeExample": "\"MISSISSIPPI\" -> \"MISP\""
  },
  {
    "id": 6,
    "question": "Question 6 on Duplicate Removal: How does deduplication behave in scenario 6?",
    "shortAnswer": "Preserves the first occurrence of each distinct character while omitting redundant instances.",
    "explanation": "Deduplication tests accumulator filtering patterns in ICSE Board questions. Scenario 6 reinforces unique filtering.",
    "hint": "Filter duplicates using presence lookup.",
    "level": "basic",
    "options": [
      "Deletes entire string",
      "Appends only novel characters not present in accumulator",
      "Replaces duplicates with spaces",
      "Throws exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// Deduplication scenario 6"
  },
  {
    "id": 7,
    "question": "Question 7 on Duplicate Removal: How does deduplication behave in scenario 7?",
    "shortAnswer": "Preserves the first occurrence of each distinct character while omitting redundant instances.",
    "explanation": "Deduplication tests accumulator filtering patterns in ICSE Board questions. Scenario 7 reinforces unique filtering.",
    "hint": "Filter duplicates using presence lookup.",
    "level": "basic",
    "options": [
      "Deletes entire string",
      "Appends only novel characters not present in accumulator",
      "Replaces duplicates with spaces",
      "Throws exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// Deduplication scenario 7"
  },
  {
    "id": 8,
    "question": "Question 8 on Duplicate Removal: How does deduplication behave in scenario 8?",
    "shortAnswer": "Preserves the first occurrence of each distinct character while omitting redundant instances.",
    "explanation": "Deduplication tests accumulator filtering patterns in ICSE Board questions. Scenario 8 reinforces unique filtering.",
    "hint": "Filter duplicates using presence lookup.",
    "level": "basic",
    "options": [
      "Deletes entire string",
      "Appends only novel characters not present in accumulator",
      "Replaces duplicates with spaces",
      "Throws exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// Deduplication scenario 8"
  },
  {
    "id": 9,
    "question": "Question 9 on Duplicate Removal: How does deduplication behave in scenario 9?",
    "shortAnswer": "Preserves the first occurrence of each distinct character while omitting redundant instances.",
    "explanation": "Deduplication tests accumulator filtering patterns in ICSE Board questions. Scenario 9 reinforces unique filtering.",
    "hint": "Filter duplicates using presence lookup.",
    "level": "basic",
    "options": [
      "Deletes entire string",
      "Appends only novel characters not present in accumulator",
      "Replaces duplicates with spaces",
      "Throws exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// Deduplication scenario 9"
  },
  {
    "id": 10,
    "question": "Question 10 on Duplicate Removal: How does deduplication behave in scenario 10?",
    "shortAnswer": "Preserves the first occurrence of each distinct character while omitting redundant instances.",
    "explanation": "Deduplication tests accumulator filtering patterns in ICSE Board questions. Scenario 10 reinforces unique filtering.",
    "hint": "Filter duplicates using presence lookup.",
    "level": "basic",
    "options": [
      "Deletes entire string",
      "Appends only novel characters not present in accumulator",
      "Replaces duplicates with spaces",
      "Throws exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// Deduplication scenario 10"
  },
  {
    "id": 11,
    "question": "Question 11 on Duplicate Removal: How does deduplication behave in scenario 11?",
    "shortAnswer": "Preserves the first occurrence of each distinct character while omitting redundant instances.",
    "explanation": "Deduplication tests accumulator filtering patterns in ICSE Board questions. Scenario 11 reinforces unique filtering.",
    "hint": "Filter duplicates using presence lookup.",
    "level": "basic",
    "options": [
      "Deletes entire string",
      "Appends only novel characters not present in accumulator",
      "Replaces duplicates with spaces",
      "Throws exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// Deduplication scenario 11"
  },
  {
    "id": 12,
    "question": "Question 12 on Duplicate Removal: How does deduplication behave in scenario 12?",
    "shortAnswer": "Preserves the first occurrence of each distinct character while omitting redundant instances.",
    "explanation": "Deduplication tests accumulator filtering patterns in ICSE Board questions. Scenario 12 reinforces unique filtering.",
    "hint": "Filter duplicates using presence lookup.",
    "level": "basic",
    "options": [
      "Deletes entire string",
      "Appends only novel characters not present in accumulator",
      "Replaces duplicates with spaces",
      "Throws exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// Deduplication scenario 12"
  },
  {
    "id": 13,
    "question": "Question 13 on Duplicate Removal: How does deduplication behave in scenario 13?",
    "shortAnswer": "Preserves the first occurrence of each distinct character while omitting redundant instances.",
    "explanation": "Deduplication tests accumulator filtering patterns in ICSE Board questions. Scenario 13 reinforces unique filtering.",
    "hint": "Filter duplicates using presence lookup.",
    "level": "basic",
    "options": [
      "Deletes entire string",
      "Appends only novel characters not present in accumulator",
      "Replaces duplicates with spaces",
      "Throws exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// Deduplication scenario 13"
  },
  {
    "id": 14,
    "question": "Question 14 on Duplicate Removal: How does deduplication behave in scenario 14?",
    "shortAnswer": "Preserves the first occurrence of each distinct character while omitting redundant instances.",
    "explanation": "Deduplication tests accumulator filtering patterns in ICSE Board questions. Scenario 14 reinforces unique filtering.",
    "hint": "Filter duplicates using presence lookup.",
    "level": "basic",
    "options": [
      "Deletes entire string",
      "Appends only novel characters not present in accumulator",
      "Replaces duplicates with spaces",
      "Throws exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// Deduplication scenario 14"
  },
  {
    "id": 15,
    "question": "Question 15 on Duplicate Removal: How does deduplication behave in scenario 15?",
    "shortAnswer": "Preserves the first occurrence of each distinct character while omitting redundant instances.",
    "explanation": "Deduplication tests accumulator filtering patterns in ICSE Board questions. Scenario 15 reinforces unique filtering.",
    "hint": "Filter duplicates using presence lookup.",
    "level": "basic",
    "options": [
      "Deletes entire string",
      "Appends only novel characters not present in accumulator",
      "Replaces duplicates with spaces",
      "Throws exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// Deduplication scenario 15"
  },
  {
    "id": 16,
    "question": "Question 16 on Duplicate Removal: How does deduplication behave in scenario 16?",
    "shortAnswer": "Preserves the first occurrence of each distinct character while omitting redundant instances.",
    "explanation": "Deduplication tests accumulator filtering patterns in ICSE Board questions. Scenario 16 reinforces unique filtering.",
    "hint": "Filter duplicates using presence lookup.",
    "level": "basic",
    "options": [
      "Deletes entire string",
      "Appends only novel characters not present in accumulator",
      "Replaces duplicates with spaces",
      "Throws exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// Deduplication scenario 16"
  },
  {
    "id": 17,
    "question": "Question 17 on Duplicate Removal: How does deduplication behave in scenario 17?",
    "shortAnswer": "Preserves the first occurrence of each distinct character while omitting redundant instances.",
    "explanation": "Deduplication tests accumulator filtering patterns in ICSE Board questions. Scenario 17 reinforces unique filtering.",
    "hint": "Filter duplicates using presence lookup.",
    "level": "basic",
    "options": [
      "Deletes entire string",
      "Appends only novel characters not present in accumulator",
      "Replaces duplicates with spaces",
      "Throws exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// Deduplication scenario 17"
  },
  {
    "id": 18,
    "question": "Question 18 on Duplicate Removal: How does deduplication behave in scenario 18?",
    "shortAnswer": "Preserves the first occurrence of each distinct character while omitting redundant instances.",
    "explanation": "Deduplication tests accumulator filtering patterns in ICSE Board questions. Scenario 18 reinforces unique filtering.",
    "hint": "Filter duplicates using presence lookup.",
    "level": "basic",
    "options": [
      "Deletes entire string",
      "Appends only novel characters not present in accumulator",
      "Replaces duplicates with spaces",
      "Throws exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// Deduplication scenario 18"
  },
  {
    "id": 19,
    "question": "Question 19 on Duplicate Removal: How does deduplication behave in scenario 19?",
    "shortAnswer": "Preserves the first occurrence of each distinct character while omitting redundant instances.",
    "explanation": "Deduplication tests accumulator filtering patterns in ICSE Board questions. Scenario 19 reinforces unique filtering.",
    "hint": "Filter duplicates using presence lookup.",
    "level": "advanced",
    "options": [
      "Deletes entire string",
      "Appends only novel characters not present in accumulator",
      "Replaces duplicates with spaces",
      "Throws exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// Deduplication scenario 19"
  },
  {
    "id": 20,
    "question": "Question 20 on Duplicate Removal: How does deduplication behave in scenario 20?",
    "shortAnswer": "Preserves the first occurrence of each distinct character while omitting redundant instances.",
    "explanation": "Deduplication tests accumulator filtering patterns in ICSE Board questions. Scenario 20 reinforces unique filtering.",
    "hint": "Filter duplicates using presence lookup.",
    "level": "advanced",
    "options": [
      "Deletes entire string",
      "Appends only novel characters not present in accumulator",
      "Replaces duplicates with spaces",
      "Throws exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// Deduplication scenario 20"
  },
  {
    "id": 21,
    "question": "Question 21 on Duplicate Removal: How does deduplication behave in scenario 21?",
    "shortAnswer": "Preserves the first occurrence of each distinct character while omitting redundant instances.",
    "explanation": "Deduplication tests accumulator filtering patterns in ICSE Board questions. Scenario 21 reinforces unique filtering.",
    "hint": "Filter duplicates using presence lookup.",
    "level": "advanced",
    "options": [
      "Deletes entire string",
      "Appends only novel characters not present in accumulator",
      "Replaces duplicates with spaces",
      "Throws exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// Deduplication scenario 21"
  },
  {
    "id": 22,
    "question": "Question 22 on Duplicate Removal: How does deduplication behave in scenario 22?",
    "shortAnswer": "Preserves the first occurrence of each distinct character while omitting redundant instances.",
    "explanation": "Deduplication tests accumulator filtering patterns in ICSE Board questions. Scenario 22 reinforces unique filtering.",
    "hint": "Filter duplicates using presence lookup.",
    "level": "advanced",
    "options": [
      "Deletes entire string",
      "Appends only novel characters not present in accumulator",
      "Replaces duplicates with spaces",
      "Throws exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// Deduplication scenario 22"
  },
  {
    "id": 23,
    "question": "Question 23 on Duplicate Removal: How does deduplication behave in scenario 23?",
    "shortAnswer": "Preserves the first occurrence of each distinct character while omitting redundant instances.",
    "explanation": "Deduplication tests accumulator filtering patterns in ICSE Board questions. Scenario 23 reinforces unique filtering.",
    "hint": "Filter duplicates using presence lookup.",
    "level": "advanced",
    "options": [
      "Deletes entire string",
      "Appends only novel characters not present in accumulator",
      "Replaces duplicates with spaces",
      "Throws exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// Deduplication scenario 23"
  },
  {
    "id": 24,
    "question": "Question 24 on Duplicate Removal: How does deduplication behave in scenario 24?",
    "shortAnswer": "Preserves the first occurrence of each distinct character while omitting redundant instances.",
    "explanation": "Deduplication tests accumulator filtering patterns in ICSE Board questions. Scenario 24 reinforces unique filtering.",
    "hint": "Filter duplicates using presence lookup.",
    "level": "advanced",
    "options": [
      "Deletes entire string",
      "Appends only novel characters not present in accumulator",
      "Replaces duplicates with spaces",
      "Throws exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// Deduplication scenario 24"
  },
  {
    "id": 25,
    "question": "Question 25 on Duplicate Removal: How does deduplication behave in scenario 25?",
    "shortAnswer": "Preserves the first occurrence of each distinct character while omitting redundant instances.",
    "explanation": "Deduplication tests accumulator filtering patterns in ICSE Board questions. Scenario 25 reinforces unique filtering.",
    "hint": "Filter duplicates using presence lookup.",
    "level": "advanced",
    "options": [
      "Deletes entire string",
      "Appends only novel characters not present in accumulator",
      "Replaces duplicates with spaces",
      "Throws exception"
    ],
    "correctAnswer": 1,
    "codeExample": "// Deduplication scenario 25"
  }
];

export default questions;
