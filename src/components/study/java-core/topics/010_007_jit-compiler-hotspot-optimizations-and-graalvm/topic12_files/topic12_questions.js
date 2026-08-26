const topic12_questions = [
  {
    "question": "What is SubstrateVM in the context of GraalVM Native Image?",
    "shortAnswer": "SubstrateVM is a lightweight, embeddable virtual machine runtime written in Java that is compiled directly into the native binary, providing essential runtime facilities like garbage collection, thread management, and stack unwinding without requiring an external JVM.",
    "explanation": "Powers standalone native execution without an external JDK.",
    "hint": "The embedded lightweight runtime providing GC and thread management inside the binary.",
    "level": "Intermediate",
    "codeExample": "Native Binary = Application Code + SubstrateVM Runtime."
  },
  {
    "question": "How does AOT compilation differ fundamentally from JIT compilation?",
    "shortAnswer": "AOT compilation converts bytecode into native machine code statically ahead-of-time during the build process before the application ever runs, whereas JIT compilation converts bytecode dynamically at runtime while the program executes.",
    "explanation": "Trades build time for instant runtime startup.",
    "hint": "AOT compiles during build time; JIT compiles dynamically at runtime.",
    "level": "Beginner",
    "codeExample": "AOT: Build-time native compilation; JIT: Runtime adaptive compilation."
  }
];

export default topic12_questions;
