const topic7_questions = [
  {
    "question": "Why does 'first.doubleValue() + second.doubleValue()' solve the arithmetic operator limitation on Java generic type parameters?",
    "shortAnswer": "In Java, standard arithmetic operators (+, -, *, /) cannot be directly applied to generic type variables ('T a, T b') because Java does not support operator overloading. By bounding 'T' to '<T extends Number>', we extract their primitive double values via 'doubleValue()' and perform high-precision arithmetic calculations natively.",
    "explanation": "Standard design pattern for numeric mathematical abstractions in Java.",
    "hint": "Generics don't support operator overloading; converting to primitive doubleValue() enables math operations.",
    "level": "Intermediate",
    "codeExample": "public double add() { return a.doubleValue() + b.doubleValue(); }"
  }
];

export default topic7_questions;