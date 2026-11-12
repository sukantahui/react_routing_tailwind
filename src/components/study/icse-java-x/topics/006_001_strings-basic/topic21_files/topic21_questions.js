const questions = [
  {
    "id": 1,
    "question": "What array size is typically allocated to store frequency of all uppercase English letters 'A'-'Z'?",
    "shortAnswer": "26 elements (int[] freq = new int[26];)",
    "explanation": "There are 26 letters in the English alphabet, mapped by ch - 'A'.",
    "hint": "26 alphabet letters",
    "level": "basic",
    "options": [
      "10",
      "26",
      "256",
      "100"
    ],
    "correctAnswer": 1,
    "codeExample": "int[] freq = new int[26];"
  },
  {
    "id": 2,
    "question": "How do you map an uppercase letter 'ch' to an index from 0 to 25?",
    "shortAnswer": "int index = ch - 'A';",
    "explanation": "'A' - 'A' = 0, 'B' - 'A' = 1, ... 'Z' - 'A' = 25.",
    "hint": "ch minus 'A'",
    "level": "basic",
    "options": [
      "ch - '0'",
      "ch - 'A'",
      "ch - 32",
      "ch + 'A'"
    ],
    "correctAnswer": 1,
    "codeExample": "int idx = ch - 'A';"
  },
  {
    "id": 3,
    "question": "What array size is allocated to track frequencies of all standard ASCII characters?",
    "shortAnswer": "256 elements (int[] freq = new int[256];)",
    "explanation": "Standard extended ASCII table has 256 code points (0 to 255).",
    "hint": "256 ASCII code points",
    "level": "basic",
    "options": [
      "26",
      "128",
      "256",
      "65536"
    ],
    "correctAnswer": 2,
    "codeExample": "int[] freq = new int[256];"
  },
  {
    "id": 4,
    "question": "How is the frequency count updated when inspecting character 'ch' in ASCII array?",
    "shortAnswer": "freq[ch]++;",
    "explanation": "The char 'ch' is implicitly cast to its int ASCII value as array index.",
    "hint": "Implicit int indexing",
    "level": "basic",
    "options": [
      "freq[ch] = 1;",
      "freq[ch]++;",
      "freq.add(ch);",
      "count++"
    ],
    "correctAnswer": 1,
    "codeExample": "freq[s.charAt(i)]++;"
  },
  {
    "id": 5,
    "question": "What is the frequency of 'S' in \"SUCCESS\"?",
    "shortAnswer": "3",
    "explanation": "Characters are S(1), U, C, C, E, S(2), S(3). Total 3.",
    "hint": "Count 'S' occurrences",
    "level": "basic",
    "options": [
      "1",
      "2",
      "3",
      "4"
    ],
    "correctAnswer": 2,
    "codeExample": "'S' appears 3 times in \"SUCCESS\""
  },
  {
    "id": 6,
    "question": "Question 6 on Character Frequency: How does frequency counting evaluate occurrence 6?",
    "shortAnswer": "Scans string, maps each character to its frequency bucket, and outputs non-zero counts.",
    "explanation": "Frequency distribution analysis is an ICSE Class X Section B staple. Occurrence 6 tests frequency mapping logic.",
    "hint": "Array-based histogram mapping.",
    "level": "basic",
    "options": [
      "Deletes duplicate letters",
      "Maintains count per unique character via direct index mapping",
      "Sorts characters alphabetically",
      "Reverses text"
    ],
    "correctAnswer": 1,
    "codeExample": "// Frequency evaluation 6"
  },
  {
    "id": 7,
    "question": "Question 7 on Character Frequency: How does frequency counting evaluate occurrence 7?",
    "shortAnswer": "Scans string, maps each character to its frequency bucket, and outputs non-zero counts.",
    "explanation": "Frequency distribution analysis is an ICSE Class X Section B staple. Occurrence 7 tests frequency mapping logic.",
    "hint": "Array-based histogram mapping.",
    "level": "basic",
    "options": [
      "Deletes duplicate letters",
      "Maintains count per unique character via direct index mapping",
      "Sorts characters alphabetically",
      "Reverses text"
    ],
    "correctAnswer": 1,
    "codeExample": "// Frequency evaluation 7"
  },
  {
    "id": 8,
    "question": "Question 8 on Character Frequency: How does frequency counting evaluate occurrence 8?",
    "shortAnswer": "Scans string, maps each character to its frequency bucket, and outputs non-zero counts.",
    "explanation": "Frequency distribution analysis is an ICSE Class X Section B staple. Occurrence 8 tests frequency mapping logic.",
    "hint": "Array-based histogram mapping.",
    "level": "basic",
    "options": [
      "Deletes duplicate letters",
      "Maintains count per unique character via direct index mapping",
      "Sorts characters alphabetically",
      "Reverses text"
    ],
    "correctAnswer": 1,
    "codeExample": "// Frequency evaluation 8"
  },
  {
    "id": 9,
    "question": "Question 9 on Character Frequency: How does frequency counting evaluate occurrence 9?",
    "shortAnswer": "Scans string, maps each character to its frequency bucket, and outputs non-zero counts.",
    "explanation": "Frequency distribution analysis is an ICSE Class X Section B staple. Occurrence 9 tests frequency mapping logic.",
    "hint": "Array-based histogram mapping.",
    "level": "basic",
    "options": [
      "Deletes duplicate letters",
      "Maintains count per unique character via direct index mapping",
      "Sorts characters alphabetically",
      "Reverses text"
    ],
    "correctAnswer": 1,
    "codeExample": "// Frequency evaluation 9"
  },
  {
    "id": 10,
    "question": "Question 10 on Character Frequency: How does frequency counting evaluate occurrence 10?",
    "shortAnswer": "Scans string, maps each character to its frequency bucket, and outputs non-zero counts.",
    "explanation": "Frequency distribution analysis is an ICSE Class X Section B staple. Occurrence 10 tests frequency mapping logic.",
    "hint": "Array-based histogram mapping.",
    "level": "basic",
    "options": [
      "Deletes duplicate letters",
      "Maintains count per unique character via direct index mapping",
      "Sorts characters alphabetically",
      "Reverses text"
    ],
    "correctAnswer": 1,
    "codeExample": "// Frequency evaluation 10"
  },
  {
    "id": 11,
    "question": "Question 11 on Character Frequency: How does frequency counting evaluate occurrence 11?",
    "shortAnswer": "Scans string, maps each character to its frequency bucket, and outputs non-zero counts.",
    "explanation": "Frequency distribution analysis is an ICSE Class X Section B staple. Occurrence 11 tests frequency mapping logic.",
    "hint": "Array-based histogram mapping.",
    "level": "basic",
    "options": [
      "Deletes duplicate letters",
      "Maintains count per unique character via direct index mapping",
      "Sorts characters alphabetically",
      "Reverses text"
    ],
    "correctAnswer": 1,
    "codeExample": "// Frequency evaluation 11"
  },
  {
    "id": 12,
    "question": "Question 12 on Character Frequency: How does frequency counting evaluate occurrence 12?",
    "shortAnswer": "Scans string, maps each character to its frequency bucket, and outputs non-zero counts.",
    "explanation": "Frequency distribution analysis is an ICSE Class X Section B staple. Occurrence 12 tests frequency mapping logic.",
    "hint": "Array-based histogram mapping.",
    "level": "basic",
    "options": [
      "Deletes duplicate letters",
      "Maintains count per unique character via direct index mapping",
      "Sorts characters alphabetically",
      "Reverses text"
    ],
    "correctAnswer": 1,
    "codeExample": "// Frequency evaluation 12"
  },
  {
    "id": 13,
    "question": "Question 13 on Character Frequency: How does frequency counting evaluate occurrence 13?",
    "shortAnswer": "Scans string, maps each character to its frequency bucket, and outputs non-zero counts.",
    "explanation": "Frequency distribution analysis is an ICSE Class X Section B staple. Occurrence 13 tests frequency mapping logic.",
    "hint": "Array-based histogram mapping.",
    "level": "basic",
    "options": [
      "Deletes duplicate letters",
      "Maintains count per unique character via direct index mapping",
      "Sorts characters alphabetically",
      "Reverses text"
    ],
    "correctAnswer": 1,
    "codeExample": "// Frequency evaluation 13"
  },
  {
    "id": 14,
    "question": "Question 14 on Character Frequency: How does frequency counting evaluate occurrence 14?",
    "shortAnswer": "Scans string, maps each character to its frequency bucket, and outputs non-zero counts.",
    "explanation": "Frequency distribution analysis is an ICSE Class X Section B staple. Occurrence 14 tests frequency mapping logic.",
    "hint": "Array-based histogram mapping.",
    "level": "basic",
    "options": [
      "Deletes duplicate letters",
      "Maintains count per unique character via direct index mapping",
      "Sorts characters alphabetically",
      "Reverses text"
    ],
    "correctAnswer": 1,
    "codeExample": "// Frequency evaluation 14"
  },
  {
    "id": 15,
    "question": "Question 15 on Character Frequency: How does frequency counting evaluate occurrence 15?",
    "shortAnswer": "Scans string, maps each character to its frequency bucket, and outputs non-zero counts.",
    "explanation": "Frequency distribution analysis is an ICSE Class X Section B staple. Occurrence 15 tests frequency mapping logic.",
    "hint": "Array-based histogram mapping.",
    "level": "basic",
    "options": [
      "Deletes duplicate letters",
      "Maintains count per unique character via direct index mapping",
      "Sorts characters alphabetically",
      "Reverses text"
    ],
    "correctAnswer": 1,
    "codeExample": "// Frequency evaluation 15"
  },
  {
    "id": 16,
    "question": "Question 16 on Character Frequency: How does frequency counting evaluate occurrence 16?",
    "shortAnswer": "Scans string, maps each character to its frequency bucket, and outputs non-zero counts.",
    "explanation": "Frequency distribution analysis is an ICSE Class X Section B staple. Occurrence 16 tests frequency mapping logic.",
    "hint": "Array-based histogram mapping.",
    "level": "basic",
    "options": [
      "Deletes duplicate letters",
      "Maintains count per unique character via direct index mapping",
      "Sorts characters alphabetically",
      "Reverses text"
    ],
    "correctAnswer": 1,
    "codeExample": "// Frequency evaluation 16"
  },
  {
    "id": 17,
    "question": "Question 17 on Character Frequency: How does frequency counting evaluate occurrence 17?",
    "shortAnswer": "Scans string, maps each character to its frequency bucket, and outputs non-zero counts.",
    "explanation": "Frequency distribution analysis is an ICSE Class X Section B staple. Occurrence 17 tests frequency mapping logic.",
    "hint": "Array-based histogram mapping.",
    "level": "basic",
    "options": [
      "Deletes duplicate letters",
      "Maintains count per unique character via direct index mapping",
      "Sorts characters alphabetically",
      "Reverses text"
    ],
    "correctAnswer": 1,
    "codeExample": "// Frequency evaluation 17"
  },
  {
    "id": 18,
    "question": "Question 18 on Character Frequency: How does frequency counting evaluate occurrence 18?",
    "shortAnswer": "Scans string, maps each character to its frequency bucket, and outputs non-zero counts.",
    "explanation": "Frequency distribution analysis is an ICSE Class X Section B staple. Occurrence 18 tests frequency mapping logic.",
    "hint": "Array-based histogram mapping.",
    "level": "basic",
    "options": [
      "Deletes duplicate letters",
      "Maintains count per unique character via direct index mapping",
      "Sorts characters alphabetically",
      "Reverses text"
    ],
    "correctAnswer": 1,
    "codeExample": "// Frequency evaluation 18"
  },
  {
    "id": 19,
    "question": "Question 19 on Character Frequency: How does frequency counting evaluate occurrence 19?",
    "shortAnswer": "Scans string, maps each character to its frequency bucket, and outputs non-zero counts.",
    "explanation": "Frequency distribution analysis is an ICSE Class X Section B staple. Occurrence 19 tests frequency mapping logic.",
    "hint": "Array-based histogram mapping.",
    "level": "advanced",
    "options": [
      "Deletes duplicate letters",
      "Maintains count per unique character via direct index mapping",
      "Sorts characters alphabetically",
      "Reverses text"
    ],
    "correctAnswer": 1,
    "codeExample": "// Frequency evaluation 19"
  },
  {
    "id": 20,
    "question": "Question 20 on Character Frequency: How does frequency counting evaluate occurrence 20?",
    "shortAnswer": "Scans string, maps each character to its frequency bucket, and outputs non-zero counts.",
    "explanation": "Frequency distribution analysis is an ICSE Class X Section B staple. Occurrence 20 tests frequency mapping logic.",
    "hint": "Array-based histogram mapping.",
    "level": "advanced",
    "options": [
      "Deletes duplicate letters",
      "Maintains count per unique character via direct index mapping",
      "Sorts characters alphabetically",
      "Reverses text"
    ],
    "correctAnswer": 1,
    "codeExample": "// Frequency evaluation 20"
  },
  {
    "id": 21,
    "question": "Question 21 on Character Frequency: How does frequency counting evaluate occurrence 21?",
    "shortAnswer": "Scans string, maps each character to its frequency bucket, and outputs non-zero counts.",
    "explanation": "Frequency distribution analysis is an ICSE Class X Section B staple. Occurrence 21 tests frequency mapping logic.",
    "hint": "Array-based histogram mapping.",
    "level": "advanced",
    "options": [
      "Deletes duplicate letters",
      "Maintains count per unique character via direct index mapping",
      "Sorts characters alphabetically",
      "Reverses text"
    ],
    "correctAnswer": 1,
    "codeExample": "// Frequency evaluation 21"
  },
  {
    "id": 22,
    "question": "Question 22 on Character Frequency: How does frequency counting evaluate occurrence 22?",
    "shortAnswer": "Scans string, maps each character to its frequency bucket, and outputs non-zero counts.",
    "explanation": "Frequency distribution analysis is an ICSE Class X Section B staple. Occurrence 22 tests frequency mapping logic.",
    "hint": "Array-based histogram mapping.",
    "level": "advanced",
    "options": [
      "Deletes duplicate letters",
      "Maintains count per unique character via direct index mapping",
      "Sorts characters alphabetically",
      "Reverses text"
    ],
    "correctAnswer": 1,
    "codeExample": "// Frequency evaluation 22"
  },
  {
    "id": 23,
    "question": "Question 23 on Character Frequency: How does frequency counting evaluate occurrence 23?",
    "shortAnswer": "Scans string, maps each character to its frequency bucket, and outputs non-zero counts.",
    "explanation": "Frequency distribution analysis is an ICSE Class X Section B staple. Occurrence 23 tests frequency mapping logic.",
    "hint": "Array-based histogram mapping.",
    "level": "advanced",
    "options": [
      "Deletes duplicate letters",
      "Maintains count per unique character via direct index mapping",
      "Sorts characters alphabetically",
      "Reverses text"
    ],
    "correctAnswer": 1,
    "codeExample": "// Frequency evaluation 23"
  },
  {
    "id": 24,
    "question": "Question 24 on Character Frequency: How does frequency counting evaluate occurrence 24?",
    "shortAnswer": "Scans string, maps each character to its frequency bucket, and outputs non-zero counts.",
    "explanation": "Frequency distribution analysis is an ICSE Class X Section B staple. Occurrence 24 tests frequency mapping logic.",
    "hint": "Array-based histogram mapping.",
    "level": "advanced",
    "options": [
      "Deletes duplicate letters",
      "Maintains count per unique character via direct index mapping",
      "Sorts characters alphabetically",
      "Reverses text"
    ],
    "correctAnswer": 1,
    "codeExample": "// Frequency evaluation 24"
  },
  {
    "id": 25,
    "question": "Question 25 on Character Frequency: How does frequency counting evaluate occurrence 25?",
    "shortAnswer": "Scans string, maps each character to its frequency bucket, and outputs non-zero counts.",
    "explanation": "Frequency distribution analysis is an ICSE Class X Section B staple. Occurrence 25 tests frequency mapping logic.",
    "hint": "Array-based histogram mapping.",
    "level": "advanced",
    "options": [
      "Deletes duplicate letters",
      "Maintains count per unique character via direct index mapping",
      "Sorts characters alphabetically",
      "Reverses text"
    ],
    "correctAnswer": 1,
    "codeExample": "// Frequency evaluation 25"
  }
];

export default questions;
