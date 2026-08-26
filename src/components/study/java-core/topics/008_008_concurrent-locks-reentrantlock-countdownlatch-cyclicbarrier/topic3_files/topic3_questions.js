const topic3_questions = [
  {
    "question": "How does the 'Condition' interface in Java improve upon 'Object.wait()' and 'Object.notify()'?",
    "shortAnswer": "With 'Object.wait/notify', every object has only ONE intrinsic wait-set. Calling 'notifyAll()' indiscriminately wakes up ALL waiting threads—both producers and consumers—causing severe CPU context switching thrashing. The 'Condition' interface allows developers to create MULTIPLE independent wait queues ('lock.newCondition()') on a SINGLE lock (e.g. 'notFull' and 'notEmpty'). Producers wait on 'notFull.await()' and are signaled by consumers, while consumers wait on 'notEmpty.await()' and are signaled by producers, achieving precise targeted wakeups.",
    "explanation": "Core architecture of java.util.concurrent.locks.Condition.",
    "hint": "Allows multiple wait-queues per lock (e.g. notFull and notEmpty), eliminating signal thrashing.",
    "level": "Advanced",
    "codeExample": "Condition notFull = lock.newCondition(); notFull.await(); notFull.signal();"
  }
];

export default topic3_questions;