const topic5_questions = [
  {
    "question": "What is the 'Hold and Wait' Coffman condition and how can software engineers break it?",
    "shortAnswer": "'Hold and Wait' occurs when a thread holds at least one lock (resource) while simultaneously blocking to acquire another lock held by a different thread. To break 'Hold and Wait': 1. 'All-or-Nothing Locking': Require threads to request all required resources simultaneously upfront (e.g. using a global lock coordinator). 2. 'Release on Contention': If the second lock cannot be acquired immediately, release the first lock completely (using 'ReentrantLock.tryLock()') and retry later.",
    "explanation": "Second Coffman condition analysis and prevention strategy.",
    "hint": "Holding resource A while waiting for resource B; broken by acquiring all locks at once or releasing on failure.",
    "level": "Intermediate",
    "codeExample": "synchronized(lockA) { synchronized(lockB) { ... } } // Nested locks create Hold and Wait"
  }
];

export default topic5_questions;