const topic14_questions = [
  {
    "question": "How does Optional.stream() simplify transforming Stream<Optional<T>> to Stream<T> in Java 9+?",
    "shortAnswer": "Using stream.flatMap(Optional::stream). For present Optionals, it produces a 1-element stream that is unwrapped; for empty Optionals, it produces a 0-element stream that is discarded during flattening.",
    "explanation": "Replaces .filter(Optional::isPresent).map(Optional::get).",
    "hint": "stream.flatMap(Optional::stream)",
    "level": "Intermediate",
    "codeExample": "List<User> users = userIds.stream().map(repo::findById).flatMap(Optional::stream).toList();"
  },
  {
    "question": "What does Optional.empty().stream().count() return?",
    "shortAnswer": "It returns 0L, representing an empty stream of size 0.",
    "explanation": "Optional.of('val').stream().count() returns 1L.",
    "hint": "Returns 0L.",
    "level": "Beginner",
    "codeExample": "Optional.empty().stream().count(); // 0"
  }
];

export default topic14_questions;
