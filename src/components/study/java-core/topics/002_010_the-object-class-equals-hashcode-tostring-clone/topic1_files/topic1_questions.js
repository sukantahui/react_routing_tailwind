const topic1_questions = [
  {
    question: "How many total methods are declared in 'java.lang.Object' and what are their primary categories?",
    shortAnswer: "Exactly 11 methods: 1. Identity & State: toString(), equals(), hashCode(), getClass(), clone(). 2. Thread Concurrency: wait() (3 overloads), notify(), notifyAll(). 3. Garbage Collection: finalize() (deprecated).",
    explanation: "Notice that wait, notify, notifyAll, and getClass are 'final' and cannot be overridden.",
    hint: "11 methods split into identity/comparison, thread concurrency, and GC finalization.",
    level: "Intermediate",
    codeExample: "// 5 Overridable methods: toString, equals, hashCode, clone, finalize"
  }
];

export default topic1_questions;