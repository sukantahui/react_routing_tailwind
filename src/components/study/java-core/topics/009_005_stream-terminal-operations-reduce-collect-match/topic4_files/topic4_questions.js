const topic4_questions = [
  {
    "question": "Why must the identity element satisfy accumulator(identity, x) == x?",
    "shortAnswer": "In parallel stream execution, the stream is divided into multiple substreams, each initialized with the identity element. If the identity is not mathematically neutral, each worker thread adds an invalid offset, corrupting the final combined result.",
    "explanation": "For example, using 10 as identity for addition in a 4-thread parallel stream will erroneously add 10 * 4 = 40 to the total sum.",
    "hint": "Each parallel worker thread uses identity as initial state.",
    "level": "Advanced",
    "codeExample": "// BAD: Identity 10 for sum in parallel adds 10 per thread!\\nlist.parallelStream().reduce(10, Integer::sum); // WRONG RESULT!"
  },
  {
    "question": "What is returned when 2-argument reduce() is called on an empty stream?",
    "shortAnswer": "It directly returns the provided identity value without executing the accumulator.",
    "explanation": "This eliminates the need for Optional checks in client code.",
    "hint": "Returns the identity value directly.",
    "level": "Beginner",
    "codeExample": "List.<Integer>of().stream().reduce(0, Integer::sum); // Returns 0"
  }
];

export default topic4_questions;
