const topic11_questions = [
  {
    "question": "Why does 'TreeSet' completely ignore an object's 'equals()' and 'hashCode()' methods when checking for duplicates?",
    "shortAnswer": "Because TreeSet is backed by a Red-Black binary search tree (TreeMap). To maintain sorted tree invariants, tree traversal and node placement are driven entirely by 'Comparable.compareTo()' or 'Comparator.compare()'. If 'compareTo()' returns 0, the tree treats the two nodes as duplicate keys and skips insertion, completely ignoring whether 'equals()' returns true or false.",
    "explanation": "Effective Java Item 14: Consider implementing Comparable (consistency with equals).",
    "hint": "TreeSet uses compareTo()/compare() == 0 for both ordering and uniqueness, completely ignoring equals().",
    "level": "Advanced",
    "codeExample": "if (c.compare(key, t.key) == 0) return t.setValue(value); // TreeSet duplicate check"
  }
];

export default topic11_questions;