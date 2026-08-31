const topic8_questions = [
  {
    "question": "What does anyMatch() return when invoked on an empty stream?",
    "shortAnswer": "It returns false immediately without evaluating the predicate.",
    "explanation": "Because an empty stream contains zero elements, there cannot be 'at least one' matching element.",
    "hint": "Returns false on empty stream.",
    "level": "Beginner",
    "codeExample": "List.of().stream().anyMatch(x → true); // false"
  },
  {
    "question": "What is the computational complexity of anyMatch() in best vs worst case?",
    "shortAnswer": "Best case: O(1) if the first element matches (short-circuits immediately). Worst case: O(N) if no elements match or only the final element matches.",
    "explanation": "This makes anyMatch much more efficient than filtering and counting.",
    "hint": "O(1) best case (first element matches), O(N) worst case.",
    "level": "Intermediate",
    "codeExample": "// Much faster than list.stream().filter(pred).count() > 0\\nlist.stream().anyMatch(pred);"
  }
];

export default topic8_questions;
