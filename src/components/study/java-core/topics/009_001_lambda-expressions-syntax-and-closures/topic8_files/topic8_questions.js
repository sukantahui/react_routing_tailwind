const topic8_questions = [
  {
    "question": "What is 'Variable Capture' in Java Lambda expressions and what does the 'Effectively Final' requirement mean?",
    "shortAnswer": "1. 'Variable Capture': When a lambda expression references a local variable declared in its enclosing method, it 'captures' a copy of that variable's value into its closure. 2. 'Effectively Final': A local variable is 'Effectively Final' if it is assigned exactly once and its value is never mutated after initialization, even if the explicit 'final' keyword is omitted. The Java compiler verifies this at compile time and prohibits capturing any local variable that is reassigned elsewhere in the enclosing method.",
    "explanation": "Core closure mechanics and variable capture rules in Java 8.",
    "hint": "Local variables captured by lambdas must never be reassigned (assigned once and never mutated).",
    "level": "Intermediate",
    "codeExample": "int discount = 10; Function<Integer, Integer> f = price -> price - discount; // discount is effectively final"
  }
];

export default topic8_questions;