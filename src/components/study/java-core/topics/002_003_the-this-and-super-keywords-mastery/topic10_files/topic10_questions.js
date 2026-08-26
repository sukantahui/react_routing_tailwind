const topic10_questions = [
  {
    question: "Why would a subclass method call 'super.methodName()' when overriding a parent method?",
    shortAnswer: "To reuse and extend the existing superclass implementation without rewriting boilerplate base functionality.",
    explanation: "This is the primary inheritance reuse pattern in Java (extending behavior rather than replacing it entirely).",
    hint: "Reuses and extends parent behavior without rewriting base logic.",
    level: "Beginner",
    codeExample: "@Override public void save() { super.save(); auditLog(); }"
  }
];

export default topic10_questions;