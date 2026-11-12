const questions = [
  {
    "id": 1,
    "question": "What is the recommended time allocation strategy for the 2-hour (120 minutes) ICSE exam?",
    "shortAnswer": "Section A: 30 minutes; Section B: 80 minutes (20 min per program); Review: 10 minutes.",
    "explanation": "Strict pacing ensures you complete 4 full programs with variable description tables.",
    "hint": "30 min Section A, 80 min Section B",
    "level": "basic",
    "options": [
      "60 min Section A, 60 min Section B",
      "Section A: 30 min, Section B: 80 min, Review: 10 min",
      "10 min Section A, 110 min Section B",
      "No timing strategy needed"
    ],
    "correctAnswer": 1,
    "codeExample": "Time: 30m (Sec A) + 80m (Sec B) + 10m (Review)"
  },
  {
    "id": 2,
    "question": "What are the common question types tested in Section B?",
    "shortAnswer": "Class Design, Number/Math Logic (e.g. Special/Automorphic), String Processing, 1D Array Sorting/Searching.",
    "explanation": "Standard 4 categories tested across 6 choices.",
    "hint": "Standard 4 program categories",
    "level": "basic",
    "options": [
      "Only database queries",
      "Class Design, Number Logic, String manipulation, and Array algorithms",
      "Only web development",
      "Assembly code"
    ],
    "correctAnswer": 1,
    "codeExample": "4 broad programming categories"
  },
  {
    "id": 3,
    "question": "In a mock test, if you finish a Section B program in 15 minutes, what should you write next?",
    "shortAnswer": "The Variable Description Table and neat comments / mnemonics.",
    "explanation": "Every Section B solution must conclude with a Variable Description Table for full marks.",
    "hint": "Write variable description table",
    "level": "basic",
    "options": [
      "Start Section C",
      "Write the Variable Description Table immediately",
      "Leave the exam hall",
      "Erase the code"
    ],
    "correctAnswer": 1,
    "codeExample": "Variable Description Table"
  },
  {
    "id": 4,
    "question": "How many marks are typically deducted if Variable Description Table is missing?",
    "shortAnswer": "2 to 3 marks out of 15.",
    "explanation": "CISCE marking key explicitly reserves 2-3 marks for mnemonic variables and VDT.",
    "hint": "2-3 marks deduction",
    "level": "basic",
    "options": [
      "0 marks",
      "2 to 3 marks",
      "10 marks",
      "Program awarded 0"
    ],
    "correctAnswer": 1,
    "codeExample": "VDT carries 2-3 marks"
  },
  {
    "id": 5,
    "question": "What should you do if an algorithm gets stuck during the exam?",
    "shortAnswer": "Write clean structure: class, data members, Scanner input, and variable table for partial marks.",
    "explanation": "CISCE awards step marking for class definition, input, and variable table.",
    "hint": "Step marking principle",
    "level": "intermediate",
    "options": [
      "Leave it completely blank",
      "Write full class structure, variables, input, and VDT for partial marks",
      "Switch subjects",
      "Cry"
    ],
    "correctAnswer": 1,
    "codeExample": "Step marking: grab 8-10 partial marks"
  },
  {
    "id": 6,
    "question": "Question 6 on Mock Test Strategy: How should students approach mock challenge 6?",
    "shortAnswer": "Read question specifications thoroughly, identify constraints, and test boundary conditions on paper.",
    "explanation": "Mock tests simulate real board conditions to build algorithmic stamina and speed. Question 6 reviews test-taking methodology.",
    "hint": "Mock exam strategy.",
    "level": "intermediate",
    "options": [
      "Skip reading question",
      "Read specifications, identify variables, write structured code with VDT",
      "Code without variable names",
      "Guess random numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Mock test strategy 6"
  },
  {
    "id": 7,
    "question": "Question 7 on Mock Test Strategy: How should students approach mock challenge 7?",
    "shortAnswer": "Read question specifications thoroughly, identify constraints, and test boundary conditions on paper.",
    "explanation": "Mock tests simulate real board conditions to build algorithmic stamina and speed. Question 7 reviews test-taking methodology.",
    "hint": "Mock exam strategy.",
    "level": "intermediate",
    "options": [
      "Skip reading question",
      "Read specifications, identify variables, write structured code with VDT",
      "Code without variable names",
      "Guess random numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Mock test strategy 7"
  },
  {
    "id": 8,
    "question": "Question 8 on Mock Test Strategy: How should students approach mock challenge 8?",
    "shortAnswer": "Read question specifications thoroughly, identify constraints, and test boundary conditions on paper.",
    "explanation": "Mock tests simulate real board conditions to build algorithmic stamina and speed. Question 8 reviews test-taking methodology.",
    "hint": "Mock exam strategy.",
    "level": "intermediate",
    "options": [
      "Skip reading question",
      "Read specifications, identify variables, write structured code with VDT",
      "Code without variable names",
      "Guess random numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Mock test strategy 8"
  },
  {
    "id": 9,
    "question": "Question 9 on Mock Test Strategy: How should students approach mock challenge 9?",
    "shortAnswer": "Read question specifications thoroughly, identify constraints, and test boundary conditions on paper.",
    "explanation": "Mock tests simulate real board conditions to build algorithmic stamina and speed. Question 9 reviews test-taking methodology.",
    "hint": "Mock exam strategy.",
    "level": "intermediate",
    "options": [
      "Skip reading question",
      "Read specifications, identify variables, write structured code with VDT",
      "Code without variable names",
      "Guess random numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Mock test strategy 9"
  },
  {
    "id": 10,
    "question": "Question 10 on Mock Test Strategy: How should students approach mock challenge 10?",
    "shortAnswer": "Read question specifications thoroughly, identify constraints, and test boundary conditions on paper.",
    "explanation": "Mock tests simulate real board conditions to build algorithmic stamina and speed. Question 10 reviews test-taking methodology.",
    "hint": "Mock exam strategy.",
    "level": "intermediate",
    "options": [
      "Skip reading question",
      "Read specifications, identify variables, write structured code with VDT",
      "Code without variable names",
      "Guess random numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Mock test strategy 10"
  },
  {
    "id": 11,
    "question": "Question 11 on Mock Test Strategy: How should students approach mock challenge 11?",
    "shortAnswer": "Read question specifications thoroughly, identify constraints, and test boundary conditions on paper.",
    "explanation": "Mock tests simulate real board conditions to build algorithmic stamina and speed. Question 11 reviews test-taking methodology.",
    "hint": "Mock exam strategy.",
    "level": "intermediate",
    "options": [
      "Skip reading question",
      "Read specifications, identify variables, write structured code with VDT",
      "Code without variable names",
      "Guess random numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Mock test strategy 11"
  },
  {
    "id": 12,
    "question": "Question 12 on Mock Test Strategy: How should students approach mock challenge 12?",
    "shortAnswer": "Read question specifications thoroughly, identify constraints, and test boundary conditions on paper.",
    "explanation": "Mock tests simulate real board conditions to build algorithmic stamina and speed. Question 12 reviews test-taking methodology.",
    "hint": "Mock exam strategy.",
    "level": "intermediate",
    "options": [
      "Skip reading question",
      "Read specifications, identify variables, write structured code with VDT",
      "Code without variable names",
      "Guess random numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Mock test strategy 12"
  },
  {
    "id": 13,
    "question": "Question 13 on Mock Test Strategy: How should students approach mock challenge 13?",
    "shortAnswer": "Read question specifications thoroughly, identify constraints, and test boundary conditions on paper.",
    "explanation": "Mock tests simulate real board conditions to build algorithmic stamina and speed. Question 13 reviews test-taking methodology.",
    "hint": "Mock exam strategy.",
    "level": "intermediate",
    "options": [
      "Skip reading question",
      "Read specifications, identify variables, write structured code with VDT",
      "Code without variable names",
      "Guess random numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Mock test strategy 13"
  },
  {
    "id": 14,
    "question": "Question 14 on Mock Test Strategy: How should students approach mock challenge 14?",
    "shortAnswer": "Read question specifications thoroughly, identify constraints, and test boundary conditions on paper.",
    "explanation": "Mock tests simulate real board conditions to build algorithmic stamina and speed. Question 14 reviews test-taking methodology.",
    "hint": "Mock exam strategy.",
    "level": "intermediate",
    "options": [
      "Skip reading question",
      "Read specifications, identify variables, write structured code with VDT",
      "Code without variable names",
      "Guess random numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Mock test strategy 14"
  },
  {
    "id": 15,
    "question": "Question 15 on Mock Test Strategy: How should students approach mock challenge 15?",
    "shortAnswer": "Read question specifications thoroughly, identify constraints, and test boundary conditions on paper.",
    "explanation": "Mock tests simulate real board conditions to build algorithmic stamina and speed. Question 15 reviews test-taking methodology.",
    "hint": "Mock exam strategy.",
    "level": "intermediate",
    "options": [
      "Skip reading question",
      "Read specifications, identify variables, write structured code with VDT",
      "Code without variable names",
      "Guess random numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Mock test strategy 15"
  },
  {
    "id": 16,
    "question": "Question 16 on Mock Test Strategy: How should students approach mock challenge 16?",
    "shortAnswer": "Read question specifications thoroughly, identify constraints, and test boundary conditions on paper.",
    "explanation": "Mock tests simulate real board conditions to build algorithmic stamina and speed. Question 16 reviews test-taking methodology.",
    "hint": "Mock exam strategy.",
    "level": "intermediate",
    "options": [
      "Skip reading question",
      "Read specifications, identify variables, write structured code with VDT",
      "Code without variable names",
      "Guess random numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Mock test strategy 16"
  },
  {
    "id": 17,
    "question": "Question 17 on Mock Test Strategy: How should students approach mock challenge 17?",
    "shortAnswer": "Read question specifications thoroughly, identify constraints, and test boundary conditions on paper.",
    "explanation": "Mock tests simulate real board conditions to build algorithmic stamina and speed. Question 17 reviews test-taking methodology.",
    "hint": "Mock exam strategy.",
    "level": "intermediate",
    "options": [
      "Skip reading question",
      "Read specifications, identify variables, write structured code with VDT",
      "Code without variable names",
      "Guess random numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Mock test strategy 17"
  },
  {
    "id": 18,
    "question": "Question 18 on Mock Test Strategy: How should students approach mock challenge 18?",
    "shortAnswer": "Read question specifications thoroughly, identify constraints, and test boundary conditions on paper.",
    "explanation": "Mock tests simulate real board conditions to build algorithmic stamina and speed. Question 18 reviews test-taking methodology.",
    "hint": "Mock exam strategy.",
    "level": "intermediate",
    "options": [
      "Skip reading question",
      "Read specifications, identify variables, write structured code with VDT",
      "Code without variable names",
      "Guess random numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Mock test strategy 18"
  },
  {
    "id": 19,
    "question": "Question 19 on Mock Test Strategy: How should students approach mock challenge 19?",
    "shortAnswer": "Read question specifications thoroughly, identify constraints, and test boundary conditions on paper.",
    "explanation": "Mock tests simulate real board conditions to build algorithmic stamina and speed. Question 19 reviews test-taking methodology.",
    "hint": "Mock exam strategy.",
    "level": "advanced",
    "options": [
      "Skip reading question",
      "Read specifications, identify variables, write structured code with VDT",
      "Code without variable names",
      "Guess random numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Mock test strategy 19"
  },
  {
    "id": 20,
    "question": "Question 20 on Mock Test Strategy: How should students approach mock challenge 20?",
    "shortAnswer": "Read question specifications thoroughly, identify constraints, and test boundary conditions on paper.",
    "explanation": "Mock tests simulate real board conditions to build algorithmic stamina and speed. Question 20 reviews test-taking methodology.",
    "hint": "Mock exam strategy.",
    "level": "advanced",
    "options": [
      "Skip reading question",
      "Read specifications, identify variables, write structured code with VDT",
      "Code without variable names",
      "Guess random numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Mock test strategy 20"
  },
  {
    "id": 21,
    "question": "Question 21 on Mock Test Strategy: How should students approach mock challenge 21?",
    "shortAnswer": "Read question specifications thoroughly, identify constraints, and test boundary conditions on paper.",
    "explanation": "Mock tests simulate real board conditions to build algorithmic stamina and speed. Question 21 reviews test-taking methodology.",
    "hint": "Mock exam strategy.",
    "level": "advanced",
    "options": [
      "Skip reading question",
      "Read specifications, identify variables, write structured code with VDT",
      "Code without variable names",
      "Guess random numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Mock test strategy 21"
  },
  {
    "id": 22,
    "question": "Question 22 on Mock Test Strategy: How should students approach mock challenge 22?",
    "shortAnswer": "Read question specifications thoroughly, identify constraints, and test boundary conditions on paper.",
    "explanation": "Mock tests simulate real board conditions to build algorithmic stamina and speed. Question 22 reviews test-taking methodology.",
    "hint": "Mock exam strategy.",
    "level": "advanced",
    "options": [
      "Skip reading question",
      "Read specifications, identify variables, write structured code with VDT",
      "Code without variable names",
      "Guess random numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Mock test strategy 22"
  },
  {
    "id": 23,
    "question": "Question 23 on Mock Test Strategy: How should students approach mock challenge 23?",
    "shortAnswer": "Read question specifications thoroughly, identify constraints, and test boundary conditions on paper.",
    "explanation": "Mock tests simulate real board conditions to build algorithmic stamina and speed. Question 23 reviews test-taking methodology.",
    "hint": "Mock exam strategy.",
    "level": "advanced",
    "options": [
      "Skip reading question",
      "Read specifications, identify variables, write structured code with VDT",
      "Code without variable names",
      "Guess random numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Mock test strategy 23"
  },
  {
    "id": 24,
    "question": "Question 24 on Mock Test Strategy: How should students approach mock challenge 24?",
    "shortAnswer": "Read question specifications thoroughly, identify constraints, and test boundary conditions on paper.",
    "explanation": "Mock tests simulate real board conditions to build algorithmic stamina and speed. Question 24 reviews test-taking methodology.",
    "hint": "Mock exam strategy.",
    "level": "advanced",
    "options": [
      "Skip reading question",
      "Read specifications, identify variables, write structured code with VDT",
      "Code without variable names",
      "Guess random numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Mock test strategy 24"
  },
  {
    "id": 25,
    "question": "Question 25 on Mock Test Strategy: How should students approach mock challenge 25?",
    "shortAnswer": "Read question specifications thoroughly, identify constraints, and test boundary conditions on paper.",
    "explanation": "Mock tests simulate real board conditions to build algorithmic stamina and speed. Question 25 reviews test-taking methodology.",
    "hint": "Mock exam strategy.",
    "level": "advanced",
    "options": [
      "Skip reading question",
      "Read specifications, identify variables, write structured code with VDT",
      "Code without variable names",
      "Guess random numbers"
    ],
    "correctAnswer": 1,
    "codeExample": "// Mock test strategy 25"
  }
];

export default questions;
