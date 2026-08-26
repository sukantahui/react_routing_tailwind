const topic9_questions = [
  {
    "question": "What is 'Heap Pollution' in Java Generics, and what are the 3 strict rules for using the '@SafeVarargs' annotation?",
    "shortAnswer": "Heap Pollution occurs when a variable of a parameterized type (e.g. List<String>) refers to an object that is not of that type (e.g. List<Integer>), causing hidden ClassCastExceptions at runtime. '@SafeVarargs' asserts that a generic varargs method is safe. Rules (Effective Java Item 32): 1. Method must be static, final, or private. 2. Must never write elements into the varargs array. 3. Must never allow the varargs array reference to escape.",
    "explanation": "Crucial contract to ensure type safety when combining arrays and generic varargs.",
    "hint": "Heap pollution is storing wrong generic types into arrays; @SafeVarargs requires static/final, no writes to varargs, and no escaping.",
    "level": "Advanced",
    "codeExample": "@SafeVarargs public static <T> List<T> of(T... items) { ... }"
  }
];

export default topic9_questions;