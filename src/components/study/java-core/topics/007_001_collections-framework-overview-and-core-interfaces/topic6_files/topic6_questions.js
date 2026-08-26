const topic6_questions = [
  {
    "question": "What distinct capabilities does 'java.util.List<E>' add on top of the base 'java.util.Collection<E>' interface?",
    "shortAnswer": "1. 'Positional Index Access': Methods like 'get(int index)', 'set(int index, E element)', 'add(int index, E element)', and 'remove(int index)'. 2. 'Search by Equality': 'indexOf(Object)' and 'lastIndexOf(Object)'. 3. 'Bidirectional Traversal': 'listIterator()' returning a 'ListIterator' supporting previous(), hasPrevious(), and in-place replacement. 4. 'Sub-List Views': 'subList(fromIndex, toIndex)'.",
    "explanation": "The core sequence contract defining List behavior in Java.",
    "hint": "Adds zero-indexed positional access (get/set/add by index), search (indexOf), subList views, and ListIterator.",
    "level": "Beginner",
    "codeExample": "list.add(0, \"First\"); String s = list.get(0); int pos = list.indexOf(\"First\");"
  }
];

export default topic6_questions;