# Coder & AccoTax - Master Instructions for Java ICSE class 10 Tutorial Creation

- **Repository:** react_routing_tailwind
- **Educator:** Sukanta Hui (Barrackpore, West Bengal)
- **Target Environment:** React 19 + Vite + Tailwind CSS (Node.js v16 Compatible)

---

## 1. Directory Structure & File Naming Rules

- All topic folders must be created under:
  `src/components/study/icse-java-x/topics/`
- Every folder name **MUST** strictly match the module slug defined in `icse-class-10-roadmap.json`:
  - **Format:** `[3-digit-segment]_[3-digit-module]_[descriptive-kebab-slug]`
  - **Example:** `001_001_getting-started-with-java-and-jvm-architecture`
- There must be **NO** other folders inside `topics/` other than the slug folders.

For each topic index `N` (0, 1, 2, ...):
1. Create `Topic[N].jsx` directly inside the module slug folder.
2. Create a subfolder named `topic[N]_files/` containing:
   - `[DescriptiveName]Demo.java` (Runnable, clean, well-commented Java code)
   - `topic[N]_questions.js` (25 to 30 structured Q&A items)
   - `topic[N]_note.txt` (Concise printable note)

### Folder Structure Example

```
topics/
└── 001_001_getting-started-with-java-and-jvm-architecture/
    ├── Topic0.jsx
    ├── topic0_files/
    │   ├── HelloWorld.java
    │   ├── EnterpriseStackDemo.java
    │   ├── topic0_questions.js
    │   └── topic0_note.txt
    ├── Topic1.jsx
    └── topic1_files/
        ├── VersionEvolutionDemo.java
        ├── topic1_questions.js
        └── topic1_note.txt
```

---

## 2. Component Architecture & Coding Standards

- **React 19 Function-Based Components ONLY:**
  - Class-based components are strictly prohibited.
  - Use standard function declarations or arrow functions.
- **Pure Tailwind CSS Styling:**
  - Default theme: **DARK MODE** (`bg-slate-900 text-slate-200`).
  - Surface cards: `bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg`.
  - Do **NOT** assume or require `tailwind.config.js` or external plugins.
  - Use `clsx` for dynamic class names: `import clsx from "clsx";`
- **Vertical Stacked Layout (STRICT):**
  - Layout must be vertically stacked using `space-y-12` or `space-y-6`.
  - **NEVER** place major content sections in squished horizontal side-by-side columns.
- **Single-Topic Rule:**
  - One file = One topic (`Topic[N].jsx`).
  - Keep topic scope strictly focused without mixing future syllabus concepts.

---

## 3. Animation & SVG Visual Guidelines

- **Zero-Config Animations:**
  - Do **NOT** use external animation libraries (NO Framer Motion, NO GSAP).
  - Use scoped inline `<style>` keyframes:
    ```jsx
    <style>
      {`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}
    </style>
    ```
  - Respect motion-safe transitions: `transition-all duration-300 hover:border-slate-700`.
  - Do **NOT** use `opacity-0` utility that hides content permanently.
- **Semantic Educational SVGs:**
  - Every topic **MUST** include a custom, high-quality, semantic `<svg>` diagram.
  - Use clear labels, arrows, color-coded stages, and hover transformations (`hover:scale-105` or `hover:opacity-95`).
  - SVGs must teach the actual concept (e.g. JVM memory map, compilation pipeline, class hierarchy, data flow), not act as generic decorative art.

---

## 4. Mandatory Topic Component Structure (Section Order)

Each `Topic[N].jsx` file must follow this exact top-to-bottom section sequence:

1. **Header Section:**
   - Module & Topic Badge (`Module 001_001 · Topic N`)
   - Category Badge
   - `<h1>` Topic Title
   - Introductory concept subtitle / summary
2. **Concept Overview Section:**
   - Clear conceptual explanation (What & Why)
   - Real-world context and local classroom analogy
3. **Semantic Visual Diagram Section:**
   - Dedicated instructional `<svg>` diagram with labeled stages and hover micro-animations
4. **Deep Technical Breakdown Section:**
   - Method signatures / syntax prototypes / internal mechanics
   - Tables / rules / execution lifecycle breakdown
5. **Hands-on Code Example Section:**
   - Rendered using `<JavaFileLoader>` importing the raw `.java` file via Vite `?raw`
6. **Common Pitfalls & Best Practices Section:**
   - Beginner mistakes, compiler/runtime traps, and industry best practices
7. **Thinking & Hints Section ("Think About This..."):**
   - Guiding questions and subtle hints to encourage algorithmic intuition
8. **Comprehensive FAQ Section:**
   - Rendered using `<FAQTemplate>` importing from `topic[N]_questions.js`
9. **Plain Text Printable Note Section:**
   - Rendered using `<PlainTextPrint>` importing from `topic[N]_note.txt?raw`
10. **Teacher's Note Section:**
    - Rendered using `<Teacher>` importing from `TeacherSukantaHui`

---

## 5. Common Component APIs & Import Paths

Relative import paths from `src/components/study/java-core/topics/<slug>/Topic[N].jsx`:

### A. JavaFileLoader

```jsx
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import javaCode from "./topic[N]_files/MyDemo.java?raw";

<JavaFileLoader
  fileModule={javaCode}
  title="MyDemo.java"
  highlightLines={[8, 12, 15]}
/>
```

### B. FAQTemplate

```jsx
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic[N]_files/topic[N]_questions";

<FAQTemplate
  title="[Topic Title] FAQs"
  questions={questions}
/>
```

### C. PlainTextPrint

```jsx
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic[N]_files/topic[N]_note.txt?raw";

<PlainTextPrint
  content={noteText}
  title="Module [M] Topic [N]: [Topic Title]"
  stampEnabled={true}
  showDownload={true}
  downloadButtonText="Download Printable Note"
  downloadFileName="[slug]_topic[N]_note.txt"
/>
```

### D. Teacher Note

```jsx
import Teacher from "../../../../../common/TeacherSukantaHui";

<Teacher
  note="Your pedagogical advice, tips & tricks, and memory keys here. — Sukanta Hui"
/>
```

---

## 6. Data Schemas for Auxiliary Files

### A. FAQ File (`topic[N]_files/topic[N]_questions.js`)

- **MUST** contain 25 to 30 comprehensive, high-quality questions (basic to expert).
- **Structure:**

```javascript
const questions = [
  {
    question: "Clear, precise question title?",
    shortAnswer: "1-2 sentence immediate summary answer.",
    explanation: "Deep, rigorous conceptual explanation covering JVM mechanics and edge cases.",
    hint: "Conceptual memory aid or thinking prompt.",
    level: "basic", // "basic" | "intermediate" | "advanced" | "expert"
    codeExample: "// Short illustrative Java snippet"
  },
  // ... 25 to 30 questions
];

export default questions;
```

### B. Plain Text Note (`topic[N]_files/topic[N]_note.txt`)

- Clean, structured ASCII formatting for terminal printing and student handouts.
- **Structure:**

```text
================================================================================
CODER & ACCOTAX - JAVA CORE COMPLETE ROADMAP
MODULE [SLUG]: [Module Title]
TOPIC [N]: [Topic Title]
Educator: Sukanta Hui | Barrackpore, West Bengal
================================================================================

1. CORE CONCEPTS & RULES
--------------------------------------------------------------------------------
- Summary of rules and syntax

2. ESSENTIAL CHECKLIST
--------------------------------------------------------------------------------
[✓] Key takeaways to remember
================================================================================
```

### C. Java Source File (`topic[N]_files/[Name]Demo.java`)

- Valid, compilable Java source code with clean indentation and helpful comments.

---

## 7. Pedagogical Tone & Local Context

- **Educator Persona:**
  - Authored by Sukanta Hui (Coder & AccoTax).
  - Clear, warm, encouraging, and authoritative technical mentorship.
- **Classroom Characters & Regional Centers:**
  - **Students:** Swadeep, Tuhina, Abhronila, Debangshu
  - **Locations:** Barrackpore, Shyamnagar, Ichapur, Naihati
  - Weave student scenarios and lab settings naturally into examples, stories, and analogies (not forced).

---

## 8. Workflow & System Compatibility Rules

- **Autonomous Execution:**
  - Agents must proceed continuously through topics and modules without unnecessary pauses.
- **Node.js v16 Environment:**
  - All scripts, generators, and verification tools must use standard CommonJS (`require`) and ES2020 JavaScript compatible with Node.js v16.
- **Verification Before Completion:**
  - Always verify that all JSX, Java, JS, and TXT files exist, import correctly, and build with zero syntax errors.
