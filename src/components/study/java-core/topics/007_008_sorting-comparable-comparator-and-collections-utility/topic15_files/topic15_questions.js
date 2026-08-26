const topic15_questions = [
  {
    "question": "Why should methods return 'Collections.emptyList()' instead of 'null' or 'new ArrayList<>()' when no items are found?",
    "shortAnswer": "1. 'Prevent NullPointerException': Returning 'Collections.emptyList()' allows callers to write clean loops without defensive 'if (list != null)' checks. 2. 'Zero Memory Allocation': Unlike 'new ArrayList<>()' (which allocates an object header and an internal Object[] array on the heap), 'Collections.emptyList()' returns a shared static singleton instance ('Collections.EMPTY_LIST'), causing zero heap allocation and zero GC overhead.",
    "explanation": "Effective Java Item 54: Return empty collections or arrays, not nulls.",
    "hint": "Prevents NPEs and avoids heap memory allocations by reusing a shared static singleton.",
    "level": "Beginner",
    "codeExample": "return students.isEmpty() ? Collections.emptyList() : students; // Clean & efficient"
  }
];

export default topic15_questions;