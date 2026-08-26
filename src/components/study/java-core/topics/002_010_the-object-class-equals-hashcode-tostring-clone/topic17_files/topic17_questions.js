const topic17_questions = [
  {
    question: "Why was 'Object.finalize()' deprecated in Java 9 (and deprecated for removal in Java 18), and what replaces it?",
    shortAnswer: "'finalize()' was unpredictable, unreliable, could resurrect dead objects, and severely degraded garbage collection performance. It is replaced by 'AutoCloseable' with 'try-with-resources' and 'java.lang.ref.Cleaner'.",
    explanation: "Never use finalize() in modern Java applications.",
    hint: "Unpredictable timing and GC drag; replaced by try-with-resources and java.lang.ref.Cleaner.",
    level: "Advanced",
    codeExample: "try (Resource r = new Resource()) { /* auto-cleaned */ }"
  }
];

export default topic17_questions;