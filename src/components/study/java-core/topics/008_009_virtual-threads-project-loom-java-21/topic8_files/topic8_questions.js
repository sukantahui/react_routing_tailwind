const topic8_questions = [
  {
    "question": "How does the 'Thread.ofVirtual()' builder allow configuring thread names, sequence numbers, and reusable ThreadFactory instances?",
    "shortAnswer": "'Thread.ofVirtual()' returns a 'Thread.Builder.OfVirtual' builder interface. Calling '.name(\"prefix-\", startNumber)' configures an auto-incrementing naming pattern (e.g. 'prefix-1', 'prefix-2') for debugging telemetry. Calling '.start(runnable)' builds and starts the thread immediately; calling '.unstarted(runnable)' builds it in the NEW state; and calling '.factory()' produces a standard 'java.util.concurrent.ThreadFactory' configured to instantiate virtual threads.",
    "explanation": "Fluent builder API design in Java 21 (JEP 444).",
    "hint": "Returns Thread.Builder.OfVirtual; supports .name(prefix, start), .start(runnable), .unstarted(runnable), and .factory().",
    "level": "Intermediate",
    "codeExample": "ThreadFactory factory = Thread.ofVirtual().name(\"worker-\", 1).factory();"
  }
];

export default topic8_questions;