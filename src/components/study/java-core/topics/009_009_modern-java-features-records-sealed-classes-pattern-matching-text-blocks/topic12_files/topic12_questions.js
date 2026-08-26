const topic12_questions = [
  {
    "question": "What is the primary benefit of Record Patterns introduced in Java 21 (JEP 440)?",
    "shortAnswer": "Record Patterns enable direct, concise deconstruction of record components into local pattern variables inside instanceof and switch expressions without calling individual accessor methods manually.",
    "explanation": "Enables elegant data-oriented programming.",
    "hint": "Destructures record components directly without calling accessor methods.",
    "level": "Intermediate",
    "codeExample": "if (obj instanceof Point(int x, int y)) { System.out.println(x + y); }"
  },
  {
    "question": "Can Record Patterns be nested inside other Record Patterns?",
    "shortAnswer": "Yes! Java 21 supports arbitrary levels of nested record pattern deconstruction, allowing deep component extraction in a single expression.",
    "explanation": "Unpacks composite nested data structures seamlessly.",
    "hint": "Supports recursive nested deconstruction.",
    "level": "Advanced",
    "codeExample": "if (obj instanceof Rect(Point(int x1, int y1), Point(int x2, int y2))) { ... }"
  }
];

export default topic12_questions;
