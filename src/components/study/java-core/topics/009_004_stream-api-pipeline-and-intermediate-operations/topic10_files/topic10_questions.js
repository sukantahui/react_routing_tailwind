const topic10_questions = [
  {
    "question": "What is 'Loop Fusion' in the Java Stream API?",
    "shortAnswer": "Loop Fusion is a stream engine optimization where multiple chained intermediate operations (e.g. filter, map, filter) are merged into a single pass per element rather than executing multiple iterations over the whole collection.",
    "explanation": "This drastically reduces memory allocation and enhances CPU cache locality.",
    "hint": "Fusing multiple operations into a single pass per element.",
    "level": "Intermediate",
    "codeExample": "list.stream().filter(f).map(m).findFirst(); // Only evaluates elements until 1st match passes both f and m!"
  },
  {
    "question": "Which stream operations qualify as 'short-circuiting' operations?",
    "shortAnswer": "Intermediate short-circuiting: limit(), takeWhile() (Java 9). Terminal short-circuiting: findFirst(), findAny(), anyMatch(), allMatch(), noneMatch().",
    "explanation": "Short-circuiting operations can finish processing before inspecting the entire stream source.",
    "hint": "Operations that can finish without inspecting all source elements.",
    "level": "Intermediate",
    "codeExample": "Stream.iterate(1, n -> n + 1).limit(5).toList(); // Short-circuits infinite generator at 5 elements."
  }
];

export default topic10_questions;
