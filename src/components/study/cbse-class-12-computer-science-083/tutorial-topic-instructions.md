# Master Instructions for Tutorial Topic Generation
## CBSE Class XII Computer Science (Subject Code: 083)

- **Repository**: `react_routing_tailwind`
- **Subject**: Computer Science (Subject Code: 083) – Class XII (Senior Secondary Board Curriculum / AISSCE)
- **Official Marks Distribution**:
  - **Unit I: Computational Thinking and Programming - 2 (Python)** — 40 Marks
  - **Unit II: Computer Networks** — 10 Marks
  - **Unit III: Database Management (DBMS & SQL)** — 20 Marks
  - **Total Theory**: 70 Marks | **Practical Examination**: 30 Marks | **Grand Total**: 100 Marks
- **Reference Standards**:
  - **CBSE Class XII Computer Science (083) Official Syllabus (2024-25 / 2025-26 / 2026-27)**
  - **Army Public School Barrackpore & Kendriya Vidyalaya Sangathan** (Examination Papers & Curriculum Delivery)
  - **Architecture Model**: `cbse-class-11-computer-science-083`, `information-technology-802`, and `icse-java-x` (Structured instructional modules + Solved Question Papers & 20+ Program Lab Bank)
- **Educator**: Sukanta Hui (Coder & AccoTax, Barrackpore, West Bengal, India)
- **Target Environment**: React 19 + Vite + Tailwind CSS (Zero-config, no `tailwind.config.js` required)
- **Primary Students**: Mamata, Mahima, Abhronila, Susmita, Debangshu, Sachin, Swadeep, Tuhina
- **Key Localities**: Barrackpore, Kolkata, Chandan Pukur, Jadavpur, Shyamnagar, Ichapur, Naihati

---

## 1. Directory Structure & File Naming Conventions

All tutorial content for CBSE Class XII Computer Science (083) resides inside:
`src/components/study/cbse-class-12-computer-science-083/`

### A. Slug Directory Architecture
1. **Roadmap Driven**: Use `cbse-class-12-computer-science-083-roadmap.json` to retrieve all module slugs, topic definitions, and sequence orders.
2. **Slug Folders**: Every folder created under `src/components/study/cbse-class-12-computer-science-083/topics/` **MUST** strictly match the module slug defined in the roadmap:
   - `001_001_python-class-11-curriculum-revision-and-tracing`
   - `001_002_functions-scope-parameter-passing-and-modules`
   - `002_001_text-file-handling-modes-reading-writing-and-pointer-methods`
   - `002_002_binary-file-handling-pickle-module-and-record-crud`
   - `002_003_csv-file-handling-reader-writer-and-tabular-data`
   - `003_001_linear-data-structures-and-stack-lifo-operations`
   - `004_001_network-evolution-transmission-media-and-terminologies`
   - `004_002_network-devices-topologies-and-types`
   - `004_003_network-protocols-web-services-and-cyber-security`
   - `004_004_case-study-network-layout-and-server-design`
   - `005_001_database-concepts-rdbms-and-relational-model-keys`
   - `006_001_sql-data-definition-and-table-constraints`
   - `006_002_sql-data-manipulation-filtering-and-sorting`
   - `006_003_sql-aggregate-functions-group-by-having-and-joins`
   - `006_004_python-mysql-database-connectivity`
   - **`007_001_cbse-class-12-cs-083-sample-question-papers`** *(Special Segment: Solved Model & Suggested Mock Papers)*
   - **`007_002_cbse-class-12-cs-083-lab-practical-question-bank`** *(Special Segment: 20+ Program Practical Repository Aligned with CBSE Suggested Programs & Viva Voce)*

3. **Sequential Topic Files**: Inside standard slug folders, create `Topic[N].jsx` (e.g. `Topic0.jsx`, `Topic1.jsx`, ...).
4. **Dedicated Companion Files**: Inside each standard slug folder, create `topic[N]_files/` containing:
   - `topic[N]_note.txt` (Printable plain text revision note)
   - `topic[N]_questions.js` (25-30 structured exam Q&As with detailed explanations)
   - Code files (`.py`, `.json`, `.sql`)

---

## 2. Special Segment: Suggested Mock Question Papers & All 20+ Practical Lab Programs (`Segment 7`)

Following the architecture established in **`cbse-class-11-computer-science-083`**, **`information-technology-802`**, and **`icse-java-x`**, **Segment 7** is dedicated to authentic examination mastery and the 30-mark practical examination requirements.

### A. Question Paper Topic File (`Topic[N].jsx`)
Inside `src/components/study/cbse-class-12-computer-science-083/topics/007_001_cbse-class-12-cs-083-sample-question-papers/`:

```jsx
import React, { useState } from 'react';
import PythonQuestionPaperTemplate from '../../../../common/PythonQuestionPaperTemplate';
import csPaperData from './topic0_files/cbse-2026-xii-cs083-sample-paper-1.json';

const Topic0 = () => {
  const [currentPaper] = useState(csPaperData);
  
  const organizationDetails = {
    name: "Coder & AccoTax",
    address: "25(10/A) Shibtala Road, Barrackpore, Kolkata",
    logo: "/logo.png"
  };
  
  const isLoggedIn = true;
  
  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <PythonQuestionPaperTemplate 
        data={currentPaper}
        isLoggedIn={isLoggedIn}
        organizationDetails={organizationDetails}
      />
    </div>
  );
};

export default Topic0;
```

### B. Official CBSE Class XII Question Paper Blueprint Schema (70 Marks)
> [!NOTE]
> The official CBSE Class 12 Computer Science (083) board examination consists of 35 compulsory questions divided into 5 Sections (A through E):
> - **Section A**: 18 Multiple Choice Questions (1 Mark each = 18 Marks). Questions 17 and 18 are Assertion-Reasoning.
> - **Section B**: 7 Very Short Answer Questions (2 Marks each = 14 Marks). Internal choice in two questions.
> - **Section C**: 5 Short Answer Questions (3 Marks each = 15 Marks). Internal choice in two questions.
> - **Section D**: 2 Long Answer Questions (5 Marks each = 10 Marks). Internal choice in both questions.
> - **Section E**: 3 Case-Study Based / Tracing Questions (4 Marks each = 12 Marks). Internal choice in one question.

```json
{
  "paperId": "CBSE-XII-CS083-2026-SQP1",
  "title": "Central Board of Secondary Education – Class XII Computer Science (083) All India Board Model Paper",
  "duration": "3 Hours",
  "totalMarks": 70,
  "unitDistribution": {
    "unit1_computational_thinking": 40,
    "unit2_computer_networks": 10,
    "unit3_database_management": 20
  },
  "paperPattern": "CBSE Official 35-Question 5-Section Board Exam Blueprint",
  "instructions": [
    "Please check that this question paper contains 35 questions divided into 5 Sections (A, B, C, D, and E).",
    "Section A consists of 18 objective/MCQ questions (1 mark each).",
    "Section B consists of 7 Very Short Answer questions (2 marks each).",
    "Section C consists of 5 Short Answer questions (3 marks each).",
    "Section D consists of 2 Long Answer questions (5 marks each).",
    "Section E consists of 3 Case-Based / Tracing questions (4 marks each).",
    "All programming questions are in Python."
  ],
  "sections": []
}
```

### C. 20+ Program Practical Laboratory Repository Aligned with CBSE Syllabus (Segment 7 Module 2)

> [!IMPORTANT]
> CBSE Class XII Computer Science (083) practical examination carries 30 Marks. The statutory report file requires a minimum of 15 Python programs, 4 SQL sets, and 2 Python-MySQL connectivity programs:
1. **Text File Character Statistics**: Count lines, words, vowels, consonants, uppercase, lowercase, and special characters.
2. **Text File Line Filter**: Read a text file and display all lines starting with a specified uppercase letter (e.g. 'A' or 'M').
3. **Text File Word Remover**: Copy all lines from `story.txt` to `clean.txt` excluding lines containing the word 'this' or 'that'.
4. **Binary File Record Creator**: Store student records (RollNo, Name, Marks) into a binary file `student.dat` using `pickle.dump()`.
5. **Binary File Search Engine**: Search for a student record by RollNo in `student.dat` using `pickle.load()` with `EOFError` exception handling.
6. **Binary File Record Updater**: Update marks of a student in `student.dat` by locating the record and rewriting in-place or via temporary file.
7. **Binary File Record Deletion**: Delete an employee record from `employee.dat` based on EmpID by copying valid records to a temporary file.
8. **CSV File Writer**: Create and write user records (UserID, Username, Department, Salary) into `users.csv` using `csv.writer()`.
9. **CSV File Search & Filter**: Read `users.csv` using `csv.reader()`, calculate total salary, and display employees in a specific department.
10. **Stack Implementation (Numeric)**: Implement Stack (LIFO) for integer values using Python list with `push()`, `pop()`, `peek()`, and `display()` operations.
11. **Stack Implementation (Record-Based)**: Implement Stack of book records `[BookNo, BookName, Price]` with push and pop operations and empty check.
12. **Python-MySQL Database Setup**: Write a Python script to connect to MySQL server, create database `school_db`, and create table `student`.
13. **Python-MySQL Record Insertion**: Accept student details from user and insert into MySQL table using parameterized `INSERT INTO` and `conn.commit()`.
14. **Python-MySQL Query & Fetch**: Retrieve and display all student records where `marks >= 75` using `cursor.fetchall()`.
15. **Python-MySQL Record Modification**: Update an employee's salary in MySQL database based on EmpID with proper exception handling.
16. **Python-MySQL Record Deletion**: Delete records of inactive accounts from MySQL table with user confirmation.
17. **SQL Set 1 (DDL & Constraints)**: `CREATE TABLE` with `PRIMARY KEY`, `FOREIGN KEY`, `NOT NULL`, `CHECK`, and `DEFAULT` constraints; `ALTER TABLE` modifications.
18. **SQL Set 2 (DML & Filtering)**: Queries using `SELECT`, `WHERE`, `LIKE`, `BETWEEN ... AND`, `IN`, `IS NULL`, and `ORDER BY`.
19. **SQL Set 3 (Aggregation & Grouping)**: Queries using `COUNT()`, `SUM()`, `AVG()`, `MIN()`, `MAX()`, `GROUP BY`, and `HAVING` clause.
20. **SQL Set 4 (Table Joins)**: Two-table Equi-Join queries, Cartesian products, and extracting combined reports.
21. **Capstone Project Blueprint**: Complete Python GUI/CLI frontend with MySQL backend architecture (Hospital, Library, or Bank Management).
22. **Viva Voce Master Bank**: Top 50 frequently asked external examiner viva questions with model answers.

---

## 3. Standard Topic Component Structure (11 Sequential Sections Order)

For instructional modules (Segments 1 to 6), each `Topic[N].jsx` must follow this sequential top-to-bottom layout:

```
┌────────────────────────────────────────────────────────────────────────┐
│ 1. Header Section (Module Badge, Topic Index, H1 Title, Summary)       │
├────────────────────────────────────────────────────────────────────────┤
│ 2. Deep Conceptual Explanation (What, Why, When, How It Works)         │
├────────────────────────────────────────────────────────────────────────┤
│ 3. Semantic Visual SVG Illustration (Native SVG <animate> / Diagrams)  │
├────────────────────────────────────────────────────────────────────────┤
│ 4. Deep Technical Breakdown (Syntax, Memory Models, Truth Tables, Math)│
├────────────────────────────────────────────────────────────────────────┤
│ 5. Code Demonstration (<PythonFileLoader> / Syntax Highlighted Blocks) │
├────────────────────────────────────────────────────────────────────────┤
│ 6. Real-World Case Studies & Examples (At least 4 distinct examples)   │
├────────────────────────────────────────────────────────────────────────┤
│ 7. Common Pitfalls & Best Practices (Beginner mistakes vs Pro habits)  │
├────────────────────────────────────────────────────────────────────────┤
│ 8. Hint Section ("Think about...", "Observe carefully...")             │
├────────────────────────────────────────────────────────────────────────┤
│ 9. Frequently Asked Questions (<FAQTemplate>)                          │
├────────────────────────────────────────────────────────────────────────┤
│ 10. Plain Text Printable Document (<PlainTextPrint>)                   │
├────────────────────────────────────────────────────────────────────────┤
│ 11. Teacher's Note (<Teacher>)                                         │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Component Import & Code Integration Templates

### A. Python Code Loader Template (`<PythonFileLoader>`)
```jsx
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import pythonCode from "./topic0_files/TextFileWordAnalyzer.py?raw";

<PythonFileLoader
  fileModule={pythonCode}
  title="TextFileWordAnalyzer.py"
  highlightLines={[12, 18, 24]}
/>
```

### B. FAQ Component Template (`<FAQTemplate>`)
```jsx
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic0_files/topic0_questions";

<FAQTemplate
  title="CBSE Class XII Computer Science (083) – Topic FAQs"
  questions={questions}
/>
```

### C. Plain Text Printable Note Template (`<PlainTextPrint>`)
```jsx
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic0_files/topic0_note.txt?raw";

<PlainTextPrint
  content={noteText}
  title="CBSE Class XII CS 083 – Quick Revision Document"
  stampEnabled={true}
  showDownload={true}
  downloadButtonText="Download Plain Text Note"
  downloadFileName="topic0_note.txt"
/>
```

### D. Teacher's Note Template (`<Teacher>`)
```jsx
import Teacher from "../../../../../common/TeacherSukantaHui";

<Teacher
  note="Remember: In CBSE Class 12 CS (083), file handling and MySQL connectivity carry huge weightage! Pay attention to the mode 'r+' vs 'w+', always handle EOFError when unpickling, and never forget conn.commit() when modifying SQL tables. — Sukanta Hui"
/>
```

---

## 5. Output & Quality Guarantee

1. **Full File Generation**: Always output 100% complete, un-truncated, copy-paste-ready JSX, JS, PY, SQL, and TXT files.
2. **Clean Code & Accessible HTML**: Proper semantic tags, aria attributes, clean commenting, and responsive layouts.
3. **Zero Fluff**: Every sentence, diagram, table, code sample, and FAQ must deliver genuine academic and practical value for CBSE Class XII Computer Science (083) students preparing for board exams.
