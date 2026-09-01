// ============================================================================
// CNAT MAM AI CHATBOT KNOWLEDGE BASE & MULTI-SUBJECT INTENT ENGINE
// Developed for Coder & AccoTax (Centre of Excellence)
// Covers: Institute Address & Campus, Teachers & Mentors, Comprehensive Courses,
//         Excel, Python, C/C++, DSA, Java, JavaScript, React, Tally, SQL, Unix,
//         Networks, Security, Quantitative Analysis, and Admissions.
// ============================================================================

import { findMatchingFAQResponse } from "./generalFAQKnowledge";

export const CNAT_MAM_PROFILE = {
  name: "CNAT Mam",
  title: "Senior AI Academic Mentor & Student Counselor",
  organization: "Coder & AccoTax Centre of Excellence",
  avatar: "/teachers/cnat.jpg",
  greeting: "Hello dear student! I am CNAT Mam, your academic mentor. How can I help you master your current topic or guide you with institute address, teachers details, and courses today?",
};

// ============================================================================
// QUICK PROMPT CHIPS (INCLUDES ADDRESS, TEACHERS, COURSES ACROSS ALL TRACKS)
// ============================================================================

export const DEFAULT_QUICK_CHIPS = {
  excel: [
    { label: "💡 Explain Topic", query: "Can you explain this Excel topic in simple terms with key formula rules?" },
    { label: "🔍 XLOOKUP vs VLOOKUP", query: "What is the difference between XLOOKUP and VLOOKUP?" },
    { label: "⚡ Dynamic Arrays", query: "Explain dynamic arrays like FILTER, UNIQUE, and SORT." },
    { label: "📍 Institute Address", query: "What is the official address and campus location of Coder & AccoTax?" },
    { label: "👨‍🏫 Teacher Details", query: "Who are the teachers and faculty members at Coder & AccoTax?" },
    { label: "📚 All Courses", query: "What are all the courses offered at Coder & AccoTax?" },
    { label: "📞 Helpline", query: "What is the official helpline number and contact details?" },
  ],
  python: [
    { label: "💡 Explain Topic", query: "Can you explain this Python concept with practical code?" },
    { label: "🐍 List vs Tuple", query: "What is the difference between Lists and Tuples in Python?" },
    { label: "⚙️ Decorators & Generators", query: "Explain Python decorators and generators with examples." },
    { label: "📊 Pandas DataFrames", query: "How do I manipulate data using Pandas DataFrames in Python?" },
    { label: "📍 Institute Address", query: "What is the address of the organisation?" },
    { label: "👨‍🏫 Teacher Details", query: "Give me details of teachers and mentors at Coder & AccoTax." },
    { label: "📚 Courses Offered", query: "List all courses offered at Coder & AccoTax." },
  ],
  "c-language": [
    { label: "💡 Explain Topic", query: "Explain this C programming concept step-by-step." },
    { label: "📌 Pointers in C", query: "How do pointers and memory addresses work in C?" },
    { label: "🧠 Dynamic Memory", query: "What is the difference between malloc(), calloc(), and free()?" },
    { label: "📍 Institute Address", query: "Where is Coder & AccoTax located? Give full address." },
    { label: "👨‍🏫 Teacher Details", query: "Who teaches C programming and what are teacher details?" },
    { label: "📚 All Courses", query: "What courses are available at Coder & AccoTax?" },
  ],
  dsa: [
    { label: "💡 Explain Topic", query: "Explain this data structure and its operations clearly." },
    { label: "⏱️ Big-O Complexity", query: "Explain Big-O time and space complexity with examples." },
    { label: "🌳 Binary Search Tree", query: "How does a Binary Search Tree (BST) work and what are its traversal orders?" },
    { label: "🔄 QuickSort vs MergeSort", query: "Compare QuickSort and MergeSort algorithms." },
    { label: "📍 Institute Address", query: "Provide the address and location of the organisation." },
    { label: "👨‍🏫 Teacher Details", query: "Who is the DSA mentor and faculty team?" },
    { label: "📚 Courses", query: "What courses do you teach at Coder & AccoTax?" },
  ],
  tally: [
    { label: "💡 Explain Topic", query: "Explain this Tally Prime accounting topic clearly." },
    { label: "⚖️ Golden Rules of Accounts", query: "What are the Golden Rules of Debit and Credit?" },
    { label: "📑 GST Invoicing & Vouchers", query: "How do CGST, SGST, and IGST work in Tally vouchers?" },
    { label: "📍 Institute Address", query: "What is the campus address of Coder & AccoTax?" },
    { label: "👨‍🏫 Teacher Details", query: "Who are the accounting and Tally teachers?" },
    { label: "📚 Courses", query: "What accounting and software courses are offered?" },
  ],
  "java-core": [
    { label: "💡 Explain Topic", query: "Explain this Java OOP concept with a code example." },
    { label: "🧱 4 Pillars of OOP", query: "Explain Encapsulation, Inheritance, Polymorphism, and Abstraction in Java." },
    { label: "📦 ArrayList vs HashMap", query: "What is the difference between ArrayList and HashMap in Java Collections?" },
    { label: "📍 Institute Address", query: "What is the address of the organisation?" },
    { label: "👨‍🏫 Teacher Details", query: "Who teaches Java and ICSE/ISC Computer Science?" },
    { label: "📚 All Courses", query: "What courses are taught at the institute?" },
  ],
  react: [
    { label: "💡 Explain Topic", query: "Explain this React concept in simple terms." },
    { label: "⚡ useState vs useEffect", query: "What is the difference between useState and useEffect hooks?" },
    { label: "🎯 useMemo vs useCallback", query: "When should I use useMemo vs useCallback in React?" },
    { label: "📍 Institute Address", query: "What is the address of Coder & AccoTax?" },
    { label: "👨‍🏫 Teacher Details", query: "Tell me about Sukanta Sir and the faculty members." },
    { label: "📚 Courses", query: "Show all courses available at Coder & AccoTax." },
  ],
  javascript: [
    { label: "💡 Explain Topic", query: "Explain this JavaScript concept with clear examples." },
    { label: "⏳ Promises & Async/Await", query: "How do Promises, async, and await work in JavaScript?" },
    { label: "🔒 Closures & Scope", query: "What is a Closure in JavaScript and why is it useful?" },
    { label: "📍 Institute Address", query: "Where is the organisation located?" },
    { label: "👨‍🏫 Teacher Details", query: "Who are the instructors and mentors?" },
    { label: "📚 Courses Offered", query: "What courses are offered at Coder & AccoTax?" },
  ],
  unix: [
    { label: "💡 Explain Topic", query: "Explain this Unix/Linux command and its flags." },
    { label: "🔐 chmod & Permissions", query: "How do file permissions (rwx) and chmod work in Unix?" },
    { label: "🔍 grep, sed & awk", query: "What are grep, sed, and awk text processing tools in Unix?" },
    { label: "📍 Institute Address", query: "What is the address of the organisation?" },
    { label: "👨‍🏫 Teacher Details", query: "Who can I contact for Unix/Linux guidance?" },
    { label: "📚 Courses", query: "What IT and programming courses are available?" },
  ],
  "rdbms-mysql": [
    { label: "💡 Explain Topic", query: "Explain this MySQL database concept clearly." },
    { label: "📐 Normalization (1NF to BCNF)", query: "Explain 1NF, 2NF, 3NF, and BCNF database normalization." },
    { label: "🔗 SQL Joins (INNER, LEFT, RIGHT)", query: "What are the different types of SQL Joins with examples?" },
    { label: "📍 Institute Address", query: "Where is the institute located?" },
    { label: "👨‍🏫 Teacher Details", query: "Who are the database faculty members?" },
    { label: "📚 Courses", query: "What courses are offered at Coder & AccoTax?" },
  ],
  "quantitative-analysis": [
    { label: "💡 Explain Topic", query: "Explain this quantitative analysis / operations research technique." },
    { label: "📊 PERT vs CPM", query: "What is the difference between PERT and CPM in project scheduling?" },
    { label: "📈 Linear Programming (LPP)", query: "How to formulate and solve a Linear Programming Problem (LPP)?" },
    { label: "📍 Institute Address", query: "What is the organisation's address?" },
    { label: "👨‍🏫 Teacher Details", query: "Who teaches Quantitative Analysis?" },
    { label: "📚 Courses", query: "What courses are offered at Coder & AccoTax?" },
  ],
  general: [
    { label: "📍 Institute Address", query: "What is the official address and campus location of Coder & AccoTax?" },
    { label: "👨‍🏫 Teachers Details", query: "Who are the teachers and mentors at Coder & AccoTax?" },
    { label: "📚 Courses Offered", query: "What courses and certifications are offered at Coder & AccoTax?" },
    { label: "💰 Fees & Admission", query: "What is the admission procedure and fee structure?" },
    { label: "📞 Contact Helpline", query: "What are the official helpline and WhatsApp contact numbers?" },
  ]
};

export const QUICK_PROMPT_CHIPS = DEFAULT_QUICK_CHIPS.general;

export function getQuickChipsForSubject(subjectKey = "general") {
  const normalizedKey = String(subjectKey).toLowerCase();
  if (DEFAULT_QUICK_CHIPS[normalizedKey]) {
    return DEFAULT_QUICK_CHIPS[normalizedKey];
  }
  if (normalizedKey.includes("excel")) return DEFAULT_QUICK_CHIPS.excel;
  if (normalizedKey.includes("python")) return DEFAULT_QUICK_CHIPS.python;
  if (normalizedKey.includes("c-") || normalizedKey === "c") return DEFAULT_QUICK_CHIPS["c-language"];
  if (normalizedKey.includes("dsa") || normalizedKey.includes("structure")) return DEFAULT_QUICK_CHIPS.dsa;
  if (normalizedKey.includes("tally") || normalizedKey.includes("account")) return DEFAULT_QUICK_CHIPS.tally;
  if (normalizedKey.includes("java-core") || normalizedKey.includes("icse") || normalizedKey.includes("isc") || normalizedKey.includes("java")) return DEFAULT_QUICK_CHIPS["java-core"];
  if (normalizedKey.includes("react")) return DEFAULT_QUICK_CHIPS.react;
  if (normalizedKey.includes("javascript") || normalizedKey.includes("node")) return DEFAULT_QUICK_CHIPS.javascript;
  if (normalizedKey.includes("unix") || normalizedKey.includes("linux")) return DEFAULT_QUICK_CHIPS.unix;
  if (normalizedKey.includes("mysql") || normalizedKey.includes("rdbms") || normalizedKey.includes("sql")) return DEFAULT_QUICK_CHIPS["rdbms-mysql"];
  if (normalizedKey.includes("quantitative") || normalizedKey.includes("pert") || normalizedKey.includes("math")) return DEFAULT_QUICK_CHIPS["quantitative-analysis"];
  return DEFAULT_QUICK_CHIPS.general;
}

// ============================================================================
// DEDICATED RESPONSE GENERATORS (FOR ADDRESS, TEACHERS, COURSES, HELPLINE)
// ============================================================================

export function getInstituteAddressResponse() {
  return `### 📍 Coder & AccoTax Official Address & Location

**Coder & AccoTax (Centre of Excellence)** is situated in Barrackpore, North 24 Parganas, Kolkata.

#### 🏢 Postal Address:
> **Coder & AccoTax**  
> **25(10/A) Shibtala Road, Nona Chandan Pukur**  
> **Barrackpore, Kolkata - 700122**  
> **District: North 24 Parganas, West Bengal, India**  
> *(PIN Code: 700122)*

---

#### 🗺️ Landmarks & How to Reach:
- **Nearest Railway Station:** **Barrackpore Railway Station** (Sealdah Main Line).
  - *Travel Distance:* Only **5 to 7 minutes** by Auto-rickshaw or Toto from Barrackpore Station Platform 1.
  - *Route:* Take an auto/toto to **Shibtala More (Nona Chandan Pukur)**.
- **Nearest Bus Stops:** Sukchar / Titagarh / Barrackpore Station Bus Terminus on BT Road & Ghoshpara Road.
- **Prominent Landmarks:** Near Nona Chandan Pukur Shibtala Temple, adjacent to the local market area and State Bank of India (SBI) Nona Chandan Pukur branch corridor.

---

#### 🕒 Campus Hours & Facilities:
- **Visiting / Office Hours:** Monday to Sunday: **8:00 AM – 8:30 PM**
- **Campus Facilities:**
  - 🖥️ High-speed computer lab with 1:1 dedicated student terminals.
  - ❄️ Fully Air-Conditioned classrooms & high-speed optical fiber WiFi.
  - ⚡ 100% Uninterrupted Power Backup (Inverter/Generator).
  - 📚 Offline library, live code visualizers, and project practice zones.

📞 **Need Directions or Pickup Assistance?** Call/WhatsApp our reception at **+91 94324 56083** or **+91 70037 56860**.`;
}

export function getTeachersDetailsResponse() {
  return `### 👨‍🏫 Distinguished Teachers & Mentors at Coder & AccoTax

Our faculty team brings decades of real-world corporate engineering, software architecture, and academic leadership to mentor every student individually:

---

#### 1. **Mr. Sukanta Hui**
- **Designation:** Founder, Director & Head of Technical Training
- **Academic & Industry Experience:** **28+ Years** of Excellence in Software Engineering, Financial Modeling & Architecture.
- **Subject Specializations:**
  - Full-Stack Web Development (JavaScript ES6+, React 19, Node.js, Express)
  - Advanced Python & Data Analytics (NumPy, Pandas, Matplotlib, Automation)
  - C, C++, Systems Programming & Object-Oriented Architecture
  - Advanced Microsoft Excel Masterclass (Dynamic Arrays, Power Query, DAX, VBA Macros)
- **Direct Contact:** 📱 **+91 70037 56860** | ✉️ \`sukantahui@codernaccotax.co.in\`

---

#### 2. **Ms. Tanusree Hui (CNAT Mam)**
- **Designation:** Academic Dean & Senior DSA / Mathematics Mentor
- **Experience:** **18+ Years** in Computer Science & Academic Mentorship
- **Subject Specializations:**
  - Data Structures & Algorithms (DSA, Trees, Graphs, Sorting, Big-O Complexity)
  - Computational Mathematics, Discrete Structures & Quantitative Reasoning
  - Java Core & Advanced (ICSE Class 9/10 & ISC Class 11/12 Board Toppers Mentor)
  - C Programming Foundations & Algorithmic Logic Building

---

#### 3. **Mr. Chandan Das**
- **Designation:** Senior Faculty — Corporate Accounting & Taxation
- **Experience:** **15+ Years** in Corporate Auditing & Financial Practice
- **Subject Specializations:**
  - TallyPrime with GST (CGST, SGST, IGST), TDS, TCS, and E-Way Billing
  - Corporate Bookkeeping, Final Accounts (P&L, Balance Sheet, Cash Flow)
  - Business Data Analytics & Commercial Auditing

---

#### 4. **Ms. Sreeparna Das**
- **Designation:** Mentor — Data Structures & Problem-Solving
- **Specializations:** Competitive programming, Algorithmic optimization, Recursion, Dynamic Programming, and technical interview preparation.

---

#### 5. **Ms. Mounita Bhandari & Ms. Ritaja Ghosh**
- **Designation:** Lab Instructors & Practical Student Coordinators
- **Specializations:** Hands-on lab guidance, real-time code debugging, assignment evaluation, and one-on-one student doubts clearance.

---

#### 6. **Mr. Sourav Bhattachariya**
- **Designation:** Faculty — Financial Accounting & Tally
- **Specializations:** Double-entry journal entries, bank reconciliations, inventory management, and statutory payroll accounting.

---

#### 🎯 Subject-Wise Mentor Quick Reference:
| Domain | Lead Mentor | Contact / Guidance |
| :--- | :--- | :--- |
| **Python / Web / React / Excel / C** | **Mr. Sukanta Hui** | \`+91 70037 56860\` |
| **DSA / Java / ICSE-ISC Boards** | **Ms. Tanusree Hui (CNAT Mam)** | Via Academic Desk |
| **TallyPrime / GST / Taxation** | **Mr. Chandan Das** | Via Helpline |
| **Lab Doubts & Practice** | **Ms. Mounita & Ms. Ritaja** | In-Lab Assistance |`;
}

export function getCoursesResponse() {
  return `### 📚 Comprehensive Courses & Certification Tracks Offered

**Coder & AccoTax (Centre of Excellence)** provides 100% practical, lab-first diploma, certificate, and academic semester courses tailored for students, job-seekers, and working professionals.

---

### 💻 1. Software Development & Programming Tracks:
1. **Full-Stack Web Engineering:**
   - HTML5, CSS3, Modern Tailwind CSS, JavaScript (ES6+ / Modern)
   - React 19 (Hooks, Context, State Management, Vite, Next.js intro)
   - Backend with Node.js, Express.js, RESTful APIs, MongoDB, and MySQL
2. **Python Programming & Data Analytics:**
   - Core Python, OOP, File Handling, Exception Handling
   - Data Analytics with NumPy, Pandas, Matplotlib, Seaborn, and Excel Integration
   - Web Scraping & Automation Scripts
3. **C & C++ Programming Masterclass:**
   - Pointers, Dynamic Memory Allocation (\`malloc\`/\`free\`), Structs, Typedef
   - Object-Oriented Programming (Classes, Inheritance, Polymorphism, Templates)
4. **Core & Advanced Java:**
   - Java 17/21, OOP 4 Pillars, Java Collections Framework (\`ArrayList\`, \`HashMap\`, \`TreeSet\`)
   - Exception Handling, Multi-threading, File I/O, JDBC Database Connectivity
5. **Data Structures & Algorithms (DSA):**
   - Arrays, Singly/Doubly Linked Lists, Stacks, Queues, Binary Search Trees (BST), AVL Trees
   - Graph Algorithms (BFS, DFS, Dijkstra), Dynamic Programming, Big-O Asymptotic Analysis
   - Coding Interview Prep (LeetCode & HackerRank pattern mastery)
6. **Database Engineering (RDBMS & MySQL):**
   - Relational Database Design, Normalization (1NF, 2NF, 3NF, BCNF)
   - Advanced SQL Queries, Joins (\`INNER\`, \`LEFT\`, \`RIGHT\`), Subqueries, Triggers, Views, Indexes
7. **Unix / Linux System Administration & Shell Scripting:**
   - Linux Terminal Commands, Octal \`chmod\` Permissions, Process Control (\`ps\`, \`kill\`, \`nohup\`)
   - Text Processing with \`grep\`, \`sed\`, and \`awk\`, Automated Bash Scripting

---

### 📊 2. Financial Accounting, Taxation & Spreadsheet Analytics:
1. **TallyPrime Ultra-Professional Diploma:**
   - Double-Entry Bookkeeping & 3 Golden Rules of Accounts
   - Complete GST Invoicing (CGST, SGST, IGST), TDS, TCS, Payroll, and E-Way Bills
   - Bank Reconciliation (BRS), Cost Centres, Inventory, and Balance Sheet Finalization
2. **Microsoft Excel Masterclass (Basic to Ultra-Expert):**
   - 500+ Formulas, Modern Lookups (\`XLOOKUP\`, \`INDEX-MATCH\`)
   - Dynamic Array Engine (\`FILTER\`, \`UNIQUE\`, \`SORT\`, \`SEQUENCE\`, \`LAMBDA\`)
   - Power Query ETL, Power Pivot Data Modeling, DAX Measures, and VBA Macros
   - Executive Dashboard Design & Financial Modeling
3. **Corporate GST & Income Tax Return Filing:**
   - Practical GSTR-1, GSTR-3B, Input Tax Credit (ITC) reconciliation, and IT Returns

---

### 🎓 3. Academic Boards & University Degree Programs:
- **School Boards:** ICSE Class 9 & 10 (Computer Applications) | ISC Class 11 & 12 (Computer Science) | CBSE & WB Board CS
- **University Semester Tuition:** BCA, MCA, B.Tech (CSE / IT / ECE), B.Sc (Computer Science / Data Science), B.Com (Computerized Accounting)

---

### 🌟 Key Highlights for Every Course:
- ✅ **100% Practical Lab Access** with 1-to-1 computer workstation.
- ✅ **ISO 9001:2015 Recognized Course Completion Certificate**.
- ✅ **Live Industry Projects & Git/GitHub Portfolio Building**.
- ✅ **Flexible Batches:** Weekday & Weekend slots (Morning, Afternoon & Evening).
- ✅ **Affordable Fees:** Easy monthly installment plans available.

📞 **To download detailed syllabus or book a Free Demo Class:**  
WhatsApp **+91 94324 56083** or Call **+91 70037 56860**.`;
}

export function getInstituteContactResponse() {
  return `### 📞 Coder & AccoTax Official Contact & Helpline

Here are the official contact and communication coordinates:

- **Primary WhatsApp & Admissions Helpline:** **+91 94324 56083** / **+91 70037 56860**
- **Academic Mentor Lead (Mr. Sukanta Hui):** **+91 70037 56860** / \`sukantahui@codernaccotax.co.in\`
- **General Inquiries:** \`info.codenaccotax@co.in\` | \`codenaccotax@gmail.com\`
- **Official Web Portal:** [www.codernaccotax.co.in](https://www.codernaccotax.co.in)
- **Campus Address:** 
  > **Coder & AccoTax (Centre of Excellence)**  
  > 25(10/A) Shibtala Road, Nona Chandan Pukur, Barrackpore, Kolkata - 700122, West Bengal, India  
  > *(Near Barrackpore Railway Station & Shibtala More)*

*CNAT Mam's Tip:* Feel free to WhatsApp your name and desired course to **+91 94324 56083** for instant brochure and batch timing assistance!`;
}

// ============================================================================
// KNOWLEDGE REPOSITORY & MATCHING SYSTEM
// ============================================================================

const KNOWLEDGE_BASE = [
  // --------------------------------------------------------------------------
  // 1. INSTITUTION, ADDRESS, FACULTY & COURSES
  // --------------------------------------------------------------------------
  {
    category: "institute_address",
    keywords: ["address", "location", "where is", "where located", "where are you", "situated", "landmark", "barrackpore", "shibtala", "pin code", "how to reach", "directions", "campus address", "office address", "orgnisation address", "organisation address", "institution address"],
    generate: () => getInstituteAddressResponse()
  },
  {
    category: "faculty_profiles",
    keywords: ["teacher", "teachers", "faculty", "instructor", "instructors", "mentor", "mentors", "educator", "sukanta", "sukanta sir", "tanusree", "tanusree mam", "cnat mam", "chandan", "chandan sir", "sreeparna", "mounita", "ritaja", "sourav", "who is teaching", "who teaches", "sir", "madam", "mam", "teachers details", "teacher details", "faculty details"],
    generate: () => getTeachersDetailsResponse()
  },
  {
    category: "courses_catalog",
    keywords: ["course", "courses", "subject", "subjects", "curriculum", "syllabus", "programs", "offer", "degrees", "diploma", "what do you teach", "what courses", "all courses", "courses offered", "training tracks", "certification", "certifications", "bca", "mca", "btech", "icse", "isc"],
    generate: () => getCoursesResponse()
  },
  {
    category: "institute_contact",
    keywords: ["contact", "phone", "number", "whatsapp", "call", "helpline", "reach", "telephone", "mobile", "mail", "email", "office phone", "helpline number"],
    generate: () => getInstituteContactResponse()
  },
  {
    category: "institute_about",
    keywords: ["about", "institute", "organisation", "organization", "centre of excellence", "accreditation", "iso", "cnat", "coder & accotax", "why choose"],
    generate: () => `### 🏢 About Coder & AccoTax (Centre of Excellence)

- **ISO 9001:2015 Certified** Premier IT & Financial Training Institution in Barrackpore, Kolkata.
- **Legacy of Trust:** Over **28+ years** of academic excellence mentoring thousands of B.Tech, BCA, MCA, ICSE/ISC, CBSE, and corporate professionals.
- **Core Pillars:**
  - 100% Practical, Lab-First Curriculum with industry-standard assignments.
  - One-on-One Doubt Clearance and real-world project portfolios.
  - Dual Focus: High-Tech Software Development + Professional Financial Accounting.
  - Modern In-Browser Learning Tools: Interactive IDEs, Code Playgrounds, Visualizers, and Quiz Engines.`
  },
  {
    category: "admission_fees",
    keywords: ["admission", "admissions", "fee", "fees", "cost", "enroll", "enrollment", "join", "batch", "timing", "timings", "class time", "offline", "online", "installment", "fee structure"],
    generate: () => `### 🎓 Admissions & Batch Information

- **How to Enroll:**
  1. Visit our Barrackpore campus or submit an inquiry via WhatsApp at **+91 94324 56083**.
  2. Take a free counseling & demo session with our senior faculty.
  3. Choose your batch schedule (Weekday & Weekend slots available for students & working professionals).
- **Flexible Fee Structure:**
  - Affordable monthly installment plans available for all diploma and certificate courses.
  - Includes full access to physical computer labs, digital study roadmaps, interactive quizzes, and verified certificates.
- **Batch Formats:** Offline classroom labs at Barrackpore & Live interactive online mentorship.`
  },

  // --------------------------------------------------------------------------
  // 2. MICROSOFT EXCEL & SPREADSHEET KNOWLEDGE
  // --------------------------------------------------------------------------
  {
    category: "excel_lookups",
    keywords: ["vlookup", "xlookup", "index match", "hlookup", "lookup", "lookup value", "table array"],
    generate: () => `### 🔍 Excel Lookup Master Guide: XLOOKUP vs VLOOKUP vs INDEX-MATCH

Here is how modern lookup functions compare:

#### 1. \`XLOOKUP\` *(Recommended in Excel 365 / 2021+)*:
\`\`\`excel
=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])
\`\`\`
- **Advantages:** Works in any direction (left or right), defaults to exact match (no more \`FALSE\` needed), built-in \`if_not_found\` guard, and never breaks if columns are inserted.
- **Example:** \`=XLOOKUP(E2, A2:A100, C2:C100, "Not Found")\`

#### 2. \`INDEX-MATCH\` *(Universal legacy best practice)*:
\`\`\`excel
=INDEX(return_range, MATCH(lookup_value, lookup_range, 0))
\`\`\`
- Extremely fast for massive datasets and immune to column insertion breakage.

#### 3. \`VLOOKUP\` *(Legacy function)*:
\`\`\`excel
=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])
\`\`\`
- **Limitation:** Can only look from left to right. Always supply \`FALSE\` (or \`0\`) for exact match to avoid silent errors.`
  },
  {
    category: "excel_dynamic_arrays",
    keywords: ["filter", "unique", "sort", "sortby", "sequence", "randarray", "dynamic array", "spill", "#spill!", "spill operator", "#"],
    generate: () => `### ⚡ Excel Dynamic Arrays & Spill Engine (Excel 365+)

Dynamic array formulas automatically spill calculation results across adjacent cells without needing \`Ctrl+Shift+Enter\`.

1. **\`FILTER(array, include, [if_empty])\`**:
   \`\`\`excel
   =FILTER(A2:D100, C2:C100 = "Kolkata", "No Records Found")
   \`\`\`
2. **\`UNIQUE(array, [by_col], [exactly_once])\`**:
   \`\`\`excel
   =UNIQUE(B2:B100)
   \`\`\`
3. **\`SORT(array, [sort_index], [sort_order])\`**:
   \`\`\`excel
   =SORT(FILTER(A2:D50, D2:D50 > 50000), 4, -1)
   \`\`\`
4. **Fixing \`#SPILL!\` Error:**
   - Make sure all downstream and rightward cells in the spill range are completely blank. Clear any obstruction, formatted blank spaces, or merged cells.`
  },
  {
    category: "excel_math_aggregations",
    keywords: ["sumifs", "countifs", "averageifs", "sumproduct", "maxifs", "minifs", "aggregation", "aggregate"],
    generate: () => `### 🧮 Multi-Condition Aggregation Formulas in Excel

1. **\`SUMIFS(sum_range, criteria_range1, criteria1, ...)\`**:
\`\`\`excel
=SUMIFS(D2:D100, A2:A100, "North", B2:B100, ">=2026-01-01")
\`\`\`
*Note:* In \`SUMIFS\`, the \`sum_range\` comes **first**, unlike legacy \`SUMIF\` where it was last!

2. **\`COUNTIFS(criteria_range1, criteria1, ...)\`**:
\`\`\`excel
=COUNTIFS(C2:C100, "Delivered", E2:E100, ">5000")
\`\`\`

3. **\`SUMPRODUCT(array1, [array2], ...)\`**:
\`\`\`excel
=SUMPRODUCT((A2:A100="IT") * (B2:B100="Senior"), C2:C100, D2:D100)
\`\`\`
- Evaluates multi-criteria array multiplications without requiring an explicit array entry shortcut.`
  },
  {
    category: "excel_error_handling",
    keywords: ["#value!", "#n/a", "#ref!", "#num!", "#calc!", "iferror", "ifna", "error in excel", "formula error"],
    generate: () => `### 🛠️ Excel Error Troubleshooting & Prevention Guide

| Error Code | Root Cause | Solution & Defensive Guard |
| :--- | :--- | :--- |
| **\`#N/A\`** | Lookup value does not exist in table array. | Use \`=XLOOKUP(..., "Not Found")\` or \`=IFNA(VLOOKUP(...), "Not Found")\`. |
| **\`#VALUE!\`** | Data type mismatch (e.g. attempting to add text to a number). | Ensure numeric columns are formatted as Numbers using \`VALUE()\` or \`NUMBERVALUE()\`. |
| **\`#REF!\`** | Cell reference was deleted or invalid. | Re-link target cells or replace with dynamic Index/XLookup references. |
| **\`#SPILL!\`** | Dynamic array is blocked by existing data or merged cells. | Clear all obstructing cells in the spill boundary. |
| **\`#DIV/0!\`** | Denominator is zero or blank cell. | Wrap with \`=IF(B2=0, 0, A2/B2)\` or \`=IFERROR(A2/B2, 0)\`. |`
  },

  // --------------------------------------------------------------------------
  // 3. PYTHON & DATA SCIENCE KNOWLEDGE
  // --------------------------------------------------------------------------
  {
    category: "python_core",
    keywords: ["python", "list", "tuple", "dict", "dictionary", "set", "comprehension", "lambda", "generator", "decorator", "args", "kwargs"],
    generate: () => `### 🐍 Python Core Programming Mastery

1. **Core Data Structures Comparison:**
   - **List (\`[]\`):** Mutable, ordered, allows duplicates (\`[1, 2, 2, 3]\`).
   - **Tuple (\`()\`):** Immutable, ordered, hashable (\`(10, 20)\`). Ideal for fixed records.
   - **Set (\`{}\`):** Mutable, unordered, **unique elements only** (\`{1, 2, 3}\`).
   - **Dictionary (\`{k: v}\`):** Key-Value hash map, keys must be immutable/hashable.

2. **List & Dict Comprehensions:**
\`\`\`python
# Squared even numbers:
evens_squared = [x**2 for x in range(20) if x % 2 == 0]

# Word length map:
words = ["Coder", "AccoTax", "Barrackpore"]
length_map = {w: len(w) for w in words}
\`\`\`

3. **Decorators in Python:**
\`\`\`python
def log_execution(func):
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}...")
        res = func(*args, **kwargs)
        print(f"Completed {func.__name__} -> {res}")
        return res
    return wrapper

@log_execution
def add(a, b): return a + b
\`\`\``
  },
  {
    category: "python_pandas_numpy",
    keywords: ["pandas", "dataframe", "series", "numpy", "groupby", "read_csv", "loc", "iloc", "fillna", "dropna", "array", "data analytics"],
    generate: () => `### 📊 Python Data Analytics with Pandas & NumPy

1. **Essential Pandas Operations:**
\`\`\`python
import pandas as pd
import numpy as np

# Load dataset:
df = pd.read_csv("student_scores.csv")

# Filtering and Column selection:
toppers = df.loc[df["score"] >= 90, ["name", "subject", "score"]]

# GroupBy Aggregation:
summary = df.groupby("subject")["score"].agg(["mean", "max", "count"]).reset_index()

# Handling Missing Values:
df["score"] = df["score"].fillna(df["score"].median())
\`\`\`

2. **NumPy Vectorized Operations:**
\`\`\`python
arr = np.array([10, 20, 30, 40, 50])
# 10x faster than python loops:
normalized = (arr - arr.mean()) / arr.std()
\`\`\``
  },

  // --------------------------------------------------------------------------
  // 4. DATA STRUCTURES & ALGORITHMS (DSA) & C/C++
  // --------------------------------------------------------------------------
  {
    category: "dsa_big_o",
    keywords: ["big-o", "time complexity", "space complexity", "asymptotic", "o(1)", "o(n)", "o(log n)", "o(n log n)", "o(n^2)"],
    generate: () => `### ⏱️ Asymptotic Analysis & Big-O Reference

- **$O(1)$ Constant Time:** Array index access, Hash Table lookup (average), Push/Pop on Stack.
- **$O(\\log N)$ Logarithmic Time:** Binary Search on sorted arrays, Balanced BST operations (AVL, Red-Black).
- **$O(N)$ Linear Time:** Array linear traversal, finding element in unsorted list.
- **$O(N \\log N)$ Linearithmic:** Efficient sorting algorithms (**Merge Sort**, **Heap Sort**, **Quick Sort** average).
- **$O(N^2)$ Quadratic Time:** Nested loops, Bubble Sort, Insertion Sort, Selection Sort.

*CNAT Mam's Tip:* Always consider both **Worst-Case Time** and **Auxiliary Space Complexity** when designing algorithms in interviews!`
  },
  {
    category: "dsa_linked_lists",
    keywords: ["linked list", "singly linked list", "doubly linked list", "node", "head", "tail", "reverse linked list"],
    generate: () => `### 🔗 Linked List Foundations in DSA

A Linked List is a linear dynamic data structure where elements (nodes) contain data and pointers to the next node:

\`\`\`c
struct Node {
    int data;
    struct Node *next;
};

// Reversing a Singly Linked List in O(N) time and O(1) space:
struct Node* reverseList(struct Node* head) {
    struct Node *prev = NULL, *curr = head, *next = NULL;
    while (curr != NULL) {
        next = curr->next; // Save next node
        curr->next = prev; // Reverse current node's pointer
        prev = curr;       // Move prev forward
        curr = next;       // Move curr forward
    }
    return prev; // New head
}
\`\`\`
- **Comparison with Arrays:** Linked Lists offer $O(1)$ insertions/deletions given a node reference and dynamic sizing, but lack $O(1)$ random access (traversal is $O(N)$).`
  },
  {
    category: "dsa_trees",
    keywords: ["tree", "binary tree", "binary search tree", "bst", "avl tree", "inorder", "preorder", "postorder", "balancing", "rotation"],
    generate: () => `### 🌳 Trees & Binary Search Trees (BST)

- **Binary Tree Property:** Each node has at most 2 children (left and right).
- **BST Invariant:** For every node $X$:
  - All nodes in $X$'s left subtree have values $< X.val$.
  - All nodes in $X$'s right subtree have values $> X.val$.

#### Tree Traversals:
- **Inorder (Left, Root, Right):** Produces elements of a BST in **sorted ascending order**!
- **Preorder (Root, Left, Right):** Used to clone/serialize a tree.
- **Postorder (Left, Right, Root):** Used to delete/free tree memory bottom-up.

#### AVL Tree Balancing:
- Self-balancing BST where the Balance Factor for every node is $BF = \\text{height}(L) - \\text{height}(R) \\in \\{-1, 0, +1\\}$.
- Restores balance in $O(\\log N)$ using **LL, RR, LR, and RL rotations**.`
  },
  {
    category: "dsa_sorting",
    keywords: ["quicksort", "mergesort", "bubble sort", "insertion sort", "selection sort", "heapsort", "sorting", "sort algorithm"],
    generate: () => `### 🔄 Sorting Algorithms Master Comparison

| Algorithm | Best Time | Average Time | Worst Time | Space | Stable? |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Merge Sort** | $O(N \\log N)$ | $O(N \\log N)$ | $O(N \\log N)$ | $O(N)$ | **Yes** |
| **Quick Sort** | $O(N \\log N)$ | $O(N \\log N)$ | $O(N^2)$ *(bad pivot)* | $O(\\log N)$ | No |
| **Heap Sort** | $O(N \\log N)$ | $O(N \\log N)$ | $O(N \\log N)$ | $O(1)$ | No |
| **Insertion Sort** | $O(N)$ *(sorted)* | $O(N^2)$ | $O(N^2)$ | $O(1)$ | **Yes** |
| **Bubble Sort** | $O(N)$ *(optimized)*| $O(N^2)$ | $O(N^2)$ | $O(1)$ | **Yes** |

*CNAT Mam's Tip:* **Merge Sort** is preferred for Linked Lists and when stability is mandatory. **Quick Sort** with randomized pivot is usually faster in practice for contiguous arrays due to superior cache locality.`
  },
  {
    category: "c_pointers_memory",
    keywords: ["pointer", "pointers", "malloc", "calloc", "free", "realloc", "memory leak", "segmentation fault", "struct", "typedef", "c language", "c programming"],
    generate: () => `### 📌 C Programming: Pointers & Dynamic Memory Management

Pointers store the memory addresses of other variables.

1. **Pointer Basics:**
\`\`\`c
int a = 42;
int *ptr = &a; // ptr stores memory address of a
printf("Address: %p, Value: %d\n", (void*)ptr, *ptr); // *ptr dereferences value
\`\`\`

2. **Dynamic Memory Allocation (Heap):**
- \`malloc(size_t size)\`: Allocates uninitialized memory buffer.
- \`calloc(size_t n, size_t size)\`: Allocates memory and initializes every byte to \`0\`.
- \`realloc(void *ptr, size_t new_size)\`: Resizes existing memory block.
- \`free(void *ptr)\`: Deallocates memory to prevent **memory leaks**.

\`\`\`c
int *arr = (int*)malloc(5 * sizeof(int));
if (arr == NULL) {
    printf("Memory Allocation Failed!\n");
    return 1;
}
for(int i=0; i<5; i++) arr[i] = (i+1) * 10;

free(arr); // Always free heap allocations!
arr = NULL; // Prevent dangling pointer
\`\`\``
  },

  // --------------------------------------------------------------------------
  // 5. JAVA (CORE, ICSE/ISC & ADVANCED)
  // --------------------------------------------------------------------------
  {
    category: "java_oop",
    keywords: ["java", "oop", "inheritance", "polymorphism", "encapsulation", "abstraction", "interface", "abstract class", "jvm", "jre", "jdk", "garbage collection"],
    generate: () => `### ☕ Java: 4 Pillars of Object-Oriented Programming (OOP)

1. **Encapsulation:** Wrapping data (fields) and methods together, shielding direct access via \`private\` modifiers and providing \`getters/setters\`.
2. **Inheritance:** Mechanism where a subclass inherits state and behaviors from a superclass using the \`extends\` keyword (\`class Dog extends Animal\`).
3. **Polymorphism:** Ability of objects to take many forms:
   - *Compile-Time (Static):* Method Overloading (same method name, different parameter signature).
   - *Runtime (Dynamic):* Method Overriding (subclass provides specific implementation of inherited superclass method with \`@Override\`).
4. **Abstraction:** Hiding internal implementation details and exposing only essential interfaces using \`abstract\` classes and \`interface\`.

*Abstract Class vs Interface (Java 8+):*
- Abstract classes can have state (instance variables) and constructors.
- Interfaces define pure contracts (though Java 8+ allows \`default\` and \`static\` methods). A class can implement multiple interfaces (multiple inheritance of type).`
  },
  {
    category: "java_collections",
    keywords: ["arraylist", "hashmap", "hashset", "linkedlist", "collections", "iterator", "comparable", "comparator", "generics"],
    generate: () => `### 📦 Java Collections Framework Quick Reference

- **\`List<T>\` (Ordered, Allows Duplicates):**
  - \`ArrayList\`: Resizable array. Fast $O(1)$ random access, slow $O(N)$ arbitrary insertions/deletions.
  - \`LinkedList\`: Doubly linked list. Fast $O(1)$ insertions/deletions given node pointer.
- **\`Set<T>\` (No Duplicates):**
  - \`HashSet\`: Fast $O(1)$ lookups backed by hash table. Unordered.
  - \`TreeSet\`: Red-Black tree implementation. Elements sorted in ascending order ($O(\\log N)$ operations).
- **\`Map<K, V>\` (Key-Value Pairs):**
  - \`HashMap\`: Key hashing, allows one \`null\` key.
  - \`TreeMap\`: Sorted keys based on natural order or custom \`Comparator\`.`
  },

  // --------------------------------------------------------------------------
  // 6. JAVASCRIPT & REACT 19
  // --------------------------------------------------------------------------
  {
    category: "react_hooks",
    keywords: ["react", "usestate", "useeffect", "usememo", "usecallback", "useref", "custom hook", "react 19", "props", "state", "jsx", "virtual dom"],
    generate: () => `### ⚛️ React 19 & Modern Hooks Guide

1. **\`useState(initialState)\`**: Manages component-local reactive state.
\`\`\`jsx
const [count, setCount] = useState(0);
// Updater function pattern for race-safe updates:
setCount(prev => prev + 1);
\`\`\`

2. **\`useEffect(callback, dependencies)\`**: Handles side-effects (API calls, subscriptions, DOM listeners).
\`\`\`jsx
useEffect(() => {
  const timer = setInterval(() => console.log("Tick"), 1000);
  return () => clearInterval(timer); // Cleanup function
}, []); // Empty dependency array = runs once on mount
\`\`\`

3. **\`useMemo\` vs \`useCallback\` (Performance Optimization):**
   - \`useMemo(() => computeExpensiveValue(a, b), [a, b])\`: Caches the **computed result value**.
   - \`useCallback(() => { doSomething(a); }, [a])\`: Caches the **function definition instance** to prevent unnecessary child re-renders.

4. **\`useRef(initialValue)\`**: Holds a mutable reference that persists across re-renders without triggering a UI re-render (perfect for DOM node references or timers).`
  },
  {
    category: "js_async_closures",
    keywords: ["javascript", "closure", "closures", "promise", "promises", "async", "await", "event loop", "callback", "let vs var", "arrow function", "destructuring"],
    generate: () => `### 💛 Modern JavaScript: Closures & Asynchronous Execution

1. **Closures:** A closure is a function that retains access to its lexical scope even when executed outside that scope.
\`\`\`javascript
function createCounter() {
  let count = 0; // Private variable encapsulated in closure
  return () => ++count;
}
const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
\`\`\`

2. **Promises & \`async/await\`:**
\`\`\`javascript
async function fetchStudentData(studentId) {
  try {
    const response = await fetch(\`/api/students/\${studentId}\`);
    if (!response.ok) throw new Error("Network request failed");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
\`\`\`

3. **Event Loop & Microtask Queue:**
   - Synchronous code executes first on Call Stack -> Microtasks (\`Promise.then\`, \`queueMicrotask\`) -> Macrotasks (\`setTimeout\`, \`setInterval\`, I/O).`
  },

  // --------------------------------------------------------------------------
  // 7. TALLYPRIME & CORPORATE ACCOUNTING
  // --------------------------------------------------------------------------
  {
    category: "tally_accounting",
    keywords: ["tally", "tallyprime", "debit", "credit", "golden rule", "golden rules", "journal", "ledger", "trial balance", "balance sheet", "gst", "cgst", "sgst", "igst", "voucher", "tds", "f4", "f5", "f6", "f7", "f8", "f9", "contra", "payment", "receipt"],
    generate: () => `### 📑 TallyPrime & Financial Accounting Essentials

#### 1. The 3 Golden Rules of Double-Entry Bookkeeping:
1. **Personal Accounts** *(Persons, Firms, Companies)*:
   - **Debit the Receiver**, **Credit the Giver**.
2. **Real Accounts** *(Tangible & Intangible Assets, Cash, Furniture)*:
   - **Debit what comes in**, **Credit what goes out**.
3. **Nominal Accounts** *(Expenses, Incomes, Losses, Gains)*:
   - **Debit all expenses & losses**, **Credit all incomes & gains**.

#### 2. TallyPrime Essential Voucher Shortcut Keys:
- **\`F4 (Contra)\`**: Cash & Bank internal transfers (e.g. Cash deposited into SBI).
- **\`F5 (Payment)\`**: All cash/bank payments for expenses or suppliers.
- **\`F6 (Receipt)\`**: All cash/bank incoming funds received.
- **\`F7 (Journal)\`**: Non-cash adjustment & depreciation entries.
- **\`F8 (Sales)\`**: Recording sales invoices (with GST).
- **\`F9 (Purchase)\`**: Recording purchase invoices (with Input Tax Credit).

#### 3. GST Taxation Breakdown:
- **Intra-State (Within West Bengal):** CGST (Central) + SGST (State) split 50:50.
- **Inter-State (Outside State, e.g. WB to Delhi):** Full IGST (Integrated GST) applied.`
  },

  // --------------------------------------------------------------------------
  // 8. DATABASE SYSTEMS & MYSQL (RDBMS)
  // --------------------------------------------------------------------------
  {
    category: "rdbms_sql",
    keywords: ["sql", "mysql", "rdbms", "primary key", "foreign key", "normalization", "1nf", "2nf", "3nf", "bcnf", "join", "inner join", "left join", "group by", "having", "acid", "transaction", "index"],
    generate: () => `### 🗄️ Database Management Systems (RDBMS & MySQL)

1. **Database Normalization Tiers:**
   - **1NF (First Normal Form):** Atomic values only (no repeating groups or multi-valued arrays).
   - **2NF (Second Normal Form):** In 1NF + **No partial functional dependency** (every non-prime attribute fully depends on the whole primary key).
   - **3NF (Third Normal Form):** In 2NF + **No transitive dependency** ($X \\to Y \\to Z$).
   - **BCNF (Boyce-Codd Normal Form):** For every functional dependency $X \\to Y$, $X$ must be a Super Key.

2. **SQL Joins Simplified:**
   - **\`INNER JOIN\`**: Returns only matching records from both tables.
   - **\`LEFT JOIN\`**: Returns all rows from left table + matched rows from right table (fills \`NULL\` if no match).
   - **\`GROUP BY\` with \`HAVING\`**: \`WHERE\` filters rows before aggregation; \`HAVING\` filters aggregated groups (\`HAVING count(*) > 5\`).

3. **ACID Properties of Transactions:**
   - **Atomicity:** All-or-nothing execution.
   - **Consistency:** Database transitions from one valid state to another.
   - **Isolation:** Concurrent transactions execute without interference.
   - **Durability:** Committed transactions persist even after system crash.`
  },

  // --------------------------------------------------------------------------
  // 9. UNIX / LINUX SYSTEM ADMINISTRATION
  // --------------------------------------------------------------------------
  {
    category: "unix_linux",
    keywords: ["unix", "linux", "chmod", "grep", "sed", "awk", "permissions", "rwx", "ps", "kill", "top", "nohup", "shell", "bash", "vi", "vim", "pipe", "|", "tar", "find"],
    generate: () => `### 🐧 Unix & Linux Terminal Superguide

1. **File Permissions & \`chmod\` (Octal Mode):**
   - Permissions: Read (\`r=4\`), Write (\`w=2\`), Execute (\`x=1\`).
   - Triplets: **Owner | Group | Others**
   - *Example:* \`chmod 755 script.sh\` (Owner: \`rwx=7\`, Group: \`r-x=5\`, Others: \`r-x=5\`).
   - *Example:* \`chmod 644 document.txt\` (Owner: \`rw-=6\`, Group: \`r--=4\`, Others: \`r--=4\`).

2. **The Big-Three Text Processors:**
   - **\`grep "pattern" file.txt\`**: Global Regular Expression Print (searches matching lines).
   - **\`sed 's/old/new/g' file.txt\`**: Stream Editor (find and replace text non-interactively).
   - **\`awk '{print $1, $3}' file.txt\`**: Pattern scanning and column reporting engine.

3. **Process Management & Background Jobs:**
   - \`ps aux | grep node\`: Lists active processes.
   - \`kill -9 <PID>\`: Force terminates a process.
   - \`command &\`: Runs job asynchronously in background.
   - \`nohup ./job.sh &\`: Keeps process running even after terminal session disconnects.`
  },

  // --------------------------------------------------------------------------
  // 10. QUANTITATIVE ANALYSIS & OPERATIONS RESEARCH
  // --------------------------------------------------------------------------
  {
    category: "quant_operations_research",
    keywords: ["pert", "cpm", "critical path", "float", "slack", "linear programming", "lpp", "simplex", "game theory", "saddle point", "minimax", "maximin", "transportation problem", "assignment problem", "hungarian"],
    generate: () => `### 📈 Quantitative Analysis & Operations Research

1. **Project Network Analysis: PERT vs CPM:**
   - **CPM (Critical Path Method):** Deterministic time estimates. Finds the longest sequence of dependent activities (Critical Path) with **Total Float = 0**.
   - **PERT (Program Evaluation & Review Technique):** Probabilistic 3-time estimates:
     $$\\text{Expected Time } t_e = \\frac{a + 4m + b}{6}, \\quad \\text{Variance } \\sigma^2 = \\left(\\frac{b - a}{6}\\right)^2$$
     *(where $a$ = optimistic, $m$ = most likely, $b$ = pessimistic time)*.

2. **Game Theory Principles:**
   - **Maximin = Minimax Principle:** If the maximin value of the row player equals the minimax value of the column player, a **Saddle Point** exists (Pure Strategy).
   - **Dominance Rule:** If Strategy A provides equal or superior payoffs to Strategy B under all opponent moves, Strategy B can be eliminated.`
  },

  // --------------------------------------------------------------------------
  // 11. COMPUTER NETWORKS & CYBER SECURITY
  // --------------------------------------------------------------------------
  {
    category: "networking_security",
    keywords: ["osi", "tcp", "udp", "ip", "subnet", "dns", "http", "https", "router", "switch", "firewall", "encryption", "aes", "rsa", "hash", "sha-256", "cia triad", "phishing", "cyber security", "network"],
    generate: () => `### 🌐 Computer Networks & Cyber Security Essentials

1. **The 7 Layers of the OSI Model:**
   - **7. Application** (HTTP, DNS, FTP, SMTP) -> **6. Presentation** (SSL/TLS, ASCII) -> **5. Session** (Sockets, RPC) -> **4. Transport** (TCP, UDP) -> **3. Network** (IP, Routers) -> **2. Data Link** (Ethernet, MAC, Switches) -> **1. Physical** (Cables, Bits).

2. **TCP vs UDP:**
   - **TCP (Transmission Control Protocol):** Connection-oriented (3-Way Handshake SYN -> SYN-ACK -> ACK), reliable, ordered, error-checked (used for Web, Email, File transfer).
   - **UDP (User Datagram Protocol):** Connectionless, lightweight, no retransmissions (used for Video Streaming, Gaming, DNS, VoIP).

3. **Cyber Security: CIA Triad & Cryptography:**
   - **Confidentiality:** Keeping data private via encryption (**AES-256** symmetric, **RSA** asymmetric).
   - **Integrity:** Ensuring data is untampered via cryptographic hashing (**SHA-256**, digital signatures).
   - **Availability:** Ensuring continuous service uptime (mitigating DDoS with firewalls & redundancy).`
  }
=======
export const QUICK_PROMPT_CHIPS = [
  { label: "💡 Explain Current Topic", query: "Can you explain the main concepts of this topic in simple terms?" },
  { label: "📝 Lab Assignments", query: "How do I submit practical lab assignments and homework?" },
  { label: "🎯 Viva & Exam Tips", query: "What are the key tips for practical exams and viva tests?" },
  { label: "🛠️ Clear Doubts", query: "How do I clear my doubts during lab hours?" },
  { label: "📞 Teacher Contact", query: "Can you provide teacher contact number and communication details?" },
  { label: "🏢 Organisation Details", query: "Tell me about Coder & AccoTax institute, campus location and accreditation." },
  { label: "🎓 Courses Offered", query: "What courses and modules are taught at Coder & AccoTax?" },
  { label: "📊 Online Marksheets", query: "Where can I take online mock tests and view my performance marksheets?" },
>>>>>>> 84aa6c160f520e904c4e827af36e7e6027b7c550
];

// ============================================================================
// DYNAMIC TOPIC-AWARE SYNTHESIZER & INTENT EVALUATOR
// ============================================================================

export function getCNATMamResponse(userQuery, context = {}) {
  const rawQ = String(userQuery || "").trim();
  const q = rawQ.toLowerCase();
  const currentTopic = context.topicTitle || "Curriculum Masterclass";
  const subjectKey = String(context.subjectKey || "general").toLowerCase();

  if (!q) {
    return `Hello dear student! How can I assist you with **${currentTopic}**, institute address, teachers details, courses, or programming and accounting questions today?`;
  }

  // --------------------------------------------------------------------------
  // 0. EXPLICIT HIGH-PRIORITY INTENT CHECKS (ADDRESS, TEACHERS, COURSES, CONTACT)
  // --------------------------------------------------------------------------
  // Check for Address Intent
  if (
    q.includes("address") ||
    q.includes("location") ||
    q.includes("where is") ||
    q.includes("where are you") ||
    q.includes("where located") ||
    q.includes("situated") ||
    q.includes("how to reach") ||
    q.includes("direction") ||
    q.includes("landmark") ||
    q.includes("shibtala") ||
    q.includes("barrackpore campus") ||
    q.includes("pin code") ||
    q.includes("pincode") ||
    q.includes("orgnisation") ||
    q.includes("organisation")
  ) {
    // If specifically asking about teachers and address in same query, give combined or address
    if (q.includes("teacher") || q.includes("faculty")) {
      return `${getInstituteAddressResponse()}\n\n---\n\n${getTeachersDetailsResponse()}`;
    }
    if (q.includes("course")) {
      return `${getInstituteAddressResponse()}\n\n---\n\n${getCoursesResponse()}`;
    }
    return getInstituteAddressResponse();
  }

  // Check for Teachers / Faculty Intent
  if (
    q.includes("teacher") ||
    q.includes("teachers") ||
    q.includes("faculty") ||
    q.includes("instructor") ||
    q.includes("instructors") ||
    q.includes("mentor") ||
    q.includes("mentors") ||
    q.includes("educator") ||
    q.includes("who is teaching") ||
    q.includes("who teaches") ||
    q.includes("sukanta sir") ||
    q.includes("sukanta hui") ||
    q.includes("tanusree mam") ||
    q.includes("chandan sir") ||
    q.includes("chandan das") ||
    q.includes("sreeparna") ||
    q.includes("mounita") ||
    q.includes("ritaja") ||
    q.includes("sourav")
  ) {
    if (q.includes("course")) {
      return `${getTeachersDetailsResponse()}\n\n---\n\n${getCoursesResponse()}`;
    }
    return getTeachersDetailsResponse();
  }

  // Check for Courses Intent
  if (
    q.includes("course") ||
    q.includes("courses") ||
    q.includes("curriculum") ||
    q.includes("syllabus") ||
    q.includes("programs") ||
    q.includes("what do you teach") ||
    q.includes("what courses") ||
    q.includes("all courses") ||
    q.includes("courses offered") ||
    q.includes("training tracks") ||
    q.includes("degrees") ||
    q.includes("diploma") ||
    q.includes("certification") ||
    q.includes("certifications")
  ) {
    return getCoursesResponse();
  }

  // Check for Helpline / Contact Intent
  if (
    q.includes("helpline") ||
    q.includes("whatsapp number") ||
    q.includes("phone number") ||
    q.includes("mobile number") ||
    q.includes("call") ||
    q.includes("contact number")
  ) {
    return getInstituteContactResponse();
  }

  // --------------------------------------------------------------------------
  // 1. EVALUATE PREDEFINED KNOWLEDGE BASE BY WEIGHTED KEYWORD SCORING
  // --------------------------------------------------------------------------
  let bestMatch = null;
  let highestScore = 0;

  for (const entry of KNOWLEDGE_BASE) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (q === kw) {
        score += 15; // Exact single-word match
      } else if (q.includes(kw)) {
        score += kw.length > 4 ? 6 : 3; // Weighted by keyword specificity
      }
    }
    if (score > highestScore) {
      highestScore = score;
      bestMatch = entry;
    }
  }

  // If high confidence match found in knowledge base
  if (bestMatch && highestScore >= 5) {
    return bestMatch.generate(context);
  }

  // --------------------------------------------------------------------------
  // 2. CONTEXTUAL "EXPLAIN THIS TOPIC" / "HOW TO" / "FORMULA" DETECTION
  // --------------------------------------------------------------------------
  if (
    q.includes("explain") ||
    q.includes("summary") ||
    q.includes("what is this") ||
    q.includes("help") ||
    q.includes("how to") ||
    q.includes("concept") ||
    q.includes("example") ||
    q.includes("tutorial") ||
    q.includes("notes")
  ) {
    return `### 💡 Mentor Guide for: ${currentTopic}

Dear student, here is the structured conceptual breakdown for **"${currentTopic}"**:

1. **Fundamental Objective:**
   - Master the core mechanical rules, syntax, and step-by-step logic governing this topic.
   - Learn how to structure inputs cleanly to ensure edge-case safety.

2. **Industrial Best Practices:**
   - In real-world enterprise environments (whether coding in C/Python/React or building financial models in Excel/Tally), always prioritize **clean data hygiene and defensive validation**.
   - Test your logic with boundary conditions (empty inputs, zero, negative values, or unexpected string formats).

3. **Step-by-Step Action Plan:**
   - **Step 1:** Review the syntax cards and visual calculation diagrams on this page.
   - **Step 2:** Try running and modifying the code / formula in the interactive live editor or downloadable practice sheet.
   - **Step 3:** Test your retention by completing the 30-question practice test in the Quiz section below.

*CNAT Mam's Mentorship Note:* If you encounter any specific error or edge-case doubt while practicing **${currentTopic}**, send me the exact function name or code snippet and I will debug it for you!`;
  }

  // --------------------------------------------------------------------------
  // 3. EXAM / VIVA / INTERVIEW TIPS
  // --------------------------------------------------------------------------
  if (q.includes("exam") || q.includes("viva") || q.includes("interview") || q.includes("question") || q.includes("test")) {
    return `### 📝 CNAT Mam's Top Exam & Viva Checklist for ${currentTopic}

When appearing for academic examinations, lab vivas, or technical interviews, keep these golden rules in mind:

1. **Explain the "Why" Before the "How":**
   - Don't just recite code syntax or formula names. Explain *why* a particular approach is chosen over alternatives (e.g. why XLOOKUP replaces VLOOKUP, why Binary Search is $O(\\log N)$, or why Normalization reduces redundancy).

2. **Highlight Edge Cases & Error Handling:**
   - Discuss defensive guards such as \`IFERROR()\` in spreadsheets, \`try-catch\` in Java/Python, or \`NULL\` pointer checks in C.

3. **Demonstrate Time & Memory Awareness:**
   - In programming and database questions, state the Big-O time complexity and space trade-offs clearly.

*Need practice questions?* Check the interactive Practice Questions and Quiz engine integrated at the bottom of this topic page!`;
  }

  // --------------------------------------------------------------------------
  // 4. GENERAL FAQ DATABASE LOOKUP
  // --------------------------------------------------------------------------
  const faqMatch = findMatchingFAQResponse(userQuery, context);
  if (faqMatch) {
    return faqMatch;
  }

  // --------------------------------------------------------------------------
  // 5. INTELLIGENT DYNAMIC TOPIC-GROUNDED FALLBACK
  // --------------------------------------------------------------------------
  return `### 🎓 CNAT Mam Academic Assistance

Dear student, you asked: **"${rawQ}"** regarding **${currentTopic}**.

Here is my mentorship guidance:

- **Key Focus Area:** When studying **${currentTopic}** in our **${subjectKey.toUpperCase()}** curriculum, always make sure you understand the underlying computational or arithmetic mechanism before writing code or formulas.
- **Practical Verification:** Use the interactive playground / live spreadsheet loader available right on this page to test variations of this concept with your own test data.
- **Direct Faculty Helpline:** For detailed one-on-one lab guidance, batch enrollments, or teacher consultations:
  - 📞 **Mr. Sukanta Hui (Lead Mentor):** **+91 70037 56860**
  - 💬 **Admissions & WhatsApp Helpline:** **+91 94324 56083**
  - 📍 **Campus Address:** 25(10/A) Shibtala Road, Nona Chandan Pukur, Barrackpore, Kolkata - 700122.

*You can also click any of the quick prompt chips below to explore specific formulas, code patterns, teacher details, or course roadmaps!*`;
}
