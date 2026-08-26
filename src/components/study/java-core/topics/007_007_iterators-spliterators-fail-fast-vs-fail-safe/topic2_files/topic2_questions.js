const topic2_questions = [
  {
    "question": "Why is 'iterator.remove()' the ONLY safe way to remove elements while traversing a standard collection, and what happens if you call it before 'next()'?",
    "shortAnswer": "1. 'Why it is safe': 'iterator.remove()' modifies the backing collection AND simultaneously updates the iterator's internal cursor and increments 'expectedModCount' to match 'modCount'. This keeps the iterator synchronized with collection structure. 2. 'IllegalStateException': 'remove()' removes the element returned by the most recent 'next()' call. If 'next()' has not been called yet (or if 'remove()' is called twice consecutively), it throws 'IllegalStateException'.",
    "explanation": "Core contract of java.util.Iterator.remove().",
    "hint": "Synchronizes expectedModCount with modCount; throws IllegalStateException if called before next().",
    "level": "Intermediate",
    "codeExample": "while(it.hasNext()) { if(it.next().equals(bad)) it.remove(); } // 100% safe"
  }
];

export default topic2_questions;