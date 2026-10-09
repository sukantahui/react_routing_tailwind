# Master Instructions for Tutorial Topic Generation
## CBSE Class XI Computer Science (Subject Code: 083)

- **Repository**: `react_routing_tailwind`
- **Subject**: Computer Science (Subject Code: 083) – Class XI (Senior Secondary Board Curriculum)
- **Official Marks Distribution**:
  - **Unit I: Computer Systems and Organisation (CSO)** — 10 Marks
  - **Unit II: Computational Thinking and Programming - 1 (Python)** — 45 Marks
  - **Unit III: Society, Law and Ethics (SLE)** — 15 Marks
  - **Total Theory**: 70 Marks | **Practical Examination**: 30 Marks | **Grand Total**: 100 Marks
- **Reference Standards**:
  - **CBSE Class XI Computer Science (083) Official Syllabus (2024-25 / 2025-26)**
  - **Army Public School Barrackpore & Kendriya Vidyalaya Sangathan** (Examination Papers & Curriculum Delivery)
  - **Architecture Model**: `information-technology-802` & `icse-java-x` (Structured instructional modules + Special Solved Question Papers & Complete 20-Program Lab Bank)
- **Educator**: Sukanta Hui (Coder & AccoTax, Barrackpore, West Bengal, India)
- **Target Environment**: React 19 + Vite + Tailwind CSS (Zero-config, no `tailwind.config.js` required)
- **Primary Students**: Mamata, Mahima, Abhronila, Susmita, Debangshu, Sachin, Swadeep, Tuhina
- **Key Localities**: Barrackpore, Kolkata, Chandan Pukur, Jadavpur, Shyamnagar, Ichapur, Naihati

---

## 1. Directory Structure & File Naming Conventions

All tutorial content for CBSE Class XI Computer Science (083) resides inside:
`src/components/study/cbse-class-11-computer-science-083/`

### A. Slug Directory Architecture
1. **Roadmap Driven**: Use `cbse-class-11-computer-science-083-roadmap.json` to retrieve all module slugs, topic definitions, and sequence orders.
2. **Slug Folders**: Every folder created under `src/components/study/cbse-class-11-computer-science-083/topics/` **MUST** strictly match the module slug defined in the roadmap:
   - `001_001_basic-computer-organisation-and-memory-units`
   - `001_002_types-of-software-and-operating-system-functions`
   - `002_001_number-systems-and-base-conversions`
   - `002_002_internal-data-representation-and-encoding-schemes`
   - `002_003_boolean-logic-logic-gates-and-truth-tables`
   - `003_001_emerging-trends-ai-iot-cloud-and-blockchain` *(Enrichment Module)*
   - `004_001_problem-solving-algorithms-and-flowcharts`
   - `004_002_python-basics-tokens-variables-and-io` *(Explicitly includes l-value and r-value)*
   - `004_003_python-data-types-operators-and-expressions`
   - `004_004_python-errors-debugging-and-exception-basics` *(Dedicated: Syntax, Logical & Runtime Errors)*
   - `004_005_control-flow-conditionals-and-nested-decisions`
   - `004_006_loops-iteration-and-jump-statements`
   - `005_001_python-strings-indexing-slicing-and-methods`
   - `005_002_python-lists-traversal-manipulation-and-algorithms`
   - `005_003_python-tuples-immutability-and-operations`
   - `005_004_python-dictionaries-key-value-mapping-and-methods`
   - `005_005_python-standard-library-modules-math-random-statistics`
   - **`006_001_technology-and-society-gender-and-disability-issues`** *(Prescribed: Gender disparity, Assistive tech, Accessibility)*
   - `006_002_digital-footprints-netiquette-and-data-protection`
   - `006_003_intellectual-property-rights-plagiarism-and-foss`
   - `006_004_cyber-crimes-cyber-safety-and-it-act`
   - `006_005_e-waste-management-and-green-computing`
   - **`007_001_cbse-class-11-cs-083-sample-question-papers`** *(Special Segment: Solved Model & Suggested Mock Papers)*
   - **`007_002_cbse-class-11-cs-083-lab-practical-question-bank`** *(Special Segment: 20-Program Practical Repository Aligned with CBSE Suggested Programs & Viva Voce)*

3. **Sequential Topic Files**: Inside standard slug folders, create `Topic[N].jsx` (e.g. `Topic0.jsx`, `Topic1.jsx`, ...).
4. **Dedicated Companion Files**: Inside each standard slug folder, create `topic[N]_files/` containing:
   - `topic[N]_note.txt` (Printable plain text revision note)
   - `topic[N]_questions.js` (25-30 structured exam Q&As with detailed explanations)
   - Code files (`.py`, `.json`, `.sql`)

---

## 2. Special Segment: Suggested Mock Question Papers & All 20 Practical Lab Programs (`Segment 7`)

Following the architecture established in **`information-technology-802`** and **`icse-java-x`**, **Segment 7** is dedicated to authentic examination mastery and the 30-mark practical examination requirements.

### A. Question Paper Topic File (`Topic[N].jsx`)
Inside `src/components/study/cbse-class-11-computer-science-083/topics/007_001_cbse-class-11-cs-083-sample-question-papers/`:

```jsx
import React, { useState } from 'react';
import PythonQuestionPaperTemplate from '../../../../common/PythonQuestionPaperTemplate';
import csPaperData from './topic0_files/aps-barrackpore-2026-xi-cs083-halfyearly.json';

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

### B. Suggested Mock Question Paper Blueprint Schema
> [!NOTE]
> The official CBSE syllabus specifies unit-wise marks distribution (Unit I: 10M, Unit II: 45M, Unit III: 15M). The five-section layout below represents Coder & AccoTax's **Suggested Mock Examination Pattern** for comprehensive student practice.

```json
{
  "paperId": "APS-BKPORE-2026-XI-CS083-HY",
  "title": "Army Public School Barrackpore – Class XI Computer Science (083) Half Yearly Examination (2026-2027)",
  "duration": "3 Hours",
  "totalMarks": 70,
  "unitDistribution": {
    "unit1_cso": 10,
    "unit2_python": 45,
    "unit3_sle": 15
  },
  "paperPattern": "Suggested Mock Examination Blueprint (Coder & AccoTax)",
  "instructions": [
    "Please check that this question paper contains 35 questions divided into 5 Sections (A, B, C, D, and E).",
    "Section A consists of 18 objective/MCQ questions (1 mark each).",
    "Section B consists of 7 Very Short Answer questions (2 marks each).",
    "Section C consists of 5 Short Answer questions (3 marks each).",
    "Section D consists of 2 Long Answer questions (5 marks each).",
    "Section E consists of 3 Case-Based / Tracing questions (4 marks each).",
    "All programming questions are in Python."
  ],
  "sections": [
    {
      "section": "A",
      "type": "Section A – Multiple Choice & Objective Questions",
      "marksPerQuestion": 1,
      "totalQuestions": 18,
      "description": "All questions are compulsory. (18 × 1 = 18 Marks)",
      "questions": [
        {
          "q": "Which of the following is an invalid assignment statement in Python due to an l-value violation?\n(A) x = 25\n(B) a, b = 10, 20\n(C) x + y = 30\n(D) z = 'Coder'",
          "marks": 1,
          "answer": "**Correct Answer:** (C) `x + y = 30`\n\n**Explanation:**\nIn Python assignment statements (`lvalue = rvalue`), the left-hand side (l-value) must be a valid, assignable memory target (such as a variable or subscript), not an evaluated expression or literal. `x + y` is an expression (r-value), raising `SyntaxError: cannot assign to expression`.",
          "hint": "Recall the l-value rule: expressions cannot appear on the left side of the assignment operator."
        }
      ]
    }
  ]
}
```

### C. 20-Program Practical Laboratory Repository Aligned with CBSE Suggested Programs (Segment 7 Module 2)

> [!IMPORTANT]
> CBSE requires a practical report file with a minimum of 20 Python programs. The following 20 programs represent Coder & AccoTax's curated laboratory repository aligned with CBSE's suggested practical problem list, fulfilling the statutory minimum 20-program report-file requirement:
1. Arithmetic calculations on two user-input numbers.
2. Largest and smallest among three numbers with nested conditionals.
3. Quadratic equation solver with discriminant and root analysis ($b^2 - 4ac$).
4. Prime number verification and primes generator in range $[start, end]$.
5. Fibonacci sequence generator and cumulative sum calculation.
6. Armstrong number checker and finding all 3-digit Armstrong numbers (100 to 999).
7. Palindrome verification for numbers and strings (slicing & iterative).
8. GCD and LCM computation using Euclid's Algorithm.
9. Sum of series: $1 + x + x^2 + x^3 + \dots + x^n$.
10. Sum of alternating series: $1 - x + x^2 - x^3 + \dots + (-1)^n x^n$.
11. Factorial calculation using iterative `for` and `while` loops.
12. Perfect number verifier (sum of proper divisors equals number).
13. String statistics analyzer (uppercase, lowercase, vowels, consonants, digits, special symbols).
14. String character case toggler and title-casing without built-in methods.
15. Linear search in a numeric list with index reporting.
16. List statistics (max, min, mean, second largest) without built-in `max()`/`min()`.
17. Adjacent element swapper in a list ($L[i]$ with $L[i+1]$).
18. List element frequency counter and tally generator.
19. Tuple number processor (sum, average, min, max, sorted tuple conversion).
20. Student gradebook dictionary with Roll Number key, marks lookup, and grade calculator.

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
import pythonCode from "./topic0_files/PrimeCheckAndFibonacci.py?raw";

<PythonFileLoader
  fileModule={pythonCode}
  title="PrimeCheckAndFibonacci.py"
  highlightLines={[12, 18, 24]}
/>
```

### B. FAQ Component Template (`<FAQTemplate>`)
```jsx
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic0_files/topic0_questions";

<FAQTemplate
  title="CBSE Class XI Computer Science (083) – Topic FAQs"
  questions={questions}
/>
```

### C. Plain Text Printable Note Template (`<PlainTextPrint>`)
```jsx
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic0_files/topic0_note.txt?raw";

<PlainTextPrint
  content={noteText}
  title="CBSE Class XI CS 083 – Quick Revision Document"
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
  note="Remember: In Python, pay attention to the difference between an l-value (target variable) and an r-value (expression value). In error diagnosis, distinguish Syntax Errors (caught during parsing), Logical Errors (wrong calculation), and Runtime Exceptions (like ZeroDivisionError or IndexError). — Sukanta Hui"
/>
```

---

## 5. Output & Quality Guarantee

1. **Full File Generation**: Always output 100% complete, un-truncated, copy-paste-ready JSX, JS, PY, and TXT files.
2. **Clean Code & Accessible HTML**: Proper semantic tags, aria attributes, clean commenting, and responsive layouts.
3. **No Fluff**: Every sentence, diagram, table, code sample, and FAQ must deliver genuine academic and practical value for CBSE Class XI Computer Science (083) students.
