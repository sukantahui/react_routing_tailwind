const topic7_questions = [
  {
    "question": "Why must the type parameter in 'public static <T extends Comparable<T>> T findMax(T[] array)' have a bounded type?",
    "shortAnswer": "Without the bound '<T extends Comparable<T>>', the compiler only knows that 'T' is an Object, and Object does not possess the 'compareTo()' method. Bounding 'T' to Comparable guarantees at compile-time that any type passed to 'findMax' supports comparison operators ('compareTo() > 0').",
    "explanation": "Standard pattern for generic sorting, searching, and tree structures.",
    "hint": "Guarantees that T implements compareTo() for element comparison at compile time.",
    "level": "Intermediate",
    "codeExample": "public static <T extends Comparable<T>> T max(T a, T b) { return a.compareTo(b) > 0 ? a : b; }"
  }
];

export default topic7_questions;