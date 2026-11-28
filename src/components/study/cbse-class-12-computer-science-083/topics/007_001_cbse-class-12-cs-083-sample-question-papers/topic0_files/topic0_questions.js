export const questions = [
  {
    "id": 1,
    "question": "[Topic 0 Q1] In the CBSE Class 12 Computer Science (083) theory paper, what is the total maximum mark?",
    "options": [
      "100 Marks",
      "70 Marks",
      "80 Marks",
      "50 Marks"
    ],
    "correctAnswer": 1,
    "explanation": "The theory examination is out of 70 marks, while the practical examination accounts for 30 marks (total = 100)."
  },
  {
    "id": 2,
    "question": "[Topic 0 Q2] How many sections are there in the standard CBSE Class 12 Computer Science question paper?",
    "options": [
      "3 Sections (A to C)",
      "4 Sections (A to D)",
      "5 Sections (A to E)",
      "6 Sections (A to F)"
    ],
    "correctAnswer": 2,
    "explanation": "The question paper consists of 5 sections: Section A (1M), Section B (2M), Section C (3M), Section D (5M), Section E (4M)."
  },
  {
    "id": 3,
    "question": "[Topic 0 Q3] Which unit in the CBSE Class 12 CS syllabus carries the highest marks weightage?",
    "options": [
      "Unit I: Computational Thinking and Programming - 2 (40 Marks)",
      "Unit II: Computer Networks (10 Marks)",
      "Unit III: Database Management (20 Marks)",
      "All units carry equal marks"
    ],
    "correctAnswer": 0,
    "explanation": "Unit I carries 40 marks out of the 70-mark theory paper."
  },
  {
    "id": 4,
    "question": "[Topic 0 Q4] In an Assertion (A) and Reason (R) question, if Assertion is True and Reason is False, which option is correct?",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is NOT the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "correctAnswer": 2,
    "explanation": "When Assertion is factually correct and Reason is false, the standard option is 'A is true but R is false'."
  },
  {
    "id": 5,
    "question": "[Topic 0 Q5] Which file handling mode opens a binary file for reading and writing without truncating existing data?",
    "options": [
      "'w+'",
      "'rb+'",
      "'ab+'",
      "'r+'"
    ],
    "correctAnswer": 1,
    "explanation": "'rb+' opens a binary file for both reading and writing without truncating its contents."
  },
  {
    "id": 6,
    "question": "[Topic 0 Q6] In a campus network design problem, where should the main server be placed?",
    "options": [
      "In the building with the fewest computers",
      "In the building with the maximum number of computers (80-20 rule)",
      "Always in the administrative office",
      "Anywhere randomly"
    ],
    "correctAnswer": 1,
    "explanation": "Placing the server in the block with the maximum computers minimizes overall cross-network traffic."
  },
  {
    "id": 7,
    "question": "[Topic 0 Q7] At what distance between network buildings does CBSE recommend installing a Repeater?",
    "options": [
      "Whenever distance exceeds 20 meters",
      "Whenever distance exceeds 70-80 meters",
      "Whenever distance exceeds 500 meters",
      "Repeaters are never required"
    ],
    "correctAnswer": 1,
    "explanation": "Ethernet copper signals attenuate over distance; repeaters are recommended when inter-building distance exceeds 70-80 meters."
  },
  {
    "id": 8,
    "question": "[Topic 0 Q8] In a stack implementation in Python using a list, which end serves as the TOP of the stack?",
    "options": [
      "Index 0 (the beginning of the list)",
      "The end of the list (append and pop from end)",
      "The middle of the list",
      "Arbitrary position"
    ],
    "correctAnswer": 1,
    "explanation": "Using list.append() and list.pop() operates on the end of the list in O(1) time, serving as the TOP."
  },
  {
    "id": 9,
    "question": "[Topic 0 Q9] What exception is raised when reading past the end of a binary file using pickle.load()?",
    "options": [
      "FileNotFoundError",
      "EOFError",
      "IndexError",
      "ValueError"
    ],
    "correctAnswer": 1,
    "explanation": "pickle.load() raises EOFError (End Of File Error) when no more pickled objects exist in the stream."
  },
  {
    "id": 10,
    "question": "[Topic 0 Q10] In SQL, which clause is mandatory when you want to filter groups after GROUP BY?",
    "options": [
      "WHERE",
      "HAVING",
      "ORDER BY",
      "DISTINCT"
    ],
    "correctAnswer": 1,
    "explanation": "HAVING is used exclusively to filter grouped aggregate rows after GROUP BY."
  },
  {
    "id": 11,
    "question": "[Topic 0 Q11] What is the recommended time allocation for completing Section A (18 MCQs) in the board exam?",
    "options": [
      "10 minutes",
      "25 to 30 minutes",
      "60 minutes",
      "90 minutes"
    ],
    "correctAnswer": 1,
    "explanation": "Allocating 25-30 minutes for Section A leaves adequate time for 3-mark and 5-mark coding questions."
  },
  {
    "id": 12,
    "question": "[Topic 0 Q12] In Python, which function returns the current byte position of the file pointer in an open file?",
    "options": [
      "f.tell()",
      "f.seek()",
      "f.pos()",
      "f.loc()"
    ],
    "correctAnswer": 0,
    "explanation": "f.tell() returns the current position of the file read/write pointer as an integer byte offset."
  },
  {
    "id": 13,
    "question": "[Topic 0 Q13] Which function moves the file pointer to a specific byte offset in an open file?",
    "options": [
      "f.move()",
      "f.goto()",
      "f.seek(offset, whence)",
      "f.shift()"
    ],
    "correctAnswer": 2,
    "explanation": "f.seek(offset, whence) changes the file pointer position."
  },
  {
    "id": 14,
    "question": "[Topic 0 Q14] In CSV file handling, what is the default delimiter used by csv.reader and csv.writer?",
    "options": [
      "Semicolon (;)",
      "Comma (,)",
      "Tab (\\t)",
      "Pipe (|)"
    ],
    "correctAnswer": 1,
    "explanation": "The default delimiter in the CSV module is the comma (,)."
  },
  {
    "id": 15,
    "question": "[Topic 0 Q15] When opening a CSV file for writing in Python 3, what parameter must be passed to open() to prevent extra blank lines on Windows?",
    "options": [
      "newline=''",
      "mode='b'",
      "encoding='utf8'",
      "flush=True"
    ],
    "correctAnswer": 0,
    "explanation": "newline='' prevents csv.writer from writing duplicate carriage return line breaks on Windows."
  },
  {
    "id": 16,
    "question": "[Topic 0 Q16] In SQL, how many join conditions are required to join 3 tables in an equi-join?",
    "options": [
      "1",
      "2",
      "3",
      "4"
    ],
    "correctAnswer": 1,
    "explanation": "Joining N tables requires at least (N - 1) join conditions. For 3 tables, 3 - 1 = 2."
  },
  {
    "id": 17,
    "question": "[Topic 0 Q17] In an equi-join between two tables, if Table A has 5 rows and Table B has 4 rows, what is the cardinality of their Cartesian product?",
    "options": [
      "9",
      "20",
      "1",
      "Cannot be determined"
    ],
    "correctAnswer": 1,
    "explanation": "Cardinality = 5 * 4 = 20 rows."
  },
  {
    "id": 18,
    "question": "[Topic 0 Q18] What does connection.commit() do in Python-MySQL connectivity?",
    "options": [
      "Closes the connection",
      "Permanently writes uncommitted transactional DML changes to the database",
      "Executes a SELECT query",
      "Rolls back changes"
    ],
    "correctAnswer": 1,
    "explanation": "con.commit() flushes all pending INSERT, UPDATE, and DELETE operations to disk."
  },
  {
    "id": 19,
    "question": "[Topic 0 Q19] Which network device operates at the Data Link Layer and filters traffic based on MAC addresses?",
    "options": [
      "Hub",
      "Switch",
      "Repeater",
      "Modem"
    ],
    "correctAnswer": 1,
    "explanation": "A Switch is an intelligent Layer-2 device that forwards packets based on hardware MAC addresses."
  },
  {
    "id": 20,
    "question": "[Topic 0 Q20] Which guided transmission medium offers the highest bandwidth and complete immunity to electromagnetic interference (EMI)?",
    "options": [
      "Unshielded Twisted Pair (UTP)",
      "Coaxial Cable",
      "Optical Fiber Cable",
      "Infrared"
    ],
    "correctAnswer": 2,
    "explanation": "Optical Fiber transmits data as light pulses through glass cores, providing maximum bandwidth and zero EMI."
  },
  {
    "id": 21,
    "question": "[Topic 0 Q21] In Python, which keyword allows modifying a module-level global variable from inside a function?",
    "options": [
      "extern",
      "global",
      "nonlocal",
      "static"
    ],
    "correctAnswer": 1,
    "explanation": "The 'global' keyword informs Python that assignments inside the function refer to the module-level variable."
  },
  {
    "id": 22,
    "question": "[Topic 0 Q22] What is the output of 'print(type({}))' in Python 3?",
    "options": [
      "<class 'set'>",
      "<class 'dict'>",
      "<class 'tuple'>",
      "<class 'list'>"
    ],
    "correctAnswer": 1,
    "explanation": "Empty curly braces {} create an empty dictionary, not an empty set (which requires set())."
  },
  {
    "id": 23,
    "question": "[Topic 0 Q23] In MySQL, what is the result of evaluating 'SELECT 10 + NULL;'?",
    "options": [
      "10",
      "0",
      "NULL",
      "Error"
    ],
    "correctAnswer": 2,
    "explanation": "Any arithmetic operation involving NULL propagates and returns NULL."
  },
  {
    "id": 24,
    "question": "[Topic 0 Q24] During the 15-minute CBSE reading time (10:15 - 10:30 AM), what should a student focus on?",
    "options": [
      "Writing code immediately on the question paper",
      "Analyzing Section E case studies, choosing optional questions, and planning section order",
      "Sleeping",
      "Asking invigilator for answers"
    ],
    "correctAnswer": 1,
    "explanation": "Use reading time strategically to analyze case studies and select internal choice questions."
  },
  {
    "id": 25,
    "question": "[Topic 0 Q25] Why is practicing full-length 70-mark papers under timed conditions critical for scoring 100/100?",
    "options": [
      "It builds stamina, eliminates syntax errors, and guarantees perfect time management across all 5 sections",
      "Because CBSE repeats the same paper exactly",
      "To avoid studying practicals",
      "Because textbook reading is unnecessary"
    ],
    "correctAnswer": 0,
    "explanation": "Simulated practice builds exam stamina, speed, and precision required to score a centum (100/100)."
  }
];
export default questions;
