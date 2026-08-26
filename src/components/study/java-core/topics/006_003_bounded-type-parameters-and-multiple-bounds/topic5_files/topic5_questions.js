const topic5_questions = [
  {
    "question": "What compilation error occurs if an interface bound is placed BEFORE a class bound in a multiple-bound declaration (e.g. '<T extends Runnable & Thread>')?",
    "shortAnswer": "The Java compiler generates a compilation error ('interface expected here' / 'class cannot follow interface in bound'). Java's grammar mandates that if a class bound is present, it MUST appear as the very first bound in the list, followed by zero or more interface bounds.",
    "explanation": "Strict grammatical ordering rule enforced by the Java Language Specification (JLS 4.4).",
    "hint": "Class bound MUST be listed first; placing an interface first causes a compilation error.",
    "level": "Intermediate",
    "codeExample": "<T extends Thread & Runnable> // VALID | <T extends Runnable & Thread> // COMPILE ERROR"
  }
];

export default topic5_questions;