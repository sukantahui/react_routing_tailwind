const topic4_questions = [
  {
    "question": "What causes a runtime 'IllegalMonitorStateException' in Java?",
    "shortAnswer": "'IllegalMonitorStateException' is an unchecked runtime exception thrown by the JVM whenever a thread attempts to call 'wait()', 'notify()', or 'notifyAll()' on an object without holding that object's intrinsic monitor lock. Common causes include: 1. Calling 'wait()/notify()' completely outside a synchronized block. 2. Synchronizing on object A (e.g. 'synchronized(lockA)') but calling 'wait()/notify()' on object B (e.g. 'lockB.wait()').",
    "explanation": "Standard JVM lock ownership validation check.",
    "hint": "Thrown when calling wait/notify without holding the target object's monitor lock.",
    "level": "Beginner",
    "codeExample": "synchronized(objA) { objB.wait(); } // Throws IllegalMonitorStateException!"
  }
];

export default topic4_questions;