const topic4_questions = [
  {
    "question": "What is the purpose of the 'protected transient int modCount' field in AbstractList / ArrayList, and does 'list.set(index, element)' increment it?",
    "shortAnswer": "'modCount' is an internal counter that tracks the number of STRUCTURAL modifications (operations that change collection size, such as 'add()', 'remove()', or 'clear()'). 'list.set(index, element)' does NOT increment 'modCount' because replacing an existing element does not change the list's size or invalidate existing iterator cursor positions.",
    "explanation": "Exact internal behavior defined in AbstractList and ArrayList JDK source.",
    "hint": "Tracks structural changes (size mutations). list.set() does NOT change size so modCount is unchanged.",
    "level": "Intermediate",
    "codeExample": "protected transient int modCount = 0; // Incremented on add/remove, NOT on set()"
  }
];

export default topic4_questions;