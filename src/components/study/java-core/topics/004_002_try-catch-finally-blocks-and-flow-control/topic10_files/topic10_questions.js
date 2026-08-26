const topic10_questions = [
  {
    "question": "Under what specific conditions will a 'finally' block FAIL to execute in Java?",
    "shortAnswer": "1. When 'System.exit(status)' or 'Runtime.getRuntime().halt()' terminates the JVM process. 2. During a catastrophic JVM crash (e.g. segmentation fault in native JNI code). 3. Physical hardware power outage or operating system 'kill -9' signal. 4. If the try block enters an infinite loop or permanent thread deadlock.",
    "explanation": "Apart from these extreme operating-system-level terminations, finally ALWAYS executes.",
    "hint": "System.exit(), fatal JVM native crashes, OS kill -9, or infinite deadlocks in try.",
    "level": "Intermediate",
    "codeExample": "// System.exit(0) immediately terminates the entire OS process, skipping finally"
  }
];

export default topic10_questions;