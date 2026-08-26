const topic4_questions = [
  {
    "question": "What symbol is used in Java generic declarations to separate multiple bounds (e.g. class and multiple interfaces)?",
    "shortAnswer": "The ampersand symbol '&' is used to join multiple bounds in Java generics: '<T extends SuperClass & InterfaceA & InterfaceB>'. Using commas (',') would declare a separate type parameter, which is a syntax error in a multiple-bound context.",
    "explanation": "Enforces multi-faceted contracts on generic type parameters.",
    "hint": "Ampersand '&' joins multiple bounds (e.g. '<T extends A & B>').",
    "level": "Beginner",
    "codeExample": "public <T extends Number & Comparable<T>> void process(T val) { ... }"
  }
];

export default topic4_questions;