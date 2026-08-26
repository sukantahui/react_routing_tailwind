const topic5_questions = [
  {
    "question": "Which lock is acquired when a thread executes a 'synchronized static' method?",
    "shortAnswer": "A 'synchronized static' method acquires the intrinsic monitor lock of the 'java.lang.Class' object associated with that class (i.e. 'ClassName.class' in Metaspace). Because there is only ONE Class object per class loaded in a ClassLoader, only ONE thread in the entire JVM can execute any synchronized static method of that class at a time, regardless of how many instances of that class exist.",
    "explanation": "Core JVM specification on Class-level synchronization.",
    "hint": "Acquires the intrinsic lock on the Class object (ClassName.class), locking globally across all instances.",
    "level": "Intermediate",
    "codeExample": "public static synchronized void count() { ... } // Identical to synchronized(MyClass.class) { ... }"
  }
];

export default topic5_questions;