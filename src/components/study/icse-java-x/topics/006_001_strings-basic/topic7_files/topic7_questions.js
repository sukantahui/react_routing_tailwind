const questions = [
  {
    "id": 1,
    "question": "What does the '==' operator compare when applied to two String variables?",
    "shortAnswer": "Memory addresses (object references) of the two variables.",
    "explanation": "'==' checks whether both variables point to the exact same object in memory.",
    "hint": "Address comparison",
    "level": "basic",
    "options": [
      "Character contents",
      "Memory addresses (references)",
      "String lengths",
      "Hash codes"
    ],
    "correctAnswer": 1,
    "codeExample": "s1 == s2 checks reference"
  },
  {
    "id": 2,
    "question": "What does the .equals() method compare in class String?",
    "shortAnswer": "Character sequences (content equality) of the two String objects.",
    "explanation": "equals() loops through each character and returns true if all match in identical order.",
    "hint": "Content comparison",
    "level": "basic",
    "options": [
      "Memory addresses",
      "Character contents",
      "Object hash codes",
      "Alphabetical order"
    ],
    "correctAnswer": 1,
    "codeExample": "s1.equals(s2) checks content"
  },
  {
    "id": 3,
    "question": "What is the output of: String s1 = \"ICSE\"; String s2 = \"ICSE\"; System.out.println(s1 == s2);?",
    "shortAnswer": "true",
    "explanation": "Both point to the same cached literal in the String Constant Pool.",
    "hint": "Pool caching yields true",
    "level": "basic",
    "options": [
      "true",
      "false",
      "Compile error",
      "Runtime error"
    ],
    "correctAnswer": 0,
    "codeExample": "s1 == s2 is true"
  },
  {
    "id": 4,
    "question": "What is the output of: String s1 = new String(\"ICSE\"); String s2 = new String(\"ICSE\"); System.out.println(s1 == s2);?",
    "shortAnswer": "false",
    "explanation": "'new' forces creation of two distinct objects in Heap with different addresses.",
    "hint": "Distinct heap addresses",
    "level": "basic",
    "options": [
      "true",
      "false",
      "Error",
      "null"
    ],
    "correctAnswer": 1,
    "codeExample": "s1 == s2 is false"
  },
  {
    "id": 5,
    "question": "What is the output of: String s1 = new String(\"ICSE\"); String s2 = new String(\"ICSE\"); System.out.println(s1.equals(s2));?",
    "shortAnswer": "true",
    "explanation": "Both objects contain identical characters 'I', 'C', 'S', 'E'.",
    "hint": "Content matches",
    "level": "basic",
    "options": [
      "true",
      "false",
      "Error",
      "-1"
    ],
    "correctAnswer": 0,
    "codeExample": "s1.equals(s2) is true"
  },
  {
    "id": 6,
    "question": "Question 6 on Equality: How does the JVM evaluate equality in comparison case 6?",
    "shortAnswer": "equals() verifies character-by-character content; == verifies identical memory address.",
    "explanation": "In ICSE examinations, distinguishing reference identity (==) from content equality (.equals()) is critical. Case 6 highlights this distinction.",
    "hint": "== checks address; equals() checks content.",
    "level": "basic",
    "options": [
      "== checks content",
      "== checks address; equals() checks content",
      "equals() checks length only",
      "Both check heap size"
    ],
    "correctAnswer": 1,
    "codeExample": "// Comparison case 6"
  },
  {
    "id": 7,
    "question": "Question 7 on Equality: How does the JVM evaluate equality in comparison case 7?",
    "shortAnswer": "equals() verifies character-by-character content; == verifies identical memory address.",
    "explanation": "In ICSE examinations, distinguishing reference identity (==) from content equality (.equals()) is critical. Case 7 highlights this distinction.",
    "hint": "== checks address; equals() checks content.",
    "level": "basic",
    "options": [
      "== checks content",
      "== checks address; equals() checks content",
      "equals() checks length only",
      "Both check heap size"
    ],
    "correctAnswer": 1,
    "codeExample": "// Comparison case 7"
  },
  {
    "id": 8,
    "question": "Question 8 on Equality: How does the JVM evaluate equality in comparison case 8?",
    "shortAnswer": "equals() verifies character-by-character content; == verifies identical memory address.",
    "explanation": "In ICSE examinations, distinguishing reference identity (==) from content equality (.equals()) is critical. Case 8 highlights this distinction.",
    "hint": "== checks address; equals() checks content.",
    "level": "basic",
    "options": [
      "== checks content",
      "== checks address; equals() checks content",
      "equals() checks length only",
      "Both check heap size"
    ],
    "correctAnswer": 1,
    "codeExample": "// Comparison case 8"
  },
  {
    "id": 9,
    "question": "Question 9 on Equality: How does the JVM evaluate equality in comparison case 9?",
    "shortAnswer": "equals() verifies character-by-character content; == verifies identical memory address.",
    "explanation": "In ICSE examinations, distinguishing reference identity (==) from content equality (.equals()) is critical. Case 9 highlights this distinction.",
    "hint": "== checks address; equals() checks content.",
    "level": "basic",
    "options": [
      "== checks content",
      "== checks address; equals() checks content",
      "equals() checks length only",
      "Both check heap size"
    ],
    "correctAnswer": 1,
    "codeExample": "// Comparison case 9"
  },
  {
    "id": 10,
    "question": "Question 10 on Equality: How does the JVM evaluate equality in comparison case 10?",
    "shortAnswer": "equals() verifies character-by-character content; == verifies identical memory address.",
    "explanation": "In ICSE examinations, distinguishing reference identity (==) from content equality (.equals()) is critical. Case 10 highlights this distinction.",
    "hint": "== checks address; equals() checks content.",
    "level": "basic",
    "options": [
      "== checks content",
      "== checks address; equals() checks content",
      "equals() checks length only",
      "Both check heap size"
    ],
    "correctAnswer": 1,
    "codeExample": "// Comparison case 10"
  },
  {
    "id": 11,
    "question": "Question 11 on Equality: How does the JVM evaluate equality in comparison case 11?",
    "shortAnswer": "equals() verifies character-by-character content; == verifies identical memory address.",
    "explanation": "In ICSE examinations, distinguishing reference identity (==) from content equality (.equals()) is critical. Case 11 highlights this distinction.",
    "hint": "== checks address; equals() checks content.",
    "level": "basic",
    "options": [
      "== checks content",
      "== checks address; equals() checks content",
      "equals() checks length only",
      "Both check heap size"
    ],
    "correctAnswer": 1,
    "codeExample": "// Comparison case 11"
  },
  {
    "id": 12,
    "question": "Question 12 on Equality: How does the JVM evaluate equality in comparison case 12?",
    "shortAnswer": "equals() verifies character-by-character content; == verifies identical memory address.",
    "explanation": "In ICSE examinations, distinguishing reference identity (==) from content equality (.equals()) is critical. Case 12 highlights this distinction.",
    "hint": "== checks address; equals() checks content.",
    "level": "basic",
    "options": [
      "== checks content",
      "== checks address; equals() checks content",
      "equals() checks length only",
      "Both check heap size"
    ],
    "correctAnswer": 1,
    "codeExample": "// Comparison case 12"
  },
  {
    "id": 13,
    "question": "Question 13 on Equality: How does the JVM evaluate equality in comparison case 13?",
    "shortAnswer": "equals() verifies character-by-character content; == verifies identical memory address.",
    "explanation": "In ICSE examinations, distinguishing reference identity (==) from content equality (.equals()) is critical. Case 13 highlights this distinction.",
    "hint": "== checks address; equals() checks content.",
    "level": "basic",
    "options": [
      "== checks content",
      "== checks address; equals() checks content",
      "equals() checks length only",
      "Both check heap size"
    ],
    "correctAnswer": 1,
    "codeExample": "// Comparison case 13"
  },
  {
    "id": 14,
    "question": "Question 14 on Equality: How does the JVM evaluate equality in comparison case 14?",
    "shortAnswer": "equals() verifies character-by-character content; == verifies identical memory address.",
    "explanation": "In ICSE examinations, distinguishing reference identity (==) from content equality (.equals()) is critical. Case 14 highlights this distinction.",
    "hint": "== checks address; equals() checks content.",
    "level": "basic",
    "options": [
      "== checks content",
      "== checks address; equals() checks content",
      "equals() checks length only",
      "Both check heap size"
    ],
    "correctAnswer": 1,
    "codeExample": "// Comparison case 14"
  },
  {
    "id": 15,
    "question": "Question 15 on Equality: How does the JVM evaluate equality in comparison case 15?",
    "shortAnswer": "equals() verifies character-by-character content; == verifies identical memory address.",
    "explanation": "In ICSE examinations, distinguishing reference identity (==) from content equality (.equals()) is critical. Case 15 highlights this distinction.",
    "hint": "== checks address; equals() checks content.",
    "level": "basic",
    "options": [
      "== checks content",
      "== checks address; equals() checks content",
      "equals() checks length only",
      "Both check heap size"
    ],
    "correctAnswer": 1,
    "codeExample": "// Comparison case 15"
  },
  {
    "id": 16,
    "question": "Question 16 on Equality: How does the JVM evaluate equality in comparison case 16?",
    "shortAnswer": "equals() verifies character-by-character content; == verifies identical memory address.",
    "explanation": "In ICSE examinations, distinguishing reference identity (==) from content equality (.equals()) is critical. Case 16 highlights this distinction.",
    "hint": "== checks address; equals() checks content.",
    "level": "basic",
    "options": [
      "== checks content",
      "== checks address; equals() checks content",
      "equals() checks length only",
      "Both check heap size"
    ],
    "correctAnswer": 1,
    "codeExample": "// Comparison case 16"
  },
  {
    "id": 17,
    "question": "Question 17 on Equality: How does the JVM evaluate equality in comparison case 17?",
    "shortAnswer": "equals() verifies character-by-character content; == verifies identical memory address.",
    "explanation": "In ICSE examinations, distinguishing reference identity (==) from content equality (.equals()) is critical. Case 17 highlights this distinction.",
    "hint": "== checks address; equals() checks content.",
    "level": "basic",
    "options": [
      "== checks content",
      "== checks address; equals() checks content",
      "equals() checks length only",
      "Both check heap size"
    ],
    "correctAnswer": 1,
    "codeExample": "// Comparison case 17"
  },
  {
    "id": 18,
    "question": "Question 18 on Equality: How does the JVM evaluate equality in comparison case 18?",
    "shortAnswer": "equals() verifies character-by-character content; == verifies identical memory address.",
    "explanation": "In ICSE examinations, distinguishing reference identity (==) from content equality (.equals()) is critical. Case 18 highlights this distinction.",
    "hint": "== checks address; equals() checks content.",
    "level": "basic",
    "options": [
      "== checks content",
      "== checks address; equals() checks content",
      "equals() checks length only",
      "Both check heap size"
    ],
    "correctAnswer": 1,
    "codeExample": "// Comparison case 18"
  },
  {
    "id": 19,
    "question": "Question 19 on Equality: How does the JVM evaluate equality in comparison case 19?",
    "shortAnswer": "equals() verifies character-by-character content; == verifies identical memory address.",
    "explanation": "In ICSE examinations, distinguishing reference identity (==) from content equality (.equals()) is critical. Case 19 highlights this distinction.",
    "hint": "== checks address; equals() checks content.",
    "level": "advanced",
    "options": [
      "== checks content",
      "== checks address; equals() checks content",
      "equals() checks length only",
      "Both check heap size"
    ],
    "correctAnswer": 1,
    "codeExample": "// Comparison case 19"
  },
  {
    "id": 20,
    "question": "Question 20 on Equality: How does the JVM evaluate equality in comparison case 20?",
    "shortAnswer": "equals() verifies character-by-character content; == verifies identical memory address.",
    "explanation": "In ICSE examinations, distinguishing reference identity (==) from content equality (.equals()) is critical. Case 20 highlights this distinction.",
    "hint": "== checks address; equals() checks content.",
    "level": "advanced",
    "options": [
      "== checks content",
      "== checks address; equals() checks content",
      "equals() checks length only",
      "Both check heap size"
    ],
    "correctAnswer": 1,
    "codeExample": "// Comparison case 20"
  },
  {
    "id": 21,
    "question": "Question 21 on Equality: How does the JVM evaluate equality in comparison case 21?",
    "shortAnswer": "equals() verifies character-by-character content; == verifies identical memory address.",
    "explanation": "In ICSE examinations, distinguishing reference identity (==) from content equality (.equals()) is critical. Case 21 highlights this distinction.",
    "hint": "== checks address; equals() checks content.",
    "level": "advanced",
    "options": [
      "== checks content",
      "== checks address; equals() checks content",
      "equals() checks length only",
      "Both check heap size"
    ],
    "correctAnswer": 1,
    "codeExample": "// Comparison case 21"
  },
  {
    "id": 22,
    "question": "Question 22 on Equality: How does the JVM evaluate equality in comparison case 22?",
    "shortAnswer": "equals() verifies character-by-character content; == verifies identical memory address.",
    "explanation": "In ICSE examinations, distinguishing reference identity (==) from content equality (.equals()) is critical. Case 22 highlights this distinction.",
    "hint": "== checks address; equals() checks content.",
    "level": "advanced",
    "options": [
      "== checks content",
      "== checks address; equals() checks content",
      "equals() checks length only",
      "Both check heap size"
    ],
    "correctAnswer": 1,
    "codeExample": "// Comparison case 22"
  },
  {
    "id": 23,
    "question": "Question 23 on Equality: How does the JVM evaluate equality in comparison case 23?",
    "shortAnswer": "equals() verifies character-by-character content; == verifies identical memory address.",
    "explanation": "In ICSE examinations, distinguishing reference identity (==) from content equality (.equals()) is critical. Case 23 highlights this distinction.",
    "hint": "== checks address; equals() checks content.",
    "level": "advanced",
    "options": [
      "== checks content",
      "== checks address; equals() checks content",
      "equals() checks length only",
      "Both check heap size"
    ],
    "correctAnswer": 1,
    "codeExample": "// Comparison case 23"
  },
  {
    "id": 24,
    "question": "Question 24 on Equality: How does the JVM evaluate equality in comparison case 24?",
    "shortAnswer": "equals() verifies character-by-character content; == verifies identical memory address.",
    "explanation": "In ICSE examinations, distinguishing reference identity (==) from content equality (.equals()) is critical. Case 24 highlights this distinction.",
    "hint": "== checks address; equals() checks content.",
    "level": "advanced",
    "options": [
      "== checks content",
      "== checks address; equals() checks content",
      "equals() checks length only",
      "Both check heap size"
    ],
    "correctAnswer": 1,
    "codeExample": "// Comparison case 24"
  },
  {
    "id": 25,
    "question": "Question 25 on Equality: How does the JVM evaluate equality in comparison case 25?",
    "shortAnswer": "equals() verifies character-by-character content; == verifies identical memory address.",
    "explanation": "In ICSE examinations, distinguishing reference identity (==) from content equality (.equals()) is critical. Case 25 highlights this distinction.",
    "hint": "== checks address; equals() checks content.",
    "level": "advanced",
    "options": [
      "== checks content",
      "== checks address; equals() checks content",
      "equals() checks length only",
      "Both check heap size"
    ],
    "correctAnswer": 1,
    "codeExample": "// Comparison case 25"
  }
];

export default questions;
