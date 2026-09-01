// ============================================================================
// COMPREHENSIVE GENERAL FAQ & KNOWLEDGE BASE DATABASE
// Multi-Disciplinary Curriculum Q&A Dataset for CNAT Mam Academic Chatbot
// Integrates: teachers.json Dynamic Data, Course Summaries, Topic Roadmaps, 
// Java, C, Python, JavaScript/React, Excel, TallyPrime, RDBMS/MySQL, UNIX, DSA, etc.
// Includes: Typo Tolerance, Spell Normalization, & Intelligent Fuzzy Matching Engine.
// ============================================================================

import teachersData from "../../../data/teachers.json";

// Common typos & synonym normalization dictionary
const TYPO_MAP = {
  "langualge": "language",
  "langauge": "language",
  "langug": "language",
  "progamming": "programming",
  "prog": "programming",
  "pyton": "python",
  "pythn": "python",
  "exel": "excel",
  "excle": "excel",
  "taly": "tally",
  "tallyprm": "tallyprime",
  "javscript": "javascript",
  "javascrip": "javascript",
  "raect": "react",
  "databse": "database",
  "syllbus": "syllabus",
  "courss": "course",
  "cours": "course",
  "tacher": "teacher",
  "tachers": "teachers",
  "contact": "contact",
  "phon": "phone",
  "assigment": "assignment",
  "assignmnt": "assignment",
  "homwork": "homework",
  "submision": "submission",
  "marksheed": "marksheet",
  "marksheett": "marksheet",
  "doubt": "doubt",
  "doubts": "doubt",
  "sir": "teacher",
  "madam": "mentor"
};

/**
 * Normalizes input text by fixing common typos and removing extra punctuation
 */
function normalizeQuery(text) {
  if (!text) return "";
  let cleaned = text.toLowerCase().replace(/[^a-z0-9\s#+\-\.]/g, " ");
  let words = cleaned.split(/\s+/).filter(Boolean);
  
  let normalizedWords = words.map(w => TYPO_MAP[w] || w);
  return normalizedWords.join(" ");
}

/**
 * Helper to match queries asking about specific teachers from teachers.json
 */
export function getTeacherInfoResponse(userQuery) {
  if (!userQuery) return null;
  const q = userQuery.toLowerCase().trim();

  const isTeacherQuery = q.includes("teacher") || q.includes("teachers") || 
                         q.includes("faculty") || q.includes("instructor") || 
                         q.includes("mentor") || q.includes("educator") || 
                         q.includes("who is") || q.includes("who are");

  // Check matching individual teacher by name from teachers.json
  for (const t of teachersData) {
    const nameLower = t.name.toLowerCase();
    const nameParts = nameLower.replace(/mr\.|ms\./g, "").trim().split(/\s+/);
    
    // Match first name or last name (e.g. "tanusree", "sukanta", "chandan", "sreeparna", "mounita", "ritaja", "sourav")
    const isNameMatch = nameParts.some(part => part.length >= 4 && q.includes(part));
    
    if (isNameMatch) {
      return `### 👨‍🏫 Mentor Profile: ${t.name}\n\n` +
        `- **Role & Title:** **${t.title}**\n` +
        `- **Email:** **${t.email}**\n` +
        (t.github ? `- **GitHub:** [https://github.com/${t.github}](https://github.com/${t.github})\n` : '') +
        `\n**About ${t.name}:**\n${t.bio}`;
    }
  }

  // Check if student asks for all teachers / faculty summary
  if (isTeacherQuery) {
    let summary = `### 👨‍🏫 Faculty & Mentors at Coder & AccoTax\n\n`;
    teachersData.forEach((t) => {
      summary += `- **${t.name}** (*${t.title}*)\n  - Email: **${t.email}** ${t.github ? `| GitHub: [${t.github}](https://github.com/${t.github})` : ''}\n`;
    });
    summary += `\n*CNAT Mam's Tip:* Ask me about any specific teacher (e.g. *"Tell me about Tanusree Hui"*) for their full bio!`;
    return summary;
  }

  return null;
}

export const GENERAL_FAQ_DATABASE = [
  // --------------------------------------------------------------------------
  // 0. STUDENT SERVICES & HELP DESK GUIDELINES
  // --------------------------------------------------------------------------
  {
    id: "assignment-submission-guidelines",
    category: "Student Guidelines",
    question: "How do I submit practical lab assignments and homework?",
    keywords: ["assignment", "assignments", "submit", "submission", "homework", "lab project", "assigment", "submision"],
    answer: `### 📝 Lab Assignment Submission Guidelines

1. **File Naming Format:** Always name your project file or workbook with your Roll Number & Name (e.g. \`ROLL_105_JAVA_ASSIGNMENT.java\` or \`ROLL_105_EXCEL_LAB.xlsx\`).
2. **Online Portal Upload:** Upload files directly through the **Student Portal** under the corresponding module tab.
3. **Instant Lab Feedback:** For urgent doubt clearance during lab hours, send a copy of your source code/formula directly via WhatsApp to **+91 70037 56860**.`
  },
  {
    id: "exam-viva-guidelines",
    category: "Student Guidelines",
    question: "What are the key tips for practical exams and viva tests?",
    keywords: ["viva", "exam", "interview", "practical test", "viva tips", "checklist", "mock test"],
    answer: `### 🎯 Practical Exam & Viva Success Checklist

1. **Code & Formula Explanation:** Be ready to explain *why* you chose a specific method, loop, or formula (\`XLOOKUP\`, \`INDEX-MATCH\`, \`while\` vs \`for\`).
2. **Defensive Programming & Guards:** Always explain how your code/formula handles edge cases (\`IFERROR()\`, array index bounds, non-null checks).
3. **Syntax & Logic Hygiene:** Keep your code neatly indented and variables meaningfully named.
4. **Time Management:** Complete required core questions before tackling bonus logic challenges!`
  },
  {
    id: "doubt-clearance-lab",
    category: "Student Guidelines",
    question: "How do I clear my doubts during lab hours?",
    keywords: ["doubt", "doubts", "help", "lab doubt", "stuck", "error", "clear doubt", "ask question"],
    answer: `### 🛠️ Student Doubt Clearance Helpline

- **Interactive AI Assistant:** You can ask **CNAT Mam** right here 24/7 for topic overviews, error explanations, and formula breakdowns!
- **Direct Faculty Guidance:** Senior Lead **Sukanta Hui** is available during lab hours for one-on-one debugging.
- **WhatsApp Helpline:** Message **+91 70037 56860** with a screenshot or snippet of your broken code or formula for instant guidance.`
  },
  {
    id: "online-test-marksheet",
    category: "Student Guidelines",
    question: "Where can I take online mock tests and view my performance marksheets?",
    keywords: ["test", "mock test", "marksheet", "score", "grades", "result", "online exam", "marksheed"],
    answer: `### 📊 Online Tests & Marksheet Portal

- **Interactive Practice Engines:** Use the embedded **Practice Engine & Quiz Engine** modules in your topic roadmaps to practice live questions.
- **Instant Marksheets:** System-generated progress marksheets are generated upon completing module assessments.
- **Certificate Verification:** ISO 9001:2015 certified completion certificates can be downloaded from your student profile.`
  },

  // --------------------------------------------------------------------------
  // 1. C PROGRAMMING LANGUAGE
  // --------------------------------------------------------------------------
  {
    id: "course-c-language",
    category: "Courses & Curriculum",
    question: "Tell me about C Programming Language & Foundations Course",
    keywords: [
      "c", "c language", "c lang", "c programming", "c course", "c code", "c syllabus", 
      "c langualge", "c langauge", "progamming in c", "c programing", "c coding", "c language course", "learn c"
    ],
    answer: `### ⚙️ C Programming Language & Systems Course

**Overview:** Learn core procedural programming, low-level memory control, pointers, and data structuring in C.

**Core Topics Covered:**
1. **C Fundamentals:** Data types, operators, expression evaluation, \`printf()\` & \`scanf()\`.
2. **Control Structures:** \`if-else\`, \`switch\`, \`while\`, \`do-while\`, \`for\` loops.
3. **Functions & Scope:** Modular programming, pass-by-value vs pass-by-reference, recursion.
4. **Pointers & Dynamic Memory:** Pointer arithmetic, \`malloc()\`, \`calloc()\`, \`realloc()\`, \`free()\`.
5. **Structures & File I/O:** \`struct\`, \`typedef\`, file operations (\`fopen\`, \`fprintf\`, \`fscanf\`, \`fclose\`).`
  },

  // --------------------------------------------------------------------------
  // 2. JAVA & ICSE / ISC COMPUTER APPLICATIONS
  // --------------------------------------------------------------------------
  {
    id: "course-icse-java",
    category: "Courses & Curriculum",
    question: "Tell me about ICSE Class 9 & 10 Java Computer Applications Course",
    keywords: [
      "java", "icse java", "class 10 java", "icse class 9 java", "icse computer applications", 
      "icse 10", "icse 9", "java course", "class x java", "bluej", "java programming", "java coding"
    ],
    answer: `### ☕ ICSE Class 9 & 10 Java Computer Applications Course

**Overview:** Complete ICSE syllabus coverage focusing on object-oriented concepts, BlueJ environment, and paper solving strategies.

**Core Topics Covered:**
1. **Introduction to OOP & Java Basics:** Classes, Objects, Abstraction, Encapsulation, Primitive Data Types.
2. **Decision Making Constructs:** \`if-else\`, nested \`if\`, \`switch-case\`, fall-through condition.
3. **Iterative Loops:** \`for\`, \`while\`, \`do-while\` loops, nested loops, series evaluation.
4. **Library Classes & Wrapper Classes:** \`Character\` & \`String\` methods, autoboxing/unboxing.
5. **Arrays (1D & 2D):** Declaration, linear search, binary search, bubble sort, selection sort, matrix operations.
6. **User-Defined Methods & Constructors:** Method overloading, call-by-value vs call-by-reference, default & parameterized constructors.`
  },
  {
    id: "course-isc-java",
    category: "Courses & Curriculum",
    question: "Tell me about ISC Class 11 & 12 Computer Science Course",
    keywords: ["isc java", "isc class 12", "isc class 11", "isc computer science", "isc 12", "isc 11", "isc computer"],
    answer: `### 💻 ISC Class 11 & 12 Computer Science Course

**Overview:** Advanced computer science curriculum incorporating theoretical computer architecture, algorithms, and complex Java programming.

**Core Topics Covered:**
1. **Boolean Algebra & Gate Networks:** Truth tables, K-Maps (SOP & POS reduction), De Morgan's Laws, Encoders/Decoders.
2. **Object-Oriented Programming:** Inheritance (\`extends\`), Interfaces (\`implements\`), Abstract classes.
3. **Data Structures:** 1D/2D Array algorithms, Stack (Infix to Postfix/Prefix conversion), Queue & Circular Queue operations.
4. **Recursion:** Base cases, recursive call stacks, Fibonacci, GCD, Tower of Hanoi.
5. **File Handling:** Character streams (\`FileReader\`/\`FileWriter\`) & Byte streams (\`FileInputStream\`/\`FileOutputStream\`).`
  },

  // --------------------------------------------------------------------------
  // 3. PYTHON DATA SCIENCE & PROGRAMMING
  // --------------------------------------------------------------------------
  {
    id: "course-python",
    category: "Courses & Curriculum",
    question: "Tell me about Python Data Science & Core Programming Course",
    keywords: ["python", "py", "pyton", "python course", "python programming", "python data science", "python syllabus", "python coding"],
    answer: `### 🐍 Python Data Science & Core Programming Course

**Overview:** Practical Python course spanning basic syntax to data analysis with NumPy, Pandas, and scripting.

**Core Topics Covered:**
1. **Python Foundations:** Syntax, variables, dynamic typing, input/output formatting.
2. **Data Structures:** Lists, Tuples, Dictionaries, Sets, Slicing, List Comprehensions.
3. **Control Flow & Functions:** Conditionals, loops, functions, \`*args\`, \`**kwargs\`, Lambda expressions.
4. **Object-Oriented Python:** Classes, \`__init__\` constructor, inheritance, encapsulation.
5. **Data Analysis Fundamentals:** NumPy arrays, Pandas DataFrames, CSV data parsing.`
  },

  // --------------------------------------------------------------------------
  // 4. MICROSOFT EXCEL & FINANCIAL ANALYTICS
  // --------------------------------------------------------------------------
  {
    id: "course-excel",
    category: "Courses & Curriculum",
    question: "Tell me about Advanced Excel Analytics & Financial Modeling Course",
    keywords: [
      "excel", "exel", "advanced excel", "excel course", "excel ultra expert", "excel analytics", 
      "financial modeling", "microsoft excel", "spreadsheet", "xlookup", "vlookup"
    ],
    answer: `### 📊 Microsoft Excel Ultra Expert & Analytics Course

**Overview:** Master spreadsheet engineering from raw data cleaning to advanced financial modeling and dynamic dashboards.

**Core Topics Covered:**
1. **Data Hygiene & Formatting:** Cell data types, serial dates, \`TRIM()\`, \`CLEAN()\`, \`PROPER()\`, Custom Number formatting.
2. **Lookup & Retrieval Engine:** \`XLOOKUP()\`, \`INDEX-MATCH\`, \`VLOOKUP()\`, \`HLOOKUP()\`, \`LOOKUP()\`.
3. **Dynamic Array Formulas:** \`FILTER()\`, \`UNIQUE()\`, \`SORT()\`, \`SORTBY()\`, \`SEQUENCE()\`, \`TEXTBEFORE()\`, \`TEXTAFTER()\`.
4. **Logical & Defensive Guards:** \`IF()\`, \`IFS()\`, \`SWITCH()\`, \`IFERROR()\`, \`ISBLANK()\`.
5. **Business Intelligence:** PivotTables, Slicers, Power Query M Code, Power Pivot DAX formulas.`
  },

  // --------------------------------------------------------------------------
  // 5. TALLYPRIME & CORPORATE ACCOUNTING
  // --------------------------------------------------------------------------
  {
    id: "course-tally",
    category: "Courses & Curriculum",
    question: "Tell me about TallyPrime GST & Corporate Accounting Course",
    keywords: [
      "tally", "tallyprime", "tally prime", "taly", "gst course", "corporate accounting", 
      "tally gst", "tally course", "accounting course", "bookkeeping"
    ],
    answer: `### 💼 TallyPrime & Corporate Accounting Certification Course

**Overview:** End-to-end practical accounting training covering manual double-entry bookkeeping to computerised TallyPrime GST compliance.

**Core Topics Covered:**
1. **Accounting Fundamentals:** 3 Golden Rules, Types of Accounts, Journal Entries, Ledger Posting, Trial Balance.
2. **Company Setup & Chart of Accounts:** Company creation, Group hierarchies, Primary groups, Opening Balances.
3. **Voucher Management:** Contra (\`F4\`), Payment (\`F5\`), Receipt (\`F6\`), Journal (\`F7\`), Sales (\`F8\`), Purchase (\`F9\`).
4. **Statutory & GST Compliance:** CGST, SGST, IGST tax ledgers, E-way bill, HSN/SAC codes, TDS/TCS deduction.
5. **Final Accounts & Financial Reporting:** Trading Account, Profit & Loss Statement, Balance Sheet, Bank Reconciliation (BRS).`
  },

  // --------------------------------------------------------------------------
  // 6. JAVASCRIPT & REACT 19 WEB DEVELOPMENT
  // --------------------------------------------------------------------------
  {
    id: "course-react-web",
    category: "Courses & Curriculum",
    question: "Tell me about Full Stack Web Development (React & JavaScript) Course",
    keywords: [
      "react", "javascript", "js", "web development", "full stack", "react 19", "frontend", 
      "react course", "javascript course", "web development course", "web dev", "node"
    ],
    answer: `### ⚛️ Full Stack Web Development (React & JavaScript) Course

**Overview:** Modern web engineering course teaching JavaScript (ES6+), React 19 UI development, and RESTful web backend integration.

**Core Topics Covered:**
1. **Modern JavaScript (ES6+):** Arrow functions, Destructuring, Spread/Rest operators, Modules.
2. **Async JavaScript:** Promises, Async/Await, \`fetch\` API, Event Loop mechanics.
3. **React 19 Core:** JSX syntax, Components, Props, State (\`useState\`), Effects (\`useEffect\`).
4. **Routing & UI Design:** React Router DOM, Tailwind CSS styling, Glassmorphism, Responsive layouts.
5. **Backend Basics:** Node.js, Express REST APIs, JSON data handling.`
  },

  // --------------------------------------------------------------------------
  // 7. RDBMS & MYSQL DATABASE SYSTEMS
  // --------------------------------------------------------------------------
  {
    id: "course-rdbms-mysql",
    category: "Courses & Curriculum",
    question: "Tell me about RDBMS & MySQL Database Engineering Course",
    keywords: ["rdbms", "mysql", "sql", "database", "rdbms course", "mysql course", "database course", "sql course", "sql syllabus"],
    answer: `### 🗄️ RDBMS & MySQL Database Engineering Course

**Overview:** Comprehensive database management course from relational algebra to SQL query optimization and normalization.

**Core Topics Covered:**
1. **RDBMS Foundations:** Relational data model, Tables, Rows, Columns, Primary Keys, Foreign Keys.
2. **SQL Data Manipulation (DML):** \`SELECT\`, \`INSERT\`, \`UPDATE\`, \`DELETE\`, \`WHERE\` filtering.
3. **Aggregations & Grouping:** \`COUNT()\`, \`SUM()\`, \`AVG()\`, \`MIN()\`, \`MAX()\`, \`GROUP BY\`, \`HAVING\`.
4. **SQL Joins:** \`INNER JOIN\`, \`LEFT JOIN\`, \`RIGHT JOIN\`, Subqueries.
5. **Database Design:** Normalization (1NF, 2NF, 3NF, BCNF) & ER Diagrams.`
  },

  // --------------------------------------------------------------------------
  // 8. UNIX / LINUX & SHELL SCRIPTING
  // --------------------------------------------------------------------------
  {
    id: "course-unix-linux",
    category: "Courses & Curriculum",
    question: "Tell me about UNIX / Linux Administration & Shell Scripting Course",
    keywords: ["unix", "linux", "shell scripting", "bash", "unix course", "linux course", "shell scripting course", "unix commands"],
    answer: `### 🐧 UNIX / Linux Administration & Shell Scripting Course

**Overview:** Hands-on operating system course covering command-line mastery, administration, and automated Bash shell scripting.

**Core Topics Covered:**
1. **UNIX Foundations:** Architecture (Kernel, Shell, File System), directory tree (\`/\`, \`/home\`, \`/etc\`).
2. **File & Directory Commands:** \`ls\`, \`cd\`, \`mkdir\`, \`cp\`, \`mv\`, \`rm\`, \`cat\`, \`chmod\`, \`chown\`.
3. **Text Processing Utilities:** Filter commands (\`grep\`, \`sed\`, \`awk\`, \`cut\`, \`sort\`, \`uniq\`).
4. **Process & System Control:** \`ps\`, \`top\`, \`kill\`, \`bg\`, \`fg\`, Cron Jobs, system logging.
5. **Shell Scripting:** Variables, positional parameters, \`if-then-else\`, \`for\`/\`while\` loops, automated backup scripts.`
  },

  // --------------------------------------------------------------------------
  // 9. DATA STRUCTURES & ALGORITHMS (DSA)
  // --------------------------------------------------------------------------
  {
    id: "course-dsa",
    category: "Courses & Curriculum",
    question: "Tell me about Data Structures & Algorithms (DSA) Course",
    keywords: ["dsa", "data structures", "algorithms", "dsa course", "data structures course", "algorithms course"],
    answer: `### ⚡ Data Structures & Algorithms (DSA) Course

**Overview:** Core computer science course focusing on algorithmic efficiency, memory structures, and problem-solving techniques.

**Core Topics Covered:**
1. **Complexity Analysis:** Time Complexity, Space Complexity, Big-O notation.
2. **Linear Data Structures:** Arrays, Single/Double Linked Lists, Stacks (LIFO), Queues (FIFO).
3. **Trees & Graphs:** Binary Trees, Binary Search Trees (BST), AVL Trees, Graph Traversals (BFS & DFS).
4. **Searching & Sorting:** Linear Search, Binary Search, Bubble Sort, Insertion Sort, Quick Sort, Merge Sort.`
  },

  // --------------------------------------------------------------------------
  // 10. CONCEPT DEEP DIVES
  // --------------------------------------------------------------------------
  {
    id: "java-oop-concepts",
    category: "Java & ICSE/ISC",
    question: "What are the core OOP principles in Java?",
    keywords: ["encapsulation", "inheritance", "polymorphism", "abstraction", "java oop", "class", "object"],
    answer: `### ☕ Core Object-Oriented Programming (OOP) Principles in Java

1. **Encapsulation:** Keeping fields \`private\` and exposing public getter/setter methods.
2. **Inheritance:** Subclass inheriting properties from a superclass using \`extends\`.
3. **Polymorphism:** Method Overloading (compile-time) & Method Overriding (runtime).
4. **Abstraction:** Hiding implementation details using \`abstract\` classes or \`interface\` definitions.`
  },
  {
    id: "excel-xlookup-indexmatch",
    category: "Excel & Analytics",
    question: "How do XLOOKUP and INDEX-MATCH compare to VLOOKUP?",
    keywords: ["xlookup", "vlookup", "index match", "lookup", "excel lookup"],
    answer: `### 📊 Advanced Excel Lookup Mastery

- **\`XLOOKUP(lookup_val, lookup_arr, return_arr, [if_not_found])\`:** Looks up left or right without column indices.
- **\`INDEX-MATCH\`:** \`=INDEX(return_range, MATCH(lookup_val, lookup_range, 0))\` – flexible & memory efficient.`
  },
  {
    id: "tally-golden-rules",
    category: "Tally & Accounting",
    question: "What are the Golden Rules of Accounting?",
    keywords: ["golden rules", "accounting rules", "personal account", "real account", "nominal account", "debit credit"],
    answer: `### 📖 The 3 Golden Rules of Accounting

1. **Personal Accounts:** Debit the Receiver, Credit the Giver.
2. **Real Accounts:** Debit what Comes In, Credit what Goes Out.
3. **Nominal Accounts:** Debit all Expenses & Losses, Credit all Incomes & Gains.`
  }
];

/**
 * Intelligent Typo-Tolerant Search & Fuzzy Keyword Matcher
 */
export function findMatchingFAQResponse(userQuery, context = {}) {
  if (!userQuery) return null;

  // 1. Check direct match against teachers.json dynamic dataset first
  const teacherResponse = getTeacherInfoResponse(userQuery);
  if (teacherResponse) {
    return teacherResponse;
  }

  // 2. Normalize query and fix typos
  const normalized = normalizeQuery(userQuery);
  if (!normalized) return null;

  const queryWords = normalized.split(/\s+/).filter(Boolean);

  let bestMatch = null;
  let highestScore = 0;

  for (const item of GENERAL_FAQ_DATABASE) {
    let score = 0;

    for (const kw of item.keywords) {
      const kwNorm = kw.toLowerCase();

      // Exact match of keyword phrase in normalized query
      if (normalized.includes(kwNorm)) {
        if (kwNorm.length <= 2) {
          const regex = new RegExp(`\\b${kwNorm}\\b`, 'i');
          if (regex.test(normalized)) {
            score += 25;
          }
        } else {
          score += (kwNorm.length * 3);
        }
      }

      // Word-level token match
      const kwWords = kwNorm.split(/\s+/);
      for (const qw of queryWords) {
        for (const kww of kwWords) {
          if (qw === kww) {
            score += 4;
          }
        }
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  // Return answer if match score threshold is met
  return (highestScore >= 10 && bestMatch) ? bestMatch.answer : null;
}
