const topic17_questions = [
  {
    "question": "Why is peek() intended strictly for debugging rather than business logic?",
    "shortAnswer": "peek() exists mainly to support debugging, where you want to see the elements as they flow past a certain point in a pipeline. Relying on peek() for side-effects violates functional purity and JDK stream optimizers can skip peek() when element traversal is not needed.",
    "explanation": "In Java 9+, operations like stream.filter(...).peek(...).count() can optimize away peek calls entirely if the count is known from collection sizing.",
    "hint": "Intended for logging/debugging; optimizers can skip peek in certain pipelines.",
    "level": "Intermediate",
    "codeExample": "stream.peek(x → log.debug('Processing: {}', x)).map(Transformer::run)"
  },
  {
    "question": "What is the difference between peek() and forEach()?",
    "shortAnswer": "peek() is an Intermediate operation that returns a Stream and is evaluated lazily; forEach() is a Terminal operation that returns void, consumes the stream, and triggers pipeline execution.",
    "explanation": "Calling peek() without a terminal operation does nothing.",
    "hint": "peek is intermediate (returns Stream); forEach is terminal (returns void).",
    "level": "Beginner",
    "codeExample": "list.stream().peek(System.out::println); // Does not run!\\nlist.stream().forEach(System.out::println); // Runs immediately."
  }
];

export default topic17_questions;
