const topic3_questions = [
  {
    "question": "How many times is the accumulator lambda invoked in a 1-argument reduce() for a stream with N elements?",
    "shortAnswer": "The accumulator lambda is invoked exactly (N - 1) times because the very first element serves as the initial accumulator state.",
    "explanation": "For a stream of 1 element, the accumulator is invoked 0 times and the element is returned directly in an Optional.",
    "hint": "Invoked N - 1 times.",
    "level": "Intermediate",
    "codeExample": "List.of(10).stream().reduce((a, b) → a + b); // Accumulator called 0 times, returns Optional.of(10)"
  },
  {
    "question": "What is the primary difference between 1-argument reduce and 2-argument reduce?",
    "shortAnswer": "1-argument reduce takes no identity and returns Optional<T> (to safely represent empty streams), while 2-argument reduce takes an initial identity T and directly returns T.",
    "explanation": "The identity value in 2-argument reduce serves as the default result for empty streams.",
    "hint": "1-argument returns Optional<T>; 2-argument returns T.",
    "level": "Beginner",
    "codeExample": "Optional<Integer> opt = list.stream().reduce(Integer::sum);\\nint total = list.stream().reduce(0, Integer::sum);"
  }
];

export default topic3_questions;
