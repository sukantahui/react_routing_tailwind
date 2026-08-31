const topic0_questions = [
  {
    "question": "Why does the JVM use both an Interpreter and a JIT Compiler instead of only a JIT Compiler?",
    "shortAnswer": "The Interpreter allows the Java application to start executing immediately without waiting for upfront compilation. The JIT Compiler compiles only frequently executed 'hot' code into native machine instructions in the background, combining fast startup with peak runtime performance.",
    "explanation": "Pioneered by the Sun HotSpot research team.",
    "hint": "Combines zero startup delay (Interpreter) with peak peak performance (JIT).",
    "level": "Beginner",
    "codeExample": "Startup → Interpreter; Hot Spots → JIT Native Compilation"
  },
  {
    "question": "Where does the JVM store JIT-compiled native machine code in memory?",
    "shortAnswer": "In the CodeCache, a dedicated native memory area allocated by the HotSpot JVM outside the Java Heap.",
    "explanation": "Sized via -XX:ReservedCodeCacheSize.",
    "hint": "The CodeCache (native memory).",
    "level": "Intermediate",
    "codeExample": "-XX:ReservedCodeCacheSize=256m"
  }
];

export default topic0_questions;
