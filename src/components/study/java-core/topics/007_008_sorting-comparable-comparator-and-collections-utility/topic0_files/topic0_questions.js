const topic0_questions = [
  {
    "question": "What is the primary difference between 'Natural Ordering' (Comparable) and 'Custom Strategy Ordering' (Comparator) in Java?",
    "shortAnswer": "'Natural Ordering' is intrinsic to a domain class by implementing 'java.lang.Comparable<T>' with a single 'compareTo(T o)' method (defining its default sort sequence). 'Custom Strategy Ordering' is defined externally using 'java.util.Comparator<T>' via 'compare(T o1, T o2)', allowing developers to sort the same objects by multiple dynamic criteria (e.g. by salary descending, by name, by hire date) without modifying the original class source code.",
    "explanation": "Core sorting taxonomy in Java Collections.",
    "hint": "Comparable is internal single default sorting; Comparator is external dynamic strategy sorting.",
    "level": "Beginner",
    "codeExample": "Collections.sort(list); // Comparable natural sort | list.sort(comparator); // Custom sort"
  }
];

export default topic0_questions;