const topic7_questions = [
  {
    "question": "How does the JVM guarantee thread safety during class initialization (<clinit>)?",
    "shortAnswer": "The JVM maintains an internal initialization lock on the Class object. When multiple threads concurrently attempt to initialize a class for the first time, only one thread executes <clinit>() while all other threads block until initialization finishes.",
    "explanation": "This is why the Initialization-on-demand holder (Bill Pugh Singleton) idiom is completely thread-safe without explicit synchronization.",
    "hint": "Uses an internal JVM class initialization lock.",
    "level": "Advanced",
    "codeExample": "private static class Holder { static final Singleton INSTANCE = new Singleton(); }"
  },
  {
    "question": "In what order are static fields and static initializer blocks executed inside <clinit>()?",
    "shortAnswer": "In the exact textual order in which they appear in the source code from top to bottom.",
    "explanation": "Top-to-bottom order determines initialization precedence.",
    "hint": "In source code declaration order from top to bottom.",
    "level": "Beginner",
    "codeExample": "static int a = 1; static { a = 2; } // a becomes 2"
  }
];

export default topic7_questions;
