const topic6_questions = [
  {
    "question": "What is a 'Recursive Type Bound' in Java Generics, and why is '<T extends Comparable<T>>' the canonical example?",
    "shortAnswer": "A Recursive Type Bound is a generic declaration where a type variable appears within its own bounding constraint. In '<T extends Comparable<T>>', 'T' is bound to 'Comparable<T>', ensuring that elements of type 'T' can be compared directly to other elements of the exact same type 'T' via 'compareTo(T other)', eliminating runtime type mismatches during sorting and searching.",
    "explanation": "Effective Java Item 30: Use recursive type bounds for mutual comparability.",
    "hint": "A bound where type variable T appears inside its own bound, guaranteeing mutual comparability.",
    "level": "Advanced",
    "codeExample": "public static <T extends Comparable<T>> T max(Collection<T> c) { ... }"
  }
];

export default topic6_questions;