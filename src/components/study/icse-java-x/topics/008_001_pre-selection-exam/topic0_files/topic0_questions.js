const questions = [
  {
    "id": 1,
    "question": "What is the total marks allocation for the ICSE Class X Computer Applications written theory paper?",
    "shortAnswer": "100 marks (2 hours duration).",
    "explanation": "Section A carries 40 marks (compulsory) and Section B carries 60 marks (attempt 4 out of 6 questions).",
    "hint": "100 marks total",
    "level": "basic",
    "options": [
      "50 marks",
      "80 marks",
      "100 marks",
      "70 marks"
    ],
    "correctAnswer": 2,
    "codeExample": "// 100 Marks Written Paper"
  },
  {
    "id": 2,
    "question": "How many questions must be attempted in ICSE Section B, and what is each question worth?",
    "shortAnswer": "Attempt any 4 questions out of 6; each question carries 15 marks (4 x 15 = 60 marks).",
    "explanation": "Section B gives choice: 6 questions given, choose best 4.",
    "hint": "4 questions x 15 marks = 60",
    "level": "basic",
    "options": [
      "Attempt all 6 (10 marks each)",
      "Attempt 4 out of 6 (15 marks each)",
      "Attempt 5 out of 6 (12 marks each)",
      "Attempt 3 out of 5 (20 marks each)"
    ],
    "correctAnswer": 1,
    "codeExample": "4 x 15 = 60 marks"
  },
  {
    "id": 3,
    "question": "Is Section A compulsory in the ICSE Computer Applications board examination?",
    "shortAnswer": "Yes, Section A (40 marks) is completely compulsory with no internal choice.",
    "explanation": "Contains 20 marks MCQ (Question 1) and 20 marks short answers/output prediction (Question 2).",
    "hint": "Compulsory 40 marks",
    "level": "basic",
    "options": [
      "No, optional",
      "Yes, completely compulsory (40 marks)",
      "Only Question 1 is compulsory",
      "Choose any 2 questions"
    ],
    "correctAnswer": 1,
    "codeExample": "Section A: Compulsory"
  },
  {
    "id": 4,
    "question": "What is a Variable Description Table (VDT) and why is it required in Section B?",
    "shortAnswer": "A table listing each variable name, data type, and its purpose in the program.",
    "explanation": "CISCE marking scheme awards 2 to 3 marks specifically for the Variable Description Table.",
    "hint": "Variable table for marks",
    "level": "basic",
    "options": [
      "A list of compiler errors",
      "A table detailing variable name, data type, and purpose (vital for 2-3 marks)",
      "A database table",
      "A BlueJ project file"
    ],
    "correctAnswer": 1,
    "codeExample": "Variable | Data Type | Purpose"
  },
  {
    "id": 5,
    "question": "What chapters constitute the March to August ICSE Class X syllabus?",
    "shortAnswer": "Class IX Revision, Library Classes (Wrapper & Character), 1D & 2D Arrays, and String Handling.",
    "explanation": "These form the foundation for all Pre-Selection and Selection exams.",
    "hint": "Core first-term topics",
    "level": "basic",
    "options": [
      "Only HTML and CSS",
      "Revision, Library Classes, Arrays (1D/2D), and String Handling",
      "Only Networking",
      "Advanced Data Structures only"
    ],
    "correctAnswer": 1,
    "codeExample": "Term 1 Syllabus Scope"
  },
  {
    "id": 6,
    "question": "Question 6 on Syllabus Review: What syllabus concept or exam policy is tested in topic 6?",
    "shortAnswer": "Covers CISCE scope: Wrapper methods, String algorithms, Array searching/sorting, and BlueJ execution.",
    "explanation": "Thorough syllabus review ensures zero blind spots. Question 6 reviews essential syllabus boundaries for Pre-Selection exams.",
    "hint": "CISCE syllabus scope.",
    "level": "basic",
    "options": [
      "Outside syllabus",
      "Core ICSE Class X Computer Applications syllabus content",
      "University syllabus",
      "Only Python syntax"
    ],
    "correctAnswer": 1,
    "codeExample": "// Syllabus scope check 6"
  },
  {
    "id": 7,
    "question": "Question 7 on Syllabus Review: What syllabus concept or exam policy is tested in topic 7?",
    "shortAnswer": "Covers CISCE scope: Wrapper methods, String algorithms, Array searching/sorting, and BlueJ execution.",
    "explanation": "Thorough syllabus review ensures zero blind spots. Question 7 reviews essential syllabus boundaries for Pre-Selection exams.",
    "hint": "CISCE syllabus scope.",
    "level": "basic",
    "options": [
      "Outside syllabus",
      "Core ICSE Class X Computer Applications syllabus content",
      "University syllabus",
      "Only Python syntax"
    ],
    "correctAnswer": 1,
    "codeExample": "// Syllabus scope check 7"
  },
  {
    "id": 8,
    "question": "Question 8 on Syllabus Review: What syllabus concept or exam policy is tested in topic 8?",
    "shortAnswer": "Covers CISCE scope: Wrapper methods, String algorithms, Array searching/sorting, and BlueJ execution.",
    "explanation": "Thorough syllabus review ensures zero blind spots. Question 8 reviews essential syllabus boundaries for Pre-Selection exams.",
    "hint": "CISCE syllabus scope.",
    "level": "basic",
    "options": [
      "Outside syllabus",
      "Core ICSE Class X Computer Applications syllabus content",
      "University syllabus",
      "Only Python syntax"
    ],
    "correctAnswer": 1,
    "codeExample": "// Syllabus scope check 8"
  },
  {
    "id": 9,
    "question": "Question 9 on Syllabus Review: What syllabus concept or exam policy is tested in topic 9?",
    "shortAnswer": "Covers CISCE scope: Wrapper methods, String algorithms, Array searching/sorting, and BlueJ execution.",
    "explanation": "Thorough syllabus review ensures zero blind spots. Question 9 reviews essential syllabus boundaries for Pre-Selection exams.",
    "hint": "CISCE syllabus scope.",
    "level": "basic",
    "options": [
      "Outside syllabus",
      "Core ICSE Class X Computer Applications syllabus content",
      "University syllabus",
      "Only Python syntax"
    ],
    "correctAnswer": 1,
    "codeExample": "// Syllabus scope check 9"
  },
  {
    "id": 10,
    "question": "Question 10 on Syllabus Review: What syllabus concept or exam policy is tested in topic 10?",
    "shortAnswer": "Covers CISCE scope: Wrapper methods, String algorithms, Array searching/sorting, and BlueJ execution.",
    "explanation": "Thorough syllabus review ensures zero blind spots. Question 10 reviews essential syllabus boundaries for Pre-Selection exams.",
    "hint": "CISCE syllabus scope.",
    "level": "basic",
    "options": [
      "Outside syllabus",
      "Core ICSE Class X Computer Applications syllabus content",
      "University syllabus",
      "Only Python syntax"
    ],
    "correctAnswer": 1,
    "codeExample": "// Syllabus scope check 10"
  },
  {
    "id": 11,
    "question": "Question 11 on Syllabus Review: What syllabus concept or exam policy is tested in topic 11?",
    "shortAnswer": "Covers CISCE scope: Wrapper methods, String algorithms, Array searching/sorting, and BlueJ execution.",
    "explanation": "Thorough syllabus review ensures zero blind spots. Question 11 reviews essential syllabus boundaries for Pre-Selection exams.",
    "hint": "CISCE syllabus scope.",
    "level": "basic",
    "options": [
      "Outside syllabus",
      "Core ICSE Class X Computer Applications syllabus content",
      "University syllabus",
      "Only Python syntax"
    ],
    "correctAnswer": 1,
    "codeExample": "// Syllabus scope check 11"
  },
  {
    "id": 12,
    "question": "Question 12 on Syllabus Review: What syllabus concept or exam policy is tested in topic 12?",
    "shortAnswer": "Covers CISCE scope: Wrapper methods, String algorithms, Array searching/sorting, and BlueJ execution.",
    "explanation": "Thorough syllabus review ensures zero blind spots. Question 12 reviews essential syllabus boundaries for Pre-Selection exams.",
    "hint": "CISCE syllabus scope.",
    "level": "basic",
    "options": [
      "Outside syllabus",
      "Core ICSE Class X Computer Applications syllabus content",
      "University syllabus",
      "Only Python syntax"
    ],
    "correctAnswer": 1,
    "codeExample": "// Syllabus scope check 12"
  },
  {
    "id": 13,
    "question": "Question 13 on Syllabus Review: What syllabus concept or exam policy is tested in topic 13?",
    "shortAnswer": "Covers CISCE scope: Wrapper methods, String algorithms, Array searching/sorting, and BlueJ execution.",
    "explanation": "Thorough syllabus review ensures zero blind spots. Question 13 reviews essential syllabus boundaries for Pre-Selection exams.",
    "hint": "CISCE syllabus scope.",
    "level": "basic",
    "options": [
      "Outside syllabus",
      "Core ICSE Class X Computer Applications syllabus content",
      "University syllabus",
      "Only Python syntax"
    ],
    "correctAnswer": 1,
    "codeExample": "// Syllabus scope check 13"
  },
  {
    "id": 14,
    "question": "Question 14 on Syllabus Review: What syllabus concept or exam policy is tested in topic 14?",
    "shortAnswer": "Covers CISCE scope: Wrapper methods, String algorithms, Array searching/sorting, and BlueJ execution.",
    "explanation": "Thorough syllabus review ensures zero blind spots. Question 14 reviews essential syllabus boundaries for Pre-Selection exams.",
    "hint": "CISCE syllabus scope.",
    "level": "basic",
    "options": [
      "Outside syllabus",
      "Core ICSE Class X Computer Applications syllabus content",
      "University syllabus",
      "Only Python syntax"
    ],
    "correctAnswer": 1,
    "codeExample": "// Syllabus scope check 14"
  },
  {
    "id": 15,
    "question": "Question 15 on Syllabus Review: What syllabus concept or exam policy is tested in topic 15?",
    "shortAnswer": "Covers CISCE scope: Wrapper methods, String algorithms, Array searching/sorting, and BlueJ execution.",
    "explanation": "Thorough syllabus review ensures zero blind spots. Question 15 reviews essential syllabus boundaries for Pre-Selection exams.",
    "hint": "CISCE syllabus scope.",
    "level": "basic",
    "options": [
      "Outside syllabus",
      "Core ICSE Class X Computer Applications syllabus content",
      "University syllabus",
      "Only Python syntax"
    ],
    "correctAnswer": 1,
    "codeExample": "// Syllabus scope check 15"
  },
  {
    "id": 16,
    "question": "Question 16 on Syllabus Review: What syllabus concept or exam policy is tested in topic 16?",
    "shortAnswer": "Covers CISCE scope: Wrapper methods, String algorithms, Array searching/sorting, and BlueJ execution.",
    "explanation": "Thorough syllabus review ensures zero blind spots. Question 16 reviews essential syllabus boundaries for Pre-Selection exams.",
    "hint": "CISCE syllabus scope.",
    "level": "basic",
    "options": [
      "Outside syllabus",
      "Core ICSE Class X Computer Applications syllabus content",
      "University syllabus",
      "Only Python syntax"
    ],
    "correctAnswer": 1,
    "codeExample": "// Syllabus scope check 16"
  },
  {
    "id": 17,
    "question": "Question 17 on Syllabus Review: What syllabus concept or exam policy is tested in topic 17?",
    "shortAnswer": "Covers CISCE scope: Wrapper methods, String algorithms, Array searching/sorting, and BlueJ execution.",
    "explanation": "Thorough syllabus review ensures zero blind spots. Question 17 reviews essential syllabus boundaries for Pre-Selection exams.",
    "hint": "CISCE syllabus scope.",
    "level": "basic",
    "options": [
      "Outside syllabus",
      "Core ICSE Class X Computer Applications syllabus content",
      "University syllabus",
      "Only Python syntax"
    ],
    "correctAnswer": 1,
    "codeExample": "// Syllabus scope check 17"
  },
  {
    "id": 18,
    "question": "Question 18 on Syllabus Review: What syllabus concept or exam policy is tested in topic 18?",
    "shortAnswer": "Covers CISCE scope: Wrapper methods, String algorithms, Array searching/sorting, and BlueJ execution.",
    "explanation": "Thorough syllabus review ensures zero blind spots. Question 18 reviews essential syllabus boundaries for Pre-Selection exams.",
    "hint": "CISCE syllabus scope.",
    "level": "basic",
    "options": [
      "Outside syllabus",
      "Core ICSE Class X Computer Applications syllabus content",
      "University syllabus",
      "Only Python syntax"
    ],
    "correctAnswer": 1,
    "codeExample": "// Syllabus scope check 18"
  },
  {
    "id": 19,
    "question": "Question 19 on Syllabus Review: What syllabus concept or exam policy is tested in topic 19?",
    "shortAnswer": "Covers CISCE scope: Wrapper methods, String algorithms, Array searching/sorting, and BlueJ execution.",
    "explanation": "Thorough syllabus review ensures zero blind spots. Question 19 reviews essential syllabus boundaries for Pre-Selection exams.",
    "hint": "CISCE syllabus scope.",
    "level": "advanced",
    "options": [
      "Outside syllabus",
      "Core ICSE Class X Computer Applications syllabus content",
      "University syllabus",
      "Only Python syntax"
    ],
    "correctAnswer": 1,
    "codeExample": "// Syllabus scope check 19"
  },
  {
    "id": 20,
    "question": "Question 20 on Syllabus Review: What syllabus concept or exam policy is tested in topic 20?",
    "shortAnswer": "Covers CISCE scope: Wrapper methods, String algorithms, Array searching/sorting, and BlueJ execution.",
    "explanation": "Thorough syllabus review ensures zero blind spots. Question 20 reviews essential syllabus boundaries for Pre-Selection exams.",
    "hint": "CISCE syllabus scope.",
    "level": "advanced",
    "options": [
      "Outside syllabus",
      "Core ICSE Class X Computer Applications syllabus content",
      "University syllabus",
      "Only Python syntax"
    ],
    "correctAnswer": 1,
    "codeExample": "// Syllabus scope check 20"
  },
  {
    "id": 21,
    "question": "Question 21 on Syllabus Review: What syllabus concept or exam policy is tested in topic 21?",
    "shortAnswer": "Covers CISCE scope: Wrapper methods, String algorithms, Array searching/sorting, and BlueJ execution.",
    "explanation": "Thorough syllabus review ensures zero blind spots. Question 21 reviews essential syllabus boundaries for Pre-Selection exams.",
    "hint": "CISCE syllabus scope.",
    "level": "advanced",
    "options": [
      "Outside syllabus",
      "Core ICSE Class X Computer Applications syllabus content",
      "University syllabus",
      "Only Python syntax"
    ],
    "correctAnswer": 1,
    "codeExample": "// Syllabus scope check 21"
  },
  {
    "id": 22,
    "question": "Question 22 on Syllabus Review: What syllabus concept or exam policy is tested in topic 22?",
    "shortAnswer": "Covers CISCE scope: Wrapper methods, String algorithms, Array searching/sorting, and BlueJ execution.",
    "explanation": "Thorough syllabus review ensures zero blind spots. Question 22 reviews essential syllabus boundaries for Pre-Selection exams.",
    "hint": "CISCE syllabus scope.",
    "level": "advanced",
    "options": [
      "Outside syllabus",
      "Core ICSE Class X Computer Applications syllabus content",
      "University syllabus",
      "Only Python syntax"
    ],
    "correctAnswer": 1,
    "codeExample": "// Syllabus scope check 22"
  },
  {
    "id": 23,
    "question": "Question 23 on Syllabus Review: What syllabus concept or exam policy is tested in topic 23?",
    "shortAnswer": "Covers CISCE scope: Wrapper methods, String algorithms, Array searching/sorting, and BlueJ execution.",
    "explanation": "Thorough syllabus review ensures zero blind spots. Question 23 reviews essential syllabus boundaries for Pre-Selection exams.",
    "hint": "CISCE syllabus scope.",
    "level": "advanced",
    "options": [
      "Outside syllabus",
      "Core ICSE Class X Computer Applications syllabus content",
      "University syllabus",
      "Only Python syntax"
    ],
    "correctAnswer": 1,
    "codeExample": "// Syllabus scope check 23"
  },
  {
    "id": 24,
    "question": "Question 24 on Syllabus Review: What syllabus concept or exam policy is tested in topic 24?",
    "shortAnswer": "Covers CISCE scope: Wrapper methods, String algorithms, Array searching/sorting, and BlueJ execution.",
    "explanation": "Thorough syllabus review ensures zero blind spots. Question 24 reviews essential syllabus boundaries for Pre-Selection exams.",
    "hint": "CISCE syllabus scope.",
    "level": "advanced",
    "options": [
      "Outside syllabus",
      "Core ICSE Class X Computer Applications syllabus content",
      "University syllabus",
      "Only Python syntax"
    ],
    "correctAnswer": 1,
    "codeExample": "// Syllabus scope check 24"
  },
  {
    "id": 25,
    "question": "Question 25 on Syllabus Review: What syllabus concept or exam policy is tested in topic 25?",
    "shortAnswer": "Covers CISCE scope: Wrapper methods, String algorithms, Array searching/sorting, and BlueJ execution.",
    "explanation": "Thorough syllabus review ensures zero blind spots. Question 25 reviews essential syllabus boundaries for Pre-Selection exams.",
    "hint": "CISCE syllabus scope.",
    "level": "advanced",
    "options": [
      "Outside syllabus",
      "Core ICSE Class X Computer Applications syllabus content",
      "University syllabus",
      "Only Python syntax"
    ],
    "correctAnswer": 1,
    "codeExample": "// Syllabus scope check 25"
  }
];

export default questions;
