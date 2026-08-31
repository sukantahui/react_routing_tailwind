const topic5_questions = [
  {
    "question": "Why is the Combiner parameter in 3-argument reduce() ignored during sequential stream execution?",
    "shortAnswer": "In a sequential stream, all elements are processed sequentially by a single thread in a continuous loop, so there are never multiple partial results that need to be merged.",
    "explanation": "The Combiner is only activated when stream execution is parallelized across multiple threads.",
    "hint": "Sequential execution uses a single thread; combiner is only needed to merge multiple thread results.",
    "level": "Intermediate",
    "codeExample": "stream.reduce(0, (sum, item) → sum + item.val(), Integer::sum);"
  },
  {
    "question": "What is the key advantage of 3-argument reduce over 2-argument reduce?",
    "shortAnswer": "3-argument reduce allows changing the output type (from Stream<T> to result type U), eliminating the need for a preceding map() step.",
    "explanation": "2-argument reduce requires the input and accumulator type to be identical (Stream<T> → T).",
    "hint": "Allows accumulator result type U to differ from stream element type T.",
    "level": "Intermediate",
    "codeExample": "// Type of input is Student, type of output is Integer (total score)\\nstudents.stream().reduce(0, (tot, s) → tot + s.getScore(), Integer::sum);"
  }
];

export default topic5_questions;
