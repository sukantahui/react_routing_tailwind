const topic7_questions = [
  {
    "question": "What is the most idiomatic O(n) one-liner in Java to remove duplicates from a 'List<T>' while strictly preserving element arrival order?",
    "shortAnswer": "The canonical one-liner is: 'new ArrayList<>(new LinkedHashSet<>(list))'. Passing the list into 'LinkedHashSet' removes duplicates in O(n) time while maintaining the first-seen insertion order. Passing that set back into 'new ArrayList<>()' returns a clean indexed list.",
    "explanation": "Classic Java interview and enterprise coding pattern.",
    "hint": "'new ArrayList<>(new LinkedHashSet<>(list))' removes duplicates and preserves order in O(n) time.",
    "level": "Beginner",
    "codeExample": "List<String> unique = new ArrayList<>(new LinkedHashSet<>(duplicates));"
  }
];

export default topic7_questions;