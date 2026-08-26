const topic2_questions = [
  {
    "question": "What specific runtime exceptions are thrown by 'Queue.remove()', 'Queue.element()', and 'Queue.add()' when operations fail?",
    "shortAnswer": "1. 'remove()': throws 'NoSuchElementException' if the queue is empty. 2. 'element()': throws 'NoSuchElementException' if the queue is empty. 3. 'add(e)': throws 'IllegalStateException' ('Queue full') if called on a bounded queue that has reached its maximum capacity.",
    "explanation": "Exact exception specifications defined in java.util.Queue Javadoc.",
    "hint": "remove/element throw NoSuchElementException when empty; add throws IllegalStateException when full.",
    "level": "Intermediate",
    "codeExample": "try { q.remove(); } catch (NoSuchElementException e) { /* empty */ }"
  }
];

export default topic2_questions;