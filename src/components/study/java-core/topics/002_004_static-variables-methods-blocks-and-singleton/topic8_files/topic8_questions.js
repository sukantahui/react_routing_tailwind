const topic8_questions = [
  {
    question: "What is a Static Initialization Block (SIB) in Java and when does it execute?",
    shortAnswer: "An unnamed block declared with 'static { ... }' that executes exactly ONCE when the class is loaded into Metaspace memory by the JVM ClassLoader.",
    explanation: "Used to initialize complex static data structures, load native C/C++ libraries ('System.loadLibrary'), or load database drivers.",
    hint: "Executes once when class is loaded into memory.",
    level: "Beginner",
    codeExample: "static { /* Initialize static constants / database drivers */ }"
  }
];

export default topic8_questions;