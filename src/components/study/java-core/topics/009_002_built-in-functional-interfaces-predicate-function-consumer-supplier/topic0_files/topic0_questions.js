const topic0_questions = [
  {
    "question": "Why did Java 8 introduce the 'java.util.function' package with 43 built-in functional interfaces?",
    "shortAnswer": "To establish a universal functional vocabulary across the Java ecosystem. Without 'java.util.function', every library and developer would create custom single-method interfaces (e.g. 'MyFilter', 'MyTransformer'), resulting in incompatible APIs. The 43 built-in interfaces (centered around Predicate, Function, Consumer, and Supplier, along with their Bi, Operator, and primitive specializations) provide a standardized target type for all Stream operations, collections utilities, and lambda expressions.",
    "explanation": "Core architecture and standard taxonomy of java.util.function.",
    "hint": "Standardizes functional APIs across Java, centered around the 4 core families: Predicate, Function, Consumer, and Supplier.",
    "level": "Beginner",
    "codeExample": "Predicate<T>, Function<T, R>, Consumer<T>, Supplier<T>"
  }
];

export default topic0_questions;