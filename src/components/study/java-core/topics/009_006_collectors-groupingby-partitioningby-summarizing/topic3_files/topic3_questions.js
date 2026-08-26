const topic3_questions = [
  {
    "question": "What stream element type is required to use Collectors.joining()?",
    "shortAnswer": "Stream elements must be of type CharSequence (such as String, StringBuilder, or CharBuffer). If stream elements are non-string objects or primitives, they must first be transformed via map(String::valueOf) or map(Object::toString).",
    "explanation": "joining() is typed as Collector<CharSequence, ?, String>.",
    "hint": "Stream elements must implement CharSequence (e.g. String).",
    "level": "Beginner",
    "codeExample": "ids.stream().map(String::valueOf).collect(Collectors.joining(', '));"
  },
  {
    "question": "What does Collectors.joining(', ', '[', ']') return on an EMPTY stream?",
    "shortAnswer": "It returns the prefix followed immediately by the suffix (i.e. '[]'), without any delimiter.",
    "explanation": "This produces clean empty collection representations without dangling delimiters.",
    "hint": "Returns 'prefix + suffix' (e.g. '[]').",
    "level": "Intermediate",
    "codeExample": "Stream.<String>empty().collect(Collectors.joining(', ', '[', ']')); // Returns '[]'"
  }
];

export default topic3_questions;
