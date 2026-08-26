const topic3_questions = [
  {
    question: "What is the role of the 'import' statement in Java, and which package is imported automatically by default?",
    shortAnswer: "The 'import' statement brings classes from other packages into the current compilation scope so you can refer to them by their simple class names rather than fully qualified names. The 'java.lang' package is imported automatically into every Java file.",
    explanation: "Without 'import java.util.List', you would have to write 'java.util.List list = new java.util.ArrayList();'.",
    hint: "Enables using simple class names; java.lang is imported automatically.",
    level: "Beginner",
    codeExample: "import java.util.List; // java.lang.* is automatic"
  }
];

export default topic3_questions;