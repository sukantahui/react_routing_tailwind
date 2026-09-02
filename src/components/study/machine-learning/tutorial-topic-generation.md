# Master Instructions for Tutorial Topic Generation (Machine Learning & Data Science)

- **Repository**: `react_routing_tailwind`
- **Subject**: Machine Learning, Artificial Intelligence & Data Science
- **Educator Persona**: Sukanta Hui (Barrackpore, West Bengal)
- **Target Environment**: React 19 + Vite + Tailwind CSS (No `tailwind.config.js` required)
- **Primary Students**: Sachin, Mahima, Susmita, Abhronila, Debangshu, Swadeep, Tuhina
- **Key Localities**: Barrackpore, Kolkata, Chandan Pukur, Jadavpur, Shyamnagar, Ichapur, Naihati

---

## 1. Directory Structure & File Naming Rules

1. **Roadmap Driven**: Use the `machine_learning_roadmap.json` file to retrieve all module slugs, topic definitions, and sequence orders.
2. **Slug Folders**: Every folder created under `src/components/study/machine-learning/topics/` MUST match the module slug defined in the roadmap. No other folders may exist directly inside `topics/`.
3. **Sequential Topic Files**: Inside each slug folder, create `Topic[number].jsx` (e.g. `Topic0.jsx`, `Topic1.jsx`, `Topic2.jsx`).
   - One Topic = One File (Do not combine multiple topics into a single file).
   - No Topic Mixing (Scope must be strictly limited to the current topic).
   - Sequential Progression (Each topic must build on previously covered concepts).
4. **Dedicated Companion Files**: Inside each slug folder, create a subfolder named `topic[number]_files/` containing:
   - `topic[number]_note.txt` — Plain text printable version of the topic (loaded by `<PlainTextPrint>`).
   - `[topic_name]_lab.py` (or `_demo.py`) — Standalone executable Python script (loaded by `<PythonFileLoader>`).
   - `topic[number]_questions.js` — Array of 25 to 30 structured Q&A items (loaded by `<FAQTemplate>`).
   *(Do NOT create any redundant `topic[number]_content.txt` files).*

---

## 2. Component Structure & Mandatory Section Sequence

Every topic component MUST be a **React 19 function-based component** and follow this exact sequential layout (stacked vertically, not side-by-side):

```
┌────────────────────────────────────────────────────────┐
│ 1. Header Section (Badges, H1 Title, Summary)          │
├────────────────────────────────────────────────────────┤
│ 2. Dedicated Topic Description (What, Why, How, When)  │
├────────────────────────────────────────────────────────┤
│ 3. Semantic Visual SVG Diagram (Native SVG <animate>)  │
├────────────────────────────────────────────────────────┤
│ 4. Deep Technical Breakdown (Math, Formulas, Tables)   │
├────────────────────────────────────────────────────────┤
│ 5. Code Demonstration (<PythonFileLoader>)             │
├────────────────────────────────────────────────────────┤
│ 6. Common Pitfalls & Best Practices                    │
├────────────────────────────────────────────────────────┤
│ 7. Hint Section ("Think About This...")                │
├────────────────────────────────────────────────────────┤
│ 8. FAQ Section (<FAQTemplate>)                         │
├────────────────────────────────────────────────────────┤
│ 9. Plain Text Printable Note (<PlainTextPrint>)        │
├────────────────────────────────────────────────────────┤
│ 10. Teacher's Note (<Teacher>)                         │
└────────────────────────────────────────────────────────┘
```

---

## 3. UI, Styling & Animation Specifications

### A. Zero-Config Tailwind CSS
* **No `tailwind.config.js` required**: Use standard Tailwind CSS utility classes and arbitrary values (`animate-[...]`, `animation-delay-[...]`).
* **Do NOT use external animation libraries**: No Framer Motion, GSAP, or external CSS files.
* **Avoid `opacity-0`**: Never use `opacity-0` as a default class.
* **Dark Mode Default**: Always style for dark mode by default (`bg-slate-900 text-slate-200`).
* **Currency Formatting**: Always use the **Rupee sign (`₹`)** for monetary figures instead of `$`.

### B. Micro-Animations & Interactions
* **Transitions**: Smooth transitions (`transition-all duration-300`).
* **Hover Emphasis**: Subtle elevation or soft glow on:
  - Concept cards & breakdown boxes
  - Interactive SVG steps
  - Teacher's note box
* **Motion-Safe**: Respect reduced-motion preferences using `motion-safe:`.
* **SVGs**: Semantic inline `<svg>` illustrations with labeled nodes, arrows, and native SVG `<animate>` tags.

---

## 4. Content Depth & Pedagogical Standards

### A. Non-Negotiable Depth Checklist
Every topic must provide exhaustive theoretical and practical depth:
- **Why it is needed**: Problem statement and limitations of previous methods.
- **What it is**: Rigorous definition and conceptual boundaries.
- **How it works**: Step-by-step algorithmic / mathematical lifecycle.
- **When it is used**: Practical selection criteria and real-world deployment cases.
- **Mathematical Formulations**: Exact equations, loss functions, vectors, and theorems clearly defined.
- **Real-World Examples**: At least 4 distinct, concrete industry or academic applications.
- **Function / Model Signatures**: Clear input dimensions, parameter specifications, and return types.
- **Beginner Pitfalls & Best Practices**: Misconceptions, tuning mistakes, and defensive programming tips.

### B. Classroom Story & Pedagogical Tone
- Integrate local educator discussions featuring **Sukanta Hui (Coder & AccoTax)**.
- Involve students naturally: **Sachin, Mahima, Susmita, Abhronila, Debangshu, Swadeep, Tuhina**.
- Local context: **Barrackpore, Kolkata, Chandan Pukur, Jadavpur, Shyamnagar, Ichapur, Naihati**.

---

## 5. Standard Component Import & Code Integration Templates

### A. Python Code Loader Template (`<PythonFileLoader>`)
```jsx
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import pythonCode from "./topic0_files/linear_regression_demo.py?raw";

// Inside Topic Component:
<section className="space-y-4">
  <h2 className="text-2xl font-bold text-emerald-400">
    💻 Python Code Demonstration
  </h2>
  <PythonFileLoader
    fileModule={pythonCode}
    title="linear_regression_demo.py"
    highlightLines={[]}
  />
</section>
```

### B. FAQ Component Template (`<FAQTemplate>`)
```jsx
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic0_files/topic0_questions";

// Inside Topic Component:
<FAQTemplate
  title="Linear Regression Fundamentals FAQs"
  questions={questions}
/>
```

#### `topic0_questions.js` File Structure:
```javascript
const questions = [
  {
    question: "What is the cost function used in Linear Regression?",
    shortAnswer: "Mean Squared Error (MSE) / Residual Sum of Squares (RSS).",
    explanation: "MSE measures the average squared difference between actual target values (y) and predicted outputs (y_hat). It penalizes larger prediction errors quadratically.",
    hint: "Think about squaring the residuals to eliminate negative signs.",
    level: "basic",
    codeExample: "mse = np.mean((y_true - y_pred) ** 2)"
  },
  // ... 25 to 30 questions (Basic, Intermediate, Advanced)
];

export default questions;
```

### C. Plain Text Printable Note Template (`<PlainTextPrint>`)
```jsx
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic0_files/topic0_note.txt?raw";

// Inside Topic Component:
<PlainTextPrint
  content={noteText}
  title="Linear Regression Quick Revision Note"
  stampEnabled={true}
  showDownload={true}
  downloadButtonText="Download Note"
  downloadFileName="linear_regression_note.txt"
/>
```

### D. Teacher's Note Template (`<Teacher>`)
```jsx
import Teacher from "../../../../../common/TeacherSukantaHui";

// Inside Topic Component:
<Teacher
  note="Always standardize your features before applying Gradient Descent to prevent elongated elliptical cost surfaces and slow convergence! — Sukanta Hui"
/>
```

---

## 6. Output & Quality Guarantee

1. **Full File Generation**: Always output 100% complete, copy-paste-ready, un-truncated files.
2. **Clean Code**: Well-commented, production-ready, highly accessible semantic HTML/JSX.
3. **Strict Validation**: All imports must match repository relative pathing accurately.
