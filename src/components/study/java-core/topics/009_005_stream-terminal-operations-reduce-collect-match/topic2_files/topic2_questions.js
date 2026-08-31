const topic2_questions = [
  {
    "question": "What mathematical property must the accumulator function in reduce() satisfy for parallel safety?",
    "shortAnswer": "The accumulator function must be Associative: (a op b) op c must equal a op (b op c). Examples of associative operations include addition, multiplication, max, and min.",
    "explanation": "Associativity allows the stream engine to split the collection into arbitrary parallel chunks and combine their intermediate results safely.",
    "hint": "Associativity: order of grouping does not change the result.",
    "level": "Intermediate",
    "codeExample": "(a + b) + c === a + (b + c) // Associative\\n(a - b) - c !== a - (b - c) // NOT associative!"
  },
  {
    "question": "Why does the 1-argument reduce(BinaryOperator) return an Optional<T> instead of T?",
    "shortAnswer": "Because if the stream is empty, there is no initial identity value to return, so reduce() returns Optional.empty() rather than throwing an exception or returning null.",
    "explanation": "The Optional return type forces the caller to handle the empty stream case explicitly.",
    "hint": "Handles the case where the stream is empty without an identity fallback.",
    "level": "Beginner",
    "codeExample": "List.<Integer>of().stream().reduce((a, b) → a + b); // Returns Optional.empty()"
  }
];

export default topic2_questions;
