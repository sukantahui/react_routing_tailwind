const questions = [
  {
    "id": 1,
    "question": "What is the standard loop construct to reverse a String 's' in ICSE Java?",
    "shortAnswer": "for (int i = s.length() - 1; i >= 0; i--) rev = rev + s.charAt(i);",
    "explanation": "Traverse backward from last index down to 0, accumulating characters.",
    "hint": "Backward traversal loop",
    "level": "basic",
    "options": [
      "for (int i = 0; i < s.length(); i++)",
      "for (int i = s.length() - 1; i >= 0; i--)",
      "for (int i = 1; i <= s.length(); i++)",
      "while (s.length() > 0)"
    ],
    "correctAnswer": 1,
    "codeExample": "for(int i = s.length() - 1; i >= 0; i--) rev += s.charAt(i);"
  },
  {
    "id": 2,
    "question": "What should be the initial value of 'rev' before accumulating characters?",
    "shortAnswer": "\"\" (empty string)",
    "explanation": "Starting with empty string ensures no unwanted characters are prepended.",
    "hint": "Initialize with empty string",
    "level": "basic",
    "options": [
      "null",
      "\"\"",
      "\" \" (space)",
      "0"
    ],
    "correctAnswer": 1,
    "codeExample": "String rev = \"\";"
  },
  {
    "id": 3,
    "question": "What happens if rev is initialized to null: String rev = null; rev += s.charAt(i);?",
    "shortAnswer": "Result starts with literal text \"null\" (e.g. \"nullavaJ\")!",
    "explanation": "null is converted to string \"null\" on first concatenation.",
    "hint": "Null concatenation trap",
    "level": "intermediate",
    "options": [
      "Throws NullPointerException",
      "Result starts with \"null\" text",
      "Reverses normally",
      "Compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "String rev = null; rev += 'J'; // \"nullJ\""
  },
  {
    "id": 4,
    "question": "What is the reverse of \"BLUEJ\"?",
    "shortAnswer": "\"JUELB\"",
    "explanation": "Indices backward: 4('J'), 3('e'), 2('u'), 1('l'), 0('B').",
    "hint": "Reverse characters",
    "level": "basic",
    "options": [
      "\"JUELB\"",
      "\"JELUB\"",
      "\"BLUEJ\"",
      "\"UBELJ\""
    ],
    "correctAnswer": 0,
    "codeExample": "\"BLUEJ\" -> \"JUELB\""
  },
  {
    "id": 5,
    "question": "How can you reverse a String by prepending characters in a forward loop?",
    "shortAnswer": "for (int i = 0; i < s.length(); i++) rev = s.charAt(i) + rev;",
    "explanation": "Prepending s.charAt(i) before current rev reverses the sequence naturally.",
    "hint": "Prepending idiom",
    "level": "intermediate",
    "options": [
      "rev = rev + s.charAt(i)",
      "rev = s.charAt(i) + rev",
      "rev += s.charAt(i)",
      "rev = s.charAt(rev.length())"
    ],
    "correctAnswer": 1,
    "codeExample": "rev = s.charAt(i) + rev;"
  },
  {
    "id": 6,
    "question": "Question 6 on String Reversal: How is reversal implemented under condition 6?",
    "shortAnswer": "Reversal extracts characters backward or prepends forward to build the reversed sequence.",
    "explanation": "String reversal is one of the most tested algorithms in ICSE Section B. Condition 6 reviews algorithmic reversal patterns.",
    "hint": "Algorithmic character transposition.",
    "level": "basic",
    "options": [
      "Requires sorting array",
      "Iterates through indices, building reversed string accumulation",
      "Only possible with Scanner",
      "Requires recursion always"
    ],
    "correctAnswer": 1,
    "codeExample": "// String reversal condition 6"
  },
  {
    "id": 7,
    "question": "Question 7 on String Reversal: How is reversal implemented under condition 7?",
    "shortAnswer": "Reversal extracts characters backward or prepends forward to build the reversed sequence.",
    "explanation": "String reversal is one of the most tested algorithms in ICSE Section B. Condition 7 reviews algorithmic reversal patterns.",
    "hint": "Algorithmic character transposition.",
    "level": "basic",
    "options": [
      "Requires sorting array",
      "Iterates through indices, building reversed string accumulation",
      "Only possible with Scanner",
      "Requires recursion always"
    ],
    "correctAnswer": 1,
    "codeExample": "// String reversal condition 7"
  },
  {
    "id": 8,
    "question": "Question 8 on String Reversal: How is reversal implemented under condition 8?",
    "shortAnswer": "Reversal extracts characters backward or prepends forward to build the reversed sequence.",
    "explanation": "String reversal is one of the most tested algorithms in ICSE Section B. Condition 8 reviews algorithmic reversal patterns.",
    "hint": "Algorithmic character transposition.",
    "level": "basic",
    "options": [
      "Requires sorting array",
      "Iterates through indices, building reversed string accumulation",
      "Only possible with Scanner",
      "Requires recursion always"
    ],
    "correctAnswer": 1,
    "codeExample": "// String reversal condition 8"
  },
  {
    "id": 9,
    "question": "Question 9 on String Reversal: How is reversal implemented under condition 9?",
    "shortAnswer": "Reversal extracts characters backward or prepends forward to build the reversed sequence.",
    "explanation": "String reversal is one of the most tested algorithms in ICSE Section B. Condition 9 reviews algorithmic reversal patterns.",
    "hint": "Algorithmic character transposition.",
    "level": "basic",
    "options": [
      "Requires sorting array",
      "Iterates through indices, building reversed string accumulation",
      "Only possible with Scanner",
      "Requires recursion always"
    ],
    "correctAnswer": 1,
    "codeExample": "// String reversal condition 9"
  },
  {
    "id": 10,
    "question": "Question 10 on String Reversal: How is reversal implemented under condition 10?",
    "shortAnswer": "Reversal extracts characters backward or prepends forward to build the reversed sequence.",
    "explanation": "String reversal is one of the most tested algorithms in ICSE Section B. Condition 10 reviews algorithmic reversal patterns.",
    "hint": "Algorithmic character transposition.",
    "level": "basic",
    "options": [
      "Requires sorting array",
      "Iterates through indices, building reversed string accumulation",
      "Only possible with Scanner",
      "Requires recursion always"
    ],
    "correctAnswer": 1,
    "codeExample": "// String reversal condition 10"
  },
  {
    "id": 11,
    "question": "Question 11 on String Reversal: How is reversal implemented under condition 11?",
    "shortAnswer": "Reversal extracts characters backward or prepends forward to build the reversed sequence.",
    "explanation": "String reversal is one of the most tested algorithms in ICSE Section B. Condition 11 reviews algorithmic reversal patterns.",
    "hint": "Algorithmic character transposition.",
    "level": "basic",
    "options": [
      "Requires sorting array",
      "Iterates through indices, building reversed string accumulation",
      "Only possible with Scanner",
      "Requires recursion always"
    ],
    "correctAnswer": 1,
    "codeExample": "// String reversal condition 11"
  },
  {
    "id": 12,
    "question": "Question 12 on String Reversal: How is reversal implemented under condition 12?",
    "shortAnswer": "Reversal extracts characters backward or prepends forward to build the reversed sequence.",
    "explanation": "String reversal is one of the most tested algorithms in ICSE Section B. Condition 12 reviews algorithmic reversal patterns.",
    "hint": "Algorithmic character transposition.",
    "level": "basic",
    "options": [
      "Requires sorting array",
      "Iterates through indices, building reversed string accumulation",
      "Only possible with Scanner",
      "Requires recursion always"
    ],
    "correctAnswer": 1,
    "codeExample": "// String reversal condition 12"
  },
  {
    "id": 13,
    "question": "Question 13 on String Reversal: How is reversal implemented under condition 13?",
    "shortAnswer": "Reversal extracts characters backward or prepends forward to build the reversed sequence.",
    "explanation": "String reversal is one of the most tested algorithms in ICSE Section B. Condition 13 reviews algorithmic reversal patterns.",
    "hint": "Algorithmic character transposition.",
    "level": "basic",
    "options": [
      "Requires sorting array",
      "Iterates through indices, building reversed string accumulation",
      "Only possible with Scanner",
      "Requires recursion always"
    ],
    "correctAnswer": 1,
    "codeExample": "// String reversal condition 13"
  },
  {
    "id": 14,
    "question": "Question 14 on String Reversal: How is reversal implemented under condition 14?",
    "shortAnswer": "Reversal extracts characters backward or prepends forward to build the reversed sequence.",
    "explanation": "String reversal is one of the most tested algorithms in ICSE Section B. Condition 14 reviews algorithmic reversal patterns.",
    "hint": "Algorithmic character transposition.",
    "level": "basic",
    "options": [
      "Requires sorting array",
      "Iterates through indices, building reversed string accumulation",
      "Only possible with Scanner",
      "Requires recursion always"
    ],
    "correctAnswer": 1,
    "codeExample": "// String reversal condition 14"
  },
  {
    "id": 15,
    "question": "Question 15 on String Reversal: How is reversal implemented under condition 15?",
    "shortAnswer": "Reversal extracts characters backward or prepends forward to build the reversed sequence.",
    "explanation": "String reversal is one of the most tested algorithms in ICSE Section B. Condition 15 reviews algorithmic reversal patterns.",
    "hint": "Algorithmic character transposition.",
    "level": "basic",
    "options": [
      "Requires sorting array",
      "Iterates through indices, building reversed string accumulation",
      "Only possible with Scanner",
      "Requires recursion always"
    ],
    "correctAnswer": 1,
    "codeExample": "// String reversal condition 15"
  },
  {
    "id": 16,
    "question": "Question 16 on String Reversal: How is reversal implemented under condition 16?",
    "shortAnswer": "Reversal extracts characters backward or prepends forward to build the reversed sequence.",
    "explanation": "String reversal is one of the most tested algorithms in ICSE Section B. Condition 16 reviews algorithmic reversal patterns.",
    "hint": "Algorithmic character transposition.",
    "level": "basic",
    "options": [
      "Requires sorting array",
      "Iterates through indices, building reversed string accumulation",
      "Only possible with Scanner",
      "Requires recursion always"
    ],
    "correctAnswer": 1,
    "codeExample": "// String reversal condition 16"
  },
  {
    "id": 17,
    "question": "Question 17 on String Reversal: How is reversal implemented under condition 17?",
    "shortAnswer": "Reversal extracts characters backward or prepends forward to build the reversed sequence.",
    "explanation": "String reversal is one of the most tested algorithms in ICSE Section B. Condition 17 reviews algorithmic reversal patterns.",
    "hint": "Algorithmic character transposition.",
    "level": "basic",
    "options": [
      "Requires sorting array",
      "Iterates through indices, building reversed string accumulation",
      "Only possible with Scanner",
      "Requires recursion always"
    ],
    "correctAnswer": 1,
    "codeExample": "// String reversal condition 17"
  },
  {
    "id": 18,
    "question": "Question 18 on String Reversal: How is reversal implemented under condition 18?",
    "shortAnswer": "Reversal extracts characters backward or prepends forward to build the reversed sequence.",
    "explanation": "String reversal is one of the most tested algorithms in ICSE Section B. Condition 18 reviews algorithmic reversal patterns.",
    "hint": "Algorithmic character transposition.",
    "level": "basic",
    "options": [
      "Requires sorting array",
      "Iterates through indices, building reversed string accumulation",
      "Only possible with Scanner",
      "Requires recursion always"
    ],
    "correctAnswer": 1,
    "codeExample": "// String reversal condition 18"
  },
  {
    "id": 19,
    "question": "Question 19 on String Reversal: How is reversal implemented under condition 19?",
    "shortAnswer": "Reversal extracts characters backward or prepends forward to build the reversed sequence.",
    "explanation": "String reversal is one of the most tested algorithms in ICSE Section B. Condition 19 reviews algorithmic reversal patterns.",
    "hint": "Algorithmic character transposition.",
    "level": "advanced",
    "options": [
      "Requires sorting array",
      "Iterates through indices, building reversed string accumulation",
      "Only possible with Scanner",
      "Requires recursion always"
    ],
    "correctAnswer": 1,
    "codeExample": "// String reversal condition 19"
  },
  {
    "id": 20,
    "question": "Question 20 on String Reversal: How is reversal implemented under condition 20?",
    "shortAnswer": "Reversal extracts characters backward or prepends forward to build the reversed sequence.",
    "explanation": "String reversal is one of the most tested algorithms in ICSE Section B. Condition 20 reviews algorithmic reversal patterns.",
    "hint": "Algorithmic character transposition.",
    "level": "advanced",
    "options": [
      "Requires sorting array",
      "Iterates through indices, building reversed string accumulation",
      "Only possible with Scanner",
      "Requires recursion always"
    ],
    "correctAnswer": 1,
    "codeExample": "// String reversal condition 20"
  },
  {
    "id": 21,
    "question": "Question 21 on String Reversal: How is reversal implemented under condition 21?",
    "shortAnswer": "Reversal extracts characters backward or prepends forward to build the reversed sequence.",
    "explanation": "String reversal is one of the most tested algorithms in ICSE Section B. Condition 21 reviews algorithmic reversal patterns.",
    "hint": "Algorithmic character transposition.",
    "level": "advanced",
    "options": [
      "Requires sorting array",
      "Iterates through indices, building reversed string accumulation",
      "Only possible with Scanner",
      "Requires recursion always"
    ],
    "correctAnswer": 1,
    "codeExample": "// String reversal condition 21"
  },
  {
    "id": 22,
    "question": "Question 22 on String Reversal: How is reversal implemented under condition 22?",
    "shortAnswer": "Reversal extracts characters backward or prepends forward to build the reversed sequence.",
    "explanation": "String reversal is one of the most tested algorithms in ICSE Section B. Condition 22 reviews algorithmic reversal patterns.",
    "hint": "Algorithmic character transposition.",
    "level": "advanced",
    "options": [
      "Requires sorting array",
      "Iterates through indices, building reversed string accumulation",
      "Only possible with Scanner",
      "Requires recursion always"
    ],
    "correctAnswer": 1,
    "codeExample": "// String reversal condition 22"
  },
  {
    "id": 23,
    "question": "Question 23 on String Reversal: How is reversal implemented under condition 23?",
    "shortAnswer": "Reversal extracts characters backward or prepends forward to build the reversed sequence.",
    "explanation": "String reversal is one of the most tested algorithms in ICSE Section B. Condition 23 reviews algorithmic reversal patterns.",
    "hint": "Algorithmic character transposition.",
    "level": "advanced",
    "options": [
      "Requires sorting array",
      "Iterates through indices, building reversed string accumulation",
      "Only possible with Scanner",
      "Requires recursion always"
    ],
    "correctAnswer": 1,
    "codeExample": "// String reversal condition 23"
  },
  {
    "id": 24,
    "question": "Question 24 on String Reversal: How is reversal implemented under condition 24?",
    "shortAnswer": "Reversal extracts characters backward or prepends forward to build the reversed sequence.",
    "explanation": "String reversal is one of the most tested algorithms in ICSE Section B. Condition 24 reviews algorithmic reversal patterns.",
    "hint": "Algorithmic character transposition.",
    "level": "advanced",
    "options": [
      "Requires sorting array",
      "Iterates through indices, building reversed string accumulation",
      "Only possible with Scanner",
      "Requires recursion always"
    ],
    "correctAnswer": 1,
    "codeExample": "// String reversal condition 24"
  },
  {
    "id": 25,
    "question": "Question 25 on String Reversal: How is reversal implemented under condition 25?",
    "shortAnswer": "Reversal extracts characters backward or prepends forward to build the reversed sequence.",
    "explanation": "String reversal is one of the most tested algorithms in ICSE Section B. Condition 25 reviews algorithmic reversal patterns.",
    "hint": "Algorithmic character transposition.",
    "level": "advanced",
    "options": [
      "Requires sorting array",
      "Iterates through indices, building reversed string accumulation",
      "Only possible with Scanner",
      "Requires recursion always"
    ],
    "correctAnswer": 1,
    "codeExample": "// String reversal condition 25"
  }
];

export default questions;
