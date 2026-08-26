const topic13_questions = [
  {
    "question": "How do 'BlockingQueue.put(e)' and 'BlockingQueue.take()' coordinate producer and consumer threads without active CPU busy-waiting?",
    "shortAnswer": "'BlockingQueue.put(e)' blocks the calling producer thread (putting it into a WAITING state via internal ReentrantLock Condition variables) if the queue is full, automatically waking it when a consumer removes an item. Similarly, 'BlockingQueue.take()' blocks the consumer thread if the queue is empty, automatically waking it when a producer inserts an item. This provides thread coordination with zero CPU busy-waiting.",
    "explanation": "Core concurrency building block in java.util.concurrent (JSR-166).",
    "hint": "put() blocks on full queue; take() blocks on empty queue; coordinates threads using Condition variables with 0% CPU spin.",
    "level": "Advanced",
    "codeExample": "queue.put(item); // Blocks until space; Item i = queue.take(); // Blocks until item arrives"
  }
];

export default topic13_questions;