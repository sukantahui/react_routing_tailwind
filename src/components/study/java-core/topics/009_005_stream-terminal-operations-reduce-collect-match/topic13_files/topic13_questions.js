const topic13_questions = [
  {
    "question": "What is the return type of Stream.count()?",
    "shortAnswer": "Stream.count() returns a 64-bit primitive long (not int or Optional), enabling counting streams with billions of elements.",
    "explanation": "Collections size() returns int, but Streams count() returns long.",
    "hint": "Returns a primitive 64-bit long.",
    "level": "Beginner",
    "codeExample": "long count = stream.count();"
  },
  {
    "question": "Why do min() and max() return Optional<T> instead of throwing an exception on empty streams?",
    "shortAnswer": "Returning Optional<T> provides a null-safe, functional mechanism to handle the case where the stream contains zero elements without abruptly throwing exceptions.",
    "explanation": "Allows clean integration with orElseThrow() or ifPresent().",
    "hint": "Null-safe handling of empty streams.",
    "level": "Beginner",
    "codeExample": "list.stream().max(Comparator.naturalOrder()).orElse(0);"
  }
];

export default topic13_questions;
