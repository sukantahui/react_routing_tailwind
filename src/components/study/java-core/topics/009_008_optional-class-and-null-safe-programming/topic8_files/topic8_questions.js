const topic8_questions = [
  {
    "question": "Why does orElse(computeDefault()) execute computeDefault() even when the Optional contains a value?",
    "shortAnswer": "Because Java is a pass-by-value language that evaluates method arguments before calling the method. The JVM must compute the return value of computeDefault() first to pass it as the parameter to orElse().",
    "explanation": "orElseGet avoids this by passing a functional Supplier lambda instead of a precomputed value.",
    "hint": "Java evaluates method parameters eagerly before method invocation.",
    "level": "Intermediate",
    "codeExample": "opt.orElse(heavyMethod()); // heavyMethod() runs unconditionally before orElse starts!"
  },
  {
    "question": "What is the memory and performance risk of using orElse(new ArrayList<>()) in a high-throughput loop?",
    "shortAnswer": "A new ArrayList instance will be allocated on the heap during every single iteration, causing high memory churn and GC pressure even if 99% of the Optionals are present.",
    "explanation": "Use orElseGet(ArrayList::new) to allocate only on empty Optionals.",
    "hint": "Creates wasteful heap allocations on every iteration.",
    "level": "Intermediate",
    "codeExample": "opt.orElseGet(ArrayList::new); // Zero allocation when present!"
  }
];

export default topic8_questions;
