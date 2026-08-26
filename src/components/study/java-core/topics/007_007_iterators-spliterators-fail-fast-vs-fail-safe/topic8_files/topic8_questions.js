const topic8_questions = [
  {
    "question": "What capabilities does 'ListIterator' provide that are NOT available on the standard 'Iterator' interface?",
    "shortAnswer": "1. 'Bidirectional Traversal': can walk backward using 'hasPrevious()' and 'previous()'. 2. 'Index Tracking': queries upcoming index positions via 'nextIndex()' and 'previousIndex()'. 3. 'Element Replacement': can replace the last returned element via 'set(element)'. 4. 'Inline Insertion': can insert a new element at cursor position via 'add(element)' without throwing CME. (Note: ListIterator is available only on List implementations).",
    "explanation": "Specialized iterator for java.util.List implementations.",
    "hint": "Adds backward traversal (previous), index tracking (nextIndex/prevIndex), and mutations (set/add).",
    "level": "Intermediate",
    "codeExample": "ListIterator<String> it = list.listIterator(); while(it.hasPrevious()) { it.previous(); }"
  }
];

export default topic8_questions;