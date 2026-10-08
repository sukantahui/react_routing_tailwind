# Master Instructions for Tutorial Topic Generation
## CBSE Class XII Information Technology (Subject Code: 802)

- **Repository**: `react_routing_tailwind`
- **Subject**: Information Technology (Subject Code: 802) – Class XII (Senior Secondary Board Curriculum)
- **Reference Standards**: 
  - **Army Public School Barrackpore** (Half Yearly Examination 2026-2027 SET-C)
  - **CBSE Class XII IT (802) Board Examination Blueprint**
  - **Architecture Model**: `icse-java-x` (Structured modules + Special Question Paper Samples Segment)
- **Educator**: Sukanta Hui (Coder & AccoTax, Barrackpore, West Bengal, India)
- **Target Environment**: React 19 + Vite + Tailwind CSS (Zero-config, no `tailwind.config.js` required)
- **Primary Students**: Mamata, Mahima, Abhronila, Susmita, Debangshu, Sachin, Swadeep, Tuhina
- **Key Localities**: Barrackpore, Kolkata, Chandan Pukur, Jadavpur, Shyamnagar, Ichapur, Naihati

---

## 1. Directory Structure & File Naming Conventions

All tutorial content for Information Technology (802) resides inside:
`src/components/study/information-technology-802/`

### A. Slug Directory Architecture
1. **Roadmap Driven**: Use `information-technology-802-roadmap.json` to retrieve all module slugs, topic definitions, and sequence orders.
2. **Slug Folders**: Every folder created under `src/components/study/information-technology-802/topics/` MUST match the module slug defined in the roadmap:
   - `001_001_relational-database-concepts-and-keys`
   - `001_002_mysql-ddl-and-table-constraints`
   - `001_003_sql-dml-data-filtering-and-pattern-matching`
   - `001_004_sql-aggregate-functions-and-group-by`
   - `001_005_multi-table-relational-queries-and-joins`
   - `002_001_web-applications-and-egovernance-portals`
   - `002_002_ecommerce-ebusiness-and-online-safety`
   - `002_003_four-stages-of-web-application-development`
   - `003_001_java-environment-jvm-and-variables`
   - `003_002_operators-modulus-and-expression-tracing`
   - `003_003_decision-structures-and-switch-case-conversion`
   - `003_004_iterative-loops-and-output-prediction`
   - `004_001_oop-principles-and-constructors`
   - `004_002_arrays-and-java-util-arrays-utilities`
   - `004_003_string-class-methods-and-text-manipulation`
   - `004_004_multithreading-assertions-and-exception-handling`
   - `005_001_work-integrated-learning-and-project-characteristics`
   - **`006_001_cbse-class-12-it-802-sample-question-papers`** *(Special Segment for Question Paper Samples)*
3. **Sequential Topic Files**: Inside standard slug folders, create `Topic[N].jsx` (e.g. `Topic0.jsx`, `Topic1.jsx`, ...).
4. **Dedicated Companion Files**: Inside each standard slug folder, create `topic[N]_files/` containing:
   - `topic[N]_note.txt` (Printable plain text note)
   - `topic[N]_questions.js` (25-30 structured Q&As)
   - Code files (`.java`, `.sql`, `.html`)

---

## 2. Special Segment: Question Paper Samples (`Segment 6`)

Following the design pattern established in **`icse-java-x`** (Segment 9 Test Paper), **Segment 6** is dedicated to full-length, authentic solved examination question papers and mock tests.

### A. Question Paper Topic File (`Topic[N].jsx`)
Inside `src/components/study/information-technology-802/topics/006_001_cbse-class-12-it-802-sample-question-papers/`:

```jsx
import React, { useState } from 'react';
import JavaQuestionPaperTemplate from '../../../JavaQuestionPaperTemplate';
import itPaperData from './topic0_files/aps-barrackpore-2026-set-c-paper.json';

const Topic0 = () => {
  const [currentPaper] = useState(itPaperData);
  
  const organizationDetails = {
    name: "Coder & AccoTax",
    address: "25(10/A) Shibtala Road, Barrackpore, Kolkata",
    logo: "/logo.png"
  };
  
  const isLoggedIn = true;
  
  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <JavaQuestionPaperTemplate 
        data={currentPaper}
        isLoggedIn={isLoggedIn}
        organizationDetails={organizationDetails}
      />
    </div>
  );
};

export default Topic0;
```

### B. Question Paper JSON Schema (`topic[N]_files/[paper_name].json`)
```json
{
  "paperId": "APS-BKPORE-2026-XII-IT802-SET-C",
  "title": "Army Public School Barrackpore – Class XII Information Technology (802) Half Yearly Examination (2026-2027) (SET-C)",
  "duration": "3 Hours",
  "totalMarks": 60,
  "prerequisites": "CBSE Class XII Information Technology (802) syllabus",
  "instructions": [
    "Please read the instructions carefully.",
    "This Question Paper consists of 23 questions in two sections – Section A & Section B.",
    "Section A (30 Marks) has Objective type questions; Section B (30 Marks) contains Subjective type questions."
  ],
  "sections": [
    {
      "section": "A",
      "type": "Question 1 – Objective Type Questions",
      "marksPerQuestion": 1,
      "totalQuestions": 7,
      "description": "Answer any 5 Questions out of 7 Questions. (5 × 1 = 5 Marks)",
      "questions": [
        {
          "q": "i) Name the National Portal of India.",
          "marks": 1,
          "answer": "**Correct Answer:** `india.gov.in`\n\n**Explanation:** `india.gov.in` is the official single-window portal developed by the Government of India.",
          "hint": "The official Government of India single-entry website."
        }
      ]
    }
  ]
}
```

---

## 3. Standard Topic Component Structure (Sections Order)

For instructional modules (Segments 1 to 5), each `Topic[N].jsx` must follow this sequential top-to-bottom layout:

```
┌────────────────────────────────────────────────────────────────────────┐
│ 1. Header Section (Module Badge, Topic Index, H1 Title, Summary)       │
├────────────────────────────────────────────────────────────────────────┤
│ 2. Deep Conceptual Explanation (What, Why, When, How It Works)         │
├────────────────────────────────────────────────────────────────────────┤
│ 3. Semantic Visual SVG Illustration (Native SVG <animate> / Diagrams)  │
├────────────────────────────────────────────────────────────────────────┤
│ 4. Deep Technical Breakdown (Syntax, Tables, Algorithms, Flowcharts)   │
├────────────────────────────────────────────────────────────────────────┤
│ 5. Code Demonstration (<JavaFileLoader> / SQL Code Blocks)             │
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

## 4. UI, Styling & Animation Specifications

### A. Zero-Config Tailwind CSS
* **No `tailwind.config.js` required**: Use standard Tailwind CSS utility classes and arbitrary values (`animate-[...]`, `animation-delay-[...]`).
* **Do NOT use external animation libraries**: Do NOT use Framer Motion, GSAP, or external CSS stylesheets inside topic components.
* **Avoid `opacity-0`**: Never leave elements hidden with `opacity-0` as default.
* **Dark Mode Default**: Always style for sleek dark mode by default (`bg-slate-900 text-slate-200` / `bg-gray-900 text-gray-200`).
* **Currency Formatting**: Always use the **Rupee sign (`₹`)** for monetary figures instead of `$`.

---

## 5. Standard Component Import & Code Integration Templates

### A. Java Code Loader Template (`<JavaFileLoader>`)
```jsx
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import javaCode from "./topic0_files/BinarySearchExample.java?raw";

<JavaFileLoader
  fileModule={javaCode}
  title="BinarySearchExample.java"
  highlightLines={[]}
/>
```

### B. FAQ Component Template (`<FAQTemplate>`)
```jsx
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic0_files/topic0_questions";

<FAQTemplate
  title="CBSE Class XII IT (802) – Topic FAQs"
  questions={questions}
/>
```

### C. Plain Text Printable Note Template (`<PlainTextPrint>`)
```jsx
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic0_files/topic0_note.txt?raw";

<PlainTextPrint
  content={noteText}
  title="CBSE Class XII IT 802 – Quick Revision Document"
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
  note="Remember: In CBSE IT (802) questions, pay attention to Integer division (12/5 = 2 vs 12.0/5 = 2.4) and SQL LIKE wildcards ('%Kumar%'). — Sukanta Hui"
/>
```

---

## 6. Output & Quality Guarantee

1. **Full File Generation**: Always output 100% complete, un-truncated, copy-paste-ready JSX, JS, and TXT files.
2. **Clean Code & Accessible HTML**: Proper semantic tags, aria attributes, clean commenting, and responsive layouts.
3. **No Fluff**: Every sentence, diagram, table, code sample, and FAQ must deliver genuine academic and practical value for CBSE Class XII IT (802) students.
