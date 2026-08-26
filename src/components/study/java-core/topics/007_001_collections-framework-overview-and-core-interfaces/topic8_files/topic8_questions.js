const topic8_questions = [
  {
    "question": "What is the key difference between 'Queue.add()/remove()' and 'Queue.offer()/poll()' methods in Java?",
    "shortAnswer": "'add()' and 'remove()' throw runtime exceptions ('IllegalStateException' when full, 'NoSuchElementException' when empty). In contrast, 'offer()' and 'poll()' are designed for safe buffering and concurrency: 'offer()' returns 'false' if insertion fails, and 'poll()' returns 'null' if the queue is empty, avoiding exception overhead.",
    "explanation": "Two sets of methods provided on the Queue interface for distinct error-handling strategies.",
    "hint": "add/remove throw exceptions; offer/poll return special values (false / null).",
    "level": "Intermediate",
    "codeExample": "if (queue.offer(task)) { ... } Task t = queue.poll(); // Returns null if empty"
  }
];

export default topic8_questions;