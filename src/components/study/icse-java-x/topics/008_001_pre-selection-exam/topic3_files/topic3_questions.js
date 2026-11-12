const questions = [
  {
    "id": 1,
    "question": "What is a 'Special Number' in ICSE programming?",
    "shortAnswer": "A number whose sum of factorials of digits equals the number itself (e.g. 145 = 1! + 4! + 5! = 1 + 24 + 120 = 145).",
    "explanation": "Also known as a Krishnamurthy number.",
    "hint": "Sum of digit factorials",
    "level": "basic",
    "options": [
      "A prime number",
      "Sum of digit factorials equals number (e.g. 145)",
      "Palindrome number",
      "Number ending in 7"
    ],
    "correctAnswer": 1,
    "codeExample": "145 = 1! + 4! + 5!"
  },
  {
    "id": 2,
    "question": "What is an 'Automorphic Number' in ICSE programming?",
    "shortAnswer": "A number whose square ends in the same digits as the number itself (e.g. 25^2 = 625, 76^2 = 5776).",
    "explanation": "Square ends with the number.",
    "hint": "Square suffix match",
    "level": "basic",
    "options": [
      "Square equals number",
      "Square ends with the original number (e.g. 25 -> 625)",
      "Number with 0 digits",
      "Even number"
    ],
    "correctAnswer": 1,
    "codeExample": "25^2 = 625 (ends in 25)"
  },
  {
    "id": 3,
    "question": "What is a 'Spy Number' in ICSE programming?",
    "shortAnswer": "A number where sum of digits equals product of digits (e.g. 1124: 1+1+2+4 = 8, 1*1*2*4 = 8).",
    "explanation": "Sum of digits == Product of digits.",
    "hint": "Sum equals product",
    "level": "basic",
    "options": [
      "Sum equals square",
      "Sum of digits equals product of digits",
      "Divisible by 7",
      "Palindrome number"
    ],
    "correctAnswer": 1,
    "codeExample": "1124: sum=8, prod=8"
  },
  {
    "id": 4,
    "question": "What is a 'Neon Number' in ICSE programming?",
    "shortAnswer": "A number where sum of digits of its square equals the number itself (e.g. 9: 9^2 = 81, 8+1 = 9).",
    "explanation": "Square sum equals original number.",
    "hint": "Square digits sum",
    "level": "basic",
    "options": [
      "Prime number",
      "Sum of digits of square equals number (e.g. 9 -> 81 -> 8+1=9)",
      "Armstrong number",
      "Perfect square"
    ],
    "correctAnswer": 1,
    "codeExample": "9^2 = 81; 8 + 1 = 9"
  },
  {
    "id": 5,
    "question": "What is an 'Armstrong Number' in ICSE programming?",
    "shortAnswer": "A 3-digit number where sum of cubes of digits equals the number (e.g. 153 = 1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153).",
    "explanation": "Sum of cubes of digits equals number.",
    "hint": "Sum of cubes",
    "level": "basic",
    "options": [
      "Sum of digits is 10",
      "Sum of cubes of digits equals number (e.g. 153)",
      "Even prime number",
      "Fibonacci number"
    ],
    "correctAnswer": 1,
    "codeExample": "153 = 1^3 + 5^3 + 3^3 = 153"
  },
  {
    "id": 6,
    "question": "Question 6 on Board Programs Walkthrough: How is board algorithm 6 implemented efficiently?",
    "shortAnswer": "Extracts digits with % 10 and / 10, uses loop accumulators, and outputs formatted results with Scanner.",
    "explanation": "Classic ICSE board questions test arithmetic extraction, String arrays, and search/sort patterns. Walkthrough 6 reviews optimal code structure.",
    "hint": "Classic ICSE board pattern.",
    "level": "basic",
    "options": [
      "Requires external libraries",
      "Standard arithmetic loop with digit extraction (% 10, / 10) and VDT",
      "Only works in Linux",
      "Uses recursive lambda"
    ],
    "correctAnswer": 1,
    "codeExample": "// Board question walkthrough 6"
  },
  {
    "id": 7,
    "question": "Question 7 on Board Programs Walkthrough: How is board algorithm 7 implemented efficiently?",
    "shortAnswer": "Extracts digits with % 10 and / 10, uses loop accumulators, and outputs formatted results with Scanner.",
    "explanation": "Classic ICSE board questions test arithmetic extraction, String arrays, and search/sort patterns. Walkthrough 7 reviews optimal code structure.",
    "hint": "Classic ICSE board pattern.",
    "level": "basic",
    "options": [
      "Requires external libraries",
      "Standard arithmetic loop with digit extraction (% 10, / 10) and VDT",
      "Only works in Linux",
      "Uses recursive lambda"
    ],
    "correctAnswer": 1,
    "codeExample": "// Board question walkthrough 7"
  },
  {
    "id": 8,
    "question": "Question 8 on Board Programs Walkthrough: How is board algorithm 8 implemented efficiently?",
    "shortAnswer": "Extracts digits with % 10 and / 10, uses loop accumulators, and outputs formatted results with Scanner.",
    "explanation": "Classic ICSE board questions test arithmetic extraction, String arrays, and search/sort patterns. Walkthrough 8 reviews optimal code structure.",
    "hint": "Classic ICSE board pattern.",
    "level": "basic",
    "options": [
      "Requires external libraries",
      "Standard arithmetic loop with digit extraction (% 10, / 10) and VDT",
      "Only works in Linux",
      "Uses recursive lambda"
    ],
    "correctAnswer": 1,
    "codeExample": "// Board question walkthrough 8"
  },
  {
    "id": 9,
    "question": "Question 9 on Board Programs Walkthrough: How is board algorithm 9 implemented efficiently?",
    "shortAnswer": "Extracts digits with % 10 and / 10, uses loop accumulators, and outputs formatted results with Scanner.",
    "explanation": "Classic ICSE board questions test arithmetic extraction, String arrays, and search/sort patterns. Walkthrough 9 reviews optimal code structure.",
    "hint": "Classic ICSE board pattern.",
    "level": "basic",
    "options": [
      "Requires external libraries",
      "Standard arithmetic loop with digit extraction (% 10, / 10) and VDT",
      "Only works in Linux",
      "Uses recursive lambda"
    ],
    "correctAnswer": 1,
    "codeExample": "// Board question walkthrough 9"
  },
  {
    "id": 10,
    "question": "Question 10 on Board Programs Walkthrough: How is board algorithm 10 implemented efficiently?",
    "shortAnswer": "Extracts digits with % 10 and / 10, uses loop accumulators, and outputs formatted results with Scanner.",
    "explanation": "Classic ICSE board questions test arithmetic extraction, String arrays, and search/sort patterns. Walkthrough 10 reviews optimal code structure.",
    "hint": "Classic ICSE board pattern.",
    "level": "basic",
    "options": [
      "Requires external libraries",
      "Standard arithmetic loop with digit extraction (% 10, / 10) and VDT",
      "Only works in Linux",
      "Uses recursive lambda"
    ],
    "correctAnswer": 1,
    "codeExample": "// Board question walkthrough 10"
  },
  {
    "id": 11,
    "question": "Question 11 on Board Programs Walkthrough: How is board algorithm 11 implemented efficiently?",
    "shortAnswer": "Extracts digits with % 10 and / 10, uses loop accumulators, and outputs formatted results with Scanner.",
    "explanation": "Classic ICSE board questions test arithmetic extraction, String arrays, and search/sort patterns. Walkthrough 11 reviews optimal code structure.",
    "hint": "Classic ICSE board pattern.",
    "level": "basic",
    "options": [
      "Requires external libraries",
      "Standard arithmetic loop with digit extraction (% 10, / 10) and VDT",
      "Only works in Linux",
      "Uses recursive lambda"
    ],
    "correctAnswer": 1,
    "codeExample": "// Board question walkthrough 11"
  },
  {
    "id": 12,
    "question": "Question 12 on Board Programs Walkthrough: How is board algorithm 12 implemented efficiently?",
    "shortAnswer": "Extracts digits with % 10 and / 10, uses loop accumulators, and outputs formatted results with Scanner.",
    "explanation": "Classic ICSE board questions test arithmetic extraction, String arrays, and search/sort patterns. Walkthrough 12 reviews optimal code structure.",
    "hint": "Classic ICSE board pattern.",
    "level": "basic",
    "options": [
      "Requires external libraries",
      "Standard arithmetic loop with digit extraction (% 10, / 10) and VDT",
      "Only works in Linux",
      "Uses recursive lambda"
    ],
    "correctAnswer": 1,
    "codeExample": "// Board question walkthrough 12"
  },
  {
    "id": 13,
    "question": "Question 13 on Board Programs Walkthrough: How is board algorithm 13 implemented efficiently?",
    "shortAnswer": "Extracts digits with % 10 and / 10, uses loop accumulators, and outputs formatted results with Scanner.",
    "explanation": "Classic ICSE board questions test arithmetic extraction, String arrays, and search/sort patterns. Walkthrough 13 reviews optimal code structure.",
    "hint": "Classic ICSE board pattern.",
    "level": "basic",
    "options": [
      "Requires external libraries",
      "Standard arithmetic loop with digit extraction (% 10, / 10) and VDT",
      "Only works in Linux",
      "Uses recursive lambda"
    ],
    "correctAnswer": 1,
    "codeExample": "// Board question walkthrough 13"
  },
  {
    "id": 14,
    "question": "Question 14 on Board Programs Walkthrough: How is board algorithm 14 implemented efficiently?",
    "shortAnswer": "Extracts digits with % 10 and / 10, uses loop accumulators, and outputs formatted results with Scanner.",
    "explanation": "Classic ICSE board questions test arithmetic extraction, String arrays, and search/sort patterns. Walkthrough 14 reviews optimal code structure.",
    "hint": "Classic ICSE board pattern.",
    "level": "basic",
    "options": [
      "Requires external libraries",
      "Standard arithmetic loop with digit extraction (% 10, / 10) and VDT",
      "Only works in Linux",
      "Uses recursive lambda"
    ],
    "correctAnswer": 1,
    "codeExample": "// Board question walkthrough 14"
  },
  {
    "id": 15,
    "question": "Question 15 on Board Programs Walkthrough: How is board algorithm 15 implemented efficiently?",
    "shortAnswer": "Extracts digits with % 10 and / 10, uses loop accumulators, and outputs formatted results with Scanner.",
    "explanation": "Classic ICSE board questions test arithmetic extraction, String arrays, and search/sort patterns. Walkthrough 15 reviews optimal code structure.",
    "hint": "Classic ICSE board pattern.",
    "level": "basic",
    "options": [
      "Requires external libraries",
      "Standard arithmetic loop with digit extraction (% 10, / 10) and VDT",
      "Only works in Linux",
      "Uses recursive lambda"
    ],
    "correctAnswer": 1,
    "codeExample": "// Board question walkthrough 15"
  },
  {
    "id": 16,
    "question": "Question 16 on Board Programs Walkthrough: How is board algorithm 16 implemented efficiently?",
    "shortAnswer": "Extracts digits with % 10 and / 10, uses loop accumulators, and outputs formatted results with Scanner.",
    "explanation": "Classic ICSE board questions test arithmetic extraction, String arrays, and search/sort patterns. Walkthrough 16 reviews optimal code structure.",
    "hint": "Classic ICSE board pattern.",
    "level": "basic",
    "options": [
      "Requires external libraries",
      "Standard arithmetic loop with digit extraction (% 10, / 10) and VDT",
      "Only works in Linux",
      "Uses recursive lambda"
    ],
    "correctAnswer": 1,
    "codeExample": "// Board question walkthrough 16"
  },
  {
    "id": 17,
    "question": "Question 17 on Board Programs Walkthrough: How is board algorithm 17 implemented efficiently?",
    "shortAnswer": "Extracts digits with % 10 and / 10, uses loop accumulators, and outputs formatted results with Scanner.",
    "explanation": "Classic ICSE board questions test arithmetic extraction, String arrays, and search/sort patterns. Walkthrough 17 reviews optimal code structure.",
    "hint": "Classic ICSE board pattern.",
    "level": "basic",
    "options": [
      "Requires external libraries",
      "Standard arithmetic loop with digit extraction (% 10, / 10) and VDT",
      "Only works in Linux",
      "Uses recursive lambda"
    ],
    "correctAnswer": 1,
    "codeExample": "// Board question walkthrough 17"
  },
  {
    "id": 18,
    "question": "Question 18 on Board Programs Walkthrough: How is board algorithm 18 implemented efficiently?",
    "shortAnswer": "Extracts digits with % 10 and / 10, uses loop accumulators, and outputs formatted results with Scanner.",
    "explanation": "Classic ICSE board questions test arithmetic extraction, String arrays, and search/sort patterns. Walkthrough 18 reviews optimal code structure.",
    "hint": "Classic ICSE board pattern.",
    "level": "basic",
    "options": [
      "Requires external libraries",
      "Standard arithmetic loop with digit extraction (% 10, / 10) and VDT",
      "Only works in Linux",
      "Uses recursive lambda"
    ],
    "correctAnswer": 1,
    "codeExample": "// Board question walkthrough 18"
  },
  {
    "id": 19,
    "question": "Question 19 on Board Programs Walkthrough: How is board algorithm 19 implemented efficiently?",
    "shortAnswer": "Extracts digits with % 10 and / 10, uses loop accumulators, and outputs formatted results with Scanner.",
    "explanation": "Classic ICSE board questions test arithmetic extraction, String arrays, and search/sort patterns. Walkthrough 19 reviews optimal code structure.",
    "hint": "Classic ICSE board pattern.",
    "level": "advanced",
    "options": [
      "Requires external libraries",
      "Standard arithmetic loop with digit extraction (% 10, / 10) and VDT",
      "Only works in Linux",
      "Uses recursive lambda"
    ],
    "correctAnswer": 1,
    "codeExample": "// Board question walkthrough 19"
  },
  {
    "id": 20,
    "question": "Question 20 on Board Programs Walkthrough: How is board algorithm 20 implemented efficiently?",
    "shortAnswer": "Extracts digits with % 10 and / 10, uses loop accumulators, and outputs formatted results with Scanner.",
    "explanation": "Classic ICSE board questions test arithmetic extraction, String arrays, and search/sort patterns. Walkthrough 20 reviews optimal code structure.",
    "hint": "Classic ICSE board pattern.",
    "level": "advanced",
    "options": [
      "Requires external libraries",
      "Standard arithmetic loop with digit extraction (% 10, / 10) and VDT",
      "Only works in Linux",
      "Uses recursive lambda"
    ],
    "correctAnswer": 1,
    "codeExample": "// Board question walkthrough 20"
  },
  {
    "id": 21,
    "question": "Question 21 on Board Programs Walkthrough: How is board algorithm 21 implemented efficiently?",
    "shortAnswer": "Extracts digits with % 10 and / 10, uses loop accumulators, and outputs formatted results with Scanner.",
    "explanation": "Classic ICSE board questions test arithmetic extraction, String arrays, and search/sort patterns. Walkthrough 21 reviews optimal code structure.",
    "hint": "Classic ICSE board pattern.",
    "level": "advanced",
    "options": [
      "Requires external libraries",
      "Standard arithmetic loop with digit extraction (% 10, / 10) and VDT",
      "Only works in Linux",
      "Uses recursive lambda"
    ],
    "correctAnswer": 1,
    "codeExample": "// Board question walkthrough 21"
  },
  {
    "id": 22,
    "question": "Question 22 on Board Programs Walkthrough: How is board algorithm 22 implemented efficiently?",
    "shortAnswer": "Extracts digits with % 10 and / 10, uses loop accumulators, and outputs formatted results with Scanner.",
    "explanation": "Classic ICSE board questions test arithmetic extraction, String arrays, and search/sort patterns. Walkthrough 22 reviews optimal code structure.",
    "hint": "Classic ICSE board pattern.",
    "level": "advanced",
    "options": [
      "Requires external libraries",
      "Standard arithmetic loop with digit extraction (% 10, / 10) and VDT",
      "Only works in Linux",
      "Uses recursive lambda"
    ],
    "correctAnswer": 1,
    "codeExample": "// Board question walkthrough 22"
  },
  {
    "id": 23,
    "question": "Question 23 on Board Programs Walkthrough: How is board algorithm 23 implemented efficiently?",
    "shortAnswer": "Extracts digits with % 10 and / 10, uses loop accumulators, and outputs formatted results with Scanner.",
    "explanation": "Classic ICSE board questions test arithmetic extraction, String arrays, and search/sort patterns. Walkthrough 23 reviews optimal code structure.",
    "hint": "Classic ICSE board pattern.",
    "level": "advanced",
    "options": [
      "Requires external libraries",
      "Standard arithmetic loop with digit extraction (% 10, / 10) and VDT",
      "Only works in Linux",
      "Uses recursive lambda"
    ],
    "correctAnswer": 1,
    "codeExample": "// Board question walkthrough 23"
  },
  {
    "id": 24,
    "question": "Question 24 on Board Programs Walkthrough: How is board algorithm 24 implemented efficiently?",
    "shortAnswer": "Extracts digits with % 10 and / 10, uses loop accumulators, and outputs formatted results with Scanner.",
    "explanation": "Classic ICSE board questions test arithmetic extraction, String arrays, and search/sort patterns. Walkthrough 24 reviews optimal code structure.",
    "hint": "Classic ICSE board pattern.",
    "level": "advanced",
    "options": [
      "Requires external libraries",
      "Standard arithmetic loop with digit extraction (% 10, / 10) and VDT",
      "Only works in Linux",
      "Uses recursive lambda"
    ],
    "correctAnswer": 1,
    "codeExample": "// Board question walkthrough 24"
  },
  {
    "id": 25,
    "question": "Question 25 on Board Programs Walkthrough: How is board algorithm 25 implemented efficiently?",
    "shortAnswer": "Extracts digits with % 10 and / 10, uses loop accumulators, and outputs formatted results with Scanner.",
    "explanation": "Classic ICSE board questions test arithmetic extraction, String arrays, and search/sort patterns. Walkthrough 25 reviews optimal code structure.",
    "hint": "Classic ICSE board pattern.",
    "level": "advanced",
    "options": [
      "Requires external libraries",
      "Standard arithmetic loop with digit extraction (% 10, / 10) and VDT",
      "Only works in Linux",
      "Uses recursive lambda"
    ],
    "correctAnswer": 1,
    "codeExample": "// Board question walkthrough 25"
  }
];

export default questions;
