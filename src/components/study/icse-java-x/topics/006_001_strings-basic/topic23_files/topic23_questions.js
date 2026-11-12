const questions = [
  {
    "id": 1,
    "question": "What method converts a String to a primitive char array?",
    "shortAnswer": "public char[] toCharArray()",
    "explanation": "toCharArray() allocates and returns a new char array containing characters of the string.",
    "hint": "toCharArray method",
    "level": "basic",
    "options": [
      "s.toArray()",
      "s.toCharArray()",
      "s.getChars()",
      "s.split()"
    ],
    "correctAnswer": 1,
    "codeExample": "char[] arr = s.toCharArray();"
  },
  {
    "id": 2,
    "question": "How do you create a String from a char array: char[] arr = {'J','A','V','A'};?",
    "shortAnswer": "new String(arr) or String.valueOf(arr)",
    "explanation": "String constructor and String.valueOf both accept char[] and construct a String.",
    "hint": "new String(arr)",
    "level": "basic",
    "options": [
      "arr.toString()",
      "new String(arr)",
      "(String)arr",
      "String.from(arr)"
    ],
    "correctAnswer": 1,
    "codeExample": "String s = new String(arr);"
  },
  {
    "id": 3,
    "question": "What does char[].toString() print in Java?",
    "shortAnswer": "Array memory address / type identifier (e.g. \"[C@15db9742\"), NOT the characters!",
    "explanation": "char[] does not override Object.toString(). Must use new String(arr).",
    "hint": "Array toString pitfall",
    "level": "intermediate",
    "options": [
      "The characters in the array",
      "The object hash/type identifier (e.g. [C@...)",
      "null",
      "Compile error"
    ],
    "correctAnswer": 1,
    "codeExample": "arr.toString() prints object identifier"
  },
  {
    "id": 4,
    "question": "How do you convert a sentence into an array of words separated by space?",
    "shortAnswer": "s.split(\" \")",
    "explanation": "split(\" \") splits the string around spaces and returns a String[] array.",
    "hint": "split by space",
    "level": "basic",
    "options": [
      "s.toCharArray()",
      "s.split(\" \")",
      "s.words()",
      "s.toArray()"
    ],
    "correctAnswer": 1,
    "codeExample": "String[] words = s.split(\" \");"
  },
  {
    "id": 5,
    "question": "How do you join an array of Strings back into a single String in Java 8+?",
    "shortAnswer": "String.join(\" \", words)",
    "explanation": "String.join joins elements with the specified delimiter.",
    "hint": "String.join method",
    "level": "intermediate",
    "options": [
      "words.join()",
      "String.join(\" \", words)",
      "String.concat(words)",
      "words.toString()"
    ],
    "correctAnswer": 1,
    "codeExample": "String sentence = String.join(\" \", words);"
  },
  {
    "id": 6,
    "question": "Question 6 on String/Array Conversions: How does conversion behave in case 6?",
    "shortAnswer": "Converts between contiguous character arrays (char[]) and immutable String instances.",
    "explanation": "Bridging Strings and Arrays is tested in ICSE sorting and character manipulation algorithms. Case 6 reviews conversion syntax.",
    "hint": "toCharArray and new String(arr).",
    "level": "basic",
    "options": [
      "Causes memory corruption",
      "Copies character data safely between array buffer and String object",
      "Requires casting always",
      "Only valid for numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Conversion case 6"
  },
  {
    "id": 7,
    "question": "Question 7 on String/Array Conversions: How does conversion behave in case 7?",
    "shortAnswer": "Converts between contiguous character arrays (char[]) and immutable String instances.",
    "explanation": "Bridging Strings and Arrays is tested in ICSE sorting and character manipulation algorithms. Case 7 reviews conversion syntax.",
    "hint": "toCharArray and new String(arr).",
    "level": "basic",
    "options": [
      "Causes memory corruption",
      "Copies character data safely between array buffer and String object",
      "Requires casting always",
      "Only valid for numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Conversion case 7"
  },
  {
    "id": 8,
    "question": "Question 8 on String/Array Conversions: How does conversion behave in case 8?",
    "shortAnswer": "Converts between contiguous character arrays (char[]) and immutable String instances.",
    "explanation": "Bridging Strings and Arrays is tested in ICSE sorting and character manipulation algorithms. Case 8 reviews conversion syntax.",
    "hint": "toCharArray and new String(arr).",
    "level": "basic",
    "options": [
      "Causes memory corruption",
      "Copies character data safely between array buffer and String object",
      "Requires casting always",
      "Only valid for numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Conversion case 8"
  },
  {
    "id": 9,
    "question": "Question 9 on String/Array Conversions: How does conversion behave in case 9?",
    "shortAnswer": "Converts between contiguous character arrays (char[]) and immutable String instances.",
    "explanation": "Bridging Strings and Arrays is tested in ICSE sorting and character manipulation algorithms. Case 9 reviews conversion syntax.",
    "hint": "toCharArray and new String(arr).",
    "level": "basic",
    "options": [
      "Causes memory corruption",
      "Copies character data safely between array buffer and String object",
      "Requires casting always",
      "Only valid for numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Conversion case 9"
  },
  {
    "id": 10,
    "question": "Question 10 on String/Array Conversions: How does conversion behave in case 10?",
    "shortAnswer": "Converts between contiguous character arrays (char[]) and immutable String instances.",
    "explanation": "Bridging Strings and Arrays is tested in ICSE sorting and character manipulation algorithms. Case 10 reviews conversion syntax.",
    "hint": "toCharArray and new String(arr).",
    "level": "basic",
    "options": [
      "Causes memory corruption",
      "Copies character data safely between array buffer and String object",
      "Requires casting always",
      "Only valid for numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Conversion case 10"
  },
  {
    "id": 11,
    "question": "Question 11 on String/Array Conversions: How does conversion behave in case 11?",
    "shortAnswer": "Converts between contiguous character arrays (char[]) and immutable String instances.",
    "explanation": "Bridging Strings and Arrays is tested in ICSE sorting and character manipulation algorithms. Case 11 reviews conversion syntax.",
    "hint": "toCharArray and new String(arr).",
    "level": "basic",
    "options": [
      "Causes memory corruption",
      "Copies character data safely between array buffer and String object",
      "Requires casting always",
      "Only valid for numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Conversion case 11"
  },
  {
    "id": 12,
    "question": "Question 12 on String/Array Conversions: How does conversion behave in case 12?",
    "shortAnswer": "Converts between contiguous character arrays (char[]) and immutable String instances.",
    "explanation": "Bridging Strings and Arrays is tested in ICSE sorting and character manipulation algorithms. Case 12 reviews conversion syntax.",
    "hint": "toCharArray and new String(arr).",
    "level": "basic",
    "options": [
      "Causes memory corruption",
      "Copies character data safely between array buffer and String object",
      "Requires casting always",
      "Only valid for numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Conversion case 12"
  },
  {
    "id": 13,
    "question": "Question 13 on String/Array Conversions: How does conversion behave in case 13?",
    "shortAnswer": "Converts between contiguous character arrays (char[]) and immutable String instances.",
    "explanation": "Bridging Strings and Arrays is tested in ICSE sorting and character manipulation algorithms. Case 13 reviews conversion syntax.",
    "hint": "toCharArray and new String(arr).",
    "level": "basic",
    "options": [
      "Causes memory corruption",
      "Copies character data safely between array buffer and String object",
      "Requires casting always",
      "Only valid for numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Conversion case 13"
  },
  {
    "id": 14,
    "question": "Question 14 on String/Array Conversions: How does conversion behave in case 14?",
    "shortAnswer": "Converts between contiguous character arrays (char[]) and immutable String instances.",
    "explanation": "Bridging Strings and Arrays is tested in ICSE sorting and character manipulation algorithms. Case 14 reviews conversion syntax.",
    "hint": "toCharArray and new String(arr).",
    "level": "basic",
    "options": [
      "Causes memory corruption",
      "Copies character data safely between array buffer and String object",
      "Requires casting always",
      "Only valid for numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Conversion case 14"
  },
  {
    "id": 15,
    "question": "Question 15 on String/Array Conversions: How does conversion behave in case 15?",
    "shortAnswer": "Converts between contiguous character arrays (char[]) and immutable String instances.",
    "explanation": "Bridging Strings and Arrays is tested in ICSE sorting and character manipulation algorithms. Case 15 reviews conversion syntax.",
    "hint": "toCharArray and new String(arr).",
    "level": "basic",
    "options": [
      "Causes memory corruption",
      "Copies character data safely between array buffer and String object",
      "Requires casting always",
      "Only valid for numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Conversion case 15"
  },
  {
    "id": 16,
    "question": "Question 16 on String/Array Conversions: How does conversion behave in case 16?",
    "shortAnswer": "Converts between contiguous character arrays (char[]) and immutable String instances.",
    "explanation": "Bridging Strings and Arrays is tested in ICSE sorting and character manipulation algorithms. Case 16 reviews conversion syntax.",
    "hint": "toCharArray and new String(arr).",
    "level": "basic",
    "options": [
      "Causes memory corruption",
      "Copies character data safely between array buffer and String object",
      "Requires casting always",
      "Only valid for numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Conversion case 16"
  },
  {
    "id": 17,
    "question": "Question 17 on String/Array Conversions: How does conversion behave in case 17?",
    "shortAnswer": "Converts between contiguous character arrays (char[]) and immutable String instances.",
    "explanation": "Bridging Strings and Arrays is tested in ICSE sorting and character manipulation algorithms. Case 17 reviews conversion syntax.",
    "hint": "toCharArray and new String(arr).",
    "level": "basic",
    "options": [
      "Causes memory corruption",
      "Copies character data safely between array buffer and String object",
      "Requires casting always",
      "Only valid for numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Conversion case 17"
  },
  {
    "id": 18,
    "question": "Question 18 on String/Array Conversions: How does conversion behave in case 18?",
    "shortAnswer": "Converts between contiguous character arrays (char[]) and immutable String instances.",
    "explanation": "Bridging Strings and Arrays is tested in ICSE sorting and character manipulation algorithms. Case 18 reviews conversion syntax.",
    "hint": "toCharArray and new String(arr).",
    "level": "basic",
    "options": [
      "Causes memory corruption",
      "Copies character data safely between array buffer and String object",
      "Requires casting always",
      "Only valid for numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Conversion case 18"
  },
  {
    "id": 19,
    "question": "Question 19 on String/Array Conversions: How does conversion behave in case 19?",
    "shortAnswer": "Converts between contiguous character arrays (char[]) and immutable String instances.",
    "explanation": "Bridging Strings and Arrays is tested in ICSE sorting and character manipulation algorithms. Case 19 reviews conversion syntax.",
    "hint": "toCharArray and new String(arr).",
    "level": "advanced",
    "options": [
      "Causes memory corruption",
      "Copies character data safely between array buffer and String object",
      "Requires casting always",
      "Only valid for numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Conversion case 19"
  },
  {
    "id": 20,
    "question": "Question 20 on String/Array Conversions: How does conversion behave in case 20?",
    "shortAnswer": "Converts between contiguous character arrays (char[]) and immutable String instances.",
    "explanation": "Bridging Strings and Arrays is tested in ICSE sorting and character manipulation algorithms. Case 20 reviews conversion syntax.",
    "hint": "toCharArray and new String(arr).",
    "level": "advanced",
    "options": [
      "Causes memory corruption",
      "Copies character data safely between array buffer and String object",
      "Requires casting always",
      "Only valid for numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Conversion case 20"
  },
  {
    "id": 21,
    "question": "Question 21 on String/Array Conversions: How does conversion behave in case 21?",
    "shortAnswer": "Converts between contiguous character arrays (char[]) and immutable String instances.",
    "explanation": "Bridging Strings and Arrays is tested in ICSE sorting and character manipulation algorithms. Case 21 reviews conversion syntax.",
    "hint": "toCharArray and new String(arr).",
    "level": "advanced",
    "options": [
      "Causes memory corruption",
      "Copies character data safely between array buffer and String object",
      "Requires casting always",
      "Only valid for numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Conversion case 21"
  },
  {
    "id": 22,
    "question": "Question 22 on String/Array Conversions: How does conversion behave in case 22?",
    "shortAnswer": "Converts between contiguous character arrays (char[]) and immutable String instances.",
    "explanation": "Bridging Strings and Arrays is tested in ICSE sorting and character manipulation algorithms. Case 22 reviews conversion syntax.",
    "hint": "toCharArray and new String(arr).",
    "level": "advanced",
    "options": [
      "Causes memory corruption",
      "Copies character data safely between array buffer and String object",
      "Requires casting always",
      "Only valid for numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Conversion case 22"
  },
  {
    "id": 23,
    "question": "Question 23 on String/Array Conversions: How does conversion behave in case 23?",
    "shortAnswer": "Converts between contiguous character arrays (char[]) and immutable String instances.",
    "explanation": "Bridging Strings and Arrays is tested in ICSE sorting and character manipulation algorithms. Case 23 reviews conversion syntax.",
    "hint": "toCharArray and new String(arr).",
    "level": "advanced",
    "options": [
      "Causes memory corruption",
      "Copies character data safely between array buffer and String object",
      "Requires casting always",
      "Only valid for numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Conversion case 23"
  },
  {
    "id": 24,
    "question": "Question 24 on String/Array Conversions: How does conversion behave in case 24?",
    "shortAnswer": "Converts between contiguous character arrays (char[]) and immutable String instances.",
    "explanation": "Bridging Strings and Arrays is tested in ICSE sorting and character manipulation algorithms. Case 24 reviews conversion syntax.",
    "hint": "toCharArray and new String(arr).",
    "level": "advanced",
    "options": [
      "Causes memory corruption",
      "Copies character data safely between array buffer and String object",
      "Requires casting always",
      "Only valid for numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Conversion case 24"
  },
  {
    "id": 25,
    "question": "Question 25 on String/Array Conversions: How does conversion behave in case 25?",
    "shortAnswer": "Converts between contiguous character arrays (char[]) and immutable String instances.",
    "explanation": "Bridging Strings and Arrays is tested in ICSE sorting and character manipulation algorithms. Case 25 reviews conversion syntax.",
    "hint": "toCharArray and new String(arr).",
    "level": "advanced",
    "options": [
      "Causes memory corruption",
      "Copies character data safely between array buffer and String object",
      "Requires casting always",
      "Only valid for numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Conversion case 25"
  }
];

export default questions;
