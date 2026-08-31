const topic9_questions = [
  {
    "question": "Under what condition does allMatch() short-circuit and terminate early?",
    "shortAnswer": "allMatch() short-circuits as soon as ANY single element evaluates the predicate to false. Once a failing element is discovered, subsequent elements are never evaluated.",
    "explanation": "A single false result is sufficient to prove that not all elements match.",
    "hint": "Short-circuits on the first false evaluation.",
    "level": "Beginner",
    "codeExample": "List.of(2, 4, 5, 8).stream().allMatch(n → n % 2 == 0); // Stops at 5 and returns false"
  },
  {
    "question": "Why does allMatch() return true on an empty stream while anyMatch() returns false?",
    "shortAnswer": "Because allMatch asserts that no element violates the condition (which is vacuously true for empty sets), whereas anyMatch asserts that at least one matching element exists (which is false for empty sets).",
    "explanation": "This follows universal vs existential quantifier rules in mathematical logic.",
    "hint": "allMatch tests for absence of counter-examples; anyMatch tests for presence of an example.",
    "level": "Intermediate",
    "codeExample": "Stream.empty().allMatch(x → false); // Returns true!\\nStream.empty().anyMatch(x → true);  // Returns false!"
  }
];

export default topic9_questions;
