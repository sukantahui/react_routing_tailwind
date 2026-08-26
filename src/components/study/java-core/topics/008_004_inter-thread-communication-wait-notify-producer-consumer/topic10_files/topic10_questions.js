const topic10_questions = [
  {
    "question": "Explain the dual synchronization mechanism in a classic thread-safe Bounded Buffer implemented with wait() and notifyAll().",
    "shortAnswer": "A thread-safe Bounded Buffer coordinates producers and consumers through two complementary condition predicates on a single monitor lock: 1. 'Producer Condition': Producers check 'while (buffer.size() == capacity) lock.wait()', releasing the lock and blocking when full until a consumer removes an element. 2. 'Consumer Condition': Consumers check 'while (buffer.isEmpty()) lock.wait()', releasing the lock and blocking when empty until a producer inserts an element. Whenever a producer adds an item or a consumer removes an item, it calls 'lock.notifyAll()' to broadcast the state change to the opposing waiting threads.",
    "explanation": "Grand capstone problem of Module 008_004 and the foundation of ArrayBlockingQueue.",
    "hint": "Producers wait when full; consumers wait when empty; both call notifyAll() after mutating the buffer.",
    "level": "Advanced",
    "codeExample": "put: while(full) wait(); add(); notifyAll(); | take: while(empty) wait(); remove(); notifyAll();"
  }
];

export default topic10_questions;