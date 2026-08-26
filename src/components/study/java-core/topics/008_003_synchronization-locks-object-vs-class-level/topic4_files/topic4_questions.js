const topic4_questions = [
  {
    "question": "Which lock is acquired when a thread enters a 'synchronized' instance method?",
    "shortAnswer": "A synchronized instance method implicitly acquires the intrinsic monitor lock of the CURRENT instance ('this') on which the method is invoked. Any other thread attempting to call ANY synchronized instance method on that same object instance will be BLOCKED until the first thread exits the method and releases the lock.",
    "explanation": "Standard contract of synchronized instance methods in Java.",
    "hint": "Acquires the intrinsic lock of the 'this' instance on which the method was called.",
    "level": "Beginner",
    "codeExample": "public synchronized void update() { ... } // Identical to synchronized(this) { ... }"
  }
];

export default topic4_questions;