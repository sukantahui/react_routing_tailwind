const topic16_questions = [
  {
    "question": "Which JVM flag automatically captures a heap dump file (.hprof) when an OutOfMemoryError occurs in production?",
    "shortAnswer": "-XX:+HeapDumpOnOutOfMemoryError (combined with -XX:HeapDumpPath=/var/logs/dump.hprof) automatically generates a snapshot of all heap objects for post-mortem debugging in Eclipse MAT or VisualVM.",
    "explanation": "Indispensable production diagnostic setting for enterprise JVM applications.",
    "hint": "-XX:+HeapDumpOnOutOfMemoryError",
    "level": "Beginner",
    "codeExample": "java -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/logs/dump.hprof -jar app.jar"
  },
  {
    "question": "What causes 'java.lang.OutOfMemoryError: GC overhead limit exceeded'?",
    "shortAnswer": "The JVM throws this error when the application spends more than 98% of its CPU time executing garbage collection but reclaims less than 2% of the heap, preventing the application from freezing in an endless GC loop.",
    "explanation": "Early warning circuit breaker before hard heap exhaustion.",
    "hint": "Spends >98% time in GC and reclaims <2% heap memory.",
    "level": "Intermediate",
    "codeExample": "Early detection circuit breaker against GC thrashing."
  }
];

export default topic16_questions;
