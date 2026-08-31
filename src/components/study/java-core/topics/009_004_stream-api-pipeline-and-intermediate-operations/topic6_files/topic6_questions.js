const topic6_questions = [
  {
    "question": "What is the difference between Stream.of(null) and Stream.ofNullable(null)?",
    "shortAnswer": "Stream.of(null) produces a stream with 1 element whose value is null, whereas Stream.ofNullable(null) produces a clean, empty stream of size 0.",
    "explanation": "Stream.ofNullable was introduced in Java 9 specifically to safely bridge nullable references into stream pipelines without NPEs.",
    "hint": "Stream.of(null) has size 1 (contains null); Stream.ofNullable(null) has size 0 (empty).",
    "level": "Intermediate",
    "codeExample": "Stream.of(null).count(); // Returns 1\\nStream.ofNullable(null).count(); // Returns 0"
  },
  {
    "question": "How is flatMap(Stream::ofNullable) used to eliminate nulls from a pipeline?",
    "shortAnswer": "When flatMap receives Stream.ofNullable(fn(x)), null results turn into empty streams (which disappear during flattening) while non-null results turn into 1-element streams, cleanly pruning nulls.",
    "explanation": "This provides a functional idiom for mapping and filtering nulls simultaneously.",
    "hint": "Empty streams vanish in flatMap operations.",
    "level": "Intermediate",
    "codeExample": "names.stream().flatMap(name → Stream.ofNullable(getPhone(name))).toList();"
  }
];

export default topic6_questions;
