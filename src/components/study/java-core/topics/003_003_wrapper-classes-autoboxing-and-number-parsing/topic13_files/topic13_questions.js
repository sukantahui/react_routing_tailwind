const topic13_questions = [
  {
    question: "Why is 'Integer.compare(a, b)' preferred over 'a - b' when implementing Comparators in Java?",
    shortAnswer: "Using subtraction 'a - b' suffers from catastrophic integer underflow/overflow bugs when comparing extreme values (e.g. Integer.MIN_VALUE - 1 wraps around to positive). 'Integer.compare(a, b)' evaluates boolean inequalities without arithmetic subtraction, guaranteeing mathematical correctness.",
    explanation: "Always use static type compare methods for Comparator lambdas.",
    hint: "Prevents catastrophic integer overflow/underflow bugs caused by subtraction.",
    level: "Advanced",
    codeExample: "(a, b) -> Integer.compare(a, b); // Overflow-safe sorting comparator"
  }
];

export default topic13_questions;