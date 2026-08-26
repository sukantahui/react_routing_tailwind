const topic7_questions = [
  {
    "question": "What is the difference between Stream.iterate() and Stream.generate()?",
    "shortAnswer": "Stream.iterate() produces an ordered sequence where each element depends on the preceding element (stateful iteration: f(prev)), whereas Stream.generate() calls an independent Supplier<T> for each element without knowledge of previous elements.",
    "explanation": "iterate is great for mathematical series (e.g. n+2, Fibonacci), while generate is great for independent values (e.g. UUID, Math.random).",
    "hint": "iterate is sequential/dependent on previous value; generate calls a Supplier independently.",
    "level": "Intermediate",
    "codeExample": "Stream.iterate(1, n -> n * 2); // 1, 2, 4, 8, 16...\\nStream.generate(UUID::randomUUID); // independent UUIDs"
  },
  {
    "question": "How does the Java 9 three-argument Stream.iterate() mimic a traditional for loop?",
    "shortAnswer": "Stream.iterate(seed, hasNext, next) maps directly to for(initialization; condition; update), terminating as soon as the hasNext predicate evaluates to false.",
    "explanation": "This eliminates the need to remember to attach .takeWhile() or .limit() when generating bounded ranges.",
    "hint": "seed = init, predicate = condition, unaryOperator = increment.",
    "level": "Beginner",
    "codeExample": "Stream.iterate(0, i -> i < 10, i -> i + 1) === for(int i=0; i<10; i++)"
  }
];

export default topic7_questions;
