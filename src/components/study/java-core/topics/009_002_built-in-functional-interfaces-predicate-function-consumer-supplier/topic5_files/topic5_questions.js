const topic5_questions = [
  {
    "question": "What is 'Supplier<T>' in Java and how does it enable Lazy Evaluation in methods like 'Optional.orElseGet()'?",
    "shortAnswer": "'Supplier<T>' represents a supplier of results that takes zero arguments and returns an instance of type T ('T get()'). It is the cornerstone of 'Lazy Evaluation'. In methods like 'Optional.orElseGet(supplier)', the expensive computation inside the lambda is NOT executed upfront; it is invoked only on-demand if and when the Optional is truly empty, saving CPU cycles and database bandwidth compared to eager evaluation ('Optional.orElse(expensiveCall())').",
    "explanation": "Core lazy factory evaluation pattern in java.util.function.",
    "hint": "Takes zero arguments, returns T; defers execution on-demand for lazy evaluation.",
    "level": "Intermediate",
    "codeExample": "Supplier<Double> random = () → Math.random(); Double val = random.get();"
  }
];

export default topic5_questions;