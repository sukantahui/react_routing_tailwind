const topic0_questions = [
  {
    "question": "What is the primary role of a terminal operation in a Java Stream pipeline?",
    "shortAnswer": "A terminal operation initiates stream traversal, triggers the deferred execution of all intermediate operations, gathers the computed result (or executes a side-effect), and closes the stream.",
    "explanation": "Without a terminal operation, intermediate operations are never executed.",
    "hint": "Ignites execution, consumes the stream, and produces a final non-stream result or side-effect.",
    "level": "Beginner",
    "codeExample": "long count = list.stream().filter(s → s.length() > 5).count(); // count() is terminal"
  },
  {
    "question": "Can a stream have more than one terminal operation?",
    "shortAnswer": "No. A stream can have at most one terminal operation. After it executes, the stream instance is closed and attempting any further operations throws an IllegalStateException.",
    "explanation": "To process the underlying data again, a new Stream instance must be created from the source.",
    "hint": "Exactly 1 terminal operation per stream instance.",
    "level": "Beginner",
    "codeExample": "Stream<String> s = list.stream();\\ns.toList();\\ns.count(); // Throws IllegalStateException!"
  }
];

export default topic0_questions;
