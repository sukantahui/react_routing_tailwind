// topic4_questions.js – 20 questions about Insert mode entry
const questions = [
  {
    question: "What is the difference between `i` and `a`?",
    shortAnswer: "`i` inserts before the cursor, `a` appends after the cursor.",
    explanation: "This subtle difference is crucial for editing. If your cursor is on a character and you need to insert before it, use `i`. If you need to add after it (e.g., adding an 's' to make plural), use `a`.",
    hint: "Think of `a` as 'append' – it moves one character to the right automatically.",
    level: "moderate",
    codeExample: "On 'Hell', cursor on 'l': `a` → 'o' gives 'Hello'; `i` → 'o' gives 'Helol'."
  },
  {
    question: "When should I use `I` instead of `0i`?",
    shortAnswer: "`I` moves to the first non‑blank character; `0i` goes to column 0 (very beginning). Use `I` to keep indentation intact.",
    explanation: "In code with indentation, `I` lets you insert text before the first non‑space character, preserving the indent level. `0i` would insert at column 0, breaking indentation.",
    hint: "Try both on a line that starts with spaces. `I` keeps the spaces; `0i` removes them.",
    level: "expert",
    codeExample: "Line: '  def func():', cursor anywhere → `I` puts cursor before 'd' → indentation preserved."
  },
  // ... 18 more questions
];
export default questions;