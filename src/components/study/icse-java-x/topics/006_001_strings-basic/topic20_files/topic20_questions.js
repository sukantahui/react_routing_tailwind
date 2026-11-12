const questions = [
  {
    "id": 1,
    "question": "In ICSE standard word counting algorithms, what is the basic space-counting rule for trimmed sentences?",
    "shortAnswer": "Count spaces: wordCount = spaceCount + 1 (provided sentence is non-empty).",
    "explanation": "Each single space between words separates two adjacent words.",
    "hint": "Spaces + 1",
    "level": "basic",
    "options": [
      "wordCount = spaceCount",
      "wordCount = spaceCount + 1",
      "wordCount = spaceCount - 1",
      "wordCount = s.length()"
    ],
    "correctAnswer": 1,
    "codeExample": "int words = spaces + 1;"
  },
  {
    "id": 2,
    "question": "Why must s = s.trim() be performed before counting spaces for word counting?",
    "shortAnswer": "To remove leading and trailing spaces that would falsely increment the word count.",
    "explanation": "Accidental leading or trailing spaces produce extra false words.",
    "hint": "Trim removes outer spaces",
    "level": "basic",
    "options": [
      "Required by JVM",
      "Prevents false word increments from edge spaces",
      "Converts string to uppercase",
      "Splits words"
    ],
    "correctAnswer": 1,
    "codeExample": "s = s.trim();"
  },
  {
    "id": 3,
    "question": "How do you handle multiple consecutive spaces between words in word counting?",
    "shortAnswer": "Check if current char is space and next char is NOT space (or previous char is not space).",
    "explanation": "Only increment word count on word boundaries.",
    "hint": "Consecutive spaces condition",
    "level": "intermediate",
    "options": [
      "Ignore all spaces",
      "Check if (s.charAt(i) == ' ' && s.charAt(i+1) != ' ')",
      "Delete sentence",
      "Count every space regardless"
    ],
    "correctAnswer": 1,
    "codeExample": "if(s.charAt(i) == ' ' && s.charAt(i+1) != ' ') count++;"
  },
  {
    "id": 4,
    "question": "How can you count words using the split() method?",
    "shortAnswer": "s.trim().split(\"\\\\s+\").length",
    "explanation": "Regular expression \\s+ splits by one or more whitespace characters.",
    "hint": "Split by regex",
    "level": "intermediate",
    "options": [
      "s.split().length",
      "s.trim().split(\"\\\\s+\").length",
      "s.words().length",
      "s.countWords()"
    ],
    "correctAnswer": 1,
    "codeExample": "String[] w = s.trim().split(\"\\\\s+\");"
  },
  {
    "id": 5,
    "question": "What should a word counting program return for an empty string \"\"?",
    "shortAnswer": "0 words.",
    "explanation": "An empty string contains zero words.",
    "hint": "Zero words for empty string",
    "level": "basic",
    "options": [
      "1",
      "0",
      "-1",
      "null"
    ],
    "correctAnswer": 1,
    "codeExample": "if(s.isEmpty()) return 0;"
  },
  {
    "id": 6,
    "question": "Question 6 on Word Processing: How is word extraction or counting handled in case 6?",
    "shortAnswer": "Extracts words character-by-character accumulating until a space delimiter is reached.",
    "explanation": "ICSE sentence processing algorithms require word extraction and counting logic. Case 6 reinforces tokenization principles.",
    "hint": "Space-delimited word accumulation.",
    "level": "basic",
    "options": [
      "Counts vowels instead",
      "Accumulates non-space characters into words separated by spaces",
      "Reverses sentence",
      "Sorts words"
    ],
    "correctAnswer": 1,
    "codeExample": "// Word processing case 6"
  },
  {
    "id": 7,
    "question": "Question 7 on Word Processing: How is word extraction or counting handled in case 7?",
    "shortAnswer": "Extracts words character-by-character accumulating until a space delimiter is reached.",
    "explanation": "ICSE sentence processing algorithms require word extraction and counting logic. Case 7 reinforces tokenization principles.",
    "hint": "Space-delimited word accumulation.",
    "level": "basic",
    "options": [
      "Counts vowels instead",
      "Accumulates non-space characters into words separated by spaces",
      "Reverses sentence",
      "Sorts words"
    ],
    "correctAnswer": 1,
    "codeExample": "// Word processing case 7"
  },
  {
    "id": 8,
    "question": "Question 8 on Word Processing: How is word extraction or counting handled in case 8?",
    "shortAnswer": "Extracts words character-by-character accumulating until a space delimiter is reached.",
    "explanation": "ICSE sentence processing algorithms require word extraction and counting logic. Case 8 reinforces tokenization principles.",
    "hint": "Space-delimited word accumulation.",
    "level": "basic",
    "options": [
      "Counts vowels instead",
      "Accumulates non-space characters into words separated by spaces",
      "Reverses sentence",
      "Sorts words"
    ],
    "correctAnswer": 1,
    "codeExample": "// Word processing case 8"
  },
  {
    "id": 9,
    "question": "Question 9 on Word Processing: How is word extraction or counting handled in case 9?",
    "shortAnswer": "Extracts words character-by-character accumulating until a space delimiter is reached.",
    "explanation": "ICSE sentence processing algorithms require word extraction and counting logic. Case 9 reinforces tokenization principles.",
    "hint": "Space-delimited word accumulation.",
    "level": "basic",
    "options": [
      "Counts vowels instead",
      "Accumulates non-space characters into words separated by spaces",
      "Reverses sentence",
      "Sorts words"
    ],
    "correctAnswer": 1,
    "codeExample": "// Word processing case 9"
  },
  {
    "id": 10,
    "question": "Question 10 on Word Processing: How is word extraction or counting handled in case 10?",
    "shortAnswer": "Extracts words character-by-character accumulating until a space delimiter is reached.",
    "explanation": "ICSE sentence processing algorithms require word extraction and counting logic. Case 10 reinforces tokenization principles.",
    "hint": "Space-delimited word accumulation.",
    "level": "basic",
    "options": [
      "Counts vowels instead",
      "Accumulates non-space characters into words separated by spaces",
      "Reverses sentence",
      "Sorts words"
    ],
    "correctAnswer": 1,
    "codeExample": "// Word processing case 10"
  },
  {
    "id": 11,
    "question": "Question 11 on Word Processing: How is word extraction or counting handled in case 11?",
    "shortAnswer": "Extracts words character-by-character accumulating until a space delimiter is reached.",
    "explanation": "ICSE sentence processing algorithms require word extraction and counting logic. Case 11 reinforces tokenization principles.",
    "hint": "Space-delimited word accumulation.",
    "level": "basic",
    "options": [
      "Counts vowels instead",
      "Accumulates non-space characters into words separated by spaces",
      "Reverses sentence",
      "Sorts words"
    ],
    "correctAnswer": 1,
    "codeExample": "// Word processing case 11"
  },
  {
    "id": 12,
    "question": "Question 12 on Word Processing: How is word extraction or counting handled in case 12?",
    "shortAnswer": "Extracts words character-by-character accumulating until a space delimiter is reached.",
    "explanation": "ICSE sentence processing algorithms require word extraction and counting logic. Case 12 reinforces tokenization principles.",
    "hint": "Space-delimited word accumulation.",
    "level": "basic",
    "options": [
      "Counts vowels instead",
      "Accumulates non-space characters into words separated by spaces",
      "Reverses sentence",
      "Sorts words"
    ],
    "correctAnswer": 1,
    "codeExample": "// Word processing case 12"
  },
  {
    "id": 13,
    "question": "Question 13 on Word Processing: How is word extraction or counting handled in case 13?",
    "shortAnswer": "Extracts words character-by-character accumulating until a space delimiter is reached.",
    "explanation": "ICSE sentence processing algorithms require word extraction and counting logic. Case 13 reinforces tokenization principles.",
    "hint": "Space-delimited word accumulation.",
    "level": "basic",
    "options": [
      "Counts vowels instead",
      "Accumulates non-space characters into words separated by spaces",
      "Reverses sentence",
      "Sorts words"
    ],
    "correctAnswer": 1,
    "codeExample": "// Word processing case 13"
  },
  {
    "id": 14,
    "question": "Question 14 on Word Processing: How is word extraction or counting handled in case 14?",
    "shortAnswer": "Extracts words character-by-character accumulating until a space delimiter is reached.",
    "explanation": "ICSE sentence processing algorithms require word extraction and counting logic. Case 14 reinforces tokenization principles.",
    "hint": "Space-delimited word accumulation.",
    "level": "basic",
    "options": [
      "Counts vowels instead",
      "Accumulates non-space characters into words separated by spaces",
      "Reverses sentence",
      "Sorts words"
    ],
    "correctAnswer": 1,
    "codeExample": "// Word processing case 14"
  },
  {
    "id": 15,
    "question": "Question 15 on Word Processing: How is word extraction or counting handled in case 15?",
    "shortAnswer": "Extracts words character-by-character accumulating until a space delimiter is reached.",
    "explanation": "ICSE sentence processing algorithms require word extraction and counting logic. Case 15 reinforces tokenization principles.",
    "hint": "Space-delimited word accumulation.",
    "level": "basic",
    "options": [
      "Counts vowels instead",
      "Accumulates non-space characters into words separated by spaces",
      "Reverses sentence",
      "Sorts words"
    ],
    "correctAnswer": 1,
    "codeExample": "// Word processing case 15"
  },
  {
    "id": 16,
    "question": "Question 16 on Word Processing: How is word extraction or counting handled in case 16?",
    "shortAnswer": "Extracts words character-by-character accumulating until a space delimiter is reached.",
    "explanation": "ICSE sentence processing algorithms require word extraction and counting logic. Case 16 reinforces tokenization principles.",
    "hint": "Space-delimited word accumulation.",
    "level": "basic",
    "options": [
      "Counts vowels instead",
      "Accumulates non-space characters into words separated by spaces",
      "Reverses sentence",
      "Sorts words"
    ],
    "correctAnswer": 1,
    "codeExample": "// Word processing case 16"
  },
  {
    "id": 17,
    "question": "Question 17 on Word Processing: How is word extraction or counting handled in case 17?",
    "shortAnswer": "Extracts words character-by-character accumulating until a space delimiter is reached.",
    "explanation": "ICSE sentence processing algorithms require word extraction and counting logic. Case 17 reinforces tokenization principles.",
    "hint": "Space-delimited word accumulation.",
    "level": "basic",
    "options": [
      "Counts vowels instead",
      "Accumulates non-space characters into words separated by spaces",
      "Reverses sentence",
      "Sorts words"
    ],
    "correctAnswer": 1,
    "codeExample": "// Word processing case 17"
  },
  {
    "id": 18,
    "question": "Question 18 on Word Processing: How is word extraction or counting handled in case 18?",
    "shortAnswer": "Extracts words character-by-character accumulating until a space delimiter is reached.",
    "explanation": "ICSE sentence processing algorithms require word extraction and counting logic. Case 18 reinforces tokenization principles.",
    "hint": "Space-delimited word accumulation.",
    "level": "basic",
    "options": [
      "Counts vowels instead",
      "Accumulates non-space characters into words separated by spaces",
      "Reverses sentence",
      "Sorts words"
    ],
    "correctAnswer": 1,
    "codeExample": "// Word processing case 18"
  },
  {
    "id": 19,
    "question": "Question 19 on Word Processing: How is word extraction or counting handled in case 19?",
    "shortAnswer": "Extracts words character-by-character accumulating until a space delimiter is reached.",
    "explanation": "ICSE sentence processing algorithms require word extraction and counting logic. Case 19 reinforces tokenization principles.",
    "hint": "Space-delimited word accumulation.",
    "level": "advanced",
    "options": [
      "Counts vowels instead",
      "Accumulates non-space characters into words separated by spaces",
      "Reverses sentence",
      "Sorts words"
    ],
    "correctAnswer": 1,
    "codeExample": "// Word processing case 19"
  },
  {
    "id": 20,
    "question": "Question 20 on Word Processing: How is word extraction or counting handled in case 20?",
    "shortAnswer": "Extracts words character-by-character accumulating until a space delimiter is reached.",
    "explanation": "ICSE sentence processing algorithms require word extraction and counting logic. Case 20 reinforces tokenization principles.",
    "hint": "Space-delimited word accumulation.",
    "level": "advanced",
    "options": [
      "Counts vowels instead",
      "Accumulates non-space characters into words separated by spaces",
      "Reverses sentence",
      "Sorts words"
    ],
    "correctAnswer": 1,
    "codeExample": "// Word processing case 20"
  },
  {
    "id": 21,
    "question": "Question 21 on Word Processing: How is word extraction or counting handled in case 21?",
    "shortAnswer": "Extracts words character-by-character accumulating until a space delimiter is reached.",
    "explanation": "ICSE sentence processing algorithms require word extraction and counting logic. Case 21 reinforces tokenization principles.",
    "hint": "Space-delimited word accumulation.",
    "level": "advanced",
    "options": [
      "Counts vowels instead",
      "Accumulates non-space characters into words separated by spaces",
      "Reverses sentence",
      "Sorts words"
    ],
    "correctAnswer": 1,
    "codeExample": "// Word processing case 21"
  },
  {
    "id": 22,
    "question": "Question 22 on Word Processing: How is word extraction or counting handled in case 22?",
    "shortAnswer": "Extracts words character-by-character accumulating until a space delimiter is reached.",
    "explanation": "ICSE sentence processing algorithms require word extraction and counting logic. Case 22 reinforces tokenization principles.",
    "hint": "Space-delimited word accumulation.",
    "level": "advanced",
    "options": [
      "Counts vowels instead",
      "Accumulates non-space characters into words separated by spaces",
      "Reverses sentence",
      "Sorts words"
    ],
    "correctAnswer": 1,
    "codeExample": "// Word processing case 22"
  },
  {
    "id": 23,
    "question": "Question 23 on Word Processing: How is word extraction or counting handled in case 23?",
    "shortAnswer": "Extracts words character-by-character accumulating until a space delimiter is reached.",
    "explanation": "ICSE sentence processing algorithms require word extraction and counting logic. Case 23 reinforces tokenization principles.",
    "hint": "Space-delimited word accumulation.",
    "level": "advanced",
    "options": [
      "Counts vowels instead",
      "Accumulates non-space characters into words separated by spaces",
      "Reverses sentence",
      "Sorts words"
    ],
    "correctAnswer": 1,
    "codeExample": "// Word processing case 23"
  },
  {
    "id": 24,
    "question": "Question 24 on Word Processing: How is word extraction or counting handled in case 24?",
    "shortAnswer": "Extracts words character-by-character accumulating until a space delimiter is reached.",
    "explanation": "ICSE sentence processing algorithms require word extraction and counting logic. Case 24 reinforces tokenization principles.",
    "hint": "Space-delimited word accumulation.",
    "level": "advanced",
    "options": [
      "Counts vowels instead",
      "Accumulates non-space characters into words separated by spaces",
      "Reverses sentence",
      "Sorts words"
    ],
    "correctAnswer": 1,
    "codeExample": "// Word processing case 24"
  },
  {
    "id": 25,
    "question": "Question 25 on Word Processing: How is word extraction or counting handled in case 25?",
    "shortAnswer": "Extracts words character-by-character accumulating until a space delimiter is reached.",
    "explanation": "ICSE sentence processing algorithms require word extraction and counting logic. Case 25 reinforces tokenization principles.",
    "hint": "Space-delimited word accumulation.",
    "level": "advanced",
    "options": [
      "Counts vowels instead",
      "Accumulates non-space characters into words separated by spaces",
      "Reverses sentence",
      "Sorts words"
    ],
    "correctAnswer": 1,
    "codeExample": "// Word processing case 25"
  }
];

export default questions;
