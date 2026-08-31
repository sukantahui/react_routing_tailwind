// topic9_questions.js - Comprehensive Practice Questions for Topic 9
// Module: 002_001_tables-sorting-and-filtering

const questions = [
  {
    question: "What is an Excel Structured Table and how is it created from a raw range?",
    shortAnswer: "A dynamic container object created with `Ctrl + T` that treats rows and columns as structured relational fields with automatic expansion and formula propagation.",
    explanation: "Excel Tables convert static 2D cell grids into intelligent data entities that support structured references like `[@Salary]`.",
    hint: "Press Ctrl + T to convert any contiguous range into a table.",
    level: "basic",
    codeExample: "Ctrl + T → Check 'My table has headers' → Enter"
  },
  {
    question: "How do structured column references (e.g. `[@Tuition_Fee] * 0.18`) differ from standard A1 references?",
    shortAnswer: "Structured references use human-readable column header names instead of static cell coordinates ($E$2), automatically adjusting when columns are reordered.",
    explanation: "Structured formulas are self-documenting and immune to broken references caused by column insertions or deletions.",
    hint: "Use `[@ColumnName]` syntax inside table rows.",
    level: "basic",
    codeExample: "=[@Gross_Amount] - [@Discount_Amount]"
  },
  {
    question: "How do you activate the Total Row in an Excel Table with a keyboard shortcut?",
    shortAnswer: "Press `Ctrl + Shift + T` or check 'Total Row' on the Table Design ribbon tab.",
    explanation: "The Total Row inserts dynamic aggregate dropdowns at the bottom of the table using the `SUBTOTAL` function.",
    hint: "Ctrl + Shift + T toggles the Table Total Row.",
    level: "basic",
    codeExample: "Ctrl + Shift + T (Toggles Total Row)"
  },
  {
    question: "Why does the Total Row use `SUBTOTAL(109, ...)` instead of `SUM(...)`?",
    shortAnswer: "Because `SUBTOTAL(109)` calculates sums exclusively on visible rows, dynamically recalculating when the user filters the table.",
    explanation: "`SUM` includes hidden filtered rows in its calculation, producing misleading totals on filtered views.",
    hint: "Function code 109 ignores rows hidden by AutoFilter.",
    level: "moderate",
    codeExample: "=SUBTOTAL(109, [Net_Amount])"
  },
  {
    question: "How do you clear all active filters from an Excel worksheet at once?",
    shortAnswer: "Press `Alt + A + C` or click Data → Clear on the Data ribbon tab.",
    explanation: "Clearing filters restores view of all hidden rows without removing the AutoFilter dropdown buttons.",
    hint: "Alt + A + C clears all applied filters.",
    level: "basic",
    codeExample: "Alt + A + C (Clear All Filters)"
  }
];

export default questions;
