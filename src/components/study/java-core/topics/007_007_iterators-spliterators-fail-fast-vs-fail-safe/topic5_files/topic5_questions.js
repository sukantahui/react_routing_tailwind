const topic5_questions = [
  {
    "question": "How does the 'checkForComodification()' method inside ArrayList's Iterator enforce fail-fast behavior?",
    "shortAnswer": "When an iterator is instantiated, it captures 'int expectedModCount = modCount'. On every subsequent invocation of 'next()' or 'remove()', it executes 'checkForComodification()', which tests 'if (modCount != expectedModCount) throw new ConcurrentModificationException();'. If any external thread or method mutated the list's structure, 'modCount' no longer matches 'expectedModCount', immediately aborting iteration.",
    "explanation": "Internal JDK implementation of fail-fast iterators.",
    "hint": "Compares expectedModCount == modCount in 1 CPU cycle before reading each element.",
    "level": "Intermediate",
    "codeExample": "final void checkForComodification() { if (modCount != expectedModCount) throw new ConcurrentModificationException(); }"
  }
];

export default topic5_questions;