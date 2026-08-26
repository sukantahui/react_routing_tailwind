const topic2_questions = [
  {
    "question": "Why are 'wait()', 'notify()', and 'notifyAll()' defined in 'java.lang.Object' rather than 'java.lang.Thread'?",
    "shortAnswer": "1. 'Locks Belong to Objects': In Java's architecture, intrinsic monitor locks are attached to object instances in heap memory, not to thread instances. 2. 'Multiple Lock Disambiguation': A single thread can acquire locks on multiple distinct objects simultaneously (e.g. holding locks on both 'bufferA' and 'bufferB'). If 'wait()' were a method on Thread, the JVM would have no way of knowing which specific object's monitor should be released. Defining 'wait()' on Object enables 'bufferA.wait()', unambiguously releasing ONLY bufferA's lock while retaining bufferB's lock. 3. 'Dedicated Wait Sets': Every object maintains its own private Wait Set of waiting threads.",
    "explanation": "Classic senior Java architect design interview question.",
    "hint": "Locks belong to objects, not threads; a thread can hold multiple locks and must specify which lock to release.",
    "level": "Advanced",
    "codeExample": "synchronized(objA) { synchronized(objB) { objA.wait(); // Releases only objA! } }"
  }
];

export default topic2_questions;