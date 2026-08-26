const topic6_questions = [
  {
    "question": "What is 'Functional Composition' and how do default methods enable chaining across Java functional interfaces?",
    "shortAnswer": "'Functional Composition' is the design technique of assembling complex operations by combining simpler, discrete, single-purpose functions. Java achieves this by declaring 'default' methods directly on functional interfaces (e.g. 'Predicate.and()', 'Predicate.or()', 'Predicate.negate()', 'Function.andThen()', 'Function.compose()', and 'Consumer.andThen()'). Because default methods have concrete implementations, they do not violate the SAM rule while enabling fluent, readable, left-to-right or nested execution pipelines.",
    "explanation": "Architectural overview of functional interface composition in Java 8.",
    "hint": "Default methods on interfaces allow chaining small pure functions into complex pipelines without violating the SAM rule.",
    "level": "Intermediate",
    "codeExample": "Predicate<T> p = p1.and(p2).or(p3.negate()); Function<T, R> f = f1.andThen(f2);"
  }
];

export default topic6_questions;