const topic14_questions = [
  {
    "question": "Why is stream.toArray(String[]::new) preferred over stream.toArray()?",
    "shortAnswer": "stream.toArray() returns an Object[] which loses compile-time type safety, whereas stream.toArray(String[]::new) uses an array constructor reference to return a strongly-typed String[] array.",
    "explanation": "String[]::new passes an IntFunction that allocates the exact sized array.",
    "hint": "Returns strongly-typed array instead of generic Object[].",
    "level": "Beginner",
    "codeExample": "String[] arr = stream.toArray(String[]::new);"
  },
  {
    "question": "What functional interface does the parameter of toArray(generator) represent?",
    "shortAnswer": "It represents java.util.function.IntFunction<A[]>, which receives the required array size (int) and returns a newly allocated array of that size.",
    "explanation": "The method reference Type[]::new matches IntFunction<Type[]>: (int size) -> new Type[size].",
    "hint": "IntFunction<A[]>",
    "level": "Intermediate",
    "codeExample": "IntFunction<String[]> gen = String[]::new; // size -> new String[size]"
  }
];

export default topic14_questions;
