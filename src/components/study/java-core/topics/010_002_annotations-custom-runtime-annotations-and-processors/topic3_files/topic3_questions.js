const topic3_questions = [
  {
    "question": "What is the default retention policy if @Retention is omitted from a custom annotation?",
    "shortAnswer": "RetentionPolicy.CLASS is the default. The annotation is recorded in the .class bytecode file but is not loaded into JVM memory at runtime, making it invisible to Reflection.",
    "explanation": "One of the most common beginner bugs in custom annotation development.",
    "hint": "RetentionPolicy.CLASS",
    "level": "Beginner",
    "codeExample": "public @interface MissingRetention {} // Defaults to CLASS (invisible at runtime)"
  },
  {
    "question": "Why does Lombok use RetentionPolicy.SOURCE for its annotations?",
    "shortAnswer": "Because Lombok processes annotations during compilation (via Annotation Processing API) to generate getters/setters directly into bytecode, rendering the annotations unnecessary in the compiled .class files at runtime.",
    "explanation": "Keeps bytecode lean and eliminates runtime overhead.",
    "hint": "Lombok generates code at compile time, so runtime retention is not needed.",
    "level": "Intermediate",
    "codeExample": "@Getter @Setter // Discarded after bytecode is generated"
  }
];

export default topic3_questions;
