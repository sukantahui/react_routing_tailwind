const topic14_questions = [
  {
    "question": "Why is a 'Collections.unmodifiableList' considered a 'read-only view' rather than a 'truly immutable collection'?",
    "shortAnswer": "'Collections.unmodifiableList' wraps an existing collection: while any mutation called directly on the unmodifiable wrapper throws 'UnsupportedOperationException', changes made to the underlying original backing list are immediately reflected in the wrapper. To create a truly immutable independent copy, Java 9+ provides 'List.copyOf(original)' or 'List.of()'.",
    "explanation": "Crucial difference between unmodifiable view decorators and true immutable snapshots.",
    "hint": "It is only a view: modifying the original list changes the unmodifiable view too.",
    "level": "Intermediate",
    "codeExample": "List<String> view = Collections.unmodifiableList(orig); orig.add(\"x\"); // view reflects \"x\"!"
  }
];

export default topic14_questions;