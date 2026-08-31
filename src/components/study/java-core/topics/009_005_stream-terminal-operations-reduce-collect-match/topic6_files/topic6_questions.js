const topic6_questions = [
  {
    "question": "Why should you NOT use reduce() to accumulate elements into an ArrayList?",
    "shortAnswer": "reduce() is designed for functional immutability where each accumulation step returns a new value. Using reduce() to create and copy ArrayLists incurs O(N^2) overhead; use collect(Collectors.toList()) instead, which mutates a single container efficiently.",
    "explanation": "collect() performs mutable reduction, whereas reduce() performs immutable value reduction.",
    "hint": "reduce() copies on each step; collect() uses mutable accumulation.",
    "level": "Advanced",
    "codeExample": "// BAD: O(N^2) allocation overhead!\\nlist.stream().reduce(new ArrayList<>(), (acc, x) → { acc.add(x); return acc; });"
  },
  {
    "question": "How can you find the object with the maximum value using reduce and a Comparator?",
    "shortAnswer": "Using BinaryOperator.maxBy(comparator) as the accumulator argument in reduce().",
    "explanation": "BinaryOperator.maxBy(comp) returns a BinaryOperator that yields the greater of two elements according to the comparator.",
    "hint": "BinaryOperator.maxBy(comparator)",
    "level": "Intermediate",
    "codeExample": "Optional<Student> top = list.stream().reduce(BinaryOperator.maxBy(Comparator.comparing(Student::getScore)));"
  }
];

export default topic6_questions;
