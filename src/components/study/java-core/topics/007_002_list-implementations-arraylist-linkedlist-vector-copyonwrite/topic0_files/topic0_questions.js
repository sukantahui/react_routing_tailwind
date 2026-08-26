const topic0_questions = [
  {
    "question": "What capabilities does 'ListIterator<E>' provide over a standard 'Iterator<E>' in Java?",
    "shortAnswer": "1. 'Bidirectional Traversal': Can navigate backward using 'hasPrevious()' and 'previous()'. 2. 'Index Reporting': Provides 'nextIndex()' and 'previousIndex()'. 3. 'Element Modification': Can replace elements with 'set(E)' and insert elements at the cursor with 'add(E)' (standard Iterator only allows remove()). 4. 'Custom Start Index': Can start traversal at any index via 'list.listIterator(int index)'.",
    "explanation": "Core list navigation contract unique to java.util.List implementations.",
    "hint": "Supports bidirectional traversal (previous), index reporting, in-flight set/add, and arbitrary starting positions.",
    "level": "Intermediate",
    "codeExample": "ListIterator<String> it = list.listIterator(); while(it.hasNext()) { it.set(it.next().toUpperCase()); }"
  }
];

export default topic0_questions;