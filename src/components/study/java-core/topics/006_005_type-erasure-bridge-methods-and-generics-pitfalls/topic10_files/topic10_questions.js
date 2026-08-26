const topic10_questions = [
  {
    "question": "Why does Java forbid creating arrays of parameterized types like 'new List<String>[10]' (Effective Java Item 28)?",
    "shortAnswer": "Arrays are 'covariant and reified' (knowing and enforcing their element types at runtime). Generics are 'invariant and non-reified' (erasing type arguments at compile time). If generic arrays were allowed, an array of 'List<String>[]' could be assigned to 'Object[]', allowing code to insert a 'List<Integer>' into it without triggering 'ArrayStoreException', completely breaking Java's type safety guarantees.",
    "explanation": "Effective Java Item 28: Prefer lists to arrays.",
    "hint": "Array covariance combined with generic type erasure would cause untyped heap corruption.",
    "level": "Advanced",
    "codeExample": "// List<String>[] a = new List<String>[10]; // Compile Error! Use List<List<String>>"
  }
];

export default topic10_questions;