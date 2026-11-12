const questions = [
  {
    "id": 1,
    "question": "What is a Palindrome String in ICSE Computer Applications?",
    "shortAnswer": "A string that reads the exact same forward and backward (e.g. \"MADAM\", \"RACECAR\").",
    "explanation": "When str.equals(reversedStr) is true.",
    "hint": "Same forward and backward",
    "level": "basic",
    "options": [
      "A string with no vowels",
      "A string reading same forward and backward",
      "A string with only numbers",
      "An empty string only"
    ],
    "correctAnswer": 1,
    "codeExample": "\"MADAM\".equals(rev)"
  },
  {
    "id": 2,
    "question": "Why is s.equalsIgnoreCase(rev) used instead of s.equals(rev) in case-insensitive palindrome checks?",
    "shortAnswer": "To ensure words like \"Madam\" are recognized as palindromes despite 'M' vs 'm'.",
    "explanation": "Normalizes case differences between first and last letters.",
    "hint": "Case insensitive check",
    "level": "basic",
    "options": [
      "It executes faster",
      "Matches letters regardless of capitalization ('M' == 'm')",
      "Required to compile",
      "Checks length only"
    ],
    "correctAnswer": 1,
    "codeExample": "s.equalsIgnoreCase(rev)"
  },
  {
    "id": 3,
    "question": "Is \"MALAYALAM\" a palindrome?",
    "shortAnswer": "Yes, reversing \"MALAYALAM\" produces \"MALAYALAM\".",
    "explanation": "Identical in both directions.",
    "hint": "Malayalam palindrome",
    "level": "basic",
    "options": [
      "No",
      "Yes",
      "Only in lowercase",
      "Only if trimmed"
    ],
    "correctAnswer": 1,
    "codeExample": "\"MALAYALAM\" is a palindrome"
  },
  {
    "id": 4,
    "question": "How can you check a palindrome using a two-pointer approach without creating a reversed string?",
    "shortAnswer": "Compare charAt(left) with charAt(right) while left < right, incrementing left and decrementing right.",
    "explanation": "Two pointers meeting in the middle saves memory and executes in O(N/2) time.",
    "hint": "Two pointer palindrome check",
    "level": "intermediate",
    "options": [
      "Loop backward only",
      "Two pointers moving inward comparing opposite characters",
      "Using indexOf()",
      "Using replace()"
    ],
    "correctAnswer": 1,
    "codeExample": "while(l < r) if(s.charAt(l++) != s.charAt(r--)) return false;"
  },
  {
    "id": 5,
    "question": "Is every single-character string (e.g. \"A\") considered a palindrome?",
    "shortAnswer": "Yes, reading a single character forward or backward produces the identical character.",
    "explanation": "A 1-character string is trivially equal to its reverse.",
    "hint": "Single character palindrome",
    "level": "basic",
    "options": [
      "No, minimum 3 chars required",
      "Yes, any 1-character string is a palindrome",
      "Only if it is a vowel",
      "Only in numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "\"A\" is a palindrome"
  },
  {
    "id": 6,
    "question": "Question 6 on Palindromes: How is palindrome validation evaluated in scenario 6?",
    "shortAnswer": "Validates whether s.equalsIgnoreCase(reversedString) or bidirectional two-pointer match holds true.",
    "explanation": "Palindrome detection appears regularly in ICSE Class X board exams. Scenario 6 reinforces robust palindrome logic.",
    "hint": "Bidirectional symmetry verification.",
    "level": "basic",
    "options": [
      "Checks word count",
      "Validates symmetry by comparing original with reversed characters",
      "Checks vowel count",
      "Sorts string first"
    ],
    "correctAnswer": 1,
    "codeExample": "// Palindrome test case 6"
  },
  {
    "id": 7,
    "question": "Question 7 on Palindromes: How is palindrome validation evaluated in scenario 7?",
    "shortAnswer": "Validates whether s.equalsIgnoreCase(reversedString) or bidirectional two-pointer match holds true.",
    "explanation": "Palindrome detection appears regularly in ICSE Class X board exams. Scenario 7 reinforces robust palindrome logic.",
    "hint": "Bidirectional symmetry verification.",
    "level": "basic",
    "options": [
      "Checks word count",
      "Validates symmetry by comparing original with reversed characters",
      "Checks vowel count",
      "Sorts string first"
    ],
    "correctAnswer": 1,
    "codeExample": "// Palindrome test case 7"
  },
  {
    "id": 8,
    "question": "Question 8 on Palindromes: How is palindrome validation evaluated in scenario 8?",
    "shortAnswer": "Validates whether s.equalsIgnoreCase(reversedString) or bidirectional two-pointer match holds true.",
    "explanation": "Palindrome detection appears regularly in ICSE Class X board exams. Scenario 8 reinforces robust palindrome logic.",
    "hint": "Bidirectional symmetry verification.",
    "level": "basic",
    "options": [
      "Checks word count",
      "Validates symmetry by comparing original with reversed characters",
      "Checks vowel count",
      "Sorts string first"
    ],
    "correctAnswer": 1,
    "codeExample": "// Palindrome test case 8"
  },
  {
    "id": 9,
    "question": "Question 9 on Palindromes: How is palindrome validation evaluated in scenario 9?",
    "shortAnswer": "Validates whether s.equalsIgnoreCase(reversedString) or bidirectional two-pointer match holds true.",
    "explanation": "Palindrome detection appears regularly in ICSE Class X board exams. Scenario 9 reinforces robust palindrome logic.",
    "hint": "Bidirectional symmetry verification.",
    "level": "basic",
    "options": [
      "Checks word count",
      "Validates symmetry by comparing original with reversed characters",
      "Checks vowel count",
      "Sorts string first"
    ],
    "correctAnswer": 1,
    "codeExample": "// Palindrome test case 9"
  },
  {
    "id": 10,
    "question": "Question 10 on Palindromes: How is palindrome validation evaluated in scenario 10?",
    "shortAnswer": "Validates whether s.equalsIgnoreCase(reversedString) or bidirectional two-pointer match holds true.",
    "explanation": "Palindrome detection appears regularly in ICSE Class X board exams. Scenario 10 reinforces robust palindrome logic.",
    "hint": "Bidirectional symmetry verification.",
    "level": "basic",
    "options": [
      "Checks word count",
      "Validates symmetry by comparing original with reversed characters",
      "Checks vowel count",
      "Sorts string first"
    ],
    "correctAnswer": 1,
    "codeExample": "// Palindrome test case 10"
  },
  {
    "id": 11,
    "question": "Question 11 on Palindromes: How is palindrome validation evaluated in scenario 11?",
    "shortAnswer": "Validates whether s.equalsIgnoreCase(reversedString) or bidirectional two-pointer match holds true.",
    "explanation": "Palindrome detection appears regularly in ICSE Class X board exams. Scenario 11 reinforces robust palindrome logic.",
    "hint": "Bidirectional symmetry verification.",
    "level": "basic",
    "options": [
      "Checks word count",
      "Validates symmetry by comparing original with reversed characters",
      "Checks vowel count",
      "Sorts string first"
    ],
    "correctAnswer": 1,
    "codeExample": "// Palindrome test case 11"
  },
  {
    "id": 12,
    "question": "Question 12 on Palindromes: How is palindrome validation evaluated in scenario 12?",
    "shortAnswer": "Validates whether s.equalsIgnoreCase(reversedString) or bidirectional two-pointer match holds true.",
    "explanation": "Palindrome detection appears regularly in ICSE Class X board exams. Scenario 12 reinforces robust palindrome logic.",
    "hint": "Bidirectional symmetry verification.",
    "level": "basic",
    "options": [
      "Checks word count",
      "Validates symmetry by comparing original with reversed characters",
      "Checks vowel count",
      "Sorts string first"
    ],
    "correctAnswer": 1,
    "codeExample": "// Palindrome test case 12"
  },
  {
    "id": 13,
    "question": "Question 13 on Palindromes: How is palindrome validation evaluated in scenario 13?",
    "shortAnswer": "Validates whether s.equalsIgnoreCase(reversedString) or bidirectional two-pointer match holds true.",
    "explanation": "Palindrome detection appears regularly in ICSE Class X board exams. Scenario 13 reinforces robust palindrome logic.",
    "hint": "Bidirectional symmetry verification.",
    "level": "basic",
    "options": [
      "Checks word count",
      "Validates symmetry by comparing original with reversed characters",
      "Checks vowel count",
      "Sorts string first"
    ],
    "correctAnswer": 1,
    "codeExample": "// Palindrome test case 13"
  },
  {
    "id": 14,
    "question": "Question 14 on Palindromes: How is palindrome validation evaluated in scenario 14?",
    "shortAnswer": "Validates whether s.equalsIgnoreCase(reversedString) or bidirectional two-pointer match holds true.",
    "explanation": "Palindrome detection appears regularly in ICSE Class X board exams. Scenario 14 reinforces robust palindrome logic.",
    "hint": "Bidirectional symmetry verification.",
    "level": "basic",
    "options": [
      "Checks word count",
      "Validates symmetry by comparing original with reversed characters",
      "Checks vowel count",
      "Sorts string first"
    ],
    "correctAnswer": 1,
    "codeExample": "// Palindrome test case 14"
  },
  {
    "id": 15,
    "question": "Question 15 on Palindromes: How is palindrome validation evaluated in scenario 15?",
    "shortAnswer": "Validates whether s.equalsIgnoreCase(reversedString) or bidirectional two-pointer match holds true.",
    "explanation": "Palindrome detection appears regularly in ICSE Class X board exams. Scenario 15 reinforces robust palindrome logic.",
    "hint": "Bidirectional symmetry verification.",
    "level": "basic",
    "options": [
      "Checks word count",
      "Validates symmetry by comparing original with reversed characters",
      "Checks vowel count",
      "Sorts string first"
    ],
    "correctAnswer": 1,
    "codeExample": "// Palindrome test case 15"
  },
  {
    "id": 16,
    "question": "Question 16 on Palindromes: How is palindrome validation evaluated in scenario 16?",
    "shortAnswer": "Validates whether s.equalsIgnoreCase(reversedString) or bidirectional two-pointer match holds true.",
    "explanation": "Palindrome detection appears regularly in ICSE Class X board exams. Scenario 16 reinforces robust palindrome logic.",
    "hint": "Bidirectional symmetry verification.",
    "level": "basic",
    "options": [
      "Checks word count",
      "Validates symmetry by comparing original with reversed characters",
      "Checks vowel count",
      "Sorts string first"
    ],
    "correctAnswer": 1,
    "codeExample": "// Palindrome test case 16"
  },
  {
    "id": 17,
    "question": "Question 17 on Palindromes: How is palindrome validation evaluated in scenario 17?",
    "shortAnswer": "Validates whether s.equalsIgnoreCase(reversedString) or bidirectional two-pointer match holds true.",
    "explanation": "Palindrome detection appears regularly in ICSE Class X board exams. Scenario 17 reinforces robust palindrome logic.",
    "hint": "Bidirectional symmetry verification.",
    "level": "basic",
    "options": [
      "Checks word count",
      "Validates symmetry by comparing original with reversed characters",
      "Checks vowel count",
      "Sorts string first"
    ],
    "correctAnswer": 1,
    "codeExample": "// Palindrome test case 17"
  },
  {
    "id": 18,
    "question": "Question 18 on Palindromes: How is palindrome validation evaluated in scenario 18?",
    "shortAnswer": "Validates whether s.equalsIgnoreCase(reversedString) or bidirectional two-pointer match holds true.",
    "explanation": "Palindrome detection appears regularly in ICSE Class X board exams. Scenario 18 reinforces robust palindrome logic.",
    "hint": "Bidirectional symmetry verification.",
    "level": "basic",
    "options": [
      "Checks word count",
      "Validates symmetry by comparing original with reversed characters",
      "Checks vowel count",
      "Sorts string first"
    ],
    "correctAnswer": 1,
    "codeExample": "// Palindrome test case 18"
  },
  {
    "id": 19,
    "question": "Question 19 on Palindromes: How is palindrome validation evaluated in scenario 19?",
    "shortAnswer": "Validates whether s.equalsIgnoreCase(reversedString) or bidirectional two-pointer match holds true.",
    "explanation": "Palindrome detection appears regularly in ICSE Class X board exams. Scenario 19 reinforces robust palindrome logic.",
    "hint": "Bidirectional symmetry verification.",
    "level": "advanced",
    "options": [
      "Checks word count",
      "Validates symmetry by comparing original with reversed characters",
      "Checks vowel count",
      "Sorts string first"
    ],
    "correctAnswer": 1,
    "codeExample": "// Palindrome test case 19"
  },
  {
    "id": 20,
    "question": "Question 20 on Palindromes: How is palindrome validation evaluated in scenario 20?",
    "shortAnswer": "Validates whether s.equalsIgnoreCase(reversedString) or bidirectional two-pointer match holds true.",
    "explanation": "Palindrome detection appears regularly in ICSE Class X board exams. Scenario 20 reinforces robust palindrome logic.",
    "hint": "Bidirectional symmetry verification.",
    "level": "advanced",
    "options": [
      "Checks word count",
      "Validates symmetry by comparing original with reversed characters",
      "Checks vowel count",
      "Sorts string first"
    ],
    "correctAnswer": 1,
    "codeExample": "// Palindrome test case 20"
  },
  {
    "id": 21,
    "question": "Question 21 on Palindromes: How is palindrome validation evaluated in scenario 21?",
    "shortAnswer": "Validates whether s.equalsIgnoreCase(reversedString) or bidirectional two-pointer match holds true.",
    "explanation": "Palindrome detection appears regularly in ICSE Class X board exams. Scenario 21 reinforces robust palindrome logic.",
    "hint": "Bidirectional symmetry verification.",
    "level": "advanced",
    "options": [
      "Checks word count",
      "Validates symmetry by comparing original with reversed characters",
      "Checks vowel count",
      "Sorts string first"
    ],
    "correctAnswer": 1,
    "codeExample": "// Palindrome test case 21"
  },
  {
    "id": 22,
    "question": "Question 22 on Palindromes: How is palindrome validation evaluated in scenario 22?",
    "shortAnswer": "Validates whether s.equalsIgnoreCase(reversedString) or bidirectional two-pointer match holds true.",
    "explanation": "Palindrome detection appears regularly in ICSE Class X board exams. Scenario 22 reinforces robust palindrome logic.",
    "hint": "Bidirectional symmetry verification.",
    "level": "advanced",
    "options": [
      "Checks word count",
      "Validates symmetry by comparing original with reversed characters",
      "Checks vowel count",
      "Sorts string first"
    ],
    "correctAnswer": 1,
    "codeExample": "// Palindrome test case 22"
  },
  {
    "id": 23,
    "question": "Question 23 on Palindromes: How is palindrome validation evaluated in scenario 23?",
    "shortAnswer": "Validates whether s.equalsIgnoreCase(reversedString) or bidirectional two-pointer match holds true.",
    "explanation": "Palindrome detection appears regularly in ICSE Class X board exams. Scenario 23 reinforces robust palindrome logic.",
    "hint": "Bidirectional symmetry verification.",
    "level": "advanced",
    "options": [
      "Checks word count",
      "Validates symmetry by comparing original with reversed characters",
      "Checks vowel count",
      "Sorts string first"
    ],
    "correctAnswer": 1,
    "codeExample": "// Palindrome test case 23"
  },
  {
    "id": 24,
    "question": "Question 24 on Palindromes: How is palindrome validation evaluated in scenario 24?",
    "shortAnswer": "Validates whether s.equalsIgnoreCase(reversedString) or bidirectional two-pointer match holds true.",
    "explanation": "Palindrome detection appears regularly in ICSE Class X board exams. Scenario 24 reinforces robust palindrome logic.",
    "hint": "Bidirectional symmetry verification.",
    "level": "advanced",
    "options": [
      "Checks word count",
      "Validates symmetry by comparing original with reversed characters",
      "Checks vowel count",
      "Sorts string first"
    ],
    "correctAnswer": 1,
    "codeExample": "// Palindrome test case 24"
  },
  {
    "id": 25,
    "question": "Question 25 on Palindromes: How is palindrome validation evaluated in scenario 25?",
    "shortAnswer": "Validates whether s.equalsIgnoreCase(reversedString) or bidirectional two-pointer match holds true.",
    "explanation": "Palindrome detection appears regularly in ICSE Class X board exams. Scenario 25 reinforces robust palindrome logic.",
    "hint": "Bidirectional symmetry verification.",
    "level": "advanced",
    "options": [
      "Checks word count",
      "Validates symmetry by comparing original with reversed characters",
      "Checks vowel count",
      "Sorts string first"
    ],
    "correctAnswer": 1,
    "codeExample": "// Palindrome test case 25"
  }
];

export default questions;
