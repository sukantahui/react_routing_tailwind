export const questions = [
  {
    "id": 1,
    "question": "What is the total time allocated for writing the CBSE Class 12 Computer Science theory paper?",
    "options": [
      "2 Hours (120 Mins)",
      "2.5 Hours (150 Mins)",
      "3 Hours (180 Mins)",
      "3.5 Hours (210 Mins)"
    ],
    "correctAnswer": 2,
    "explanation": "The annual board theory examination is scheduled for exactly 3 hours (180 minutes)."
  },
  {
    "id": 2,
    "question": "How many questions are there in total in the CBSE Class 12 CS 083 theory paper?",
    "options": [
      "25 Questions",
      "30 Questions",
      "35 Questions",
      "40 Questions"
    ],
    "correctAnswer": 2,
    "explanation": "The paper contains exactly 35 questions distributed across Sections A to E."
  },
  {
    "id": 3,
    "question": "How many marks are allocated to Section A (MCQs)?",
    "options": [
      "10 Marks",
      "14 Marks",
      "18 Marks",
      "20 Marks"
    ],
    "correctAnswer": 2,
    "explanation": "Section A consists of 18 questions of 1 mark each (Total = 18 Marks)."
  },
  {
    "id": 4,
    "question": "Which section contains 5-mark Long Answer questions?",
    "options": [
      "Section B",
      "Section C",
      "Section D",
      "Section E"
    ],
    "correctAnswer": 2,
    "explanation": "Section D contains 2 questions of 5 marks each (Total = 10 Marks)."
  },
  {
    "id": 5,
    "question": "Which section contains the 4-mark Case-Based questions?",
    "options": [
      "Section B",
      "Section C",
      "Section D",
      "Section E"
    ],
    "correctAnswer": 3,
    "explanation": "Section E contains 3 case-based questions of 4 marks each (Total = 12 Marks)."
  },
  {
    "id": 6,
    "question": "In Section B (2-mark questions), what type of problems are most common?",
    "options": [
      "Full stack implementation",
      "Output prediction and syntax error correction",
      "Network design case studies",
      "Essay questions"
    ],
    "correctAnswer": 1,
    "explanation": "Section B focuses on output tracing, loop dry runs, and syntax debugging."
  },
  {
    "id": 7,
    "question": "In Section C (3-mark questions), what are the two standard programming topics?",
    "options": [
      "Text file handling and Stack LIFO implementation",
      "HTML web page design and CSS styling",
      "Hardware assembling and BIOS setup",
      "Binary search and sorting algorithms"
    ],
    "correctAnswer": 0,
    "explanation": "Section C reliably tests Text file processing and Stack push/pop algorithms."
  },
  {
    "id": 8,
    "question": "What are the two anchor 5-mark questions in Section D?",
    "options": [
      "Binary file handling (pickle) and Multi-Table SQL queries",
      "Cyber law theory and HTML forms",
      "Python recursion and Networking OSI model",
      "Dictionary algorithms and CSV plots"
    ],
    "correctAnswer": 0,
    "explanation": "Section D features Binary File CRUD (5M) and Complex SQL relational queries (5M)."
  },
  {
    "id": 9,
    "question": "What is the recommended strategy for the initial 15-minute reading time (10:15 - 10:30 AM)?",
    "options": [
      "Start writing code immediately",
      "Analyze Section E campus network layout, select optional choices, and plan section order",
      "Check phone messages",
      "Sleep"
    ],
    "correctAnswer": 1,
    "explanation": "Use the reading period to analyze case studies and select preferred internal choice options."
  },
  {
    "id": 10,
    "question": "What rule should be followed when writing corrected code in Section B syntax debugging?",
    "options": [
      "Write only the line numbers",
      "Rewrite the complete corrected code and underline every correction made",
      "Write only the corrected keywords",
      "Delete the code"
    ],
    "correctAnswer": 1,
    "explanation": "CBSE marking schemes require rewriting the complete program with corrections underlined."
  },
  {
    "id": 11,
    "question": "Does CBSE award partial marks if a program has minor syntax errors but correct overall logic?",
    "options": [
      "Yes, CBSE follows positive step-marking rubrics",
      "No, zero marks are given for any syntax error",
      "Only in practicals",
      "Only for private candidates"
    ],
    "correctAnswer": 0,
    "explanation": "CBSE grading strictly follows step-marking, awarding marks for each correct construct."
  },
  {
    "id": 12,
    "question": "What is the best way to handle dry-run trace tables during the exam?",
    "options": [
      "Write trace tables on the desk",
      "Draw neat trace tables in pencil on the right-hand margin / rough work area",
      "Never draw trace tables",
      "Write them in the main answer space"
    ],
    "correctAnswer": 1,
    "explanation": "Keep trace tables neatly in the rough margin so the final answer remains clean."
  },
  {
    "id": 13,
    "question": "Why should students attempt all 10 sample question paper sets in this module?",
    "options": [
      "To build speed, precision, and confidence under 45-minute timed examination conditions",
      "To memorize answers",
      "Because CBSE repeats the exact same paper",
      "To avoid studying practicals"
    ],
    "correctAnswer": 0,
    "explanation": "Timed practice builds exam stamina and eliminates avoidable deduction errors."
  },
  {
    "id": 14,
    "question": "In Python stack implementation, what condition defines Stack Underflow?",
    "options": [
      "len(Stk) == 0",
      "len(Stk) > 100",
      "Stk is None",
      "Stk.pop() == 0"
    ],
    "correctAnswer": 0,
    "explanation": "When len(Stk) == 0, attempting to pop results in an Underflow condition."
  },
  {
    "id": 15,
    "question": "In text file processing, which method splits an entire file's text into individual words?",
    "options": [
      "f.read().split()",
      "f.readline()",
      "f.splitlines()",
      "f.words()"
    ],
    "correctAnswer": 0,
    "explanation": "f.read().split() reads the file content as a single string and splits on whitespace."
  },
  {
    "id": 16,
    "question": "What exception is handled when reading sequential records from a binary file using pickle.load()?",
    "options": [
      "FileNotFoundError",
      "EOFError",
      "IndexError",
      "ValueError"
    ],
    "correctAnswer": 1,
    "explanation": "EOFError signals the end of the binary stream."
  },
  {
    "id": 17,
    "question": "In Section E network layout problems, which block should house the server?",
    "options": [
      "The block with the maximum computers",
      "The block with the fewest computers",
      "Always the entrance gate",
      "Any random block"
    ],
    "correctAnswer": 0,
    "explanation": "Applying the 80-20 rule, placing the server in the block with max computers minimizes cross-traffic."
  },
  {
    "id": 18,
    "question": "When is a Repeater needed in a campus network layout?",
    "options": [
      "Whenever the distance between buildings exceeds 70 to 80 meters",
      "Only when wireless is used",
      "Whenever distance is less than 10 meters",
      "Never"
    ],
    "correctAnswer": 0,
    "explanation": "Signal attenuation over copper cables requires repeaters when distance exceeds 70-80 meters."
  },
  {
    "id": 19,
    "question": "What device is required inside EVERY block to network computers locally?",
    "options": [
      "Hub or Switch",
      "Repeater",
      "Modem",
      "Firewall"
    ],
    "correctAnswer": 0,
    "explanation": "A Hub or Switch connects individual workstation nodes within each block."
  },
  {
    "id": 20,
    "question": "In SQL equi-joins, what connects the common attributes in the WHERE clause?",
    "options": [
      "Equality operator '='",
      "LIKE operator",
      "IN operator",
      "BETWEEN operator"
    ],
    "correctAnswer": 0,
    "explanation": "Equi-joins match common primary/foreign key columns using equality (T1.id = T2.id)."
  },
  {
    "id": 21,
    "question": "What should you check if an INSERT query in Python-MySQL connectivity executes without errors but leaves the table unchanged?",
    "options": [
      "Check whether con.commit() was called",
      "Check whether the monitor is on",
      "Check whether Python is installed",
      "Check whether table has columns"
    ],
    "correctAnswer": 0,
    "explanation": "Without con.commit(), modifications remain in uncommitted buffer memory."
  },
  {
    "id": 22,
    "question": "What is the recommended buffer time to leave for final revision at the end of the 3-hour exam?",
    "options": [
      "10 to 15 minutes",
      "0 minutes",
      "60 minutes",
      "45 minutes"
    ],
    "correctAnswer": 0,
    "explanation": "10-15 minutes allows checking question numbering, variable spelling, and quote closures."
  },
  {
    "id": 23,
    "question": "How should question sub-parts be labeled in the answer sheet?",
    "options": [
      "Clearly in the left margin with question number and sub-part (e.g. Q31(a))",
      "Hidden inside paragraphs",
      "Without any labels",
      "At the bottom of the last page"
    ],
    "correctAnswer": 0,
    "explanation": "Clear labeling in the margin ensures evaluators easily award step marks."
  },
  {
    "id": 24,
    "question": "What is the total mark contribution of Section C and Section D combined?",
    "options": [
      "15 + 10 = 25 Marks",
      "10 Marks",
      "40 Marks",
      "18 Marks"
    ],
    "correctAnswer": 0,
    "explanation": "Section C (15M) + Section D (10M) = 25 Marks of core programming and SQL."
  },
  {
    "id": 25,
    "question": "What mindset does Master Teacher Sukanta Hui advise for scoring 100/100?",
    "options": [
      "Calm confidence, systematic time allocation, and strict adherence to marking rubrics",
      "Rushing through without checking",
      "Leaving questions blank",
      "Guessing all answers"
    ],
    "correctAnswer": 0,
    "explanation": "Disciplined time management, neat presentation, and positive step-marking awareness guarantee centum scores."
  }
];
export default questions;
