const topic7_questions = [
  {
    "question": "Why is 'String[]::new' used with 'Stream.toArray()' instead of calling the parameterless 'Stream.toArray()'?",
    "shortAnswer": "Due to Java Generics type erasure, the parameterless 'stream.toArray()' does not know the runtime element type and is forced to return a raw 'Object[]', requiring unsafe downcasting ('(String[]) array') which fails at runtime. Passing the Array Constructor Reference 'stream.toArray(String[]::new)' supplies an 'IntFunction<String[]>' factory (size -> new String[size]), allowing the Stream runtime to allocate a perfectly sized, 100% type-safe 'String[]' array without unchecked cast warnings.",
    "explanation": "Type-safe array extraction from Streams using array constructor references.",
    "hint": "stream.toArray() returns raw Object[]; stream.toArray(String[]::new) returns type-safe String[] array.",
    "level": "Intermediate",
    "codeExample": "String[] arr = stream.toArray(String[]::new);"
  }
];

export default topic7_questions;