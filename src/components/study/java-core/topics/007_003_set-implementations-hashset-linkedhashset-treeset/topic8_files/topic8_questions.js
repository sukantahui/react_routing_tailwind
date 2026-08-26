const topic8_questions = [
  {
    "question": "What capabilities did 'java.util.NavigableSet' add to Java 6 on top of the older 'SortedSet' interface?",
    "shortAnswer": "'NavigableSet' added closest-match search methods: 'lower(e)' (< e), 'floor(e)' (<= e), 'ceiling(e)' (>= e), and 'higher(e)' (> e). It also added retrieval and removal methods: 'pollFirst()' and 'pollLast()', as well as reverse traversal views: 'descendingSet()' and 'descendingIterator()'.",
    "explanation": "Introduced in Java 6 to complete the sorted collections API.",
    "hint": "Adds lower, floor, ceiling, higher, pollFirst/pollLast, and descendingSet views.",
    "level": "Intermediate",
    "codeExample": "set.floor(80); // <= 80 | set.ceiling(80); // >= 80 | set.descendingSet();"
  }
];

export default topic8_questions;