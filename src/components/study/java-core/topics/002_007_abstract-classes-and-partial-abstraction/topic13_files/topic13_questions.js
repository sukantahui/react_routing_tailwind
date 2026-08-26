const topic13_questions = [
  {
    question: "Why can't an abstract method be declared 'private' or 'static' in Java?",
    shortAnswer: "1. 'private abstract' is impossible because private methods are invisible to subclasses and thus cannot be overridden. 2. 'static abstract' is impossible because static methods are bound to the class at compile-time and cannot participate in runtime dynamic method dispatch.",
    explanation: "Abstract methods must be visible and dynamically dispatchable (public, protected, or package-private).",
    hint: "Private methods cannot be seen to be overridden; static methods don't support dynamic dispatch.",
    level: "Intermediate",
    codeExample: "// Both are illegal: private abstract void a(); static abstract void b();"
  }
];

export default topic13_questions;