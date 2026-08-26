const topic1_questions = [
  {
    "question": "Can a stream execute intermediate filter() operations in parallel and subsequent map() operations sequentially?",
    "shortAnswer": "No. A stream pipeline is unified and executes in exactly one mode (either 100% sequential or 100% parallel). The last call to .parallel() or .sequential() controls the entire pipeline.",
    "explanation": "The JVM does not support mixed-mode pipeline stages.",
    "hint": "The last call to parallel() or sequential() sets the mode for the whole stream.",
    "level": "Intermediate",
    "codeExample": "stream.parallel().filter(...).sequential().map(...); // Entire pipeline runs sequentially!"
  },
  {
    "question": "How do you check at runtime whether a Stream instance is currently configured for parallel execution?",
    "shortAnswer": "By calling the isParallel() boolean method on the Stream instance.",
    "explanation": "Returns true if the terminal operation would execute in parallel.",
    "hint": "stream.isParallel()",
    "level": "Beginner",
    "codeExample": "if (stream.isParallel()) { System.out.println('Parallel mode active'); }"
  }
];

export default topic1_questions;
