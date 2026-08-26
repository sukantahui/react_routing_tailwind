const topic3_questions = [
  {
    "question": "Why does invoking 'list.remove(item)' or 'list.add(item)' inside an enhanced for-each loop throw 'ConcurrentModificationException'?",
    "shortAnswer": "The enhanced for-each loop is syntactic sugar for a standard 'Iterator'. When the iterator is initialized, it copies the list's 'modCount' into its internal 'expectedModCount'. When you call 'list.remove()' directly, the list increments 'modCount' without updating the iterator's 'expectedModCount'. On the next iteration step, 'iterator.next()' detects 'modCount != expectedModCount' and immediately throws 'ConcurrentModificationException'.",
    "explanation": "Most frequent Java interview question and common junior developer mistake.",
    "hint": "For-each uses an iterator under the hood; direct list.remove() changes modCount making expectedModCount stale.",
    "level": "Intermediate",
    "codeExample": "for(String s : list) { if(s.equals(\"X\")) list.remove(s); } // Throws CME on next loop iteration!"
  }
];

export default topic3_questions;