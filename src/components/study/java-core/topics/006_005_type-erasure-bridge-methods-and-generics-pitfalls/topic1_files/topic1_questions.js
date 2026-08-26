const topic1_questions = [
  {
    "question": "During type erasure, what type replaces 'T' in '<T>' vs '<T extends Comparable<T> & Serializable>' in compiled bytecode?",
    "shortAnswer": "1. In unbounded '<T>', 'T' is replaced with 'java.lang.Object'. 2. In multiple bounds '<T extends Comparable<T> & Serializable>', 'T' is replaced with the FIRST bound in the list ('Comparable'). The compiler generates synthetic bridge casts if methods from subsequent interface bounds are accessed.",
    "explanation": "Defined by JLS 4.6: Type Erasure rules.",
    "hint": "Unbounded erases to Object; multiple bounds erases to the first bound in the list.",
    "level": "Intermediate",
    "codeExample": "class Multi<T extends Number & Serializable> // 'T' erases to 'Number'"
  }
];

export default topic1_questions;