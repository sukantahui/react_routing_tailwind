const topic9_questions = [
  {
    "question": "Why does 'if (obj instanceof List<String>)' fail compilation in Java, and what is the valid wildcard alternative?",
    "shortAnswer": "'List<String>' is a 'non-reifiable' type whose type argument '<String>' is erased at compile time. At runtime, the JVM only knows the object is a 'List' and cannot verify whether its elements are Strings. Therefore, 'instanceof List<String>' is illegal. The valid alternative is checking against the unbounded wildcard 'if (obj instanceof List<?>)' or raw 'if (obj instanceof List)'.",
    "explanation": "Reifiable vs Non-Reifiable type rules in Java.",
    "hint": "Type information is erased at runtime; check against 'List<?>' or raw 'List' instead.",
    "level": "Intermediate",
    "codeExample": "if (obj instanceof List<?> list) { ... } // Legal pattern matching check"
  }
];

export default topic9_questions;